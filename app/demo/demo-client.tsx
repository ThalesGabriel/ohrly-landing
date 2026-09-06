"use client";

import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  RotateCcw,
} from "lucide-react";

import { CommercialIntentTrigger } from "@/components/commercial-intent-modal";

type AccountKey = "northstar" | "luma";
type DetailTab = "history" | "relationship" | "renewal";
type DemoStep = 1 | 2 | 3 | 4 | 5 | 6;

const TOTAL_STEPS = 6;

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

function Pill({
  children,
  tone = "risk",
}: {
  children: ReactNode;
  tone?: "risk" | "good" | "warn";
}) {
  const toneClass = {
    risk: "bg-[#fff1f0] text-[#b42318]",
    good: "bg-[#ebf8f1] text-[#18794e]",
    warn: "bg-[#fff5e9] text-[#a15c00]",
  }[tone];

  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1.5 text-[11px] font-black ${toneClass}`}
    >
      {children}
    </span>
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
    <div className="flex items-center justify-between gap-5 border-b border-[#e7e9ef] py-3 text-[13px]">
      <span className="text-[#747c88]">{label}</span>
      <strong className={`text-right ${toneClass}`}>{value}</strong>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  children,
  tone = "neutral",
}: {
  date: string;
  title: string;
  children: ReactNode;
  tone?: "neutral" | "good" | "warn" | "risk";
}) {
  const dotClass = {
    neutral: "border-[#3568f5]",
    good: "border-[#18794e]",
    warn: "border-[#a15c00]",
    risk: "border-[#b42318]",
  }[tone];

  return (
    <div className="relative pb-[18px] last:pb-0">
      <span
        className={`absolute -left-[31px] top-1 size-[10px] rounded-full border-[3px] bg-white ${dotClass}`}
      />
      <Tiny>{date}</Tiny>
      <div className="mt-[3px] text-[14px] font-black text-[#0b0d12]">
        {title}
      </div>
      <p className="mt-[3px] text-[12px] leading-[1.45] text-[#667085]">
        {children}
      </p>
    </div>
  );
}

function AccountChoice({
  account,
  selected,
  onSelect,
}: {
  account: AccountKey;
  selected: boolean;
  onSelect: (account: AccountKey) => void;
}) {
  const isNorthstar = account === "northstar";

  return (
    <button
      type="button"
      onClick={() => onSelect(account)}
      data-analytics-cta={`demo_account_select_${account}`}
      data-analytics-location="demo_queue"
      data-analytics-label={
        isNorthstar ? "Selecionar Northstar" : "Selecionar Luma"
      }
      aria-pressed={selected}
      className={`rounded-[24px] border bg-white p-5 text-left transition hover:-translate-y-px hover:border-[#bac7ff] hover:shadow-[0_12px_30px_rgba(53,104,245,.08)] ${
        selected
          ? "border-[#3568f5] shadow-[0_0_0_2px_rgba(53,104,245,.14)]"
          : "border-[#e7e9ef]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Tiny>{isNorthstar ? "CONTA A" : "CONTA B"}</Tiny>
          <div className="mt-1 text-[26px] font-black tracking-[-0.04em]">
            {isNorthstar ? "Northstar" : "Luma"}
          </div>
          <div className="mt-1 text-[13px] text-[#727b87]">
            Renovação em {isNorthstar ? "94" : "18"} dias
          </div>
        </div>
        <Pill>Score {isNorthstar ? "41" : "43"}</Pill>
      </div>

      <div className="mt-[18px] border-t border-[#e7e9ef]">
        <StatusRow
          label="Uso"
          value={isNorthstar ? "em queda" : "estável"}
        />
        <StatusRow
          label="Champion"
          value={isNorthstar ? "ativo" : "ausente"}
        />
        <StatusRow
          label="Sponsor"
          value={isNorthstar ? "ativo" : "sem relação"}
        />
      </div>
    </button>
  );
}

function StepNav({
  onBack,
  onNext,
  nextLabel,
  nextCtaId,
}: {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextCtaId?: string;
}) {
  return (
    <div className="mt-[22px] flex items-center justify-between gap-3 border-t border-[#e7e9ef] pt-[18px]">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          data-analytics-cta="demo_step_back"
          data-analytics-location="demo_workspace"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-[18px] text-[13px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
        >
          <ArrowLeft size={14} />
          Voltar
        </button>
      ) : (
        <div />
      )}

      {onNext && nextLabel ? (
        <button
          type="button"
          onClick={onNext}
          data-analytics-cta={nextCtaId ?? "demo_step_next"}
          data-analytics-location="demo_workspace"
          data-analytics-label={nextLabel}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#3568f5] bg-[#3568f5] px-[18px] text-[13px] font-extrabold text-white shadow-[0_5px_0_#18399f] transition hover:-translate-y-px"
        >
          {nextLabel}
          <ArrowRight size={14} />
        </button>
      ) : null}
    </div>
  );
}

function Progress({ step }: { step: DemoStep }) {
  return (
    <div className="mx-auto grid w-[min(1080px,calc(100%_-_32px))] grid-cols-6 gap-[7px] pb-5 pt-3">
      {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
        <div
          key={index}
          className={`h-1.5 rounded-full transition ${
            index < step ? "bg-[#3568f5]" : "bg-[#e9edf4]"
          }`}
        />
      ))}
    </div>
  );
}

function QueueStep({
  selectedAccount,
  onSelectAccount,
  onContinue,
}: {
  selectedAccount: AccountKey | null;
  onSelectAccount: (account: AccountKey) => void;
  onContinue: () => void;
}) {
  const selectedLabel =
    selectedAccount === "northstar"
      ? "Northstar"
      : selectedAccount === "luma"
        ? "Luma"
        : null;

  return (
    <div>
      <div className="mb-[22px] max-w-[780px]">
        <Tiny>A fotografia atual</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          Qual dessas duas contas merece sua atenção primeiro?
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          Escolha uma antes de ver qualquer contexto adicional.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AccountChoice
          account="northstar"
          selected={selectedAccount === "northstar"}
          onSelect={onSelectAccount}
        />
        <AccountChoice
          account="luma"
          selected={selectedAccount === "luma"}
          onSelect={onSelectAccount}
        />
      </div>

      {selectedLabel ? (
        <div className="mt-5 rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] px-[18px] py-4 text-[14px] leading-[1.5] text-[#2b3852]">
          Sua escolha inicial: <strong>{selectedLabel}</strong>. Agora vamos ver
          se a trajetória muda essa decisão.
        </div>
      ) : null}

      <div className="mt-[22px] flex justify-end border-t border-[#e7e9ef] pt-[18px]">
        {selectedAccount ? (
          <button
            type="button"
            onClick={onContinue}
            data-analytics-cta="demo_trajectory_reveal"
            data-analytics-location="demo_queue"
            data-analytics-label="Ver a trajetória"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#3568f5] bg-[#3568f5] px-[18px] text-[13px] font-extrabold text-white shadow-[0_5px_0_#18399f] transition hover:-translate-y-px"
          >
            Ver a trajetória
            <ArrowRight size={14} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function TrajectoryStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="mb-[22px] max-w-[780px]">
        <Tiny>A trajetória</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          O mesmo risco atual veio de histórias muito diferentes.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          Agora olhe como cada conta chegou até o estado de hoje.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Northstar · Score 41</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            Deterioração recente
          </h3>

          <div className="ml-1 mt-4 border-l-2 border-[#dde3ee] pl-6">
            <TimelineItem
              date="45 dias"
              title="Uso dentro do padrão"
              tone="good"
            >
              Champion e sponsor participam normalmente.
            </TimelineItem>
            <TimelineItem
              date="23 dias"
              title="Uso começa a cair"
              tone="warn"
            >
              A mudança passa a se repetir por várias semanas.
            </TimelineItem>
            <TimelineItem date="hoje" title="Queda persiste" tone="risk">
              Acesso ainda existe. Renovação ainda está distante.
            </TimelineItem>
          </div>
        </article>

        <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Luma · Score 43</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            Fragilidade relacional acumulada
          </h3>

          <div className="ml-1 mt-4 border-l-2 border-[#dde3ee] pl-6">
            <TimelineItem date="74 dias" title="Uso saudável" tone="good">
              Champion concentrava 81% das interações.
            </TimelineItem>
            <TimelineItem
              date="51 dias"
              title="Presença começa a cair"
              tone="warn"
            >
              A cobertura relacional já começa a mudar.
            </TimelineItem>
            <TimelineItem
              date="36 dias"
              title="Champion sai da empresa"
              tone="risk"
            >
              Nenhum sponsor substituto assume a relação.
            </TimelineItem>
            <TimelineItem date="hoje" title="Uso segue estável" tone="risk">
              Mas economic buyer segue sem relação e a renovação está próxima.
            </TimelineItem>
          </div>
        </article>
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Comparar decisões"
        nextCtaId="demo_cost_of_waiting_view"
      />
    </div>
  );
}

function CostOfWaitingStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="mb-[22px] max-w-[780px]">
        <Tiny>O custo de esperar</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          Mesma fila. Janelas de intervenção diferentes.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          O risco aponta onde olhar. A trajetória ajuda a entender o que esperar
          pode custar.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Northstar</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            Score 41
          </h3>
          <div className="mt-3">
            <StatusRow label="Mudança" value="recente" />
            <StatusRow label="Acesso" value="preservado" />
            <StatusRow label="Renovação" value="94 dias" />
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-[16px] bg-[#ebf8f1] px-4 py-[15px] text-[13px] leading-[1.45] text-[#155e42]">
            <Check size={18} className="mt-[1px] shrink-0" />
            <div>
              <strong className="block">Ainda existe espaço para agir.</strong>
              A conta está deteriorando, mas o time ainda tem acesso e tempo para
              investigar.
            </div>
          </div>
        </article>

        <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Luma</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            Score 43
          </h3>
          <div className="mt-3">
            <StatusRow label="Champion" value="saiu" />
            <StatusRow label="Última resposta" value="17 dias" />
            <StatusRow label="Renovação" value="18 dias" />
          </div>
          <div className="mt-4 flex items-start gap-3 rounded-[16px] bg-[#fff5e9] px-4 py-[15px] text-[13px] leading-[1.45] text-[#7d4a00]">
            <Clock3 size={18} className="mt-[1px] shrink-0" />
            <div>
              <strong className="block">Esperar está ficando caro.</strong>
              A cada semana sem resposta, o time perde acesso, alternativas e
              espaço antes da próxima decisão.
            </div>
          </div>
        </article>
      </div>

      <div className="mt-[18px] rounded-[20px] bg-[#0b0d12] px-[22px] py-5 text-white">
        <strong className="block text-[22px] font-black tracking-[-0.025em]">
          O score apontou as duas. A trajetória mudou a prioridade.
        </strong>
        <p className="mt-[7px] text-[14px] leading-[1.5] text-[#b8c0ce]">
          Se você escolheria diferente agora, já existe uma informação que a
          fotografia atual não carregava.
        </p>
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Explorar a leitura"
        nextCtaId="demo_detail_explore"
      />
    </div>
  );
}

function HistoryDetail() {
  return (
    <div>
      <h3 className="text-[24px] font-black tracking-[-0.035em]">
        Como essa conta chegou até aqui?
      </h3>
      <p className="mt-2 text-[14px] leading-[1.5] text-[#6b7280]">
        O score não estava errado. Ele continuava refletindo sinais que ainda
        estavam saudáveis. A relação, porém, já tinha mudado.
      </p>

      <div className="ml-1 mt-4 border-l-2 border-[#dde3ee] pl-6">
        <TimelineItem date="74 dias" title="Uso saudável" tone="good">
          Champion concentra 81% das interações.
        </TimelineItem>
        <TimelineItem
          date="51 dias"
          title="A relação começa a mudar"
          tone="warn"
        >
          Champion reduz presença nas reuniões.
        </TimelineItem>
        <TimelineItem
          date="36 dias"
          title="Champion sai da empresa"
          tone="risk"
        >
          Nenhum outro sponsor ativo.
        </TimelineItem>
        <TimelineItem date="hoje" title="Score continua verde" tone="risk">
          O produto parece saudável. A estrutura que sustentava a renovação não.
        </TimelineItem>
      </div>
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
    good: "bg-[#ebf8f1] text-[#18794e]",
    warn: "bg-[#fff5e9] text-[#a15c00]",
    risk: "bg-[#fff1f0] text-[#b42318]",
  }[tone];

  return (
    <div className="flex items-start gap-3 rounded-[16px] border border-[#e7e9ef] bg-white p-[14px]">
      <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#eef3ff] text-[12px] font-black text-[#3568f5]">
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <strong className="text-[13px] text-[#0b0d12]">{role}</strong>
        <p className="mt-1 text-[12px] leading-[1.4] text-[#727b87]">
          {detail}
        </p>
        <span
          className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-black ${toneClass}`}
        >
          {state}
        </span>
      </div>
    </div>
  );
}

function RelationshipDetail() {
  return (
    <div>
      <h3 className="text-[24px] font-black tracking-[-0.035em]">
        Quem ainda sustenta essa relação?
      </h3>
      <p className="mt-2 text-[14px] leading-[1.5] text-[#6b7280]">
        Uma conta pode continuar usando enquanto sua cobertura relacional se
        torna progressivamente mais frágil.
      </p>

      <div className="mt-[14px] grid gap-2.5 sm:grid-cols-2">
        <Stakeholder
          initials="PU"
          role="Power user"
          detail="Uso operacional recorrente."
          state="ativo"
          tone="good"
        />
        <Stakeholder
          initials="CH"
          role="Champion"
          detail="Concentrava 81% das interações."
          state="saiu há 36 dias"
          tone="risk"
        />
        <Stakeholder
          initials="SP"
          role="Executive sponsor"
          detail="Nenhuma nova relação estabelecida."
          state="sem contato"
          tone="warn"
        />
        <Stakeholder
          initials="EB"
          role="Economic buyer"
          detail="Não participa da relação atual."
          state="sem relação"
          tone="risk"
        />
      </div>
    </div>
  );
}

function RenewalDetail() {
  return (
    <div>
      <h3 className="text-[24px] font-black tracking-[-0.035em]">
        Quando esperar deixou de ser neutro?
      </h3>

      <div className="mt-[14px] grid gap-[14px] lg:grid-cols-[.9fr_1.1fr]">
        <div className="rounded-[18px] border border-[#e7e9ef] p-[17px]">
          <Tiny>Próxima decisão</Tiny>
          <div className="mt-1 text-[54px] font-black tracking-[-0.06em]">
            18
          </div>
          <strong className="text-[14px]">dias até renovação</strong>

          <div className="mt-[14px] h-[9px] overflow-hidden rounded-full bg-[#edf0f5]">
            <div className="h-full w-[78%] rounded-full bg-[#3568f5]" />
          </div>

          <p className="mt-4 text-[13px] leading-[1.5] text-[#667085]">
            A mesma fragilidade teria outro peso se essa decisão estivesse a 120
            dias.
          </p>
        </div>

        <div className="rounded-[18px] border border-[#e7e9ef] p-[17px]">
          <Tiny>Contexto atual</Tiny>
          <div className="mt-2">
            <StatusRow label="Health Score" value="43 · saudável" tone="good" />
            <StatusRow label="Uso" value="estável" tone="good" />
            <StatusRow
              label="Champion"
              value="saiu há 36 dias"
              tone="risk"
            />
            <StatusRow
              label="Economic buyer"
              value="sem relação"
              tone="risk"
            />
            <StatusRow
              label="Última resposta"
              value="17 dias"
              tone="warn"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ExploreStep({
  activeTab,
  onTabChange,
  onBack,
  onNext,
}: {
  activeTab: DetailTab;
  onTabChange: (tab: DetailTab) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const tabs: Array<{ key: DetailTab; label: string }> = [
    { key: "history", label: "Trajetória" },
    { key: "relationship", label: "Stakeholders" },
    { key: "renewal", label: "Janela para agir" },
  ];

  return (
    <div>
      <div className="mb-[22px] max-w-[780px]">
        <Tiny>Drill-down</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          Agora explore por que a Luma ficou mais urgente.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          As dimensões deixam de ser a narrativa principal da demo e viram
          evidências da leitura.
        </p>
      </div>

      <div className="mb-[18px] flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            data-analytics-cta={`demo_detail_tab_${tab.key}`}
            data-analytics-location="demo_detail_tabs"
            data-analytics-label={tab.label}
            aria-pressed={activeTab === tab.key}
            className={`shrink-0 rounded-full border px-[14px] py-2.5 text-[12px] font-black transition ${
              activeTab === tab.key
                ? "border-[#0b0d12] bg-[#0b0d12] text-white"
                : "border-[#e3e6ec] bg-white text-[#535b67] hover:bg-[#f5f7fb]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
        {activeTab === "history" ? <HistoryDetail /> : null}
        {activeTab === "relationship" ? <RelationshipDetail /> : null}
        {activeTab === "renewal" ? <RenewalDetail /> : null}
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Ver o que acontece depois da ação"
        nextCtaId="demo_intervention_view"
      />
    </div>
  );
}

function InterventionStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const actions = [
    {
      date: "05 ago",
      title: "CSM tenta contato com novo sponsor",
      result: "sem resposta",
      tone: "warn" as const,
    },
    {
      date: "08 ago",
      title: "Novo follow-up",
      result: "sem resposta",
      tone: "risk" as const,
    },
    {
      date: "12 ago",
      title: "Workshop de adoção com novo stakeholder",
      result: "intervenção registrada",
      tone: "good" as const,
    },
  ];

  const chipClass = {
    good: "bg-[#ebf8f1] text-[#18794e]",
    warn: "bg-[#fff5e9] text-[#a15c00]",
    risk: "bg-[#fff1f0] text-[#b42318]",
  };

  return (
    <div>
      <div className="mb-[22px] max-w-[780px]">
        <Tiny>Intervenção → resposta</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          O trabalho não termina quando o time age.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          Ohrly preserva a intervenção e continua acompanhando o que foi
          observado depois.
        </p>
      </div>

      <div className="grid gap-[9px]">
        {actions.map((action) => (
          <div
            key={`${action.date}-${action.title}`}
            className="grid gap-3 rounded-[16px] border border-[#e7e9ef] bg-white px-[14px] py-[13px] sm:grid-cols-[78px_1fr_auto] sm:items-center"
          >
            <Tiny>{action.date}</Tiny>
            <strong className="text-[13px] text-[#0b0d12]">
              {action.title}
            </strong>
            <span
              className={`w-fit rounded-full px-2 py-1 text-[10px] font-black ${chipClass[action.tone]}`}
            >
              {action.result}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-[22px]">
        <Tiny>O que foi observado depois</Tiny>

        <div className="mt-[14px] grid gap-3">
          {[
            {
              time: "+4 dias",
              title: "Novo stakeholder responde",
              body: "A relação volta a ter um ponto de contato ativo.",
            },
            {
              time: "+9 dias",
              title: "Participação em reunião aumenta",
              body: "O contato passa a participar do ritual operacional.",
            },
            {
              time: "+15 dias",
              title: "Uso permanece estável",
              body: "A cobertura relacional melhora, mas o economic buyer ainda segue fora da relação.",
            },
          ].map((item) => (
            <div
              key={item.time}
              className="grid grid-cols-[92px_1fr] gap-[14px] border-l-[3px] border-[#3568f5] pl-[14px] sm:grid-cols-[110px_1fr]"
            >
              <div className="text-[11px] font-black uppercase text-[#87909d]">
                {item.time}
              </div>
              <div>
                <strong className="text-[14px] text-[#0b0d12]">
                  {item.title}
                </strong>
                <p className="mt-1 text-[12px] leading-[1.45] text-[#667085]">
                  {item.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[18px] rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] p-[18px] text-[13px] leading-[1.5] text-[#2b3852]">
        <strong className="block">Leitura atual: relação em reentrada.</strong>
        Ainda não recuperada. O Ohrly não afirma que a intervenção causou esse
        resultado; apenas preserva a sequência e acompanha a evolução.
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Voltar para a fila"
        nextCtaId="demo_response_complete"
      />
    </div>
  );
}

function FinalStep({
  onBack,
  onRestart,
}: {
  onBack: () => void;
  onRestart: () => void;
}) {
  return (
    <div>
      <div className="mb-[22px] max-w-[780px]">
        <Tiny>Fechamento</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          Agora você ainda trataria essas duas contas da mesma maneira?
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          A fotografia inicial era parecida. A história, a janela para agir e a
          resposta observada depois não eram.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Northstar</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            Score 41
          </h3>
          <div className="mt-3">
            <StatusRow label="Trajetória" value="deteriorando" />
            <StatusRow label="Acesso" value="preservado" />
            <StatusRow label="Janela" value="94 dias" />
          </div>
          <div className="mt-4 rounded-[16px] bg-[#ebf8f1] px-4 py-[15px] text-[13px] leading-[1.45] text-[#155e42]">
            <strong className="block">
              Investigar, mas ainda há opcionalidade.
            </strong>
            O time ainda tem acesso e tempo para decidir como agir.
          </div>
        </article>

        <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
          <Tiny>Luma</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            Score 43
          </h3>
          <div className="mt-3">
            <StatusRow label="Trajetória" value="fragilidade acumulada" />
            <StatusRow label="Acesso" value="reduzido" />
            <StatusRow label="Janela" value="18 dias" />
          </div>
          <div className="mt-4 rounded-[16px] bg-[#fff5e9] px-4 py-[15px] text-[13px] leading-[1.45] text-[#7d4a00]">
            <strong className="block">Esperar custa alternativas.</strong>
            A urgência não veio do score isolado, mas da trajetória + perda de
            acesso + proximidade da decisão.
          </div>
        </article>
      </div>

      <div className="mt-[18px] rounded-[20px] bg-[#0b0d12] px-[22px] py-5 text-white">
        <strong className="block text-[22px] font-black tracking-[-0.025em]">
          Mesmo risco. Histórias diferentes. Decisões diferentes.
        </strong>
        <p className="mt-[7px] text-[14px] leading-[1.5] text-[#b8c0ce]">
          Esse é o papel do Ohrly: tornar a trajetória legível antes que a
          próxima decisão conte o final.
        </p>
      </div>

      <div
        id="final"
        className="mt-[22px] grid items-center gap-[22px] rounded-[28px] bg-[#3568f5] p-7 text-white lg:grid-cols-[1fr_auto]"
      >
        <div>
          <h2 className="text-[30px] font-black leading-[1.04] tracking-[-0.045em] sm:text-[34px]">
            Quer saber se essa leitura aparece nas suas contas?
          </h2>
          <p className="mt-2 max-w-[650px] text-[14px] leading-[1.5] text-[#dce5ff]">
            Traga uma que churnou de surpresa, uma que o time tentou recuperar e
            uma que preocupa vocês agora.
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

      <div className="mt-[22px] flex items-center justify-between gap-3 border-t border-[#e7e9ef] pt-[18px]">
        <button
          type="button"
          onClick={onBack}
          data-analytics-cta="demo_step_back"
          data-analytics-location="demo_workspace"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-[18px] text-[13px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
        >
          <ArrowLeft size={14} />
          Voltar
        </button>

        <button
          type="button"
          onClick={onRestart}
          data-analytics-cta="demo_restart"
          data-analytics-location="demo_workspace"
          data-analytics-label="Recomeçar demo"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-[18px] text-[13px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
        >
          <RotateCcw size={14} />
          Recomeçar demo
        </button>
      </div>
    </div>
  );
}

export default function DemoClient() {
  const [step, setStep] = useState<DemoStep>(1);
  const [selectedAccount, setSelectedAccount] = useState<AccountKey | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<DetailTab>("history");

  const stepLabel = useMemo(() => `Passo ${step} de ${TOTAL_STEPS}`, [step]);

  function goToStep(nextStep: DemoStep) {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartDemo() {
    setSelectedAccount(null);
    setActiveTab("history");
    goToStep(1);
  }

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
          className="relative overflow-hidden pb-[26px] pt-10 text-center sm:pt-[54px]"
          data-analytics-section="demo_hero"
        >
          <div className="pointer-events-none absolute right-[-240px] top-[-80px] size-[520px] rounded-full bg-[radial-gradient(circle,rgba(53,104,245,.13),rgba(53,104,245,0)_70%)]" />

          <div className="relative mx-auto w-[min(940px,calc(100%_-_32px))]">
            <Eyebrow>Demo guiada</Eyebrow>

            <h1 className="mx-auto mt-[14px] max-w-[900px] text-[42px] font-black leading-[1] tracking-[-0.055em] sm:text-[54px] lg:text-[68px]">
              Duas contas entraram na sua fila com praticamente o mesmo risco.{" "}
              <span className="text-[#3568f5]">
                Qual você investigaria primeiro?
              </span>
            </h1>

            <p className="mx-auto mt-[18px] max-w-[760px] text-[16px] leading-[1.55] text-[#4b5360] sm:text-[17px]">
              A demo começa com a mesma fotografia que um time de CS poderia ter
              hoje. A trajetória aparece depois — para você sentir se ela
              realmente muda a decisão.
            </p>
          </div>
        </section>

        <Progress step={step} />

        <section
          className="pb-[58px]"
          data-analytics-section="demo_workspace"
        >
          <div className="mx-auto w-[min(1080px,calc(100%_-_32px))]">
            <div className="overflow-hidden rounded-[30px] border border-[#e7e9ef] bg-white shadow-[0_24px_70px_rgba(11,13,18,.09)]">
              <div className="flex items-center justify-between gap-[18px] border-b border-[#e7e9ef] bg-[#fbfcfe] px-5 py-[18px]">
                <div>
                  <Tiny>Carteira em revisão</Tiny>
                  <div className="mt-1 text-[19px] font-black tracking-[-0.03em]">
                    Fila de contas sinalizadas
                  </div>
                </div>

                <div className="rounded-full bg-[#eef3ff] px-[11px] py-2 text-[11px] font-black text-[#3568f5]">
                  {stepLabel}
                </div>
              </div>

              <div className="p-[18px] sm:p-6">
                {step === 1 ? (
                  <QueueStep
                    selectedAccount={selectedAccount}
                    onSelectAccount={setSelectedAccount}
                    onContinue={() => goToStep(2)}
                  />
                ) : null}

                {step === 2 ? (
                  <TrajectoryStep
                    onBack={() => goToStep(1)}
                    onNext={() => goToStep(3)}
                  />
                ) : null}

                {step === 3 ? (
                  <CostOfWaitingStep
                    onBack={() => goToStep(2)}
                    onNext={() => goToStep(4)}
                  />
                ) : null}

                {step === 4 ? (
                  <ExploreStep
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onBack={() => goToStep(3)}
                    onNext={() => goToStep(5)}
                  />
                ) : null}

                {step === 5 ? (
                  <InterventionStep
                    onBack={() => goToStep(4)}
                    onNext={() => goToStep(6)}
                  />
                ) : null}

                {step === 6 ? (
                  <FinalStep
                    onBack={() => goToStep(5)}
                    onRestart={restartDemo}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7e9ef] py-7">
        <div className="mx-auto flex w-[min(1080px,calc(100%_-_32px))] flex-col items-start justify-between gap-4 text-[12px] text-[#727a86] sm:flex-row sm:items-center">
          <Brand />
          <div>Demo de produto · protótipo comercial</div>
        </div>
      </footer>
    </div>
  );
}
