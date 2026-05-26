"use client";

import OhrlyPageShell from "@/components/layout/OhrlyPageShell";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Clock3,
    Mail,
    MessageSquare,
    ShieldCheck,
    Sparkles,
    UploadCloud,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

type FormState = {
    name: string;
    email: string;
    company: string;
    role: string;
    flowType: string;
    message: string;
};

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
                "dark:before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%)]",
                className,
            )}
        >
            <div className="relative z-10">{children}</div>
        </div>
    );
}

function Field({
    label,
    children,
}: {
    label: string;
    children: React.ReactNode;
}) {
    return (
        <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {label}
            </span>

            {children}
        </label>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                "h-12 rounded-xl border px-4 text-sm outline-none transition",
                "border-slate-200 bg-white/80 text-slate-950 placeholder:text-slate-400",
                "focus:border-cyan-600/50 focus:bg-white focus:ring-4 focus:ring-cyan-300/20",
                "dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600",
                "dark:focus:border-cyan-300/50 dark:focus:bg-slate-950 dark:focus:ring-cyan-300/10",
                props.className,
            )}
        />
    );
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <select
            {...props}
            className={cn(
                "h-12 rounded-xl border px-4 text-sm outline-none transition",
                "border-slate-200 bg-white/80 text-slate-950",
                "focus:border-cyan-600/50 focus:bg-white focus:ring-4 focus:ring-cyan-300/20",
                "dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100",
                "dark:focus:border-cyan-300/50 dark:focus:bg-slate-950 dark:focus:ring-cyan-300/10",
                props.className,
            )}
        />
    );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <textarea
            {...props}
            className={cn(
                "min-h-36 resize-none rounded-xl border px-4 py-3 text-sm leading-6 outline-none transition",
                "border-slate-200 bg-white/80 text-slate-950 placeholder:text-slate-400",
                "focus:border-cyan-600/50 focus:bg-white focus:ring-4 focus:ring-cyan-300/20",
                "dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-100 dark:placeholder:text-slate-600",
                "dark:focus:border-cyan-300/50 dark:focus:bg-slate-950 dark:focus:ring-cyan-300/10",
                props.className,
            )}
        />
    );
}

function ContactForm() {
    const t = useTranslations("contact.form");

    const [form, setForm] = useState<FormState>({
        name: "",
        email: "",
        company: "",
        role: "",
        flowType: "",
        message: "",
    });

    function updateField(field: keyof FormState, value: string) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    }

    return (
        <GlowCard className="p-6 lg:p-8">
            <div className="mb-6 border-b border-slate-200 pb-5 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />

                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {t("title")}
                    </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {t("description")}
                </p>
            </div>

            <form
                className="grid gap-5"
                action="https://formspree.io/f/mkoygpnk"
                method="POST"
            >
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t("name")}>
                        <Input
                            name="name"
                            placeholder={t("namePlaceholder")}
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            required
                        />
                    </Field>

                    <Field label={t("email")}>
                        <Input
                            name="email"
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            value={form.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            required
                        />
                    </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label={t("company")}>
                        <Input
                            name="company"
                            placeholder={t("companyPlaceholder")}
                            value={form.company}
                            onChange={(event) => updateField("company", event.target.value)}
                        />
                    </Field>

                    <Field label={t("role")}>
                        <Select
                            name="role"
                            value={form.role}
                            onChange={(event) => updateField("role", event.target.value)}
                        >
                            <option value="">{t("rolePlaceholder")}</option>
                            <option value="produto">{t("roleOptions.product")}</option>
                            <option value="engenharia">{t("roleOptions.engineering")}</option>
                            <option value="operacoes">{t("roleOptions.operations")}</option>
                            <option value="dados">{t("roleOptions.data")}</option>
                            <option value="lideranca">{t("roleOptions.leadership")}</option>
                            <option value="outro">{t("roleOptions.other")}</option>
                        </Select>
                    </Field>
                </div>

                <Field label={t("flowType")}>
                    <Select
                        name="flowType"
                        value={form.flowType}
                        onChange={(event) => updateField("flowType", event.target.value)}
                    >
                        <option value="">{t("rolePlaceholder")}</option>
                        <option value="checkout">{t("flowOptions.checkout")}</option>
                        <option value="pagamento">{t("flowOptions.payment")}</option>
                        <option value="entrega">{t("flowOptions.delivery")}</option>
                        <option value="carrinho">{t("flowOptions.cartRecovery")}</option>
                        <option value="atendimento">{t("flowOptions.support")}</option>
                        <option value="onboarding">{t("flowOptions.onboarding")}</option>
                        <option value="chatbot">{t("flowOptions.chatbot")}</option>
                        <option value="outro">{t("flowOptions.other")}</option>
                    </Select>
                </Field>

                <Field label={t("message")}>
                    <Textarea
                        name="message"
                        placeholder={t("messagePlaceholder")}
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        required
                    />
                </Field>

                <input type="hidden" name="source" value={t("source")} />

                <button
                    type="submit"
                    className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                    {t("submit")}
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

                <p className="text-xs leading-5 text-slate-500 dark:text-slate-500">
                    {t("privacy")}
                </p>
            </form>
        </GlowCard>
    );
}

function InfoPanel() {
    const t = useTranslations("contact.infoPanel");

    const items = [
        {
            icon: BarChart3,
            title: t("historicalData.title"),
            description: t("historicalData.description"),
        },
        {
            icon: Clock3,
            title: t("criticalFlow.title"),
            description: t("criticalFlow.description"),
        },
        {
            icon: ShieldCheck,
            title: t("noRootCausePromise.title"),
            description: t("noRootCausePromise.description"),
        },
        {
            icon: UploadCloud,
            title: t("noIntegration.title"),
            description: t("noIntegration.description"),
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <GlowCard key={item.title} className="p-5">
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-600 dark:text-cyan-300">
                                <Icon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                                    {item.title}
                                </h3>

                                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </GlowCard>
                );
            })}
        </div>
    );
}

export default function FaleConoscoPage() {
    const t = useTranslations("contact");

    const bullets = [
        t("bullets.one"),
        t("bullets.two"),
        t("bullets.three"),
    ];

    return (
        <OhrlyPageShell>
            <section className="mx-auto grid gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-14">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-700/15 bg-cyan-50 px-3 py-1 text-xs text-slate-600 dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-slate-300">
                        <MessageSquare className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                        {t("badge")}
                    </div>

                    <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 sm:text-6xl dark:text-white">
                        {t("title")}
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg dark:text-slate-300">
                        {t("description")}
                    </p>

                    <div className="mt-8 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
                        {bullets.map((bullet) => (
                            <p key={bullet} className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                                {bullet}
                            </p>
                        ))}
                    </div>

                    <div className="mt-8 rounded-2xl border border-slate-200 bg-white/70 p-5 shadow-sm shadow-slate-200/60 dark:border-cyan-300/15 dark:bg-slate-950/60 dark:shadow-none">
                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />

                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                                {t("emailBox.title")}
                            </p>
                        </div>

                        <a
                            href={`mailto:${t("emailBox.email")}`}
                            className="mt-3 inline-flex text-sm text-cyan-600 transition hover:text-cyan-700 dark:text-cyan-300 dark:hover:text-cyan-200"
                        >
                            {t("emailBox.email")}
                        </a>
                    </div>
                </div>

                <ContactForm />
            </section>

            <section className="mx-auto px-5 pb-16 sm:px-8 lg:px-10">
                <InfoPanel />
            </section>
        </OhrlyPageShell>
    );
}