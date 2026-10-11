import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { contactEmail, site, socialLinks, whatsappLink } from "@/lib/site";

const navLinks = [
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/telechargement", label: "Téléchargement" },
  { href: "/faq", label: "FAQ" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/confidentialite", label: "Confidentialité" },
  { href: "/conditions", label: "Conditions d'utilisation" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export function SiteFooter() {
  const socials = socialLinks();
  const wa = whatsappLink();
  return (
    <footer className="border-t border-brand-primary/10 bg-gradient-to-b from-white to-[#FFF8F5]">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo-icone-app-sans-fond.png" alt="Logo Campus Food" width={52} height={52} className="object-contain" />
            <p className="text-lg font-extrabold text-brand-primary">{site.name}</p>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-muted">
            La plateforme food tech qui réunit étudiants, restaurants et livreurs sur les campus universitaires.
          </p>
          <a
            href={site.url}
            className="mt-4 inline-block text-sm font-bold text-brand-primary underline-offset-4 transition hover:text-brand-secondary hover:underline"
          >
            {site.domain}
          </a>
          {socials.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Réseaux sociaux officiels">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-brand-primary/15 bg-white px-3 py-1.5 text-xs font-bold text-brand-primary transition hover:border-brand-secondary hover:text-brand-secondary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Navigation du site">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Le site</p>
          <ul className="mt-4 space-y-2.5 text-sm font-semibold text-brand-muted">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-brand-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Contact</p>
          <ul className="mt-4 space-y-3 text-sm font-semibold text-brand-muted">
            {contactEmail.ready ? (
              <li>
                <a href={`mailto:${contactEmail.address}`} className="flex items-center gap-2 transition hover:text-brand-primary">
                  <Mail className="h-4 w-4 shrink-0 text-brand-secondary" />
                  {contactEmail.address}
                </a>
              </li>
            ) : (
              <li>
                <Link href="/contact" className="flex items-center gap-2 transition hover:text-brand-primary">
                  <Mail className="h-4 w-4 shrink-0 text-brand-secondary" />
                  Nous contacter
                </Link>
              </li>
            )}
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition hover:text-brand-primary">
                  <MessageCircle className="h-4 w-4 shrink-0 text-brand-secondary" />
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <Link href="/#devenir-partenaire" className="transition hover:text-brand-primary">
                Devenir restaurant partenaire
              </Link>
            </li>
          </ul>
          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-brand-secondary">Légal</p>
          <ul className="mt-3 space-y-2.5 text-sm font-semibold text-brand-muted">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition hover:text-brand-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Télécharger</p>
          <StoreBadges size="md" className="mt-4 flex-col !items-start gap-y-7" />
        </div>
      </div>
      <div className="border-t border-brand-primary/10 px-4 py-6 text-center text-xs font-medium text-brand-muted/80">
        <p>Campus Food est le premier produit développé dans l&apos;écosystème de{" "}
          <a href="https://newsystemcorps.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline-offset-4 hover:text-brand-primary hover:underline">
            New System Corporation
          </a>
          .
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Campus Food — {site.domain}
        </p>
      </div>
    </footer>
  );
}
