/**
 * Compte à rebours du lancement officiel (fuseau Africa/Kinshasa = UTC+1, sans heure d'été).
 * Fonctions pures : l'état dépend uniquement de l'instant passé en paramètre, jamais d'un minuteur.
 */

/** Début du compte à rebours cible : vendredi 23 octobre 2026, 9 h 00 à Kinshasa. */
export const COUNTDOWN_TARGET_MS = Date.parse("2026-10-23T09:00:00+01:00");

/** Disparition automatique : samedi 24 octobre 2026, 0 h 00 à Kinshasa. */
export const COUNTDOWN_HIDE_AT_MS = Date.parse("2026-10-24T00:00:00+01:00");

export type CountdownState =
  | { phase: "before"; days: number; hours: number; minutes: number; seconds: number }
  | { phase: "live" }
  | { phase: "ended" };

export function getCountdownState(nowMs: number): CountdownState {
  if (nowMs >= COUNTDOWN_HIDE_AT_MS) return { phase: "ended" };
  const remaining = COUNTDOWN_TARGET_MS - nowMs;
  if (remaining <= 0) return { phase: "live" };
  const total = Math.floor(remaining / 1000);
  return {
    phase: "before",
    days: Math.floor(total / 86_400),
    hours: Math.floor((total % 86_400) / 3_600),
    minutes: Math.floor((total % 3_600) / 60),
    seconds: total % 60,
  };
}
