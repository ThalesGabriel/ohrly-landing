"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { CommercialIntentTrigger } from "@/components/commercial-intent-modal";

type TabKey = "history" | "relationship" | "renewal" | "intervention";

const tabs: Array<{
  key: TabKey;
  label: string;
  question: string;
}> = [
  {
    key: "history",
    label: "História",
    question: "Como essa conta chegou até aqui?",
  },
  {
    key: "relationship",
    label: "Relação",
    question: "Quem ainda sustenta essa relação?",
  },
  {
    key: "renewal",
    label: "Renovação",
    question: "Quando esperar deixou de ser neutro?",
  },
  {
    key: "intervention",
    label: "Intervenção",
    question: "Ainda existe espaço para agir?",
  },
];

const timeline = [
  {
    date: "74 dias",
    title: "Uso saudável",
    body: "Champion concentra 81% das interações.",
    tone: "neutral",
  },
  {
    date: "51 dias",
    title: "A relação começa a mudar",
    body: "Champion reduz presença nas reuniões.",
    tone: "warn",
  },
  {
    date: "36 dias",
    title: "Champion sai da empresa",
    body: "Nenhum outro sponsor ativo.",
    tone: "risk",
  },
  {
    date: "18 dias",
    title: "Novo stakeholder aparece",
    body: "O uso continua. O economic buyer segue sem relação com o time.",
    tone: "warn",
  },
  {
    date: "hoje",
    title: "Score continua verde",
    body: "O produto parece saudável. A estrutura que sustentava a renovação não.",
    tone: "risk",
  },
] as const;

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

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.08em] text-[#3568f5]">
      <span className="h-[3px] w-6 rounded-full bg-[#3568f5]" />
      {children}
    </div>
  );
}

function Tiny({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold uppercase tracking-[.06em] text-[#87909d]">
      {children}
    </div>
  );
}

function StatusRow({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "warn" | "risk";
}) {
  const toneClass = {
    neutral: "text-[#0b0d12]",
    good: "text-[#18794e]",
    warn: "text-[#a15c00]",
    risk: "text-[#b42318]",
  }[tone];

  return (
    <div className="flex items-center justify-between gap-5 border-t border-[#e7e9ef] py-3 first:border-t-0">
      <span className="text-[13px] text-[#737b87]">{label}</span>
      <strong className={`text-right text-[13px] ${toneClass}`}>{value}</strong>
    </div>
  );
}

function HistoryTab() {
  return (
    <div>
      <div className="relative ml-2 border-l-2 border-[#dde3ee] pl-7">
        {timeline.map((item) => (
          <div key={`${item.date}-${item.title}`} className="relative pb-5 last:pb-0">
            <span
              className={`absolute -left-[35px] top-1 size-3 rounded-full border-[3px] bg-white ${
                item.tone === "risk"
                  ? "border-[#b42318]"
                  : item.tone === "warn"
                    ? "border-[#a15c00]"
                    : "border-[#3568f5]"
              }`}
            />
            <Tiny>{item.date}</Tiny>
            <div className="mt-1 text-[15px] font-black text-[#0b0d12]">
              {item.title}
            </div>
            <p className="mt-1 text-[13px] leading-[1.45] text-[#606773]">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <Callout>
        <strong>O score não estava errado.</strong> Ele continuava refletindo
        sinais que ainda estavam saudáveis. A relação, porém, já tinha mudado.
      </Callout>
    </div>
  );
}

function RelationshipTab() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <Stakeholder
          initials="PU"
          role="Power user"
          detail="Uso operacional recorrente"
          state="ativo"
          tone="good"
        />
        <Stakeholder
          initials="CH"
          role="Champion"
          detail="Concentrava 81% das interações"
          state="saiu há 36 dias"
          tone="risk"
        />
        <Stakeholder
          initials="SP"
          role="Executive sponsor"
          detail="Nenhuma nova relação estabelecida"
          state="sem contato"
          tone="warn"
        />
        <Stakeholder
          initials="EB"
          role="Economic buyer"
          detail="Não participa da relação atual"
          state="sem relação"
          tone="risk"
        />
      </div>

      <Callout>
        <strong>O cliente adotou o produto — ou uma pessoa adotou o produto?</strong>{" "}
        A conta pode continuar usando enquanto sua cobertura relacional se torna
        cada vez mais frágil.
      </Callout>
    </div>
  );
}

function Stakeholder({
  initials,
  role,
  detail,
  state,
  tone,
}: {
  initials: string;
  role: string;
  detail: string;
  state: string;
  tone: "good" | "warn" | "risk";
}) {
  const toneClass = {
    good: "bg-[#eaf8f1] text-[#18794e]",
    warn: "bg-[#fff5e9] text-[#a15c00]",
    risk: "bg-[#fff1f0] text-[#b42318]",
  }[tone];

  return (
    <div className="rounded-[18px] border border-[#e7e9ef] bg-white p-4">
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#edf2ff] text-[12px] font-black text-[#3568f5]">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <strong className="text-[14px] text-[#0b0d12]">{role}</strong>
            <span
              className={`rounded-full px-2 py-1 text-[10px] font-black ${toneClass}`}
            >
              {state}
            </span>
          </div>
          <p className="mt-1.5 text-[12px] leading-[1.4] text-[#727b87]">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

function RenewalTab() {
  return (
    <div className="grid gap-4 lg:grid-cols-[.9fr_1.1fr]">
      <div className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
        <Tiny>Próxima decisão</Tiny>
        <div className="mt-2 text-[54px] font-black tracking-[-0.06em] text-[#0b0d12]">
          24
        </div>
        <strong className="text-[14px] text-[#0b0d12]">
          dias até renovação
        </strong>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-[#edf0f5]">
          <div className="h-full w-[78%] rounded-full bg-[#3568f5]" />
        </div>

        <p className="mt-4 text-[13px] leading-[1.5] text-[#606773]">
          A mesma fragilidade relacional teria outro peso se a próxima decisão
          estivesse a 120 dias.
        </p>
      </div>

      <div className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
        <Tiny>Contexto atual</Tiny>
        <div className="mt-3">
          <StatusRow label="Health Score" value="78 · saudável" tone="good" />
          <StatusRow label="Uso" value="estável" tone="good" />
          <StatusRow label="Champion" value="saiu há 36 dias" tone="risk" />
          <StatusRow label="Economic buyer" value="sem relação" tone="risk" />
          <StatusRow label="Última resposta" value="17 dias" tone="warn" />
        </div>
      </div>

      <div className="lg:col-span-2">
        <Callout>
          <strong>Quando esperar deixou de ser neutro?</strong> O Ohrly coloca o
          relógio da decisão sobre a trajetória para tornar essa mudança de
          contexto visível.
        </Callout>
      </div>
    </div>
  );
}

function InterventionTab() {
  const rows = [
    {
      date: "05 ago",
      title: "CSM tenta contato com novo sponsor",
      result: "sem resposta",
      tone: "warn",
    },
    {
      date: "08 ago",
      title: "Novo follow-up",
      result: "sem resposta",
      tone: "risk",
    },
    {
      date: "12 ago",
      title: "Usuário operacional indica novo contato",
      result: "novo caminho",
      tone: "good",
    },
    {
      date: "18 ago",
      title: "Economic buyer segue inacessível",
      result: "ciclo aberto",
      tone: "warn",
    },
  ] as const;

  return (
    <div>
      <div className="grid gap-2.5">
        {rows.map((row) => {
          const badgeClass =
            row.tone === "good"
              ? "bg-[#eaf8f1] text-[#18794e]"
              : row.tone === "risk"
                ? "bg-[#fff1f0] text-[#b42318]"
                : "bg-[#fff5e9] text-[#a15c00]";

          return (
            <div
              key={`${row.date}-${row.title}`}
              className="grid gap-3 rounded-[18px] border border-[#e7e9ef] bg-white p-4 sm:grid-cols-[82px_1fr_auto] sm:items-center"
            >
              <Tiny>{row.date}</Tiny>
              <strong className="text-[13px] text-[#0b0d12]">
                {row.title}
              </strong>
              <span
                className={`w-fit rounded-full px-2.5 py-1.5 text-[10px] font-black ${badgeClass}`}
              >
                {row.result}
              </span>
            </div>
          );
        })}
      </div>

      <Callout>
        <strong>O Ohrly não diz que a intervenção causou o resultado.</strong>{" "}
        Ele preserva o que o time fez e acompanha o que aconteceu depois, para
        que a história não desapareça entre CRM, reuniões e memória individual.
      </Callout>
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] p-4 text-[13px] leading-[1.5] text-[#26334f]">
      {children}
    </div>
  );
}

function DemoPanel({ tab }: { tab: TabKey }) {
  if (tab === "history") return <HistoryTab />;
  if (tab === "relationship") return <RelationshipTab />;
  if (tab === "renewal") return <RenewalTab />;
  return <InterventionTab />;
}

export default function DemoClient() {
  const [activeTab, setActiveTab] = useState<TabKey>("history");
  const currentTab = tabs.find((tab) => tab.key === activeTab) ?? tabs[0];

  return (
    <div className="min-h-screen bg-white text-[#0b0d12]">
      <header className="sticky top-0 z-50 border-b border-[#e7e9ef]/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[70px] w-[min(1080px,calc(100%_-_32px))] items-center justify-between gap-4">
          <Link
            href="/"
            aria-label="Ohrly"
            data-analytics-cta="demo_nav_logo"
            data-analytics-location="demo_navigation"
          >
            <Brand />
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="hidden min-h-10 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-4 text-[13px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px sm:inline-flex"
              data-analytics-cta="demo_back_home"
              data-analytics-location="demo_navigation"
            >
              <ArrowLeft size={14} />
              Voltar ao site
            </Link>

            <CommercialIntentTrigger
              ctaId="demo_nav_review_accounts"
              location="demo_navigation"
              label="Solicitar revisão de 3 contas"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-4 text-[13px] font-extrabold text-white shadow-[0_5px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_7px_0_#3568f5]"
            >
              Revisar 3 contas
            </CommercialIntentTrigger>
          </div>
        </div>
      </header>

      <main>
        <section
          className="relative overflow-hidden pb-8 pt-10 sm:pb-10 sm:pt-14"
          data-analytics-section="demo_hero"
        >
          <div className="pointer-events-none absolute right-[-260px] top-[-50px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.13),rgba(53,104,245,0)_68%)]" />

          <div className="relative mx-auto w-[min(940px,calc(100%_-_32px))] text-center">
            <Eyebrow>Demo interativa</Eyebrow>

            <h1 className="mx-auto mt-4 max-w-[850px] text-[40px] font-black leading-[1.01] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]">
              Com tantos sinais verdes,{" "}
              <span className="text-[#3568f5]">
                como esse contrato não renovou?
              </span>
            </h1>

            <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-[1.55] text-[#4b5360] sm:text-[18px]">
              Uso saudável. Suporte normal. Score verde.{" "}
              <strong className="font-black text-[#0b0d12]">
                Mas a relação que sustentava a renovação já tinha mudado.
              </strong>
            </p>
          </div>
        </section>

        <section
          className="pb-10 sm:pb-14"
          data-analytics-section="demo_workspace"
        >
          <div className="mx-auto w-[min(1080px,calc(100%_-_32px))]">
            <div className="overflow-hidden rounded-[28px] border border-[#e7e9ef] bg-white shadow-[0_22px_70px_rgba(11,13,18,.08)]">
              <div className="grid gap-5 border-b border-[#e7e9ef] p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <Tiny>Acme Cloud · relação em revisão</Tiny>
                  <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <h2 className="text-[26px] font-black tracking-[-0.04em]">
                      Health Score 78
                    </h2>
                    <span className="mb-1 rounded-full bg-[#eaf8f1] px-2.5 py-1 text-[11px] font-black text-[#18794e]">
                      saudável
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-[1.45] text-[#69727f]">
                    Renovação em 24 dias · uso estável · suporte normal
                  </p>
                </div>

                <div className="rounded-[16px] border border-[#dfe7ff] bg-[#f4f7ff] px-4 py-3 text-[12px] leading-[1.4] text-[#334362]">
                  <strong>O score não estava errado.</strong>
                  <br />
                  A relação mudou.
                </div>
              </div>

              <div className="border-b border-[#e7e9ef] bg-[#fbfcfe] px-3 pt-3 sm:px-5 sm:pt-4">
                <div className="flex gap-1.5 overflow-x-auto pb-3">
                  {tabs.map((tab) => (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setActiveTab(tab.key)}
                      data-analytics-cta={`demo_tab_${tab.key}`}
                      data-analytics-location="demo_tabs"
                      aria-pressed={activeTab === tab.key}
                      className={`shrink-0 rounded-full border px-4 py-2.5 text-[12px] font-black transition ${
                        activeTab === tab.key
                          ? "border-[#0b0d12] bg-[#0b0d12] text-white"
                          : "border-[#e3e6ec] bg-white text-[#535b67] hover:bg-[#f5f7fb]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="mb-5">
                  <Tiny>{currentTab.label}</Tiny>
                  <h3 className="mt-1 text-[24px] font-black tracking-[-0.035em] sm:text-[28px]">
                    {currentTab.question}
                  </h3>
                </div>

                <DemoPanel tab={activeTab} />
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-t border-[#e7e9ef] bg-[#f6f8fc] py-10 sm:py-12"
          data-analytics-section="demo_final_cta"
        >
          <div className="mx-auto grid w-[min(940px,calc(100%_-_32px))] items-center gap-6 rounded-[28px] bg-[#3568f5] p-6 text-white sm:p-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-[28px] font-black leading-[1.04] tracking-[-0.045em] sm:text-[34px]">
                Quer saber se essa leitura aparece nas suas contas?
              </h2>
              <p className="mt-2 max-w-[650px] text-[14px] leading-[1.5] text-[#dce5ff]">
                Traga uma que churnou de surpresa, uma que o time tentou
                recuperar e uma que preocupa vocês agora.
              </p>
            </div>

            <CommercialIntentTrigger
              ctaId="demo_final_review_accounts"
              location="demo_final_cta"
              label="Solicitar revisão de 3 contas"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-5 font-extrabold text-[#0b0d12] shadow-[0_6px_0_#0d2e9f] transition hover:-translate-y-px"
            >
              Solicitar revisão
              <ArrowRight size={16} />
            </CommercialIntentTrigger>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7e9ef] py-8">
        <div className="mx-auto flex w-[min(1080px,calc(100%_-_32px))] flex-col items-start justify-between gap-4 text-[12px] text-[#727a86] sm:flex-row sm:items-center">
          <Brand />
          <div>Demo de produto · protótipo comercial</div>
        </div>
      </footer>
    </div>
  );
}
