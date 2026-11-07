import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { PrivacyHub } from "@/components/legal/PrivacyHub";

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
      updated="7 novembre 2026"
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
        <h2>5. Demande de suppression et conservation des données</h2>
        <p>Le livreur peut demander la suppression de son compte directement depuis l&apos;application Campus Food Livreur, dans la rubrique :</p>
        <p>
          <strong>Profil → Paramètres → Confidentialité et sécurité → Demander la suppression de mon compte.</strong>
        </p>
        <p>
          Après confirmation, la demande est transmise à l&apos;administration de Campus Food pour examen. Le compte reste
          actif pendant cet examen.
        </p>
        <p>
          <strong>Vérifications préalables.</strong> Avant de procéder à la suppression définitive, l&apos;administration
          peut vérifier les éléments nécessaires à la clôture de la relation avec le livreur, notamment :
        </p>
        <ul>
          <li>les livraisons et commandes encore en cours ;</li>
          <li>les espèces encaissées qui doivent être reversées à Campus Food ;</li>
          <li>le solde du portefeuille et les rémunérations non réglées ;</li>
          <li>les retraits et versements en attente ;</li>
          <li>les éventuelles obligations opérationnelles ou contractuelles restantes.</li>
        </ul>
        <p>Si une régularisation est nécessaire, le livreur est informé des éléments à résoudre et du statut de sa demande.</p>
        <p>
          <strong>Traitement de la demande.</strong> Après vérification et approbation, le compte est supprimé ou ses
          données personnelles sont anonymisées, selon les obligations applicables.
        </p>
        <p>
          Les données personnelles qui ne sont plus nécessaires sont supprimées. Certaines informations relatives aux
          commandes, livraisons, paiements et opérations comptables peuvent être conservées lorsqu&apos;elles sont
          nécessaires à la comptabilité, à la prévention de la fraude ou au respect d&apos;obligations légales. Aucune durée
          chiffrée n&apos;est fixée. Les durées restent à confirmer.
        </p>
        <p>Le livreur est informé de l&apos;évolution de sa demande et de son traitement.</p>
        <p>
          Une demande envoyée depuis{" "}
          <Link className="font-bold text-brand-secondary underline" href="/delete-account/livreur">
            la page Livreur
          </Link>{" "}
          est également examinée. Ce formulaire enregistre la demande. Il ne ferme pas le compte à lui seul.
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
