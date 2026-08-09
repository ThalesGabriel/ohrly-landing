import type { Metadata } from "next";
import { LandingAnalytics } from "./components/LandingAnalytics";

export const metadata: Metadata = {
  title: "Ohrly — Torne sua receita mais previsível",
  description:
    "Use o histórico do Trinks para descobrir quais clientes já deveriam estar voltando e onde sua recorrência começou a mudar.",
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

const fieldClass =
  "mt-2 w-full rounded-xl border border-[#d7e1dd] bg-[#fbfcfa] px-3.5 py-3 text-sm text-[#153d3e] outline-none transition placeholder:text-[#9aabaa] focus:border-[#7ca7a2] focus:ring-4 focus:ring-[#0d6867]/[0.06]";

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
            data-analytics-label="Quero entender minha recorrência"
            className="hidden items-center gap-2 text-sm font-medium text-[#355657] transition hover:text-[#0b3537] sm:flex"
          >
            Quero entender minha recorrência
            <Arrow />
          </a>
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

          <h1 className="max-w-[880px] font-serif text-[44px] leading-[1.01] tracking-[-0.045em] text-[#0d2f31] sm:text-[58px] lg:text-[68px]">
            Quanto do faturamento do próximo mês deveria vir de clientes que já
            atendem com você?
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-[#294849] sm:text-xl">
            Se seus clientes costumam voltar,{" "}
            <span className="font-semibold text-[#0d2f31]">
              parte do próximo mês já deveria ser previsível.
            </span>
          </p>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#587171] sm:text-lg">
            O Ohrly usa o histórico que sua operação já possui no Trinks para
            identificar quais clientes começaram a demorar mais para voltar do
            que o esperado para o próprio padrão, antes que a mudança precise
            aparecer na agenda.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#3f5e5f]">
            <div className="flex items-center gap-2">
              <span className="text-[#0d7773]">
                <Check />
              </span>
              Sem regra genérica de “60 dias”
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#0d7773]">
                <Check />
              </span>
              Cada cliente comparado ao próprio histórico
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#0d7773]">
                <Check />
              </span>
              Foco em recorrência e previsibilidade
            </div>
          </div>
        </div>

        <div id="piloto" className="lg:pt-1">
          <div className="rounded-[28px] border border-[#d9e2de] bg-white p-6 shadow-[0_18px_60px_rgba(13,47,49,0.07)] sm:p-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#e16f58]">
                Piloto fundador
              </p>

              <h2 className="mt-2 font-serif text-3xl tracking-[-0.035em] text-[#0d2f31]">
                Descubra como tornar sua receita mais previsível.
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#607978]">
                Primeiro queremos entender se sua operação se encaixa no piloto.
                Leva menos de 30 segundos.
              </p>
            </div>

            <form data-form-id="pilot_lead" className="space-y-4">
              <label className="block text-xs font-medium text-[#526d6c]">
                Seu nome
                <input
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Como podemos chamar você?"
                  className={fieldClass}
                />
              </label>

              <label className="block text-xs font-medium text-[#526d6c]">
                WhatsApp
                <input
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  required
                  placeholder="(81) 99999-9999"
                  className={fieldClass}
                />
              </label>

              <label className="flex items-start gap-3 rounded-xl border border-[#e1e9e5] bg-[#fafcfb] px-3.5 py-3 text-xs leading-5 text-[#526d6c]">
                <input
                  type="checkbox"
                  name="uses_trinks"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#c7d6d1] accent-[#0d6867]"
                />
                <span>Minha operação usa Trinks.</span>
              </label>

              <label className="flex items-start gap-3 pt-1 text-[11px] leading-5 text-[#718886]">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-[#c7d6d1] accent-[#0d6867]"
                />

                <span>
                  Concordo em receber contato sobre o piloto e autorizo o uso
                  destes dados apenas para avaliação da minha inscrição.
                </span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span data-submit-label>
                  Quero tornar minha receita mais previsível
                </span>
                <Arrow />
              </button>

              <p
                data-form-message
                className="hidden rounded-xl px-4 py-3 text-xs leading-5"
                role="status"
                aria-live="polite"
              />

              <p className="text-center text-[11px] leading-5 text-[#8a9c9a]">
                Não há cobrança agora. Se fizer sentido, entramos em contato
                para explicar o piloto e verificar os dados disponíveis.
              </p>
            </form>
          </div>
        </div>
      </section>

      <Divider />

      <section
        data-analytics-section="problem"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O problema
            </p>

            <h2 className="mt-4 font-serif text-4xl leading-tight tracking-[-0.04em] sm:text-5xl">
              Se seus clientes voltam, parte da receita futura não deveria ser
              um mistério.
            </h2>
          </div>

          <div className="space-y-6 text-lg leading-8 text-[#456364]">
            <p>
              Uma cliente de manicure pode sair do ritmo depois de 30 dias. Uma
              cliente de coloração pode estar perfeitamente dentro do esperado
              depois de 45.
            </p>

            <p>
              Quando todo mundo é tratado pela mesma régua, você mistura quem
              naturalmente volta mais devagar com quem realmente começou a
              deixar de retornar como antes.
            </p>

            <div className="rounded-2xl border border-[#d8e2dd] bg-white p-5">
              <p className="text-sm font-medium text-[#153d3e]">
                O Ohrly procura justamente o intervalo entre:
              </p>

              <p className="mt-3 font-serif text-2xl leading-snug tracking-[-0.025em] text-[#0d2f31]">
                “a cliente ainda não voltou”
                <span className="mx-2 text-[#e7775f]">→</span>
                “isso já está deixando o próximo mês menos previsível”.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        data-analytics-section="pilot_details"
        className="border-y border-[#dfe8e4] bg-[#f1f5f2]"
      >
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              O que você recebe
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Uma leitura para decidir onde agir primeiro.
            </h2>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[28px] border border-[#d8e2dd] bg-[#d8e2dd] md:grid-cols-2 lg:grid-cols-4">
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
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Como funciona
            </p>

            <h2 className="mt-4 max-w-xl font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Do histórico a uma ação que pode ser acompanhada.
            </h2>
          </div>

          <ol className="space-y-0">
            {[
              [
                "1",
                "Analisamos o histórico",
                "Usamos os dados que sua operação já possui no Trinks para aprender como seus clientes normalmente retornam.",
              ],
              [
                "2",
                "Encontramos situações prioritárias",
                "Procuramos mudanças persistentes no ritmo de retorno e dimensionamos a recorrência associada.",
              ],
              [
                "3",
                "Você escolhe uma ação",
                "Validamos a leitura com você e registramos o que sua operação decidiu fazer.",
              ],
              [
                "4",
                "Acompanhamos o resultado",
                "Observamos se o comportamento recuperou, permaneceu não resolvido ou se a hipótese não se confirmou.",
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

      <section
        data-analytics-section="audience"
        className="bg-[#0d3435] text-[#f8f7f1]"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10 lg:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#ef8b73]">
              Para quem faz sentido
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Salões que já possuem recorrência, mas ainda administram o próximo
              mês com pouca previsibilidade.
            </h2>
          </div>

          <div className="grid gap-4 text-sm leading-6 text-[#c8d6d3]">
            {[
              "Usa Trinks e possui histórico de atendimentos.",
              "Possui serviços em que clientes naturalmente retornam.",
              "Quer entender quais retornos começaram a sair do ritmo esperado.",
              "Consegue agir quando uma oportunidade relevante é encontrada.",
            ].map((text) => (
              <div
                key={text}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-4"
              >
                <span className="mt-1 text-[#7cc1b7]">
                  <Check />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        data-analytics-section="bottom_offer"
        className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-24"
      >
        <div className="grid gap-10 rounded-[32px] border border-[#d8e2dd] bg-white p-7 sm:p-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:p-14">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#e16f58]">
              Piloto fundador
            </p>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] sm:text-5xl">
              Menos achismo sobre o próximo mês.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-[#587171]">
              O piloto existe para descobrir se o histórico da sua operação já
              contém sinais capazes de tornar a recorrência mais previsível, e
              se essa leitura muda uma decisão real.
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
              data-analytics-label="Quero entender minha recorrência"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0d6867] px-6 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#0a5c5b]"
            >
              Quero entender minha recorrência
              <Arrow />
            </a>

            <p className="mt-4 text-center text-xs leading-5 text-[#718886]">
              Se não houver dados suficientes para uma análise confiável,
              devolvemos 100% do valor do piloto.
            </p>
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
                a: "Informamos que não há evidência suficiente para uma análise confiável. Se você já tiver pago pelo piloto, devolvemos 100% do valor.",
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