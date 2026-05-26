"use client";

import OhrlyPageShell from "@/components/layout/OhrlyPageShell";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import {
    ArrowRight,
    BarChart3,
    Bot,
    CheckCircle2,
    ChevronRight,
    CircleDollarSign,
    Clock3,
    Database,
    FileText,
    GitBranch,
    Layers3,
    MessageSquareText,
    PackageCheck,
    ReceiptText,
    Search,
    ShieldAlert,
    ShieldCheck,
    ShoppingCart,
    Sparkles,
    TriangleAlert,
    WandSparkles,
} from "lucide-react";

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
                "relative overflow-hidden rounded-2xl border shadow-xl backdrop-blur transition-colors",
                "border-slate-200 bg-white/80 shadow-slate-200/60",
                "dark:border-cyan-300/15 dark:bg-slate-950/70 dark:shadow-2xl dark:shadow-cyan-950/20",
                "before:pointer-events-none before:absolute before:inset-0",
                "before:bg-[radial-gradient(circle_at_top_left,rgba(8,145,178,0.08),transparent_35%)]",
                "dark:before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.12),transparent_35%)]",
                className,
            )}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}

type FlowTemplate = {
    id: string;
    icon: React.ElementType;
    stages: string[];
    fields: string[];
    signals: string[];
    degradationOptions: string[];
};

const flowTemplates: FlowTemplate[] = [
    {
        id: "checkoutPayment",
        icon: ShoppingCart,
        stages: ["cartCreated", "checkoutStarted", "paymentSelected", "paymentApproved", "orderConfirmed"],
        fields: [
            "order_id",
            "cart_created_at",
            "checkout_started_at",
            "payment_method",
            "payment_approved_at",
            "order_status",
            "order_value",
            "device",
            "customer_state",
        ],
        signals: ["approvalTime", "abandonmentRate", "paymentRetries", "exposedValue"],
        degradationOptions: ["approvalTimeIncrease", "paymentRetriesIncrease", "mobileCompletionDrop"],
    },
    {
        id: "chatbotHandoff",
        icon: Bot,
        stages: ["messageReceived", "intentDetected", "automatedResponse", "resolutionOrFallback", "humanHandoff", "closed"],
        fields: [
            "session_id",
            "started_at",
            "intent",
            "bot_resolved",
            "handoff_at",
            "resolved_at",
            "channel",
            "customer_type",
            "status",
        ],
        signals: ["handoffRate", "resolutionTime", "unresolvedMessages", "fallbackRate"],
        degradationOptions: ["handoffIncrease", "unresolvedIncrease", "resolutionTimeIncrease"],
    },
    {
        id: "deliveryLifecycle",
        icon: PackageCheck,
        stages: ["orderConfirmed", "pickingStarted", "orderShipped", "estimatedDelivery", "delivered"],
        fields: [
            "order_id",
            "approved_at",
            "shipped_at",
            "estimated_delivery_at",
            "delivered_at",
            "seller_id",
            "customer_state",
            "freight_value",
            "order_value",
        ],
        signals: ["deliveryDelay", "shippingTime", "atRiskOrders", "exposedValue"],
        degradationOptions: ["deliveryDelayIncrease", "preShippingBacklog", "slowerRecovery"],
    },
    {
        id: "billingRecovery",
        icon: ReceiptText,
        stages: ["invoiceCreated", "firstAttempt", "failureOrSuccess", "retry", "recovered", "accountAtRisk"],
        fields: [
            "account_id",
            "invoice_created_at",
            "payment_attempted_at",
            "payment_status",
            "retry_count",
            "recovered_at",
            "plan_type",
            "account_segment",
            "invoice_value",
        ],
        signals: ["billingFailures", "recoveryTime", "retriesPerAccount", "exposedRevenue"],
        degradationOptions: ["retryFailuresIncrease", "slowerRecovery", "accountsAtRiskIncrease"],
    },
];

const persistenceOptions = [
    { key: "twoDays", value: 2 },
    { key: "fourDays", value: 4 },
    { key: "sevenDays", value: 7 },
    { key: "intermittentWeeks", value: 10 },
];

const recoveryOptions = [
    { key: "normalizesFast", value: 18 },
    { key: "sometimesNormalizes", value: 28 },
    { key: "needsIntervention", value: 38 },
    { key: "unclearCriterion", value: 34 },
];

const propagationOptions = [
    { key: "localized", value: 8 },
    { key: "secondarySignal", value: 20 },
    { key: "multipleSteps", value: 30 },
];

function estimateRpi(persistence: number, recovery: number, propagation: number) {
    const persistenceScore = Math.min(36, persistence * 4);
    const raw = persistenceScore + recovery + propagation;
    return Math.max(12, Math.min(96, raw));
}

function getState(rpi: number) {
    if (rpi >= 76) {
        return {
            key: "lossOfRecoverability",
            tone: "critical" as const,
        };
    }

    if (rpi >= 56) {
        return {
            key: "sustainedDegradation",
            tone: "danger" as const,
        };
    }

    if (rpi >= 34) {
        return {
            key: "operationalAttention",
            tone: "warning" as const,
        };
    }

    return {
        key: "controlledVariation",
        tone: "healthy" as const,
    };
}

function SectionHeader({
    eyebrow,
    title,
    description,
}: {
    eyebrow?: string;
    title: string;
    description?: string;
}) {
    return (
        <div className="mb-6">
            {eyebrow ? (
                <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                    {eyebrow}
                </p>
            ) : null}
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {title}
            </h2>
            {description ? (
                <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            ) : null}
        </div>
    );
}

function TemplateCard({
    template,
    selected,
    onSelect,
}: {
    template: FlowTemplate;
    selected: boolean;
    onSelect: () => void;
}) {
    const t = useTranslations("demo.templates");
    const Icon = template.icon;

    return (
        <button
            type="button"
            onClick={onSelect}
            className={cn(
                "cursor-pointer group text-left transition hover:-translate-y-1",
                "rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950",
            )}
        >
            <GlowCard
                className={cn(
                    "h-full p-5 transition",
                    selected &&
                        "border-cyan-400/60 bg-cyan-50/80 shadow-cyan-200/70 dark:border-cyan-300/50 dark:bg-cyan-300/10",
                )}
            >
                <div className="flex items-start gap-4">
                    <div
                        className={cn(
                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                            selected
                                ? "bg-cyan-300 text-slate-950"
                                : "bg-cyan-300/10 text-cyan-600 dark:text-cyan-300",
                        )}
                    >
                        <Icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
                            {t(`${template.id}.domain`)}
                        </p>
                        <h3 className="mt-2 text-base font-semibold text-slate-950 dark:text-white">
                            {t(`${template.id}.title`)}
                        </h3>
                        <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {t(`${template.id}.description`)}
                        </p>
                    </div>
                </div>
            </GlowCard>
        </button>
    );
}

function ChoiceGroup({
    label,
    options,
    value,
    onChange,
    namespace,
}: {
    label: string;
    options: Array<{ key: string; value: number }>;
    value: number;
    onChange: (value: number) => void;
    namespace: string;
}) {
    const t = useTranslations("demo.options");

    return (
        <div>
            <p className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                {label}
            </p>
            <div className="grid gap-2 sm:grid-cols-2">
                {options.map((option) => (
                    <button
                        key={option.key}
                        type="button"
                        onClick={() => onChange(option.value)}
                        className={cn(
                            "rounded-xl border px-4 py-3 text-left text-sm transition",
                            value === option.value
                                ? "border-cyan-400 bg-cyan-50 text-slate-950 dark:border-cyan-300/60 dark:bg-cyan-300/10 dark:text-cyan-100"
                                : "border-slate-200 bg-white/70 text-slate-600 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400",
                        )}
                    >
                        {t(`${namespace}.${option.key}`)}
                    </button>
                ))}
            </div>
        </div>
    );
}

function FlowMap({ template }: { template: FlowTemplate }) {
    const t = useTranslations("demo");

    return (
        <GlowCard className="p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-700 dark:text-violet-300">
                    <Layers3 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {t("flowMap.title")}
                </h3>
            </div>

            <div className="space-y-3">
                {template.stages.map((stage, index) => (
                    <div key={stage} className="flex items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/10 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                            {index + 1}
                        </div>
                        <div className="flex-1 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
                            {t(`templates.${template.id}.stages.${stage}`)}
                        </div>
                    </div>
                ))}
            </div>
        </GlowCard>
    );
}

function FieldAndSignalCards({ template }: { template: FlowTemplate }) {
    const t = useTranslations("demo");

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            <GlowCard className="p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                        <Database className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {t("fields.title")}
                    </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {template.fields.map((field) => (
                        <span
                            key={field}
                            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-950/80 dark:text-slate-400"
                        >
                            {field}
                        </span>
                    ))}
                </div>

                <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {t("fields.description")}
                </p>
            </GlowCard>

            <GlowCard className="p-6">
                <div className="mb-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-700 dark:text-emerald-300">
                        <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {t("signals.title")}
                    </h3>
                </div>

                <div className="space-y-3">
                    {template.signals.map((signal) => (
                        <div key={signal} className="flex gap-3">
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" />
                            <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                                {t(`templates.${template.id}.signals.${signal}`)}
                            </p>
                        </div>
                    ))}
                </div>
            </GlowCard>
        </div>
    );
}

function SyntheticReading({
    template,
    degradation,
    persistence,
    recovery,
    propagation,
}: {
    template: FlowTemplate;
    degradation: string;
    persistence: number;
    recovery: number;
    propagation: number;
}) {
    const t = useTranslations("demo");
    const rpi = estimateRpi(persistence, recovery, propagation);
    const state = getState(rpi);

    const toneClasses = {
        healthy:
            "border-emerald-400/30 bg-emerald-400/10 text-emerald-700 dark:text-emerald-300",
        warning:
            "border-amber-400/30 bg-amber-400/10 text-amber-700 dark:text-amber-300",
        danger: "border-red-400/30 bg-red-400/10 text-red-700 dark:text-red-300",
        critical:
            "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-700 dark:text-fuchsia-300",
    }[state.tone];

    return (
        <GlowCard className="p-6 lg:p-8">
            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                    <WandSparkles className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    {t("reading.title")}
                </h2>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 lg:p-8 dark:border-slate-800 dark:bg-slate-950/70">
                <div className="grid gap-8 lg:grid-cols-[180px_1fr] lg:items-center">
                    <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-300/10 text-cyan-700 shadow-2xl shadow-cyan-200/40 dark:text-cyan-300 dark:shadow-cyan-950/20">
                        <ShieldAlert className="h-20 w-20" />
                    </div>

                    <div>
                        <div className={cn("inline-flex rounded-xl border px-4 py-2 text-sm font-semibold", toneClasses)}>
                            {t(`states.${state.key}.label`)}
                        </div>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-700 dark:text-slate-200">
                            {t.rich("reading.summary", {
                                template: () => (
                                    <span className="font-medium text-cyan-700 dark:text-cyan-300">
                                        {t(`templates.${template.id}.title`)}
                                    </span>
                                ),
                                degradation: () => (
                                    <span className="font-medium text-cyan-700 dark:text-cyan-300">
                                        {t(`templates.${template.id}.degradationOptions.${degradation}`).toLowerCase()}
                                    </span>
                                ),
                                context: () => (
                                    <span className="font-medium text-cyan-700 dark:text-cyan-300">
                                        {t(`templates.${template.id}.defaultContext`)}
                                    </span>
                                ),
                            })}
                        </p>

                        <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {t(`states.${state.key}.description`)}
                        </p>

                        <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-300/10 px-5 py-4">
                            <div className="flex gap-3">
                                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-300" />
                                <p className="text-sm leading-6 text-cyan-900 dark:text-cyan-100">
                                    {t("reading.disclaimer")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <ReadingTag icon={ShieldCheck} label={t("reading.tags.state")} value={t(`states.${state.key}.short`)} />
                    <ReadingTag icon={TriangleAlert} label={t("reading.tags.rpi")} value={`${rpi}/100`} />
                    <ReadingTag icon={Clock3} label={t("reading.tags.persistence")} value={t("reading.tags.days", { count: persistence })} />
                    <ReadingTag icon={GitBranch} label={t("reading.tags.context")} value={t(`templates.${template.id}.defaultContext`)} />
                </div>
            </div>
        </GlowCard>
    );
}

function ReadingTag({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                <Icon className="h-4 w-4 text-cyan-600 dark:text-cyan-300" />
                {label}
            </div>
            <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                {value}
            </p>
        </div>
    );
}

function TimelineAndRpi({ rpi }: { rpi: number }) {
    const t = useTranslations("demo");
    const states = ["normal", "variation", "attention", "degradation"];

    return (
        <GlowCard className="p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10 text-violet-700 dark:text-violet-300">
                    <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {t("timeline.title")}
                </h3>
            </div>

            <div className="grid gap-3 sm:grid-cols-4">
                {states.map((state, index) => {
                    const width = index === 0 || index === 1 ? "100%" : index === 2 ? (rpi >= 34 ? "100%" : "45%") : rpi >= 56 ? "100%" : "25%";

                    return (
                        <div key={state}>
                            <div className="mb-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 text-[10px] dark:border-slate-700">
                                    {index + 1}
                                </span>
                                {t(`timeline.states.${state}`)}
                            </div>
                            <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800">
                                <div
                                    className={cn(
                                        "h-3 rounded-full",
                                        index === 0 && "bg-emerald-400",
                                        index === 1 && "bg-cyan-300",
                                        index === 2 && "bg-amber-400",
                                        index === 3 && "bg-red-400",
                                    )}
                                    style={{ width }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8">
                <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                        {t("timeline.rpiLabel")}
                    </span>
                    <span className="font-semibold text-cyan-700 dark:text-cyan-300">
                        {rpi}/100
                    </span>
                </div>
                <div className="h-4 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div className="h-4 rounded-full bg-cyan-300" style={{ width: `${rpi}%` }} />
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {t("timeline.description")}
                </p>
            </div>
        </GlowCard>
    );
}

function NextStepsCard({ template }: { template: FlowTemplate }) {
    const t = useTranslations("demo");
    const items = ["validateColumns", "confirmFields", "runHistoricalReading", "compareSynthetic"];

    return (
        <GlowCard className="p-6">
            <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                    <Search className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {t("nextSteps.title")}
                </h3>
            </div>

            <div className="divide-y divide-slate-200 dark:divide-slate-800">
                {items.map((item) => (
                    <div key={item} className="flex gap-3 py-4 first:pt-0 last:pb-0">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-violet-700 dark:text-violet-300" />
                        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                            {t(`nextSteps.items.${item}`)}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-950/70">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-500">
                    {t("nextSteps.selectedTemplate")}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {t(`templates.${template.id}.title`)}
                </p>
            </div>
        </GlowCard>
    );
}

function CTA() {
    const t = useTranslations("demo.cta");

    return (
        <GlowCard className="p-6 lg:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                    <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                        {t("eyebrow")}
                    </p>

                    <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                        {t("title")}
                    </h2>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                        {t("description")}
                    </p>
                </div>

                <Link
                    href="/contact"
                    className="group inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                    {t("button")}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Link>
            </div>
        </GlowCard>
    );
}

function HowItWorks() {
    const t = useTranslations("demo.howItWorks");
    const steps = [
        { icon: Layers3, key: "chooseTemplate" },
        { icon: Database, key: "seeFields" },
        { icon: WandSparkles, key: "generateReading" },
    ];

    return (
        <section>
            <SectionHeader
                eyebrow={t("eyebrow")}
                title={t("title")}
                description={t("description")}
            />

            <div className="grid gap-4 lg:grid-cols-3">
                {steps.map((step) => {
                    const Icon = step.icon;

                    return (
                        <GlowCard key={step.key} className="p-5">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                                <Icon className="h-6 w-6" />
                            </div>
                            <h3 className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-100">
                                {t(`steps.${step.key}.title`)}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                {t(`steps.${step.key}.description`)}
                            </p>
                        </GlowCard>
                    );
                })}
            </div>
        </section>
    );
}

export default function DemonstracaoPage() {
    const t = useTranslations("demo");
    const [selectedTemplateId, setSelectedTemplateId] = useState(flowTemplates[0].id);
    const [persistence, setPersistence] = useState(4);
    const [recovery, setRecovery] = useState(38);
    const [propagation, setPropagation] = useState(20);
    const [selectedDegradationIndex, setSelectedDegradationIndex] = useState(0);

    const selectedTemplate = useMemo(
        () => flowTemplates.find((template) => template.id === selectedTemplateId) ?? flowTemplates[0],
        [selectedTemplateId],
    );

    const selectedDegradation = selectedTemplate.degradationOptions[selectedDegradationIndex] ?? selectedTemplate.degradationOptions[0];
    const rpi = estimateRpi(persistence, recovery, propagation);

    return (
        <OhrlyPageShell>
            <section className="mx-auto px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full border border-cyan-700/15 bg-cyan-50 px-3 py-1 text-xs text-slate-600 dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-slate-300">
                            <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                            {t("hero.badge")}
                        </p>

                        <h1 className="mt-5 max-w-5xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl dark:text-white">
                            {t("hero.title")}
                        </h1>

                        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                            {t("hero.description")}
                        </p>
                    </div>

                    <div className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2 lg:min-w-[460px] dark:text-slate-400">
                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                            <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                            {t("hero.chips.noSensitiveData")}
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                            <MessageSquareText className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                            {t("hero.chips.demoReading")}
                        </div>
                    </div>
                </div>

                <div className="mt-10">
                    <HowItWorks />
                </div>

                <div className="mt-10">
                    <SectionHeader
                        eyebrow={t("templateSection.eyebrow")}
                        title={t("templateSection.title")}
                        description={t("templateSection.description")}
                    />

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {flowTemplates.map((template) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                selected={selectedTemplate.id === template.id}
                                onSelect={() => {
                                    setSelectedTemplateId(template.id);
                                    setSelectedDegradationIndex(0);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                    <div>
                        <SectionHeader
                            eyebrow={t("contractSection.eyebrow")}
                            title={t("contractSection.title")}
                            description={t("contractSection.description")}
                        />
                        <FlowMap template={selectedTemplate} />
                    </div>

                    <div className="lg:pt-[108px]">
                        <FieldAndSignalCards template={selectedTemplate} />
                    </div>
                </div>

                <div className="mt-10">
                    <SectionHeader
                        eyebrow={t("scenarioSection.eyebrow")}
                        title={t("scenarioSection.title")}
                        description={t("scenarioSection.description")}
                    />

                    <GlowCard className="p-6 lg:p-8">
                        <div className="grid gap-8 lg:grid-cols-2">
                            <div>
                                <p className="mb-3 text-sm font-medium text-slate-900 dark:text-slate-100">
                                    {t("scenarioSection.degradationType")}
                                </p>
                                <div className="space-y-2">
                                    {selectedTemplate.degradationOptions.map((option, index) => (
                                        <button
                                            key={option}
                                            type="button"
                                            onClick={() => setSelectedDegradationIndex(index)}
                                            className={cn(
                                                "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition",
                                                selectedDegradationIndex === index
                                                    ? "border-cyan-400 bg-cyan-50 text-slate-950 dark:border-cyan-300/60 dark:bg-cyan-300/10 dark:text-cyan-100"
                                                    : "border-slate-200 bg-white/70 text-slate-600 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400",
                                            )}
                                        >
                                            {t(`templates.${selectedTemplate.id}.degradationOptions.${option}`)}
                                            <ChevronRight className="h-4 w-4" />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-7">
                                <ChoiceGroup
                                    label={t("scenarioSection.persistenceQuestion")}
                                    options={persistenceOptions}
                                    value={persistence}
                                    onChange={setPersistence}
                                    namespace="persistence"
                                />

                                <ChoiceGroup
                                    label={t("scenarioSection.recoveryQuestion")}
                                    options={recoveryOptions}
                                    value={recovery}
                                    onChange={setRecovery}
                                    namespace="recovery"
                                />

                                <ChoiceGroup
                                    label={t("scenarioSection.propagationQuestion")}
                                    options={propagationOptions}
                                    value={propagation}
                                    onChange={setPropagation}
                                    namespace="propagation"
                                />
                            </div>
                        </div>
                    </GlowCard>
                </div>

                <div className="mt-10">
                    <SyntheticReading
                        template={selectedTemplate}
                        degradation={selectedDegradation}
                        persistence={persistence}
                        recovery={recovery}
                        propagation={propagation}
                    />
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <TimelineAndRpi rpi={rpi} />
                    <NextStepsCard template={selectedTemplate} />
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <GlowCard className="p-5">
                        <Metric icon={Layers3} value={selectedTemplate.stages.length.toString()} label={t("metrics.stages")} />
                    </GlowCard>
                    <GlowCard className="p-5">
                        <Metric icon={Database} value={selectedTemplate.fields.length.toString()} label={t("metrics.fields")} />
                    </GlowCard>
                    <GlowCard className="p-5">
                        <Metric icon={BarChart3} value={selectedTemplate.signals.length.toString()} label={t("metrics.signals")} />
                    </GlowCard>
                    <GlowCard className="p-5">
                        <Metric icon={CircleDollarSign} value="0" label={t("metrics.realData")} />
                    </GlowCard>
                </div>

                <div className="mt-8">
                    <CTA />
                </div>
            </section>
        </OhrlyPageShell>
    );
}

function Metric({
    icon: Icon,
    value,
    label,
}: {
    icon: React.ElementType;
    value: string;
    label: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <p className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
                    {value}
                </p>
                <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
                    {label}
                </p>
            </div>
        </div>
    );
}
