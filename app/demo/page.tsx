import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Demo Ohrly — Veja como funciona",
  description:
    "Veja um exemplo de como o Ohrly identifica mudanças na recorrência, encontra oportunidades de retorno e acompanha o que acontece depois.",
};

const Arrow = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4"
    fill="none"
  >
    <path
      d="M5 12h14M14 7l5 5-5 5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 24 24"
    className="h-4 w-4 shrink-0"
    fill="none"
  >
    <path
      d="m5 12.5 4.1 4.1L19 6.8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const cards = [
  {
    status: "PRECISA DE ATENÇÃO",
    statusClass: "border-[#f0c8be] bg-[#fff7f3] text-[#c75f49]",
    service: "Coloração",
    clients: "138 clientes",
    value: "R$ 23 mil",
    summary:
      "Clientes que costumavam voltar nesse período estão demorando mais que antes.",
    movement: "Continua aumentando há 4 semanas",
    movementClass: "text-[#c75f49]",
    bars: [36, 42, 48, 54, 62, 70, 82, 94],
    why: [
      "A recorrência ficou abaixo do histórico da operação.",
      "A quantidade de clientes fora do ritmo normal continua crescendo.",
      "Ainda não apareceu um sinal consistente de melhora.",
    ],
  },
  {
    status: "ACOMPANHAR",
    statusClass: "border-[#e6d5ae] bg-[#fffaf0] text-[#9a711d]",
    service: "Hidratação",
    clients: "84 clientes",
    value: "R$ 7,7 mil",
    summary:
      "A recorrência continua abaixo do padrão, mas a situação parou de piorar.",
    movement: "A oportunidade se estabilizou",
    movementClass: "text-[#9a711d]",
    bars: [42, 48, 55, 64, 71, 76, 77, 77],
    why: [
      "O retorno ainda está abaixo do comportamento habitual.",
      "A população envolvida deixou de crescer nas últimas leituras.",
      "Por enquanto, faz mais sentido acompanhar do que tratar como urgência.",
    ],
  },
  {
    status: "MELHORANDO",
    statusClass: "border-[#b9d8c8] bg-[#f1f8f4] text-[#39755a]",
    service: "Manicure",
    clients: "39 clientes",
    value: "R$ 1,8 mil",
    summary:
      "A situação ainda existe, mas os clientes começaram a voltar ao ritmo de antes.",
    movement: "A população envolvida está caindo",
    movementClass: "text-[#39755a]",
    bars: [92, 88, 80, 69, 59, 51, 44, 39],
    why: [
      "Houve uma deterioração nas semanas anteriores.",
      "A quantidade de clientes fora do ritmo esperado começou a cair.",
      "O Ohrly mantém o caso aberto até a melhora se sustentar.",
    ],
  },
];

const steps = [
  {
    number: "1",
    title: "O que mudou",
    text: "O Ohrly compara o comportamento recente com o histórico da própria operação.",
  },
  {
    number: "2",
    title: "Quem pode voltar",
    text: "Identifica clientes que passaram do ritmo normal de retorno deles.",
  },
  {
    number: "3",
    title: "Quanto isso representa",
    text: "Mostra o valor que esses retornos costumam representar no histórico.",
  },
  {
    number: "4",
    title: "O que aconteceu depois",
    text: "Na próxima leitura, mostra se a situação piorou, melhorou ou continua aberta.",
  },
];

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#0d2f31] antialiased">
      <header className="border-b border-[#dfe8e4]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <Link
            href="/"
            className="font-serif text-[28px] tracking-[-0.035em] text-[#0b3537]"
            aria-label="Ohrly"
          >
            Ohrly
          </Link>

          <Link
            href="/early-access?source=demo_header"
            className="inline-flex items-center gap-2 rounded-full bg-[#0d6867] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
          >
            Analisar meus dados
            <Arrow />
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:px-10 lg:pb-20 lg:pt-20">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#d55f49]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7775f]" />
            Exemplo com dados simulados
          </div>

          <h1 className="mt-7 max-w-4xl font-serif text-[44px] leading-[1.02] tracking-[-0.045em] sm:text-[58px] lg:text-[66px]">
            Veja o tipo de leitura que o Ohrly faria com o seu histórico.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#456364] sm:text-xl">
            Este exemplo usa uma operação fictícia com 2.200 clientes. O objetivo
            é mostrar como o produto organiza uma oportunidade de retorno —
            sem transformar uma base simulada em promessa de resultado.
          </p>
        </div>
      </section>

      <section className="border-y border-[#dfe8e4] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-4 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-[#e1e9e5] bg-[#fbfcfa] p-5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c7d6d1] text-xs font-semibold text-[#557270]">
                  {step.number}
                </div>
                <h2 className="mt-5 font-serif text-2xl tracking-[-0.025em]">
                  {step.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#607978]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Hoje, no Studio Aurora
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Três situações diferentes. Três decisões diferentes.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-6 text-[#718886]">
            Os números abaixo são calculados de uma base simulada. “Valor
            associado” significa quanto esses retornos costumam representar no
            histórico, não receita garantida.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.service}
              className="rounded-[28px] border border-[#d9e2de] bg-white p-6 shadow-[0_14px_48px_rgba(13,47,49,0.05)]"
            >
              <span
                className={`inline-flex rounded-full border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.09em] ${card.statusClass}`}
              >
                {card.status}
              </span>

              <h3 className="mt-5 font-serif text-3xl tracking-[-0.035em]">
                {card.service}
              </h3>

              <p className="mt-4 text-sm leading-6 text-[#607978]">
                {card.summary}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f7f8f5] p-4">
                  <p className="text-xs text-[#78908e]">Clientes envolvidos</p>
                  <p className="mt-1 font-semibold text-[#153d3e]">
                    {card.clients}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#f7f8f5] p-4">
                  <p className="text-xs text-[#78908e]">Valor associado</p>
                  <p className="mt-1 font-semibold text-[#153d3e]">
                    {card.value}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-xs font-medium text-[#78908e]">
                  Evolução nas últimas leituras
                </p>
                <div className="mt-3 flex h-16 items-end gap-1.5">
                  {card.bars.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-[#8dbbb5]"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
                <p className={`mt-3 text-xs font-semibold ${card.movementClass}`}>
                  {card.movement}
                </p>
              </div>

              <div className="mt-6 border-t border-[#e3e9e6] pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#91a4a1]">
                  Por que apareceu
                </p>

                <div className="mt-4 space-y-3">
                  {card.why.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <span className="mt-0.5 text-[#0d7773]">
                        <Check />
                      </span>
                      <p className="text-sm leading-6 text-[#607978]">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#dfe8e4] bg-[#f1f5f2]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O que muda depois da primeira leitura
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              O Ohrly não esquece a oportunidade na semana seguinte.
            </h2>
          </div>

          <div className="space-y-4 text-sm leading-6 text-[#526d6c]">
            <div className="rounded-2xl border border-[#d8e2dd] bg-white p-5">
              <p className="font-medium text-[#153d3e]">Você pode agir</p>
              <p className="mt-2">
                Por exemplo: contato por WhatsApp, ligação, campanha ou nenhuma
                ação. No primeiro ciclo, basta registrar o que foi feito.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d8e2dd] bg-white p-5">
              <p className="font-medium text-[#153d3e]">O Ohrly acompanha</p>
              <p className="mt-2">
                Na próxima atualização, o produto mostra se aquela mesma situação
                cresceu, estabilizou, começou a melhorar ou foi resolvida.
              </p>
            </div>

            <div className="rounded-2xl border border-[#d8e2dd] bg-white p-5">
              <p className="font-medium text-[#153d3e]">Com o tempo, cria memória</p>
              <p className="mt-2">
                Ações e resultados ficam ligados ao contexto. Assim, o produto
                começa a aprender quais situações costumam merecer intervenção.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 rounded-[32px] border border-[#d8e2dd] bg-white p-7 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Agora com os seus dados
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Primeiro verificamos se o seu histórico serve.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#587171]">
              A checagem é gratuita. Se houver dados suficientes, você pode gerar
              o primeiro ciclo Ohrly por R$ 297.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-3">
              {[
                "Cliente identificado",
                "Serviço ou procedimento",
                "Data do atendimento",
                "Status do atendimento",
                "Valor",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm text-[#526d6c]">
                  <span className="text-[#0d7773]">
                    <Check />
                  </span>
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/early-access?source=demo_bottom"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Verificar meu arquivo
              <Arrow />
            </Link>

            <Link
              href="/early-access?source=demo_conversation"
              className="mt-4 text-center text-sm font-medium text-[#557270] underline decoration-[#bdcbc7] underline-offset-4"
            >
              Prefiro conversar antes
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfe8e4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#78908e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span className="font-serif text-lg text-[#294849]">Ohrly</span>
          <span>
            Exemplo demonstrativo com dados simulados. Sem promessa de receita
            incremental.
          </span>
        </div>
      </footer>
    </main>
  );
}

