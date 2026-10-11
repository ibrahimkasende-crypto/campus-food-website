// Régénère src/data/catalogue-snapshot.json à partir de la base (lecture publique).
// Usage : node scripts/refresh-catalogue-snapshot.mjs   (variables SUPABASE_URL et SUPABASE_PUBLISHABLE_KEY dans .env.local)
import { readFileSync, writeFileSync } from "node:fs";

for (const line of readFileSync(new URL("../.env.local", import.meta.url), "utf8").split(/\r?\n/)) {
  const m = line.match(/^([A-Z_]+)=(.*)$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
}
const url = process.env.SUPABASE_URL, key = process.env.SUPABASE_PUBLISHABLE_KEY;
if (!url || !key) throw new Error("SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY manquantes");
const names = ['"La Grappe"', '"Arlo Pops"', '"Niams"'].join(",");
const query =
  "select=id,name,description,price_cdf,is_on_sale,sale_price_cdf,image_url,preparation_time_minutes,merchants!inner(business_name)" +
  "&is_available=eq.true&is_combo=eq.false&image_url=not.is.null" +
  `&merchants.business_name=in.(${encodeURIComponent(names)})&order=name&limit=200`;
const res = await fetch(`${url}/rest/v1/food_items?${query}`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const rows = await res.json();
writeFileSync(new URL("../src/data/catalogue-snapshot.json", import.meta.url), JSON.stringify({ generatedAt: new Date().toISOString().slice(0, 10), rows }, null, 2) + "\n");
console.log(rows.length, "plats enregistrés");
