"use client";

import { useEffect, useState } from "react";

type PublicSignalState = {
  ok: boolean;
  visible: boolean;
  epoch?: {
    version: string;
    state: string;
    startedAt: string;
  } | null;
  evidence?: {
    evaluatedAt: string | null;
    matureSessions: number;
    maturePositives: number;
    recommendationStatus: string | null;
    expectedLift: number;
    expectedSupplyRate: number;
    expectedWeeklyMetaSupply: number;
  } | null;
};

export function LiveSignalEvidence() {
  const [state, setState] = useState<PublicSignalState | null>(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_OHRLY_SIGNAL_EVIDENCE_ENABLED !== "true") {
      return;
    }

    let cancelled = false;
    const refresh = () => {
      fetch("/api/qualification/public", {
        cache: "no-store",
        credentials: "same-origin",
      })
        .then((response) => response.json())
        .then((body: PublicSignalState) => {
          if (!cancelled) setState(body);
        })
        .catch(() => undefined);
    };

    refresh();
    const timer = window.setInterval(refresh, 60_000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  if (!state?.ok || !state.visible || !state.epoch || !state.evidence) {
    return null;
  }

  const { epoch, evidence } = state;

  return (
    <section
      className="border-y border-stone-200 bg-[#fffaf3] py-12 lg:py-16"
      data-analytics-section="live_signal_evidence"
    >
      <div className="mx-auto w-[min(calc(100%_-_2rem),1160px)] sm:w-[min(calc(100%_-_2.5rem),1160px)]">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f] sm:text-[11px]">
          Ohrly rodando no próprio Ohrly
        </p>
        <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4vw,3.3rem)] font-black leading-[1.02] tracking-[-0.055em] text-stone-950">
          O sinal de aquisição é avaliado antes de virar uma nova policy.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
          O controlador observa supply, aproximação de intenção e estabilidade em
          janelas futuras independentes. Durante o shadow mode, nenhuma recomendação
          altera a campanha.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric label="Sessões maduras" value={String(evidence.matureSessions)} />
          <Metric label="FormStarts maduros" value={String(evidence.maturePositives)} />
          <Metric
            label="Lift esperado"
            value={evidence.expectedLift > 0 ? `${evidence.expectedLift.toFixed(1)}×` : "coletando"}
          />
          <Metric label="Estado" value={epoch.state.replaceAll("_", " ")} />
        </div>

        <p className="mt-4 text-[11px] leading-5 text-stone-500">
          Evidência observacional do tráfego do próprio Ohrly; não representa causalidade
          nem garantia de performance para terceiros.
        </p>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5">
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">
        {label}
      </span>
      <strong className="mt-2 block text-2xl font-black tracking-[-0.05em] text-stone-950">
        {value}
      </strong>
    </div>
  );
}
