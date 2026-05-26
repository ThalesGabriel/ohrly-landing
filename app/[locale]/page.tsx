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
    LucideProps,
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

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { ForwardRefExoticComponent, RefAttributes, useEffect, useState } from "react";

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

function useHomeContent() {
    const t = useTranslations("home");

    const statusCards: StatusCard[] = [
        {
            icon: Gauge,
            label: t("statusCards.stateLabel"),
            value: t("statusCards.stateValue"),
            tone: "red",
        },
        {
            icon: Clock3,
            label: t("statusCards.persistenceLabel"),
            value: t("statusCards.persistenceValue"),
            tone: "cyan",
        },
        {
            icon: LineChart,
            label: t("statusCards.pressureLabel"),
            value: t("statusCards.pressureValue"),
            tone: "green",
        },
        {
            icon: MonitorSmartphone,
            label: t("statusCards.contextLabel"),
            value: t("statusCards.contextValue"),
            tone: "cyan",
        },
        {
            icon: GitBranch,
            label: t("statusCards.secondarySignalLabel"),
            value: t("statusCards.secondarySignalValue"),
            tone: "yellow",
        },
        {
            icon: CircleDollarSign,
            label: t("statusCards.exposedValueLabel"),
            value: t("statusCards.exposedValueValue"),
            tone: "green",
        },
    ];

    const readingItems: ReadingItem[] = [
        { icon: Search, title: t("readingItems.whatChanged") },
        { icon: Clock3, title: t("readingItems.howLong") },
        { icon: Target, title: t("readingItems.where") },
        { icon: Zap, title: t("readingItems.noiseOrDegradation") },
        { icon: ShieldCheck, title: t("readingItems.exposure") },
        { icon: Hourglass, title: t("readingItems.waitingCost") },
    ];

    const personas = [
        {
            icon: ShoppingCart,
            title: t("personas.ecommerceTitle"),
            description: t("personas.ecommerceDescription"),
        },
        {
            icon: Boxes,
            title: t("personas.productTitle"),
            description: t("personas.productDescription"),
        },
        {
            icon: Code2,
            title: t("personas.engineeringTitle"),
            description: t("personas.engineeringDescription"),
        },
        {
            icon: Gauge,
            title: t("personas.operationsTitle"),
            description: t("personas.operationsDescription"),
        },
    ];

    const steps = [
        {
            title: t("howItWorks.step1Title"),
            description: t("howItWorks.step1Description"),
            icon: PackageCheck,
        },
        {
            title: t("howItWorks.step2Title"),
            description: t("howItWorks.step2Description"),
            icon: BarChart3,
        },
        {
            title: t("howItWorks.step3Title"),
            description: t("howItWorks.step3Description"),
            icon: LineChart,
        },
    ];

    return {
        statusCards,
        readingItems,
        personas,
        steps,
    };
}

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
        <Link
            href="/demo"
            className="group inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
        >
            {children}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
    );
}

function SecondaryButton({ children }: { children: React.ReactNode }) {
    return (
        <Link
            href="/demo"
            className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-6 text-sm font-semibold text-slate-600 transition hover:border-cyan-500/40 hover:bg-cyan-50 hover:text-cyan-700 dark:border-slate-700/80 dark:bg-slate-950/40 dark:text-cyan-300 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5 dark:hover:text-cyan-300"
        >
            <PlayCircle className="h-5 w-5 text-cyan-500 dark:text-cyan-300" />
            {children}
        </Link>
    );
}

function CompactReportExampleSection() {
    const t = useTranslations("home.compactReport");

    const inputStats = [
        {
            label: t("inputStats.availableEvents.label"),
            value: t("inputStats.availableEvents.value"),
            description: t("inputStats.availableEvents.description"),
        },
        {
            label: t("inputStats.fileColumns.label"),
            value: t("inputStats.fileColumns.value"),
            description: t("inputStats.fileColumns.description"),
        },
        {
            label: t("inputStats.mappedFields.label"),
            value: t("inputStats.mappedFields.value"),
            description: t("inputStats.mappedFields.description"),
        },
        {
            label: t("inputStats.analyzedPeriod.label"),
            value: t("inputStats.analyzedPeriod.value"),
            description: t("inputStats.analyzedPeriod.description"),
        },
    ];

    const configStats = [
        {
            label: t("configStats.contexts.label"),
            value: t("configStats.contexts.value"),
            description: t("configStats.contexts.description"),
        },
        {
            label: t("configStats.configuredMetrics.label"),
            value: t("configStats.configuredMetrics.value"),
            description: t("configStats.configuredMetrics.description"),
        },
        {
            label: t("configStats.baseline.label"),
            value: t("configStats.baseline.value"),
            description: t("configStats.baseline.description"),
        },
        {
            label: t("configStats.minimumVolume.label"),
            value: t("configStats.minimumVolume.value"),
            description: t("configStats.minimumVolume.description"),
        },
    ];

    const outputStats = [
        {
            label: t("outputStats.detectedEpisodes.label"),
            value: t("outputStats.detectedEpisodes.value"),
            description: t("outputStats.detectedEpisodes.description"),
        },
        {
            label: t("outputStats.highPressure.label"),
            value: t("outputStats.highPressure.value"),
            description: t("outputStats.highPressure.description"),
        },
        {
            label: t("outputStats.degradedEvents.label"),
            value: t("outputStats.degradedEvents.value"),
            description: t("outputStats.degradedEvents.description"),
        },
        {
            label: t("outputStats.highPressureEvents.label"),
            value: t("outputStats.highPressureEvents.value"),
            description: t("outputStats.highPressureEvents.description"),
        },
    ];

    const actionItems = [
        {
            priority: t("priorities.high"),
            priorityLevel: "high",
            title: t("actions.compareOperationalChanges.title"),
            description: t("actions.compareOperationalChanges.description"),
        },
        {
            priority: t("priorities.high"),
            priorityLevel: "high",
            title: t("actions.investigateMetricPropagation.title"),
            description: t("actions.investigateMetricPropagation.description"),
        },
        {
            priority: t("priorities.medium"),
            priorityLevel: "medium",
            title: t("actions.prioritizeHighConfidenceSignals.title"),
            description: t("actions.prioritizeHighConfidenceSignals.description"),
        },
        {
            priority: t("priorities.medium"),
            priorityLevel: "medium",
            title: t("actions.trackRecurrence.title"),
            description: t("actions.trackRecurrence.description"),
        },
    ];

    return (
        <section className="py-6">
            <GlowCard className="p-6 lg:p-8">
                <div>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-800 dark:text-slate-400">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-5 grid gap-8 lg:grid-cols-3 lg:items-start">
                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                        <div>
                            <div className="flex flex-1 items-center justify-between">
                                <div>
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                        {t("inputSubtitle")}
                                    </p>
                                </div>

                                <div>
                                    <span className="rounded-full border border-slate-700 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-900 dark:text-slate-300">
                                        CSV
                                    </span>
                                </div>
                            </div>

                            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                {t("inputTitle")}
                            </h3>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                            {inputStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-900/40"
                                >
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                        {item.label}
                                    </p>

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

                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                        <div>
                            <div className="flex flex-1 items-center justify-between">
                                <div>
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                        {t("configSubtitle")}
                                    </p>
                                </div>

                                <div>
                                    <span className="rounded-full border border-cyan-700 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-600 dark:text-cyan-300">
                                        boleto_retention_flow
                                    </span>
                                </div>
                            </div>

                            <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                {t("configTitle")}
                            </h3>
                        </div>

                        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                            {configStats.map((item) => (
                                <div
                                    key={item.label}
                                    className="rounded-xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-900/40"
                                >
                                    <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                        {item.label}
                                    </p>

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
                        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                            <div>
                                <div className="flex flex-1 items-center justify-between">
                                    <div>
                                        <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                            {t("outputSubtitle")}
                                        </p>
                                    </div>

                                    <div>
                                        <span className="rounded-full border border-emerald-700 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                                            {t("highConfidence")}
                                        </span>
                                    </div>
                                </div>

                                <h3 className="mt-3 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    {t("outputTitle")}
                                </h3>
                            </div>

                            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                                {outputStats.map((item) => (
                                    <div
                                        key={item.label}
                                        className="rounded-xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-900/40"
                                    >
                                        <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                            {item.label}
                                        </p>

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

                <div className="mt-5 grid gap-8 lg:grid-cols-2 lg:items-start">
                    <div className="rounded-2xl border border-violet-300/20 bg-violet-300/10 p-5">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <p className="text-xs text-violet-800 dark:text-violet-200">
                                    {t("actionsSubtitle")}
                                </p>

                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    {t("actionsTitle")}
                                </h3>
                            </div>

                            <span className="rounded-full border border-violet-700 bg-violet-300/10 px-3 py-1 text-xs font-medium text-violet-800 dark:text-violet-200">
                                {t("investigationPlan")}
                            </span>
                        </div>

                        <div className="mt-5 grid gap-3 lg:grid-cols-2">
                            {actionItems.map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-xl border border-violet-300 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                                            {item.title}
                                        </p>

                                        <span
                                            className={
                                                item.priorityLevel === "high"
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

                        <div className="mt-5 rounded-xl border border-violet-300 bg-slate-50/60 p-4 dark:bg-slate-950/60">
                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {t("ohrlyRole")}
                            </p>
                        </div>
                    </div>

                    <div className="flex h-[100%] flex-col justify-between">
                        <div className="grid gap-4 lg:grid-cols-2">
                            <div className="rounded-2xl border border-yellow-400 bg-yellow-300/10 p-5 dark:border-yellow-300/20">
                                <p className="text-xs text-yellow-800 dark:text-yellow-200">
                                    {t("mainEpisode.title")}
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                    retention_rate · {t("mainEpisode.days")}
                                </p>

                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                     {t("mainEpisode.description")}
                                </p>
                            </div>

                            <div className="rounded-2xl border border-cyan-400 bg-cyan-300/10 p-5 dark:border-cyan-300/20">
                                <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                    {t("finalReading")}
                                </p>

                                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                                    {t("waitingIsNotNeutral")}
                                </p>

                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                                    {t("finalReadingDescription")}
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl border border-cyan-400 bg-cyan-300/5 p-5 dark:border-cyan-300/20">
                            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                                {t("whatItMeans")}
                            </p>

                            <p className="mt-3 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                {t("meaningTitle")}
                            </p>

                            <p className="mt-4 text-sm leading-6 text-slate-800 dark:text-slate-400">
                                {t("meaningDescription")}
                            </p>
                        </div>
                    </div>
                </div>
            </GlowCard>
        </section>
    );
}

function MiniChart() {
    const t = useTranslations("home.readingExample");

    const states = [
        {
            label: t("healthy"),
            from: t("sevenDaysAgo"),
            to: t("fiveDaysAgo"),
            width: "34%",
            dot: "bg-emerald-400",
            line: "from-emerald-400/70 to-emerald-400/20",
            text: "text-emerald-600 dark:text-emerald-300",
            description: t("healthyDescription"),
        },
        {
            label: t("attention"),
            from: t("fiveDaysAgo"),
            to: t("threeDaysAgo"),
            width: "28%",
            dot: "bg-yellow-300",
            line: "from-yellow-300/70 to-yellow-300/20",
            text: "text-yellow-600 dark:text-yellow-300",
            description: t("attentionDescription"),
        },
        {
            label: t("degradation"),
            from: t("threeDaysAgo"),
            to: t("today"),
            width: "38%",
            dot: "bg-red-400",
            line: "from-red-400/80 to-red-400/25",
            text: "text-red-600 dark:text-red-300",
            description: t("degradationDescription"),
        },
    ];

    return (
        <div className="mt-6">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
                <span>{t("evolution")}</span>

                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                        <i className="h-2 w-2 rounded-full bg-emerald-400" />
                        {t("healthy")}
                    </span>

                    <span className="flex items-center gap-2">
                        <i className="h-2 w-2 rounded-full bg-yellow-300" />
                        {t("attention")}
                    </span>

                    <span className="flex items-center gap-2">
                        <i className="h-2 w-2 rounded-full bg-red-400" />
                        {t("degradation")}
                    </span>
                </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800/80 dark:bg-slate-950/70">
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
                                        className={`z-10 h-4 w-4 rounded-full border-2 border-slate-100 shadow-lg dark:border-slate-950 ${state.dot}`}
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
                                            <span className="text-slate-600 dark:text-slate-300">
                                                {" "}
                                                → {state.to}
                                            </span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-5 rounded-lg border border-red-400/20 bg-red-400/10 px-3 py-2">
                    <p className="text-center text-xs leading-5 text-slate-600 dark:text-slate-300">
                        {t("timelineNote")}
                    </p>
                </div>
            </div>
        </div>
    );
}

function ReadingExample({ statusCards }: { statusCards: StatusCard[] }) {
    const t = useTranslations("home.readingExample");

    return (
        <GlowCard className="p-6 lg:p-8">
            <div className="mb-5 flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />

                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {t("badge")}
                    </p>
                </div>

                <Pill>
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    {t("generated")}
                </Pill>
            </div>

            <div>
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {t("title")}{" "}
                    <span className="text-red-400">- {t("state")}</span>
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t("description")}
                </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {statusCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="rounded-xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-900/40"
                        >
                            <div className="flex items-start gap-3">
                                <Icon
                                    className={cn(
                                        "mt-1 h-5 w-5",
                                        card.tone === "red" && "text-red-400",
                                        card.tone === "yellow" && "text-yellow-300",
                                        card.tone === "green" && "text-slate-900 dark:text-emerald-400",
                                        (!card.tone || card.tone === "cyan") &&
                                        "text-cyan-600 dark:text-cyan-300",
                                    )}
                                />

                                <div>
                                    <p className="text-xs text-slate-800 dark:text-slate-400">
                                        {card.label}
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                                        {card.value}
                                    </p>
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

function SharedReadingSection({ readingItems }: { readingItems: ReadingItem[] }) {
    const t = useTranslations("home.sharedReading");

    const items = [
        { icon: Code2, title: t("engineering") },
        { icon: BarChart3, title: t("product") },
        { icon: Users, title: t("operations") },
        { icon: CircleDollarSign, title: t("business") },
    ];

    return (
        <GlowCard className="p-6 lg:p-8">
            <div
                className="grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:items-center"
                id="como-funciona"
            >
                <div>
                    <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                        {t("title")}
                    </h2>

                    <div className="mt-8 grid gap-4 sm:grid-cols-2">
                        {items.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.title} className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <p className="text-sm text-slate-800 dark:text-slate-200">
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-[10px]">
                        <Lightbulb className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-300" />

                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {t("description")}
                        </p>
                    </div>

                    <div className="mt-4 rounded-2xl border border-cyan-300/25 bg-cyan-300/8 p-8 shadow-lg shadow-cyan-950/20">
                        <p className="text-4xl leading-none text-cyan-600 dark:text-cyan-300">
                            “
                        </p>

                        <p className="text-2xl font-semibold leading-snug text-slate-900 dark:text-slate-100">
                            {t("question")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center">
                <p className="text-sm text-slate-800 dark:text-slate-200">
                    {t("youReceive")}
                </p>

                <h2 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {t("readingTitleStart")}{" "}
                    <span className="text-cyan-600 dark:text-cyan-300">
                        {t("readingTitleHighlight")}
                    </span>{" "}
                    {t("readingTitleEnd")}
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

                            <p className="mt-5 text-sm font-medium leading-5 text-slate-800 dark:text-slate-200">
                                {item.title}
                            </p>
                        </GlowCard>
                    );
                })}
            </div>
        </GlowCard>
    );
}

function DashboardComparison() {
    const t = useTranslations("home.dashboardComparison");

    const traditionalSignals = [
        t("traditionalSignals.serviceAvailable"),
        t("traditionalSignals.errorWithinLimit"),
        t("traditionalSignals.latencyAcceptable"),
        t("traditionalSignals.slaNotViolated"),
    ];

    const ohrlySignals = [
        t("ohrlySignals.retriesIncreasing"),
        t("ohrlySignals.approvalSlower"),
        t("ohrlySignals.fallbackGrowing"),
        t("ohrlySignals.exposedValueGrowing"),
    ];

    return (
        <section className="py-6" id="not-dash">
            <GlowCard className="p-6 lg:p-8">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-800 dark:text-slate-400">
                        {t("description")}
                    </p>
                </div>

                <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
                    <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 dark:border-slate-800 dark:bg-slate-950/70">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-200/80 text-slate-800 dark:bg-slate-800/80 dark:text-slate-400">
                                <Gauge className="h-5 w-5" />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                                    {t("traditional")}
                                </p>

                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    {t("traditionalQuestion")}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {traditionalSignals.map((signal) => (
                                <div
                                    key={signal}
                                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/40"
                                >
                                    <span className="text-sm text-slate-600 dark:text-slate-300">
                                        {signal}
                                    </span>

                                    <span className="rounded-full bg-emerald-400/10 px-2 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-300">
                                        {t("statuses.ok")}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-100/80 p-4 dark:border-slate-800 dark:bg-slate-900/40">
                            <p className="text-xs text-slate-500">
                                {t("generatedReading")}
                            </p>

                            <p className="mt-2 text-lg font-semibold text-slate-600 dark:text-slate-300">
                                {t("noIncident")}
                            </p>
                        </div>
                    </div>

                    <div className="hidden items-center lg:flex">
                        <div className="relative flex h-full min-h-80 items-center">
                            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/30 to-transparent" />

                            <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-slate-50 text-xs font-semibold text-cyan-600 shadow-lg shadow-cyan-950/40 dark:border-cyan-300/30 dark:bg-slate-950 dark:text-cyan-300">
                                {t("connector")}
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
                                    {t("ohrly")}
                                </p>

                                <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                                    {t("ohrlyQuestion")}
                                </h3>
                            </div>
                        </div>

                        <div className="mt-6 space-y-3">
                            {ohrlySignals.map((signal, index) => {
                                const isAttention = index < 2;

                                return (
                                    <div
                                        key={signal}
                                        className="flex items-center justify-between rounded-xl border border-cyan-700/10 bg-slate-50 px-4 py-3 dark:border-cyan-300/10 dark:bg-slate-950/50"
                                    >
                                        <span className="text-sm text-slate-800 dark:text-slate-200">
                                            {signal}
                                        </span>

                                        <span
                                            className={
                                                isAttention
                                                    ? "rounded-full border border-yellow-600 bg-yellow-300/10 px-2 py-1 text-xs font-medium text-yellow-800 dark:border-yellow-300 dark:text-yellow-200"
                                                    : "rounded-full border border-red-600 bg-red-400/10 px-2 py-1 text-xs font-medium text-red-800 dark:border-red-300 dark:text-red-200"
                                            }
                                        >
                                            {isAttention
                                                ? t("statuses.attention")
                                                : t("statuses.degrading")}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-6 rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                            <p className="text-xs text-cyan-600 dark:text-cyan-300">
                                {t("generatedReading")}
                            </p>

                            <p className="mt-2 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-100">
                                {t("flowDegraded")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-7 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50/60 p-5 text-center dark:border-slate-800 dark:bg-slate-950/60">
                    <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {t("bottomDescription")}
                    </p>
                </div>
            </GlowCard>
        </section>
    );
}

function HowItWorks({ steps }: {
    steps: {
        title: string;
        description: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }[]
}) {
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

function PersonasSection({ personas }: {
    personas: {
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
        title: string;
        description: string;
    }[]
}) {
    const t = useTranslations("home.personas");

    return (
        <section id="para-quem" className="py-12">
            <h2 className="text-center text-2xl font-semibold text-slate-900 dark:text-slate-100">{t("title")}</h2>
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
    const t = useTranslations("home.cta");

    return (
        <GlowCard className="p-8 lg:p-10">
            <div
                className="grid gap-8 lg:grid-cols-[180px_1fr_auto] lg:items-center"
                id="contato"
            >
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center rounded-full border border-cyan-300/20 bg-cyan-300/8 lg:mx-0">
                    <div className="absolute h-24 w-24 rounded-full border border-cyan-300/20" />
                    <div className="absolute h-14 w-14 rounded-full border border-cyan-300/20" />
                    <div className="h-4 w-4 rounded-full bg-cyan-300 shadow-lg shadow-cyan-300/60" />
                </div>

                <div>
                    <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 lg:text-4xl">
                        {t("title")}
                    </h2>

                    <p className="mt-4 text-base text-slate-800 dark:text-slate-400">
                        {t("description")}
                    </p>
                </div>

                <div className="lg:min-w-72">
                    <PrimaryButton>{t("button")}</PrimaryButton>

                    <p className="mt-5 flex items-center gap-2 text-xs text-slate-800 dark:text-slate-400">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        {t("note")}
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
    const t = useTranslations("home");
    const { statusCards, readingItems, personas, steps } = useHomeContent();

    return (
        <OhrlyPageShell>
            <div className="px-5 sm:px-8 lg:px-10">
                <section className="grid gap-10 pt-16 pb-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:pt-12">
                    <div>
                        <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl dark:text-white">
                            {t("hero.titleStart")}{" "}
                            <span className="text-cyan-600 dark:text-cyan-300">
                                {t("hero.titleHighlight")}
                            </span>
                        </h1>

                        <p className="mt-8 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                            {t("hero.description")}
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <PrimaryButton>{t("hero.primaryCta")}</PrimaryButton>
                            <SecondaryButton>{t("hero.secondaryCta")}</SecondaryButton>
                        </div>

                        <p className="mt-8 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <ShieldCheck className="h-4 w-4 text-emerald-500 dark:text-emerald-400" />
                            {t("hero.note")}
                        </p>
                    </div>

                    <ReadingExample statusCards={statusCards} />
                </section>

                <HowItWorks steps={steps} />
                <CompactReportExampleSection />
                <DashboardComparison />
                <SharedReadingSection readingItems={readingItems} />
                <PersonasSection personas={personas} />
                <CTA />
            </div>

            <ScrollToTopButton />
        </OhrlyPageShell>
    );
}