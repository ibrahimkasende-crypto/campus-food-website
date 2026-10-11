/** Validation partagée (formulaire et serveur) des demandes « Devenir restaurant partenaire ». */

export type PartnerRequestInput = {
  restaurantName: string;
  managerName: string;
  phone: string;
  address: string;
  email: string;
  message: string;
};

export type PartnerRequestErrors = Partial<Record<keyof PartnerRequestInput, string>>;

export const limits = {
  name: { min: 2, max: 120 },
  address: { min: 3, max: 300 },
  email: { max: 160 },
  message: { max: 2000 },
} as const;

/**
 * Normalise un numéro : « 00243… » → « +243… », « 0 8x xxx xxxx » (national) → « +2438… » ; espaces, points et
 * tirets supprimés. Renvoie une chaîne vide si le format n'est pas plausible.
 */
export function normalizePhone(raw: string): string {
  let v = raw.trim().replace(/[\s.\-()]/g, "");
  if (v.startsWith("00")) v = `+${v.slice(2)}`;
  if (/^0\d{9}$/.test(v)) v = `+243${v.slice(1)}`;
  return /^\+?\d{8,15}$/.test(v) ? v : "";
}

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function validatePartnerRequest(input: PartnerRequestInput): {
  ok: boolean;
  errors: PartnerRequestErrors;
  clean: PartnerRequestInput;
} {
  const clean: PartnerRequestInput = {
    restaurantName: input.restaurantName.trim().replace(/\s+/g, " "),
    managerName: input.managerName.trim().replace(/\s+/g, " "),
    phone: normalizePhone(input.phone),
    address: input.address.trim().replace(/\s+/g, " "),
    email: input.email.trim().toLowerCase(),
    message: input.message.trim(),
  };
  const errors: PartnerRequestErrors = {};

  if (clean.restaurantName.length < limits.name.min) errors.restaurantName = "Indiquez le nom du restaurant.";
  else if (clean.restaurantName.length > limits.name.max) errors.restaurantName = "Ce nom est trop long.";

  if (clean.managerName.length < limits.name.min) errors.managerName = "Indiquez le nom du responsable.";
  else if (clean.managerName.length > limits.name.max) errors.managerName = "Ce nom est trop long.";

  if (!input.phone.trim()) errors.phone = "Indiquez un numéro de téléphone ou WhatsApp.";
  else if (!clean.phone) errors.phone = "Numéro invalide. Exemple : +243 8X XXX XXXX.";

  if (clean.address.length < limits.address.min) errors.address = "Indiquez l'adresse ou l'emplacement du restaurant.";
  else if (clean.address.length > limits.address.max) errors.address = "Cette adresse est trop longue.";

  if (clean.email && (!emailPattern.test(clean.email) || clean.email.length > limits.email.max)) {
    errors.email = "Adresse e-mail invalide.";
  }
  if (clean.message.length > limits.message.max) {
    errors.message = `Message trop long (${limits.message.max} caractères maximum).`;
  }
  return { ok: Object.keys(errors).length === 0, errors, clean };
}
