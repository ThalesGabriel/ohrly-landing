"use client";

import { trackMetaEvent } from "@/lib/meta-pixel";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
    BarChart3,
    Bot,
    ChevronDown,
    ChevronRight,
    Database,
    ExternalLink,
    FlaskConical,
    Gauge,
    Layers3,
    LineChart,
    PackageCheck,
    ShoppingCart,
    Sparkles,
    Waves,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type SolutionCardConfig = {
    key: "ecommerce" | "bots";
    href: string;
    icon: React.ElementType;
    iconClassName: string;
    buttonClassName: string;
    tagKeys: Array<"checkout" | "payments" | "delivery" | "handoff" | "fallback" | "resolution">;
};

type ProcessStepConfig = {
    key: "flow" | "signals" | "context" | "persistence" | "reading";
    icon: React.ElementType;
};

const solutionCards: SolutionCardConfig[] = [
    {
        key: "ecommerce",
        href: "/solutions/for-ecommerce",
        icon: ShoppingCart,
        iconClassName:
            "bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300",
        buttonClassName:
            "bg-cyan-600 text-white hover:bg-cyan-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300",
        tagKeys: ["checkout", "payments", "delivery"],
    },
    {
        key: "bots",
        href: "/solutions/for-bots",
        icon: Bot,
        iconClassName:
            "bg-violet-50 text-violet-700 dark:bg-violet-300/10 dark:text-violet-300",
        buttonClassName:
            "bg-violet-600 text-white hover:bg-violet-500 dark:bg-violet-400 dark:text-slate-950 dark:hover:bg-violet-300",
        tagKeys: ["handoff", "fallback", "resolution"],
    },
];

const processSteps: ProcessStepConfig[] = [
    {
        key: "flow",
        icon: Waves,
    },
    {
        key: "signals",
        icon: BarChart3,
    },
    {
        key: "context",
        icon: Layers3,
    },
    {
        key: "persistence",
        icon: Database,
    },
    {
        key: "reading",
        icon: Gauge,
    },
];

export default function HomePage() {
    const t = useTranslations("home");

    return (
        <PageShell>
            <section className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:py-20">
                <HeroCopy />
                <HeroReadingCard />
            </section>

            <section className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
                <h2 className="text-center text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {t("solutions.title")}
                </h2>

                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {solutionCards.map((solution) => (
                        <SolutionCard key={solution.key} solution={solution} />
                    ))}
                </div>
            </section>

            <section className="mx-auto mt-4 max-w-7xl px-5 sm:px-8 lg:px-10">
                <HowItWorksStrip />
            </section>

            <section className="mx-auto mt-4 grid max-w-7xl gap-4 px-5 sm:px-8 lg:grid-cols-2 lg:px-10">
                <SecondaryCard
                    icon={FlaskConical}
                    title={t("secondaryCards.simulations.title")}
                    description={t("secondaryCards.simulations.description")}
                    href="/simulations"
                    cta={t("secondaryCards.simulations.cta")}
                    tone="cyan"
                />

                <SecondaryCard
                    icon={PackageCheck}
                    title={t("secondaryCards.reports.title")}
                    description={t("secondaryCards.reports.description")}
                    href="/reports"
                    cta={t("secondaryCards.reports.cta")}
                    tone="violet"
                />
            </section>

            <section className="mx-auto max-w-7xl px-5 pb-10 pt-4 sm:px-8 lg:px-10">
                <FinalCta />
            </section>
        </PageShell>
    );
}

function HeroCopy() {
    const t = useTranslations("home.hero");

    return (
        <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-700/15 bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700 shadow-sm dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-cyan-300">
                <LineChart className="h-4 w-4" />
                {t("badge")}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-semibold leading-[1.04] tracking-tight text-slate-950 dark:text-white sm:text-6xl lg:text-6xl">
                {t("title.before")} {" "}
                <span className="text-cyan-600 dark:text-cyan-300">
                    {t("title.highlight")}
                </span>{" "}
                {t("title.after")}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                    href="/solutions/for-ecommerce"
                    onClick={() =>
                        trackMetaEvent("HomeHeroEcommerceClick", {
                            source: "home",
                            section: "hero",
                            destination: "/solutions/for-ecommerce",
                        })
                    }
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                >
                    <ShoppingCart className="h-4 w-4" />
                    {t("primaryCta")}
                    <ChevronRight className="h-4 w-4" />
                </Link>

                <Link
                    href="/solutions/for-bots"
                    onClick={() =>
                        trackMetaEvent("HomeHeroBotsClick", {
                            source: "home",
                            section: "hero",
                            destination: "/solutions/for-bots",
                        })
                    }
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5"
                >
                    <Bot className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                    {t("secondaryCta")}
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </div>
        </div>
    );
}

function HeroReadingCard() {
    const t = useTranslations("home.heroReadingCard");

    return (
        <div className="flex items-center lg:justify-end">
            <div className="w-full max-w-[620px] rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-2xl shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/20">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                        <p className="font-semibold text-slate-950 dark:text-white">
                            {t("title")}
                        </p>
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-9 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                    >
                        {t("period")}
                        <ChevronDown className="h-3.5 w-3.5" />
                    </button>
                </div>

                <div className="grid gap-5 py-5 lg:grid-cols-[0.8fr_1.4fr]">
                    <div className="border-b border-slate-200 pb-5 dark:border-slate-800 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-5">
                        <div className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-500">
                            {t("rpiLabel")}
                            <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] dark:border-slate-700">
                                i
                            </span>
                        </div>

                        <div className="mt-3 flex items-end gap-1">
                            <span className="text-6xl font-semibold tracking-tight text-cyan-600 dark:text-cyan-300">
                                58
                            </span>
                            <span className="pb-2 text-2xl text-slate-400 dark:text-slate-600">
                                /100
                            </span>
                        </div>

                        <span className="mt-4 inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-400/10 dark:text-amber-300">
                            {t("state")}
                        </span>
                    </div>

                    <div>
                        <div className="mb-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">
                                {t("chartTitle")}
                                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-slate-300 text-[10px] text-slate-400 dark:border-slate-700">
                                    i
                                </span>
                            </div>
                        </div>

                        <MiniLineChart />
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                    <p className="text-sm font-semibold text-slate-950 dark:text-white">
                        {t("flowsInFocus")}
                    </p>

                    <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        <FocusFlowCard
                            icon={ShoppingCart}
                            title={t("focusFlows.checkout")}
                            rpi="61"
                            tone="cyan"
                        />

                        <FocusFlowCard
                            icon={Bot}
                            title={t("focusFlows.bot")}
                            rpi="54"
                            tone="violet"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function MiniLineChart() {
    const t = useTranslations("home.heroReadingCard.dates");

    const points = [
        "0,62",
        "38,48",
        "76,55",
        "114,50",
        "152,59",
        "190,53",
        "228,66",
        "266,61",
        "304,78",
        "342,88",
        "380,70",
        "418,67",
        "456,51",
        "494,57",
        "532,54",
        "570,60",
    ].join(" ");

    return (
        <div>
            <div className="relative h-36 rounded-2xl bg-slate-50 p-4 dark:bg-slate-900/60">
                <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-slate-300 dark:border-slate-700" />
                <svg
                    viewBox="0 0 570 110"
                    className="relative h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                >
                    <polyline
                        points={points}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-cyan-500 dark:text-cyan-300"
                    />
                    <circle
                        cx="570"
                        cy="60"
                        r="5"
                        className="fill-white stroke-cyan-500 stroke-[4] dark:fill-slate-950 dark:stroke-cyan-300"
                    />
                </svg>
            </div>

            <div className="mt-2 flex justify-between px-2 text-xs text-slate-500 dark:text-slate-500">
                <span>{t("may14")}</span>
                <span>{t("may21")}</span>
                <span>{t("may28")}</span>
                <span>{t("jun4")}</span>
            </div>
        </div>
    );
}

function FocusFlowCard({
    icon: Icon,
    title,
    rpi,
    tone,
}: {
    icon: React.ElementType;
    title: string;
    rpi: string;
    tone: "cyan" | "violet";
}) {
    return (
        <div className="group flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950">
            <div
                className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    tone === "cyan" &&
                    "bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300",
                    tone === "violet" &&
                    "bg-violet-50 text-violet-700 dark:bg-violet-300/10 dark:text-violet-300",
                )}
            >
                <Icon className="h-5 w-5" />
            </div>

            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                    {title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-500">
                        RPI {rpi}
                    </span>
                    <div className="h-4 flex-1">
                        <svg
                            viewBox="0 0 80 20"
                            className={cn(
                                "h-full w-full",
                                tone === "cyan" && "text-cyan-500 dark:text-cyan-300",
                                tone === "violet" && "text-violet-500 dark:text-violet-300",
                            )}
                            preserveAspectRatio="none"
                        >
                            <polyline
                                points="0,14 12,13 24,11 36,12 48,8 60,9 72,6 80,7"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <ChevronRight className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-600 dark:text-slate-600 dark:group-hover:text-cyan-300" />
        </div>
    );
}

function SolutionCard({
    solution,
}: {
    solution: SolutionCardConfig;
}) {
    const t = useTranslations(`home.solutions.cards.${solution.key}`);
    const Icon = solution.icon;

    return (
        <article className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/50 backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10 dark:hover:border-cyan-300/40 sm:p-6">
            <div className="absolute right-6 top-6 hidden h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-lg shadow-slate-200/60 transition group-hover:translate-x-1 dark:border-slate-800 dark:bg-slate-950 dark:shadow-cyan-950/20 sm:flex">
                <ChevronRight className="h-5 w-5 text-slate-500 dark:text-slate-500" />
            </div>

            <div className="flex gap-5">
                <div
                    className={cn(
                        "flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem]",
                        solution.iconClassName,
                    )}
                >
                    <Icon className="h-11 w-11" />
                </div>

                <div className="min-w-0 flex-1 pr-0 sm:pr-16">
                    <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        {t("title")}
                    </h3>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {t("description")}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                        {solution.tagKeys.map((tagKey) => (
                            <span
                                key={tagKey}
                                className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300"
                            >
                                {t(`tags.${tagKey}`)}
                            </span>
                        ))}
                    </div>

                    <Link
                        href={solution.href}
                        onClick={() =>
                            trackMetaEvent("HomeSolutionCardClick", {
                                source: "home",
                                section: "solutions",
                                solution: solution.key,
                                destination: solution.href,
                            })
                        }
                        className={cn(
                            "mt-5 inline-flex h-10 items-center justify-center rounded-xl px-4 text-sm font-semibold shadow-lg transition hover:-translate-y-0.5",
                            solution.buttonClassName,
                        )}
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </article>
    );
}

function HowItWorksStrip() {
    const t = useTranslations("home.howItWorks");

    return (
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
            <div className="grid gap-6 lg:grid-cols-[180px_1fr] lg:items-center">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {t("title")}
                </h2>

                <div className="grid gap-4 md:grid-cols-5">
                    {processSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.key} className="relative">
                                <div className="flex gap-3 md:block">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div className="md:mt-3">
                                        <p className="font-semibold text-slate-950 dark:text-white">
                                            {t(`steps.${step.key}.title`)}
                                        </p>
                                        <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
                                            {t(`steps.${step.key}.description`)}
                                        </p>
                                    </div>
                                </div>

                                {index < processSteps.length - 1 ? (
                                    <div className="absolute left-[56px] top-6 hidden h-px w-[calc(100%-32px)] bg-slate-200 dark:bg-slate-800 md:block" />
                                ) : null}
                            </div>
                        );
                    })}
                </div>
            </div>

            <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-500">
                {t("description")}
            </p>
        </section>
    );
}

function SecondaryCard({
    icon: Icon,
    title,
    description,
    href,
    cta,
    tone,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    href: string;
    cta: string;
    tone: "cyan" | "violet";
}) {
    return (
        <article className="flex items-center justify-between gap-5 rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
            <div className="flex items-center gap-5">
                <div
                    className={cn(
                        "flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl",
                        tone === "cyan" &&
                        "bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300",
                        tone === "violet" &&
                        "bg-violet-50 text-violet-700 dark:bg-violet-300/10 dark:text-violet-300",
                    )}
                >
                    <Icon className="h-7 w-7" />
                </div>

                <div>
                    <h3 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {description}
                    </p>
                </div>
            </div>

            <Link
                href={href}
                onClick={() =>
                    trackMetaEvent("HomeSecondaryCardClick", {
                        source: "home",
                        section: "secondary_cards",
                        target: href.replace("/", ""),
                        destination: href,
                    })
                }
                className="hidden h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5 sm:inline-flex"
            >
                {cta}
                <ExternalLink className="h-4 w-4" />
            </Link>
        </article>
    );
}

function FinalCta() {
    const t = useTranslations("home.finalCta");

    return (
        <section className="relative overflow-hidden rounded-3xl border border-cyan-200 bg-cyan-50/80 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur dark:border-cyan-300/20 dark:bg-cyan-300/10">
            <div className="pointer-events-none absolute right-[-80px] top-[-120px] h-64 w-64 rounded-full border border-cyan-300/30" />
            <div className="pointer-events-none absolute right-[-40px] top-[-80px] h-52 w-52 rounded-full border border-cyan-300/40" />

            <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-200 text-cyan-800 dark:bg-cyan-300 dark:text-slate-950">
                        <Sparkles className="h-7 w-7" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                            {t("title")}
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {t("description")}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/simulations"
                        onClick={() =>
                            trackMetaEvent("HomeFinalCtaClick", {
                                source: "home",
                                section: "final_cta",
                                destination: "/simulations",
                            })
                        }
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
                    >
                        {t("cta")}
                        <ChevronRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
