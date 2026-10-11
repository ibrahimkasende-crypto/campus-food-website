import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // L'indicateur flottant « N » de Next.js n'existe qu'en mode développement : on le masque pour qu'il n'apparaisse
  // jamais devant un visiteur (le build de production ne l'inclut pas). Les erreurs restent visibles dans le terminal
  // et la console du navigateur.
  devIndicators: false,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos du catalogue (stockage public Supabase du projet Campus Food).
    remotePatterns: [
      { protocol: "https", hostname: "jgwzugusmieandeofyzf.supabase.co", pathname: "/storage/v1/object/public/food-items/**" },
    ],
  },
};

export default nextConfig;
