"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, QrCode, Smartphone } from "lucide-react";
import { StoreBadges } from "@/components/ui/StoreBadges";
import { androidIntentUrl, detectPlatform, type Platform } from "@/lib/appLink";

type Props = { playUrl: string | null; appStoreUrl: string | null; downloadUrl: string };

function Qr({ value }: { value: string }) {
  const [svg, setSvg] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    import("qrcode")
      .then((m) => m.toString(value, { type: "svg", margin: 1, width: 192, color: { dark: "#1B2230", light: "#FFFFFF" } }))
      .then((s) => alive && setSvg(s))
      .catch(() => alive && setSvg(null));
    return () => {
      alive = false;
    };
  }, [value]);
  if (!svg) return null;
  return (
    <div
      role="img"
      aria-label="QR code vers la page de téléchargement de Campus Food"
      className="mx-auto h-48 w-48 overflow-hidden rounded-2xl border border-brand-primary/10 bg-white p-2 shadow-premium"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

/**
 * Passerelle « Commander » : Android → ouvre l'application (sinon fiche Google Play ou page de téléchargement) ;
 * iPhone → App Store si la fiche est publiée, sinon page de téléchargement ; ordinateur → options et QR code.
 * Le repli ne renvoie jamais vers cette page (pas de boucle).
 */
export function OrderGateway({ playUrl, appStoreUrl, downloadUrl }: Props) {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const fallback = playUrl ?? downloadUrl;
  const intent = androidIntentUrl(fallback);

  useEffect(() => {
    const p = detectPlatform(navigator.userAgent, navigator.maxTouchPoints);
    setPlatform(p);
    if (p === "android") {
      const t = setTimeout(() => window.location.assign(androidIntentUrl(playUrl ?? downloadUrl)), 400);
      return () => clearTimeout(t);
    }
  }, [playUrl, downloadUrl]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-24">
      <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 text-brand-primary">
        <Smartphone className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-brand-primary sm:text-4xl">Commandez dans l&apos;application</h1>

      {platform === null && (
        <p className="mt-6 flex items-center justify-center gap-2 text-brand-muted" role="status">
          <Loader2 className="h-5 w-5 animate-spin" /> Un instant…
        </p>
      )}

      {platform === "android" && (
        <div className="mt-6" role="status">
          <p className="flex items-center justify-center gap-2 text-brand-muted">
            <Loader2 className="h-5 w-5 animate-spin" /> Ouverture de Campus Food…
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted">
            Si l&apos;application n&apos;est pas installée, vous serez dirigé vers Google Play. Elle est en test fermé :
            rejoignez d&apos;abord le programme depuis la page de téléchargement.
          </p>
          <a
            href={intent}
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-7 py-3.5 text-base font-bold text-white shadow-premium"
          >
            Ouvrir Campus Food
          </a>
          <p className="mt-4 text-sm">
            <a
              href={fallback}
              target={playUrl ? "_blank" : undefined}
              rel={playUrl ? "noopener noreferrer" : undefined}
              className="font-bold text-brand-secondary underline-offset-4 hover:underline"
            >
              Installer l&apos;application
            </a>
          </p>
        </div>
      )}

      {platform === "ios" && (
        <div className="mt-6">
          <p className="mx-auto max-w-md text-brand-muted">
            {appStoreUrl
              ? "Installez Campus Food depuis l'App Store, puis revenez commander."
              : "Campus Food arrive bientôt sur l'App Store. Consultez la page de téléchargement pour suivre sa disponibilité."}
          </p>
          <div className="mt-6">
            <StoreBadges size="lg" align="center" />
          </div>
          <Link href="/telechargement" className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-brand-secondary underline-offset-4 hover:underline">
            Page de téléchargement <ExternalLink className="h-4 w-4" />
          </Link>
        </div>
      )}

      {platform === "desktop" && (
        <div className="mt-6">
          <p className="mx-auto max-w-md text-brand-muted">
            Campus Food est une application mobile. Scannez ce QR code avec votre téléphone pour accéder au téléchargement.
          </p>
          <div className="mt-6">
            <Qr value={downloadUrl} />
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-brand-muted">
              <QrCode className="h-4 w-4" /> {downloadUrl.replace(/^https?:\/\//, "")}
            </p>
          </div>
          <div className="mt-8">
            <StoreBadges size="lg" align="center" />
          </div>
        </div>
      )}
    </div>
  );
}
