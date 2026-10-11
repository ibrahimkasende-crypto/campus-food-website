/**
 * Catalogue public (plats des restaurants partenaires officiels).
 *
 * Les noms, descriptions, prix, promotions et temps de préparation viennent de la base Campus Food (lecture publique,
 * clé publique). En cas d'indisponibilité de la base, un instantané daté (`src/data/catalogue-snapshot.json`) prend le relais.
 *
 * Une photo n'est affichée que si elle a été vérifiée visuellement comme correspondant au plat (liste `verifiedPhotos`).
 * Un plat dont la photo n'est pas vérifiée n'apparaît pas : on préfère ne rien montrer qu'une image qui ne correspond pas.
 * Pour ajouter un plat : vérifier sa photo, puis ajouter une ligne dans `verifiedPhotos`.
 */
import snapshot from "@/data/catalogue-snapshot.json";

export type Dish = {
  id: string;
  name: string;
  description: string;
  restaurant: string;
  priceFc: number;
  salePriceFc: number | null;
  prepMinutes: number | null;
  imageUrl: string;
  /** Spécialité de la cuisine congolaise (section « Les saveurs de chez nous »). */
  congolese: boolean;
};

type Row = {
  id: string;
  name: string;
  description: string | null;
  price_cdf: number | string;
  is_on_sale: boolean;
  sale_price_cdf: number | string | null;
  image_url: string | null;
  preparation_time_minutes: number | null;
  merchants: { business_name: string } | null;
};

/** Nom en base → nom officiel affiché. Seuls ces trois restaurants sont des partenaires officiels. */
const partnerNames: Record<string, string> = {
  "La Grappe": "La Grappe",
  "Arlo Pops": "Arlo Pop's",
  Niams: "Niam's",
};

/** Photos contrôlées une à une (plat + identifiant de l'image) — contrôle du 11/10/2026. */
const verifiedPhotos: { name: string; imageId: string; congolese: boolean }[] = [
  { name: "Saka-saka", imageId: "813dd1ac-1696-4288-aa29-00792991859b", congolese: true },
  { name: "Pondu riz", imageId: "85930aaf-48b2-41b6-9ef0-acee060b7b38", congolese: true },
  { name: "Fufu poisson", imageId: "f3f4851c-f543-4266-a2a1-020366c81bc5", congolese: true },
  { name: "Poulet braisé", imageId: "ad8d30c3-5904-4997-8881-5d5309961e7a", congolese: true },
  { name: "Poisson mayo", imageId: "49fc5906-fe04-4711-932d-f5cafaa690ab", congolese: true },
  { name: "Brochette poulet", imageId: "abcdb7a2-4bc2-4ad1-99f6-0ff0abf74616", congolese: true },
  { name: "Burger Arlo", imageId: "256151c5-4969-4d09-97a2-4982c949d5cb", congolese: false },
  { name: "Menu Burger", imageId: "256151c5-4969-4d09-97a2-4982c949d5cb", congolese: false },
  { name: "Pizza Pops", imageId: "8a643d09-2efd-46d8-a22f-98c364598733", congolese: false },
  { name: "Shawarma poulet", imageId: "51a89976-f8f4-4a22-bf33-f9bfe4c7c655", congolese: false },
  { name: "Tacos mixte", imageId: "7e0fef1f-60fe-44db-b6f5-5120e24636f0", congolese: false },
  { name: "Sandwich poulet", imageId: "8688deac-3913-4bd5-8533-3479a8024fcd", congolese: false },
];

export const snapshotDate: string = (snapshot as { generatedAt: string }).generatedAt;

function toDishes(rows: Row[]): Dish[] {
  const out: Dish[] = [];
  for (const r of rows) {
    const restaurant = r.merchants ? partnerNames[r.merchants.business_name] : undefined;
    if (!restaurant || !r.image_url) continue;
    const imageId = r.image_url.split("/").slice(-2)[0];
    const ok = verifiedPhotos.find((v) => v.name === r.name && v.imageId === imageId);
    if (!ok) continue;
    const price = Number(r.price_cdf);
    const sale = r.is_on_sale && r.sale_price_cdf != null ? Number(r.sale_price_cdf) : null;
    if (!Number.isFinite(price) || price <= 0) continue;
    out.push({
      id: r.id,
      name: r.name,
      description: (r.description ?? "").trim(),
      restaurant,
      priceFc: price,
      salePriceFc: sale !== null && sale > 0 && sale < price ? sale : null,
      prepMinutes: r.preparation_time_minutes && r.preparation_time_minutes > 0 ? r.preparation_time_minutes : null,
      imageUrl: r.image_url,
      congolese: ok.congolese,
    });
  }
  // ordre stable : celui de la liste vérifiée
  const rank = (d: Dish) => verifiedPhotos.findIndex((v) => v.name === d.name);
  return out.sort((a, b) => rank(a) - rank(b));
}

async function fetchLive(): Promise<Row[] | null> {
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();
  if (!url || !key) return null;
  const names = Object.keys(partnerNames).map((n) => `"${n}"`).join(",");
  const query =
    "select=id,name,description,price_cdf,is_on_sale,sale_price_cdf,image_url,preparation_time_minutes,merchants!inner(business_name)" +
    "&is_available=eq.true&is_combo=eq.false&image_url=not.is.null" +
    `&merchants.business_name=in.(${encodeURIComponent(names)})&order=name&limit=200`;
  try {
    const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/food_items?${query}`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 1800 },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const rows = (await res.json()) as Row[];
    return Array.isArray(rows) ? rows : null;
  } catch {
    return null;
  }
}

export async function getDishes(): Promise<{ dishes: Dish[]; source: "live" | "snapshot" }> {
  const live = await fetchLive();
  const liveDishes = live ? toDishes(live) : [];
  if (liveDishes.length > 0) return { dishes: liveDishes, source: "live" };
  return { dishes: toDishes((snapshot as { rows: Row[] }).rows), source: "snapshot" };
}

export function formatFc(value: number): string {
  return `${Math.round(value).toLocaleString("fr-FR").replace(/[  ]/g, " ")} FC`;
}
