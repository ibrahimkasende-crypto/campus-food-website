import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Conditions d'utilisation — Campus Food",
  description: "Règles d'utilisation de l'application et du site Campus Food.",
  alternates: { canonical: "/conditions" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Conditions d'utilisation" subtitle="Les règles qui encadrent l'utilisation de Campus Food.">
      <section>
        <h2>Le service</h2>
        <p>Campus Food met en relation des clients, des restaurants et vendeurs partenaires et des livreurs sur les campus universitaires. Campus Food est la plateforme : la préparation des plats incombe aux restaurants, la livraison aux livreurs.</p>
      </section>
      <section>
        <h2>Compte</h2>
        <p>Le compte est personnel et lié à votre numéro de téléphone. Vous êtes responsable de l&apos;usage fait avec votre compte et devez fournir des informations exactes.</p>
      </section>
      <section>
        <h2>Commandes et paiement</h2>
        <ul>
          <li>Les prix et la disponibilité sont ceux affichés par les restaurants au moment de la commande.</li>
          <li>Les commandes actuelles se paient en espèces.</li>
          <li>Une commande n&apos;est considérée comme livrée qu&apos;après la confirmation du paiement.</li>
          <li>Les annulations et remboursements suivent les règles affichées dans l&apos;application (<em>détail à confirmer</em>).</li>
        </ul>
      </section>
      <section>
        <h2>Comportement attendu</h2>
        <p>Respect des restaurateurs et des livreurs, absence de fraude et d&apos;usage détourné du service. Les comptes qui ne respectent pas ces règles peuvent être suspendus.</p>
      </section>
      <section>
        <h2>Responsabilité et évolution</h2>
        <p>Nous mettons tout en œuvre pour assurer la continuité du service sans pouvoir garantir une disponibilité permanente. Ces conditions peuvent évoluer ; la version en vigueur est celle publiée sur cette page. Le droit applicable et la juridiction compétente sont <em>à préciser</em>.</p>
      </section>
    </LegalPage>
  );
}
