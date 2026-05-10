'use client';

import {
    Activity,
    ArrowRight,
    BarChart3,
    BrainCircuit,
    CircleDollarSign,
    Code2,
    Layers3,
    ShieldAlert,
    Target,
    Users
} from 'lucide-react';

const focusCards = [
    {
        title: 'Degradação funcional',
        value: 'Detectado há 3 dias',
        badge: 'Degradando',
        color: 'orange'
    },
    {
        title: 'Perda de continuidade',
        value: '+31% vs baseline',
        badge: 'Alto',
        color: 'green'
    },
    {
        title: 'Pressão de handoff humano',
        value: 'Aumento projetado',
        badge: 'Alto',
        color: 'purple'
    },
    {
        title: 'Risco de retenção',
        value: 'Queda projetada de 8-12%',
        badge: 'Alto risco',
        color: 'red'
    }
];

const comparison = [
    {
        traditional: 'Acompanha saúde técnica',
        ohrly: 'Interpreta comportamento operacional'
    },
    {
        traditional: 'Mostra métricas',
        ohrly: 'Nomeia estados comportamentais'
    },
    {
        traditional: 'Alerta após thresholds',
        ohrly: 'Revela degradação enquanto ela se forma'
    },
    {
        traditional: 'Ajuda a reagir',
        ohrly: 'Ajuda a decidir antes'
    },
    {
        traditional: 'Pertence à engenharia',
        ohrly: 'Compartilhado entre engenharia, produto e negócio'
    }
];

function MiniChart({
    color
}: {
    color: 'orange' | 'green' | 'purple' | 'red';
}) {
    const colors = {
        orange: 'stroke-orange-400',
        green: 'stroke-emerald-400',
        purple: 'stroke-violet-400',
        red: 'stroke-rose-400'
    };

    return (
        <svg
            className="mt-6 h-12 w-full"
            viewBox="0 0 200 40"
            fill="none"
        >
            <path
                d="M0 30 C20 35, 35 15, 55 20 S90 38, 120 18 S160 28, 200 8"
                className={colors[color]}
                strokeWidth="3"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function OperationalSection() {
    return (
        <section className="bg-[#F8FAFC] px-4 pb-24 xl:px-24 pt-12">

            <div className="mx-auto max-w-[1700px]">

                {/* HOW IT WORKS */}
                <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                        Como o Ohrly funciona
                    </p>

                    <div className="mt-14 grid gap-10 lg:grid-cols-3">

                        {[
                            {
                                icon: Layers3,
                                title: 'Reconstruímos comportamento',
                                description:
                                    'Lemos eventos, etapas e trajetórias dos seus fluxos críticos.'
                            },
                            {
                                icon: Activity,
                                title: 'Detectamos desvios',
                                description:
                                    'Quando o comportamento diverge do padrão.'
                            },
                            {
                                icon: Target,
                                title: 'Traduzimos em contexto',
                                description:
                                    'Mostramos o que mudou, onde começou e o que pode acontecer.'
                            }
                        ].map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div
                                    key={step.title}
                                    className="relative flex items-start gap-6"
                                >
                                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-violet-500 text-white shadow-lg">
                                        <Icon className="h-9 w-9" />
                                    </div>

                                    <div>
                                        <div className="mb-3 flex items-center gap-3">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-500 text-sm font-semibold text-white">
                                                {index + 1}
                                            </div>

                                            <h3 className="text-xl font-semibold text-slate-900">
                                                {step.title}
                                            </h3>
                                        </div>

                                        <p className="max-w-[300px] text-lg leading-relaxed text-slate-500">
                                            {step.description}
                                        </p>
                                    </div>

                                    {index < 2 && (
                                        <ArrowRight className="absolute -right-5 top-7 hidden h-8 w-8 text-slate-300 xl:block" />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* FOCUS */}
                <div className="mt-20 rounded-[32px] bg-[#050816] p-6 shadow-2xl">

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                        Foque no que importa
                    </p>

                    <div className="mt-6 grid gap-5 lg:grid-cols-4">

                        {focusCards.map((card) => {
                            const badgeColors = {
                                orange:
                                    'bg-orange-500/10 text-orange-300',
                                green:
                                    'bg-emerald-500/10 text-emerald-300',
                                purple:
                                    'bg-violet-500/10 text-violet-300',
                                red:
                                    'bg-rose-500/10 text-rose-300'
                            };

                            return (
                                <div
                                    key={card.title}
                                    className="rounded-3xl border border-white/5 bg-white/[0.03] p-6"
                                >
                                    <h3 className="text-xl font-semibold text-white">
                                        {card.title}
                                    </h3>

                                    <p className="mt-3 text-lg text-gray-400">
                                        {card.value}
                                    </p>

                                    <div
                                        className={`mt-5 inline-flex rounded-full px-3 py-1 text-sm font-medium ${badgeColors[card.color as keyof typeof badgeColors]}`}
                                    >
                                        {card.badge}
                                    </div>

                                    <MiniChart
                                        color={card.color as any}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* OPERATIONAL LANGUAGE */}
                <div className="mt-20 grid gap-10 lg:grid-cols-12">

                    <div className="lg:col-span-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                            Uma linguagem operacional
                        </p>

                        <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-900">
                            Uma linguagem operacional para engenharia,
                            produto e negócio.
                        </h2>
                    </div>

                    <div className="lg:col-span-6">

                        <div className="grid gap-6 lg:grid-cols-[1fr_auto]">

                            <div className="rounded-[32px] border border-slate-200 bg-white p-8">

                                <div className="grid gap-8 lg:grid-cols-4">

                                    {[
                                        {
                                            icon: Code2,
                                            title: 'Engenharia',
                                            description:
                                                'Enxerga retries',
                                            color:
                                                'bg-emerald-500/10 text-emerald-400'
                                        },
                                        {
                                            icon: BarChart3,
                                            title: 'Produto',
                                            description:
                                                'Enxerga retenção',
                                            color:
                                                'bg-violet-500/10 text-violet-400'
                                        },
                                        {
                                            icon: Users,
                                            title: 'Operações',
                                            description:
                                                'Enxerga fila humana',
                                            color:
                                                'bg-blue-500/10 text-blue-400'
                                        },
                                        {
                                            icon: CircleDollarSign,
                                            title: 'Negócio',
                                            description:
                                                'Enxerga risco de receita',
                                            color:
                                                'bg-rose-500/10 text-rose-400'
                                        }
                                    ].map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <div
                                                key={item.title}
                                                className="text-center"
                                            >
                                                <div
                                                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full ${item.color}`}
                                                >
                                                    <Icon className="h-9 w-9" />
                                                </div>

                                                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-2 text-base text-slate-500">
                                                    {item.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <ArrowRight className="hidden h-10 w-10 text-slate-300 lg:block" />
                            </div>

                        </div>
                    </div>

                    <div className="rounded-[32px] bg-[#050816] p-8 text-white shadow-2xl lg:col-span-3">

                        <div className="flex items-center gap-3">
                            <BrainCircuit className="h-6 w-6 text-violet-400" />

                            <p className="text-sm text-gray-400">
                                Ohrly conecta tudo em um estado comportamental:
                            </p>
                        </div>

                        <h3 className="mt-8 text-4xl font-semibold leading-tight text-violet-400">
                            CONTINUIDADE
                            <br />
                            PERDIDA
                        </h3>
                    </div>
                </div>

                {/* COMPARISON */}
                <div className="mt-20 grid gap-10 lg:grid-cols-12">

                    <div className="lg:col-span-3">

                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                            Além dos dashboards
                        </p>

                        <h2 className="mt-5 text-4xl font-semibold leading-tight text-slate-900">
                            Ohrly não é mais um monitoramento.
                            É uma nova camada de inteligência operacional.
                        </h2>
                    </div>

                    <div className="lg:col-span-9">

                        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white">

                            <div className="grid grid-cols-2 border-b border-slate-200">

                                <div className="p-8">
                                    <h3 className="text-2xl font-semibold text-slate-900">
                                        Monitoramento tradicional
                                    </h3>
                                </div>

                                <div className="border-l border-slate-200 p-8">
                                    <h3 className="text-2xl font-semibold text-violet-500">
                                        ohrly
                                    </h3>
                                </div>
                            </div>

                            {comparison.map((row) => (
                                <div
                                    key={row.traditional}
                                    className="grid grid-cols-2 border-b border-slate-100 last:border-none"
                                >
                                    <div className="flex items-center gap-4 p-6 text-lg text-slate-500">
                                        <ShieldAlert className="h-5 w-5 text-slate-300" />
                                        {row.traditional}
                                    </div>

                                    <div className="flex items-center gap-4 border-l border-slate-100 p-6 text-lg font-medium text-violet-500">
                                        <Activity className="h-5 w-5" />
                                        {row.ohrly}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 overflow-hidden rounded-[36px] bg-[#050816]">

                    <div className="grid gap-10 p-10 lg:grid-cols-12 lg:items-center lg:p-14">

                        <div className="lg:col-span-7">

                            <div className="flex items-start gap-5">

                                <div>
                                    <h2 className="text-5xl font-semibold leading-tight text-white">
                                        Reduza o tempo entre degradação operacional{' '}

                                        <span className="text-emerald-400">
                                            e decisão.
                                        </span>
                                    </h2>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-5">

                            <p className="text-xl leading-relaxed text-gray-400">
                                Descubra quando seus fluxos deixaram de se comportar como esperado antes que clientes e métricas tornem isso óbvio.
                            </p>

                            <button className="mt-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-violet-500 to-emerald-400 px-7 py-4 text-lg font-semibold text-white transition hover:opacity-90">
                                Explorar Ohrly

                                <ArrowRight className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}