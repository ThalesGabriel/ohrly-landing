import { AlertTriangle, TrendingUp, BellOff, DollarSign } from "lucide-react";

export default function Problem() {
    const items = [
        {
            title: "Invisível",
            desc: "A degradação começa pequena.",
            icon: AlertTriangle,
        },
        {
            title: "Progressiva",
            desc: "O impacto cresce aos poucos.",
            icon: TrendingUp,
        },
        {
            title: "Não alerta",
            desc: "Não ultrapassa limites formais.",
            icon: BellOff,
        },
        {
            title: "Cara",
            desc: "Quando aparece, já é tarde.",
            icon: DollarSign,
        },
    ];

    return (
        <section className="bg-zinc-50  text-black py-20 px-8">
            <div className="grid md:grid-cols-12 gap-10 items-start">

                {/* LEFT (4 cols) */}
                <div className="md:col-span-4 md:border-r md:border-gray-200 md:pr-8">
                    <h2 className="text-3xl font-bold leading-tight">
                        O problema que quase ninguém enxerga.
                    </h2>

                    <p className="mt-6 text-gray-600">
                        Sistemas podem estar técnicamente saudáveis e ainda sim gerar perdas todos os dias.
                    </p>
                </div>

                {/* RIGHT (8 cols → 4 itens iguais) */}
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-4 gap-6">
                    {items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.title}
                                className="p-5 rounded-xl border border-gray-200 bg-white hover:shadow-md transition"
                            >
                                <Icon className="text-green-500 mb-3" size={30} />

                                <h3 className="font-semibold text-md">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-sm mt-1 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}