"use client";

import { HelpCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";

const faqs = [
  {
    q: "Comment créer un compte client ?",
    a: "Téléchargez l'application, inscrivez-vous avec votre téléphone ou e-mail, puis complétez votre profil campus.",
  },
  {
    q: "Comment devenir marchand ou livreur ?",
    a: "Choisissez le type de compte à l'inscription. Les livreurs sont validés par l'équipe Campus Food avant activation.",
  },
  {
    q: "Quels moyens de paiement sont acceptés ?",
    a: "Mobile Money et portefeuille Campus Food selon les options activées sur votre campus.",
  },
  {
    q: "Comment contacter le support ?",
    a: "Utilisez la page Contact du site : les coordonnées officielles y sont publiées.",
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        title="FAQ"
        subtitle="Les réponses aux questions les plus fréquentes sur Campus Food."
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <SectionReveal key={f.q} delay={i * 0.06}>
              <details className="group rounded-2xl border border-brand-primary/10 bg-white p-5 shadow-premium transition open:shadow-premium-lg sm:p-6">
                <summary className="flex cursor-pointer list-none items-center gap-3 font-bold text-brand-primary">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-primary/8 text-brand-primary">
                    <HelpCircle className="h-4 w-4" />
                  </span>
                  {f.q}
                </summary>
                <p className="mt-4 pl-11 text-sm leading-relaxed text-brand-muted">{f.a}</p>
              </details>
            </SectionReveal>
          ))}
        </div>
      </div>
    </>
  );
}
