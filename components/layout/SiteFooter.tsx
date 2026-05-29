"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  Building2,
  FlaskConical,
  LucideProps,
  Mail,
  MapPin,
  PersonStandingIcon,
  Sparkles,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const productLinks = [
  { key: "home", href: "/" },
  { key: "simulations", href: "/simulations" },
  { key: "reports", href: "/reports" },
] as const;

const contactLinks = [
  {
    key: "email",
    href: "mailto:taraujo@ohrly.com.br",
    icon: Mail,
  },
  {
    key: "linkedin",
    href: "https://www.linkedin.com/company/ohrly",
    icon: PersonStandingIcon,
  },
] as const;

export function SiteFooter() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/40 dark:border-slate-800 dark:bg-slate-950/60 dark:shadow-cyan-950/10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Ohrly
              </span>
            </Link>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
              {t("description")}
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <FooterInfoCard
                icon={FlaskConical}
                title={t("status.title")}
                description={t("status.description")}
              />
              <FooterInfoCard
                icon={MapPin}
                title={t("location.title")}
                description={t("location.description")}
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-cyan-300/30 bg-cyan-50/80 p-6 shadow-xl shadow-cyan-500/10 dark:border-cyan-300/20 dark:bg-cyan-300/10">
            <div className="pointer-events-none absolute right-[-64px] top-[-80px] h-56 w-56 rounded-full border border-cyan-300/40" />
            <div className="pointer-events-none absolute right-[-24px] top-[-42px] h-40 w-40 rounded-full border border-cyan-300/30" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-700 shadow-sm dark:border-cyan-300/25 dark:bg-slate-950/40 dark:text-cyan-300">
                <Sparkles className="h-4 w-4" />
                {t("portoDigital.badge")}
              </div>

              <div className="mt-5 flex gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-200 text-cyan-800 dark:bg-cyan-300 dark:text-slate-950">
                  <Building2 className="h-7 w-7" />
                </div>

                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                    {t("portoDigital.title")}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {t("portoDigital.description")}
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-cyan-300/30 bg-white/70 p-4 dark:border-cyan-300/20 dark:bg-slate-950/40">
                <p className="text-sm font-semibold text-slate-950 dark:text-white">
                  {t("portoDigital.program")}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-400">
                  {t("portoDigital.note")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 border-t border-slate-200 pt-8 dark:border-slate-800 md:grid-cols-[1fr_auto_auto] md:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
              {t("sections.product")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {productLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-cyan-300"
                >
                  {t(`links.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-500">
              {t("sections.contact")}
            </p>
            <div className="mt-3 grid gap-2">
              {contactLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-cyan-700 dark:text-slate-300 dark:hover:text-cyan-300"
                  >
                    <Icon className="h-4 w-4" />
                    {t(`contact.${item.key}`)}
                    {item.href.startsWith("http") ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              © {currentYear} Ohrly
            </p>
            <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-500">
              {t("copyright")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterInfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">
            {title}
          </p>
          <p className="mt-0.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
