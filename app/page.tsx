import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadForm } from "@/components/lead-form";

const metrics = [
  ["O que mudou", "2 → 19", "ocorrências semanais"],
  ["Persistência", "4 semanas", "sem retorno ao padrão anterior"],
  ["Clientes afetados", "11 contas", "envolvidas no mesmo tipo de problema"],
  ["Recorrência", "4 contas", "voltaram a encontrar o problema"],
  ["Carga operacional", "2,3×", "mais tempo de resolução"],
  ["Valor exposto", "R$ 84 mil", "de MRR associado às contas afetadas"],
];

const steps = [
  {
    title: "Conectamos",
    text: "Usamos o histórico que já existe no seu Intercom, sem exigir uma nova instrumentação.",
  },
  {
    title: "Consolidamos",
    text: "Agrupamos ocorrências semelhantes e identificamos o que deixou de parecer caso isolado.",
  },
  {
    title: "Priorizamos",
    text: "Mostramos quais problemas estão se repetindo, quem está sendo afetado e o que merece atenção primeiro.",
  },
];

export default function Home() {
  return (
    <>
      <BehaviorTracker />
      <CookieConsent />

      <header className="mx-auto flex min-h-18 w-[min(calc(100%_-_2.5rem),1160px)] items-center justify-between gap-5">
        <a href="#" className="relative text-2xl font-black tracking-[-0.06em] text-stone-950">
          <span className="absolute -top-1 left-0 h-2 w-4 rounded-t-full border-t-4 border-[#ff6f1f]" />
          ohrly
        </a>

        <a
          href="#diagnostico"
          data-analytics-cta="nav_analyze_intercom"
          data-analytics-location="nav"
          data-analytics-label="Analisar meu Intercom"
          className="hidden rounded-full border border-[#ff6f1f] bg-[#fffdf9] px-4 py-2.5 text-xs font-black text-stone-950 shadow-[0_5px_0_#ff6f1f] sm:inline-flex"
        >
          Analisar meu Intercom
        </a>
      </header>

      <main>
        <section className="pb-16 pt-10 lg:pb-20 lg:pt-14" data-analytics-section="hero">
          <div className="mx-auto grid w-[min(calc(100%_-_2.5rem),1160px)] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-14">
            <div>
              <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
                <span className="h-[3px] w-7 rounded-full bg-[#ff6f1f]" />
                Diagnóstico para SaaS B2B
              </div>

              <h1 className="max-w-4xl text-[clamp(3rem,6vw,5.5rem)] font-black leading-[.98] tracking-[-0.065em] text-stone-950">
                Descubra quais problemas do seu SaaS deixaram de ser{" "}
                <span className="text-[#ff6f1f]">casos isolados.</span>
              </h1>

              <p className="mt-6 max-w-3xl text-[clamp(1.04rem,1.7vw,1.22rem)] leading-8 text-stone-800">
                Analisamos seu histórico do <strong className="text-[#ff6f1f]">Intercom</strong> para descobrir o que começou a se repetir, consolidamos o impacto dessas ocorrências e mostramos quais problemas merecem atenção primeiro, antes que a repetição vire custo normalizado.
              </p>

              <a
                href="#diagnostico"
                data-analytics-cta="hero_analyze_intercom"
                data-analytics-location="hero"
                data-analytics-label="Analisar meu Intercom"
                className="mt-7 inline-flex min-h-13 items-center justify-center rounded-full border border-[#ff6f1f] bg-[#fffdf9] px-6 text-sm font-black text-stone-950 shadow-[0_6px_0_#ff6f1f] transition hover:translate-y-0.5 hover:shadow-[0_4px_0_#ff6f1f]"
              >
                Analisar meu Intercom
              </a>

              <p className="mt-4 text-sm text-stone-500">
                Sem novo tracking. Começamos com os dados que sua operação já possui.
              </p>
            </div>

            <aside
              id="diagnostico"
              data-analytics-section="hero_form"
              className="rounded-[22px] border border-stone-200 bg-[#fffdf9] p-6 shadow-[0_18px_50px_rgba(29,20,12,.08)] sm:p-7"
            >
              <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] text-stone-950">
                Quero entender o que está se repetindo
              </h2>
              <p className="mt-2 text-sm leading-6 text-stone-500">
                Conte o mínimo necessário para validarmos se sua operação se encaixa no primeiro modelo do Ohrly.
              </p>
              <LeadForm />
            </aside>
          </div>
        </section>

        <section className="py-16 lg:py-18" data-analytics-section="proof">
          <div className="mx-auto w-[min(calc(100%_-_2.5rem),1160px)]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
              O que você recebe
            </p>
            <h2 className="mt-3 max-w-4xl text-[clamp(2.15rem,4.3vw,3.7rem)] font-black leading-[1.02] tracking-[-0.055em] text-stone-950">
              Uma leitura objetiva do que começou a se repetir no seu suporte.
            </h2>

            <div className="mt-8 overflow-hidden rounded-[22px] border border-stone-200 bg-[#fffdf9] shadow-[0_18px_50px_rgba(29,20,12,.08)]">
              <div className="flex flex-col justify-between gap-4 border-b border-stone-200 p-6 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em] text-stone-950 sm:text-2xl">
                    Falhas recorrentes na exportação de relatórios
                  </h3>
                  <p className="mt-1 text-sm text-stone-500">
                    Um problema que deixou de parecer um conjunto de ocorrências isoladas.
                  </p>
                </div>
                <span className="w-fit rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-orange-700">
                  Exemplo ilustrativo
                </span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                {metrics.map(([label, value, note], index) => (
                  <div
                    key={label}
                    className={`p-6 ${index < 3 ? "lg:border-b" : ""} ${
                      index % 3 !== 2 ? "lg:border-r" : ""
                    } border-stone-200 max-lg:border-b sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r-0`}
                  >
                    <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-stone-500">
                      {label}
                    </span>
                    <strong className="mt-2 block text-2xl font-black tracking-[-0.04em] text-stone-950">
                      {value}
                    </strong>
                    <small className="mt-1 block text-sm leading-5 text-stone-600">{note}</small>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-3 text-xs leading-5 text-stone-500">
              Valor exposto representa o valor associado às contas afetadas e não significa, necessariamente, receita perdida.
            </p>
          </div>
        </section>

        <section className="bg-stone-950 py-16 text-white lg:py-20" data-analytics-section="problem">
          <div className="mx-auto w-[min(calc(100%_-_2.5rem),1160px)]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-orange-300">
              O problema
            </p>
            <h2 className="mt-3 max-w-4xl text-[clamp(2.15rem,4.3vw,3.7rem)] font-black leading-[1.02] tracking-[-0.055em]">
              Seu time resolve casos. O problema é perceber quando eles deixaram de ser casos.
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-stone-300">
              Um cliente reclama, o suporte resolve, outro cliente encontra algo parecido e o ciclo continua. Sem consolidar a repetição, o padrão só fica evidente quando já ganhou escala.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              {["Cliente reclama", "Suporte resolve", "Outro cliente reclama", "A repetição cresce", "O padrão fica óbvio tarde demais"].map((item, index, list) => (
                <div key={item} className="contents">
                  <span className="rounded-full border border-white/15 bg-white/[.04] px-4 py-2.5 text-xs font-bold">
                    {item}
                  </span>
                  {index < list.length - 1 ? (
                    <span className="hidden font-black text-orange-300 sm:inline">→</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-20" data-analytics-section="how">
          <div className="mx-auto w-[min(calc(100%_-_2.5rem),1160px)]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
              Como funciona
            </p>
            <h2 className="mt-3 text-[clamp(2.15rem,4.3vw,3.7rem)] font-black leading-[1.02] tracking-[-0.055em] text-stone-950">
              Conectamos. Consolidamos. Priorizamos.
            </h2>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="rounded-2xl border border-stone-200 bg-[#fffdf9] p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6f1f] text-sm font-black text-white">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.035em] text-stone-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-500">{step.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#ff6f1f] py-16 lg:py-20" data-analytics-section="final_cta">
          <div className="mx-auto max-w-4xl px-5 text-center">
            <h2 className="text-[clamp(2.4rem,5vw,4.35rem)] font-black leading-none tracking-[-0.06em] text-stone-950">
              Descubra o que está se repetindo no seu Intercom.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-stone-900">
              Encontre problemas que já deixaram de ser casos isolados antes que a repetição precise virar incidente para receber atenção.
            </p>
            <a
              href="#diagnostico"
              data-analytics-cta="final_analyze_intercom"
              data-analytics-location="final_cta"
              data-analytics-label="Analisar meu Intercom"
              className="mt-7 inline-flex min-h-13 items-center justify-center rounded-full border border-stone-950 bg-white px-6 text-sm font-black text-stone-950 shadow-[0_6px_0_#0b0b0b] transition hover:translate-y-0.5 hover:shadow-[0_4px_0_#0b0b0b]"
            >
              Analisar meu Intercom
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[min(calc(100%_-_2.5rem),1160px)] flex-wrap justify-between gap-4 py-7 text-xs text-stone-500">
        <span>© 2026 Ohrly</span>
        <span>Problemas dispersos. Impacto consolidado. Decisão priorizada.</span>
      </footer>
    </>
  );
}
