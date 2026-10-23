import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Campus Food",
  description: "Comment Campus Food collecte, utilise, conserve et protège les données personnelles.",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      subtitle="Comment Campus Food collecte, utilise et protège les données personnelles."
      updated="23 octobre 2026"
      provisional={false}
    >
      <section>
        <h2>1. Présentation</h2>
        <p>
          Campus Food est une application numérique destinée à faciliter la mise en relation entre les étudiants, les
          restaurants, les vendeurs et les services de livraison au sein des communautés universitaires.
        </p>
        <p>
          La présente politique explique comment Campus Food collecte, utilise, conserve et protège les données
          personnelles des utilisateurs.
        </p>
      </section>
      <section>
        <h2>2. Données collectées</h2>
        <p>Selon les fonctionnalités utilisées, Campus Food peut traiter les catégories de données suivantes :</p>
        <ul>
          <li>
            <strong>Informations de compte :</strong> nom, numéro de téléphone, adresse e-mail et informations
            nécessaires à la création du compte.
          </li>
          <li>
            <strong>Commandes :</strong> repas sélectionnés, montant, historique des commandes et statut de livraison.
          </li>
          <li>
            <strong>Livraison :</strong> adresse ou indications nécessaires à la remise de la commande et, uniquement si
            cette fonctionnalité est activée, données de localisation.
          </li>
          <li>
            <strong>Paiement :</strong> mode de paiement choisi et informations relatives au statut de la transaction.
            Les données bancaires complètes ne sont pas collectées par Campus Food si le paiement est effectué
            directement en espèces.
          </li>
          <li>
            <strong>Données techniques :</strong> informations nécessaires au fonctionnement, à la sécurité et au
            diagnostic des erreurs de l&apos;application.
          </li>
        </ul>
        <p>Les données effectivement collectées dépendent des autorisations accordées et des fonctionnalités disponibles.</p>
      </section>
      <section>
        <h2>3. Utilisation des données</h2>
        <p>Les données sont utilisées pour :</p>
        <ul>
          <li>créer et gérer les comptes utilisateurs ;</li>
          <li>afficher les restaurants, les vendeurs et leurs produits ;</li>
          <li>enregistrer et traiter les commandes ;</li>
          <li>organiser la préparation et la livraison ;</li>
          <li>communiquer avec les utilisateurs au sujet de leurs commandes ;</li>
          <li>prévenir les utilisations frauduleuses et sécuriser les comptes ;</li>
          <li>résoudre les problèmes techniques et améliorer le service.</li>
        </ul>
      </section>
      <section>
        <h2>4. Partage des données</h2>
        <p>
          Certaines informations nécessaires au traitement d&apos;une commande peuvent être communiquées aux restaurants,
          aux vendeurs et aux livreurs concernés.
        </p>
        <p>
          Des prestataires techniques peuvent également traiter certaines données pour assurer l&apos;hébergement,
          l&apos;authentification, l&apos;envoi de SMS ou le fonctionnement de la plateforme.
        </p>
        <p>
          Ces informations doivent être limitées à ce qui est nécessaire à leurs missions. Campus Food ne vend pas les
          données personnelles des utilisateurs à des tiers à des fins commerciales.
        </p>
      </section>
      <section>
        <h2>5. Conservation des données</h2>
        <p>
          Les données sont conservées pendant la durée nécessaire à la fourniture du service, à la gestion des
          commandes, à la sécurité et au respect des obligations légales applicables.
        </p>
        <p>
          Lorsqu&apos;elles ne sont plus nécessaires, elles sont supprimées ou anonymisées, sous réserve des obligations
          légales de conservation.
        </p>
      </section>
      <section>
        <h2>6. Sécurité</h2>
        <p>
          Campus Food met en œuvre des mesures techniques et organisationnelles raisonnables pour protéger les données
          contre l&apos;accès non autorisé, la perte, la divulgation ou l&apos;altération.
        </p>
        <p>
          Aucun système informatique ne pouvant garantir une sécurité absolue, nous nous efforçons d&apos;améliorer
          continuellement nos dispositifs de protection.
        </p>
      </section>
      <section>
        <h2>7. Droits des utilisateurs</h2>
        <p>
          Les utilisateurs peuvent demander l&apos;accès à leurs données, leur rectification ou leur suppression, ainsi
          que formuler toute question relative à leur traitement, sous réserve des obligations légales applicables.
        </p>
        <p>
          Pour exercer ces droits, ils peuvent contacter Campus Food à l&apos;adresse indiquée dans la section « Contact »,
          ou envoyer une{" "}
          <Link className="font-bold text-brand-secondary underline" href="/delete-account">
            demande de suppression de compte
          </Link>
          .
        </p>
      </section>
      <section>
        <h2>8. Mineurs</h2>
        <p>
          Campus Food est destiné à un public universitaire et n&apos;est pas conçu spécifiquement pour les enfants. Les
          personnes qui ne sont pas autorisées à utiliser le service selon les règles applicables ne doivent pas créer
          de compte.
        </p>
      </section>
      <section>
        <h2>9. Modifications</h2>
        <p>
          Cette politique peut être mise à jour pour refléter les évolutions de Campus Food, de ses fonctionnalités ou
          des obligations légales. La version actualisée sera publiée sur cette page avec sa date de mise à jour.
        </p>
      </section>
      <section>
        <h2>10. Contact</h2>
        <p>Pour toute question concernant cette politique ou les données personnelles, contactez :</p>
        <p>
          <strong>Campus Food</strong>
          <br />
          E-mail : <a className="font-bold text-brand-secondary underline" href="mailto:contact@campusfood.app">contact@campusfood.app</a>
          <br />
          Site web : <a className="font-bold text-brand-secondary underline" href="https://campusfood.app">https://campusfood.app</a>
        </p>
        <p>Cette politique concerne l&apos;application Campus Food et ses services associés.</p>
      </section>
    </LegalPage>
  );
}
