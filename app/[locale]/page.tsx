"use client";

import { ElementType } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/layout/PageShell";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Database,
  Gauge,
  GitBranch,
  LineChart,
  MessageCircle,
  RefreshCw,
  ShoppingCart,
  Sparkle,
  Sparkles,
  Target,
  Timer,
  Truck,
  Workflow,
  Zap,
} from "lucide-react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function OhrlyLandingPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <HeroSection />
          <DecisionWindowChart />
        </section>

        <DecisionWindowExplanation />
        <WhatOhrlyObserves />
        <WhereItAppears />
        <ComparisonStrip />
        <ExampleReading />
        <HowItWorks />
        <LabSection />
        <FinalCta />
      </main>
    </PageShell>
  );
}

function HeroSection() {
  const t = useTranslations("home.hero");

  return (
    <section className="relative mt-12 overflow-hidden lg:mt-16">
      <div className="relative mx-auto max-w-5xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 shadow-sm dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-300" />
          {t("eyebrow")}
        </div>

        <h1 className="mt-7 text-4xl font-bold leading-[1.03] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
          {t("description")}
        </p>

        <div className="mt-8 flex flex-col justify-start gap-3 sm:flex-row">
          <Link
            href="#janela-de-decisao"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            {t("primaryCta")}
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/request"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:border-slate-600 dark:hover:bg-slate-900"
          >
            {t("secondaryCta")}
          </Link>
        </div>

        <div className="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3 pb-2">
          <HeroProofItem
            label={t("proof.notAlert.label")}
            value={t("proof.notAlert.value")}
          />
          <HeroProofItem
            label={t("proof.notDashboard.label")}
            value={t("proof.notDashboard.value")}
          />
          <HeroProofItem
            label={t("proof.notAutomation.label")}
            value={t("proof.notAutomation.value")}
          />
        </div>
      </div>
    </section>
  );
}

function HeroProofItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/60">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function DecisionWindowChart() {
  const t = useTranslations("home.decisionChart");

  const xTicks = [
    { label: t("ticks.d1"), x: 80 },
    { label: t("ticks.d8"), x: 220 },
    { label: t("ticks.d12"), x: 340 },
    { label: t("ticks.d16"), x: 460 },
    { label: t("ticks.d20"), x: 600 },
    { label: t("ticks.d24"), x: 740 },
  ];

  return (
    <section
      id="janela-de-decisao"
      className="relative mt-12 w-full overflow-hidden rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 sm:p-6"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_70%_45%,rgba(139,92,246,0.14),transparent_25%)] dark:bg-[radial-gradient(circle_at_35%_20%,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_70%_45%,rgba(139,92,246,0.10),transparent_25%)]" />

      <div className="relative">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {t("flowBehavior")}
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("title")}
            </h2>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-300/50 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700 dark:border-cyan-300/20 dark:bg-cyan-300/10 dark:text-cyan-300">
            <Sparkles className="h-3.5 w-3.5" />
            {t("badge")}
          </span>
        </div>

        <div className="relative h-[300px] w-full">
          <svg
            viewBox="0 0 820 360"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label={t("ariaLabel")}
          >
            <defs>
              <linearGradient id="healthyBand" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(16 185 129)" stopOpacity="0.24" />
                <stop offset="100%" stopColor="rgb(16 185 129)" stopOpacity="0.04" />
              </linearGradient>

              <linearGradient id="decisionWindow" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgb(34 211 238)" stopOpacity="0.08" />
                <stop offset="50%" stopColor="rgb(139 92 246)" stopOpacity="0.20" />
                <stop offset="100%" stopColor="rgb(244 63 94)" stopOpacity="0.08" />
              </linearGradient>

              <filter id="softGlow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect
              x="24"
              y="40"
              width="772"
              height="260"
              rx="20"
              className="fill-slate-50 stroke-slate-200 dark:fill-slate-900/50 dark:stroke-slate-800"
            />

            {[85, 135, 185, 235, 285].map((y) => (
              <line
                key={y}
                x1="70"
                y1={y}
                x2="765"
                y2={y}
                className="stroke-slate-200 dark:stroke-slate-800"
              />
            ))}

            {[
              { label: "100", y: 88 },
              { label: "75", y: 138 },
              { label: "50", y: 188 },
              { label: "25", y: 238 },
              { label: "0", y: 288 },
            ].map((tick) => (
              <text
                key={tick.label}
                x="48"
                y={tick.y}
                textAnchor="end"
                className="fill-slate-400 text-[12px] font-medium dark:fill-slate-500"
              >
                {tick.label}
              </text>
            ))}

            <path
              d="
                M70 214
                C120 210 155 184 205 174
                C260 162 310 178 365 172
                C420 166 465 154 515 168
                C575 182 620 156 675 148
                C720 142 750 150 765 160
                L765 234
                C720 222 675 212 625 216
                C575 220 525 238 475 226
                C425 214 385 218 335 226
                C270 238 235 224 185 230
                C130 236 100 230 70 240
                Z
              "
              fill="url(#healthyBand)"
            />

            <rect
              x="405"
              y="50"
              width="165"
              height="240"
              rx="18"
              fill="url(#decisionWindow)"
              className="stroke-cyan-300/40 dark:stroke-cyan-300/20"
              strokeDasharray="6 8"
            />

            <path
              d="
                M70 214
                C120 210 155 184 205 174
                C260 162 310 178 365 172
                C420 166 465 154 515 168
                C575 182 620 156 675 148
                C720 142 750 150 765 160
              "
              fill="none"
              strokeWidth="3"
              className="stroke-emerald-500/80 dark:stroke-emerald-400/80"
            />

            <path
              d="
                M70 214
                C120 210 155 184 205 174
                C260 162 310 178 365 172
                C395 168 410 160 430 148
                C450 138 465 130 485 146
                C505 166 525 194 545 218
                C560 236 575 246 585 252
              "
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-cyan-500 dark:stroke-cyan-300"
              filter="url(#softGlow)"
            />

            <path
              d="
                M585 252
                C605 256 620 235 635 205
                C655 168 675 128 700 110
                C725 92 750 104 765 112
              "
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-rose-500"
              filter="url(#softGlow)"
            />

            <line
              x1="405"
              y1="50"
              x2="405"
              y2="290"
              strokeWidth="2"
              className="stroke-cyan-400/80 dark:stroke-cyan-300/70"
            />

            <line
              x1="585"
              y1="50"
              x2="585"
              y2="290"
              strokeWidth="2"
              className="stroke-rose-400/80"
            />

            <foreignObject x="290" y="2" width="230" height="72">
              <div className="flex h-full items-center justify-center">
                <div className="rounded-xl border border-cyan-300/60 bg-cyan-500 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-cyan-500/25 dark:border-cyan-300/30 dark:bg-cyan-400 dark:text-slate-950">
                  {t("decisionWindowOpens")}
                </div>
              </div>
            </foreignObject>

            <line
              x1="405"
              y1="72"
              x2="405"
              y2="148"
              strokeWidth="2"
              className="stroke-cyan-400 dark:stroke-cyan-300"
            />

            <foreignObject x="530" y="2" width="220" height="72">
              <div className="flex h-full items-center justify-center">
                <div className="rounded-xl bg-rose-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-rose-600/25">
                  {t("obviousAnomaly")}
                </div>
              </div>
            </foreignObject>

            <line
              x1="585"
              y1="72"
              x2="585"
              y2="252"
              strokeWidth="2"
              className="stroke-rose-500"
            />

            <circle
              cx="430"
              cy="138"
              r="42"
              fill="transparent"
              strokeWidth="2"
              className="stroke-cyan-400/70 dark:stroke-cyan-300/70"
            />

            <circle
              cx="585"
              cy="252"
              r="44"
              fill="transparent"
              strokeWidth="2"
              className="stroke-rose-500/80"
            />

            {xTicks.map((tick) => (
              <text
                key={tick.label}
                x={tick.x}
                y="324"
                textAnchor="middle"
                className="fill-slate-400 text-[12px] font-medium dark:fill-slate-500"
              >
                {tick.label}
              </text>
            ))}
          </svg>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <ChartInsight
            label={t("insights.persistentSignal.label")}
            value={t("insights.persistentSignal.value")}
          />
          <ChartInsight
            label={t("insights.decisionWindow.label")}
            value={t("insights.decisionWindow.value")}
            highlighted
          />
          <ChartInsight
            label={t("insights.nextStage.label")}
            value={t("insights.nextStage.value")}
            danger
          />
        </div>
      </div>
    </section>
  );
}

function ChartInsight({
  label,
  value,
  highlighted,
  danger,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        highlighted &&
          "border-cyan-300/50 bg-cyan-50 dark:border-cyan-300/20 dark:bg-cyan-300/10",
        danger &&
          "border-rose-300/50 bg-rose-50 dark:border-rose-300/20 dark:bg-rose-500/10",
        !highlighted &&
          !danger &&
          "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60",
      )}
    >
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold",
          highlighted && "text-cyan-700 dark:text-cyan-300",
          danger && "text-rose-700 dark:text-rose-300",
          !highlighted && !danger && "text-slate-950 dark:text-white",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function DecisionWindowExplanation() {
  const t = useTranslations("home.decisionWindowExplanation");

  const steps = [
    { key: "normal", icon: CheckCircle2, tone: "emerald", highlighted: false },
    { key: "variation", icon: LineChart, tone: "sky", highlighted: false },
    { key: "attention", icon: Clock3, tone: "amber", highlighted: false },
    {
      key: "decisionWindow",
      icon: Sparkles,
      tone: "violet",
      highlighted: true,
    },
    { key: "operationalImpact", icon: Zap, tone: "rose", highlighted: false },
  ] as const;

  return (
    <section className="mt-12">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {t("title")}
        </h2>

        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
          {t("description")}
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {steps.map((step) => (
          <StateStep
            key={step.key}
            icon={step.icon}
            title={t(`steps.${step.key}.title`)}
            description={t(`steps.${step.key}.description`)}
            tone={step.tone}
            highlighted={step.highlighted}
          />
        ))}
      </div>
    </section>
  );
}

function StateStep({
  icon: Icon,
  title,
  description,
  tone,
  highlighted = false,
}: {
  icon: ElementType;
  title: string;
  description: string;
  tone: "emerald" | "sky" | "amber" | "violet" | "rose";
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border bg-white/75 p-5 shadow-lg shadow-slate-200/40 backdrop-blur dark:bg-slate-950/60 dark:shadow-cyan-950/10",
        highlighted
          ? "border-violet-300/60 dark:border-violet-300/30"
          : "border-slate-200 dark:border-slate-800",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl",
          tone === "emerald" &&
            "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
          tone === "sky" &&
            "bg-sky-50 text-sky-600 dark:bg-sky-950/30 dark:text-sky-300",
          tone === "amber" &&
            "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-300",
          tone === "violet" &&
            "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300",
          tone === "rose" &&
            "bg-rose-50 text-rose-600 dark:bg-rose-950/30 dark:text-rose-300",
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function WhatOhrlyObserves() {
  const t = useTranslations("home.observes");

  const items = [
    { key: "persistence", icon: Timer },
    { key: "magnitude", icon: BarChart3 },
    { key: "propagation", icon: GitBranch },
    { key: "recoverability", icon: RefreshCw },
    { key: "exposedValue", icon: CircleDollarSign },
  ] as const;

  return (
    <section className="mt-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {items.map((item) => (
          <InfoCard
            key={item.key}
            icon={item.icon}
            title={t(`items.${item.key}.title`)}
            description={t(`items.${item.key}.description`)}
          />
        ))}
      </div>
    </section>
  );
}

function WhereItAppears() {
  const t = useTranslations("home.whereItAppears");

  const items = [
    { key: "ecommerce", icon: ShoppingCart },
    { key: "bots", icon: Bot },
    { key: "billing", icon: CreditCard },
    { key: "journeys", icon: Workflow },
  ] as const;

  return (
    <section className="mt-12">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <InfoCard
            key={item.key}
            icon={item.icon}
            title={t(`items.${item.key}.title`)}
            description={t(`items.${item.key}.description`)}
          />
        ))}
      </div>
    </section>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/40 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-4 text-sm font-semibold text-slate-950 dark:text-white">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function ComparisonStrip() {
  const t = useTranslations("home.comparison");

  const items = [
    { key: "technicalObservability", icon: LineChart, highlighted: false },
    { key: "biAnalytics", icon: BarChart3, highlighted: false },
    { key: "anomalyDetection", icon: Sparkle, highlighted: false },
    { key: "ohrly", icon: Gauge, highlighted: true },
  ] as const;

  return (
    <section className="mt-12">
      <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
            {t("eyebrow")}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-4">
          {items.map((item) => (
            <ComparisonCard
              key={item.key}
              icon={item.icon}
              title={t(`items.${item.key}.title`)}
              question={t(`items.${item.key}.question`)}
              description={t(`items.${item.key}.description`)}
              highlighted={item.highlighted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  icon: Icon,
  title,
  question,
  description,
  highlighted = false,
}: {
  icon: ElementType;
  title: string;
  question: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-5",
        highlighted
          ? "border-cyan-300/50 bg-cyan-50 dark:border-cyan-300/20 dark:bg-cyan-300/10"
          : "border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-950/70",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-2xl",
          highlighted
            ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300"
            : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300",
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <h3
        className={cn(
          "mt-4 text-sm font-semibold",
          highlighted
            ? "text-cyan-700 dark:text-cyan-300"
            : "text-slate-950 dark:text-white",
        )}
      >
        {title}
      </h3>

      <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
        {question}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </div>
  );
}

function ExampleReading() {
  const t = useTranslations("home.exampleReading");

  return (
    <section className="mt-12">
      <div className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
              {t("eyebrow")}
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {t("title")}
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
              {t("description")}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <ReadingMetric
              label={t("metrics.currentState.label")}
              value={t("metrics.currentState.value")}
              tone="amber"
            />
            <ReadingMetric
              label={t("metrics.rpi.label")}
              value={t("metrics.rpi.value")}
              tone="cyan"
            />
            <ReadingMetric
              label={t("metrics.exposedValue.label")}
              value={t("metrics.exposedValue.value")}
              tone="violet"
            />
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <ReadingContrastBox
            label={t("contrast.dashboard.label")}
            text={t("contrast.dashboard.text")}
          />

          <ReadingContrastBox
            label={t("contrast.ohrly.label")}
            text={t("contrast.ohrly.text")}
            highlighted
          />
        </div>
      </div>
    </section>
  );
}

function ReadingMetric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "amber" | "cyan" | "violet";
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/70">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
        {label}
      </p>

      <p
        className={cn(
          "mt-2 text-xl font-bold tracking-tight",
          tone === "amber" && "text-amber-600 dark:text-amber-300",
          tone === "cyan" && "text-cyan-700 dark:text-cyan-300",
          tone === "violet" && "text-violet-700 dark:text-violet-300",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function ReadingContrastBox({
  label,
  text,
  highlighted = false,
}: {
  label: string;
  text: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4",
        highlighted
          ? "border-cyan-300/30 bg-cyan-50 dark:border-cyan-300/20 dark:bg-cyan-300/10"
          : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold",
          highlighted
            ? "text-cyan-700 dark:text-cyan-300"
            : "text-slate-500 dark:text-slate-500",
        )}
      >
        {label}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}

function HowItWorks() {
  const t = useTranslations("home.howItWorks");

  const steps = [
    { key: "observeFlow", icon: Workflow },
    { key: "reconstructBehavior", icon: Database },
    { key: "recognizePersistence", icon: Timer },
    { key: "measureRecoveryPressure", icon: Gauge },
    { key: "translateDecision", icon: Target },
  ] as const;

  return (
    <section className="mt-12">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          {t("eyebrow")}
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => (
          <InfoCard
            key={step.key}
            icon={step.icon}
            title={`${index + 1}. ${t(`steps.${step.key}.title`)}`}
            description={t(`steps.${step.key}.description`)}
          />
        ))}
      </div>
    </section>
  );
}

function LabSection() {
  const t = useTranslations("home.lab");

  const templates = [
    { key: "checkout", icon: ShoppingCart },
    { key: "chatbot", icon: MessageCircle },
    { key: "delivery", icon: Truck },
    { key: "billing", icon: CreditCard },
  ] as const;

  return (
    <section id="laboratorio" className="mt-12">
      <div className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
            {t("eyebrow")}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {templates.map((template) => (
            <InfoCard
              key={template.key}
              icon={template.icon}
              title={t(`templates.${template.key}.title`)}
              description={t(`templates.${template.key}.description`)}
            />
          ))}
        </div>

        <div className="mt-7 flex justify-center">
          <Link
            href="/simulations"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  const t = useTranslations("home.finalCta");

  return (
    <section className="mt-12 rounded-3xl border border-cyan-300/25 bg-cyan-300/10 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
        <Link
          href="/request"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}