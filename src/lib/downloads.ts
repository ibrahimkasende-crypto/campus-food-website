/**
 * Liens de téléchargement officiels.
 *
 * Fiche Android confirmée, en production : https://play.google.com/store/apps/details?id=cd.campusfood.app
 * Fiche App Store confirmée : https://apps.apple.com/ch/app/campus-food/id6829912350
 * L'APK reste vide tant que son adresse définitive n'est pas fournie.
 */

function clean(value: string | undefined): string | null {
  const v = value?.trim() ?? "";
  return /^https:\/\//.test(v) ? v : null;
}

/** Fiche Google Play de l'application Android, paquet cd.campusfood.app. */
export const GOOGLE_PLAY_LISTING_URL =
  "https://play.google.com/store/apps/details?id=cd.campusfood.app";

/** Fiche App Store officielle de l'application Client (id6829912350). */
export const APP_STORE_LISTING_URL = "https://apps.apple.com/ch/app/campus-food/id6829912350";

/** Fiche Google Play. Une variable d'environnement https remplace l'adresse officielle. */
export function googlePlayUrl(): string {
  return clean(process.env.NEXT_PUBLIC_ANDROID_PLAY_URL) ?? GOOGLE_PLAY_LISTING_URL;
}

/** Fiche App Store. Une variable d'environnement https remplace l'adresse officielle. */
export function appStoreUrl(): string {
  return clean(process.env.NEXT_PUBLIC_IOS_APP_STORE_URL) ?? APP_STORE_LISTING_URL;
}

/** Installation directe Android (APK), optionnelle et distincte du badge Google Play. */
export function apkUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_ANDROID_APK_URL);
}

