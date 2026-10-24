import type { Metadata } from "next";
import { DeleteAccountPage } from "@/components/account/DeleteAccountPage";

export const metadata: Metadata = {
  title: "Demande de suppression de compte — Pro",
  description: "Demandez l'examen manuel de la fermeture d'un compte Campus Food Pro. Le formulaire enregistre la demande et ne supprime pas le compte.",
  alternates: { canonical: "/delete-account/pro" },
};

export default function Page() {
  return <DeleteAccountPage app="pro" />;
}
