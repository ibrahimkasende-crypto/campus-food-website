"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DishCard } from "@/components/catalog/DishCard";
import type { Dish } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Tab = { id: string; label: string; filter: (d: Dish) => boolean };

const tabs: Tab[] = [
  { id: "rapides", label: "Repas rapides", filter: (d) => d.prepMinutes !== null && d.prepMinutes <= 15 },
  { id: "promos", label: "Bons plans", filter: (d) => d.salePriceFc !== null },
  { id: "streetfood", label: "Fast-food & street food", filter: (d) => !d.congolese },
];

/** Filtres sur les plats réellement disponibles (temps de préparation, promotions en cours, type de cuisine). */
export function DishExplorer({ dishes }: { dishes: Dish[] }) {
  const available = tabs.map((t) => ({ ...t, items: dishes.filter(t.filter) })).filter((t) => t.items.length > 0);
  const [active, setActive] = useState(available[0]?.id);
  const current = available.find((t) => t.id === active) ?? available[0];
  if (!current) return null;
  return (
    <div>
      <div role="tablist" aria-label="Filtrer les plats" className="flex flex-wrap justify-center gap-2">
        {available.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === current.id}
            onClick={() => setActive(t.id)}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-bold transition",
              t.id === current.id
                ? "border-brand-primary bg-brand-primary text-white shadow-premium"
                : "border-brand-primary/15 bg-white text-brand-primary hover:border-brand-secondary hover:text-brand-secondary"
            )}
          >
            {t.label}
            <span className="ml-2 text-xs opacity-70">{t.items.length}</span>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.ul
          key={current.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {current.items.map((d) => (
            <li key={d.id}>
              <DishCard dish={d} />
            </li>
          ))}
        </motion.ul>
      </AnimatePresence>
    </div>
  );
}
