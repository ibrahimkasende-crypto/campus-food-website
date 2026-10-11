import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Politique de confidentialité — Campus Food",
  description: "Quelles données Campus Food collecte, pourquoi, et comment exercer vos droits.",
  alternates: { canonical: "/confidentialite" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Politique de confidentialité" subtitle="Quelles données nous utilisons, pourquoi, et vos droits.">
      <section>
        <h2>Données que nous utilisons</h2>
        <ul>
          <li><strong>Compte :</strong> numéro de téléphone (vérifié par un code reçu par SMS), nom ou pseudo, photo de profil facultative.</li>
          <li><strong>Commandes :</strong> restaurants, plats, montants, adresse ou point de livraison, notes laissées à la commande, historique.</li>
          <li><strong>Localisation :</strong> utilisée pour la livraison et le suivi de la commande ; celle du livreur n&apos;est partagée qu&apos;avec le client concerné pendant la course.</li>
          <li><strong>Paiement :</strong> mode choisi (Mobile Money, espèces, portefeuille) et références de transaction. Les identifiants de vos moyens de paiement sont traités par les prestataires de paiement.</li>
          <li><strong>Notifications :</strong> identifiant technique de votre appareil pour envoyer les alertes de commande.</li>
          <li><strong>Restaurants partenaires (formulaire du site) :</strong> nom du restaurant et du responsable, téléphone, adresse, e-mail facultatif et message, uniquement pour vous recontacter.</li>
        </ul>
      </section>
      <section>
        <h2>Pourquoi</h2>
        <p>Créer et sécuriser votre compte, traiter et livrer vos commandes, gérer les paiements et les remboursements, vous informer de l&apos;avancement d&apos;une commande, prévenir la fraude et améliorer le service.</p>
      </section>
      <section>
        <h2>Qui voit quoi</h2>
        <p>Le restaurant voit les plats commandés et le prénom du client ; le livreur voit le point de livraison nécessaire à la course. Les autres utilisateurs ne voient pas vos données. Nous ne vendons pas vos données personnelles.</p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>Vous pouvez demander l&apos;accès, la correction ou la suppression de vos données, et vous opposer à certains usages. Écrivez-nous depuis la page <Link href="/contact" className="font-bold text-brand-secondary underline">Contact</Link>.</p>
      </section>
      <section>
        <h2>Conservation et sécurité</h2>
        <p>Les données sont conservées le temps nécessaire au service et aux obligations légales (durées précises <em>à confirmer</em>). L&apos;accès est protégé par des règles d&apos;autorisation strictes côté serveur ; les transmissions sont chiffrées.</p>
      </section>
    </LegalPage>
  );
}
