import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Campus Food",
    short_name: "Campus Food",
    description: "La food tech de votre campus : commandez, payez et suivez votre livraison.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFF6F2",
    theme_color: "#D90416",
    lang: "fr",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
