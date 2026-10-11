"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { CampusLogo } from "@/components/brand/CampusLogo";
import { PremiumButton } from "@/components/ui/PremiumButton";
import { HeroVideoBackground } from "@/components/home/HeroVideo";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden border-b border-brand-primary/10">
      <HeroVideoBackground />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 pb-28 pt-16 text-center sm:px-6 sm:pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <CampusLogo size="hero" showText={false} href={null} animate />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-brand-primary/15 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-muted shadow-sm backdrop-blur"
        >
          <Sparkles className="h-3.5 w-3.5 text-brand-accent" />
          campusfood.app — Kinshasa
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-6 max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance drop-shadow-md"
        >
          Mangez mieux sur campus.{" "}
          <span className="text-[#FFC9B8]">Commandez en un clic.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-6 max-w-2xl text-lg text-white/90 sm:text-xl"
        >
          Restaurants, vendeurs et livreurs réunis. Paiement Mobile Money, partage de panier,
          notifications en temps réel — l&apos;expérience food tech dont votre campus a besoin.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <PremiumButton href="/commander" icon={<ArrowRight className="h-4 w-4" />}>
            Commander un plat
          </PremiumButton>
          <PremiumButton href="#lancement" variant="outline">
            Le grand lancement
          </PremiumButton>
          <PremiumButton href="/telechargement" variant="outline">
            Télécharger l&apos;application
          </PremiumButton>
          
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-14 grid w-full max-w-3xl grid-cols-3 gap-4 sm:gap-8"
        >
          {[
            { n: "3", l: "Restaurants partenaires" },
            { n: "UNIKIN", l: "Premier campus" },
            { n: "Mobile Money", l: "ou espèces" },
          ].map((stat) => (
            <div
              key={stat.l}
              className="glass rounded-2xl px-4 py-5 shadow-premium transition hover:scale-[1.02]"
            >
              <p className="text-2xl font-extrabold text-brand-primary sm:text-3xl">{stat.n}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                {stat.l}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
