/**
 * Liens de téléchargement officiels. Aucun lien n'est inventé : tant qu'une variable d'environnement n'est pas
 * renseignée avec l'adresse définitive du magasin, le bouton affiche « Bientôt disponible ».
 */

function clean(value: string | undefined): string | null {
  const v = value?.trim() ?? "";
  return /^https:\/\//.test(v) ? v : null;
}

/** Fiche Google Play (publiée et confirmée). */
export function googlePlayUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_ANDROID_PLAY_URL);
}

/** Fiche App Store (publiée et confirmée). */
export function appStoreUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_IOS_APP_STORE_URL);
}

/** Installation directe Android (APK), optionnelle et distincte du badge Google Play. */
export function apkUrl(): string | null {
  return clean(process.env.NEXT_PUBLIC_ANDROID_APK_URL);
}
