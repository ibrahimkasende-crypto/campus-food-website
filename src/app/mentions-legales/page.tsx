import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mentions légales — Campus Food",
  description: "Éditeur, hébergement et informations légales du site Campus Food.",
  alternates: { canonical: "/mentions-legales" },
};

const toComplete = "À renseigner — information en cours de communication";

export default function LegalNoticePage() {
  const rows: [string, string][] = [
    ["Site", `${site.domain} (${site.url})`],
    ["Éditeur", site.name],
    ["Raison sociale et forme juridique", toComplete],
    ["Siège social", toComplete],
    ["Numéro d'enregistrement (RCCM / Id. nat.)", toComplete],
    ["Directeur de la publication", toComplete],
    ["Hébergeur du site", toComplete],
    ["Contact", "Via la page Contact du site"],
  ];
  return (
    <LegalPage title="Mentions légales" subtitle="Éditeur et hébergement du site.">
      <dl className="grid gap-px overflow-hidden rounded-2xl border border-brand-primary/10 bg-brand-primary/10">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 bg-white p-4 sm:grid-cols-[16rem_1fr] sm:gap-4">
            <dt className="font-bold text-brand-primary">{k}</dt>
            <dd className={v === toComplete ? "italic text-brand-muted/80" : ""}>{v}</dd>
          </div>
        ))}
      </dl>
      <p>Les informations marquées « à renseigner » seront complétées dès que les données officielles de la structure seront communiquées. Aucune information n&apos;est présentée tant qu&apos;elle n&apos;est pas confirmée.</p>
    </LegalPage>
  );
}
