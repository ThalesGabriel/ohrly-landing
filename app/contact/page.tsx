"use client";

import {
    ArrowLeft,
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
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
                "relative overflow-hidden rounded-2xl border border-cyan-300/15 bg-slate-950/70 shadow-2xl shadow-cyan-950/20 backdrop-blur",
                "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_35%)]",
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
            <span className="text-sm font-medium text-slate-200">{label}</span>
            {children}
        </label>
    );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className={cn(
                "h-12 rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition",
                "placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-slate-950 focus:ring-4 focus:ring-cyan-300/10",
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
                "h-12 rounded-xl border border-slate-800 bg-slate-950/70 px-4 text-sm text-slate-100 outline-none transition",
                "focus:border-cyan-300/50 focus:bg-slate-950 focus:ring-4 focus:ring-cyan-300/10",
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
                "min-h-36 resize-none rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition",
                "placeholder:text-slate-600 focus:border-cyan-300/50 focus:bg-slate-950 focus:ring-4 focus:ring-cyan-300/10",
                props.className,
            )}
        />
    );
}

function ContactForm() {
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
            <div className="mb-6 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3">
                    <Sparkles className="h-5 w-5 text-cyan-300" />
                    <p className="text-sm font-semibold text-slate-100">
                        Solicitar uma conversa
                    </p>
                </div>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                    Conte um pouco sobre o fluxo que você gostaria de analisar.
                    A ideia é começar simples: um fluxo crítico, dados históricos e
                    uma leitura comportamental.
                </p>
            </div>

            <form
                className="grid gap-5"
                action="https://formspree.io/f/mkoygpnk"
                method="POST"
            >
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Nome">
                        <Input
                            name="name"
                            placeholder="Seu nome"
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            required
                        />
                    </Field>

                    <Field label="E-mail">
                        <Input
                            name="email"
                            type="email"
                            placeholder="voce@empresa.com"
                            value={form.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            required
                        />
                    </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Empresa">
                        <Input
                            name="company"
                            placeholder="Nome da empresa"
                            value={form.company}
                            onChange={(event) => updateField("company", event.target.value)}
                        />
                    </Field>

                    <Field label="Seu papel">
                        <Select
                            name="role"
                            value={form.role}
                            onChange={(event) => updateField("role", event.target.value)}
                        >
                            <option value="">Selecione uma opção</option>
                            <option value="produto">Produto</option>
                            <option value="engenharia">Engenharia</option>
                            <option value="operacoes">Operações</option>
                            <option value="dados">Dados / Analytics</option>
                            <option value="lideranca">Liderança</option>
                            <option value="outro">Outro</option>
                        </Select>
                    </Field>
                </div>

                <Field label="Qual fluxo você gostaria de analisar?">
                    <Select
                        name="flowType"
                        value={form.flowType}
                        onChange={(event) => updateField("flowType", event.target.value)}
                    >
                        <option value="">Selecione uma opção</option>
                        <option value="checkout">Checkout</option>
                        <option value="pagamento">Pagamento</option>
                        <option value="entrega">Entrega</option>
                        <option value="carrinho">Recuperação de carrinho</option>
                        <option value="atendimento">Atendimento / suporte</option>
                        <option value="onboarding">Onboarding</option>
                        <option value="chatbot">Chatbot / canais conversacionais</option>
                        <option value="outro">Outro fluxo crítico</option>
                    </Select>
                </Field>

                <Field label="O que você gostaria de entender nesse fluxo?">
                    <Textarea
                        name="message"
                        placeholder="Ex: quero entender se o checkout começou a perder conversão depois das últimas mudanças, ou se o fluxo de pagamento está ficando mais lento em alguns contextos."
                        value={form.message}
                        onChange={(event) => updateField("message", event.target.value)}
                        required
                    />
                </Field>

                <input
                    type="hidden"
                    name="source"
                    value="Página Fale Conosco - Ohrly"
                />

                <button
                    type="submit"
                    className="group inline-flex h-14 cursor-pointer items-center justify-center gap-3 rounded-xl bg-cyan-300 px-6 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                    Enviar mensagem
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>

                <p className="text-xs leading-5 text-slate-500">
                    Ao enviar, você compartilha essas informações para avaliarmos
                    se faz sentido rodar uma leitura inicial do seu fluxo.
                </p>
            </form>
        </GlowCard>
    );
}

function InfoPanel() {
    const items = [
        {
            icon: BarChart3,
            title: "Comece com dados históricos",
            description:
                "Uma planilha, exportação ou base simples já pode ser suficiente para um primeiro diagnóstico.",
        },
        {
            icon: Clock3,
            title: "Foco em um fluxo crítico",
            description:
                "Checkout, pagamento, entrega, atendimento, onboarding ou outro fluxo que tenha impacto real.",
        },
        {
            icon: ShieldCheck,
            title: "Sem promessa de causa raiz",
            description:
                "A leitura mostra onde o comportamento perdeu consistência e ajuda a qualificar a investigação.",
        },
        {
            icon: UploadCloud,
            title: "Sem integração no primeiro passo",
            description:
                "O piloto pode começar sem mexer na arquitetura da sua operação.",
        },
    ];

    return (
        <div className="grid gap-4 grid-cols-4">
            {items.map((item) => {
                const Icon = item.icon;

                return (
                    <GlowCard key={item.title} className="p-5">
                        <div className="flex gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                                <Icon className="h-5 w-5" />
                            </div>

                            <div>
                                <h3 className="font-semibold text-slate-100">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
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
    return (
        <main className="min-h-screen overflow-x-hidden bg-[#020b12] text-slate-100">
            <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,211,238,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.10),transparent_28%),linear-gradient(180deg,#020b12_0%,#020812_55%,#020b12_100%)]" />
            <div className="pointer-events-none fixed inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:44px_44px]" />

            <div className="relative mx-auto px-5 py-6 sm:px-8 lg:px-10">
                <Header />

                <section className="mx-auto grid gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10 lg:py-20">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-300/5 px-3 py-1 text-xs text-slate-300">
                            <MessageSquare className="h-3.5 w-3.5 text-cyan-300" />
                            Fale conosco
                        </div>

                        <h1 className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl">
                            Vamos aplicar uma leitura Ohrly em um fluxo real seu?
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
                            Conte qual fluxo você quer entender. A partir disso, podemos
                            avaliar se faz sentido rodar um piloto simples com dados
                            históricos para identificar perda de consistência, pressão de
                            recuperação e contextos afetados.
                        </p>

                        <div className="mt-8 grid gap-3 text-sm text-slate-300">
                            <p className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                Ideal para testar 1 fluxo crítico.
                            </p>
                            <p className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                Pode começar com exportação ou CSV.
                            </p>
                            <p className="flex items-center gap-3">
                                <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                                Foco em leitura operacional, não em dashboard genérico.
                            </p>
                        </div>

                        <div className="mt-8 rounded-2xl border border-cyan-300/15 bg-slate-950/60 p-5">
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-cyan-300" />
                                <p className="text-sm font-medium text-slate-100">
                                    Prefere e-mail direto?
                                </p>
                            </div>

                            <a
                                href="mailto:contato@ohrly.com.br"
                                className="mt-3 inline-flex text-sm text-cyan-300 transition hover:text-cyan-200"
                            >
                                taraujo@ohrly.com.br
                            </a>
                        </div>
                    </div>

                    <ContactForm />
                </section>

                <section className="mx-auto px-5 pb-16 sm:px-8 lg:px-10">
                    <InfoPanel />
                </section>

                <Footer />
            </div>
        </main>
    );
}