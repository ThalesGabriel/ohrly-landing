export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="relative border-t border-cyan-300/10 py-10 mt-10">
            <div className="mx-auto grid gap-8 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-10">
                <div>
                    <a href="#" className="text-2xl font-bold tracking-tight text-white">
                        Ohrly
                    </a>

                    <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
                        Uma camada de leitura comportamental para entender quando fluxos digitais
                        continuam funcionando, mas já começaram a perder consistência.
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-100">Produto</h3>

                    <div className="mt-4 grid gap-3 text-sm text-slate-400">
                        <a className="transition hover:text-cyan-300" href="/">
                            Início
                        </a>
                        <a className="transition hover:text-cyan-300" href="/contact">
                            Fale conosco
                        </a>
                        <a className="transition hover:text-cyan-300" href="/demonstration">
                            Demonstração
                        </a>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-100">Contato</h3>

                    <div className="mt-4 grid gap-3 text-sm text-slate-400">
                        <a className="transition hover:text-cyan-300" href="#contato">
                            Analisar um fluxo
                        </a>
                        <a className="transition hover:text-cyan-300" href="mailto:contato@ohrly.com.br">
                            contato@ohrly.com.br
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 flex flex-col gap-3 px-5 pt-6 text-xs text-cyan-300 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
                <p>© {year} Ohrly. Todos os direitos reservados.</p>
                <p>O Ohrly não elimina incidentes. Ela elimina o silêncio antes deles.</p>
            </div>
        </footer>
    );
}