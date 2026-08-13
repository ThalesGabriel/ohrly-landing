"use client";

import { useEffect, useState } from "react";
import { getConsent, setConsent } from "@/lib/tracking/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!getConsent());
  }, []);

  if (!visible) return null;

  function save(analytics: boolean, marketing: boolean) {
    setConsent({ analytics, marketing });
    setVisible(false);
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-4 shadow-2xl shadow-black/10 sm:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black text-stone-950">Medição e privacidade</p>
          <p className="mt-1 max-w-xl text-xs leading-5 text-stone-600">
            Usamos medição própria para entender a navegação. A medição da Meta só é ativada quando você aceita marketing.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => save(true, true)}
            className="cursor-pointer rounded-full bg-[#ff6f1f] px-4 py-2 text-xs font-black text-white transition hover:bg-[#e95f10]"
          >
            Aceitar todos
          </button>
        </div>
      </div>
    </div>
  );
}
