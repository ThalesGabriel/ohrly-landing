"use client";

import Link from "next/link";
import { Menu, X, Activity, ArrowRight } from "lucide-react";
import { useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Estudos", href: "/studies" },
  { label: "Diagnóstico", href: "/diagnostic" },
];

export function AppHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-[#f7fafc]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#004653] text-white shadow-sm">
            <Activity className="h-5 w-5" />
          </span>

          <div className="leading-none">
            <span className="block text-2xl font-black tracking-[-0.05em] text-[#06183d]">
              Ohrly
            </span>
            <span className="hidden text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Saúde Operacional
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-700 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-teal-800"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-[#06183d] shadow-sm transition hover:border-teal-700"
          >
            Contato
          </Link>

          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#004653] px-5 text-sm font-black text-white shadow-lg shadow-teal-900/10 transition hover:bg-[#003844]"
          >
            Login
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#06183d] shadow-sm lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 shadow-xl shadow-slate-900/5 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-black text-slate-700 transition hover:bg-slate-50 hover:text-teal-800"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Link
                href="/avaliador"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-black text-[#06183d] shadow-sm transition hover:border-teal-700"
              >
                Avaliar fluxo
              </Link>

              <Link
                href="/contato"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#004653] px-5 text-sm font-black text-white shadow-lg shadow-teal-900/10 transition hover:bg-[#003844]"
              >
                Fazer check-up
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}