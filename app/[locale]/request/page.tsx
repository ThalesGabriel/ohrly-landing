"use client";

import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
    Activity,
    ArrowRight,
    CheckCircle2,
    ClipboardList,
    Clock3,
    Gauge,
    Info,
    Layers3,
    LineChart,
    LockKeyhole,
    Mail,
    MessageSquareWarning,
    Plus,
    RefreshCw,
    Send,
    Sparkles,
    Target,
    Trash2,
    TrendingDown,
    UserRound,
    WandSparkles,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/SiteHeader";

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

type SyntheticSignalId =
    | "approval_time_growth"
    | "retry_growth"
    | "completion_drop"
    | "human_handoff_growth"
    | "unresolved_messages"
    | "slow_recovery"
    | "intermediate_queue";

type SyntheticSignal = {
    id: SyntheticSignalId;
    labelKey: string;
    icon: React.ElementType;
};

type ImportantField = {
    id: string;
    name: string;
    role: string;
};

const signalOptions: SyntheticSignal[] = [
    {
        id: "approval_time_growth",
        labelKey: "signals.approvalTimeGrowth",
        icon: Clock3,
    },
    {
        id: "retry_growth",
        labelKey: "signals.retryGrowth",
        icon: RefreshCw,
    },
    {
        id: "completion_drop",
        labelKey: "signals.completionDrop",
        icon: TrendingDown,
    },
    {
        id: "human_handoff_growth",
        labelKey: "signals.humanHandoffGrowth",
        icon: UserRound,
    },
    {
        id: "unresolved_messages",
        labelKey: "signals.unresolvedMessages",
        icon: MessageSquareWarning,
    },
    {
        id: "slow_recovery",
        labelKey: "signals.slowRecovery",
        icon: Gauge,
    },
    {
        id: "intermediate_queue",
        labelKey: "signals.intermediateQueue",
        icon: Layers3,
    },
];

function getDefaultFields(t: ReturnType<typeof useTranslations>): ImportantField[] {
    return [
        {
            id: "field_1",
            name: t("defaultFields.orderId.name"),
            role: t("defaultFields.orderId.role"),
        },
        {
            id: "field_2",
            name: t("defaultFields.paymentApprovedAt.name"),
            role: t("defaultFields.paymentApprovedAt.role"),
        },
        {
            id: "field_3",
            name: t("defaultFields.paymentMethod.name"),
            role: t("defaultFields.paymentMethod.role"),
        },
    ];
}

function makeFieldId() {
    return `field_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function FormLabel({ children }: { children: React.ReactNode }) {
    return (
        <label className="text-sm font-medium text-slate-800 dark:text-slate-200">
            {children}
        </label>
    );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                "h-12 w-full rounded-xl border px-4 text-sm outline-none transition",
                "border-slate-200 bg-white/80 text-slate-950 placeholder:text-slate-400",
                "focus:border-cyan-500/60 focus:bg-white focus:ring-4 focus:ring-cyan-500/10",
                "dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600",
                "dark:focus:border-cyan-300/50 dark:focus:bg-slate-950 dark:focus:ring-cyan-300/10",
                props.className,
            )}
        />
    );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn(
                "min-h-28 w-full resize-y rounded-xl border px-4 py-3 text-sm outline-none transition",
                "border-slate-200 bg-white/80 text-slate-950 placeholder:text-slate-400",
                "focus:border-cyan-500/60 focus:bg-white focus:ring-4 focus:ring-cyan-500/10",
                "dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600",
                "dark:focus:border-cyan-300/50 dark:focus:bg-slate-950 dark:focus:ring-cyan-300/10",
                props.className,
            )}
        />
    );
}

function HeroIllustration() {
    return (
        <div className="relative hidden min-h-[260px] lg:block">
            <div className="absolute right-6 top-2 w-64 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-cyan-950/20">
                <div className="h-3 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mt-6 space-y-3">
                    <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-5/6 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 rounded-full bg-cyan-200 dark:bg-cyan-300/30" />
                    <div className="h-3 w-3/4 rounded-full bg-cyan-200 dark:bg-cyan-300/30" />
                    <div className="h-3 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />
                </div>
                <div className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 dark:bg-cyan-300 dark:text-slate-950">
                    <CheckCircle2 className="h-5 w-5" />
                </div>
            </div>

            <div className="absolute right-[250px] top-16 w-48 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/80 dark:shadow-cyan-950/20">
                <div className="h-3 w-14 rounded-full bg-slate-200 dark:bg-slate-800" />
                <div className="mt-8 flex h-20 items-end gap-2">
                    {[34, 46, 39, 62, 70, 66, 82].map((height, index) => (
                        <div
                            key={index}
                            className="flex-1 rounded-t-lg bg-cyan-500/80 dark:bg-cyan-300/80"
                            style={{ height: `${height}%` }}
                        />
                    ))}
                </div>
            </div>

            <div className="absolute right-[160px] top-[112px] w-52 rounded-3xl border border-slate-200 bg-white/95 p-5 shadow-2xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-cyan-950/20">
                <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 rounded-full bg-[conic-gradient(from_0deg,#2563eb_0_55%,#fb923c_55%_78%,#e2e8f0_78%_100%)] dark:bg-[conic-gradient(from_0deg,#67e8f9_0_55%,#fb923c_55%_78%,#334155_78%_100%)]">
                        <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-950" />
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800" />
                        <div className="h-3 w-2/3 rounded-full bg-slate-200 dark:bg-slate-800" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function Stepper() {
    const t = useTranslations("syntheticRequest");

    const steps = [
        t("steps.describeFlow"),
        t("steps.indicateSignals"),
        t("steps.receiveReport"),
    ];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-2 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10">
            <div className="grid gap-2 md:grid-cols-3">
                {steps.map((step, index) => {
                    const active = index === 0;

                    return (
                        <div
                            key={step}
                            className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                                active
                                    ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300"
                                    : "text-slate-500 dark:text-slate-400",
                            )}
                        >
                            <span
                                className={cn(
                                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-bold",
                                    active
                                        ? "border-cyan-600 bg-cyan-600 text-white dark:border-cyan-300 dark:bg-cyan-300 dark:text-slate-950"
                                        : "border-slate-300 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400",
                                )}
                            >
                                {index + 1}
                            </span>
                            {step}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function SignalChip({
    signal,
    label,
    selected,
    onToggle,
}: {
    signal: SyntheticSignal;
    label: string;
    selected: boolean;
    onToggle: () => void;
}) {
    const Icon = signal.icon;

    return (
        <button
            type="button"
            onClick={onToggle}
            className={cn(
                "inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition",
                selected
                    ? "border-cyan-500 bg-cyan-50 text-cyan-700 shadow-sm dark:border-cyan-300/50 dark:bg-cyan-300/10 dark:text-cyan-300"
                    : "border-slate-200 bg-white/70 text-slate-600 hover:border-cyan-300 hover:bg-cyan-50/60 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5 dark:hover:text-cyan-300",
            )}
        >
            <Icon className="h-4 w-4" />
            {label}
        </button>
    );
}

function ImportantFieldsEditor({
    fields,
    onChange,
    t,
}: {
    fields: ImportantField[];
    onChange: (fields: ImportantField[]) => void;
    t: ReturnType<typeof useTranslations>;
}) {
    function updateField(id: string, key: keyof ImportantField, value: string) {
        onChange(
            fields.map((field) =>
                field.id === id ? { ...field, [key]: value } : field,
            ),
        );
    }

    function removeField(id: string) {
        onChange(fields.filter((field) => field.id !== id));
    }

    function addField() {
        onChange([
            ...fields,
            {
                id: makeFieldId(),
                name: "",
                role: "",
            },
        ]);
    }

    return (
        <div>
            <div className="hidden grid-cols-[0.8fr_1.2fr_40px] gap-3 px-1 pb-2 text-xs font-medium text-slate-500 dark:text-slate-500 md:grid">
                <span>{t("form.fieldColumn")}</span>
                <span>{t("form.fieldRoleColumn")}</span>
                <span />
            </div>

            <div className="grid gap-3">
                {fields.map((field) => (
                    <div
                        key={field.id}
                        className="grid gap-3 md:grid-cols-[0.8fr_1.2fr_40px]"
                    >
                        <TextInput
                            name="fields[]"
                            value={field.name}
                            onChange={(event) =>
                                updateField(field.id, "name", event.target.value)
                            }
                            placeholder={t("form.fieldNamePlaceholder")}
                        />
                        <TextInput
                            name="fieldRoles[]"
                            value={field.role}
                            onChange={(event) =>
                                updateField(field.id, "role", event.target.value)
                            }
                            placeholder={t("form.fieldRolePlaceholder")}
                        />
                        <button
                            type="button"
                            onClick={() => removeField(field.id)}
                            className="inline-flex h-12 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white/70 text-slate-400 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-500 dark:hover:border-red-400/40 dark:hover:bg-red-950/20 dark:hover:text-red-300"
                            aria-label={t("form.removeFieldAria")}
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            <button
                type="button"
                onClick={addField}
                className="mt-4 inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-4 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-100 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-300 dark:hover:bg-cyan-300/15"
            >
                <Plus className="h-4 w-4" />
                {t("form.addField")}
            </button>
        </div>
    );
}

function RequestFormCard() {
    const t = useTranslations("syntheticRequest");

    const [selectedSignals, setSelectedSignals] = useState<SyntheticSignalId[]>([
        "approval_time_growth",
        "retry_growth",
        "slow_recovery",
    ]);
    const [fields, setFields] = useState<ImportantField[]>(() => getDefaultFields(t));
    const [submitted, setSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function toggleSignal(signalId: SyntheticSignalId) {
        setSelectedSignals((current) =>
            current.includes(signalId)
                ? current.filter((id) => id !== signalId)
                : [...current, signalId],
        );
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setSubmitted(false);
        setSubmitError(null);
        setIsSubmitting(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        formData.append("_subject", t("meta.formspreeSubject"));

        formData.append(
            "selectedSignalLabels",
            selectedSignals
                .map((signalId) => {
                    const signal = signalOptions.find((item) => item.id === signalId);
                    return signal ? t(signal.labelKey) : null;
                })
                .filter(Boolean)
                .join(", "),
        );

        formData.append(
            "importantFieldsJson",
            JSON.stringify(
                fields.map((field) => ({
                    name: field.name,
                    role: field.role,
                })),
                null,
                2,
            ),
        );

        try {
            const response = await fetch("https://formspree.io/f/mkoygpnk", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(t("form.errorMessage"));
            }

            setSubmitted(true);
            form.reset();
        } catch {
            setSubmitError(t("form.errorMessage"));
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form
            action="https://formspree.io/f/mkoygpnk"
            method="POST"
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white/80 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/20"
        >
            <div className="border-b border-slate-200 p-6 dark:border-slate-800 lg:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {t("form.title")}
                </h2>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {t("form.description")}
                </p>
            </div>

            <div className="grid gap-8 p-6 lg:p-8">
                <section className="grid gap-5 md:grid-cols-2">
                    <div className="grid gap-2">
                        <FormLabel>{t("form.flowName")}</FormLabel>
                        <TextInput
                            name="flowName"
                            placeholder={t("form.flowNamePlaceholder")}
                            required
                        />
                    </div>

                    <div className="grid gap-2 md:row-span-2">
                        <FormLabel>{t("form.descriptionLabel")}</FormLabel>
                        <TextArea
                            name="description"
                            placeholder={t("form.descriptionPlaceholder")}
                            required
                        />
                    </div>

                    <div className="grid gap-2">
                        <FormLabel>{t("form.affectedContext")}</FormLabel>
                        <TextInput
                            name="affectedContext"
                            placeholder={t("form.affectedContextPlaceholder")}
                            required
                        />
                    </div>

                    <div className="grid gap-2 md:col-span-2">
                        <FormLabel>{t("form.simulationGoal")}</FormLabel>
                        <TextArea
                            name="simulationGoal"
                            placeholder={t("form.simulationGoalPlaceholder")}
                            required
                        />
                    </div>
                </section>

                <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                            {t("form.signalsTitle")}
                        </h3>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                            {t("form.signalsDescription")}
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {signalOptions.map((signal) => (
                            <SignalChip
                                key={signal.id}
                                signal={signal}
                                label={t(signal.labelKey)}
                                selected={selectedSignals.includes(signal.id)}
                                onToggle={() => toggleSignal(signal.id)}
                            />
                        ))}
                    </div>

                    {selectedSignals.map((signalId) => (
                        <input key={signalId} type="hidden" name="signals[]" value={signalId} />
                    ))}
                </section>

                <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
                    <div className="mb-4">
                        <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                            {t("form.fieldsTitle")}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                            {t("form.fieldsDescription")}
                        </p>
                    </div>

                    <ImportantFieldsEditor fields={fields} onChange={setFields} t={t} />
                </section>

                <section className="border-t border-slate-200 pt-8 dark:border-slate-800">
                    <h3 className="text-base font-semibold text-slate-950 dark:text-white">
                        {t("form.emailSectionTitle")}
                    </h3>

                    <div className="mt-4 grid gap-2">
                        <FormLabel>{t("form.email")}</FormLabel>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-600" />
                            <TextInput
                                name="email"
                                type="email"
                                placeholder={t("form.emailPlaceholder")}
                                className="pl-11"
                                required
                            />
                        </div>
                    </div>

                    <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-4 dark:border-cyan-300/25 dark:bg-cyan-300/10">
                        <div className="flex gap-3">
                            <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-300" />
                            <p className="text-sm leading-6 text-cyan-900 dark:text-cyan-100">
                                {t("form.syntheticDisclaimer")}
                            </p>
                        </div>
                    </div>

                    {submitted ? (
                        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-400/30 dark:bg-emerald-400/10">
                            <div className="flex gap-3">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                                <p className="text-sm leading-6 text-emerald-900 dark:text-emerald-100">
                                    {t("form.successMessage")}
                                </p>
                            </div>
                        </div>
                    ) : null}

                    {submitError ? (
                        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 dark:border-red-400/30 dark:bg-red-400/10">
                            <div className="flex gap-3">
                                <Info className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-300" />
                                <p className="text-sm leading-6 text-red-900 dark:text-red-100">
                                    {submitError}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </section>
            </div>

            <div className="grid gap-3 border-t border-slate-200 p-6 dark:border-slate-800 sm:grid-cols-[1fr_1fr] lg:p-8">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 dark:bg-cyan-300 dark:text-slate-950 dark:hover:bg-cyan-200"
                >
                    {isSubmitting ? t("form.submitting") : t("form.submit")}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>

                <Link
                    href="/reports"
                    className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white/70 px-5 text-sm font-semibold text-cyan-700 transition hover:border-cyan-300 hover:bg-cyan-50 dark:border-slate-800 dark:bg-slate-950/70 dark:text-cyan-300 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/5"
                >
                    {t("form.viewExample")}
                    <Send className="h-4 w-4" />
                </Link>
            </div>
        </form>
    );
}

function BenefitItem({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
}) {
    return (
        <div className="flex gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-cyan-600 dark:border-slate-800 dark:bg-slate-950 dark:text-cyan-300">
                <Icon className="h-6 w-6" />
            </div>
            <div>
                <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
                    {title}
                </h3>
                <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {description}
                </p>
            </div>
        </div>
    );
}

function OutputPreview() {
    const t = useTranslations("syntheticRequest");

    return (
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/70">
            <p className="text-sm font-medium text-cyan-600 dark:text-cyan-300">
                {t("outputPreview.label")}
            </p>
            <h3 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">
                {t("outputPreview.title")}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                {t("outputPreview.description")}
            </p>

            <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-orange-700 dark:border-orange-400/30 dark:bg-orange-400/10 dark:text-orange-300">
                    <p className="text-xs font-medium">{t("outputPreview.stateLabel")}</p>
                    <p className="mt-1 text-sm font-bold leading-5">
                        {t("outputPreview.stateValue")}
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs font-medium">{t("outputPreview.rpiLabel")}</p>
                    <p className="mt-1 text-sm font-bold leading-5">
                        <span className="text-orange-600 dark:text-orange-300">58</span>/100
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                    <p className="text-xs font-medium">{t("outputPreview.contextLabel")}</p>
                    <p className="mt-1 text-sm font-bold leading-5">
                        {t("outputPreview.contextValue")}
                    </p>
                </div>
            </div>

            <div className="mt-5">
                <div className="relative h-2 rounded-full bg-gradient-to-r from-emerald-500 via-orange-400 to-red-500">
                    <div className="absolute left-[52%] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-4 border-white bg-orange-500 shadow-lg dark:border-slate-950" />
                </div>
                <div className="mt-3 flex justify-between text-xs text-slate-500 dark:text-slate-500">
                    <span>{t("outputPreview.normal")}</span>
                    <span>{t("outputPreview.attention")}</span>
                    <span>{t("outputPreview.degradation")}</span>
                </div>
            </div>
        </div>
    );
}

function SidePanel() {
    const t = useTranslations("syntheticRequest");

    const benefits = [
        {
            icon: LineChart,
            title: t("sidePanel.benefits.syntheticReading.title"),
            description: t("sidePanel.benefits.syntheticReading.description"),
        },
        {
            icon: Target,
            title: t("sidePanel.benefits.observableSignals.title"),
            description: t("sidePanel.benefits.observableSignals.description"),
        },
        {
            icon: Activity,
            title: t("sidePanel.benefits.operationalState.title"),
            description: t("sidePanel.benefits.operationalState.description"),
        },
        {
            icon: Mail,
            title: t("sidePanel.benefits.emailReport.title"),
            description: t("sidePanel.benefits.emailReport.description"),
        },
    ];

    const idealItems = [
        t("sidePanel.idealItems.describeFlow"),
        t("sidePanel.idealItems.generateSyntheticData"),
        t("sidePanel.idealItems.receiveByEmail"),
    ];

    return (
        <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/20 lg:p-8">
                <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {t("sidePanel.title")}
                </h2>

                <div className="mt-6 grid gap-6">
                    {benefits.map((benefit) => (
                        <BenefitItem
                            key={benefit.title}
                            icon={benefit.icon}
                            title={benefit.title}
                            description={benefit.description}
                        />
                    ))}
                </div>

                <div className="mt-8">
                    <OutputPreview />
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-white/80 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <h3 className="font-semibold text-slate-950 dark:text-white">
                        {t("sidePanel.idealTitle")}
                    </h3>
                    <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-400">
                        {idealItems.map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
}

function ProcessStrip() {
    const t = useTranslations("syntheticRequest");

    const items = [
        {
            icon: ClipboardList,
            title: t("process.items.youDescribe.title"),
            description: t("process.items.youDescribe.description"),
        },
        {
            icon: WandSparkles,
            title: t("process.items.ohrlySimulates.title"),
            description: t("process.items.ohrlySimulates.description"),
        },
        {
            icon: Mail,
            title: t("process.items.youReceive.title"),
            description: t("process.items.youReceive.description"),
        },
    ];

    return (
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10 lg:p-8">
            <div className="grid gap-6 md:grid-cols-3 md:items-center">
                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div key={item.title} className="relative flex items-center gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-cyan-600 dark:border-slate-800 dark:bg-slate-950 dark:text-cyan-300">
                                <Icon className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-950 dark:text-white">
                                    {item.title}
                                </p>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </div>

                            {index < items.length - 1 ? (
                                <div className="absolute right-3 top-1/2 hidden h-px w-20 border-t border-dashed border-slate-300 dark:border-slate-700 xl:block" />
                            ) : null}
                        </div>
                    );
                })}
            </div>

            <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-500">
                {t("process.closing")}
            </p>
        </div>
    );
}

export default function SyntheticInterpretationRequestPage() {
    const t = useTranslations("syntheticRequest");

    return (
        <div className="min-h-screen bg-slate-50 text-slate-950 dark:bg-[#020b12] dark:text-slate-100">
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] dark:opacity-15" />
                <div className="absolute left-[-16%] top-[-12%] h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-300/10" />
                <div className="absolute bottom-[-20%] right-[-14%] h-[560px] w-[560px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-700/10" />
            </div>

            <div className="relative z-10">
                <SiteHeader />

                <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
                    <section className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-xl border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-sm font-medium text-cyan-700 dark:border-cyan-300/30 dark:bg-cyan-300/10 dark:text-cyan-300">
                                <Sparkles className="h-4 w-4" />
                                {t("hero.badge")}
                            </div>

                            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
                                {t("hero.title")}
                            </h1>

                            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                                {t("hero.description")}
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                                <LockKeyhole className="h-4 w-4" />
                                {t("hero.securityNote")}
                            </div>
                        </div>

                        <HeroIllustration />
                    </section>

                    <section className="mt-10">
                        <Stepper />
                    </section>

                    <section className="mt-6 grid gap-6 lg:grid-cols-[1fr_430px] lg:items-start">
                        <RequestFormCard />
                        <SidePanel />
                    </section>

                    <section className="mt-6">
                        <ProcessStrip />
                    </section>
                </main>
            </div>
        </div>
    );
}