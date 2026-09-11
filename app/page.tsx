import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";

import {
  ArrowRight,
  Check,
  Clock3,
  LineChart,
  Search,
  Users,
} from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadModalProvider } from "@/components/lead-form-modal";
import {
  CommercialIntentProvider,
  CommercialIntentTrigger,
} from "@/components/commercial-intent-modal";

export const metadata: Metadata = {
  title: "Ohrly — Monitor de mudanças operacionais para Customer Success",
  description:
    "Acompanhe mudanças na operação de Customer Success enquanto elas acontecem. Veja quem foi exposto, quais sinais relevantes começaram a surgir e onde vale investigar antes de esperar meses pelo resultado.",
  openGraph: {
    title:
      "A mudança que você implantou está produzindo o resultado que você esperava?",
    description:
      "Ohrly conecta mudanças operacionais aos sinais relevantes que aparecem depois — para ajudar times de CS a investigar antes.",
    type: "website",
  },
};

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-[22px] font-black tracking-[-0.04em] text-[#0b0d12]">
      <svg viewBox="0 0 44 44" aria-hidden="true" className="h-[34px] w-[34px]">
        <circle
          cx="19"
          cy="22"
          r="12"
          fill="none"
          stroke="#3568f5"
          strokeWidth="7"
        />
        <path
          d="M18 23h7l3-9 4 17 4-11 3 7h5"
          fill="none"
          stroke="#e43b32"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Ohrly
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
      className={`inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.08em] ${light ? "text-[#9bb6ff]" : "text-[#3568f5]"
        }`}
    >
      <span
        className={`h-[3px] w-6 rounded-full ${light ? "bg-[#9bb6ff]" : "bg-[#3568f5]"
          }`}
      />
      {children}
    </div>
  );
}

function SimpleFlowStep({
  number,
  label,
  title,
  children,
  tone = "neutral",
}: {
  number: string;
  label: string;
  title: string;
  children: ReactNode;
  tone?: "neutral" | "danger" | "success";
}) {
  const toneClass =
    tone === "danger"
      ? "border-[#efdcdc] bg-[linear-gradient(180deg,#fff,#fff7f7)]"
      : tone === "success"
        ? "border-[#d8ebdf] bg-[linear-gradient(180deg,#fff,#f2fbf6)]"
        : "border-[#e4e8ef] bg-white";

  return (
    <div
      className={`min-h-[150px] rounded-[21px] border p-4 text-center shadow-[0_10px_24px_rgba(11,13,18,.04)] ${toneClass}`}
    >
      <div className="mx-auto grid size-[34px] place-items-center rounded-[11px] bg-[#f0f3fa] text-[12px] font-black text-[#24314e]">
        {number}
      </div>

      <div className="mt-3 text-[9px] font-black uppercase tracking-[.08em] text-[#8b93a0]">
        {label}
      </div>

      <strong className="mt-1.5 block text-[17px] font-black leading-[1.15] tracking-[-0.03em]">
        {title}
      </strong>

      <p className="mt-2 text-[11px] leading-[1.45] text-[#6b7481]">
        {children}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-[28px] font-black text-[#b6bfcd] rotate-90 lg:rotate-0">
      →
    </div>
  );
}

function ContextCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[17px] border border-[#e4e7ec] bg-white px-[17px] py-[15px] text-left shadow-[0_10px_26px_rgba(11,13,18,.04)]">
      <div className="text-[9px] font-black uppercase tracking-[.08em] text-[#8a919d]">
        {label}
      </div>
      <div className="mt-1.5 text-[14px] font-black leading-[1.4]">
        {children}
      </div>
    </div>
  );
}

function RelevanceCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[20px] border border-[#e4e8ef] bg-white p-5 shadow-[0_10px_28px_rgba(11,13,18,.035)]">
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-[11px] bg-[#eef3ff] text-[11px] font-black text-[#3568f5]">
          {number}
        </span>
        <h3 className="text-md font-black tracking-[-0.025em]">{title}</h3>
      </div>
      <p className="mt-3 text-[12px] leading-[1.55] text-[#6b7481]">
        {children}
      </p>
    </article>
  );
}

function CheckLine({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-[14px] leading-[1.55] text-[#424955]">
      <span className="mt-[1px] grid size-[21px] shrink-0 place-items-center rounded-full bg-[#0b0d12] text-white">
        <Check size={13} />
      </span>
      <span>{children}</span>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <CookieConsent />
      <BehaviorTracker />

      <LeadModalProvider>
        <CommercialIntentProvider>
          <div
            className="min-h-screen bg-[#f7f8fb] text-[#0b0d12]"
            data-lp-version="decision_window_change_first_v1"
          >
            {/* NAV */}
            <header className="sticky top-0 z-40 border-b border-[#e6e9ef]/80 bg-[#f7f8fb]/92 backdrop-blur-xl">
              <div className="mx-auto flex h-[72px] w-[min(1160px,calc(100%_-_40px))] items-center justify-between gap-5">
                <a
                  href="#top"
                  aria-label="Ohrly"
                  data-analytics-cta="nav_logo"
                  data-analytics-location="navigation"
                >
                  <Brand />
                </a>

                <nav className="hidden items-center gap-6 text-[14px] font-extrabold text-[#596170] lg:flex">
                  <a href="#caso">Como funciona</a>
                  <a href="#relevancia">O que é relevante</a>
                  <a href="#custo">Por que agora</a>
                  <a href="#para-quem">Para quem</a>
                </nav>

                <CommercialIntentTrigger
                  ctaId="nav_follow_change"
                  location="navigation"
                  label="Acompanhar uma mudança"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b0d12] bg-[#0b0d12] px-4 text-[13px] font-extrabold text-white shadow-[0_5px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_7px_0_#3568f5] sm:px-5"
                >
                  Acompanhar uma mudança
                </CommercialIntentTrigger>
              </div>
            </header>

            <main id="top">
              {/* HERO */}
              <section
                className="relative overflow-hidden pb-[84px] pt-[72px] sm:pb-[100px] sm:pt-[94px] h-[100vh] content-center"
                data-analytics-section="hero"
              >
                <div className="pointer-events-none absolute right-[-250px] top-[-300px] size-[720px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.14),rgba(53,104,245,0)_68%)]" />

                <div className="relative mx-auto w-[min(1160px,calc(100%_-_40px))] items-center gap-[58px] mb-20">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e1e5eb] bg-white px-3 py-2 text-[12px] font-bold text-[#596270] shadow-[0_8px_24px_rgba(11,13,18,.04)]">
                      <span className="size-[7px] rounded-full bg-[#3568f5] shadow-[0_0_0_5px_rgba(53,104,245,.09)]" />
                      Para líderes de CS em SaaS B2B
                    </div>

                    <h1 className="mt-6 text-[47px] font-black leading-[.98] tracking-[-0.063em] sm:text-[62px] lg:text-[70px]">
                      A mudança que você implantou{" "}
                      <span className="text-[#3568f5]">
                        está produzindo o resultado que você esperava?
                      </span>
                    </h1>

                    <p className="mt-6 max-w-[680px] text-[18px] leading-[1.58] text-[#4d5664]">
                      <strong className="font-black text-[#0b0d12]">
                        Ohrly é um monitor de mudanças operacionais para Customer
                        Success.
                      </strong>
                    </p>

                    <p className="mt-3.5 max-w-[680px] text-md leading-[1.65] text-[#737b88]">
                      Veja quais clientes passaram pela mudança, quais sinais
                      realmente começaram a ganhar relevância e onde vale
                      investigar antes de esperar meses pelo resultado final.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <CommercialIntentTrigger
                        ctaId="hero_follow_change"
                        location="hero"
                        label="Quero acompanhar uma mudança"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                      >
                        Quero acompanhar uma mudança
                        <ArrowRight size={16} />
                      </CommercialIntentTrigger>

                      <a
                        href="#caso"
                        data-analytics-cta="hero_see_example"
                        data-analytics-location="hero"
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#dfe3e9] bg-white px-5 font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                      >
                        Ver um exemplo
                      </a>
                    </div>

                    <p className="mt-4 text-[12px] font-medium text-[#8a919d]">
                      Comece com uma mudança real. Sem substituir seu CRM, BI ou
                      processo atual.
                    </p>
                  </div>
                </div>
              </section>

              {/* SIMPLE CASE */}
              <section
                id="caso"
                className="scroll-mt-24 bg-white py-[82px] sm:py-[96px]"
                data-analytics-section="simple_case"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <div className="mx-auto max-w-[1200px] text-left">
                    <Eyebrow>Um caso concreto</Eyebrow>
                    <h2 className="mt-4 text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[53px]">
                      Toda mudança gera sinais.{" "}
                      <span className="text-[#3568f5]">
                        A diferença está em quando você consegue entendê-los.
                      </span>
                    </h2>
                    <p className="mt-5 max-w-[1200px] text-[17px] leading-[1.62] text-[#667085]">
                      O mesmo cenário, duas leituras. Sem teoria demais: apenas o
                      que muda na prática quando os sinais deixam de ficar soltos.
                    </p>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[30px] border border-[#e2e7ef] bg-white shadow-[0_24px_70px_rgba(11,13,18,.07)]">
                    <div className="flex justify-center border-b border-[#e8ebf1] bg-[linear-gradient(180deg,#fff,#fbfcfe)] p-[17px]">
                      <div className="grid w-full max-w-[390px] grid-cols-2 gap-1.5 rounded-full border border-[#e1e5eb] bg-[#f2f4f8] p-1.5">
                        <button
                          type="button"
                          aria-selected="true"
                          data-cycle-tab="before"
                          className="min-h-11 rounded-full bg-white px-4 text-[13px] font-black text-[#0b0d12] shadow-[0_8px_22px_rgba(11,13,18,.08)] transition"
                        >
                          Antes do Ohrly
                        </button>
                        <button
                          type="button"
                          aria-selected="false"
                          data-cycle-tab="after"
                          className="min-h-11 rounded-full px-4 text-[13px] font-black text-[#727b89] transition"
                        >
                          Com Ohrly
                        </button>
                      </div>
                    </div>

                    <div data-cycle-panel="before" className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[.08em] text-[#8a929e]">
                            Leitura da operação
                          </div>
                          <h3 className="mt-1.5 text-[27px] font-black leading-[1.08] tracking-[-0.04em]">
                            A mudança acontece. Os sinais aparecem. A decisão
                            chega tarde.
                          </h3>
                        </div>

                        <span className="rounded-full bg-[#fff4f4] px-3 py-2 text-[10px] font-black uppercase tracking-[.08em] text-[#c84444]">
                          decisão tardia
                        </span>
                      </div>

                      <div className="mt-[18px] rounded-[24px] border border-[#edf0f4] bg-[radial-gradient(circle_at_95%_0%,rgba(53,104,245,.06),transparent_26%),#fafbfc] p-[18px]">
                        <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
                          <SimpleFlowStep
                            number="01"
                            label="Mudança"
                            title="Mudança aplicada"
                          >
                            Um novo processo entra em produção.
                          </SimpleFlowStep>

                          <FlowArrow />

                          <SimpleFlowStep
                            number="02"
                            label="Exposição"
                            title="Clientes expostos"
                          >
                            Clientes reais passam pela nova configuração.
                          </SimpleFlowStep>

                          <FlowArrow />

                          <SimpleFlowStep
                            number="03"
                            label="Sinais"
                            title="Sinais espalhados"
                          >
                            Dúvidas, reaberturas e fricções aparecem em lugares
                            diferentes.
                          </SimpleFlowStep>

                          <FlowArrow />

                          <SimpleFlowStep
                            number="04"
                            label="Decisão"
                            title="Descoberta tardia"
                            tone="danger"
                          >
                            O padrão só ganha nome depois de recorrência
                            suficiente.
                          </SimpleFlowStep>
                        </div>
                      </div>

                      <div className="mt-4 rounded-[16px] border border-[#edf0f4] bg-[#fbfcfe] px-4 py-3.5 text-center text-[12px] leading-[1.55] text-[#657080]">
                        <strong className="text-[#0b0d12]">Sem Ohrly:</strong>{" "}
                        a percepção existe, mas a leitura sistêmica chega depois.
                      </div>
                    </div>

                    <div data-cycle-panel="after" className="hidden p-6">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-[.08em] text-[#8a929e]">
                            Leitura da operação
                          </div>
                          <h3 className="mt-1.5 text-[27px] font-black leading-[1.08] tracking-[-0.04em]">
                            A mudança acontece. Os sinais ganham contexto. A
                            decisão chega cedo.
                          </h3>
                        </div>

                        <span className="rounded-full bg-[#eaf8f1] px-3 py-2 text-[10px] font-black uppercase tracking-[.08em] text-[#16824a]">
                          investigação antecipada
                        </span>
                      </div>

                      <div className="mt-[18px] rounded-[24px] border border-[#edf0f4] bg-[radial-gradient(circle_at_95%_0%,rgba(53,104,245,.06),transparent_26%),#fafbfc] p-[18px]">
                        <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
                          <SimpleFlowStep
                            number="01"
                            label="Mudança"
                            title="Mudança acompanhada"
                          >
                            A mudança é registrada no contexto em que passou a
                            valer.
                          </SimpleFlowStep>

                          <FlowArrow />

                          <SimpleFlowStep
                            number="02"
                            label="Exposição"
                            title="Clientes expostos"
                          >
                            Ohrly sabe quem passou pela mudança.
                          </SimpleFlowStep>

                          <FlowArrow />

                          <SimpleFlowStep
                            number="03"
                            label="Sinais"
                            title="Sinais relevantes ligados à mudança"
                          >
                            Ruído é filtrado; o que persiste e ganha peso fica
                            relacionado ao que foi implantado.
                          </SimpleFlowStep>

                          <FlowArrow />

                          <SimpleFlowStep
                            number="04"
                            label="Decisão"
                            title="Investigação antecipada"
                            tone="success"
                          >
                            A operação entende mais cedo o que merece atenção.
                          </SimpleFlowStep>
                        </div>

                        <div className="mx-auto mt-4 flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-[#dbe5ff] bg-[#f6f8ff] px-4 py-2.5 text-[10px] font-black uppercase tracking-[.07em] text-[#526ca8]">
                          Investigação
                          <ArrowRight size={12} />
                          Aprendizado
                          <ArrowRight size={12} />
                          Próxima mudança ↻
                        </div>
                      </div>

                      <div className="mt-4 rounded-[16px] border border-[#edf0f4] bg-[#fbfcfe] px-4 py-3.5 text-center text-[12px] leading-[1.55] text-[#657080]">
                        <strong className="text-[#0b0d12]">Com Ohrly:</strong>{" "}
                        a mudança vira o contexto que organiza o que é relevante
                        e acelera a investigação.
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* RELEVANCE */}
              <section
                id="relevancia"
                className="scroll-mt-24 py-[82px] sm:py-[96px]"
                data-analytics-section="relevance_filter"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <div className="grid items-start gap-10 lg:grid-cols-[.82fr_1.18fr]">
                    <div>
                      <Eyebrow>O que é relevante?</Eyebrow>

                      <h2 className="mt-4 text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[51px]">
                        Nem todo comportamento estranho{" "}
                        <span className="text-[#3568f5]">
                          merece sua atenção.
                        </span>
                      </h2>

                      <p className="mt-5 max-w-[520px] text-md leading-[1.65] text-[#667085]">
                        Um pico isolado pode ser ruído. Ohrly procura sinais que
                        ficam relevantes quando deixam de ser uma oscilação
                        normal e <span className="text-[#3568f5] font-bold">começam a justificar investigação humana.</span>
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <RelevanceCard number="01" title="É estranho para este contexto?">
                        Ohrly compara o comportamento com o que é esperado para
                        aquela situação — não com uma média global genérica.
                      </RelevanceCard>

                      <RelevanceCard number="02" title="Persistiu além do ruído?">
                        Um desvio curto pode desaparecer sozinho. Ele ganha
                        relevância quando sobrevive ao tempo e ao ciclo natural
                        de recuperação.
                      </RelevanceCard>

                      <RelevanceCard number="03" title="Ganhou peso operacional?">
                        Magnitude, recorrência e propagação importam. Um sinal
                        pequeno e localizado não vale a mesma atenção que um
                        comportamento que começa a se repetir ou se espalhar.
                      </RelevanceCard>

                      <RelevanceCard number="04" title="Já justifica investigar?">
                        O objetivo não é alertar sobre tudo. É chegar ao ponto em
                        que existe evidência suficiente para uma decisão
                        defensável, antes que esperar vire a única opção.
                      </RelevanceCard>
                    </div>
                  </div>

                  <div className="mt-8 rounded-[22px] border border-[#dfe5ef] bg-white p-5 shadow-[0_12px_30px_rgba(11,13,18,.035)]">
                    <div className="grid items-center gap-4 text-center md:grid-cols-[1fr_auto_1fr_auto_1fr]">
                      <div className="rounded-[16px] bg-[#f6f7f9] px-4 py-4">
                        <div className="text-[10px] font-black uppercase tracking-[.08em] text-[#8a929d]">
                          Oscilação
                        </div>
                        <strong className="mt-1 block text-[15px]">
                          comportamento diferente
                        </strong>
                      </div>

                      <ArrowRight className="mx-auto rotate-90 text-[#aeb6c3] md:rotate-0" />

                      <div className="rounded-[16px] border border-[#dbe5ff] bg-[#f5f8ff] px-4 py-4">
                        <div className="text-[10px] font-black uppercase tracking-[.08em] text-[#3568f5]">
                          Filtro de relevância
                        </div>
                        <strong className="mt-1 block text-[15px]">
                          contexto + persistência + peso
                        </strong>
                      </div>

                      <ArrowRight className="mx-auto rotate-90 text-[#aeb6c3] md:rotate-0" />

                      <div className="rounded-[16px] border border-[#d8ebdf] bg-[#f1faf5] px-4 py-4">
                        <div className="text-[10px] font-black uppercase tracking-[.08em] text-[#16824a]">
                          Atenção
                        </div>
                        <strong className="mt-1 block text-[15px]">
                          merece investigação
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[22px] bg-[#10131a] p-5 text-white">
                    <div className="text-[10px] font-black uppercase tracking-[.09em] text-[#9bb6ff]">
                      Regra simples
                    </div>
                    <p className="mt-2 text-[17px] font-black leading-[1.45] tracking-[-0.025em]">
                      Relevante é o que foge do esperado no contexto certo,
                      persiste além do ciclo natural e ganha peso suficiente
                      para tornar a espera menos neutra.
                    </p>
                  </div>
                </div>
              </section>

              {/* DECISION WINDOW */}
              <section
                id="custo"
                className="scroll-mt-24 bg-white py-[82px] sm:py-[96px]"
                data-analytics-section="decision_window"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <Eyebrow>Por que isso importa</Eyebrow>

                  <h2 className="mt-4 max-w-[1200px] text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                    Enquanto falta evidência para agir,{" "}
                    <span className="text-[#3568f5]">
                      sua operação continua pagando pela espera.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-[1200px] text-[17px] leading-[1.62] text-[#667085]">
                    Quando uma mudança começa a produzir algo inesperado <span className="text-[#3568f5] font-bold">a ação, ou falta dela, tem custo. </span>
                    Sem evidência suficiente, é fácil adiar a investigação, e aceitar silenciosamente o custo financeiro ou político de continuar esperando.
                  </p>

                  <div className="mt-10 rounded-[28px] border border-[#e4e8ef] bg-white p-6 shadow-[0_20px_54px_rgba(11,13,18,.05)]">
                    <div className="relative mt-9 grid gap-5 md:grid-cols-4">
                      <div className="absolute left-[10%] right-[10%] top-[17px] hidden h-[2px] bg-[linear-gradient(90deg,#dce4f6,#9bb6ff_38%,#e1b568_68%,#c84444)] md:block" />

                      {[
                        {
                          value: "01",
                          label: "Pouca evidência",
                          title: "Algo começou a mudar",
                          body: "Agir agora pode parecer precipitado.",
                          tone: "neutral",
                        },
                        {
                          value: "02",
                          label: "Sinal relevante",
                          title: "O padrão começa a se sustentar",
                          body: "Já existe motivo para prestar atenção.",
                          tone: "blue",
                        },
                        {
                          value: "03",
                          label: "Janela de decisão",
                          title: "Há evidência para investigar",
                          body: "Ainda existem opções relevantes de ação.",
                          tone: "amber",
                        },
                        {
                          value: "04",
                          label: "Outcome explícito",
                          title: "Agora ficou óbvio",
                          body: "Mas agir pode custar muito mais.",
                          tone: "red",
                        },
                      ].map((item) => (
                        <div key={item.label} className="relative z-[1] text-center">
                          <div
                            className={`mx-auto grid size-[34px] place-items-center rounded-full border-4 border-white text-[10px] font-black shadow-[0_0_0_1px_#d6dde8] ${item.tone === "red"
                                ? "bg-[#fff0f0] text-[#b33e3e]"
                                : item.tone === "amber"
                                  ? "bg-[#fff4d9] text-[#9b6a00]"
                                  : item.tone === "blue"
                                    ? "bg-[#eaf0ff] text-[#3568f5]"
                                    : "bg-[#eef1f6] text-[#667085]"
                              }`}
                          >
                            {item.value}
                          </div>

                          <div className="mt-2.5 text-[12px] font-black uppercase tracking-[.08em] text-[#8d94a0]">
                            {item.label}
                          </div>

                          <strong className="mt-1.5 block text-[13px] leading-[1.35]">
                            {item.title}
                          </strong>

                          <p className="mx-auto mt-1.5 max-w-[180px] text-[11px] leading-[1.45] text-[#7a828e]">
                            {item.body}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 rounded-[16px] border border-[#dbe5ff] bg-[#f5f8ff] px-4 py-4 text-center text-[13px] leading-[1.55] text-[#526ca8]">
                      <strong className="text-[#263f82]">
                        Ohrly procura o momento em que já existe evidência suficiente para agir,
                        antes que esperar torne a próxima decisão mais cara.
                      </strong>
                    </div>
                  </div>
                </div>
              </section>

              {/* HOW */}
              <section
                className="py-[82px] sm:py-[96px]"
                data-analytics-section="how_it_works"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <Eyebrow>Como funciona</Eyebrow>

                  <h2 className="mt-4 max-w-[820px] text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                    Três coisas.{" "}
                    <span className="text-[#3568f5]">
                      Sem reconstruir a operação inteira.
                    </span>
                  </h2>

                  <div className="mt-10 grid gap-3.5 lg:grid-cols-3">
                    <article className="rounded-[22px] border border-[#e4e8ef] bg-white p-6">
                      <div className="grid size-[42px] place-items-center rounded-[13px] bg-[#f0f3fa] text-[12px] font-black text-[#263047]">
                        01
                      </div>
                      <h3 className="mt-6 text-[19px] font-black tracking-[-0.03em]">
                        Registre a mudança
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.55] text-[#6d7582]">
                        O que mudou, para qual contexto, quando entrou em
                        produção e o que deveria melhorar.
                      </p>
                    </article>

                    <article className="rounded-[22px] border border-[#e4e8ef] bg-white p-6">
                      <div className="grid size-[42px] place-items-center rounded-[13px] bg-[#f0f3fa] text-[12px] font-black text-[#263047]">
                        02
                      </div>
                      <h3 className="mt-6 text-[19px] font-black tracking-[-0.03em]">
                        Acompanhe quem foi exposto
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.55] text-[#6d7582]">
                        Ohrly preserva quais clientes passaram por aquela
                        configuração específica.
                      </p>
                    </article>

                    <article className="rounded-[22px] border border-[#e4e8ef] bg-white p-6">
                      <div className="grid size-[42px] place-items-center rounded-[13px] bg-[#f0f3fa] text-[12px] font-black text-[#263047]">
                        03
                      </div>
                      <h3 className="mt-6 text-[19px] font-black tracking-[-0.03em]">
                        Veja o que merece atenção
                      </h3>
                      <p className="mt-2 text-[13px] leading-[1.55] text-[#6d7582]">
                        Quando sinais relevantes começam a se repetir no
                        contexto certo, a operação ganha uma pergunta concreta.
                      </p>
                    </article>
                  </div>
                </div>
              </section>

              {/* PRODUCT BOUNDARY */}
              <section
                className="bg-[#10131a] py-[82px] text-white sm:py-[96px]"
                data-analytics-section="product_boundary"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <Eyebrow light>Ohrly não substitui seu time</Eyebrow>

                  <h2 className="mt-4 max-w-[930px] text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                    Seu CSM continua percebendo o cliente.{" "}
                    <span className="text-[#9bb6ff]">
                      Ohrly ajuda a organização a ligar os pontos.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-[760px] text-[17px] leading-[1.62] text-[#aeb6c4]">
                    O produto não tenta prever tudo nem transformar toda
                    oscilação em alerta. Ele organiza a relação entre mudança,
                    contexto, exposição e sinais relevantes.
                  </p>

                  <div className="mt-10 grid gap-3.5 lg:grid-cols-3">
                    {[
                      [
                        "01",
                        "CRM continua sendo CRM",
                        "Histórico, relacionamento e execução continuam onde já estão.",
                      ],
                      [
                        "02",
                        "BI continua respondendo perguntas conhecidas",
                        "Indicadores consolidados continuam essenciais para medir a operação.",
                      ],
                      [
                        "03",
                        "Ohrly acompanha o que ficou relevante",
                        "A diferença é saber mais cedo quando uma mudança começou a produzir algo que merece investigação.",
                      ],
                    ].map(([no, title, body]) => (
                      <article
                        key={title}
                        className="min-h-[205px] rounded-[22px] border border-[#2a303a] bg-[#171b25] p-6"
                      >
                        <div className="text-[10px] font-black tracking-[.1em] text-[#737c8b]">
                          {no}
                        </div>
                        <h3 className="mt-8 text-[20px] font-black tracking-[-0.03em]">
                          {title}
                        </h3>
                        <p className="mt-2 text-[13px] leading-[1.56] text-[#aab2bf]">
                          {body}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* WHO */}
              <section
                id="para-quem"
                className="scroll-mt-24 bg-white py-[82px] sm:py-[96px]"
                data-analytics-section="who_is_it_for"
              >
                <div className="mx-auto grid w-[min(1120px,calc(100%_-_40px))] gap-10 lg:grid-cols-[.92fr_1.08fr]">
                  <div>
                    <Eyebrow>Para quem faz sentido</Eyebrow>

                    <h2 className="mt-4 text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[51px]">
                      Para times de CS que já têm processo{" "}
                      <span className="text-[#3568f5]">
                        e estão mudando a operação.
                      </span>
                    </h2>

                    <p className="mt-5 max-w-[540px] text-md leading-[1.65] text-[#667085]">
                      O melhor primeiro caso não é “organizar tudo”. É acompanhar
                      uma mudança concreta que está entrando em produção agora.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-[#e4e8ef] bg-[#f8f9fb] p-7">
                    <div className="grid gap-5">
                      <div className="grid grid-cols-[42px_1fr] items-start gap-3.5">
                        <div className="grid size-[42px] place-items-center rounded-[13px] bg-white text-[11px] font-black text-[#3568f5] shadow-[0_8px_20px_rgba(11,13,18,.05)]">
                          CS
                        </div>
                        <div>
                          <strong className="text-[15px]">
                            SaaS B2B com Customer Success estruturado
                          </strong>
                          <p className="mt-1 text-[13px] leading-[1.5] text-[#717986]">
                            Existe processo suficiente para dizer o que mudou e o
                            que deveria acontecer depois.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-[42px_1fr] items-start gap-3.5">
                        <div className="grid size-[42px] place-items-center rounded-[13px] bg-white text-[11px] font-black text-[#3568f5] shadow-[0_8px_20px_rgba(11,13,18,.05)]">
                          ↻
                        </div>
                        <div>
                          <strong className="text-[15px]">
                            Uma mudança real em produção ou prestes a entrar
                          </strong>
                          <p className="mt-1 text-[13px] leading-[1.5] text-[#717986]">
                            Implantação, playbook, segmentação, automação ou outra
                            configuração operacional.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-[42px_1fr] items-start gap-3.5">
                        <div className="grid size-[42px] place-items-center rounded-[13px] bg-white text-[11px] font-black text-[#3568f5] shadow-[0_8px_20px_rgba(11,13,18,.05)]">
                          ▥
                        </div>
                        <div>
                          <strong className="text-[15px]">
                            Dados mínimos já disponíveis
                          </strong>
                          <p className="mt-1 text-[13px] leading-[1.5] text-[#717986]">
                            CRM, produto, suporte, planilha ou warehouse. Não
                            precisamos começar com dez integrações.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section
                className="pb-[100px] pt-[30px] sm:pb-[112px] sm:pt-[42px]"
                data-analytics-section="design_partner"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <div className="grid items-center gap-10 rounded-[34px] bg-[linear-gradient(145deg,#10131a,#1b2231)] p-7 text-white sm:p-10 lg:grid-cols-[1fr_.82fr] lg:p-11">
                    <div>
                      <Eyebrow light>Primeiros design partners</Eyebrow>

                      <h2 className="mt-4 text-[39px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                        Qual mudança sua operação está prestes a colocar em
                        produção?
                      </h2>

                      <p className="mt-5 max-w-[620px] text-md leading-[1.65] text-[#b8c0cf]">
                        Queremos acompanhar mudanças reais junto a times de
                        Customer Success: entender o que mudou, quem passou por
                        ela, quais sinais se tornaram relevantes e onde vale
                        investigar.
                      </p>
                    </div>

                    <div className="rounded-[26px] bg-white p-6 text-[#0b0d12] shadow-[0_22px_65px_rgba(0,0,0,.17)]">
                      <div className="text-[10px] font-black uppercase tracking-[.09em] text-[#7d8591]">
                        Primeiro passo
                      </div>

                      <h3 className="mt-2 text-[25px] font-black leading-[1.1] tracking-[-0.043em]">
                        Conte a mudança. A gente avalia se ela é um bom caso para
                        acompanhar.
                      </h3>

                      <p className="mt-3 text-[13px] leading-[1.55] text-[#727a87]">
                        A primeira conversa serve para entender o processo, o
                        momento da mudança e os dados disponíveis.
                      </p>

                      <CommercialIntentTrigger
                        ctaId="design_partner_follow_change"
                        location="design_partner"
                        label="Quero acompanhar uma mudança"
                        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                      >
                        Quero acompanhar uma mudança
                        <ArrowRight size={16} />
                      </CommercialIntentTrigger>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="border-t border-[#e3e6eb] bg-white py-10">
              <div className="mx-auto flex w-[min(1120px,calc(100%_-_40px))] flex-col items-start justify-between gap-5 text-[13px] text-[#707784] sm:flex-row sm:items-center">
                <Brand />
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href="/privacy"
                    className="font-bold text-[#596270] hover:text-[#0b0d12]"
                    data-analytics-cta="footer_privacy"
                    data-analytics-location="footer"
                  >
                    Privacidade
                  </Link>
                  <span>Monitor de mudanças operacionais para Customer Success</span>
                </div>
              </div>
            </footer>
          </div>
        </CommercialIntentProvider>
      </LeadModalProvider>

      <Script id="ohrly-simple-tabs" strategy="afterInteractive">
        {`
          (() => {
            const root = document.querySelector(
              '[data-analytics-section="simple_case"]'
            );
            if (!root) return;

            const buttons = root.querySelectorAll("[data-cycle-tab]");
            const panels = root.querySelectorAll("[data-cycle-panel]");

            const activeClass =
              "min-h-11 rounded-full bg-white px-4 text-[13px] font-black text-[#0b0d12] shadow-[0_8px_22px_rgba(11,13,18,.08)] transition";
            const inactiveClass =
              "min-h-11 rounded-full px-4 text-[13px] font-black text-[#727b89] transition";

            const activate = (target) => {
              buttons.forEach((button) => {
                const active =
                  button.getAttribute("data-cycle-tab") === target;

                button.setAttribute(
                  "aria-selected",
                  active ? "true" : "false"
                );

                button.className = active
                  ? activeClass
                  : inactiveClass;
              });

              panels.forEach((panel) => {
                const active =
                  panel.getAttribute("data-cycle-panel") === target;

                panel.classList.toggle("hidden", !active);
              });
            };

            buttons.forEach((button) => {
              button.addEventListener("click", () => {
                const target = button.getAttribute("data-cycle-tab");
                if (target) activate(target);
              });
            });
          })();
        `}
      </Script>
    </>
  );
}
