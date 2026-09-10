import type { Metadata } from "next";

import Link from "next/link";

import type { ReactNode } from "react";

import {
  AlertTriangle,
  ArrowRight,
  Bot,
  Check,
  GitBranch,
  Layers3,
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
  title: "Ohrly — Saiba o que realmente mudou na sua operação",
  description:
    "Ohrly acompanha cada versão da sua operação, quem passou por ela, o que aconteceu depois e onde começam a surgir custos ou comportamentos que você não esperava.",
  openGraph: {
    title: "Ohrly — Você mudou seu onboarding. Sabe o que realmente melhorou?",
    description:
      "Acompanhe sua próxima mudança operacional enquanto ela roda: versão, exposição, composição, consequência e comportamento emergente.",
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
      className={`inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.08em] ${
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
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-h-[188px] flex-col rounded-[22px] border border-[#e7e9ef] bg-white p-5 shadow-[0_14px_34px_rgba(11,13,18,.035)]">
      <div className="text-[11px] font-black tracking-[.12em] text-[#9298a4]">
        {number}
      </div>
      <h3 className="mt-8 text-[17px] font-black leading-[1.18] tracking-[-0.035em]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-[#697180]">{children}</p>
    </article>
  );
}

function UseCase({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="min-h-[205px] rounded-[22px] border border-[#e7e9ef] bg-white p-6 shadow-[0_14px_34px_rgba(11,13,18,.035)]">
      <div className="grid size-10 place-items-center rounded-[13px] bg-[#f1f4fa] text-[#283247]">
        {icon}
      </div>
      <h3 className="mt-8 text-[18px] font-black tracking-[-0.035em]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.55] text-[#697180]">{children}</p>
    </article>
  );
}

function ComparisonBar({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-[11px] font-semibold text-[#737b8a]">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-2 h-[7px] overflow-hidden rounded-full bg-[#edf0f5]">
        <div
          className="h-full rounded-full bg-[#1b2130]"
          style={{ width }}
        />
      </div>
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
          <div className="min-h-screen bg-[#f7f8fb] text-[#0b0d12]">
            <header className="sticky top-0 z-40 border-b border-[#e7e9ef]/80 bg-[#f7f8fb]/90 backdrop-blur-xl">
              <div className="mx-auto flex h-[72px] w-[min(1180px,calc(100%_-_40px))] items-center justify-between gap-6">
                <a
                  href="#top"
                  aria-label="Ohrly"
                  data-analytics-cta="nav_logo"
                  data-analytics-location="navigation"
                >
                  <Brand />
                </a>

                <nav className="hidden items-center gap-7 text-sm font-bold text-[#525967] lg:flex">
                  <a
                    href="#como-funciona"
                    data-analytics-cta="nav_how"
                    data-analytics-location="navigation"
                  >
                    Como funciona
                  </a>
                  <a
                    href="#exemplo"
                    data-analytics-cta="nav_example"
                    data-analytics-location="navigation"
                  >
                    Exemplo
                  </a>
                  <a
                    href="#aplicacoes"
                    data-analytics-cta="nav_use_cases"
                    data-analytics-location="navigation"
                  >
                    Aplicações
                  </a>
                </nav>

                <CommercialIntentTrigger
                  ctaId="nav_next_change"
                  location="navigation"
                  label="Acompanhar minha próxima mudança"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 text-sm font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                >
                  Acompanhar mudança
                </CommercialIntentTrigger>
              </div>
            </header>

            <main id="top">
              {/* HERO */}
              <section
                className="relative overflow-hidden py-[72px] sm:py-[96px] lg:py-[112px]"
                data-analytics-section="hero"
              >
                <div className="pointer-events-none absolute right-[-220px] top-[-280px] size-[760px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.10),rgba(53,104,245,0)_68%)]" />
                <div className="pointer-events-none absolute bottom-[-250px] left-[-180px] size-[620px] rounded-full bg-[radial-gradient(circle,rgba(58,179,126,.07),rgba(58,179,126,0)_68%)]" />

                <div className="relative mx-auto grid w-[min(1180px,calc(100%_-_40px))] items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#e1e5eb] bg-white/85 px-3 py-2 text-[12px] font-bold text-[#596270] shadow-[0_8px_24px_rgba(11,13,18,.04)] backdrop-blur">
                      <span className="size-[7px] rounded-full bg-[#39b878] shadow-[0_0_0_5px_rgba(57,184,120,.10)]" />
                      Onboarding v5 · Em produção
                    </div>

                    <h1 className="mt-6 max-w-[760px] text-[48px] font-black leading-[.98] tracking-[-0.062em] sm:text-[62px] lg:text-[72px]">
                      Você mudou seu onboarding.{" "}
                      <span className="text-[#3568f5]">
                        Sabe o que realmente melhorou?
                      </span>
                    </h1>

                    <p className="mt-7 max-w-[680px] text-[18px] leading-[1.58] text-[#596170] sm:text-[20px]">
                      Ohrly acompanha cada versão da sua operação, quem passou por
                      ela, o que aconteceu depois e onde começam a surgir custos
                      ou comportamentos que você não esperava.
                    </p>

                    <div className="mt-9 flex flex-wrap gap-3">
                      <CommercialIntentTrigger
                        ctaId="hero_next_change"
                        location="hero"
                        label="Quero acompanhar minha próxima mudança"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                      >
                        Quero acompanhar minha próxima mudança
                        <ArrowRight size={16} />
                      </CommercialIntentTrigger>

                      <a
                        href="#exemplo"
                        data-analytics-cta="hero_example"
                        data-analytics-location="hero"
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e0e4ea] bg-white px-5 font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                      >
                        Ver como funciona
                      </a>
                    </div>

                    <p className="mt-5 text-[13px] font-medium text-[#858b96]">
                      Feito para SaaS B2B com operação de CS/Onboarding já
                      estruturada.
                    </p>
                  </div>

                  {/* PRODUCT MOCK */}
                  <div className="relative">
                    <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[30px] bg-[#e9ecf3]" />

                    <div className="relative overflow-hidden rounded-[28px] border border-[#e2e5eb] bg-white shadow-[0_28px_80px_rgba(11,13,18,.10)]">
                      <div className="flex items-start justify-between gap-5 border-b border-[#eaedf2] px-5 py-5 sm:px-6">
                        <div>
                          <div className="text-[15px] font-black tracking-[-0.03em]">
                            Onboarding · Enterprise
                          </div>
                          <div className="mt-1 text-[12px] font-medium text-[#7b8390]">
                            Mudança operacional em acompanhamento
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-[#eaf8f1] px-3 py-2 text-[12px] font-black text-[#16824a]">
                          <span className="size-[7px] rounded-full bg-[#39b878]" />
                          v5 ativa
                        </span>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-[10px] border border-[#e3e7ee] bg-[#f7f8fa] px-3 py-2 text-[12px] font-black text-[#7a818e]">
                            v4
                          </span>
                          <span className="rounded-[10px] border border-[#0b0d12] bg-[#0b0d12] px-3 py-2 text-[12px] font-black text-white">
                            v5
                          </span>
                        </div>

                        <div className="mt-4 rounded-[16px] border border-[#e6e9ef] bg-[#f6f7f9] p-4">
                          <div className="text-[10px] font-black uppercase tracking-[.09em] text-[#858d9a]">
                            O que mudou na v5
                          </div>
                          <div className="mt-2 text-[13px] font-bold leading-[1.5] text-[#303744]">
                            + segmentação por tier · + treinamento técnico · saída
                            por ativação
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                          <div className="rounded-[16px] border border-[#e6e9ef] bg-white p-4">
                            <div className="text-[11px] font-semibold text-[#777f8c]">
                              Ativação
                            </div>
                            <div className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#16824a]">
                              +13%
                            </div>
                            <div className="mt-1 text-[11px] font-bold text-[#29925b]">
                              melhor que v4
                            </div>
                          </div>

                          <div className="rounded-[16px] border border-[#e6e9ef] bg-white p-4">
                            <div className="text-[11px] font-semibold text-[#777f8c]">
                              Time-to-value
                            </div>
                            <div className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#16824a]">
                              -18%
                            </div>
                            <div className="mt-1 text-[11px] font-bold text-[#29925b]">
                              melhor que v4
                            </div>
                          </div>

                          <div className="rounded-[16px] border border-[#f2d1d1] bg-[#fff8f8] p-4">
                            <div className="text-[11px] font-semibold text-[#8d6767]">
                              Esforço de suporte
                            </div>
                            <div className="mt-2 text-[26px] font-black tracking-[-0.04em] text-[#c33f3f]">
                              +31%
                            </div>
                            <div className="mt-1 text-[11px] font-bold text-[#c95050]">
                              mudança inesperada
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-[34px_1fr] gap-3 rounded-[16px] border border-[#efdba8] bg-[#fff7e3] p-4">
                          <div className="grid size-[34px] place-items-center rounded-[11px] bg-[#fff0c5] text-[#a2690a]">
                            <AlertTriangle size={17} />
                          </div>
                          <div>
                            <strong className="block text-[13px] text-[#5d461f]">
                              Comportamento emergente
                            </strong>
                            <span className="mt-1 block text-[12px] leading-[1.48] text-[#7b684a]">
                              Clientes Enterprise estão exigindo mais suporte nas
                              2 primeiras semanas, apesar da ativação ter
                              melhorado.
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-[#edf0f4] pt-4">
                          <span className="text-[11px] font-bold text-[#7a8290]">
                            42 clientes expostos
                          </span>
                          <span className="text-[#c8ccd4]">·</span>
                          <span className="text-[11px] font-bold text-[#7a8290]">
                            18 comparáveis à v4
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BI VS OHRLY */}
              <section
                className="py-[72px] sm:py-[92px]"
                data-analytics-section="known_vs_emerging"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="grid gap-8 rounded-[34px] bg-[#10131a] p-7 text-white sm:p-10 lg:grid-cols-[.95fr_1.05fr] lg:p-12">
                    <div>
                      <Eyebrow light>Quando o problema já tem nome</Eyebrow>
                      <h2 className="mt-4 max-w-[540px] text-[36px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[48px]">
                        Seu BI mede muito bem aquilo que sua operação já aprendeu
                        a procurar.
                      </h2>
                      <p className="mt-5 max-w-[540px] text-[15px] leading-[1.65] text-[#aeb6c6]">
                        CAC, churn, NPS, CSAT, ativação, tickets, LTV. Quando a
                        pergunta está clara, o seu stack normalmente consegue
                        respondê-la.
                      </p>
                    </div>

                    <div className="rounded-[26px] border border-[#2b3140] bg-[#181c27] p-5 sm:p-6">
                      <div className="text-[11px] font-black uppercase tracking-[.1em] text-[#818a9b]">
                        O intervalo que Ohrly observa
                      </div>

                      <div className="mt-5 grid gap-3">
                        {[
                          [
                            "O comportamento começou a mudar",
                            'Mas nenhum indicador isolado parece "errado".',
                          ],
                          [
                            "A mudança persiste em uma composição específica",
                            "Um tier, perfil ou jornada passa a se comportar diferente.",
                          ],
                          [
                            "Ainda não existe uma regra para procurar aquilo",
                            "É cedo demais para virar um dashboard, mas tarde demais para ignorar.",
                          ],
                        ].map(([title, description]) => (
                          <div
                            key={title}
                            className="flex gap-3 rounded-[16px] bg-[#121620] p-4"
                          >
                            <span className="mt-[7px] size-[8px] shrink-0 rounded-full bg-[#7f8cff]" />
                            <div>
                              <strong className="block text-[13px]">
                                {title}
                              </strong>
                              <span className="mt-1 block text-[12px] leading-[1.45] text-[#8f98aa]">
                                {description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* HOW */}
              <section
                id="como-funciona"
                className="scroll-mt-24 py-[76px] sm:py-[98px]"
                data-analytics-section="how_it_works"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="max-w-[800px]">
                    <Eyebrow>Como funciona</Eyebrow>
                    <h2 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                      Uma mudança. Uma versão. Consequências reais.
                    </h2>
                    <p className="mt-4 max-w-[700px] text-[17px] leading-[1.6] text-[#667085]">
                      Ohrly não tenta substituir CRM, BI ou seus playbooks. Ele
                      conecta a mudança operacional ao comportamento que veio
                      depois.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                    <ChangeStep number="01" title="Registre a mudança">
                      O que mudou, quando, por quê e qual resultado você esperava.
                    </ChangeStep>
                    <ChangeStep number="02" title="Crie a nova versão">
                      Onboarding, tier, playbook, ICP, automação ou outro processo
                      em evolução.
                    </ChangeStep>
                    <ChangeStep number="03" title="Saiba quem foi exposto">
                      Separe os clientes que viveram cada configuração.
                    </ChangeStep>
                    <ChangeStep number="04" title="Observe o resultado">
                      Ativação, esforço, suporte, engajamento e outros outcomes
                      relevantes.
                    </ChangeStep>
                    <ChangeStep number="05" title="Encontre o inesperado">
                      Veja onde a nova versão começou a mudar algo que você não
                      estava procurando.
                    </ChangeStep>
                    <ChangeStep number="06" title="Construa a próxima versão">
                      Use sua própria história operacional como evidência para
                      decidir o que mudar depois.
                    </ChangeStep>
                  </div>
                </div>
              </section>

              {/* EXAMPLE */}
              <section
                id="exemplo"
                className="scroll-mt-24 bg-white py-[76px] sm:py-[100px]"
                data-analytics-section="version_comparison"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="max-w-[900px]">
                    <Eyebrow>Exemplo</Eyebrow>
                    <h2 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                      A mudança melhorou o que você queria.{" "}
                      <span className="text-[#3568f5]">
                        Mas alguma coisa nova começou a aparecer.
                      </span>
                    </h2>
                  </div>

                  <div className="mt-12 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
                    <div className="rounded-[28px] border border-[#e6e9ef] bg-[#fbfcfe] p-6 sm:p-7">
                      <h3 className="text-[25px] font-black tracking-[-0.04em]">
                        Histórico da mudança
                      </h3>

                      <div className="mt-7 grid gap-0">
                        {[
                          [
                            "v4",
                            "03 AGO",
                            "Onboarding anterior",
                            "Mesma jornada para Mid-Market e Enterprise.",
                          ],
                          [
                            "↗",
                            "12 SET",
                            "Hipótese de melhoria",
                            "Reduzir churn precoce com segmentação por tier.",
                          ],
                          [
                            "v5",
                            "HOJE",
                            "Nova versão em execução",
                            "Treinamento extra e critério de saída por ativação.",
                          ],
                          [
                            "!",
                            "EMERGENTE",
                            "Mais esforço no Enterprise",
                            "Suporte cresce antes de qualquer impacto claro em CSAT ou churn.",
                          ],
                        ].map(([icon, date, title, description], index) => (
                          <div
                            key={title}
                            className="relative grid grid-cols-[36px_1fr] gap-3 pb-6 last:pb-0"
                          >
                            {index < 3 ? (
                              <div className="absolute bottom-0 left-[17px] top-[34px] w-px bg-[#dde2ea]" />
                            ) : null}
                            <div className="relative z-10 grid size-[34px] place-items-center rounded-[10px] border border-[#dfe3ea] bg-white text-[11px] font-black">
                              {icon}
                            </div>
                            <div>
                              <div className="text-[10px] font-black uppercase tracking-[.08em] text-[#959ca8]">
                                {date}
                              </div>
                              <strong className="mt-1 block text-[13px]">
                                {title}
                              </strong>
                              <p className="mt-1 text-[12px] leading-[1.48] text-[#6d7582]">
                                {description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-[#e6e9ef] bg-[#fbfcfe] p-6 sm:p-7">
                      <h3 className="text-[25px] font-black tracking-[-0.04em]">
                        v4 vs. v5 por composição
                      </h3>

                      <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        <article className="rounded-[20px] border border-[#e1e5eb] bg-white p-5">
                          <div className="text-[11px] font-bold text-[#7e8591]">
                            Mid-Market
                          </div>
                          <strong className="mt-1 block text-[14px] leading-[1.4]">
                            v5 melhora sem aumentar esforço
                          </strong>
                          <div className="mt-5 grid gap-4">
                            <ComparisonBar
                              label="Ativação"
                              value="+13%"
                              width="76%"
                            />
                            <ComparisonBar
                              label="Suporte"
                              value="+2%"
                              width="31%"
                            />
                          </div>
                        </article>

                        <article className="rounded-[20px] border border-[#ccd7ff] bg-[#f7f9ff] p-5">
                          <div className="text-[11px] font-bold text-[#6d78a0]">
                            Enterprise
                          </div>
                          <strong className="mt-1 block text-[14px] leading-[1.4]">
                            v5 melhora ativação, mas desloca custo
                          </strong>
                          <div className="mt-5 grid gap-4">
                            <ComparisonBar
                              label="Ativação"
                              value="+8%"
                              width="65%"
                            />
                            <ComparisonBar
                              label="Suporte"
                              value="+31%"
                              width="88%"
                            />
                          </div>
                        </article>
                      </div>

                      <div className="mt-5 rounded-[18px] border border-[#e4e7ed] bg-white p-5 text-[14px] leading-[1.55] text-[#525a69]">
                        <strong className="text-[#0b0d12]">
                          Ohrly não conclui causa.
                        </strong>{" "}
                        Ele mostra onde a realidade deixou de se comportar como
                        você esperava — cedo o suficiente para investigar.
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* USE CASES */}
              <section
                id="aplicacoes"
                className="scroll-mt-24 py-[76px] sm:py-[98px]"
                data-analytics-section="use_cases"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="max-w-[830px]">
                    <Eyebrow>Mesmo motor, diferentes portas de entrada</Eyebrow>
                    <h2 className="mt-4 text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[54px]">
                      Comece por um processo. Expanda quando fizer sentido.
                    </h2>
                    <p className="mt-4 max-w-[720px] text-[17px] leading-[1.6] text-[#667085]">
                      O MVP começa com uma mudança concreta e pode crescer para
                      outros processos sem trocar o núcleo do produto.
                    </p>
                  </div>

                  <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <UseCase icon={<GitBranch size={19} />} title="Onboarding">
                      Qual versão reduz churn precoce sem deslocar custo para CS
                      ou Suporte?
                    </UseCase>
                    <UseCase icon={<Users size={19} />} title="Segmentação">
                      High touch realmente compensa para quais perfis e em quais
                      condições?
                    </UseCase>
                    <UseCase icon={<Bot size={19} />} title="AI Support">
                      Uma nova versão do agente reduziu trabalho ou só mudou onde
                      ele reaparece?
                    </UseCase>
                    <UseCase icon={<Layers3 size={19} />} title="ICP / Revenue">
                      Quais perfis parecem bons na aquisição mas criam custo
                      invisível depois?
                    </UseCase>
                  </div>
                </div>
              </section>

              {/* DESIGN PARTNER */}
              <section
                id="piloto"
                className="scroll-mt-24 pb-[90px] pt-[54px] sm:pb-[110px]"
                data-analytics-section="design_partner"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="grid gap-9 rounded-[36px] bg-[linear-gradient(145deg,#10131a,#1a2130)] p-7 text-white sm:p-10 lg:grid-cols-[1fr_.82fr] lg:items-center lg:p-12">
                    <div>
                      <Eyebrow light>Design partners</Eyebrow>
                      <h2 className="mt-4 max-w-[650px] text-[40px] font-black leading-[1.02] tracking-[-0.055em] sm:text-[52px]">
                        Vai mudar seu onboarding nas próximas semanas?
                      </h2>
                      <p className="mt-5 max-w-[630px] text-[16px] leading-[1.65] text-[#b7c0d0]">
                        Estamos selecionando operações SaaS B2B que estejam
                        reformulando onboarding, segmentação, playbooks,
                        atendimento ou automações para acompanhar a próxima
                        versão com dados reais.
                      </p>

                      <div className="mt-7 grid gap-3">
                        {[
                          "SaaS B2B com operação de CS/Onboarding estruturada.",
                          "Uma mudança real prevista para as próximas semanas.",
                          "Dados mínimos de CRM, produto, suporte ou planilha.",
                        ].map((item) => (
                          <div
                            key={item}
                            className="flex items-start gap-3 text-[13px] leading-[1.55] text-[#d0d7e3]"
                          >
                            <span className="mt-[1px] grid size-[20px] shrink-0 place-items-center rounded-full bg-[#243044] text-[#a9c0ff]">
                              <Check size={12} />
                            </span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[26px] bg-white p-6 text-[#0b0d12] shadow-[0_20px_60px_rgba(0,0,0,.16)]">
                      <div className="flex items-center gap-3">
                        <div className="grid size-11 place-items-center rounded-[14px] bg-[#eef3ff] text-[#3568f5]">
                          <LineChart size={20} />
                        </div>
                        <div>
                          <div className="text-[18px] font-black tracking-[-0.035em]">
                            Acompanhe uma mudança real
                          </div>
                          <div className="mt-1 text-[12px] text-[#747c89]">
                            Primeiro entendemos se o caso é bom para o piloto.
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 rounded-[18px] border border-[#e6e9ef] bg-[#f7f8fa] p-4">
                        <div className="text-[11px] font-black uppercase tracking-[.08em] text-[#7f8795]">
                          O que queremos observar
                        </div>
                        <div className="mt-3 grid gap-2.5 text-[13px] leading-[1.5] text-[#4f5663]">
                          <div className="flex items-start gap-2.5">
                            <Check className="mt-[2px] shrink-0 text-[#258c59]" size={15} />
                            <span>Quem passou pela versão anterior e pela nova.</span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Check className="mt-[2px] shrink-0 text-[#258c59]" size={15} />
                            <span>O que melhorou ou piorou por composição.</span>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <Check className="mt-[2px] shrink-0 text-[#258c59]" size={15} />
                            <span>O que começou a acontecer que ninguém estava procurando.</span>
                          </div>
                        </div>
                      </div>

                      <CommercialIntentTrigger
                        ctaId="design_partner_next_change"
                        location="design_partner"
                        label="Quero acompanhar minha próxima mudança"
                        className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                      >
                        Quero acompanhar minha próxima mudança
                        <ArrowRight size={16} />
                      </CommercialIntentTrigger>

                      <p className="mt-4 text-center text-[11px] leading-[1.5] text-[#8a919d]">
                        Sem compromisso. A primeira conversa serve para entender
                        a mudança, o momento e os dados disponíveis.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="border-t border-[#e2e5eb] bg-white py-10 sm:py-[42px]">
              <div className="mx-auto flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-5 text-[13px] text-[#707784] sm:flex-row sm:items-center">
                <Brand />

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href="/referrals"
                    className="font-bold text-[#596270] hover:text-[#0b0d12]"
                    data-analytics-cta="footer_referral"
                    data-analytics-location="footer"
                  >
                    Programa de indicação
                  </Link>
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
    </>
  );
}
