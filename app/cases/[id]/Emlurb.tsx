import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Database,
  GitBranch,
  LineChart,
  Network,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  TimerReset,
  XCircle,
} from "lucide-react";

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

const operationalStateModel = [
  {
    state: "Normal",
    badge: "NORMAL",
    color: "bg-emerald-400",
    border: "border-emerald-300/20",
    glow: "shadow-emerald-950/20",
    characteristic:
      "A operação oscila dentro do comportamento esperado e ainda consegue retornar ao baseline sem esforço adicional.",
    transition:
      "Permanece normal enquanto os desvios são curtos, localizados e compatíveis com o ciclo natural de recuperação.",
    why:
      "Baixa persistência, baixa magnitude e baixa propagação.",
  },
  {
    state: "Oscilação absorvível",
    badge: "OSCILAÇÃO",
    color: "bg-amber-400",
    border: "border-amber-300/20",
    glow: "shadow-amber-950/20",
    characteristic:
      "A operação apresenta variações perceptíveis, mas ainda parece capaz de absorver o desvio sozinha.",
    transition:
      "Surge quando um sinal se afasta do baseline, mas ainda não sobrevive tempo suficiente para indicar mudança de regime.",
    why:
      "Magnitude moderada, persistência curta e propagação limitada.",
  },
  {
    state: "Sinal persistente",
    badge: "PERSISTÊNCIA",
    color: "bg-orange-400",
    border: "border-orange-300/20",
    glow: "shadow-orange-950/20",
    characteristic:
      "O desvio deixa de parecer ruído pontual e passa a se repetir ou sobreviver além do comportamento esperado.",
    transition:
      "Ocorre quando a duração do desvio começa a ultrapassar o ciclo natural de recuperação da operação.",
    why:
      "Persistência crescente, ainda com magnitude e propagação controladas.",
  },
  {
    state: "Degradação localizada",
    badge: "LOCALIZADA",
    color: "bg-orange-500",
    border: "border-orange-400/25",
    glow: "shadow-orange-950/25",
    characteristic:
      "A pressão operacional se concentra em um estado, região, RPA ou trecho específico do fluxo.",
    transition:
      "Surge quando a persistência passa a vir acompanhada de intensidade suficiente para afetar a capacidade local de resolução.",
    why:
      "Alta persistência, magnitude relevante e propagação ainda baixa ou moderada.",
  },
  {
    state: "Degradação sustentada",
    badge: "SUSTENTADA",
    color: "bg-rose-500",
    border: "border-rose-300/25",
    glow: "shadow-rose-950/25",
    characteristic:
      "A operação entra em um regime em que a recuperação natural parece insuficiente para voltar ao comportamento esperado.",
    transition:
      "Ocorre quando persistência, magnitude e propagação passam a atuar juntas por tempo suficiente para mudar o regime operacional.",
    why:
      "Persistência alta, magnitude alta e propagação entre múltiplos estados ou dimensões.",
  },
];

const transitionDrivers = [
  {
    title: "Persistência",
    description:
      "Mede se o desvio sobrevive ao tempo. Um pico pode ser ruído; um padrão que permanece começa a mudar o significado do sinal.",
  },
  {
    title: "Magnitude",
    description:
      "Mede a força do desvio. Dois sinais podem durar o mesmo tempo, mas ter impactos operacionais muito diferentes.",
  },
  {
    title: "Propagação",
    description:
      "Mede se o problema continua localizado ou começa a atravessar estados, regiões, RPAs ou partes do fluxo.",
  },
  {
    title: "Ciclo operacional",
    description:
      "Compara o desvio com o tempo natural de recuperação da própria operação. O tempo só importa em relação ao metabolismo do fluxo.",
  },
];

const behavioralArchetypes = [
  {
    name: "Oscilação operacional",
    description:
      "Variação natural que aparece, mas é absorvida pela operação sem alterar o regime dominante.",
    formula: "baixa persistência + baixa propagação",
  },
  {
    name: "Choque operacional",
    description:
      "Mudança intensa e perceptível, mas curta. Pode assustar, porém nem sempre indica degradação estrutural.",
    formula: "alta magnitude + baixa persistência",
  },
  {
    name: "Degradação progressiva",
    description:
      "O comportamento piora aos poucos e começa a ganhar força ao longo do tempo.",
    formula: "persistência crescente + magnitude crescente",
  },
  {
    name: "Degradação localizada",
    description:
      "A pressão fica concentrada em um ponto específico da operação, como uma RPA, estado ou trecho do fluxo.",
    formula: "alta persistência + baixa propagação",
  },
  {
    name: "Degradação sistêmica",
    description:
      "O problema deixa de estar contido e começa a atravessar múltiplas partes da operação.",
    formula: "alta persistência + alta magnitude + alta propagação",
  },
];

const rpiFactors = [
  { label: "Persistência", value: "o desvio sobreviveu ao ciclo natural?" },
  { label: "Magnitude", value: "a força do desvio é operacionalmente relevante?" },
  { label: "Propagação", value: "o sinal saiu de um ponto e contaminou o fluxo?" },
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
    state: "Sinal persistente",
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
  "Não afirma que a Ohrly resolveria a operação automaticamente.",
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

function Hero() {
  return (
    <section className="grid gap-8 py-12 lg:grid-cols-[1fr_0.92fr] lg:py-16">
      <div className="flex flex-col justify-center">
        <div className="mb-7 flex items-center gap-2 text-sm font-bold text-violet-300">
          <a href="#" className="hover:text-violet-200">
            Estudos
          </a>
          <ArrowRight className="h-4 w-4" />
          <span>Exemplo real: Central 156 / EMLURB</span>
        </div>

        <h1 className="max-w-3xl text-4xl font-black leading-[1.04] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Exemplo real: quando uma operação parecia estável, mas já perdia capacidade de recuperação.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          Aplicamos o método Ohrly a uma base pública da Central 156 / EMLURB com aproximadamente 86 mil solicitações para investigar se havia sinais estruturais de degradação operacional antes de qualquer incidente formal.
        </p>

        <div className="mt-8 flex max-w-2xl items-start gap-4 rounded-2xl border border-violet-300/20 bg-violet-500/10 p-4 text-sm leading-6 text-slate-200">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-300/20 bg-[#071127] text-violet-200 shadow-sm">
            <Sparkles className="h-5 w-5" />
          </div>
          <p>
            O objetivo do estudo não é apontar causa raiz nem mensurar impacto financeiro. É provar que degradações silenciosas podem ser observadas e interpretadas.
          </p>
        </div>
      </div>

      <SectionCard className="self-start p-7">
        <h2 className="text-xl font-black text-white">Visão geral da base analisada</h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatCard icon={<Database className="h-5 w-5" />} label="Volume" value="86.966 solicitações" />
          <StatCard icon={<CalendarDays className="h-5 w-5" />} label="Período" value="01/01/2025 a 31/07/2025" />
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
    </section>
  );
}

function FirstDiscovery() {
  return (
    <SectionCard>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.4fr_0.45fr]">
        <div>
          <h2 className="text-2xl font-black text-white">A primeira descoberta</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Os registros não vinham descritos como uma jornada, mas os estados sugeriam uma trajetória operacional implícita.
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
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

          <p className="mt-6 text-sm font-semibold leading-7 text-slate-100">
            Antes de procurar anomalias, era necessário entender o comportamento natural da operação.
          </p>
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

        <div className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
          <p className="text-sm font-bold leading-7 text-slate-100">
            A operação parecia estável no volume total, mas a composição interna começava a mudar.
          </p>
        </div>
      </div>
    </SectionCard>
  );
}

function InvestigationTable() {
  return (
    <SectionCard>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-black text-white">As perguntas que guiaram a investigação</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
            Cada leitura foi desenhada para responder uma pergunta operacional. A intenção não era produzir mais gráficos, mas reduzir ambiguidade sobre o estado da operação.
          </p>
        </div>
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-white/10 lg:block">
        <div className="grid grid-cols-[86px_1.05fr_1.25fr_1.3fr_1.25fr] bg-white/[0.055] text-xs font-black uppercase tracking-wide text-slate-200">
          <div className="p-4">Leitura</div>
          <div className="p-4">Pergunta</div>
          <div className="p-4">O que analisamos</div>
          <div className="p-4">O que encontramos</div>
          <div className="p-4">O que isso prova</div>
        </div>

        {readings.map((reading) => {
          const Icon = reading.icon;
          return (
            <div key={reading.step} className="grid grid-cols-[86px_1.05fr_1.25fr_1.3fr_1.25fr] border-t border-white/10 text-sm leading-6 text-slate-300">
              <div className="flex items-center gap-3 p-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-sm font-black text-violet-200">
                  {reading.step}
                </span>
                <Icon className="h-5 w-5 text-slate-500" />
              </div>
              <div className="p-4 font-black text-white">{reading.question}</div>
              <div className="p-4">{reading.analyzed}</div>
              <div className="p-4">{reading.result}</div>
              <div className="p-4 font-semibold text-slate-100">{reading.proves}</div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-4 lg:hidden">
        {readings.map((reading) => {
          const Icon = reading.icon;
          return (
            <div key={reading.step} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-600 text-sm font-black text-white">
                  {reading.step}
                </span>
                <Icon className="h-5 w-5 text-violet-300" />
                <h3 className="font-black text-white">{reading.question}</h3>
              </div>
              <div className="space-y-3 text-sm leading-6 text-slate-300">
                <p><strong className="text-white">Analisamos:</strong> {reading.analyzed}</p>
                <p><strong className="text-white">Encontramos:</strong> {reading.result}</p>
                <p><strong className="text-white">Prova:</strong> {reading.proves}</p>
              </div>
            </div>
          );
        })}
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

function OperationalStatesSection() {
  return (
    <SectionCard>
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.35fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Modelo de estados</p>
          <h2 className="mt-3 text-2xl font-black text-white">Como a Ohrly interpreta uma mudança de regime</h2>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            A transição entre estados não acontece porque uma métrica passou de um limite fixo. Ela acontece quando o comportamento passa a demonstrar persistência, intensidade e propagação suficientes para sugerir perda de recuperação natural.
          </p>

          <div className="mt-6 rounded-2xl border border-violet-300/20 bg-violet-500/[0.07] p-5">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-violet-300">RPI</p>
            <h3 className="mt-2 text-lg font-black text-white">Recovery Pressure Index</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              O RPI não é um custo financeiro real. Ele é uma pressão relativa de recuperação: ajuda a priorizar quando continuar esperando começou a ficar operacionalmente caro.
            </p>
            <div className="mt-4 grid gap-3">
              {rpiFactors.map((factor) => (
                <div key={factor.label} className="rounded-xl border border-white/10 bg-[#071127]/70 p-3">
                  <p className="text-sm font-black text-white">{factor.label}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{factor.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {transitionDrivers.map((driver) => (
              <div key={driver.title} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-4">
                <h3 className="text-sm font-black text-white">{driver.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{driver.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {operationalStateModel.map((item, index) => (
            <div key={item.state} className={cn("relative rounded-2xl border bg-[#071127]/70 p-5 shadow-xl", item.border, item.glow)}>
              {index < operationalStateModel.length - 1 && (
                <div className="absolute left-8 top-[4.6rem] h-[calc(100%-1rem)] w-px bg-white/10" />
              )}

              <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
                <div className="flex items-start gap-3">
                  <span className={cn("relative z-10 mt-1 h-5 w-5 rounded-full border-4 border-[#071127]", item.color)} />
                  <div>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-slate-300">
                      {item.badge}
                    </span>
                    <h3 className="mt-3 text-base font-black text-white">{item.state}</h3>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">Característica</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.characteristic}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">Quando transiciona</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.transition}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-slate-500">Por que transiciona</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{item.why}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-white/10 pt-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-violet-300">Arquétipos comportamentais</p>
            <h3 className="mt-3 text-2xl font-black text-white">Estados dizem quão ruim está. Arquétipos dizem como está degradando.</h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-slate-400">
            Eles ajudam a separar um choque curto de uma degradação progressiva, localizada ou sistêmica.
          </p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {behavioralArchetypes.map((archetype) => (
            <div key={archetype.name} className="rounded-2xl border border-white/10 bg-[#071127]/70 p-5">
              <h4 className="text-sm font-black text-white">{archetype.name}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-400">{archetype.description}</p>
              <p className="mt-4 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-bold leading-5 text-violet-200">
                {archetype.formula}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

function BehavioralTimeline() {
  return (
    <SectionCard>
      <h2 className="text-2xl font-black text-white">Linha do tempo comportamental da operação</h2>

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

function Cta() {
  return (
    <section id="diagnostico" className="overflow-hidden rounded-[28px] border border-violet-300/20 bg-gradient-to-br from-violet-700/35 via-blue-700/25 to-[#06135a]/80 p-8 text-white shadow-2xl shadow-violet-950/30 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[120px_1fr_auto] lg:items-center">
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/10">
          <div className="absolute h-20 w-20 rounded-full border-[10px] border-violet-300/25" />
          <div className="absolute h-14 w-14 rounded-full border-[10px] border-white" />
          <div className="absolute right-4 top-5 h-4 w-4 rounded-full bg-violet-300" />
        </div>

        <div>
          <h2 className="max-w-2xl text-3xl font-black leading-tight lg:text-4xl">
            O mesmo método pode ser aplicado ao seu fluxo.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200 lg:text-base">
            Envie sua base operacional e descubra como está a consistência do seu comportamento antes que um problema vire incidente.
          </p>
        </div>

        <div className="lg:min-w-80">
          <a
            href="#"
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-violet-600 px-6 py-4 text-sm font-black text-white shadow-xl shadow-violet-950/30 transition hover:bg-violet-500"
          >
            Diagnosticar meu fluxo
            <ArrowRight className="h-5 w-5" />
          </a>
          <p className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-300">
            <ShieldCheck className="h-4 w-4" />
            É rápido, seguro e sem compromisso.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function SefazEmlurbCaseStudyPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030816] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(124,58,237,0.24),transparent_28rem),radial-gradient(circle_at_80%_14%,rgba(37,99,235,0.18),transparent_25rem),linear-gradient(180deg,#030816_0%,#070b21_45%,#040816_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:80px_80px] opacity-40" />
        <div className="absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <Header />

      <div className="mx-auto max-w-7xl space-y-6 px-5 pb-10 sm:px-8 lg:pb-16">
        <Hero />
        <FirstDiscovery />
        <InvestigationTable />
        <Findings />
        <OperationalStatesSection />
        <BehavioralTimeline />
        <ClaimsAndProofs />
        <Cta />
      </div>
    </main>
  );
}
