import type { Metadata } from "next";
import { GraduationCap, Lightbulb, Rocket, Users } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { FoundersSection } from "@/components/home/FoundersSection";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { company, story } from "@/lib/team";

export const metadata: Metadata = {
  title: "À propos — notre histoire et notre équipe fondatrice",
  description:
    "L'histoire de Campus Food, la vision de la plateforme et ses fondateurs. Campus Food est le premier produit de New System Corporation.",
  alternates: { canonical: "/a-propos" },
};

const blocks = [
  { icon: Lightbulb, title: "L'origine", text: story.origin },
  { icon: GraduationCap, title: "Le problème que nous résolvons", text: story.problem },
  { icon: Rocket, title: "Notre vision", text: story.vision },
];

const values = [
  { icon: GraduationCap, title: "Pensé pour le campus", desc: "Une expérience adaptée aux étudiants, aux restaurants et aux livreurs du campus." },
  { icon: Rocket, title: "Technologie moderne", desc: "Des applications mobiles et une plateforme sécurisée pour une montée en charge fluide." },
  { icon: Users, title: "Contexte africain", desc: "Mobile Money, paiement en espèces et validation des livreurs intégrés dès le départ." },
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        title="À propos"
        subtitle="Campus Food connecte les communautés universitaires aux restaurants du campus et aux livreurs."
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal>
          <p className="max-w-3xl text-lg font-medium leading-relaxed text-brand-muted">{company.statement}</p>
        </SectionReveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {blocks.map((b, i) => (
            <SectionReveal key={b.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-brand-primary/10 bg-white p-7 shadow-premium">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary">
                  <b.icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-extrabold text-brand-primary">{b.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-brand-muted">{b.text}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {values.map((v, i) => (
            <SectionReveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-brand-primary/10 bg-brand-background p-6 transition hover:-translate-y-1 hover:shadow-premium">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-primary shadow-sm">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-extrabold text-brand-primary">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{v.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>

      <FoundersSection />
    </>
  );
}
