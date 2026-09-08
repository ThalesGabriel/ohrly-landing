import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check } from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadModalProvider } from "@/components/lead-form-modal";
import {
  CommercialIntentProvider,
  CommercialIntentTrigger,
} from "@/components/commercial-intent-modal";

export const metadata: Metadata = {
  title: "Ohrly — Mudanças de comportamento em decisões de receita",
  description:
    "O Ohrly transforma mudanças no comportamento dos seus clientes em decisões de crescimento e retenção de receita.",
  openGraph: {
    title: "Ohrly — Seu cliente mudou. Sua receita ainda não contou.",
    description:
      "Entenda quando a relação com cada cliente mudou o suficiente para revisar crescimento, retenção ou estratégia.",
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

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[16px] border border-[#eceef2] bg-[#f7f8fa] p-4">
      <div className="text-[11px] font-bold uppercase tracking-[.07em] text-[#7a818e]">
        {label}
      </div>
      <div className="mt-1.5 text-[22px] font-black tracking-[-0.04em] text-[#0b0d12]">
        {value}
      </div>
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-[10px] border border-[#e8eaf0] bg-[#f4f5f8] px-2.5 py-2 text-[12px] font-bold text-[#535a66]">
      {children}
    </span>
  );
}

function DecisionCard({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="flex min-h-[255px] flex-col justify-between rounded-[22px] border border-[#e7e9ef] bg-white p-7">
      <div>
        <span className="inline-flex rounded-full border border-[#e7e9ef] px-2.5 py-1.5 text-[12px] font-extrabold text-[#6c7380]">
          {tag}
        </span>
        <h3 className="mt-8 text-[28px] font-black leading-[1.08] tracking-[-0.045em] text-[#0b0d12]">
          {title}
        </h3>
      </div>
      <p className="mt-5 text-[14px] leading-[1.6] text-[#667085]">
        {children}
      </p>
    </article>
  );
}

function ReviewCase({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[44px_1fr] gap-[14px] rounded-[18px] bg-[#f6f8fc] p-4">
      <div className="grid size-[38px] place-items-center rounded-full bg-[#0b0d12] text-xs font-black text-white">
        {number}
      </div>
      <div>
        <strong className="block text-[15px] text-[#0b0d12]">{title}</strong>
        <span className="mt-1 block text-[13px] leading-[1.48] text-[#667085]">
          {children}
        </span>
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
          <div className="min-h-screen bg-white text-[#0b0d12]">
            <header className="sticky top-0 z-40 border-b border-[#e7e9ef]/80 bg-white/90 backdrop-blur-xl">
              <div className="mx-auto flex h-[74px] w-[min(1180px,calc(100%_-_40px))] items-center justify-between gap-6">
                <a
                  href="#top"
                  aria-label="Ohrly"
                  data-analytics-cta="nav_logo"
                  data-analytics-location="navigation"
                >
                  <Brand />
                </a>

                <nav className="hidden items-center gap-6 text-sm font-bold text-[#303640] lg:flex">
                  <a
                    href="#exemplo"
                    data-analytics-cta="nav_example"
                    data-analytics-location="navigation"
                  >
                    Exemplo
                  </a>
                  <a
                    href="#como-funciona"
                    data-analytics-cta="nav_how"
                    data-analytics-location="navigation"
                  >
                    Como funciona
                  </a>
                  <a
                    href="#decisoes"
                    data-analytics-cta="nav_decisions"
                    data-analytics-location="navigation"
                  >
                    Decisões
                  </a>
                  <Link
                    href="/demo"
                    data-analytics-cta="nav_demo"
                    data-analytics-location="navigation"
                  >
                    Demo
                  </Link>
                </nav>

                <a
                  href="#piloto"
                  data-analytics-cta="nav_pilot"
                  data-analytics-location="navigation"
                  data-analytics-label="Analisar minha base"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 text-sm font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                >
                  Analisar minha base
                </a>
              </div>
            </header>

            <main id="top">
              {/* HERO */}
              <section
                className="relative overflow-hidden py-[78px] sm:py-[108px] lg:py-[126px]"
                data-analytics-section="hero"
              >
                <div className="pointer-events-none absolute left-1/2 top-[-280px] size-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.12),rgba(53,104,245,0)_68%)]" />

                <div className="relative mx-auto w-[min(1050px,calc(100%_-_40px))] text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#e7e9ef] bg-white/80 px-3 py-2 text-[12px] font-bold text-[#596270] shadow-[0_8px_24px_rgba(11,13,18,.05)] backdrop-blur">
                    <span className="size-[7px] rounded-full bg-[#3568f5] shadow-[0_0_0_5px_rgba(53,104,245,.10)]" />
                    Inteligência de mudança na relação com clientes
                  </div>

                  <h1 className="mx-auto mt-6 max-w-[1000px] text-[48px] font-black leading-[.98] tracking-[-0.062em] sm:text-[64px] lg:text-[82px]">
                    A receita é o último lugar onde você deveria descobrir que seu
                    cliente mudou.
                  </h1>

                  <p className="mx-auto mt-7 max-w-[790px] text-[18px] leading-[1.55] text-[#525967] sm:text-[21px]">
                    O Ohrly transforma mudanças no comportamento dos seus clientes em
                    decisões de{" "}
                    <strong className="font-black text-[#0b0d12]">crescimento</strong>{" "}
                    e{" "}
                    <strong className="font-black text-[#0b0d12]">
                      retenção de receita
                    </strong>
                    .
                  </p>

                  <div className="mt-9 flex flex-wrap justify-center gap-3">
                    <a
                      href="#piloto"
                      data-analytics-cta="hero_analyze_base"
                      data-analytics-location="hero"
                      data-analytics-label="Descobrir oportunidades na minha base"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                    >
                      Descobrir oportunidades na minha base
                      <ArrowRight size={16} />
                    </a>

                    <Link
                      href="/demo"
                      data-analytics-cta="hero_demo"
                      data-analytics-location="hero"
                      data-analytics-label="Ver como funciona"
                      className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e7e9ef] bg-white px-5 font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                    >
                      Ver como funciona
                    </Link>
                  </div>

                  <p className="mt-5 text-[13px] font-medium text-[#858b96]">
                    Cada cliente é comparado primeiro com a própria história.
                  </p>
                </div>
              </section>

              {/* EXAMPLE / SAME SNAPSHOT, DIFFERENT STORIES */}
              <section
                id="exemplo"
                className="relative scroll-mt-24 overflow-hidden bg-[#f8faff] py-[78px] sm:py-[104px]"
                data-analytics-section="same_snapshot_different_stories"
              >
                {/* ambient background */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-[-180px] top-[-80px] size-[420px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.10),rgba(53,104,245,0)_68%)]" />
                  <div className="absolute right-[-140px] top-[-80px] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.09),rgba(53,104,245,0)_68%)]" />
                  <div className="absolute bottom-[-230px] left-[7%] h-[420px] w-[620px] rotate-[-7deg] rounded-[50%] border border-[#dfe7ff]" />
                  <div className="absolute right-[-250px] top-[170px] h-[520px] w-[760px] rotate-[-11deg] rounded-[50%] border border-[#dfe7ff]" />
                </div>

                <div className="relative mx-auto w-[min(1280px,calc(100%_-_40px))]">
                  {/* heading */}
                  <div className="mx-auto max-w-[920px] text-center">
                    <div className="text-[12px] font-extrabold uppercase tracking-[.16em] text-[#3568f5]">
                      Mesmo estado atual
                    </div>

                    <h2 className="mt-3 text-[40px] font-black leading-[.98] tracking-[-0.055em] text-[#111a35] sm:text-[54px] lg:text-[68px]">
                      Mesmo estado atual.
                      <span className="block text-[#3568f5]">Histórias diferentes.</span>
                    </h2>
                  </div>

                  {/* desktop composition */}
                  <div className="relative mt-12 lg:mt-14">
                    {/* left editorial note */}
                    <div className="absolute left-0 top-[120px] hidden w-[175px] xl:block">
                      <div className="-rotate-3 font-serif text-[31px] italic leading-[1.08] text-[#3568f5]">
                        Mesmo
                        <br />
                        estado hoje.
                      </div>

                      <svg
                        className="ml-12 mt-4 h-[80px] w-[120px]"
                        viewBox="0 0 120 80"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M8 8c15 49 45 58 93 49"
                          stroke="#3568f5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="m91 47 13 10-11 12"
                          stroke="#3568f5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p className="mt-2 text-[16px] font-medium leading-[1.45] text-[#68708a]">
                        40 usuários.
                        <br />
                        Receita estável.
                        <br />
                        Uso em 40.
                      </p>
                    </div>

                    {/* right editorial note */}
                    <div className="absolute right-0 top-[120px] hidden w-[190px] text-right xl:block">
                      <div className="rotate-3 font-serif text-[31px] italic leading-[1.08] text-[#3568f5]">
                        Histórias
                        <br />
                        diferentes.
                      </div>

                      <svg
                        className="ml-auto mr-10 mt-4 h-[80px] w-[120px]"
                        viewBox="0 0 120 80"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M112 8c-15 49-45 58-93 49"
                          stroke="#3568f5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M29 47 16 57l11 12"
                          stroke="#3568f5"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <p className="mt-2 text-[16px] font-medium leading-[1.45] text-[#68708a]">
                        Os sinais revelam
                        <br />
                        o que vem pela frente.
                      </p>
                    </div>

                    {/* account cards */}
                    <div className="mx-auto grid max-w-[900px] gap-6 lg:grid-cols-2">
                      {/* ACCOUNT A */}
                      <article className="overflow-hidden rounded-[28px] border border-[#e2e7f2] bg-white shadow-[0_24px_70px_rgba(44,64,105,.12)]">
                        <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-4">
                              <div className="grid size-[58px] shrink-0 place-items-center rounded-[17px] bg-[#eef3ff] text-[#3568f5]">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="size-7"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  aria-hidden="true"
                                >
                                  <path d="M5 21V6l6-3v18M11 9h8v12M3 21h18" />
                                  <path d="M8 8h1M8 12h1M8 16h1M14 12h1M14 16h1" />
                                </svg>
                              </div>

                              <div className="min-w-0">
                                <h3 className="truncate text-[21px] font-black tracking-[-0.04em] text-[#111a35]">
                                  TechNova
                                </h3>
                                <div className="mt-0.5 text-[13px] font-semibold text-[#737c94]">
                                  SaaS · Tecnologia
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3 py-2 text-[13px] font-extrabold text-[#3568f5]">
                              <svg
                                viewBox="0 0 24 24"
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              40 usuários ativos
                            </span>
                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#edf0f5] pt-4">
                            <div className="flex items-center gap-3">
                              <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f5f7fb] text-[20px] font-black text-[#44506a]">
                                $
                              </div>
                              <div>
                                <div className="text-[11px] font-semibold text-[#80889b]">
                                  Receita atual:
                                </div>
                                <strong className="mt-0.5 block text-[15px] text-[#111a35]">
                                  estável
                                </strong>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 border-l border-[#edf0f5] pl-4">
                              <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f5f7fb] text-[#44506a]">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="size-5"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <rect x="3" y="14" width="4" height="7" rx="1" />
                                  <rect x="10" y="9" width="4" height="12" rx="1" />
                                  <rect x="17" y="4" width="4" height="17" rx="1" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-[11px] font-semibold text-[#80889b]">
                                  Uso atual:
                                </div>
                                <strong className="mt-0.5 block text-[15px] text-[#111a35]">
                                  40
                                </strong>
                              </div>
                            </div>
                          </div>

                          <div className="mt-5">
                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="rounded-full bg-[#eaf8ef] px-3 py-2 text-[12px] font-extrabold text-[#18864b]">
                                + nova área
                              </span>
                              <span className="rounded-full bg-[#eaf8ef] px-3 py-2 text-[12px] font-extrabold text-[#18864b]">
                                + stakeholders
                              </span>
                              <span className="rounded-full bg-[#eaf8ef] px-3 py-2 text-[12px] font-extrabold text-[#18864b]">
                                + novo caso de uso
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mx-5 mb-5 rounded-[18px] border border-[#dfe7ff] bg-[linear-gradient(135deg,#eef3ff,#f7f9ff)] p-4 sm:mx-6 sm:mb-6">
                          <div className="flex items-start gap-3">
                            <div className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[#3568f5] text-white shadow-[0_8px_22px_rgba(53,104,245,.22)]">
                              <svg
                                viewBox="0 0 24 24"
                                className="size-6"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <rect x="3" y="14" width="4" height="7" rx="1" />
                                <rect x="10" y="9" width="4" height="12" rx="1" />
                                <rect x="17" y="4" width="4" height="17" rx="1" />
                              </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                              <strong className="block text-[15px] leading-[1.35] text-[#111a35]">
                                Em evolução positiva.
                              </strong>
                              <p className="mt-1 text-[13px] leading-[1.5] text-[#52607c]">
                                Pode ser um bom momento para considerar uma expansão.
                              </p>
                            </div>
                          </div>
                        </div>
                      </article>

                      {/* ACCOUNT B */}
                      <article className="overflow-hidden rounded-[28px] border border-[#e2e7f2] bg-white shadow-[0_24px_70px_rgba(44,64,105,.12)]">
                        <div className="p-5 sm:p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex min-w-0 items-center gap-4">
                              <div className="grid size-[58px] shrink-0 place-items-center rounded-[17px] bg-[#eef3ff] text-[#3568f5]">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="size-7"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="1.8"
                                  aria-hidden="true"
                                >
                                  <path d="M5 21V6l6-3v18M11 9h8v12M3 21h18" />
                                  <path d="M8 8h1M8 12h1M8 16h1M14 12h1M14 16h1" />
                                </svg>
                              </div>

                              <div className="min-w-0">
                                <h3 className="truncate text-[21px] font-black tracking-[-0.04em] text-[#111a35]">
                                  AlphaCorp
                                </h3>
                                <div className="mt-0.5 text-[13px] font-semibold text-[#737c94]">
                                  Serviços · B2B
                                </div>
                              </div>
                            </div>

                          </div>

                          <div className="mt-5">
                            <span className="inline-flex items-center gap-2 rounded-full bg-[#eef3ff] px-3 py-2 text-[13px] font-extrabold text-[#3568f5]">
                              <svg
                                viewBox="0 0 24 24"
                                className="size-4"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                              >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                              </svg>
                              40 usuários ativos
                            </span>
                          </div>

                          <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#edf0f5] pt-4">
                            <div className="flex items-center gap-3">
                              <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f5f7fb] text-[20px] font-black text-[#44506a]">
                                $
                              </div>
                              <div>
                                <div className="text-[11px] font-semibold text-[#80889b]">
                                  Receita atual:
                                </div>
                                <strong className="mt-0.5 block text-[15px] text-[#111a35]">
                                  estável
                                </strong>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 border-l border-[#edf0f5] pl-4">
                              <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#f5f7fb] text-[#44506a]">
                                <svg
                                  viewBox="0 0 24 24"
                                  className="size-5"
                                  fill="currentColor"
                                  aria-hidden="true"
                                >
                                  <rect x="3" y="14" width="4" height="7" rx="1" />
                                  <rect x="10" y="9" width="4" height="12" rx="1" />
                                  <rect x="17" y="4" width="4" height="17" rx="1" />
                                </svg>
                              </div>
                              <div>
                                <div className="text-[11px] font-semibold text-[#80889b]">
                                  Uso atual:
                                </div>
                                <strong className="mt-0.5 block text-[15px] text-[#111a35]">
                                  40
                                </strong>
                              </div>
                            </div>
                          </div>


                          <div className="mt-5">

                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="rounded-full bg-[#fff0f0] px-3 py-2 text-[12px] font-extrabold text-[#b73535]">
                                − champion saiu
                              </span>
                              <span className="rounded-full bg-[#fff0f0] px-3 py-2 text-[12px] font-extrabold text-[#b73535]">
                                − respostas ↓
                              </span>
                              <span className="rounded-full bg-[#fff0f0] px-3 py-2 text-[12px] font-extrabold text-[#b73535]">
                                − decisor distante
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mx-5 mb-5 rounded-[18px] border border-[#ffdede] bg-[linear-gradient(135deg,#fff1f1,#fff8f8)] p-4 sm:mx-6 sm:mb-6">
                          <div className="flex items-start gap-3">
                            <div className="grid size-11 shrink-0 place-items-center rounded-[13px] bg-[#d84a4a] text-white shadow-[0_8px_22px_rgba(216,74,74,.18)]">
                              <svg
                                viewBox="0 0 24 24"
                                className="size-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                aria-hidden="true"
                              >
                                <path d="M12 9v4M12 17h.01" />
                                <path d="M10.3 3.9 2.2 18a2 2 0 0 0 1.7 3h16.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                              </svg>
                            </div>

                            <div className="min-w-0 flex-1">
                              <strong className="block text-[15px] leading-[1.35] text-[#111a35]">
                                A receita ainda não mudou.
                              </strong>
                              <p className="mt-1 text-[13px] leading-[1.5] text-[#7a5050]">
                                Mas o relacionamento já mudou. Vale uma revisão de retenção.
                              </p>
                            </div>

                          </div>
                        </div>
                      </article>
                    </div>

                    {/* mobile editorial helper */}
                    <div className="mx-auto mt-7 grid max-w-[900px] gap-3 sm:grid-cols-2 xl:hidden">
                      <div className="rounded-[18px] border border-[#dfe7ff] bg-white/80 p-4">
                        <strong className="text-[13px] font-black text-[#3568f5]">
                          Mesmo estado hoje
                        </strong>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#68708a]">
                          Os dois aparecem com 40 usuários e receita estável.
                        </p>
                      </div>
                      <div className="rounded-[18px] border border-[#dfe7ff] bg-white/80 p-4">
                        <strong className="text-[13px] font-black text-[#3568f5]">
                          Histórias diferentes
                        </strong>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#68708a]">
                          A trajetória revela se vale crescer, proteger ou simplesmente observar.
                        </p>
                      </div>
                    </div>

                    {/* footer line */}
                    <div className="mx-auto mt-9 flex max-w-[900px] items-center gap-4">
                      <div className="h-px flex-1 bg-[#d8deeb]" />
                      <div className="text-center text-[11px] font-extrabold uppercase tracking-[.22em] text-[#7e88a0]">
                        Mesma aparência · mais contexto · melhores decisões
                      </div>
                      <div className="h-px flex-1 bg-[#d8deeb]" />
                    </div>
                  </div>
                </div>
              </section>

              {/* PROBLEM */}
              <section
                className="bg-[#10131a] py-[74px] text-white sm:py-[98px]"
                data-analytics-section="problem"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="max-w-[860px]">
                    <Eyebrow light>O problema</Eyebrow>
                    <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[50px] lg:text-[60px]">
                      Quando a mudança aparece na receita, parte da história já
                      aconteceu.
                    </h2>
                    <p className="mt-5 max-w-[760px] text-[17px] leading-[1.6] text-[#a7afbd] sm:text-[18px]">
                      O cliente muda primeiro. A estratégia da empresa costuma mudar
                      depois. É nesse intervalo que oportunidades passam, e receita
                      começa a ficar vulnerável.
                    </p>
                  </div>

                  <div className="mt-12 grid gap-4 lg:grid-cols-3">
                    <article className="min-h-[220px] rounded-[22px] border border-[#272b34] bg-[#171a21] p-7">
                      <div className="text-[12px] font-extrabold tracking-[.1em] text-[#707887]">
                        01
                      </div>
                      <h3 className="mt-12 text-[21px] font-black tracking-[-0.035em]">
                        A estratégia envelhece
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.58] text-[#a8afba]">
                        Você continua vendendo, atendendo e priorizando como antes,
                        mesmo quando a relação já entrou em outro estágio.
                      </p>
                    </article>

                    <article className="min-h-[220px] rounded-[22px] border border-[#272b34] bg-[#171a21] p-7">
                      <div className="text-[12px] font-extrabold tracking-[.1em] text-[#707887]">
                        02
                      </div>
                      <h3 className="mt-12 text-[21px] font-black tracking-[-0.035em]">
                        Os sinais ficam separados
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.58] text-[#a8afba]">
                        Uso, suporte, pessoas, compras e relacionamento contam partes
                        diferentes de uma mesma mudança.
                      </p>
                    </article>

                    <article className="min-h-[220px] rounded-[22px] border border-[#272b34] bg-[#171a21] p-7">
                      <div className="text-[12px] font-extrabold tracking-[.1em] text-[#707887]">
                        03
                      </div>
                      <h3 className="mt-12 text-[21px] font-black tracking-[-0.035em]">
                        A decisão chega atrasada
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.58] text-[#a8afba]">
                        Oportunidades de expansão ficam óbvias tarde demais. Riscos
                        também.
                      </p>
                    </article>
                  </div>

                  <div className="mt-9 rounded-[26px] border border-[#2b3039] bg-[linear-gradient(135deg,#151820,#11131a)] p-7 text-[29px] font-black leading-[1.15] tracking-[-0.045em] sm:p-9 sm:text-[42px]">
                    <span className="text-[#9e98ff]">Seu cliente já mudou.</span>
                    <br />
                    A pergunta é quanto tempo sua estratégia vai levar para mudar junto.
                  </div>
                </div>
              </section>

              {/* HOW */}
              <section
                id="como-funciona"
                className="scroll-mt-24 py-[74px] sm:py-[98px]"
                data-analytics-section="how_it_works"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="max-w-[830px]">
                    <Eyebrow>Como funciona</Eyebrow>
                    <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[50px] lg:text-[60px]">
                      Da mudança de comportamento à decisão.
                    </h2>
                    <p className="mt-4 max-w-[760px] text-[17px] leading-[1.6] text-[#667085] sm:text-[18px]">
                      O Ohrly não transforma qualquer oscilação em alerta. Primeiro
                      entende o que é normal para cada cliente.
                    </p>
                  </div>

                  <div className="mt-12 border-t border-[#e7e9ef]">
                    <div className="grid gap-5 border-b border-[#e7e9ef] py-8 md:grid-cols-[70px_.95fr_1.05fr] md:gap-8">
                      <div className="text-[13px] font-black text-[#8b919c]">01</div>
                      <h3 className="text-[24px] font-black tracking-[-0.04em]">
                        Entende o normal de cada cliente
                      </h3>
                      <p className="text-[15px] leading-[1.62] text-[#667085]">
                        O histórico da própria relação é a primeira referência. O mesmo
                        número pode significar coisas diferentes em contas diferentes.
                      </p>
                    </div>

                    <div className="grid gap-5 border-b border-[#e7e9ef] py-8 md:grid-cols-[70px_.95fr_1.05fr] md:gap-8">
                      <div className="text-[13px] font-black text-[#8b919c]">02</div>
                      <h3 className="text-[24px] font-black tracking-[-0.04em]">
                        Detecta mudanças que persistem
                      </h3>
                      <p className="text-[15px] leading-[1.62] text-[#667085]">
                        Separa ruído cotidiano de mudanças que alteram de forma
                        consistente o comportamento daquela relação.
                      </p>
                    </div>

                    <div className="grid gap-5 border-b border-[#e7e9ef] py-8 md:grid-cols-[70px_.95fr_1.05fr] md:gap-8">
                      <div className="text-[13px] font-black text-[#8b919c]">03</div>
                      <h3 className="text-[24px] font-black tracking-[-0.04em]">
                        Conecta mudança e impacto econômico
                      </h3>
                      <p className="text-[15px] leading-[1.62] text-[#667085]">
                        Ajuda a entender quando a estratégia atual pode ter ficado para
                        trás, seja para crescer, proteger receita ou adaptar a relação.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* DECISIONS */}
              <section
                id="decisoes"
                className="scroll-mt-24 bg-[#f6f8fc] py-[74px] sm:py-[98px]"
                data-analytics-section="decisions"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="max-w-[850px]">
                    <Eyebrow>Uma leitura. Diferentes decisões.</Eyebrow>
                    <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[50px] lg:text-[60px]">
                      Nem toda mudança pede a mesma resposta.
                    </h2>
                    <p className="mt-4 max-w-[760px] text-[17px] leading-[1.6] text-[#667085] sm:text-[18px]">
                      A proposta não é automatizar sua estratégia. É dar contexto
                      suficiente para que a decisão chegue antes.
                    </p>
                  </div>

                  <div className="mt-12 grid gap-4 md:grid-cols-2">
                    <DecisionCard
                      tag="Crescimento"
                      title="Quando a relação ficou maior que a oferta atual."
                    >
                      Novos usuários, áreas, stakeholders e casos de uso podem indicar
                      que vale revisar expansão, pacote ou profundidade da relação.
                    </DecisionCard>

                    <DecisionCard
                      tag="Retenção"
                      title="Quando a receita parece estável, mas a relação enfraquece."
                    >
                      Queda persistente, perda de champion, silêncio ou menor
                      profundidade podem justificar uma intervenção antes da renovação.
                    </DecisionCard>

                    <DecisionCard
                      tag="Adaptação"
                      title="Quando continuar igual passa a ser a decisão errada."
                    >
                      A mudança pode pedir nova cadência, oferta, touch, sponsor,
                      onboarding ou uma nova hipótese para a conta.
                    </DecisionCard>

                    <DecisionCard
                      tag="Esperar"
                      title="Quando a melhor decisão é não reagir ao ruído."
                    >
                      Nem toda oscilação merece ação. A própria trajetória ajuda a
                      distinguir variação normal de mudança persistente.
                    </DecisionCard>
                  </div>
                </div>
              </section>

              {/* PILOT */}
              <section
                id="piloto"
                className="scroll-mt-24 py-[74px] sm:py-[98px]"
                data-analytics-section="pilot"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="rounded-[34px] border border-[#e7e9ef] bg-white p-[22px] shadow-[0_26px_80px_rgba(11,13,18,.07)]">
                    <div className="grid items-start gap-9 sm:p-[34px] lg:grid-cols-[.88fr_1.12fr]">
                      <div>
                        <Eyebrow>Validação com casos reais</Eyebrow>
                        <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[48px] lg:text-[56px]">
                          Descubra o que já mudou na sua base.
                        </h2>
                        <p className="mt-5 max-w-[540px] text-[16px] leading-[1.62] text-[#667085]">
                          Traga clientes reais. Reconstruímos como o comportamento mudou
                          antes de uma oportunidade de crescimento, uma perda de receita
                          ou uma decisão que ainda está em aberto.
                        </p>
                      </div>

                      <div className="grid gap-[11px]">
                        <ReviewCase
                          number="01"
                          title="Um cliente que intensificou"
                        >
                          Para observar o que havia mudado na relação antes de a
                          oportunidade de expansão ficar explícita.
                        </ReviewCase>

                        <ReviewCase
                          number="02"
                          title="Um cliente que reduziu ou saiu"
                        >
                          Para reconstruir sinais que já estavam presentes antes de a
                          receita mudar.
                        </ReviewCase>

                        <ReviewCase
                          number="03"
                          title="Um cliente que está mudando agora"
                        >
                          Para testar se a leitura acrescenta contexto enquanto ainda
                          existe uma decisão em aberto.
                        </ReviewCase>
                      </div>
                    </div>

                    <div className="grid gap-8 border-t border-[#e7e9ef] px-3 pb-3 pt-8 sm:px-[34px] sm:pb-[34px] lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <div className="flex items-start gap-3 text-[14px] leading-[1.55] text-[#424854]">
                          <span className="mt-[1px] grid size-[21px] shrink-0 place-items-center rounded-full bg-[#0b0d12] text-white">
                            <Check size={13} />
                          </span>
                          <span>
                            Comparamos cada cliente primeiro com a própria história.
                          </span>
                        </div>
                        <div className="mt-3 flex items-start gap-3 text-[14px] leading-[1.55] text-[#424854]">
                          <span className="mt-[1px] grid size-[21px] shrink-0 place-items-center rounded-full bg-[#0b0d12] text-white">
                            <Check size={13} />
                          </span>
                          <span>
                            Se a leitura não revelar algo capaz de mudar uma decisão,
                            paramos aí.
                          </span>
                        </div>
                      </div>

                      <div className="lg:text-right">
                        <CommercialIntentTrigger
                          ctaId="pilot_analyze_base"
                          location="pilot"
                          label="Analisar minha base"
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                        >
                          Analisar minha base
                          <ArrowRight size={16} />
                        </CommercialIntentTrigger>

                        <p className="mt-4 max-w-[340px] text-[13px] leading-[1.5] text-[#737a86] lg:ml-auto">
                          Sem integração agora. Você deixa seu contato e combinamos os
                          casos que vale revisar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </main>

            <footer className="border-t border-[#e7e9ef] py-10 sm:py-[42px]">
              <div className="mx-auto flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-5 text-[13px] text-[#707784] sm:flex-row sm:items-center">
                <Brand />

                <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                  <Link
                    href="/demo"
                    className="font-bold text-[#596270] hover:text-[#0b0d12]"
                    data-analytics-cta="footer_demo"
                    data-analytics-location="footer"
                  >
                    Demo
                  </Link>

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

                  <span>Protótipo comercial · validação de produto</span>
                </div>
              </div>
            </footer>
          </div>
        </CommercialIntentProvider>
      </LeadModalProvider>
    </>
  );
}
