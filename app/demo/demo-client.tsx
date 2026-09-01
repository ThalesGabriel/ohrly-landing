"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { CommercialIntentTrigger } from "@/components/commercial-intent-modal";

type AccountKey = "acme" | "northstar" | "luma";

type FeatureKey =
  | "timeline"
  | "change"
  | "coverage"
  | "cycle"
  | "renewal"
  | "intervention"
  | "response"
  | "memory"
  | "business";

type Tone = "normal" | "warn" | "risk" | "recovery";

type Account = {
  name: string;
  renewal: number;
  score: number;
  use: string;
  support: string;
  adoption: string;
  champion: string;
  sponsor: string;
  buyer: string;
  concentration: string;
  cycle: string;
  cycleProgress: number;
  story: Array<{
    date: string;
    title: string;
    body: string;
    tone: Tone;
  }>;
};

const accounts: Record<AccountKey, Account> = {
  acme: {
    name: "Acme Cloud",
    renewal: 27,
    score: 72,
    use: "saudável",
    support: "normal",
    adoption: "crescendo",
    champion: "saiu há 36 dias",
    sponsor: "sem contato",
    buyer: "nenhuma relação",
    concentration: "81%",
    cycle: "fragilidade relacional",
    cycleProgress: 76,
    story: [
      {
        date: "74 dias",
        title: "Uso saudável",
        body: "Champion concentra 81% das interações.",
        tone: "normal",
      },
      {
        date: "51 dias",
        title: "Mudança relacional",
        body: "Champion reduz presença nas reuniões.",
        tone: "warn",
      },
      {
        date: "36 dias",
        title: "Champion saiu",
        body: "Nenhum outro sponsor ativo.",
        tone: "risk",
      },
      {
        date: "18 dias",
        title: "Novo stakeholder",
        body: "Novo contato aparece, ainda sem economic buyer.",
        tone: "warn",
      },
      {
        date: "hoje",
        title: "Uso continua saudável",
        body: "Estrutura da relação segue frágil.",
        tone: "normal",
      },
    ],
  },
  northstar: {
    name: "Northstar",
    renewal: 94,
    score: 41,
    use: "↓ há 3 semanas",
    support: "normal",
    adoption: "caindo",
    champion: "ativo",
    sponsor: "ativo",
    buyer: "contato recente",
    concentration: "46%",
    cycle: "deterioração de adoção",
    cycleProgress: 48,
    story: [
      {
        date: "63 dias",
        title: "Uso estável",
        body: "Padrão compatível com baseline histórico.",
        tone: "normal",
      },
      {
        date: "31 dias",
        title: "Primeira queda",
        body: "Uso semanal começa a cair.",
        tone: "warn",
      },
      {
        date: "21 dias",
        title: "Persistência",
        body: "Queda permanece por três semanas.",
        tone: "risk",
      },
      {
        date: "9 dias",
        title: "Champion responde",
        body: "Relata mudança interna de prioridade.",
        tone: "warn",
      },
      {
        date: "hoje",
        title: "Acesso preservado",
        body: "Sponsor e champion continuam ativos.",
        tone: "normal",
      },
    ],
  },
  luma: {
    name: "Luma",
    renewal: 18,
    score: 43,
    use: "estável",
    support: "normal",
    adoption: "estável",
    champion: "saiu há 37 dias",
    sponsor: "sem relação",
    buyer: "nenhuma relação",
    concentration: "88%",
    cycle: "descontinuidade de sponsor",
    cycleProgress: 88,
    story: [
      {
        date: "71 dias",
        title: "Uso estável",
        body: "Champion concentra a maior parte do relacionamento.",
        tone: "normal",
      },
      {
        date: "45 dias",
        title: "Menos presença",
        body: "Champion começa a faltar a checkpoints.",
        tone: "warn",
      },
      {
        date: "37 dias",
        title: "Champion saiu",
        body: "Conta perde seu principal defensor interno.",
        tone: "risk",
      },
      {
        date: "25 dias",
        title: "Novo contato",
        body: "Usuário operacional mantém uso do produto.",
        tone: "warn",
      },
      {
        date: "hoje",
        title: "Uso ainda estável",
        body: "Nenhum relacionamento com economic buyer.",
        tone: "risk",
      },
    ],
  },
};

const featureOrder: FeatureKey[] = [
  "timeline",
  "change",
  "coverage",
  "cycle",
  "renewal",
  "intervention",
  "response",
  "memory",
  "business",
];

const featureMeta: Record<
  FeatureKey,
  {
    number: string;
    label: string;
    short: string;
    eyebrow: string;
    title: string;
    description: string;
    footnote: string;
    beta?: boolean;
  }
> = {
  timeline: {
    number: "01",
    label: "Timeline",
    short: "Como chegamos até aqui?",
    eyebrow: "Relationship timeline",
    title: "Como essa relação chegou até aqui?",
    description:
      "Em vez de olhar apenas o estado atual, reconstrua os principais eventos e mudanças da relação.",
    footnote:
      "A timeline organiza evidências; ela não presume causalidade.",
  },
  change: {
    number: "02",
    label: "What changed",
    short: "O que deixou de ser normal?",
    eyebrow: "What changed",
    title: "O que deixou de ser normal?",
    description:
      "Compare sinais atuais com o comportamento esperado da própria relação e identifique mudanças persistentes.",
    footnote:
      "Normalidade é contextual: a comparação relevante é com o histórico da relação e seu contexto.",
  },
  coverage: {
    number: "03",
    label: "Stakeholder coverage",
    short: "Quem sustenta a relação?",
    eyebrow: "Stakeholder coverage",
    title: "Quem sustenta essa relação hoje?",
    description:
      "Torne visível concentração de contato, perda de champion e ausência de sponsor ou economic buyer.",
    footnote:
      "Cobertura relacional é uma hipótese comercial forte em validação para SaaS B2B.",
  },
  cycle: {
    number: "04",
    label: "Relationship cycle",
    short: "Que episódio está acontecendo?",
    eyebrow: "Relationship cycle",
    title: "Que episódio essa relação está vivendo?",
    description:
      "Transforme mudanças soltas em um ciclo legível: início, persistência, intervenção, recuperação ou recaída.",
    footnote:
      "O ciclo organiza a trajetória; ele não é o mesmo objeto que um risco de churn.",
  },
  renewal: {
    number: "05",
    label: "Renewal context",
    short: "Quando esperar deixa de ser neutro?",
    eyebrow: "Renewal context",
    title: "Quando esperar deixa de ser neutro?",
    description:
      "Coloque o relógio da decisão sobre a trajetória para entender quando a mesma mudança ganha urgência diferente.",
    footnote:
      "A renovação é um contexto de decisão; não é tratada como causa do comportamento.",
  },
  intervention: {
    number: "06",
    label: "Intervention",
    short: "O que o time fez?",
    eyebrow: "Intervention log",
    title: "O que o time fez durante o ciclo?",
    description:
      "Marque intervenções humanas para que a história da relação não seja perdida entre CRM, reuniões e memória individual.",
    footnote:
      "Registrar intervenção não significa afirmar que ela causou o resultado posterior.",
  },
  response: {
    number: "07",
    label: "Response",
    short: "O que aconteceu depois?",
    eyebrow: "Observed response",
    title: "O que aconteceu depois da ação?",
    description:
      "Acompanhe persistência, recuperação, recaída ou surgimento de um novo padrão após a intervenção.",
    footnote:
      "Ohrly observa resposta temporal; causalidade exige evidência adicional.",
  },
  memory: {
    number: "08",
    label: "Memory",
    short: "Isso já aconteceu antes?",
    eyebrow: "Cycle memory",
    title: "Isso já aconteceu antes?",
    description:
      "Recupere episódios passados da mesma conta e ciclos semelhantes para acumular memória operacional.",
    footnote:
      "Similaridade histórica precisa continuar explicável: por que este ciclo se parece com aquele?",
  },
  business: {
    number: "+",
    label: "Business context",
    short: "O que esta relação representa?",
    eyebrow: "Business context",
    title: "O que essa relação representa para a empresa?",
    description:
      "ARR, margem, cost-to-serve, ICP e importância estratégica podem alterar a decisão de intervenção.",
    footnote:
      "Essa camada ainda é hipótese de produto e deve ser validada antes de ser tratada como feature consolidada.",
    beta: true,
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

function Tiny({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] font-extrabold uppercase tracking-[.05em] text-[#8d97aa]">
      {children}
    </div>
  );
}

function Snapshot({ account }: { account: Account }) {
  const cards = [
    { label: "Health Score", value: String(account.score), tone: "neutral" },
    { label: "Uso", value: account.use, tone: "good" },
    { label: "Champion", value: account.champion, tone: "warn" },
    { label: "Renovação", value: `${account.renewal} dias`, tone: "warn" },
  ] as const;

  return (
    <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-[18px] border border-[#e7e9ef] bg-white p-[15px]"
        >
          <div className="text-[11px] font-extrabold uppercase tracking-[.05em] text-[#7a8390]">
            {card.label}
          </div>
          <strong
            className={`mt-2 block text-[18px] font-black tracking-[-0.03em] ${
              card.tone === "good"
                ? "text-[#18794e]"
                : card.tone === "warn"
                  ? "text-[#a15c00]"
                  : "text-[#0b0d12]"
            }`}
          >
            {card.value}
          </strong>
        </div>
      ))}
    </div>
  );
}

function TimelineView({ account }: { account: Account }) {
  return (
    <>
      <Snapshot account={account} />
      <div className="relative ml-2 border-l-2 border-[#dde3ee] pl-7">
        {account.story.map((item) => (
          <div key={`${item.date}-${item.title}`} className="relative pb-[18px]">
            <span
              className={`absolute -left-[35px] top-1 size-3 rounded-full border-[3px] bg-white ${
                item.tone === "risk"
                  ? "border-[#b42318]"
                  : item.tone === "recovery"
                    ? "border-[#18794e]"
                    : "border-[#3568f5]"
              }`}
            />
            <Tiny>{item.date}</Tiny>
            <div className="mt-1 text-[15px] font-black text-[#0b0d12]">
              {item.title}
            </div>
            <div className="mt-1 text-[13px] leading-[1.45] text-[#606773]">
              {item.body}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Sparkline({
  falling = false,
  stroke = "#3568f5",
}: {
  falling?: boolean;
  stroke?: string;
}) {
  const points = falling
    ? "0,18 45,20 90,21 135,24 180,31 225,41 300,47"
    : "0,30 45,28 90,31 135,27 180,29 225,28 300,30";

  return (
    <div className="relative h-[52px] overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(53,104,245,.09),rgba(53,104,245,0))]">
      <svg viewBox="0 0 300 60" preserveAspectRatio="none" className="h-full w-full">
        <polyline
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          points={points}
        />
      </svg>
    </div>
  );
}

function SignalCard({
  label,
  value,
  tone,
  falling,
  stroke,
}: {
  label: string;
  value: string;
  tone: "good" | "warn" | "bad";
  falling?: boolean;
  stroke?: string;
}) {
  const toneClass =
    tone === "good"
      ? "bg-[#eaf8f1] text-[#18794e]"
      : tone === "warn"
        ? "bg-[#fff5e9] text-[#a15c00]"
        : "bg-[#fff1f0] text-[#b42318]";

  return (
    <div className="rounded-[18px] border border-[#e7e9ef] bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h4 className="text-[15px] font-black text-[#0b0d12]">{label}</h4>
        <span
          className={`rounded-full px-2 py-1.5 text-[11px] font-black ${toneClass}`}
        >
          {value}
        </span>
      </div>
      <Sparkline falling={falling} stroke={stroke} />
    </div>
  );
}

function ChangeView({ account }: { account: Account }) {
  const championLost = account.champion.includes("saiu");
  const buyerMissing = account.buyer.includes("nenhuma");

  return (
    <>
      <Snapshot account={account} />
      <div className="grid gap-3 lg:grid-cols-2">
        <SignalCard
          label="Uso do produto"
          value={account.use}
          tone={account.use.includes("↓") ? "bad" : "good"}
          falling={account.use.includes("↓")}
        />
        <SignalCard
          label="Presença do champion"
          value={account.champion}
          tone={championLost ? "bad" : "good"}
          falling={championLost}
          stroke="#b42318"
        />
        <SignalCard
          label="Suporte"
          value={account.support}
          tone="good"
          stroke="#18794e"
        />
        <SignalCard
          label="Cobertura relacional"
          value={account.buyer}
          tone={buyerMissing ? "bad" : "warn"}
          falling={buyerMissing}
          stroke="#a15c00"
        />
      </div>

      <InfoCallout>
        <strong>Leitura:</strong> o sinal mais relevante não precisa ser o mais
        vermelho; é a combinação de mudanças que altera a história da relação.
      </InfoCallout>
    </>
  );
}

function CoverageDots({
  count,
  tone = "blue",
}: {
  count: number;
  tone?: "blue" | "red" | "amber";
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className={`size-[7px] rounded-full ${
            index < count
              ? tone === "red"
                ? "bg-[#b42318]"
                : tone === "amber"
                  ? "bg-[#a15c00]"
                  : "bg-[#3568f5]"
              : "bg-[#dce2ec]"
          }`}
        />
      ))}
    </div>
  );
}

function Stakeholder({
  initials,
  role,
  detail,
  coverage,
  tone,
}: {
  initials: string;
  role: string;
  detail: string;
  coverage: number;
  tone?: "blue" | "red" | "amber";
}) {
  return (
    <div className="grid grid-cols-[42px_1fr_auto] items-center gap-3 rounded-[18px] border border-[#e7e9ef] bg-white p-4">
      <div className="grid size-[42px] place-items-center rounded-full bg-[#edf2ff] text-sm font-black text-[#3568f5]">
        {initials}
      </div>
      <div>
        <h4 className="text-sm font-black text-[#0b0d12]">{role}</h4>
        <p className="mt-1 text-xs text-[#7a8390]">{detail}</p>
      </div>
      <CoverageDots count={coverage} tone={tone} />
    </div>
  );
}

function CoverageView({ account }: { account: Account }) {
  const championLost = account.champion.includes("saiu");
  const sponsorWeak = account.sponsor.includes("sem");
  const buyerWeak = account.buyer.includes("nenhuma");

  return (
    <>
      <div className="grid gap-3 lg:grid-cols-2">
        <Stakeholder
          initials="PU"
          role="Power user"
          detail="Uso operacional recorrente"
          coverage={5}
        />
        <Stakeholder
          initials="CH"
          role="Champion"
          detail={account.champion}
          coverage={championLost ? 1 : 5}
          tone={championLost ? "red" : "blue"}
        />
        <Stakeholder
          initials="SP"
          role="Executive sponsor"
          detail={account.sponsor}
          coverage={sponsorWeak ? 1 : 4}
          tone={sponsorWeak ? "amber" : "blue"}
        />
        <Stakeholder
          initials="EB"
          role="Economic buyer"
          detail={account.buyer}
          coverage={buyerWeak ? 0 : 3}
          tone={buyerWeak ? "red" : "blue"}
        />
      </div>

      <InfoCallout>
        <strong>Concentração da relação: {account.concentration}.</strong>{" "}
        Quanto maior a dependência de poucas pessoas, mais frágil pode ser a
        continuidade mesmo quando uso e suporte permanecem normais.
      </InfoCallout>
    </>
  );
}

function CycleRow({
  label,
  width,
  status,
  active = false,
}: {
  label: string;
  width: number;
  status: string;
  active?: boolean;
}) {
  return (
    <div
      className={`grid gap-3 rounded-2xl border p-3.5 sm:grid-cols-[150px_1fr_auto] sm:items-center ${
        active
          ? "border-[#bfcfff] bg-[#f6f8ff]"
          : "border-[#e7e9ef] bg-white"
      }`}
    >
      <div className="text-[13px] font-black text-[#0b0d12]">{label}</div>
      <div className="h-2 overflow-hidden rounded-full bg-[#edf0f5]">
        <div
          className="h-full rounded-full bg-[#3568f5]"
          style={{ width: `${width}%` }}
        />
      </div>
      <div className="text-[11px] font-black text-[#6a7380]">{status}</div>
    </div>
  );
}

function CycleView({
  account,
  accountKey,
}: {
  account: Account;
  accountKey: AccountKey;
}) {
  const p = account.cycleProgress;
  const northstar = accountKey === "northstar";

  return (
    <>
      <div className="grid gap-2.5">
        <CycleRow label="Normalidade" width={100} status="baseline" />
        <CycleRow
          label="Mudança"
          width={Math.max(35, p - 25)}
          status="detectada"
          active
        />
        <CycleRow
          label="Persistência"
          width={p}
          status={p > 70 ? "alta" : "moderada"}
          active
        />
        <CycleRow
          label="Intervenção"
          width={northstar ? 15 : 55}
          status={northstar ? "pendente" : "em andamento"}
        />
        <CycleRow
          label="Resposta"
          width={northstar ? 8 : 30}
          status={northstar ? "não observada" : "inconclusiva"}
        />
      </div>

      <div className="mt-4 rounded-[18px] bg-[#111722] p-4 text-[#dfe6f4]">
        <strong className="text-white">
          Ciclo atual: {account.cycle}.
        </strong>
        <p className="mt-1.5 text-[13px] leading-[1.5] text-[#aeb9ca]">
          O objetivo não é criar mais um score, mas acompanhar em qual episódio
          a relação está e como ele evolui.
        </p>
      </div>
    </>
  );
}

function RenewalView({ account }: { account: Account }) {
  const urgency =
    account.renewal <= 30 ? "alta" : account.renewal <= 60 ? "moderada" : "baixa";

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Próxima decisão</Tiny>
          <div className="mt-3 text-[46px] font-black tracking-[-0.05em] text-[#0b0d12]">
            {account.renewal}
          </div>
          <strong className="text-sm text-[#0b0d12]">
            dias até renovação
          </strong>

          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-[#edf0f5]">
            <div
              className="h-full rounded-full bg-[#3568f5]"
              style={{ width: `${Math.max(10, 100 - account.renewal)}%` }}
            />
          </div>

          <p className="mt-4 text-[13px] leading-[1.48] text-[#606773]">
            Urgência temporal: <strong>{urgency}</strong>.
          </p>
        </div>

        <div className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Contexto da relação</Tiny>
          <h4 className="mt-[18px] text-xl font-black tracking-[-0.03em]">
            {account.cycle}
          </h4>
          <p className="mt-4 text-[13px] text-[#606773]">
            Uso: <strong className="text-[#0b0d12]">{account.use}</strong>
          </p>
          <p className="mt-2 text-[13px] text-[#606773]">
            Champion:{" "}
            <strong className="text-[#0b0d12]">{account.champion}</strong>
          </p>
          <p className="mt-2 text-[13px] text-[#606773]">
            Economic buyer:{" "}
            <strong className="text-[#0b0d12]">{account.buyer}</strong>
          </p>
        </div>
      </div>

      <InfoCallout>
        <strong>Quando esperar deixa de ser neutro?</strong> A mesma mudança pode
        permitir investigação calma a 94 dias da renovação e exigir atenção
        imediata a 18 dias.
      </InfoCallout>
    </>
  );
}

function InterventionRow({
  date,
  title,
  body,
  state,
}: {
  date: string;
  title: string;
  body: string;
  state: "none" | "warn" | "good";
}) {
  const stateClass =
    state === "good"
      ? "bg-[#eaf8f1] text-[#18794e]"
      : state === "warn"
        ? "bg-[#fff5e9] text-[#a15c00]"
        : "bg-[#f3f4f6] text-[#6b7280]";

  const label =
    state === "good" ? "sinal positivo" : state === "warn" ? "aguardando" : "sem resposta";

  return (
    <div className="grid gap-3 rounded-[18px] border border-[#e7e9ef] bg-white p-4 sm:grid-cols-[92px_1fr_auto] sm:items-start">
      <Tiny>{date}</Tiny>
      <div>
        <strong className="block text-sm text-[#0b0d12]">{title}</strong>
        <span className="mt-1 block text-xs leading-[1.4] text-[#69727f]">
          {body}
        </span>
      </div>
      <span
        className={`w-fit rounded-full px-2.5 py-1.5 text-[11px] font-black ${stateClass}`}
      >
        {label}
      </span>
    </div>
  );
}

function InterventionView({ accountKey }: { accountKey: AccountKey }) {
  if (accountKey === "northstar") {
    return (
      <>
        <InterventionRow
          date="hoje"
          title="Intervenção ainda não registrada"
          body="O time ainda está na fase de investigação."
          state="none"
        />
        <InfoCallout>
          <strong>Por que registrar intervenção?</strong> Para preservar a
          conexão entre o ciclo observado, o que o time fez e o que aconteceu
          depois.
        </InfoCallout>
      </>
    );
  }

  return (
    <>
      <div className="grid gap-2.5">
        <InterventionRow
          date="12 ago"
          title="Contato com novo sponsor"
          body="CSM tenta reconstruir a relação após a saída do champion."
          state="warn"
        />
        <InterventionRow
          date="14 ago"
          title="Follow-up"
          body="Nenhuma resposta do novo sponsor."
          state="none"
        />
        <InterventionRow
          date="18 ago"
          title="Introdução de novo contato"
          body="Usuário operacional indica possível decisor interno."
          state="warn"
        />
      </div>

      <InfoCallout>
        <strong>Por que registrar intervenção?</strong> Porque sem esse marco a
        organização perde a conexão entre o ciclo observado, o que o time fez e
        o que aconteceu depois.
      </InfoCallout>
    </>
  );
}

function ResponseView({ accountKey }: { accountKey: AccountKey }) {
  if (accountKey === "northstar") {
    return (
      <InfoCallout>
        <strong>Ainda não há resposta observável.</strong> Esta conta serve para
        mostrar que Ohrly não precisa inventar uma conclusão quando o ciclo
        ainda está aberto.
      </InfoCallout>
    );
  }

  return (
    <>
      <div className="grid gap-2.5">
        <InterventionRow
          date="12 ago"
          title="Contato com novo sponsor"
          body="Intervenção registrada."
          state="warn"
        />
        <InterventionRow
          date="14 ago"
          title="Nenhuma resposta"
          body="A fragilidade relacional persiste."
          state="none"
        />
        <InterventionRow
          date="18 ago"
          title="Novo contato introduzido"
          body="Primeiro sinal de reconstrução de cobertura."
          state="good"
        />
      </div>

      <InfoCallout>
        <strong>Leitura:</strong> o produto observa o que aconteceu depois. Ele
        pode mostrar recuperação, persistência ou recaída sem atribuir
        automaticamente causalidade à ação do time.
      </InfoCallout>
    </>
  );
}

function MemoryView() {
  return (
    <>
      <div className="grid gap-3 lg:grid-cols-2">
        <div className="rounded-[18px] border border-[#e7e9ef] bg-white p-4">
          <span className="inline-flex rounded-full bg-[#edf2ff] px-2 py-1.5 text-[10px] font-black text-[#3568f5]">
            82% semelhante
          </span>
          <h4 className="mt-3 text-[15px] font-black">
            Perda de champion · ciclo anterior
          </h4>
          <p className="mt-1.5 text-xs leading-[1.45] text-[#69727f]">
            Conta manteve uso por 21 dias após perda do champion e recuperou
            cobertura depois de introdução executiva.
          </p>
          <div className="mt-3 border-t border-[#e7e9ef] pt-3 text-[11px] text-[#7d8591]">
            Mesma conta · 11 meses atrás
          </div>
        </div>

        <div className="rounded-[18px] border border-[#e7e9ef] bg-white p-4">
          <span className="inline-flex rounded-full bg-[#edf2ff] px-2 py-1.5 text-[10px] font-black text-[#3568f5]">
            74% semelhante
          </span>
          <h4 className="mt-3 text-[15px] font-black">
            Fragilidade relacional · família B
          </h4>
          <p className="mt-1.5 text-xs leading-[1.45] text-[#69727f]">
            Uso permaneceu estável, mas renovação deteriorou quando a relação
            ficou concentrada em um único usuário.
          </p>
          <div className="mt-3 border-t border-[#e7e9ef] pt-3 text-[11px] text-[#7d8591]">
            Família de ciclos · 7 casos históricos
          </div>
        </div>
      </div>

      <InfoCallout>
        <strong>Por que memória importa?</strong> Timeline explica o presente.
        Memória começa a responder se esse tipo de episódio já ocorreu e como
        terminou antes.
      </InfoCallout>
    </>
  );
}

function BusinessView({ account }: { account: Account }) {
  const cards = [
    ["ARR", "R$ 180k"],
    ["Margem estimada", "62%"],
    ["Cost-to-serve", "médio"],
    ["ICP fit", "alto"],
    ["Valor estratégico", "moderado"],
    ["Janela de decisão", `${account.renewal} dias`],
  ];

  return (
    <>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value]) => (
          <div
            key={label}
            className="rounded-[18px] border border-[#e7e9ef] bg-white p-4"
          >
            <div className="text-[11px] font-extrabold uppercase tracking-[.05em] text-[#89919c]">
              {label}
            </div>
            <strong className="mt-2 block text-lg font-black">{value}</strong>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[18px] border border-[#ffe0b4] bg-[#fff5e9] p-4 text-[13px] leading-[1.5] text-[#76501f]">
        <strong>Em validação:</strong> esta camada tenta responder não apenas “o
        que está acontecendo?”, mas “o que essa relação representa e vale a pena
        intervir agora?”. Ainda não tratamos isso como feature consolidada.
      </div>
    </>
  );
}

function InfoCallout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] p-4 text-sm leading-[1.5] text-[#26334f]">
      {children}
    </div>
  );
}

function DemoWorkspace({
  accountKey,
  featureKey,
}: {
  accountKey: AccountKey;
  featureKey: FeatureKey;
}) {
  const account = accounts[accountKey];

  if (featureKey === "timeline") return <TimelineView account={account} />;
  if (featureKey === "change") return <ChangeView account={account} />;
  if (featureKey === "coverage") return <CoverageView account={account} />;
  if (featureKey === "cycle")
    return <CycleView account={account} accountKey={accountKey} />;
  if (featureKey === "renewal") return <RenewalView account={account} />;
  if (featureKey === "intervention")
    return <InterventionView accountKey={accountKey} />;
  if (featureKey === "response")
    return <ResponseView accountKey={accountKey} />;
  if (featureKey === "memory") return <MemoryView />;
  return <BusinessView account={account} />;
}

function FeatureSummaryCard({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="rounded-[20px] border border-[#e7e9ef] bg-white p-[18px]">
      <div className="grid size-[34px] place-items-center rounded-[11px] bg-[#edf2ff] text-xs font-black text-[#3568f5]">
        {number}
      </div>
      <h3 className="mt-[18px] text-[15px] font-black">{title}</h3>
      <p className="mt-2 text-xs leading-[1.45] text-[#68717e]">{children}</p>
    </article>
  );
}

export default function DemoClient() {
  const [accountKey, setAccountKey] = useState<AccountKey>("acme");
  const [featureKey, setFeatureKey] = useState<FeatureKey>("timeline");
  const [priorityChoice, setPriorityChoice] = useState<
    "northstar" | "luma" | "depends" | null
  >(null);

  const account = accounts[accountKey];
  const feature = featureMeta[featureKey];

  const featureIndex = featureOrder.indexOf(featureKey);
  const previousFeature =
    featureOrder[Math.max(0, featureIndex - 1)] ?? "timeline";
  const nextFeature =
    featureOrder[Math.min(featureOrder.length - 1, featureIndex + 1)] ??
    "business";

  const decisionText = useMemo(() => {
    if (priorityChoice === "northstar") {
      return "Northstar tem deterioração de uso, mas mantém acesso e 94 dias até renovação. Pode ser uma investigação importante, porém a urgência temporal é menor.";
    }

    if (priorityChoice === "luma") {
      return "Luma parece saudável no uso, mas perdeu o champion, não tem economic buyer ativo e renova em 18 dias. A estrutura relacional torna o caso mais urgente.";
    }

    if (priorityChoice === "depends") {
      return "Esse é exatamente o limite da camada relacional: contexto econômico e estratégico pode mudar a decisão. Por isso Business Context aparece como hipótese em validação.";
    }

    return "";
  }, [priorityChoice]);

  return (
    <div className="min-h-screen bg-white text-[#0b0d12]">
      <header className="sticky top-0 z-50 border-b border-[#e7e9ef]/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] w-[min(1180px,calc(100%_-_40px))] items-center justify-between gap-5">
          <Link
            href="/"
            aria-label="Ohrly"
            data-analytics-cta="demo_nav_logo"
            data-analytics-location="demo_navigation"
          >
            <Brand />
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-extrabold text-[#3b424d] lg:flex">
            <a
              href="#demo"
              data-analytics-cta="demo_nav_explore"
              data-analytics-location="demo_navigation"
            >
              Explorar
            </a>
            <a
              href="#compare"
              data-analytics-cta="demo_nav_compare"
              data-analytics-location="demo_navigation"
            >
              Comparar contas
            </a>
            <a
              href="#features"
              data-analytics-cta="demo_nav_features"
              data-analytics-location="demo_navigation"
            >
              Features
            </a>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-5 text-sm font-extrabold text-[#0b0d12] transition hover:-translate-y-px sm:inline-flex"
              data-analytics-cta="demo_back_home"
              data-analytics-location="demo_navigation"
            >
              <ArrowLeft size={15} />
              Voltar
            </Link>

            <CommercialIntentTrigger
              ctaId="demo_nav_review_accounts"
              location="demo_navigation"
              label="Revisar 3 contas"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 text-sm font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
            >
              Revisar 3 contas
            </CommercialIntentTrigger>
          </div>
        </div>
      </header>

      <main id="top">
        <section
          className="relative overflow-hidden py-14 sm:py-[76px]"
          data-analytics-section="demo_hero"
        >
          <div className="pointer-events-none absolute right-[-240px] top-5 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.14),rgba(53,104,245,0)_68%)]" />

          <div className="relative mx-auto w-[min(1180px,calc(100%_-_40px))] items-center">
            <div className="text-center">
              <Eyebrow>Demo interativa</Eyebrow>

              <h1 className="mt-[18px] text-[46px] font-black leading-[.99] tracking-[-0.058em] sm:text-[60px] lg:text-[76px]">
                Veja uma relação{" "}
                <span className="text-[#3568f5]">mudar.</span>
              </h1>

              <p className="mt-6 text-[17px] leading-[1.58] text-[#333946] sm:text-[19px] text-start">
                Um score mostra um estado. O Ohrly acompanha a trajetória:{" "}
                <strong className="font-black text-[#0b0d12]">
                  o que era normal, o que mudou, quem sustenta a relação, quanto
                  tempo existe até a próxima decisão e o que aconteceu depois da
                  ação do time.
                </strong>
              </p>

              <p className="mt-4 text-[17px] leading-[1.58] text-[#333946] sm:text-[19px]">
                Explore uma conta realista abaixo e veja as superfícies que
                estamos validando no produto.
              </p>

              <div className="mt-7 flex flex-wrap gap-3 items-center justify-center">
                <a
                  href="#demo"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5]"
                  data-analytics-cta="demo_hero_start"
                  data-analytics-location="demo_hero"
                >
                  Explorar a conta
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#features"
                  className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#e7e9ef] bg-white px-5 font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                  data-analytics-cta="demo_hero_features"
                  data-analytics-location="demo_hero"
                >
                  Ver todas as features
                </a>
              </div>

              <div className="mt-4 text-[13px] text-[#777e89]">
                Protótipo comercial. A demo mostra a tese do produto; não
                representa uma promessa de resultado.
              </div>
            </div>
          </div>
        </section>

        <section
          id="demo"
          className="bg-[#f6f8fc] py-[68px] sm:py-[92px]"
          data-analytics-section="demo_workspace"
        >
          <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
            <div className="mb-[34px] max-w-[820px]">
              <Eyebrow>Explore o produto</Eyebrow>
              <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                Uma conta. Oito lentes sobre a mesma relação.
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#606773] sm:text-lg">
                Navegue pelas features e troque de conta. Cada interação usa a
                mesma instrumentação da home para conseguirmos observar quais
                superfícies despertam mais interesse.
              </p>
            </div>

            <div className="overflow-hidden rounded-[32px] border border-[#e7e9ef] bg-white shadow-[0_22px_70px_rgba(11,13,18,.07)]">
              <div className="grid gap-3.5 border-b border-[#e7e9ef] bg-white p-[18px] lg:grid-cols-[1fr_auto_auto] lg:items-center">
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(accounts) as AccountKey[]).map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setAccountKey(key)}
                      className={`rounded-full border px-3.5 py-2.5 text-[13px] font-black transition ${
                        accountKey === key
                          ? "border-[#0b0d12] bg-[#0b0d12] text-white"
                          : "border-[#e7e9ef] bg-white text-[#4a515d] hover:bg-[#f7f8fb]"
                      }`}
                      data-analytics-cta={`demo_account_${key}`}
                      data-analytics-location="demo_account_switcher"
                    >
                      {accounts[key].name}
                    </button>
                  ))}
                </div>

                <div className="hidden text-xs font-black uppercase tracking-[.08em] text-[#8b93a0] lg:block">
                  Conta em análise
                </div>

                <div className="w-fit rounded-full border border-[#e7e9ef] bg-[#f4f6fb] px-3 py-2.5 text-xs font-black text-[#4c5562]">
                  Renovação em {account.renewal} dias
                </div>
              </div>

              <div className="grid min-h-[680px] lg:grid-cols-[260px_1fr]">
                <aside className="flex gap-2 overflow-x-auto border-b border-[#e7e9ef] bg-[#fbfcfe] p-4 lg:block lg:border-b-0 lg:border-r">
                  <div className="hidden px-2.5 pb-3 pt-2 text-xs font-black uppercase tracking-[.08em] text-[#9098a5] lg:block">
                    Features
                  </div>

                  {featureOrder.map((key) => {
                    const item = featureMeta[key];

                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setFeatureKey(key)}
                        className={`grid min-w-[190px] grid-cols-[32px_1fr] items-start gap-2.5 rounded-2xl border p-3 text-left transition lg:mb-1.5 lg:w-full lg:min-w-0 ${
                          featureKey === key
                            ? "border-[#dbe5ff] bg-[#edf2ff]"
                            : "border-transparent bg-transparent hover:bg-[#f2f5fb]"
                        }`}
                        data-analytics-cta={`demo_feature_${key}`}
                        data-analytics-location="demo_feature_rail"
                      >
                        <div
                          className={`grid size-[30px] place-items-center rounded-[10px] border text-[11px] font-black ${
                            featureKey === key
                              ? "border-[#3568f5] bg-[#3568f5] text-white"
                              : "border-[#e7e9ef] bg-white text-[#5a6370]"
                          }`}
                        >
                          {item.number}
                        </div>

                        <div>
                          <div className="text-sm font-black text-[#11151c]">
                            {item.label}
                            {item.beta ? (
                              <span className="ml-2 inline-flex rounded-full bg-[#fff5e9] px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[.05em] text-[#a15c00]">
                                em validação
                              </span>
                            ) : null}
                          </div>
                          <span className="mt-1 block text-[11px] leading-[1.35] text-[#77808d]">
                            {item.short}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </aside>

                <section className="grid min-w-0 grid-rows-[auto_1fr_auto]">
                  <div className="flex flex-col items-start justify-between gap-4 border-b border-[#e7e9ef] px-5 py-5 sm:px-[26px] sm:py-6 lg:flex-row">
                    <div>
                      <Tiny>{feature.eyebrow}</Tiny>
                      <h3 className="mt-1 text-[28px] font-black tracking-[-0.04em]">
                        {feature.title}
                      </h3>
                      <p className="mt-1.5 max-w-[690px] text-sm leading-[1.5] text-[#606773]">
                        {feature.description}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-[#edf2ff] px-2.5 py-2 text-[11px] font-black text-[#3568f5]">
                      {feature.beta ? "Em validação" : `Feature ${feature.number}`}
                    </span>
                  </div>

                  <div className="overflow-auto p-5 sm:p-[26px]">
                    <DemoWorkspace
                      accountKey={accountKey}
                      featureKey={featureKey}
                    />
                  </div>

                  <div className="flex flex-col items-start justify-between gap-3 border-t border-[#e7e9ef] bg-[#fbfcfe] px-5 py-4 sm:flex-row sm:items-center">
                    <small className="max-w-[700px] text-[12px] leading-[1.4] text-[#7b8490]">
                      {feature.footnote}
                    </small>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setFeatureKey(previousFeature)}
                        disabled={featureIndex === 0}
                        className="inline-flex items-center gap-1 rounded-full border border-[#e7e9ef] bg-white px-3 py-2.5 text-xs font-black text-[#0b0d12] disabled:cursor-not-allowed disabled:opacity-40"
                        data-analytics-cta={`demo_feature_prev_from_${featureKey}`}
                        data-analytics-location="demo_workspace_footer"
                      >
                        <ChevronLeft size={14} />
                        Anterior
                      </button>

                      <button
                        type="button"
                        onClick={() => setFeatureKey(nextFeature)}
                        disabled={featureIndex === featureOrder.length - 1}
                        className="inline-flex items-center gap-1 rounded-full border border-[#3568f5] bg-[#3568f5] px-3 py-2.5 text-xs font-black text-white disabled:cursor-not-allowed disabled:opacity-40"
                        data-analytics-cta={`demo_feature_next_from_${featureKey}`}
                        data-analytics-location="demo_workspace_footer"
                      >
                        Próxima
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-[#dfe7ff] bg-[#f4f7ff] px-4 py-3 text-[12px] leading-5 text-[#52617b]">
              <strong className="text-[#243454]">Instrumentação:</strong>{" "}
              abertura de feature, troca de conta, escolha de prioridade e CTAs
              comerciais são registrados como <code>cta_click</code> via
              <code> data-analytics-cta</code>. Assim não precisamos criar uma
              segunda infraestrutura de tracking.
            </div>
          </div>
        </section>

        <section
          id="compare"
          className="py-[68px] sm:py-[90px]"
          data-analytics-section="demo_compare_accounts"
        >
          <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
            <div className="mb-[34px] max-w-[820px]">
              <Eyebrow>Mesmo risco, histórias diferentes</Eyebrow>
              <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                O score pode começar a conversa. O contexto muda a investigação.
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#606773] sm:text-lg">
                Compare duas contas com risco parecido e veja como trajetória,
                cobertura relacional e tempo até renovação mudam a leitura.
              </p>
            </div>

            <div className="grid gap-[18px] lg:grid-cols-2">
              <CompareAccount
                account="Northstar"
                score="41"
                rows={[
                  ["Uso", "↓ há 3 semanas"],
                  ["Champion", "ativo"],
                  ["Sponsor", "ativo"],
                  ["Renovação", "94 dias"],
                  ["Última intervenção", "ainda não houve"],
                ]}
                reading="deterioração recente, acesso preservado e tempo para investigar."
              />

              <CompareAccount
                account="Luma"
                score="43"
                rows={[
                  ["Uso", "estável"],
                  ["Champion", "saiu há 37 dias"],
                  ["Economic buyer", "sem relação"],
                  ["Renovação", "18 dias"],
                  ["Última intervenção", "sem resposta"],
                ]}
                reading="o produto parece saudável, mas a estrutura que sustenta a renovação mudou."
              />
            </div>
          </div>
        </section>

        <section
          className="bg-[#0b0d12] py-[68px] text-white sm:py-[88px]"
          data-analytics-section="demo_priority_test"
        >
          <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-10 lg:grid-cols-[.9fr_1.1fr]">
            <div>
              <Eyebrow light>Teste a decisão</Eyebrow>
              <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                Qual conta você investigaria primeiro?
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#aab3c2]">
                Não existe uma resposta universal. O objetivo é testar se o
                contexto mostrado pelo Ohrly muda a prioridade percebida — e não
                impor uma decisão automática.
              </p>
            </div>

            <div>
              <div className="grid gap-2.5">
                <PriorityOption
                  selected={priorityChoice === "northstar"}
                  title="Northstar"
                  body="Uso caiu recentemente, mas champion e sponsor continuam ativos. Renovação em 94 dias."
                  ctaId="demo_priority_northstar"
                  onClick={() => setPriorityChoice("northstar")}
                />
                <PriorityOption
                  selected={priorityChoice === "luma"}
                  title="Luma"
                  body="Uso estável, champion saiu, sem economic buyer ativo. Renovação em 18 dias."
                  ctaId="demo_priority_luma"
                  onClick={() => setPriorityChoice("luma")}
                />
                <PriorityOption
                  selected={priorityChoice === "depends"}
                  title="Depende do contexto de negócio"
                  body="ARR, margem, custo para servir e importância estratégica podem alterar a decisão."
                  ctaId="demo_priority_depends"
                  onClick={() => setPriorityChoice("depends")}
                />
              </div>

              {priorityChoice ? (
                <div className="mt-3 rounded-[20px] border border-[#2d3852] bg-[#11192d] p-[18px]">
                  <strong className="text-[#dce5ff]">Boa leitura.</strong>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#aeb9ca]">
                    {decisionText}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section
          id="features"
          className="bg-[#f6f8fc] py-[68px] sm:py-[90px]"
          data-analytics-section="demo_feature_map"
        >
          <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
            <div className="mb-[34px] max-w-[820px]">
              <Eyebrow>Mapa de produto</Eyebrow>
              <h2 className="mt-3 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                O que estamos tentando validar no Ohrly.
              </h2>
              <p className="mt-4 text-[17px] leading-[1.6] text-[#606773] sm:text-lg">
                O núcleo é longitudinal: relação → mudança → ciclo → intervenção
                → resposta → memória. Algumas camadas comerciais ainda estão
                explicitamente em validação.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureSummaryCard number="01" title="Expected experience">
                Aprender o normal contextual da relação, não apenas comparar com
                uma média global.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="02" title="Change detection">
                Mostrar o que deixou de parecer normal e se a mudança persiste,
                recupera ou recai.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="03" title="Stakeholder coverage">
                Tornar visível concentração, perda ou ausência de pessoas que
                sustentam a relação.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="04" title="Relationship cycles">
                Transformar mudanças soltas em episódios legíveis que podem ser
                acompanhados ao longo do tempo.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="05" title="Renewal context">
                Colocar o relógio da decisão sobre a trajetória para mostrar
                quando esperar deixa de ser neutro.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="06" title="Intervention">
                Registrar o que o time fez durante o ciclo sem transformar isso
                automaticamente em causalidade.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="07" title="Observed response">
                Acompanhar o que aconteceu depois: persistência, recuperação,
                recaída ou novo padrão.
              </FeatureSummaryCard>
              <FeatureSummaryCard number="08" title="Cycle memory">
                Recuperar episódios anteriores e famílias semelhantes para
                acumular memória operacional da relação.
              </FeatureSummaryCard>
            </div>
          </div>
        </section>

        <section
          id="review"
          className="py-[68px] sm:py-[88px]"
          data-analytics-section="demo_final_cta"
        >
          <div className="mx-auto w-[min(1180px,calc(100%_-_40px))]">
            <div className="grid items-center gap-8 rounded-[36px] bg-[#3568f5] p-7 text-white sm:p-12 lg:grid-cols-[1fr_auto]">
              <div>
                <h2 className="m-0 text-[36px] font-black leading-[1.03] tracking-[-0.05em] sm:text-[48px] lg:text-[58px]">
                  Quer testar essa leitura em 3 contas reais?
                </h2>
                <p className="mt-3 max-w-[760px] text-[17px] leading-[1.55] text-[#dce5ff]">
                  Uma que churnou de surpresa, uma que o time tentou recuperar e
                  uma que preocupa vocês agora. Se a leitura não acrescentar
                  nada ao processo atual, paramos aí.
                </p>
              </div>

              <CommercialIntentTrigger
                ctaId="demo_final_review_accounts"
                location="demo_final_cta"
                label="Revisar 3 contas"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-5 font-extrabold text-[#0b0d12] shadow-[0_6px_0_#0d2e9f] transition hover:-translate-y-px"
              >
                Revisar 3 contas
                <ArrowRight size={16} />
              </CommercialIntentTrigger>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7e9ef] py-10">
        <div className="mx-auto flex w-[min(1180px,calc(100%_-_40px))] flex-col items-start justify-between gap-5 text-[13px] text-[#727a86] sm:flex-row sm:items-center">
          <Brand />
          <div>Demo de produto · validação indireta de interesse</div>
        </div>
      </footer>
    </div>
  );
}

function CompareAccount({
  account,
  score,
  rows,
  reading,
}: {
  account: string;
  score: string;
  rows: Array<[string, string]>;
  reading: string;
}) {
  return (
    <article className="rounded-[28px] border border-[#e7e9ef] bg-white p-6">
      <div className="mb-[18px] flex items-start justify-between gap-3.5">
        <div>
          <Tiny>Conta</Tiny>
          <h3 className="mt-1 text-[26px] font-black tracking-[-0.04em]">
            {account}
          </h3>
        </div>
        <span className="rounded-full bg-[#fff1f0] px-2.5 py-1.5 text-[11px] font-black text-[#b42318]">
          Score {score}
        </span>
      </div>

      {rows.map(([label, value]) => (
        <div
          key={label}
          className="flex justify-between gap-4 border-t border-[#e7e9ef] py-[11px] text-[13px]"
        >
          <span className="text-[#7c8490]">{label}</span>
          <strong className="text-right text-[#0b0d12]">{value}</strong>
        </div>
      ))}

      <div className="mt-4 rounded-2xl border border-[#dfe7ff] bg-[#f3f6ff] p-3.5 text-[13px] leading-[1.45]">
        <strong>Leitura:</strong> {reading}
      </div>
    </article>
  );
}

function PriorityOption({
  selected,
  title,
  body,
  ctaId,
  onClick,
}: {
  selected: boolean;
  title: string;
  body: string;
  ctaId: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[20px] border p-[18px] text-left text-white transition ${
        selected
          ? "border-[#6e91ff] bg-[#11192d]"
          : "border-[#292f3a] bg-[#12161e] hover:border-[#526bba] hover:bg-[#151d32]"
      }`}
      data-analytics-cta={ctaId}
      data-analytics-location="demo_priority_test"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <strong className="text-[17px]">{title}</strong>
          <span className="mt-1.5 block text-[13px] leading-[1.45] text-[#9faabc]">
            {body}
          </span>
        </div>

        {selected ? (
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#3568f5] text-white">
            <Check size={15} />
          </span>
        ) : null}
      </div>
    </button>
  );
}
