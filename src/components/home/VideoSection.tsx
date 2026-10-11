"use client";

import { useState } from "react";
import { Play } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import type { HomeVideo } from "@/lib/video";

/**
 * Section vidéo : miniature + bouton de lecture ; le fichier n'est téléchargé qu'au clic (preload="none"), ce qui ne
 * ralentit pas la page. Aucune lecture automatique (accessibilité, réduction des animations, données mobiles).
 */
export function VideoSection({ video }: { video: HomeVideo }) {
  const [playing, setPlaying] = useState(false);
  return (
    <section id="video" className="bg-gradient-to-b from-white to-[#FFF8F5] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionReveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Campus Food en action</p>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-primary sm:text-4xl">Simple, rapide et pratique sur le campus</h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
            Choisir un plat, commander, suivre la préparation et recevoir son repas : en quelques instants.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-10">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-brand-primary/90 shadow-premium-lg">
            {playing ? (
              <video className="h-full w-full bg-black" controls autoPlay playsInline preload="auto" poster={video.poster ?? undefined} aria-label={video.title}>
                {video.webm && <source src={video.webm} type="video/webm" />}
                <source src={video.mp4} type="video/mp4" />
                {video.captions && <track kind="captions" src={video.captions} srcLang="fr" label="Français" default />}
                Votre navigateur ne peut pas lire cette vidéo.
              </video>
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Lire la vidéo : ${video.title}`}
                className="group absolute inset-0 flex items-center justify-center"
              >
                {video.poster && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={video.poster} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                )}
                <span className="absolute inset-0 bg-black/20 transition group-hover:bg-black/30" />
                <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-primary shadow-premium-lg transition group-hover:scale-105">
                  <Play className="ml-1 h-9 w-9" fill="currentColor" />
                </span>
              </button>
            )}
          </div>
          <p className="mt-3 text-center text-xs text-brand-muted">
            {video.disclosure ?? video.title}
            {video.durationSeconds ? ` · ${video.durationSeconds} s` : ""}
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
