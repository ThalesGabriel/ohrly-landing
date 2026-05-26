export default function Header() {
    return (
        <header className="flex items-center justify-between">
            <a href="#" className="text-3xl font-bold tracking-tight text-white">Ohrly</a>
            <nav className="hidden items-center gap-10 text-sm text-slate-200 md:flex">
                <a className="transition hover:text-cyan-300" href="/">Início</a>
                <a className="transition hover:text-cyan-300" href="/demo">Demonstração</a>
                <a className="transition hover:text-cyan-300" href="/contact">Fale conosco</a>
            </nav>
        </header>
    )
}