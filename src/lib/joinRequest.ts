/**
 * « Rejoindre Campus Food » : définition des trois formulaires (restaurant, livreur, partenaire institutionnel ou
 * commercial), validation partagée entre le navigateur et le serveur, et conversion vers la table `partner_requests`.
 * Pour ajouter ou retirer un champ, il suffit de modifier `forms` ci-dessous (et la validation du déclencheur SQL).
 */
import { normalizePhone } from "@/lib/partnerRequest";

export type JoinType = "restaurant" | "driver" | "institution";

export type FieldDef = {
  key: string;
  label: string;
  kind: "text" | "tel" | "email" | "textarea" | "select" | "url";
  required: boolean;
  min?: number;
  max: number;
  placeholder?: string;
  hint?: string;
  options?: { value: string; label: string }[];
  /** Occupe toute la largeur sur ordinateur. */
  wide?: boolean;
  autoComplete?: string;
};

export type FormDef = {
  type: JoinType;
  tab: string;
  title: string;
  intro: string;
  submit: string;
  fields: FieldDef[];
};

const phone: FieldDef = {
  key: "phone", label: "Téléphone / WhatsApp", kind: "tel", required: true, max: 24, placeholder: "+243 …",
  hint: "Avec l'indicatif si possible (+243…).", autoComplete: "tel",
};
const email = (required: boolean): FieldDef => ({ key: "email", label: "Adresse e-mail", kind: "email", required, max: 160, autoComplete: "email" });
const message: FieldDef = { key: "message", label: "Message ou informations complémentaires", kind: "textarea", required: false, max: 2000, wide: true };

export const forms: Record<JoinType, FormDef> = {
  restaurant: {
    type: "restaurant",
    tab: "Restaurant",
    title: "Devenir partenaire restaurant",
    intro: "Restaurants, snacks, cafétérias et autres établissements qui souhaitent vendre leurs plats sur Campus Food.",
    submit: "Envoyer ma demande de partenariat",
    fields: [
      { key: "organization", label: "Nom du restaurant ou de l'établissement", kind: "text", required: true, min: 2, max: 120, wide: true, placeholder: "Ex. Chez Marie", autoComplete: "organization" },
      { key: "fullName", label: "Nom complet du responsable", kind: "text", required: true, min: 2, max: 120, autoComplete: "name" },
      phone,
      email(false),
      {
        key: "establishmentType", label: "Type d'établissement", kind: "select", required: true, max: 30,
        options: [
          { value: "restaurant", label: "Restaurant" }, { value: "snack", label: "Snack / fast-food" }, { value: "cafeteria", label: "Cafétéria" },
          { value: "boulangerie", label: "Boulangerie / pâtisserie" }, { value: "autre", label: "Autre" },
        ],
      },
      { key: "address", label: "Adresse ou localisation", kind: "text", required: true, min: 3, max: 300, wide: true, placeholder: "Ex. Campus UNIKIN, près de la Bibliothèque Centrale", autoComplete: "street-address" },
      { key: "activity", label: "Description courte de l'activité", kind: "textarea", required: true, min: 10, max: 600, wide: true, placeholder: "Type de cuisine, horaires, capacité…" },
      { key: "socialUrl", label: "Lien vers vos réseaux sociaux", kind: "url", required: false, max: 300, wide: true, placeholder: "https://…" },
      message,
    ],
  },
  driver: {
    type: "driver",
    tab: "Livreur",
    title: "Devenir livreur partenaire",
    intro: "Vous souhaitez effectuer des livraisons sur le campus ? Aucune pièce d'identité n'est demandée à ce stade : les vérifications se feront plus tard, de manière sécurisée.",
    submit: "Envoyer ma candidature de livreur",
    fields: [
      { key: "fullName", label: "Nom complet", kind: "text", required: true, min: 2, max: 120, wide: true, autoComplete: "name" },
      phone,
      email(false),
      { key: "zone", label: "Zone de disponibilité", kind: "text", required: true, min: 2, max: 200, placeholder: "Ex. UNIKIN, Mont-Amba", wide: true },
      {
        key: "transport", label: "Moyen de déplacement", kind: "select", required: true, max: 30,
        options: [
          { value: "moto", label: "Moto" }, { value: "velo", label: "Vélo" }, { value: "a_pied", label: "À pied" },
          { value: "voiture", label: "Voiture" }, { value: "autre", label: "Autre" },
        ],
      },
      { key: "availability", label: "Disponibilité habituelle", kind: "text", required: true, min: 2, max: 200, placeholder: "Ex. Soirs et week-ends" },
      { key: "experience", label: "Expérience de livraison", kind: "textarea", required: false, max: 600, wide: true },
      message,
    ],
  },
  institution: {
    type: "institution",
    tab: "Institution / entreprise",
    title: "Devenir partenaire institutionnel ou commercial",
    intro: "Universités, organisations étudiantes, associations, entreprises : proposez-nous une collaboration.",
    submit: "Envoyer ma proposition de partenariat",
    fields: [
      { key: "organization", label: "Nom de l'organisation", kind: "text", required: true, min: 2, max: 120, wide: true, autoComplete: "organization" },
      { key: "fullName", label: "Nom du responsable ou du contact", kind: "text", required: true, min: 2, max: 120, autoComplete: "name" },
      { key: "role", label: "Fonction", kind: "text", required: true, min: 2, max: 120, autoComplete: "organization-title" },
      phone,
      email(true),
      {
        key: "partnershipType", label: "Type de partenariat recherché", kind: "select", required: true, max: 40,
        options: [
          { value: "universite", label: "Université / établissement" }, { value: "organisation_etudiante", label: "Organisation étudiante" },
          { value: "association", label: "Association" }, { value: "entreprise", label: "Entreprise" },
          { value: "sponsoring", label: "Sponsoring / communication" }, { value: "autre", label: "Autre" },
        ],
      },
      { key: "proposal", label: "Description de la proposition", kind: "textarea", required: true, min: 10, max: 1200, wide: true },
      message,
    ],
  },
};

export type JoinValues = Record<string, string>;
export type JoinErrors = Record<string, string>;

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const urlPattern = /^https?:\/\/[^\s]+$/i;

export function validateJoin(type: JoinType, input: JoinValues, consent: boolean): { ok: boolean; errors: JoinErrors; clean: JoinValues } {
  const def = forms[type];
  const errors: JoinErrors = {};
  const clean: JoinValues = {};
  for (const f of def.fields) {
    let v = String(input[f.key] ?? "");
    v = f.kind === "textarea" ? v.trim() : v.trim().replace(/\s+/g, " ");
    if (f.kind === "email") v = v.toLowerCase();
    if (f.kind === "tel") {
      const n = normalizePhone(v);
      if (!v) errors[f.key] = "Indiquez un numéro de téléphone ou WhatsApp.";
      else if (!n) errors[f.key] = "Numéro invalide. Exemple : +243 8X XXX XXXX.";
      v = n;
    } else if (!v) {
      if (f.required) errors[f.key] = f.kind === "select" ? "Faites un choix." : "Ce champ est obligatoire.";
    } else if (v.length > f.max) {
      errors[f.key] = `Trop long (${f.max} caractères maximum).`;
    } else if (f.min && v.length < f.min) {
      errors[f.key] = `Trop court (${f.min} caractères minimum).`;
    } else if (f.kind === "email" && !emailPattern.test(v)) {
      errors[f.key] = "Adresse e-mail invalide.";
    } else if (f.kind === "url" && !urlPattern.test(v)) {
      errors[f.key] = "Lien invalide : il doit commencer par https://";
    } else if (f.kind === "select" && !f.options?.some((o) => o.value === v)) {
      errors[f.key] = "Choix invalide.";
    }
    clean[f.key] = v;
  }
  if (!consent) errors.consent = "Vous devez confirmer l'exactitude des informations et accepter leur traitement.";
  return { ok: Object.keys(errors).length === 0, errors, clean };
}

/** Ligne à insérer dans `public.partner_requests` (les clés `details` sont celles contrôlées par le déclencheur SQL). */
export function toRow(type: JoinType, v: JoinValues): Record<string, unknown> {
  const base = { request_type: type, manager_name: v.fullName, phone: v.phone, email: v.email || null, message: v.message || null, consent_given: true };
  if (type === "restaurant") {
    return {
      ...base,
      restaurant_name: v.organization,
      address: v.address,
      details: { establishment_type: v.establishmentType, activity: v.activity, social_url: v.socialUrl || undefined },
    };
  }
  if (type === "driver") {
    return { ...base, details: { zone: v.zone, transport: v.transport, availability: v.availability, experience: v.experience || undefined } };
  }
  return {
    ...base,
    restaurant_name: v.organization,
    details: { role: v.role, partnership_type: v.partnershipType, proposal: v.proposal },
  };
}

export const joinTypes: JoinType[] = ["restaurant", "driver", "institution"];
