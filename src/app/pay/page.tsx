"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Clock, Loader2, ShieldCheck, XCircle } from "lucide-react";

const API =
  (process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://jgwzugusmieandeofyzf.supabase.co").replace(/\/$/, "") +
  "/functions/v1/mm-pay";

type Session = {
  state: "open" | "pending" | "paid" | "expired" | "cancelled" | "invalid";
  order_number?: string;
  merchant_name?: string | null;
  subtotal_cdf?: number;
  delivery_fee_cdf?: number;
  total_cdf?: number;
  attempts_left?: number;
  last_failure?: string | null;
};

const OPERATORS = [
  { id: "airtel", label: "Airtel Money" },
  { id: "orange", label: "Orange Money" },
  { id: "mpesa", label: "M-Pesa" },
  { id: "africell", label: "Afrimoney" },
] as const;

const fc = (n?: number) => `${Math.round(n ?? 0).toLocaleString("fr-FR")} FC`;

function PayInner() {
  const token = useSearchParams().get("t") ?? "";
  const [session, setSession] = useState<Session | null>(null);
  const [operator, setOperator] = useState<string>("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [waiting, setWaiting] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    if (token.length < 16) {
      setSession({ state: "invalid" });
      return;
    }
    try {
      const res = await fetch(`${API}?t=${encodeURIComponent(token)}`, { cache: "no-store" });
      setSession((await res.json()) as Session);
    } catch {
      setMessage("Connexion impossible. Vérifiez votre réseau.");
    }
  }, [token]);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    if (timer.current) clearInterval(timer.current);
    if (waiting || session?.state === "pending") {
      timer.current = setInterval(() => void load(), 3000);
    }
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [waiting, session?.state, load]);

  useEffect(() => {
    if (!session) return;
    if (session.state === "paid") setWaiting(false);
    if (waiting && session.state === "open") {
      setWaiting(false);
      setMessage(session.last_failure ? "Le paiement n'a pas abouti. Vous pouvez réessayer." : null);
    }
  }, [session, waiting]);

  async function pay() {
    setMessage(null);
    setBusy(true);
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ t: token, operator, phone }),
      });
      const data = (await res.json()) as { state?: string; message?: string };
      if (data.state === "pending") {
        setWaiting(true);
        setMessage(data.message ?? null);
      } else if (data.state === "paid") {
        void load();
      } else {
        setMessage(data.message ?? "Le paiement n'a pas pu être lancé.");
      }
    } catch {
      setMessage("Connexion impossible. Réessayez.");
    } finally {
      setBusy(false);
    }
  }

  const s = session?.state;
  const canPay = operator !== "" && phone.replace(/\D/g, "").length >= 9 && !busy;

  return (
    <div className="mx-auto max-w-md px-4 py-10 sm:py-14">
      <div className="rounded-3xl border border-brand-primary/10 bg-white p-6 shadow-premium">
        <div className="mb-5 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-icone-app-sans-fond.png" alt="Campus Food" className="h-10 w-10 object-contain" />
          <div>
            <p className="text-lg font-extrabold text-brand-primary">Campus Food</p>
            <p className="text-xs text-brand-muted">Paiement Mobile Money</p>
          </div>
        </div>

        {!session && !message && (
          <div className="flex items-center gap-2 py-8 text-brand-muted">
            <Loader2 className="h-5 w-5 animate-spin" /> Chargement…
          </div>
        )}

        {(s === "invalid" || s === "expired" || s === "cancelled") && (
          <div className="py-6 text-center">
            <XCircle className="mx-auto h-12 w-12 text-brand-primary" />
            <p className="mt-3 font-bold">
              {s === "cancelled" ? "Commande annulée" : s === "expired" ? "QR code expiré" : "QR code invalide"}
            </p>
            <p className="mt-1 text-sm text-brand-muted">
              {s === "cancelled"
                ? "Cette commande n'est plus à payer."
                : "Demandez au livreur d'afficher un nouveau QR code."}
            </p>
          </div>
        )}

        {s === "paid" && (
          <div className="py-6 text-center">
            <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
            <p className="mt-3 text-xl font-extrabold text-green-700">Paiement confirmé</p>
            <p className="mt-1 text-sm text-brand-muted">
              Commande {session?.order_number} · {fc(session?.total_cdf)}
            </p>
            <p className="mt-3 text-sm">Merci ! Votre reçu est disponible dans l&apos;application Campus Food.</p>
          </div>
        )}

        {(s === "open" || s === "pending") && session && (
          <>
            <div className="rounded-2xl bg-brand-primary/5 p-4 text-sm">
              <p className="font-semibold">
                Commande {session.order_number}
                {session.merchant_name ? ` · ${session.merchant_name}` : ""}
              </p>
              <div className="mt-2 space-y-1 text-brand-muted">
                <div className="flex justify-between"><span>Produits</span><span>{fc(session.subtotal_cdf)}</span></div>
                <div className="flex justify-between"><span>Livraison</span><span>{fc(session.delivery_fee_cdf)}</span></div>
              </div>
              <div className="mt-2 flex justify-between border-t border-brand-primary/10 pt-2 text-base font-extrabold text-brand-primary">
                <span>Total à payer</span>
                <span>{fc(session.total_cdf)}</span>
              </div>
            </div>

            {s === "pending" || waiting ? (
              <div className="py-6 text-center">
                <Clock className="mx-auto h-10 w-10 text-brand-secondary" />
                <p className="mt-3 font-bold">En attente de votre validation</p>
                <p className="mt-1 text-sm text-brand-muted">
                  Un message SerdiPay s&apos;affiche sur le téléphone du numéro saisi. Validez le paiement avec
                  votre code secret sur ce téléphone. Cette page se met à jour automatiquement.
                </p>
                <Loader2 className="mx-auto mt-4 h-5 w-5 animate-spin text-brand-muted" />
              </div>
            ) : (
              <div className="mt-5 space-y-4">
                <div>
                  <p className="mb-2 text-sm font-semibold">Votre opérateur</p>
                  <div className="grid grid-cols-2 gap-2">
                    {OPERATORS.map((o) => (
                      <button
                        key={o.id}
                        type="button"
                        onClick={() => setOperator(o.id)}
                        className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                          operator === o.id
                            ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                            : "border-gray-200 text-gray-700"
                        }`}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                    Numéro Mobile Money qui paie
                  </label>
                  <input
                    id="phone"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Ex. 0997 123 456"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-base outline-none focus:border-brand-primary"
                  />
                  <p className="mt-1 text-xs text-brand-muted">
                    Ce peut être le numéro d&apos;un proche : le paiement est validé sur son téléphone.
                  </p>
                </div>
                <button
                  type="button"
                  disabled={!canPay}
                  onClick={() => void pay()}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary px-4 py-4 text-base font-extrabold text-white shadow-premium transition disabled:opacity-50"
                >
                  {busy && <Loader2 className="h-5 w-5 animate-spin" />}
                  Payer {fc(session.total_cdf)}
                </button>
              </div>
            )}

            <p className="mt-4 flex items-start gap-2 text-xs text-brand-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
              Campus Food ne vous demande jamais votre code secret Mobile Money. Il se saisit uniquement sur le
              message officiel de votre opérateur.
            </p>
          </>
        )}

        {message && (
          <p className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800" role="status">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={null}>
      <PayInner />
    </Suspense>
  );
}
