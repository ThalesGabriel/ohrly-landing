import {useTranslations} from "next-intl";
import {Link} from "@/i18n/navigation";

const CURRENT_YEAR = 2026;

export default function Footer() {
    const t = useTranslations("footer");
    const nav = useTranslations("nav");

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
                        {t("description")}
                    </p>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {t("product")}
                    </h3>

                    <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/">
                            {nav("home")}
                        </Link>

                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/demo">
                            {nav("demo")}
                        </Link>

                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/contact">
                            {nav("contact")}
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {t("contact")}
                    </h3>

                    <div className="mt-4 grid gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <Link className="transition hover:text-cyan-700 dark:hover:text-cyan-300" href="/contact">
                            {t("analyzeFlow")}
                        </Link>

                        <a
                            className="transition hover:text-cyan-700 dark:hover:text-cyan-300"
                            href="mailto:taraujo@ohrly.com.br"
                        >
                            taraujo@ohrly.com.br
                        </a>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-10 flex flex-col gap-3 px-5 pt-6 text-xs text-cyan-700 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10 dark:text-cyan-300">
                <p>© {CURRENT_YEAR} Ohrly. {t("rights")}</p>
                <p>{t("tagline")}</p>
            </div>
        </footer>
    );
}