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

const MAX_BODY_BYTES = 10_000;
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

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/partner_requests`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(toRow(type, clean)),
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
