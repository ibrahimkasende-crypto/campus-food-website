import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { androidTestJoinUrl, apkUrl, closedTestOptInUrl, googlePlayUrl } from "@/lib/downloads";

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

  return (
    <>
      <PageHero
        title="Télécharger Campus Food"
        subtitle="L'application Android est disponible en test fermé sur Google Play. L'application iPhone est disponible sur l'App Store."
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
        </SectionReveal>
      </div>
    </>
  );
}
