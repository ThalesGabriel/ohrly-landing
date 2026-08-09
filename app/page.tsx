import type { Metadata } from "next";
import { PilotForm } from "./components/PilotForm";
import { LandingAnalytics } from "./components/LandingAnalytics";

export const metadata: Metadata = {
  title: "Ohrly — Previsibilidade de receita recorrente",
  description:
    "Descubra onde o ritmo de retorno dos seus clientes começou a mudar e quanto de receita recorrente está associado a essa mudança.",
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

export default function PilotPage() {
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

          <a
            href="#piloto"
            data-analytics-cta
            data-analytics-location="header"
            data-analytics-label="Conhecer o piloto"
            className="hidden items-center gap-2 text-sm font-medium text-[#355657] transition hover:text-[#0b3537] sm:flex"
          >
            Conhecer o piloto
            <Arrow />
          </a>
        </div>
      </header>

      <section
        id="top"
        data-analytics-section="hero"
        className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-24"
      >
        <div className="max-w-3xl">
          <div className="mb-8 inline-flex items-center rounded-full border border-[#cfded8] bg-white/50 px-3 py-1.5 text-xs font-medium tracking-[0.04em] text-[#54716f]">
            PILOTO FUNDADOR · TRINKS
          </div>

          <h1 className="max-w-[850px] font-serif text-[46px] leading-[0.98] tracking-[-0.045em] text-[#0d2f31] ">
            Você sabe quais clientes deveriam ter voltado, mas ainda não voltaram?
          </h1>

          <div className="mt-8 max-w-2xl border-l-2 border-[#e7775f] pl-5">
            <p className="text-lg leading-8 text-[#294849] sm:text-xl">
              O problema não é apenas quem faltou hoje.
              <span className="font-semibold text-[#0d2f31]">
                {" "}
                É a receita dos próximos meses ficando menos previsível.
              </span>
            </p>
          </div>

          <p className="mt-8 max-w-2xl text-base leading-7 text-[#587171] sm:text-lg">
            O Ohrly analisa o histórico da sua operação, aprende o ritmo normal
            de retorno dos seus clientes e mostra onde essa recorrência começou
            a mudar, por serviço, profissional e contexto.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#3f5e5f]">
            <div className="flex items-center gap-2">
              <span className="text-[#0d7773]"><Check /></span>
              Sem regra fixa de “60 dias”
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0d7773]"><Check /></span>
              Histórico da sua própria operação
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#0d7773]"><Check /></span>
              Leitura econômica, não lista de inativos
            </div>
          </div>
        </div>

        <div id="piloto" className="lg:pt-2">
          <div className="rounded-[28px] border border-[#d9e2de] bg-white p-6 shadow-[0_18px_60px_rgba(13,47,49,0.07)] sm:p-8">
            <div className="mb-7 flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e16f58]">
                  Piloto fundador
                </p>
                <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em] text-[#0d2f31]">
                  Descubra onde sua recorrência está perdendo previsibilidade.
                </h2>
              </div>
            </div>

            <PilotForm />

          </div>
        </div>
      </section>

      <Divider />

      <section data-analytics-section="problem" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O problema
            </p>
            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              Agenda cheia hoje não garante um próximo mês previsível.
            </h2>
          </div>

          <div className="space-y-7 text-lg leading-8 text-[#456364]">
            <p>
              Uma cliente de manicure pode estar atrasada depois de 30 dias.
              Uma cliente de coloração pode estar perfeitamente dentro do ritmo
              esperado depois de 45.
            </p>

            <p>
              Quando todos são tratados pela mesma régua, você mistura clientes
              naturalmente lentos com clientes cuja recorrência realmente
              começou a se deteriorar.
            </p>

            <p className="font-medium text-[#153d3e]">
              O Ohrly procura a mudança antes que ela precise aparecer como uma
              queda óbvia no faturamento.
            </p>
          </div>
        </div>
      </section>

      <section data-analytics-section="pilot_details" className="border-y border-[#dfe8e4] bg-[#f1f5f2]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O que você recebe
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Uma leitura para decidir onde agir primeiro.
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-[28px] border border-[#d8e2dd] bg-[#d8e2dd] md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "01",
                title: "Onde mudou",
                body: "Serviços, profissionais ou contextos em que o ritmo de retorno começou a sair do histórico.",
              },
              {
                n: "02",
                title: "Quem está envolvido",
                body: "Clientes que já ultrapassaram a região esperada para o próprio padrão de retorno.",
              },
              {
                n: "03",
                title: "Quanto está exposto",
                body: "Uma estimativa da receita recorrente historicamente associada a esses retornos.",
              },
              {
                n: "04",
                title: "O que aconteceu depois",
                body: "Acompanhamos a ação escolhida e verificamos se o comportamento começou a recuperar.",
              },
            ].map((item) => (
              <article key={item.n} className="bg-[#fbfbf8] p-7 sm:p-8">
                <span className="text-xs font-semibold tracking-[0.12em] text-[#91a4a1]">
                  {item.n}
                </span>
                <h3 className="mt-10 font-serif text-2xl tracking-[-0.025em]">
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

      <section data-analytics-section="how_it_works" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Como funciona
            </p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Do histórico a uma hipótese que pode ser acompanhada.
            </h2>
          </div>

          <ol className="space-y-0">
            {[
              [
                "1",
                "Analisamos o histórico",
                "Você exporta ou autoriza o acesso aos dados necessários da sua operação no Trinks.",
              ],
              [
                "2",
                "Encontramos até 3 situações prioritárias",
                "Procuramos mudanças persistentes no ritmo de retorno e dimensionamos a recorrência associada.",
              ],
              [
                "3",
                "Escolhemos uma ação",
                "Você valida se a leitura faz sentido e decide qual ação operacional vale testar.",
              ],
              [
                "4",
                "Acompanhamos por 30–45 dias",
                "Observamos se a mudança recuperou, permanece não resolvida ou se a hipótese foi refutada.",
              ],
            ].map(([number, title, body], index) => (
              <li
                key={number}
                className={`grid grid-cols-[44px_1fr] gap-5 py-7 ${
                  index !== 3 ? "border-b border-[#dfe8e4]" : ""
                }`}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c7d6d1] text-sm font-medium text-[#557270]">
                  {number}
                </div>
                <div>
                  <h3 className="font-medium text-[#153d3e]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#607978]">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-analytics-section="audience" className="bg-[#0d3435] text-[#f8f7f1]">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-10 lg:py-24">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ef8b73]">
              Para quem faz sentido
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Operações em que clientes voltar faz parte do modelo de receita.
            </h2>
          </div>

          <div className="grid gap-4 text-sm leading-6 text-[#c8d6d3]">
            {[
              "Usa Trinks e possui ao menos 6 meses de histórico.",
              "Tem serviços com retorno recorrente: cabelo, unhas, estética, barbearia, spa, clínica ou similares.",
              "Possui volume suficiente para observar padrões de retorno.",
              "Consegue executar uma ação caso uma oportunidade relevante seja encontrada.",
            ].map((text) => (
              <div
                key={text}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4"
              >
                <span className="mt-1 text-[#7cc1b7]"><Check /></span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-analytics-section="bottom_offer" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">
        <div className="grid gap-10 rounded-[32px] border border-[#d8e2dd] bg-white p-7 sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Piloto fundador
            </p>
            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Menos “achismo” sobre o próximo mês.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#587171]">
              O piloto existe para descobrir se o seu histórico já contém sinais
              capazes de tornar a recorrência mais previsível, e se essa leitura
              muda uma decisão real da operação.
            </p>

            <div className="mt-8 flex items-end gap-3">
              <span className="text-sm text-[#6f8684]">Piloto</span>
              <span className="text-4xl font-semibold tracking-[-0.045em]">
                R$ 297
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <a
              href="#piloto"
              data-analytics-cta
              data-analytics-location="bottom_offer"
              data-analytics-label="Ver se minha operação se qualifica"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Ver se minha operação se qualifica
              <Arrow />
            </a>
            <p className="mt-4 text-center text-xs leading-5 text-[#718886]">
              Se não houver dados suficientes para uma análise confiável,
              devolvemos 100% do valor.
            </p>
          </div>
        </div>
      </section>

      <section data-analytics-section="faq" className="border-t border-[#dfe8e4]">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
            Perguntas frequentes
          </p>
          <h2 className="mt-4 text-center font-serif text-4xl tracking-[-0.04em]">
            Antes de participar
          </h2>

          <div className="mt-10 divide-y divide-[#dfe8e4] border-y border-[#dfe8e4]">
            {[
              {
                q: "O Ohrly promete recuperar receita?",
                a: "Não. O piloto identifica mudanças no comportamento de retorno, estima a recorrência historicamente associada e acompanha o que acontece depois de uma ação. Não tratamos exposição como receita garantida ou perdida.",
              },
              {
                q: "Preciso trocar de sistema ou instalar alguma coisa?",
                a: "Não para o piloto. O objetivo é começar com os dados que sua operação já possui no Trinks.",
              },
              {
                q: "Isso é uma lista de clientes inativos?",
                a: "Não. Uma regra fixa de inatividade trata clientes diferentes da mesma forma. O Ohrly tenta aprender o ritmo histórico de retorno e observar mudanças relativas a esse comportamento.",
              },
              {
                q: "O que acontece se meu histórico não for suficiente?",
                a: "Informamos que não há evidência suficiente para uma análise confiável e devolvemos 100% do valor do piloto.",
              },
            ].map((item) => (
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
          <span>Observabilidade da recorrência econômica.</span>
        </div>
      </footer>
    </main>
  );
}