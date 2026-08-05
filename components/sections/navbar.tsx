'use client';

import { Activity, Menu } from 'lucide-react';

export function Navbar() {
    return (
        <header className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-[#0A0F14]/70 backdrop-blur-xl">
            <div className="mx-auto flex h-16 w-full max-w-[1920px] items-center justify-between px-4 xl:px-8">
                
                <a href="#" className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-4xl bg-gradient-to-br from-black-400 to-violet-500 shadow-lg shadow-emerald-500/10">
                        <Activity className="h-5 w-5 text-white" />
                    </div>

                    <span className="text-lg font-semibold tracking-tight text-white">
                        ohrly
                    </span>
                </a>

                <nav className="hidden items-center gap-8 text-sm text-gray-400 lg:flex">
                    <a href="#problem" className="transition hover:text-white">
                        Home
                    </a>

                    <a href="#use-cases" className="transition hover:text-white">
                        Casos de uso
                    </a>

                    <a href="#pricing" className="transition hover:text-white">
                        Preço
                    </a>
                </nav>

                <div className="hidden items-center gap-3 lg:flex">
                    <a
                        href="#demo"
                        className="rounded-xl bg-gradient-to-r from-violet-500 to-black-400 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
                    >
                        Solicitar demo
                    </a>
                </div>

                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white lg:hidden">
                    <Menu className="h-5 w-5" />
                </button>
            </div>
        </header>
    );
}