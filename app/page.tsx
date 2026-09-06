import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Clock3 } from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadModalProvider } from "@/components/lead-form-modal";
import {
  CommercialIntentProvider,
  CommercialIntentTrigger,
} from "@/components/commercial-intent-modal";

export const metadata: Metadata = {
  title: "Ohrly — Entenda a trajetória antes que esperar fique caro",
  description:
    "Ohrly acompanha a trajetória das contas B2B para mostrar o que mudou, se persistiu e quando esperar deixa de ser neutro.",
  openGraph: {
    title: "Ohrly — Entenda a trajetória antes que esperar fique caro",
    description:
      "Duas contas podem ter o mesmo Health Score e exigir decisões completamente diferentes. O Ohrly acompanha a trajetória antes que esperar reduza as opções do time.",
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
    warn: "bg-[#3d2b0c] text-[#ffca69]",
    ok: "bg-[#ebf8f1] text-[#18794e]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1.5 text-[11px] font-black ${classes[tone]}`}
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
    <div className="grid grid-cols-[76px_1fr] gap-3 border-t border-white/[.07] py-3 first:border-t-0">
      <div className="text-[11px] font-extrabold uppercase text-[#758097]">
        {date}
      </div>
      <div className="text-[13px] leading-[1.42] text-[#d9deea]">
        {children}
      </div>
    </div>
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
    <div className="flex items-center justify-between gap-4 border-b border-[#e7e9ef] py-3 text-sm">
      <span className="text-[#747c88]">{label}</span>
      <strong className="text-right text-[#0b0d12]">{value}</strong>
    </div>
  );
}

function ValueCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="min-h-[220px] rounded-[22px] border border-[#e7e9ef] bg-white px-5 py-[23px]">
      <div className="grid size-[42px] place-items-center rounded-[13px] bg-[#eef3ff] text-[18px] font-black text-[#3568f5]">
        {icon}
      </div>
      <h3 className="mt-6 text-[18px] font-black tracking-[-0.025em] text-[#0b0d12]">
        {title}
      </h3>
      <p className="mt-2 text-[14px] leading-[1.5] text-[#667085]">
        {children}
      </p>
    </article>
  );
}

function HowCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="min-h-[240px] rounded-[24px] border border-[#252b35] bg-[#12151c] p-[26px]">
      <div className="grid size-9 place-items-center rounded-full bg-white text-[13px] font-black text-[#0b0d12]">
        {number}
      </div>
      <h3 className="mt-7 text-[22px] font-black tracking-[-0.03em] text-white">
        {title}
      </h3>
      <p className="mt-2 text-[15px] leading-[1.55] text-[#a7afbd]">
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
        <span className="mt-1 block text-[13px] leading-[1.45] text-[#667085]">
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
                    href="#comparacao"
                    data-analytics-cta="nav_comparison"
                    data-analytics-location="navigation"
                  >
                    Mesmo risco
                  </a>
                  <a
                    href="#como-funciona"
                    data-analytics-cta="nav_how"
                    data-analytics-location="navigation"
                  >
                    Como funciona
                  </a>
                  <Link
                    href="/demo"
                    data-analytics-cta="nav_demo"
                    data-analytics-location="navigation"
                  >
                    Demo
                  </Link>
                </nav>

                <div className="flex items-center gap-2.5">
                  <Link
                    href="/demo"
                    data-analytics-cta="nav_demo_button"
                    data-analytics-location="navigation"
                    data-analytics-label="Ver demo"
                    className="hidden min-h-11 items-center justify-center rounded-full border border-[#e7e9ef] bg-white px-5 text-sm font-extrabold text-[#0b0d12] transition hover:-translate-y-px sm:inline-flex"
                  >
                    Ver demo
                  </Link>

                  <a
                    href="#revisao"
                    data-analytics-cta="nav_review"
                    data-analytics-location="navigation"
                    data-analytics-label="Revisar 3 contas"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 text-sm font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                  >
                    Revisar 3 contas
                  </a>
                </div>
              </div>
            </header>

            <main id="top">
              {/* HERO */}
              <section
                className="relative overflow-hidden py-[72px] sm:py-[88px]"
                data-analytics-section="hero"
              >
                <div className="pointer-events-none absolute right-[-260px] top-[60px] size-[540px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.13),rgba(53,104,245,0)_66%)]" />

                <div className="relative mx-auto grid w-[min(1180px,calc(100%_-_40px))] items-center gap-14 lg:grid-cols-[1.06fr_.94fr] lg:gap-16">
                  <div>
                    <Eyebrow>Para times de Customer Success</Eyebrow>

                    <h1 className="mt-[18px] max-w-[820px] text-[46px] font-black leading-[.99] tracking-[-0.058em] sm:text-[58px]">
                      Duas contas podem ter o mesmo Health Score.{" "}
                      <span className="text-[#3568f5]">
                        Uma está melhorando. A outra, piorando.
                      </span>
                    </h1>

                    <p className="mt-6 max-w-[720px] text-[17px] leading-[1.55] text-[#333946] sm:text-[19px]">
                      O Ohrly acompanha a trajetória de cada conta para mostrar{" "}
                      <strong className="font-black text-[#0b0d12]">
                        o que mudou, se a mudança persistiu e quando esperar deixa
                        de ser neutro,
                      </strong>{" "}
                      antes do time decidir onde agir.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3.5">
                      <Link
                        href="/demo"
                        data-analytics-cta="hero_demo"
                        data-analytics-location="hero"
                        data-analytics-label="Ver como funciona"
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                      >
                        Ver como funciona
                        <ArrowRight size={16} />
                      </Link>

                      <a
                        href="#revisao"
                        data-analytics-cta="hero_review"
                        data-analytics-location="hero"
                        data-analytics-label="Revisar 3 contas"
                        className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e7e9ef] bg-white px-5 font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                      >
                        Revisar 3 contas
                      </a>
                    </div>

                    <div className="mt-[17px] text-[13px] text-[#737a86]">
                      Não substitui seu Health Score.{" "}
                      <strong className="font-black text-[#0b0d12]">
                        Começa onde o alerta termina.
                      </strong>
                    </div>
                  </div>

                  <div
                    className="rounded-[32px] bg-[#10131a] p-[22px] text-white shadow-[0_22px_70px_rgba(11,13,18,.10)] lg:rotate-[1deg]"
                    data-analytics-section="hero_product_preview"
                  >
                    <div className="overflow-hidden rounded-[22px] border border-white/[.12] bg-[#151923]">
                      <div className="flex items-center justify-between border-b border-white/[.08] px-[17px] py-[15px]">
                        <div className="flex gap-1.5">
                          <span className="size-[7px] rounded-full bg-[#667084]" />
                          <span className="size-[7px] rounded-full bg-[#667084]" />
                          <span className="size-[7px] rounded-full bg-[#667084]" />
                        </div>
                        <div className="text-[11px] font-bold text-[#919bad]">
                          ACME · trajetória da relação
                        </div>
                      </div>

                      <div className="flex items-start justify-between gap-3 px-[18px] pb-3 pt-[18px]">
                        <div>
                          <h3 className="text-[19px] font-black">Acme Cloud</h3>
                          <div className="mt-1 text-[11px] font-bold text-[#8e98aa]">
                            Renovação em 27 dias
                          </div>
                        </div>
                        <Pill tone="warn">Score 72 · estável</Pill>
                      </div>

                      <div className="px-[18px] pb-1 pt-2">
                        <StoryRow date="51 dias">
                          Champion reduz presença nas reuniões.{" "}
                          <strong className="text-white">
                            Padrão relacional começa a mudar.
                          </strong>
                        </StoryRow>

                        <StoryRow date="36 dias">
                          <strong className="text-[#ff988f]">
                            Champion sai da empresa.
                          </strong>{" "}
                          Nenhum outro sponsor ativo.
                        </StoryRow>

                        <StoryRow date="18 dias">
                          Novo stakeholder aparece.{" "}
                          <strong className="text-white">
                            Sem contato com economic buyer.
                          </strong>
                        </StoryRow>

                        <StoryRow date="hoje">
                          <strong className="text-[#8ce1b8]">
                            Uso continua estável.
                          </strong>{" "}
                          A relação segue mais frágil.
                        </StoryRow>
                      </div>

                      <div className="mx-[18px] mb-[18px] mt-3 rounded-2xl border border-[rgba(113,148,255,.25)] bg-[linear-gradient(135deg,rgba(53,104,245,.20),rgba(53,104,245,.06))] px-[15px] py-3.5">
                        <strong className="block text-xs font-black text-[#b6c9ff]">
                          O PRODUTO CONTINUA SAUDÁVEL. A RELAÇÃO NÃO.
                        </strong>
                        <span className="mt-1.5 block text-[13px] leading-[1.45] text-[#e6ebf6]">
                          O estado atual não conta sozinho como a conta chegou até
                          aqui — nem quanto espaço ainda existe para agir.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SAME RISK */}
              <section
                id="comparacao"
                className="bg-[#f6f8fc] py-[68px] sm:py-[92px]"
                data-analytics-section="same_risk_different_stories"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="mb-[38px] max-w-[830px]">
                    <Eyebrow>Mesmo risco, histórias diferentes</Eyebrow>
                    <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                      O risco aponta a fila. A trajetória muda a decisão.
                    </h2>
                    <p className="mt-4 max-w-[780px] text-[17px] leading-[1.58] text-[#667085] sm:text-[18px]">
                      Duas contas podem parecer igualmente preocupantes no
                      retrato atual e ainda assim ter histórias — e janelas de
                      intervenção — completamente diferentes.
                    </p>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    <article className="relative overflow-hidden rounded-[28px] border border-[#e7e9ef] bg-white p-6 shadow-[inset_0_0_0_2px_rgba(53,104,245,.20)] sm:p-[26px]">
                      <div className="mb-[22px] flex items-start justify-between gap-5">
                        <div>
                          <div className="text-[11px] font-extrabold tracking-[.06em] text-[#8e98aa]">
                            CONTA A
                          </div>
                          <h3 className="mt-1 text-[29px] font-black tracking-[-0.04em]">
                            Northstar
                          </h3>
                        </div>
                        <Pill tone="risk">Score 41</Pill>
                      </div>

                      <div className="border-t border-[#e7e9ef]">
                        <Signal label="Uso" value="↓ há 3 semanas" />
                        <Signal label="Champion" value="ativo" />
                        <Signal label="Sponsor" value="ativo" />
                        <Signal label="Renovação" value="94 dias" />
                        <Signal label="Última ação" value="ainda não houve" />
                      </div>

                      <div className="mt-5 rounded-[18px] border border-[#dfe7ff] bg-[#f3f6ff] px-[18px] py-4 text-sm leading-[1.5]">
                        <strong>Leitura:</strong> deterioração recente, acesso
                        preservado e tempo para investigar.
                      </div>

                      <div className="mt-[14px] flex items-start gap-3 rounded-[16px] bg-[#ebf8f1] px-[17px] py-[15px] text-[13px] leading-[1.48] text-[#155e42]">
                        <Check size={18} className="mt-[1px] shrink-0" />
                        <div>
                          <strong className="block">Ainda existe espaço para agir.</strong>
                          Esperar alguns dias pode ser reversível porque o acesso
                          e a janela de decisão continuam abertos.
                        </div>
                      </div>
                    </article>

                    <article className="rounded-[28px] border border-[#e7e9ef] bg-white p-6 sm:p-[26px]">
                      <div className="mb-[22px] flex items-start justify-between gap-5">
                        <div>
                          <div className="text-[11px] font-extrabold tracking-[.06em] text-[#8e98aa]">
                            CONTA B
                          </div>
                          <h3 className="mt-1 text-[29px] font-black tracking-[-0.04em]">
                            Luma
                          </h3>
                        </div>
                        <Pill tone="risk">Score 43</Pill>
                      </div>

                      <div className="border-t border-[#e7e9ef]">
                        <Signal label="Uso" value="estável" />
                        <Signal label="Champion" value="saiu há 37 dias" />
                        <Signal label="Economic buyer" value="sem relação" />
                        <Signal label="Renovação" value="18 dias" />
                        <Signal label="Última ação" value="sem resposta" />
                      </div>

                      <div className="mt-5 rounded-[18px] border border-[#dfe7ff] bg-[#f3f6ff] px-[18px] py-4 text-sm leading-[1.5]">
                        <strong>Leitura:</strong> o produto parece saudável, mas a
                        estrutura que sustenta a renovação mudou.
                      </div>

                      <div className="mt-[14px] flex items-start gap-3 rounded-[16px] bg-[#fff5e9] px-[17px] py-[15px] text-[13px] leading-[1.48] text-[#7d4a00]">
                        <Clock3 size={18} className="mt-[1px] shrink-0" />
                        <div>
                          <strong className="block">Esperar está ficando caro.</strong>
                          A cada semana sem resposta, o time perde acesso,
                          alternativas e espaço antes da renovação.
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className="mt-7 flex flex-col items-start justify-between gap-6 rounded-[22px] bg-[#0b0d12] px-[26px] py-6 text-white lg:flex-row lg:items-center">
                    <div>
                      <strong className="block text-[20px] font-black tracking-[-0.02em]">
                        Mesmo risco atual. Decisões diferentes.
                      </strong>
                      <span className="mt-1 block text-sm text-[#b8c0ce]">
                        Veja como o Ohrly transforma essa diferença em uma leitura
                        operacional.
                      </span>
                    </div>

                    <Link
                      href="/demo"
                      data-analytics-cta="comparison_demo"
                      data-analytics-location="same_risk_different_stories"
                      data-analytics-label="Abrir a demo"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#3568f5] bg-[#3568f5] px-5 font-extrabold text-white shadow-[0_6px_0_#163aa8] transition hover:-translate-y-px"
                    >
                      Abrir a demo
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>

              {/* VALUE */}
              <section
                className="py-[68px] sm:py-[92px]"
                data-analytics-section="what_ohrly_makes_visible"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="mb-[38px] max-w-[830px]">
                    <Eyebrow>O que o Ohrly acrescenta</Eyebrow>
                    <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                      O estado atual é só o começo da leitura.
                    </h2>
                    <p className="mt-4 max-w-[780px] text-[17px] leading-[1.58] text-[#667085] sm:text-[18px]">
                      Uso, stakeholders, suporte e contexto podem mudar em ritmos
                      diferentes. O Ohrly organiza essa trajetória para o time
                      investigar sem transformar tudo em mais um score.
                    </p>
                  </div>

                  <div className="grid gap-[14px] sm:grid-cols-2 lg:grid-cols-4">
                    <ValueCard icon="↗" title="Mudança">
                      O que deixou de ser normal para aquela relação e quando a
                      mudança começou.
                    </ValueCard>

                    <ValueCard icon="≈" title="Persistência">
                      Se foi só uma oscilação ou se a trajetória realmente começou
                      a se afastar do padrão.
                    </ValueCard>

                    <ValueCard icon="↺" title="Intervenção → resposta">
                      O que o time fez e o que foi observado depois, sem
                      transformar sequência temporal em causalidade.
                    </ValueCard>

                    <ValueCard icon="◷" title="Custo de esperar">
                      Quando acesso, tempo e alternativas começam a diminuir e
                      adiar a investigação deixa de ser neutro.
                    </ValueCard>
                  </div>
                </div>
              </section>

              {/* HOW */}
              <section
                id="como-funciona"
                className="bg-[#10131a] py-[68px] text-white sm:py-[92px]"
                data-analytics-section="how_it_works"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="mb-[38px] max-w-[830px]">
                    <Eyebrow light>Como funciona</Eyebrow>
                    <h2 className="mt-3 text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                      Da mudança à resposta, sem esconder a história atrás de mais
                      um número.
                    </h2>
                    <p className="mt-4 max-w-[780px] text-[17px] leading-[1.58] text-[#a7afbd] sm:text-[18px]">
                      O Ohrly acompanha a relação ao longo do tempo e mantém a
                      leitura legível para o time voltar depois e entender o que
                      aconteceu.
                    </p>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-3">
                    <HowCard number="1" title="Reconstrói a trajetória">
                      Organiza sinais relevantes em uma linha do tempo para
                      mostrar como a conta chegou ao estado atual.
                    </HowCard>

                    <HowCard number="2" title="Destaca o que mudou">
                      Mostra mudanças persistentes, recuperação, perda de cobertura
                      relacional e outros sinais que alteram a leitura.
                    </HowCard>

                    <HowCard number="3" title="Continua olhando depois da ação">
                      Registra a intervenção e acompanha o que foi observado depois
                      para construir memória da relação.
                    </HowCard>
                  </div>
                </div>
              </section>

              {/* REVIEW */}
              <section
                id="revisao"
                className="scroll-mt-24 bg-[#f6f8fc] py-[68px] sm:py-[92px]"
                data-analytics-section="review_real_accounts"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="rounded-[34px] border border-[#e7e9ef] bg-white p-[22px]">
                    <div className="grid items-start gap-8 sm:p-[34px] lg:grid-cols-[.84fr_1.16fr]">
                      <div>
                        <Eyebrow>Validação com casos reais</Eyebrow>
                        <h2 className="mt-3 text-[36px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[44px] lg:text-[52px]">
                          Vamos testar se essa leitura acrescentaria algo ao seu CS.
                        </h2>
                      </div>

                      <div className="grid gap-[11px]">
                        <ReviewCase
                          number="01"
                          title="Uma que churnou de surpresa"
                        >
                          Para reconstruir o que já estava mudando antes da decisão
                          ficar explícita.
                        </ReviewCase>

                        <ReviewCase
                          number="02"
                          title="Uma que o time tentou recuperar"
                        >
                          Para observar intervenção, resposta e se havia sinais de
                          recuperação ou persistência.
                        </ReviewCase>

                        <ReviewCase
                          number="03"
                          title="Uma que preocupa vocês agora"
                        >
                          Para testar se a leitura acrescenta contexto enquanto ainda
                          existe uma decisão em aberto.
                        </ReviewCase>
                      </div>
                    </div>
                    <hr/>
                    <div className="grid grid-cols-2">
                      <div>
                        <p className="mt-4 leading-[1.55] text-[#667085]">
                          Traga 3 contas reais. Reconstruímos o que estava observável
                          antes, durante e depois das mudanças e comparamos com o
                          processo que seu time usa hoje.
                         
                        </p>
                         <p className="mt-3 font-black leading-[1.55] text-[#0b0d12]">
                            Se não aparecer nenhuma leitura que poderia mudar uma
                            decisão, paramos aí.
                          </p>
                      </div>
                      <div className="text-center">
                        <CommercialIntentTrigger
                          ctaId="review_three_accounts"
                          location="review_section"
                          label="Revisar 3 contas comigo"
                          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                        >
                          Revisar 3 contas comigo
                          <ArrowRight size={16} />
                        </CommercialIntentTrigger>
                        <p className="mt-4 text-[13px] leading-[1.5] text-[#737a86]">
                          Sem integração agora. Você deixa seu contato e combinamos
                          quais 3 casos revisar.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FINAL */}
              <section
                className="py-[68px] sm:py-[82px]"
                data-analytics-section="final_cta"
              >
                <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
                  <div className="grid items-center gap-8 rounded-[36px] bg-[#3568f5] p-7 text-white sm:p-[52px] lg:grid-cols-[1fr_auto]">
                    <div>
                      <h2 className="m-0 max-w-[840px] text-[38px] font-black leading-[1.02] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                        Entenda a história enquanto ainda existe espaço para mudar
                        o final.
                      </h2>

                      <p className="mt-3 max-w-[760px] text-[17px] leading-[1.55] text-[#dce5ff]">
                        O Ohrly não promete adivinhar churn. Ele torna a trajetória
                        da relação legível e mostra quando esperar começa a reduzir
                        as opções do time.
                      </p>
                    </div>

                    <CommercialIntentTrigger
                      ctaId="final_review"
                      location="final_cta"
                      label="Revisar 3 contas"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-5 font-extrabold text-[#0b0d12] shadow-[0_6px_0_#163aa8] transition hover:-translate-y-px"
                    >
                      Revisar 3 contas
                      <ArrowRight size={16} />
                    </CommercialIntentTrigger>
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
