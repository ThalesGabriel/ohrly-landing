import Image from "next/image";

import type { ReactNode } from "react";

import {
  ArrowRight,
  Check,
  CheckCircle2,
  Search,
  Sparkles,
} from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";

import { CookieConsent } from "@/components/cookie-consent";

import { LeadModalProvider } from "@/components/lead-form-modal";
import { CommercialDemoProvider } from "@/components/commercial-demo-modal";
import {
  CommercialIntentProvider,
  CommercialIntentTrigger,
} from "@/components/commercial-intent-modal";

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-xl border border-[#dce5ff] bg-white shadow-[0_8px_24px_rgba(20,87,255,.10)]">
        <Image
          src="/ohrly-logo.png"
          alt="Ohrly"
          width={34}
          height={24}
          className="h-auto w-[34px] object-contain"
          priority
        />
      </span>
      <span className="text-[22px] font-black tracking-[-0.05em] text-[#0c1732]">
        ohrly
      </span>
    </div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[.13em] ${
        light ? "text-[#b9cbff]" : "text-[#1457ff]"
      }`}
    >
      <span
        className={`size-2 rounded-full ${
          light
            ? "bg-[#f43b35] shadow-[0_0_0_5px_rgba(244,59,53,.12)]"
            : "bg-[#f43b35] shadow-[0_0_0_5px_#fff0ef]"
        }`}
      />
      {children}
    </div>
  );
}

function SignalRow({
  label,
  value,
  width,
  changed = false,
}: {
  label: string;
  value: string;
  width: string;
  changed?: boolean;
}) {
  return (
    <div className="grid grid-cols-[84px_1fr_auto] items-center gap-3 text-xs sm:grid-cols-[96px_1fr_auto]">
      <span className="font-bold text-[#59667e]">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-[#edf1f6]">
        <span
          className={`block h-full rounded-full ${
            changed ? "bg-[#f43b35]" : "bg-[#1457ff]"
          }`}
          style={{ width }}
        />
      </div>
      <strong
        className={`text-[11px] ${
          changed ? "text-[#c8322d]" : "text-[#39455c]"
        }`}
      >
        {value}
      </strong>
    </div>
  );
}

export function PostAlertLanding() {
  return (
    <>
      <CookieConsent />
      <BehaviorTracker />

      <LeadModalProvider>
        <CommercialDemoProvider>
        <CommercialIntentProvider>
        <div className="min-h-screen bg-[#f8fafc] text-[#101828]">
          <nav className="sticky top-0 z-40 border-b border-[#e5eaf4]/90 bg-[#f8fafc]/88 backdrop-blur-xl">
            <div className="mx-auto flex h-[72px] w-[min(calc(100%_-_2rem),1120px)] items-center justify-between gap-5 sm:w-[min(calc(100%_-_2.5rem),1120px)]">
              <a
                href="#top"
                aria-label="Ohrly, início"
                data-analytics-cta="nav_logo"
                data-analytics-location="navigation"
              >
                <Brand />
              </a>

              <div className="flex items-center gap-1.5 sm:gap-2">
                <a
                  href="#problema"
                  className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#68758f] transition hover:bg-white hover:text-[#101b35] md:inline-flex"
                  data-analytics-cta="nav_problem"
                  data-analytics-location="navigation"
                >
                  Problema
                </a>

                <a
                  href="#como-funciona"
                  className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#68758f] transition hover:bg-white hover:text-[#101b35] md:inline-flex"
                  data-analytics-cta="nav_how_it_works"
                  data-analytics-location="navigation"
                >
                  Como funciona
                </a>

                <a
                  href="#exemplo"
                  className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#68758f] transition hover:bg-white hover:text-[#101b35] md:inline-flex"
                  data-analytics-cta="nav_example"
                  data-analytics-location="navigation"
                >
                  Exemplo
                </a>

                <CommercialIntentTrigger
                  ctaId="nav_pilot"
                  location="navigation"
                  label="Quero avaliar"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                >
                  Quero avaliar
                  <ArrowRight size={15} />
                </CommercialIntentTrigger>
              </div>
            </div>
          </nav>

          <main id="top">
            {/* HERO */}
            <section
              className="relative overflow-hidden px-4 pb-14 pt-14 sm:px-6 sm:pb-18 sm:pt-20 lg:pb-20"
              data-analytics-section="hero"
            >
              <div className="pointer-events-none absolute -left-40 -top-48 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(20,87,255,.11),transparent_68%)]" />
              <div className="pointer-events-none absolute -right-36 top-[-120px] size-[390px] rounded-full bg-[radial-gradient(circle,rgba(244,59,53,.08),transparent_70%)]" />

              <div className="relative mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
                <div>
                  <Eyebrow>Para SaaS B2B</Eyebrow>

                  <h1 className="mt-5 max-w-[760px] text-[44px] font-black leading-[.98] tracking-[-0.062em] text-[#0d1831] sm:text-[58px] lg:text-[70px]">
                    Seu health score encontrou o risco.{" "}
                    <span className="text-[#1457ff]">E agora?</span>
                  </h1>

                  <p className="mt-6 max-w-[650px] text-base leading-7 text-[#68758f] sm:text-[18px] sm:leading-8">
                    O Ohrly usa os sinais que sua operação já possui para{" "}
                    <strong className="font-black text-[#101b35]">
                      acrescentar contexto depois do alerta
                    </strong>{" "}
                    — ajudando seu time a entender melhor a situação antes de
                    decidir como agir.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2.5">
                    <CommercialIntentTrigger
                      ctaId="hero_pilot"
                      location="hero"
                      label="Avaliar minha operação"
                      className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-[15px] font-black text-white shadow-[0_14px_30px_rgba(20,87,255,.20)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                    >
                      Avaliar minha operação
                      <ArrowRight size={16} />
                    </CommercialIntentTrigger>

                    <a
                      href="#como-funciona"
                      className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-[#dfe5f0] bg-white px-5 text-[15px] font-black text-[#101b35] transition hover:-translate-y-px hover:border-[#cfd8eb]"
                      data-analytics-cta="hero_example"
                      data-analytics-location="hero"
                      data-analytics-label="Ver como funciona"
                    >
                      <Search size={16} />
                      Ver como funciona
                    </a>
                  </div>

                  <p className="mt-3 max-w-[620px] text-[12px] font-semibold leading-5 text-[#8a95a8]">
                    Comece com seu processo atual. Sem substituir seu health score e sem migrar sua operação.
                  </p>
                </div>

                <div
                  className="mx-auto w-full max-w-[390px] rounded-[40px] border-[10px] border-[#0b1020] bg-[#0b1020] shadow-[0_34px_80px_rgba(15,23,42,.18)] lg:rotate-[1.5deg]"
                  data-analytics-section="hero_product_preview"
                >
                  <div className="min-h-[510px] rounded-[30px] bg-white p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-black text-[#101b35]">
                        Conta sinalizada
                      </strong>
                      <span className="text-[10px] font-bold text-[#8b96aa]">
                        Hoje
                      </span>
                    </div>

                    <div className="mt-6 rounded-2xl border border-[#e5e9f1] bg-[#fbfcfe] p-4">
                      <div className="text-[9px] font-black uppercase tracking-[.12em] text-[#8995a8]">
                        Seu processo atual
                      </div>

                      <div className="mt-1 text-[24px] font-black tracking-[-0.045em] text-[#101b35]">
                        Acme Inc.
                      </div>

                      <div className="mt-4 flex items-center justify-between rounded-xl border border-[#edf0f5] bg-white px-3.5 py-3">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[.11em] text-[#8995a8]">
                            Health Score
                          </div>
                          <strong className="mt-1 block text-xl tracking-[-0.04em] text-[#101b35]">
                            42
                          </strong>
                        </div>

                        <span className="rounded-full bg-[#fff0ef] px-2.5 py-1 text-[9px] font-black text-[#d2332e]">
                          RISCO
                        </span>
                      </div>
                    </div>

                    <div className="py-3 text-center text-xl font-black text-[#1457ff]">
                      ↓
                    </div>

                    <div className="rounded-2xl border border-[#bfd2ff] bg-[#f5f8ff] p-4">
                      <div className="text-[9px] font-black uppercase tracking-[.12em] text-[#1457ff]">
                        Ohrly
                      </div>

                      <div className="mt-1 text-[24px] font-black tracking-[-0.045em] text-[#101b35]">
                        Depois do alerta
                      </div>

                      <p className="mt-1 text-[14px] leading-5 text-gray">
                        Contexto sobre a trajetória que levou a conta até aqui.
                      </p>

                      <div className="mt-4 space-y-3">
                        <SignalRow
                          label="Uso"
                          value="Estável"
                          width="86%"
                        />
                        <SignalRow
                          label="Suporte"
                          value="Mudou"
                          width="38%"
                          changed
                        />
                        <SignalRow
                          label="Sponsor"
                          value="Mudou"
                          width="26%"
                          changed
                        />
                      </div>

                      <div className="mt-4 rounded-xl bg-[#10182f] px-3.5 py-3 text-white">
                        <div className="text-[10px] font-semibold text-[#c9d2e5]">
                          Contexto da relação
                        </div>
                        <strong className="mt-1 block text-[12px] leading-5">
                          O uso ainda parece estável, mas suporte e relacionamento
                          mudaram nas últimas semanas.
                        </strong>
                      </div>
                    </div>

                    <p className="mt-4 text-center text-[9px] leading-4 text-[#8995a8]">
                      Exemplo visual da proposta, não resultado de cliente.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* PROBLEMA */}
            <section
              id="problema"
              className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
              data-analytics-section="problem"
            >
              <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
                <div>
                  <Eyebrow>O problema</Eyebrow>

                  <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                    Seu radar encontrou o risco. Agora começa o trabalho.
                  </h2>

                  <p className="mt-5 max-w-[600px] text-base leading-7 text-[#68758f] sm:text-[17px]">
                    O alerta mostra que algo merece atenção, mas nem sempre
                    explica o que aconteceu. Dependendo da operação, o time ainda
                    precisa reconstruir uso, relacionamento, suporte, contrato e
                    outros sinais antes de decidir a próxima ação.
                  </p>
                </div>

                <div className="rounded-[24px] border border-[#e3e8f1] bg-[#fbfcfe] p-5 sm:p-6">
                  {[
                    ["Acme", "Health 42 · uso estável · sponsor menos ativo"],
                    ["Beta Labs", "Health 42 · queda de uso · tickets recorrentes"],
                    ["Cloud One", "Health 42 · financeiro atrasado · uso normal"],
                  ].map(([name, detail]) => (
                    <div
                      key={name}
                      className="grid grid-cols-[42px_1fr_auto] items-center gap-3 border-t border-[#edf0f5] py-3.5 first:border-t-0 first:pt-0 last:pb-0"
                    >
                      <span className="flex size-10 items-center justify-center rounded-xl bg-[#edf3ff] text-sm font-black text-[#1457ff]">
                        {name.charAt(0)}
                      </span>

                      <div className="min-w-0">
                        <div className="text-sm font-black text-[#101b35]">
                          {name}
                        </div>
                        <div className="mt-0.5 truncate text-xs text-[#7b879b]">
                          {detail}
                        </div>
                      </div>

                      <span className="rounded-full bg-[#fff0ef] px-2.5 py-1 text-[9px] font-black text-[#d2332e]">
                        Risco
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ESTADO ≠ TRAJETÓRIA */}
            <section
              className="bg-[#f3f6fb] px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
              data-analytics-section="state_trajectory"
            >
              <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[.78fr_1.22fr] lg:gap-14">
                <div>
                  <Eyebrow>Estado ≠ trajetória</Eyebrow>

                  <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                    Risco não explica o que aconteceu.
                  </h2>

                  <p className="mt-5 max-w-[560px] text-base leading-7 text-[#68758f] sm:text-[17px]">
                    Duas contas podem receber a mesma classificação de risco por
                    razões completamente diferentes. Uma pode estar
                    cronicamente abaixo do esperado. Outra pode ter acabado de
                    mudar sua trajetória.
                  </p>

                  <div className="mt-6 rounded-2xl border border-[#d9e3f6] bg-white p-4 text-sm leading-6 text-[#4f5d76] shadow-[0_12px_34px_rgba(25,45,90,.05)]">
                    <strong className="font-black text-[#101b35]">
                      É aí que o Ohrly começa:
                    </strong>{" "}
                    não em substituir o radar, mas em organizar a mudança por
                    trás do alerta.
                  </div>
                </div>

                <div className="rounded-[28px] border border-[#d8e0ed] bg-white p-5 shadow-[0_28px_70px_rgba(15,23,42,.10)] sm:p-6">
                  <div className="flex items-start justify-between gap-4 border-b border-[#edf0f5] pb-5">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                        Trajetória da conta
                      </div>
                      <h3 className="mt-1 text-[28px] font-black tracking-[-0.045em] text-[#101b35]">
                        Acme Inc.
                      </h3>
                    </div>

                    <span className="rounded-full border border-[#ffd2d0] bg-[#fff2f1] px-3 py-1.5 text-[9px] font-black text-[#c8322d]">
                      MUDANÇA DETECTADA
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {[
                      ["SEM -4", "Operação normal", "Uso, suporte e relacionamento dentro do padrão."],
                      ["SEM -3", "Sponsor reduz interações", "Uso ainda permanece estável."],
                      ["SEM -2", "Tickets crescem", "A relação muda antes de o estado geral parecer crítico."],
                      ["HOJE", "Health Score entra em risco", "Agora existe contexto para investigar o caso."],
                    ].map(([period, title, body], index) => (
                      <div
                        key={period}
                        className="grid grid-cols-[62px_1fr] items-start gap-4"
                      >
                        <span className="pt-0.5 text-[10px] font-black uppercase tracking-[.1em] text-[#8995a8]">
                          {period}
                        </span>

                        <div className="relative pl-5 text-xs leading-5 text-[#68758f]">
                          <span
                            className={`absolute left-0 top-1.5 size-2.5 rounded-full ${
                              index >= 2
                                ? "bg-[#f43b35] shadow-[0_0_0_5px_#fff0ef]"
                                : "bg-[#84a8ff] shadow-[0_0_0_5px_#edf3ff]"
                            }`}
                          />
                          <strong className="font-black text-[#101b35]">
                            {title}.
                          </strong>{" "}
                          {body}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* COMO FUNCIONA */}
            <section
              id="como-funciona"
              className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
              data-analytics-section="how_it_works"
            >
              <div className="mx-auto grid max-w-[1120px] items-center gap-10 rounded-[28px] border border-[#e3e8f1] bg-white p-6 shadow-[0_18px_50px_rgba(25,45,90,.05)] sm:p-8 lg:grid-cols-[.88fr_1.12fr]">
                <div>
                  <Eyebrow>Ohrly</Eyebrow>

                  <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                    Encontre onde a relação realmente mudou.
                  </h2>

                  <p className="mt-5 text-base leading-7 text-[#68758f] sm:text-[17px]">
                    O Ohrly aprende como cada conta normalmente se comporta e
                    combina sinais de uso, suporte, financeiro, contrato,
                    relacionamento e outros dados disponíveis.
                  </p>
                </div>

                <div>
                  <div className="space-y-3">
                    <SignalRow
                      label="Uso"
                      value="Estável"
                      width="86%"
                    />
                    <SignalRow
                      label="Suporte"
                      value="Mudou"
                      width="38%"
                      changed
                    />
                    <SignalRow
                      label="Financeiro"
                      value="Normal"
                      width="74%"
                    />
                    <SignalRow
                      label="Relacionamento"
                      value="Mudou"
                      width="28%"
                      changed
                    />
                  </div>

                  <div className="mt-5 rounded-2xl border border-[#ffd2d0] bg-[#fff2f1] p-4 text-sm font-black text-[#b8322e]">
                    A relação mudou apesar de alguns sinais ainda parecerem
                    normais.
                  </div>
                </div>
              </div>
            </section>

            {/* POSICIONAMENTO */}
            <section
              className="bg-[#10182f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24"
              data-analytics-section="positioning"
            >
              <div className="mx-auto max-w-[1120px]">
                <div className="max-w-[780px]">
                  <Eyebrow light>Funciona junto do que você já usa</Eyebrow>

                  <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] sm:text-[48px]">
                    Já tem health score ou modelo de churn? Melhor ainda.
                  </h2>

                  <p className="mt-5 text-base leading-7 text-white/65 sm:text-[17px]">
                    Ele continua sendo seu radar de risco. O Ohrly começa depois
                    do alerta, organizando a trajetória da relação para ajudar seu time a entender o caso e decidir como agir.
                  </p>
                </div>

                <div className="mt-9 grid gap-3 lg:grid-cols-[1fr_64px_1fr_64px_1fr] lg:items-center">
                  {[
                    {
                      title: "Seu radar",
                      body: "Health score, modelo próprio ou regras.",
                      question: "Quem merece atenção?",
                    },
                    {
                      title: "Ohrly",
                      body: "Organiza a trajetória da relação.",
                      question: "O que aconteceu depois desse sinal?",
                      active: true,
                    },
                    {
                      title: "Seu time",
                      body: "Recebe contexto para investigar e decidir.",
                      question: "O que fazemos agora?",
                    },
                  ].map((item, index) => (
                    <div key={item.title} className="contents">
                      <div
                        className={`min-h-[180px] rounded-[22px] border p-5 ${
                          item.active
                            ? "border-[#315ec2] bg-[linear-gradient(160deg,#0f2a62,#123990)]"
                            : "border-[#2b3960] bg-[#121f43]"
                        }`}
                      >
                        <strong className="block text-lg font-black">
                          {item.title}
                        </strong>

                        <p className="mt-2 text-sm leading-6 text-white/60">
                          {item.body}
                        </p>

                        <div className="mt-6 rounded-xl bg-black/15 px-3 py-3 text-sm font-black text-white/90">
                          {item.question}
                        </div>
                      </div>

                      {index < 2 && (
                        <div className="hidden text-center text-3xl font-black text-[#7fa8ff] lg:block">
                          →
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* EXEMPLO */}
            <section
              id="exemplo"
              className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
              data-analytics-section="investigation_example"
            >
              <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[.84fr_1.16fr]">
                <div>
                  <Eyebrow>Mais contexto</Eyebrow>

                  <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                    Veja o que mudou antes de decidir o que fazer.
                  </h2>

                  <p className="mt-5 text-base leading-7 text-[#68758f] sm:text-[17px]">
                    Em vez de entregar apenas outra classificação de risco, o
                    Ohrly organiza a trajetória dos sinais da conta e destaca
                    mudanças que merecem investigação.
                  </p>
                </div>

                <div className="rounded-[26px] border border-[#e1e6ef] bg-white p-5 shadow-[0_20px_60px_rgba(25,45,90,.07)] sm:p-7">
                  <div className="flex items-start justify-between gap-4 border-b border-[#edf0f5] pb-5">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                        Conta sinalizada
                      </div>

                      <h3 className="mt-1 text-[28px] font-black tracking-[-0.045em] text-[#101b35]">
                        Acme Inc.
                      </h3>
                    </div>

                    <span className="rounded-full border border-[#ffd2d0] bg-[#fff2f1] px-3 py-1.5 text-[9px] font-black text-[#c8322d]">
                      MUDANÇA DETECTADA
                    </span>
                  </div>

                  <div className="space-y-3 py-5">
                    <SignalRow
                      label="Uso"
                      value="Estável"
                      width="86%"
                    />
                    <SignalRow
                      label="Suporte"
                      value="Mudou"
                      width="38%"
                      changed
                    />
                    <SignalRow
                      label="Sponsor"
                      value="Mudou"
                      width="29%"
                      changed
                    />
                  </div>

                  <div className="rounded-2xl bg-[#10182f] p-4 text-white">
                    <div className="flex items-center gap-2 text-sm font-black">
                      <Sparkles size={15} className="text-[#8fb0ff]" />
                      A relação mudou apesar do uso ainda parecer estável.
                    </div>

                    <p className="mt-2 text-xs leading-5 text-white/65">
                      O estado atual sozinho não mostra toda a trajetória que
                      levou a conta até o risco.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* EVIDÊNCIA */}
            <section
              className="bg-[linear-gradient(180deg,#eef4ff_0%,#f8fafc_100%)] px-4 py-16 sm:px-6 sm:py-20"
              data-analytics-section="evidence"
            >
              <div className="mx-auto grid max-w-[1120px] items-center gap-10 rounded-[28px] border border-[#cfe0ff] bg-white p-6 sm:p-8 lg:grid-cols-2">
                <div>
                  <Eyebrow>Evidência técnica</Eyebrow>

                  <h2 className="mt-4 text-[34px] font-black leading-[1.04] tracking-[-0.05em] text-[#101b35] sm:text-[44px]">
                    Há evidência de que olhar para mudanças pode acrescentar
                    sinal.
                  </h2>

                  <p className="mt-4 text-sm leading-6 text-[#68758f] sm:text-base">
                    Em uma validação histórica cega com dados públicos, grupos
                    identificados antes da abertura dos outcomes concentraram
                    uma parcela desproporcional dos churns posteriores.
                  </p>

                  <p className="mt-4 text-[10px] leading-4 text-[#8995a8]">
                    Este experimento valida uma direção técnica. Não representa
                    resultado garantido nem prova, sozinho, valor operacional ou
                    redução de churn em clientes.
                  </p>
                </div>

                <div className="grid items-center gap-3 sm:grid-cols-[1fr_54px_1fr]">
                  <div className="rounded-2xl border border-[#e3e8f1] bg-[#fbfcfe] p-5 text-center">
                    <strong className="block text-[42px] font-black tracking-[-0.055em] text-[#1457ff]">
                      1 em 5
                    </strong>
                    <span className="mt-2 block text-xs leading-5 text-[#68758f]">
                      relações em modos priorizados
                    </span>
                  </div>

                  <div className="hidden text-center text-2xl font-black text-[#f43b35] sm:block">
                    →
                  </div>

                  <div className="rounded-2xl border border-[#e3e8f1] bg-[#fbfcfe] p-5 text-center">
                    <strong className="block text-[42px] font-black tracking-[-0.055em] text-[#1457ff]">
                      47,7%
                    </strong>
                    <span className="mt-2 block text-xs leading-5 text-[#68758f]">
                      dos churns posteriores em uma das janelas
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* PILOTO */}
            <section
              id="piloto"
              className="px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
              data-analytics-section="pilot"
            >
              <div className="mx-auto grid max-w-[1120px] items-start gap-10 lg:grid-cols-[1fr_.82fr] lg:gap-16">
                <div>
                  <Eyebrow>Piloto assistido</Eyebrow>

                  <h2 className="mt-4 max-w-[720px] text-[38px] font-black leading-[1.03] tracking-[-0.052em] text-[#101b35] sm:text-[50px]">
                    Avalie o que acontece depois que uma conta entra em risco.
                  </h2>

                  <p className="mt-5 max-w-[650px] text-base leading-7 text-[#68758f] sm:text-[18px]">
                    Começamos entendendo como sua operação identifica e trata
                    risco hoje. Se houver dados históricos disponíveis, testamos
                    se mudanças na trajetória acrescentam informação ao seu
                    processo atual.
                  </p>

                  <div className="mt-7 space-y-3">
                    {[
                      "Mapeamos como uma conta é identificada e o que acontece depois.",
                      "Reconstruímos sinais históricos com os dados disponíveis.",
                      "Comparamos o que a mudança acrescentaria: contexto, detecção anterior ou priorização.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-[#e2e7f1] bg-white p-4 text-sm leading-6 text-[#4d5b76]"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e9f0ff] text-[#1457ff]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#7d899f]">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#1457ff]" />
                      Sem migrar sua operação
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 size={14} className="text-[#1457ff]" />
                      Comece com os dados que já possui
                    </span>
                  </div>
                </div>

                <div className="rounded-[26px] border border-[#dfe5f0] bg-white p-5 shadow-[0_22px_60px_rgba(24,45,92,.09)] sm:p-6">
                  <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                    Quero avaliar minha operação
                  </div>

                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101b35]">
                    Descubra se existe informação útil entre o alerta e a ação.
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#7a869a]">
                    Conte rapidamente como sua equipe acompanha risco hoje. Na
                    primeira conversa, entendemos seu processo atual e avaliamos
                    se existe um teste que faça sentido para a sua operação.
                  </p>

                  <CommercialIntentTrigger
                    ctaId="pilot_section_cta"
                    location="pilot_section"
                    label="Ver se faz sentido para minha operação"
                    className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                  >
                    Ver se faz sentido para minha operação
                    <ArrowRight size={16} />
                  </CommercialIntentTrigger>

                  <p className="mt-3 text-center text-[11px] leading-5 text-[#8995a8]">
                    Sem migração de ferramenta e sem compromisso de contratar.
                  </p>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section
              className="border-t border-[#e4e9f2] px-4 py-16 sm:px-6 sm:py-20"
              data-analytics-section="faq"
            >
              <div className="mx-auto max-w-[820px]">
                <Eyebrow>Perguntas</Eyebrow>

                <h2 className="mt-3 text-[34px] font-black tracking-[-0.048em] text-[#101b35] sm:text-[43px]">
                  O básico antes de testar.
                </h2>

                <div className="mt-7 divide-y divide-[#e1e6ef] border-y border-[#e1e6ef]">
                  <details className="group py-5">
                    <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                      Ohrly substitui meu health score?
                    </summary>
                    <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                      Não. Seu health score pode continuar sendo o radar de
                      risco. O Ohrly começa depois do alerta e tenta acrescentar
                      contexto sobre como a relação mudou.
                    </p>
                  </details>

                  <details className="group py-5">
                    <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                      Ohrly prevê churn?
                    </summary>
                    <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                      Não prometemos prever todo churn. A hipótese central é que
                      mudanças na trajetória da relação podem acrescentar
                      informação ao estado atual e melhorar decisões humanas.
                    </p>
                  </details>

                  <details className="group py-5">
                    <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                      Preciso trocar de ferramenta?
                    </summary>
                    <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                      Não. A proposta inicial é trabalhar com os sinais que sua
                      operação já possui e testar valor antes de qualquer mudança
                      de stack.
                    </p>
                  </details>

                  <details className="group py-5">
                    <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                      Ohrly sempre serve para priorizar contas?
                    </summary>
                    <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                      Não necessariamente. Dependendo do processo, o valor pode
                      estar em contexto, investigação, detecção anterior ou
                      priorização. É justamente isso que o piloto procura
                      descobrir.
                    </p>
                  </details>

                  <details className="group py-5">
                    <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                      Quem decide o que fazer com a conta?
                    </summary>
                    <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                      Seu time. O Ohrly organiza sinais e contexto; a decisão de
                      investigar, agir ou ignorar continua humana.
                    </p>
                  </details>
                </div>
              </div>
            </section>
          </main>

          <footer
            className="px-4 py-8 sm:px-6"
            data-analytics-section="footer"
          >
            <div className="mx-auto flex max-w-[1120px] flex-col gap-4 border-t border-[#e2e7f0] pt-7 text-xs text-[#7a869a] sm:flex-row sm:items-center sm:justify-between">
              <Brand />
              <div>
                Seu radar encontra o risco. O Ohrly começa depois do alerta.
              </div>
            </div>
          </footer>
        </div>
        </CommercialIntentProvider>
        </CommercialDemoProvider>
      </LeadModalProvider>
    </>
  );
}
