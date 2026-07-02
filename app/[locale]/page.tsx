import { PageShell } from "@/components/layout/PageShell";
import {
    ArrowRight,
    BarChart3,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    CircleGauge,
    Flag,
    GraduationCap,
    HeartPulse,
    HelpCircle,
    MessageSquare,
    Network,
    Play,
    RefreshCw,
    ShoppingCart,
    Sparkles,
    TrendingUp,
    TriangleAlert,
    Users,
    Waves,
    Workflow,
    Headphones,
    Box,
    Eye,
    Heart,
    Settings,
    Computer,
} from "lucide-react";

const statusCards = [
    {
        label: "Saudável",
        value: "12",
        suffix: "fluxos",
        icon: Heart,
        iconClass: "text-emerald-500",
    },
    {
        label: "Em observação",
        value: "7",
        suffix: "fluxos",
        icon: Eye,
        iconClass: "text-amber-500",
    },
    {
        label: "Perda de consistência",
        value: "1",
        suffix: "fluxo",
        icon: HeartPulse,
        iconClass: "text-rose-500",
    },
];

const problemCards = [
    {
        title: "Atendimento",
        text: "Mais filas, recontatos e transbordos",
        icon: MessageSquare,
        iconClass: "bg-teal-700 text-white",
    },
    {
        title: "Vendas",
        text: "Mais abandono e pedidos não concluídos",
        icon: ShoppingCart,
        iconClass: "bg-blue-600 text-white",
    },
    {
        title: "Operação",
        text: "Mais exceções e retrabalho invisível",
        icon: Settings,
        iconClass: "bg-violet-600 text-white",
    },
    {
        title: "Gestão",
        text: "Mais dúvida sobre quando agir",
        icon: BarChart3,
        iconClass: "bg-cyan-700 text-white",
    },
];

const audienceCards = [
    {
        title: "Para gestores",
        text: "Visão clara da saúde da operação e do momento de agir.",
        icon: Users,
    },
    {
        title: "Para CX e Atendimento",
        text: "Redução de atritos, recontatos e melhoria da experiência.",
        icon: Headphones,
    },
    {
        title: "Para Produto e Operações",
        text: "Foco no que mais impacta os fluxos e acelera aprendizados.",
        icon: Box,
    },
    {
        title: "Para liderança",
        text: "Decisões mais seguras com contexto, prioridade e evidências.",
        icon: Flag,
    },
];

const methodSteps = [
    {
        number: "1",
        title: "Mapeamos os fluxos críticos",
        text: "Entendemos o fluxo, suas etapas, atores e dependências.",
        icon: Network,
    },
    {
        number: "2",
        title: "Definimos os sinais vitais",
        text: "Escolhemos métricas que mostram se o fluxo está saudável.",
        icon: HeartPulse,
    },
    {
        number: "3",
        title: "Identificamos janelas de atenção",
        text: "Detectamos desvios antes que virem problemas maiores.",
        icon: Eye,
    },
    {
        number: "4",
        title: "Acompanhamos recuperação e recorrência",
        text: "Validamos ações, aprendemos e evitamos recaídas.",
        icon: TrendingUp,
    },
];

const tools = [
    {
        title: "Check-up Operacional",
        text: "Leitura rápida da saúde do fluxo com diagnóstico e recomendações.",
        type: "score",
    },
    {
        title: "Painel de Saúde Operacional",
        text: "Acompanhe a evolução da saúde e compare fluxos e períodos.",
        type: "mini-chart",
    },
    {
        title: "Janelas de Decisão",
        text: "Veja onde e quando intervir para evitar deterioração do fluxo.",
        type: "list",
    },
    {
        title: "Laboratório de Fluxos",
        text: "Experimente hipóteses, simule impactos e aprenda com dados reais.",
        type: "flow",
    },
];

const useCases = [
    {
        title: "Fluxos Digitais",
        icon: Computer,
    },
    {
        title: "Atendimento e CX",
        icon: MessageSquare,
    },
    {
        title: "E-commerce",
        icon: ShoppingCart,
    },
    {
        title: "Operações internas",
        icon: Settings,
    },
];

const studies = [
    {
        title: "O que o V4 ensina sobre vender gestão, não aplicativo",
        text: "Lições práticas para reposicionar sua operação e criar valor contínuo.",
        image: "v4",
    },
    {
        title: "Quando o checkout funciona, mas perde consistência",
        text: "Por que pequenas variações no fluxo geram grandes perdas no resultado.",
        image: "cart",
    },
    {
        title: "Como escolas podem acompanhar a saúde dos seus fluxos",
        text: "Aplicando o método em processos educacionais para mais eficiência.",
        image: "school",
    },
];

export default function OhrlyLandingPage() {
    return (
        <PageShell>
            <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 pb-16 pt-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:pt-20">
                <div className="flex flex-col justify-center">
                    <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-teal-100 bg-white px-3 py-1 text-sm font-medium text-teal-800 shadow-sm">
                        <Sparkles className="h-4 w-4" />
                        Gestão da Saúde Operacional
                    </p>

                    <h1 className="max-w-2xl text-4xl font-black tracking-[-0.045em] text-[#06183d] sm:text-5xl lg:text-6xl">
                        Sua operação pode estar funcionando e ainda assim não estar saudável
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                        O Ohrly ajuda empresas a acompanhar a saúde operacional dos seus
                        fluxos críticos, identificando sinais de perda de consistência antes
                        que eles virem fila, reclamação, retrabalho ou queda de resultado.
                    </p>

                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <a
                            href="#checkup"
                            className="inline-flex h-12 items-center justify-center rounded-xl bg-[#003f4c] px-6 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition hover:bg-[#00313b]"
                        >
                            Fazer um check-up operacional
                        </a>

                        <a
                            href="#exemplo"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 text-sm font-bold text-[#07364a] shadow-sm transition hover:border-teal-700"
                        >
                            <Play className="h-4 w-4 fill-[#07364a]" />
                            Ver exemplo de leitura
                        </a>
                    </div>
                </div>

                <HeroDashboard />
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <h2 className="text-2xl font-black tracking-tight text-[#06183d]">
                    Nem todo problema começa quando algo quebra
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {problemCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full ${card.iconClass}`}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <div>
                                        <h3 className="font-black text-[#06183d]">{card.title}</h3>
                                        <p className="mt-1 text-sm leading-5 text-slate-600">
                                            {card.text}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <h2 className="text-2xl font-black tracking-tight text-[#06183d]">
                    Por que o Ohrly faz diferença na operação?
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {audienceCards.map((card) => {
                        const Icon = card.icon;

                        return (
                            <div
                                key={card.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                            >
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-50 text-cyan-800">
                                    <Icon className="h-7 w-7" />
                                </div>

                                <h3 className="font-black text-[#06183d]">{card.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {card.text}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section
                id="metodo"
                className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-6 py-10 lg:grid-cols-[0.75fr_1.25fr] lg:px-8"
            >
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-[#06183d]">
                        Método Ohrly de Saúde Operacional
                    </h2>
                    <p className="mt-4 max-w-sm text-base leading-7 text-slate-600">
                        Um método simples para acompanhar fluxos críticos como organismos
                        vivos.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                    {methodSteps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div key={step.number} className="relative">
                                <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                    <div className="mb-5 flex items-center justify-between">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-sm font-black text-teal-900">
                                            {step.number}
                                        </span>
                                        <Icon className="h-8 w-8 text-[#16455a]" />
                                    </div>

                                    <h3 className="text-sm font-black leading-5 text-[#06183d]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-3 text-xs leading-5 text-slate-600">
                                        {step.text}
                                    </p>
                                </div>

                                {index < methodSteps.length - 1 && (
                                    <ArrowRight className="absolute -right-5 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-400 md:block" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <h2 className="text-2xl font-black tracking-tight text-[#06183d]">
                    Ferramentas para acompanhar a saúde dos seus fluxos
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {tools.map((tool) => (
                        <div
                            key={tool.title}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-black leading-6 text-[#06183d]">
                                {tool.title}
                            </h3>

                            <div className="my-5 h-28 rounded-2xl bg-slate-50 p-4">
                                <ToolThumbnail type={tool.type} />
                            </div>

                            <p className="text-sm leading-6 text-slate-600">{tool.text}</p>

                            <a
                                href="#"
                                className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-teal-800"
                            >
                                Saiba mais
                                <ArrowRight className="h-4 w-4" />
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            <ExampleReading />

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <h2 className="text-2xl font-black tracking-tight text-[#06183d]">
                    Fluxos que podem ser acompanhados pelo Ohrly
                </h2>

                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {useCases.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-50 text-cyan-800">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <span className="font-black text-[#06183d]">{item.title}</span>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-black tracking-tight text-[#06183d]">
            Estudos de Saúde Operacional
          </h2>

          <a
            href="#"
            className="hidden items-center gap-1 text-sm font-bold text-teal-800 sm:inline-flex"
          >
            Ver todos os estudos
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {studies.map((study) => (
            <article
              key={study.title}
              className="grid grid-cols-[110px_1fr] gap-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <StudyThumb type={study.image} />

              <div>
                <h3 className="font-black leading-5 text-[#06183d]">
                  {study.title}
                </h3>
                <p className="mt-2 text-sm leading-5 text-slate-600">
                  {study.text}
                </p>
                <a
                  href="#"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-teal-800"
                >
                  Ler estudo
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section> */}

            <section id="checkup" className="mx-auto max-w-7xl px-6 pb-10 pt-8 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-[#004653] p-8 text-white shadow-xl shadow-teal-950/10 md:p-12">
                    <Waves className="absolute -right-8 -top-10 h-64 w-64 text-white/10" />

                    <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
                        <div>
                            <h2 className="text-3xl font-black tracking-tight">
                                Comece com um check-up operacional
                            </h2>

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
                                Escolha um fluxo crítico da sua operação e receba uma leitura
                                clara sobre sinais vitais, janelas de atenção e próximos passos.
                            </p>
                        </div>

                        <a
                            href="#"
                            className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-black text-[#004653] shadow-lg transition hover:bg-slate-100"
                        >
                            Quero avaliar um fluxo
                            <ArrowRight className="h-5 w-5" />
                        </a>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}

function Header() {
    return (
        <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f7fafc]/90 backdrop-blur-xl">
            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                <a href="#" className="text-3xl font-black tracking-[-0.05em] text-[#06183d]">
                    Ohrly
                </a>

                <nav className="hidden items-center gap-10 text-sm font-bold text-slate-800 md:flex">
                    <a href="#metodo" className="hover:text-teal-800">
                        Método
                    </a>
                    <a href="#" className="hover:text-teal-800">
                        Soluções
                    </a>
                    <a href="#" className="hover:text-teal-800">
                        Estudos
                    </a>
                    <a href="/contact" className="hover:text-teal-800">
                        Contato
                    </a>
                </nav>

                <a
                    href="#checkup"
                    className="hidden rounded-xl bg-[#003f4c] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-teal-900/10 transition hover:bg-[#00313b] sm:inline-flex"
                >
                    Fazer check-up operacional
                </a>
            </div>
        </header>
    );
}

function HeroDashboard() {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10">
            <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h2 className="font-black text-[#06183d]">Saúde Operacional</h2>

                    <button className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                        Visão geral
                        <ChevronDown className="h-3 w-3" />
                    </button>
                </div>

                <div className="hidden items-center gap-3 text-xs font-medium text-slate-500 sm:flex">
                    Última atualização: hoje, 08:45
                    <RefreshCw className="h-4 w-4 text-slate-500" />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {statusCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.label}
                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                        >
                            <Icon className={`mb-4 h-8 w-8 ${card.iconClass}`} />

                            <p className="min-h-10 text-xs font-black leading-4 text-[#06183d]">
                                {card.label}
                            </p>

                            <p className="mt-2 text-3xl font-black text-[#06183d]">
                                {card.value}
                            </p>

                            <p className="text-xs font-medium text-slate-500">{card.suffix}</p>
                        </div>
                    );
                })}

                <div className="col-span-2 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 lg:col-span-1">
                    <p className="text-xs font-black leading-4 text-[#06183d]">
                        Janela de decisão aberta
                    </p>

                    <p className="mt-4 text-4xl font-black text-[#06183d]">3</p>
                    <p className="text-xs font-bold text-slate-500">ativas</p>

                    <button className="mt-5 w-full rounded-lg border border-cyan-200 bg-white px-3 py-2 text-xs font-black text-teal-900">
                        Ver todas
                    </button>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-black text-[#06183d]">
                        Evolução da saúde operacional
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-bold text-slate-500">
                        <Legend color="bg-emerald-500" label="Saudável" />
                        <Legend color="bg-amber-400" label="Em observação" />
                        <Legend color="bg-orange-500" label="Atenção operacional" />
                        <Legend color="bg-rose-500" label="Perda de consistência" />
                    </div>

                    <div className="mt-4 h-40">
                        <HealthChart />
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <h3 className="text-sm font-black text-[#06183d]">
                        Fluxos em destaque
                    </h3>

                    <div className="mt-4 space-y-4">
                        <FlowItem
                            color="bg-orange-500"
                            title="Atendimento via chatbot"
                            status="Atenção operacional"
                        />
                        <FlowItem
                            color="bg-amber-400"
                            title="Checkout e pagamentos"
                            status="Em observação"
                        />
                        <FlowItem
                            color="bg-rose-500"
                            title="Pós-venda e trocas"
                            status="Perda de consistência"
                        />
                    </div>

                    <a
                        href="#"
                        className="mt-5 inline-flex text-xs font-black text-teal-800"
                    >
                        Ver todos os fluxos
                    </a>
                </div>
            </div>
        </div>
    );
}

function Legend({ color, label }: { color: string; label: string }) {
    return (
        <span className="inline-flex items-center gap-2">
            <span className={`h-2 w-2 rounded-full ${color}`} />
            {label}
        </span>
    );
}

function FlowItem({
    color,
    title,
    status,
}: {
    color: string;
    title: string;
    status: string;
}) {
    return (
        <div className="flex gap-3">
            <span className={`mt-1 h-2.5 w-2.5 rounded-full ${color}`} />
            <div>
                <p className="text-xs font-black leading-4 text-[#06183d]">{title}</p>
                <p className="mt-1 text-[11px] font-medium text-slate-500">{status}</p>
            </div>
        </div>
    );
}

function HealthChart() {
    return (
        <svg viewBox="0 0 600 180" className="h-full w-full">
            <g stroke="#e2e8f0" strokeWidth="1">
                <line x1="40" y1="20" x2="580" y2="20" />
                <line x1="40" y1="60" x2="580" y2="60" />
                <line x1="40" y1="100" x2="580" y2="100" />
                <line x1="40" y1="140" x2="580" y2="140" />
            </g>

            <g fill="#64748b" fontSize="10" fontWeight="700">
                <text x="8" y="24">100</text>
                <text x="14" y="64">75</text>
                <text x="14" y="104">50</text>
                <text x="14" y="144">25</text>
                <text x="20" y="172">0</text>
            </g>

            <g fill="#64748b" fontSize="10" fontWeight="700">
                <text x="40" y="172">06/05</text>
                <text x="150" y="172">13/05</text>
                <text x="260" y="172">20/05</text>
                <text x="370" y="172">27/05</text>
                <text x="500" y="172">03/06</text>
            </g>

            <polyline
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,50 100,60 160,62 220,61 280,64 340,54 400,62 460,60 520,52 580,48"
            />
            <polyline
                fill="none"
                stroke="#f59e0b"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,94 100,100 160,104 220,96 280,101 340,99 400,96 460,94 520,92 580,98"
            />
            <polyline
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,128 100,130 160,132 220,128 280,126 340,122 400,127 460,124 520,120 580,126"
            />
            <polyline
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="40,146 100,146 160,145 220,144 280,145 340,143 400,144 460,142 520,141 580,143"
            />
        </svg>
    );
}

function ToolThumbnail({ type }: { type: string }) {
    if (type === "score") {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-[10px] border-teal-500 bg-white text-center shadow-inner">
                    <div>
                        <p className="text-xl font-black text-[#06183d]">72</p>
                        <p className="text-[10px] font-bold text-slate-500">saúde</p>
                    </div>
                </div>
            </div>
        );
    }

    if (type === "mini-chart") {
        return (
            <svg viewBox="0 0 220 90" className="h-full w-full">
                <rect width="220" height="90" rx="14" fill="white" />
                <text x="16" y="24" fontSize="10" fontWeight="800" fill="#0f172a">
                    Saúde ao longo do tempo
                </text>
                <line x1="18" y1="70" x2="205" y2="70" stroke="#e2e8f0" />
                <line x1="18" y1="48" x2="205" y2="48" stroke="#e2e8f0" />
                <polyline
                    points="20,62 50,50 80,56 110,42 140,46 170,38 205,44"
                    fill="none"
                    stroke="#0f766e"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }

    if (type === "list") {
        return (
            <div className="space-y-2 text-[10px] font-bold">
                <div className="rounded-lg bg-white p-2 shadow-sm">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-orange-500" />
                    Atendimento via chatbot
                </div>
                <div className="rounded-lg bg-white p-2 shadow-sm">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />
                    Checkout e pagamentos
                </div>
                <div className="rounded-lg bg-white p-2 shadow-sm">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-rose-500" />
                    Pós-venda e trocas
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-full items-center justify-center">
            <div className="grid grid-cols-3 gap-2">
                {[Workflow, MessageSquare, CalendarDays, CircleGauge, HelpCircle].map(
                    (Icon, index) => (
                        <div
                            key={index}
                            className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-white"
                        >
                            <Icon className="h-4 w-4" />
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

function ExampleReading() {
    return (
        <section id="exemplo" className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
            <h2 className="text-2xl font-black tracking-tight text-[#06183d]">
                Como o Ohrly transforma sinais em decisão
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[270px_1fr_280px]">
                <div className="space-y-5">
                    <ExampleInfo
                        icon={MessageSquare}
                        label="Fluxo analisado:"
                        value="Atendimento via chatbot"
                        color="text-teal-700"
                    />
                    <ExampleInfo
                        icon={TriangleAlert}
                        label="Estado:"
                        value="Atenção operacional"
                        color="text-orange-500"
                    />
                    <ExampleInfo
                        icon={HeartPulse}
                        label="Sinal vital pressionado:"
                        value="Handoff para humano"
                        color="text-rose-500"
                    />
                    <ExampleInfo
                        icon={CalendarDays}
                        label="Janela de decisão:"
                        value="revisar fallback e critérios de transbordo"
                        color="text-[#16455a]"
                    />
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-black text-[#06183d]">
                            Evolução do sinal vital: Handoff para humano (%)
                        </h3>

                        <div className="flex rounded-lg bg-white p-1 text-xs font-black text-slate-500">
                            <button className="rounded-md px-2 py-1">7D</button>
                            <button className="rounded-md bg-blue-50 px-2 py-1 text-blue-700">
                                30D
                            </button>
                            <button className="rounded-md px-2 py-1">90D</button>
                        </div>
                    </div>

                    <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-black text-rose-600">
                        Sinal vital pressionado
                    </span>

                    <div className="mt-4 h-56">
                        <ExampleChart />
                    </div>
                </div>

                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5">
                    <p className="text-sm font-black text-[#06183d]">
                        Recomendação sugerida
                    </p>

                    <p className="mt-3 text-sm leading-6 text-slate-700">
                        Revisar fallback e critérios de transbordo para reduzir
                        escalonamentos desnecessários.
                    </p>

                    <button className="mt-8 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-[#06183d] shadow-sm">
                        Ver detalhes da leitura
                    </button>
                </div>
            </div>
        </section>
    );
}

function ExampleInfo({
    icon: Icon,
    label,
    value,
    color,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    color: string;
}) {
    return (
        <div className="flex gap-3">
            <Icon className={`mt-1 h-5 w-5 shrink-0 ${color}`} />
            <div>
                <p className="text-xs font-black text-slate-500">{label}</p>
                <p className="mt-1 text-sm font-black leading-5 text-[#06183d]">
                    {value}
                </p>
            </div>
        </div>
    );
}

function ExampleChart() {
    return (
        <svg viewBox="0 0 620 240" className="h-full w-full">
            <rect x="0" y="0" width="620" height="240" rx="16" fill="#f8fafc" />

            <g stroke="#e2e8f0" strokeWidth="1">
                <line x1="44" y1="30" x2="590" y2="30" />
                <line x1="44" y1="75" x2="590" y2="75" />
                <line x1="44" y1="120" x2="590" y2="120" />
                <line x1="44" y1="165" x2="590" y2="165" />
                <line x1="44" y1="210" x2="590" y2="210" />
            </g>

            <rect x="44" y="58" width="546" height="48" fill="#fee2e2" opacity="0.6" />

            <line
                x1="44"
                y1="106"
                x2="590"
                y2="106"
                stroke="#f87171"
                strokeWidth="1.5"
                strokeDasharray="5 5"
            />

            <g fill="#64748b" fontSize="11" fontWeight="700">
                <text x="10" y="214">0%</text>
                <text x="8" y="169">10%</text>
                <text x="8" y="124">20%</text>
                <text x="8" y="79">30%</text>
                <text x="8" y="34">40%</text>

                <text x="44" y="232">06/05</text>
                <text x="165" y="232">13/05</text>
                <text x="287" y="232">20/05</text>
                <text x="412" y="232">27/05</text>
                <text x="535" y="232">03/06</text>
            </g>

            <polyline
                points="44,96 70,110 96,102 122,124 148,116 174,134 200,108 226,122 252,104 278,118 304,100 330,104 356,92 382,102 408,112 434,96 460,120 486,112 512,88 538,104 564,94 590,116"
                fill="none"
                stroke="#ef4444"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <line
                x1="510"
                y1="30"
                x2="510"
                y2="210"
                stroke="#94a3b8"
                strokeDasharray="4 4"
            />

            <foreignObject x="405" y="42" width="170" height="58">
                <div className="rounded-xl border border-rose-100 bg-white px-3 py-2 text-xs font-black leading-4 text-[#06183d] shadow-sm">
                    Janela de decisão aberta em 01/06
                </div>
            </foreignObject>
        </svg>
    );
}

function StudyThumb({ type }: { type: string }) {
    if (type === "v4") {
        return (
            <div className="flex h-full min-h-[112px] items-center justify-center rounded-2xl bg-[#031733] text-5xl font-black text-cyan-400">
                V4
            </div>
        );
    }

    if (type === "cart") {
        return (
            <div className="flex h-full min-h-[112px] items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <ShoppingCart className="h-12 w-12" />
            </div>
        );
    }

    return (
        <div className="flex h-full min-h-[112px] items-center justify-center rounded-2xl bg-amber-50 text-amber-800">
            <GraduationCap className="h-12 w-12" />
        </div>
    );
}