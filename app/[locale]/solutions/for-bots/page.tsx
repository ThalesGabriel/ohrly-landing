"use client";

import type { ElementType, ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ClipboardCheck,
  Clock3,
  Database,
  FlaskConical,
  HelpCircle,
  LineChart,
  LockKeyhole,
  MessageCircle,
  MessageSquareWarning,
  RefreshCcw,
  Scale,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  UserRoundPlus,
  Zap,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type SymptomKey =
  | "moreHandoff"
  | "moreFallback"
  | "longerResolution"
  | "unresolvedSessions";

type MethodStepKey =
  | "expectedFlow"
  | "behaviorSignals"
  | "contextComparison"
  | "persistenceMagnitudePropagation"
  | "actionableReading";

type ComparisonKey = "apm" | "bi" | "ohrly";

type InsightKey = "handoff" | "fallback" | "resolution";

type SignalKey =
  | "handoff"
  | "fallback"
  | "resolutionTime"
  | "unresolvedSessions";

type Symptom = {
  key: SymptomKey;
  icon: ElementType;
  className: string;
};

type MethodStep = {
  key: MethodStepKey;
  icon: ElementType;
  className: string;
};

type ComparisonItem = {
  key: ComparisonKey;
  icon: ElementType;
  className: string;
};

type InsightItemConfig = {
  key: InsightKey;
  icon: ElementType;
  tone: "orange" | "violet" | "cyan";
};

type SignalChipConfig = {
  key: SignalKey;
  tone: "orange" | "violet" | "cyan" | "green";
};

const symptoms: Symptom[] = [
  {
    key: "moreHandoff",
    icon: TrendingUp,
    className:
      "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
  },
  {
    key: "moreFallback",
    icon: RefreshCcw,
    className:
      "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300",
  },
  {
    key: "longerResolution",
    icon: Clock3,
    className:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  },
  {
    key: "unresolvedSessions",
    icon: UserRoundPlus,
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
  },
];

const methodSteps: MethodStep[] = [
  {
    key: "expectedFlow",
    icon: Target,
    className: "text-cyan-600 dark:text-cyan-300",
  },
  {
    key: "behaviorSignals",
    icon: LineChart,
    className: "text-emerald-600 dark:text-emerald-300",
  },
  {
    key: "contextComparison",
    icon: Scale,
    className: "text-violet-600 dark:text-violet-300",
  },
  {
    key: "persistenceMagnitudePropagation",
    icon: BarChart3,
    className: "text-orange-600 dark:text-orange-300",
  },
  {
    key: "actionableReading",
    icon: ClipboardCheck,
    className: "text-cyan-600 dark:text-cyan-300",
  },
];

const suggestedFields = [
  "session_id",
  "channel",
  "started_at",
  "intent",
  "bot_resolved",
  "fallback_count",
  "handoff_to_human",
  "handoff_at",
  "resolved_at",
  "message_count",
  "customer_type",
];

const comparisonItems: ComparisonItem[] = [
  {
    key: "apm",
    icon: Zap,
    className:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  },
  {
    key: "bi",
    icon: BarChart3,
    className:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300",
  },
  {
    key: "ohrly",
    icon: Sparkles,
    className:
      "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
  },
];

const insightItems: InsightItemConfig[] = [
  {
    key: "handoff",
    icon: TrendingUp,
    tone: "orange",
  },
  {
    key: "fallback",
    icon: RefreshCcw,
    tone: "violet",
  },
  {
    key: "resolution",
    icon: Clock3,
    tone: "cyan",
  },
];

const signalChips: SignalChipConfig[] = [
  {
    key: "handoff",
    tone: "orange",
  },
  {
    key: "fallback",
    tone: "violet",
  },
  {
    key: "resolutionTime",
    tone: "cyan",
  },
  {
    key: "unresolvedSessions",
    tone: "green",
  },
];

export default function BotDriftLandingPage() {
  return (
    <PageShell>
      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-14 pt-10 sm:px-8 lg:grid-cols-[1fr_0.95fr] lg:px-10 lg:pb-16 lg:pt-14">
        <HeroCopy />
        <HeroDashboard />
      </section>

      <SymptomsSection />

      <section id="exemplo" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <ExampleReading />
      </section>

      <section id="metodo" className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <MethodSection />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <StartWithoutIntegration />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <ComparisonStrip />
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 pt-4 sm:px-8 lg:px-10">
        <FinalCta />
      </section>
    </PageShell>
  );
}

function BackgroundDecor() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.045)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70 dark:bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] dark:opacity-20" />
      <div className="absolute left-[-18%] top-[-12%] h-[480px] w-[480px] rounded-full bg-cyan-300/15 blur-3xl dark:bg-cyan-400/10" />
      <div className="absolute right-[-18%] top-[14%] h-[560px] w-[560px] rounded-full bg-cyan-500/10 blur-3xl dark:bg-cyan-500/10" />
    </div>
  );
}

function Header() {
  const t = useTranslations("bots.header");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/15">
            <span className="h-5 w-5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/30" />
          </span>
          <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Ohrly
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <a href="#como-funciona" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
            {t("howItWorks")}
          </a>
          <a href="#exemplo" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
            {t("example")}
          </a>
          <a href="#metodo" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
            {t("method")}
          </a>
          <Link href="/login" className="transition hover:text-cyan-700 dark:hover:text-cyan-300">
            {t("login")}
          </Link>
        </nav>

        <Link
          href="/app"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-cyan-600 px-5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500"
        >
          {t("labCta")}
        </Link>
      </div>
    </header>
  );
}

function HeroCopy() {
  const t = useTranslations("bots.hero");

  return (
    <div className="flex flex-col justify-center">
      <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-cyan-200 bg-cyan-50 px-3 py-1.5 text-sm font-semibold text-cyan-700 dark:border-cyan-400/25 dark:bg-cyan-400/10 dark:text-cyan-300">
        <LineChart className="h-4 w-4" />
        {t("badge")}
      </div>

      <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight text-slate-950 dark:text-white sm:text-6xl">
        {t("title")}
      </h1>

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
        {t("description")}
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a
          href="#exemplo"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500"
        >
          {t("primaryCta")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
        <LockKeyhole className="h-4 w-4" />
        {t("privacyNote")}
      </div>
    </div>
  );
}

function HeroDashboard() {
  const t = useTranslations("bots.dashboard");

  return (
    <div className="relative hidden min-h-[420px] lg:block">
      <div className="absolute left-4 top-10 w-64 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-cyan-950/20">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {t("rpiTitle")}
          </p>
          <HelpCircle className="h-4 w-4 text-slate-400" />
        </div>

        <div className="mt-4 flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight text-orange-600 dark:text-orange-300">
            61
          </span>
          <span className="pb-2 text-xl text-slate-500 dark:text-slate-500">/100</span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full w-[61%] rounded-full bg-orange-500" />
        </div>

        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-300">
          <MessageSquareWarning className="h-4 w-4" />
          {t("state")}
        </div>

        <p className="mt-5 text-xs font-medium text-slate-500 dark:text-slate-500">
          {t("contextLabel")}
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
          {t("contextValue")}
        </p>
      </div>

      <ChartCard />

      <div className="absolute bottom-12 left-28 w-64 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-cyan-950/20">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {t("recoveryPressure")}
        </p>

        <div className="mt-5 flex items-center justify-center">
          <div
            className="relative h-28 w-28 rounded-full"
            style={{
              background:
                "conic-gradient(rgb(249 115 22) 0deg 259deg, rgb(226 232 240) 259deg 360deg)",
            }}
          >
            <div className="absolute inset-4 rounded-full bg-white dark:bg-slate-950" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                {t("recoveryLevel")}
              </span>
              <span className="text-lg font-bold text-orange-600 dark:text-orange-300">
                72%
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-sm leading-5 text-slate-500 dark:text-slate-400">
          {t("recoveryDescription")}
        </p>
      </div>

      <div className="absolute right-0 top-40 w-72 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-cyan-950/20">
        <p className="font-semibold text-slate-950 dark:text-white">
          {t("mainInsights")}
        </p>

        <div className="mt-4 grid gap-3">
          {insightItems.map((item) => (
            <InsightItem
              key={item.key}
              icon={item.icon}
              text={t(`insights.${item.key}`)}
              tone={item.tone}
            />
          ))}
        </div>

        <a className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 dark:text-cyan-300">
          {t("viewSignals")}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

function ChartCard() {
  const t = useTranslations("bots.dashboard");

  return (
    <div className="absolute right-0 top-2 w-72 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/85 dark:shadow-cyan-950/20">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-slate-950 dark:text-white">
          {t("handoffChartTitle")}
        </p>
        <span className="rounded-lg bg-cyan-50 px-2 py-1 text-xs font-bold text-cyan-600 dark:bg-cyan-400/10 dark:text-cyan-300">
          42%
        </span>
      </div>

      <div className="mt-4 h-28">
        <svg viewBox="0 0 260 100" className="h-full w-full overflow-visible">
          <path
            d="M4 78 C22 58, 37 63, 50 54 C68 44, 84 61, 98 48 C116 31, 126 52, 144 40 C160 28, 174 34, 190 25 C210 13, 218 22, 234 10 C244 3, 250 8, 258 0"
            fill="none"
            stroke="rgb(37 99 235)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M4 78 C22 58, 37 63, 50 54 C68 44, 84 61, 98 48 C116 31, 126 52, 144 40 C160 28, 174 34, 190 25 C210 13, 218 22, 234 10 C244 3, 250 8, 258 0 L258 100 L4 100 Z"
            fill="rgb(37 99 235 / 0.08)"
          />
        </svg>
      </div>

      <div className="mt-1 flex justify-between text-xs text-slate-400 dark:text-slate-600">
        <span>-30d</span>
        <span>-20d</span>
        <span>-10d</span>
        <span>{t("today")}</span>
      </div>
    </div>
  );
}

function InsightItem({
  icon: Icon,
  text,
  tone,
}: {
  icon: ElementType;
  text: string;
  tone: "orange" | "violet" | "cyan";
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-950/70">
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          tone === "orange" && "bg-orange-50 text-orange-600 dark:bg-orange-950/30 dark:text-orange-300",
          tone === "violet" && "bg-violet-50 text-violet-600 dark:bg-violet-950/30 dark:text-violet-300",
          tone === "cyan" && "bg-cyan-50 text-cyan-600 dark:bg-cyan-950/30 dark:text-cyan-300",
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-semibold leading-4 text-slate-700 dark:text-slate-300">
        {text}
      </p>
    </div>
  );
}

function SymptomsSection() {
  const t = useTranslations("bots");

  return (
    <section className="border-y border-slate-200/80 bg-white/60 py-8 backdrop-blur dark:border-slate-800 dark:bg-slate-950/40">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <h2 className="text-center text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
          {t("symptomsSection.title")}
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {symptoms.map((symptom) => {
            const Icon = symptom.icon;

            return (
              <div
                key={symptom.key}
                className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10"
              >
                <div className="flex items-center gap-4">
                  <div className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl", symptom.className)}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-white">
                      {t(`symptoms.${symptom.key}.title`)}
                    </h3>
                    <p className="mt-1 text-sm leading-5 text-slate-600 dark:text-slate-400">
                      {t(`symptoms.${symptom.key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExampleReading() {
  const t = useTranslations("bots.exampleReading");

  return (
    <div>
      <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        {t("title")}
      </h2>

      <div className="mt-5 rounded-3xl border border-cyan-200 bg-white/85 p-5 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-cyan-400/30 dark:bg-slate-950/70 dark:shadow-cyan-950/20 lg:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.55fr_0.8fr_1.3fr_auto] lg:items-center">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-300">
              <MessageCircle className="h-8 w-8" />
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                {t("cardTitle")}
              </h3>
              <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-300">
                <MessageSquareWarning className="h-4 w-4" />
                {t("state")}
              </p>
            </div>
          </div>

          <MetricBlock label="RPI">
            <div className="flex items-end gap-1">
              <span className="text-4xl font-bold tracking-tight text-orange-600 dark:text-orange-300">
                61
              </span>
              <span className="pb-1 text-lg text-slate-500">/100</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
              <div className="h-full w-[61%] rounded-full bg-orange-500" />
            </div>
          </MetricBlock>

          <MetricBlock label={t("contextLabel")}>
            <p className="text-sm font-bold leading-5 text-slate-950 dark:text-white">
              {t("contextValue")}
            </p>
          </MetricBlock>

          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-500">
              {t("connectedSignals")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {signalChips.map((signal) => (
                <SignalChip key={signal.key} tone={signal.tone}>
                  {t(`signals.${signal.key}`)}
                </SignalChip>
              ))}
            </div>
          </div>

          <Link
            href="/simulations"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-cyan-300 bg-white px-5 text-sm font-semibold text-cyan-700 transition hover:-translate-y-0.5 hover:bg-cyan-50 dark:border-cyan-400/30 dark:bg-slate-950/70 dark:text-cyan-300 dark:hover:bg-cyan-400/10"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {t("adaptCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MetricBlock({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border-slate-200 lg:border-l lg:pl-6 dark:border-slate-800">
      <p className="text-xs font-semibold text-slate-500 dark:text-slate-500">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function SignalChip({
  tone,
  children,
}: {
  tone: "orange" | "violet" | "cyan" | "green";
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "rounded-lg border px-2.5 py-1 text-xs font-semibold",
        tone === "orange" && "border-orange-300/40 bg-orange-50 text-orange-700 dark:bg-orange-950/30 dark:text-orange-300",
        tone === "violet" && "border-violet-300/40 bg-violet-50 text-violet-700 dark:bg-violet-950/30 dark:text-violet-300",
        tone === "cyan" && "border-cyan-300/40 bg-cyan-50 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300",
        tone === "green" && "border-emerald-300/40 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300",
      )}
    >
      {children}
    </span>
  );
}

function MethodSection() {
  const t = useTranslations("bots");

  return (
    <div id="como-funciona">
      <h2 className="text-center text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        {t("methodSection.title")}
      </h2>

      <div className="mt-6 grid gap-4 lg:grid-cols-5">
        {methodSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <div key={step.key} className="relative">
              {index < methodSteps.length - 1 ? (
                <div className="absolute left-[calc(100%-10px)] top-1/2 hidden h-px w-8 border-t border-dashed border-slate-300 dark:border-slate-700 lg:block" />
              ) : null}

              <div className="h-full rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10">
                <div className="flex items-center gap-3">
                  <Icon className={cn("h-5 w-5", step.className)} />
                  <span className="text-sm font-bold text-slate-400 dark:text-slate-600">
                    {t(`methodSteps.${step.key}.number`)}.
                  </span>
                </div>

                <h3 className="mt-4 text-sm font-bold leading-5 text-slate-950 dark:text-white">
                  {t(`methodSteps.${step.key}.title`)}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {t(`methodSteps.${step.key}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StartWithoutIntegration() {
  const t = useTranslations("bots.startWithoutIntegration");

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
        {t("title")}
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
        {t("description")}
      </p>

      <div className="mx-auto mt-6 flex max-w-5xl flex-wrap justify-center gap-3">
        {suggestedFields.map((field) => (
          <span
            key={field}
            className="rounded-lg border border-slate-200 bg-white/85 px-4 py-2 font-mono text-xs font-semibold text-cyan-700 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 dark:text-cyan-300"
          >
            {field}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-500">
        <LockKeyhole className="h-4 w-4" />
        {t("privacyNote")}
      </div>
    </div>
  );
}

function ComparisonStrip() {
  const t = useTranslations("bots.comparison");

  return (
    <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70 dark:shadow-cyan-950/10">
      <div className="grid gap-5 md:grid-cols-3 md:divide-x md:divide-slate-200 dark:md:divide-slate-800">
        {comparisonItems.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.key} className="flex gap-4 px-3">
              <div className={cn("flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", item.className)}>
                <Icon className="h-6 w-6" />
              </div>

              <div>
                <p className="text-lg font-bold text-cyan-700 dark:text-cyan-300">
                  {t(`${item.key}.title`)}
                </p>
                <p className="font-semibold text-slate-950 dark:text-white">
                  {t(`${item.key}.subtitle`)}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {t(`${item.key}.description`)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FinalCta() {
  const t = useTranslations("bots.finalCta");

  return (
    <section className="rounded-3xl border border-cyan-200 bg-cyan-50/70 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur dark:border-cyan-400/25 dark:bg-cyan-400/10 lg:flex lg:items-center lg:justify-between lg:gap-8">
      <div className="flex gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-cyan-100 text-cyan-600 dark:bg-cyan-400/15 dark:text-cyan-300">
          <Sparkles className="h-8 w-8" />
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>
      </div>

      <div className="mt-6 lg:mt-0">
        <Link
          href="/request"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-500"
        >
          <FlaskConical className="h-4 w-4" />
          {t("cta")}
        </Link>

        <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <ShieldCheck className="h-4 w-4" />
          {t("privacyNote")}
        </div>
      </div>
    </section>
  );
}
