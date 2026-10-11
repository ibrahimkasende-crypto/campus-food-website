import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

/**
 * Vidéo de présentation de la page d'accueil. Aucun fichier vidéo n'est inventé : la section n'apparaît que si
 * `public/video/campus-food.mp4` existe. Mode d'emploi : `public/video/LISEZMOI.md` (voir aussi README).
 *
 * Fichiers (tous dans `public/video/`) :
 *  - campus-food.mp4        (obligatoire, H.264/AAC, 15 à 30 s, idéalement < 8 Mo) ;
 *  - campus-food.webm       (facultatif, plus léger) ;
 *  - poster.jpg             (miniature affichée avant lecture ; recommandée) ;
 *  - sous-titres-fr.vtt     (sous-titres / messages courts à l'écran ; recommandé) ;
 *  - meta.json              (facultatif) : { "title": "...", "disclosure": "Vidéo animée générée par IA", "durationSeconds": 20 }.
 */
export type HomeVideo = {
  mp4: string;
  webm: string | null;
  poster: string | null;
  captions: string | null;
  title: string;
  /** Mention de transparence (ex. « Vidéo animée générée par IA ») : à renseigner si la vidéo n'est pas un tournage réel. */
  disclosure: string | null;
  durationSeconds: number | null;
};

export function getHomeVideo(): HomeVideo | null {
  const dir = path.join(process.cwd(), "public", "video");
  const has = (f: string) => existsSync(path.join(dir, f));
  if (!has("campus-food.mp4")) return null;
  let meta: { title?: string; disclosure?: string; durationSeconds?: number } = {};
  if (has("meta.json")) {
    try {
      meta = JSON.parse(readFileSync(path.join(dir, "meta.json"), "utf8"));
    } catch {
      meta = {};
    }
  }
  return {
    mp4: "/video/campus-food.mp4",
    webm: has("campus-food.webm") ? "/video/campus-food.webm" : null,
    poster: has("poster.jpg") ? "/video/poster.jpg" : null,
    captions: has("sous-titres-fr.vtt") ? "/video/sous-titres-fr.vtt" : null,
    title: meta.title?.trim() || "Campus Food en situation sur le campus",
    disclosure: meta.disclosure?.trim() || null,
    durationSeconds: typeof meta.durationSeconds === "number" ? meta.durationSeconds : null,
  };
}
