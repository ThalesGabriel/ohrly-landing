// src/components/Footer.tsx
import Link from "next/link";

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative mt-10 border-t border-cyan-700/10 py-10 dark:border-cyan-300/10">
            <div className="mx-auto grid gap-8 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
                <div>
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight text-slate-950 transition hover:text-cyan-700 dark:text-white dark:hover:text-cyan-300"
                    >
                        Ohrly
                    </Link>

                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
                        Uma camada de leitura comportamental para entender quando fluxos digitais
                        continuam funcionando, mas já começaram a perder consistência.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Produto
                    </h3>

                    <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/">
                            Início
                        </Link>

                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/demo">
                            Demonstração
                        </Link>

                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/contact">
                            Fale conosco
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        Contato
                    </h3>

                    <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/contact">
                            Analisar um fluxo
                        </Link>

                        <a
                            className="transition hover:text-cyan-700 dark:hover:text-cyan-300"
                            href="mailto:contato@ohrly.com.br"
                        >
                            contato@ohrly.com.br
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 flex flex-col gap-3 px-5 pt-6 text-xs text-cyan-700 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10 dark:text-cyan-300">
                <p>© {year} Ohrly. Todos os direitos reservados.</p>
                <p>O Ohrly não elimina incidentes. Ele elimina o silêncio antes deles.</p>
            </div>
        </footer>
    );
}