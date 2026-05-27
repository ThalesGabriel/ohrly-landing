"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import ThemeToggle from "../theme/ThemeToggle";
import LocaleSwitcher from "../i18n/LocaleSwitcher";

const navItems = [
  { labelKey: "home", href: "/" },
  { labelKey: "simulations", href: "/simulations" },
  { labelKey: "request", href: "/request" },
  { labelKey: "reports", href: "/reports" },
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

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/85">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
            Ohrly
          </span>
        </Link>

        <nav className="hidden items-center gap-2 text-sm md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

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