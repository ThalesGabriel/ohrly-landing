import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Ohrly — Como avaliamos o valor",
  description:
    "Entenda o que o Ohrly considera uma decisão economicamente relevante e como o preço de R$297 se relaciona com o valor que o produto precisa encontrar.",
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

const Divider = () => <div className="h-px w-full bg-[#dfe8e4]" />;

const breakEvenExamples = [
  { ticket: "R$ 75", equivalent: "~4 atendimentos" },
  { ticket: "R$ 100", equivalent: "~3 atendimentos" },
  { ticket: "R$ 150", equivalent: "~2 atendimentos" },
  { ticket: "R$ 300", equivalent: "~1 atendimento" },
];

const valueTypes = [
  {
    title: "Trazer um retorno no momento certo",
    body:
      "Perceber que determinados clientes já estão entrando na época em que normalmente voltam, antes que isso vire apenas um espaço vazio na agenda.",
  },
  {
    title: "Usar melhor a capacidade que já existe",
    body:
      "Encontrar situações em que existe demanda compatível com horários ainda disponíveis, sem precisar começar por aquisição de novos clientes.",
  },
  {
    title: "Perceber uma tendência enquanto ela ainda está crescendo",
    body:
      "Identificar serviços ou produtos que começaram a ganhar força dentro da própria base e entender se existe espaço para ampliar esse movimento.",
  },
  {
    title: "Evitar uma ação que não merece investimento",
    body:
      "Às vezes, valor também significa não gastar tempo ou dinheiro em uma situação que parece promissora, mas não tem evidência suficiente.",
  },
];

export default function ValueTransparencyPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#0d2f31] antialiased">
      <SiteHeader />

      {/* HERO */}
      <section className="m-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-30">
        <div className="max-w-3xl flex flex-col justify-center">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#d55f49]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e7775f]" />
              Mais previsibilidade precisa valer mais do que custa
            </div>
          </div>

          <h1 className="max-w-[880px] font-serif text-[44px] leading-[1.01] tracking-[-0.045em]">
            O investimento custa R$297.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#294849] sm:text-xl">
            Se o seu ticket médio for R$100,{" "}
            <span className="font-semibold text-[#0d2f31]">
              três atendimentos adicionais já representam R$300.
            </span>
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#587171] sm:text-lg">
            Nosso objetivo é encontrar continuamente situações na sua
            própria operação em que retornos, novos serviços, vendas e horários
            preenchidos possam contribuir para que uma parte maior do próximo
            mês deixe de depender de surpresa.
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/diagnostic"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Saiba mais
              <Arrow />
            </a>

            <span className="text-xs leading-5 text-[#78908e]">
              Primeiro verificamos se os seus dados são suficientes.
            </span>
          </div>
        </div>

        {/* CARD DE PREÇO */}
        <div className="lg:pt-2">
          <div className="overflow-hidden rounded-[30px] border border-[#d8e2dd] bg-white shadow-[0_18px_60px_rgba(13,47,49,0.07)]">
            <div className="p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e16f58]">
                Ohrly
              </p>

              <div className="mt-5 flex items-end gap-2">
                <span className="text-5xl font-semibold tracking-[-0.05em] text-[#0d2f31]">
                  R$297
                </span>
                <span className="pb-1 text-sm text-[#78908e]">
                  no piloto
                </span>
              </div>

              <p className="mt-5 text-sm leading-6 text-[#587171]">
                Para entender quanto do seu próximo mês já está coberto, quanto
                ainda deveria vir da sua base e onde existe espaço para aumentar
                essa cobertura.
              </p>

              <div className="mt-7 space-y-3">
                {[
                  "Use o histórico que sua operação já possui no Trinks.",
                  "Veja o que já está coberto e o que ainda deveria acontecer.",
                  "Descubra onde a previsibilidade está escapando.",
                  "Encontre situações em que existe espaço para agir.",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 text-sm leading-6 text-[#456364]"
                  >
                    <span className="mt-1 text-[#0d7773]">
                      <Check />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[#dfe8e4] bg-[#f4f7f5] px-7 py-5 sm:px-8">
              <p className="text-xs leading-5 text-[#667e7d]">
                Se o histórico não for suficiente para uma análise confiável,
                devolvemos 100% do valor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* O QUE CONSIDERAMOS VALOR */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O que consideramos valor
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              Não é apenas vender mais.
            </h2>

            <p className="mt-5 text-base leading-7 text-[#587171]">
              Valor também pode significar agir antes, usar melhor a capacidade
              que já existe ou evitar uma decisão que não merecia investimento.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {valueTypes.map((item) => (
              <article
                key={item.title}
                className="rounded-[22px] border border-[#d8e2dd] bg-white p-5 sm:p-6"
              >
                <div className="flex gap-3">
                  <span className="mt-1 text-[#0d7773]">
                    <Check />
                  </span>

                  <div>
                    <h3 className="font-serif text-2xl leading-snug tracking-[-0.025em]">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-[#607978]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EXEMPLOS DE DECISÃO */}
      <section className="border-y border-[#dfe8e4] bg-[#f1f5f2]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Como isso aparece na prática
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              O Ohrly não precisa dizer “faça isso”.
              Primeiro, precisa mostrar onde vale decidir.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="rounded-[26px] border border-[#d8e2dd] bg-white p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#78908e]">
                Situação possível
              </p>

              <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.035em]">
                Clientes entrando na época em que normalmente voltam
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-6 text-[#587171]">
                <p>
                  28 clientes chegaram à janela em que historicamente costumam retornar.
                </p>

                <p>
                  Existem 9 horários compatíveis ainda disponíveis.
                </p>

                <p>
                  Ticket médio desse contexto:{" "}
                  <strong className="font-semibold text-[#153d3e]">R$120</strong>.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#e0e8e4] bg-[#f7f9f7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#78908e]">
                  O que o Ohrly mostra
                </p>

                <p className="mt-2 font-serif text-2xl leading-snug tracking-[-0.025em] text-[#0d2f31]">
                  Existe um contexto de aproximadamente R$3.360 sobre o qual vale decidir.
                </p>
              </div>

              <p className="mt-5 text-xs leading-5 text-[#718886]">
                Isso não significa R$3.360 garantidos. Significa que existe
                uma população, capacidade e valor suficientes para a situação merecer atenção.
              </p>
            </article>

            <article className="rounded-[26px] border border-[#d8e2dd] bg-white p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#78908e]">
                Outra situação possível
              </p>

              <h3 className="mt-3 font-serif text-3xl leading-tight tracking-[-0.035em]">
                Um serviço começando a crescer dentro da própria base
              </h3>

              <div className="mt-6 space-y-4 text-sm leading-6 text-[#587171]">
                <p>
                  Um serviço passou a aparecer com mais frequência entre
                  clientes que fizeram determinados procedimentos.
                </p>

                <p>
                  Existem 46 clientes com perfil semelhante que ainda não contrataram esse serviço.
                </p>

                <p>
                  Antes de recomendar qualquer campanha, o Ohrly precisa responder:
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#f0d9d3] bg-[#fff8f5] p-5">
                <p className="font-serif text-2xl leading-snug tracking-[-0.025em] text-[#5c3f39]">
                  Há evidência suficiente aqui para valer seu tempo e dinheiro?
                </p>
              </div>

              <p className="mt-5 text-xs leading-5 text-[#718886]">
                O produto não precisa transformar toda mudança em ação. Parte do
                valor é separar o que merece atenção do que pode ser ignorado.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* PRINCÍPIO CENTRAL */}
      <section className="bg-[#0d3435] text-[#f8f7f1]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ef8b73]">
              A régua que usamos
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              Se não conseguirmos encontrar decisões relevantes
              no seu negócio, não deveríamos custar R$297.
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#c8d6d3]">
              O objetivo não é cobrar por uma análise bonita. É encontrar
              situações que ajudem seu negócio a reduzir incerteza e tomar
              decisões sobre dinheiro com mais contexto.
            </p>
          </div>
        </div>
      </section>

      {/* O QUE O PREÇO REPRESENTA */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O preço como referência, não como argumento
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              R$297 é a régua mínima de relevância econômica do produto.
            </h2>
          </div>

          <div className="space-y-6 text-base leading-7 text-[#587171]">
            <p>
              Se uma análise encontrar apenas curiosidades, ela não vale esse preço.
            </p>

            <p>
              Se encontrar situações que ajudem você a trazer alguns retornos,
              preencher capacidade, aproveitar uma tendência ou evitar uma ação
              ruim, o valor começa a ser comparável com decisões reais do negócio.
            </p>

            <p className="font-medium text-[#153d3e]">
              A ideia é que você consiga avaliar o resultado antes de decidir se o
              Ohrly merece continuar fazendo parte da sua rotina.
            </p>
          </div>
        </div>
      </section>

      {/* OBJEÇÃO: ESSAS PESSOAS JÁ VOLTARIAM */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Uma dúvida importante
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              “Mas essas pessoas já voltariam de qualquer forma.”
            </h2>
          </div>

          <div>
            <p className="text-lg leading-8 text-[#294849]">
              Algumas, sim.
              <span className="font-semibold text-[#0d2f31]">
                {" "}
                E nós não consideramos esses retornos como nosso resultado.
              </span>
            </p>

            <p className="mt-5 text-base leading-7 text-[#587171]">
              Esses clientes ajudam a entender como sua operação normalmente
              funciona: Quando costumam voltar, quanto gastam, quais serviços
              procuram e quanto do próximo mês normalmente já nasce da sua própria
              base.
            </p>

            <div className="mt-7 rounded-[24px] border border-[#d8e2dd] bg-white p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#78908e]">
                Um exemplo simples
              </p>

              <p className="mt-3 font-serif text-2xl leading-snug tracking-[-0.025em] text-[#0d2f31]">
                Se normalmente 70 de cada 100 clientes retornam, o Ohrly não diz
                que trouxe esses 70 clientes.
              </p>

              <p className="mt-4 text-sm leading-6 text-[#607978]">
                Eles formam a referência que permite perceber quando 70 começam a
                virar 55, ou quando aparece um comportamento novo que pode fazer
                esse número crescer.
              </p>
            </div>

            <div className="mt-7 border-l-2 border-[#e7775f] pl-5">
              <p className="font-serif text-2xl leading-snug tracking-[-0.025em] text-[#153d3e]">
                Você não paga pelos retornos que já aconteceriam.
                <br />
                <br />
                Você paga para enxergar o que está mudando antes que essa mudança
                fique óbvia no faturamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-[#dfe8e4]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="grid gap-8 rounded-[30px] border border-[#d8e2dd] bg-white p-7 shadow-[0_18px_60px_rgba(13,47,49,0.04)] sm:p-10 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:gap-16 lg:p-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#78908e]">
                Próxima etapa
              </p>

              <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-[-0.04em] ">
                Previsibilidade não cria sozinha o faturamento. Ela melhora o momento
                e a qualidade das decisões que você toma sobre ele.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#587171]">
                Ohrly | Mais contexto para decidir.
              </p>
            </div>

            <div className="flex flex-col lg:items-end">
              <div className="w-full rounded-2xl border border-[#dfe8e4] bg-[#f7f9f7] p-5 lg:max-w-sm">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#78908e]">
                      Piloto
                    </p>
                    <p className="mt-1 text-3xl font-semibold tracking-[-0.04em]">
                      R$297
                    </p>
                  </div>

                  <span className="text-xs text-[#718886]">
                    valor único
                  </span>
                </div>

                <a
                  href="/diagnostic"
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
                >
                  Quero conhecer
                  <Arrow />
                </a>

                <p className="mt-4 text-center text-xs leading-5 text-[#718886]">
                  Se os dados não forem suficientes para uma análise confiável,
                  devolvemos 100% do valor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfe8e4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#78908e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span className="font-serif text-lg text-[#294849]">Ohrly</span>
          <span>Mais contexto para decidir antes do mês acontecer.</span>
        </div>
      </footer>
    </main>
  );
}