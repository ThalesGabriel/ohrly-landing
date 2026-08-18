import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadForm } from "@/components/lead-form";
import { BehaviorFlow } from "@/components/behavior-flow";

const causes = [
  {
    key: "P",
    title: "Público",
    text: "Estamos trazendo pessoas que simplesmente não demonstram interesse suficiente para avançar?",
  },
  {
    key: "C",
    title: "Criativo",
    text: "A mensagem gera clique, mas chama um tipo de visitante que abandona assim que chega?",
  },
  {
    key: "O",
    title: "Oferta",
    text: "As pessoas demonstram intenção, mas param justamente quando precisam tomar uma decisão?",
  },
  {
    key: "F",
    title: "Funil",
    text: "Existe interesse real, mas alguma etapa da experiência está bloqueando quem já queria avançar?",
  },
];

const signals = [
  {
    title: "Encontre sinais antes do resultado.",
    text: "Descubra quais comportamentos aparecem com mais frequência entre quem realmente avança.",
  },
  {
    title: "Transforme sinais em oportunidades.",
    text: "Veja onde existe espaço para aumentar a quantidade de pessoas que percorrem caminhos mais promissores.",
  },
  {
    title: "Teste uma nova direção.",
    text: "Mude público, criativo, oferta ou funil e observe se o comportamento realmente se deslocou.",
  },
];

const fitItems = [
  [
    "Você já recebe tráfego ou usuários regularmente.",
    "Existe comportamento suficiente acontecendo para ser observado.",
  ],
  [
    "Seus resultados importantes ainda acontecem relativamente pouco.",
    "Vendas, leads, demos ou assinaturas ainda não têm grande volume.",
  ],
  [
    "Você investe em aquisição ou crescimento.",
    "Existe dinheiro e decisão real por trás do tráfego que chega.",
  ],
  [
    "Você não tem um time analisando isso continuamente.",
    "Precisa de clareza sem montar uma estrutura enterprise de dados.",
  ],
];

export default function Home() {
  return (
    <>
      <BehaviorTracker />
      <CookieConsent />

      <header className="border-b border-[#e1e6df]/90 bg-[#f7f8f5]/90">
        <div className="mx-auto flex h-[68px] w-[min(calc(100%_-_2rem),1120px)] items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2.5 text-xl font-extrabold tracking-[-0.04em] text-[#121512]"
          >
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#213f2d] text-sm font-black text-white">
              O
            </span>
            Ohrly
          </a>

          <a
            href="#trial"
            data-analytics-cta="header_start_trial"
            data-analytics-location="site_header"
            data-analytics-label="Testar grátis por 45 dias"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#213f2d] px-4 text-xs font-extrabold text-white"
          >
            Testar grátis
          </a>
        </div>
      </header>

      <main>
        <section
          className="pb-12 pt-16 text-center sm:pb-16 sm:pt-24"
          data-analytics-section="hero"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#213f2d] sm:text-[11px]">
              Entenda antes de gastar mais
            </p>

            <h1 className="display-serif mx-auto mt-5 max-w-5xl text-[clamp(3.7rem,8vw,7rem)] font-normal leading-[.91] tracking-[-0.055em] text-[#121512]">
              Muita gente chega.
              <br />
              Pouca vira cliente.
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-[1.05rem] leading-7 text-[#626b63] sm:text-lg sm:leading-8">
              Descubra{" "}
              <strong className="text-[#121512]">
                onde seu público deixa de avançar
              </strong>{" "}
              antes de gastar mais tentando consertar a coisa errada.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="#trial"
                data-analytics-cta="hero_start_trial"
                data-analytics-location="hero"
                data-analytics-label="Testar o Ohrly grátis por 45 dias"
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-[#213f2d] px-6 text-sm font-extrabold text-white transition hover:bg-[#193423]"
              >
                Testar o Ohrly grátis por 45 dias
              </a>
            </div>

            <p className="mt-3 text-[11px] text-[#868e87]">
              Sem cartão · instalação simples · feito para negócios digitais
              com tráfego e poucas conversões
            </p>
          </div>
        </section>

        <section
          className="pb-16 sm:pb-20"
          data-analytics-section="behavior_flow"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <BehaviorFlow />
          </div>
        </section>

        <section
          className="border-y border-[#e1e6df] bg-white py-16 sm:py-20"
          data-analytics-section="signals"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#213f2d] sm:text-[11px]">
                O que os sinais revelam
              </p>

              <h2 className="mt-3 text-[clamp(2.35rem,5vw,4.4rem)] font-extrabold leading-[.98] tracking-[-0.055em] text-[#121512]">
                Você não precisa esperar a próxima compra para começar a
                aprender.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#667068] sm:text-base sm:leading-7">
                Antes de um lead, uma compra ou uma assinatura acontecer, seu
                público já deixou sinais pelo caminho. Ohrly aprende quais
                deles realmente se relacionam com o resultado que importa para
                você.
              </p>
            </div>

            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {signals.map((signal, index) => (
                <article
                  key={signal.title}
                  className="rounded-[20px] border border-[#e1e6df] bg-[#fbfcfb] p-5 sm:p-6"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-[9px] bg-[#e8efe9] text-[10px] font-extrabold text-[#213f2d]">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.035em] text-[#121512]">
                    {signal.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#687168]">
                    {signal.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 grid gap-3 rounded-[20px] bg-[#213f2d] px-5 py-5 text-white sm:grid-cols-[.7fr_1.3fr] sm:items-center sm:px-6">
              <span className="text-xs text-[#bdc9bf]">
                O objetivo não é gerar mais dados.
              </span>

              <strong className="text-lg leading-7 tracking-[-0.025em] sm:text-xl">
                É encontrar mais oportunidades de transformar o tráfego que
                você já tem em resultado.
              </strong>
            </div>
          </div>
        </section>

        <section
          className="py-16 sm:py-20"
          data-analytics-section="optimization_diagnosis"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#213f2d] sm:text-[11px]">
                Quando a venda não vem
              </p>

              <h2 className="mt-3 text-[clamp(2.35rem,5vw,4.4rem)] font-extrabold leading-[.98] tracking-[-0.055em] text-[#121512]">
                É o público, o criativo, a oferta ou o funil?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#667068] sm:text-base sm:leading-7">
                Ohrly procura onde o comportamento começa a perder força para
                mostrar qual hipótese vale investigar primeiro.
              </p>
            </div>

            <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {causes.map((cause) => (
                <article
                  key={cause.title}
                  className="rounded-[20px] border border-[#e1e6df] bg-white p-5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-[#e8efe9] text-xs font-extrabold text-[#213f2d]">
                    {cause.key}
                  </span>

                  <h3 className="mt-5 text-lg font-extrabold tracking-[-0.03em] text-[#121512]">
                    {cause.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#687168]">
                    {cause.text}
                  </p>
                </article>
              ))}
            </div>

            <div className="mt-4 rounded-2xl bg-[#edf3ee] px-5 py-4 text-sm leading-6 text-[#435247]">
              <strong>Pare de mexer em tudo ao mesmo tempo.</strong> Ohrly
              separa onde a perda aparece da hipótese que parece mais plausível
              — e usa o próximo teste para aprender se ela realmente fazia
              sentido.
            </div>
          </div>
        </section>

        <section
          className="bg-[#172119] py-16 text-white sm:py-20"
          data-analytics-section="product_value"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9aaf9f] sm:text-[11px]">
                O que você recebe
              </p>

              <h2 className="mt-3 text-[clamp(2.35rem,5vw,4.4rem)] font-extrabold leading-[.98] tracking-[-0.055em]">
                Menos dashboard. Mais clareza sobre o próximo movimento.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#aeb8b0] sm:text-base sm:leading-7">
                Você não precisa entender modelos, regiões ou estatística para
                usar o Ohrly. Precisa apenas dizer qual resultado importa.
              </p>
            </div>

            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {[
                [
                  "Veja quem realmente está avançando.",
                  "Ohrly procura o que as pessoas que chegam mais perto do resultado fazem de diferente.",
                ],
                [
                  "Encontre onde existe oportunidade.",
                  "Descubra em qual parte da jornada há espaço para favorecer caminhos mais promissores.",
                ],
                [
                  "Escolha o que vale testar.",
                  "Ohrly apresenta caminhos possíveis. Você escolhe a direção e ele aprende com a resposta.",
                ],
              ].map(([title, text], index) => (
                <article
                  key={title}
                  className="rounded-[22px] border border-white/[.08] bg-[#1d2a20] p-6"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-[#273a2b] text-xs font-extrabold text-[#b9c6bb]">
                    {index + 1}
                  </span>

                  <h3 className="mt-5 text-xl font-extrabold tracking-[-0.035em]">
                    {title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#aeb8b0]">
                    {text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="trial"
          className="border-b border-[#e1e6df] bg-white py-16 sm:py-20"
          data-analytics-section="trial"
        >
          <div className="mx-auto grid w-[min(calc(100%_-_2rem),1120px)] gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:gap-14">
            <div className="lg:sticky lg:top-24">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#213f2d] sm:text-[11px]">
                Trial de 45 dias
              </p>

              <h2 className="mt-3 text-[clamp(2.45rem,5vw,4.5rem)] font-extrabold leading-[.98] tracking-[-0.055em] text-[#121512]">
                Dê 45 dias para o Ohrly aprender com o seu negócio.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-[#667068] sm:text-base sm:leading-7">
                Instale o Ohrly, escolha o resultado que importa e continue
                operando normalmente. Durante o trial, ele observa o
                comportamento disponível e tenta responder três perguntas.
              </p>

              <div className="mt-6 grid gap-2.5">
                {[
                  "Quem está realmente avançando?",
                  "Onde existe oportunidade de melhorar?",
                  "O que merece ser testado primeiro?",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#e1e6df] bg-[#fbfcfb] px-4 py-3 text-sm font-bold text-[#343b35]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <aside
              data-analytics-section="trial_form_card"
              className="rounded-[24px] border border-[#e1e6df] bg-[#f7f8f5] p-5 shadow-[0_18px_50px_rgba(20,30,22,.06)] sm:p-7"
            >
              <h3 className="text-2xl font-extrabold tracking-[-0.04em] text-[#121512]">
                Começar meus 45 dias grátis
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#677067]">
                Quanto mais atividade seu negócio já possui, mais o Ohrly
                consegue investigar durante o período.
              </p>

              <LeadForm />
            </aside>
          </div>
        </section>

        <section
          className="py-16 sm:py-20"
          data-analytics-section="proof"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <div className="grid gap-8 rounded-[26px] border border-[#e1e6df] bg-white p-6 shadow-[0_18px_50px_rgba(20,30,22,.06)] sm:p-8 lg:grid-cols-[1fr_.85fr] lg:items-center">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#213f2d] sm:text-[11px]">
                  Ohrly usando Ohrly
                </p>

                <h2 className="mt-3 text-[clamp(2.1rem,4.3vw,3.7rem)] font-extrabold leading-[1.01] tracking-[-0.052em] text-[#121512]">
                  Estamos fazendo isso primeiro com o nosso próprio tráfego.
                </h2>

                <p className="mt-5 text-sm leading-6 text-[#667068] sm:text-base sm:leading-7">
                  Em nosso histórico, um comportamento presente em
                  aproximadamente{" "}
                  <strong className="text-[#121512]">21,8% das sessões</strong>{" "}
                  capturou cerca de{" "}
                  <strong className="text-[#121512]">
                    97,3% dos inícios de formulário
                  </strong>
                  . Agora estamos verificando se essa relação continua
                  aparecendo em tráfego novo.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <div className="rounded-[20px] bg-[#f1f5f1] p-6 text-center">
                  <strong className="block text-4xl font-extrabold tracking-[-0.055em] text-[#213f2d]">
                    21,8%
                  </strong>
                  <span className="mt-2 block text-xs leading-5 text-[#687168]">
                    das sessões tinham o comportamento relevante
                  </span>
                </div>

                <span className="text-center text-xl text-[#9aa39c]">→</span>

                <div className="rounded-[20px] bg-[#f1f5f1] p-6 text-center">
                  <strong className="block text-4xl font-extrabold tracking-[-0.055em] text-[#213f2d]">
                    97,3%
                  </strong>
                  <span className="mt-2 block text-xs leading-5 text-[#687168]">
                    dos FormStarts estavam dentro desse grupo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="border-y border-[#e1e6df] bg-white py-16 sm:py-20"
          data-analytics-section="fit"
        >
          <div className="mx-auto grid w-[min(calc(100%_-_2rem),1120px)] gap-9 lg:grid-cols-2 lg:items-center">
            <div className="grid gap-2.5">
              {fitItems.map(([title, text]) => (
                <div
                  key={title}
                  className="flex gap-3 rounded-2xl border border-[#e1e6df] bg-[#fbfcfb] px-4 py-3.5"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#e8efe9] text-xs font-extrabold text-[#213f2d]">
                    ✓
                  </span>

                  <div>
                    <strong className="block text-sm text-[#303630]">
                      {title}
                    </strong>
                    <span className="mt-1 block text-xs leading-5 text-[#687168]">
                      {text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#213f2d] sm:text-[11px]">
                Para quem faz sentido
              </p>

              <h2 className="mt-3 text-[clamp(2.2rem,4.5vw,3.8rem)] font-extrabold leading-[1] tracking-[-0.052em] text-[#121512]">
                Grande demais para continuar decidindo só por feeling. Pequeno
                demais para montar uma stack enterprise.
              </h2>

              <p className="mt-5 text-sm leading-6 text-[#667068] sm:text-base sm:leading-7">
                É nesse espaço que o Ohrly começa: negócios digitais com
                movimento suficiente para aprender, mas ainda com poucos
                resultados para explicar tudo sozinho.
              </p>
            </div>
          </div>
        </section>

        <section
          className="py-16 text-center sm:py-24"
          data-analytics-section="final_cta"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)] rounded-[30px] bg-[#213f2d] px-6 py-12 text-white sm:px-10 sm:py-16">
            <h2 className="mx-auto max-w-4xl text-[clamp(2.6rem,5.4vw,4.7rem)] font-extrabold leading-[.98] tracking-[-0.058em]">
              Antes de gastar mais para trazer novas pessoas, entenda o que
              acontece com as que já chegaram.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#c6d1c8] sm:text-base sm:leading-7">
              Use os próximos 45 dias para descobrir quais sinais importam,
              onde existe oportunidade e o que merece seu próximo teste.
            </p>

            <div className="mt-7 flex justify-center">
              <a
                href="#trial"
                data-analytics-cta="final_start_trial"
                data-analytics-location="final_cta"
                data-analytics-label="Testar o Ohrly grátis por 45 dias"
                className="inline-flex min-h-13 items-center justify-center rounded-full bg-white px-6 text-sm font-extrabold text-[#213f2d]"
              >
                Testar o Ohrly grátis por 45 dias
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[min(calc(100%_-_2rem),1120px)] flex-wrap justify-between gap-4 border-t border-[#e1e6df] py-7 text-xs text-[#737c74]">
        <span>© 2026 Ohrly</span>
        <span>Entender → decidir → testar → aprender.</span>
      </footer>
    </>
  );
}