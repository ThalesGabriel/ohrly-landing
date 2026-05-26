"use client";

import OhrlyPageShell from "@/components/layout/OhrlyPageShell";
import {
    ArrowRight,
    BarChart3,
    Boxes,
    CheckCircle2,
    ChevronUp,
    CircleDollarSign,
    Clock3,
    Code2,
    Gauge,
    GitBranch,
    Hourglass,
    Lightbulb,
    LineChart,
    MonitorSmartphone,
    PackageCheck,
    PlayCircle,
    Search,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    Target,
    Users,
    Zap,
} from "lucide-react";

import { useEffect, useState } from "react";

type StatusCard = {
    icon: React.ElementType;
    label: string;
    value: string;
    tone?: "cyan" | "green" | "yellow" | "red";
};

type ReadingItem = {
    icon: React.ElementType;
    title: string;
};

const statusCards: StatusCard[] = [
    { icon: Gauge, label: "Estado", value: "Degradação sustentada", tone: "red" },
    { icon: Clock3, label: "Persistência", value: "4 dias", tone: "cyan" },
    { icon: LineChart, label: "Pressão de recuperação", value: "Alta", tone: "green" },
    { icon: MonitorSmartphone, label: "Contexto afetado", value: "Pix + Mobile", tone: "cyan" },
    { icon: GitBranch, label: "Sinal secundário", value: "Retries aumentando", tone: "yellow" },
    { icon: CircleDollarSign, label: "Valor exposto", value: "R$ 184 mil", tone: "green" },
];

const readingItems: ReadingItem[] = [
    { icon: Search, title: "O que mudou" },
    { icon: Clock3, title: "Há quanto tempo mudou" },
    { icon: Target, title: "Onde o problema está concentrado" },
    { icon: Zap, title: "Se parece ruído ou degradação" },
    { icon: ShieldCheck, title: "Qual operação ou valor está exposto" },
    { icon: Hourglass, title: "Esperar pode estar ficando caro." },
];

const personas = [
    {
        icon: ShoppingCart,
        title: "E-commerce",
        description: "Entenda onde o funil de compra perde consistência antes da receita ser impactada.",
    },
    {
        icon: Boxes,
        title: "Produto",
        description: "Veja o comportamento real dos fluxos que sustentam a experiência do usuário.",
    },
    {
        icon: Code2,
        title: "Engenharia",
        description: "Priorize problemas que já são relevantes no comportamento, não apenas no sistema.",
    },
    {
        icon: Gauge,
        title: "Operações",
        description: "Antecipe filas, atrasos e retrabalho antes que virem custo operacional explícito.",
    },
];

const steps = [
    {
        title: "Escolha um fluxo crítico",
        description: "Checkout, pagamento, entrega, atendimento, onboarding ou outro fluxo importante.",
        icon: PackageCheck,
    },
    {
        title: "Envie dados históricos",
        description: "Pode começar com uma planilha, exportação ou eventos já existentes.",
        icon: BarChart3,
    },
    {
        title: "Receba uma leitura operacional",
        description: "O Ohrly mostra onde o fluxo saiu do esperado, há quanto tempo e o que merece atenção.",
        icon: LineChart,
    },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function GlowCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-white/80 dark:bg-slate-950/70 shadow-2xl shadow-cyan-950/20 backdrop-blur",
                "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%)]",
                className,
            )}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-700/15 bg-cyan-50 px-3 py-1 text-xs text-slate-600 dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-slate-600 dark:text-white">
            {children}
        </span>
    );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
    return (
        <a
            href="/contact"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
        >
            {children}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </a>
    );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
    return (
        <a
            href="/demo"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-6 text-sm font-semibold text-slate-600 dark:text-slate-300 transition hover:border-cyan-500/40 hover:bg-cyan-50 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-950/40 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5 dark:hover:text-cyan-600 dark:text-cyan-300"
        >
            <PlayCircle className="h-5 w-5 text-cyan-500 dark:text-cyan-600 dark:text-cyan-300" />
            {children}
        </a>
    );
}

function CompactReportExampleSection() {
    const inputStats = [
        {
            label: "Eventos disponíveis",
            value: "59.863",
            description: "conversas no dataset analisado",
        },
        {
            label: "Colunas do arquivo",
            value: "18",
            description: "campos brutos disponíveis no CSV",
        },
        {
            label: "Campos mapeados",
            value: "18",
            description: "entidade, contexto, métricas e sinais de impacto",
        },
        {
            label: "Período analisado",
            value: "54 dias",
            description: "de 06/01/2025 a 28/02/2025",
        },
    ];

    const configStats = [
        {
            label: "Contextos",
            value: "3",
            description: "intent, subject_tag e channel",
        },
        {
            label: "Métricas configuradas",
            value: "8",
            description: "retenção, resolução, falha, handoff, reclamação e tempos",
        },
        {
            label: "Baseline",
            value: "7 janelas",
            description: "rolling contextual com fallback hierárquico",
        },
        {
            label: "Volume mínimo",
            value: "30",
            description: "eventos por janela para análise",
        },
    ];

    const outputStats = [
        {
            label: "Episódios detectados",
            value: "44",
            description: "pressões de recuperação identificadas",
            className: "border-cyan-300/20 bg-cyan-300/10",
        },
        {
            label: "Pressão alta",
            value: "32",
            description: "episódios chegaram a alta pressão",
            className: "border-red-400/20 bg-red-400/10",
        },
        {
            label: "Eventos degradados",
            value: "39.096",
            description: "eventos em episódios degradados",
            className: "border-yellow-300/20 bg-yellow-300/10",
        },
        {
            label: "Eventos em alta pressão",
            value: "33.897",
            description: "eventos em episódios de alta pressão ou crítica",
            className: "border-red-400/20 bg-red-400/10",
        },
    ];

    const actionItems = [
        {
            priority: "Alta",
            title: "Comparar com mudanças operacionais",
            description:
                "Cruzar os períodos de maior pressão com deploys, mudanças de regra, campanhas ou alterações no atendimento.",
        },
        {
            priority: "Alta",
            title: "Investigar propagação entre métricas",
            description:
                "Verificar se a queda de retenção apareceu junto com handoff, reclamações, falhas no boleto ou aumento do tempo humano.",
        },
        {
            priority: "Média",
            title: "Priorizar sinais com alta confiança",
            description:
                "Começar pelos episódios com maior volume e confiança estatística antes de investigar sinais mais frágeis.",
        },
        {
            priority: "Média",
            title: "Acompanhar recorrência",
            description:
                "Comparar os episódios destacados com ocorrências anteriores para identificar famílias recorrentes de degradação.",
        },
    ];

    return (
        <section className="py-6">
            <GlowCard className="p-6 lg:p-8">
                <div>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        De um CSV bruto para uma leitura de decisão.
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-800 dark:text-slate-400">
                        Usamos um dataset sintético de retenção no fluxo de boleto
                        para simular como o Ohrly interpreta um fluxo crítico: primeiro
                        entende o arquivo, depois aplica um contrato comportamental e,
                        por fim, gera uma leitura operacional.
                    </p>

                </div>
                <div className="grid gap-8 lg:grid-cols-3 lg:items-start mt-5">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 p-5">
                        <div>
                            <div className="flex items-center justify-between flex-1">
                                <div>
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">1. O que entrou</p>
                                </div>
                                <div>
                                    <span className="rounded-full border border-slate-700 bg-slate-100 dark:bg-slate-900 px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-300">
                                        CSV
                                    </span>
                                </div>
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Dataset de atendimento e retenção em boleto
                            </h3>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                            {inputStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40 p-4"
                                >
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">{item.label}</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-slate-800 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 p-5">
                        <div>
                            <div className="flex items-center justify-between flex-1">
                                <div>
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">2. Como o Ohrly interpretou</p>
                                </div>
                                <div>
                                    <span className="rounded-full border border-cyan-700 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-300">
                                        boleto_retention_flow
                                    </span>
                                </div>
                            </div>
                            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                Contrato comportamental do fluxo
                            </h3>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                            {configStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40 p-4"
                                >
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">{item.label}</p>
                                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-xs leading-5 text-slate-800 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 p-5">
                            <div>
                                <div className="flex items-center justify-between flex-1">
                                    <div>
                                        <p className="text-xs text-cyan-600 dark:text-cyan-300">3. O que saiu</p>
                                    </div>
                                    <div>
                                        <span className="rounded-full border border-emerald-700 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                                            Alta confiança
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    Pressão com propagação
                                </h3>
                            </div>


                            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                                {outputStats.map((item) => (
                                    <div
                                        key={item.label}
                                        className={`rounded-xl border p-4 border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40`}
                                    >
                                        <p className="text-xs text-cyan-600 dark:text-cyan-300">{item.label}</p>
                                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                            {item.value}
                                        </p>
                                        <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-300">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="grid gap-8 lg:grid-cols-2 lg:items-start mt-5">
                    <div className="rounded-2xl border border-violet-300/20 bg-violet-300/10 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-violet-800 dark:text-violet-200">4. O que fazer com isso</p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    Ações sugeridas para priorização
                                </h3>
                            </div>

                            <span className="rounded-full border border-violet-700 bg-violet-300/10 px-3 py-1 text-xs font-medium text-violet-800 dark:text-violet-200">
                                Plano de investigação
                            </span>
                        </div>

                        <div className="mt-5 grid gap-3 lg:grid-cols-2">
                            {actionItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-xl border border-violet-300 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-4"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {item.title}
                                        </p>

                                        <span
                                            className={
                                                item.priority === "Alta"
                                                    ? "rounded-full border border-red-700 bg-red-400/10 px-2 py-1 text-[10px] font-medium text-red-700 dark:text-red-300"
                                                    : "rounded-full border border-yellow-700 bg-yellow-300/10 px-2 py-1 text-[10px] font-medium text-yellow-800 dark:text-yellow-200"
                                            }
                                        >
                                            {item.priority}
                                        </span>
                                    </div>

                                    <p className="mt-3 text-xs leading-5 text-slate-800 dark:text-slate-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 rounded-xl border border-violet-300 bg-slate-50/60 dark:bg-slate-950/60 p-4">
                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                O Ohrly não decide pelo time. Ele organiza a investigação:
                                mostra onde a pressão apareceu, quais sinais são mais confiáveis
                                e quais hipóteses merecem prioridade na próxima conversa.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between h-[100%]">
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="rounded-2xl border border-yellow-400 dark:border-yellow-300/20 bg-yellow-300/10 p-5">
                                <p className="text-xs text-yellow-800 dark:text-yellow-200">Episódio principal</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                    retention_rate · 5 dias
                                </p>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    1.047 eventos expostos, RPI 68,93 e janela de decisão
                                    consumida em 60%.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-cyan-400 dark:border-cyan-300/20 bg-cyan-300/10 p-5">
                                <p className="text-xs text-cyan-600 dark:text-cyan-300">Leitura final</p>
                                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                    Esperar deixou de ser neutro.
                                </p>
                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    A degradação não ficou isolada: apareceu em retenção,
                                    handoff, reclamação, falha no boleto, resolução e tempo humano.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-cyan-400 dark:border-cyan-300/20 bg-cyan-300/5 p-5">
                            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                                Diante desse contexto, o que isso quer dizer?
                            </p>

                            <p className="mt-3 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                O fluxo não apresentou apenas uma oscilação isolada.
                                Ele acumulou pressão operacional em múltiplos sinais,
                                com propagação e alta confiança estatística.
                            </p>

                            <p className="mt-4 text-sm leading-6 text-slate-800 dark:text-slate-400">
                                Em uma call, isso ajuda o time a sair do “acho que piorou”
                                para uma conversa baseada em evidências: o que mudou,
                                há quanto tempo, onde concentrou e quantos eventos passaram
                                por períodos de degradação.
                            </p>
                        </div>
                    </div>
                </div>


            </GlowCard>
        </section>
    );
}

function MiniChart() {
    const states = [
        {
            label: "Saudável",
            from: "7 dias atrás",
            to: "5 dias atrás",
            width: "34%",
            dot: "bg-emerald-400",
            line: "from-emerald-400/70 to-emerald-400/20",
            text: "text-emerald-600 dark:text-emerald-300",
            description: "Comportamento dentro do esperado",
        },
        {
            label: "Atenção",
            from: "5 dias atrás",
            to: "3 dias atrás",
            width: "28%",
            dot: "bg-yellow-300",
            line: "from-yellow-300/70 to-yellow-300/20",
            text: "text-yellow-600 dark:text-yellow-300",
            description: "Desvio persistente começando",
        },
        {
            label: "Degradação",
            from: "3 dias atrás",
            to: "Hoje",
            width: "38%",
            dot: "bg-red-400",
            line: "from-red-400/80 to-red-400/25",
            text: "text-red-600 dark:text-red-300",
            description: "Perda sustentada de consistência",
        },
    ];

    return (
        <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
                <span>Evolução do estado</span>

                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                        <i className="h-2 w-2 rounded-full bg-emerald-400" />
                        Saudável
                    </span>

                    <span className="flex items-center gap-2">
                        <i className="h-2 w-2 rounded-full bg-yellow-300" />
                        Atenção
                    </span>

                    <span className="flex items-center gap-2">
                        <i className="h-2 w-2 rounded-full bg-red-400" />
                        Degradação
                    </span>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/70 p-4">
                <div className="relative">
                    <div className="absolute left-0 right-0 top-[24px] h-px bg-slate-200 dark:bg-slate-800" />

                    <div className="relative flex w-full">
                        {states.map((state, index) => (
                            <div
                                key={state.label}
                                className="relative"
                                style={{ width: state.width }}
                            >
                                <div className="flex items-center">
                                    <div
                                        className={`z-10 h-4 w-4 rounded-full border-2 border-slate-100 dark:border-slate-950 ${state.dot} shadow-lg`}
                                    />

                                    <div
                                        className={`h-1 flex-1 rounded-full bg-gradient-to-r ${state.line}`}
                                    />
                                </div>

                                <div className="mt-4 pr-3">
                                    <p className={`text-xs font-semibold ${state.text}`}>
                                        {state.label}
                                    </p>

                                    <p className="mt-1 text-[11px] leading-4 text-slate-600 dark:text-slate-300">
                                        {state.description}
                                    </p>

                                    <p className="mt-3 text-[10px] text-slate-600 dark:text-slate-300">
                                        {state.from}
                                        {index === states.length - 1 && (
                                            <span className="text-slate-600 dark:text-slate-300"> → {state.to}</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-5 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2">
                    <p className="text-xs leading-5 text-slate-600 dark:text-slate-300 text-center">
                        O fluxo saiu de uma variação normal, entrou em atenção e permanece
                        em degradação sustentada há 4 dias.
                    </p>
                </div>
            </div>
        </div>
    );
}

function ReadingExample() {
    return (
        <GlowCard className="p-6 lg:p-8">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Exemplo de leitura Ohrly</p>
                </div>
                <Pill>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Diagnóstico gerado agora
                </Pill>
            </div>

            <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    Fluxo de pagamento <span className="text-red-400">- Degradação sustentada</span>
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    O fluxo de pagamento começou a perder consistência há 4 dias. O tempo de aprovação está 2,8x acima do esperado para Pix mobile em dias úteis. O comportamento ultrapassou o ciclo natural de recuperação e começou a se propagar para novos sinais do pagamento.
                </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {statusCards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40 p-4">
                            <div className="flex items-start gap-3">
                                <Icon
                                    className={cn(
                                        "mt-1 h-5 w-5",
                                        card.tone === "red" && "text-red-400",
                                        card.tone === "yellow" && "text-yellow-300",
                                        card.tone === "green" && "text-slate-900 dark:text-emerald-400",
                                        (!card.tone || card.tone === "cyan") && "text-cyan-600 dark:text-cyan-300",
                                    )}
                                />
                                <div>
                                    <p className="text-xs text-slate-800 dark:text-slate-400">{card.label}</p>
                                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">{card.value}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <MiniChart />
        </GlowCard>
    );
}

function SharedReadingSection() {
    const items = [
        { icon: Code2, title: "Engenharia vê retries." },
        { icon: BarChart3, title: "Produto vê queda de conversão." },
        { icon: Users, title: "Operações vê fila crescendo." },
        { icon: CircleDollarSign, title: "Negócio vê receita oscilando." },
    ];

    return (
        <GlowCard className="p-6 lg:p-8" >
            <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center" id="como-funciona">
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Você já tem dados. O que falta é uma leitura comum.</h2>
                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <p className="text-sm text-slate-800 dark:text-slate-200">{item.title}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    <div className="flex items-center gap-[10px]">
                        <Lightbulb />
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                            Esses sinais muitas vezes fazem parte do mesmo problema, mas aparecem separados. O Ohrly conecta esses sinais em uma resposta simples:
                        </p>
                    </div>
                    <div className="mt-4 rounded-2xl border border-cyan-300/25 bg-cyan-300/8 p-8 shadow-lg shadow-cyan-950/20">
                        <p className="text-4xl leading-none text-cyan-600 dark:text-cyan-300">“</p>
                        <p className="text-2xl font-semibold leading-snug text-slate-900 dark:text-slate-100">
                            Esse fluxo ainda está saudável ou começou a perder consistência?
                        </p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-10">
                <p className="text-sm text-slate-800 dark:text-slate-200">Você recebe</p>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    Uma leitura <span className="text-cyan-600 dark:text-cyan-300">comportamental</span> do seu fluxo
                </h2>
            </div>
            <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {readingItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <GlowCard key={item.title} className="p-5 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-300/8 text-cyan-600 dark:text-cyan-300">
                                <Icon className="h-24 w-24" />
                            </div>
                            <p className="mt-5 text-sm font-medium leading-5 text-slate-800 dark:text-slate-200">{item.title}</p>
                        </GlowCard>
                    );
                })}
            </div>
        </GlowCard>
    );
}

function DashboardComparison() {
    const traditionalSignals = [
        "Serviço disponível",
        "Erro dentro do limite",
        "Latência aceitável",
        "SLA não violado",
    ];

    const ohrlySignals = [
        "Retries aumentando",
        "Aprovação mais lenta",
        "Fallback crescendo",
        "Valor exposto subindo",
    ];

    return (
        <section className="py-6" id="not-dash">
            <GlowCard className="p-6 lg:p-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                        Não é mais um dashboard
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        O Ohrly olha para o fluxo, não só para o sistema
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-800 dark:text-slate-400">
                        O sistema pode continuar de pé, sem erro crítico e dentro do SLA.
                        Ainda assim, o comportamento do fluxo pode já ter começado a piorar.
                    </p>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/70 p-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-400">
                                <Gauge className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                    Ferramentas tradicionais
                                </p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    O sistema caiu?
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {traditionalSignals.map((signal) => (
                                <div
                                    key={signal}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40 px-4 py-3"
                                >
                                    <span className="text-sm text-slate-600 dark:text-slate-300">{signal}</span>
                                    <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                                        OK
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/40  p-4">
                            <p className="text-xs text-slate-500">Leitura gerada</p>
                            <p className="mt-2 text-lg font-semibold text-slate-600 dark:text-slate-300">
                                Nenhum incidente detectado.
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center lg:flex">
                        <div className="relative flex h-full min-h-80 items-center">
                            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent" />
                            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border dark:border-cyan-300/30 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-cyan-600 dark:text-cyan-300 shadow-lg shadow-cyan-950/40">
                                mas
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-cyan-300/25 bg-cyan-300/8 p-6 shadow-lg shadow-cyan-950/20">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                                <GitBranch className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-300/80">
                                    Ohrly
                                </p>
                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    O fluxo ainda funciona bem?
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {ohrlySignals.map((signal, index) => (
                                <div
                                    key={signal}
                                    className="flex items-center justify-between rounded-xl border border-cyan-700/10 dark:border-cyan-300/10 bg-slate-50 dark:bg-slate-950/50 px-4 py-3"
                                >
                                    <span className="text-sm text-slate-800 dark:text-slate-200">{signal}</span>

                                    <span
                                        className={
                                            index < 2
                                                ? "rounded-full border border-yellow-600 dark:border-yellow-300 bg-yellow-300/10 px-2 py-1 text-xs font-medium text-yellow-800 dark:text-yellow-200"
                                                : "rounded-full border border-red-600 dark:border-red-300 bg-red-400/10 px-2 py-1 text-xs font-medium text-red-800 dark:text-red-200"
                                        }
                                    >
                                        {index < 2 ? "atenção" : "degradando"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                            <p className="text-xs text-cyan-600 dark:text-cyan-300">Leitura gerada</p>
                            <p className="mt-2 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                O fluxo ainda está de pé, mas perdeu consistência há 4 dias.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-7 max-w-3xl rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/60 p-5 text-center">
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        A diferença não é ver mais gráficos. É entender quando um fluxo
                        continua funcionando, mas já começou a gerar mais espera, retries,
                        abandono, fallback, atendimento humano e retrabalho.
                    </p>
                </div>
            </GlowCard>
        </section>
    );
}

function HowItWorks() {
    return (
        <section className="pb-8">
            <div className="mt-6 grid gap-5 lg:grid-cols-3">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <GlowCard key={step.title} className="p-6">
                            <div className="flex items-start gap-5">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-300 text-sm font-bold text-slate-950">
                                    {index + 1}
                                </div>
                                <div>
                                    <div className="flex items-center gap-[10px]">
                                        <Icon className="h-12 w-12 text-cyan-500 dark:text-cyan-300" />
                                        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{step.title}</h2>
                                    </div>
                                    <p className="mt-3 text-lg leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
                                </div>
                            </div>
                        </GlowCard>
                    );
                })}
            </div>
        </section>
    );
}

function PersonasSection() {
    return (
        <section id="para-quem" className="py-12">
            <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">Para quem é</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {personas.map((persona) => {
                    const Icon = persona.icon;
                    return (
                        <GlowCard key={persona.title} className="p-5">
                            <div className="flex gap-4">
                                <Icon className="h-8 w-8 shrink-0 text-cyan-600 dark:text-cyan-300" />
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-slate-100">{persona.title}</h3>
                                    <p className="mt-2 text-xs leading-5 text-slate-800 dark:text-slate-200">{persona.description}</p>
                                </div>
                            </div>
                        </GlowCard>
                    );
                })}
            </div>
        </section>
    );
}

function CTA() {
    return (
        <GlowCard className="p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[180px_1fr_auto] lg:items-center" id="contato">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/8 lg:mx-0">
                    <div className="absolute h-24 w-24 rounded-full border border-cyan-300/20" />
                    <div className="absolute h-14 w-14 rounded-full border border-cyan-300/20" />
                    <div className="h-4 w-4 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/60" />
                </div>
                <div>
                    <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
                        Quer descobrir se um fluxo seu já começou a piorar?
                    </h2>
                    <p className="mt-4 text-base text-slate-800 dark:text-slate-400">Rode um piloto simples com 1 fluxo crítico.</p>
                </div>
                <div className="lg:min-w-72">
                    <PrimaryButton>Quero analisar um fluxo</PrimaryButton>
                    <p className="mt-5 flex items-center gap-2 text-xs text-slate-800 dark:text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        Você não precisa mudar sua arquitetura para começar.
                    </p>
                </div>
            </div>
        </GlowCard>
    );
}

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setIsVisible(window.scrollY > 500);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    return (
        <button
            type="button"
            aria-label="Voltar ao topo"
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1",
                "border-cyan-700/20 bg-white/90 text-cyan-700 shadow-slate-300/50 hover:border-cyan-700/40 hover:bg-cyan-50",
                "dark:border-cyan-300/25 dark:bg-slate-950/80 dark:text-cyan-600 dark:text-cyan-300 dark:shadow-cyan-950/40 dark:hover:border-cyan-300/50 dark:hover:bg-cyan-300/10",
                isVisible
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0",
            )}
        >
            <ChevronUp className="h-10 w-10" />
        </button>
    );
}

export default function OhrlyLandingPage() {
    return (
        <OhrlyPageShell>
            <div className="px-5 sm:px-8 lg:px-10">
                <section className="grid gap-10 pt-16 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-12">
                    <div>
                        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                            Descubra onde seus fluxos digitais pioram{" "}
                            <span className="text-cyan-600 dark:text-cyan-300">
                                antes do impacto se consolidar
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                            Analise checkout, pagamento, entrega, atendimento ou onboarding
                            e receba uma leitura clara sobre o que mudou, há quanto tempo
                            mudou e onde sua operação pode estar perdendo consistência.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <PrimaryButton>Quero analisar um fluxo</PrimaryButton>
                            <SecondaryButton>Ver demonstração</SecondaryButton>
                        </div>

                        <p className="mt-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                            Comece com 1 fluxo crítico. Não precisa de integração.
                        </p>
                    </div>

                    <ReadingExample />
                </section>

                <HowItWorks />
                <CompactReportExampleSection />
                <DashboardComparison />
                <SharedReadingSection />
                <PersonasSection />
                <CTA />
            </div>

            <ScrollToTopButton />
        </OhrlyPageShell>
    );
}