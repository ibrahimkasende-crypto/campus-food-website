/**
 * Identité numérique et coordonnées officielles de Campus Food.
 *
 * Règle : rien n'est affiché tant que l'information n'est pas confirmée. Les éléments ci-dessous sont activés
 * par des variables d'environnement (voir `.env.example`) : adresse e-mail professionnelle, numéro WhatsApp,
 * réseaux sociaux, liens des magasins d'applications.
 */

export const site = {
  name: "Campus Food",
  domain: "campusfood.app",
  url: "https://campusfood.app",
  tagline: "La food tech de votre campus",
  description:
    "Campus Food réunit étudiants, restaurants et livreurs : commandez, payez en Mobile Money ou en espèces et suivez votre livraison sur le campus.",
} as const;

/** Adresse professionnelle prévue. Elle n'est affichée qu'une fois la boîte créée et vérifiée (NEXT_PUBLIC_CONTACT_EMAIL_READY=true). */
export const contactEmail = {
  address: "contact@campusfood.app",
  ready: process.env.NEXT_PUBLIC_CONTACT_EMAIL_READY === "true",
} as const;

/** Numéro WhatsApp professionnel (chiffres uniquement, indicatif inclus). `null` tant qu'il n'est pas communiqué. */
export function whatsappNumber(): string | null {
  const raw = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/[^\d]/g, "");
  return /^\d{8,15}$/.test(raw) ? raw : null;
}

export function whatsappLink(message?: string): string | null {
  const n = whatsappNumber();
  if (!n) return null;
  return `https://wa.me/${n}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export type SocialLink = { label: string; href: string };

/** Réseaux sociaux officiels : seuls ceux dont l'adresse est configurée apparaissent. */
export function socialLinks(): SocialLink[] {
  const entries: [string, string | undefined][] = [
    ["Facebook", process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK],
    ["Instagram", process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM],
    ["TikTok", process.env.NEXT_PUBLIC_SOCIAL_TIKTOK],
    ["X", process.env.NEXT_PUBLIC_SOCIAL_X],
    ["LinkedIn", process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN],
    ["YouTube", process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE],
  ];
  return entries
    .filter(([, href]) => !!href && /^https:\/\//.test(href.trim()))
    .map(([label, href]) => ({ label, href: href!.trim() }));
}

/** Lancement officiel — informations de l'affiche officielle. */
export const launchEvent = {
  title: "Le grand lancement de Campus Food",
  dateLabel: "Vendredi 23 octobre 2026",
  timeLabel: "À partir de 9 h 30",
  place: "Salle AUF — Université de Kinshasa",
  placeDetail: "Réf. Equity BCDC et la Bibliothèque Centrale",
  /** 23 octobre 2026, 9 h 30, heure de Kinshasa (UTC+1). */
  startsAtIso: "2026-10-23T09:30:00+01:00",
  poster: {
    preview: "/lancement/affiche-lancement.webp",
    full: "/lancement/affiche-lancement.jpg",
    width: 1559,
    height: 2000,
    alt: "Affiche officielle du grand lancement de Campus Food, vendredi 23 octobre 2026 à partir de 9 h 30, Salle AUF de l'Université de Kinshasa",
  },
} as const;

/** Restaurants partenaires officiels (UNIKIN). Aucun menu, tarif ni coordonnée n'est affiché ici. */
export const officialPartners = [
  {
    name: "La Grappe",
    logo: "/partenaires/la-grappe.png",
    width: 234,
    height: 141,
    alt: "Logo du restaurant La Grappe",
  },
  {
    name: "Arlo Pop's",
    logo: "/partenaires/arlo-pops.png",
    width: 455,
    height: 455,
    alt: "Logo du restaurant Arlo Pop's",
  },
  {
    name: "Niam's",
    logo: "/partenaires/niams.png",
    width: 756,
    height: 600,
    alt: "Logo du restaurant Resto Collectif Niam's",
  },
] as const;
