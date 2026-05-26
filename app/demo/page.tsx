"use client";

import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    CircleDollarSign,
    Clock3,
    FileText,
    GitBranch,
    Gauge,
    Lightbulb,
    LineChart,
    MonitorSmartphone,
    Search,
    ShieldAlert,
    ShieldCheck,
    Sparkles,
    Target,
    TriangleAlert,
} from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
                "relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-950/70 shadow-2xl shadow-cyan-950/20 backdrop-blur",
                "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%)]",
                className,
            )}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function MetricCard({
    icon: Icon,
    label,
    value,
    tone = "cyan",
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    tone?: "cyan" | "red" | "green" | "purple";
}) {
    return (
        <GlowCard className="p-5">
            <div className="flex items-center gap-4">
                <div
                    className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                        tone === "cyan" && "bg-cyan-300/10 text-cyan-300",
                        tone === "red" && "bg-red-400/10 text-red-300",
                        tone === "green" && "bg-emerald-400/10 text-emerald-300",
                        tone === "purple" && "bg-violet-400/10 text-violet-300",
                    )}
                >
                    <Icon className="h-6 w-6" />
                </div>

                <div>
                    <p className="text-3xl font-semibold tracking-tight text-slate-100">
                        {value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-slate-400">{label}</p>
                </div>
            </div>
        </GlowCard>
    );
}

function SummaryReading() {
    const tags = [
        {
            icon: TriangleAlert,
            text: "Pressão alta",
            className: "border-red-400/20 bg-red-400/10 text-red-300",
        },
        {
            icon: ShieldCheck,
            text: "Confiança alta · 82%",
            className: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
        },
        {
            icon: Clock3,
            text: "Persistência · 4 dias",
            className: "border-violet-400/20 bg-violet-400/10 text-violet-300",
        },
        {
            icon: GitBranch,
            text: "Propagação detectada",
            className: "border-cyan-300/20 bg-cyan-300/10 text-cyan-300",
        },
    ];

    return (
        <GlowCard className="p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    <Sparkles className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-100">
                    Resumo da leitura
                </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 lg:p-8">
                <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:items-center">
                    <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-red-400/10 bg-red-400/10 text-red-300 shadow-2xl shadow-red-950/20">
                        <ShieldAlert className="h-20 w-20" />
                    </div>

                    <div>
                        <div className="inline-flex rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-2 text-sm font-semibold text-red-300">
                            Degradação sustentada detectada
                        </div>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
                            O fluxo de pagamento continuou funcionando, mas perdeu
                            consistência operacional no período analisado. A degradação se
                            concentrou em <span className="text-cyan-300">Pix + Mobile</span>,
                            persistiu por <span className="text-cyan-300">4 dias</span> e
                            começou a se propagar para sinais secundários como retries.
                        </p>

                        <div className="mt-6 rounded-xl border border-red-400/20 bg-red-400/10 px-5 py-4">
                            <div className="flex gap-3">
                                <Lightbulb className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                                <p className="text-sm leading-6 text-red-100">
                                    Em termos práticos: esperar deixou de ser uma decisão
                                    neutra.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {tags.map((tag) => {
                        const Icon = tag.icon;

                        return (
                            <div
                                key={tag.text}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium",
                                    tag.className,
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {tag.text}
                            </div>
                        );
                    })}
                </div>
            </div>
        </GlowCard>
    );
}

function TimelineCard() {
    return (
        <GlowCard className="p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                    <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                    O que aconteceu
                </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-300">
                <p>
                    <span className="font-semibold text-slate-100">
                        Episódio principal:
                    </span>{" "}
                    11/05/2026 - 14/05/2026
                </p>

                <p>
                    <span className="font-semibold text-slate-100">Duração:</span>{" "}
                    4 dias
                </p>

                <p>
                    58% da pressão operacional ocorreu depois da janela natural de
                    recuperação.
                </p>
            </div>

            <div className="mt-8">
                <div className="flex h-3 overflow-hidden rounded-full bg-slate-800">
                    <div className="w-[42%] bg-emerald-400" />
                    <div className="w-[58%] bg-red-400" />
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-center text-sm">
                    <div>
                        <p className="font-medium text-emerald-300">Janela de decisão</p>
                        <p className="mt-1 text-slate-400">2 dias · 42%</p>
                    </div>

                    <div>
                        <p className="font-medium text-red-300">Após a janela</p>
                        <p className="mt-1 text-slate-400">2,8 dias · 58%</p>
                    </div>
                </div>
            </div>
        </GlowCard>
    );
}

function InvestigationCard() {
    const items = [
        "Pedidos com atraso de aprovação em Pix + Mobile",
        "Casos em que retries cresceram após o desvio",
        "Horários com maior concentração de pressão",
        "Próximo ciclo para confirmar recorrência comportamental",
    ];

    return (
        <GlowCard className="p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    <Search className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-100">
                    O que investigar primeiro
                </h3>
            </div>

            <div className="divide-y divide-slate-800">
                {items.map((item) => (
                    <div key={item} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />
                        <p className="text-sm leading-6 text-slate-300">{item}</p>
                    </div>
                ))}
            </div>
        </GlowCard>
    );
}

function EvidenceSection() {
    const evidence = [
        {
            icon: ShieldCheck,
            title: "Confiança da leitura",
            value: "Alta · 82%",
            description: "Baseada em persistência, magnitude e contexto afetado.",
            tone: "green",
        },
        {
            icon: Clock3,
            title: "Sinal dominante",
            value: "Tempo de aprovação",
            description: "Foi a métrica que mais explicou a degradação.",
            tone: "purple",
        },
        {
            icon: GitBranch,
            title: "Propagação",
            value: "Não ficou isolada",
            description: "Retries começaram a subir no mesmo período.",
            tone: "cyan",
        },
    ];

    return (
        <section>
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    <BarChart3 className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-100">
                    Evidências da leitura
                </h2>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
                {evidence.map((item) => {
                    const Icon = item.icon;

                    return (
                        <GlowCard key={item.title} className="p-5">
                            <div className="flex gap-4">
                                <div
                                    className={cn(
                                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                                        item.tone === "green" &&
                                        "bg-emerald-400/10 text-emerald-300",
                                        item.tone === "purple" &&
                                        "bg-violet-400/10 text-violet-300",
                                        item.tone === "cyan" &&
                                        "bg-cyan-300/10 text-cyan-300",
                                    )}
                                >
                                    <Icon className="h-6 w-6" />
                                </div>

                                <div>
                                    <p className="text-sm text-slate-400">{item.title}</p>
                                    <p className="mt-1 font-semibold text-slate-100">
                                        {item.value}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        {item.description}
                                    </p>
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
        <GlowCard className="p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                    <p className="text-sm font-medium text-cyan-300">
                        Como ficaria com o seu fluxo?
                    </p>
                    <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-slate-100">
                        Rode um piloto simples com 1 fluxo crítico.
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
                        A partir de dados históricos, o Ohrly gera uma leitura indicando
                        estado atual, persistência, pressão de recuperação, contexto
                        afetado e valor operacional exposto.
                    </p>
                </div>

                <Link
                    href="/contact"
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                    Quero analisar um fluxo
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
            </div>
        </GlowCard>
    );
}

export default function DemonstracaoPage() {
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#020b12] text-slate-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.10),transparent_28%),linear-gradient(180deg,#020b12_0%,#020812_55%,#020b12_100%)]" />
            <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:44px_44px]" />

            <div className="relative mx-auto py-6">
                <div className="px-5 sm:px-8 lg:px-10">
                    <Header />
                </div>

                <section className="mx-auto px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                    <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                        <div>
                            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 text-xs text-slate-300">
                                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                                Demonstração de leitura Ohrly
                            </p>

                            <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
                                Leitura do fluxo de pagamento
                            </h1>

                            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">
                                O fluxo continuou funcionando, mas perdeu consistência
                                operacional no período analisado.
                            </p>
                        </div>

                        <div className="grid gap-3 text-sm text-slate-400 sm:grid-cols-2 lg:min-w-[460px]">
                            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                                <CalendarDays className="h-5 w-5 text-cyan-300" />
                                11/05/2026 - 14/05/2026
                            </div>

                            <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
                                <FileText className="h-5 w-5 text-cyan-300" />
                                Contrato v3 · ativo
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <SummaryReading />
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <MetricCard
                            icon={Gauge}
                            value="59"
                            label="episódios analisados"
                            tone="purple"
                        />
                        <MetricCard
                            icon={TriangleAlert}
                            value="6"
                            label="episódios críticos"
                            tone="red"
                        />
                        <MetricCard
                            icon={GitBranch}
                            value="29"
                            label="com propagação"
                            tone="cyan"
                        />
                        <MetricCard
                            icon={CircleDollarSign}
                            value="R$ 184 mil"
                            label="em valor exposto"
                            tone="green"
                        />
                    </div>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                        <TimelineCard />
                        <InvestigationCard />
                    </div>

                    <div className="mt-8">
                        <EvidenceSection />
                    </div>

                    <div className="mt-8">
                        <CTA />
                    </div>
                </section>

                <Footer />
            </div>
        </main>
    );
}