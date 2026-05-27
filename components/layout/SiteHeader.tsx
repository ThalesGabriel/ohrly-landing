"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "../theme/ThemeToggle";
import LocaleSwitcher from "../i18n/LocaleSwitcher";
import { Bot, ChevronDown, ShoppingCart } from "lucide-react";

const navItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "solutions", href: "/solutions" },
  { labelKey: "simulations", href: "/simulations" },
  { labelKey: "request", href: "/request" },
  { labelKey: "reports", href: "/reports" },
] as const;

const solutionItems = [
  {
    key: "ecommerce",
    href: "/solutions/for-ecommerce",
    icon: ShoppingCart,
    iconClassName:
      "bg-cyan-50 text-cyan-700 dark:bg-cyan-300/10 dark:text-cyan-300",
  },
  {
    key: "bots",
    href: "/solutions/for-bots",
    icon: Bot,
    iconClassName:
      "bg-violet-50 text-violet-700 dark:bg-violet-300/10 dark:text-violet-300",
  },
] as const;

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [solutionsOpen, setSolutionsOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Ohrly
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex dark:text-slate-300">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            if (item.labelKey === "solutions") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setSolutionsOpen(true)}
                  onMouseLeave={() => setSolutionsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setSolutionsOpen((current) => !current)}
                    aria-expanded={solutionsOpen}
                    aria-haspopup="menu"
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 font-medium transition",
                      active
                        ? "bg-cyan-100 text-cyan-800 shadow-sm dark:bg-cyan-300/10 dark:text-cyan-300"
                        : "text-slate-600 hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-cyan-300",
                    )}
                  >
                    {t(item.labelKey)}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition",
                        solutionsOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {solutionsOpen ? <SolutionsDropdown /> : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-full px-4 py-2 font-medium transition",
                  active
                    ? "bg-cyan-100 text-cyan-800 shadow-sm dark:bg-cyan-300/10 dark:text-cyan-300"
                    : "text-slate-600 hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-cyan-300",
                )}
              >
                {t(item.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function SolutionsDropdown() {
  const t = useTranslations("nav.solutionItems");

  return (
    <div className="absolute left-1/2 top-full z-50 w-[330px] -translate-x-1/2 pt-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-950 dark:shadow-cyan-950/20">
        <div className="grid gap-2">
          {solutionItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex gap-4 rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-900"
              >
                <div
                  className={cn(
                    "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
                    item.iconClassName,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="font-semibold text-slate-950 dark:text-white">
                    {t(`${item.key}.title`)}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400">
                    {t(`${item.key}.description`)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
