"use client";

import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronDownCircle,
  Clock3,
  Database,
  GitBranch,
  Info,
  LineChart,
  Network,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TimerReset,
  XCircle,
} from "lucide-react";

import DefaultPage from "@/components/DefaultPage";
import Hero from "@/components/Hero";
import CallToAction from "@/components/CallToAction";

const navigation = ["Estudos", "Como funciona", "Por que importa", "Sobre", "Diagnóstico"];

const operationalStates = [
  { label: "ATENDIDA", color: "bg-emerald-400", text: "text-emerald-300" },
  { label: "CADASTRADA", color: "bg-blue-400", text: "text-blue-300" },
  { label: "PREPARACAO", color: "bg-amber-400", text: "text-amber-300" },
  { label: "EXECUCAO", color: "bg-violet-400", text: "text-violet-300" },
  { label: "PENDENCIA", color: "bg-slate-400", text: "text-slate-300" },
  { label: "FISCALIZACAO", color: "bg-rose-400", text: "text-rose-300" },
];

const availableDimensions = [
  "Data da demanda",
  "Data da última situação",
  "RPA",
  "Bairro",
  "Serviço / Grupo de serviço",
  "Localização (lat, long)",
];

const flowSteps = [
  { label: "CADASTRADA", detail: "entrada", tone: "border-blue-400/30 bg-blue-500/10 text-blue-200" },
  { label: "PREPARACAO", detail: "preparação", tone: "border-amber-400/30 bg-amber-500/10 text-amber-200" },
  { label: "EXECUCAO", detail: "execução", tone: "border-violet-400/30 bg-violet-500/10 text-violet-200" },
  { label: "ATENDIDA", detail: "resolução", tone: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200" },
];

const readings = [
  {
    step: "1",
    icon: GitBranch,
    question: "A operação possui uma trajetória reconhecível?",
    analyzed: "Distribuição dos estados e sequência implícita do fluxo.",
    result: "Os estados sugeriram um fluxo operacional: CADASTRADA → PREPARACAO → EXECUCAO → ATENDIDA.",
    proves: "Era possível reconstruir comportamento operacional a partir de registros brutos.",
  },
  {
    step: "2",
    icon: Clock3,
    question: "Existe represamento silencioso?",
    analyzed: "Tempo médio e permanência por estado.",
    result: "Estados intermediários apresentaram envelhecimento anormal em relação ao restante do fluxo.",
    proves: "A operação podia continuar funcionando enquanto acumulava fricção em pontos intermediários.",
  },
  {
    step: "3",
    icon: LineChart,
    question: "O desvio é ruído ou persistência?",
    analyzed: "Duração dos desvios em relação ao histórico operacional.",
    result: "Alguns desvios sobreviveram além do comportamento esperado de recuperação.",
    proves: "Persistência muda o significado do sinal.",
  },
  {
    step: "4",
    icon: RefreshCcw,
    question: "Qual é o ciclo natural de recuperação?",
    analyzed: "Tempo esperado para a operação absorver perturbações e retornar ao baseline.",
    result: "A persistência só fazia sentido quando comparada ao metabolismo da própria operação.",
    proves: "A janela de decisão não é um prazo fixo; é relativa à capacidade de recuperação.",
  },
  {
    step: "5",
    icon: BarChart3,
    question: "A degradação tem intensidade suficiente?",
    analyzed: "Magnitude combinada de queda de ATENDIDA, excesso em PREPARACAO, EXECUCAO, PENDENCIA e envelhecimento.",
    result: "Nem todo desvio persistente tinha o mesmo peso operacional.",
    proves: "Persistência explica sobrevivência do desvio; magnitude explica força.",
  },
  {
    step: "6",
    icon: Network,
    question: "A degradação está localizada ou se propagando?",
    analyzed: "Pressão simultânea em múltiplos estados e regiões.",
    result: "Alguns sinais deixaram de estar concentrados e passaram a afetar mais partes do fluxo.",
    proves: "A degradação se torna mais crítica quando atravessa estados operacionais.",
  },
  {
    step: "7",
    icon: AlertTriangle,
    question: "Quando esperar deixou de ser neutro?",
    analyzed: "Persistência, magnitude e propagação combinadas no Recovery Pressure Index.",
    result: "O estado operacional sozinho não bastava para priorizar.",
    proves: "Estados explicam, arquétipos diagnosticam, RPI prioriza.",
  },
];

const methodPipeline = [
  {
    title: "Dados brutos",
    description: "Solicitações, datas, estados, RPA, bairro, serviço e localização.",
  },
  {
    title: "Trajetória operacional",
    description: "Reconstruímos o fluxo implícito por trás dos registros.",
  },
  {
    title: "Estados comportamentais",
    description: "Observamos se a operação estava normal, oscilando ou degradando.",
  },
  {
    title: "Arquétipos",
    description: "Identificamos se a degradação era progressiva, localizada ou sistêmica.",
  },
  {
    title: "RPI",
    description: "Calculamos a pressão relativa de recuperação e priorização.",
  },
  {
    title: "Janela de decisão",
    description: "Mostramos quando continuar esperando deixou de ser neutro.",
  },
];

const findings = [
  {
    icon: TimerReset,
    title: "Degradação não é abrupta",
    text: "Os sinais apareceram como mudanças graduais de distribuição, envelhecimento e persistência.",
    tone: "text-emerald-300 bg-emerald-400/10 border-emerald-300/20",
  },
  {
    icon: Network,
    title: "Fricção em pontos intermediários",
    text: "PREPARACAO, EXECUCAO e PENDENCIA concentraram o represamento operacional.",
    tone: "text-orange-300 bg-orange-400/10 border-orange-300/20",
  },
  {
    icon: Clock3,
    title: "Persistência muda o significado",
    text: "Um pico isolado podia ser ruído. Um desvio que sobrevive ao ciclo operacional indica mudança de regime.",
    tone: "text-violet-300 bg-violet-400/10 border-violet-300/20",
  },
  {
    icon: RefreshCcw,
    title: "Recuperação natural em deterioração",
    text: "O problema não era apenas ter solicitações não atendidas, mas perder capacidade de retornar ao esperado.",
    tone: "text-rose-300 bg-rose-400/10 border-rose-300/20",
  },
  {
    icon: LineChart,
    title: "A operação oscilava antes de degradar",
    text: "A sequência comportamental mostrou alternância entre normalidade, oscilação e degradação.",
    tone: "text-blue-300 bg-blue-400/10 border-blue-300/20",
  },
];

const rpiFactors = [
  { label: "Persistência", value: "o desvio sobreviveu ao ciclo natural?" },
  { label: "Magnitude", value: "a força do desvio é operacionalmente relevante?" },
  { label: "Propagação", value: "o sinal saiu de um ponto e contaminou o fluxo?" },
];

const behavioralStates = [
  {
    badge: "01",
    name: "Oscilação absorvível",
    color: "bg-emerald-400",
    border: "border-emerald-300/20",
    meaning: "O comportamento varia, mas ainda dentro da capacidade normal de absorção da operação.",
    signal: "Pequenos desvios aparecem e desaparecem sem formar continuidade relevante.",
    importance: "Ajuda a evitar falso alarme: nem toda variação merece intervenção.",
  },
  {
    badge: "02",
    name: "Ruído persistente",
    color: "bg-amber-400",
    border: "border-amber-300/20",
    meaning: "A variação deixa de parecer pontual e começa a sobreviver por mais tempo do que o esperado.",
    signal: "O mesmo tipo de desvio aparece em janelas consecutivas, mesmo sem grande intensidade.",
    importance: "É o primeiro indício de que a operação pode estar perdendo recuperação natural.",
  },
  {
    badge: "03",
    name: "Desvio relevante",
    color: "bg-orange-400",
    border: "border-orange-300/20",
    meaning: "A magnitude do comportamento mudou o suficiente para indicar que algo saiu do padrão esperado.",
    signal: "A operação continua funcionando, mas com esforço, tempo, repetição ou falha acima do normal.",
    importance: "Mostra que o problema deixou de ser apenas frequente e passou a ser operacionalmente significativo.",
  },
  {
    badge: "04",
    name: "Propagação comportamental",
    color: "bg-red-400",
    border: "border-red-300/20",
    meaning: "O comportamento anormal começa a aparecer em mais fluxos, etapas, canais, contextos ou grupos.",
    signal: "O desvio deixa de estar concentrado em um ponto e passa a contaminar partes relacionadas da operação.",
    importance: "Indica risco de deixar de ser um problema localizado e se tornar sistêmico.",
  },
  {
    badge: "05",
    name: "Perda de metabolismo",
    color: "bg-rose-500",
    border: "border-rose-300/20",
    meaning: "A operação já não consegue retornar ao padrão saudável no tempo esperado.",
    signal: "Os ciclos de recuperação ficam mais longos, incompletos ou dependentes de intervenção externa.",
    importance: "É o sinal de que esperar pode aumentar o custo de recuperação.",
  },
];

const transitionStages = [
  {
    from: "Oscilação operacional",
    to: "Degradação progressiva",
    trigger: "O desvio deixa de ser pontual e começa a persistir.",
    meaning: "A operação ainda funciona, mas já não volta ao baseline com a mesma facilidade.",
  },
  {
    from: "Degradação progressiva",
    to: "Degradação localizada",
    trigger: "A persistência ganha magnitude em um ponto específico do fluxo.",
    meaning: "A pressão se concentra em uma RPA, estado ou trecho operacional.",
  },
  {
    from: "Degradação localizada",
    to: "Degradação sustentada",
    trigger: "A pressão persiste além do ciclo natural de recuperação.",
    meaning: "A operação começa a perder capacidade de se recuperar sozinha.",
  },
  {
    from: "Degradação sustentada",
    to: "Janela cara de recuperação",
    trigger: "RPI elevado: persistência, magnitude e propagação tornam esperar mais caro.",
    meaning: "O problema ainda pode não ser incidente formal, mas a indecisão já tem custo.",
  },
];

const behavioralArchetypes = [
  {
    name: "Oscilação operacional",
    description: "Variação natural que aparece, mas é absorvida pela operação sem alterar o regime dominante.",
    formula: "baixa persistência + baixa propagação",
  },
  {
    name: "Choque operacional",
    description: "Mudança intensa e perceptível, mas curta. Pode assustar, porém nem sempre indica degradação estrutural.",
    formula: "alta magnitude + baixa persistência",
  },
  {
    name: "Degradação progressiva",
    description: "O comportamento piora aos poucos e começa a ganhar força ao longo do tempo.",
    formula: "persistência crescente + magnitude crescente",
  },
  {
    name: "Degradação localizada",
    description: "A pressão fica concentrada em um ponto específico da operação, como uma RPA, estado ou trecho do fluxo.",
    formula: "alta persistência + baixa propagação",
  },
  {
    name: "Degradação sistêmica",
    description: "O problema deixa de estar contido e começa a atravessar múltiplas partes da operação.",
    formula: "alta persistência + alta magnitude + alta propagação",
  },
];

const behavioralTimeline = [
  {
    period: "02 jan → 07 mai",
    state: "Normal",
    title: "Operação próxima do comportamento esperado",
    text: "Pressão operacional baixa e distribuição dos estados próxima do baseline.",
    color: "bg-emerald-400",
    ring: "ring-emerald-400/15",
  },
  {
    period: "08 mai → 14 mai",
    state: "Oscilação absorvível",
    title: "Variações compatíveis com recuperação natural",
    text: "A operação oscilou, mas ainda sem indicar perda estrutural de capacidade de resolução.",
    color: "bg-amber-400",
    ring: "ring-amber-400/15",
  },
  {
    period: "21 jul → 13 ago",
    state: "Ruído persistente",
    title: "Primeiros sinais persistentes de drift",
    text: "Os desvios deixaram de parecer ruído pontual e passaram a persistir acima do histórico.",
    color: "bg-orange-400",
    ring: "ring-orange-400/15",
  },
  {
    period: "14 ago → 27 ago",
    state: "Degradação localizada",
    title: "Pressão concentrada em pontos do fluxo",
    text: "Sinais indicaram perda localizada de capacidade de resolução e início de propagação.",
    color: "bg-orange-500",
    ring: "ring-orange-400/15",
  },
  {
    period: "28 ago → 10 set",
    state: "Degradação sustentada",
    title: "Regime persistente de degradação",
    text: "A operação entrou em regime de degradação, com perda da capacidade natural de recuperação.",
    color: "bg-rose-500",
    ring: "ring-rose-400/15",
  },
];

const notClaims = [
  "Não afirma causa raiz.",
  "Não afirma perda financeira direta.",
  "Não afirma que houve incidente formal.",
  "Não afirma que o Ohrly resolveria a operação automaticamente.",
  "Não recomenda ação específica sem contexto interno.",
];

const proofs = [
  "Degradações silenciosas existem.",
  "Elas podem ser observadas antes do incidente.",
  "Comportamento operacional pode ser reconstruído a partir de dados simples.",
  "Persistência, magnitude e propagação formam a base para decisão antecipada.",
  "A janela de decisão pode ser estimada pela capacidade natural de recuperação.",
];

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#030816]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#" className="text-3xl font-black tracking-tight text-white">
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
          className="rounded-xl border border-white/30 px-5 py-2.5 text-sm font-bold text-white transition hover:border-violet-300 hover:bg-violet-500/10"
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
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-violet-200">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
          <p className="mt-1 text-sm font-black text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

function MiniStackedChart() {
  const bars = [
    [35, 12, 22, 19, 12],
    [43, 10, 20, 18, 9],
    [38, 14, 21, 17, 10],
    [44, 12, 23, 15, 6],
    [36, 13, 25, 18, 8],
    [39, 12, 20, 20, 9],
    [37, 13, 24, 17, 9],
  ];

  const colors = ["bg-emerald-400", "bg-blue-400", "bg-amber-400", "bg-violet-400", "bg-slate-400"];

  return (
    <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-4">
      <div className="flex h-44 items-end gap-2 border-b border-l border-white/10 px-2 pb-2">
        {bars.map((bar, index) => (
          <div key={index} className="flex h-full flex-1 flex-col-reverse overflow-hidden rounded-t-md bg-white/5">
            {bar.map((height, colorIndex) => (
              <div key={`${index}-${colorIndex}`} className={colors[colorIndex]} style={{ height: `${height}%` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-semibold text-slate-500">
        <span>Jan/25</span>
        <span>Mar/25</span>
        <span>Mai/25</span>
        <span>Jul/25</span>
      </div>
    </div>
  );
}

function HeroHighlight() {
  return (
    <SectionCard className="self-start p-7">
      <h2 className="text-xl font-black text-white">Visão geral da base analisada</h2>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <StatCard icon={<Database className="h-5 w-5" />} label="Volume" value="86.966 solicitações" />
        <StatCard icon={<Building2 className="h-5 w-5" />} label="Origem" value="SEFAZ / EMLURB" />
      </div>

      <div className="mt-7 grid gap-8 border-t border-white/10 pt-7 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-black text-white">Estados operacionais</h3>
          <div className="mt-4 space-y-3">
            {operationalStates.map((state) => (
              <div key={state.label} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                <span className={cn("h-3 w-3 rounded-full shadow-lg", state.color)} />
                {state.label}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Dimensões disponíveis</h3>
          <div className="mt-4 space-y-3">
            {availableDimensions.map((dimension) => (
              <div key={dimension} className="flex items-center gap-3 text-sm font-semibold text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-violet-300" />
                {dimension}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

function MethodPipelineSection() {
  return (
    <SectionCard>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
            Como o estudo funciona
          </p>
          <h2 className="mt-3 text-2xl font-black text-white">
            Da base operacional à janela de decisão
          </h2>
        </div>

        <p className="max-w-xl text-sm leading-7 text-slate-400">
          O método não parte de uma causa pronta. Ele transforma registros brutos em leitura comportamental, depois em prioridade operacional.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {methodPipeline.map((item, index) => (
          <div key={item.title} className="relative rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
            <div className="mb-5 flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-sm font-black text-violet-200">
                {index + 1}
              </span>
              {index < methodPipeline.length - 1 && <ArrowRight className="hidden h-4 w-4 text-slate-600 lg:block" />}
            </div>
            <h3 className="text-sm font-black text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function FirstDiscovery() {
  return (
    <SectionCard>
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="text-2xl font-black text-white">O sistema é funcional!</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Os registros não vinham descritos como uma jornada, algo como uma sequência de eventos pertencentes a uma mesma solicitação,
            mas os estados sugeriam uma trajetória operacional implícita.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
            {flowSteps.map((step, index) => (
              <div key={step.label} className="flex items-center gap-2">
                <div className={cn("min-w-0 flex-1 rounded-xl border px-3 py-3 text-center", step.tone)}>
                  <p className="text-[10px] font-black uppercase tracking-wide">{step.label}</p>
                  <p className="mt-1 text-[11px] font-semibold opacity-80">{step.detail}</p>
                </div>
                {index < flowSteps.length - 1 && <ArrowRight className="hidden h-4 w-4 shrink-0 text-slate-600 sm:block lg:hidden xl:block" />}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-black text-white">Distribuição dos estados ao longo do período</h3>
          <div className="mt-4">
            <MiniStackedChart />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
            {operationalStates.slice(0, 5).map((state) => (
              <div key={state.label} className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                <span className={cn("h-2.5 w-2.5 rounded-full", state.color)} />
                {state.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
        <p className="text-sm font-bold leading-7 text-slate-100">
          A operação parecia estável no volume total, mas a intenção era entender se havia algum momento onde a pendência deixava de ser apenas um prazo distante
          e começava a se tornar cada vez mais real. Para isso, precisávamos desenhar estados comportamentais ao redor da operação.
        </p>
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
            Cada leitura foi desenhada para responder uma pergunta operacional. A intenção não era produzir mais gráficos, mas reduzir ambiguidade sobre o estado da operação.
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

function BehavioralStatesSection() {
  const [openState, setOpenState] = useState<string | null>(behavioralStates[0]?.name ?? null);

  function toggleState(name: string) {
    setOpenState((current) => (current === name ? null : name));
  }

  return (
    <SectionCard>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Estados comportamentais</p>
        <h2 className="mt-3 text-2xl font-black text-white">O comportamento operacional</h2>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Estados comportamentais descrevem a forma imediata da mudança: se ainda parece ruído, se começou a persistir, se ganhou força, se se espalhou ou se passou a consumir a capacidade natural de recuperação da operação.
        </p>
      </div>

      <div className="space-y-3">
        {behavioralStates.map((state) => {
          const isOpen = openState === state.name;

          return (
            <div
              key={state.name}
              className={cn(
                "overflow-hidden rounded-2xl border transition-all duration-300",
                isOpen
                  ? `${state.border} bg-white/[0.055] shadow-[0_20px_60px_rgba(0,0,0,0.22)]`
                  : "border-white/10 bg-[#071127]/70 hover:border-white/20 hover:bg-white/[0.045]",
              )}
            >
              <button type="button" onClick={() => toggleState(state.name)} aria-expanded={isOpen} className="flex w-full cursor-pointer items-center justify-between gap-4 p-5 text-left">
                <div className="flex min-w-0 items-start gap-4">
                  <span className={cn("mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-black transition", isOpen ? `${state.color} text-[#040917]` : "border border-white/10 bg-white/[0.04] text-slate-300")}>
                    {state.badge}
                  </span>

                  <div className="min-w-0">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Estado comportamental</p>
                    <h3 className="mt-2 text-base font-black leading-6 text-white md:text-lg">{state.name}</h3>
                  </div>
                </div>

                <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300", isOpen && "rotate-180 text-violet-300")} />
              </button>

              <div className={cn("grid transition-all duration-300 ease-in-out", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 px-5 pb-5 pt-5">
                    <div className="grid gap-4 md:grid-cols-3">
                      <BehaviorStateDetail label="O que significa" value={state.meaning} />
                      <BehaviorStateDetail label="Como aparece" value={state.signal} />
                      <BehaviorStateDetail label="Por que importa" value={state.importance} highlighted />
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

function BehaviorStateDetail({ label, value, highlighted = false }: { label: string; value: string; highlighted?: boolean }) {
  return (
    <div className={cn("rounded-2xl border p-4", highlighted ? "border-violet-300/20 bg-violet-500/10" : "border-white/10 bg-white/[0.035]")}>
      <p className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className={cn("text-sm leading-7", highlighted ? "font-semibold text-slate-100" : "text-slate-300")}>{value}</p>
    </div>
  );
}

function StateTransitionSection() {
  return (
    <SectionCard>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
          Transição de estados
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          O problema não é oscilar. É não conseguir voltar.
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          O Ohrly interpreta como a operação muda de regime ao longo do tempo.
          Um estado isolado explica pouco. O que importa é observar se a operação
          oscila, absorve, degrada ou perde capacidade natural de recuperação.
        </p>
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-[#071127]/70 lg:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.035]">
              <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                De
              </th>
              <th className="w-16 px-3 py-4 text-center text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                Fluxo
              </th>
              <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                Para
              </th>
              <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.22em] text-violet-300">
                Gatilho
              </th>
              <th className="px-5 py-4 text-left text-xs font-black uppercase tracking-[0.22em] text-slate-500">
                O que significa
              </th>
            </tr>
          </thead>

          <tbody>
            {transitionStages.map((stage, index) => (
              <tr
                key={`${stage.from}-${stage.to}`}
                className={cn(
                  "border-b border-white/10 align-top",
                  index === transitionStages.length - 1 && "border-b-0",
                )}
              >
                <td className="px-5 py-5">
                  <p className="text-sm font-black text-white">
                    {stage.from}
                  </p>
                </td>

                <td className="px-3 py-5">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-violet-200">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </td>

                <td className="px-5 py-5">
                  <p className="text-sm font-black text-white">
                    {stage.to}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <p className="text-sm font-semibold leading-6 text-slate-200">
                    {stage.trigger}
                  </p>
                </td>

                <td className="px-5 py-5">
                  <p className="text-sm leading-6 text-slate-400">
                    {stage.meaning}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 lg:hidden">
        {transitionStages.map((stage) => (
          <div
            key={`${stage.from}-${stage.to}`}
            className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5"
          >
            <div className="grid gap-4 sm:grid-cols-[1fr_40px_1fr] sm:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  De
                </p>
                <h3 className="mt-2 text-base font-black text-white">
                  {stage.from}
                </h3>
              </div>

              <div className="flex items-center justify-start sm:justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 text-violet-200">
                  <ArrowRight className="h-5 w-5" />
                </div>
              </div>

              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                  Para
                </p>
                <h3 className="mt-2 text-base font-black text-white">
                  {stage.to}
                </h3>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.035] p-4">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">
                Gatilho da transição
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {stage.trigger}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {stage.meaning}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-500/[0.07] p-5">
        <p className="text-sm font-bold leading-7 text-slate-100">
          A transição de estados mostra a dinâmica adaptativa da operação:
          sistemas saudáveis também oscilam, mas conseguem absorver a variação
          e retornar ao comportamento esperado. O risco aparece quando essa
          recuperação deixa de acontecer naturalmente.
        </p>
      </div>
    </SectionCard>
  );
}

function BehavioralTimeline() {
  return (
    <SectionCard>
      <h2 className="text-2xl font-black text-white">Linha do tempo comportamental da operação</h2>
      <p className="mt-3 text-sm leading-7 text-slate-300">
        Um exemplo de ciclo operacional encontrado no sistema. Este ciclo representa como o metabolismo operacional funciona neste caso.
      </p>

      <div className="mt-8 hidden lg:block">
        <div className="relative px-4">
          <div className="absolute left-4 right-4 top-4 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 via-orange-400 to-rose-500" />
          <div className="grid grid-cols-5 gap-6">
            {behavioralTimeline.map((item) => (
              <div key={item.period} className="relative">
                <div className={cn("relative z-10 mb-6 h-8 w-8 rounded-full border-4 border-[#050b1a] shadow-lg ring-8", item.color, item.ring)} />
                <p className="text-xs font-black text-slate-400">{item.period}</p>
                <p className="mt-2 text-base font-black text-white">{item.state}</p>
                <h3 className="mt-3 text-sm font-black leading-6 text-slate-100">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 lg:hidden">
        {behavioralTimeline.map((item, index) => (
          <div key={item.period} className="relative pl-10">
            {index < behavioralTimeline.length - 1 && <div className="absolute left-3.5 top-7 h-[calc(100%+1rem)] w-px bg-white/10" />}
            <span className={cn("absolute left-0 top-1 h-7 w-7 rounded-full border-4 border-[#050b1a] shadow-sm", item.color)} />
            <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <p className="text-xs font-black text-slate-400">{item.period}</p>
              <p className="mt-2 font-black text-white">{item.state}</p>
              <h3 className="mt-2 text-sm font-bold text-slate-100">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function BehaviorReadingModelSection() {
  return (
    <SectionCard>
      <div className="grid gap-8">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Modelo de leitura</p>
          <h2 className="mt-3 text-2xl font-black text-white">Como saber quando a "espera" tem um custo relevante</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            O Ohrly não interpreta uma degradação apenas como uma métrica acima de um limite. Ele observa como o comportamento se sustenta, cresce, se espalha e consome a capacidade natural de recuperação da operação.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {rpiFactors.map((factor) => (
            <div key={factor.label} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <h3 className="text-base font-black text-white">{factor.label}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{factor.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center p-6">
        <ChevronDownCircle className="text-violet-300" />
      </div>

      <div className="rounded-2xl border border-violet-300/20 bg-violet-500/[0.07] p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">RPI</p>
        <h3 className="mt-2 text-lg font-black text-white">Recovery Pressure Index</h3>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          O RPI representa a pressão relativa de recuperação. Ele não é um custo financeiro real, mas um sinal de que continuar esperando pode estar ficando operacionalmente caro em relação ao histórico daquela operação.
        </p>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Estado</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">Explica quão saudável ou degradada está a operação.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Arquétipo</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">Diagnostica como a degradação está acontecendo.</p>
        </div>
        <div className="rounded-2xl border border-violet-300/20 bg-violet-500/10 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">RPI</p>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-100">Prioriza onde esperar começou a ficar caro.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function BehavioralArchetypesSection() {
  return (
    <SectionCard>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Arquétipos comportamentais</p>
          <h2 className="mt-3 text-2xl font-black text-white">Estados dizem quão ruim está. Arquétipos dizem como está degradando.</h2>
        </div>

        <p className="max-w-xl text-sm leading-7 text-slate-400">
          Eles ajudam a separar um choque curto de uma degradação progressiva, localizada ou sistêmica.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {behavioralArchetypes.map((archetype) => (
          <div key={archetype.name} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
            <h3 className="text-sm font-black text-white">{archetype.name}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">{archetype.description}</p>
            <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold leading-5 text-violet-200">{archetype.formula}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

const adaptiveMetrics = [
  {
    label: "transition_instability_rate",
    title: "Taxa de instabilidade de transição",
    value: "mudanças de arquétipo / total de regimes",
    description:
      "Mede com que frequência a operação troca de comportamento. Uma taxa alta indica que a operação muda de regime muitas vezes.",
  },
  {
    label: "adaptive_stability_score",
    title: "Estabilidade adaptativa",
    value: "100 × (1 - taxa de instabilidade)",
    description:
      "Mede o quanto a operação preserva coerência mesmo oscilando. Quanto maior o score, maior a capacidade de absorver mudanças.",
  },
  {
    label: "recovery_transition",
    title: "Transições de recuperação",
    value: "degradação → oscilação operacional",
    description:
      "Mede quando a operação consegue sair de um arquétipo degradado e voltar para um comportamento absorvível.",
  },
];

function AdaptiveMetricsSection() {
  return (
    <SectionCard>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
          Métricas de transição
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          Como medimos a oscilação da operação
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Depois de identificar os arquétipos, a Ohrly observa como a operação
          transita entre eles. A pergunta deixa de ser apenas “em qual estado
          estamos?” e passa a ser “com que frequência mudamos e conseguimos voltar?”.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {adaptiveMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              {metric.label}
            </p>

            <h3 className="mt-3 text-base font-black text-white">
              {metric.title}
            </h3>

            <p className="mt-3 rounded-xl border border-violet-300/20 bg-violet-500/10 px-3 py-2 text-xs font-bold leading-5 text-violet-200">
              {metric.value}
            </p>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              {metric.description}
            </p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

function AdaptiveStabilityInterpretationSection() {
  return (
    <SectionCard>
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
          Leitura adaptativa
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          Muitas oscilações não significam necessariamente uma operação ruim
        </h2>

        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
          Operações saudáveis também oscilam. O risco aparece quando a operação
          muda de regime, acumula degradação e não consegue retornar para um
          comportamento absorvível.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-emerald-300/20 bg-emerald-500/[0.06] p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
            Oscilação saudável
          </p>

          <h3 className="mt-3 text-lg font-black text-white">
            Muda, absorve e volta.
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            A operação pode alternar entre pequenos desvios e normalidade sem
            representar risco. Isso indica capacidade adaptativa: o sistema muda,
            mas preserva coerência.
          </p>
        </div>

        <div className="rounded-2xl border border-rose-300/20 bg-rose-500/[0.06] p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-rose-300">
            Oscilação preocupante
          </p>

          <h3 className="mt-3 text-lg font-black text-white">
            Muda, degrada e não retorna.
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-300">
            O risco aparece quando as transições caminham repetidamente para
            degradação, com pouca ou nenhuma recuperação. Nesse caso, a operação
            não está apenas oscilando; ela está perdendo capacidade adaptativa.
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-500/[0.07] p-5">
        <p className="text-sm font-bold leading-7 text-slate-100">
          A estabilidade adaptativa não mede ausência de mudança. Ela mede a
          capacidade da operação atravessar mudanças sem acumular perda de
          consistência, propagação e pressão de recuperação.
        </p>
      </div>
    </SectionCard>
  );
}

const adaptiveExample = {
  rpa: "RPA 4",
  transitionInstabilityRate: "0.67",
  adaptiveStabilityScore: "33.33",
  archetypeTransitionCount: 2,
  degradationTransitionCount: 1,
  recoveryTransitionCount: 0,
  dominantBehavior: "OSCILAÇÃO_OPERACIONAL",
  interpretation:
    "Apesar do comportamento dominante ainda aparecer como oscilação operacional, a RPA 4 teve baixa estabilidade adaptativa. Ela mudou de regime, entrou em degradação e não apresentou transição clara de recuperação no período analisado.",
};

function AdaptiveStabilityExampleSection() {
  return (
    <SectionCard className="border-orange-300/20 bg-orange-500/[0.045]">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-300">
            Exemplo concreto
          </p>

          <h2 className="mt-3 text-2xl font-black text-white">
            {adaptiveExample.rpa}: quando oscilar começa a parecer fragilidade
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-300">
            Este exemplo mostra por que não basta saber o estado atual. A RPA
            ainda tinha comportamento dominante de oscilação, mas sua dinâmica
            de transição sugeria baixa capacidade adaptativa.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              transition_instability_rate
            </p>
            <p className="mt-3 text-3xl font-black text-white">
              {adaptiveExample.transitionInstabilityRate}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Alta frequência relativa de mudança de arquétipo.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              adaptive_stability_score
            </p>
            <p className="mt-3 text-3xl font-black text-white">
              {adaptiveExample.adaptiveStabilityScore}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Baixa capacidade de manter coerência durante as mudanças.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Transições para degradação
            </p>
            <p className="mt-3 text-3xl font-black text-white">
              {adaptiveExample.degradationTransitionCount}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              A operação saiu de oscilação e entrou em degradação.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Transições de recuperação
            </p>
            <p className="mt-3 text-3xl font-black text-white">
              {adaptiveExample.recoveryTransitionCount}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Não houve retorno claro para oscilação absorvível.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-orange-300/20 bg-orange-500/[0.08] p-5">
        <p className="text-sm font-bold leading-7 text-slate-100">
          {adaptiveExample.interpretation}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
          Leitura Ohrly
        </p>

        <p className="mt-3 text-sm leading-7 text-slate-300">
          A operação saudável não é a que nunca muda. É a que muda, absorve e
          retorna. Quando a taxa de transição sobe e a recuperação não aparece,
          a oscilação deixa de ser apenas variação natural e começa a indicar
          fragilidade operacional.
        </p>
      </div>
    </SectionCard>
  );
}

function CaseConclusionSection() {
  return (
    <SectionCard className="border-violet-300/20 bg-violet-500/[0.06]">
      <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Conclusão operacional</p>
      <h2 className="mt-3 text-2xl font-black text-white">A operação não parou. Ela perdeu capacidade de recuperação.</h2>
      <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
        O estudo mostrou que a operação continuava funcional, mas passou por períodos em que estados intermediários acumularam pressão, a recuperação natural ficou mais lenta e o custo de esperar deixou de ser neutro.
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">O que mudou</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">A distribuição dos estados deixou de parecer estável em pontos intermediários.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Por que importa</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">A operação começou a acumular fricção antes de qualquer incidente formal.</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">O que o RPI mostrou</p>
          <p className="mt-3 text-sm leading-7 text-slate-300">Nem todo estado degradado era igualmente urgente; a prioridade veio da pressão de recuperação.</p>
        </div>
      </div>
    </SectionCard>
  );
}

function Findings() {
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
        <h2 className="text-xl font-black text-white">O que este estudo prova</h2>
        <div className="mt-5 space-y-3">
          {proofs.map((proof) => (
            <div key={proof} className="flex items-start gap-3 text-sm font-semibold leading-6 text-slate-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
              {proof}
            </div>
          ))}
        </div>
      </SectionCard>
    </section>
  );
}

const resultEvidence = [
  {
    label: "Entradas em zona cinzenta",
    value: "17",
    description:
      "Ciclos em que a operação entrou em zona crítica ou cara de recuperação.",
  },
  {
    label: "Dias acumulados",
    value: "242 dias",
    description:
      "Tempo total em que a operação permaneceu em zona cinzenta ao longo do período analisado.",
  },
  {
    label: "RPAs afetadas",
    value: "6",
    description:
      "Todas as RPAs analisadas apresentaram sinais relevantes em algum momento.",
  },
  {
    label: "Janelas caras",
    value: "8",
    description:
      "Períodos em que o RPI indicou que continuar esperando já parecia operacionalmente caro.",
  },
];

const resultEvidenceDetails = [
  {
    title: "A zona cinzenta foi mensurável",
    text: "Foram identificadas 17 entradas em zona cinzenta, somando 242 dias acumulados de operação em estado ambíguo.",
  },
  {
    title: "A degradação foi mais localizada que sistêmica",
    text: "O modelo encontrou 11 degradações localizadas, 5 progressivas e nenhuma sistêmica. Isso sugere pressão operacional real, mas ainda contida em pontos específicos.",
  },
  {
    title: "A operação recuperou, mas não sempre",
    text: "Foram 8 transições para degradação e 4 transições de recuperação. Isso indica capacidade adaptativa parcial, mas não plena.",
  },
];

function ResultEvidenceSection() {
  return (
    <SectionCard className="border-violet-300/20 bg-violet-500/[0.045]">
      <div className="mb-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">
          Evidência do resultado
        </p>

        <h2 className="mt-3 text-2xl font-black text-white">
          A zona cinzenta apareceu nos dados
        </h2>

        <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
          O sucesso do estudo não era encontrar um incidente formal. Era demonstrar
          que a operação passou por períodos mensuráveis em que ainda funcionava,
          mas já acumulava sinais de perda de recuperação, persistência e pressão
          operacional.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {resultEvidence.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              {item.label}
            </p>

            <p className="mt-4 text-3xl font-black text-white">
              {item.value}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {item.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {resultEvidenceDetails.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5"
          >
            <h3 className="text-base font-black text-white">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            RPI médio na zona cinzenta
          </p>
          <p className="mt-4 text-2xl font-black text-white">282.51</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
            Maior RPI registrado
          </p>
          <p className="mt-4 text-2xl font-black text-white">1082.53</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <div className="flex items-center gap-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Instabilidade média
            </p>

            <InfoTooltip text="Média da frequência com que as RPAs trocaram de arquétipo operacional. Quanto maior, mais a operação muda de comportamento ao longo do tempo." />
          </div>

          <p className="mt-4 text-2xl font-black text-white">0.41</p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <div className="flex items-center gap-2">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
              Estabilidade adaptativa média
            </p>

            <InfoTooltip text="Média da capacidade das RPAs de preservar coerência mesmo oscilando. Quanto maior, maior a capacidade de mudar, absorver a variação e retornar a um comportamento saudável." />
          </div>
          <p className="mt-4 text-2xl font-black text-white">59.18</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-500/[0.08] p-5">
        <p className="text-sm font-bold leading-7 text-slate-100">
          Leitura Ohrly: a zona cinzenta não foi apenas uma hipótese. Ela apareceu
          como 17 períodos mensuráveis, distribuídos em 6 RPAs e somando 242 dias
          acumulados em que a operação ainda funcionava, mas já apresentava pressão
          operacional relevante.
        </p>
      </div>
    </SectionCard>
  );
}
const caseStudyTabs = [
  {
    id: "overview",
    label: "Visão geral",
    description: "Entenda a base, o objetivo e a primeira descoberta.",
  },
  {
    id: "method",
    label: "Método",
    description: "Como saímos dos dados brutos até a leitura operacional.",
  },
  {
    id: "states",
    label: "Estados e transições",
    description: "Como a operação muda de regime ao longo do tempo.",
  },
  {
    id: "adaptive",
    label: "Estabilidade adaptativa",
    description: "Como medimos oscilação, recuperação e fragilidade.",
  },
  {
    id: "result",
    label: "Resultado",
    description: "O que o estudo revelou, provou e não provou.",
  },
];

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

      const targetY =
        window.scrollY + rect.top - headerOffset - 32;

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
        <TabsBar
          activeTab={activeTab}
          onChange={handleTabChange}
          activeDescription={activeTabData?.description}
        />
      </div>

      {isPinned && (
        <div
          className="fixed left-0 right-0 z-50 border-b border-white/10 bg-[#030816]/92 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl"
          style={{ top: `${headerOffset}px` }}
        >
          <div className="mx-auto max-w-7xl">
            <TabsBar
              activeTab={activeTab}
              onChange={handleTabChange}
              activeDescription={activeTabData?.description}
              compact
            />
          </div>
        </div>
      )}

      <div className={isPinned ? "pt-[92px]" : ""}>
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "method" && <MethodTab />}
        {activeTab === "states" && <StatesTab />}
        {activeTab === "adaptive" && <AdaptiveTab />}
        {activeTab === "result" && <ResultTab />}
      </div>
    </section>
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
    <div
      className={cn(
        "rounded-2xl border border-white/10 bg-[#071127]/80 p-2 backdrop-blur-xl",
        compact && "bg-[#071127]/95",
      )}
    >
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
                  isActive
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30"
                    : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-100",
                )}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {!compact && activeDescription && (
        <p className="mt-3 hidden text-center text-xs font-semibold leading-5 text-slate-400 sm:block">
          {activeDescription}
        </p>
      )}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <MethodPipelineSection />
      <FirstDiscovery />
    </div>
  );
}

function MethodTab() {
  return (
    <div className="space-y-6">
      <InvestigationTable />
      <BehaviorReadingModelSection />
      <BehavioralArchetypesSection />
    </div>
  );
}

function StatesTab() {
  return (
    <div className="space-y-6">
      <BehavioralStatesSection />
      <StateTransitionSection />
      <BehavioralTimeline />
    </div>
  );
}

function AdaptiveTab() {
  return (
    <div className="space-y-6">
      <AdaptiveMetricsSection />
      <AdaptiveStabilityInterpretationSection />
      <AdaptiveStabilityExampleSection />
    </div>
  );
}

function ResultTab() {
  return (
    <div className="space-y-6">
      <ResultEvidenceSection />
      <CaseConclusionSection />
      <Findings />
      <ClaimsAndProofs />
    </div>
  );
}

function StudyObjective() {
  return (
    <div className="mt-8 flex items-start gap-4 rounded-2xl border border-violet-300/20 bg-violet-500/10 p-4 text-sm leading-6 text-slate-200">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-[#071127] text-violet-200 shadow-sm">
        <Sparkles className="h-5 w-5" />
      </div>

      <div>
        <p className="font-black text-white">Objetivo do estudo</p>

        <p className="mt-2">
          Provar que degradações silenciosas podem ser observadas e interpretadas.
          A partir disso, entender quando uma operação deixou de operar no seu
          estado de normalidade e passou a entregar menos consistência e coerência.
        </p>
      </div>
    </div>
  );
}

export default function SefazEmlurbCaseStudyPage() {
  return (
    <DefaultPage>
      <div className="mx-auto max-w-7xl space-y-6 pb-10">
        <Hero
          summary="Central 156 / EMLURB - 2025"
          title="Quando uma operação estável"
          titleHighlight="perde a capacidade de recuperação."
          description="Aplicamos o método Ohrly a uma base pública da Central 156 / EMLURB para investigar se havia sinais estruturais de degradação operacional mesmo com a operação funcional."
          rightHightlight={<HeroHighlight />}
        />

        <StudyObjective />

        <CaseStudyTabs />
        <CallToAction
          title="O mesmo método pode ser aplicado ao seu fluxo."
          description="Envie sua base operacional e descubra como está a consistência do seu comportamento antes que um problema vire incidente."
          labelButton="Diagnóstico"
        
        />
      </div>
    </DefaultPage>
  );
}
