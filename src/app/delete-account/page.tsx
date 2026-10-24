import type { Metadata } from "next";
import { DeleteAccountPage } from "@/components/account/DeleteAccountPage";

export const metadata: Metadata = {
  title: "Demande de suppression de compte",
  description: "Demandez la suppression de votre compte Campus Food Client. La demande est enregistrée, le compte n'est pas supprimé par ce formulaire.",
  alternates: { canonical: "/delete-account" },
};

export default function Page() {
  return <DeleteAccountPage app="client" />;
}
