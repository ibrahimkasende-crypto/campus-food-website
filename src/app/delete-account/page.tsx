import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { CampusLogo } from "@/components/brand/CampusLogo";
import { DeleteAccountForm } from "@/components/account/DeleteAccountForm";
import { PageHero } from "@/components/layout/PageHero";
import { contactEmail, site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Demande de suppression de compte",
  description: "Demandez la suppression de votre compte Campus Food. La suppression n'est pas immédiate : l'identité du titulaire est vérifiée avant toute clôture.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccountPage() {
  const wa = whatsappLink("Bonjour, je souhaite suivre ma demande de suppression de compte Campus Food.");
  return (
    <>
      <PageHero
        title="Demande de suppression de compte"
        subtitle="Cette page publique permet de demander la clôture d'un compte Campus Food, sans connexion préalable."
      />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
        <CampusLogo size="lg" href={null} />

        <section className="space-y-3 text-[15px] leading-relaxed text-brand-muted">
          <h2 className="text-xl font-extrabold text-brand-primary">Comment se passe la suppression</h2>
          <ol className="list-decimal space-y-2 pl-5">
            <li>Vous envoyez cette demande avec le téléphone ou l&apos;e-mail du compte.</li>
            <li>Campus Food vérifie que vous êtes bien le titulaire, en vous recontactant sur ce moyen.</li>
            <li>Ce n&apos;est qu&apos;après cette vérification que le compte peut être clôturé. Le formulaire ne supprime rien tout seul.</li>
          </ol>
        </section>

        <section className="space-y-3 text-[15px] leading-relaxed text-brand-muted">
          <h2 className="text-xl font-extrabold text-brand-primary">Données concernées</h2>
          <p>Selon ce qui a été utilisé sur le compte, la clôture porte sur :</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>le compte : nom, téléphone, adresse e-mail, photo de profil et code de sécurité ;</li>
            <li>les commandes, les plats commandés et leur statut de livraison ;</li>
            <li>l&apos;adresse ou le lieu de remise, et la position si elle a été activée pour une course ;</li>
            <li>les notifications liées au compte.</li>
          </ul>
          <p>
            Les écritures de paiement, les reçus et les mouvements de portefeuille peuvent devoir être conservés pour
            la comptabilité, la sécurité et la prévention de la fraude. Le code actuel empêche d&apos;effacer un compte
            tant que ces écritures ou un solde existent. Aucun délai calendaire de conservation n&apos;a été fixé par le
            responsable de Campus Food : la{" "}
            <Link href="/confidentialite" className="font-bold text-brand-secondary underline">
              politique de confidentialité
            </Link>{" "}
            indique seulement que les données restent le temps du service et des obligations légales, puis sont
            supprimées ou anonymisées.
          </p>
        </section>

        <DeleteAccountForm />

        <section className="rounded-3xl bg-brand-background p-6 text-[15px] leading-relaxed text-brand-muted sm:p-8">
          <h2 className="text-xl font-extrabold text-brand-primary">Suivre une demande</h2>
          <p className="mt-3">
            Pour une question sur cette page ou sur l&apos;avancement d&apos;une demande, écrivez au support Campus Food.
          </p>
          <p className="mt-3">
            <a className="inline-flex items-center gap-2 font-bold text-brand-secondary underline" href={`mailto:${contactEmail.address}`}>
              <Mail className="h-4 w-4" aria-hidden />
              {contactEmail.address}
            </a>
          </p>
          {wa ? (
            <p className="mt-2">
              <a className="font-bold text-brand-secondary underline" href={wa} target="_blank" rel="noopener noreferrer">
                WhatsApp du support
              </a>
            </p>
          ) : null}
          <p className="mt-2">
            Site : <a className="font-bold text-brand-secondary underline" href={site.url}>{site.url}</a>
          </p>
        </section>
      </div>
    </>
  );
}
