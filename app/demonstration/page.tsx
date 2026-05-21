"use client";

import DefaultPage from "@/components/DefaultPage";
import { orderDeliveryDiagnosticMock } from "./orderDeliveryDiagnostic.mock";

type Diagnostic = typeof orderDeliveryDiagnosticMock;

type Tone = "blue" | "red" | "orange" | "green" | "purple" | "slate";

type SummaryCardProps = {
    icon: string;
    value: string;
    label: string;
    description: string;
    tone?: Tone;
};

type ExposureRowProps = {
    icon: string;
    label: string;
    value: string;
    tone?: Tone;
};

const navItems = [
    { label: "Visão Geral", icon: "⌂" },
    { label: "Fluxos", icon: "⌁" },
    { label: "Diagnósticos", icon: "✦", active: true },
    { label: "Episódios", icon: "◇" },
    { label: "Métricas", icon: "⌁" },
    { label: "Propagação", icon: "⌇" },
    { label: "Comparações", icon: "▣" },
    { label: "Relatórios", icon: "☰" },
    { label: "Configurações", icon: "⚙" },
];

function formatNumber(value: number) {
    return value.toLocaleString("pt-BR");
}

function formatPercent(value: number) {
    return `${value.toFixed(2).replace(".", ",")}%`;
}

function formatDecimal(value: number) {
    return value.toFixed().replace(".", ",");
}

function formatDate(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "UTC",
    }).format(new Date(value));
}

function formatDateTime(value: string) {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Recife",
    }).format(new Date(value));
}

function getEpisodeRange(startedAt: string, endedAt: string) {
    return `${formatDate(startedAt)} – ${formatDate(endedAt)}`;
}

function getPressureRatio(part: number, total: number) {
    if (!total) return "0,0%";
    return `${((part / total) * 100).toFixed(1).replace(".", ",")}%`;
}

function toneClasses(tone: Tone = "blue") {
    const map: Record<Tone, string> = {
        blue: "text-blue-300 bg-blue-500/10 ring-blue-400/20",
        red: "text-red-300 bg-red-500/10 ring-red-400/20",
        orange: "text-orange-300 bg-orange-500/10 ring-orange-400/20",
        green: "text-emerald-300 bg-emerald-500/10 ring-emerald-400/20",
        purple: "text-violet-300 bg-violet-500/10 ring-violet-400/20",
        slate: "text-slate-300 bg-slate-500/10 ring-slate-400/20",
    };

    return map[tone];
}

function priorityTone(priority: string): Tone {
    if (priority === "HIGH") return "red";
    if (priority === "MEDIUM") return "orange";
    return "blue";
}

function Card({
    children,
    className = "",
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <section
            className={`rounded-2xl border border-white/10 bg-slate-950/70 p-5 shadow-2xl shadow-black/20 backdrop-blur ${className}`}
        >
            {children}
        </section>
    );
}

function SectionTitle({
    number,
    children,
}: {
    number: number;
    children: React.ReactNode;
}) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-sm font-bold text-white shadow-lg shadow-violet-950/40">
                {number}
            </span>

            <h2 className="text-lg font-semibold text-slate-50">{children}</h2>

            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 text-[10px] text-slate-400">
                i
            </span>
        </div>
    );
}

function SummaryCard({
    icon,
    value,
    label,
    description,
    tone = "blue",
}: SummaryCardProps) {
    return (
        <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <div className="flex items-start gap-3">
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ring-1 ${toneClasses(
                        tone
                    )}`}
                >
                    {icon}
                </span>

                <div>
                    <p className="text-2xl font-semibold text-white">{value}</p>
                    <p className="mt-2 text-sm font-medium text-slate-100">{label}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ExposureRow({ icon, label, value, tone = "blue" }: ExposureRowProps) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
            <div className="flex items-center gap-3">
                <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs ring-1 ${toneClasses(
                        tone
                    )}`}
                >
                    {icon}
                </span>
                <span className="text-sm text-slate-300">{label}</span>
            </div>

            <span className="text-right text-sm font-semibold text-slate-50">
                {value}
            </span>
        </div>
    );
}

function Donut({
    value,
    label,
    sublabel,
}: {
    value: number;
    label: string;
    sublabel: string;
}) {
    const normalizedValue = Math.max(0, Math.min(100, value));
    const radius = 46;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (normalizedValue / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative h-36 w-36">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="rgba(255,255,255,0.08)"
                        strokeWidth="13"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="none"
                        stroke="url(#donutGradient)"
                        strokeWidth="13"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                    />
                    <defs>
                        <linearGradient id="donutGradient" x1="0" x2="1" y1="0" y2="1">
                            <stop offset="0%" stopColor="#8b5cf6" />
                            <stop offset="45%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#16a34a" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-slate-300">{label}</span>
                    <span className="text-2xl font-bold text-white">
                        {formatDecimal(normalizedValue)}%
                    </span>
                </div>
            </div>

            <p className="mt-2 max-w-48 text-center text-xs leading-relaxed text-slate-400">
                {sublabel}
            </p>
        </div>
    );
}

function TimelineChart({
    diagnostic,
}: {
    diagnostic: Diagnostic;
}) {
    const episodes = [...diagnostic.highlightedEpisodes].sort(
        (a, b) =>
            new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime()
    );

    const points = episodes.map((episode, index) => {
        const x =
            episodes.length === 1
                ? 345
                : (index / (episodes.length - 1)) * 690;

        const y = 110 - Math.min(100, episode.rpiScore);

        return {
            x,
            y,
            episode,
        };
    });

    const path = points
        .map((point, index) => {
            const command = index === 0 ? "M" : "L";
            return `${command} ${point.x} ${point.y}`;
        })
        .join(" ");

    return (
        <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-slate-100">
                        Linha do tempo dos episódios destacados
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                        RPI dos principais episódios retornados pela leitura
                    </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-slate-950/80 px-3 py-2 text-xs text-slate-300">
                    <p>{getEpisodeRange(diagnostic.mainEvidenceEpisode.startedAt, diagnostic.mainEvidenceEpisode.endedAt)}</p>
                    <p className="mt-1 font-semibold text-white">
                        RPI {formatDecimal(diagnostic.mainEvidenceEpisode.rpiScore)}
                    </p>
                    <p className="text-slate-400">
                        {diagnostic.mainEvidenceEpisode.metricLabel}
                    </p>
                </div>
            </div>

            <svg viewBox="0 0 690 120" className="h-56 w-full overflow-visible">
                <rect x="0" y="0" width="690" height="18" fill="#ef4444" opacity="0.16" />
                <rect x="0" y="18" width="690" height="30" fill="#f97316" opacity="0.14" />
                <rect x="0" y="48" width="690" height="30" fill="#eab308" opacity="0.12" />
                <rect x="0" y="78" width="690" height="42" fill="#22c55e" opacity="0.10" />

                {[0, 115, 230, 345, 460, 575, 690].map((x) => (
                    <line
                        key={x}
                        x1={x}
                        x2={x}
                        y1="0"
                        y2="120"
                        stroke="rgba(255,255,255,0.08)"
                        strokeDasharray="4 4"
                    />
                ))}

                {[18, 48, 78, 120].map((y) => (
                    <line
                        key={y}
                        x1="0"
                        x2="690"
                        y1={y}
                        y2={y}
                        stroke="rgba(255,255,255,0.08)"
                    />
                ))}

                <path
                    d={path}
                    fill="none"
                    stroke="#fb7185"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {points.map(({ x, y, episode }) => (
                    <g key={episode.id}>
                        <circle
                            cx={x}
                            cy={y}
                            r="5"
                            fill={
                                episode.rpiScore >= 85
                                    ? "#ef4444"
                                    : episode.rpiScore >= 60
                                        ? "#f97316"
                                        : episode.rpiScore >= 30
                                            ? "#eab308"
                                            : "#22c55e"
                            }
                            stroke="#0f172a"
                            strokeWidth="2"
                        />
                    </g>
                ))}
            </svg>

            <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-slate-400 md:grid-cols-4">
                <Legend color="bg-emerald-500" label="Baixa 0–30" />
                <Legend color="bg-yellow-500" label="Moderada 30–60" />
                <Legend color="bg-orange-500" label="Alta 60–85" />
                <Legend color="bg-red-500" label="Crítica 85–100" />
            </div>
        </div>
    );
}

function Legend({ color, label }: { color: string; label: string }) {
    return (
        <div className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${color}`} />
            <span>{label}</span>
        </div>
    );
}

function PropagationGraph({
    diagnostic,
}: {
    diagnostic: Diagnostic;
}) {
    const nodes = diagnostic.propagation.nodes;

    const positions = [
        { x: 130, y: 35 },
        { x: 220, y: 92 },
        { x: 185, y: 178 },
        { x: 75, y: 178 },
        { x: 40, y: 92 },
    ];

    const nodePositions = nodes.reduce<Record<string, { x: number; y: number }>>(
        (acc, node, index) => {
            acc[node.metricKey] = positions[index] ?? { x: 130, y: 110 };
            return acc;
        },
        {}
    );

    const strongestEdges = [...diagnostic.propagation.edges]
        .sort((a, b) => b.strength - a.strength)
        .slice(0, 6);

    return (
        <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
            <svg viewBox="0 0 260 220" className="h-64 w-full">
                {strongestEdges.map((edge) => {
                    const source = nodePositions[edge.sourceMetricKey];
                    const target = nodePositions[edge.targetMetricKey];

                    if (!source || !target) return null;

                    return (
                        <line
                            key={`${edge.sourceMetricKey}-${edge.targetMetricKey}`}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke={
                                edge.strength >= 80
                                    ? "rgba(248,113,113,0.85)"
                                    : "rgba(167,139,250,0.55)"
                            }
                            strokeWidth={edge.strength >= 80 ? 3 : 2}
                            strokeDasharray={edge.strength >= 75 ? "0" : "5 4"}
                        />
                    );
                })}

                {nodes.map((node) => {
                    const position = nodePositions[node.metricKey];

                    return (
                        <g key={node.metricKey}>
                            <circle
                                cx={position.x}
                                cy={position.y}
                                r={node.dominant ? 28 : 20}
                                fill={node.dominant ? "#ef4444" : "#312e81"}
                                stroke={node.dominant ? "#fca5a5" : "#a78bfa"}
                                strokeWidth="2"
                            />
                            <text
                                x={position.x}
                                y={position.y - 2}
                                textAnchor="middle"
                                className="fill-white text-[10px] font-bold"
                            >
                                {node.episodes}
                            </text>
                            <text
                                x={position.x}
                                y={position.y + 10}
                                textAnchor="middle"
                                className="fill-slate-200 text-[7px]"
                            >
                                eps
                            </text>
                        </g>
                    );
                })}
            </svg>

            <div className="mt-4 grid gap-2">
                {nodes.map((node) => (
                    <div
                        key={node.metricKey}
                        className="flex items-center justify-between rounded-lg bg-slate-950/70 px-3 py-2 text-xs"
                    >
                        <span className={node.dominant ? "text-red-200" : "text-slate-300"}>
                            {node.metricLabel}
                        </span>
                        <span className="font-semibold text-white">
                            {node.episodes} episódios
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Sidebar() {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 border-r border-white/10 bg-slate-950/95 p-5 lg:flex lg:flex-col">
            <div className="mb-10 flex items-center gap-3">
                <div className="relative h-9 w-9 rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-400 to-cyan-400">
                    <div className="absolute inset-2 rounded-full bg-slate-950" />
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-fuchsia-400" />
                </div>

                <span className="text-xl font-black tracking-tight text-white">
                    OHRLY
                </span>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm transition ${item.active
                            ? "bg-violet-500/15 text-violet-200 ring-1 ring-violet-400/20"
                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                            }`}
                    >
                        <span className="w-5 text-center">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="mt-auto space-y-3">
                <div className="rounded-xl border border-white/10 bg-slate-900/80 p-3">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white">
                            LA
                        </div>
                        <div>
                            <p className="text-sm font-medium text-white">Lucas Almeida</p>
                            <p className="text-xs text-slate-500">Admin</p>
                        </div>
                    </div>
                </div>

                <button className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-3 py-3 text-left text-sm text-slate-300">
                    Empresa Exemplo
                </button>

                <button className="w-full px-3 py-2 text-left text-xs text-slate-500">
                    ← Recolher menu
                </button>
            </div>
        </aside>
    );
}

export default function DemonstrationPage() {
    const diagnostic = orderDeliveryDiagnosticMock;

    const summaryCards: SummaryCardProps[] = [
        {
            icon: "⌁",
            value: formatNumber(diagnostic.summary.totalEpisodes),
            label: "Episódios analisados",
            description: "de pressão de recuperação",
            tone: "blue",
        },
        {
            icon: "●",
            value: formatNumber(diagnostic.summary.criticalEpisodes),
            label: "Episódios críticos",
            description: `${getPressureRatio(
                diagnostic.summary.criticalEpisodes,
                diagnostic.summary.totalEpisodes
            )} do total`,
            tone: "red",
        },
        {
            icon: "●",
            value: formatNumber(diagnostic.summary.highPressureEpisodes),
            label: "Episódios de alta pressão",
            description: `${getPressureRatio(
                diagnostic.summary.highPressureEpisodes,
                diagnostic.summary.totalEpisodes
            )} do total`,
            tone: "orange",
        },
        {
            icon: "⌬",
            value: formatNumber(diagnostic.summary.propagatedEpisodes),
            label: "Episódios com propagação",
            description: `${getPressureRatio(
                diagnostic.summary.propagatedEpisodes,
                diagnostic.summary.totalEpisodes
            )} do total`,
            tone: "purple",
        },
        {
            icon: "◎",
            value: diagnostic.summary.dominantMetricLabel,
            label: "Métrica dominante",
            description: "Principal concentração de degradação",
            tone: "green",
        },
    ];

    const exposureRows: ExposureRowProps[] = [
        {
            icon: "◷",
            label: "Total de eventos analisados",
            value: formatNumber(diagnostic.analysisCoverage.totalAnalyzedEvents),
            tone: "blue",
        },
        {
            icon: "⌁",
            label: "Eventos em episódios degradados",
            value: `${formatNumber(
                diagnostic.analysisCoverage.eventsInDegradedEpisodes
            )} (${formatPercent(diagnostic.analysisCoverage.degradedExposureRatio)})`,
            tone: "red",
        },
        {
            icon: "⌁",
            label: "Eventos em alta ou crítica pressão",
            value: `${formatNumber(
                diagnostic.analysisCoverage.eventsInHighOrCriticalPressure
            )} (${formatPercent(
                diagnostic.analysisCoverage.highOrCriticalExposureRatio
            )})`,
            tone: "orange",
        },
        {
            icon: "◎",
            label: "Valor/receita estimada exposta",
            value: "Não informado",
            tone: "green",
        },
        {
            icon: "☷",
            label: "Entidades únicas impactadas",
            value:
                diagnostic.analysisCoverage.uniqueEntitiesImpacted == null
                    ? "Não informado"
                    : formatNumber(diagnostic.analysisCoverage.uniqueEntitiesImpacted),
            tone: "purple",
        },
    ];

    const mainEpisode = diagnostic.mainEvidenceEpisode;

    const mainEpisodeCards = [
        ["Métrica principal", mainEpisode.metricLabel],
        ["Eventos expostos", formatNumber(mainEpisode.totalEventCount)],
        ["RPI", formatDecimal(mainEpisode.rpiScore)],
        ["Confiança", mainEpisode.confidenceLabel],
        ["Propagação", mainEpisode.propagated ? "Sim" : "Não"],
    ] as const;

    const confidenceItems = [
        {
            label: "Alta confiança",
            count: diagnostic.confidence.highConfidenceEpisodes,
            ratio: diagnostic.confidence.highConfidenceRatio,
            color: "bg-emerald-500",
        },
        {
            label: "Confiança média",
            count: diagnostic.confidence.mediumConfidenceEpisodes,
            ratio: diagnostic.confidence.mediumConfidenceRatio,
            color: "bg-yellow-500",
        },
        {
            label: "Baixa confiança",
            count: diagnostic.confidence.lowConfidenceEpisodes,
            ratio: diagnostic.confidence.lowConfidenceRatio,
            color: "bg-red-500",
        },
    ];

    return (
        <DefaultPage>

            <Sidebar />

            <div className="relative">
                <header className="mb-6 flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-2 text-sm text-slate-500">
                            <span>Fluxos</span>
                            <span>›</span>
                            <span>{diagnostic.flowLabel}</span>
                            <span>›</span>
                            <span className="text-slate-300">Diagnóstico</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                {diagnostic.header.title}
                            </h1>

                            <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-3 py-1 text-xs font-medium text-violet-200">
                                Leitura comportamental
                            </span>
                        </div>

                        <p className="mt-3 text-sm text-slate-400">
                            {diagnostic.header.subtitle}
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 xl:w-[390px]">
                        <button className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                            <span>Período histórico analisado</span>
                            <span>⌄</span>
                        </button>

                        <button className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
                            <span>Contrato {diagnostic.header.contractVersion}</span>
                            <span>⌄</span>
                        </button>
                    </div>
                </header>

                <div className="mb-5 flex flex-col gap-3 border-y border-white/10 py-4 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
                    <div className="flex flex-wrap gap-4">
                        <span>ⓘ Gerado em: {formatDateTime(diagnostic.header.generatedAt)}</span>
                        <span>• Fonte: {diagnostic.header.dataSource}</span>
                        <span>◷ {diagnostic.header.aggregationWindow}</span>
                    </div>

                    <button className="rounded-xl border border-violet-400/50 bg-violet-500/10 px-6 py-3 text-sm font-medium text-violet-100 shadow-lg shadow-violet-950/30 transition hover:bg-violet-500/20">
                        Exportar relatório ↓
                    </button>
                </div>

                <div className="space-y-5">
                    <Card>
                        <SectionTitle number={1}>
                            {diagnostic.generalInterpretation.question}
                        </SectionTitle>

                        <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
                            <div className="grid gap-5 rounded-xl border border-white/10 bg-slate-900/60 p-5 md:grid-cols-[280px_1fr]">
                                <div className="flex gap-4 border-white/10 md:border-r md:pr-5">
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 text-2xl text-red-300">
                                        ♧
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold text-slate-200">
                                            O ciclo de entrega apresentou
                                        </p>

                                        <h2 className="mt-4 text-3xl font-bold leading-tight text-red-400">
                                            {diagnostic.generalInterpretation.answerTitle}
                                        </h2>

                                        <span className="mt-4 inline-flex rounded-lg bg-red-500/15 px-3 py-2 text-xs font-bold uppercase text-red-300">
                                            {diagnostic.generalInterpretation.operationalStateLabel}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <p className="max-w-3xl text-sm leading-7 text-slate-300">
                                        {diagnostic.generalInterpretation.answer}
                                    </p>

                                    <div className="mt-6 rounded-xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
                                        <span className="mr-2">ⓘ</span>
                                        {diagnostic.generalInterpretation.decisionReading}
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-slate-900/60 p-5">
                                <p className="mb-3 text-center text-sm font-semibold text-white">
                                    Confiança desta leitura
                                </p>

                                <Donut
                                    value={
                                        diagnostic.generalInterpretation
                                            .priorityEvidenceConfidenceScore
                                    }
                                    label="Alta"
                                    sublabel={
                                        diagnostic.generalInterpretation.confidenceLabel
                                    }
                                />
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <SectionTitle number={2}>
                            O que observamos de forma resumida
                        </SectionTitle>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                            {summaryCards.map((card) => (
                                <SummaryCard key={card.label} {...card} />
                            ))}
                        </div>

                        <p className="mt-5 rounded-xl border border-white/10 bg-slate-900/70 p-4 text-sm leading-6 text-slate-300">
                            {diagnostic.summary.executiveSummary}
                        </p>
                    </Card>

                    <div className="grid gap-5 xl:grid-cols-2">
                        <Card>
                            <SectionTitle number={3}>
                                Quanto tempo houve para agir?
                            </SectionTitle>

                            <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                                    <p className="text-sm font-semibold text-white">
                                        Episódio mais relevante
                                    </p>

                                    <p className="mt-4 text-sm text-slate-300">
                                        {getEpisodeRange(
                                            diagnostic.decisionWindow.startedAt,
                                            diagnostic.decisionWindow.endedAt
                                        )}
                                    </p>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Duração total:{" "}
                                        {diagnostic.decisionWindow.episodeDurationDays} dias
                                    </p>

                                    <span className="mt-4 inline-flex rounded-lg bg-orange-500/10 px-3 py-2 text-xs font-bold uppercase text-orange-300 ring-1 ring-orange-400/20">
                                        {diagnostic.decisionWindow.statusLabel}
                                    </span>
                                </div>

                                <div>
                                    <p className="text-sm leading-6 text-slate-400">
                                        {diagnostic.decisionWindow.interpretation}
                                    </p>

                                    <div className="mt-8">
                                        <div className="relative h-3 overflow-hidden rounded-full bg-slate-800">
                                            <div
                                                className="absolute left-0 top-0 h-full bg-emerald-500"
                                                style={{
                                                    width: `${100 -
                                                        diagnostic.decisionWindow
                                                            .decisionWindowConsumedRatio
                                                        }%`,
                                                }}
                                            />
                                            <div
                                                className="absolute top-0 h-full bg-red-500"
                                                style={{
                                                    left: `${100 -
                                                        diagnostic.decisionWindow
                                                            .decisionWindowConsumedRatio
                                                        }%`,
                                                    width: `${diagnostic.decisionWindow.decisionWindowConsumedRatio}%`,
                                                }}
                                            />
                                        </div>

                                        <div className="mt-3 grid grid-cols-2 text-center text-sm">
                                            <div className="text-emerald-300">
                                                Janela de decisão
                                                <br />
                                                <strong>
                                                    {diagnostic.decisionWindow.decisionWindowDays} dias
                                                </strong>
                                            </div>

                                            <div className="text-red-300">
                                                Após janela
                                                <br />
                                                <strong>
                                                    {diagnostic.decisionWindow.latePressureDays} dias
                                                </strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <SectionTitle number={4}>
                                Qual foi a escala da exposição?
                            </SectionTitle>

                            <div className="rounded-xl border border-white/10 bg-slate-900/70 px-4">
                                {exposureRows.map((row) => (
                                    <ExposureRow key={row.label} {...row} />
                                ))}
                            </div>

                            <p className="mt-3 text-xs leading-5 text-slate-500">
                                {diagnostic.analysisCoverage.interpretation}
                            </p>
                        </Card>
                    </div>

                    <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
                        <Card>
                            <SectionTitle number={5}>
                                Qual episódio mais explica essa leitura?
                            </SectionTitle>

                            <span className="rounded-lg bg-red-500/10 px-3 py-2 text-xs font-bold uppercase text-red-300 ring-1 ring-red-400/20">
                                Episódio principal
                            </span>

                            <div className="mt-5 flex flex-wrap gap-6 border-b border-white/10 pb-5 text-sm text-slate-300">
                                <span>
                                    ▣ {getEpisodeRange(mainEpisode.startedAt, mainEpisode.endedAt)}
                                </span>
                                <span>◷ {mainEpisode.durationDays} dias de duração</span>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-5">
                                {mainEpisodeCards.map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="rounded-xl border border-white/10 bg-slate-900/70 p-3"
                                    >
                                        <p className="text-xs text-slate-500">{label}</p>
                                        <p className="mt-2 text-sm font-semibold capitalize text-white">
                                            {value}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-5 text-sm leading-6 text-slate-400">
                                {mainEpisode.businessReading}
                            </p>
                        </Card>

                        <Card>
                            <SectionTitle number={6}>
                                Como o comportamento evoluiu no tempo?
                            </SectionTitle>

                            <TimelineChart diagnostic={diagnostic} />
                        </Card>
                    </div>

                    <div className="grid gap-5 xl:grid-cols-2">
                        <Card>
                            <SectionTitle number={7}>
                                A degradação ficou isolada?
                            </SectionTitle>

                            <div className="grid gap-5 md:grid-cols-[230px_1fr]">
                                <div className="rounded-xl border border-white/10 bg-slate-900/70 p-4">
                                    <p className="text-sm font-semibold text-white">
                                        {diagnostic.propagation.hasPropagation
                                            ? "Não completamente."
                                            : "Sim, ficou isolada."}
                                    </p>

                                    <p className="mt-4 text-sm leading-6 text-slate-400">
                                        {diagnostic.propagation.interpretation}
                                    </p>
                                </div>

                                <PropagationGraph diagnostic={diagnostic} />
                            </div>
                        </Card>

                        <Card>
                            <SectionTitle number={8}>
                                Podemos confiar nessa leitura?
                            </SectionTitle>

                            <div className="grid gap-5 md:grid-cols-[220px_1fr]">
                                <Donut
                                    value={diagnostic.confidence.highConfidenceRatio}
                                    label={`${diagnostic.confidence.totalEpisodes} episódios`}
                                    sublabel="Distribuição dos episódios por confiança estatística."
                                />

                                <div className="space-y-4">
                                    {confidenceItems.map((item) => (
                                        <div
                                            key={item.label}
                                            className="flex items-center justify-between gap-4 text-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <span className={`h-3 w-3 rounded-full ${item.color}`} />
                                                <span className="text-slate-300">{item.label}</span>
                                            </div>

                                            <span className="font-semibold text-white">
                                                {formatNumber(item.count)}{" "}
                                                <span className="text-slate-500">
                                                    ({formatPercent(item.ratio)})
                                                </span>
                                            </span>
                                        </div>
                                    ))}

                                    <div className="rounded-xl border border-blue-400/20 bg-blue-500/10 p-4 text-sm leading-6 text-blue-200">
                                        {diagnostic.confidence.interpretation}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <Card>
                        <SectionTitle number={9}>
                            O que esta leitura sugere investigar?
                        </SectionTitle>

                        <p className="mb-5 text-sm text-slate-400">
                            Estas não são ações prescritivas, mas hipóteses para investigação que
                            podem explicar os padrões observados.
                        </p>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                            {diagnostic.investigationHypotheses.map((hypothesis) => (
                                <div
                                    key={hypothesis.title}
                                    className="rounded-xl border border-white/10 bg-slate-900/70 p-4"
                                >
                                    <span
                                        className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold uppercase ring-1 ${toneClasses(
                                            priorityTone(hypothesis.priority)
                                        )}`}
                                    >
                                        {hypothesis.priority}
                                    </span>

                                    <h3 className="mt-4 text-sm font-semibold text-white">
                                        {hypothesis.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-300">
                                        {hypothesis.description}
                                    </p>

                                    <p className="mt-3 text-xs leading-5 text-slate-500">
                                        {hypothesis.rationale}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <footer className="mt-8 flex flex-col gap-3 pb-8 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
                    <p>
                        Ohrly não substitui sua análise. Ele entrega leitura comportamental
                        para decisões humanas mais conscientes.
                    </p>

                    <a href="#" className="font-medium text-violet-300 hover:text-violet-200">
                        Saiba mais sobre como o Ohrly interpreta fluxos →
                    </a>
                </footer>
            </div>
        </DefaultPage>
    );
}