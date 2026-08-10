import type { Metadata } from "next";
import { LandingAnalytics } from "./components/LandingAnalytics";

export const metadata: Metadata = {
  title: "Ohrly — Descubra quais clientes deveriam estar voltando",
  description:
    "Analise o histórico do Trinks, encontre oportunidades de retorno e acompanhe se a recorrência da sua operação está melhorando ou piorando.",
};

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

const Divider = () => <div className="h-px w-full bg-[#dfe8e4]" />;

const demoCards = [
  {
    status: "PRECISA DE ATENÇÃO",
    statusClass: "border-[#f0c8be] bg-[#fff7f3] text-[#c75f49]",
    service: "Coloração",
    clients: "138 clientes",
    value: "R$ 23 mil",
    trend: "Continua aumentando há 4 semanas",
    trendClass: "text-[#c75f49]",
    body: "Clientes que normalmente já teriam retornado estão demorando mais do que o próprio histórico indica.",
    bars: [38, 43, 47, 55, 62, 72, 82, 92],
  },
  {
    status: "ACOMPANHAR",
    statusClass: "border-[#e6d5ae] bg-[#fffaf0] text-[#9a711d]",
    service: "Hidratação",
    clients: "84 clientes",
    value: "R$ 7,7 mil",
    trend: "A oportunidade parou de acelerar",
    trendClass: "text-[#9a711d]",
    body: "A recorrência segue abaixo do padrão, mas a população fora do ritmo esperado se estabilizou.",
    bars: [42, 49, 57, 66, 73, 77, 78, 77],
  },
  {
    status: "MELHORANDO",
    statusClass: "border-[#b9d8c8] bg-[#f1f8f4] text-[#39755a]",
    service: "Manicure",
    clients: "39 clientes",
    value: "R$ 1,8 mil",
    trend: "A população elegível começou a cair",
    trendClass: "text-[#39755a]",
    body: "A deterioração ainda existe, mas os retornos começaram a se aproximar novamente do comportamento histórico.",
    bars: [92, 88, 80, 69, 59, 51, 44, 39],
  },
];

const whatYouReceive = [
  {
    n: "01",
    title: "O que mudou",
    body: "Veja em quais serviços os clientes começaram a voltar menos do que antes.",
  },
  {
    n: "02",
    title: "Quem pode voltar",
    body: "Receba os clientes que já passaram do ritmo normal de retorno deles.",
  },
  {
    n: "03",
    title: "Quanto isso representa",
    body: "Veja quanto esses retornos costumam representar no seu próprio histórico.",
  },
  {
    n: "04",
    title: "Está melhorando?",
    body: "Depois de agir, acompanhe se os clientes começaram a voltar ou se a situação continua piorando.",
  },
];

const howItWorks = [
  {
    number: "1",
    title: "Exporte seu histórico do Trinks",
    body: "Você não precisa trocar de sistema nem instalar nada para o primeiro ciclo.",
  },
  {
    number: "2",
    title: "Envie o arquivo ao Ohrly",
    body: "Antes da cobrança, verificamos se há histórico suficiente para uma leitura confiável.",
  },
  {
    number: "3",
    title: "Receba suas principais oportunidades",
    body: "Você vê o que mudou, quais clientes estão envolvidos e quanto esses retornos representam.",
  },
  {
    number: "4",
    title: "Atualize os dados depois",
    body: "O Ohrly mostra se a situação melhorou, piorou ou continua aberta.",
  },
];

const faqs = [
  {
    q: "O Ohrly promete recuperar receita?",
    a: "Não. O Ohrly identifica mudanças no comportamento de retorno, mostra a população envolvida e estima o valor historicamente associado a esses retornos. Isso não é receita garantida nem ROI prometido.",
  },
  {
    q: "Preciso integrar o Trinks?",
    a: "Não no primeiro ciclo. Você começa exportando o histórico e enviando o arquivo. A integração só passa a fazer sentido se o uso recorrente for validado.",
  },
  {
    q: "Isso é uma lista de clientes inativos?",
    a: "Não. Uma regra fixa trata clientes diferentes da mesma forma. O Ohrly olha o ritmo de retorno de cada cliente e o contexto da operação antes de mostrar uma oportunidade.",
  },
  {
    q: "O que acontece se meu arquivo não tiver dados suficientes?",
    a: "A compatibilidade é verificada antes da cobrança. Se o histórico não for suficiente para uma análise confiável, o primeiro ciclo não é iniciado.",
  },
  {
    q: "O que recebo por R$ 297?",
    a: "Uma primeira leitura da recorrência, as principais oportunidades de retorno, a população envolvida, o valor historicamente associado e uma nova leitura para acompanhar o que aconteceu depois.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#0d2f31] antialiased">
      <LandingAnalytics />

      <header className="border-b border-[#dfe8e4]/90">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a
            href="#top"
            className="font-serif text-[28px] tracking-[-0.035em] text-[#0b3537]"
            aria-label="Ohrly"
          >
            Ohrly
          </a>

          <div className="flex items-center gap-5">
            <a
              href="#demo"
              data-analytics-cta
              data-analytics-location="header"
              data-analytics-label="Ver exemplo"
              className="hidden text-sm font-medium text-[#557270] transition hover:text-[#0b3537] sm:block"
            >
              Ver exemplo
            </a>

            <a
              href="/early-access?source=homepage_paid_cycle"
              data-analytics-cta
              data-analytics-location="header"
              data-analytics-label="Analisar meus dados"
              className="inline-flex items-center gap-2 rounded-full bg-[#0d6867] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Analisar meus dados
              <Arrow />
            </a>
          </div>
        </div>
      </header>

      <section
        id="top"
        data-analytics-section="hero"
        className="mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-20"
      >
        <div className="max-w-3xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#d55f49]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e7775f]" />
            Para salões que usam Trinks
          </div>

          <h1 className="max-w-[900px] font-serif text-[44px] leading-[1.01] tracking-[-0.045em] text-[#0d2f31] sm:text-[58px] lg:text-[68px]">
            Veja quais clientes começaram a demorar mais para voltar.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#294849] sm:text-xl">
            O Ohrly usa seu histórico no Trinks para encontrar{" "}
            <span className="font-semibold text-[#0d2f31]">
              oportunidades de retorno
            </span>{" "}
            e acompanhar o que acontece depois.
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#587171] sm:text-lg">
            Você recebe uma leitura curta: o que mudou, quais clientes estão
            envolvidos, quanto esses retornos costumam representar e se a
            situação está melhorando ou piorando.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#demo"
              data-analytics-cta
              data-analytics-location="hero"
              data-analytics-label="Ver exemplo funcionando"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Ver exemplo funcionando
              <Arrow />
            </a>

            <a
              href="/early-access?source=homepage_paid_cycle"
              data-analytics-cta
              data-analytics-location="hero"
              data-analytics-label="Analisar meus dados R$297"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#cfdad6] bg-white px-6 py-4 text-sm font-semibold text-[#153d3e] transition hover:border-[#aebfba]"
            >
              Analisar meus dados — R$ 297
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#526d6c]">
            {[
              "Sem integração no primeiro ciclo",
              "Compatibilidade verificada antes da cobrança",
              "Leitura + acompanhamento",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <span className="text-[#0d7773]">
                  <Check />
                </span>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:pt-1">
          <div className="rounded-[28px] border border-[#d9e2de] bg-white p-6 shadow-[0_18px_60px_rgba(13,47,49,0.07)] sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#91a4a1]">
                  Exemplo de leitura
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em]">
                  Coloração
                </h2>
              </div>

              <span className="rounded-full border border-[#f0c8be] bg-[#fff7f3] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#c75f49]">
                precisa de atenção
              </span>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#f7f8f5] p-4">
                <p className="text-xs text-[#718886]">Clientes</p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
                  138
                </p>
                <p className="mt-1 text-xs leading-5 text-[#78908e]">
                  demorando mais para voltar
                </p>
              </div>

              <div className="rounded-2xl bg-[#f7f8f5] p-4">
                <p className="text-xs text-[#718886]">Valor associado</p>
                <p className="mt-1 text-2xl font-semibold tracking-[-0.035em]">
                  R$ 23 mil
                </p>
                <p className="mt-1 text-xs leading-5 text-[#78908e]">
                  no histórico desses retornos
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-[#e3e9e6] p-5">
              <p className="text-sm font-medium text-[#153d3e]">
                O que está acontecendo
              </p>
              <p className="mt-2 text-sm leading-6 text-[#607978]">
                Essa oportunidade continua aumentando há 4 semanas e ainda não
                mostrou sinal consistente de melhora.
              </p>

              <div className="mt-5 flex h-14 items-end gap-1.5">
                {[28, 34, 38, 44, 49, 56, 63, 72].map((height, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-[#8dbbb5]"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>

              <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.08em] text-[#9aabaa]">
                <span>8 semanas atrás</span>
                <span>hoje</span>
              </div>
            </div>

            <a
              href="#demo"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0d6867]"
            >
              Ver a demonstração completa
              <Arrow />
            </a>

            <p className="mt-5 text-[11px] leading-5 text-[#91a4a1]">
              Exemplo com base simulada. Os valores servem para demonstrar como
              o produto organiza a leitura, não como promessa de resultado.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section
        id="demo"
        data-analytics-section="demo"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
            Veja o Ohrly funcionando
          </p>

          <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
            Em vez de mostrar tudo, o Ohrly mostra o que merece atenção agora.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#587171]">
            Exemplo com uma operação simulada de 2.200 clientes. A ideia é
            mostrar o tipo de leitura que você receberia com os seus próprios
            dados.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {demoCards.map((card) => (
            <article
              key={card.service}
              className="rounded-[26px] border border-[#d9e2de] bg-white p-6 shadow-[0_12px_40px_rgba(13,47,49,0.04)]"
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
                {card.body}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-[#f7f8f5] p-4">
                  <p className="text-xs text-[#78908e]">População</p>
                  <p className="mt-1 font-semibold">{card.clients}</p>
                </div>

                <div className="rounded-2xl bg-[#f7f8f5] p-4">
                  <p className="text-xs text-[#78908e]">Valor associado</p>
                  <p className="mt-1 font-semibold">{card.value}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex h-16 items-end gap-1.5">
                  {card.bars.map((height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-[#8dbbb5]"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>

                <p className={`mt-3 text-xs font-medium ${card.trendClass}`}>
                  {card.trend}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-[#d8e2dd] bg-[#f1f5f2] p-6 sm:p-8">
          <p className="text-sm font-medium text-[#153d3e]">
            O ponto não é gerar mais alertas.
          </p>
          <p className="mt-2 max-w-4xl text-sm leading-6 text-[#607978]">
            Se uma situação começa a melhorar, o Ohrly acompanha. Se continua
            acumulando, ela permanece aberta. E quando não há nada relevante,
            o produto pode simplesmente ficar em silêncio.
          </p>
        </div>
      </section>

      <section
        data-analytics-section="what_you_receive"
        className="border-y border-[#dfe8e4] bg-[#f1f5f2]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O que você recebe
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Uma leitura curta para saber onde olhar primeiro.
            </h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-[#d8e2dd] bg-[#d8e2dd] md:grid-cols-2 lg:grid-cols-4">
            {whatYouReceive.map((item) => (
              <article key={item.n} className="bg-[#fbfbf8] p-7 sm:p-8">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#91a4a1]">
                  {item.n}
                </span>

                <h3 className="mt-8 font-serif text-2xl tracking-[-0.025em]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#5b7474]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        data-analytics-section="how_it_works"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Como começar
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Você começa com um arquivo, não com uma implantação.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-7 text-[#587171]">
              O primeiro ciclo foi pensado para ser pequeno: validar seus dados,
              gerar a leitura e acompanhar uma atualização antes de qualquer
              integração.
            </p>

            <div className="mt-7 rounded-2xl border border-[#d8e2dd] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#91a4a1]">
                Dados mínimos
              </p>

              <div className="mt-4 flex flex-wrap gap-2 text-xs text-[#355657]">
                {["cliente", "serviço", "data", "status", "valor"].map((field) => (
                  <span
                    key={field}
                    className="rounded-full border border-[#d8e2dd] bg-[#f7f8f5] px-3 py-1.5"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <ol>
            {howItWorks.map((item, index) => (
              <li
                key={item.number}
                className={`grid grid-cols-[44px_1fr] gap-5 py-7 ${
                  index !== howItWorks.length - 1
                    ? "border-b border-[#dfe8e4]"
                    : ""
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c7d6d1] text-sm font-medium text-[#557270]">
                  {item.number}
                </div>

                <div>
                  <h3 className="font-medium text-[#153d3e]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#607978]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        data-analytics-section="fit"
        className="bg-[#0d3435] text-[#f8f7f1]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-10 lg:py-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ef8b73]">
              Funciona melhor quando
            </p>

            <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
              Sua operação já tem histórico suficiente para o Ohrly aprender o
              ritmo dos retornos.
            </h2>
          </div>

          <div className="flex flex-col justify-center gap-4 text-sm text-[#c8d6d3] sm:flex-row sm:flex-wrap">
            {[
              "12+ meses de histórico",
              "Clientes identificados",
              "Serviços recorrentes",
              "Atendimentos com data e valor",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4"
              >
                <span className="text-[#7cc1b7]">
                  <Check />
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="oferta"
        data-analytics-section="offer"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="grid gap-10 rounded-[32px] border border-[#d8e2dd] bg-white p-7 shadow-[0_18px_60px_rgba(13,47,49,0.05)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-14">
          <div>
            <div className="inline-flex rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#d55f49]">
              Preço fundador
            </div>

            <h2 className="mt-5 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Primeiro ciclo Ohrly
            </h2>

            <div className="mt-7 flex items-end gap-3">
              <span className="text-5xl font-semibold tracking-[-0.055em]">
                R$ 297
              </span>
              <span className="pb-1 text-sm text-[#78908e]">pagamento único</span>
            </div>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#587171]">
              Antes de cobrar, verificamos se seu arquivo possui os dados
              mínimos para uma análise confiável.
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm font-medium text-[#153d3e]">Inclui:</p>

            <div className="mt-5 space-y-3">
              {[
                "Análise do seu histórico de recorrência",
                "Principais mudanças encontradas",
                "Clientes com oportunidade de retorno",
                "Valor historicamente associado",
                "Uma nova leitura para acompanhar a evolução",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-sm text-[#526d6c]">
                  <span className="mt-0.5 text-[#0d7773]">
                    <Check />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <a
              href="/early-access?source=homepage_paid_cycle"
              data-analytics-cta
              data-analytics-location="offer"
              data-analytics-label="Começar minha análise R$297"
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Começar minha análise — R$ 297
              <Arrow />
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-[#78908e]">
              Primeiro verificamos a compatibilidade do arquivo. Você só avança
              se houver histórico suficiente.
            </p>

            <a
              href="/early-access?source=homepage_book_demo"
              data-analytics-cta
              data-analytics-location="offer"
              data-analytics-label="Prefiro conversar antes"
              className="mt-4 text-center text-sm font-medium text-[#557270] underline decoration-[#bdcbc7] underline-offset-4 transition hover:text-[#153d3e]"
            >
              Prefiro conversar antes
            </a>
          </div>
        </div>
      </section>

      <section
        data-analytics-section="faq"
        className="border-t border-[#dfe8e4]"
      >
        <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8 lg:py-20">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
            Perguntas frequentes
          </p>

          <h2 className="mt-4 text-center font-serif text-4xl tracking-[-0.04em]">
            Antes de começar
          </h2>

          <div className="mt-10 divide-y divide-[#dfe8e4] border-y border-[#dfe8e4]">
            {faqs.map((item) => (
              <details key={item.q} className="group py-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 font-medium text-[#153d3e]">
                  <span>{item.q}</span>
                  <span className="text-xl font-light text-[#78908e] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="max-w-3xl pt-4 text-sm leading-6 text-[#607978]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfe8e4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#78908e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span className="font-serif text-lg text-[#294849]">Ohrly</span>
          <span>Entenda o que mudou. Encontre quem pode voltar. Acompanhe o que acontece depois.</span>
        </div>
      </footer>
    </main>
  );
}
