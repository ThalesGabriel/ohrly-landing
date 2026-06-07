"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    CircleDollarSign,
    ClipboardCheck,
    Database,
    FileText,
    LineChart,
    Loader2,
    MessageCircle,
    MousePointerClick,
    Rocket,
    SearchCheck,
    Send,
    ShoppingCart,
    Sparkles,
    Store,
    Target,
    TrendingUp,
    UploadCloud,
    Users,
    X,
    XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
    trackMetaEvent,
} from "@/lib/meta-pixel";

type ModalSource =
    | "hero_primary"
    | "hero_secondary"
    | "header"
    | "example"
    | "final_cta"
    | "floating_cta";

type LeadPayload = {
    name: string;
    email: string;
    role: string;
    company: string;
    storesManaged: string;
    mainChallenge: string;
    sourcePage: string;
    modalSource: ModalSource;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
};

const LEAD_ENDPOINT = "https://formspree.io/f/mkoygpnk";

const painCards = [
    {
        title: "WhatsApp sem integração",
        description:
            "Conversas, dúvidas e vendas que não entram no relatório e não viram cliente acionável.",
        icon: MessageCircle,
        tone: "emerald",
    },
    {
        title: "Checkout e página",
        description:
            "Atritos no checkout, frete ou pagamento fazem o cliente desistir antes da compra.",
        icon: ShoppingCart,
        tone: "violet",
    },
    {
        title: "Dados incompletos",
        description:
            "Sem telefone, CPF ou vínculo confiável, fica difícil medir recompra, LTV e retorno.",
        icon: Database,
        tone: "blue",
    },
    {
        title: "Ponto de venda invisível",
        description:
            "A receita acontece no balcão, mas não fica conectada ao cliente nem ao digital.",
        icon: Store,
        tone: "orange",
    },
] as const;

const steps = [
    {
        title: "Envie os dados da loja",
        icon: UploadCloud,
    },
    {
        title: "O Ohrly gera o diagnóstico",
        icon: Sparkles,
    },
    {
        title: "Você valida a leitura",
        icon: SearchCheck,
    },
    {
        title: "O sistema cria acompanhamento",
        icon: BarChart3,
    },
    {
        title: "Você apresenta evolução",
        icon: TrendingUp,
    },
] as const;

export default function ConsultantsLandingPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalSource, setModalSource] = useState<ModalSource>("hero_primary");

    useEffect(() => {
        trackMetaEvent("ViewContent", {
            content_name: "consultants_landing",
            content_category: "landing_page",
        });

        trackMetaEvent("LandingViewed", {
            page: "consultants_landing",
        });
    }, []);

    useSectionTracking("problem-section", "ProblemSectionViewed");
    useSectionTracking("workflow-section", "WorkflowSectionViewed");
    useSectionTracking("example-section", "ExampleSectionViewed");
    useSectionTracking("comparison-section", "ComparisonSectionViewed");
    useSectionTracking("return-section", "ReturnSectionViewed");
    useSectionTracking("final-cta-section", "FinalCtaViewed");

    function openLeadModal(source: ModalSource) {
        setModalSource(source);
        setModalOpen(true);

        trackMetaEvent("Contact", {
            content_name: "open_lead_modal",
            content_category: source,
        });

        trackMetaEvent("LeadModalOpened", {
            source,
            page: "consultants_landing",
        });
    }

    function trackCtaClick(source: ModalSource) {
        trackMetaEvent("CtaClicked", {
            source,
            page: "consultants_landing",
        });
    }

    return (
        <main className="min-h-screen bg-white text-slate-950">
            <Header
                onCtaClick={() => {
                    trackCtaClick("header");
                    openLeadModal("header");
                }}
            />

            <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-white via-white to-violet-50/40">
                <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-violet-200/30 blur-3xl" />

                <div className="relative mx-auto grid w-full grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1fr_1fr] lg:px-8 lg:py-20">
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-violet-50 px-4 py-2 text-sm font-bold text-violet-700 ring-1 ring-violet-100">
                            <Users className="h-4 w-4" />
                            Para consultores, agências e gestores de tráfego
                        </div>

                        <h1 className="mt-8 max-w-3xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                            Mostre ao lojista onde a operação trava{" "}
                            <span className="text-violet-700">depois do clique</span>
                        </h1>

                        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            O Ohrly transforma dados brutos de lojas em diagnóstico, plano de
                            ação e prova de retorno para quem precisa orientar lojistas com
                            mais clareza.
                        </p>

                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => {
                                    trackCtaClick("hero_primary");
                                    openLeadModal("hero_primary");
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800"
                            >
                                <LineChart className="h-5 w-5" />
                                Gerar diagnóstico de uma loja
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    trackCtaClick("hero_secondary");
                                    trackMetaEvent("Contact", {
                                        content_name: "view_report_example",
                                        content_category: "hero_secondary",
                                    });

                                    document
                                        .getElementById("example-section")
                                        ?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-200 bg-white px-6 py-4 text-sm font-bold text-violet-700 transition hover:bg-violet-50"
                            >
                                <FileText className="h-5 w-5" />
                                Ver exemplo de relatório
                            </button>
                        </div>

                        <p className="mt-6 max-w-xl text-sm leading-6 text-slate-500">
                            Ideal para quando o cliente cobra resultado, mas o gargalo pode
                            estar em atendimento, checkout, dados, WhatsApp ou ponto de venda.
                        </p>
                    </div>

                    <LeadPreviewCard
                        onCtaClick={() => {
                            trackCtaClick("floating_cta");
                            openLeadModal("floating_cta");
                        }}
                    />
                </div>
            </section>

            <ProblemSection />
            <WorkflowSection />
            <ExampleSection
                onCtaClick={() => {
                    trackCtaClick("example");
                    openLeadModal("example");
                }}
            />
            <ComparisonSection />
            <ReturnSection />
            <FinalCta
                onCtaClick={() => {
                    trackCtaClick("final_cta");
                    openLeadModal("final_cta");
                }}
            />

            <LeadModal
                open={modalOpen}
                source={modalSource}
                onClose={() => {
                    setModalOpen(false);
                    trackMetaEvent("LeadModalClosed", {
                        source: modalSource,
                        page: "consultants_landing",
                    });
                }}
            />
        </main>
    );
}

function useSectionTracking(elementId: string, eventName: string) {
    useEffect(() => {
        const element = document.getElementById(elementId);

        if (!element) return;

        let alreadyTracked = false;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !alreadyTracked) {
                    alreadyTracked = true;

                    trackMetaEvent("ViewContent", {
                        content_name: elementId,
                        content_category: "landing_section",
                    });

                    trackMetaEvent(eventName, {
                        section: elementId,
                        page: "consultants_landing",
                    });

                    observer.disconnect();
                }
            },
            {
                threshold: 0.45,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [elementId, eventName]);
}

function Header({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-xl">
            <div className="mx-auto flex h-20 w-full items-center justify-between px-6 lg:px-8">
                <div className="flex items-center gap-3">
                    <span className="text-2xl font-black tracking-tight text-slate-950">
                        Ohrly
                    </span>
                </div>

                <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 lg:flex">
                    <a href="#problem-section" className="hover:text-violet-700">
                        Dor
                    </a>
                    <a href="#workflow-section" className="hover:text-violet-700">
                        Como funciona
                    </a>
                    <a href="#example-section" className="hover:text-violet-700">
                        Exemplo
                    </a>
                    <a href="#return-section" className="hover:text-violet-700">
                        Retorno
                    </a>
                </nav>

                <button
                    type="button"
                    onClick={onCtaClick}
                    className="rounded-2xl bg-violet-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800"
                >
                    Testar com uma loja
                </button>
            </div>
        </header>
    );
}

function LeadPreviewCard({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-violet-900/10">
            <div className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-violet-700">
                            Diagnóstico Ohrly
                        </p>
                        <h2 className="mt-2 text-2xl font-black text-slate-950">
                            Loja físico-digital
                        </h2>
                        <p className="mt-2 text-sm leading-6 text-slate-600">
                            Leitura comercial para apresentar ao cliente.
                        </p>
                    </div>

                    <div className="rounded-2xl bg-violet-100 p-3 text-violet-700">
                        <ClipboardCheck className="h-7 w-7" />
                    </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                    <PreviewMetric
                        label="Receita no PDV"
                        value="94,26%"
                        tone="violet"
                    />
                    <PreviewMetric
                        label="Sem comprador confiável"
                        value="65,24%"
                        tone="rose"
                    />
                    <PreviewMetric
                        label="Ação sugerida"
                        value="Capturar telefone"
                        tone="emerald"
                    />
                    <PreviewMetric
                        label="Métrica de prova"
                        value="Receita identificada"
                        tone="blue"
                    />
                </div>

                <div className="mt-5 rounded-2xl border border-violet-100 bg-white p-4">
                    <p className="text-sm font-black text-slate-950">
                        Leitura para o consultor
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                        Antes de escalar mídia, a loja precisa transformar parte da venda
                        física em base acionável para recompra e campanhas.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCtaClick}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800"
                >
                    Quero testar com uma loja
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </div>
    );
}

function PreviewMetric({
    label,
    value,
    tone,
}: {
    label: string;
    value: string;
    tone: "violet" | "rose" | "emerald" | "blue";
}) {
    const color = {
        violet: "text-violet-700",
        rose: "text-rose-600",
        emerald: "text-emerald-700",
        blue: "text-blue-600",
    }[tone];

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                {label}
            </p>
            <p className={["mt-2 text-xl font-black", color].join(" ")}>{value}</p>
        </div>
    );
}

function ProblemSection() {
    return (
        <section id="problem-section" className="border-b border-slate-100 bg-white py-16">
            <ContainerGrid
                eyebrow="Depois do clique"
                title="Quando a campanha não vende, nem sempre o problema está no tráfego"
                description="Muitos gargalos estão dentro da operação, dos dados e da jornada da loja."
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {painCards.map((card) => (
                        <PainCard key={card.title} card={card} />
                    ))}
                </div>
            </ContainerGrid>
        </section>
    );
}

function PainCard({
    card,
}: {
    card: {
        title: string;
        description: string;
        icon: LucideIcon;
        tone: "emerald" | "violet" | "blue" | "orange";
    };
}) {
    const Icon = card.icon;
    const tone = {
        emerald: "bg-emerald-50 text-emerald-600",
        violet: "bg-violet-50 text-violet-700",
        blue: "bg-blue-50 text-blue-600",
        orange: "bg-orange-50 text-orange-600",
    }[card.tone];

    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className={["flex h-12 w-12 items-center justify-center rounded-2xl", tone].join(" ")}>
                <Icon className="h-6 w-6" />
            </div>

            <h3 className="mt-5 text-base font-black text-slate-950">{card.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{card.description}</p>
        </article>
    );
}

function WorkflowSection() {
    return (
        <section id="workflow-section" className="bg-violet-50/50 py-16">
            <ContainerGrid
                eyebrow="Como funciona"
                title="Do CSV ao plano de ação"
                description="Um processo simples para gerar clareza, alinhar com o cliente e mostrar resultado com o tempo."
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                    {steps.map((step, index) => (
                        <StepCard key={step.title} step={step} index={index + 1} />
                    ))}
                </div>
            </ContainerGrid>
        </section>
    );
}

function StepCard({
    step,
    index,
}: {
    step: {
        title: string;
        icon: LucideIcon;
    };
    index: number;
}) {
    const Icon = step.icon;

    return (
        <article className="relative rounded-3xl border border-violet-100 bg-white p-5 text-center shadow-sm">
            <div className="absolute -top-3 left-4 flex h-7 w-7 items-center justify-center rounded-full bg-violet-700 text-xs font-black text-white">
                {index}
            </div>

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-700">
                <Icon className="h-7 w-7" />
            </div>

            <p className="mt-4 text-sm font-black leading-5 text-slate-950">
                {step.title}
            </p>
        </article>
    );
}

function ExampleSection({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <section id="example-section" className="border-b border-slate-100 bg-white py-16">
            <ContainerGrid
                eyebrow="Exemplo prático"
                title="Loja físico-digital de motopeças"
                description="Um exemplo de como o Ohrly transforma dados simples em leitura para decisão."
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetricCard
                        label="Dependência do ponto de venda"
                        value="94,26%"
                        description="da receita vem do PDV"
                        icon={Store}
                        tone="violet"
                    />
                    <MetricCard
                        label="Receita sem comprador confiável"
                        value="65,24%"
                        description="da receita do canal está sem comprador confiável"
                        icon={Users}
                        tone="rose"
                    />
                    <ActionCard />
                    <MetricCard
                        label="Métrica de prova"
                        value="Receita identificada"
                        description="acompanhe evolução e retorno da ação"
                        icon={LineChart}
                        tone="blue"
                    />
                </div>

                <button
                    type="button"
                    onClick={onCtaClick}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800"
                >
                    Testar esse diagnóstico com uma loja
                    <ArrowRight className="h-5 w-5" />
                </button>
            </ContainerGrid>
        </section>
    );
}

function MetricCard({
    label,
    value,
    description,
    icon: Icon,
    tone,
}: {
    label: string;
    value: string;
    description: string;
    icon: LucideIcon;
    tone: "violet" | "rose" | "blue";
}) {
    const styles = {
        violet: "bg-violet-50 text-violet-700",
        rose: "bg-rose-50 text-rose-600",
        blue: "bg-blue-50 text-blue-600",
    }[tone];

    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-black text-slate-950">{label}</p>
                <div className={["flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", styles].join(" ")}>
                    <Icon className="h-6 w-6" />
                </div>
            </div>

            <p className="mt-5 text-4xl font-black tracking-tight text-violet-700">
                {value}
            </p>

            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </article>
    );
}

function ActionCard() {
    return (
        <article className="rounded-3xl border border-emerald-100 bg-emerald-50/70 p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-black text-emerald-900">Ação sugerida</p>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-700">
                    <Target className="h-6 w-6" />
                </div>
            </div>

            <p className="mt-5 text-lg font-black leading-7 text-emerald-950">
                Capturar telefone ou CPF em pedidos presenciais acima de R$100
            </p>

            <span className="mt-5 inline-flex rounded-full bg-emerald-200/70 px-3 py-1 text-xs font-black text-emerald-800">
                Prova: receita com comprador confiável
            </span>
        </article>
    );
}

function ComparisonSection() {
    return (
        <section id="comparison-section" className="bg-slate-50 py-16">
            <ContainerGrid
                eyebrow="Diferencial"
                title="Não é mais um dashboard de mídia"
                description="Depois que o relatório mostra os números, o Ohrly ajuda a explicar o que fazer com eles."
            >
                <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-2">
                    <ComparisonColumn
                        title="Ferramentas de mídia mostram"
                        items={[
                            "ROAS, CPC, CPM e impressões",
                            "Desempenho de campanhas e anúncios",
                            "Cliques, conversões e custos",
                            "Métricas isoladas de tráfego",
                        ]}
                        positive
                    />

                    <ComparisonColumn
                        title="Ohrly ajuda a responder"
                        items={[
                            "Onde a operação da loja está travando",
                            "O que fazer primeiro para destravar",
                            "Como acompanhar e provar retorno",
                            "Como conectar operação, cliente e resultado",
                        ]}
                        positive
                    />
                </div>
            </ContainerGrid>
        </section>
    );
}

function ComparisonColumn({
    title,
    items,
    positive,
}: {
    title: string;
    items: string[];
    positive: boolean;
}) {
    return (
        <div className={positive ? "bg-emerald-50/50 p-6" : "bg-rose-50/50 p-6"}>
            <h3 className={positive ? "text-base font-black text-emerald-900" : "text-base font-black text-rose-900"}>
                {title}
            </h3>

            <div className="mt-5 space-y-3">
                {items.map((item) => (
                    <div key={item} className="flex gap-3">
                        {positive ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                        ) : (
                            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-rose-500" />
                        )}
                        <p className="text-sm leading-6 text-slate-700">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ReturnSection() {
    return (
        <section id="return-section" className="border-b border-slate-100 bg-white py-16">
            <ContainerGrid
                eyebrow="Prova de retorno"
                title="Mostre retorno sem prometer milagre"
                description="O Ohrly separa retorno em camadas para evitar promessas frágeis e facilitar acompanhamento real."
            >
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <ReturnCard number="1" title="Mensurabilidade" description="A loja passou a enxergar melhor clientes, canais e receita." />
                    <ReturnCard number="2" title="Decisão" description="Uma ação foi tomada com base no diagnóstico validado." />
                    <ReturnCard number="3" title="Indicador" description="A métrica acompanhada mudou depois da intervenção." />
                    <ReturnCard number="4" title="Financeiro" description="Receita incremental, assistida ou acionável foi estimada." />
                </div>
            </ContainerGrid>
        </section>
    );
}

function ReturnCard({
    number,
    title,
    description,
}: {
    number: string;
    title: string;
    description: string;
}) {
    return (
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-700 text-sm font-black text-white">
                {number}
            </div>
            <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
        </article>
    );
}

function FinalCta({ onCtaClick }: { onCtaClick: () => void }) {
    return (
        <section id="final-cta-section" className="bg-white px-6 py-16 lg:px-8">
            <div className="mx-auto flex w-full flex-col gap-8 rounded-[2rem] border border-violet-100 bg-violet-50 p-8 shadow-sm lg:flex-row lg:items-center lg:justify-between">
                <div className="flex gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white text-violet-700 shadow-sm">
                        <Rocket className="h-8 w-8" />
                    </div>

                    <div>
                        <h2 className="max-w-2xl text-3xl font-black tracking-tight text-slate-950">
                            Use o Ohrly para entregar diagnósticos mais claros aos seus clientes
                        </h2>
                        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
                            Envie os dados de uma loja, gere uma leitura comercial e transforme
                            achados em plano de ação acompanhado.
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onCtaClick}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-700 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800"
                >
                    Quero testar com uma loja
                    <ArrowRight className="h-5 w-5" />
                </button>
            </div>
        </section>
    );
}

function ContainerGrid({
    eyebrow,
    title,
    description,
    children,
}: {
    eyebrow: string;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div className="mx-auto grid w-full grid-cols-1 gap-8 px-6 lg:grid-cols-[280px_1fr] lg:px-8">
            <div>
                <p className="text-sm font-bold uppercase tracking-wide text-violet-700">
                    {eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
                    {title}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                    {description}
                </p>
            </div>

            <div>{children}</div>
        </div>
    );
}

function LeadModal({
    open,
    source,
    onClose,
}: {
    open: boolean;
    source: ModalSource;
    onClose: () => void;
}) {
    useEffect(() => {
        if (!open) return;

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8">
            <button
                type="button"
                aria-label="Fechar modal"
                onClick={onClose}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-5 top-5 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                    <X className="h-5 w-5" />
                </button>

                <LeadCaptureForm source={source} />
            </div>
        </div>
    );
}

function LeadCaptureForm({ source }: { source: ModalSource }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("gestor_trafego");
    const [company, setCompany] = useState("");
    const [storesManaged, setStoresManaged] = useState("1-5");
    const [mainChallenge, setMainChallenge] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState<string | null>(null);

    const canSubmit = useMemo(() => {
        return email.trim().length > 3 && mainChallenge.trim().length > 0;
    }, [email, mainChallenge]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!canSubmit) return;

        try {
            setStatus("loading");
            setError(null);

            const payload: LeadPayload = {
                name,
                email,
                role,
                company,
                storesManaged,
                mainChallenge,
                sourcePage: "consultants_landing",
                modalSource: source,
                ...getUtmParams(),
            };

            trackMetaEvent("LeadFormSubmittedAttempt", {
                source,
                role,
                stores_managed: storesManaged,
            });

            if (!LEAD_ENDPOINT) {
                console.log("Lead payload:", payload);
            } else {
                const response = await fetch(LEAD_ENDPOINT, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                    },
                    body: buildFormspreePayload(payload),
                });

                if (!response.ok) {
                    throw new Error("Não foi possível enviar o formulário.");
                }
            }

            trackMetaEvent("Lead", {
                content_name: "consultants_landing_lead",
                content_category: role,
                lead_type: "diagnostic_request",
                source,
                stores_managed: storesManaged,
            });

            trackMetaEvent("DiagnosticLeadCaptured", {
                source,
                role,
                stores_managed: storesManaged,
                page: "consultants_landing",
            });

            setStatus("success");
        } catch (exception) {
            setStatus("error");
            setError(
                exception instanceof Error
                    ? exception.message
                    : "Erro inesperado ao enviar o formulário."
            );

            trackMetaEvent("LeadFormError", {
                source,
                role,
            });
        }
    }

    function buildFormspreePayload(payload: LeadPayload) {
        const formData = new FormData();

        formData.append("name", payload.name);
        formData.append("email", payload.email);
        formData.append("role", payload.role);
        formData.append("company", payload.company);
        formData.append("storesManaged", payload.storesManaged);
        formData.append("mainChallenge", payload.mainChallenge);
        formData.append("sourcePage", payload.sourcePage);
        formData.append("modalSource", payload.modalSource);

        if (payload.utmSource) {
            formData.append("utmSource", payload.utmSource);
        }

        if (payload.utmMedium) {
            formData.append("utmMedium", payload.utmMedium);
        }

        if (payload.utmCampaign) {
            formData.append("utmCampaign", payload.utmCampaign);
        }

        if (payload.utmContent) {
            formData.append("utmContent", payload.utmContent);
        }

        if (payload.utmTerm) {
            formData.append("utmTerm", payload.utmTerm);
        }

        formData.append("_subject", "Novo lead Ohrly - Landing consultores");
        formData.append("_replyto", payload.email);

        return formData;
    }

    if (status === "success") {
        return (
            <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-700">
                    <CheckCircle2 className="h-7 w-7" />
                </div>

                <p className="mt-5 text-2xl font-black text-emerald-950">
                    Recebemos seu pedido.
                </p>

                <p className="mt-2 text-sm leading-6 text-emerald-800">
                    Vamos analisar o contexto e retornar com o melhor caminho para testar o
                    Ohrly com uma loja real.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className="text-sm font-bold uppercase tracking-wide text-violet-700">
                Teste com uma loja
            </p>

            <h3 className="mt-2 pr-10 text-2xl font-black tracking-tight text-slate-950">
                Gere um diagnóstico para apresentar a um cliente
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
                Deixe seu contato e conte qual tipo de loja você atende. A primeira
                conversa serve para validar se o Ohrly encaixa no seu fluxo de trabalho.
            </p>

            {error && (
                <div className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                    {error}
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Nome" value={name} onChange={setName} placeholder="Seu nome" />

                <Input
                    label="Email profissional"
                    value={email}
                    onChange={setEmail}
                    placeholder="voce@empresa.com"
                    type="email"
                    required
                />

                <Select
                    label="Você atua como"
                    value={role}
                    onChange={setRole}
                    options={[
                        { value: "gestor_trafego", label: "Gestor de tráfego" },
                        { value: "consultor_ecommerce", label: "Consultor de e-commerce" },
                        { value: "agencia", label: "Agência" },
                        { value: "especialista_plataforma", label: "Especialista Nuvemshop/Shopify" },
                        { value: "lojista", label: "Lojista" },
                    ]}
                />

                <Input
                    label="Empresa ou operação"
                    value={company}
                    onChange={setCompany}
                    placeholder="Agência, consultoria ou loja"
                />

                <Select
                    label="Quantas lojas você acompanha?"
                    value={storesManaged}
                    onChange={setStoresManaged}
                    options={[
                        { value: "1", label: "1 loja" },
                        { value: "1-5", label: "1 a 5 lojas" },
                        { value: "6-20", label: "6 a 20 lojas" },
                        { value: "20+", label: "Mais de 20 lojas" },
                    ]}
                />

                <div className="md:col-span-2">
                    <Textarea
                        label="Qual problema você mais precisa provar para o lojista?"
                        value={mainChallenge}
                        onChange={setMainChallenge}
                        placeholder="Ex.: o tráfego chega, mas a loja não converte; o cliente não identifica compradores; não consigo provar retorno..."
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!canSubmit || status === "loading"}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-violet-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-violet-700/20 transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {status === "loading" ? (
                    <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Enviando...
                    </>
                ) : (
                    <>
                        Quero testar com uma loja
                        <Send className="h-5 w-5" />
                    </>
                )}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Sem compromisso. A ideia é validar se o Ohrly ajuda no seu processo de
                diagnóstico, entrega e prova de retorno.
            </p>
        </form>
    );
}

function Input({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    required?: boolean;
}) {
    return (
        <label className="block">
            <span className="text-sm font-bold text-slate-800">{label}</span>
            <input
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                type={type}
                required={required}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
        </label>
    );
}

function Select({
    label,
    value,
    onChange,
    options,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Array<{ value: string; label: string }>;
}) {
    return (
        <label className="block">
            <span className="text-sm font-bold text-slate-800">{label}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    );
}

function Textarea({
    label,
    value,
    onChange,
    placeholder,
    required = false,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
}) {
    return (
        <label className="block">
            <span className="text-sm font-bold text-slate-800">{label}</span>
            <textarea
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                required={required}
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
            />
        </label>
    );
}

function getUtmParams() {
    if (typeof window === "undefined") return {};

    const params = new URLSearchParams(window.location.search);

    return {
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        utmContent: params.get("utm_content") ?? undefined,
        utmTerm: params.get("utm_term") ?? undefined,
    };
}