import type { DeletionApp } from "@/lib/deletionRequest";

export const privacyApps: {
  id: DeletionApp;
  label: string;
  privacyHref: string;
  deletionHref: string;
}[] = [
  { id: "client", label: "Campus Food Client", privacyHref: "/confidentialite", deletionHref: "/delete-account" },
  { id: "driver", label: "Campus Food Livreur", privacyHref: "/confidentialite/livreur", deletionHref: "/delete-account/livreur" },
  { id: "pro", label: "Campus Food Pro", privacyHref: "/confidentialite/pro", deletionHref: "/delete-account/pro" },
];

export const privacyUpdated = "24 octobre 2026";
