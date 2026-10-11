import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { apkUrl, appStoreUrl, googlePlayUrl } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Télécharger Campus Food",
  description: "Installez Campus Food sur Android ou iPhone et commandez sur votre campus.",
  alternates: { canonical: "/telechargement" },
};

export default function TelechargementPage() {
  const apk = apkUrl();
  const allLive = !!googlePlayUrl() && !!appStoreUrl();
  return (
    <>
      <PageHero
        title="Télécharger Campus Food"
        subtitle="Installez l'application sur Android ou iPhone et commandez en quelques minutes sur votre campus."
      />

      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
        <SectionReveal>
          <StoreBadges size="lg" align="center" />
          {!allLive && (
            <p className="mx-auto mt-10 flex max-w-md items-start justify-center gap-2 text-sm text-brand-muted">
              <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
              Les liens de téléchargement seront publiés ici dès que l&apos;application sera disponible sur les magasins.
            </p>
          )}
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
          <p className="mt-12 text-sm text-brand-muted">
            Le grand lancement a lieu le vendredi 23 octobre 2026.{" "}
            <Link href="/#lancement" className="font-bold text-brand-primary underline-offset-4 hover:underline">
              Voir les détails
            </Link>
          </p>
        </SectionReveal>
      </div>
    </>
  );
}
