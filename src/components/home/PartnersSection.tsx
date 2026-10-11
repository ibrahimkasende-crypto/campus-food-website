"use client";

import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { officialPartners } from "@/lib/site";

/**
 * Restaurants partenaires officiels de Campus Food à l'UNIKIN.
 * Les établissements de démonstration utilisés pour les tests de l'application ne sont volontairement pas
 * présentés ici : ils ne sont pas des partenaires confirmés.
 */
export function PartnersSection() {
  return (
    <section id="partenaires" className="relative overflow-hidden bg-gradient-to-b from-[#FFF8F5] to-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Partenaires officiels</p>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-primary sm:text-4xl">Nos restaurants partenaires</h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-muted">
            Les premiers restaurants qui nous font confiance sur le campus de l&apos;UNIKIN.
          </p>
        </SectionReveal>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Restaurants partenaires officiels">
          {officialPartners.map((p, i) => (
            <li key={p.name}>
              <SectionReveal delay={i * 0.08} className="h-full">
                <article className="group flex h-full flex-col items-center rounded-3xl border border-brand-primary/10 bg-white p-6 text-center shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                  <div className="flex h-44 w-full items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF8F5] to-white p-4">
                    <Image
                      src={p.logo}
                      alt={p.alt}
                      width={p.width}
                      height={p.height}
                      sizes="(min-width: 1024px) 20rem, (min-width: 640px) 45vw, 80vw"
                      className="max-h-36 w-auto object-contain transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-brand-primary">{p.name}</h3>
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                    <BadgeCheck className="h-4 w-4" />
                    Partenaire officiel · UNIKIN
                  </span>
                </article>
              </SectionReveal>
            </li>
          ))}
        </ul>

        <SectionReveal delay={0.2} className="mt-10 text-center">
          <a
            href="#devenir-partenaire"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary underline-offset-4 transition hover:text-brand-secondary hover:underline"
          >
            Vous êtes restaurateur ? Rejoignez-nous
          </a>
        </SectionReveal>
      </div>
    </section>
  );
}
