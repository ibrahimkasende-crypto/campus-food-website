/**
 * Équipe, entreprise et histoire de Campus Food — SEUL fichier à modifier quand l'équipe évolue.
 *
 * Règle : uniquement des noms, fonctions et descriptions confirmés. Aucun diplôme, parcours, distinction ni titre
 * supplémentaire n'est affiché tant qu'il n'a pas été confirmé. Les photos sont les originaux fournis (dossier
 * `public/Fondateurs/`, noms de fichiers conservés tels quels : l'hébergement distingue majuscules et minuscules).
 */

export type Person = {
  name: string;
  role: string;
  bio: string;
  /** Rattachement confirmé (source : site officiel de New System Corporation). */
  affiliation?: string;
  photo: string;
  width: number;
  height: number;
  /** Cadrage du portrait dans la carte (CSS object-position) : garde le visage bien placé. */
  focus: string;
};

/** Fondateurs. */
export const founders: Person[] = [
  {
    name: "Ibrahim Kasende Tshampa",
    role: "Initiateur et fondateur de Campus Food",
    affiliation: "Cofondateur de New System Corporation — Technologie & Innovation",
    bio: "À l'origine du projet Campus Food, il porte la vision de solutions numériques qui répondent aux besoins des étudiants, des restaurants et des communautés universitaires.",
    photo: "/Fondateurs/Ibrahim_Kasende_Tshampa.jpeg",
    width: 960,
    height: 1280,
    focus: "50% 16%",
  },
  {
    name: "Dan-Fernandel Muamba Mukolo",
    role: "Directeur général",
    affiliation: "Cofondateur de New System Corporation — Administration & Business",
    bio: "Directeur général de l'entreprise, il pilote ses activités et en assure la gestion, notamment les finances et la gestion associée.",
    photo: "/Fondateurs/Dan-Fernandel_Muamba_Mukolo.jpeg",
    width: 719,
    height: 1080,
    focus: "50% 14%",
  },
];

/** Équipe dirigeante (hors fondateurs) : à renseigner quand les personnes et leurs fonctions sont confirmées. */
export const leadership: Person[] = [];

/** Partenaires institutionnels : à renseigner une fois les partenariats confirmés. */
export type InstitutionalPartner = { name: string; role: string; logo?: string; width?: number; height?: number };
export const institutionalPartners: InstitutionalPartner[] = [];

/** Entreprise qui porte le produit. Campus Food n'est pas présenté comme une société juridiquement indépendante. */
export const company = {
  name: "New System Corporation",
  url: "https://newsystemcorps.com/",
  logo: "/new-system/logo-new-system.png",
  logoWidth: 612,
  logoHeight: 408,
  statement: "Campus Food est le premier produit développé dans l'écosystème de New System Corporation.",
} as const;

/** Histoire, problème et vision — textes sobres, sans chiffre ni date non confirmés. */
export const story = {
  origin:
    "Campus Food est né d'une idée simple : utiliser le numérique pour faciliter le quotidien des communautés universitaires. Le projet est porté par Ibrahim Kasende Tshampa et piloté par Dan-Fernandel Muamba Mukolo, au sein de New System Corporation. Son premier campus est l'Université de Kinshasa (UNIKIN).",
  problem:
    "Pour les étudiants, se restaurer entre deux cours doit être rapide, fiable et simple à payer. Pour les restaurateurs du campus, gagner en visibilité auprès des étudiants et gérer les commandes sans complication reste un défi.",
  vision:
    "Faire de Campus Food une plateforme de référence pour les campus universitaires : réunir étudiants, restaurants et livreurs autour d'une application qui fonctionne avec Mobile Money comme en espèces, et l'étendre campus après campus.",
} as const;
