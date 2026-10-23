import { NextResponse } from "next/server";
import { validateDeletionRequest } from "@/lib/deletionRequest";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Enregistre une demande de suppression. Ne supprime aucun compte.
 * La clé utilisée est la clé publique Supabase : la base n'autorise que l'insertion.
 * Le message de confirmation n'est renvoyé qu'après un enregistrement confirmé (HTTP 201).
 */

const MAX_BODY_BYTES = 8_000;
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
  if (!origin) return true;
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
  const startedAt = Number(body.startedAt);
  const tooFast = Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS;
  if (str(body.website).trim() !== "" || tooFast) {
    return fail(422, "La demande n'a pas été enregistrée. Attendez quelques secondes puis réessayez.");
  }

  if (tooMany(clientKey(req))) return fail(429, "Trop de demandes. Réessayez dans quelques minutes.");

  const { ok, errors, clean } = validateDeletionRequest(str(body.contact), str(body.message));
  if (!ok) return fail(422, "Veuillez corriger les champs indiqués.", errors);

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) {
    console.error("[suppression-compte] SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY non configurées");
    return fail(503, "Le service est momentanément indisponible. Merci de réessayer plus tard.");
  }

  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/account_deletion_requests`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        contact: clean.contact,
        contact_kind: clean.contactKind,
        message: clean.message || null,
      }),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });

    if (res.status === 201) {
      return NextResponse.json({ ok: true }, { status: 201, headers: { "Cache-Control": "no-store" } });
    }
    const detail = (await res.json().catch(() => ({}))) as { code?: string; message?: string };
    if (detail.code === "P0001" && detail.message) return fail(429, detail.message);
    console.error("[suppression-compte] refus de la base", res.status, detail.code);
    return fail(502, "Votre demande n'a pas pu être enregistrée. Merci de réessayer.");
  } catch (e) {
    console.error("[suppression-compte] erreur réseau", e instanceof Error ? e.name : "inconnue");
    return fail(502, "Connexion impossible. Vérifiez votre connexion et réessayez.");
  }
}

export function GET() {
  return new NextResponse(null, { status: 405, headers: { Allow: "POST" } });
}
