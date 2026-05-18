import DefaultPage from "@/components/DefaultPage";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import Link from "next/link";

const investigationSteps = [
    {
        number: "1",
        title: "O incidente é isolado ou faz parte de uma sequência?",
        analyzed: "Sequência temporal de eventos e resultados.",
        interpreted: "Incidentes raramente surgem do nada.",
        icon: "timeline",
    },
    {
        number: "2",
        title: "O comportamento rompeu o histórico recente?",
        analyzed: "Comparação com o baseline de curto prazo.",
        interpreted: "Rupturas indicam perda de coerência.",
        icon: "chart",
    },
    {
        number: "3",
        title: "O comportamento começou a acelerar?",
        analyzed: "Variação da métrica ao longo do tempo.",
        interpreted: "Aceleração é um sinal de alerta precoce.",
        icon: "arrow",
    },
    {
        number: "4",
        title: "Um desvio isolado é suficiente?",
        analyzed: "Magnitude do desvio versus variação histórica.",
        interpreted: "Picos isolados podem ser ruído.",
        icon: "target",
    },
    {
        number: "5",
        title: "O sinal persistiu?",
        analyzed: "Duração e recorrência do comportamento.",
        interpreted: "Persistência muda o significado do sinal.",
        icon: "clock",
    },
    {
        number: "6",
        title: "Existia uma janela antes do incidente?",
        analyzed: "Período entre início do desvio e o incidente.",
        interpreted: "Há tempo útil para agir.",
        icon: "hourglass",
    },
    {
        number: "7",
        title: "Toda degradação vira incidente?",
        analyzed: "Desfecho após degradações anteriores.",
        interpreted: "Nem toda degradação evolui para incidente.",
        icon: "branch",
    },
    {
        number: "8",
        title: "O contexto Ohrly melhora uma decisão?",
        analyzed: "Contexto como canal, versão, região e horário.",
        interpreted: "Contexto qualifica risco e prioridade.",
        icon: "context",
    },
];

const learnings = [
    {
        title: "Desvio isolado não basta",
        description: "Sem contexto e sem persistência, o desvio pode ser apenas ruído.",
        accent: "text-blue-600 bg-blue-50 border-blue-100",
        icon: "pulse",
    },
    {
        title: "Persistência muda o significado",
        description: "Sinais que se repetem ganham força e relevância.",
        accent: "text-emerald-600 bg-emerald-50 border-emerald-100",
        icon: "refresh",
    },
    {
        title: "Aceleração importa",
        description: "Velocidade do desvio antecipa o impacto no fluxo.",
        accent: "text-violet-600 bg-violet-50 border-violet-100",
        icon: "trend",
    },
    {
        title: "Densidade importa",
        description: "Mais eventos no mesmo padrão aumentam a confiança do sinal.",
        accent: "text-orange-600 bg-orange-50 border-orange-100",
        icon: "grid",
    },
    {
        title: "A janela de decisão é observável",
        description: "Existe um período útil entre o início do desvio e o incidente.",
        accent: "text-amber-600 bg-amber-50 border-amber-100",
        icon: "timer",
    },
    {
        title: "O diagnóstico precisa ser interpretável",
        description: "Decisões melhores exigem explicações claras e acionáveis.",
        accent: "text-indigo-600 bg-indigo-50 border-indigo-100",
        icon: "shield",
    },
];

const diagnosisSteps = [
    {
        title: "Entendemos o fluxo",
        description: "Mapeamos eventos, métricas e resultados.",
        icon: "database",
    },
    {
        title: "Recebemos a base",
        description: "Seu CSV entra no nosso pipeline seguro.",
        icon: "download",
    },
    {
        title: "Reconstruímos o comportamento",
        description: "Recriamos a linha do tempo do fluxo.",
        icon: "line",
    },
    {
        title: "Criamos o baseline",
        description: "Estabelecemos o histórico esperado.",
        icon: "baseline",
    },
    {
        title: "Detectamos estados",
        description: "Identificamos sinais, desvios e janelas.",
        icon: "state",
    },
    {
        title: "Entregamos a leitura",
        description: "Diagnóstico claro, explicável e acionável.",
        icon: "report",
    },
];

const baseChecklist = [
    "Timestamp",
    "Entidade",
    "Fluxo / Evento",
    "Métrica",
    "Contexto",
    "Resultado",
    "Histórico",
];

const navItems = ["Soluções", "Como funciona", "Casos", "Recursos", "Empresa", "Preços"];

type IconName =
    | "timeline"
    | "chart"
    | "arrow"
    | "target"
    | "clock"
    | "hourglass"
    | "branch"
    | "context"
    | "pulse"
    | "refresh"
    | "trend"
    | "grid"
    | "timer"
    | "shield"
    | "database"
    | "download"
    | "line"
    | "baseline"
    | "state"
    | "report"
    | "csv"
    | "ohrly"
    | "window"
    | "search"
    | "idea"
    | "lock"
    | "cart";

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
    const common = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
    };

    switch (name) {
        case "csv":
            return (
                <svg {...common}>
                    <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M6 12h12v5H6v-5Z" fill="currentColor" opacity="0.15" />
                    <path d="M8 15h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "ohrly":
            return (
                <svg {...common}>
                    <path d="M19 12a7 7 0 1 1-2.05-4.95" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M21 5v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2.2" fill="currentColor" />
                </svg>
            );
        case "window":
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M6 15l3-3 3 2 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6 17h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.35" />
                </svg>
            );
        case "timeline":
            return (
                <svg {...common}>
                    <path d="M6 6h12M6 12h12M6 18h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="4" cy="6" r="1" fill="currentColor" />
                    <circle cx="4" cy="12" r="1" fill="currentColor" />
                    <circle cx="4" cy="18" r="1" fill="currentColor" />
                </svg>
            );
        case "chart":
        case "line":
            return (
                <svg {...common}>
                    <path d="M4 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M7 15l3-4 3 2 5-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "arrow":
        case "trend":
            return (
                <svg {...common}>
                    <path d="M4 16l5-5 4 3 7-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 6h5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "target":
        case "baseline":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "clock":
        case "timer":
            return (
                <svg {...common}>
                    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 8v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "hourglass":
            return (
                <svg {...common}>
                    <path d="M7 4h10M7 20h10M8 4c0 5 8 5 8 10s-8 5-8 10M16 4c0 5-8 5-8 10s8 5 8 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "branch":
            return (
                <svg {...common}>
                    <circle cx="6" cy="6" r="2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="18" cy="7" r="2" stroke="currentColor" strokeWidth="1.8" />
                    <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 6h3c3 0 3 1 5 1M8 6h2c5 0 3 11 6 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "context":
        case "grid":
            return (
                <svg {...common}>
                    <path d="M5 5h5v5H5V5ZM14 5h5v5h-5V5ZM5 14h5v5H5v-5ZM14 14h5v5h-5v-5Z" stroke="currentColor" strokeWidth="1.8" />
                </svg>
            );
        case "pulse":
            return (
                <svg {...common}>
                    <path d="M3 12h4l2-6 4 12 2-6h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "refresh":
            return (
                <svg {...common}>
                    <path d="M19 8a7 7 0 0 0-12-2l-2 2M5 3v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 16a7 7 0 0 0 12 2l2-2M19 21v-5h-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "shield":
            return (
                <svg {...common}>
                    <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M9 12l2 2 4-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            );
        case "database":
            return (
                <svg {...common}>
                    <ellipse cx="12" cy="6" rx="7" ry="3" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 6v12c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M5 12c0 1.7 3.1 3 7 3s7-1.3 7-3" stroke="currentColor" strokeWidth="1.8" />
                </svg>
            );
        case "download":
            return (
                <svg {...common}>
                    <path d="M12 4v10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M8 10l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "state":
            return (
                <svg {...common}>
                    <path d="M5 17c3-10 11 0 14-10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <circle cx="5" cy="17" r="1.8" fill="currentColor" />
                    <circle cx="12" cy="12" r="1.8" fill="currentColor" />
                    <circle cx="19" cy="7" r="1.8" fill="currentColor" />
                </svg>
            );
        case "report":
            return (
                <svg {...common}>
                    <path d="M7 3h7l4 4v14H7V3Z" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M14 3v5h5" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M10 13h5M10 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "search":
            return (
                <svg {...common}>
                    <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "idea":
            return (
                <svg {...common}>
                    <path d="M9 18h6M10 22h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M8 14c-1.3-1.2-2-2.8-2-4.5a6 6 0 1 1 12 0c0 1.7-.7 3.3-2 4.5-.8.7-1 1.4-1 2H9c0-.6-.2-1.3-1-2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                </svg>
            );
        case "lock":
            return (
                <svg {...common}>
                    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
            );
        case "cart":
            return (
                <svg {...common}>
                    <path d="M4 5h2l2 10h9l2-7H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="10" cy="19" r="1.5" fill="currentColor" />
                    <circle cx="17" cy="19" r="1.5" fill="currentColor" />
                </svg>
            );
        default:
            return null;
    }
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>;
}

function MetricLine({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-1 h-2 w-2 rounded-full bg-violet-600" />
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">{label}</p>
                <p className="mt-3 text-xs leading-5 text-slate-300">{value}</p>
            </div>
        </div>
    );
}

function MiniChart() {
    const points = [
        [8, 54],
        [22, 48],
        [36, 42],
        [50, 50],
        [64, 34],
        [78, 26],
        [92, 12],
    ];

    const path = points.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join(" ");

    return (
        <svg viewBox="0 0 100 64" className="h-28 w-full overflow-visible">
            <defs>
                <linearGradient id="diagnosisGradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0%" stopColor="#22c55e" stopOpacity="0.16" />
                    <stop offset="55%" stopColor="#f59e0b" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            <rect x="0" y="0" width="100" height="64" rx="10" fill="url(#diagnosisGradient)" />
            {[16, 32, 48].map((y) => (
                <path key={y} d={`M0 ${y}H100`} stroke="#CBD5E1" strokeDasharray="3 3" strokeWidth="0.6" />
            ))}
            {[20, 40, 60, 80].map((x) => (
                <path key={x} d={`M${x} 0V64`} stroke="#CBD5E1" strokeDasharray="3 3" strokeWidth="0.6" />
            ))}
            <path d={path} fill="none" stroke="#2563EB" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M50 50 L64 34 L78 26 L92 12" fill="none" stroke="#F97316" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M78 26 L92 12" fill="none" stroke="#EF4444" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M75 0V64" stroke="#EF4444" strokeDasharray="3 3" strokeWidth="1" />
            {points.map(([x, y], index) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="2.5" fill={index >= 5 ? "#EF4444" : index >= 3 ? "#F97316" : "#2563EB"} stroke="white" strokeWidth="1" />
            ))}
        </svg>
    );
}

function HeroFlow() {
    const items = [
        {
            icon: "csv" as const,
            title: "Seu CSV",
            description: "Fluxo, eventos e contexto",
            color: "text-emerald-700 bg-emerald-50 border-emerald-100",
        },
        {
            icon: "ohrly" as const,
            title: "Ohrly",
            description: "Análise comportamental e reconstrução",
            color: "text-blue-700 bg-blue-50 border-blue-100",
        },
        {
            icon: "window" as const,
            title: "Janela de decisão",
            description: "Diagnóstico interpretável e acionável",
            color: "text-orange-700 bg-orange-50 border-orange-100",
        },
    ];

    return (
        <div className="grid gap-4 sm:grid-cols-3 ">
            {items.map((item, index) => (
                <div key={item.title} className="contents">
                    <InfoCard icon={item.icon} title={item.title}>
                        {item.description}
                    </InfoCard>
                </div>
            ))}
        </div>
    );
}

function InfoCard({ icon, title, children, accent = "blue" }: { icon: IconName; title: string; children: React.ReactNode; accent?: "blue" | "amber" }) {
    return (
        <article
            key={title}
            className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]"
        >
            <Icon name={icon} className="h-8 w-8 text-indigo-300" />
            <h3 className="mt-4 font-medium text-indigo-100">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-400">
                {children}
            </p>
        </article>
    );
}

function InvestigationCard({ step }: { step: (typeof investigationSteps)[number] }) {
    return (
        <div className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
            <div className="absolute -left-3 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-violet-700 text-xs font-bold text-white shadow-lg shadow-violet-600 md:-left-4">
                {step.number}
            </div>
            <div className="flex gap-4 pl-2">
                <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold leading-snug text-indigo-100">{step.title}</h3>
                    <p className="mt-3 text-xs leading-relaxed text-slate-300">
                        <strong className="font-semibold text-indigo-100">O que analisamos:</strong> {step.analyzed}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-300">
                        <strong className="font-semibold text-indigo-100">O que interpretamos:</strong> {step.interpreted}
                    </p>
                </div>
                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl  text-violet-100 sm:flex">
                    <Icon name={step.icon as IconName} className="h-5 w-5" />
                </div>
            </div>
        </div>
    );
}

function FinalCta() {
    return (
        <section
            id="contact"
            className="relative z-10 overflow-hidden rounded-3xl border border-indigo-300/20 bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 p-8 shadow-2xl shadow-indigo-950/40"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.25),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.18),transparent_30%)]" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="flex gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-indigo-300/20 bg-white/5">
                        <Icon name="pulse" className="h-8 w-8 text-indigo-200" />
                    </div>

                    <div>
                        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white">
                            O objetivo não é gerar mais alerta. É reduzir a ambiguidade antes do incidente.
                        </h2>
                        <p className="mt-2 text-lg text-indigo-100/80">
                            O Ohrly não acusa, não prescreve e não substitui suas ferramentas. Ele nomeia o estado do fluxo e mostra quando esperar deixou de ser neutro.
                        </p>
                    </div>
                </div>

                <a
                    href="/diagnostic"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-violet-500 transition hover:-translate-y-0.5 hover:bg-violet-700"
                >
                    Diagnóstico
                </a>
            </div>
        </section>
    );
}

export default function HowItWorksPage() {
    const leftSteps = investigationSteps.slice(0, 4);
    const rightSteps = investigationSteps.slice(4);

    return (
        <DefaultPage>
            <Hero
                summary="Como o processo funciona"
                title="Do CSV à janela de"
                titleHighlight="decisão"
                description="Um estudo de caso real que mostra o que acontece depois que você envia um fluxo para diagnóstico: saímos dos dados brutos e chegamos a uma leitura clara sobre degradação comportamental."
                rightHightlight={<HeroFlow />}

            />
            <section className="mx-auto max-w-7xl">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <InfoCard icon="target" title="Por que fizemos este estudo">
                        Usamos fraude como proxy para investigar se incidentes podem ser construções progressivas e não apenas rupturas súbitas.
                    </InfoCard>
                    <InfoCard icon="search" title="A busca pela base certa">
                        <div className="grid grid-cols-2 gap-2">
                            {baseChecklist.map((item) => (
                                <div key={item} className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100 text-[10px] text-emerald-700">✓</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </InfoCard>
                    <InfoCard icon="idea" title="A hipótese" accent="amber">
                        Incidentes explícitos podem ser precedidos por perda de coerência comportamental.
                    </InfoCard>
                    <InfoCard icon="chart" title="O que investigamos">
                        Transformamos sinais dispersos em uma linha do tempo clara, para revelar padrões antes do incidente.
                    </InfoCard>
                </div>
            </section>

            <section className="max-w-7xl border-t border-white/10 pt-8">
                <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-white">A investigação</h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                            Cada query foi criada para responder uma pergunta específica. A análise não começa pelo gráfico: começa pela dúvida que precisa ser reduzida.
                        </p>
                    </div>
                    <Badge className="bg-slate-950 text-white">8 perguntas → 1 leitura de decisão</Badge>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                    {[leftSteps, rightSteps].map((steps, groupIndex) => (
                        <div key={groupIndex} className="relative space-y-4 border-l border-blue-100 pl-6 md:pl-8">
                            {steps.map((step) => (
                                <InvestigationCard key={step.number} step={step} />
                            ))}
                        </div>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl  pt-16">
                <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
                    <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <h2 className="mt-4 text-3xl text-white tracking-tight text-slate-950">O que aprendemos</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-6 text-slate-300">
                            O diagnóstico não procura apenas uma anomalia. Ele procura o momento em que o comportamento começa a formar um estado.
                        </p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                        {learnings.map((item) => (
                            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
                                <Icon name={item.icon as IconName} className="h-5 w-5" />
                                <h3 className="text-sm font-bold leading-snug text-indigo-100 mt-5">{item.title}</h3>
                                <p className="mt-3 text-xs leading-5 text-slate-300">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="diagnostico" className="mx-auto grid max-w-7xl gap-8 py-8">
                <div>
                    <div className="mb-7">
                        <h2 className="text-3xl font-semibold tracking-tight text-white">Como isso vira diagnóstico</h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-300">
                            Quando você envia um fluxo, seguimos a mesma lógica do estudo: organizamos os dados, reconstruímos a trajetória e entregamos uma leitura interpretável.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
                        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                            {diagnosisSteps.map((step, index) => (
                                <div key={step.title} className="relative rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
                                    <div className="absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white shadow-violet-200">
                                        {index + 1}
                                    </div>
                                    <div className="mx-auto mt-3 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-sm">
                                        <Icon name={step.icon as IconName} className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-sm font-bold leading-snug text-indigo-100 mt-5">{step.title}</h3>
                                    <p className="mt-3 text-xs leading-5 text-slate-300">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div id="exemplo" className="mt-8 rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
                        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
                            <div>
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-white">
                                        <Icon name="cart" className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold leading-snug text-indigo-100 mt-5">Exemplo de diagnóstico</p>
                                        <h3 className="text-2xl font-black tracking-tight text-white">Checkout Pix</h3>
                                    </div>
                                </div>

                                <div className="mt-5 inline-flex rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-bold text-red-700">
                                    Estado atual: Degradação comportamental sustentada
                                </div>

                                <div className="mt-5 space-y-4">
                                    <MetricLine label="Desde" value="4 dias" />
                                    <MetricLine label="O que mudou" value="+22% em tentativas repetidas · +17% no tempo até confirmação · +9% em abandono após falha" />
                                    <MetricLine label="Onde concentra" value="Mobile · horário noturno · versão v18" />
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]">
                                <div className="text-4xl font-black leading-none text-blue-200">“</div>
                                <h4 className="mt-1 text-sm font-black text-white">Interpretação</h4>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    O fluxo ainda está operacional, mas deixou de recuperar dentro do ciclo histórico esperado. A espera já não é neutra.
                                </p>
                                <div className="mt-6 flex h-11 w-11 items-center justify-center rounded-2xl bg-transparent text-white shadow-sm">
                                    <Icon name="target" className="h-5 w-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <FinalCta/>
        </DefaultPage>
    )
}
