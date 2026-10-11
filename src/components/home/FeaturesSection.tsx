"use client";

import {
  Bell,
  Bike,
  Share2,
  ShoppingBag,
  Wallet,
  MapPin,
} from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";

const features = [
  {
    icon: ShoppingBag,
    title: "Commandes intelligentes",
    desc: "Panier, favoris, historique et suivi live de chaque étape.",
  },
  {
    icon: Share2,
    title: "Partage de panier",
    desc: "Demandez à un proche de payer — lien sécurisé et notifications.",
  },
  {
    icon: Bike,
    title: "Livraison campus",
    desc: "Livreurs vérifiés, GPS et QR de récupération intégrés.",
  },
  {
    icon: Bell,
    title: "Notifications",
    desc: "Alertes push pour commandes, paiements et promotions.",
  },
  {
    icon: Wallet,
    title: "Portefeuille",
    desc: "Mobile Money et cash — retraits marchands & livreurs.",
  },
  {
    icon: MapPin,
    title: "Suivi en direct",
    desc: "Carte interactive et ETA en temps réel.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">
            Fonctionnalités
          </p>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-primary sm:text-4xl">
            Tout ce dont votre campus a besoin
          </h2>
        </SectionReveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <SectionReveal key={f.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-transparent bg-white p-6 shadow-premium transition hover:border-brand-primary/15 hover:shadow-premium-lg">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white shadow-md">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-brand-primary">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{f.desc}</p>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
