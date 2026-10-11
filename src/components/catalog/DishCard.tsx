import Image from "next/image";
import Link from "next/link";
import { Clock, Store } from "lucide-react";
import { formatFc, type Dish } from "@/lib/catalog";

/** Carte de plat : grande photo, restaurant, nom, description, prix en FC et action. */
export function DishCard({ dish, priority = false }: { dish: Dish; priority?: boolean }) {
  const promo = dish.salePriceFc !== null;
  const percent = promo ? Math.round((1 - dish.salePriceFc! / dish.priceFc) * 100) : 0;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-brand-primary/10 bg-white shadow-premium transition duration-300 hover:-translate-y-1 hover:shadow-premium-lg">
      <div className="relative aspect-[5/4] overflow-hidden bg-[#F4ECE6]">
        <Image
          src={dish.imageUrl}
          alt={`${dish.name} — photo d'illustration`}
          fill
          sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-105"
          priority={priority}
          loading={priority ? undefined : "lazy"}
        />
        {promo && percent > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-brand-primary px-3 py-1 text-xs font-extrabold text-white shadow-lg">
            Promo −{percent}&nbsp;%
          </span>
        )}
        {dish.prepMinutes && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-brand-primary shadow backdrop-blur">
            <Clock className="h-3.5 w-3.5 text-brand-secondary" />
            {dish.prepMinutes} min
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-secondary">
          <Store className="h-3.5 w-3.5" />
          {dish.restaurant}
        </p>
        <h3 className="mt-1.5 text-lg font-extrabold leading-snug text-brand-primary">{dish.name}</h3>
        {dish.description && <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-brand-muted">{dish.description}</p>}

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div className="leading-tight">
            <p className="text-xl font-black text-brand-primary">{formatFc(promo ? dish.salePriceFc! : dish.priceFc)}</p>
            {promo && <p className="text-xs font-semibold text-brand-muted line-through">{formatFc(dish.priceFc)}</p>}
          </div>
          <Link
            href="/commander"
            className="inline-flex items-center rounded-xl bg-gradient-to-r from-brand-primary to-brand-secondary px-4 py-2.5 text-xs font-bold text-white shadow-premium transition hover:scale-[1.04] hover:shadow-glow active:scale-[0.97]"
            aria-label={`Commander ${dish.name} dans l'application`}
          >
            Commander
          </Link>
        </div>
      </div>
    </article>
  );
}
