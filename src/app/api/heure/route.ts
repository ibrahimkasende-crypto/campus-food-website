import { NextResponse } from "next/server";

/** Heure du serveur (ms) : le compte à rebours s'aligne dessus pour ne pas dépendre de l'horloge de l'appareil. */
export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json({ now: Date.now() }, { headers: { "Cache-Control": "no-store" } });
}
