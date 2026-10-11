import { SectionReveal } from "@/components/animations/SectionReveal";
import { DishCard } from "@/components/catalog/DishCard";
import { DishExplorer } from "@/components/catalog/DishExplorer";
import { getDishes } from "@/lib/catalog";

/** Plats du catalogue réel : cuisine congolaise en tête, puis filtres (repas rapides, bons plans, street food). */
export async function CatalogueSection() {
  const { dishes } = await getDishes();
  const congolese = dishes.filter((d) => d.congolese);
  if (dishes.length === 0) return null;
  return (
    <section id="plats" className="relative overflow-hidden bg-gradient-to-b from-white via-[#FFF8F5] to-white py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {congolese.length > 0 && (
          <>
            <SectionReveal className="text-center">
              <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Cuisine congolaise</p>
              <h2 className="mt-3 text-3xl font-extrabold text-brand-primary sm:text-4xl lg:text-5xl">
                Les saveurs de chez nous <span aria-label="drapeau de la République démocratique du Congo">🇨🇩</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-brand-muted">
                Saka-saka, pondu, fufu et poisson, poulet braisé… les plats que les étudiants aiment, commandés en quelques
                touches.
              </p>
            </SectionReveal>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {congolese.map((d, i) => (
                <li key={d.id}>
                  <SectionReveal delay={(i % 3) * 0.07} className="h-full">
                    <DishCard dish={d} priority={i < 3} />
                  </SectionReveal>
                </li>
              ))}
            </ul>
          </>
        )}

        <SectionReveal className="mt-20 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-brand-secondary">Pour toutes les envies</p>
          <h2 className="mt-3 text-2xl font-extrabold text-brand-primary sm:text-3xl">Burgers, street food et bons plans</h2>
        </SectionReveal>
        <div className="mt-8">
          <DishExplorer dishes={dishes} />
        </div>

        <p className="mx-auto mt-14 max-w-2xl text-center text-xs leading-relaxed text-brand-muted">
          Aperçu du catalogue de l&apos;application : photos d&apos;illustration, plats et prix indicatifs pouvant évoluer à
          l&apos;ouverture du service. Seuls La Grappe, Arlo Pop&apos;s et Niam&apos;s sont partenaires officiels.
        </p>
      </div>
    </section>
  );
}
