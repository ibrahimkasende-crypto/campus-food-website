import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { PrivacyHub } from "@/components/legal/PrivacyHub";
import { privacyUpdated } from "@/lib/privacyApps";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Pro",
  description: "Données utilisées par l'application Campus Food Pro et manière de demander la fermeture d'un compte.",
  alternates: { canonical: "/confidentialite/pro" },
};

export default function ProPrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité — Pro"
      subtitle="Application Campus Food Pro, pour les restaurants et commerçants."
      updated={privacyUpdated}
      provisional={false}
    >
      <PrivacyHub current="pro" />
      <section>
        <h2>1. Présentation</h2>
        <p>Cette page concerne uniquement Campus Food Pro.</p>
      </section>
      <section>
        <h2>2. Données utilisées</h2>
        <ul>
          <li>le compte du responsable : nom, téléphone, adresse e-mail, photo ou logo ;</li>
          <li>le restaurant : nom, adresse saisie et menu, y compris les photos des plats ;</li>
          <li>les commandes reçues : plats, montant, statut et adresse de livraison fournie par le client ;</li>
          <li>les notifications du compte ;</li>
          <li>les écritures liées aux ventes, lorsqu&apos;elles existent.</li>
        </ul>
        <p>
          Les commandes actuelles sont payées en espèces par le client. Pro n&apos;utilise pas le GPS du téléphone : elle
          affiche l&apos;adresse déjà enregistrée pour la commande.
        </p>
        <p>Le compte et les commandes sont hébergés avec Supabase.</p>
      </section>
      <section>
        <h2>3. Utilisation</h2>
        <p>Gérer le restaurant, recevoir et préparer les commandes, suivre les ventes et sécuriser le compte.</p>
      </section>
      <section>
        <h2>4. Partage</h2>
        <p>
          Le client et le livreur concernés reçoivent les informations nécessaires à la commande. Campus Food ne vend pas
          ces données.
        </p>
      </section>
      <section>
        <h2>5. Conservation et fermeture</h2>
        <p>
          Les commandes et les écritures de ventes peuvent devoir être conservées pour la comptabilité et la prévention de
          la fraude. Aucune durée chiffrée n&apos;est fixée.
        </p>
        <p>
          La fermeture n&apos;est pas automatique : une demande sur{" "}
          <Link className="font-bold text-brand-secondary underline" href="/delete-account/pro">
            la page Pro
          </Link>{" "}
          est examinée manuellement, notamment s&apos;il existe un historique de ventes ou un solde. Le mécanisme actuel ne
          ferme pas un compte Pro.
        </p>
      </section>
      <section>
        <h2>6. Contact</h2>
        <p>
          <a className="font-bold text-brand-secondary underline" href="mailto:contact@campusfood.app">
            contact@campusfood.app
          </a>
          <br />
          <a className="font-bold text-brand-secondary underline" href="https://campusfood.app">
            https://campusfood.app
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
