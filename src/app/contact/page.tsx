"use client";

import Link from "next/link";
import { Handshake, Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { contactEmail, whatsappLink } from "@/lib/site";

export default function ContactPage() {
  const wa = whatsappLink("Bonjour Campus Food,");
  return (
    <>
      <PageHero
        title="Contact"
        subtitle="Une question, un partenariat, une suggestion ? Voici comment joindre l'équipe Campus Food."
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-14 sm:px-6 sm:py-20">
        <SectionReveal>
          <div className="rounded-3xl border border-brand-primary/10 bg-white p-8 shadow-premium sm:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary">
              <Mail className="h-6 w-6" />
            </div>
            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-brand-muted">E-mail</p>
            {contactEmail.ready ? (
              <a
                href={`mailto:${contactEmail.address}`}
                className="mt-2 block text-2xl font-extrabold text-brand-primary transition hover:text-brand-secondary"
              >
                {contactEmail.address}
              </a>
            ) : (
              <p className="mt-2 text-brand-muted">
                L&apos;adresse e-mail professionnelle de Campus Food sera publiée ici dès qu&apos;elle sera ouverte.
              </p>
            )}
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-2.5 text-sm font-bold text-white shadow-premium transition hover:scale-[1.03] hover:shadow-glow"
              >
                <MessageCircle className="h-4 w-4" />
                Nous écrire sur WhatsApp
              </a>
            )}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.08}>
          <div className="flex gap-4 rounded-3xl bg-brand-background p-6 sm:p-8">
            <Handshake className="mt-1 h-6 w-6 shrink-0 text-brand-secondary" />
            <div>
              <p className="font-extrabold text-brand-primary">Vous êtes restaurateur ?</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-muted">
                Remplissez le formulaire de partenariat : notre équipe vous contactera.
              </p>
              <Link
                href="/#devenir-partenaire"
                className="mt-3 inline-block text-sm font-bold text-brand-secondary underline-offset-4 hover:underline"
              >
                Devenir restaurant partenaire
              </Link>
            </div>
          </div>
        </SectionReveal>
      </div>
    </>
  );
}
