/**
 * Liens de téléchargement officiels.
 *
 * Fiche Android confirmée : https://play.google.com/store/apps/details?id=cd.campusfood.app
 * L'App Store et l'APK restent vides tant que leur adresse définitive n'est pas fournie.
 *
 * Test fermé — où ajouter le lien d'inscription donné par Google Play Console :
 * 1. variable d'environnement NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL (lue au build, prioritaire) ;
 * 2. ou la constante CLOSED_TEST_OPT_IN_URL ci-dessous.
 * Ne pas inventer cette adresse. Tant qu'elle est vide, le bouton de test ouvre la fiche Google Play.
 */

function clean(value: string | undefined): string | null {
  const v = value?.trim() ?? "";
  return /^https:\/\//.test(v) ? v : null;
}

/** Fiche Google Play de l'application Android, paquet cd.campusfood.app. */
export const GOOGLE_PLAY_LISTING_URL =
  "https://play.google.com/store/apps/details?id=cd.campusfood.app";

/**
 * Lien d'inscription au test fermé. Laisser vide jusqu'à l'adresse Play Console.
 * Exemple d'emplacement : Play Console → Test → Test fermé → lien d'adhésion.
 */
export const CLOSED_TEST_OPT_IN_URL = "";

/** Fiche Google Play. Une variable d'environnement https remplace l'adresse officielle. */
export function googlePlayUrl(): string {
  return clean(process.env.NEXT_PUBLIC_ANDROID_PLAY_URL) ?? GOOGLE_PLAY_LISTING_URL;
}

/** Fiche App Store, seulement si l'adresse définitive est configurée. */
export function appStoreUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_IOS_APP_STORE_URL);
}

/** Installation directe Android (APK), optionnelle et distincte du badge Google Play. */
export function apkUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_ANDROID_APK_URL);
}

/** Lien d'inscription au test fermé, ou null s'il n'a pas encore été fourni. */
export function closedTestOptInUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL) ?? clean(CLOSED_TEST_OPT_IN_URL);
}

/**
 * Bouton « Rejoindre le test et télécharger l'application ».
 * Ouvre l'inscription lorsqu'elle est configurée, sinon la fiche Google Play.
 */
export function androidTestJoinUrl(): string {
  return closedTestOptInUrl() ?? googlePlayUrl();
}
