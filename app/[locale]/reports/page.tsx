"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { publicReports } from "@/data/reports";
import { trackMetaEvent } from "@/lib/meta-pixel";

export default function ReportsPage() {
  const t = useTranslations("reports");

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-700/15 bg-cyan-50 px-3 py-1 text-xs text-slate-600 dark:border-cyan-300/15 dark:bg-cyan-300/5 dark:text-slate-300">
            <Sparkles className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-300" />
            {t("badge")}
          </div>

          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 dark:text-white">
            {t("title")}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {t("description")}
          </p>
        </div>

        {/* <div className="mt-10 rounded-2xl border border-slate-200 bg-white/75 p-4 shadow-lg shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950/60">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder={t("searchPlaceholder")}
              className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-cyan-400 dark:border-slate-800 dark:bg-slate-950"
            />
          </div>
        </div>

        <p className="mt-8 text-sm font-medium text-slate-500 dark:text-slate-500">
          {t("publishedCount")}
        </p> */}

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {publicReports.map((report, index) => {
            const base = `items.${report.id}`;

            return (
              <article
                key={report.slug}
                className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:border-cyan-300 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10"
              >
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-cyan-700 dark:text-cyan-300">
                  {t(`${base}.domain`)}
                </p>

                <h2 className="mt-3 text-xl font-semibold text-slate-950 dark:text-white">
                  {t(`${base}.title`)}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {t(`${base}.summary`)}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
                    {t(`${base}.state`)}
                  </span>

                  <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                    {t("rpiPrefix")} {report.rpi}/100
                  </span>
                </div>

                <p className="mt-5 text-xs text-slate-500 dark:text-slate-500">
                  {t("publishedAt", { date: report.publishedAt })}
                </p>

                <Link
                  href={`/reports/${report.slug}`}
                  onClick={() =>
                    trackMetaEvent("ReportsCardClick", {
                      source: "reports_page",
                      reportId: report.id,
                      slug: report.slug,
                      rpi: report.rpi,
                      position: index + 1,
                    })
                  }
                  className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  {t("viewReport")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}