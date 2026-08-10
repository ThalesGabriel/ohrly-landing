import type { Metadata } from "next";
import SiteHeader from "./components/SiteHeader";

export const metadata: Metadata = {
  title: "Ohrly — Mais previsibilidade para o próximo mês",
  description:
    "Use o histórico do seu negócio para entender quanto do próximo mês já está coberto, quanto ainda deveria vir da sua base e onde agir para reduzir a incerteza.",
};

const Check = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none">
    <path d="m5 12.5 4.1 4.1L19 6.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none">
    <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CalendarIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
    <path d="M7 3v3M17 3v3M4.5 8.5h15M6 5h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const RepeatIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
    <path d="M7 7h9.5A3.5 3.5 0 0 1 20 10.5M17 4l3 3-3 3M17 17H7.5A3.5 3.5 0 0 1 4 13.5M7 20l-3-3 3-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SparkIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none">
    <path d="M12 3c.6 4.2 2.8 6.4 7 7-4.2.6-6.4 2.8-7 7-.6-4.2-2.8-6.4-7-7 4.2-.6 6.4-2.8 7-7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const Divider = () => <div className="h-px w-full bg-[#dfe8e4]" />;

export default function PredictabilityLandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#0d2f31] antialiased">
      <SiteHeader/>

      <section id="top" className=" m-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-30">
        <div className="max-w-3xl flex flex-col justify-center">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#edb3a7] bg-[#fff7f3] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.11em] text-[#d55f49]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e7775f]" />
              Para salões que usam Trinks
            </div>
          </div>

          <h1 className="max-w-[880px] font-serif text-[44px] leading-[1.01] tracking-[-0.045em]">
            Pare de começar cada mês sem saber de onde o faturamento vai vir.
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#294849] sm:text-xl">
            Se seus clientes costumam voltar, <span className="font-semibold text-[#0d2f31]">parte do próximo mês já deveria ser previsível.</span>
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#587171] sm:text-lg">
            Usamos o histórico que seu negócio já possui para mostrar quanto da receita futura já está coberta, quanto ainda deveria vir da sua base atual e onde existe espaço para aumentar essa cobertura.
          </p>

        </div>

        <div className="lg:pt-2">
          <div className="rounded-[28px] border border-[#d9e2de] bg-white p-6 shadow-[0_18px_60px_rgba(13,47,49,0.07)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#78908e]">Seu próximo mês</p>
            <div className="mt-4 flex items-end justify-between gap-6">
              <div>
                <p className="font-serif text-5xl tracking-[-0.045em]">R$ 80 mil</p>
                <p className="mt-2 text-sm text-[#78908e]">referência de faturamento</p>
              </div>
              <div className="rounded-full border border-[#d4e1dc] bg-[#f3f7f5] px-3 py-1.5 text-xs font-semibold text-[#476765]">~87% explicado</div>
            </div>

            <div className="mt-8 overflow-hidden rounded-full bg-[#e8eeeb]">
              <div className="flex h-4 w-full">
                <div className="bg-[#0d6867]" style={{ width: "64.25%" }} title="Já agendado" />
                <div className="bg-[#78aaa2]" style={{ width: "22.75%" }} title="Ainda esperado da base" />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#0d6867]" />
                <div>
                  <p className="text-sm font-semibold text-[#153d3e]">R$ 51.400 já agendados</p>
                  <p className="mt-1 text-xs leading-5 text-[#78908e]">O que já está visível na agenda.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#78aaa2]" />
                <div>
                  <p className="text-sm font-semibold text-[#153d3e]">~R$ 18.200 ainda esperados da sua base</p>
                  <p className="mt-1 text-xs leading-5 text-[#78908e]">Receita que o comportamento dos seus próprios clientes indica que ainda tende a aparecer.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#e4b7aa]" />
                <div>
                  <p className="text-sm font-semibold text-[#153d3e]">~R$ 10.400 ainda sem cobertura identificável</p>
                  <p className="mt-1 text-xs leading-5 text-[#78908e]">É aqui que a incerteza do próximo mês continua maior.</p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-[#f0d2ca] bg-[#fff8f5] px-4 py-4">
              <p className="text-sm leading-6 text-[#6b544f]">
                <strong className="font-semibold text-[#5c3f39]">Não queremos adivinhar o futuro.</strong> Queremos reduzir incerteza e enxergar oportunidades!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">O problema</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Agenda cheia hoje não garante um próximo mês previsível.</h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#456364]">
            <p>Você pode terminar um mês excelente e ainda começar o seguinte sem saber quanto vai faturar.</p>
            <p>Só que, em um negócio com clientes frequentes, parte dessa receita futura não nasce do zero. Ela já está sendo construída pelo comportamento de quem compra, retorna e agenda com você.</p>
          </div>
        </div>
        <div className="rounded-2xl border border-[#d8e2dd] bg-white p-5 mt-15">
          <p className="font-serif text-2xl leading-snug tracking-[-0.025em] text-[#0d2f31]">
            O problema é enxergar essa receita <span className="text-[#e7775f]">quando ela entra na agenda.</span><br /><br />
            Nós buscamos enxergá-la <span className="text-[#0d6867]">enquanto ela ainda está no comportamento dos seus clientes.</span>
          </p>
        </div>
      </section>

      <section className="border-y border-[#dfe8e4] bg-[#f1f5f2]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">Como aumentar a previsibilidade</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Quanto menos do seu faturamento depender de surpresa, mais previsível fica seu negócio.</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[#587171]">Trabalhamos para aumentar a parte do próximo mês que você consegue explicar antes de ele acontecer.</p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-[#d8e2dd] bg-[#d8e2dd] lg:grid-cols-3">
            <article className="bg-[#fbfbf8] p-7 sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f0ed] text-[#0d6867]"><CalendarIcon /></div>
              <h3 className="mt-7 font-serif text-2xl tracking-[-0.025em]">1. O que já está garantido</h3>
              <p className="mt-4 text-sm leading-6 text-[#5b7474]">A agenda mostra o que já sabemos que vai acontecer. Isso é a parte mais segura do próximo mês.</p>
              <div className="mt-6 rounded-xl border border-[#e1e9e5] bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8a9c9a]">Exemplo</p>
                <p className="mt-1 text-lg font-semibold text-[#153d3e]">R$ 51.400 já agendados</p>
              </div>
            </article>

            <article className="bg-[#fbfbf8] p-7 sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f0ed] text-[#0d6867]"><RepeatIcon /></div>
              <h3 className="mt-7 font-serif text-2xl tracking-[-0.025em]">2. O que ainda deveria vir</h3>
              <p className="mt-4 text-sm leading-6 text-[#5b7474]">O histórico ajuda a enxergar a receita que ainda não entrou na agenda, mas costuma surgir do retorno e da compra frequente da sua própria base.</p>
              <div className="mt-6 rounded-xl border border-[#e1e9e5] bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8a9c9a]">Exemplo</p>
                <p className="mt-1 text-lg font-semibold text-[#153d3e]">~R$ 18.200 ainda esperados</p>
              </div>
            </article>

            <article className="bg-[#fbfbf8] p-7 sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0eb] text-[#d96550]"><SparkIcon /></div>
              <h3 className="mt-7 font-serif text-2xl tracking-[-0.025em]">3. Onde dá para aumentar a cobertura</h3>
              <p className="mt-4 text-sm leading-6 text-[#5b7474]">Quando ainda existe uma parte incerta do mês, procuramos comportamentos do próprio negócio que indiquem onde vale agir.</p>
              <div className="mt-6 rounded-xl border border-[#f0d9d3] bg-[#fff8f5] px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[#c96c59]">Exemplo</p>
                <p className="mt-1 text-lg font-semibold text-[#153d3e]">3 formas de reduzir o gap</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">Onde a Previsibilidade se torna Oportunidade</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Não é só sobre quem deixou de voltar.</h2>
            <p className="mt-5 text-base leading-7 text-[#587171]">Procuramos sinais dentro do próprio negócio que podem explicar, ou melhorar, o próximo mês.</p>
          </div>

          <div className="space-y-4">
            {[
              { eyebrow: "Retorno", title: "Clientes de coloração estão demorando mais para voltar do que costumavam.", body: "Se parte da frequência esperada começa a escapar, o próximo mês fica menos coberto." },
              { eyebrow: "Tendência", title: "Hidratação está crescendo entre clientes que fazem química.", body: "Se existem clientes semelhantes e capacidade disponível, essa tendência pode ajudar a cobrir uma parte que ainda está incerta." },
              { eyebrow: "Agenda", title: "Terça e quarta ainda têm horários enquanto clientes entram na janela normal de retorno.", body: "Em vez de esperar a agenda preencher sozinha, você consegue enxergar onde existe demanda compatível com espaço disponível." },
              { eyebrow: "Venda no balcão", title: "Um produto começou a aparecer com mais frequência depois de determinados serviços.", body: "Padrões de compra que já surgem organicamente podem revelar novas formas de aumentar a receita prevista da base atual." },
            ].map((item) => (
              <article key={item.title} className="rounded-[22px] border border-[#d8e2dd] bg-white p-5 sm:p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.11em] text-[#e16f58]">{item.eyebrow}</p>
                <h3 className="mt-2 font-serif text-2xl leading-snug tracking-[-0.025em]">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[#607978]">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0d3435] text-[#f8f7f1]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20 grid lg:grid-cols-2">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ef8b73]">Previsibilidade, não promessa</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Aumentar previsibilidade não significa saber exatamente quanto você vai faturar.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#c8d6d3]">Significa conseguir explicar uma parte maior do próximo mês antes que ele aconteça, entendendo o relacionamento entre clientes, retornos, vendas e capacidade que seu negócio já possui.</p>
          </div>
          <div className="justify-evenly flex flex-col lg:items-end gap-3 sm:mt-5 lg:mt-0">
            {["Menos receita dependendo de surpresa", "Mais clareza sobre o que ainda deveria acontecer", "Mais tempo para agir antes do mês terminar"].map((text) => (
              <div className="lg:w-lg">
                <div key={text} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4 text-sm leading-6 text-[#c8d6d3]">
                  <span className="mt-1 text-[#7cc1b7]"><Check /></span>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="diagnostico" className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
        <div className="gap-10 rounded-[32px] border border-[#d8e2dd] bg-white p-7 shadow-[0_18px_60px_rgba(13,47,49,0.05)] sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">Comece pelos seus próprios dados</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">Descubra quanto do seu próximo mês já deveria ser previsível.</h2>
            <p className="mt-5 text-base leading-7 text-[#587171]">Use o histórico da seu negócio para enxergar o que já está coberto, o que ainda deveria vir da sua base e onde existe espaço para aumentar essa cobertura.</p>
          </div>

          <div className="flex flex-col justify-center mt-5">
            <a href="/diagnostic" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#0a5c5b]">
              Analisar meu próximo mês
              <Arrow />
            </a>
            <p className="mt-4 text-center text-xs leading-5 text-[#718886]">Comece com o histórico que seu negócio já possui no Trinks.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#dfe8e4]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-[#78908e] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
          <span className="font-serif text-lg text-[#294849]">Ohrly</span>
          <span>Mais previsibilidade para a receita que seu negócio já construiu.</span>
        </div>
      </footer>
    </main>
  );
}