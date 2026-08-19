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
          data-ohrly-section="hero"
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
          className="bg-[#172119] py-16 text-white sm:py-20"
          data-analytics-section="product_value"
          data-ohrly-section="product_value"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1120px)]">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#9aaf9f] sm:text-[11px]">
                Dos visitantes ao sinal
              </p>

              <h2 className="mt-3 text-[clamp(2.35rem,5vw,4.4rem)] font-extrabold leading-[.98] tracking-[-0.055em]">
                Descubra quais visitantes vale a pena trazer mais vezes.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-[#aeb8b0] sm:text-base sm:leading-7">
                Ohrly observa como as pessoas que chegam ao seu site avançam
                e transforma os comportamentos mais úteis em um sinal para aquisição.
              </p>
            </div>

            <div className="mt-10 grid gap-3 lg:grid-cols-3">
              {[
                [
                  "Veja até onde seus visitantes chegam.",
                  "Entenda quais comportamentos aparecem ao longo da jornada e onde a população deixa de avançar.",
                ],
                [
                  "Encontre uma região de qualidade.",
                  "Descubra quais comportamentos concentram visitantes mais próximos do resultado sem deixar o sinal raro demais.",
                ],
                [
                  "Transforme isso em QualifiedVisit.",
                  "Escolha o comportamento que representa uma boa visita e envie esse sinal aos sistemas que trazem novos visitantes.",
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
          data-ohrly-section="trial"
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
      </main>

      <footer className="mx-auto flex w-[min(calc(100%_-_2rem),1120px)] flex-wrap justify-between gap-4 border-t border-[#e1e6df] py-7 text-xs text-[#737c74]">
        <span>© 2026 Ohrly</span>
        <span>Entender → decidir → testar → aprender.</span>
      </footer>
    </>
  );
}