import { NextResponse } from "next/server";
import { joinTypes, toRow, validateJoin, type JoinType } from "@/lib/joinRequest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Réception des demandes « Rejoindre Campus Food » (restaurant, livreur, partenaire institutionnel ou commercial).
 *
 * Sécurité : taille limitée, origine contrôlée, champ piège + délai minimal anti-robots, limitation par adresse,
 * validation côté serveur, écriture avec la clé PUBLIQUE (publishable) — la base n'autorise que l'insertion (RLS) et
 * applique ses propres contraintes et limites. Aucun secret n'est exposé au navigateur. Le succès n'est annoncé
 * qu'après la confirmation de la base.
 */

// Limite relevée pour accueillir la photo facultative (base64) de la candidature livreur ; les autres
// types de demande n'envoient jamais une telle charge et restent protégés par la limite par champ (1500
// caractères, appliquée par le déclencheur SQL) quelle que soit la taille autorisée ici.
const MAX_BODY_BYTES = 7_000_000;
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const MIN_FILL_MS = 2500;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function clientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return fwd || req.headers.get("x-real-ip") || "inconnu";
}

function tooMany(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

function allowedOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true; // appels serveur à serveur / outils : les autres protections s'appliquent
  try {
    const host = new URL(origin).host;
    const own = req.headers.get("host");
    const configured = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL).host : null;
    return host === own || host === configured || host === "campusfood.app" || host === "www.campusfood.app";
  } catch {
    return false;
  }
}

function fail(status: number, message: string, fields?: Record<string, string>) {
  return NextResponse.json({ ok: false, message, fields }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  if (!allowedOrigin(req)) return fail(403, "Requête refusée.");

  const length = Number(req.headers.get("content-length") ?? "0");
  if (length > MAX_BODY_BYTES) return fail(413, "Demande trop volumineuse.");

  let body: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) return fail(413, "Demande trop volumineuse.");
    body = JSON.parse(text) as Record<string, unknown>;
  } catch {
    return fail(400, "Demande illisible.");
  }

  const str = (v: unknown) => (typeof v === "string" ? v : "");

  // Robots : champ piège rempli ou formulaire envoyé trop vite → on répond comme un succès sans rien enregistrer.
  const startedAt = Number(body.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (str(body.website).trim() !== "" || tooFast) {
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  }

  if (tooMany(clientKey(req))) return fail(429, "Trop de demandes. Réessayez dans quelques minutes.");

  const type = (str(body.type) || "restaurant") as JoinType;
  if (!joinTypes.includes(type)) return fail(422, "Type de demande inconnu.");
  const values = (typeof body.values === "object" && body.values !== null ? body.values : {}) as Record<string, unknown>;
  const input: Record<string, string> = {};
  for (const [k, v] of Object.entries(values)) input[k] = str(v);

  const { ok, errors, clean } = validateJoin(type, input, body.consent === true);
  if (!ok) return fail(422, "Veuillez corriger les champs indiqués.", errors);

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) {
    console.error("[partenaires] SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY non configurées");
    return fail(503, "Le service de demandes est momentanément indisponible. Merci de réessayer plus tard.");
  }

  // Photo facultative (candidature livreur uniquement) : base64 data URL, vérifiée par sa signature réelle
  // (jamais par l'extension ou l'en-tête déclarés), puis envoyée au stockage privé avant l'insertion de la ligne.
  let photoPath: string | undefined;
  if (type === "driver" && typeof body.photo === "string" && body.photo.trim()) {
    const photoResult = await uploadDriverPhoto(url, key, body.photo.trim());
    if (!photoResult.ok) return fail(422, photoResult.message);
    photoPath = photoResult.path;
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/partner_requests`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(toRow(type, photoPath ? { ...clean, photoPath } : clean)),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (res.status === 201) {
      return NextResponse.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
    }
    const detail = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
    if (detail.code === "P0001" && detail.message) return fail(429, detail.message);
    if (detail.code === "P0002" && detail.message) return fail(422, detail.message);
    console.error("[partenaires] refus de la base", res.status, detail.code);
    return fail(502, "Votre demande n'a pas pu être enregistrée. Merci de réessayer.");
  } catch (e) {
    console.error("[partenaires] erreur réseau", e instanceof Error ? e.name : "inconnue");
    return fail(502, "Connexion impossible. Vérifiez votre connexion et réessayez.");
  }
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}

/** Signature réelle des premiers octets : l'extension ou l'en-tête déclaré par le navigateur ne prouvent rien. */
function detectImageType(bytes: Uint8Array): { ext: string; contentType: string } | null {
  const starts = (sig: number[], offset = 0) => sig.every((b, i) => bytes[offset + i] === b);
  if (starts([0xff, 0xd8, 0xff])) return { ext: "jpg", contentType: "image/jpeg" };
  if (starts([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) return { ext: "png", contentType: "image/png" };
  if (starts([0x52, 0x49, 0x46, 0x46]) && starts([0x57, 0x45, 0x42, 0x50], 8)) return { ext: "webp", contentType: "image/webp" };
  return null;
}

/**
 * Envoie la photo (data URL base64) dans le bucket privé `driver-applications`, avec la clé publique : seule
 * l'écriture anonyme y est autorisée (RLS), jamais la lecture — la photo ne peut être relue que par l'équipe
 * Campus Food, depuis Desktop Admin, via une adresse signée temporaire.
 */
async function uploadDriverPhoto(
  supabaseUrl: string,
  publishableKey: string,
  dataUrl: string
): Promise<{ ok: true; path: string } | { ok: false; message: string }> {
  const match = /^data:image\/[a-z+]+;base64,([a-zA-Z0-9+/=]+)$/.exec(dataUrl);
  if (!match) return { ok: false, message: "Photo invalide." };
  let bytes: Buffer;
  try {
    bytes = Buffer.from(match[1], "base64");
  } catch {
    return { ok: false, message: "Photo illisible." };
  }
  if (bytes.length === 0 || bytes.length > MAX_PHOTO_BYTES) {
    return { ok: false, message: `Photo trop lourde (${(bytes.length / 1048576).toFixed(1)} Mo) : 5 Mo maximum.` };
  }
  const kind = detectImageType(bytes);
  if (!kind) return { ok: false, message: "Format de photo non accepté : JPEG, PNG ou WebP uniquement." };

  const path = `driver-applications/${crypto.randomUUID()}.${kind.ext}`;
  try {
    const res = await fetch(`${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/${path}`, {
      method: "POST",
      headers: { apikey: publishableKey, Authorization: `Bearer ${publishableKey}`, "Content-Type": kind.contentType },
      body: new Blob([new Uint8Array(bytes)], { type: kind.contentType }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      console.error("[partenaires] envoi photo refusé", res.status);
      return { ok: false, message: "La photo n'a pas pu être envoyée. Réessayez ou poursuivez sans photo." };
    }
    return { ok: true, path };
  } catch (e) {
    console.error("[partenaires] erreur réseau photo", e instanceof Error ? e.name : "inconnue");
    return { ok: false, message: "La photo n'a pas pu être envoyée. Réessayez ou poursuivez sans photo." };
  }
}
