import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { apkUrl, googlePlayUrl } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Télécharger Campus Food",
  description: "Installez Campus Food sur Google Play ou sur l'App Store.",
  alternates: { canonical: "/telechargement" },
};

export default function TelechargementPage() {
  const play = googlePlayUrl();
  const apk = apkUrl();

  return (
    <>
      <PageHero
        title="Télécharger Campus Food"
        subtitle="L'application Android est disponible sur Google Play. L'application iPhone est disponible sur l'App Store."
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal>
          <div className="text-center">
            <StoreBadges size="lg" align="center" />
            <a
              href={play}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-7 py-3.5 text-sm font-bold text-white shadow-premium transition hover:scale-[1.02]"
            >
              Télécharger l&apos;application Android
            </a>
            {apk && (
              <a
                href={apk}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-sm font-bold text-brand-secondary underline-offset-4 hover:underline"
              >
                Installer directement sur Android (APK)
              </a>
            )}
          </div>
        </SectionReveal>
      </div>
    </>
  );
}
