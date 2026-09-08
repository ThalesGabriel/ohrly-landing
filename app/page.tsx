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

  title: "Ohrly — Quando esperar deixa de ser neutro",

  description:

    "O Ohrly identifica quando uma mudança relevante na relação com um cliente pode alterar uma decisão — e quando esperar começa a reduzir suas opções.",

  openGraph: {

    title: "Ohrly — Quando seu cliente muda, esperar pode ficar caro.",

    description:

      "Entenda quais mudanças realmente alteram uma decisão sobre a conta e quando continuar esperando começa a reduzir suas opções.",

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

                    Quando seu cliente muda,{" "}

                    <span className="text-[#3568f5]">esperar pode ficar caro.</span>

                  </h1>

                  <p className="mx-auto mt-7 max-w-[820px] text-[18px] leading-[1.55] text-[#525967] sm:text-[21px]">

                    O Ohrly identifica quando uma mudança relevante na relação pode{" "}

                    <strong className="font-black text-[#0b0d12]">

                      alterar a decisão sobre uma conta

                    </strong>{" "}

                    , e quando continuar esperando começa a reduzir suas opções.

                  </p>

                  <div className="mt-9 flex flex-wrap justify-center gap-3">

                    <a

href="#piloto"

data-analytics-cta="hero_analyze_base"

data-analytics-location="hero"

data-analytics-label="Analisar minha base"

className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"

                    >

                      Analisar minha base

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

                    Nem toda mudança exige ação. O problema começa quando esperar deixa

                    de ser neutro.

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

                    <p className="mt-3 text-[22px] font-bold tracking-[-0.03em] text-[#5f6780] sm:text-[27px]">

                      Decisões diferentes.

                    </p>

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

                            <button

type="button"

aria-label="Mais opções"

className="grid size-9 place-items-center rounded-full text-[#68708a]"

                            >

                              <span className="text-[22px] leading-none">•••</span>

                            </button>

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

                                A relação cresceu. A oferta ainda acompanha?

                              </strong>

                              <p className="mt-1 text-[13px] leading-[1.5] text-[#52607c]">

                                Novas áreas e stakeholders estão entrando agora. Vale

                                investigar expansão enquanto essa mudança ainda está se

                                formando.

                              </p>

                            </div>

                            <ArrowRight className="mt-2 shrink-0 text-[#3568f5]" size={20} />

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

                            <button

type="button"

aria-label="Mais opções"

className="grid size-9 place-items-center rounded-full text-[#68708a]"

                            >

                              <span className="text-[22px] leading-none">•••</span>

                            </button>

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

                                A receita segue estável. A janela não.

                              </strong>

                              <p className="mt-1 text-[13px] leading-[1.5] text-[#7a5050]">

                                O champion saiu e o acesso aos decisores diminuiu. Esperar

                                pode reduzir as opções de recuperação.

                              </p>

                            </div>

                            <ArrowRight className="mt-2 shrink-0 text-[#d84a4a]" size={20} />

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

                          A trajetória ajuda a separar o que ainda pode ser observado do que começa a perder opções com o tempo.

                        </p>

                      </div>

                    </div>

                    {/* footer line */}

                    <div className="mx-auto mt-9 flex max-w-[900px] items-center gap-4">

                      <div className="h-px flex-1 bg-[#d8deeb]" />

                      <div className="text-center text-[11px] font-extrabold uppercase tracking-[.22em] text-[#7e88a0]">

                        Mesma aparência · decisões diferentes · janelas diferentes

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

                      Mudança não é urgência. Até o momento em que esperar reduz suas

                      opções.

                    </h2>

                    <p className="mt-5 max-w-[790px] text-[17px] leading-[1.6] text-[#a7afbd] sm:text-[18px]">

                      Clientes mudam o tempo todo. A dificuldade é separar o que pode

                      esperar do que tornou a estratégia anterior insuficiente, antes

                      que a melhor alternativa desapareça.

                    </p>

                  </div>

                  <div className="mt-12 grid gap-4 lg:grid-cols-3">

                    <article className="min-h-[220px] rounded-[22px] border border-[#272b34] bg-[#171a21] p-7">

                      <div className="text-[12px] font-extrabold tracking-[.1em] text-[#707887]">

                        01

                      </div>

                      <h3 className="mt-12 text-[21px] font-black tracking-[-0.035em]">

                        Nem toda mudança importa

                      </h3>

                      <p className="mt-2 text-[14px] leading-[1.58] text-[#a8afba]">

                        Clientes oscilam. Reagir a qualquer variação cria ruído, trabalho

                        desnecessário e decisões precipitadas.

                      </p>

                    </article>

                    <article className="min-h-[220px] rounded-[22px] border border-[#272b34] bg-[#171a21] p-7">

                      <div className="text-[12px] font-extrabold tracking-[.1em] text-[#707887]">

                        02

                      </div>

                      <h3 className="mt-12 text-[21px] font-black tracking-[-0.035em]">

                        Algumas mudanças invalidam a decisão anterior

                      </h3>

                      <p className="mt-2 text-[14px] leading-[1.58] text-[#a8afba]">

                        A mesma cadência, oferta, prioridade ou interlocutor que fazia

                        sentido ontem pode não servir mais hoje.

                      </p>

                    </article>

                    <article className="min-h-[220px] rounded-[22px] border border-[#272b34] bg-[#171a21] p-7">

                      <div className="text-[12px] font-extrabold tracking-[.1em] text-[#707887]">

                        03

                      </div>

                      <h3 className="mt-12 text-[21px] font-black tracking-[-0.035em]">

                        Algumas decisões têm prazo

                      </h3>

                      <p className="mt-2 text-[14px] leading-[1.58] text-[#a8afba]">

                        Acesso, orçamento, influência e oportunidade podem se deteriorar

                        enquanto o time ainda está decidindo o que fazer.

                      </p>

                    </article>

                  </div>

                  <div className="mt-9 rounded-[26px] border border-[#2b3039] bg-[linear-gradient(135deg,#151820,#11131a)] p-7 text-[29px] font-black leading-[1.15] tracking-[-0.045em] sm:p-9 sm:text-[42px]">

                    <span className="text-[#9e98ff]">Seu cliente já mudou.</span>

                    <br />

                    A pergunta não é só o que fazer, é por quanto tempo esperar ainda é

                    uma boa decisão.

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

                      Da mudança ao momento de decidir.

                    </h2>

                    <p className="mt-4 max-w-[760px] text-[17px] leading-[1.6] text-[#667085] sm:text-[18px]">

                      O Ohrly não transforma qualquer oscilação em alerta. Primeiro

                      entende o que é normal para cada cliente; depois pergunta se algo

                      mudou o suficiente para revisar uma decisão.

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

                        Identifica o que essa mudança pode alterar

                      </h3>

                      <p className="text-[15px] leading-[1.62] text-[#667085]">

                        Pergunta se a cadência, a oferta, a prioridade, o interlocutor ou

                        outra decisão sobre a conta pode ter ficado desatualizada.

                      </p>

                    </div>

                    <div className="grid gap-5 border-b border-[#e7e9ef] py-8 md:grid-cols-[70px_.95fr_1.05fr] md:gap-8">

                      <div className="text-[13px] font-black text-[#8b919c]">04</div>

                      <h3 className="text-[24px] font-black tracking-[-0.04em]">

                        Torna o tempo parte da decisão

                      </h3>

                      <p className="text-[15px] leading-[1.62] text-[#667085]">

                        Ajuda a distinguir quando observar ainda faz sentido e quando

                        esperar começa a reduzir as opções de crescimento, retenção ou

                        adaptação.

                      </p>

                    </div>

                  </div>

                </div>

              </section>

              {/* DECISIONS */}
              <section
                id="decisoes"
                className="relative scroll-mt-24 overflow-hidden bg-[#fbfcfe] py-[74px] sm:py-[98px]"
                data-analytics-section="decisions"
              >
                <div className="pointer-events-none absolute left-1/2 top-[-260px] size-[680px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.10),rgba(53,104,245,0)_68%)]" />

                <div className="relative mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="mx-auto max-w-[900px] text-center">
                    <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.08em] text-[#3568f5]">
                      <span className="h-[3px] w-6 rounded-full bg-[#3568f5]" />
                      Uma mudança. Diferentes decisões.
                    </div>

                    <h2 className="mx-auto mt-4 max-w-[900px] text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[50px] lg:text-[60px]">
                      Nem toda mudança exige ação. Mas toda decisão tem um momento.
                    </h2>

                    <p className="mx-auto mt-4 max-w-[700px] text-[17px] leading-[1.6] text-[#667085] sm:text-[18px]">
                      O Ohrly ajuda a perceber o que uma mudança realmente pede agora,
                      observar, adaptar, crescer ou proteger receita.
                    </p>
                  </div>

                  {/* Desktop: radial decision map */}
                  <div className="relative mx-auto mt-14 hidden h-[620px] max-w-[980px] lg:block">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-[#e4e9f4]" />
                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-[#e6eaf2]" />

                    <div className="absolute left-1/2 top-1/2 z-10 grid size-[218px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[9px] border-white bg-[#0b0d12] p-6 text-center text-white shadow-[0_30px_70px_rgba(11,13,18,.18)]">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[.14em] text-[#9bb6ff]">
                          Ohrly
                        </div>
                        <div className="mt-2 text-[26px] font-black leading-[1.02] tracking-[-0.045em]">
                          O que essa mudança pede agora?
                        </div>
                        <div className="mt-2 text-[12px] leading-[1.45] text-[#b8c0cc]">
                          Nem toda mudança exige a mesma resposta.
                        </div>
                      </div>
                    </div>

                    <article className="absolute left-[1%] top-1/2 z-10 w-[230px] -translate-y-1/2 rounded-[22px] border border-[#e9ecf2] bg-white/95 p-[18px] shadow-[0_16px_38px_rgba(11,13,18,.06)] backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="grid size-[36px] shrink-0 place-items-center rounded-[12px] bg-[#eef3ff] text-[#3568f5]">
                          <svg
                            viewBox="0 0 24 24"
                            className="size-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                            <circle cx="12" cy="12" r="2.5" />
                          </svg>
                        </div>
                        <h3 className="text-[21px] font-black tracking-[-0.035em]">
                          Observar
                        </h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-[1.5] text-[#6f7785]">
                        Ainda não mudou nenhuma decisão importante.
                      </p>
                    </article>

                    <article className="absolute left-[24%] top-[1%] z-10 w-[230px] rounded-[22px] border border-[#e9ecf2] bg-white/95 p-[18px] shadow-[0_16px_38px_rgba(11,13,18,.06)] backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="grid size-[36px] shrink-0 place-items-center rounded-[12px] bg-[#fff7df] text-[#9b6a00]">
                          <svg
                            viewBox="0 0 24 24"
                            className="size-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M12 3v18" />
                            <path d="m7 8 5-5 5 5" />
                            <path d="m7 16 5 5 5-5" />
                          </svg>
                        </div>
                        <h3 className="text-[21px] font-black tracking-[-0.035em]">
                          Adaptar
                        </h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-[1.5] text-[#6f7785]">
                        A estratégia ainda serve, mas precisa de ajuste.
                      </p>
                    </article>

                    <article className="absolute right-[2%] top-[16%] z-10 w-[230px] rounded-[22px] border border-[#e9ecf2] bg-white/95 p-[18px] shadow-[0_16px_38px_rgba(11,13,18,.06)] backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="grid size-[36px] shrink-0 place-items-center rounded-[12px] bg-[#edf8f1] text-[#16824a]">
                          <svg
                            viewBox="0 0 24 24"
                            className="size-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M4 16 10 10l4 4 6-7" />
                            <path d="M15 7h5v5" />
                          </svg>
                        </div>
                        <h3 className="text-[21px] font-black tracking-[-0.035em]">
                          Crescer
                        </h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-[1.5] text-[#6f7785]">
                        A relação ficou maior que a oferta atual.
                      </p>
                    </article>

                    <article className="absolute bottom-[2%] right-[7%] z-10 w-[230px] rounded-[22px] border border-[#e9ecf2] bg-white/95 p-[18px] shadow-[0_16px_38px_rgba(11,13,18,.06)] backdrop-blur">
                      <div className="flex items-center gap-3">
                        <div className="grid size-[36px] shrink-0 place-items-center rounded-[12px] bg-[#fff1f1] text-[#cf4545]">
                          <svg
                            viewBox="0 0 24 24"
                            className="size-[18px]"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z" />
                            <path d="M9.5 12.2 11.2 14l3.8-4" />
                          </svg>
                        </div>
                        <h3 className="text-[21px] font-black tracking-[-0.035em]">
                          Proteger
                        </h3>
                      </div>
                      <p className="mt-3 text-[13px] leading-[1.5] text-[#6f7785]">
                        Esperar começa a reduzir as opções de recuperação.
                      </p>
                    </article>

                    <div className="pointer-events-none absolute left-[22%] top-[49.5%] h-px w-[22%] rotate-[2deg] bg-[linear-gradient(90deg,rgba(53,104,245,.32),rgba(53,104,245,.04))]" />
                    <div className="pointer-events-none absolute left-[41%] top-[29%] h-px w-[18%] rotate-[62deg] bg-[linear-gradient(90deg,rgba(53,104,245,.26),rgba(53,104,245,.04))]" />
                    <div className="pointer-events-none absolute left-[57%] top-[42%] h-px w-[21%] -rotate-[16deg] bg-[linear-gradient(90deg,rgba(53,104,245,.20),rgba(53,104,245,.04))]" />
                    <div className="pointer-events-none absolute left-[57%] top-[58%] h-px w-[23%] rotate-[18deg] bg-[linear-gradient(90deg,rgba(53,104,245,.18),rgba(53,104,245,.04))]" />
                  </div>

                  {/* Mobile/tablet: same concept, simpler scan */}
                  <div className="mx-auto mt-10 grid max-w-[760px] gap-3 lg:hidden">
                    <div className="mx-auto mb-2 grid size-[188px] place-items-center rounded-full bg-[#0b0d12] p-6 text-center text-white shadow-[0_22px_50px_rgba(11,13,18,.16)]">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-[.14em] text-[#9bb6ff]">
                          Ohrly
                        </div>
                        <div className="mt-2 text-[22px] font-black leading-[1.05] tracking-[-0.04em]">
                          O que essa mudança pede agora?
                        </div>
                      </div>
                    </div>

                    <article className="flex items-start gap-4 rounded-[20px] border border-[#e9ecf2] bg-white p-5 shadow-[0_12px_30px_rgba(11,13,18,.05)]">
                      <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#eef3ff] text-[#3568f5]">
                        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                          <circle cx="12" cy="12" r="2.5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[20px] font-black tracking-[-0.035em]">Observar</h3>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#6f7785]">Ainda não mudou nenhuma decisão importante.</p>
                      </div>
                    </article>

                    <article className="flex items-start gap-4 rounded-[20px] border border-[#e9ecf2] bg-white p-5 shadow-[0_12px_30px_rgba(11,13,18,.05)]">
                      <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#fff7df] text-[#9b6a00]">
                        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 3v18" />
                          <path d="m7 8 5-5 5 5" />
                          <path d="m7 16 5 5 5-5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[20px] font-black tracking-[-0.035em]">Adaptar</h3>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#6f7785]">A estratégia ainda serve, mas precisa de ajuste.</p>
                      </div>
                    </article>

                    <article className="flex items-start gap-4 rounded-[20px] border border-[#e9ecf2] bg-white p-5 shadow-[0_12px_30px_rgba(11,13,18,.05)]">
                      <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#edf8f1] text-[#16824a]">
                        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M4 16 10 10l4 4 6-7" />
                          <path d="M15 7h5v5" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[20px] font-black tracking-[-0.035em]">Crescer</h3>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#6f7785]">A relação ficou maior que a oferta atual.</p>
                      </div>
                    </article>

                    <article className="flex items-start gap-4 rounded-[20px] border border-[#e9ecf2] bg-white p-5 shadow-[0_12px_30px_rgba(11,13,18,.05)]">
                      <div className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[#fff1f1] text-[#cf4545]">
                        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 3 5 6v5c0 4.8 2.8 8.1 7 10 4.2-1.9 7-5.2 7-10V6l-7-3Z" />
                          <path d="M9.5 12.2 11.2 14l3.8-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-[20px] font-black tracking-[-0.035em]">Proteger</h3>
                        <p className="mt-1 text-[13px] leading-[1.5] text-[#6f7785]">Esperar começa a reduzir as opções de recuperação.</p>
                      </div>
                    </article>
                  </div>

                  <div className="mx-auto mt-7 flex max-w-[560px] items-center gap-4">
                    <div className="h-px flex-1 bg-[#e3e7ee]" />
                    <div className="text-center text-[11px] font-extrabold uppercase tracking-[.18em] text-[#8a92a0]">
                      mudança · decisão · tempo
                    </div>
                    <div className="h-px flex-1 bg-[#e3e7ee]" />
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

                          Descubra quais mudanças na sua base realmente mudariam uma decisão.

                        </h2>

                        <p className="mt-5 max-w-[540px] text-[16px] leading-[1.62] text-[#667085]">

                          Traga clientes reais. Reconstruímos o que mudou, qual decisão fazia

                          sentido antes e em que momento esperar começou, ou começaria,

                          a reduzir suas opções.

                        </p>

                      </div>

                      <div className="grid gap-[11px]">

                        <ReviewCase

number="01"

title="Um cliente que comprou mais"

                        >

                          Para observar qual mudança precedeu a oportunidade e quando ela

                          passou a justificar uma decisão diferente.

                        </ReviewCase>

                        <ReviewCase

number="02"

title="Um cliente que reduziu ou saiu"

                        >

                          Para reconstruir quando a estratégia de acompanhamento precisaria

                          ter mudado e quanto da janela ainda existia.

                        </ReviewCase>

                        <ReviewCase

number="03"

title="Um cliente que está mudando agora"

                        >

                          Para testar se o que mudou já altera uma decisão ou se observar

                          ainda é a melhor escolha.

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

                        <div className="mt-3 flex items-start gap-3 text-[14px] leading-[1.55] text-[#424854]">

                          <span className="mt-[1px] grid size-[21px] shrink-0 place-items-center rounded-full bg-[#0b0d12] text-white">

                            <Check size={13} />

                          </span>

                          <span>

                            Também observamos se esperar preserva opções ou começa a

                            reduzi-las.

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