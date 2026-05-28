"use client";

import { Link } from "@/i18n/navigation";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  FileText,
  Info,
  MessageCircle,
  Network,
  Sparkles,
  Target,
  TrendingDown,
  TrendingUp,
  TriangleAlert,
  Users,
  Zap,
  Database,
  CircleHelp,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { publicReports } from "@/data/reports";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { useEffect, useRef } from "react";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  eventParams: Record<string, string | number | boolean | undefined>;
  className?: string;
  children: React.ReactNode;
};

export function TrackedLink({
  href,
  eventName,
  eventParams,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => trackMetaEvent(eventName, eventParams)}
      className={className}
    >
      {children}
    </Link>
  );
}

type TrackSectionViewProps = {
  eventName: string;
  eventParams: Record<string, string | number | boolean | undefined>;
  threshold?: number;
  children: React.ReactNode;
};

export function TrackSectionView({
  eventName,
  eventParams,
  threshold = 0.45,
  children,
}: TrackSectionViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const tracked = useRef(false);

  useEffect(() => {
    if (!ref.current || tracked.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true;
          trackMetaEvent(eventName, eventParams);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [eventName, eventParams, threshold]);

  return <div ref={ref}>{children}</div>;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type ReportDetailPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

const reportDetails = {
  "retencao-boleto-conversacional": {
    translationKey: "retencao-boleto-conversacional",
    stateTone: "danger" as const,
    rpi: 68,
    badgeKeys: ["publicReport", "syntheticData", "domain"],
    timeline: [
      { key: "normal", rpi: 22, tone: "healthy" as const },
      { key: "variation", rpi: 35, tone: "variation" as const },
      { key: "attention", rpi: 51, tone: "attention" as const },
      { key: "degradation", rpi: 68, tone: "danger" as const },
    ],
    associatedSignalKeys: [
      "boletoFailure",
      "humanHandoff",
      "serviceTime",
      "totalResolution",
      "complaints",
    ],
    evidence: [
      {
        value: "625",
        labelKey: "outOfExpected",
        icon: BarChart3,
        tone: "cyan" as const,
      },
      {
        value: "34",
        labelKey: "sustainedStates",
        icon: Zap,
        tone: "danger" as const,
      },
      {
        value: "6",
        labelKey: "simultaneousSignals",
        icon: Users,
        tone: "purple" as const,
      },
    ],
    fields: [
      "conversation_id",
      "channel",
      "requested_boleto",
      "boleto_generation_success",
      "handoff_to_human",
      "final_resolution",
      "complaint_flag",
    ],
    interpretedSignalKeys: [
      "retention",
      "boletoFailure",
      "handoff",
      "humanTime",
      "totalResolution",
      "complaints",
    ],
  },
  "checkout-aprovacao-lenta": {
    translationKey: "checkout-aprovacao-lenta",
    stateTone: "attention" as const,
    rpi: 58,
    badgeKeys: ["publicReport", "syntheticData", "domain"],
    timeline: [
      { key: "normal", rpi: 18, tone: "healthy" as const },
      { key: "variation", rpi: 31, tone: "variation" as const },
      { key: "attention", rpi: 58, tone: "attention" as const },
      { key: "observation", rpi: 58, tone: "attention" as const },
    ],
    associatedSignalKeys: [
      "retries",
      "mobileCompletion",
      "exposedValue",
      "pixContext",
    ],
    evidence: [
      {
        value: "4d",
        labelKey: "persistentSignal",
        icon: CalendarDays,
        tone: "cyan" as const,
      },
      {
        value: "2.1x",
        labelKey: "aboveExpected",
        icon: TrendingUp,
        tone: "attention" as const,
      },
      {
        value: "3",
        labelKey: "observableSignals",
        icon: Network,
        tone: "purple" as const,
      },
    ],
    fields: [
      "order_id",
      "checkout_started_at",
      "payment_method",
      "payment_approved_at",
      "order_status",
      "order_value",
      "device",
    ],
    interpretedSignalKeys: [
      "approvalTime",
      "retries",
      "abandonment",
      "exposedValue",
    ],
  },
} as const;

const badgeIconMap = [Sparkles, Database, MessageCircle];

export default async function ReportDetailPage({
  params,
}: ReportDetailPageProps) {
  const { slug } = await params;

  const report = publicReports.find((item) => item.slug === slug);
  const detail = reportDetails[slug as keyof typeof reportDetails];

  if (!report || !detail) {
    notFound();
  }

  const t = await getTranslations("reportDetail");
  const base = `reports.${detail.translationKey}`;

  return (
    <PageShell>
      <article className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <TrackedLink
          href="/reports"
          eventName="ReportDetailBackClick"
          eventParams={{
            source: "report_detail",
            slug: report.slug,
            reportId: report.id,
            rpi: detail.rpi,
            stateTone: detail.stateTone,
            destination: "/reports",
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cyan-700 dark:text-slate-400 dark:hover:text-cyan-300"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backToLibrary")}
        </TrackedLink>

        <ReportHero t={t} detail={detail} base={base} />
        <SummaryCards t={t} detail={detail} base={base} />

        <div className="mt-6 grid gap-4">
          <NarrativeCard
            icon={MessageCircle}
            title={t("sections.oneSentence")}
            text={t(`${base}.oneSentence`)}
          />

          <NarrativeCard
            icon={Sparkles}
            title={t("sections.whyItMatters")}
            text={t(`${base}.whyItMatters`)}
          />
        </div>

        <TrackSectionView
          eventName="ReportTimelineViewed"
          eventParams={{
            source: "report_detail",
            slug: report.slug,
            reportId: report.id,
            rpi: detail.rpi,
            stateTone: detail.stateTone,
          }}
        >
          <BehaviorTimeline t={t} detail={detail} base={base} />
        </TrackSectionView>
        <TrackSectionView
          eventName="ReportConnectedSignalsViewed"
          eventParams={{
            source: "report_detail",
            slug: report.slug,
            reportId: report.id,
            rpi: detail.rpi,
            stateTone: detail.stateTone,
            signalsCount: detail.associatedSignalKeys.length,
          }}
        >
          <ConnectedSignals t={t} detail={detail} base={base} />
        </TrackSectionView>

        <section className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <TrackSectionView
            eventName="ReportEvidenceViewed"
            eventParams={{
              source: "report_detail",
              slug: report.slug,
              reportId: report.id,
              rpi: detail.rpi,
              stateTone: detail.stateTone,
              evidenceCount: detail.evidence.length,
            }}
          >
            <EvidenceSection t={t} detail={detail} base={base} />
          </TrackSectionView>
          <InterpretationCard
            t={t}
            text={t(`${base}.interpretation`)}
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <RequestCard t={t} base={base} />
          <FieldsAndSignals t={t} detail={detail} base={base} />
        </section>

        <TrackedLink
          href="/request"
          eventName="ReportRequestClick"
          eventParams={{
            source: "report_detail",
            section: "final_cta",
            slug,
            reportId: report.id,
            rpi: detail.rpi,
            stateTone: detail.stateTone,
            destination: "/request",
          }}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          {t("cta.button")}
          <ArrowRight className="h-4 w-4" />
        </TrackedLink>
      </article>
    </PageShell>
  );
}

type TranslationFn = Awaited<ReturnType<typeof getTranslations>>;

type ReportDetail = (typeof reportDetails)[keyof typeof reportDetails];

function ReportHero({
  t,
  detail,
  base,
}: {
  t: TranslationFn;
  detail: ReportDetail;
  base: string;
}) {
  return (
    <section className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
      <div>
        <div className="flex flex-wrap gap-2">
          {detail.badgeKeys.map((badgeKey, index) => {
            const Icon = badgeIconMap[index] ?? Sparkles;

            return (
              <span
                key={badgeKey}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300"
              >
                <Icon className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
                {t(`${base}.badges.${badgeKey}`)}
              </span>
            );
          })}
        </div>

        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
          {t(`${base}.title`)}
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600 dark:text-slate-300">
          {t(`${base}.summary`)}
        </p>

        <div className="mt-6 flex max-w-3xl gap-3 rounded-2xl border border-cyan-300/25 bg-cyan-300/10 p-4 text-sm leading-6 text-cyan-950 dark:text-cyan-100">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700 dark:text-cyan-300" />
          <p>{t(`${base}.disclaimer`)}</p>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="relative h-[260px] rounded-3xl border border-slate-200 bg-white/70 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20">
          <div className="absolute right-8 top-8 h-28 w-44 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="mt-6 flex items-end gap-3">
              <div className="h-10 w-2 rounded-full bg-cyan-300" />
              <div className="h-16 w-2 rounded-full bg-cyan-400" />
              <div className="h-12 w-2 rounded-full bg-blue-400" />
              <div className="h-20 w-2 rounded-full bg-amber-400" />
            </div>
          </div>

          <div className="absolute bottom-8 left-8 h-32 w-52 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-800" />
            <div className="mt-7 h-16 rounded-full border-[14px] border-cyan-300/30 border-r-cyan-500" />
          </div>
        </div>
      </div>
    </section>
  );
}

function SummaryCards({
  t,
  detail,
  base,
}: {
  t: TranslationFn;
  detail: ReportDetail;
  base: string;
}) {
  return (
    <section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        icon={TrendingDown}
        label={t("summaryCards.state")}
        value={t(`${base}.state`)}
        helper
        tone={detail.stateTone}
      />

      <MetricCard
        icon={BarChart3}
        label={t("summaryCards.rpi")}
        value={`${detail.rpi}/100`}
        detail={t(`${base}.rpiLabel`)}
        helper
        tone="attention"
      />

      <MetricCard
        icon={Users}
        label={t("summaryCards.context")}
        value={t(`${base}.context`)}
        tone="cyan"
      />

      <MetricCard
        icon={CalendarDays}
        label={t("summaryCards.simulatedPeriod")}
        value={t(`${base}.period`)}
        tone="blue"
      />
    </section>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
  helper = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  detail?: string;
  tone: "healthy" | "variation" | "attention" | "danger" | "cyan" | "blue";
  helper?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            tone === "healthy" &&
            "bg-emerald-400/10 text-emerald-600 dark:text-emerald-300",
            tone === "variation" &&
            "bg-blue-400/10 text-blue-600 dark:text-blue-300",
            tone === "attention" &&
            "bg-amber-400/10 text-amber-600 dark:text-amber-300",
            tone === "danger" &&
            "bg-red-400/10 text-red-600 dark:text-red-300",
            tone === "cyan" &&
            "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300",
            tone === "blue" &&
            "bg-sky-400/10 text-sky-600 dark:text-sky-300",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
            {label}
            {helper ? <CircleHelp className="h-3.5 w-3.5" /> : null}
          </div>

          <p
            className={cn(
              "mt-2 text-xl font-semibold leading-tight text-slate-950 dark:text-white",
              tone === "attention" && "text-amber-700 dark:text-amber-300",
              tone === "danger" && "text-red-700 dark:text-red-300",
            )}
          >
            {value}
          </p>

          {detail ? (
            <p className="mt-1 text-sm font-medium text-amber-700 dark:text-amber-300">
              {detail}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function NarrativeCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ElementType;
  title: string;
  text: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
      <div className="grid gap-4 md:grid-cols-[170px_1fr] md:items-center">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-600 dark:text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
          <h2 className="font-semibold text-slate-950 dark:text-white">
            {title}
          </h2>
        </div>

        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
          {text}
        </p>
      </div>
    </section>
  );
}

function BehaviorTimeline({
  t,
  detail,
  base,
}: {
  t: TranslationFn;
  detail: ReportDetail;
  base: string;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {t("sections.behaviorTimeline")}
      </h2>

      <div className="mt-4 rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20">
        <div className="mb-6 flex justify-end">
          <span className="rounded-full border border-red-300/30 bg-red-400/10 px-3 py-1.5 text-xs font-semibold text-red-700 dark:text-red-300">
            {t("timeline.criticalWindow")}
          </span>
        </div>

        <div className="relative">
          <div className="absolute left-0 right-0 top-[18px] h-1 rounded-full bg-gradient-to-r from-emerald-400 via-blue-400 via-amber-400 to-red-400" />

          <div className="relative grid grid-cols-4 gap-4">
            {detail.timeline.map((item) => (
              <div key={item.key}>
                <div
                  className={cn(
                    "h-10 w-10 rounded-full border-4 bg-white dark:bg-slate-950",
                    item.tone === "healthy" && "border-emerald-400",
                    item.tone === "variation" && "border-blue-400",
                    item.tone === "attention" && "border-amber-400",
                    item.tone === "danger" && "border-red-400",
                  )}
                />

                <p
                  className={cn(
                    "mt-4 text-sm font-semibold",
                    item.tone === "healthy" &&
                    "text-emerald-600 dark:text-emerald-300",
                    item.tone === "variation" &&
                    "text-blue-600 dark:text-blue-300",
                    item.tone === "attention" &&
                    "text-amber-600 dark:text-amber-300",
                    item.tone === "danger" &&
                    "text-red-600 dark:text-red-300",
                  )}
                >
                  {t(`${base}.timeline.${item.key}.label`)}
                </p>

                <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
                  {t(`${base}.timeline.${item.key}.date`)}
                </p>

                <span className="mt-3 inline-flex rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
                  {t("timeline.rpi")} {item.rpi}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConnectedSignals({
  t,
  detail,
  base,
}: {
  t: TranslationFn;
  detail: ReportDetail;
  base: string;
}) {
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {t("sections.connectedSignals")}
      </h2>

      <div className="mt-4 overflow-x-auto rounded-3xl border border-slate-200 bg-white/75 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20">
        <div className="flex min-w-[900px] items-stretch gap-3">
          <SignalCard
            label={t("signals.main")}
            text={t(`${base}.signals.main`)}
            icon={TrendingDown}
            primary
          />

          {detail.associatedSignalKeys.map((signalKey, index) => {
            const icons = [
              TrendingUp,
              Users,
              CalendarDays,
              TrendingDown,
              TriangleAlert,
            ];
            const Icon = icons[index] ?? Network;

            return (
              <div key={signalKey} className="mx-auto flex items-center gap-1">
                <ArrowRight className="h-5 w-5 shrink-0 text-slate-300 dark:text-slate-700" />
                <SignalCard
                  label={t("signals.associated")}
                  text={t(`${base}.signals.associated.${signalKey}`)}
                  icon={Icon}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SignalCard({
  label,
  text,
  icon: Icon,
  primary = false,
}: {
  label: string;
  text: string;
  icon: React.ElementType;
  primary?: boolean;
}) {
  return (
    <div
      className={cn(
        "w-40 shrink-0 rounded-2xl border p-4",
        primary
          ? "border-cyan-300/40 bg-cyan-300/10"
          : "border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-950/70",
      )}
    >
      <Icon className="h-5 w-5 text-cyan-600 dark:text-cyan-300" />
      <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-400 dark:text-slate-600">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold leading-5 text-slate-950 dark:text-white">
        {text}
      </p>
    </div>
  );
}

function EvidenceSection({
  t,
  detail,
  base,
}: {
  t: TranslationFn;
  detail: ReportDetail;
  base: string;
}) {
  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {t("sections.mainEvidence")}
      </h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
        {detail.evidence.map((item) => (
          <div
            key={item.labelKey}
            className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10"
          >
            <div
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-xl",
                item.tone === "cyan" &&
                "bg-cyan-400/10 text-cyan-600 dark:text-cyan-300",
                item.tone === "danger" &&
                "bg-red-400/10 text-red-600 dark:text-red-300",
                item.tone === "purple" &&
                "bg-violet-400/10 text-violet-600 dark:text-violet-300",
                item.tone === "attention" &&
                "bg-amber-400/10 text-amber-600 dark:text-amber-300",
              )}
            >
              <item.icon className="h-5 w-5" />
            </div>

            <p className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {item.value}
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t(`${base}.evidence.${item.labelKey}`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function RequestCard({ t, base }: { t: TranslationFn; base: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {t("sections.request")}
      </h2>

      <div className="mt-6 grid gap-6">
        <RequestRow
          icon={Network}
          label={t("request.flowName")}
          value={t(`${base}.requested.flowName`)}
        />

        <RequestRow
          icon={Target}
          label={t("request.objective")}
          value={t(`${base}.requested.objective`)}
        />

        <RequestRow
          icon={MessageCircle}
          label={t("request.affectedContext")}
          value={t(`${base}.requested.affectedContext`)}
        />
      </div>
    </section>
  );
}

function RequestRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-600 dark:text-cyan-300">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400 dark:text-slate-600">
          {label}
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
    </div>
  );
}

function InterpretationCard({
  t,
  text,
}: {
  t: TranslationFn;
  text: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/75 p-6 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/20">
      <div className="flex gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-600 dark:text-cyan-300">
          <BrainCircuit className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("sections.interpretation")}
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}

function FieldsAndSignals({
  t,
  detail,
  base,
}: {
  t: TranslationFn;
  detail: ReportDetail;
  base: string;
}) {
  const interpretedSignals = detail.interpretedSignalKeys.map((key) =>
    t(`${base}.interpretedSignals.${key}`),
  );

  return (
    <section>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
        {t("sections.fieldsAndSignals")}
      </h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <PillList
          title={t("fieldsAndSignals.fields")}
          icon={Database}
          items={detail.fields}
        />

        <PillList
          title={t("fieldsAndSignals.signals")}
          icon={FileText}
          items={interpretedSignals}
        />
      </div>
    </section>
  );
}

function PillList({
  title,
  icon: Icon,
  items,
}: {
  title: string;
  icon: React.ElementType;
  items: readonly string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="font-semibold text-slate-950 dark:text-white">
          {title}
        </h3>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-600 dark:text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function ReportCta({
  t,
  slug,
  reportId,
  rpi,
  stateTone,
}: {
  t: TranslationFn;
  slug: string;
  reportId: string;
  rpi: number;
  stateTone: string;
}) {
  return (
    <section className="mt-8 rounded-3xl border border-cyan-300/25 bg-cyan-300/10 p-6 shadow-xl shadow-cyan-500/10 backdrop-blur lg:flex lg:items-center lg:justify-between lg:gap-8">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950">
          <Sparkles className="h-6 w-6" />
        </div>

        <div>
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("cta.title")}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            {t("cta.description")}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0">
        <Link
          href="/request"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:-translate-y-0.5 hover:bg-cyan-300"
        >
          {t("cta.button")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}