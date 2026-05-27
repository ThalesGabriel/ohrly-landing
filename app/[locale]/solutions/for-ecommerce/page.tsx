"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Database,
  Gauge,
  LineChart,
  RefreshCw,
  ShieldAlert,
  ShoppingCart,
  Sparkles,
  Target,
  Truck,
  Workflow,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type FlowTemplateId = "checkout" | "delivery" | "cart" | "billing";
type ScenarioId = "slow_approval" | "more_retries" | "mobile_drop";
type DurationOption = "1" | "3" | "7" | "14";
type RecoveryOption = "fast" | "normal" | "slow";
type PropagationOption = "low" | "medium" | "high";
type ReadingKey =
  | "delivery"
  | "cart"
  | "billing"
  | "checkout_more_retries"
  | "checkout_mobile_drop"
  | "checkout_slow_approval";
type StateKey = "degradation" | "attention" | "variation";

type FlowTemplate = {
  id: FlowTemplateId;
  icon: React.ElementType;
};

type Scenario = {
  id: ScenarioId;
};

type Reading = {
  key: ReadingKey;
  title: string;
  summary: string;
  apmSignal: string;
  ohrlyReading: string;
  exposed: string;
  metric: string;
  metricLabel: string;
  signals: string[];
};

const flowTemplates: FlowTemplate[] = [
  {
    id: "checkout",
    icon: ShoppingCart,
  },
  {
    id: "delivery",
    icon: Truck,
  },
  {
    id: "cart",
    icon: ShoppingCart,
  },
  {
    id: "billing",
    icon: CreditCard,
  },
];

const scenarios: Scenario[] = [
  {
    id: "slow_approval",
  },
  {
    id: "more_retries",
  },
  {
    id: "mobile_drop",
  },
];

const durationScores: Record<DurationOption, number> = {
  "1": 8,
  "3": 18,
  "7": 30,
  "14": 42,
};

const recoveryScores: Record<RecoveryOption, number> = {
  fast: 8,
  normal: 16,
  slow: 28,
};

const propagationScores: Record<PropagationOption, number> = {
  low: 8,
  medium: 18,
  high: 30,
};

const baseScores: Record<FlowTemplateId, number> = {
  checkout: 14,
  delivery: 18,
  cart: 12,
  billing: 16,
};

const scenarioScores: Record<ScenarioId, number> = {
  slow_approval: 8,
  more_retries: 11,
  mobile_drop: 14,
};

const symptomItems = [
  {
    key: "slowCheckout",
    icon: Clock3,
    className: "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  },
  {
    key: "moreRetries",
    icon: RefreshCw,
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
  },
  {
    key: "moreAbandonment",
    icon: ShoppingCart,
    className:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300",
  },
  {
    key: "fragileDelivery",
    icon: Truck,
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
  },
] as const;

const methodSteps = [
  {
    key: "businessFlow",
    icon: Workflow,
  },
  {
    key: "intermediateSignals",
    icon: Zap,
  },
  {
    key: "contextComparison",
    icon: Database,
  },
  {
    key: "persistencePropagation",
    icon: BarChart3,
  },
  {
    key: "decisionTranslation",
    icon: Target,
  },
] as const;

function getRpi({
  templateId,
  scenarioId,
  duration,
  recovery,
  propagation,
}: {
  templateId: FlowTemplateId;
  scenarioId: ScenarioId;
  duration: DurationOption;
  recovery: RecoveryOption;
  propagation: PropagationOption;
}) {
  return Math.min(
    94,
    baseScores[templateId] +
      scenarioScores[scenarioId] +
      durationScores[duration] +
      recoveryScores[recovery] +
      propagationScores[propagation],
  );
}

function getStateKey(rpi: number): StateKey {
  if (rpi >= 76) {
    return "degradation";
  }

  if (rpi >= 50) {
    return "attention";
  }

  return "variation";
}

function getStateStyle(stateKey: StateKey) {
  const styles: Record<
    StateKey,
    {
      color: string;
      bg: string;
      chip: string;
      position: string;
    }
  > = {
    degradation: {
      color: "text-red-600 dark:text-red-300",
      bg: "bg-red-500",
      chip: "border-red-300/40 bg-red-300/10 text-red-700 dark:text-red-300",
      position: "86%",
    },
    attention: {
      color: "text-amber-600 dark:text-amber-300",
      bg: "bg-amber-500",
      chip:
        "border-amber-300/40 bg-amber-300/10 text-amber-700 dark:text-amber-300",
      position: "52%",
    },
    variation: {
      color: "text-emerald-600 dark:text-emerald-300",
      bg: "bg-emerald-500",
      chip:
        "border-emerald-300/40 bg-emerald-300/10 text-emerald-700 dark:text-emerald-300",
      position: "22%",
    },
  };

  return styles[stateKey];
}

function getReadingKey(templateId: FlowTemplateId, scenarioId: ScenarioId): ReadingKey {
  if (templateId === "delivery") {
    return "delivery";
  }

  if (templateId === "cart") {
    return "cart";
  }

  if (templateId === "billing") {
    return "billing";
  }

  if (scenarioId === "more_retries") {
    return "checkout_more_retries";
  }

  if (scenarioId === "mobile_drop") {
    return "checkout_mobile_drop";
  }

  return "checkout_slow_approval";
}

function useReading(templateId: FlowTemplateId, scenarioId: ScenarioId): Reading {
  const t = useTranslations("ecommerce.readings");
  const key = getReadingKey(templateId, scenarioId);

  return {
    key,
    title: t(`${key}.title`),
    summary: t(`${key}.summary`),
    apmSignal: t(`${key}.apmSignal`),
    ohrlyReading: t(`${key}.ohrlyReading`),
    exposed: t(`${key}.exposed`),
    metric: t(`${key}.metric`),
    metricLabel: t(`${key}.metricLabel`),
    signals: [
      t(`${key}.signals.one`),
      t(`${key}.signals.two`),
      t(`${key}.signals.three`),
    ],
  };
}

export default function EcommerceLandingPage() {
  const t = useTranslations("ecommerce");

  const [templateId, setTemplateId] = useState<FlowTemplateId>("checkout");
  const [scenarioId, setScenarioId] = useState<ScenarioId>("slow_approval");
  const [duration, setDuration] = useState<DurationOption>("3");
  const [recovery, setRecovery] = useState<RecoveryOption>("normal");
  const [propagation, setPropagation] = useState<PropagationOption>("medium");

  const rpi = useMemo(
    () =>
      getRpi({
        templateId,
        scenarioId,
        duration,
        recovery,
        propagation,
      }),
    [templateId, scenarioId, duration, recovery, propagation],
  );

  const stateKey = getStateKey(rpi);
  const stateStyle = getStateStyle(stateKey);
  const state = {
    key: stateKey,
    label: t(`states.${stateKey}.label`),
    shortLabel: t(`states.${stateKey}.shortLabel`),
    ...stateStyle,
  };

  const context = t(`contexts.${templateId}`);
  const reading = useReading(templateId, scenarioId);

  return (
    <PageShell>
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        <HeroSection reading={reading} rpi={rpi} state={state} />
        <ComparisonStrip />
        <SymptomsSection />
        <ExampleReadingSection
          reading={reading}
          state={state}
          context={context}
        />
        <SimulatorSection
          templateId={templateId}
          scenarioId={scenarioId}
          duration={duration}
          recovery={recovery}
          propagation={propagation}
          rpi={rpi}
          state={state}
          context={context}
          reading={reading}
          onTemplateChange={setTemplateId}
          onScenarioChange={setScenarioId}
          onDurationChange={setDuration}
          onRecoveryChange={setRecovery}
          onPropagationChange={setPropagation}
        />
        <MethodSection />
        <FinalCta />
      </main>
    </PageShell>
  );
}

function HeroSection({
  reading,
  rpi,
  state,
}: {
  reading: Reading;
  rpi: number;
  state: ReturnType<typeof getStateStyle> & {
    key: StateKey;
    label: string;
    shortLabel: string;
  };
}) {
  const t = useTranslations("ecommerce.hero");

  return (
    <section id="produto" className="grid gap-10 lg:grid-cols-[1fr_0.98fr] lg:items-center">
      <div>
        <h1 className="mt-7 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <HeroDifferenceCard
            label={t("differenceCards.apm.label")}
            text={t("differenceCards.apm.text")}
          />
          <HeroDifferenceCard
            label={t("differenceCards.ohrly.label")}
            text={t("differenceCards.ohrly.text")}
            highlighted
          />
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="#simulador"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <HeroProductVisual reading={reading} rpi={rpi} state={state} />
    </section>
  );
}

function HeroDifferenceCard({
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
          ? "border-cyan-300/40 bg-cyan-50/80 dark:border-cyan-300/25 dark:bg-cyan-300/10"
          : "border-slate-200 bg-white/65 dark:border-slate-800 dark:bg-slate-950/60",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold uppercase tracking-[0.18em]",
          highlighted ? "text-cyan-700 dark:text-cyan-300" : "text-slate-500 dark:text-slate-500",
        )}
      >
        {label}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">{text}</p>
    </div>
  );
}

function HeroProductVisual({
  reading,
  rpi,
  state,
}: {
  reading: Reading;
  rpi: number;
  state: ReturnType<typeof getStateStyle> & {
    key: StateKey;
    label: string;
    shortLabel: string;
  };
}) {
  const t = useTranslations("ecommerce.heroVisual");

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-slate-200 bg-white/85 p-6 shadow-2xl shadow-slate-200/70 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75 dark:shadow-cyan-950/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {t("eyebrow")}
            </p>
            <h2 className="mt-1 font-semibold text-slate-950 dark:text-white">
              {t("title")}
            </h2>
          </div>
          <Gauge className="h-4 w-4 text-slate-400" />
        </div>

        <div className="mt-6 flex justify-center">
          <div className="relative h-36 w-56">
            <div className="absolute left-0 top-0 h-28 w-56 rounded-t-full border-[18px] border-slate-100 border-b-0 dark:border-slate-800" />
            <div className="absolute left-0 top-0 h-28 w-56 rounded-t-full border-[18px] border-amber-400 border-b-0 border-r-transparent" />
            <div className="absolute inset-x-0 top-12 text-center">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-500">
                {t("rpiLabel")}
              </p>
              <p className="mt-1 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {rpi}
                <span className="text-2xl font-normal text-slate-500">/100</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-1 inline-flex items-center gap-2 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-sm font-semibold text-amber-700 dark:text-amber-300">
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          {state.label}
        </div>

        <MiniLineChart />

        <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs leading-5 text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
          <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
            {reading.ohrlyReading}
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <SmallMetricCard
          icon={Clock3}
          title={t("effortTitle")}
          value={reading.metric}
          description={reading.metricLabel}
        />

        <SmallMetricCard
          icon={CircleDollarSign}
          title={t("exposedValueTitle")}
          value={reading.exposed}
          description={t("exposedValueDescription")}
        />

        <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75 dark:shadow-cyan-950/20">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-950 dark:text-white">
              {t("relevantSignals")}
            </h3>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </div>

          <div className="mt-4 grid gap-3">
            {reading.signals.map((signal, index) => (
              <div key={signal} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-lg",
                    index === 0 && "bg-amber-400/10 text-amber-600 dark:text-amber-300",
                    index === 1 && "bg-red-400/10 text-red-600 dark:text-red-300",
                    index === 2 && "bg-violet-400/10 text-violet-600 dark:text-violet-300",
                  )}
                >
                  {index === 0 ? (
                    <Zap className="h-4 w-4" />
                  ) : index === 1 ? (
                    <ShieldAlert className="h-4 w-4" />
                  ) : (
                    <BarChart3 className="h-4 w-4" />
                  )}
                </span>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{signal}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniLineChart() {
  const t = useTranslations("ecommerce.heroVisual.dates");
  const points = "0,54 26,68 52,61 78,75 104,70 130,82 156,64 182,58 208,66 234,45 260,35";

  return (
    <div className="mt-6">
      <svg viewBox="0 0 260 90" className="h-24 w-full overflow-visible">
        <line x1="0" y1="18" x2="260" y2="18" className="stroke-slate-200 dark:stroke-slate-800" />
        <line x1="0" y1="45" x2="260" y2="45" className="stroke-slate-200 dark:stroke-slate-800" />
        <line x1="0" y1="72" x2="260" y2="72" className="stroke-slate-200 dark:stroke-slate-800" />
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-cyan-600 dark:text-cyan-300"
        />
        {[0, 52, 104, 156, 208, 260].map((x) => (
          <circle
            key={x}
            cx={x}
            cy={x === 0 ? 54 : x === 52 ? 61 : x === 104 ? 70 : x === 156 ? 64 : x === 208 ? 66 : 35}
            r="3"
            className="fill-white stroke-cyan-600 dark:fill-slate-950 dark:stroke-cyan-300"
            strokeWidth="2"
          />
        ))}
      </svg>

      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-500">
        <span>{t("apr30")}</span>
        <span>{t("may02")}</span>
        <span>{t("may04")}</span>
        <span>{t("may06")}</span>
      </div>
    </div>
  );
}

function SmallMetricCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/75 dark:shadow-cyan-950/20">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
        <Icon className="h-4 w-4 text-slate-400" />
        {title}
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white">{value}</p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-500">{description}</p>
        </div>

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function ComparisonStrip() {
  const t = useTranslations("ecommerce.comparison");

  return (
    <section className="mt-16">
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

        <div className="mt-7 grid gap-5 md:grid-cols-3 md:divide-x md:divide-slate-200 dark:md:divide-slate-800">
          <ComparisonItem
            icon={LineChart}
            title={t("items.apm.title")}
            description={t("items.apm.description")}
          />
          <ComparisonItem
            icon={BarChart3}
            title={t("items.bi.title")}
            description={t("items.bi.description")}
          />
          <ComparisonItem
            icon={Sparkles}
            title={t("items.ohrly.title")}
            description={t("items.ohrly.description")}
            highlighted
          />
        </div>
      </div>
    </section>
  );
}

function ComparisonItem({
  icon: Icon,
  title,
  description,
  highlighted = false,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  highlighted?: boolean;
}) {
  return (
    <div className="flex items-center justify-center gap-4 px-4 py-2 text-left">
      <div
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
          highlighted
            ? "bg-cyan-100 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300"
            : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300",
        )}
      >
        <Icon className="h-6 w-6" />
      </div>

      <div>
        <p
          className={cn(
            "text-lg font-semibold",
            highlighted ? "text-cyan-700 dark:text-cyan-300" : "text-slate-950 dark:text-white",
          )}
        >
          {title}
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p>
      </div>
    </div>
  );
}

function SymptomsSection() {
  const t = useTranslations("ecommerce.symptoms");

  return (
    <section className="mt-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {t("description")}
        </p>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {symptomItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.key}
              className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10"
            >
              <div className="flex items-center gap-4">
                <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", item.className)}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-slate-950 dark:text-white">
                  {t(`items.${item.key}.title`)}
                </h3>
              </div>

              <div className="mt-5 grid gap-3">
                <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-500">
                    {t("apmLabel")}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
                    {t(`items.${item.key}.apm`)}
                  </p>
                </div>

                <div className="rounded-xl border border-cyan-300/30 bg-cyan-50 p-3 dark:border-cyan-300/20 dark:bg-cyan-300/10">
                  <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                    {t("ohrlyLabel")}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-700 dark:text-slate-300">
                    {t(`items.${item.key}.ohrly`)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function ExampleReadingSection({
  reading,
  state,
  context,
}: {
  reading: Reading;
  state: ReturnType<typeof getStateStyle> & {
    key: StateKey;
    label: string;
    shortLabel: string;
  };
  context: string;
}) {
  const t = useTranslations("ecommerce.example");

  return (
    <section id="exemplo" className="mt-10">
      <div className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[180px_1fr_1fr] lg:items-center">
          <div className="relative hidden h-36 overflow-hidden rounded-2xl bg-cyan-50 dark:bg-cyan-950/20 lg:block">
            <div className="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-950 text-white dark:bg-cyan-300 dark:text-slate-950">
              <Workflow className="h-8 w-8" />
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <svg viewBox="0 0 180 80" className="h-20 w-full text-cyan-500/60">
                <polyline
                  points="0,60 25,48 48,56 72,34 96,16 120,22 144,12 180,18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
              </svg>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
              {t("eyebrow")}
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {reading.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              {reading.summary}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-2">
              <ReadingMiniMetric value={state.label} chip={state.chip} />
              <ReadingMiniMetric value={context} />
            </div>
          </div>

          <div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <ReadingContrastBox label={t("apmCouldSay")} text={reading.apmSignal} />
              <ReadingContrastBox label={t("ohrlyInterprets")} text={reading.ohrlyReading} highlighted />
            </div>
          </div>
        </div>
      </div>
    </section>
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
        "rounded-xl border p-3",
        highlighted
          ? "border-cyan-300/30 bg-cyan-50 dark:border-cyan-300/20 dark:bg-cyan-300/10"
          : "border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60",
      )}
    >
      <p
        className={cn(
          "text-xs font-semibold",
          highlighted ? "text-cyan-700 dark:text-cyan-300" : "text-slate-500 dark:text-slate-500",
        )}
      >
        {label}
      </p>
      <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">{text}</p>
    </div>
  );
}

function ReadingMiniMetric({
  label,
  value,
  chip,
}: {
  label?: string;
  value: string;
  chip?: string;
}) {
  return (
    <div>
      {label ? <p className="text-xs font-medium text-slate-500 dark:text-slate-500">{label}</p> : null}

      {chip ? (
        <span className={cn("mt-2 inline-flex rounded-lg border px-2.5 py-1 text-xs font-semibold", chip)}>
          {value}
        </span>
      ) : (
        <p className="mt-2 text-sm font-bold leading-5 text-slate-950 dark:text-white">{value}</p>
      )}
    </div>
  );
}

function SimulatorSection({
  templateId,
  scenarioId,
  duration,
  recovery,
  propagation,
  rpi,
  state,
  context,
  reading,
  onTemplateChange,
  onScenarioChange,
  onDurationChange,
  onRecoveryChange,
  onPropagationChange,
}: {
  templateId: FlowTemplateId;
  scenarioId: ScenarioId;
  duration: DurationOption;
  recovery: RecoveryOption;
  propagation: PropagationOption;
  rpi: number;
  state: ReturnType<typeof getStateStyle> & {
    key: StateKey;
    label: string;
    shortLabel: string;
  };
  context: string;
  reading: Reading;
  onTemplateChange: (value: FlowTemplateId) => void;
  onScenarioChange: (value: ScenarioId) => void;
  onDurationChange: (value: DurationOption) => void;
  onRecoveryChange: (value: RecoveryOption) => void;
  onPropagationChange: (value: PropagationOption) => void;
}) {
  const t = useTranslations("ecommerce.simulator");

  return (
    <section id="simulador" className="mt-10">
      <div className="rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20 lg:p-7">
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

        <div className="mt-7 grid gap-6 xl:grid-cols-4">
          <StepColumn number="1" title={t("steps.one")}>
            <div className="grid gap-3">
              {flowTemplates.map((template) => (
                <TemplateButton
                  key={template.id}
                  template={template}
                  selected={template.id === templateId}
                  onClick={() => onTemplateChange(template.id)}
                />
              ))}
            </div>
          </StepColumn>

          <StepColumn number="2" title={t("steps.two")}>
            <div className="grid gap-3">
              {scenarios.map((scenario) => (
                <ScenarioButton
                  key={scenario.id}
                  scenario={scenario}
                  selected={scenario.id === scenarioId}
                  onClick={() => onScenarioChange(scenario.id)}
                />
              ))}
            </div>
          </StepColumn>

          <StepColumn number="3" title={t("steps.three")}>
            <div className="grid gap-4">
              <SegmentedControl
                label={t("controls.persistence")}
                value={duration}
                options={[
                  { label: "1d", value: "1" },
                  { label: "3d", value: "3" },
                  { label: "7d", value: "7" },
                  { label: "14d", value: "14" },
                ]}
                onChange={onDurationChange}
              />

              <SegmentedControl
                label={t("controls.recovery")}
                value={recovery}
                options={[
                  { label: t("controls.fast"), value: "fast" },
                  { label: t("controls.normal"), value: "normal" },
                  { label: t("controls.slow"), value: "slow" },
                ]}
                onChange={onRecoveryChange}
              />

              <SegmentedControl
                label={t("controls.propagation")}
                value={propagation}
                options={[
                  { label: t("controls.low"), value: "low" },
                  { label: t("controls.medium"), value: "medium" },
                  { label: t("controls.high"), value: "high" },
                ]}
                onChange={onPropagationChange}
              />
            </div>
          </StepColumn>

          <StepColumn number="4" title={t("steps.four")}>
            <LiveReadingCard rpi={rpi} state={state} context={context} reading={reading} />
          </StepColumn>
        </div>
      </div>
    </section>
  );
}

function StepColumn({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/60 p-4 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300">
          {number}
        </span>
        <h3 className="text-sm font-semibold text-slate-950 dark:text-white">{title}</h3>
      </div>

      {children}
    </div>
  );
}

function TemplateButton({
  template,
  selected,
  onClick,
}: {
  template: FlowTemplate;
  selected: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("ecommerce.flowTemplates");
  const Icon = template.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
        selected
          ? "border-cyan-400 bg-cyan-50 text-cyan-700 dark:border-cyan-300/40 dark:bg-cyan-300/10 dark:text-cyan-300"
          : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-300/40",
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>
        <span className="block text-sm font-semibold">{t(`${template.id}.name`)}</span>
        <span className="mt-0.5 block text-xs opacity-70">{t(`${template.id}.description`)}</span>
      </span>
    </button>
  );
}

function ScenarioButton({
  scenario,
  selected,
  onClick,
}: {
  scenario: Scenario;
  selected: boolean;
  onClick: () => void;
}) {
  const t = useTranslations("ecommerce.scenarios");

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-xl border px-3 py-3 text-left transition",
        selected
          ? "border-cyan-400 bg-cyan-50 text-cyan-700 dark:border-cyan-300/40 dark:bg-cyan-300/10 dark:text-cyan-300"
          : "border-slate-200 bg-white text-slate-600 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-cyan-300/40",
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border",
          selected
            ? "border-cyan-600 bg-cyan-600 text-white dark:border-cyan-300 dark:bg-cyan-300 dark:text-slate-950"
            : "border-slate-300 dark:border-slate-700",
        )}
      >
        {selected ? <Check className="h-3 w-3" /> : null}
      </span>

      <span>
        <span className="block text-sm font-semibold">{t(`${scenario.id}.name`)}</span>
        <span className="mt-0.5 block text-xs opacity-70">{t(`${scenario.id}.description`)}</span>
      </span>
    </button>
  );
}

function SegmentedControl<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: Array<{ label: string; value: T }>;
  onChange: (value: T) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">{label}</p>

      <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-950">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "cursor-pointer rounded-lg px-3 py-2 text-xs font-semibold transition",
              value === option.value
                ? "bg-white text-cyan-700 shadow-sm dark:bg-cyan-300/10 dark:text-cyan-300"
                : "text-slate-500 hover:text-cyan-700 dark:text-slate-500 dark:hover:text-cyan-300",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function LiveReadingCard({
  rpi,
  state,
  context,
  reading,
}: {
  rpi: number;
  state: ReturnType<typeof getStateStyle> & {
    key: StateKey;
    label: string;
    shortLabel: string;
  };
  context: string;
  reading: Reading;
}) {
  const t = useTranslations("ecommerce.simulator.liveReading");

  return (
    <div className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4 dark:border-cyan-300/20 dark:bg-cyan-300/10">
      <div className="grid gap-4">
        <LiveReadingRow label={t("state")}>
          <span className={cn("inline-flex items-center gap-2 font-semibold", state.color)}>
            <span className={cn("h-2 w-2 rounded-full", state.bg)} />
            {state.label}
          </span>
        </LiveReadingRow>

        <LiveReadingRow label="RPI">
          <span className="font-semibold text-slate-950 dark:text-white">
            <span className="text-2xl">{rpi}</span>
            <span className="text-slate-500">/100</span>
          </span>
        </LiveReadingRow>

        <LiveReadingRow label={t("context")}>
          <span className="font-semibold text-slate-950 dark:text-white">{context}</span>
        </LiveReadingRow>

        <div className="rounded-xl border border-cyan-300/30 bg-white/70 p-3 dark:border-cyan-300/20 dark:bg-slate-950/40">
          <p className="text-xs font-semibold text-cyan-700 dark:text-cyan-300">{t("reading")}</p>
          <p className="mt-1 text-xs leading-5 text-slate-700 dark:text-slate-300">{reading.ohrlyReading}</p>
        </div>

        <div>
          <p className="mb-3 text-xs font-medium text-slate-500 dark:text-slate-500">
            {t("timeline")}
          </p>

          <div className="relative h-10">
            <div className="absolute left-0 right-0 top-4 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="absolute left-0 top-4 h-1 w-[54%] rounded-full bg-emerald-500" />
            <div className="absolute left-[54%] top-4 h-1 w-[18%] rounded-full bg-amber-400" />

            {["0%", "25%", "54%", "75%", "100%"].map((left, index) => (
              <div
                key={left}
                className={cn(
                  "absolute top-1 h-7 w-7 -translate-x-1/2 rounded-full border-4 border-white shadow dark:border-slate-950",
                  index < 2 && "bg-emerald-500",
                  index === 2 && "bg-amber-400",
                  index > 2 && "bg-slate-300 dark:bg-slate-700",
                )}
                style={{ left }}
              />
            ))}
          </div>

          <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-500">
            <span>-7d</span>
            <span>-4d</span>
            <span>{t("today")}</span>
            <span>+3d</span>
            <span>+7d</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveReadingRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-500">{label}</p>
      <div className="text-sm">{children}</div>
    </div>
  );
}

function MethodSection() {
  const t = useTranslations("ecommerce.method");

  return (
    <section id="como-funciona" className="mt-10">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">
          {t("eyebrow")}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
          {t("title")}
        </h2>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-5">
        {methodSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.key} className="relative">
              <div className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-sm font-semibold leading-5 text-slate-950 dark:text-white">
                  {index + 1}. {t(`steps.${step.key}.title`)}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {t(`steps.${step.key}.description`)}
                </p>
              </div>

              {index < methodSteps.length - 1 ? (
                <ChevronRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-slate-300 md:block dark:text-slate-700" />
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function FinalCta() {
  const t = useTranslations("ecommerce.finalCta");

  return (
    <section className="mt-10 rounded-3xl border border-cyan-300/25 bg-cyan-300/10 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur lg:flex lg:items-center lg:justify-between lg:gap-8 lg:p-8">
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
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500 dark:bg-cyan-500 dark:hover:bg-cyan-400"
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
