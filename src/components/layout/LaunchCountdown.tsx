"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCountdownState, type CountdownState } from "@/lib/countdown";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Compte à rebours du lancement dans l'en-tête. L'état est recalculé à chaque seconde à partir de l'heure réelle
 * (alignée sur l'heure du serveur quand elle est joignable, sinon sur l'horloge de l'appareil) ; il disparaît
 * tout seul à partir du 24 octobre 2026, 0 h 00 (Kinshasa), sans intervention.
 */
export function LaunchCountdown({ initialNow }: { initialNow: number }) {
  // Décalage serveur − appareil (ms) ; 0 tant que l'heure du serveur n'a pas été lue.
  const [offset, setOffset] = useState(0);
  const [state, setState] = useState<CountdownState>(() => getCountdownState(initialNow));

  useEffect(() => {
    let cancelled = false;
    const t0 = Date.now();
    fetch("/api/heure", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { now?: number }) => {
        if (cancelled || typeof d.now !== "number") return;
        const t1 = Date.now();
        setOffset(d.now + (t1 - t0) / 2 - t1); // compense la moitié de l'aller-retour
      })
      .catch(() => {}); // repli : horloge de l'appareil
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const tick = () => setState(getCountdownState(Date.now() + offset));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [offset]);

  if (state.phase === "ended") return null;

  return (
    <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white">
      <Link
        href="/#lancement"
        className="mx-auto flex min-h-9 max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-4 py-1.5 text-center sm:px-6"
        aria-label="Compte à rebours du lancement officiel de Campus Food, vendredi 23 octobre 2026 à 9 h, heure de Kinshasa"
      >
        {state.phase === "before" ? (
          <>
            <span className="text-[11px] font-bold uppercase tracking-wider sm:text-xs">Lancement officiel dans</span>
            <span role="timer" aria-live="off" className="flex items-center gap-1.5 font-extrabold tabular-nums">
              {[
                [state.days, "j"],
                [state.hours, "h"],
                [state.minutes, "min"],
                [state.seconds, "s"],
              ].map(([v, u]) => (
                <span key={u} className="rounded-md bg-white/20 px-1.5 py-0.5 text-sm sm:text-base">
                  {pad(v as number)}
                  <span className="ml-0.5 text-[10px] font-semibold opacity-90">{u}</span>
                </span>
              ))}
            </span>
          </>
        ) : (
          <span className="text-xs font-extrabold uppercase tracking-wider sm:text-sm">
            🎉 Le grand lancement de Campus Food a lieu aujourd&apos;hui !
          </span>
        )}
      </Link>
    </div>
  );
}
