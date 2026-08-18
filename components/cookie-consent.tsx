"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/tracking/consent";
import { trackBehavior } from "@/lib/tracking/client";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const shouldShow = !getConsent();

    setVisible(shouldShow);

    if (shouldShow) {
      void trackBehavior("cookie_banner_view");
    }
  }, []);

  if (!visible) return null;

  function save(
    analytics: boolean,
    marketing: boolean,
    choice: "all" | "analytics" | "essential",
  ) {
    void trackBehavior("cookie_choice", {
      choice,
      analytics,
      marketing,
    });

    setConsent({ analytics, marketing });
    setVisible(false);
  }

  return (
    <>
      {/* MOBILE */}
      <div className="fixed inset-0 z-[100] flex items-end bg-black/25 p-3 backdrop-blur-[1px] sm:hidden">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-title-mobile"
          className="w-full rounded-[24px] border border-stone-200 bg-white p-5 shadow-2xl"
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-stone-200" />

          <p
            id="cookie-title-mobile"
            className="text-sm font-black tracking-[-0.025em] text-stone-950"
          >
            Medição e privacidade
          </p>

          <p className="mt-2 text-sm leading-5 text-stone-500">
            Usamos telemetria própria para entender o uso básico da página.
            Com sua autorização, podemos fazer análises mais detalhadas. A Meta
            só é ativada quando você aceita marketing.
          </p>

          <div className="mt-5 grid gap-2">
            <button
              type="button"
              onClick={() => save(true, true, "all")}
              className="min-h-12 rounded-full bg-[#213f2d] px-4 text-xs font-black text-white transition active:bg-[#e95f10]"
            >
              Aceitar todos
            </button>

            <button
              type="button"
              onClick={() => save(true, false, "analytics")}
              className="min-h-12 rounded-full border border-stone-300 bg-white px-4 text-xs font-black text-stone-900"
            >
              Aceitar medição
            </button>

            <button
              type="button"
              onClick={() => save(false, false, "essential")}
              className="min-h-11 rounded-full px-4 text-xs font-bold text-stone-500"
            >
              Somente essencial
            </button>
          </div>
        </div>
      </div>

      {/* DESKTOP */}
      <div className="fixed inset-x-3 bottom-3 z-50 mx-auto hidden max-w-7xl rounded-2xl border border-stone-200 bg-white p-5 shadow-2xl shadow-black/10 sm:block">
          <div>
            <p className="text-sm font-black text-stone-950">
              Medição e privacidade
            </p>

            <p className="mt-1 max-w-5xl text-xs leading-5 text-stone-600">
              Usamos telemetria própria para entender o uso básico da página.
              Com sua autorização, podemos fazer análises mais detalhadas. A
              Meta só é ativada quando você aceita marketing.
            </p>
          </div>

          <div className="flex min-w-[180px] justify-between gap-2 mt-5">

            <button
              type="button"
              onClick={() => save(false, false, "essential")}
              className="rounded-full px-4 py-2.5 text-xs font-bold text-stone-500 transition hover:bg-stone-50 hover:text-stone-900"
            >
              Somente essencial
            </button>

            <button
              type="button"
              onClick={() => save(true, false, "analytics")}
              className="rounded-full border border-stone-300 bg-white px-4 py-2.5 text-xs font-black text-stone-900 transition hover:bg-stone-50"
            >
              Aceitar medição
            </button>
            
            <button
              type="button"
              onClick={() => save(true, true, "all")}
              className="rounded-full bg-[#213f2d] px-4 py-2.5 text-xs font-black text-white transition hover:bg-[#e95f10]"
            >
              Aceitar todos
            </button>
            
          </div>
      </div>
    </>
  );
}
