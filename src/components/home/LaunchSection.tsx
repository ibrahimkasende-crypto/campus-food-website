"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, Clock, ExternalLink, MapPin, ZoomIn, X } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { launchEvent } from "@/lib/site";

/** « Dans N jours » calculé côté navigateur (pas de décalage serveur/client). */
function useCountdownLabel(): string | null {
  const [label, setLabel] = useState<string | null>(null);
  useEffect(() => {
    const compute = () => {
      const ms = new Date(launchEvent.startsAtIso).getTime() - Date.now();
      if (ms <= -1000 * 60 * 60 * 12) return setLabel("Le lancement a eu lieu");
      if (ms <= 0) return setLabel("C'est aujourd'hui");
      const days = Math.floor(ms / 86_400_000);
      const hours = Math.floor((ms % 86_400_000) / 3_600_000);
      if (days >= 1) return setLabel(`Dans ${days} jour${days > 1 ? "s" : ""}`);
      setLabel(`Dans ${hours} heure${hours > 1 ? "s" : ""}`);
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);
  return label;
}

function PosterLightbox({ onClose }: { onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="Affiche officielle du lancement en grand format"
      className="fixed inset-0 z-[100] flex flex-col bg-black/85 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm font-semibold text-white/90">Affiche officielle du lancement</p>
        <div className="flex items-center gap-2">
          <a
            href={launchEvent.poster.full}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-bold text-white transition hover:bg-white/20"
          >
            <ExternalLink className="h-4 w-4" />
            Ouvrir l&apos;image
          </a>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-xl bg-white p-2 text-brand-primary shadow transition hover:scale-105"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="min-h-0 flex-1 overflow-auto px-3 pb-6 sm:px-6">
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-3xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- grand format : fichier d'origine, chargé uniquement à l'ouverture */}
          <img
            src={launchEvent.poster.full}
            alt={launchEvent.poster.alt}
            width={launchEvent.poster.width}
            height={launchEvent.poster.height}
            className="h-auto w-full rounded-2xl shadow-premium-lg"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

export function LaunchSection() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const countdown = useCountdownLabel();

  return (
    <section id="lancement" className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFF3EA] to-[#FFF8F5] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-secondary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
        <SectionReveal className="order-2 lg:order-1">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Lancement officiel</p>
            {countdown && (
              <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white shadow-premium">
                {countdown}
              </span>
            )}
          </div>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-brand-primary sm:text-4xl lg:text-5xl text-balance">
            {launchEvent.title}
          </h2>
          <p className="mt-5 max-w-xl text-lg text-brand-muted">
            Rejoignez-nous pour découvrir Campus Food, l&apos;application qui réunit les étudiants, les restaurants et les
            livreurs du campus. Entrée gratuite.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-2xl border border-brand-primary/10 bg-white p-4 shadow-premium">
              <CalendarDays className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Date</dt>
                <dd className="font-bold text-brand-primary">{launchEvent.dateLabel}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-brand-primary/10 bg-white p-4 shadow-premium">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Heure</dt>
                <dd className="font-bold text-brand-primary">{launchEvent.timeLabel}</dd>
              </div>
            </div>
            <div className="flex gap-3 rounded-2xl border border-brand-primary/10 bg-white p-4 shadow-premium sm:col-span-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-secondary" />
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Lieu</dt>
                <dd className="font-bold text-brand-primary">{launchEvent.place}</dd>
                <dd className="text-sm text-brand-muted">{launchEvent.placeDetail}</dd>
              </div>
            </div>
          </dl>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mt-8 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent px-7 py-3.5 text-sm font-bold text-white shadow-premium-lg transition duration-300 hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]"
          >
            <ZoomIn className="h-4 w-4" />
            Voir l&apos;affiche en grand
          </button>
        </SectionReveal>

        <SectionReveal delay={0.1} className="order-1 lg:order-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Agrandir l'affiche officielle du lancement"
            className="group relative mx-auto block w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-premium-lg ring-1 ring-brand-primary/10 transition duration-500 hover:-translate-y-1 hover:rotate-[0.6deg] hover:shadow-glow lg:max-w-md"
          >
            <Image
              src={launchEvent.poster.preview}
              alt={launchEvent.poster.alt}
              width={launchEvent.poster.width}
              height={launchEvent.poster.height}
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 24rem, 92vw"
              className="h-auto w-full"
              priority={false}
            />
            <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-xs font-semibold text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-visible:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" /> Agrandir
            </span>
          </button>
        </SectionReveal>
      </div>

      <AnimatePresence>{open && <PosterLightbox onClose={close} />}</AnimatePresence>
    </section>
  );
}
