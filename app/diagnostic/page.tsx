"use client";

import DefaultPage from "@/components/DefaultPage";
import { Header } from "@/components/Header";
import Hero from "@/components/Hero";
import { useMemo, useState } from "react";

type Option = {
    label: string;
    value: string;
};

type DiagnosticState = {
    flowType: string;
    suspicionSignals: string[];
    duration: string;
    technicalState: string;
    measurableData: string[];
    dataSource: string[];
};

type ContactState = {
    name: string;
    email: string;
    company: string;
    flowName: string;
    summary: string;
};

type AdhesionLevel = "high" | "medium" | "low" | "unknown";

const flowOptions: Option[] = [
    { label: "WhatsApp", value: "whatsapp" },
    { label: "Chatbot", value: "chatbot" },
    { label: "Onboarding", value: "onboarding" },
    { label: "Checkout", value: "checkout" },
    { label: "Pagamento", value: "payment" },
    { label: "Suporte", value: "support" },
    { label: "RPA", value: "rpa" },
    { label: "Outro", value: "other" },
];

const signalOptions: Option[] = [
    { label: "Mais handoff", value: "handoff" },
    { label: "Mais retries", value: "retries" },
    { label: "Mais demora", value: "latency" },
    { label: "Queda de conversão", value: "conversion_drop" },
    { label: "Mais abandono", value: "abandonment" },
    { label: "Exceções manuais", value: "manual_exceptions" },
    { label: "Reclamações", value: "complaints" },
    { label: "Quero investigar", value: "investigate" },
];

const durationOptions: Option[] = [
    { label: "Horas", value: "hours" },
    { label: "1–2 dias", value: "1_2_days" },
    { label: "3–7 dias", value: "3_7_days" },
    { label: "+1 semana", value: "more_than_week" },
    { label: "+1 mês", value: "more_than_month" },
    { label: "Não sei", value: "unknown" },
];

const technicalStateOptions: Option[] = [
    { label: "Sim, mas pior", value: "works_worse" },
    { label: "Sim, mas exige intervenção humana", value: "human_intervention" },
    { label: "Parcialmente", value: "partially" },
    { label: "Já virou incidente", value: "incident" },
    { label: "Não sei", value: "unknown" },
];

const measurableDataOptions: Option[] = [
    { label: "Tempo de conclusão", value: "completion_time" },
    { label: "Volume", value: "volume" },
    { label: "Handoff", value: "handoff" },
    { label: "Retries", value: "retries" },
    { label: "Conversão", value: "conversion" },
    { label: "Backlog", value: "backlog" },
    { label: "Export manual", value: "manual_export" },
];

const dataSourceOptions: Option[] = [
    { label: "Planilha", value: "spreadsheet" },
    { label: "Ferramenta de atendimento", value: "support_tool" },
    { label: "CRM", value: "crm" },
    { label: "BI", value: "bi" },
    { label: "Banco", value: "database" },
    { label: "APM", value: "apm" },
    { label: "Sistema interno", value: "internal_system" },
];

const initialDiagnostic: DiagnosticState = {
    flowType: "",
    suspicionSignals: [],
    duration: "",
    technicalState: "",
    measurableData: [],
    dataSource: [],
};

const initialContact: ContactState = {
    name: "",
    email: "",
    company: "",
    flowName: "",
    summary: "",
};

function getLabel(options: Option[], value: string) {
    return options.find((option) => option.value === value)?.label ?? "não informado";
}

function getLabels(options: Option[], values: string[]) {
    return values.map((value) => getLabel(options, value));
}

function cx(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function calculateAdhesion(diagnostic: DiagnosticState): AdhesionLevel {
    let score = 0;

    if (diagnostic.flowType) score += 1;
    if (diagnostic.suspicionSignals.length >= 2) score += 2;
    if (["3_7_days", "more_than_week", "more_than_month"].includes(diagnostic.duration)) score += 2;
    if (["works_worse", "human_intervention", "partially"].includes(diagnostic.technicalState)) score += 2;
    if (diagnostic.measurableData.length >= 3) score += 2;
    if (diagnostic.dataSource.length >= 1) score += 1;

    if (score >= 8) return "high";
    if (score >= 5) return "medium";
    if (score >= 2) return "low";
    return "unknown";
}

function buildSummary(diagnostic: DiagnosticState, flowName?: string) {
    const flowType = getLabel(flowOptions, diagnostic.flowType).toLowerCase();
    const selectedSignals = getLabels(signalOptions, diagnostic.suspicionSignals)
        .map((label) => label.toLowerCase())
        .join(", ");
    const duration = getLabel(durationOptions, diagnostic.duration).toLowerCase();
    const technicalState = getLabel(technicalStateOptions, diagnostic.technicalState).toLowerCase();
    const measurableData = getLabels(measurableDataOptions, diagnostic.measurableData)
        .map((label) => label.toLowerCase())
        .join(", ");
    const dataSources = getLabels(dataSourceOptions, diagnostic.dataSource)
        .map((label) => label.toLowerCase())
        .join(", ");

    const namedFlow = flowName?.trim() ? ` chamado "${flowName.trim()}"` : "";

    return `Quero analisar um fluxo de ${flowType}${namedFlow}. O fluxo ainda parece operar, mas percebemos sinais como ${selectedSignals || "sinais ainda pouco claros"} há ${duration}. Hoje o estado técnico percebido é: ${technicalState}. Conseguimos medir ${measurableData || "poucos dados até o momento"} e os dados existem em ${dataSources || "fonte ainda não definida"}. O objetivo da análise é entender se isso é ruído, sazonalidade ou uma degradação persistente que merece decisão.`;
}

function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200 shadow-[0_0_24px_rgba(124,58,237,0.18)]">
            {children}
        </span>
    );
}

function IconCircle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-slate-950/50 text-violet-300 shadow-[0_0_24px_rgba(124,58,237,0.18)]">
            {children}
        </div>
    );
}

function OptionChip({
    label,
    selected,
    onClick,
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                "group inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition duration-200",
                selected
                    ? "border-violet-300/40 bg-violet-500 text-white shadow-[0_0_24px_rgba(124,58,237,0.32)]"
                    : "border-white/10 bg-slate-950/50 text-slate-300 hover:border-violet-300/40 hover:bg-violet-500/10 hover:text-white",
            )}
        >
            <span>{label}</span>
            {selected && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/90 text-[10px] font-black text-violet-700">
                    ✓
                </span>
            )}
        </button>
    );
}

function SingleSelectGroup({
    options,
    value,
    onChange,
}: {
    options: Option[];
    value: string;
    onChange: (value: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <OptionChip
                    key={option.value}
                    label={option.label}
                    selected={value === option.value}
                    onClick={() => onChange(option.value)}
                />
            ))}
        </div>
    );
}

function MultiSelectGroup({
    options,
    values,
    onChange,
}: {
    options: Option[];
    values: string[];
    onChange: (values: string[]) => void;
}) {
    function toggle(value: string) {
        if (values.includes(value)) {
            onChange(values.filter((item) => item !== value));
            return;
        }

        onChange([...values, value]);
    }

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => (
                <OptionChip
                    key={option.value}
                    label={option.label}
                    selected={values.includes(option.value)}
                    onClick={() => toggle(option.value)}
                />
            ))}
        </div>
    );
}

function Timeline() {
    const items = [
        {
            label: "Normal",
            description: "Operação saudável, tudo dentro do esperado.",
            color: "bg-slate-200",
        },
        {
            label: "Sinais estranhos",
            description: "Pequenas variações começam a aparecer.",
            color: "bg-yellow-100",
        },
        {
            label: "Degradação silenciosa",
            description: "Comportamento se afasta do padrão de forma persistente.",
            color: "bg-yellow-400 shadow-[0_0_28px_rgba(250,204,21,0.75)]",
            active: true,
        },
        {
            label: "Incidente",
            description: "Impacto explícito, alertas disparam, urgência e ação.",
            color: "bg-red-400",
        },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 shadow-2xl backdrop-blur">
            <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-violet-300">
                O que costumamos encontrar
            </p>
            <div className="relative grid grid-cols-4 gap-4">
                <div className="absolute left-3 right-3 top-2 h-px bg-gradient-to-r from-slate-300 via-yellow-300 to-red-400" />
                {items.map((item) => (
                    <div key={item.label} className="relative z-10">
                        <div className={cx("mb-4 h-4 w-4 rounded-full ring-4 ring-slate-950", item.color)} />
                        <p className={cx("text-sm font-semibold", item.active ? "text-yellow-300" : "text-white")}>{item.label}</p>
                        <p className="mt-2 max-w-36 text-xs leading-relaxed text-slate-400">{item.description}</p>
                    </div>
                ))}
            </div>
            <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-300">
                A maioria das operações não percebe quando começa a degradar.
            </div>
        </div>
    );
}

function QuestionBlock({
    icon,
    title,
    children,
}: {
    icon: React.ReactNode;
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/10 py-4 last:border-b-0">
            <IconCircle>{icon}</IconCircle>
            <div>
                <h3 className="mb-3 text-base font-semibold text-white">{title}</h3>
                {children}
            </div>
        </div>
    );
}

function AdhesionResult({ level }: { level: AdhesionLevel }) {
    const content: Record<AdhesionLevel, { title: string; description: string; tone: string }> = {
        high: {
            title: "Aderência alta para diagnóstico inicial",
            description:
                "Há sinais persistentes, o fluxo ainda parece operacional e existem dados mínimos para uma primeira leitura comportamental.",
            tone: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
        },
        medium: {
            title: "Aderência moderada",
            description:
                "O caso parece investigável, mas talvez seja necessário entender melhor os dados disponíveis ou a duração do comportamento.",
            tone: "border-yellow-400/30 bg-yellow-500/10 text-yellow-100",
        },
        low: {
            title: "Aderência baixa neste momento",
            description:
                "Ainda faltam sinais suficientes para uma leitura inicial. Pode ser útil começar definindo o fluxo e quais métricas mínimas existem.",
            tone: "border-slate-400/20 bg-white/[0.04] text-slate-200",
        },
        unknown: {
            title: "Preencha o diagnóstico para verificar aderência",
            description: "A leitura aparece aqui depois que os sinais principais forem selecionados.",
            tone: "border-violet-400/20 bg-violet-500/10 text-violet-100",
        },
    };

    const selected = content[level];

    return (
        <div className={cx("mt-5 rounded-2xl border p-4", selected.tone)}>
            <p className="font-semibold">{selected.title}</p>
            <p className="mt-1 text-sm opacity-85">{selected.description}</p>
        </div>
    );
}

export default function DiagnosticPage() {
    const [diagnostic, setDiagnostic] = useState<DiagnosticState>(initialDiagnostic);
    const [contact, setContact] = useState<ContactState>(initialContact);
    const [adhesionChecked, setAdhesionChecked] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const generatedSummary = useMemo(
        () => buildSummary(diagnostic, contact.flowName),
        [diagnostic, contact.flowName],
    );

    const adhesion = useMemo(() => calculateAdhesion(diagnostic), [diagnostic]);

    function updateDiagnostic<K extends keyof DiagnosticState>(key: K, value: DiagnosticState[K]) {
        setDiagnostic((current) => ({ ...current, [key]: value }));
        setAdhesionChecked(false);
    }

    function updateContact<K extends keyof ContactState>(key: K, value: ContactState[K]) {
        setContact((current) => ({ ...current, [key]: value }));
    }

    function verifyAdhesion() {
        setAdhesionChecked(true);
        setContact((current) => ({
            ...current,
        }));
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const payload = {
            contact,
            diagnostic,
            generatedSummary,
            adhesion,
            submittedAt: new Date().toISOString(),
        };

        // console.log("Ohrly diagnostic payload", payload);

        const res = await fetch("https://formspree.io/f/mkoygpnk", {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
            body: JSON.stringify(payload),
        });

        setSubmitted(true);

        if (res.ok) {
            alert("Diagnóstico enviado com sucesso.")
        } else {
            alert("Houve um erro interno. Por favor envie um email para taraujo@ohrly.com.br")
        }

    }

    return (
        <DefaultPage>
            <Hero
                summary="Diagnóstico"
                title="Diagnóstico de"
                titleHighlight="Zona Cinzenta de Decisão"
                description="Responda algumas perguntas rápidas para estruturar um caso real. Ao final, você recebe uma leitura inicial e um resumo pronto para enviar para o Ohrly."
                noButtons
                rightHightlight={<Timeline />}
            />

            <>

                <section id="diagnostico" className="relative z-10 mx-auto grid max-w-7xl gap-5 pb-8 lg:grid-cols-[1.25fr_0.75fr]">
                    <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-xl md:p-7">
                        <QuestionBlock icon="⌬" title="1. Qual fluxo você quer analisar?">
                            <SingleSelectGroup
                                options={flowOptions}
                                value={diagnostic.flowType}
                                onChange={(value) => updateDiagnostic("flowType", value)}
                            />
                        </QuestionBlock>

                        <QuestionBlock icon="△" title="2. O que fez você desconfiar desse fluxo?">
                            <MultiSelectGroup
                                options={signalOptions}
                                values={diagnostic.suspicionSignals}
                                onChange={(values) => updateDiagnostic("suspicionSignals", values)}
                            />
                        </QuestionBlock>

                        <QuestionBlock icon="◷" title="3. Há quanto tempo isso parece estar acontecendo?">
                            <SingleSelectGroup
                                options={durationOptions}
                                value={diagnostic.duration}
                                onChange={(value) => updateDiagnostic("duration", value)}
                            />
                        </QuestionBlock>

                        <QuestionBlock icon="⚙" title="4. Esse fluxo ainda funciona tecnicamente?">
                            <SingleSelectGroup
                                options={technicalStateOptions}
                                value={diagnostic.technicalState}
                                onChange={(value) => updateDiagnostic("technicalState", value)}
                            />
                        </QuestionBlock>

                        <QuestionBlock icon="▥" title="5. O que você consegue medir hoje?">
                            <MultiSelectGroup
                                options={measurableDataOptions}
                                values={diagnostic.measurableData}
                                onChange={(values) => updateDiagnostic("measurableData", values)}
                            />
                            <h4 className="mb-3 mt-5 text-sm font-semibold text-slate-300">Onde esses dados existem?</h4>
                            <MultiSelectGroup
                                options={dataSourceOptions}
                                values={diagnostic.dataSource}
                                onChange={(values) => updateDiagnostic("dataSource", values)}
                            />
                        </QuestionBlock>

                        <button
                            type="button"
                            onClick={verifyAdhesion}
                            className="cursor-pointer mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-4 text-base font-semibold text-white shadow-[0_0_32px_rgba(79,70,229,0.42)] transition hover:brightness-110"
                        >
                            Verificar aderência →
                        </button>

                        {adhesionChecked && <AdhesionResult level={adhesion} />}
                    </div>

                    <aside className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl backdrop-blur-xl md:p-7">
                        <div className="mb-6">
                            <Badge>Enviar caso</Badge>
                            <h2 className="mt-4 text-2xl font-bold tracking-tight text-white">Enviar diagnóstico para Ohrly</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Use o resumo gerado como ponto de partida. Você pode editar antes de enviar.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-200">Nome</span>
                                <input
                                    value={contact.name}
                                    onChange={(event) => updateContact("name", event.target.value)}
                                    placeholder="Seu nome"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:ring-4 focus:ring-violet-500/10"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-200">E-mail corporativo</span>
                                <input
                                    type="email"
                                    value={contact.email}
                                    onChange={(event) => updateContact("email", event.target.value)}
                                    placeholder="voce@empresa.com"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:ring-4 focus:ring-violet-500/10"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-200">Empresa</span>
                                <input
                                    value={contact.company}
                                    onChange={(event) => updateContact("company", event.target.value)}
                                    placeholder="Nome da empresa"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:ring-4 focus:ring-violet-500/10"
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="mb-2 block text-sm font-medium text-slate-200">Nome do fluxo</span>
                                <input
                                    value={contact.flowName}
                                    onChange={(event) => updateContact("flowName", event.target.value)}
                                    placeholder="Ex: Segunda via no WhatsApp"
                                    className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:ring-4 focus:ring-violet-500/10"
                                />
                            </label>

                            <label className="block">
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <span className="block text-sm font-medium text-slate-200">Resumo do caso</span>
                                    <button
                                        type="button"
                                        onClick={() => updateContact("summary", generatedSummary)}
                                        className="text-xs font-medium text-violet-300 transition hover:text-violet-200"
                                    >
                                        Usar resumo gerado
                                    </button>
                                </div>
                                <textarea
                                    value={contact.summary}
                                    onChange={(event) => updateContact("summary", event.target.value)}
                                    rows={8}
                                    placeholder="Resumo do que você quer investigar"
                                    className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-slate-500 focus:border-violet-300/60 focus:ring-4 focus:ring-violet-500/10"
                                    required
                                />
                            </label>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">
                                Esse resumo será usado apenas para entendermos se já existe material suficiente para uma primeira leitura.
                            </div>

                            <button
                                type="submit"
                                className="cursor-pointerw-full rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-5 py-4 text-base font-semibold text-white shadow-[0_0_32px_rgba(79,70,229,0.42)] transition hover:brightness-110"
                            >
                                Enviar diagnóstico para Ohrly →
                            </button>

                            {submitted && (
                                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
                                    Diagnóstico registrado localmente. Conecte o formulário a uma API route ou Formspree para envio real.
                                </div>
                            )}
                        </form>
                    </aside>
                </section>

                <section className="relative z-10 mx-auto max-w-7xl px-6 pb-16 lg:px-8">
                    <div className="grid gap-4 rounded-3xl border border-white/10 bg-slate-950/60 p-5 backdrop-blur-xl md:grid-cols-[1.1fr_repeat(4,1fr)] md:p-7">
                        <div>
                            <h2 className="text-xl font-bold text-white">O que a Ohrly procura neste diagnóstico</h2>
                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Nosso objetivo é identificar padrões comportamentais que se deterioram gradualmente e passam despercebidos até gerarem impacto.
                            </p>
                        </div>

                        {[
                            {
                                title: "Persistência",
                                text: "Variações que se mantêm por dias ou semanas.",
                                icon: "〽",
                            },
                            {
                                title: "Mudança de regime",
                                text: "Quando o padrão normal dá lugar a outro comportamento.",
                                icon: "⌁",
                            },
                            {
                                title: "Sinais antes do incidente",
                                text: "Alertas fracos e indiretos que antecedem impactos explícitos.",
                                icon: "△",
                            },
                            {
                                title: "Dados mínimos",
                                text: "Exports simples já podem revelar sinais importantes.",
                                icon: "▤",
                            },
                        ].map((item) => (
                            <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
                                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-violet-500/15 text-xl text-violet-200">
                                    {item.icon}
                                </div>
                                <h3 className="font-semibold text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </section>

            </>
        </DefaultPage>
    );
}
