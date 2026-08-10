"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Início", href: "/" },
  { label: "Preço", href: "/price" },
  { label: "Diagnóstico", href: "/diagnostic" },
];

function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-[#dfe8e4] bg-[#f7f6f2]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <div className="shrink-0">
          <Link
            href="/"
            aria-label="Ohrly — Início"
            className="inline-flex items-center"
          >
            <span className="font-serif text-[27px] tracking-[-0.04em] text-[#0b3537]">
              Ohrly
            </span>

            <span
              aria-hidden="true"
              className="ml-1.5 mt-[-13px] h-1.5 w-1.5 rounded-full bg-[#e7775f]"
            />
          </Link>
        </div>

        {/* Navegação — visível em todos os tamanhos */}
        <nav
          aria-label="Navegação principal"
          className="ml-auto flex items-center gap-1 sm:absolute sm:left-1/2 sm:ml-0 sm:-translate-x-1/2"
        >
          {NAV_ITEMS.map((item) => {
            const active = isActiveRoute(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative rounded-xl px-2.5 py-2 text-[12px] font-semibold transition-colors",
                  "sm:px-4 sm:py-2.5 sm:text-sm",
                  active
                    ? "bg-white text-[#0d2f31] shadow-[0_2px_12px_rgba(13,47,49,0.06)]"
                    : "text-[#657e7d] hover:bg-white/60 hover:text-[#0d2f31]",
                ].join(" ")}
              >
                {item.label}

                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-[3px] left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-[#e7775f] sm:bottom-[4px] sm:w-6"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}