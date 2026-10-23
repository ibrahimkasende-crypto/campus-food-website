import { cn } from "@/lib/utils";
import { appStoreUrl, googlePlayUrl } from "@/lib/downloads";

/**
 * Badges de téléchargement (Google Play / App Store).
 *
 * - Google Play : badge cliquable vers la fiche officielle (src/lib/downloads.ts).
 * - App Store : badge cliquable seulement si l'adresse définitive est configurée, sinon « Bientôt disponible ».
 *
 * Les pictogrammes sont des vecteurs fidèles à la mise en page des badges officiels. À la publication, les fichiers
 * officiels fournis par Google et Apple (ressources de marque des programmes développeur) peuvent les remplacer.
 */

function GooglePlayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path fill="#00D95F" d="m12.207 10.065 3.258-3.238L3.45.195a1.466 1.466 0 0 0-.946-.179l11.04 10.973z" />
      <path fill="#00B0FF" d="M1.337.924a1.486 1.486 0 0 0-.112.568v21.017c0 .217.045.419.124.6l11.155-11.087L1.337.924z" />
      <path fill="#FF3D4B" d="m13.544 13.056-11 10.933c.298.036.612-.016.906-.183l13.324-7.54-3.23-3.21z" />
      <path fill="#FFC400" d="m22.018 13.298-3.919 2.218-3.515-3.493 3.543-3.521 3.891 2.202a1.49 1.49 0 0 1 0 2.594z" />
    </svg>
  );
}

function AppleMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

type BadgeProps = {
  href: string | null;
  store: "google" | "apple";
  size?: "md" | "lg";
  className?: string;
};

function Badge({ href, store, size = "md", className }: BadgeProps) {
  const google = store === "google";
  const available = !!href;
  const body = (
    <>
      {google ? (
        <GooglePlayMark className={cn(size === "lg" ? "h-9 w-9" : "h-7 w-7", "shrink-0")} />
      ) : (
        <AppleMark className={cn(size === "lg" ? "h-9 w-9" : "h-7 w-7", "shrink-0")} />
      )}
      <span className="flex flex-col text-left leading-none">
        <span className={cn("font-medium uppercase tracking-wide text-white/80", size === "lg" ? "text-[10px]" : "text-[9px]")}>
          {google ? "Disponible sur" : "Télécharger dans"}
        </span>
        <span className={cn("mt-1 font-semibold text-white", size === "lg" ? "text-xl" : "text-base")}>
          {google ? "Google Play" : "l'App Store"}
        </span>
      </span>
    </>
  );
  const base = cn(
    "relative inline-flex items-center gap-3 rounded-xl border border-white/20 bg-black px-4 text-white shadow-premium",
    size === "lg" ? "h-16 min-w-[11.5rem]" : "h-12 min-w-[9.5rem]",
    className
  );

  if (available) {
    return (
      <a
        href={href!}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={google ? "Télécharger Campus Food sur Google Play" : "Télécharger Campus Food sur l'App Store"}
        className={cn(base, "transition duration-300 hover:-translate-y-0.5 hover:shadow-glow")}
      >
        {body}
      </a>
    );
  }
  return (
    <span
      role="img"
      aria-label={`${google ? "Google Play" : "App Store"} : bientôt disponible`}
      title="Bientôt disponible"
      className={cn(base, "cursor-not-allowed opacity-70")}
    >
      {body}
      <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand-accent px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-black shadow">
        Bientôt disponible
      </span>
    </span>
  );
}

export function StoreBadges({
  size = "md",
  className,
  align = "start",
}: {
  size?: "md" | "lg";
  className?: string;
  align?: "start" | "center";
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-6", align === "center" && "justify-center", className)}>
      <Badge store="google" href={googlePlayUrl()} size={size} />
      <Badge store="apple" href={appStoreUrl()} size={size} />
    </div>
  );
}
