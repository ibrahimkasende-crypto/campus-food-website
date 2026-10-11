import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/fonctionnalites", "/telechargement", "/faq", "/a-propos", "/contact", "/confidentialite", "/conditions", "/mentions-legales"];
  return pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: p === "" ? "weekly" : "monthly", priority: p === "" ? 1 : 0.6 }));
}
