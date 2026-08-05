'use client';

import {
    Activity,
    AlertTriangle,
    ArrowRight,
    Clock3,
    Layers3,
    ShieldCheck,
    Target,
    Users
} from 'lucide-react';

const problems = [
    {
        icon: ShieldCheck,
        iconBg: 'bg-emerald-500/10',
        iconColor: 'text-emerald-400',
        title: 'APM está verde',
        subtitle: 'Mas usuários estão sofrendo.',
        description:
            'Infraestrutura parece saudável. A experiência está piorando.',
        badge: 'Todos sistemas operacionais',
        badgeClass:
            'bg-emerald-500/10 text-emerald-400'
    },
    {
        icon: AlertTriangle,
        iconBg: 'bg-violet-500/10',
        iconColor: 'text-violet-400',
        title: 'Sem incidentes declarados',
        subtitle: 'Mas o esforço operacional está aumentando.',
        description:
            'Nenhum alerta disparou. Mas os times já estão sentindo.',
        badge: 'Sem incidentes',
        badgeClass:
            'bg-violet-500/10 text-violet-400'
    },
    {
        icon: Activity,
        iconBg: 'bg-rose-500/10',
        iconColor: 'text-rose-400',
        title: 'Impacto aparece tarde',
        subtitle: 'A degradação começou dias atrás.',
        description:
            'Quando as métricas mudam, o dano já aconteceu.',
        badge: 'Impacto detectado tarde',
        badgeClass:
            'bg-rose-500/10 text-rose-400'
    }
];

const hiddenCosts = [
    {
        icon: Clock3,
        color: 'text-violet-400',
        bg: 'bg-violet-500/10',
        title: 'Decisões atrasadas',
        description:
            'Times esperam evidências mais fortes enquanto a degradação se acumula.'
    },
    {
        icon: Users,
        color: 'text-orange-400',
        bg: 'bg-orange-500/10',
        title: 'Ambiguidade operacional',
        description:
            'Engenharia, produto e negócio enxergam sintomas diferentes.'
    },
    {
        icon: Target,
        color: 'text-pink-400',
        bg: 'bg-pink-500/10',
        title: 'Erosão invisível',
        description:
            'Conversão, retenção e eficiência degradam antes dos alertas.'
    }
];

const steps = [
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
            'Identificamos quando o comportamento diverge do padrão saudável.'
    },
    {
        icon: Target,
        title: 'Traduzimos em contexto',
        description:
            'Mostramos o que mudou, onde começou e o que pode acontecer.'
    }
];

export function ProblemSection() {
    return (
        <section
            id="problem"
            className="bg-[#F8FAFC] px-4 xl:px-24"
        >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500 py-12">
                O problema
            </p>
            <div>

                {/* HEADER */}
                <div className="">

                    <div className="">


                        <h2 className="text-4xl font-semibold leading-tight text-[#0F172A] lg:text-6xl text-center">
                            A maioria dos sistemas não falha tecnicamente.
                            <br />

                            <span className="text-violet-500">
                                Eles degradam operacionalmente.
                            </span>
                        </h2>
                    </div>
                </div>

                {/* PROBLEM CARDS */}
                <div className="mt-16 grid gap-6 lg:grid-cols-3">

                    {problems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm items-center"
                            >
                                <div className='flex items-center gap-[10px]'>
                                    <div
                                        className={`flex p-4 items-center justify-center rounded-2xl ${item.iconBg}`}
                                    >
                                        <Icon
                                            className={`h-8 w-8 ${item.iconColor}`}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-semibold text-slate-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-md font-medium text-slate-700">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>


                                {/* <p className="mt-6 text-lg leading-relaxed text-slate-500">
                                    {item.description}
                                </p> */}

                                {/* <div
                                    className={`mt-8 inline-flex rounded-full px-4 py-2 text-sm font-medium ${item.badgeClass}`}
                                >
                                    {item.badge}
                                </div> */}
                            </div>
                        );
                    })}
                </div>

                {/* HIDDEN COST */}
                <div className="mt-12">

                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-500">
                        O custo silencioso
                    </p>

                    <h2 className="mt-12 text-4xl font-semibold leading-tight text-slate-900 lg:text-5xl text-center">
                        O verdadeiro custo não é o incidente.  É o tempo
                        <br />
                        degradando{' '}

                        <span className="text-violet-500">
                            antes da decisão.
                        </span>
                    </h2>

                    <div className="mt-14 grid gap-6 lg:grid-cols-3">

                        {hiddenCosts.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                key={item.title}
                                className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm items-center"
                            >
                                <div className='flex items-center gap-[10px]'>
                                    <div
                                        className={`flex p-4 items-center justify-center rounded-2xl ${item.bg}`}
                                    >
                                        <Icon
                                            className={`h-8 w-8 ${item.color}`}
                                        />
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-semibold text-slate-900">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-md font-medium text-slate-700">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>


                                {/* <p className="mt-6 text-lg leading-relaxed text-slate-500">
                                    {item.description}
                                </p> */}

                                {/* <div
                                    className={`mt-8 inline-flex rounded-full px-4 py-2 text-sm font-medium ${item.badgeClass}`}
                                >
                                    {item.badge}
                                </div> */}
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}