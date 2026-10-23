import Image from "next/image";
import Link from "next/link";
import { Smartphone, Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { apkUrl, appStoreUrl, googlePlayUrl } from "@/lib/downloads";

/** Barre de téléchargement. Le badge Android ouvre la fiche Google Play officielle. */
export function DownloadSection() {
  const play = googlePlayUrl();
  const ios = appStoreUrl();
  const apk = apkUrl();
  return (
    <section id="telecharger" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1F2937] via-[#2B1620] to-[#5B0A12] p-8 text-white shadow-premium-lg sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand-secondary/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-primary/30 blur-3xl" />

            <div className="relative flex flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
              <div className="max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-accent backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5" /> Application mobile
                </span>
                <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl text-balance">
                  Téléchargez Campus Food
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Commandez auprès des restaurants du campus, payez en Mobile Money ou en espèces et suivez votre livraison en
                  direct.
                </p>

                <StoreBadges size="lg" align="start" className="mt-9 justify-center lg:justify-start" />

                <a
                  href={play}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-6 py-3 text-sm font-bold text-brand-primary shadow-premium transition hover:scale-[1.02]"
                >
                  Télécharger Campus Food
                </a>

                <p className="mt-6 text-sm text-white/80">
                  L&apos;application Android est en test fermé.{" "}
                  <Link href="/telechargement#tester" className="font-bold text-brand-accent underline-offset-4 hover:underline">
                    Tester Campus Food
                  </Link>
                </p>

                {!ios && (
                  <p className="mt-3 flex items-center justify-center gap-2 text-sm text-white/70 lg:justify-start">
                    <Smartphone className="h-4 w-4 shrink-0" />
                    L&apos;application iPhone sera indiquée ici dès que sa fiche App Store sera publiée.
                  </p>
                )}
                {apk && (
                  <a
                    href={apk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-brand-accent underline-offset-4 hover:underline"
                  >
                    Installer directement sur Android (APK)
                  </a>
                )}
              </div>

              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-full bg-brand-secondary/30 blur-2xl" />
                <Image
                  src="/logo-icone-app-sans-fond.png"
                  alt="Logo Campus Food"
                  width={180}
                  height={180}
                  className="relative h-36 w-36 drop-shadow-2xl sm:h-44 sm:w-44 animate-float-slow"
                />
              </div>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
