import DefaultPage from "@/components/DefaultPage";
import Hero from "@/components/Hero";

type ProblemSignal = {
    title: string;
    description: string;
    icon: "retry" | "handoff" | "clock" | "friction" | "exception";
};

type InvestigationArea = {
    title: string;
    description: string;
    icon: "chat" | "cart" | "bot" | "fingerprint" | "plus" | "retry" | "clock" | "exception";
};

type Study = {
    title: string;
    tag: string;
    description: string;
};

type Metric = {
    value: string;
    label: string;
};

const problemSignals: ProblemSignal[] = [
    {
        title: "Checkout mais lento",
        description: "Pequenas fricções aumentam sem parecer incidente.",
        icon: "clock",
    },
    {
        title: "Mais abandono",
        description: "A conversão cai aos poucos antes de virar problema óbvio.",
        icon: "friction",
    },
    {
        title: "Pagamentos demorando",
        description: "A aprovação acontece, mas fora do comportamento esperado.",
        icon: "retry",
    },
    {
        title: "Entrega pressionada",
        description: "Atrasos persistentes aparecem antes da reclamação escalar.",
        icon: "handoff",
    },
    {
        title: "Mais retrabalho",
        description: "Exceções operacionais viram rotina silenciosa.",
        icon: "exception",
    },
];

const investigationAreas: InvestigationArea[] = [
    {
        title: "Checkout",
        description: "O fluxo continua funcionando, mas a conversão começa a cair gradualmente.",
        icon: "cart",
    },
    {
        title: "Pagamento",
        description: "A aprovação continua acontecendo, mas demora mais do que o comportamento normal.",
        icon: "clock",
    },
    {
        title: "Entrega",
        description: "Pedidos continuam sendo entregues, mas atrasos persistentes começam a se acumular.",
        icon: "bot",
    },
    {
        title: "Carrinho",
        description: "A recuperação perde força antes de aparecer como queda evidente de receita.",
        icon: "retry",
    },
    {
        title: "Pós-compra",
        description: "Exceções, reclamações e retrabalho crescem antes do incidente formal.",
        icon: "exception",
    },
];

const metrics: Metric[] = [
    {
        value: "+18%",
        label: "Abandono",
    },
    {
        value: "+27%",
        label: "Tempo médio",
    },
    {
        value: "+14%",
        label: "Exceções",
    },
];

const studies: Study[] = [
    {
        title: "Olist",
        tag: "E-commerce",
        description:
            "Detectamos degradação em fluxos críticos de compra e entrega antes da queda se tornar óbvia.",
    },
    {
        title: "Checkout",
        tag: "Conversão",
        description:
            "Leitura de fricções graduais que podem afetar conclusão de compra sem quebrar o fluxo.",
    },
    {
        title: "Pagamento",
        tag: "Operação",
        description:
            "Identificação de atrasos persistentes em aprovação antes de virarem reclamação ou retrabalho.",
    },
];

export default function HomePage() {
    return (
        <DefaultPage>
            <Hero
                summary="Leitura de saúde operacional para e-commerce"
                title="Seu e-commerce não precisa sair do ar"
                titleHighlight="para começar a perder dinheiro."
                description="O Ohrly identifica quando checkout, pagamento, entrega e carrinho continuam funcionando, mas começam a se comportar pior do que o normal, antes disso virar reclamação, queda de conversão ou retrabalho."
                labelButton1="Ver como funciona"
                hrefButton1="/how-it-works"
                labelButton2="Diagnosticar um fluxo"
                hrefButton2="/diagnostic"
                rightHightlight={<BehaviorChartCard />}
            />

            <ProblemSection />

            <InvestigationSection />

            <WhatOhrlyDoesSection />

            <WhyItMattersSection />

            <FinalCta />
        </DefaultPage>
    );
}

function BehaviorChartCard() {
    return (
        <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-transparent to-red-500/10" />

            <div className="relative">
                <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                        <h2 className="font-medium text-white">
                            Checkout funcionando, conversão degradando
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Exemplo de janela operacional antes da queda ficar óbvia
                        </p>
                    </div>

                    <span className="rounded-lg bg-indigo-400/10 px-3 py-1 text-xs font-medium text-indigo-200">
                        Janela Operacional de Decisão
                    </span>
                </div>

                <div className="relative h-[250px] overflow-hidden rounded-2xl border border-white/10 bg-[#030712]/70">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:48px_48px]" />

                    <div className="absolute left-[36%] top-0 h-full w-[28%] bg-yellow-400/10 ring-1 ring-yellow-300/20" />
                    <div className="absolute left-[64%] top-0 h-full w-[18%] bg-orange-500/10 ring-1 ring-orange-400/20" />
                    <div className="absolute left-[82%] top-0 h-full w-[18%] bg-red-500/10 ring-1 ring-red-400/20" />

                    <svg
                        viewBox="0 0 760 240"
                        className="absolute inset-x-4 top-3 h-[180px] w-[calc(100%-2rem)]"
                        role="img"
                        aria-label="Linha de comportamento degradando progressivamente"
                    >
                        <defs>
                            <linearGradient id="line-gradient" x1="0" x2="1" y1="0" y2="0">
                                <stop offset="0%" stopColor="#86efac" />
                                <stop offset="38%" stopColor="#a3e635" />
                                <stop offset="58%" stopColor="#facc15" />
                                <stop offset="78%" stopColor="#fb923c" />
                                <stop offset="100%" stopColor="#ef4444" />
                            </linearGradient>
                        </defs>

                        <path
                            d="M0 135 C25 118, 44 126, 67 122 C96 117, 119 133, 146 121 C172 109, 199 132, 228 117 C258 101, 285 128, 315 119 C345 111, 370 136, 398 128 C426 119, 454 126, 482 123 C510 118, 536 124, 562 112 C590 99, 614 104, 640 92 C668 80, 694 67, 720 54 C736 46, 750 38, 760 31"
                            fill="none"
                            stroke="url(#line-gradient)"
                            strokeLinecap="round"
                            strokeWidth="4"
                        />

                        <line
                            x1="292"
                            x2="292"
                            y1="16"
                            y2="210"
                            stroke="rgba(255,255,255,0.55)"
                            strokeDasharray="4 6"
                        />
                        <circle
                            cx="292"
                            cy="120"
                            r="8"
                            fill="#020617"
                            stroke="#f8fafc"
                            strokeWidth="3"
                        />

                        <line
                            x1="500"
                            x2="500"
                            y1="16"
                            y2="210"
                            stroke="rgba(255,255,255,0.3)"
                            strokeDasharray="4 6"
                        />
                    </svg>

                    <div className="absolute left-[41%] top-20 rounded-xl border border-yellow-200/10 bg-yellow-300/10 px-4 py-3 text-sm text-yellow-50 shadow-xl backdrop-blur">
                        Aqui decisões
                        <br />
                        mudam o resultado.
                    </div>

                    <div className="absolute bottom-5 grid w-full grid-cols-4 px-5 text-center text-xs sm:text-sm">
                        <Stage label="NORMAL" description="Comportamento esperado" tone="green" />
                        <Stage label="VARIAÇÃO" description="Pequenas mudanças aparecem" tone="yellow" />
                        <Stage label="DEGRADAÇÃO" description="Desvio persistente" tone="orange" />
                        <Stage label="INCIDENTE" description="Impacto explícito" tone="red" />
                    </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center text-sm text-slate-300">
                    A maioria das ferramentas só mostra o problema quando o impacto já ficou caro.
                </div>
            </div>
        </div>
    );
}

function Stage({
    label,
    description,
    tone,
}: {
    label: string;
    description: string;
    tone: "green" | "yellow" | "orange" | "red";
}) {
    const toneClass = {
        green: "text-emerald-300",
        yellow: "text-yellow-300",
        orange: "text-orange-300",
        red: "text-red-300",
    }[tone];

    return (
        <div className="px-2">
            <p className={`font-semibold ${toneClass}`}>{label}</p>
            <p className="mt-1 hidden text-slate-300 sm:block">{description}</p>
        </div>
    );
}

function ProblemSection() {
    return (
        <section className="relative z-10 border-t border-white/10 pt-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
                <div>
                    <h2 className="text-3xl font-semibold tracking-tight text-white">
                        A loja continua vendendo. Mas algo já começou a degradar.
                    </h2>

                    <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
                        Em e-commerce, muitos problemas não começam quando algo quebra.
                        Começam quando fluxos essenciais seguem funcionando, mas passam a
                        operar com mais fricção, mais demora e menos previsibilidade.
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                        {problemSignals.map((item) => (
                            <div key={item.title}>
                                <Icon name={item.icon} className="h-9 w-9 text-indigo-300" />
                                <h3 className="mt-4 font-medium text-white">{item.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-400">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                    <p className="mb-5 font-medium text-white">Enquanto isso:</p>

                    <div className="space-y-4">
                        {[
                            "O checkout continua no ar",
                            "Pagamentos ainda são aprovados",
                            "Pedidos continuam sendo entregues",
                        ].map((text) => (
                            <div key={text} className="flex items-center gap-3 text-slate-200">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300/50 text-xs text-emerald-300">
                                    ✓
                                </span>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>

                    <p className="mt-7 text-lg leading-7 text-slate-200">
                        Essa é a janela em que a perda começa.
                        <br />
                        <span className="text-slate-400">
                            E quase sempre ela aparece antes do alerta.
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}

function InvestigationSection() {
    return (
        <section className="relative z-10 border-t border-white/10 pt-8">
            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white">
                Lemos o comportamento dos fluxos que sustentam a operação do e-commerce.
            </h2>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-400">
                O objetivo não é mostrar mais gráficos. É revelar quando um fluxo crítico
                deixou de oscilar de forma saudável e começou a acumular pressão operacional.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {investigationAreas.map((item) => (
                    <article
                        key={item.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.035] p-5 transition hover:border-indigo-300/40 hover:bg-indigo-400/[0.06]"
                    >
                        <Icon name={item.icon} className="h-8 w-8 text-indigo-300" />
                        <h3 className="mt-4 font-medium text-indigo-100">{item.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-slate-400">
                            {item.description}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}

function WhatOhrlyDoesSection() {
    return (
        <section
            id="how"
            className="relative z-10 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[0.8fr_1.2fr]"
        >
            <div>
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
                    O que o Ohrly entrega
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white">
                    Uma leitura de saúde operacional dos seus fluxos.
                </h2>

                <p className="mt-5 max-w-md leading-7 text-slate-400">
                    O Ohrly não substitui seus dashboards, APMs ou relatórios. Ele
                    interpreta o comportamento histórico dos fluxos e mostra quando algo
                    deixou de funcionar como antes.
                </p>

                <p className="mt-6 max-w-md leading-7 text-slate-300">
                    O foco não é gerar mais alerta. É responder: o que mudou, há quanto
                    tempo, onde concentra e por que isso importa agora.
                </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl shadow-black/20">
                <div className="mb-7 flex items-center justify-between">
                    <p className="font-medium text-white">Leitura Ohrly</p>
                    <span className="rounded-lg bg-indigo-400/10 px-3 py-1 text-xs text-indigo-200">
                        Exemplo para e-commerce
                    </span>
                </div>

                <div className="grid gap-6 sm:grid-cols-[32px_1fr]">
                    <div className="hidden flex-col items-center sm:flex">
                        <span className="h-3 w-3 rounded-full bg-slate-300" />
                        <span className="h-20 w-px bg-white/20" />
                        <span className="h-3 w-3 rounded-full bg-slate-300" />
                        <span className="h-20 w-px bg-white/20" />
                        <span className="h-3 w-3 rounded-full bg-slate-300" />
                    </div>

                    <div>
                        <p className="max-w-2xl text-xl leading-8 text-white">
                            O fluxo de entrega entrou há 6 dias em degradação sustentada.
                        </p>

                        <div className="mt-7 grid gap-4 sm:grid-cols-3">
                            {metrics.map((metric) => (
                                <div
                                    key={metric.label}
                                    className="rounded-2xl border border-white/10 bg-[#020617]/50 p-4"
                                >
                                    <p className="text-3xl font-semibold text-lime-300">
                                        {metric.value}
                                    </p>
                                    <p className="mt-2 text-sm text-slate-400">{metric.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-5 rounded-2xl border border-white/10 bg-[#020617]/50 p-4">
                            <p className="text-lg font-medium text-lime-300">
                                Pressão operacional crescente
                            </p>
                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                O comportamento ultrapassou o ciclo natural de recuperação e
                                começa a expor pedidos, atendimento e retrabalho.
                            </p>
                        </div>

                        <p className="mt-6 leading-7 text-slate-300">
                            A operação ainda funciona, mas já não se comporta como antes.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WhyItMattersSection() {
    return (
        <section id="why" className="relative z-10 border-t border-white/10 pt-10">
            <div className="mb-10 max-w-3xl">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
                    Por que isso importa
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    O custo aparece antes da reclamação, da queda brusca e do incidente.
                </h2>

                <p className="mt-4 text-lg leading-8 text-slate-400">
                    Entre o fluxo saudável e o impacto explícito existe uma janela onde agir
                    ainda é mais barato, reversível e menos político.
                </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-4 lg:gap-4">
                    <TimelinePoint
                        index="01"
                        title="Normal"
                        description="Checkout, pagamento, entrega e carrinho seguem dentro do comportamento esperado."
                        tone="green"
                    />

                    <TimelinePoint
                        index="02"
                        title="Variação"
                        description="Pequenos sinais aparecem, mas ainda parecem ruído, sazonalidade ou oscilação normal."
                        tone="yellow"
                        highlighted
                    />

                    <TimelinePoint
                        index="03"
                        title="Degradação"
                        description="O desvio persiste, ultrapassa o ciclo natural de recuperação e começa a acumular custo."
                        tone="orange"
                    />

                    <TimelinePoint
                        index="04"
                        title="Impacto"
                        description="A queda de conversão, reclamação ou retrabalho se torna explícita e difícil de ignorar."
                        tone="red"
                    />
                </div>

                <div className="relative mt-10 hidden lg:block">
                    <div className="h-1 rounded-full bg-gradient-to-r from-emerald-300 via-yellow-300 via-orange-400 to-red-500" />

                    <div className="absolute left-[12.5%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#07111f] bg-emerald-300" />
                    <div className="absolute left-[37.5%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#07111f] bg-yellow-300" />
                    <div className="absolute left-[62.5%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#07111f] bg-orange-400" />
                    <div className="absolute left-[87.5%] top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#07111f] bg-red-400" />

                    <div className="absolute left-[25%] top-1/2 h-px w-[25%] -translate-y-1/2 border-t border-dashed border-yellow-200/40" />
                </div>

                <TimelineWindow />

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    <InsightCard
                        label="O que muda"
                        text="O fluxo deixa de apenas variar e passa a operar fora do comportamento historicamente esperado."
                    />
                    <InsightCard
                        label="O que importa"
                        text="Persistência, contexto e recuperação dizem mais do que um pico isolado."
                    />
                    <InsightCard
                        label="O que o Ohrly mostra"
                        text="Há quanto tempo esperar deixou de ser uma escolha neutra."
                    />
                </div>
            </div>
        </section>
    );
}

function TimelineWindow() {
    return (
        <div className="mt-8 rounded-3xl border border-yellow-300/30 bg-yellow-300/[0.08] p-6 shadow-[0_0_70px_rgba(250,204,21,0.08)] lg:mx-auto lg:max-w-3xl">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-yellow-300">
                        Janela operacional de decisão
                    </p>

                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                        O momento em que agir ainda é barato.
                    </h3>
                </div>

                <p className="max-w-md text-base leading-7 text-slate-300">
                    Aqui o fluxo ainda funciona, mas já começou a se afastar do
                    comportamento esperado. A decisão ainda é reversível.
                </p>
            </div>
        </div>
    );
}

function TimelinePoint({
    index,
    title,
    description,
    tone,
    highlighted = false,
}: {
    index: string;
    title: string;
    description: string;
    tone: "green" | "yellow" | "orange" | "red";
    highlighted?: boolean;
}) {
    const styles = {
        green: {
            border: "border-emerald-300/25",
            bg: "bg-emerald-300/10",
            text: "text-emerald-300",
            dot: "bg-emerald-300",
        },
        yellow: {
            border: "border-yellow-300/30",
            bg: "bg-yellow-300/10",
            text: "text-yellow-300",
            dot: "bg-yellow-300",
        },
        orange: {
            border: "border-orange-400/30",
            bg: "bg-orange-400/10",
            text: "text-orange-300",
            dot: "bg-orange-400",
        },
        red: {
            border: "border-red-400/30",
            bg: "bg-red-400/10",
            text: "text-red-300",
            dot: "bg-red-400",
        },
    }[tone];

    return (
        <article
            className={[
                "rounded-2xl border p-5 transition",
                styles.border,
                highlighted
                    ? `${styles.bg} shadow-[0_0_50px_rgba(250,204,21,0.06)]`
                    : "bg-white/[0.025]",
            ].join(" ")}
        >
            <div className="mb-5 flex items-center justify-between">
                <span className={`text-sm font-semibold ${styles.text}`}>{index}</span>
                <span className={`h-3 w-3 rounded-full ${styles.dot}`} />
            </div>

            <h3 className={`text-xl font-semibold ${styles.text}`}>{title}</h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
        </article>
    );
}

function InsightCard({ label, text }: { label: string; text: string }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-[#020617]/50 p-5">
            <p className="text-sm font-medium text-indigo-300">{label}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{text}</p>
        </div>
    );
}

function FinalCta() {
    return (
        <section
            id="contact"
            className="relative z-10 overflow-hidden rounded-3xl border border-indigo-300/20 bg-gradient-to-r from-indigo-950 via-violet-950 to-indigo-950 p-8 shadow-2xl shadow-indigo-950/40"
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(129,140,248,0.25),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(168,85,247,0.18),transparent_30%)]" />

            <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                <div className="flex gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-indigo-300/20 bg-white/5">
                        <Icon name="pulse" className="h-8 w-8 text-indigo-200" />
                    </div>

                    <div>
                        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-white">
                            Mostre um fluxo do seu e-commerce que parece estar perdendo força.
                        </h2>
                        <p className="mt-2 text-lg text-indigo-100/80">
                            Vamos transformar histórico operacional em uma leitura clara.
                        </p>
                    </div>
                </div>

                <a
                    href="/diagnostic"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-violet-500 transition hover:-translate-y-0.5 hover:bg-violet-700"
                >
                    Diagnosticar checkout, pagamento ou entrega
                </a>
            </div>
        </section>
    );
}

function Icon({
    name,
    className,
}: {
    name:
        | ProblemSignal["icon"]
        | InvestigationArea["icon"]
        | "pulse";
    className?: string;
}) {
    const commonProps = {
        className,
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        stroke: "currentColor",
        strokeWidth: 1.7,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    switch (name) {
        case "retry":
            return (
                <svg {...commonProps}>
                    <path d="M17 2v5h-5" />
                    <path d="M7 22v-5h5" />
                    <path d="M19 9a7 7 0 0 0-11.9-4.9L5 6" />
                    <path d="M5 15a7 7 0 0 0 11.9 4.9L19 18" />
                </svg>
            );

        case "handoff":
            return (
                <svg {...commonProps}>
                    <path d="M7 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M17 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
                    <path d="M3 22v-2a4 4 0 0 1 4-4h1" />
                    <path d="M13 22v-2a4 4 0 0 1 4-4h4" />
                    <path d="M10 15h4" />
                </svg>
            );

        case "clock":
            return (
                <svg {...commonProps}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 2" />
                </svg>
            );

        case "friction":
            return (
                <svg {...commonProps}>
                    <path d="M7 8h10" />
                    <path d="M5 12h14" />
                    <path d="M7 16h10" />
                    <path d="M4 4l16 16" />
                </svg>
            );

        case "exception":
            return (
                <svg {...commonProps}>
                    <path d="M12 3a7 7 0 0 0-7 7v4a4 4 0 0 0 4 4h1l2 3 2-3h1a4 4 0 0 0 4-4v-4a7 7 0 0 0-7-7Z" />
                    <path d="M9 10h.01" />
                    <path d="M15 10h.01" />
                    <path d="M9.5 14c1.5 1 3.5 1 5 0" />
                </svg>
            );

        case "chat":
            return (
                <svg {...commonProps}>
                    <path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-7a8 8 0 1 1 18-4Z" />
                    <path d="M8 12h.01" />
                    <path d="M12 12h.01" />
                    <path d="M16 12h.01" />
                </svg>
            );

        case "cart":
            return (
                <svg {...commonProps}>
                    <path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L20 8H6" />
                    <circle cx="10" cy="20" r="1.5" />
                    <circle cx="17" cy="20" r="1.5" />
                </svg>
            );

        case "bot":
            return (
                <svg {...commonProps}>
                    <rect x="5" y="8" width="14" height="10" rx="3" />
                    <path d="M12 4v4" />
                    <path d="M9 13h.01" />
                    <path d="M15 13h.01" />
                    <path d="M9 17h6" />
                    <path d="M3 12h2" />
                    <path d="M19 12h2" />
                </svg>
            );

        case "fingerprint":
            return (
                <svg {...commonProps}>
                    <path d="M12 11a3 3 0 0 1 3 3c0 2.5-.8 4.8-2.1 6.7" />
                    <path d="M9 14a3 3 0 0 1 6 0" />
                    <path d="M6.5 17a8.3 8.3 0 0 1-.5-3 6 6 0 0 1 12 0" />
                    <path d="M18 18.5a12.7 12.7 0 0 0 1-4.5 7 7 0 0 0-14 0" />
                    <path d="M9.5 20.5A10.5 10.5 0 0 0 11 14" />
                    <path d="M3 14a9 9 0 0 1 18 0" />
                </svg>
            );

        case "plus":
            return (
                <svg {...commonProps}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                </svg>
            );

        case "pulse":
            return (
                <svg {...commonProps}>
                    <path d="M3 12h4l2-6 4 12 2-6h6" />
                </svg>
            );

        default:
            return null;
    }
}