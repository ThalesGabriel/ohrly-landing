// src/components/Header.tsx
"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/theme/ThemeToggle";

type NavItem = {
    label: string;
    href: string;
};

const navItems: NavItem[] = [
    {
        label: "Início",
        href: "/",
    },
    {
        label: "Demonstração",
        href: "/demo",
    },
    {
        label: "Fale conosco",
        href: "/contact",
    },
];

function cn(...classes: Array<string | false | null | undefined>) {
    return classes.filter(Boolean).join(" ");
}

function isActivePath(pathname: string, href: string) {
    if (href === "/") {
        return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    function closeMenu() {
        setIsOpen(false);
    }

    return (
        <header className="relative z-50">
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-3xl font-bold tracking-tight text-slate-950 transition hover:text-cyan-700 dark:text-white dark:hover:text-cyan-300"
                >
                    Ohrly
                </Link>

                <nav className="hidden items-center gap-2 text-sm md:flex">
                    {navItems.map((item) => {
                        const active = isActivePath(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "rounded-full px-4 py-2 transition",
                                    active
                                        ? "bg-cyan-300 text-slate-950 shadow-sm shadow-cyan-500/20"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-slate-900/80 dark:hover:text-cyan-300",
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="ml-3">
                        <ThemeToggle />
                    </div>
                </nav>

                <div className="flex items-center gap-3 md:hidden">
                    <ThemeToggle />

                    <button
                        type="button"
                        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isOpen}
                        onClick={() => setIsOpen((current) => !current)}
                        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur transition hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-200 dark:hover:bg-slate-900"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            <div
                className={cn(
                    "absolute left-0 right-0 top-full mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-xl shadow-slate-200/70 backdrop-blur-xl transition-all duration-200 md:hidden dark:border-slate-800 dark:bg-slate-950/95 dark:shadow-cyan-950/20",
                    isOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-2 opacity-0",
                )}
            >
                <nav className="grid gap-1 p-2">
                    {navItems.map((item) => {
                        const active = isActivePath(pathname, item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className={cn(
                                    "rounded-xl px-4 py-3 text-sm font-medium transition",
                                    active
                                        ? "bg-cyan-300 text-slate-950"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-cyan-700 dark:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-cyan-300",
                                )}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
}