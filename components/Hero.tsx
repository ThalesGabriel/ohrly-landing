import Link from "next/link"
import { JSX } from "react"

type Props = {
    summary: string
    title: string,
    titleHighlight: string
    description: string
    rightHightlight: JSX.Element
    labelButton1?: string
    hrefButton1?: string
    labelButton2?: string
    hrefButton2?: string
    noButtons?: boolean
}

export default function Hero({
    summary,
    title,
    titleHighlight,
    description,
    labelButton1,
    labelButton2,
    hrefButton1,
    hrefButton2,
    rightHightlight,
    noButtons
}: Props) {
    return (
        <div>
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
                <div>
                    <p className="mb-5 inline-flex rounded-full border border-indigo-300/20 bg-indigo-400/10 px-3 py-1 text-sm text-indigo-200">
                        {summary}
                    </p>

                    <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-6xl">
                        {title}
                        <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-500 bg-clip-text text-transparent pb-2">
                            {titleHighlight}
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                        {description}
                    </p>
                </div>

                {rightHightlight}
            </div>
            {!noButtons && hrefButton1 && hrefButton2 && (
                <div className="flex flex-col justify-center">
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-between">
                        <Link href={hrefButton1} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-bold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-violet-200 hover:text-violet-700">
                            {labelButton1} <span aria-hidden>▷</span>
                        </Link>
                        <Link href={hrefButton2} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-violet-600 px-6 py-4 text-sm font-bold text-white shadow-sm shadow-violet-500 transition hover:-translate-y-0.5 hover:bg-violet-700">
                            {labelButton2} <span aria-hidden>→</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}