/**
 * Passerelle site → application. Identifiants réels de l'application Android : paquet `cd.campusfood.app`,
 * lien profond `campusfood://open` (déclaré dans AndroidManifest du projet Client). La fiche Google Play officielle
 * est dans src/lib/downloads.ts. L'App Store n'est utilisé que si NEXT_PUBLIC_IOS_APP_STORE_URL est renseignée.
 */
export const ANDROID_PACKAGE = "cd.campusfood.app";
export const APP_OPEN_SCHEME_URL = "campusfood://open";

export type Platform = "android" | "ios" | "desktop";

export function detectPlatform(userAgent: string, maxTouchPoints = 0): Platform {
  if (/android/i.test(userAgent)) return "android";
  if (/iphone|ipad|ipod/i.test(userAgent)) return "ios";
  // iPadOS demande par défaut le site « ordinateur » : Mac + écran tactile
  if (/macintosh/i.test(userAgent) && maxTouchPoints > 1) return "ios";
  return "desktop";
}

/**
 * Lien « intent » Android (Chrome, Samsung Internet, Firefox) : ouvre l'application si elle est installée ; sinon le
 * navigateur va de lui-même à `fallbackUrl` (fiche Google Play ou page de téléchargement). Aucun minuteur JavaScript
 * n'est utilisé pour deviner si l'application est installée.
 */
export function androidIntentUrl(fallbackUrl: string): string {
  return `intent://open#Intent;scheme=campusfood;package=${ANDROID_PACKAGE};S.browser_fallback_url=${encodeURIComponent(fallbackUrl)};end`;
}
