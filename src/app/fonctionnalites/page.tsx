"use client";

import { Bike, ShoppingBag, Store } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";

const sections = [
  {
    title: "Client",
    icon: ShoppingBag,
    items: [
      "Accueil & recherche restaurants",
      "Panier et commandes",
      "Paiements Mobile Money",
      "Suivi livraison",
      "Profil étudiant",
    ],
  },
  {
    title: "Marchand",
    icon: Store,
    items: [
      "Gestion des menus",
      "Commandes en temps réel",
      "Portefeuille & retraits",
      "Profil restaurant",
    ],
  },
  {
    title: "Livreur",
    icon: Bike,
    items: [
      "Offres de livraison",
      "Navigation GPS",
      "Historique & gains",
      "Portefeuille livreur",
    ],
  },
];

export default function FonctionnalitesPage() {
  return (
    <>
      <PageHero
        title="Fonctionnalités"
        subtitle="Une application, trois rôles — pensée pour le campus."
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="space-y-8">
          {sections.map((s, i) => (
            <SectionReveal key={s.title} delay={i * 0.08}>
              <section className="rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-premium transition hover:shadow-premium-lg sm:p-10">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-extrabold text-brand-primary">{s.title}</h2>
                </div>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-brand-muted">
                      <span className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            </SectionReveal>
          ))}
        </div>
      </div>
    </>
  );
}
