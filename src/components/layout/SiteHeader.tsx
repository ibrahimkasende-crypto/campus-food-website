"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LaunchCountdown } from "@/components/layout/LaunchCountdown";
import { CampusLogo } from "@/components/brand/CampusLogo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/fonctionnalites", label: "Fonctionnalités" },
  { href: "/telechargement", label: "Télécharger" },
  { href: "/faq", label: "FAQ" },
  { href: "/a-propos", label: "À propos" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader({ initialNow }: { initialNow: number }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-brand-primary/10">
      <LaunchCountdown initialNow={initialNow} />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-[4.5rem]">
        <CampusLogo size="sm" />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-200",
                pathname === l.href
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-brand-muted hover:bg-white hover:text-brand-primary"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/telechargement"
            className="hidden rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-2.5 text-sm font-bold text-white shadow-premium transition hover:scale-[1.03] hover:shadow-glow sm:inline-flex"
          >
            Télécharger
          </Link>
          <button
            type="button"
            className="rounded-xl p-2 text-brand-primary lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-brand-primary/10 bg-white/95 px-4 py-4 lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "block rounded-xl px-3 py-3 text-sm font-semibold",
                pathname === l.href ? "text-brand-primary" : "text-brand-muted"
              )}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/telechargement"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-2xl bg-brand-primary py-3 text-center text-sm font-bold text-white"
          >
            Télécharger l&apos;app
          </Link>
        </nav>
      )}
    </header>
  );
}
