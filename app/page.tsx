import { AttributedLink } from "@/components/attributed-link";
import { LiveSignalEvidence } from "@/components/live-signal-evidence";
import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadForm } from "@/components/lead-form";
import { SiteHeader } from "@/components/site-header";

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
      <SiteHeader />

      <main>
        {/* =========================================================
            HERO MOBILE
        ========================================================== */}
        <section
          className="pb-12 pt-7 lg:hidden"
          data-analytics-section="hero_mobile"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1160px)]">
            <h1 className="text-[clamp(2.55rem,11.5vw,3.35rem)] font-black leading-[.94] tracking-[-0.065em] text-stone-950">
              Quantos problemas do seu SaaS B2B ainda parecem{" "}
              <span className="text-[#ff6f1f]">casos isolados?</span>
            </h1>

            <p className="mt-5 text-[1.02rem] leading-7 text-stone-700">
              Descubra quais problemas começaram a se repetir no seu{" "}
              <strong className="text-[#ff6f1f]">Intercom</strong> e onde vale
              agir primeiro.
            </p>

            <AttributedLink
              href="/demo"
              data-ohrly-cta="hero_demo"
              data-analytics-cta="hero_mobile_view_demo"
              data-analytics-location="hero_mobile"
              data-analytics-label="Ver análise de exemplo"
              className="mt-6 inline-flex min-h-13 w-full items-center justify-center rounded-full border border-[#ff6f1f] bg-[#fffdf9] px-5 text-sm font-black text-stone-950 shadow-[0_6px_0_#ff6f1f] transition active:translate-y-0.5 active:shadow-[0_3px_0_#ff6f1f]"
            >
              Ver análise de exemplo
            </AttributedLink>

            <a
              href="#diagnostico"
              data-ohrly-cta="hero_diagnostic"
              data-analytics-cta="hero_mobile_analyze_intercom"
              data-analytics-location="hero_mobile"
              data-analytics-label="Analisar meu Intercom"
              className="mt-4 flex min-h-10 items-center justify-center text-sm font-black text-stone-700"
            >
              Analisar meu Intercom →
            </a>

            <p className="mt-2 text-center text-[11px] font-medium text-stone-400">
              1 minuto · dados fictícios · sem cadastro · sem conectar nada
            </p>

            {/* Preview imediato do produto */}
            <div className="mt-6 overflow-hidden rounded-[20px] border border-stone-200 bg-[#fffdf9] shadow-[0_12px_35px_rgba(29,20,12,.06)]">
              <div className="flex items-center justify-between gap-3 border-b border-stone-200 px-4 py-3">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] text-[#ff6f1f]">
                    Problema emergente
                  </span>

                  <strong className="mt-1 block text-[15px] font-black tracking-[-0.03em] text-stone-950">
                    Exportação de relatórios
                  </strong>
                </div>

                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[9px] font-black uppercase tracking-wide text-orange-700">
                  Exemplo
                </span>
              </div>

              <div className="grid grid-cols-3 divide-x divide-stone-200">
                <div className="p-3.5">
                  <strong className="block text-xl font-black tracking-[-0.05em] text-stone-950">
                    2 → 19
                  </strong>
                  <span className="mt-1 block text-[9px] leading-4 text-stone-500">
                    ocorrências
                  </span>
                </div>

                <div className="p-3.5">
                  <strong className="block text-xl font-black tracking-[-0.05em] text-stone-950">
                    11
                  </strong>
                  <span className="mt-1 block text-[9px] leading-4 text-stone-500">
                    contas
                  </span>
                </div>

                <div className="p-3.5">
                  <strong className="block text-xl font-black tracking-[-0.05em] text-stone-950">
                    4 sem.
                  </strong>
                  <span className="mt-1 block text-[9px] leading-4 text-stone-500">
                    persistindo
                  </span>
                </div>
              </div>

              <AttributedLink
                href="/demo"
                data-ohrly-cta="hero_demo"
                data-analytics-cta="hero_mobile_preview_demo"
                data-analytics-location="hero_mobile_preview"
                data-analytics-label="Entender esta análise"
                className="flex min-h-11 items-center justify-between border-t border-stone-200 px-4 text-xs font-black text-stone-700"
              >
                Entender como chegamos nisso
                <span className="text-[#ff6f1f]">→</span>
              </AttributedLink>
            </div>
          </div>
        </section>

        {/* =========================================================
            HERO DESKTOP
        ========================================================== */}
        <section
          className="hidden pb-20 pt-16 lg:block"
          data-analytics-section="hero_desktop"
        >
          <div className="mx-auto w-[min(calc(100%_-_2.5rem),1160px)]">
            <div className="max-w-5xl">
              <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
                <span className="h-[3px] w-7 rounded-full bg-[#ff6f1f]" />
                Diagnóstico para SaaS B2B
              </div>

              <h1 className="max-w-5xl text-[clamp(3.5rem,7vw,6.4rem)] font-black leading-[.94] tracking-[-0.07em] text-stone-950">
                Quantos problemas do seu SaaS B2B ainda parecem{" "}
                <span className="text-[#ff6f1f]">casos isolados?</span>
              </h1>

              <p className="mt-7 max-w-3xl text-[clamp(1.05rem,1.8vw,1.25rem)] leading-8 text-stone-800">
                Analisamos seu histórico do{" "}
                <strong className="text-[#ff6f1f]">Intercom</strong> para
                descobrir quais problemas deixaram de ser casos isolados,
                consolidamos o impacto deles e mostramos onde agir antes que a
                repetição vire custo normalizado.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <AttributedLink
                  href="/demo"
                  data-ohrly-cta="hero_demo"
                  data-analytics-cta="hero_desktop_view_demo"
                  data-analytics-location="hero_desktop"
                  data-analytics-label="Ver uma análise de exemplo"
                  className="inline-flex min-h-13 items-center justify-center rounded-full border border-[#ff6f1f] bg-[#fffdf9] px-6 text-sm font-black text-stone-950 shadow-[0_6px_0_#ff6f1f] transition hover:translate-y-0.5 hover:shadow-[0_4px_0_#ff6f1f]"
                >
                  Ver uma análise de exemplo
                </AttributedLink>

                <a
                  href="#diagnostico"
                  data-ohrly-cta="hero_diagnostic"
                  data-analytics-cta="hero_desktop_analyze_intercom"
                  data-analytics-location="hero_desktop"
                  data-analytics-label="Analisar meu Intercom"
                  className="inline-flex min-h-13 items-center justify-center px-4 text-sm font-black text-stone-950 transition hover:text-[#ff6f1f]"
                >
                  Analisar meu Intercom →
                </a>
              </div>

              <p className="mt-4 text-sm text-stone-500">
                Demo de 1 minuto. Sem cadastro e sem conectar nada.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================
            PROVA — COMPARTILHADA
        ========================================================== */}
        <section
          className="py-14 lg:py-18"
          data-analytics-section="proof"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1160px)] sm:w-[min(calc(100%_-_2.5rem),1160px)]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f] sm:text-[11px]">
              O que o Ohrly encontra
            </p>

            <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4.3vw,3.7rem)] font-black leading-[1.02] tracking-[-0.055em] text-stone-950">
              Um problema pode parecer pequeno até você juntar todas as vezes em
              que ele aconteceu.
            </h2>

            <div className="mt-7 overflow-hidden rounded-[22px] border border-stone-200 bg-[#fffdf9] shadow-[0_18px_50px_rgba(29,20,12,.08)] sm:mt-8">
              <div className="flex flex-col justify-between gap-4 border-b border-stone-200 p-5 sm:flex-row sm:items-start sm:p-6">
                <div>
                  <h3 className="text-xl font-black tracking-[-0.035em] text-stone-950 sm:text-2xl">
                    Falhas recorrentes na exportação de relatórios
                  </h3>

                  <p className="mt-1 text-sm leading-5 text-stone-500">
                    Um problema que deixou de parecer um conjunto de ocorrências
                    isoladas.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-black uppercase tracking-wide text-orange-700">
                  Exemplo ilustrativo
                </span>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3">
                {metrics.map(([label, value, note], index) => (
                  <div
                    key={label}
                    className={`
                      border-stone-200 p-4 sm:p-6
                      ${index % 2 === 0 ? "border-r" : ""}
                      ${index < 4 ? "border-b" : ""}
                      lg:border-r-0 lg:border-b-0
                      ${index < 3 ? "lg:border-b" : ""}
                      ${index % 3 !== 2 ? "lg:border-r" : ""}
                    `}
                  >
                    <span className="block text-[9px] font-black uppercase tracking-[0.12em] text-stone-500 sm:text-[10px]">
                      {label}
                    </span>

                    <strong className="mt-2 block text-xl font-black tracking-[-0.04em] text-stone-950 sm:text-2xl">
                      {value}
                    </strong>

                    <small className="mt-1 hidden text-sm leading-5 text-stone-600 sm:block">
                      {note}
                    </small>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <p className="max-w-2xl text-[11px] leading-5 text-stone-500 sm:text-xs">
                Valor exposto representa o valor associado às contas afetadas e
                não significa, necessariamente, receita perdida.
              </p>

              <AttributedLink
                href="/demo"
                data-ohrly-cta="hero_demo"
                data-analytics-cta="proof_view_demo"
                data-analytics-location="proof"
                data-analytics-label="Ver análise completa"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-black text-stone-950 transition hover:text-[#ff6f1f]"
              >
                Ver como chegamos nisso
                <span className="text-[#ff6f1f]">→</span>
              </AttributedLink>
            </div>
          </div>
        </section>

        {/* =========================================================
            FORMULÁRIO
        ========================================================== */}
        <section
          id="diagnostico"
          className="py-16 lg:py-20"
          data-analytics-section="diagnostic_form"
        >
          <div className="mx-auto grid w-[min(calc(100%_-_2rem),1160px)] gap-8 sm:w-[min(calc(100%_-_2.5rem),1160px)] lg:grid-cols-[.9fr_1.1fr] lg:items-start lg:gap-16">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f] sm:text-[11px]">
                Com seus próprios dados
              </p>

              <h2 className="mt-3 max-w-xl text-[clamp(2.2rem,4.8vw,4.2rem)] font-black leading-[.98] tracking-[-0.06em] text-stone-950">
                Quer descobrir o que deixou de ser{" "}
                <span className="text-[#ff6f1f]">caso isolado</span> no seu
                Intercom?
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-6 text-stone-600 sm:text-base sm:leading-7">
                Conte um pouco sobre sua operação. Não é necessário conectar o
                Intercom agora.
              </p>

              <div className="mt-6 hidden gap-3 text-sm text-stone-600 sm:grid">
                <Bullet>
                  Começamos com o histórico que sua operação já possui.
                </Bullet>

                <Bullet>
                  Não exigimos novo tracking para a análise inicial.
                </Bullet>

                <Bullet>
                  O objetivo é encontrar padrões que hoje parecem ocorrências
                  independentes.
                </Bullet>
              </div>
            </div>

            <aside
              data-analytics-section="diagnostic_form_card"
              className="rounded-[24px] border border-stone-200 bg-[#fffdf9] p-5 shadow-[0_18px_50px_rgba(29,20,12,.08)] sm:p-8"
            >
              <h3 className="text-xl font-black leading-tight tracking-[-0.04em] text-stone-950 sm:text-2xl">
                Quero descobrir o que está se repetindo
              </h3>

              <p className="mt-2 text-sm leading-6 text-stone-500">
                Conte o mínimo necessário para entendermos sua operação.
              </p>

              <LeadForm />
            </aside>
          </div>
        </section>

        {/* =========================================================
            PROBLEMA
        ========================================================== */}
        <section
          className="bg-stone-950 py-16 text-white lg:py-20"
          data-analytics-section="problem"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1160px)] sm:w-[min(calc(100%_-_2.5rem),1160px)]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-300 sm:text-[11px]">
              O problema
            </p>

            <h2 className="mt-3 max-w-4xl text-[clamp(2rem,4.3vw,3.7rem)] font-black leading-[1.02] tracking-[-0.055em]">
              Seu time resolve casos. O problema é perceber quando eles deixaram
              de ser casos.
            </h2>

            <p className="mt-5 max-w-3xl text-sm leading-6 text-stone-300 sm:text-base sm:leading-7">
              Um cliente reclama, o suporte resolve, outro cliente encontra algo
              parecido e o ciclo continua. Sem consolidar a repetição, o padrão
              só fica evidente quando já ganhou escala.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-2.5">
              {[
                "Cliente reclama",
                "Suporte resolve",
                "Outro cliente reclama",
                "A repetição cresce",
                "O padrão fica óbvio tarde demais",
              ].map((item, index, list) => (
                <div key={item} className="contents">
                  <span className="rounded-full border border-white/15 bg-white/[.04] px-4 py-2.5 text-xs font-bold">
                    {item}
                  </span>

                  {index < list.length - 1 ? (
                    <span className="hidden font-black text-orange-300 sm:inline">
                      →
                    </span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            COMO FUNCIONA
        ========================================================== */}
        <section
          className="py-16 lg:py-20"
          data-analytics-section="how"
        >
          <div className="mx-auto w-[min(calc(100%_-_2rem),1160px)] sm:w-[min(calc(100%_-_2.5rem),1160px)]">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ff6f1f] sm:text-[11px]">
              Como funciona
            </p>

            <h2 className="mt-3 text-[clamp(2rem,4.3vw,3.7rem)] font-black leading-[1.02] tracking-[-0.055em] text-stone-950">
              Conectamos. Consolidamos. Priorizamos.
            </h2>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              {steps.map((step, index) => (
                <article
                  key={step.title}
                  className="rounded-2xl border border-stone-200 bg-[#fffdf9] p-5 sm:p-6"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6f1f] text-sm font-black text-white">
                    {index + 1}
                  </div>

                  <h3 className="mt-5 text-xl font-black tracking-[-0.035em] text-stone-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-stone-500">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA FINAL
        ========================================================== */}
        <section
          className="bg-[#ff6f1f] py-16 lg:py-20"
          data-analytics-section="final_cta"
        >
          <div className="mx-auto max-w-4xl px-5 text-center">
            <h2 className="text-[clamp(2.2rem,5vw,4.35rem)] font-black leading-none tracking-[-0.06em] text-stone-950">
              Descubra o que está se repetindo no seu Intercom.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-stone-900 sm:text-base sm:leading-7">
              Encontre problemas que já deixaram de ser casos isolados antes
              que a repetição precise virar incidente para receber atenção.
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#diagnostico"
                data-ohrly-cta="hero_diagnostic"
                data-analytics-cta="final_analyze_intercom"
                data-analytics-location="final_cta"
                data-analytics-label="Analisar meu Intercom"
                className="inline-flex min-h-13 w-full items-center justify-center rounded-full border border-stone-950 bg-white px-6 text-sm font-black text-stone-950 shadow-[0_6px_0_#0b0b0b] transition hover:translate-y-0.5 hover:shadow-[0_4px_0_#0b0b0b] sm:w-auto"
              >
                Analisar meu Intercom
              </a>

              <AttributedLink
                href="/demo"
                data-ohrly-cta="hero_demo"
                data-analytics-cta="final_view_demo"
                data-analytics-location="final_cta"
                data-analytics-label="Ver análise de exemplo"
                className="inline-flex min-h-11 items-center justify-center px-4 text-sm font-black text-stone-950"
              >
                Ver análise de exemplo →
              </AttributedLink>
            </div>
          </div>
        </section>
        <LiveSignalEvidence />

      </main>

      <footer className="mx-auto flex w-[min(calc(100%_-_2rem),1160px)] flex-wrap justify-between gap-4 py-7 text-xs text-stone-500 sm:w-[min(calc(100%_-_2.5rem),1160px)]">
        <span>© 2026 Ohrly</span>
        <span>
          Problemas dispersos. Impacto consolidado. Decisão priorizada.
        </span>
      </footer>
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#ff6f1f]" />
      <span>{children}</span>
    </div>
  );
}
