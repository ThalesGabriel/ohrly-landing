import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import type { ReactNode } from "react";

import {
  ArrowRight,
  Check,
  Clock3,
  LineChart,
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
  title:
    "Ohrly — A mudança que você implantou está produzindo o resultado que você esperava?",
  description:
    "Ohrly acompanha mudanças operacionais enquanto elas acontecem e conecta o que foi implantado ao que começou a acontecer depois: exposição, sinais, padrões emergentes e investigação.",
  openGraph: {
    title:
      "A mudança que você implantou está produzindo o resultado que você esperava?",
    description:
      "Acompanhe uma mudança operacional desde a exposição até os sinais emergentes — antes de esperar o outcome final para começar a investigar.",
    type: "website",
  },
};

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-[22px] font-black tracking-[-0.04em] text-[#0b0d12]">
      <svg
        viewBox="0 0 44 44"
        aria-hidden="true"
        className="h-[34px] w-[34px]"
      >
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
      className={`inline-flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-[.08em] ${
        light ? "text-[#9bb6ff]" : "text-[#3568f5]"
      }`}
    >
      <span
        className={`h-[3px] w-6 rounded-full ${
          light ? "bg-[#9bb6ff]" : "bg-[#3568f5]"
        }`}
      />
      {children}
    </div>
  );
}

function ChangeStep({
  number,
  title,
  children,
  highlight = false,
}: {
  number: string;
  title: string;
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <article
      className={`relative min-h-[178px] rounded-[21px] border p-5 ${
        highlight
          ? "border-[#cad6ff] bg-[#f7f9ff]"
          : "border-[#e4e7ec] bg-white"
      }`}
    >
      <div
        className={`text-[10px] font-black tracking-[.1em] ${
          highlight ? "text-[#3568f5]" : "text-[#9aa1ac]"
        }`}
      >
        {number}
      </div>
      <h3
        className={`mt-7 text-[16px] font-black leading-[1.2] tracking-[-0.03em] ${
          highlight ? "text-[#3568f5]" : ""
        }`}
      >
        {title}
      </h3>
      <p className="mt-2 text-sm leading-[1.5] text-[#6d7582]">
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

function ContextCard({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[17px] border border-[#e2e6ed] bg-white px-4 py-[15px] text-left shadow-[0_8px_24px_rgba(11,13,18,.035)]">
      <div className="text-[9px] font-black uppercase tracking-[.09em] text-[#8c94a1]">
        {label}
      </div>
      <div className="mt-1.5 text-[14px] font-black leading-[1.4]">
        {children}
      </div>
    </div>
  );
}

function CycleSummary({
  label,
  children,
  tone = "neutral",
}: {
  label: string;
  children: ReactNode;
  tone?: "neutral" | "danger" | "success";
}) {
  const toneClass =
    tone === "danger"
      ? "border-[#efdddd] bg-[#fff6f6]"
      : tone === "success"
        ? "border-[#d9ebdf] bg-[#f1faf5]"
        : "border-[#e6e9ef] bg-[#f8f9fb]";

  return (
    <div className={`min-h-[94px] rounded-[17px] border p-[15px] ${toneClass}`}>
      <div className="text-[9px] font-black uppercase tracking-[.08em] text-[#9199a6]">
        {label}
      </div>
      <div className="mt-1.5 text-sm font-black leading-[1.45]">
        {children}
      </div>
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
      className={`min-h-[152px] rounded-[22px] border p-4 text-center shadow-[0_10px_24px_rgba(11,13,18,.04)] ${toneClass}`}
    >
      <div className="mx-auto grid size-[34px] place-items-center rounded-[11px] bg-[#f0f3fa] text-sm font-black text-[#24314e]">
        {number}
      </div>
      <div className="mt-3 text-[9px] font-black uppercase tracking-[.08em] text-[#8b93a0]">
        {label}
      </div>
      <strong className="mt-1.5 block text-[18px] font-black leading-[1.15] tracking-[-0.03em]">
        {title}
      </strong>
      <p className="mt-2 text-sm leading-[1.45] text-[#6b7481]">
        {children}
      </p>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex items-center justify-center text-[30px] font-black text-[#b6bfcd] rotate-90 lg:rotate-0">
      →
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
            data-lp-version="simplified_learning_cycle_v5"
          >
            <header className="sticky top-0 z-40 border-b border-[#e6e9ef]/80 bg-[#f7f8fb]/92 backdrop-blur-xl">
              <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%_-_40px))] items-center justify-between gap-5">
                <a
                  href="#top"
                  aria-label="Ohrly"
                  data-analytics-cta="nav_logo"
                  data-analytics-location="navigation"
                >
                  <Brand />
                </a>

                <nav className="hidden items-center gap-6 text-[14px] font-extrabold text-[#596170] lg:flex">
                  <a href="#unidade">Como funciona</a>
                  <a href="#caso">Caso concreto</a>
                  <a href="#para-quem">Para quem</a>
                </nav>

                <CommercialIntentTrigger
                  ctaId="nav_follow_change"
                  location="navigation"
                  label="Acompanhar uma mudança"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b0d12] bg-[#0b0d12] px-4 text-sm font-extrabold text-white shadow-[0_5px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_7px_0_#3568f5] sm:px-5 sm:text-sm"
                >
                  Acompanhar uma mudança
                </CommercialIntentTrigger>
              </div>
            </header>

            <main id="top">
              {/* HERO */}
              <section
                className="relative overflow-hidden pb-[84px] pt-[72px] sm:pb-[104px] sm:pt-[96px] lg:pb-[112px] lg:pt-[108px] h-[100vh] flex items-center"
                data-analytics-section="hero"
              >
                <div className="pointer-events-none absolute right-[-270px] top-[-310px] size-[760px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.13),rgba(53,104,245,0)_68%)]" />
                <div className="pointer-events-none absolute bottom-[-330px] left-[-220px] size-[620px] rounded-full bg-[radial-gradient(circle,rgba(47,181,119,.065),rgba(47,181,119,0)_68%)]" />

                <div className="relative mx-auto grid w-[min(1180px,calc(100%_-_40px))] items-center gap-[58px]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e1e5eb] bg-white/90 px-3 py-2 text-sm font-bold text-[#596270] shadow-[0_8px_24px_rgba(11,13,18,.04)]">
                      <span className="size-[7px] rounded-full bg-[#3568f5] shadow-[0_0_0_5px_rgba(53,104,245,.09)]" />
                      Para times de CS e Operações de SaaS B2B
                    </div>

                    <h1 className="mt-6 text-center text-[47px] font-black leading-[.98] tracking-[-0.062em] sm:text-[62px] lg:text-[72px]">
                      A mudança que você implantou{" "}
                      <span className="text-[#3568f5]">
                        está produzindo o resultado que você esperava?
                      </span>
                    </h1>

                    <p className="mt-7 text-center text-[18px] leading-[1.62] text-[#596170] sm:text-[19px]">
                      Ohrly acompanha uma mudança operacional enquanto ela acontece
                      e conecta{" "}
                      <strong className="font-black text-[#0b0d12]">
                        o que você implantou ao que começou a acontecer depois
                      </strong>
                      : Quem foi exposto, qual resultado era esperado e quais
                      efeitos começaram a aparecer antes do fechamento do ciclo.
                    </p>

                    <p className="mt-4 text-center text-[15px] leading-[1.62] text-[#747c89]">
                      Sem depender de uma única métrica e sem esperar o churn
                      aparecer para começar a investigar.
                    </p>

                    <div className="mt-9 text-center flex flex-wrap items-center gap-3 justify-center">
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
                        href="#unidade"
                        data-analytics-cta="hero_see_how"
                        data-analytics-location="hero"
                        className="text-center inline-flex min-h-12 items-center justify-center rounded-full border border-[#dfe3e9] bg-white px-5 font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                      >
                        Ver como funciona
                      </a>
                    </div>

                    <p className="mt-5 text-center text-sm font-medium text-[#858b96]">
                      Comece com uma mudança real. Sem substituir seu CRM, BI ou
                      processo atual.
                    </p>
                  </div>

                </div>
              </section>

              {/* UNIT */}
              <section
                id="unidade"
                className="scroll-mt-24 bg-white py-[82px] sm:py-[98px]"
                data-analytics-section="change_unit"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="mx-auto  text-center">
                    <Eyebrow>A unidade do Ohrly</Eyebrow>
                    <h2 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                      Uma mudança entra em produção.{" "}
                      <span className="text-[#3568f5]">
                        Ohrly acompanha o que acontece depois.
                      </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-[900px] text-[17px] leading-[1.62] text-[#667085]">
                      O produto organiza a história da mudança de ponta a ponta,
                      para que você não precise reconstruir meses depois o que
                      aconteceu, com quem e por quê.
                    </p>
                  </div>

                  <div className="mt-12 grid gap-2 lg:grid-cols-6">
                    <ChangeStep number="01" title="Mudança" highlight>
                      O que mudou, quando entrou em produção e por quê.
                    </ChangeStep>
                    <ChangeStep number="02" title="Exposição">
                      Quais clientes realmente passaram pela nova configuração.
                    </ChangeStep>
                    <ChangeStep number="03" title="Esperado">
                      Qual comportamento ou resultado deveria melhorar.
                    </ChangeStep>
                    <ChangeStep number="04" title="Emergente">
                      O que começou a mudar junto, inclusive fora da pergunta
                      original.
                    </ChangeStep>
                    <ChangeStep number="05" title="Investigação">
                      Onde o time precisa aprofundar antes de chamar a mudança de
                      sucesso.
                    </ChangeStep>
                    <ChangeStep number="06" title="Próxima mudança" highlight>
                      O aprendizado vira evidência para decidir o que fazer
                      depois.
                    </ChangeStep>
                  </div>
                </div>
              </section>

              {/* SIMPLIFIED LEARNING CYCLE */}
              <section
                id="caso"
                className="scroll-mt-24 py-[82px] sm:py-[98px]"
                data-analytics-section="learning_cycle_compare_simplified"
              >
                <div className="mx-auto w-[min(1120px,calc(100%_-_40px))]">
                  <div className="mx-auto text-center">
                    <Eyebrow>Um caso concreto</Eyebrow>
                    <h2 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                      Toda mudança gera sinais.{" "}
                      <span className="text-[#3568f5]">
                        A diferença está em quando você consegue entendê-los.
                      </span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-[900px] text-[17px] leading-[1.62] text-[#667085]">
                      <strong className="text-[#0b0d12]">O mesmo cenário, duas leituras. Uma mudança é fácil de acompanhar, </strong>
                      o problema começa quando implantação, segmentação, playbooks e automações mudam ao mesmo tempo para clientes, contextos e períodos diferentes.
                    </p>
                  </div>

                  {/* <div className="mx-auto mt-9 grid max-w-[940px] gap-3 sm:grid-cols-3">
                    <ContextCard label="Mudança">
                      Novo handoff de implantação
                    </ContextCard>
                    <ContextCard label="Contexto">
                      Enterprise · integração complexa
                    </ContextCard>
                    <ContextCard label="Exposição">
                      42 clientes passaram por essa configuração
                    </ContextCard>
                  </div> */}

                  <div className="mt-7 overflow-hidden rounded-[32px] border border-[#e2e7ef] bg-white shadow-[0_24px_70px_rgba(11,13,18,.08)]">
                    <div className="flex justify-center border-b border-[#e8ebf1] bg-[linear-gradient(180deg,#fff,#fbfcfe)] p-[18px]">
                      <div className="grid w-full max-w-[390px] grid-cols-2 gap-1.5 rounded-full border border-[#e1e5eb] bg-[#f2f4f8] p-1.5">
                        <button
                          type="button"
                          role="tab"
                          aria-selected="true"
                          data-cycle-tab="before"
                          className="min-h-11 rounded-full bg-white px-4 text-sm font-black text-[#0b0d12] shadow-[0_8px_22px_rgba(11,13,18,.08)] transition"
                        >
                          Antes do Ohrly
                        </button>
                        <button
                          type="button"
                          role="tab"
                          aria-selected="false"
                          data-cycle-tab="after"
                          className="min-h-11 rounded-full px-4 text-sm font-black text-[#727b89] transition"
                        >
                          Com Ohrly
                        </button>
                      </div>
                    </div>

                    {/* BEFORE */}
                    <div data-cycle-panel="before">
                      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pb-1 pt-6">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[.09em] text-[#8a929e]">
                            Leitura da operação
                          </div>
                          <h3 className="mt-1.5 text-[27px] font-black leading-[1.08] tracking-[-0.04em]">
                            A mudança acontece. Os sinais aparecem. A decisão
                            chega tarde.
                          </h3>
                        </div>
                        <span className="rounded-full bg-[#fff3f3] px-3 py-2 text-[10px] font-black uppercase tracking-[.08em] text-[#c84444]">
                          decisão tardia
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="rounded-[26px] border border-[#edf0f4] bg-[radial-gradient(circle_at_95%_0%,rgba(53,104,245,.06),transparent_26%),#fafbfc] p-[18px]">
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

                        <div className="mt-[18px] grid gap-3 md:grid-cols-2">
                          <div className="rounded-[18px] border border-[#e4e8ef] bg-white px-[18px] py-4 text-sm leading-[1.55] text-[#667085]">
                            <strong className="mb-1 block text-[#0b0d12]">
                              O que o time já faz
                            </strong>
                            O time percebe sinais localmente, conta por conta.
                          </div>
                          <div className="rounded-[18px] border border-[#e4e8ef] bg-white px-[18px] py-4 text-sm leading-[1.55] text-[#667085]">
                            <strong className="mb-1 block text-[#0b0d12]">
                              Onde está o gargalo
                            </strong>
                            A operação demora para ligar vários episódios à mesma
                            mudança.
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#e8ebf0] px-5 py-4 text-center text-sm leading-[1.6] text-[#707987]">
                        <strong className="text-[#0b0d12]">Sem Ohrly:</strong>{" "}
                        a percepção existe, mas o entendimento sistêmico chega
                        depois.
                      </div>
                    </div>

                    {/* AFTER */}
                    <div data-cycle-panel="after" className="hidden">
                      <div className="flex flex-wrap items-start justify-between gap-4 px-6 pb-1 pt-6">
                        <div>
                          <div className="text-[10px] font-black uppercase tracking-[.09em] text-[#8a929e]">
                            Leitura da operação
                          </div>
                          <h3 className="mt-1.5 text-[27px] font-black leading-[1.08] tracking-[-0.04em]">
                            A mudança acontece. Os sinais ganham contexto. A
                            decisão chega cedo.
                          </h3>
                        </div>
                        <span className="rounded-full bg-[#eaf8f1] px-3 py-2 text-[10px] font-black uppercase tracking-[.08em] text-[#16824a]">
                          decisão antecipada
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="rounded-[26px] border border-[#edf0f4] bg-[radial-gradient(circle_at_95%_0%,rgba(53,104,245,.06),transparent_26%),#fafbfc] p-[18px]">
                          <div className="grid items-center gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
                            <SimpleFlowStep
                              number="01"
                              label="Mudança"
                              title="Mudança acompanhada"
                            >
                              A mudança é registrada no contexto em que realmente
                              passou a valer.
                            </SimpleFlowStep>

                            <FlowArrow />

                            <SimpleFlowStep
                              number="02"
                              label="Exposição"
                              title="Clientes expostos"
                            >
                              Ohrly sabe quem passou pela mudança e em qual
                              contexto.
                            </SimpleFlowStep>

                            <FlowArrow />

                            <SimpleFlowStep
                              number="03"
                              label="Sinais"
                              title="Sinais ligados à mudança"
                            >
                              Os episódios deixam de ficar soltos e passam a
                              carregar a relação com o que foi implantado.
                            </SimpleFlowStep>

                            <FlowArrow />

                            <SimpleFlowStep
                              number="04"
                              label="Decisão"
                              title="Investigação antecipada"
                              tone="success"
                            >
                              A operação entende mais cedo o que vale investigar.
                            </SimpleFlowStep>
                          </div>

                          <div className="mx-auto mt-5 flex max-w-[580px] items-center justify-center gap-2 rounded-full border border-[#dbe5ff] bg-[#f6f8ff] px-4 py-3 text-center text-[11px] font-black uppercase tracking-[.08em] text-[#526ca8]">
                            <span>Investigação</span>
                            <ArrowRight size={13} />
                            <span>Aprendizado</span>
                            <ArrowRight size={13} />
                            <span>Próxima mudança</span>
                            <span className="text-[16px]">↻</span>
                          </div>
                        </div>

                        <div className="mt-[18px] grid gap-3 md:grid-cols-2">
                          <div className="rounded-[18px] border border-[#e4e8ef] bg-white px-[18px] py-4 text-sm leading-[1.55] text-[#667085]">
                            <strong className="mb-1 block text-[#0b0d12]">
                              O que muda
                            </strong>
                            A unidade deixa de ser só a conta e passa a incluir a
                            mudança que estava valendo.
                          </div>
                          <div className="rounded-[18px] border border-[#e4e8ef] bg-white px-[18px] py-4 text-sm leading-[1.55] text-[#667085]">
                            <strong className="mb-1 block text-[#0b0d12]">
                              O ganho real
                            </strong>
                            A investigação pode começar enquanto o padrão ainda
                            está emergindo.
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-[#e8ebf0] px-5 py-4 text-center text-sm leading-[1.6] text-[#707987]">
                        <strong className="text-[#0b0d12]">Com Ohrly:</strong>{" "}
                        a mudança vira o contexto que organiza os sinais e acelera
                        a decisão.
                      </div>
                    </div>

                    <div className="border-t border-[#e8ebf0] bg-[#fbfcfe] px-6 py-5 text-center text-[14px] font-black leading-[1.55] text-[#263142]">
                      Ohrly não muda quem percebe os sinais.{" "}
                      <span className="text-[#3568f5]">
                        Muda quanto tempo a organização leva para relacioná-los ao
                        que fez.
                      </span>
                    </div>
                  </div>

                </div>
              </section>

              {/* PROBLEM */}
              <section
                className="bg-[#10131a] py-[82px] text-white sm:py-[98px]"
                data-analytics-section="problem"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <Eyebrow light>O problema que Ohrly ataca</Eyebrow>
                  <h2 className="mt-4 max-w-[1200px] text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                    Enquanto sua operação espera evidência suficiente,{" "}
                    <span className="text-[#9bb6ff]">
                      a mudança continua afetando clientes.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-[900px] text-[17px] leading-[1.62] text-[#aeb6c4]">
                    O custo de esperar não é apenas analítico. Cada novo cliente
                    exposto aumenta a quantidade de experiência real acontecendo
                    antes de a operação saber se deve manter, ajustar ou
                    investigar.
                  </p>

                  <div className="mt-11 grid gap-3.5 lg:grid-cols-3">
                    <article className="min-h-[220px] rounded-[23px] border border-[#2a303a] bg-[#171b25] p-6">
                      <div className="text-[11px] font-black tracking-[.12em] text-[#737c8b]">
                        01
                      </div>
                      <h3 className="mt-10 text-[20px] font-black tracking-[-0.03em]">
                        A mudança já está rodando
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.58] text-[#aab2bf]">
                        Processos entram em produção antes de existir volume
                        suficiente para um outcome final confiável.
                      </p>
                    </article>

                    <article className="min-h-[220px] rounded-[23px] border border-[#2a303a] bg-[#171b25] p-6">
                      <div className="text-[11px] font-black tracking-[.12em] text-[#737c8b]">
                        02
                      </div>
                      <h3 className="mt-10 text-[20px] font-black tracking-[-0.03em]">
                        O indicador principal pode continuar normal
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.58] text-[#aab2bf]">
                        Um problema novo pode aparecer primeiro na composição, no
                        esforço ou na relação entre áreas.
                      </p>
                    </article>

                    <article className="min-h-[220px] rounded-[23px] border border-[#2a303a] bg-[#171b25] p-6">
                      <div className="text-[11px] font-black tracking-[.12em] text-[#737c8b]">
                        03
                      </div>
                      <h3 className="mt-10 text-[20px] font-black tracking-[-0.03em]">
                        A investigação começa tarde
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.58] text-[#aab2bf]">
                        Quando o problema finalmente ganha nome, dezenas de
                        clientes já podem ter passado pela mesma configuração.
                      </p>
                    </article>
                  </div>

                  <div className="mt-8 rounded-[26px] border border-[#2b3240] bg-[linear-gradient(135deg,#151923,#11151d)] p-7 text-[27px] font-black leading-[1.14] tracking-[-0.045em] sm:text-[38px]">
                    Ohrly encurta o intervalo entre{" "}
                    <span className="text-[#9bb6ff]">
                      “mudamos alguma coisa”
                    </span>{" "}
                    e{" "}
                    <span className="text-[#9bb6ff]">
                      “agora sabemos o que vale investigar”.
                    </span>
                  </div>
                </div>
              </section>

              {/* CHANGE EXAMPLES */}
              <section
                className="py-[82px] sm:py-[98px]"
                data-analytics-section="change_examples"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <Eyebrow>O que pode ser uma mudança?</Eyebrow>
                  <h2 className="mt-4 max-w-[1200px] text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                    Comece por um processo concreto.{" "}
                    <span className="text-[#3568f5]">
                      O núcleo continua o mesmo.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-[900px] text-[17px] leading-[1.62] text-[#667085]">
                    O primeiro piloto deve acompanhar uma mudança real e
                    delimitada. Depois, o mesmo modelo pode ser usado em outras
                    partes da operação sem transformar Ohrly em quatro produtos
                    diferentes.
                  </p>

                  <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                      {
                        icon: "↻",
                        title: "Implantação / Onboarding",
                        text: "Nova jornada, handoff, treinamento, critério de ativação ou modelo por tier.",
                      },
                      {
                        icon: "◎",
                        title: "Segmentação",
                        text: "Mudança de high-touch, low-touch, ICP, tier ou regras de atendimento.",
                      },
                      {
                        icon: "▦",
                        title: "Playbook",
                        text: "Nova cadência, intervenção, ritual, regra de prevenção ou fluxo de recuperação.",
                      },
                      {
                        icon: "AI",
                        title: "Automação / IA",
                        text: "Novo agente, prompt, base de conhecimento, roteamento ou política operacional.",
                      },
                    ].map((item) => (
                      <article
                        key={item.title}
                        className="min-h-[210px] rounded-[22px] border border-[#e5e8ee] bg-white p-6 shadow-[0_14px_34px_rgba(11,13,18,.035)]"
                      >
                        <div className="grid size-10 place-items-center rounded-[13px] bg-[#f0f3fa] text-sm font-black text-[#283247]">
                          {item.icon}
                        </div>
                        <h3 className="mt-7 text-[18px] font-black tracking-[-0.035em]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-[1.55] text-[#6d7582]">
                          {item.text}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* WHO */}
              <section
                id="para-quem"
                className="scroll-mt-24 bg-white py-[82px] sm:py-[98px]"
                data-analytics-section="who_is_it_for"
              >
                <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
                  <div>
                    <Eyebrow>Para quem faz sentido</Eyebrow>
                    <h2 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                      Para operações que já funcionam, {" "}
                      <span className="text-[#3568f5]">e estão mudando.</span>
                    </h2>
                    <p className="mt-5 max-w-[560px] text-[16px] leading-[1.65] text-[#667085]">
                      Ohrly não foi pensado para substituir processo inexistente.
                      Ele faz mais sentido quando existe uma operação estruturada,
                      uma mudança concreta e clientes reais passando por ela.
                    </p>
                  </div>

                  <div className="rounded-[28px] border border-[#e5e8ee] bg-[#f8f9fb] p-7 sm:p-8">
                    <div className="grid gap-5">
                      <div className="flex items-start gap-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-white text-[#3568f5] shadow-[0_8px_20px_rgba(11,13,18,.05)]">
                          <Users size={18} />
                        </div>
                        <div>
                          <strong className="text-[15px]">
                            SaaS B2B com CS/Operações estruturados
                          </strong>
                          <p className="mt-1 text-sm leading-[1.5] text-[#717986]">
                            O time já mede resultados e tem processo suficiente
                            para dizer o que está mudando.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-white text-[#3568f5] shadow-[0_8px_20px_rgba(11,13,18,.05)]">
                          <Clock3 size={18} />
                        </div>
                        <div>
                          <strong className="text-[15px]">
                            Uma mudança real em produção ou prestes a entrar
                          </strong>
                          <p className="mt-1 text-sm leading-[1.5] text-[#717986]">
                            O melhor piloto começa perto do Dia 0, antes de o
                            efeito final estar consolidado.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="grid size-10 shrink-0 place-items-center rounded-[13px] bg-white text-[#3568f5] shadow-[0_8px_20px_rgba(11,13,18,.05)]">
                          <LineChart size={18} />
                        </div>
                        <div>
                          <strong className="text-[15px]">
                            Dados mínimos sobre execução e consequência
                          </strong>
                          <p className="mt-1 text-sm leading-[1.5] text-[#717986]">
                            CRM, produto, suporte, planilha ou warehouse. Não
                            precisamos começar com dez integrações.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* PRODUCT BOUNDARY */}
              <section
                className="py-[70px] sm:py-[86px]"
                data-analytics-section="product_boundary"
              >
                <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-5 rounded-[28px] border border-[#e4e8ee] bg-white p-7 shadow-[0_18px_50px_rgba(11,13,18,.045)] lg:grid-cols-[.9fr_1.1fr] lg:items-center sm:p-9">
                  <div>
                    <div className="text-sm font-black uppercase tracking-[.08em] text-[#3568f5]">
                      O que Ohrly não tenta fazer
                    </div>
                    <h3 className="mt-3 text-[28px] font-black leading-[1.08] tracking-[-0.045em]">
                      Não substitui seu BI. Não substitui o julgamento do CSM.
                    </h3>
                  </div>

                  <div className="grid gap-3">
                    <CheckLine>
                      Seu BI continua medindo os indicadores que sua operação já
                      conhece.
                    </CheckLine>
                    <CheckLine>
                      Seu time continua interpretando contexto e decidindo o que
                      fazer.
                    </CheckLine>
                    <CheckLine>
                      Ohrly preserva a relação entre mudança, contexto, exposição
                      e consequência para antecipar onde vale investigar.
                    </CheckLine>
                  </div>
                </div>
              </section>

              {/* FINAL CTA */}
              <section
                id="piloto"
                className="scroll-mt-24 pb-[96px] pt-[30px] sm:pb-[112px] sm:pt-[44px]"
                data-analytics-section="design_partner"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="grid gap-10 rounded-[36px] bg-[linear-gradient(145deg,#10131a,#1b2231)] p-7 text-white sm:p-10 lg:grid-cols-[1fr_.82fr] lg:items-center lg:p-12">
                    <div>
                      <Eyebrow light>Primeiros design partners</Eyebrow>
                      <h2 className="mt-4 max-w-[680px] text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[53px]">
                        Qual mudança sua operação está prestes a colocar em
                        produção?
                      </h2>
                      <p className="mt-5 max-w-[620px] text-[16px] leading-[1.65] text-[#b8c0cf]">
                        Queremos acompanhar mudanças reais junto a times de CS e
                        Operações: entender o que mudou, quem passou por ela, o
                        que começou a acontecer depois e onde vale investigar
                        antes que o resultado chegue tarde.
                      </p>
                    </div>

                    <div className="rounded-[27px] bg-white p-6 text-[#0b0d12] shadow-[0_22px_65px_rgba(0,0,0,.17)]">
                      <div className="text-[11px] font-black uppercase tracking-[.09em] text-[#7d8591]">
                        Primeiro passo
                      </div>
                      <h3 className="mt-2 text-[25px] font-black leading-[1.1] tracking-[-0.043em]">
                        Conte a mudança. A gente avalia se ela é um bom caso para
                        acompanhar.
                      </h3>
                      <p className="mt-3 text-sm leading-[1.55] text-[#727a87]">
                        A primeira conversa serve para entender o processo, o
                        momento da mudança e os dados disponíveis. Sem compromisso
                        e sem integração obrigatória.
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

                      <p className="mt-4 text-center text-[11px] leading-[1.5] text-[#8b929e]">
                        Sem compromisso. A primeira conversa serve para entender
                        se o caso faz sentido para o piloto.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="border-t border-[#e3e6eb] bg-white py-10">
              <div className="mx-auto flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-5 text-sm text-[#707784] sm:flex-row sm:items-center">
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
                  <span>Protótipo comercial · design partner</span>
                </div>
              </div>
            </footer>
          </div>
        </CommercialIntentProvider>
      </LeadModalProvider>

      <Script id="ohrly-learning-cycle-tabs" strategy="afterInteractive">
        {`
          (() => {
            const root = document.querySelector(
              '[data-analytics-section="learning_cycle_compare_simplified"]'
            );
            if (!root) return;

            const buttons = root.querySelectorAll("[data-cycle-tab]");
            const panels = root.querySelectorAll("[data-cycle-panel]");

            const activeClass =
              "min-h-11 rounded-full bg-white px-4 text-sm font-black text-[#0b0d12] shadow-[0_8px_22px_rgba(11,13,18,.08)] transition";
            const inactiveClass =
              "min-h-11 rounded-full px-4 text-sm font-black text-[#727b89] transition";

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
