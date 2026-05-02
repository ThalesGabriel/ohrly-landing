import { BarChart3, Target, Zap } from "lucide-react";

export default function Hero() {
    return (
        <section className="px-8 py-20 grid md:grid-cols-2 gap-12 items-center">

            <div className="absolute inset-0 -z-10 bg-[#0A0F14]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.15),transparent_40%),radial-gradient(circle_at_80%_40%,rgba(239,68,68,0.12),transparent_40%)]" />
            </div>

            <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                    Pare de reagir a incidentes.{" "}
                    Decida <span className="text-green-400">antes</span> que eles aconteçam.
                </h1>

                <p className="mt-6 text-gray-400">
                    O Ohrly interpreta o comportamento do seu sistema e te avisa quando o ruído começa a indicar degradação.
                </p>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        [
                            <Zap className="text-gray-400" />,
                            "Reaja menos.",
                            "Pare de apagar incêndios. Detecte o início deles.",
                        ],
                        [
                            <Target className="text-gray-400" />,
                            "Decida melhor.",
                            "Ganhe tempo antes de ser pressionado a reagir.",
                        ],
                        [
                            <BarChart3 className="text-gray-400" />,
                            "Controle sua operação com mais precisão.",
                            "Entenda padrões antes que virem incidentes.",
                        ],
                    ].map(([icon, title, subtitle]) => (
                        <div
                            key={title as string}
                            className="p-5 rounded-xl border border-gray-800 bg-zinc-950/40 hover:bg-zinc-900/60 transition"
                        >
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-blue-400 text-lg leading-none">
                                    {icon}
                                </span>

                                <p className="text-gray-200 text-sm font-semibold leading-none">
                                    {title}
                                </p>
                            </div>

                            <p className="text-gray-400 text-xs leading-relaxed">
                                {subtitle}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-[#11161C] rounded-2xl p-6 shadow-lg border border-gray-800">
                <div className="text-sm text-gray-400 mb-4">
                    Sinais detectados
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#0B0F14] p-4 rounded-lg">
                        <p className="text-gray-400 text-xs">Comportamento anômalo</p>
                        <p className="text-red-400 font-semibold mt-2">Detectado</p>
                    </div>

                    <div className="bg-[#0B0F14] p-4 rounded-lg">
                        <p className="text-gray-400 text-xs">Padrões recorrentes</p>
                        <p className="font-semibold mt-2 text-gray-200">3 fluxos</p>
                    </div>
                </div>

                <div className="mt-6 h-32 bg-gradient-to-r from-green-400/10 to-red-400/10 rounded-lg flex flex-col items-center justify-center gap-2">
                    <div className="text-gray-400 text-sm">
                        Visualização de comportamento em tempo real
                    </div>

                    <span className="px-2 py-0.5 text-[10px] rounded-full border border-gray-700 text-gray-400 bg-black/30">
                        em desenvolvimento
                    </span>
                </div>
            </div>
        </section>
    );
}