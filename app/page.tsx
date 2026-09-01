import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadModalProvider } from "@/components/lead-form-modal";
import {
  CommercialIntentProvider,
  CommercialIntentTrigger,
} from "@/components/commercial-intent-modal";

export const metadata: Metadata = {
  title: "Ohrly — Entenda a história antes da renovação",
  description:
    "Ohrly acompanha a história das relações B2B para tornar mudanças importantes visíveis antes que seja tarde para agir.",
  openGraph: {
    title: "Ohrly — Entenda a história antes da renovação",
    description:
      "O risco é só uma parte da relação. O Ohrly acompanha como uso, stakeholders, suporte, contrato e comportamento mudam ao longo do tempo antes da próxima decisão.",
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
      className={`inline-flex items-center gap-2.5 text-[13px] font-extrabold uppercase tracking-[.08em] ${
        light ? "text-[#8faeff]" : "text-[#3568f5]"
      }`}
    >
      <span
        className={`h-[3px] w-6 rounded-full ${
          light ? "bg-[#8faeff]" : "bg-[#3568f5]"
        }`}
      />
      {children}
    </div>
  );
}

function Pill({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: "neutral" | "risk" | "warn" | "ok";
}) {
  const classes = {
    neutral: "bg-[#f5f6f8] text-[#3f4651]",
    risk: "bg-[#fff1f0] text-[#b42318]",
    warn: "bg-[#fff5e9] text-[#a15c00]",
    ok: "bg-[#ebf8f1] text-[#18794e]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-black ${classes[tone]}`}
    >
      {children}
    </span>
  );
}

function StoryRow({
  date,
  children,
}: {
  date: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[78px_1fr] gap-3 border-t border-white/[.07] py-[13px] first:border-t-0">
      <div className="text-[11px] font-extrabold uppercase text-[#758097]">
        {date}
      </div>
      <div className="text-[13px] leading-[1.42] text-[#d9deea]">
        {children}
      </div>
    </div>
  );
}

function StepCard({
  number,
  title,
  body,
  question,
}: {
  number: string;
  title: string;
  body: string;
  question: string;
}) {
  return (
    <article className="min-h-[260px] rounded-[24px] border border-[#e7e9ef] bg-white p-7">
      <div className="grid size-[34px] place-items-center rounded-full bg-[#0b0d12] text-[13px] font-black text-white">
        {number}
      </div>
      <h3 className="mt-8 text-[24px] font-black tracking-[-0.035em] text-[#0b0d12]">
        {title}
      </h3>
      <p className="mt-2.5 text-[16px] leading-[1.55] text-[#606773]">
        {body}
      </p>
      <div className="mt-5 text-[13px] font-black text-[#3568f5]">
        {question}
      </div>
    </article>
  );
}

function Signal({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-[#e7e9ef] py-3 first:border-t-0">
      <span className="text-sm text-[#747c88]">{label}</span>
      <strong className="text-right text-sm text-[#0b0d12]">{value}</strong>
    </div>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "good" | "bad" | "warn";
}) {
  const toneClass = {
    good: "text-[#18794e]",
    bad: "text-[#b42318]",
    warn: "text-[#a15c00]",
  };

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-t border-[#e7e9ef] py-4 first:border-t-0">
      <div className="font-extrabold text-[#0b0d12]">{label}</div>
      <div className={`text-right text-[13px] font-black ${toneClass[tone]}`}>
        {value}
      </div>
    </div>
  );
}

function Perspective({
  area,
  children,
}: {
  area: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[18px] border border-[#262b35] bg-[#12151c] px-5 py-[18px]">
      <div className="mb-2 text-[12px] font-extrabold uppercase tracking-[.08em] text-[#7e8ba0]">
        {area}
      </div>
      <div className="text-[17px] font-bold leading-6 text-white">{children}</div>
    </div>
  );
}

function Feature({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[22px] border border-[#e7e9ef] bg-white px-[18px] py-[22px]">
      <div className="grid size-10 place-items-center rounded-[13px] bg-[#edf2ff] text-base font-black text-[#3568f5]">
        {icon}
      </div>
      <h3 className="mt-6 text-[17px] font-black tracking-[-0.025em] text-[#0b0d12]">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-[1.48] text-[#606773]">
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
    <div className="grid grid-cols-[44px_1fr] gap-[13px] rounded-[18px] bg-[#f6f8fc] p-[15px]">
      <div className="grid size-9 place-items-center rounded-full bg-[#0b0d12] text-xs font-black text-white">
        {number}
      </div>
      <div>
        <strong className="block text-sm text-[#0b0d12]">{title}</strong>
        <span className="mt-1 block text-[13px] leading-[1.4] text-[#606773]">
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
              <header className="sticky top-0 z-40 border-b border-[#e7e9ef]/75 bg-white/90 backdrop-blur-xl">
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
                      href="#problema"
                      data-analytics-cta="nav_problem"
                      data-analytics-location="navigation"
                    >
                      O problema
                    </a>
                    <a
                      href="#como-funciona"
                      data-analytics-cta="nav_how_it_works"
                      data-analytics-location="navigation"
                    >
                      Como funciona
                    </a>
                    <a
                      href="#produto"
                      data-analytics-cta="nav_product"
                      data-analytics-location="navigation"
                    >
                      Produto
                    </a>
                    <a
                      href="#revisao"
                      data-analytics-cta="nav_review"
                      data-analytics-location="navigation"
                    >
                      Revisar contas
                    </a>
                  </nav>

                  <div className="flex items-center gap-2.5">
                    <Link
                      href="/demo"
                      data-analytics-cta="nav_demo"
                      data-analytics-location="navigation"
                      data-analytics-label="Ver demo"
                      className="hidden min-h-11 items-center justify-center rounded-full border border-[#e7e9ef] bg-white px-5 text-sm font-extrabold text-[#0b0d12] transition hover:-translate-y-px sm:inline-flex"
                    >
                      Ver demo
                    </Link>

                    <CommercialIntentTrigger
                      ctaId="nav_review_accounts"
                      location="navigation"
                      label="Revisar minhas contas"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 text-sm font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                    >
                      Revisar minhas contas
                    </CommercialIntentTrigger>
                  </div>
                </div>
              </header>

              <main id="top">
                {/* HERO */}
                <section
                  className="relative overflow-hidden py-[72px] sm:py-[88px]"
                  data-analytics-section="hero"
                >
                  <div className="pointer-events-none absolute right-[-260px] top-[70px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.12),rgba(53,104,245,0)_65%)]" />

                  <div className="relative mx-auto grid w-[min(1180px,calc(100%_-_40px))] items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-16">
                    <div>
                      <Eyebrow>Observabilidade da relação B2B</Eyebrow>

                      <h1 className="mt-[18px] max-w-[900px] text-[46px] font-black leading-[.99] tracking-[-0.058em] sm:text-[58px] lg:text-[76px]">
                        Risco sem contexto não é{" "}
                        <span className="text-[#3568f5]">decisão.</span>
                      </h1>

                      <p className="mt-6 max-w-[720px] text-[17px] leading-[1.55] text-[#333946] sm:text-[20px]">
                        O risco é só uma parte da relação.{" "}
                        <strong className="font-black text-[#0b0d12]">
                          Uso, stakeholders, suporte, contrato e comportamento
                          podem mudar em ritmos diferentes
                        </strong>{" "}
                        — e algumas mudanças só ficam óbvias quando já há pouco
                        espaço para agir.
                      </p>

                      <p className="mt-4 max-w-[720px] text-[17px] leading-[1.55] text-[#333946] sm:text-[20px]">
                        O{" "}
                        <strong className="font-black text-[#0b0d12]">
                          Ohrly acompanha como cada relação evolui ao longo do
                          tempo
                        </strong>{" "}
                        para ajudar seu time a entender o que aconteceu antes da
                        próxima decisão de renovação.
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3.5">
                        <CommercialIntentTrigger
                          ctaId="hero_review_accounts"
                          location="hero"
                          label="Revisar minhas contas"
                          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                        >
                          Revisar minhas contas
                          <ArrowRight size={16} />
                        </CommercialIntentTrigger>

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

                      <div className="mt-[17px] text-[13px] text-[#737a86]">
                        Não substitui seu Health Score. Começa onde o alerta
                        termina.
                      </div>
                    </div>

                    <div
                      className="rounded-[34px] bg-[#10131a] p-[22px] text-white shadow-[0_24px_70px_rgba(11,13,18,.10)] lg:rotate-[1.2deg]"
                      data-analytics-section="hero_product_preview"
                    >
                      <div className="overflow-hidden rounded-[22px] border border-white/[.12] bg-[#151923]">
                        <div className="flex items-center justify-between border-b border-white/[.08] px-[18px] py-4">
                          <div className="flex gap-1.5">
                            <span className="size-[7px] rounded-full bg-[#667084]" />
                            <span className="size-[7px] rounded-full bg-[#667084]" />
                            <span className="size-[7px] rounded-full bg-[#667084]" />
                          </div>
                          <div className="text-[11px] font-bold text-[#8e98aa]">
                            ACME · relação em revisão
                          </div>
                        </div>

                        <div className="flex items-start justify-between gap-3 px-[18px] pb-3 pt-5">
                          <div>
                            <h3 className="text-lg font-black">Acme Cloud</h3>
                            <div className="mt-1 text-[11px] font-bold text-[#8e98aa]">
                              Renovação em 27 dias
                            </div>
                          </div>
                          <span className="rounded-full bg-[#3d2b0c] px-2.5 py-1.5 text-[11px] font-black text-[#ffca69]">
                            Score 72 · estável
                          </span>
                        </div>

                        <div className="px-[18px] pb-5">
                          <StoryRow date="74 dias">
                            <strong className="text-white">
                              Uso segue saudável.
                            </strong>{" "}
                            Champion concentra 81% das interações.
                          </StoryRow>

                          <StoryRow date="51 dias">
                            Champion reduz presença nas reuniões.{" "}
                            <span className="text-[#8faeff]">
                              Padrão relacional começa a mudar.
                            </span>
                          </StoryRow>

                          <StoryRow date="36 dias">
                            <span className="text-[#ff988f]">
                              Champion sai da empresa.
                            </span>{" "}
                            Nenhum outro sponsor ativo.
                          </StoryRow>

                          <StoryRow date="18 dias">
                            Novo stakeholder aparece.{" "}
                            <strong className="text-white">
                              Sem contato com economic buyer.
                            </strong>
                          </StoryRow>

                          <StoryRow date="hoje">
                            <span className="text-[#8ce1b8]">
                              Uso continua estável.
                            </span>{" "}
                            Estrutura da relação segue frágil.
                          </StoryRow>
                        </div>

                        <div className="mx-[18px] mb-[18px] rounded-2xl border border-[rgba(113,148,255,.25)] bg-[linear-gradient(135deg,rgba(53,104,245,.20),rgba(53,104,245,.06))] px-[15px] py-3.5">
                          <strong className="block text-xs font-black text-[#a9c0ff]">
                            O PRODUTO CONTINUA SAUDÁVEL. A RELAÇÃO NÃO.
                          </strong>
                          <span className="mt-1.5 block text-[13px] leading-[1.4] text-[#e6ebf6]">
                            O risco operacional não conta sozinho o que mudou na
                            estrutura que sustenta a renovação.
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* PROBLEMA */}
                <section
                  id="problema"
                  className="bg-[#f6f8fc] py-[68px] sm:py-[92px]"
                  data-analytics-section="problem"
                >
                  <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                    <div className="mb-[42px] max-w-[800px]">
                      <Eyebrow>O alerta não é a decisão</Eyebrow>
                      <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                        Risco, relação e oportunidade de intervenção são
                        perguntas diferentes.
                      </h2>
                      <p className="mt-4 text-[17px] leading-[1.6] text-[#606773] sm:text-lg">
                        Um score pode dizer que uma conta merece atenção. O
                        trabalho real começa quando o time precisa entender o que
                        mudou e se ainda existe espaço para produzir um resultado
                        diferente.
                      </p>
                    </div>

                    <div className="grid gap-[18px] lg:grid-cols-3">
                      <StepCard
                        number="1"
                        title="Há risco?"
                        body="Health Score, churn model e sinais existentes ajudam a apontar onde algo pode estar errado."
                        question="Quem pode sair?"
                      />
                      <StepCard
                        number="2"
                        title="O que está acontecendo?"
                        body="Uso caiu? O champion sumiu? A cobertura relacional mudou? A conta respondeu à última ação?"
                        question="Como chegamos até aqui?"
                      />
                      <StepCard
                        number="3"
                        title="Ainda existe espaço para agir?"
                        body="Há tempo, acesso e sinais de resposta suficientes para justificar uma investigação ou intervenção agora?"
                        question="O que merece atenção?"
                      />
                    </div>
                  </div>
                </section>

                {/* COMPARAÇÃO */}
                <section
                  className="py-[68px] sm:py-[92px]"
                  data-analytics-section="same_risk_different_stories"
                >
                  <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                    <div className="mb-[42px] max-w-[800px]">
                      <Eyebrow>Mesmo risco, histórias diferentes</Eyebrow>
                      <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                        Duas contas podem parecer igualmente preocupantes e
                        exigir decisões completamente diferentes.
                      </h2>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                      <article className="rounded-[28px] border border-[#e7e9ef] bg-white p-6 sm:p-7">
                        <div className="mb-6 flex items-start justify-between gap-5">
                          <div>
                            <div className="text-[11px] font-bold text-[#8e98aa]">
                              CONTA A
                            </div>
                            <h3 className="mt-1 text-[28px] font-black tracking-[-0.04em]">
                              Northstar
                            </h3>
                          </div>
                          <Pill tone="risk">Score 41</Pill>
                        </div>

                        <div>
                          <Signal label="Uso" value="↓ há 3 semanas" />
                          <Signal label="Champion" value="ativo" />
                          <Signal label="Sponsor" value="ativo" />
                          <Signal label="Renovação" value="94 dias" />
                          <Signal
                            label="Última intervenção"
                            value="ainda não houve"
                          />
                        </div>

                        <div className="mt-[22px] rounded-[18px] border border-[#dfe7ff] bg-[#f3f6ff] px-[18px] py-4 text-sm leading-[1.45]">
                          <strong>Leitura:</strong> deterioração recente, acesso
                          preservado e tempo para investigar.
                        </div>
                      </article>

                      <article className="rounded-[28px] border border-[#e7e9ef] bg-white p-6 sm:p-7">
                        <div className="mb-6 flex items-start justify-between gap-5">
                          <div>
                            <div className="text-[11px] font-bold text-[#8e98aa]">
                              CONTA B
                            </div>
                            <h3 className="mt-1 text-[28px] font-black tracking-[-0.04em]">
                              Luma
                            </h3>
                          </div>
                          <Pill tone="risk">Score 43</Pill>
                        </div>

                        <div>
                          <Signal label="Uso" value="estável" />
                          <Signal label="Champion" value="saiu há 37 dias" />
                          <Signal
                            label="Economic buyer"
                            value="sem relação"
                          />
                          <Signal label="Renovação" value="18 dias" />
                          <Signal
                            label="Última intervenção"
                            value="sem resposta"
                          />
                        </div>

                        <div className="mt-[22px] rounded-[18px] border border-[#dfe7ff] bg-[#f3f6ff] px-[18px] py-4 text-sm leading-[1.45]">
                          <strong>Leitura:</strong> o produto parece saudável,
                          mas a estrutura que sustenta a renovação mudou.
                        </div>
                      </article>
                    </div>
                  </div>
                </section>

                {/* SAUDÁVEL MAS FRÁGIL */}
                <section
                  className="bg-[#f6f8fc] py-[68px] sm:py-[92px]"
                  data-analytics-section="healthy_but_fragile"
                >
                  <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
                    <div>
                      <Eyebrow>Saudável também pode ser frágil</Eyebrow>
                      <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                        O cliente adotou o produto — ou uma pessoa adotou o
                        produto?
                      </h2>
                      <p className="mt-4 text-[17px] leading-[1.6] text-[#606773] sm:text-[20px]">
                        Em SaaS B2B, uma conta pode continuar usando enquanto a
                        relação fica concentrada demais em um único stakeholder.
                        O problema só aparece quando essa pessoa muda de função,
                        sai ou deixa de defender a compra.
                      </p>

                      <div className="mt-5 text-[30px] font-black leading-[1.08] tracking-[-0.045em] sm:text-[42px]">
                        “A conta está verde” não responde quem sustenta a relação.
                      </div>
                    </div>

                    <div className="rounded-[30px] border border-[#e7e9ef] bg-white p-6 shadow-[0_18px_60px_rgba(11,13,18,.06)]">
                      <Metric
                        label="Uso do produto"
                        value="saudável"
                        tone="good"
                      />
                      <Metric label="Suporte" value="normal" tone="good" />
                      <Metric label="Adoção" value="crescendo" tone="good" />
                      <Metric label="Champion" value="saiu" tone="bad" />
                      <Metric
                        label="Executive sponsor"
                        value="sem contato"
                        tone="warn"
                      />
                      <Metric
                        label="Economic buyer"
                        value="nenhuma relação"
                        tone="bad"
                      />
                      <Metric
                        label="Renovação"
                        value="24 dias"
                        tone="warn"
                      />
                    </div>
                  </div>
                </section>

                {/* UMA RELAÇÃO, VÁRIAS LEITURAS */}
                <section
                  className="bg-[#0b0d12] py-[68px] text-white sm:py-[92px]"
                  data-analytics-section="cross_functional_context"
                >
                  <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] items-start gap-12 lg:grid-cols-[.95fr_1.05fr]">
                    <div>
                      <Eyebrow light>Uma relação, várias leituras</Eyebrow>
                      <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                        Áreas diferentes podem estar certas — e ainda assim tomar
                        decisões incompatíveis.
                      </h2>
                      <p className="mt-4 text-[17px] leading-[1.6] text-[#a7afbd] sm:text-lg">
                        O objetivo não é fazer todo mundo concordar. É garantir
                        que as áreas estejam discutindo a mesma realidade antes
                        de decidir onde colocar esforço.
                      </p>

                      <div className="mt-5 rounded-[20px] border border-[#2d3852] bg-[#11192d] p-5 leading-[1.5] text-[#dce5ff]">
                        <strong>Princípio:</strong> risco é uma dimensão da
                        relação. Valor econômico, custo, contexto estratégico e
                        possibilidade de intervenção são outras.
                      </div>
                    </div>

                    <div className="grid gap-2.5">
                      <Perspective area="Comercial">
                        “É uma conta importante. Não podemos perder.”
                      </Perspective>
                      <Perspective area="Customer Success">
                        “Está em risco. Precisamos recuperar.”
                      </Perspective>
                      <Perspective area="Operação / Suporte">
                        “Consome muito mais estrutura que as outras.”
                      </Perspective>
                      <Perspective area="Financeiro">
                        “A margem desta relação é ruim.”
                      </Perspective>
                      <Perspective area="Estratégia">
                        “Entramos nela para abrir um novo mercado.”
                      </Perspective>
                    </div>
                  </div>
                </section>

                {/* COMO FUNCIONA */}
                <section
                  id="como-funciona"
                  className="py-[68px] sm:py-[92px]"
                  data-analytics-section="how_it_works"
                >
                  <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                    <div className="mb-[42px] max-w-[800px]">
                      <Eyebrow>Como o Ohrly acompanha a relação</Eyebrow>
                      <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                        Da mudança à resposta, sem esconder a história atrás de
                        mais um número.
                      </h2>
                      <p className="mt-4 text-[17px] leading-[1.6] text-[#606773] sm:text-lg">
                        O produto organiza a trajetória em poucos objetos
                        legíveis para o time investigar, agir e voltar depois
                        para ver o que aconteceu.
                      </p>
                    </div>

                    <div
                      id="produto"
                      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5"
                    >
                      <Feature icon="↗" title="Timeline da relação">
                        Reconstrói como a conta chegou ao estado atual em vez de
                        mostrar apenas uma fotografia.
                      </Feature>
                      <Feature icon="~" title="Mudanças e ciclos">
                        Mostra o que deixou de ser normal, há quanto tempo e se a
                        mudança persiste, recupera ou recai.
                      </Feature>
                      <Feature icon="◎" title="Stakeholder coverage">
                        Torna visível quem sustenta a relação, concentração de
                        contato e mudanças relevantes de pessoas.
                      </Feature>
                      <Feature icon="◷" title="Contexto de renovação">
                        Coloca o relógio da decisão em cima da trajetória para
                        mostrar quando esperar deixa de ser neutro.
                      </Feature>
                      <Feature icon="↺" title="Intervenção e resposta">
                        Registra o que o time fez e acompanha o que aconteceu
                        depois, sem afirmar causalidade.
                      </Feature>
                    </div>
                  </div>
                </section>

                {/* REVISÃO */}
                <section
                  id="revisao"
                  className="bg-[#f6f8fc] py-[68px] sm:py-[92px]"
                  data-analytics-section="review_real_accounts"
                >
                  <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                    <div className="grid gap-8 rounded-[34px] border border-[#e7e9ef] bg-white p-[22px] sm:p-[34px] lg:grid-cols-[.8fr_1.2fr]">
                      <div>
                        <Eyebrow>Validação com casos reais</Eyebrow>
                        <h2 className="mt-3 text-[34px] font-black leading-[1.03] tracking-[-0.045em]">
                          Traga 3 contas reais.
                        </h2>
                        <p className="mt-4 leading-[1.55] text-[#606773]">
                          Vamos reconstruir o que estava observável antes,
                          durante e depois das mudanças e comparar com o processo
                          que seu time usa hoje.
                        </p>
                        <p className="mt-4 leading-[1.55] text-[#606773]">
                          <strong className="font-black text-[#0b0d12]">
                            Se não aparecer nenhuma leitura que poderia mudar uma
                            decisão, paramos aí.
                          </strong>
                        </p>

                        <CommercialIntentTrigger
                          ctaId="review_three_accounts"
                          location="review_section"
                          label="Revisar 3 contas comigo"
                          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                        >
                          Revisar 3 contas comigo
                          <ArrowRight size={16} />
                        </CommercialIntentTrigger>
                      </div>

                      <div className="grid gap-2.5">
                        <ReviewCase
                          number="01"
                          title="Uma que churnou de surpresa"
                        >
                          Para reconstruir o que já estava mudando antes da
                          decisão ficar explícita.
                        </ReviewCase>
                        <ReviewCase
                          number="02"
                          title="Uma que o time tentou recuperar"
                        >
                          Para observar intervenção, resposta e se havia sinais
                          de recuperação ou persistência.
                        </ReviewCase>
                        <ReviewCase
                          number="03"
                          title="Uma que preocupa vocês agora"
                        >
                          Para testar se a leitura acrescenta contexto enquanto
                          ainda existe uma decisão em aberto.
                        </ReviewCase>
                      </div>
                    </div>
                  </div>
                </section>

                {/* CTA FINAL */}
                <section
                  className="py-[68px] sm:py-[92px]"
                  data-analytics-section="final_cta"
                >
                  <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                    <div className="grid items-center gap-9 rounded-[36px] bg-[#3568f5] p-7 text-white sm:p-[52px] lg:grid-cols-[1fr_auto]">
                      <div>
                        <h2 className="m-0 max-w-[780px] text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                          Entenda a história antes que a renovação conte o final.
                        </h2>
                        <p className="mt-3 max-w-[760px] text-[17px] leading-[1.55] text-[#dce5ff]">
                          Ohrly não promete adivinhar churn. Ele torna a
                          trajetória da relação legível enquanto ainda existe
                          uma decisão a ser tomada.
                        </p>
                      </div>

                      <CommercialIntentTrigger
                        ctaId="final_review_accounts"
                        location="final_cta"
                        label="Revisar minhas contas"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-5 font-extrabold text-[#0b0d12] shadow-[0_6px_0_#0d2e9f] transition hover:-translate-y-px"
                      >
                        Revisar minhas contas
                        <ArrowRight size={16} />
                      </CommercialIntentTrigger>
                    </div>
                  </div>
                </section>
              </main>

              <footer className="border-t border-[#e7e9ef] py-10 sm:py-[42px]">
                <div className="mx-auto flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-5 text-[13px] text-[#707784] sm:flex-row sm:items-center">
                  <Brand />
                  <div>Protótipo comercial · validação de produto</div>
                </div>
              </footer>
            </div>
        </CommercialIntentProvider>
      </LeadModalProvider>
    </>
  );
}
