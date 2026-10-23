"use client";

import { FormEvent, useRef, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { validateDeletionRequest, type DeletionErrors } from "@/lib/deletionRequest";

const inputClass =
  "w-full rounded-xl border border-brand-primary/15 bg-white px-4 py-3 text-sm text-brand-primary placeholder:text-brand-muted/60 outline-none transition focus:border-brand-secondary focus:ring-4 focus:ring-brand-secondary/15 disabled:opacity-60 aria-[invalid=true]:border-red-400";

export function DeleteAccountForm() {
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<DeletionErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const openedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const busy = status === "sending";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (busy || inFlight.current) return;
    const check = validateDeletionRequest(contact, message);
    if (!check.ok) {
      setErrors(check.errors);
      setStatus("idle");
      setFeedback("");
      document.getElementById(check.errors.contact ? "delete-contact" : "delete-message")?.focus();
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/suppression-compte", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: check.clean.contact,
          message: check.clean.message,
          website: honeypot,
          startedAt: openedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string; fields?: DeletionErrors };
      if (res.status === 201 && data.ok) {
        setStatus("done");
        setContact("");
        setMessage("");
        return;
      }
      if (data.fields) setErrors(data.fields);
      setFeedback(data.message ?? "Votre demande n'a pas pu être enregistrée. Merci de réessayer.");
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
      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden />
        <h2 className="mt-4 text-2xl font-extrabold text-brand-primary">Demande bien reçue</h2>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-brand-muted">
          Votre demande de suppression est enregistrée. Le compte n&apos;est pas encore supprimé : Campus Food doit
          d&apos;abord vérifier que vous en êtes le titulaire, puis vous recontactera sur le numéro ou l&apos;adresse
          indiqués.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-3xl border border-brand-primary/10 bg-white p-6 shadow-premium sm:p-8" noValidate>
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="delete-website">Site web</label>
        <input id="delete-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div>
        <label htmlFor="delete-contact" className="text-sm font-bold text-brand-primary">
          Numéro de téléphone ou adresse e-mail du compte
        </label>
        <input
          id="delete-contact"
          name="contact"
          type="text"
          autoComplete="username"
          inputMode="text"
          required
          maxLength={160}
          placeholder="+243 … ou nom@exemple.com"
          value={contact}
          disabled={busy}
          aria-invalid={!!errors.contact}
          aria-describedby={errors.contact ? "delete-contact-error" : undefined}
          className={`${inputClass} mt-2`}
          onChange={(e) => {
            setContact(e.target.value);
            if (errors.contact) setErrors((s) => ({ ...s, contact: "" }));
          }}
        />
        {errors.contact ? (
          <p id="delete-contact-error" className="mt-2 text-sm font-semibold text-red-600">
            {errors.contact}
          </p>
        ) : null}
      </div>

      <div className="mt-5">
        <label htmlFor="delete-message" className="text-sm font-bold text-brand-primary">
          Précisez votre demande <span className="font-semibold text-brand-muted">(facultatif)</span>
        </label>
        <textarea
          id="delete-message"
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Par exemple : je n'utilise plus l'application."
          value={message}
          disabled={busy}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "delete-message-error" : undefined}
          className={`${inputClass} mt-2 resize-y`}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((s) => ({ ...s, message: "" }));
          }}
        />
        {errors.message ? (
          <p id="delete-message-error" className="mt-2 text-sm font-semibold text-red-600">
            {errors.message}
          </p>
        ) : null}
      </div>

      {feedback ? (
        <p className="mt-4 text-sm font-semibold text-red-600" role="alert">
          {feedback}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-3 text-sm font-bold text-white shadow-premium transition hover:scale-[1.01] disabled:cursor-wait disabled:opacity-70 sm:w-auto"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        Demander la suppression de mon compte
      </button>
    </form>
  );
}
