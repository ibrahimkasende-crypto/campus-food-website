import type { Metadata } from "next";
import type { Viewport } from "next";
import { Poppins } from "next/font/google";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { site } from "@/lib/site";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    locale: "fr_CD",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: "/lancement/affiche-lancement.jpg", width: 1559, height: 2000, alt: "Affiche du grand lancement de Campus Food" }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} — ${site.tagline}`, description: site.description },
  // icônes : src/app/favicon.ico, icon.png et apple-icon.png (détectées automatiquement) + manifest.ts
};

export const viewport: Viewport = { themeColor: "#D90416" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} min-h-screen font-sans antialiased`}>
        <SiteHeader initialNow={Date.now()} />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
