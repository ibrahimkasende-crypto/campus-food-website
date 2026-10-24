import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";
import { PrivacyHub } from "@/components/legal/PrivacyHub";
import { privacyUpdated } from "@/lib/privacyApps";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Campus Food",
  description: "Comment l'application Campus Food Client collecte, utilise, conserve et protège les données personnelles.",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      subtitle="Application Campus Food Client."
      updated={privacyUpdated}
      provisional={false}
    >
      <PrivacyHub current="client" />
      <section>
        <h2>1. Présentation</h2>
        <p>
          Cette page concerne l&apos;application Campus Food Client, qui permet de commander auprès des restaurants du
          campus. Livreur et Pro ont leur propre page.
        </p>
      </section>
      <section>
        <h2>2. Données utilisées</h2>
        <p>Selon les fonctions réellement utilisées :</p>
        <ul>
          <li>le compte : nom, numéro de téléphone, adresse e-mail, photo de profil et code de sécurité ;</li>
          <li>les commandes : plats, montant, historique et statut ;</li>
          <li>la livraison : adresse ou lieu de remise ;</li>
          <li>
            la position, seulement si vous l&apos;autorisez, pendant que l&apos;application est ouverte ou pendant le suivi
            d&apos;une commande. Aucune position n&apos;est demandée en arrière-plan ;
          </li>
          <li>les notifications enregistrées pour le compte.</li>
        </ul>
        <p>Les commandes actuelles se paient en espèces. Campus Food n&apos;enregistre pas de numéro de carte.</p>
        <p>
          Pour afficher une adresse lisible, les coordonnées peuvent être envoyées à OpenStreetMap (Nominatim), sans
          identifiant de compte. Les cartes et l&apos;itinéraire utilisent aussi OpenStreetMap.
        </p>
        <p>
          Le compte, les commandes et les fichiers sont hébergés avec Supabase. Un code SMS peut être envoyé pour
          confirmer un numéro de téléphone.
        </p>
      </section>
      <section>
        <h2>3. Utilisation</h2>
        <p>
          Créer et protéger le compte, afficher les restaurants, enregistrer et suivre la commande, organiser la remise,
          répondre au support et prévenir les usages frauduleux.
        </p>
      </section>
      <section>
        <h2>4. Partage</h2>
        <p>Le restaurant et le livreur concernés reçoivent les informations nécessaires à la commande.</p>
        <p>
          Les prestataires cités ci-dessus n&apos;interviennent que pour l&apos;hébergement, l&apos;authentification, les SMS, les
          cartes et les adresses. Campus Food ne vend pas ces données.
        </p>
      </section>
      <section>
        <h2>5. Conservation</h2>
        <p>
          Les données restent le temps du service, de la sécurité et des obligations légales, puis sont supprimées ou
          anonymisées. Aucune durée chiffrée n&apos;est indiquée.
        </p>
      </section>
      <section>
        <h2>6. Sécurité</h2>
        <p>
          Campus Food met en œuvre des mesures techniques et organisationnelles raisonnables. Aucun système n&apos;est
          absolument sûr.
        </p>
      </section>
      <section>
        <h2>7. Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression, sous réserve des obligations légales.
          Écrivez à{" "}
          <a className="font-bold text-brand-secondary underline" href="mailto:contact@campusfood.app">
            contact@campusfood.app
          </a>{" "}
          ou envoyez une{" "}
          <Link className="font-bold text-brand-secondary underline" href="/delete-account">
            demande de suppression de compte
          </Link>
          . L&apos;envoi du formulaire enregistre la demande. Il ne supprime pas le compte à lui seul.
        </p>
      </section>
      <section>
        <h2>8. Mineurs</h2>
        <p>Le service s&apos;adresse à un public universitaire et n&apos;est pas conçu pour les enfants.</p>
      </section>
      <section>
        <h2>9. Modifications</h2>
        <p>La version publiée sur cette page fait foi, avec sa date de mise à jour.</p>
      </section>
      <section>
        <h2>10. Contact</h2>
        <p>
          <strong>Campus Food</strong>
          <br />
          E-mail :{" "}
          <a className="font-bold text-brand-secondary underline" href="mailto:contact@campusfood.app">
            contact@campusfood.app
          </a>
          <br />
          Site web :{" "}
          <a className="font-bold text-brand-secondary underline" href="https://campusfood.app">
            https://campusfood.app
          </a>
        </p>
      </section>
    </LegalPage>
  );
}
