"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { company, founders, institutionalPartners, leadership, type Person } from "@/lib/team";

function PersonCard({ p, index }: { p: Person; index: number }) {
  return (
    <SectionReveal delay={index * 0.1} className="h-full">
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-primary/10 bg-white shadow-premium transition-shadow duration-300 hover:shadow-premium-lg"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-[#FFF3EA] to-[#F3F4F6]">
          <Image
            src={p.photo}
            alt={`Portrait de ${p.name}`}
            width={p.width}
            height={p.height}
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 92vw"
            style={{ objectPosition: p.focus }}
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-brand-primary shadow backdrop-blur">
            {p.role}
          </span>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-extrabold text-brand-primary">{p.name}</h3>
          {p.affiliation && <p className="mt-1 text-xs font-bold text-brand-secondary">{p.affiliation}</p>}
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">{p.bio}</p>
        </div>
      </motion.article>
    </SectionReveal>
  );
}

function Group({ title, people }: { title: string; people: Person[] }) {
  if (people.length === 0) return null;
  return (
    <div className="mt-14">
      <h3 className="text-center text-sm font-bold uppercase tracking-widest text-brand-secondary">{title}</h3>
      <ul className="mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
        {people.map((p, i) => (
          <li key={p.name}>
            <PersonCard p={p} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Fondateurs, équipe dirigeante et partenaires institutionnels — alimenté par `src/lib/team.ts`. */
export function FoundersSection({ showLink = false, heading = true }: { showLink?: boolean; heading?: boolean }) {
  return (
    <section id="fondateurs" className="relative overflow-hidden bg-gradient-to-b from-white to-[#FFF8F5] py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full bg-brand-secondary/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {heading && (
          <SectionReveal className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Les fondateurs</p>
            <h2 className="mt-3 text-3xl font-extrabold text-brand-primary sm:text-4xl lg:text-5xl">
              À l&apos;origine de Campus Food
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
              Les personnes derrière le projet : une vision numérique au service des étudiants, des restaurants et des
              campus.
            </p>
          </SectionReveal>
        )}

        <ul className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
          {founders.map((p, i) => (
            <li key={p.name}>
              <PersonCard p={p} index={i} />
            </li>
          ))}
        </ul>

        <Group title="Équipe dirigeante" people={leadership} />

        {institutionalPartners.length > 0 && (
          <div className="mt-14">
            <h3 className="text-center text-sm font-bold uppercase tracking-widest text-brand-secondary">
              Partenaires institutionnels
            </h3>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {institutionalPartners.map((p) => (
                <li key={p.name} className="rounded-2xl border border-brand-primary/10 bg-white px-5 py-3 text-sm font-bold text-brand-primary shadow-premium">
                  {p.name}
                  <span className="ml-2 font-medium text-brand-muted">{p.role}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <SectionReveal delay={0.1} className="mx-auto mt-14 max-w-2xl">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-5 rounded-3xl border border-brand-primary/10 bg-white p-6 shadow-premium transition hover:shadow-premium-lg sm:flex-row"
          >
            <Image
              src={company.logo}
              alt="Logo de New System Corporation"
              width={company.logoWidth}
              height={company.logoHeight}
              sizes="140px"
              className="h-24 w-auto shrink-0 object-contain"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-muted">
                {company.name} <span className="mx-1 text-brand-secondary">→</span> Campus Food
              </p>
              <p className="mt-2 text-brand-primary">{company.statement}</p>
              <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-secondary group-hover:underline">
                newsystemcorps.com <ArrowRight className="h-4 w-4" />
              </p>
            </div>
          </a>
        </SectionReveal>

        {showLink && (
          <p className="mt-10 text-center">
            <Link
              href="/a-propos"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-primary underline-offset-4 transition hover:text-brand-secondary hover:underline"
            >
              Notre histoire et notre vision <ArrowRight className="h-4 w-4" />
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
