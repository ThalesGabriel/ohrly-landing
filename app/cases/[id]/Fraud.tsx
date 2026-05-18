"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  CircleOff,
  Clock3,
  CreditCard,
  Database,
  Gauge,
  GitBranch,
  Info,
  Layers3,
  LineChart,
  Network,
  Radar,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Target,
  TimerReset,
  TrendingUp,
  Waves,
  XCircle,
  Zap,
} from "lucide-react";

import DefaultPage from "@/components/DefaultPage";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";

const navigation = ["Estudos", "Como funciona", "Por que importa", "Sobre", "Diagnóstico"];

const caseStudyTabs = [
  {
    id: "overview",
    label: "Visão geral",
    description: "Por que usamos fraude para testar a tese comportamental.",
  },
  {
    id: "method",
    label: "Método",
    description: "Como saímos de transações isoladas para trajetórias comportamentais.",
  },
  {
    id: "model",
    label: "Modelo Ohrly",
    description: "Persistência, aceleração, densidade, intensidade e momentum.",
  },
  {
    id: "comparison",
    label: "Comparação",
    description: "Baseline vs Ohrly V1 vs Ohrly V2.",
  },
  {
    id: "result",
    label: "Resultado",
    description: "O que foi validado, o que não foi e o que vem depois.",
  },
];

const overviewStats = [
  {
    icon: Database,
    label: "Volume",
    value: "555.719 transações",
  },
  {
    icon: Shield,
    label: "Contexto",
    value: "Detecção de fraude",
  },
  {
    icon: BrainCircuit,
    label: "Hipótese",
    value: "A fraude pode ser uma construção progressiva",
  },
  {
    icon: Target,
    label: "Saída",
    value: "Baseline vs Ohrly V1 vs V2",
  },
];

const methodPipeline = [
  {
    icon: Database,
    title: "Transações brutas",
    description: "Valor, horário, cartão, categoria e merchant.",
  },
  {
    icon: GitBranch,
    title: "Trajetória por entidade",
    description: "Reorganização por cartão e sequência temporal.",
  },
  {
    icon: Clock3,
    title: "Baseline comportamental",
    description: "Histórico recente como referência.",
  },
  {
    icon: Activity,
    title: "Sinais Ohrly",
    description: "Persistência, intensidade, densidade e aceleração.",
  },
  {
    icon: ShieldAlert,
    title: "Detector transacional",
    description: "Modelo antifraude baseline.",
  },
  {
    icon: BarChart3,
    title: "Comparação incremental",
    description: "Baseline, Ohrly V1 e Ohrly V2.",
  },
];

const readings = [
  {
    step: "1",
    icon: CreditCard,
    question: "Fraudes aparecem isoladas ou agrupadas?",
    analyzed: "Distribuição temporal das fraudes por cartão.",
    result: "Muitas fraudes apareceram em sequência no mesmo cartão.",
    proves: "Fraude pode ser analisada como episódio comportamental, não apenas evento.",
  },
  {
    step: "2",
    icon: Gauge,
    question: "A fraude rompe o histórico recente?",
    analyzed: "Valor da transação contra média e máximo recente do cartão.",
    result: "Algumas fraudes eram rupturas claras; outras pareciam plausíveis isoladamente.",
    proves: "Magnitude ajuda, mas não basta.",
  },
  {
    step: "3",
    icon: TrendingUp,
    question: "Existe aceleração temporal?",
    analyzed: "Tempo entre fraudes consecutivas, mudança de categoria e valor.",
    result: "Fraudes frequentemente surgiram em rajadas curtas.",
    proves: "Ritmo e sequência importam para interpretar risco.",
  },
  {
    step: "4",
    icon: AlertTriangle,
    question: "Desvio isolado é suficiente?",
    analyzed: "Média móvel, z-score e sinais anômalos.",
    result: "Muitos desvios não eram fraude.",
    proves: "Anomalia isolada gera ruído.",
  },
  {
    step: "5",
    icon: Layers3,
    question: "Persistência muda o significado?",
    analyzed: "Quantidade recente de sinais anômalos por cartão.",
    result: "A persistência apareceu como uma das features mais importantes.",
    proves: "O modelo aprende trajetória, não apenas evento.",
  },
  {
    step: "6",
    icon: TimerReset,
    question: "Existe janela antes da fraude?",
    analyzed: "Tempo entre primeiro sinal persistente e fraude explícita.",
    result: "Alguns casos apresentaram janelas de horas, dias ou mais.",
    proves: "Parte dos incidentes possui construção comportamental observável.",
  },
  {
    step: "7",
    icon: ShieldCheck,
    question: "O Ohrly melhora um detector?",
    analyzed: "Comparação entre modelo baseline, Ohrly V1 e Ohrly V2.",
    result: "O V2 aumentou precision, F1 e PR-AUC mantendo recall.",
    proves: "Sinais comportamentais podem complementar sistemas de decisão.",
  },
];

const modelFactors = [
  {
    icon: Radar,
    title: "Persistência",
    description: "Quantos sinais recentes se acumulam?",
    short: "P",
  },
  {
    icon: TrendingUp,
    title: "Aceleração",
    description: "A incoerência está crescendo mais rápido?",
    short: "A",
  },
  {
    icon: Network,
    title: "Densidade",
    description: "Os eventos estão ficando mais concentrados?",
    short: "D",
  },
  {
    icon: Zap,
    title: "Intensidade",
    description: "Qual é a força total dos desvios recentes?",
    short: "I",
  },
  {
    icon: Waves,
    title: "Momentum",
    description: "A trajetória está ganhando energia comportamental?",
    short: "M",
  },
];

const modelResults = [
  {
    rank: "1",
    name: "Antifraude baseline",
    precision: "0.306",
    recall: "0.934",
    f1: "0.461",
    prAuc: "0.748",
    alerts: "415",
    description: "Modelo transacional usando features tradicionais.",
    icon: ShieldAlert,
  },
  {
    rank: "2",
    name: "Antifraude + Ohrly V1",
    precision: "0.466",
    recall: "0.919",
    f1: "0.619",
    prAuc: "0.879",
    alerts: "268",
    description: "Adiciona sinais iniciais de comportamento.",
    icon: Activity,
  },
  {
    rank: "3",
    name: "Antifraude + Ohrly V2",
    precision: "0.536",
    recall: "0.934",
    f1: "0.681",
    prAuc: "0.906",
    alerts: "237",
    description: "Adiciona energia, aceleração, densidade e momentum.",
    icon: BadgeCheck,
    highlighted: true,
  },
];

const v2Signals = [
  {
    icon: Zap,
    title: "Energia de degradação",
    description: "Soma da intensidade dos desvios recentes.",
  },
  {
    icon: TrendingUp,
    title: "Aceleração",
    description: "Velocidade com que os sinais anômalos crescem.",
  },
  {
    icon: Network,
    title: "Densidade do episódio",
    description: "Concentração de eventos dentro de uma janela degradada.",
  },
  {
    icon: Waves,
    title: "Momentum comportamental",
    description: "Combinação entre persistência, energia e aceleração.",
  },
  {
    icon: Activity,
    title: "Instabilidade recente",
    description: "Proporção de sinais anômalos nas últimas transações.",
  },
];

const findings = [
  {
    icon: Target,
    title: "Desvio isolado não basta",
    text: "Eventos pontuais geram muito ruído e pouco poder preditivo.",
    tone: "text-rose-300 bg-rose-400/10 border-rose-300/20",
  },
  {
    icon: Layers3,
    title: "Persistência foi uma das features mais relevantes",
    text: "A acumulação de sinais recentes melhorou a precisão do modelo.",
    tone: "text-violet-300 bg-violet-400/10 border-violet-300/20",
  },
  {
    icon: Network,
    title: "Fraudes parecem mais densas",
    text: "Trajetórias fraudulentas tendem a concentrar eventos.",
    tone: "text-fuchsia-300 bg-fuchsia-400/10 border-fuchsia-300/20",
  },
  {
    icon: TrendingUp,
    title: "Aceleração diferenciou trajetórias críticas",
    text: "Crescimento rápido dos sinais antecipou eventos de fraude.",
    tone: "text-blue-300 bg-blue-400/10 border-blue-300/20",
  },
  {
    icon: ShieldCheck,
    title: "Ohrly reduziu ruído sem perder recall",
    text: "Menos alertas falsos, mesmo mantendo alta cobertura.",
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
  },
];

const notClaims = [
  "O Ohrly não detecta fraude sozinho.",
  "Nem toda fraude possui precursores.",
  "Não prova causalidade.",
  "Não substitui um motor antifraude enterprise.",
  "Não recomenda bloqueio automático de transações.",
];

const proofs = [
  "Trajetórias comportamentais carregam informação útil.",
  "Persistência reduz ruído de anomalias isoladas.",
  "Aceleração e densidade ajudam a diferenciar episódios críticos.",
  "Um detector simples melhorou ao receber sinais Ohrly.",
  "Ohrly funciona como camada complementar de contexto comportamental.",
];

const trajectoryShift = [
  { before: "Transação isolada", after: "Sequência comportamental" },
  { before: "Evento", after: "Episódio" },
  { before: "Anomalia", after: "Trajetória" },
  { before: "Score pontual", after: "Mudança de regime" },
  { before: "Fraude como label", after: "Fraude como formalização tardia" },
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030816]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="flex items-center gap-3 text-3xl font-black tracking-tight text-white">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-violet-200 shadow-lg shadow-violet-950/40">
            <Radar className="h-5 w-5" />
          </span>
          Ohrly
        </a>

        <nav className="hidden items-center gap-10 text-sm font-semibold text-slate-200 lg:flex">
          {navigation.map((item) => (
            <a
              key={item}
              href="#"
              className={cn(
                "transition hover:text-violet-300",
                item === "Diagnóstico" && "text-violet-300",
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        <a
          href="#diagnostico"
          className="rounded-xl border border-violet-300/40 bg-violet-600/30 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-950/30 transition hover:border-violet-200 hover:bg-violet-500/40"
        >
          Analisar um fluxo
        </a>
      </div>
    </header>
  );
}

function SectionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl",
        className,
      )}
    >
      {children}
    </section>
  );
}

function StatCard({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-violet-200">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 text-sm font-black leading-5 text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function HeroChart() {
  return (
    <div className="relative h-48 overflow-hidden rounded-2xl border border-white/10 bg-[#040a18]/80 p-4">
      <div className="absolute inset-x-4 top-6 flex items-center justify-between text-[10px] font-bold text-slate-500">
        <span>Índice de degradação</span>
        <span className="rounded-lg border border-violet-300/20 bg-violet-500/15 px-2 py-1 text-violet-200">
          A degradação se acumula
        </span>
      </div>
      <svg className="absolute inset-x-4 bottom-6 top-12 h-[118px] w-[calc(100%-2rem)]" viewBox="0 0 360 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="fraudLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="fraudFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[20, 45, 70, 95].map((y) => (
          <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="rgba(255,255,255,.08)" strokeDasharray="4 6" />
        ))}
        <path
          d="M0 104 L35 100 L62 88 L88 94 L116 68 L143 80 L170 53 L195 69 L220 41 L246 56 L272 39 L300 25 L328 30 L360 12 L360 120 L0 120 Z"
          fill="url(#fraudFill)"
        />
        <path
          d="M0 104 L35 100 L62 88 L88 94 L116 68 L143 80 L170 53 L195 69 L220 41 L246 56 L272 39 L300 25 L328 30 L360 12"
          fill="none"
          stroke="url(#fraudLine)"
          strokeWidth="3"
        />
        {[0, 35, 62, 88, 116, 143, 170, 195, 220, 246, 272, 300, 328, 360].map((x, index) => {
          const y = [104, 100, 88, 94, 68, 80, 53, 69, 41, 56, 39, 25, 30, 12][index];
          return <circle key={x} cx={x} cy={y} r="4" fill="#d8b4fe" />;
        })}
      </svg>
      <div className="absolute bottom-3 left-4 right-4 flex justify-between text-[10px] font-bold text-slate-500">
        <span>Início</span>
        <span>Tempo (transações)</span>
        <span>Fim</span>
      </div>
    </div>
  );
}

function HeroHighlight() {
  return (
    <SectionCard className="self-start p-7">
      <h2 className="text-xl font-black text-white">Visão geral da base analisada</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {overviewStats.map((stat) => {
          const Icon = stat.icon;
          return <StatCard key={stat.label} icon={<Icon className="h-5 w-5" />} label={stat.label} value={stat.value} />;
        })}
      </div>

      <div className="mt-6">
        <HeroChart />
      </div>
    </SectionCard>
  );
}

function StudyObjective() {
  return (
    <div className="mt-8 flex items-start gap-4 rounded-2xl border border-violet-300/20 bg-violet-500/10 p-4 text-sm leading-6 text-slate-200">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-[#071127] text-violet-200 shadow-sm">
        <Target className="h-5 w-5" />
      </div>

      <div>
        <p className="font-black text-white">Objetivo do estudo</p>
        <p className="mt-2">
          Entender se sinais comportamentais como persistência, aceleração, densidade e momentum podem enriquecer a leitura de risco de um detector antifraude.
        </p>
      </div>
    </div>
  );
}

function MethodPipelineSection() {
  return (
    <SectionCard>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Como o estudo funciona</p>
          <h2 className="mt-3 text-2xl font-black text-white">Da transação isolada à trajetória comportamental</h2>
        </div>

        <p className="max-w-xl text-sm leading-7 text-slate-400">
          O método não tenta substituir antifraude. Ele transforma transações em trajetória, cria sinais comportamentais e mede se esses sinais melhoram um detector transacional.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {methodPipeline.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={item.title} className="relative rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <div className="mb-5 flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-sm font-black text-violet-200">
                  {index + 1}
                </span>
                {index < methodPipeline.length - 1 && <ArrowRight className="hidden h-4 w-4 text-slate-600 lg:block" />}
              </div>
              <Icon className="mb-4 h-6 w-6 text-violet-300" />
              <h3 className="text-sm font-black text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function TrajectoryShiftSection() {
  return (
    <SectionCard>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Virada conceitual</p>
          <h2 className="mt-3 text-2xl font-black text-white">A pergunta deixou de ser “essa transação é fraude?”</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            A leitura passou a investigar se a transação fazia parte de uma trajetória que começou a perder coerência. Isso muda a unidade de análise: do evento isolado para o episódio comportamental.
          </p>

          <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-500/[0.08] p-5">
            <p className="text-sm font-bold leading-7 text-slate-100">
              O estudo não tenta provar que toda fraude é previsível. Ele testa se parte dos eventos críticos carrega uma construção comportamental antes ou ao redor da ruptura explícita.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#071127]/70">
          <div className="grid grid-cols-[1fr_56px_1fr] border-b border-white/10 bg-white/[0.035] px-5 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            <span>Antes</span>
            <span />
            <span className="text-violet-300">Depois</span>
          </div>
          <div>
            {trajectoryShift.map((item, index) => (
              <div key={item.before} className={cn("grid grid-cols-[1fr_56px_1fr] items-center border-b border-white/10 px-5 py-4", index === trajectoryShift.length - 1 && "border-b-0")}>
                <p className="text-sm font-semibold text-slate-300">{item.before}</p>
                <div className="flex justify-center">
                  <ArrowRight className="h-4 w-4 text-violet-300" />
                </div>
                <p className="text-sm font-black text-white">{item.after}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function InvestigationTable() {
  const [openStep, setOpenStep] = useState<number | string | null>(readings[0]?.step ?? null);

  function toggleStep(step: number | string) {
    setOpenStep((current) => (current === step ? null : step));
  }

  return (
    <SectionCard>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-black text-white">As perguntas que guiaram a investigação</h2>
          <p className="mt-2 text-sm leading-7 text-slate-300">
            Cada leitura foi desenhada para reduzir uma ambiguidade: evento isolado, ruptura de valor, persistência, aceleração, janela de decisão e ganho incremental no detector.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {readings.map((reading) => {
          const Icon = reading.icon;
          const isOpen = openStep === reading.step;

          return (
            <div
              key={reading.step}
              className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-300",
                isOpen
                  ? "border-violet-300/30 bg-violet-500/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.22)]"
                  : "border-white/10 bg-[#071127]/70 hover:border-white/20 hover:bg-white/[0.045]",
              )}
            >
              <button
                type="button"
                onClick={() => toggleStep(reading.step)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black transition",
                      isOpen ? "bg-violet-600 text-white" : "border border-violet-300/30 bg-violet-500/10 text-violet-200",
                    )}
                  >
                    {reading.step}
                  </span>

                  <div className="min-w-0">
                    <div className="mb-1 flex items-center gap-2">
                      <Icon className={cn("h-4 w-4 shrink-0 transition", isOpen ? "text-violet-300" : "text-slate-500")} />
                      <span className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">Leitura {reading.step}</span>
                    </div>
                    <h3 className="text-base font-black leading-6 text-white md:text-lg">{reading.question}</h3>
                  </div>
                </div>

                <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-violet-300")} />
              </button>

              <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 px-5 pb-5 pt-5">
                    <div className="grid gap-4 lg:grid-cols-3">
                      <InvestigationDetail label="O que analisamos" value={reading.analyzed} />
                      <InvestigationDetail label="O que encontramos" value={reading.result} />
                      <InvestigationDetail label="O que isso prova" value={reading.proves} highlighted />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function InvestigationDetail({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-4", highlighted ? "border-violet-300/20 bg-violet-500/10" : "border-white/10 bg-white/[0.035]")}> 
      <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className={cn("text-sm leading-7", highlighted ? "font-semibold text-slate-100" : "text-slate-300")}>{value}</p>
    </div>
  );
}

function OhrlyModelSection() {
  return (
    <SectionCard>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Modelo Ohrly</p>
        <h2 className="mt-3 text-2xl font-black text-white">Na fraude, o Ohrly mede momentum de degradação comportamental</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Diferente do estudo SEFAZ/EMLURB, aqui o objetivo não é medir pressão de recuperação operacional. O objetivo é enriquecer um detector com sinais leves de trajetória.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {modelFactors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div key={factor.title} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-violet-200">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black text-white">{factor.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{factor.description}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_280px] lg:items-center">
          <div className="flex flex-wrap items-center gap-3">
            {modelFactors.map((factor, index) => {
              const Icon = factor.icon;
              return (
                <div key={factor.title} className="flex items-center gap-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] px-4 py-3 text-center">
                    <Icon className="mx-auto h-5 w-5 text-violet-300" />
                    <p className="mt-2 text-[11px] font-black text-white">{factor.title}</p>
                    <p className="text-[10px] font-bold text-slate-500">({factor.short})</p>
                  </div>
                  {index < modelFactors.length - 1 && <span className="text-xl font-black text-slate-500">+</span>}
                </div>
              );
            })}
            <span className="text-xl font-black text-slate-500">=</span>
            <div className="rounded-xl border border-violet-300/20 bg-violet-500/10 px-5 py-3 text-center">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">Ohrly Score</p>
              <p className="mt-1 text-sm font-black text-white">Índice de degradação comportamental</p>
            </div>
          </div>

          <MiniLineCard />
        </div>

        <div className="mt-5 rounded-2xl border border-violet-300/20 bg-violet-500/[0.08] p-4 text-center">
          <p className="text-sm font-black text-violet-100">Na fraude, o Ohrly mede momentum de degradação comportamental.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function MiniLineCard() {
  return (
    <div className="h-28 rounded-2xl border border-violet-300/20 bg-violet-500/[0.06] p-4">
      <svg className="h-full w-full" viewBox="0 0 240 90" preserveAspectRatio="none">
        <defs>
          <linearGradient id="miniLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="100%" stopColor="#a855f7" />
          </linearGradient>
          <linearGradient id="miniFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 78 L32 72 L62 67 L94 70 L126 50 L154 38 L184 44 L214 24 L240 12 L240 90 L0 90 Z" fill="url(#miniFill)" />
        <path d="M0 78 L32 72 L62 67 L94 70 L126 50 L154 38 L184 44 L214 24 L240 12" fill="none" stroke="url(#miniLine)" strokeWidth="3" />
        {[0, 32, 62, 94, 126, 154, 184, 214, 240].map((x, index) => {
          const y = [78, 72, 67, 70, 50, 38, 44, 24, 12][index];
          return <circle key={x} cx={x} cy={y} r="4" fill="#d8b4fe" />;
        })}
      </svg>
    </div>
  );
}

function V2SignalsSection() {
  return (
    <SectionCard>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">O que mudou no V2</p>
          <h2 className="mt-3 text-2xl font-black text-white">O V2 adiciona leitura de trajetória, não “mais dados antifraude”</h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-slate-400">
          As novas variáveis foram desenhadas a partir do que apareceu no estudo: persistência, aceleração, densidade, intensidade acumulada e instabilidade recente.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {v2Signals.map((signal) => {
          const Icon = signal.icon;
          return (
            <div key={signal.title} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <Icon className="h-7 w-7 text-violet-300" />
              <h3 className="mt-5 text-base font-black text-white">{signal.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{signal.description}</p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function ModelComparisonSection() {
  return (
    <SectionCard>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Comparação dos modelos</p>
        <h2 className="mt-3 text-2xl font-black text-white">O V2 manteve recall e reduziu alertas</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          O resultado mais forte não foi apenas melhorar a precisão. Foi reduzir ruído mantendo a mesma cobertura do baseline.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {modelResults.map((result) => {
          const Icon = result.icon;

          return (
            <div
              key={result.name}
              className={cn(
                "relative rounded-2xl border p-5 transition",
                result.highlighted
                  ? "border-violet-300/50 bg-violet-500/[0.09] shadow-2xl shadow-violet-950/30"
                  : "border-white/10 bg-[#071127]/70",
              )}
            >

              <div className="flex items-center gap-3">
                <span className={cn("flex h-9 w-9 items-center justify-center rounded-xl text-sm font-black text-white", result.highlighted ? "bg-violet-600" : "bg-blue-600")}>{result.rank}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon className={cn("h-4 w-4", result.highlighted ? "text-violet-200" : "text-slate-500")} />
                    <h3 className="text-base font-black text-white">{result.name}</h3>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <MetricChip label="Precision" value={result.precision} />
                <MetricChip label="Recall" value={result.recall} />
                <MetricChip label="F1" value={result.f1} />
                <MetricChip label="PR-AUC" value={result.prAuc} />
                <MetricChip label="Alertas" value={result.alerts} />
              </div>

              <p className="mt-5 text-sm leading-6 text-slate-400">{result.description}</p>

            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-500/[0.08] p-5 text-center">
        <p className="text-sm font-bold leading-7 text-slate-100">
          O V2 manteve o recall do baseline e reduziu alertas de <span className="font-black text-white">415</span> para <span className="font-black text-white">237</span>.
        </p>
      </div>
    </SectionCard>
  );
}

function MetricChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.035] px-2 py-3 text-center">
      <p className="text-[10px] font-bold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-black text-white">{value}</p>
    </div>
  );
}

function FindingsSection() {
  return (
    <SectionCard>
      <h2 className="text-2xl font-black text-white">O que o estudo revelou</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {findings.map((finding) => {
          const Icon = finding.icon;
          return (
            <div key={finding.title} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5 shadow-xl shadow-black/10">
              <div className={cn("mb-5 flex h-12 w-12 items-center justify-center rounded-full border", finding.tone)}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-black leading-snug text-white">{finding.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{finding.text}</p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

function ClaimsAndProofs() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_72px_1.25fr]">
      <SectionCard className="border-rose-300/20 bg-rose-500/[0.06]">
        <h2 className="text-xl font-black text-white">O que este estudo não afirma</h2>
        <div className="mt-5 space-y-3">
          {notClaims.map((claim) => (
            <div key={claim} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-300">
              <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300" />
              {claim}
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="hidden items-center justify-center lg:flex">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-violet-300 shadow-sm">
          <ArrowRight className="h-6 w-6" />
        </div>
      </div>

      <SectionCard className="border-violet-300/20 bg-violet-500/[0.06]">
        <h2 className="text-xl font-black text-white">O que este estudo prova em algum nível</h2>
        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_220px] lg:items-center">
          <div className="space-y-3">
            {proofs.map((proof) => (
              <div key={proof} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-300">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                {proof}
              </div>
            ))}
          </div>
          <MiniStackedProof />
        </div>
      </SectionCard>
    </section>
  );
}

function MiniStackedProof() {
  return (
    <div className="relative hidden h-36 overflow-hidden rounded-2xl border border-white/10 bg-[#071127]/70 p-4 lg:block">
      <div className="absolute bottom-7 right-5 h-24 w-36 rounded-xl border border-violet-300/20 bg-violet-500/[0.07]" />
      <div className="absolute bottom-10 right-9 h-24 w-36 rounded-xl border border-violet-300/25 bg-violet-500/[0.09]" />
      <svg className="absolute bottom-8 right-6 h-24 w-40" viewBox="0 0 180 100" preserveAspectRatio="none">
        <path d="M0 86 L25 78 L46 82 L68 58 L91 66 L112 48 L134 30 L156 38 L180 12" fill="none" stroke="#a855f7" strokeWidth="4" />
        <path d="M0 86 L25 78 L46 82 L68 58 L91 66 L112 48 L134 30 L156 38 L180 12 L180 100 L0 100 Z" fill="#a855f7" opacity="0.2" />
      </svg>
    </div>
  );
}

function CaseConclusionSection() {
  return (
    <SectionCard className="border-violet-300/20 bg-violet-500/[0.06]">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Conclusão do estudo</p>
      <h2 className="mt-3 text-2xl font-black text-white">A transação isolada dizia pouco. A trajetória dizia mais.</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
        O estudo não mostrou que o Ohrly detecta fraude. Mostrou algo mais importante: sinais simples de degradação comportamental podem melhorar a leitura de risco de um sistema de decisão.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">O que mudou</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">A análise deixou de olhar eventos isolados e passou a observar trajetórias por entidade.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Por que importa</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">Persistência, aceleração e densidade reduziram ruído sem sacrificar recall.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">O que vem depois</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">Validar se sinais Ohrly continuam úteis quando combinados a modelos antifraude mais fortes.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label="Ver explicação"
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-slate-400 transition hover:border-violet-300/30 hover:text-violet-200"
      >
        <Info className="h-3.5 w-3.5" />
      </button>

      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-3 w-72 -translate-x-1/2 rounded-xl border border-white/10 bg-[#030816] p-3 text-xs font-semibold leading-5 text-slate-300 opacity-0 shadow-2xl shadow-black/40 transition group-hover:opacity-100">
        {text}
        <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-[#030816]" />
      </span>
    </span>
  );
}

function TabsBar({
  activeTab,
  onChange,
  activeDescription,
  compact = false,
}: {
  activeTab: string;
  onChange: (tab: string) => void;
  activeDescription?: string;
  compact?: boolean;
}) {
  return (
    <div className={cn("rounded-2xl border border-white/10 bg-[#071127]/80 p-2 backdrop-blur-xl", compact && "bg-[#071127]/95")}>
      <div className="overflow-x-auto">
        <div className="flex min-w-max gap-2">
          {caseStudyTabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onChange(tab.id)}
                className={cn(
                  "cursor-pointer rounded-xl px-4 py-3 text-left text-sm font-black transition",
                  isActive ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30" : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {!compact && activeDescription && (
        <p className="mt-3 hidden text-center text-xs font-semibold leading-5 text-slate-400 sm:block">{activeDescription}</p>
      )}
    </div>
  );
}

function CaseStudyTabs() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isPinned, setIsPinned] = useState(false);

  const tabsRef = useRef<HTMLDivElement | null>(null);

  const headerOffset = 64;

  useEffect(() => {
    function handleScroll() {
      if (!tabsRef.current) return;
      const rect = tabsRef.current.getBoundingClientRect();
      setIsPinned(rect.top <= headerOffset);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  function handleTabChange(tab: string) {
    setActiveTab(tab);

    window.requestAnimationFrame(() => {
      if (!tabsRef.current) return;
      const rect = tabsRef.current.getBoundingClientRect();
      const targetY = window.scrollY + rect.top - headerOffset - 32;

      window.scrollTo({
        top: Math.max(targetY, 0),
        behavior: "smooth",
      });
    });
  }

  const activeTabData = caseStudyTabs.find((tab) => tab.id === activeTab);

  return (
    <section className="space-y-6">
      <div ref={tabsRef}>
        <TabsBar activeTab={activeTab} onChange={handleTabChange} activeDescription={activeTabData?.description} />
      </div>

      {isPinned && (
        <div
          className="fixed left-0 right-0 z-50 border-b border-white/10 bg-[#030816]/92 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
          style={{ top: `${headerOffset}px` }}
        >
          <div className="mx-auto max-w-7xl">
            <TabsBar activeTab={activeTab} onChange={handleTabChange} activeDescription={activeTabData?.description} compact />
          </div>
        </div>
      )}

      <div className={isPinned ? "pt-[92px]" : ""}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "method" && <MethodTab />}
        {activeTab === "model" && <ModelTab />}
        {activeTab === "comparison" && <ComparisonTab />}
        {activeTab === "result" && <ResultTab />}
      </div>
    </section>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <MethodPipelineSection />
      <TrajectoryShiftSection />
    </div>
  );
}

function MethodTab() {
  return (
    <div className="space-y-6">
      <InvestigationTable />
    </div>
  );
}

function ModelTab() {
  return (
    <div className="space-y-6">
      <OhrlyModelSection />
      <V2SignalsSection />
    </div>
  );
}

function ComparisonTab() {
  return (
    <div className="space-y-6">
      <ModelComparisonSection />
    </div>
  );
}

function ResultTab() {
  return (
    <div className="space-y-6">
      <FindingsSection />
      <CaseConclusionSection />
      <ClaimsAndProofs />
    </div>
  );
}

export default function FraudCaseStudyPage() {
  return (
    <DefaultPage>
      <div className="mx-auto max-w-7xl space-y-6 px-5 pb-10 pt-6 sm:px-8">
        <Hero
          summary="Estudo de fraude — modelo comportamental"
          title="Quando a fraude não aparece como evento,"
          titleHighlight="mas como trajetória."
          description="Aplicamos o modelo Ohrly a um dataset público de fraude para investigar se sinais de degradação comportamental podem complementar um detector transacional."
          rightHightlight={<HeroHighlight />}
        />

        <StudyObjective />

        <CaseStudyTabs />

        <CallToAction
          title="O mesmo método pode complementar o seu fluxo."
          description="Envie sua base operacional e descubra se sinais de persistência, aceleração, densidade e momentum podem enriquecer suas decisões."
          labelButton="Solicitar diagnóstico"
        />
      </div>
    </DefaultPage>
  );
}
