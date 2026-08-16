"use client";

import Link from "next/link";
import { AttributedLink } from "@/components/attributed-link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navigation = [
  {
    href: "/",
    label: "Início",
    shortLabel: "Início",
  },
  {
    href: "/demo",
    label: "Ver demo",
    shortLabel: "Demo",
  },
];

function routeIsActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const currentRoute =
    navigation.find((item) => routeIsActive(pathname, item.href)) ??
    navigation[0];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/90 bg-[#fffdf9]/95 shadow-[0_8px_30px_rgba(29,20,12,.04)] backdrop-blur">
        <div className="mx-auto flex h-[72px] w-[min(calc(100%_-_2rem),1160px)] items-center justify-between gap-4 sm:w-[min(calc(100%_-_2.5rem),1160px)]">
          <div className="flex min-w-0 items-center gap-4">
            <Link
              href="/"
              aria-label="Ohrly — início"
              className="relative shrink-0 text-2xl font-black tracking-[-0.06em] text-stone-950"
            >
              <span className="absolute -top-1 left-0 h-2 w-4 rounded-t-full border-t-4 border-[#ff6f1f]" />
              ohrly
            </Link>

            <span
              className="hidden h-5 w-px bg-stone-200 sm:block"
              aria-hidden="true"
            />

            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-400">
                Rota
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-[11px] font-black text-orange-700">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6f1f]" />
                {currentRoute.shortLabel}
              </span>
            </div>

            <span className="truncate rounded-full bg-stone-100 px-2.5 py-1 text-[10px] font-black text-stone-600 sm:hidden">
              {currentRoute.shortLabel}
            </span>
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <nav
              aria-label="Navegação principal"
              className="flex items-center rounded-full border border-stone-200 bg-white p-1"
            >
              {navigation.map((item) => {
                const active = routeIsActive(pathname, item.href);

                return (
                  <AttributedLink
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    data-analytics-cta={`header_route_${item.shortLabel.toLowerCase()}`}
                    data-analytics-location="site_header"
                    data-analytics-label={item.label}
                    className={[
                      "relative inline-flex min-h-9 items-center justify-center rounded-full px-4 text-xs font-black transition",
                      active
                        ? "bg-stone-950 text-white"
                        : "text-stone-600 hover:bg-stone-50 hover:text-stone-950",
                    ].join(" ")}
                  >
                    {item.label}
                    {active ? (
                      <span
                        className="absolute -bottom-[7px] left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-[#ff6f1f]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </AttributedLink>
                );
              })}
            </nav>

            <AttributedLink
              href="/#diagnostico"
              data-analytics-cta="header_analyze_intercom"
              data-analytics-location="site_header"
              data-analytics-label="Analisar meu Intercom"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#ff6f1f] bg-[#fffdf9] px-4 text-xs font-black text-stone-950 shadow-[0_4px_0_#ff6f1f] transition hover:translate-y-0.5 hover:shadow-[0_2px_0_#ff6f1f]"
            >
              Analisar meu Intercom
            </AttributedLink>
          </div>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="ohrly-mobile-menu"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-stone-200 bg-white text-stone-950 transition hover:border-stone-300 md:hidden"
          >
            {menuOpen ? (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="ohrly-mobile-menu"
          className={[
            "overflow-hidden border-t border-stone-200 bg-[#fffdf9] transition-[max-height,opacity] duration-200 md:hidden",
            menuOpen
              ? "max-h-80 opacity-100"
              : "pointer-events-none max-h-0 opacity-0",
          ].join(" ")}
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1160px)] py-3">
            <div className="mb-3 flex items-center justify-between rounded-xl bg-stone-100 px-3 py-2.5">
              <span className="text-[10px] font-black uppercase tracking-[0.14em] text-stone-500">
                Você está em
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-stone-950">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6f1f]" />
                {currentRoute.shortLabel}
              </span>
            </div>

            <nav aria-label="Navegação mobile" className="grid gap-1">
              {navigation.map((item) => {
                const active = routeIsActive(pathname, item.href);

                return (
                  <AttributedLink
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "flex min-h-12 items-center justify-between rounded-xl px-3 text-sm font-black transition",
                      active
                        ? "bg-stone-950 text-white"
                        : "text-stone-700 hover:bg-stone-100",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>
                    {active ? (
                      <span className="rounded-full bg-[#ff6f1f] px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">
                        atual
                      </span>
                    ) : (
                      <span aria-hidden="true">→</span>
                    )}
                  </AttributedLink>
                );
              })}
            </nav>

            <AttributedLink
              href="/#diagnostico"
              data-analytics-cta="mobile_header_analyze_intercom"
              data-analytics-location="site_header"
              data-analytics-label="Analisar meu Intercom"
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#ff6f1f] bg-white px-4 text-sm font-black text-stone-950 shadow-[0_4px_0_#ff6f1f]"
            >
              Analisar meu Intercom
            </AttributedLink>
          </div>
        </div>
      </header>

      <div className="h-[72px]" aria-hidden="true" />
    </>
  );
}
