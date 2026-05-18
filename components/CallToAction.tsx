type ProblemSignal = {
    title: string;
    description: string;
    icon: "retry" | "handoff" | "clock" | "friction" | "exception";
};

type InvestigationArea = {
    title: string;
    description: string;
    icon: "chat" | "cart" | "bot" | "fingerprint" | "plus";
};

type Props = {
    title: string
    description: string
    labelButton: string
}

export default function CallToAction({
    title,
    description,
    labelButton,
}: Props) {
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
                            {title}
                        </h2>
                        <p className="mt-2 text-lg text-indigo-100/80">
                            {description}
                        </p>
                    </div>
                </div>

                <a
                    href="/diagnostic"
                    className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-violet-500 transition hover:-translate-y-0.5 hover:bg-violet-700"
                >
                    {labelButton}
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