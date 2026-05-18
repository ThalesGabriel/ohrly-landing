"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Como funciona", href: "/how-it-works" },
  { label: "Casos", href: "/cases" },
  { label: "Diagnóstico", href: "/diagnostic" },
];

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 12);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "fixed left-0 top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "border-b border-white/10 bg-[#040917]/85 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          : "border-b border-transparent bg-[#040917]/60 backdrop-blur-md",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ohrly">
          <span className="text-2xl font-bold text-white">ohrly</span>
        </Link>

        <nav className="hidden items-center gap-3 text-sm font-medium md:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-full px-4 py-2 transition-all duration-200",
                  active
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)]"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/diagnostic"
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm shadow-violet-500 transition hover:-translate-y-0.5 hover:bg-violet-700"
        >
          Analisar um fluxo →
        </Link>
      </div>
    </header>
  );
}