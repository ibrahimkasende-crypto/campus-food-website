"use client";

import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, Bike, Building2, CheckCircle2, Landmark, Loader2, MessageCircle, Send, ShieldCheck, Handshake } from "lucide-react";
import { SectionReveal } from "@/components/animations/SectionReveal";
import { forms, joinTypes, validateJoin, type FieldDef, type JoinErrors, type JoinType, type JoinValues } from "@/lib/joinRequest";
import { whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "error";

const icons: Record<JoinType, typeof Building2> = { restaurant: Building2, driver: Bike, institution: Landmark };
const whatsappText: Record<JoinType, string> = {
  restaurant: "Bonjour, je suis restaurateur et je souhaite devenir partenaire de Campus Food.",
  driver: "Bonjour, je souhaite devenir livreur partenaire de Campus Food.",
  institution: "Bonjour, je souhaite proposer un partenariat à Campus Food.",
};

const inputClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-muted/60 outline-none transition focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/15 disabled:opacity-60 aria-[invalid=true]:border-red-400";

function Control({ f, id, value, onChange, error, disabled }: { f: FieldDef; id: string; value: string; onChange: (v: string) => void; error?: string; disabled: boolean }) {
  const common = {
    id,
    name: f.key,
    value,
    disabled,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-error` : undefined,
    className: inputClass,
  } as const;
  if (f.kind === "textarea") {
    return <textarea {...common} rows={4} maxLength={f.max} placeholder={f.placeholder} onChange={(e) => onChange(e.target.value)} className={`${inputClass} resize-y`} />;
  }
  if (f.kind === "select") {
    return (
      <select {...common} onChange={(e) => onChange(e.target.value)}>
        <option value="">Choisir…</option>
        {f.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }
  return (
    <input
      {...common}
      type={f.kind === "text" ? "text" : f.kind}
      inputMode={f.kind === "tel" ? "tel" : f.kind === "email" ? "email" : f.kind === "url" ? "url" : undefined}
      autoComplete={f.autoComplete}
      maxLength={f.max}
      placeholder={f.placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function JoinForm({ type }: { type: JoinType }) {
  const def = forms[type];
  const [values, setValues] = useState<JoinValues>({});
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<JoinErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const openedAt = useRef<number>(Date.now());
  const inFlight = useRef(false); // garde synchrone : deux envois dans le même instant ne partent qu'une fois
  const busy = status === "sending";
  const pid = (k: string) => `join-${type}-${k}`;

  const setValue = (key: string) => (v: string) => {
    setValues((s) => ({ ...s, [key]: v }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy || inFlight.current) return; // anti double envoi
    const check = validateJoin(type, values, consent);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      setFeedback("");
      const first = Object.keys(check.errors)[0];
      document.getElementById(pid(first))?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/partenaires", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, values: check.clean, consent: true, website: honeypot, startedAt: openedAt.current }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; fields?: JoinErrors };
      if (res.ok && data.ok) {
        setStatus("done");
        setValues({});
        setConsent(false);
        return;
      }
      if (data.fields) setErrors(data.fields);
      setFeedback(data.message ?? "Votre demande n'a pas pu être envoyée. Merci de réessayer.");
      setStatus("error");
    } catch {
      setFeedback("Connexion impossible. Vérifiez votre connexion Internet et réessayez.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
        <CheckCircle2 className="mx-auto h-14 w-14 text-emerald-500" />
        <h3 className="mt-5 text-2xl font-extrabold text-brand-primary">Merci pour votre intérêt pour Campus Food</h3>
        <p className="mx-auto mt-3 max-w-sm text-brand-muted">
          Votre demande a été transmise à notre équipe. Nous vous contacterons après examen.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            openedAt.current = Date.now();
          }}
          className="mt-6 text-sm font-bold text-brand-secondary underline-offset-4 hover:underline"
        >
          Envoyer une autre demande
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2" aria-busy={busy} aria-label={def.title}>
      <p className="text-sm leading-relaxed text-brand-muted sm:col-span-2">{def.intro}</p>
      {def.fields.map((f) => (
        <div key={f.key} className={f.wide ? "sm:col-span-2" : undefined}>
          <label htmlFor={pid(f.key)} className="mb-1.5 block text-sm font-semibold text-brand-primary">
            {f.label}
            {f.required ? <span className="text-brand-secondary"> *</span> : <span className="font-normal text-brand-muted"> (facultatif)</span>}
          </label>
          <Control f={f} id={pid(f.key)} value={values[f.key] ?? ""} onChange={setValue(f.key)} error={errors[f.key]} disabled={busy} />
          {errors[f.key] ? (
            <p id={`${pid(f.key)}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {errors[f.key]}
            </p>
          ) : (
            f.hint && <p className="mt-1.5 text-xs text-brand-muted">{f.hint}</p>
          )}
        </div>
      ))}

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-sm text-brand-primary">
          <input
            id={pid("consent")}
            type="checkbox"
            checked={consent}
            disabled={busy}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (errors.consent) setErrors((er) => ({ ...er, consent: "" }));
            }}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${pid("consent")}-error` : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 accent-[#D90416]"
          />
          <span>
            Je confirme que ces informations sont exactes et j&apos;accepte qu&apos;elles soient traitées par Campus Food pour
            examiner ma demande. <span className="text-brand-secondary">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id={`${pid("consent")}-error`} role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-600">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            {errors.consent}
          </p>
        )}
      </div>

      {/* Champ piège : invisible pour les personnes, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={pid("website")}>Ne pas remplir</label>
        <input id={pid("website")} name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {status === "error" && feedback && (
        <p role="alert" className="flex items-start gap-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700 sm:col-span-2">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          {feedback}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent px-7 py-4 text-base font-bold text-white shadow-premium-lg transition duration-300 hover:scale-[1.01] hover:shadow-glow active:scale-[0.99] disabled:cursor-wait disabled:opacity-80 disabled:hover:scale-100"
        >
          {busy ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> Envoi en cours…
            </>
          ) : (
            <>
              <Send className="h-5 w-5" /> {def.submit}
            </>
          )}
        </button>
      </div>
    </form>
  );
}

/** Section « Rejoindre Campus Food » : trois parcours distincts, chacun avec son formulaire. */
export function JoinSection() {
  const [type, setType] = useState<JoinType>("restaurant");
  const whatsapp = whatsappLink(whatsappText[type]);
  return (
    <section id="rejoindre" className="relative overflow-hidden py-20 sm:py-28">
      <div id="devenir-partenaire" className="absolute -top-20" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-primary via-[#C42A08] to-brand-secondary" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.18),transparent_45%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionReveal className="mx-auto max-w-2xl text-center text-white">
          <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
            <Handshake className="h-7 w-7" />
          </span>
          <h2 className="mt-6 text-3xl font-extrabold leading-tight text-balance sm:text-4xl lg:text-5xl">Rejoindre Campus Food</h2>
          <p className="mt-4 text-lg text-white/90">
            Restaurant, livreur ou partenaire : choisissez votre profil, remplissez un court formulaire et notre équipe
            étudiera votre demande.
          </p>
        </SectionReveal>

        <div role="tablist" aria-label="Type de demande" className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
          {joinTypes.map((t) => {
            const Icon = icons[t];
            const active = t === type;
            return (
              <button
                key={t}
                role="tab"
                id={`join-tab-${t}`}
                aria-selected={active}
                aria-controls="join-panel"
                onClick={() => setType(t)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition",
                  active ? "border-white bg-white text-brand-primary shadow-premium-lg" : "border-white/30 bg-white/10 text-white hover:bg-white/20"
                )}
              >
                <Icon className="h-6 w-6 shrink-0" />
                <span className="text-sm font-extrabold leading-tight">{forms[t].tab}</span>
              </button>
            );
          })}
        </div>

        <SectionReveal delay={0.05} className="mx-auto mt-6 max-w-3xl">
          <div id="join-panel" role="tabpanel" aria-labelledby={`join-tab-${type}`} className="relative rounded-3xl bg-white p-6 shadow-premium-lg sm:p-8">
            <h3 className="mb-4 text-xl font-extrabold text-brand-primary">{forms[type].title}</h3>
            <AnimatePresence mode="wait">
              <motion.div key={type} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <JoinForm type={type} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-4 text-sm text-white/85 sm:flex-row">
            <p className="flex items-start gap-2">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              Vos informations sont transmises uniquement à l&apos;équipe Campus Food pour traiter votre demande.
            </p>
            {whatsapp && (
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-white px-5 py-2.5 font-bold text-brand-primary shadow-premium transition hover:scale-[1.03]"
              >
                <MessageCircle className="h-4 w-4" />
                Nous écrire sur WhatsApp
              </a>
            )}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
