'use client';

import {
    ArrowDown,
    BarChart3,
    Target,
    Zap
} from 'lucide-react';

import { BehaviorTimelineCard } from './behavior-timeline-card';

export default function Hero() {
    return (
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 xl:px-8 py-10">

            {/* BACKGROUND */}
            <div className="absolute inset-0 -z-10 bg-[#0A0F14]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.12),transparent_35%),radial-gradient(circle_at_80%_40%,rgba(139,92,246,0.10),transparent_35%)]" />
            </div>

            {/* CONTENT */}
            <div className="mx-auto flex w-full max-w-[1800px] flex-col justify-center mt-auto">

                <div className="grid items-center gap-10 lg:grid-cols-12">

                    {/* LEFT */}
                    <div className="lg:col-span-5">

                        <h1 className="max-w-xl text-3xl font-semibold leading-tight text-[#F3F4F6] lg:text-5xl">
                            Seus sistemas ainda estão funcionando.{' '}

                            <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                Mas sua operação pode já estar degradando.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-relaxed text-gray-400 lg:text-base">
                            O Ohrly transforma comportamento operacional em
                            contexto compartilhado para que engenharia,
                            produto e negócio ajam antes que a degradação
                            silenciosa vire impacto.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <button className="rounded-xl bg-gradient-to-r from-violet-500 to-emerald-400 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
                                Ver degradação silenciosa
                            </button>

                            <button className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-3 text-sm font-medium text-white/80 transition hover:bg-white/[0.04]">
                                Solicitar demo
                            </button>
                        </div>

                        {/* FEATURES */}
                        <div className="mt-8 grid gap-3 sm:grid-cols-3">

                            {[
                                {
                                    icon: Zap,
                                    title: 'Detecte antes',
                                    subtitle:
                                        'Sinais relevantes antes do impacto.',
                                },
                                {
                                    icon: Target,
                                    title: 'Alinhe times',
                                    subtitle:
                                        'Produto, engenharia e negócio na mesma visão.',
                                },
                                {
                                    icon: BarChart3,
                                    title: 'Aja com confiança',
                                    subtitle:
                                        'Contexto operacional, não apenas métricas.',
                                },
                            ].map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 transition hover:bg-white/[0.04]"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                                                <Icon className="h-4 w-4 text-violet-300" />
                                            </div>

                                            <p className="text-sm font-medium text-white">
                                                {item.title}
                                            </p>
                                        </div>

                                        <p className="mt-3 text-xs leading-relaxed text-gray-400">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="lg:col-span-7">

                        <div className="rounded-[28px] border border-white/5 bg-[#11161C]/95 p-4 shadow-2xl shadow-black/40 backdrop-blur">

                            <p className="text-xl uppercase tracking-wider text-white">
                                bill_request_flow
                            </p>

                            {/* TOP */}
                            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 mt-2">

                                <div className="flex items-start justify-between gap-6">

                                    <div>
                                        <p className="mt-3 text-xs text-gray-400">
                                            Estado atual
                                        </p>

                                        <h3 className="mt-1 text-xl font-semibold text-orange-400">
                                            Degradação funcional
                                        </h3>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Continuidade está sendo perdida
                                        </p>
                                    </div>

                                    <div className="flex h-20 w-20 flex-col items-center justify-center rounded-full border-[6px] border-orange-400/15 border-t-orange-400">
                                        <span className="text-2xl font-bold text-white">
                                            63
                                        </span>

                                        <span className="text-[10px] text-gray-500">
                                            /100
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* SIGNAL */}
                            <div className="mt-4 rounded-2xl border border-white/5 bg-white/[0.02] p-4">

                                <div className="grid gap-5 md:grid-cols-2">

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Desde
                                        </p>

                                        <h3 className="mt-2 text-xl font-semibold text-white">
                                            3 dias atrás
                                        </h3>

                                        <p className="mt-1 text-xs text-gray-500">
                                            11 Maio, 09:24
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs uppercase tracking-wide text-gray-500">
                                            Sinal principal
                                        </p>

                                        <h3 className="mt-2 text-xl font-bold leading-relaxed text-white">
                                            Continuidade perdida após
                                            generate_bill
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* TIMELINE */}
                            <div className="mt-4">
                                <BehaviorTimelineCard />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SCROLL INDICATOR */}
                <div className="mt-14 flex justify-center">
                    <div className="flex flex-col items-center gap-2 text-gray-500">
                        <span className="text-[10px] uppercase tracking-[0.25em]">
                            Continue explorando
                        </span>

                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02]">
                            <ArrowDown className="h-4 w-4 animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}