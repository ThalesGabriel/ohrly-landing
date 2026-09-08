"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { CommercialIntentTrigger } from "@/components/commercial-intent-modal";

type DemoStep = 1 | 2 | 3 | 4;
type InitialChoice = "same" | "technova" | "alphacorp" | null;

const TOTAL_STEPS = 4;

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
    <div className="text-[11px] font-extrabold uppercase tracking-[.07em] text-[#87909d]">
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
    <div className="rounded-[15px] border border-[#eceef2] bg-[#f8f9fb] p-[14px]">
      <span className="block text-[10px] font-extrabold uppercase tracking-[.07em] text-[#828998]">
        {label}
      </span>
      <strong className="mt-1 block text-[21px] font-black tracking-[-0.04em] text-[#0b0d12]">
        {value}
      </strong>
    </div>
  );
}

function Chip({
  children,
  tone,
}: {
  children: ReactNode;
  tone: "good" | "bad";
}) {
  return (
    <span
      className={`rounded-full px-2.5 py-2 text-[11px] font-black ${
        tone === "good"
          ? "bg-[#ebf8f1] text-[#18794e]"
          : "bg-[#fff1f0] text-[#b42318]"
      }`}
    >
      {children}
    </span>
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
    <div className="mx-auto grid w-[min(1080px,calc(100%_-_32px))] grid-cols-4 gap-[7px] pb-5 pt-3">
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

function SnapshotCard({
  name,
  subtitle,
}: {
  name: string;
  subtitle: string;
}) {
  return (
    <article className="rounded-[24px] border border-[#e7e9ef] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Tiny>{subtitle}</Tiny>
          <div className="mt-1 text-[26px] font-black tracking-[-0.04em]">
            {name}
          </div>
          <div className="mt-1 text-[13px] text-[#727b87]">
            Conta recorrente · plano Pro
          </div>
        </div>

        <span className="rounded-full bg-[#f5f6f8] px-2.5 py-1.5 text-[11px] font-black text-[#3f4651]">
          hoje
        </span>
      </div>

      <div className="mt-[18px] grid grid-cols-2 gap-2.5">
        <Metric label="Usuários ativos" value="40" />
        <Metric label="Receita atual" value="Estável" />
      </div>
    </article>
  );
}

function QueueStep({
  choice,
  onChoose,
  onContinue,
}: {
  choice: InitialChoice;
  onChoose: (choice: InitialChoice) => void;
  onContinue: () => void;
}) {
  const choiceLabel =
    choice === "same"
      ? "Tratar igual"
      : choice === "technova"
        ? "Investigar TechNova"
        : choice === "alphacorp"
          ? "Investigar AlphaCorp"
          : null;

  const options: Array<{
    key: Exclude<InitialChoice, null>;
    label: string;
    analyticsId: string;
  }> = [
    {
      key: "same",
      label: "Tratar igual",
      analyticsId: "demo_initial_choice_same",
    },
    {
      key: "technova",
      label: "Investigar TechNova",
      analyticsId: "demo_initial_choice_technova",
    },
    {
      key: "alphacorp",
      label: "Investigar AlphaCorp",
      analyticsId: "demo_initial_choice_alphacorp",
    },
  ];

  return (
    <div>
      <div className="mb-[22px] max-w-[790px]">
        <Tiny>01 · A fotografia atual</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          Você faria alguma coisa diferente com esses dois clientes hoje?
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          Antes de ver a trajetória, escolha como você trataria as duas contas
          olhando apenas o estado atual.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SnapshotCard name="TechNova" subtitle="Cliente A · SaaS" />
        <SnapshotCard name="AlphaCorp" subtitle="Cliente B · Serviços" />
      </div>

      <div className="mt-[18px] flex flex-wrap gap-2.5">
        {options.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => onChoose(option.key)}
            data-analytics-cta={option.analyticsId}
            data-analytics-location="demo_snapshot"
            data-analytics-label={option.label}
            aria-pressed={choice === option.key}
            className={`rounded-[14px] border px-4 py-3 text-[13px] font-extrabold transition ${
              choice === option.key
                ? "border-[#3568f5] text-[#3568f5] shadow-[0_0_0_3px_rgba(53,104,245,.12)]"
                : "border-[#e7e9ef] bg-white text-[#0b0d12] hover:border-[#bac7ff]"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {choiceLabel ? (
        <div className="mt-4 rounded-[16px] border border-[#dfe7ff] bg-[#f4f7ff] px-[17px] py-[15px] text-[14px] leading-[1.5] text-[#2b3852]">
          Sua escolha inicial: <strong>{choiceLabel}</strong>. Agora vamos ver
          se a trajetória muda essa decisão.
        </div>
      ) : null}

      <div className="mt-[22px] flex justify-end border-t border-[#e7e9ef] pt-[18px]">
        {choice ? (
          <button
            type="button"
            onClick={onContinue}
            data-analytics-cta="demo_history_reveal"
            data-analytics-location="demo_snapshot"
            data-analytics-label="Ver a história"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#3568f5] bg-[#3568f5] px-[18px] text-[13px] font-extrabold text-white shadow-[0_5px_0_#18399f] transition hover:-translate-y-px"
          >
            Ver a história
            <ArrowRight size={14} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

function TrendChart({
  direction,
}: {
  direction: "up" | "down";
}) {
  const isUp = direction === "up";
  const color = isUp ? "#3568f5" : "#d84a4a";
  const points = isUp
    ? "0,142 80,136 160,122 240,101 320,76 400,53 500,28"
    : "0,28 80,44 160,67 240,87 320,108 400,128 500,145";
  const area = isUp
    ? "M0 142 L80 136 L160 122 L240 101 L320 76 L400 53 L500 28 L500 165 L0 165 Z"
    : "M0 28 L80 44 L160 67 L240 87 L320 108 L400 128 L500 145 L500 165 L0 165 Z";
  const gradientId = isUp ? "technova-area" : "alphacorp-area";

  return (
    <div className="relative mt-[18px] h-[165px] overflow-hidden rounded-[18px] border border-[#edf0f5] bg-[#fcfdff]">
      <div className="absolute inset-0 bg-[linear-gradient(#edf0f5_1px,transparent_1px)] bg-[size:100%_33.33%]" />
      <svg
        viewBox="0 0 500 165"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity=".22" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradientId})`} />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function TrajectoryCard({
  name,
  before,
  direction,
  signals,
  headline,
  body,
}: {
  name: string;
  before: string;
  direction: "up" | "down";
  signals: string[];
  headline: string;
  body: string;
}) {
  const isUp = direction === "up";

  return (
    <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Tiny>{name}</Tiny>
          <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
            40 usuários hoje
          </h3>
          <p className="mt-1 text-[13px] text-[#727b87]">
            Há 90 dias: {before} usuários
          </p>
        </div>

        <span className="rounded-full bg-[#f5f6f8] px-2.5 py-1.5 text-[11px] font-black text-[#3f4651]">
          receita estável
        </span>
      </div>

      <TrendChart direction={direction} />

      <div className="mt-3 flex justify-between gap-3 text-[11px] font-bold text-[#858b96]">
        <span>90 dias atrás · {before}</span>
        <span>Hoje · 40</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {signals.map((signal) => (
          <Chip key={signal} tone={isUp ? "good" : "bad"}>
            {isUp ? "+ " : "− "}
            {signal}
          </Chip>
        ))}
      </div>

      <div
        className={`mt-4 rounded-[17px] border p-4 ${
          isUp
            ? "border-[#dfe7ff] bg-[#eef3ff]"
            : "border-[#ffdede] bg-[#fff1f1]"
        }`}
      >
        <div className="flex items-start gap-3">
          <div
            className={`grid size-10 shrink-0 place-items-center rounded-[12px] text-white ${
              isUp ? "bg-[#3568f5]" : "bg-[#d84a4a]"
            }`}
          >
            {isUp ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          </div>
          <div>
            <strong className="block text-[14px] leading-[1.4] text-[#0b0d12]">
              {headline}
            </strong>
            <p className="mt-1 text-[12px] leading-[1.48] text-[#667085]">
              {body}
            </p>
          </div>
        </div>
      </div>
    </article>
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
      <div className="mb-[22px] max-w-[790px]">
        <Tiny>02 · A história aparece</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          O mesmo estado atual veio de trajetórias opostas.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          O número de hoje é parecido. O caminho até ele não é.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <TrajectoryCard
          name="TechNova"
          before="12"
          direction="up"
          signals={["nova área", "stakeholders", "novo caso de uso"]}
          headline="Relacionamento em evolução positiva."
          body="A relação passou a operar em um patamar diferente da própria história."
        />

        <TrajectoryCard
          name="AlphaCorp"
          before="52"
          direction="down"
          signals={["champion saiu", "respostas ↓", "decisor distante"]}
          headline="A receita ainda não mudou. A relação já mudou."
          body="A sustentação da relação ficou mais frágil antes de aparecer no faturamento."
        />
      </div>

      <div className="mt-[18px] rounded-[20px] bg-[#0b0d12] px-[22px] py-5 text-white">
        <strong className="block text-[22px] font-black tracking-[-0.025em]">
          Agora você trataria os dois da mesma forma?
        </strong>
        <p className="mt-[7px] text-[14px] leading-[1.5] text-[#b8c0ce]">
          Se sua decisão mudou, a trajetória acrescentou uma informação que o
          estado atual não carregava.
        </p>
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Ver a leitura do Ohrly"
        nextCtaId="demo_decision_view"
      />
    </div>
  );
}

function DecisionCard({
  name,
  state,
  history,
  tone,
  decision,
  body,
}: {
  name: string;
  state: string;
  history: string;
  tone: "growth" | "retention";
  decision: string;
  body: string;
}) {
  const growth = tone === "growth";

  return (
    <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
      <Tiny>{name}</Tiny>
      <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
        {state}
      </h3>

      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Metric label="Hoje" value="40 usuários" />
        <Metric label="História" value={history} />
      </div>

      <div
        className={`mt-4 rounded-[16px] px-4 py-[15px] text-[13px] leading-[1.48] ${
          growth
            ? "bg-[#ebf8f1] text-[#155e42]"
            : "bg-[#fff5e9] text-[#7d4a00]"
        }`}
      >
        <strong className="block">{decision}</strong>
        {body}
      </div>
    </article>
  );
}

function DecisionStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <div>
      <div className="mb-[22px] max-w-[790px]">
        <Tiny>03 · Da mudança à decisão</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          O mesmo estado atual pode pedir decisões de receita diferentes.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          O Ohrly não tenta adivinhar o futuro. Ele interpreta quando a estratégia
          atual pode ter ficado para trás em relação ao que mudou.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <DecisionCard
          name="TechNova"
          state="Relacionamento em evolução positiva"
          history="12 → 40"
          tone="growth"
          decision="Decisão a investigar → expansão"
          body="A estratégia comercial atual pode ter ficado pequena para a relação."
        />

        <DecisionCard
          name="AlphaCorp"
          state="Relacionamento em deterioração"
          history="52 → 40"
          tone="retention"
          decision="Decisão a investigar → retenção"
          body="A receita segue estável, mas a relação perdeu sustentação."
        />
      </div>

      <div className="mt-[18px] rounded-[20px] bg-[#0b0d12] px-[22px] py-5 text-white">
        <strong className="block text-[22px] font-black tracking-[-0.025em]">
          Mesmo estado atual. Decisões diferentes.
        </strong>
        <p className="mt-[7px] text-[14px] leading-[1.5] text-[#b8c0ce]">
          O Ohrly começa quando a relação muda — e conecta essa mudança ao que
          pode estar em jogo economicamente.
        </p>
      </div>

      <StepNav
        onBack={onBack}
        onNext={onNext}
        nextLabel="Ver o que acontece depois"
        nextCtaId="demo_after_action_view"
      />
    </div>
  );
}

function ActionRow({
  date,
  title,
  result,
  tone,
}: {
  date: string;
  title: string;
  result: string;
  tone: "good" | "warn" | "risk";
}) {
  const toneClass = {
    good: "bg-[#ebf8f1] text-[#18794e]",
    warn: "bg-[#fff5e9] text-[#a15c00]",
    risk: "bg-[#fff1f0] text-[#b42318]",
  }[tone];

  return (
    <div className="grid gap-3 rounded-[16px] border border-[#e7e9ef] bg-white px-[14px] py-[13px] sm:grid-cols-[78px_1fr_auto] sm:items-center">
      <Tiny>{date}</Tiny>
      <strong className="text-[13px] text-[#0b0d12]">{title}</strong>
      <span
        className={`w-fit rounded-full px-2 py-1 text-[10px] font-black ${toneClass}`}
      >
        {result}
      </span>
    </div>
  );
}

function AfterActionCard({
  name,
  mode,
  actions,
  observed,
}: {
  name: string;
  mode: string;
  actions: Array<{
    date: string;
    title: string;
    result: string;
    tone: "good" | "warn" | "risk";
  }>;
  observed: string;
}) {
  return (
    <article className="rounded-[22px] border border-[#e7e9ef] bg-white p-5">
      <Tiny>
        {name} · {mode}
      </Tiny>
      <h3 className="mt-1 text-[22px] font-black tracking-[-0.035em]">
        Estratégia revisada
      </h3>

      <div className="mt-4 grid gap-[9px]">
        {actions.map((action) => (
          <ActionRow
            key={`${action.date}-${action.title}`}
            date={action.date}
            title={action.title}
            result={action.result}
            tone={action.tone}
          />
        ))}
      </div>

      <div className="mt-5 border-l-[3px] border-[#3568f5] py-2 pl-4">
        <strong className="text-[14px] text-[#0b0d12]">
          Observado depois
        </strong>
        <p className="mt-1 text-[12px] leading-[1.48] text-[#667085]">
          {observed}
        </p>
      </div>
    </article>
  );
}

function FinalStep({
  onBack,
  onRestart,
}: {
  onBack: () => void;
  onRestart: () => void;
}) {
  const technovaActions = [
    {
      date: "05 ago",
      title: "AM aborda nova área",
      result: "contato aberto",
      tone: "good" as const,
    },
    {
      date: "09 ago",
      title: "Nova área entra na conversa",
      result: "interesse",
      tone: "good" as const,
    },
    {
      date: "14 ago",
      title: "Oportunidade comercial registrada",
      result: "em avaliação",
      tone: "good" as const,
    },
  ];

  const alphaActions = [
    {
      date: "05 ago",
      title: "Tentativa de reconstruir sponsor",
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
      title: "Novo stakeholder entra",
      result: "contato ativo",
      tone: "good" as const,
    },
  ];

  return (
    <div>
      <div className="mb-[22px] max-w-[790px]">
        <Tiny>04 · Depois da decisão</Tiny>
        <h2 className="mt-1.5 text-[32px] font-black leading-[1.05] tracking-[-0.045em]">
          O trabalho não termina quando o time age.
        </h2>
        <p className="mt-2.5 text-[15px] leading-[1.55] text-[#6b7280]">
          Ohrly preserva a decisão e continua observando como a relação evolui
          depois.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <AfterActionCard
          name="TechNova"
          mode="expansão"
          actions={technovaActions}
          observed="Mais stakeholders participam e o novo caso de uso continua ativo."
        />

        <AfterActionCard
          name="AlphaCorp"
          mode="retenção"
          actions={alphaActions}
          observed="A relação volta a ter um ponto de contato, mas ainda não há recuperação completa."
        />
      </div>

      <div className="mt-[18px] rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] p-[18px] text-[13px] leading-[1.5] text-[#2b3852]">
        <strong className="block">
          Importante: o Ohrly não afirma que uma ação causou o resultado.
        </strong>
        Ele preserva a sequência entre mudança, decisão, intervenção e resposta
        observada.
      </div>

      <div
        id="final"
        className="mt-[22px] grid items-center gap-[22px] rounded-[28px] bg-[#3568f5] p-7 text-white lg:grid-cols-[1fr_auto]"
      >
        <div>
          <h2 className="text-[30px] font-black leading-[1.04] tracking-[-0.045em] sm:text-[34px]">
            Seu cliente mudou. Sua estratégia mudou junto?
          </h2>
          <p className="mt-2 max-w-[650px] text-[14px] leading-[1.5] text-[#dce5ff]">
            O Ohrly transforma mudanças no comportamento dos seus clientes em
            decisões de crescimento e retenção de receita.
          </p>
        </div>

        <CommercialIntentTrigger
          ctaId="demo_final_analyze_customers"
          location="demo_final_cta"
          label="Analisar meus clientes"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white bg-white px-5 font-extrabold text-[#0b0d12] shadow-[0_6px_0_#0d2e9f] transition hover:-translate-y-px"
        >
          Analisar meus clientes
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
  const [initialChoice, setInitialChoice] = useState<InitialChoice>(null);

  function goToStep(nextStep: DemoStep) {
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function restartDemo() {
    setInitialChoice(null);
    goToStep(1);
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-[#0b0d12]">
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
              ctaId="demo_nav_analyze_customers"
              location="demo_navigation"
              label="Analisar minha base"
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-4 text-[13px] font-extrabold text-white shadow-[0_5px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_7px_0_#3568f5]"
            >
              Analisar minha base
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
              Dois clientes parecem iguais hoje.
              <span className="text-[#3568f5]">
                {" "}A história muda a decisão.
              </span>
            </h1>

            <p className="mx-auto mt-[18px] max-w-[760px] text-[16px] leading-[1.55] text-[#4b5360] sm:text-[17px]">
              Veja como o Ohrly transforma mudanças no comportamento dos seus
              clientes em decisões de crescimento e retenção de receita.
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
                  <Tiny>Relações em revisão</Tiny>
                  <div className="mt-1 text-[19px] font-black tracking-[-0.03em]">
                    Mesmo estado atual. Histórias diferentes.
                  </div>
                </div>

                <div className="rounded-full bg-[#eef3ff] px-[11px] py-2 text-[11px] font-black text-[#3568f5]">
                  Passo {step} de {TOTAL_STEPS}
                </div>
              </div>

              <div className="p-[18px] sm:p-6">
                {step === 1 ? (
                  <QueueStep
                    choice={initialChoice}
                    onChoose={setInitialChoice}
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
                  <DecisionStep
                    onBack={() => goToStep(2)}
                    onNext={() => goToStep(4)}
                  />
                ) : null}

                {step === 4 ? (
                  <FinalStep
                    onBack={() => goToStep(3)}
                    onRestart={restartDemo}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7e9ef] bg-white py-7">
        <div className="mx-auto flex w-[min(1080px,calc(100%_-_32px))] flex-col items-start justify-between gap-4 text-[12px] text-[#727a86] sm:flex-row sm:items-center">
          <Brand />
          <div>Demo de produto · protótipo comercial</div>
        </div>
      </footer>
    </div>
  );
}
