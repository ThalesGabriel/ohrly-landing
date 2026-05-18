import Link from "next/link";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Cloud,
    Database,
    Eye,
    Landmark,
    PauseCircle,
    Play,
    ShieldCheck,
    Sparkles,
    Target,
} from "lucide-react";
import Hero from "@/components/Hero";
import DefaultPage from "@/components/DefaultPage";
import CallToAction from "@/components/CallToAction";

type CaseStudy = {
    slug: string;
    status: string;
    category: string;
    title: string;
    description: string;
    highlights: string[];
    insight: string;
    href: string;
    featured?: boolean;
    icon: React.ElementType;
    accent: "blue" | "green" | "purple" | "orange";
};

const cases: CaseStudy[] = [
    {
        slug: "central-156-emlurb",
        status: "Caso fundacional",
        category: "Operação pública",
        title: "Quando uma operação parecia estável, mas já perdia capacidade de recuperação",
        description:
            "Estudo com dados públicos da Central 156 / EMLURB com aproximadamente 86 mil solicitações para investigar persistência, ciclo de recuperação, propagação e mudança de regime.",
        highlights: [
            "Persistência operacional",
            "Ciclo de recuperação",
            "Propagação",
            "Linha do tempo comportamental",
        ],
        insight: "A operação não quebrou; ela mudou de regime.",
        href: "/cases/central-156-emlurb",
        featured: true,
        icon: Landmark,
        accent: "blue",
    },
    {
        slug: "fraude-trajetorias",
        status: "Exploração de trajetória",
        category: "Fraude",
        title: "Contexto de fraudes",
        description:
            "Um estudo sobre fraudes revelou que o modelo do ohrly melhora a eficiência de detectores.",
        highlights: ["Persistência", "Aceleração", "Densidade", "Momentum"],
        insight: "Desvio isolado gera ruído; trajetória gera contexto.",
        href: "/casos/fraude-trajetorias",
        icon: ShieldCheck,
        accent: "purple",
    },
];

const readingGuides: {
    title: string;
    description: string;
    icon: React.ElementType;
    accent: "blue" | "green" | "purple" | "orange";
}[] = [
        {
            title: "Não afirmam causalidade automática",
            description:
                "Não atribuem causa direta entre variáveis. O foco é descrever padrões de comportamento.",
            icon: PauseCircle,
            accent: "blue",
        },
        {
            title: "Reconstruem comportamento histórico",
            description:
                "A análise parte do que já aconteceu para mapear trajetórias e mudanças de regime.",
            icon: Database,
            accent: "green",
        },
        {
            title: "Buscam quando esperar deixou de ser neutro",
            description:
                "Identificam o ponto em que a espera acumulada passa a carregar risco operacional.",
            icon: Target,
            accent: "orange",
        },
        {
            title: "Tornam o estado atual interpretável",
            description:
                "Transformam sinais dispersos em leitura clara sobre o que a operação está vivendo.",
            icon: Eye,
            accent: "purple",
        },
    ];

const accentStyles = {
    blue: {
        iconBox:
            "bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20 border border-blue-400/20",
        badge:
            "bg-blue-500/10 text-blue-300 ring-1 ring-blue-400/20 border border-blue-400/20",
        soft: "bg-blue-500/10 text-blue-200 border border-blue-400/20",
        link: "text-blue-300 group-hover:text-blue-200",
    },
    green: {
        iconBox:
            "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20 border border-emerald-400/20",
        badge:
            "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20 border border-emerald-400/20",
        soft: "bg-emerald-500/10 text-emerald-200 border border-emerald-400/20",
        link: "text-emerald-300 group-hover:text-emerald-200",
    },
    purple: {
        iconBox:
            "bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/20 border border-violet-400/20",
        badge:
            "bg-violet-500/10 text-violet-300 ring-1 ring-violet-400/20 border border-violet-400/20",
        soft: "bg-violet-500/10 text-violet-200 border border-violet-400/20",
        link: "text-violet-300 group-hover:text-violet-200",
    },
    orange: {
        iconBox:
            "bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20 border border-orange-400/20",
        badge:
            "bg-orange-500/10 text-orange-300 ring-1 ring-orange-400/20 border border-orange-400/20",
        soft: "bg-orange-500/10 text-orange-200 border border-orange-400/20",
        link: "text-orange-300 group-hover:text-orange-200",
    },
};

export default function CasesPage() {
    const featuredCase = cases.find((item) => item.featured);
    const otherCases = cases.filter((item) => !item.featured);

    return (
        <DefaultPage>

            <Hero
                summary="Leituras aplicadas da tese Ohrly"
                title="Estudos"
                titleHighlight="operacionais"
                description="Investigações aplicadas que mostram como a degradação silenciosa aparece antes dos incidentes, dos alertas críticos e das decisões tardias."
                rightHightlight={<HeroGraphic />}
                labelButton1="Entender o método"
                hrefButton1="/how-it-works"
                labelButton2="Diagnosticar meu fluxo"
                hrefButton2="/diagnostic"
            />

            <section className="relative mx-auto max-w-7xl py-8">
                {featuredCase && <FeaturedCaseCard study={featuredCase} />}

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {otherCases.map((study) => (
                        <CaseCard key={study.slug} study={study} />
                    ))}
                </div>
            </section>

            <section className="relative mx-auto max-w-7xl pb-8">
                <div className="mb-6">
                    <h2 className="text-3xl font-black tracking-tight text-white">
                        Como ler estes estudos
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
                        Eles não são promessas comerciais. São leituras aplicadas para
                        mostrar como o Ohrly transforma dados históricos em compreensão
                        operacional.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {readingGuides.map((item) => (
                        <GuideCard key={item.title} item={item} />
                    ))}
                </div>
            </section>

            <CallToAction
                title="Quer aplicar essa leitura ao seu fluxo?"
                description="Descubra como podemos te ajudar a diagnósticá-lo"
                labelButton="Rodar diagnóstico"
            />

        </DefaultPage>
    );
}

function FeaturedCaseCard({ study }: { study: CaseStudy }) {
    const Icon = study.icon;

    return (
        <article className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl lg:p-8">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_430px]">
                <div>
                    <div className="mb-7 flex flex-wrap items-center gap-3">
                        <span className="inline-flex items-center gap-2 rounded-lg border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-sm font-bold text-violet-200">
                            <Sparkles className="h-4 w-4" />
                            {study.status}
                        </span>

                        <span className="text-sm font-semibold text-slate-500">|</span>

                        <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300">
                            <Icon className="h-4 w-4" />
                            {study.category}
                        </span>
                    </div>

                    <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight text-white">
                        {study.title}
                    </h2>

                    <p className="mt-5 max-w-3xl text-base leading-8 text-slate-300">
                        {study.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-3">
                        {study.highlights.map((highlight) => (
                            <span
                                key={highlight}
                                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-100"
                            >
                                <CheckCircle2 className="h-4 w-4 text-violet-300" />
                                {highlight}
                            </span>
                        ))}
                    </div>

                    <div className="mt-7 rounded-xl border border-orange-400/20 bg-orange-500/10 px-5 py-4 text-lg font-black text-orange-100">
                        <span className="mr-2 text-orange-300">💡</span>
                        {study.insight}
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-6">
                    <BehaviorTimelinePreview />

                    <Link
                        href={study.href}
                        className="inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 px-6 py-4 text-sm font-black text-white shadow-lg shadow-violet-900/40 transition hover:scale-[1.01] hover:from-violet-400 hover:to-fuchsia-400"
                    >
                        Ver estudo completo
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </article>
    );
}

function CaseCard({ study }: { study: CaseStudy }) {
    const Icon = study.icon;
    const styles = accentStyles[study.accent];

    return (
        <article className="group flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white/[0.06]">
            <div className="flex items-start gap-4">
                <div className={`rounded-2xl p-4 ${styles.iconBox}`}>
                    <Icon className="h-7 w-7" />
                </div>

                <div>
                    <h3 className="text-xl font-black tracking-tight text-white">
                        {study.title.split(":")[0]}
                    </h3>

                    <span className={`mt-2 inline-flex rounded-md px-2 py-1 text-xs font-bold ${styles.badge}`}>
                        {study.status}
                    </span>
                </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-300">
                {study.description}
            </p>

            <Link
                href={study.href}
                className={`mt-auto inline-flex items-center gap-2 pt-5 text-sm font-black transition ${styles.link}`}
            >
                Ver leitura
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
        </article>
    );
}

function GuideCard({
    item,
}: {
    item: {
        title: string;
        description: string;
        icon: React.ElementType;
        accent: "blue" | "green" | "purple" | "orange";
    };
}) {
    const Icon = item.icon;
    const styles = accentStyles[item.accent];

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 shadow-lg shadow-black/20 backdrop-blur-xl">
            <div className={`mb-5 inline-flex rounded-2xl p-3 ${styles.iconBox}`}>
                <Icon className="h-7 w-7" />
            </div>

            <h3 className="text-lg font-black leading-tight text-white">
                {item.title}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
            </p>
        </div>
    );
}

function HeroGraphic() {
    return (
        <div className="relative hidden min-h-[280px] lg:block">
            <div className="absolute right-6 top-8 h-28 w-28 rounded-full border-[18px] border-blue-500/25" />
            <div className="absolute right-3 top-[120px] h-16 w-5 -rotate-45 rounded-full bg-blue-500/25" />

            <svg viewBox="0 0 520 250" className="absolute inset-0 h-full w-full">
                <defs>
                    <linearGradient id="heroLine" x1="0" x2="1">
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="50%" stopColor="#2563eb" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>

                <path
                    d="M30 180 C90 170, 85 80, 140 95 S205 160, 250 110 S315 65, 350 115 S425 130, 470 30"
                    fill="none"
                    stroke="url(#heroLine)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                {[30, 140, 250, 350, 470].map((x, index) => (
                    <g key={x}>
                        <line
                            x1={x}
                            y1={index === 4 ? 30 : index === 0 ? 180 : index === 1 ? 95 : index === 2 ? 110 : 115}
                            x2={x}
                            y2="220"
                            stroke="#93c5fd"
                            strokeDasharray="4 6"
                        />
                        <circle
                            cx={x}
                            cy={index === 4 ? 30 : index === 0 ? 180 : index === 1 ? 95 : index === 2 ? 110 : 115}
                            r="7"
                            fill={index === 0 ? "#22c55e" : index === 4 ? "#ef4444" : "white"}
                        />
                    </g>
                ))}
            </svg>
        </div>
    );
}

function BehaviorTimelinePreview() {
    const states = [
        { label: "Normal", sub: "Estabilidade operacional", color: "bg-emerald-400" },
        { label: "Atenção", sub: "Sinais de acúmulo", color: "bg-amber-400" },
        { label: "Degradação", sub: "Recuperação mais lenta", color: "bg-orange-400" },
        { label: "Incidente", sub: "Perda de capacidade", color: "bg-red-400" },
    ];

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h3 className="mb-5 text-xl font-black text-white">
                Linha do tempo comportamental
            </h3>

            <div className="rounded-xl border border-white/10 bg-[#0b1024] p-4">
                <svg viewBox="0 0 360 150" className="h-40 w-full">
                    <path
                        d="M10 100 L55 115 L100 72 L145 104 L190 63 L235 62 L280 35 L330 20 L355 26"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    <path
                        d="M10 100 L55 115 L100 72"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {[55, 100, 190, 280, 330].map((x, index) => (
                        <circle
                            key={x}
                            cx={x}
                            cy={[115, 72, 63, 35, 20][index]}
                            r="6"
                            fill="#050816"
                            stroke={index < 2 ? "#34d399" : index < 4 ? "#f59e0b" : "#f87171"}
                            strokeWidth="3"
                        />
                    ))}
                </svg>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {states.map((state) => (
                    <div key={state.label}>
                        <div className="mb-2 flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${state.color}`} />
                            <p className="text-sm font-black text-white">{state.label}</p>
                        </div>
                        <p className="text-xs leading-5 text-slate-400">{state.sub}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}