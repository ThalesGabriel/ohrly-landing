"use client";

import { useEffect, useState } from "react";
import {
  hasConsentDecision,
  readConsent,
  writeConsent,
} from "@/lib/campaign/consent";

export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [customize, setCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const current = readConsent();
    setAnalytics(current.analytics);
    setMarketing(current.marketing);
    setOpen(!hasConsentDecision());
  }, []);

  function save(value: { analytics: boolean; marketing: boolean }) {
    writeConsent(value);
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-[100] mx-auto max-w-7xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-4xl">
          <p className="font-semibold text-slate-950">
            Privacidade e medição da campanha
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Usamos analytics próprios para entender a experiência da página e,
            com sua autorização, tecnologias de marketing do Meta. Você pode
            continuar usando a página apenas com recursos essenciais.{" "}
            <a className="underline" href="/privacidade">
              Política de privacidade
            </a>.
          </p>
        </div>

        {!customize ? (
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800"
              onClick={() => save({ analytics: false, marketing: false })}
            >
              Somente essenciais
            </button>
            <button
              type="button"
              className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800"
              onClick={() => setCustomize(true)}
            >
              Preferências
            </button>
            <button
              type="button"
              className="rounded-xl bg-[#ff4b2f] px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => save({ analytics: true, marketing: true })}
            >
              Aceitar todos
            </button>
          </div>
        ) : (
          <div className="min-w-[280px] space-y-3">
            <label className="flex items-center justify-between gap-4 text-sm">
              <span>
                <strong className="block text-slate-900">Analytics</strong>
                <span className="text-slate-500">Supabase / funil da LP</span>
              </span>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
            </label>

            <label className="flex items-center justify-between gap-4 text-sm">
              <span>
                <strong className="block text-slate-900">Marketing</strong>
                <span className="text-slate-500">Meta Pixel/CAPI</span>
              </span>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
            </label>

            <button
              type="button"
              className="w-full rounded-xl bg-[#ff4b2f] px-4 py-2.5 text-sm font-semibold text-white"
              onClick={() => save({ analytics, marketing })}
            >
              Salvar preferências
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
