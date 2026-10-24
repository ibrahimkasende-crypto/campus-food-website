import Link from "next/link";
import { Mail } from "lucide-react";
import { CampusLogo } from "@/components/brand/CampusLogo";
import { DeleteAccountForm } from "@/components/account/DeleteAccountForm";
import { PageHero } from "@/components/layout/PageHero";
import type { DeletionApp } from "@/lib/deletionRequest";
import { privacyApps } from "@/lib/privacyApps";
import { contactEmail, site, whatsappLink } from "@/lib/site";

const copy: Record<
  DeletionApp,
  { title: string; subtitle: string; steps: string[]; data: string; privacyHref: string; privacyLabel: string }
> = {
  client: {
    title: "Demande de suppression de compte",
    subtitle: "Application Campus Food Client. Cette page enregistre une demande. Elle ne supprime pas le compte.",
    steps: [
      "Vous indiquez l'application Client, puis le téléphone ou l'e-mail du compte.",
      "Campus Food vérifie que vous êtes le titulaire, en vous recontactant sur ce moyen.",
      "Ensuite seulement, le compte peut être clôturé. Le formulaire ne le fait pas tout seul.",
    ],
    data: "Celles de la politique Client. Les commandes et les paiements en espèces déjà enregistrés peuvent être conservés pour la comptabilité et la fraude. Aucune durée chiffrée n'est fixée.",
    privacyHref: "/confidentialite",
    privacyLabel: "politique Client",
  },
  driver: {
    title: "Demande de suppression de compte — Livreur",
    subtitle: "Application Campus Food Livreur. Cette page enregistre une demande. Elle ne supprime pas le compte.",
    steps: [
      "Vous indiquez l'application Livreur, puis le téléphone ou l'e-mail du compte.",
      "Campus Food vérifie que vous êtes le titulaire, en vous recontactant sur ce moyen.",
      "Le compte livreur n'est pas fermé automatiquement. La demande est examinée manuellement, notamment s'il reste des espèces à reverser ou un historique de courses. Aucune date n'est garantie.",
    ],
    data: "Celles de la politique Livreur. Les courses et les écritures d'espèces peuvent être conservées pour la comptabilité et la fraude. Aucune durée chiffrée n'est fixée.",
    privacyHref: "/confidentialite/livreur",
    privacyLabel: "politique Livreur",
  },
  pro: {
    title: "Demande de suppression de compte — Pro",
    subtitle: "Application Campus Food Pro. Cette page enregistre une demande. Elle ne supprime pas le compte.",
    steps: [
      "Vous indiquez l'application Pro, puis le téléphone ou l'e-mail du compte.",
      "Campus Food vérifie que vous êtes le titulaire, en vous recontactant sur ce moyen.",
      "Le compte restaurant n'est pas fermé automatiquement. L'examen est manuel, notamment en cas d'historique de ventes ou de solde. Aucune date n'est garantie.",
    ],
    data: "Celles de la politique Pro. Les commandes et les écritures de ventes peuvent être conservées pour la comptabilité et la fraude. Aucune durée chiffrée n'est fixée.",
    privacyHref: "/confidentialite/pro",
    privacyLabel: "politique Pro",
  },
};

export function DeleteAccountPage({ app }: { app: DeletionApp }) {
  const text = copy[app];
  const wa = whatsappLink("Bonjour, je souhaite suivre ma demande de suppression de compte Campus Food.");
  return (
    <>
      <PageHero title={text.title} subtitle={text.subtitle} />
      <div className="mx-auto max-w-3xl space-y-8 px-4 py-12 sm:px-6 sm:py-16">
        <CampusLogo size="lg" href={null} />
        <p className="text-sm text-brand-muted">
          Autre application :{" "}
          {privacyApps
            .filter((item) => item.id !== app)
            .map((item, index) => (
              <span key={item.id}>
                {index > 0 ? " · " : null}
                <Link className="font-bold text-brand-secondary underline" href={item.deletionHref}>
                  {item.label}
                </Link>
              </span>
            ))}
        </p>

        <section className="space-y-3 text-[15px] leading-relaxed text-brand-muted">
          <h2 className="text-xl font-extrabold text-brand-primary">Comment se passe la demande</h2>
          <ol className="list-decimal space-y-2 pl-5">
            {text.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section className="space-y-3 text-[15px] leading-relaxed text-brand-muted">
          <h2 className="text-xl font-extrabold text-brand-primary">Données concernées</h2>
          <p>
            {text.data} Détail :{" "}
            <Link href={text.privacyHref} className="font-bold text-brand-secondary underline">
              {text.privacyLabel}
            </Link>
            .
          </p>
        </section>

        <DeleteAccountForm initialApp={app} />

        <section className="rounded-3xl bg-brand-background p-6 text-[15px] leading-relaxed text-brand-muted sm:p-8">
          <h2 className="text-xl font-extrabold text-brand-primary">Suivre une demande</h2>
          <p className="mt-3">Pour une question sur cette page ou sur l&apos;avancement d&apos;une demande, écrivez au support Campus Food.</p>
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
            Site :{" "}
            <a className="font-bold text-brand-secondary underline" href={site.url}>
              {site.url}
            </a>
          </p>
        </section>
      </div>
    </>
  );
}
