import type { Metadata } from "next";
import Link from "next/link";
import { Smartphone } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { androidTestJoinUrl, apkUrl, appStoreUrl, closedTestOptInUrl, googlePlayUrl } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Télécharger Campus Food",
  description:
    "Rejoignez le test fermé Android de Campus Food, puis installez l'application depuis Google Play.",
  alternates: { canonical: "/telechargement" },
};

export default function TelechargementPage() {
  const play = googlePlayUrl();
  const optIn = closedTestOptInUrl();
  const join = androidTestJoinUrl();
  const apk = apkUrl();
  const ios = appStoreUrl();

  return (
    <>
      <PageHero
        title="Télécharger Campus Food"
        subtitle="L'application Android est disponible en test fermé sur Google Play. L'iPhone suivra lorsque sa fiche sera publiée."
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
            {!ios && (
              <p className="mx-auto mt-8 flex max-w-md items-start justify-center gap-2 text-sm text-brand-muted">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                L&apos;application iPhone sera indiquée ici dès que sa fiche App Store sera publiée.
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
          </div>

          <section id="tester" className="mt-14 rounded-3xl bg-brand-background p-6 text-left sm:p-8">
            <h2 className="text-2xl font-extrabold text-brand-primary">Tester Campus Food</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">
              L&apos;application est actuellement en test fermé. Pour pouvoir l&apos;installer, rejoignez d&apos;abord le
              programme de test. Une fois inscrit, ouvrez la fiche Google Play et installez Campus Food.
            </p>
            <a
              href={join}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-3.5 text-center text-sm font-bold text-white shadow-premium transition hover:scale-[1.01] sm:w-auto"
            >
              Rejoindre le test et télécharger l&apos;application
            </a>
            {optIn ? (
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                Après l&apos;inscription, installez l&apos;application depuis{" "}
                <a href={play} target="_blank" rel="noopener noreferrer" className="font-bold text-brand-secondary underline">
                  la fiche Google Play
                </a>
                .
              </p>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-brand-muted">
                Le lien d&apos;inscription fourni par Google Play Console n&apos;est pas encore configuré : ce bouton
                ouvre donc la fiche Google Play. Ajoutez cette adresse dans la variable{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs font-semibold text-brand-primary">
                  NEXT_PUBLIC_ANDROID_CLOSED_TEST_URL
                </code>{" "}
                ou dans la constante{" "}
                <code className="rounded bg-white px-1.5 py-0.5 text-xs font-semibold text-brand-primary">
                  CLOSED_TEST_OPT_IN_URL
                </code>{" "}
                du fichier <code className="text-xs font-semibold text-brand-primary">src/lib/downloads.ts</code>, puis
                republiez le site.
              </p>
            )}
          </section>

          <p className="mt-12 text-center text-sm text-brand-muted">
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
