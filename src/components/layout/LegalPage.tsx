import type { ReactNode } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { AlertTriangle } from "lucide-react";

/** Gabarit des pages légales. Le bandeau provisoire reste affiché tant que le texte n'est pas publié. */
export function LegalPage({
  title,
  subtitle,
  updated,
  provisional = true,
  children,
}: {
  title: string;
  subtitle: string;
  updated?: string;
  provisional?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero title={title} subtitle={subtitle} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        {updated ? <p className="mb-8 text-sm font-semibold text-brand-primary">Dernière mise à jour : {updated}</p> : null}
        {provisional ? (
          <p className="mb-8 flex items-start gap-3 rounded-2xl border border-brand-accent/40 bg-brand-accent/10 p-4 text-sm text-brand-primary">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
            <span>
              <strong>Version provisoire.</strong> Ce texte décrit le fonctionnement actuel de l&apos;application. Il doit être
              relu et validé par le responsable légal de Campus Food avant d&apos;être considéré comme définitif.
            </span>
          </p>
        ) : null}
        <div className="space-y-8 text-[15px] leading-relaxed text-brand-muted [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:text-brand-primary [&_li]:ml-5 [&_li]:list-disc [&_p+p]:mt-3 [&_ul]:mt-3 [&_strong]:text-brand-primary">
          {children}
        </div>
      </div>
    </>
  );
}
