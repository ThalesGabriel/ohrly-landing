"use client";

import { AttributedLink } from "@/components/attributed-link";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { trackBehavior } from "@/lib/tracking/client";
import {
  CONSENT_CHANGED_EVENT,
  getConsent,
} from "@/lib/tracking/consent";
import { trackMetaDemoStart } from "@/lib/tracking/meta-pixel";

const DEMO_ID = "intercom_behavior_example_v1";

const stages = [
  {
    eyebrow: "01 • Casos dispersos",
    sidebarTitle: "Casos dispersos",
    sidebarText: "Tickets que parecem independentes.",
    title: "Seu Intercom parece ter vários casos isolados.",
    description:
      "Cada conversa parece uma ocorrência independente. É assim que muitos problemas permanecem pequenos por tempo suficiente para virarem parte da rotina.",
  },
  {
    eyebrow: "02 • Mesmo problema",
    sidebarTitle: "Mesmo problema",
    sidebarText: "O padrão emerge entre conversas.",
    title: "O mesmo problema está aparecendo com nomes diferentes.",
    description:
      "Ohrly agrupa ocorrências semanticamente semelhantes e reconstrói como aquela repetição evoluiu ao longo do tempo.",
  },
  {
    eyebrow: "03 • Deixou de ser exceção",
    sidebarTitle: "Deixou de ser exceção",
    sidebarText: "A recorrência rompe o esperado.",
    title: "Em algum momento, deixou de ser exceção.",
    description:
      "A recorrência rompeu o comportamento esperado e permaneceu elevada. O ponto importante não é apenas o pico, mas a ausência de recuperação.",
  },
  {
    eyebrow: "04 • Impacto consolidado",
    sidebarTitle: "Impacto consolidado",
    sidebarText: "Contas, trabalho e valor associado.",
    title: "A repetição já tem uma dimensão operacional.",
    description:
      "Ohrly consolida quem foi afetado, quanto trabalho foi absorvido e qual valor econômico estava associado à condição, sem inventar causalidade.",
  },
  {
    eyebrow: "05 • Onde agir primeiro",
    sidebarTitle: "Onde agir primeiro",
    sidebarText: "Uma prioridade concreta para investigar.",
    title: "Agora existe um lugar concreto para investigar primeiro.",
    description:
      "O objetivo final não é produzir mais um dashboard. É transformar comportamento disperso em uma prioridade operacional.",
  },
] as const;

const tickets = [
  [
    "Conta Aurora",
    "há 6 dias",
    "A exportação do relatório ficou processando e não terminou.",
  ],
  [
    "Conta Plume",
    "há 4 dias",
    "O CSV baixou vazio de novo. Conseguem gerar pra gente?",
  ],
  [
    "Conta Nimbo",
    "há 2 dias",
    "Erro ao exportar. Fizemos duas tentativas e continua igual.",
  ],
  [
    "Conta Lume",
    "hoje",
    "Precisamos do relatório para fechar o mês. O download não conclui.",
  ],
] as const;

const clusterExamples = [
  "exportação ficou processando",
  "CSV baixou vazio",
  "erro ao exportar",
  "download não conclui",
];

const weeklyOccurrences = [2, 3, 6, 11, 19];

const ruptureMetrics = [
  [
    "Semanas acima do esperado",
    "4",
    "A condição não voltou ao padrão anterior.",
  ],
  [
    "Contas afetadas",
    "11",
    "O problema deixou de estar concentrado.",
  ],
  [
    "Contas recorrentes",
    "4",
    "As mesmas contas retornaram com a mesma fricção.",
  ],
  [
    "Tempo de resolução",
    "2,3×",
    "Comparado ao comportamento de referência do fluxo.",
  ],
] as const;

const impactMetrics = [
  [
    "Contas afetadas",
    "11",
    "Empresas distintas associadas à condição.",
  ],
  [
    "MRR associado",
    "R$ 84 mil",
    "Valor econômico exposto, não receita necessariamente perdida.",
  ],
  [
    "Intervenções humanas",
    "37",
    "Ações de suporte ligadas ao mesmo problema.",
  ],
  [
    "Tempo adicional",
    "+18h",
    "Esforço acumulado acima do comportamento de referência.",
  ],
] as const;

function safeTrack(
  eventName: string,
  properties: Record<string, unknown> = {},
) {
  void trackBehavior(eventName, properties).catch(() => undefined);
}

export function DemoExperience() {
  const [step, setStep] = useState(0);
  const initialized = useRef(false);
  const trackedSteps = useRef<Set<number>>(new Set());
  const demoStartEventId = useRef<string | null>(null);
  const metaDemoStartSent = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    initialized.current = true;

    const clientEventId = crypto.randomUUID();
    demoStartEventId.current = clientEventId;

    void trackBehavior(
      "demo_start",
      {
        demo_id: DEMO_ID,
      },
      {
        clientEventId,
      },
    ).catch(() => undefined);
  }, []);

  useEffect(() => {
    function sendMetaDemoStartIfAllowed() {
      if (metaDemoStartSent.current) return;
      if (!getConsent()?.marketing) return;

      const eventId = demoStartEventId.current;
      if (!eventId) return;

      trackMetaDemoStart(eventId, {
        demo_id: DEMO_ID,
      });

      metaDemoStartSent.current = true;
    }

    // Se o consentimento de marketing já existia ao entrar na demo,
    // o evento é enviado imediatamente.
    sendMetaDemoStartIfAllowed();

    // Se a pessoa aceitar marketing enquanto já está na demo,
    // emitimos o mesmo DemoStart naquele momento, sem duplicar.
    const onConsentChanged = () => {
      sendMetaDemoStartIfAllowed();
    };

    window.addEventListener(
      CONSENT_CHANGED_EVENT,
      onConsentChanged,
    );

    return () => {
      window.removeEventListener(
        CONSENT_CHANGED_EVENT,
        onConsentChanged,
      );
    };
  }, []);

  useEffect(() => {
    const stepNumber = step + 1;

    // Cada etapa entra no funil apenas uma vez por carregamento da demo.
    // Voltar a uma etapa anterior ou reiniciar a experiência não deve
    // inflar demo_step_* no Supabase.
    if (trackedSteps.current.has(stepNumber)) return;

    trackedSteps.current.add(stepNumber);

    safeTrack(`demo_step_${stepNumber}`, {
      demo_id: DEMO_ID,
      step: stepNumber,
      step_name: stages[step].sidebarTitle,
    });
  }, [step]);

  function goToStep(nextStep: number) {
    const bounded = Math.max(
      0,
      Math.min(stages.length - 1, nextStep),
    );

    setStep(bounded);
  }

  function restart() {
    safeTrack("demo_restart", {
      demo_id: DEMO_ID,
    });

    goToStep(0);
  }

  return (
    <>
      {/* Experiência desenhada especificamente para mobile */}
      <div className="lg:hidden">
        <MobileDemoExperience
          step={step}
          goToStep={goToStep}
          restart={restart}
        />
      </div>

      {/* Experiência desktop original */}
      <div className="hidden lg:block">
        <DesktopDemoExperience
          step={step}
          goToStep={goToStep}
          restart={restart}
        />
      </div>
    </>
  );
}

/* ============================================================
   MOBILE
============================================================ */

type DemoProps = {
  step: number;
  goToStep: (step: number) => void;
  restart: () => void;
};

function MobileDemoExperience({
  step,
  goToStep,
  restart,
}: DemoProps) {
  const stage = stages[step];

  return (
    <section
      data-analytics-section="demo_experience_mobile"
      className="rounded-[22px] border border-stone-200 bg-[#fffdf9] shadow-[0_16px_45px_rgba(29,20,12,.08)]"
    >
      {/* HEADER DA DEMO */}
      <header className="border-b border-stone-200 px-4 pb-4 pt-4">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ff6f1f]">
            {stage.sidebarTitle}
          </span>

          <span className="text-[10px] font-black text-stone-400">
            {step + 1} de {stages.length}
          </span>
        </div>

        <div className="mt-3 flex gap-1.5">
          {stages.map((item, index) => (
            <button
              key={item.sidebarTitle}
              type="button"
              aria-label={`Ir para etapa ${index + 1}`}
              onClick={() => goToStep(index)}
              className={[
                "h-1.5 flex-1 rounded-full transition",
                index <= step
                  ? "bg-[#ff6f1f]"
                  : "bg-stone-200",
              ].join(" ")}
            />
          ))}
        </div>

        <h2 className="mt-5 text-[1.75rem] font-black leading-[.98] tracking-[-0.055em] text-stone-950">
          {stage.title}
        </h2>

        <p className="mt-3 text-[13px] leading-5 text-stone-500">
          {stage.description}
        </p>
      </header>

      {/* CONTEÚDO */}
      <div className="p-4">
        {step === 0 ? <MobileStageTickets /> : null}
        {step === 1 ? <MobileStageCluster /> : null}
        {step === 2 ? <MobileStageRupture /> : null}
        {step === 3 ? <MobileStageImpact /> : null}
        {step === 4 ? <MobileStagePriority /> : null}
      </div>

      {/* CONTROLE MOBILE */}
      <div className="sticky bottom-2 z-20 mx-3 mb-3 mt-2 flex items-center gap-2 rounded-2xl border border-stone-200 bg-white/95 p-2 shadow-[0_12px_35px_rgba(29,20,12,.12)] backdrop-blur">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goToStep(step - 1)}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-stone-200 bg-white text-sm font-black text-stone-600"
            aria-label="Voltar"
          >
            ←
          </button>
        ) : null}

        {step < stages.length - 1 ? (
          <button
            type="button"
            onClick={() => goToStep(step + 1)}
            data-analytics-cta={`demo_mobile_continue_step_${step + 1}`}
            data-analytics-location="demo_mobile_footer"
            data-analytics-label="Continuar"
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[#ff6f1f] px-5 text-xs font-black text-white shadow-[0_4px_0_#d9570e] transition active:translate-y-0.5 active:shadow-[0_2px_0_#d9570e]"
          >
            Continuar →
          </button>
        ) : (
          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-xs font-black text-stone-700"
          >
            Ver novamente ↻
          </button>
        )}
      </div>
    </section>
  );
}

/* ----------------------------
   MOBILE / ETAPA 1
----------------------------- */

function MobileStageTickets() {
  return (
    <div>
      <p className="text-sm font-black leading-5 text-stone-950">
        Quatro clientes. Quatro conversas. Quatro “casos”.
      </p>

      <p className="mt-2 text-xs leading-5 text-stone-500">
        Separadamente, nenhuma mensagem parece justificar uma investigação
        estrutural.
      </p>

      <div className="mt-4 grid gap-2.5">
        {tickets.map(([company, time, message]) => (
          <article
            key={`${company}-${message}`}
            className="rounded-2xl border border-stone-200 bg-stone-50/70 p-3.5"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11px] font-black text-stone-950">
                {company}
              </span>

              <span className="text-[9px] font-bold text-stone-400">
                {time}
              </span>
            </div>

            <p className="mt-2 text-[12px] leading-5 text-stone-700">
              “{message}”
            </p>
          </article>
        ))}
      </div>

      <MobileInsight>
        Sozinhos, parecem pequenos.{" "}
        <strong>
          Mas quantas vezes algo semelhante já aconteceu?
        </strong>
      </MobileInsight>
    </div>
  );
}

/* ----------------------------
   MOBILE / ETAPA 2
----------------------------- */

function MobileStageCluster() {
  const max = Math.max(...weeklyOccurrences);

  return (
    <div>
      <div className="rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
        <span className="text-[9px] font-black uppercase tracking-[0.14em] text-orange-700">
          Problema emergente
        </span>

        <h3 className="mt-2 text-lg font-black leading-tight tracking-[-0.04em] text-stone-950">
          Falha recorrente na exportação de relatórios
        </h3>

        <div className="mt-3 grid gap-1.5">
          {clusterExamples.map((example) => (
            <div
              key={example}
              className="rounded-xl border border-stone-200 bg-white px-3 py-2 text-[11px] font-bold text-stone-600"
            >
              “{example}”
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-stone-200 bg-white p-4">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[9px] font-black uppercase tracking-[0.13em] text-stone-400">
              Ocorrências / semana
            </span>

            <strong className="mt-1 block text-3xl font-black tracking-[-0.06em] text-stone-950">
              2 → 19
            </strong>
          </div>

          <span className="text-[9px] font-bold text-stone-400">
            esperado: 2–3
          </span>
        </div>

        {/* Em mobile, barras horizontais são muito mais legíveis */}
        <div className="mt-5 grid gap-2.5">
          {weeklyOccurrences.map((value, index) => (
            <div
              key={`${index}-${value}`}
              className="grid grid-cols-[22px_1fr_24px] items-center gap-2"
            >
              <span className="text-[9px] font-bold text-stone-400">
                S{index + 1}
              </span>

              <div className="h-3 overflow-hidden rounded-full bg-stone-100">
                <div
                  className={[
                    "h-full rounded-full",
                    index === weeklyOccurrences.length - 1
                      ? "bg-[#ff6f1f]"
                      : "bg-orange-200",
                  ].join(" ")}
                  style={{
                    width: `${Math.max(
                      12,
                      (value / max) * 100,
                    )}%`,
                  }}
                />
              </div>

              <strong className="text-right text-[10px] font-black text-stone-700">
                {value}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <MobileInsight>
        O mesmo problema passou de{" "}
        <strong>2 para 19 ocorrências semanais.</strong>
      </MobileInsight>
    </div>
  );
}

/* ----------------------------
   MOBILE / ETAPA 3
----------------------------- */

function MobileStageRupture() {
  return (
    <div>
      <p className="text-sm font-black leading-5 text-stone-950">
        O problema não cresceu só em volume.
      </p>

      <p className="mt-2 text-xs leading-5 text-stone-500">
        Ele permaneceu acima do comportamento esperado e não voltou ao
        padrão anterior.
      </p>

      <div className="mt-4 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {ruptureMetrics.map(([label, value, note]) => (
          <div
            key={label}
            className="flex items-center justify-between gap-4 p-4"
          >
            <div className="min-w-0">
              <span className="block text-[9px] font-black uppercase tracking-[0.11em] text-stone-400">
                {label}
              </span>

              <p className="mt-1 text-[10px] leading-4 text-stone-500">
                {note}
              </p>
            </div>

            <strong className="shrink-0 text-2xl font-black tracking-[-0.05em] text-stone-950">
              {value}
            </strong>
          </div>
        ))}
      </div>

      <MobileInsight>
        <strong>
          Uma exceção operacional que deixou de ser excepcional.
        </strong>
      </MobileInsight>
    </div>
  );
}

/* ----------------------------
   MOBILE / ETAPA 4
----------------------------- */

function MobileStageImpact() {
  return (
    <div>
      <p className="text-sm font-black leading-5 text-stone-950">
        A repetição já possui uma dimensão operacional.
      </p>

      <p className="mt-2 text-xs leading-5 text-stone-500">
        O Ohrly consolida exposição, trabalho absorvido e valor associado
        sem transformar associação em causalidade.
      </p>

      <div className="mt-4 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
        {impactMetrics.map(([label, value, note]) => (
          <div key={label} className="p-4">
            <div className="flex items-end justify-between gap-4">
              <span className="text-[9px] font-black uppercase tracking-[0.12em] text-stone-400">
                {label}
              </span>

              <strong className="text-2xl font-black tracking-[-0.055em] text-stone-950">
                {value}
              </strong>
            </div>

            <p className="mt-2 text-[10px] leading-4 text-stone-500">
              {note}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-stone-100 px-3 py-3 text-[10px] leading-4 text-stone-500">
        <strong className="text-stone-800">
          Valor exposto ≠ receita perdida.
        </strong>{" "}
        Receita perdida só aparece quando existem evidências suficientes.
      </div>
    </div>
  );
}

/* ----------------------------
   MOBILE / ETAPA 5
----------------------------- */

function MobileStagePriority() {
  return (
    <div>
      <article className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-orange-50/80 px-4 py-3">
          <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[#ff6f1f]">
            Prioridade 01
          </span>

          <span className="rounded-full border border-orange-200 bg-white px-2 py-1 text-[9px] font-black uppercase text-orange-700">
            Persistente
          </span>
        </div>

        <div className="p-4">
          <h3 className="text-xl font-black tracking-[-0.045em] text-stone-950">
            Exportação de relatórios
          </h3>

          <p className="mt-2 text-xs leading-5 text-stone-500">
            A recorrência cresceu 6,3×, atingiu 11 contas e ainda não
            voltou ao comportamento anterior.
          </p>

          <div className="mt-4 grid grid-cols-3 divide-x divide-stone-200 rounded-2xl border border-stone-200 bg-stone-50">
            {[
              ["6,3×", "crescimento"],
              ["11", "contas"],
              ["4 sem.", "sem recuperar"],
            ].map(([value, label]) => (
              <div key={label} className="p-3 text-center">
                <strong className="block text-lg font-black tracking-[-0.04em] text-stone-950">
                  {value}
                </strong>

                <span className="mt-1 block text-[8px] leading-3 text-stone-500">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="mt-4 rounded-[18px] bg-stone-950 p-4 text-white">
        <strong className="block text-lg font-black leading-tight tracking-[-0.03em]">
          Quer encontrar isso no seu próprio histórico?
        </strong>

        <p className="mt-2 text-xs leading-5 text-stone-400">
          Não é necessário conectar o Intercom agora.
        </p>

        <AttributedLink
          href="/#diagnostico"
          onClick={() =>
            safeTrack("demo_cta_click", {
              demo_id: DEMO_ID,
              location: "demo_mobile_final_step",
            })
          }
          data-analytics-cta="demo_mobile_final_analyze_intercom"
          data-analytics-location="demo_mobile_final_step"
          data-analytics-label="Analisar meu Intercom"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#ff6f1f] px-5 text-xs font-black text-white"
        >
          Analisar meu Intercom
        </AttributedLink>
      </div>
    </div>
  );
}

function MobileInsight({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-r-xl border-l-[3px] border-[#ff6f1f] bg-orange-50 px-3 py-3 text-[11px] leading-5 text-stone-700">
      {children}
    </div>
  );
}

/* ============================================================
   DESKTOP
============================================================ */

function DesktopDemoExperience({
  step,
  goToStep,
  restart,
}: DemoProps) {
  const stage = stages[step];

  return (
    <section
      data-analytics-section="demo_experience_desktop"
      className="overflow-hidden rounded-[26px] border border-stone-200 bg-[#fffdf9] shadow-[0_22px_70px_rgba(29,20,12,.09)]"
    >
      <div className="grid grid-cols-[280px_minmax(0,1fr)]">
        <aside className="min-h-[670px] border-r border-stone-200 bg-stone-50/80 p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
            Demo interativa
          </p>

          <h2 className="mt-3 text-2xl font-black leading-[1.03] tracking-[-0.05em] text-stone-950">
            Veja quando casos isolados deixam de ser isolados.
          </h2>

          <p className="mt-3 text-sm leading-6 text-stone-500">
            Uma simulação curta de como o Ohrly transforma conversas
            dispersas em um problema operacional priorizável.
          </p>

          <div className="mt-7 grid gap-2">
            {stages.map((item, index) => {
              const active = index === step;
              const visited = index < step;

              return (
                <button
                  key={item.sidebarTitle}
                  type="button"
                  onClick={() => goToStep(index)}
                  data-analytics-cta={`demo_desktop_nav_step_${index + 1}`}
                  data-analytics-location="demo_desktop_sidebar"
                  data-analytics-label={item.sidebarTitle}
                  className={[
                    "group rounded-2xl border p-3 text-left transition",
                    active
                      ? "border-orange-200 bg-orange-50"
                      : "border-transparent bg-white/60 hover:border-stone-200 hover:bg-white",
                  ].join(" ")}
                >
                  <div className="flex items-start gap-2.5">
                    <span
                      className={[
                        "grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-black transition",
                        active
                          ? "bg-[#ff6f1f] text-white"
                          : visited
                            ? "bg-stone-950 text-white"
                            : "bg-stone-200 text-stone-600",
                      ].join(" ")}
                    >
                      {index + 1}
                    </span>

                    <span className="min-w-0">
                      <strong className="block text-xs font-black leading-4 text-stone-950">
                        {item.sidebarTitle}
                      </strong>

                      <span className="mt-1 block text-[10px] leading-4 text-stone-500">
                        {item.sidebarText}
                      </span>
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-4 text-[11px] leading-5 text-stone-500">
            Os dados desta demonstração são sintéticos e servem apenas
            para ilustrar a leitura do Ohrly.
          </div>
        </aside>

        <div className="min-w-0">
          <header className="border-b border-stone-200 px-8 py-6">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
                  {stage.eyebrow}
                </p>

                <h3 className="mt-2 max-w-3xl text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.055em] text-stone-950">
                  {stage.title}
                </h3>

                <p className="mt-3 max-w-3xl text-[15px] leading-6 text-stone-500">
                  {stage.description}
                </p>
              </div>

              <div className="w-28 shrink-0">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.12em] text-stone-400">
                  <span>Etapa</span>
                  <span>{step + 1}/5</span>
                </div>

                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200">
                  <span
                    className="block h-full rounded-full bg-[#ff6f1f] transition-[width] duration-300"
                    style={{
                      width: `${
                        ((step + 1) / stages.length) * 100
                      }%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </header>

          <div className="min-h-[440px] p-8">
            {step === 0 ? <DesktopStageTickets /> : null}
            {step === 1 ? <DesktopStageCluster /> : null}
            {step === 2 ? <DesktopStageRupture /> : null}
            {step === 3 ? <DesktopStageImpact /> : null}
            {step === 4 ? <DesktopStagePriority /> : null}
          </div>

          <footer className="flex items-center justify-between gap-3 border-t border-stone-200 px-8 py-4">
            <button
              type="button"
              disabled={step === 0}
              onClick={() => goToStep(step - 1)}
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 bg-white px-4 text-xs font-black text-stone-700 transition hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-35"
            >
              ← Voltar
            </button>

            {step < stages.length - 1 ? (
              <button
                type="button"
                onClick={() => goToStep(step + 1)}
                data-analytics-cta={`demo_desktop_continue_step_${step + 1}`}
                data-analytics-location="demo_desktop_footer"
                data-analytics-label="Continuar"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#ff6f1f] bg-[#fffdf9] px-5 text-xs font-black text-stone-950 shadow-[0_4px_0_#ff6f1f] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#ff6f1f]"
              >
                Continuar →
              </button>
            ) : (
              <button
                type="button"
                onClick={restart}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-stone-200 bg-white px-5 text-xs font-black text-stone-700 transition hover:bg-stone-50"
              >
                Recomeçar ↻
              </button>
            )}
          </footer>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   DESKTOP STAGES
============================================================ */

function DesktopStageTickets() {
  return (
    <div>
      <h4 className="text-xl font-black tracking-[-0.035em] text-stone-950">
        Quatro clientes. Quatro conversas. Quatro “casos”.
      </h4>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
        Lidas separadamente, as mensagens não parecem suficientes para
        justificar uma investigação estrutural.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {tickets.map(([company, time, message]) => (
          <article
            key={`${company}-${message}`}
            className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_30px_rgba(29,20,12,.06)]"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-black text-stone-950">
                {company}
              </span>

              <span className="text-[10px] font-bold text-stone-400">
                {time}
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-stone-700">
              “{message}”
            </p>
          </article>
        ))}
      </div>

      <DesktopInsight>
        Separados, eles parecem pequenos. A pergunta do Ohrly é:{" "}
        <strong>
          quantas vezes algo semelhante já aconteceu?
        </strong>
      </DesktopInsight>
    </div>
  );
}

function DesktopStageCluster() {
  const max = Math.max(...weeklyOccurrences);

  return (
    <div>
      <div className="grid grid-cols-[.9fr_1.1fr] gap-4">
        <article className="rounded-[22px] border border-stone-200 bg-stone-50/70 p-5">
          <span className="inline-flex rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-orange-700">
            Problema emergente
          </span>

          <h4 className="mt-4 text-xl font-black tracking-[-0.04em] text-stone-950">
            Falha recorrente na exportação de relatórios
          </h4>

          <div className="mt-5 grid gap-2">
            {clusterExamples.map((example) => (
              <div
                key={example}
                className="rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-xs font-bold text-stone-600"
              >
                “{example}”
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-[22px] border border-stone-200 bg-white p-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">
                Ocorrências por semana
              </span>

              <strong className="mt-1 block text-2xl font-black tracking-[-0.04em] text-stone-950">
                2 → 19
              </strong>
            </div>

            <span className="text-[10px] font-bold text-stone-400">
              faixa esperada: 2–3
            </span>
          </div>

          <div className="relative mt-6 flex h-56 items-end gap-3 border-b border-stone-200 px-1 pb-7">
            <div className="absolute inset-x-0 bottom-[54px] border-t border-dashed border-stone-300">
              <span className="absolute -top-5 right-0 bg-white pl-2 text-[9px] font-bold text-stone-400">
                baseline
              </span>
            </div>

            {weeklyOccurrences.map((value, index) => (
              <div
                key={`${index}-${value}`}
                className="relative z-10 flex h-full flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[10px] font-black text-stone-700">
                  {value}
                </span>

                <div
                  className={[
                    "w-full max-w-12 rounded-t-lg",
                    index === weeklyOccurrences.length - 1
                      ? "bg-[#ff6f1f]"
                      : "bg-orange-200",
                  ].join(" ")}
                  style={{
                    height: `${Math.max(
                      12,
                      (value / max) * 86,
                    )}%`,
                  }}
                />

                <span className="absolute bottom-0 text-[9px] font-bold text-stone-400">
                  S{index + 1}
                </span>
              </div>
            ))}
          </div>
        </article>
      </div>

      <DesktopInsight>
        O mesmo tipo de problema passou de{" "}
        <strong>2 para 19 ocorrências semanais</strong>. A operação
        continuou resolvendo casos; o padrão, porém, mudou.
      </DesktopInsight>
    </div>
  );
}

function DesktopStageRupture() {
  return (
    <div>
      <h4 className="text-xl font-black tracking-[-0.035em] text-stone-950">
        O problema não cresceu só em volume. Ele persistiu.
      </h4>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
        O Ohrly compara a recorrência atual ao comportamento histórico e
        procura ruptura, persistência e recuperação.
      </p>

      <div className="mt-6 grid grid-cols-4 gap-3">
        {ruptureMetrics.map(([label, value, note]) => (
          <article
            key={label}
            className="rounded-2xl border border-stone-200 bg-white p-4"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-stone-400">
              {label}
            </span>

            <strong className="mt-3 block text-3xl font-black tracking-[-0.05em] text-stone-950">
              {value}
            </strong>

            <p className="mt-2 text-xs leading-5 text-stone-500">
              {note}
            </p>
          </article>
        ))}
      </div>

      <DesktopInsight>
        <strong>
          Uma exceção operacional que deixou de ser excepcional.
        </strong>{" "}
        O software continuou funcionando, mas a operação aprendeu a
        absorver uma consequência recorrente.
      </DesktopInsight>
    </div>
  );
}

function DesktopStageImpact() {
  return (
    <div>
      <h4 className="text-xl font-black tracking-[-0.035em] text-stone-950">
        O tamanho da condição aparece sem inventar causalidade.
      </h4>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-500">
        O objetivo é consolidar exposição econômica, esforço humano e
        repetição observável, sem transformar associação em “receita
        perdida”.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {impactMetrics.map(([label, value, note]) => (
          <article
            key={label}
            className="rounded-2xl border border-stone-200 bg-white p-5"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.12em] text-stone-400">
              {label}
            </span>

            <strong className="mt-2 block text-3xl font-black tracking-[-0.055em] text-stone-950">
              {value}
            </strong>

            <p className="mt-2 text-xs leading-5 text-stone-500">
              {note}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 text-xs leading-5 text-stone-500">
        <strong className="text-stone-800">
          Valor exposto ≠ receita perdida.
        </strong>{" "}
        Receita perdida só deve aparecer quando houver evidência suficiente
        para sustentar essa conclusão.
      </div>
    </div>
  );
}

function DesktopStagePriority() {
  return (
    <div>
      <article className="overflow-hidden rounded-[22px] border border-stone-200 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-stone-200 bg-orange-50/80 px-5 py-4">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
            Prioridade 01
          </span>

          <span className="rounded-full border border-orange-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-wide text-orange-700">
            Persistente
          </span>
        </div>

        <div className="p-6">
          <h4 className="text-2xl font-black tracking-[-0.045em] text-stone-950">
            Exportação de relatórios
          </h4>

          <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-500">
            A recorrência cresceu 6,3× em cinco semanas, atingiu 11
            contas, aumentou o esforço de suporte e ainda não retornou ao
            comportamento de referência.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["6,3×", "crescimento da recorrência"],
              ["11", "contas afetadas"],
              ["4 semanas", "sem recuperação"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-stone-200 bg-stone-50/70 p-4"
              >
                <strong className="block text-xl font-black tracking-[-0.04em] text-stone-950">
                  {value}
                </strong>

                <span className="mt-1 block text-[10px] font-bold text-stone-500">
                  {label}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-[20px] bg-stone-950 p-5 text-white">
            <div>
              <strong className="block text-lg font-black tracking-[-0.025em]">
                Quer encontrar isso no seu próprio histórico?
              </strong>

              <span className="mt-1 block max-w-xl text-xs leading-5 text-stone-400">
                Analisamos seu Intercom para procurar quais problemas
                deixaram de ser casos isolados.
              </span>
            </div>

            <AttributedLink
              href="/#diagnostico"
              onClick={() =>
                safeTrack("demo_cta_click", {
                  demo_id: DEMO_ID,
                  location: "demo_mobile_final_step",
                })
              }
              data-analytics-cta="demo_mobile_final_analyze_intercom"
              data-analytics-location="demo_mobile_final_step"
              data-analytics-label="Analisar meu Intercom"
              className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#ff6f1f] px-5 text-xs font-black text-white"
            >
              Analisar meu Intercom
            </AttributedLink>
          </div>
        </div>
      </article>
    </div>
  );
}

function DesktopInsight({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mt-5 rounded-r-2xl border-l-4 border-[#ff6f1f] bg-orange-50 px-4 py-3.5 text-sm leading-6 text-stone-700">
      {children}
    </div>
  );
}
