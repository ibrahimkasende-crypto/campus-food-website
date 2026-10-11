"use client";

import { Search, CreditCard, PackageCheck } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";

const steps = [
  {
    icon: Search,
    title: "Commander",
    desc: "Parcourez les menus, ajoutez au panier et partagez avec un ami si besoin.",
    emoji: "🍔",
  },
  {
    icon: CreditCard,
    title: "Payer",
    desc: "Mobile Money, espèces ou portefeuille Campus Food — en toute sécurité.",
    emoji: "💳",
  },
  {
    icon: PackageCheck,
    title: "Recevoir",
    desc: "Suivi en temps réel, notifications et livraison rapide sur le campus.",
    emoji: "📦",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">
            Comment ça marche
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-primary sm:text-4xl">
            Trois étapes. Zéro friction.
          </h2>
        </SectionReveal>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <SectionReveal key={step.title} delay={i * 0.12}>
              <div className="group relative h-full rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
                <span className="absolute -right-2 -top-2 text-3xl opacity-40 transition group-hover:scale-110 group-hover:opacity-70">
                  {step.emoji}
                </span>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary transition group-hover:scale-105">
                  <step.icon className="h-7 w-7" />
                </div>
                <span className="mt-6 inline-block text-xs font-black text-brand-accent">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-xl font-bold text-brand-primary">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-muted">{step.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
