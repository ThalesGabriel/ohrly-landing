'use client';

import {
    AlertTriangle,
    Brain,
    Flame,
    TrendingUp,
    UserRoundPlus,
} from 'lucide-react';

type TimelineItem = {
    time: string;
    title: string;
    description: string;
    icon: React.ElementType;
    tone: 'green' | 'orange' | 'purple' | 'blue' | 'red';
};

const items: TimelineItem[] = [
    {
        time: '09:14',
        title: 'Retry aumentou após release v17',
        description: '+32% vs baseline',
        icon: TrendingUp,
        tone: 'green'
    },
    {
        time: '09:48',
        title: 'Sessões exigindo mais esforço',
        description: 'Tempo médio +18%',
        icon: Flame,
        tone: 'orange'
    },
    {
        time: '10:22',
        title: 'Handoff humano aumentou',
        description: '+27% vs habitual',
        icon: UserRoundPlus,
        tone: 'purple'
    },
    {
        time: '11:03',
        title: 'Similaridade com degradações anteriores',
        description: 'Similaridade: 82%',
        icon: Brain,
        tone: 'blue'
    },
    {
        time: '11:51',
        title: 'Threshold operacional em 6 dias',
        description: 'Impacto projetado: alto',
        icon: AlertTriangle,
        tone: 'red'
    }
];

const toneMap = {
    green: {
        dot: 'bg-emerald-400',
        iconBg: 'bg-emerald-400/10',
        icon: 'text-emerald-300'
    },
    orange: {
        dot: 'bg-orange-400',
        iconBg: 'bg-orange-400/10',
        icon: 'text-orange-300'
    },
    purple: {
        dot: 'bg-violet-400',
        iconBg: 'bg-violet-400/10',
        icon: 'text-violet-300'
    },
    blue: {
        dot: 'bg-sky-400',
        iconBg: 'bg-sky-400/10',
        icon: 'text-sky-300'
    },
    red: {
        dot: 'bg-red-400',
        iconBg: 'bg-red-400/10',
        icon: 'text-red-300'
    }
};

export function BehaviorTimelineCard() {
    return (
        <div className="rounded-2xl border border-white/5 bg-[#0B1220] p-4">
            <div className="relative">
                <div className="absolute left-[10px] top-0 h-full w-px bg-white/10" />

                <div className="space-y-5">
                    {items.map((item) => {
                        const Icon = item.icon;
                        const tone = toneMap[item.tone];

                        return (
                            <div
                                key={`${item.time}-${item.title}`}
                                className="relative grid grid-cols-[20px_48px_40px_1fr] items-start gap-3"
                            >
                                <div className="relative z-10 flex justify-center pt-1">
                  <span
                      className={`h-2.5 w-2.5 rounded-full border border-[#0B1220] ${tone.dot}`}
                  />
                                </div>

                                <time className="text-[11px] font-medium text-white/50 pt-[1px]">
                                    {item.time}
                                </time>

                                <div
                                    className={`flex h-9 w-9 items-center justify-center rounded-xl ${tone.iconBg}`}
                                >
                                    <Icon className={`h-4 w-4 ${tone.icon}`} />
                                </div>

                                <div>
                                    <h4 className="text-xs font-medium leading-snug text-white">
                                        {item.title}
                                    </h4>

                                    <p className="mt-1 text-[11px] leading-none text-white/40">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}