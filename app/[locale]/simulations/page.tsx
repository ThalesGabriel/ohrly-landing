"use client";

import { trackMetaEvent } from "@/lib/meta-pixel";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    ArrowRight,
    BarChart3,
    Bot,
    Check,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    HelpCircle,
    LineChart,
    LockKeyhole,
    MessageCircle,
    PackageCheck,
    Send,
    Settings2,
    ShieldAlert,
    Sparkles,
    Zap,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type ExampleId = "checkout" | "bot" | "delivery" | "billing";
type DurationOption = "2" | "4" | "7";
type RecoveryOption = "normal" | "slow" | "fragile";
type PropagationOption = "localized" | "initial" | "spreading";

type ObservableSignal = {
    labelKey: string;
    icon: React.ElementType;
    className: string;
};

type DemoExample = {
    id: ExampleId;
    icon: React.ElementType;
    iconClassName: string;
    observableSignals: ObservableSignal[];
};

const examples: DemoExample[] = [
    {
        id: "checkout",
        icon: Clock3,
        iconClassName: "bg-cyan-600 text-white dark:bg-cyan-500",
        observableSignals: [
            {
                labelKey: "approvalTime",
                icon: Clock3,
                className:
                    "text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30",
            },
            {
                labelKey: "retries",
                icon: Zap,
                className:
                    "text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
            },
            {
                labelKey: "abandonment",
                icon: Send,
                className:
                    "text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30",
            },
            {
                labelKey: "exposedValue",
                icon: CircleDollarSign,
                className:
                    "text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30",
            },
        ],
    },
    {
        id: "bot",
        icon: MessageCircle,
        iconClassName: "bg-emerald-500 text-white dark:bg-emerald-500",
        observableSignals: [
            {
                labelKey: "handoff",
                icon: Bot,
                className:
                    "text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
            },
            {
                labelKey: "fallback",
                icon: ShieldAlert,
                className:
                    "text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30",
            },
            {
                labelKey: "resolutionTime",
                icon: Clock3,
                className:
                    "text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30",
            },
            {
                labelKey: "unresolvedSessions",
                icon: BarChart3,
                className:
                    "text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30",
            },
        ],
    },
    {
        id: "delivery",
        icon: PackageCheck,
        iconClassName: "bg-orange-500 text-white dark:bg-orange-500",
        observableSignals: [
            {
                labelKey: "shippingTime",
                icon: Clock3,
                className:
                    "text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30",
            },
            {
                labelKey: "delay",
                icon: PackageCheck,
                className:
                    "text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30",
            },
            {
                labelKey: "atRiskOrders",
                icon: ShieldAlert,
                className:
                    "text-red-600 dark:text-red-300 bg-red-50 dark:bg-red-950/30",
            },
            {
                labelKey: "exposedValue",
                icon: CircleDollarSign,
                className:
                    "text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30",
            },
        ],
    },
    {
        id: "billing",
        icon: CircleDollarSign,
        iconClassName: "bg-violet-500 text-white dark:bg-violet-500",
        observableSignals: [
            {
                labelKey: "billingFailures",
                icon: CircleDollarSign,
                className:
                    "text-violet-600 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/30",
            },
            {
                labelKey: "retries",
                icon: Zap,
                className:
                    "text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30",
            },
            {
                labelKey: "timeToRecover",
                icon: Clock3,
                className:
                    "text-cyan-600 dark:text-cyan-300 bg-cyan-50 dark:bg-cyan-950/30",
            },
            {
                labelKey: "exposedRevenue",
                icon: BarChart3,
                className:
                    "text-orange-600 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/30",
            },
        ],
    },
];

const durationScores: Record<DurationOption, number> = {
    "2": 12,
    "4": 20,
    "7": 30,
};

const recoveryScores: Record<RecoveryOption, number> = {
    normal: 12,
    slow: 22,
    fragile: 30,
};

const propagationScores: Record<PropagationOption, number> = {
    localized: 8,
    initial: 16,
    spreading: 24,
};

function getRpi(
    selectedExample: DemoExample,
    duration: DurationOption,
    recovery: RecoveryOption,
    propagation: PropagationOption,
) {
    const baseByExample: Record<ExampleId, number> = {
        checkout: 10,
        bot: 8,
        delivery: 16,
        billing: 11,
    };

    return Math.min(
        92,
        baseByExample[selectedExample.id] +
        durationScores[duration] +
        recoveryScores[recovery] +
        propagationScores[propagation],
    );
}

function getReadingState(
    rpi: number,
    t: ReturnType<typeof useTranslations<"guidedDemo">>,
) {
    if (rpi >= 76) {
        return {
            label: t("readingStates.degradation"),
            position: "85%",
            color: "text-red-600 dark:text-red-300",
            marker: "bg-red-500",
        };
    }

    if (rpi >= 42) {
        return {
            label: t("readingStates.attention"),
            position: "50%",
            color: "text-orange-600 dark:text-orange-300",
            marker: "bg-orange-500",
        };
    }

    return {
        label: t("readingStates.normal"),
        position: "12%",
        color: "text-emerald-600 dark:text-emerald-300",
        marker: "bg-emerald-500",
    };
}

function TooltipInfo({ content }: { content: string }) {
    return (
        <span className="group relative inline-flex">
            <HelpCircle className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-600 dark:text-slate-500 dark:group-hover:text-cyan-300" />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 hidden w-64 -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-3 text-left text-xs font-normal leading-5 text-slate-600 shadow-xl shadow-slate-200/70 group-hover:block dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:shadow-cyan-950/20">
                {content}
            </span>
        </span>
    );
}

function Stepper() {
    const t = useTranslations("guidedDemo");

    const steps = [
        { number: 1, label: t("steps.chooseExample"), active: true },
        { number: 2, label: t("steps.quickAdjust"), active: false },
        { number: 3, label: t("steps.seeReading"), active: false },
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white/75 p-3 shadow-sm shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
            <div className="grid gap-2 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
                {steps.map((step, index) => (
                    <div key={step.number} className="contents">
                        <div className="flex items-center gap-4 rounded-xl px-4 py-2.5">
                            <span
                                className={cn(
                                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                                    step.active
                                        ? "bg-cyan-600 text-white shadow-lg shadow-cyan-600/20 dark:bg-cyan-500"
                                        : "border border-slate-300 bg-white text-slate-600 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300",
                                )}
                            >
                                {step.number}
                            </span>
                            <span
                                className={cn(
                                    "text-sm font-semibold",
                                    step.active
                                        ? "text-cyan-700 dark:text-cyan-300"
                                        : "text-slate-700 dark:text-slate-300",
                                )}
                            >
                                {step.label}
                            </span>
                        </div>
                        {index < steps.length - 1 ? (
                            <ChevronRight className="hidden h-5 w-5 text-slate-400 md:block" />
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}

function ExampleButton({
    example,
    selected,
    onSelect,
}: {
    example: DemoExample;
    selected: boolean;
    onSelect: () => void;
}) {
    const t = useTranslations("guidedDemo");
    const Icon = example.icon;
    const base = `examples.${example.id}` as const;

    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "w-full cursor-pointer rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-cyan-500/15",
                selected
                    ? "border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-600/10 dark:border-cyan-400/60 dark:bg-cyan-400/10"
                    : "border-slate-200 bg-white hover:border-cyan-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-cyan-400/30 dark:hover:bg-slate-900/60",
            )}
        >
            <div className="flex items-start gap-4">
                <div
                    className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                        example.iconClassName,
                    )}
                >
                    <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold leading-snug text-slate-950 dark:text-white">
                        {t(`${base}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
                        {t(`${base}.shortDescription`)}
                    </p>
                </div>

                {selected ? (
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cyan-600 text-white dark:bg-cyan-500">
                        <Check className="h-4 w-4" />
                    </span>
                ) : null}
            </div>
        </button>
    );
}

function SegmentedControl<T extends string>({
    label,
    icon: Icon,
    value,
    options,
    onChange,
}: {
    label: string;
    icon: React.ElementType;
    value: T;
    options: Array<{ label: string; value: T }>;
    onChange: (value: T) => void;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white/70 p-2.5 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
                {label}
            </div>
            <div className="grid grid-cols-3 gap-2">
                {options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition",
                            option.value === value
                                ? "bg-cyan-600 text-white shadow-md shadow-cyan-600/20 dark:bg-cyan-500"
                                : "border border-slate-200 bg-white text-slate-600 hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:border-cyan-400/40 dark:hover:text-cyan-300",
                        )}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function ReadingPanel({
    selectedExample,
    duration,
    recovery,
    propagation,
}: {
    selectedExample: DemoExample;
    duration: DurationOption;
    recovery: RecoveryOption;
    propagation: PropagationOption;
}) {
    const t = useTranslations("guidedDemo");

    const rpi = getRpi(selectedExample, duration, recovery, propagation);
    const readingState = getReadingState(rpi, t);
    const ExampleIcon = selectedExample.icon;
    const base = `examples.${selectedExample.id}` as const;

    return (
        <section className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 lg:p-8">
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {t("sections.seeReading")}
            </h2>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 lg:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
                    {t("reading.selectedExample")}
                </p>

                <div className="mt-4 flex items-center gap-3">
                    <div
                        className={cn(
                            "flex h-11 w-11 items-center justify-center rounded-xl",
                            selectedExample.iconClassName,
                        )}
                    >
                        <ExampleIcon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                        {t(`${base}.title`)}
                    </h3>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {t("reading.summaryPrefix")} {t(`${base}.scenario`)}.
                </p>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <MetricCard
                        label={t("reading.metrics.state")}
                        value={t(`${base}.stateLabel`)}
                        valueClassName="text-orange-600 dark:text-orange-300"
                        help={t(`${base}.stateHelp`)}
                    />
                    <MetricCard
                        label={t("reading.metrics.recoveryPressure")}
                        value={
                            <>
                                RPI{" "}
                                <span className="text-3xl text-orange-600 dark:text-orange-300">
                                    {rpi}
                                </span>
                                <span className="text-slate-500 dark:text-slate-500">
                                    /100
                                </span>
                            </>
                        }
                        help={t("reading.rpiHelp")}
                    />
                    <MetricCard
                        label={t("reading.metrics.context")}
                        value={t(`${base}.selectedContext`)}
                    />
                </div>

                <div className="mt-7">
                    <div className="relative h-12">
                        <div className="absolute left-0 right-0 top-5 h-1 rounded-full bg-gradient-to-r from-emerald-500 via-orange-400 to-red-500" />
                        <div className="absolute left-0 top-3 h-5 w-5 rounded-full border-4 border-white bg-emerald-500 shadow dark:border-slate-950" />
                        <div className="absolute right-0 top-3 h-5 w-5 rounded-full border-4 border-white bg-red-500 shadow dark:border-slate-950" />
                        <div
                            className={cn(
                                "absolute top-1 h-9 w-9 -translate-x-1/2 rounded-full border-4 border-white shadow-lg dark:border-slate-950",
                                readingState.marker,
                            )}
                            style={{ left: readingState.position }}
                        />
                    </div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-500">
                        <span>{t("reading.timeline.normal")}</span>
                        <span className={readingState.color}>{readingState.label}</span>
                        <span>{t("reading.timeline.degradation")}</span>
                    </div>
                </div>

                <div className="mt-7">
                    <h4 className="font-semibold text-slate-950 dark:text-white">
                        {t("reading.whyItMatters")}
                    </h4>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {t(`${base}.whyItMatters`)}
                    </p>
                </div>

                <div className="mt-7">
                    <h4 className="text-sm font-semibold text-slate-950 dark:text-white">
                        {t("reading.observableSignals")}
                    </h4>
                    <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-2">
                        {selectedExample.observableSignals.map((signal) => {
                            const SignalIcon = signal.icon;

                            return (
                                <div
                                    key={signal.labelKey}
                                    className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/70"
                                >
                                    <div className="flex items-center gap-3">
                                        <div
                                            className={cn(
                                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                                                signal.className,
                                            )}
                                        >
                                            <SignalIcon className="h-4 w-4" />
                                        </div>
                                        <p className="text-xs font-semibold leading-4 text-slate-700 dark:text-slate-300">
                                            {t(`${base}.signals.${signal.labelKey}`)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-7 text-center">
                    <Link
                        href="/request"
                        onClick={() =>
                            trackMetaEvent("GuidedDemoRequestClick", {
                                source: "guided_demo",
                                section: "reading_panel",
                                destination: "/request",
                                example: selectedExample.id,
                                duration,
                                recovery,
                                propagation,
                                rpi,
                            })
                        }
                        className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400"
                    >
                        <Settings2 className="h-4 w-4" />
                        {t("reading.adaptExample")}
                    </Link>
                </div>
            </div>
        </section>
    );
}

function MetricCard({
    label,
    value,
    help,
    valueClassName,
}: {
    label: string;
    value: React.ReactNode;
    help?: string;
    valueClassName?: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950/70">
            <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
                    {label}
                </p>
                {help ? <TooltipInfo content={help} /> : null}
            </div>
            <div
                className={cn(
                    "mt-3 text-base font-bold leading-tight text-slate-950 dark:text-white",
                    valueClassName,
                )}
            >
                {value}
            </div>
        </div>
    );
}

function ComparisonStrip() {
    const t = useTranslations("guidedDemo");

    return (
        <section
            id="observabilidade"
            className="rounded-3xl border border-slate-200 bg-white/75 p-6 text-center shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10 lg:p-8"
        >
            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {t("comparison.title")}
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-3 md:divide-x md:divide-slate-200 dark:md:divide-slate-800">
                <ComparisonItem
                    icon={LineChart}
                    iconClassName="text-cyan-600 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-950/30"
                    title={t("comparison.apm.title")}
                    description={t("comparison.apm.description")}
                />
                <ComparisonItem
                    icon={BarChart3}
                    iconClassName="text-emerald-600 bg-emerald-50 dark:text-emerald-300 dark:bg-emerald-950/30"
                    title={t("comparison.bi.title")}
                    description={t("comparison.bi.description")}
                />
                <ComparisonItem
                    icon={Sparkles}
                    iconClassName="text-cyan-600 bg-cyan-50 dark:text-cyan-300 dark:bg-cyan-950/30"
                    title={t("comparison.ohrly.title")}
                    description={t("comparison.ohrly.description")}
                />
            </div>

            <p className="mx-auto mt-7 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                {t("comparison.closing")}
            </p>
        </section>
    );
}

function ComparisonItem({
    icon: Icon,
    iconClassName,
    title,
    description,
}: {
    icon: React.ElementType;
    iconClassName: string;
    title: string;
    description: string;
}) {
    return (
        <div className="flex items-center justify-center gap-4 px-4 py-2 text-left">
            <div
                className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                    iconClassName,
                )}
            >
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-lg font-semibold text-cyan-700 dark:text-cyan-300">
                    {title}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

export default function OhrlyGuidedDemoPage() {
    const t = useTranslations("guidedDemo");

    const [selectedExampleId, setSelectedExampleId] =
        useState<ExampleId>("bot");
    const [duration, setDuration] = useState<DurationOption>("4");
    const [recovery, setRecovery] = useState<RecoveryOption>("slow");
    const [propagation, setPropagation] =
        useState<PropagationOption>("initial");
    const [demoTouched, setDemoTouched] = useState({
        example: false,
        control: false,
        completed: false,
    });

    const selectedExample = useMemo(
        () => examples.find((example) => example.id === selectedExampleId) ?? examples[0],
        [selectedExampleId],
    );

    const rpi = useMemo(
        () => getRpi(selectedExample, duration, recovery, propagation),
        [selectedExample, duration, recovery, propagation],
    );

    function handleExampleSelect(exampleId: ExampleId) {
        setSelectedExampleId(exampleId);

        trackMetaEvent("GuidedDemoExampleSelected", {
            source: "guided_demo",
            example: exampleId,
            duration,
            recovery,
            propagation,
            rpi,
        });

        setDemoTouched((current) =>
            trackDemoCompletedIfNeeded({
                ...current,
                example: true,
            }),
        );
    }

    function handleDurationChange(value: DurationOption) {
        setDuration(value);

        trackMetaEvent("GuidedDemoDurationChanged", {
            source: "guided_demo",
            example: selectedExampleId,
            duration: value,
            recovery,
            propagation,
            rpi,
        });

        setDemoTouched((current) =>
            trackDemoCompletedIfNeeded({
                ...current,
                control: true,
            }),
        );
    }

    function handlePropagationChange(value: PropagationOption) {
        setPropagation(value);

        trackMetaEvent("GuidedDemoPropagationChanged", {
            source: "guided_demo",
            example: selectedExampleId,
            duration,
            recovery,
            propagation: value,
            rpi,
        });

        setDemoTouched((current) =>
            trackDemoCompletedIfNeeded({
                ...current,
                control: true,
            }),
        );
    }

    function handleRecoveryChange(value: RecoveryOption) {
        setRecovery(value);

        trackMetaEvent("GuidedDemoRecoveryChanged", {
            source: "guided_demo",
            example: selectedExampleId,
            duration,
            recovery: value,
            propagation,
            rpi,
        });

        setDemoTouched((current) =>
            trackDemoCompletedIfNeeded({
                ...current,
                control: true,
            }),
        );
    }

    function trackDemoCompletedIfNeeded(nextState: {
        example: boolean;
        control: boolean;
        completed: boolean;
    }) {
        if (nextState.example && nextState.control && !nextState.completed) {
            trackMetaEvent("GuidedDemoCompleted", {
                source: "guided_demo",
                example: selectedExampleId,
                duration,
                recovery,
                propagation,
                rpi,
            });

            return {
                ...nextState,
                completed: true,
            };
        }

        return nextState;
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#020b12] dark:text-white">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:36px_36px] opacity-60 dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] dark:opacity-25" />
                <div className="absolute left-[-18%] top-[-12%] h-[420px] w-[420px] rounded-full bg-cyan-300/10 blur-3xl dark:bg-cyan-400/10" />
                <div className="absolute right-[-18%] top-[16%] h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
            </div>

            <div className="relative z-10">
                <SiteHeader />

                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                    <section className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
                                <Sparkles className="h-4 w-4" />
                                {t("hero.badge")}
                            </div>

                            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.03] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
                                {t("hero.title")}
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                {t("hero.description")}
                            </p>

                            <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
                                <LockKeyhole className="h-4 w-4" />
                                {t("hero.securityNote")}
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="relative min-h-[250px]">
                                <div className="absolute left-8 top-8 w-[280px] rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-cyan-950/20">
                                    <div className="h-2 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                                    <div className="mt-7 flex h-24 items-end gap-3">
                                        {[32, 44, 36, 68, 50, 42, 62, 88, 72, 80].map(
                                            (height, index) => (
                                                <div
                                                    key={index}
                                                    className="flex-1 rounded-full bg-cyan-500/20 dark:bg-cyan-400/25"
                                                    style={{ height: `${height}%` }}
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>

                                <div className="absolute right-6 top-24 w-[260px] rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-cyan-950/20">
                                    <div className="flex items-center gap-5">
                                        <div className="relative h-20 w-20 rounded-full bg-[conic-gradient(from_90deg,#fb923c_0_32%,#e2e8f0_32%_100%)] dark:bg-[conic-gradient(from_90deg,#fb923c_0_32%,#334155_32%_100%)]">
                                            <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-950" />
                                        </div>
                                        <div className="flex-1 space-y-3">
                                            <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                                            <div className="h-3 w-28 rounded-full bg-slate-200 dark:bg-slate-800" />
                                            <div className="h-3 w-24 rounded-full bg-slate-200 dark:bg-slate-800" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section id="como-funciona" className="mt-10">
                        <Stepper />
                    </section>

                    <section
                        id="exemplos"
                        className="mt-8 grid gap-6 lg:grid-cols-[420px_1fr]"
                    >
                        <div className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 lg:p-7">
                            <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                {t("sections.chooseExample")}
                            </h2>

                            <div className="mt-5 grid gap-3">
                                {examples.map((example) => (
                                    <ExampleButton
                                        key={example.id}
                                        example={example}
                                        selected={example.id === selectedExampleId}
                                        onSelect={() => handleExampleSelect(example.id)}
                                    />
                                ))}
                            </div>

                            <div className="mt-7">
                                <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                                    {t("sections.quickAdjust")}
                                </h2>

                                <div className="mt-5 grid gap-3">
                                    <SegmentedControl
                                        label={t("controls.duration")}
                                        icon={Clock3}
                                        value={duration}
                                        onChange={handleDurationChange}
                                        options={[
                                            {
                                                label: t("controls.durationOptions.twoDays"),
                                                value: "2",
                                            },
                                            {
                                                label: t("controls.durationOptions.fourDays"),
                                                value: "4",
                                            },
                                            {
                                                label: t("controls.durationOptions.sevenDays"),
                                                value: "7",
                                            },
                                        ]}
                                    />
                                    <SegmentedControl
                                        label={t("controls.recovery")}
                                        icon={LineChart}
                                        value={recovery}
                                        onChange={handleRecoveryChange}
                                        options={[
                                            {
                                                label: t("controls.recoveryOptions.normal"),
                                                value: "normal",
                                            },
                                            {
                                                label: t("controls.recoveryOptions.slow"),
                                                value: "slow",
                                            },
                                            {
                                                label: t("controls.recoveryOptions.fragile"),
                                                value: "fragile",
                                            },
                                        ]}
                                    />
                                    <SegmentedControl
                                        label={t("controls.propagation")}
                                        icon={Sparkles}
                                        value={propagation}
                                        onChange={handlePropagationChange}
                                        options={[
                                            {
                                                label: t("controls.propagationOptions.localized"),
                                                value: "localized",
                                            },
                                            {
                                                label: t("controls.propagationOptions.initial"),
                                                value: "initial",
                                            },
                                            {
                                                label: t("controls.propagationOptions.spreading"),
                                                value: "spreading",
                                            },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <ReadingPanel
                            selectedExample={selectedExample}
                            duration={duration}
                            recovery={recovery}
                            propagation={propagation}
                        />
                    </section>

                    <div className="mt-8">
                        <ComparisonStrip />
                    </div>
                </main>
            </div>
        </div>
    );
}