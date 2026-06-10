import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";

const formspreeEndpoint =
  "https://formspree.io/f/mkoygpnk";

type Tone = "indigo" | "orange" | "green";

type IconName =
  | "pulse"
  | "bot"
  | "handoff"
  | "fallback"
  | "resolution"
  | "repeat"
  | "queue"
  | "decision"
  | "upload"
  | "target"
  | "chart"
  | "headset"
  | "screen"
  | "whatsapp"
  | "shield";

type CardItem = {
  icon: IconName;
  title: string;
  text: string;
};

type MetricItem = {
  label: string;
  value: string;
  trend?: string;
  tone?: Tone;
};

type ReturnStep = [string, string];
type ComparisonRow = [string, string];

const iconPaths: Record<IconName, ReactNode> = {
  pulse: <path d="M4 12h4l2-6 4 12 2-6h4" />,
  bot: (
    <>
      <path d="M12 8V5" />
      <path d="M8 5h8" />
      <rect x="5" y="8" width="14" height="10" rx="4" />
      <path d="M9 13h.01" />
      <path d="M15 13h.01" />
      <path d="M9 17h6" />
    </>
  ),
  handoff: (
    <>
      <path d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M2 21a6 6 0 0 1 12 0" />
      <path d="M16 6h6" />
      <path d="m19 3 3 3-3 3" />
      <path d="M20 14a3 3 0 1 0 0 6" />
    </>
  ),
  fallback: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </>
  ),
  resolution: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 4-4 3 3 5-7" />
    </>
  ),
  repeat: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M3 11V9a3 3 0 0 1 3-3h15" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M21 13v2a3 3 0 0 1-3 3H3" />
    </>
  ),
  queue: (
    <>
      <path d="M8 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path d="M2 21a6 6 0 0 1 12 0" />
      <path d="M17 11a3 3 0 1 0 0-6" />
      <path d="M17 20a5 5 0 0 0-2-4" />
      <path d="M21 20a5 5 0 0 0-2-4" />
    </>
  ),
  decision: (
    <>
      <path d="M12 3v18" />
      <path d="M5 6h10l-2 4 2 4H5" />
    </>
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7 9 5-5 5 5" />
      <path d="M5 20h14" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <rect x="7" y="12" width="2" height="4" />
      <rect x="12" y="9" width="2" height="7" />
      <rect x="17" y="6" width="2" height="10" />
    </>
  ),
  headset: (
    <>
      <path d="M4 12a8 8 0 0 1 16 0" />
      <path d="M4 12v4a2 2 0 0 0 2 2h2v-8H6a2 2 0 0 0-2 2Z" />
      <path d="M20 12v4a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 2Z" />
      <path d="M14 20h2a4 4 0 0 0 4-4" />
    </>
  ),
  screen: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8" />
      <path d="M12 16v4" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M4 20 5.4 16.2A8 8 0 1 1 8 18.6L4 20Z" />
      <path d="M9 9c.5 2.4 2.2 4.1 4.7 4.7l1.3-1.3" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
};

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const styles =
    variant === "primary"
      ? "bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/25 hover:bg-[#4338CA]"
      : "border border-indigo-200 bg-white text-[#2E2A7A] hover:border-indigo-300 hover:bg-indigo-50";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold transition ${styles}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function MetricCard({ label, value, trend, tone = "indigo" }: MetricItem) {
  const toneClasses = {
    indigo: "border-indigo-100 bg-indigo-50/70 text-indigo-700",
    orange: "border-orange-100 bg-orange-50/80 text-orange-700",
    green: "border-emerald-100 bg-emerald-50/80 text-emerald-700",
  } satisfies Record<Tone, string>;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <strong className="text-2xl font-black tracking-tight text-slate-950">{value}</strong>
        {trend ? <span className={`rounded-full border px-2 py-1 text-xs font-bold ${toneClasses[tone]}`}>{trend}</span> : null}
      </div>
      <div className="mt-4 h-10 overflow-hidden rounded-xl bg-slate-50">
        <svg viewBox="0 0 140 40" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 28 C16 24, 22 18, 36 21 S58 31, 70 24 S92 10, 104 14 S124 32, 140 18"
            fill="none"
            stroke={tone === "orange" ? "#F97316" : tone === "green" ? "#10B981" : "#4F46E5"}
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
}

function DiagnosisCard({ data }: {
  data: {
    label: string;
    flow: string;
    status: string;
    metrics: MetricItem[];
    openWindowLabel: string;
    openWindowValue: string;
    proofMetricLabel: string;
    proofMetricValue: string;
    readingLabel: string;
    reading: string;
  }
}) {
  return (
    <div className="relative rounded-[2rem] border border-indigo-100 bg-white/90 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur md:p-7">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Icon name="pulse" />
            </span>
            <div>
              <p className="text-sm font-semibold text-indigo-600">{data.label}</p>
              <h2 className="text-xl font-black text-slate-950">{data.flow}</h2>
            </div>
          </div>
          <span className="hidden rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700 sm:inline-flex">
            {data.status}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {data.metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4">
            <div className="flex items-center gap-2 text-orange-700">
              <Icon name="fallback" className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-wide">{data.openWindowLabel}</p>
            </div>
            <p className="mt-2 text-sm font-black text-slate-950">{data.openWindowValue}</p>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
            <div className="flex items-center gap-2 text-emerald-700">
              <Icon name="shield" className="h-5 w-5" />
              <p className="text-xs font-bold uppercase tracking-wide">{data.proofMetricLabel}</p>
            </div>
            <p className="mt-2 text-sm font-black text-slate-950">{data.proofMetricValue}</p>
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <strong className="text-slate-950">{data.readingLabel}</strong> {data.reading}
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("AutomatedSupport.metadata");

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: "/atendimento-automatizado",
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      url: "/atendimento-automatizado",
      type: "website",
      images: [
        {
          url: "/images/og-atendimento-automatizado.png",
          width: 1200,
          height: 630,
          alt: t("ogAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/images/og-atendimento-automatizado.png"],
    },
  };
}

export default async function AutomatedSupportLandingPage() {
  const t = await getTranslations("AutomatedSupport");

  const chips = t.raw("hero.chips") as string[];
  const diagnosis = {
    label: t("diagnosis.label"),
    flow: t("diagnosis.flow"),
    status: t("diagnosis.status"),
    metrics: t.raw("diagnosis.metrics") as MetricItem[],
    openWindowLabel: t("diagnosis.openWindowLabel"),
    openWindowValue: t("diagnosis.openWindowValue"),
    proofMetricLabel: t("diagnosis.proofMetricLabel"),
    proofMetricValue: t("diagnosis.proofMetricValue"),
    readingLabel: t("diagnosis.readingLabel"),
    reading: t("diagnosis.reading"),
  };
  const problemCards = t.raw("problem.cards") as CardItem[];
  const comparisonRows = t.raw("comparison.rows") as ComparisonRow[];
  const howItWorks = t.raw("howItWorks.steps") as CardItem[];
  const exampleMetrics = t.raw("example.metrics") as MetricItem[];
  const audiences = t.raw("audiences.items") as CardItem[];
  const returnSteps = t.raw("return.steps") as ReturnStep[];
  const profileOptions = t.raw("contact.profileOptions") as string[];

  return (
    <main className="min-h-screen overflow-hidden bg-[#FBFCFF] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label={t("nav.logoLabel")}>
            <span className="text-2xl font-black tracking-tight">ohrly</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <a href="#como-funciona" className="hover:text-indigo-600">{t("nav.howItWorks")}</a>
            <a href="#exemplo" className="hover:text-indigo-600">{t("nav.example")}</a>
            <a href="#para-quem" className="hover:text-indigo-600">{t("nav.audience")}</a>
            <a href="#contato" className="hover:text-indigo-600">{t("nav.contact")}</a>
          </div>
          <div className="gap-[10px] flex">
            <LocaleSwitcher />
            <a href="#contato" className="rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700">
              {t("nav.cta")}
            </a>
          </div>
        </nav>
      </header>

      <Section id="top" className="relative grid items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />
        <div className="relative">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-indigo-700">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
            {t("hero.titleBefore")} <span className="text-indigo-600">{t("hero.titleHighlight")}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t("hero.description")}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contato">{t("hero.primaryCta")}</Button>
            <Button href="#exemplo" variant="secondary">{t("hero.secondaryCta")}</Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><Icon name="whatsapp" className="h-4 w-4 text-indigo-600" /> {chips[0]}</span>
            <span className="inline-flex items-center gap-2"><Icon name="bot" className="h-4 w-4 text-indigo-600" /> {chips[1]}</span>
            <span className="inline-flex items-center gap-2"><Icon name="headset" className="h-4 w-4 text-indigo-600" /> {chips[2]}</span>
            <span className="inline-flex items-center gap-2"><Icon name="shield" className="h-4 w-4 text-indigo-600" /> {chips[3]}</span>
          </div>
        </div>
        <DiagnosisCard data={diagnosis} />
      </Section>

      <Section className="py-10 text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">{t("problem.title")}</h2>
        <p className="mx-auto mt-4 max-w-3xl text-slate-600">{t("problem.description")}</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {problemCards.map((card) => (
            <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/5">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Icon name={card.icon} />
              </span>
              <h3 className="mt-5 text-lg font-black">{card.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="grid gap-8 py-16 lg:grid-cols-[1fr_0.55fr]">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.03em]">{t("comparison.title")}</h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid border-b border-slate-100 bg-slate-50 p-4 text-sm font-black text-slate-600 sm:grid-cols-2">
              <span>{t("comparison.leftHeader")}</span>
              <span className="hidden text-indigo-700 sm:block">{t("comparison.rightHeader")}</span>
            </div>
            {comparisonRows.map(([left, right]) => (
              <div key={left} className="grid gap-2 border-b border-slate-100 p-4 text-sm last:border-b-0 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <span className="text-slate-600">{left}</span>
                <span className="hidden text-indigo-300 sm:block">→</span>
                <span className="font-semibold text-slate-950">{right}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-indigo-600 shadow-sm">
            <Icon name="target" className="h-8 w-8" />
          </span>
          <h3 className="mt-8 text-3xl font-black tracking-[-0.03em]">{t("comparison.calloutTitle")}</h3>
          <p className="mt-4 text-xl font-black leading-8 text-indigo-700">{t("comparison.calloutText")}</p>
        </div>
      </Section>

      <Section id="como-funciona" className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">{t("howItWorks.title")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">{t("howItWorks.description")}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {howItWorks.map((step, index) => (
            <div key={step.title} className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="absolute -top-3 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
                {index + 1}
              </span>
              <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Icon name={step.icon} />
              </span>
              <h3 className="mt-5 font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="exemplo" className="grid gap-8 py-14 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-950/5 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black text-indigo-600">{t("example.label")}</p>
              <h2 className="text-2xl font-black tracking-[-0.03em]">{t("example.title")}</h2>
            </div>
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">{t("example.status")}</span>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.55fr]">
            <div className="space-y-5 text-sm leading-7 text-slate-700">
              <p>{t("example.paragraph1")}</p>
              <p><strong className="text-slate-950">{t("example.interpretationLabel")}</strong> {t("example.interpretation")}</p>
              <p><strong className="text-slate-950">{t("example.windowLabel")}</strong> {t("example.window")}</p>
              <p><strong className="text-slate-950">{t("example.proofLabel")}</strong> {t("example.proof")}</p>
            </div>
            <div className="space-y-3">
              {exampleMetrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
            </div>
          </div>
        </div>

        <div id="para-quem" className="rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
          <p className="text-sm font-black text-indigo-300">{t("audiences.label")}</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">{t("audiences.title")}</h2>
          <div className="mt-7 space-y-3">
            {audiences.map((audience) => (
              <div key={audience.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600">
                    <Icon name={audience.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-black">{audience.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{audience.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-black tracking-[-0.03em]">{t("return.title")}</h2>
              <p className="mt-4 text-slate-600">{t("return.description")}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {returnSteps.map(([title, text], index) => (
                <div key={title} className="rounded-3xl bg-slate-50 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">{index + 1}</span>
                  <h3 className="mt-4 font-black">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-14">
        <div className="grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 to-violet-700 text-white shadow-2xl shadow-indigo-950/20 lg:grid-cols-[0.8fr_1fr]">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-black tracking-[-0.03em]">{t("notReplacement.title")}</h2>
            <p className="mt-4 leading-7 text-indigo-100">{t("notReplacement.description")}</p>
          </div>
          <div className="border-t border-white/15 bg-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
            <h3 className="text-2xl font-black">{t("notReplacement.calloutTitle")}</h3>
            <p className="mt-4 leading-7 text-indigo-50">{t("notReplacement.calloutText")}</p>
          </div>
        </div>
      </Section>

      <Section id="contato" className="py-16">
        <div className="grid gap-8 rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-2xl shadow-indigo-950/5 md:p-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
              <Icon name="target" className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.04em]">{t("contact.title")}</h2>
            <p className="mt-4 leading-8 text-slate-600">{t("contact.description")}</p>
            <p className="mt-6 rounded-2xl bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">{t("contact.note")}</p>
          </div>

          <form action={formspreeEndpoint} method="POST" className="rounded-[1.5rem] bg-slate-50 p-5 md:p-6">
            <input type="hidden" name="_subject" value={t("contact.subject")} />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-slate-700">
                {t("contact.name")}
                <input required name="name" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4" placeholder={t("contact.namePlaceholder")} />
              </label>
              <label className="text-sm font-bold text-slate-700">
                {t("contact.email")}
                <input required type="email" name="email" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4" placeholder={t("contact.emailPlaceholder")} />
              </label>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-slate-700">
                {t("contact.company")}
                <input name="company" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4" placeholder={t("contact.companyPlaceholder")} />
              </label>
              <label className="text-sm font-bold text-slate-700">
                {t("contact.profile")}
                <select name="profile" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4">
                  {profileOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-slate-700">
              {t("contact.message")}
              <textarea required name="message" rows={5} className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4" placeholder={t("contact.messagePlaceholder")} />
            </label>
            <button type="submit" className="mt-5 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700">
              {t("contact.submit")} →
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">{t("contact.privacy")}</p>
          </form>
        </div>
      </Section>
    </main>
  );
}
