import { Settings, Code2, Box, Handshake } from "lucide-react";

export default function Audience() {
  const items = [
    {
      title: "Operações",
      desc: "Mais controle sobre os sinais que realmente importam na operação.",
      icon: Settings,
    },
    {
      title: "Engenharia / SRE",
      desc: "Mais contexto para agir antes que o problema chegue ao cliente.",
      icon: Code2,
    },
    {
      title: "Produto",
      desc: "Dados comportamentais para decisões mais estratégicas e priorização clara.",
      icon: Box,
    },
    {
      title: "Liderança",
      desc: "Visão antecipada de risco, impacto e custo para decidir com mais assertividade.",
      icon: Handshake,
    },
  ];

  return (
    <section className="bg-white text-black py-20 px-8">
      <div className="grid md:grid-cols-12 gap-10 items-start">

        <div className="md:col-span-8 grid grid-cols-1 ">

          <div className="mb-6">
            <h2 className="text-3xl font-bold leading-tight">
              Para quem o Ohrly é.
            </h2>
          </div>

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


        <div className="md:col-span-4 m-auto">


          <div className="bg-gray-100 text-black p-10 rounded-2xl flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold">
                Menos surpresa. Mais decisão.
              </h3>
              <p className="text-gray-600 mt-2">
                Saiba o que está degradando antes do impacto!
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}