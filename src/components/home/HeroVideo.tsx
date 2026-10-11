"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

/**
 * Vidéo de fond du hero (Pexels, Yan Krukau — licence Pexels : usage gratuit, attribution non obligatoire).
 * Source : https://www.pexels.com/video/a-group-of-students-talking-while-looking-at-a-cellphone-8198556/
 *
 * - l'image (poster) est toujours affichée en dessous : elle reste visible si la vidéo ne se charge pas ;
 * - la vidéo n'est chargée qu'après l'affichage de la page, en version légère sur téléphone (≈ 0,7 Mo) ;
 * - muette, en boucle, sans lecture automatique si l'utilisateur demande la réduction des animations ou les économies de données ;
 * - bouton pause / lecture (accessibilité) ; voile sombre pour garder le texte lisible.
 */
const POSTER = "/video/hero-etudiants-poster.jpg";

export function HeroVideoBackground() {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 640px)").matches;
    const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (!motionOff && !saveData) setSrc(small ? "/video/hero-etudiants-640.mp4" : "/video/hero-etudiants-960.mp4");
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) void v.play().catch(() => setFailed(true));
    else v.pause();
  }

  const showVideo = !!src && !failed;

  return (
    <>
      <div className="absolute inset-0 bg-[#2a0a0d]" aria-hidden="true">
        <Image src={POSTER} alt="" fill priority sizes="100vw" className="object-cover" />
        {showVideo && (
          <video
            ref={ref}
            src={src ?? undefined}
            poster={POSTER}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-hidden="true"
            tabIndex={-1}
            onCanPlay={() => setReady(true)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {/* voile : lisibilité du texte blanc, teinte aux couleurs de la marque */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-[#3a0509]/85" />
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/25 via-transparent to-transparent" />
      </div>

      {showVideo && ready && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Mettre la vidéo d'arrière-plan en pause" : "Lire la vidéo d'arrière-plan"}
          className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-primary shadow-premium backdrop-blur transition hover:scale-105"
        >
          {playing ? <Pause className="h-5 w-5" fill="currentColor" /> : <Play className="ml-0.5 h-5 w-5" fill="currentColor" />}
        </button>
      )}

      <p className="absolute bottom-4 left-4 z-10 max-w-[60%] text-[11px] text-white/70">
        Vidéo d&apos;illustration —{" "}
        <a
          href="https://www.pexels.com/video/a-group-of-students-talking-while-looking-at-a-cellphone-8198556/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline-offset-2 hover:underline"
        >
          Yan Krukau / Pexels
        </a>
      </p>
    </>
  );
}
