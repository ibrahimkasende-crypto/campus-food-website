import Link from "next/link";
import type { DeletionApp } from "@/lib/deletionRequest";
import { privacyApps } from "@/lib/privacyApps";

/** Liens vers les trois applications. La page Client reste /confidentialite. */
export function PrivacyHub({ current }: { current: DeletionApp }) {
  return (
    <nav aria-label="Applications Campus Food" className="rounded-3xl bg-brand-background p-6">
      <h2>Quelle application utilisez-vous ?</h2>
      <ul>
        {privacyApps.map((app) => (
          <li key={app.id}>
            {app.id === current ? (
              <span aria-current="page">{app.label}</span>
            ) : (
              <Link className="font-bold text-brand-secondary underline" href={app.privacyHref}>
                {app.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <p>
        Pour demander la fermeture d&apos;un compte :{" "}
        {privacyApps.map((app, index) => (
          <span key={app.id}>
            {index > 0 ? ", " : null}
            <Link className="font-bold text-brand-secondary underline" href={app.deletionHref}>
              {app.id === "client" ? "Client" : app.id === "driver" ? "Livreur" : "Pro"}
            </Link>
          </span>
        ))}
        .
      </p>
      <p>
        Contact :{" "}
        <a className="font-bold text-brand-secondary underline" href="mailto:contact@campusfood.app">
          contact@campusfood.app
        </a>
        .
      </p>
    </nav>
  );
}
