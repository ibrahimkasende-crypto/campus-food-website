/**
 * Demande publique de suppression de compte.
 * La validation est partagée entre le formulaire et le serveur. Elle n'interroge pas la base :
 * un numéro ou un e-mail ne prouve pas l'identité et ne déclenche aucune suppression.
 */

export const DELETION_APPS = ["client", "driver", "pro"] as const;

export type DeletionApp = (typeof DELETION_APPS)[number];

export type DeletionErrors = Partial<Record<"app" | "contact" | "message", string>>;

export type DeletionClean = {
  app: DeletionApp;
  contact: string;
  contactKind: "phone" | "email";
  message: string;
};

const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function isDeletionApp(value: string): value is DeletionApp {
  return (DELETION_APPS as readonly string[]).includes(value);
}

/** Même règle que les demandes de partenariat : 00243…, 0XXXXXXXXX national, espaces ignorés. */
function normalizePhone(raw: string): string {
  let v = raw.trim().replace(/[\s.\-()]/g, "");
  if (v.startsWith("00")) v = `+${v.slice(2)}`;
  if (/^0\d{9}$/.test(v)) v = `+243${v.slice(1)}`;
  return /^\+?\d{8,15}$/.test(v) ? v : "";
}

export function validateDeletionRequest(
  contactRaw: string,
  messageRaw: string,
  appRaw: string,
): {
  ok: boolean;
  errors: DeletionErrors;
  clean: DeletionClean;
} {
  const errors: DeletionErrors = {};
  const typed = contactRaw.trim();
  const message = messageRaw.trim().replace(/\s+/g, " ");
  const app = isDeletionApp(appRaw) ? appRaw : "client";
  let contact = "";
  let contactKind: "phone" | "email" = "phone";

  if (!isDeletionApp(appRaw)) {
    errors.app = "Indiquez l'application : Client, Livreur ou Pro.";
  }

  if (!typed) {
    errors.contact = "Indiquez le numéro de téléphone ou l'adresse e-mail du compte.";
  } else if (typed.includes("@")) {
    contactKind = "email";
    contact = typed.toLowerCase();
    if (contact.length > 160 || !emailPattern.test(contact)) {
      errors.contact = "Cette adresse e-mail n'est pas valide.";
    }
  } else {
    contact = normalizePhone(typed);
    if (!contact) errors.contact = "Ce numéro n'est pas valide. Exemple : +243 81 000 0000.";
  }

  if (message.length > 2000) errors.message = "Le message ne peut pas dépasser 2 000 caractères.";

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    clean: { app, contact, contactKind, message },
  };
}
