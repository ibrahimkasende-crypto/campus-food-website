import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { PrivacyHub } from "@/components/legal/PrivacyHub";
import { privacyUpdated } from "@/lib/privacyApps";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Livreur",
  description: "Données utilisées par l'application Campus Food Livreur et manière de demander la fermeture d'un compte.",
  alternates: { canonical: "/confidentialite/livreur" },
};

export default function DriverPrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité — Livreur"
      subtitle="Application Campus Food Livreur, pour les livreurs validés par Campus Food."
      updated={privacyUpdated}
      provisional={false}
    >
      <PrivacyHub current="driver" />
      <section>
        <h2>1. Présentation</h2>
        <p>Cette page concerne uniquement Campus Food Livreur.</p>
      </section>
      <section>
        <h2>2. Données utilisées</h2>
        <ul>
          <li>le compte : nom, téléphone, adresse e-mail, date de naissance, adresse, photo de profil, mot de passe et code PIN ;</li>
          <li>le moyen de déplacement choisi dans l&apos;application : à pied, vélo, moto, voiture, tricycle ou autre ;</li>
          <li>la zone et les horaires affectés par Campus Food ;</li>
          <li>
            la position pendant une course active, ainsi que la direction, la vitesse et la précision lorsqu&apos;elles sont
            disponibles. Hors course, l&apos;application n&apos;envoie pas la position ;
          </li>
          <li>les espèces encaissées pour les courses et les écritures de caisse liées à ces courses ;</li>
          <li>les notifications du compte.</li>
        </ul>
        <p>
          L&apos;inscription actuelle dans l&apos;application ne demande ni pièce d&apos;identité, ni permis, ni papier du véhicule.
          Aucun de ces documents n&apos;est enregistré.
        </p>
        <p>
          OpenStreetMap peut transformer la position en adresse et calculer l&apos;itinéraire. Le compte et les courses sont
          hébergés avec Supabase.
        </p>
      </section>
      <section>
        <h2>3. Utilisation</h2>
        <p>
          Créer le compte, valider le livreur, proposer et suivre les courses, remettre la commande, suivre les espèces
          encaissées et sécuriser le compte.
        </p>
      </section>
      <section>
        <h2>4. Partage</h2>
        <p>
          Le client et le restaurant concernés reçoivent les informations nécessaires à la course. Campus Food ne vend pas
          ces données.
        </p>
      </section>
      <section>
        <h2>5. Conservation et fermeture</h2>
        <p>
          Les courses et les écritures d&apos;espèces peuvent devoir être conservées pour la comptabilité et la prévention de
          la fraude. Aucune durée chiffrée n&apos;est fixée.
        </p>
        <p>
          La fermeture du compte n&apos;est pas automatique : une demande sur{" "}
          <Link className="font-bold text-brand-secondary underline" href="/delete-account/livreur">
            la page Livreur
          </Link>{" "}
          est examinée manuellement, notamment lorsqu&apos;il reste des espèces à reverser ou un historique de courses. Le
          mécanisme actuel ne ferme pas un compte livreur.
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
