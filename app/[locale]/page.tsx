"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    ArrowRight,
    BarChart3,
    Bot,
    CheckCircle2,
    CreditCard,
    HelpCircle,
    Lock,
    PackageCheck,
    ShoppingCart,
    Sparkles,
    Truck,
    WalletCards,
} from "lucide-react";

import { PageShell } from "@/components/layout/PageShell";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

const examples = [
    {
        id: "checkout-aprovacao-lenta",
        translationKey: "checkoutSlowApproval",
        rpi: 58,
        icon: ShoppingCart,
        className:
            "text-blue-600 bg-blue-50 dark:bg-blue-400/10 dark:text-blue-300",
    },
    {
        id: "bot-handoff-crescente",
        translationKey: "botHandoffGrowth",
        rpi: 61,
        icon: Bot,
        className:
            "text-emerald-600 bg-emerald-50 dark:bg-emerald-400/10 dark:text-emerald-300",
    },
    {
        id: "entrega-recuperacao-lenta",
        translationKey: "deliverySlowRecovery",
        rpi: 74,
        icon: PackageCheck,
        className:
            "text-orange-600 bg-orange-50 dark:bg-orange-400/10 dark:text-orange-300",
    },
    {
        id: "billing-falhas-recorrentes",
        translationKey: "billingRecurringFailures",
        rpi: 54,
        icon: WalletCards,
        className:
            "text-violet-600 bg-violet-50 dark:bg-violet-400/10 dark:text-violet-300",
    },
] as const;

const audienceItems = [
    {
        labelKey: "checkout",
        icon: ShoppingCart,
        className:
            "text-blue-600 bg-blue-50 dark:bg-blue-400/10 dark:text-blue-300",
    },
    {
        labelKey: "payment",
        icon: CreditCard,
        className:
            "text-emerald-600 bg-emerald-50 dark:bg-emerald-400/10 dark:text-emerald-300",
    },
    {
        labelKey: "support",
        icon: Bot,
        className:
            "text-violet-600 bg-violet-50 dark:bg-violet-400/10 dark:text-violet-300",
    },
    {
        labelKey: "delivery",
        icon: Truck,
        className:
            "text-orange-600 bg-orange-50 dark:bg-orange-400/10 dark:text-orange-300",
    },
] as const;

export default function HomePage() {
    const t = useTranslations("home");

    return (
        <PageShell>
            <div className="mx-auto max-w-7xl">
                <section className="relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.18]">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.06)_1px,transparent_1px)] bg-[size:36px_36px] dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)]" />
                    </div>

                    <div className="pointer-events-none absolute right-0 top-12 h-96 w-96 rounded-full bg-cyan-300/10 blur-3xl" />

                    <div className="relative mx-auto grid gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_420px] lg:px-10 lg:py-24">
                        <div className="max-w-4xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-700/15 bg-white/70 px-3 py-1 text-xs text-slate-600 shadow-sm backdrop-blur dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-slate-300">
                                <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                                {t("hero.badge")}
                            </div>

                            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 dark:text-white lg:text-6xl">
                                {t("hero.title")}
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                {t("hero.description")}
                            </p>

                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 dark:text-slate-400">
                                {t("hero.supportingText")}
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Link
                                    href="/#exemplos"
                                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500"
                                >
                                    {t("hero.cta")}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="mt-5 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                                <Lock className="h-4 w-4 text-slate-400 dark:text-slate-600" />
                                {t("hero.securityNote")}
                            </div>
                        </div>

                        <div className="lg:pt-8">
                            <div className="rounded-3xl border border-slate-200 bg-white/85 p-7 shadow-2xl shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
                                <div className="flex items-center gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-400/10 dark:text-orange-300">
                                        <Sparkles className="h-5 w-5" />
                                    </div>
                                    <p className="font-semibold text-slate-950 dark:text-white">
                                        {t("hero.previewState")}
                                    </p>
                                </div>

                                <div className="pt-6">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
                                        {t("hero.previewRpiLabel")}
                                    </p>

                                    <div className="mt-2 flex items-end gap-2">
                                        <span className="text-6xl font-semibold tracking-tight text-orange-600 dark:text-orange-300">
                                            58
                                        </span>
                                        <span className="pb-2 text-2xl text-slate-400 dark:text-slate-600">
                                            /100
                                        </span>
                                    </div>

                                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                                        <div className="h-full w-[58%] rounded-full bg-orange-500 dark:bg-orange-300" />
                                    </div>

                                    <div className="mt-8">
                                        <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
                                            {t("hero.previewContextLabel")}
                                        </p>

                                        <div className="mt-2 flex items-center justify-between gap-3">
                                            <p className="text-xl font-semibold text-slate-950 dark:text-white">
                                                {t("hero.previewContext")}
                                            </p>

                                            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-slate-500 dark:bg-slate-900 dark:text-slate-400">
                                                <CreditCard className="h-4 w-4" />
                                                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white/60 px-5 py-8 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40 sm:px-8 lg:px-10">
                    <div className="mx-auto text-center">
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            {t("audience.title")}
                        </h2>

                        <div className="mt-5 grid gap-4 md:grid-cols-4">
                            {audienceItems.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.labelKey}
                                        className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            <div
                                                className={cn(
                                                    "flex h-10 w-10 items-center justify-center rounded-xl",
                                                    item.className,
                                                )}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <p className="font-semibold text-slate-950 dark:text-white">
                                                {t(`audience.items.${item.labelKey}`)}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {t("audience.description")}
                        </p>
                    </div>
                </section>

                <ExamplesExplorer />

                <section className="mx-auto px-5 pb-20 sm:px-8 lg:px-10">
                    <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10 lg:p-8">
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.12),transparent_34%)]" />

                        <div className="relative mx-auto max-w-3xl text-center">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-700/15 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700 dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-cyan-300">
                                <Sparkles className="h-3.5 w-3.5" />
                                {t("comparison.badge")}
                            </div>

                            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                {t("comparison.title")}
                            </h2>

                            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {t("comparison.description")}
                            </p>
                        </div>

                        <div className="relative mt-8 grid gap-4 lg:grid-cols-3 lg:items-stretch">
                            <ComparisonPillar
                                icon={BarChart3}
                                eyebrow={t("comparison.apm.eyebrow")}
                                title={t("comparison.apm.title")}
                                description={t("comparison.apm.description")}
                                className="text-blue-600 bg-blue-50 dark:bg-blue-400/10 dark:text-blue-300"
                            />

                            <ComparisonPillar
                                icon={CheckCircle2}
                                eyebrow={t("comparison.bi.eyebrow")}
                                title={t("comparison.bi.title")}
                                description={t("comparison.bi.description")}
                                className="text-emerald-600 bg-emerald-50 dark:bg-emerald-400/10 dark:text-emerald-300"
                            />

                            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/40 bg-cyan-50/80 p-5 shadow-lg shadow-cyan-500/10 dark:border-cyan-300/30 dark:bg-cyan-300/10">
                                <div className="absolute right-[-40px] top-[-40px] h-32 w-32 rounded-full bg-cyan-300/20 blur-2xl" />

                                <div className="relative">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20">
                                        <Sparkles className="h-6 w-6" />
                                    </div>

                                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                                        {t("comparison.ohrly.eyebrow")}
                                    </p>

                                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                        {t("comparison.ohrly.title")}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-700 dark:text-cyan-50/90">
                                        {t("comparison.ohrly.description")}
                                    </p>

                                    <div className="mt-5 rounded-2xl border border-cyan-300/40 bg-white/70 p-4 dark:border-cyan-300/20 dark:bg-slate-950/40">
                                        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 dark:text-slate-500">
                                            {t("comparison.ohrly.questionLabel")}
                                        </p>
                                        <p className="mt-2 text-sm font-semibold leading-6 text-slate-950 dark:text-white">
                                            {t("comparison.ohrly.question")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative mx-auto mt-8 max-w-4xl rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-center dark:border-slate-800 dark:bg-slate-950/70">
                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {t("comparison.closing.part1")}{" "}
                                <span className="font-semibold text-slate-950 dark:text-white">
                                    {t("comparison.closing.systemOnline")}
                                </span>{" "}
                                {t("comparison.closing.part2")}{" "}
                                <span className="font-semibold text-slate-950 dark:text-white">
                                    {t("comparison.closing.resultDropped")}
                                </span>{" "}
                                {t("comparison.closing.part3")}{" "}
                                <span className="font-semibold text-cyan-700 dark:text-cyan-300">
                                    {t("comparison.closing.flowHealthy")}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </PageShell>
    );
}

function MetricCard({
    label,
    value,
    highlight,
    tooltip,
    valueClassName,
}: {
    label: string;
    value: string;
    highlight?: string;
    tooltip?: string;
    valueClassName?: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-500">
                {label}
                {tooltip ? <Tooltip content={tooltip} /> : null}
            </div>

            {highlight ? (
                <HighlightedValue
                    value={value}
                    highlight={highlight}
                    valueClassName={valueClassName}
                />
            ) : (
                <p
                    className={cn(
                        "mt-2 text-lg font-semibold text-slate-950 dark:text-white",
                        valueClassName,
                    )}
                >
                    {value}
                </p>
            )}
        </div>
    );
}

function HighlightedValue({
    value,
    highlight,
    valueClassName,
}: {
    value: string;
    highlight: string;
    valueClassName?: string;
}) {
    const [before, after] = value.split(highlight);

    return (
        <p
            className={cn(
                "mt-2 text-lg font-semibold text-slate-950 dark:text-white",
                valueClassName,
            )}
        >
            {before}
            <span className="text-2xl text-orange-600 dark:text-orange-300">
                {highlight}
            </span>
            {after}
        </p>
    );
}

function Tooltip({ content }: { content: string }) {
    return (
        <span className="group relative inline-flex">
            <button
                type="button"
                className="inline-flex h-4 w-4 items-center justify-center rounded-full text-slate-400 transition hover:text-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 dark:text-slate-600 dark:hover:text-cyan-300"
                aria-label={content}
            >
                <HelpCircle className="h-3.5 w-3.5" />
            </button>

            <span className="pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-left text-xs leading-5 text-slate-600 opacity-0 shadow-xl shadow-slate-200/60 transition group-hover:opacity-100 group-focus-within:opacity-100 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:shadow-cyan-950/20">
                {content}
            </span>
        </span>
    );
}

function ComparisonPillar({
    icon: Icon,
    eyebrow,
    title,
    description,
    className,
}: {
    icon: React.ElementType;
    eyebrow: string;
    title: string;
    description: string;
    className: string;
}) {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white/70 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
            <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl", className)}>
                <Icon className="h-6 w-6" />
            </div>

            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-600">
                {eyebrow}
            </p>

            <h3 className="mt-2 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {description}
            </p>
        </div>
    );
}

export function ExamplesExplorer() {
    const t = useTranslations("home");
    const [selectedExampleId, setSelectedExampleId] = useState<String>(examples[0].id);

    const selectedExample =
        examples.find((example) => example.id === selectedExampleId) ?? examples[0];

    const SelectedIcon = selectedExample.icon;
    const selectedBase = `examples.items.${selectedExample.translationKey}`;

    const selectedContext = t(`${selectedBase}.context`);
    const selectedSummary = t(`${selectedBase}.summary`);
    const [summaryBeforeContext, summaryAfterContext] = selectedSummary.split(selectedContext);

    return (
        <section
            id="exemplos"
            className="mx-auto grid gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:px-10"
        >
            <div>
                <div className="mb-6">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        {t("examples.title")}
                    </h2>
                    <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
                        {t("examples.description")}
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {examples.map((example) => {
                        const Icon = example.icon;
                        const active = example.id === selectedExample.id;
                        const base = `examples.items.${example.translationKey}`;

                        return (
                            <article
                                key={example.id}
                                className={cn(
                                    "rounded-2xl border bg-white/80 p-5 shadow-lg shadow-slate-200/50 transition dark:bg-slate-950/60 dark:shadow-cyan-950/10",
                                    active
                                        ? "border-blue-500 shadow-blue-500/10 dark:border-cyan-300/50"
                                        : "border-slate-200 hover:-translate-y-1 hover:border-cyan-300 dark:border-slate-800 dark:hover:border-cyan-300/40",
                                )}
                            >
                                <div
                                    className={cn(
                                        "flex h-11 w-11 items-center justify-center rounded-xl",
                                        example.className,
                                    )}
                                >
                                    <Icon className="h-5 w-5" />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold leading-tight text-slate-950 dark:text-white">
                                    {t(`${base}.title`)}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {t(`${base}.description`)}
                                </p>

                                <button
                                    type="button"
                                    onClick={() => setSelectedExampleId(example.id)}
                                    aria-pressed={active}
                                    className={cn(
                                        "mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition",
                                        active
                                            ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-cyan-300/40 dark:bg-cyan-300/10 dark:text-cyan-300"
                                            : "border-slate-200 bg-white text-slate-900 hover:border-blue-300 hover:bg-blue-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5",
                                    )}
                                >
                                    {active ? t("examples.selectedButton") : t("examples.viewReading")}
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </article>
                        );
                    })}
                </div>
            </div>

            <aside className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 lg:p-7">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    {t("examples.selectedReading")}
                </p>

                <div className="mt-6 flex items-center gap-4">
                    <div
                        className={cn(
                            "flex h-12 w-12 items-center justify-center rounded-2xl",
                            selectedExample.className,
                        )}
                    >
                        <SelectedIcon className="h-6 w-6" />
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold text-slate-950 dark:text-white">
                            {t(`${selectedBase}.title`)}
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">
                            {t(`${selectedBase}.domain`)}
                        </p>
                    </div>
                </div>

                <p className="mt-6 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {summaryBeforeContext}
                    <span className="font-semibold text-slate-950 dark:text-white">
                        {selectedContext}
                    </span>
                    {summaryAfterContext}
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <MetricCard
                        label={t("examples.metrics.state")}
                        value={t(`${selectedBase}.state`)}
                        valueClassName={
                            selectedExample.id === "entrega-recuperacao-lenta"
                                ? "text-red-600 dark:text-red-300"
                                : "text-orange-600 dark:text-orange-300"
                        }
                        tooltip={t("examples.metrics.stateTooltip")}
                    />

                    <MetricCard
                        label={t("examples.metrics.recoveryPressure")}
                        value={`RPI ${selectedExample.rpi}/100`}
                        highlight={String(selectedExample.rpi)}
                        tooltip={t("examples.metrics.rpiTooltip")}
                    />

                    <MetricCard label={t("examples.metrics.context")} value={selectedContext} />
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                                {t("examples.rpiComposition.title")}
                            </h4>
                            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
                                {t("examples.rpiComposition.description")}
                            </p>
                        </div>

                        <Tooltip content={t("examples.rpiComposition.tooltip")} />
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                        <RpiFactorCard
                            label={t("examples.rpiComposition.persistence.label")}
                            value={t(`${selectedBase}.persistenceLabel`)}
                            level={t(`${selectedBase}.persistenceLevel`)}
                            tooltip={t("examples.rpiComposition.persistence.tooltip")}
                            description={t(`${selectedBase}.persistenceDescription`)}
                        />

                        <RpiFactorCard
                            label={t("examples.rpiComposition.magnitude.label")}
                            value={t(`${selectedBase}.magnitudeLabel`)}
                            level={t(`${selectedBase}.magnitudeLevel`)}
                            tooltip={t("examples.rpiComposition.magnitude.tooltip")}
                            description={t(`${selectedBase}.magnitudeDescription`)}
                        />

                        <RpiFactorCard
                            label={t("examples.rpiComposition.propagation.label")}
                            value={t(`${selectedBase}.propagationLabel`)}
                            level={t(`${selectedBase}.propagationLevel`)}
                            tooltip={t("examples.rpiComposition.propagation.tooltip")}
                            description={t(`${selectedBase}.propagationDescription`)}
                        />
                    </div>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
                    <h4 className="font-semibold text-slate-950 dark:text-white">
                        {t("examples.whyItMatters")}
                    </h4>

                    <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {t(`${selectedBase}.whyItMatters`)}
                    </p>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/simulations"
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500"
                    >
                        {t("examples.adaptExample")}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </aside>
        </section>
    );
}

function RpiFactorCard({
    label,
    value,
    level,
    tooltip,
    description,
}: {
    label: string;
    value: string;
    level: string;
    tooltip: string;
    description: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-950/80">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.14em] text-slate-500 dark:text-slate-500">
                {label}
                <Tooltip content={tooltip} />
            </div>

            <div className="mt-3 flex items-end justify-between gap-3">
                <p className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {value}
                </p>

                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2.5 py-1 text-[11px] font-semibold text-cyan-700 dark:text-cyan-300">
                    {level}
                </span>
            </div>

            <p className="mt-3 text-xs leading-5 text-slate-500 dark:text-slate-500">
                {description}
            </p>
        </div>
    );
}