import type { Metadata } from "next";
import { CookieConsent } from "@/components/cookie-consent";
import { DemoExperience } from "@/components/demo-experience";
import { SiteHeader } from "@/components/site-header";
import { AttributedLink } from "@/components/attributed-link";

export const metadata: Metadata = {
  title: "Demo interativa | Ohrly",
  description:
    "Veja como o Ohrly transforma casos dispersos do Intercom em problemas recorrentes, impacto consolidado e uma prioridade operacional.",
};

export default function DemoPage() {
  return (
    <>
      <CookieConsent />
      <SiteHeader />

      <main>
        {/* =====================================================
            MOBILE INTRO
        ====================================================== */}
        <section
          className="pt-5 lg:hidden"
          data-analytics-section="demo_mobile"
        >
          <div className="mx-auto w-[calc(100%_-_1.5rem)]">
            <div className="mb-5">
              <div className="flex items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#ff6f1f]">
                  <span className="h-[3px] w-5 rounded-full bg-[#ff6f1f]" />
                  Demo interativa
                </div>

                <span className="rounded-full border border-stone-200 bg-[#fffdf9] px-2.5 py-1 text-[9px] font-black text-stone-500">
                  ~1 minuto
                </span>
              </div>

              <h1 className="mt-4 text-[2.4rem] font-black leading-[.94] tracking-[-0.065em] text-stone-950">
                Veja quando um problema deixa de parecer{" "}
                <span className="text-[#ff6f1f]">caso isolado.</span>
              </h1>

              <p className="mt-4 text-[15px] leading-6 text-stone-600">
                Acompanhe um exemplo de como conversas separadas podem revelar
                o mesmo problema acontecendo repetidamente.
              </p>

              <p className="mt-3 text-[10px] font-medium text-stone-400">
                Dados fictícios · sem cadastro · sem conectar nada
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            DESKTOP INTRO
        ====================================================== */}
        <section
          className="hidden pt-14 lg:block"
          data-analytics-section="demo_desktop"
        >
          <div className="mx-auto w-[min(calc(100%_-_2.5rem),1160px)]">
            <div className="max-w-4xl">
              <div className="mb-5 inline-flex items-center gap-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#ff6f1f]">
                <span className="h-[3px] w-7 rounded-full bg-[#ff6f1f]" />
                Análise de exemplo
              </div>

              <h1 className="text-[clamp(2.7rem,6vw,5.15rem)] font-black leading-[.98] tracking-[-0.065em] text-stone-950">
                Veja um problema deixar de parecer{" "}
                <span className="text-[#ff6f1f]">caso isolado.</span>
              </h1>

              <p className="mt-5 max-w-3xl text-[clamp(1rem,1.7vw,1.18rem)] leading-8 text-stone-700">
                Acompanhe uma simulação de como conversas dispersas no Intercom
                podem se transformar em um problema recorrente, ganhar dimensão
                operacional e virar uma prioridade concreta de investigação.
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-stone-200 bg-[#fffdf9] px-3 py-2 text-[11px] font-bold text-stone-500">
                <span className="h-2 w-2 rounded-full bg-[#ff6f1f]" />
                Dados sintéticos • cerca de 1 minuto
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            SHARED DEMO EXPERIENCE
            Important: mounted only once. DemoExperience already
            renders its own mobile/desktop presentation internally.
        ====================================================== */}
        <section
          className="pb-8 lg:pb-14 lg:pt-10"
          data-analytics-section="demo_experience"
        >
          <div className="mx-auto w-[calc(100%_-_1.5rem)] lg:w-[min(calc(100%_-_2.5rem),1160px)]">
            <DemoExperience />
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <section
          className="bg-[#ff6f1f] py-12 lg:py-16"
          data-analytics-section="demo_final_cta"
        >
          <div className="mx-auto max-w-4xl px-5 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.18em] text-stone-800 sm:text-[10px]">
              Agora com os seus dados
            </p>

            <h2 className="mt-3 text-[clamp(2.15rem,5vw,3.8rem)] font-black leading-[.98] tracking-[-0.06em] text-stone-950">
              Descubra o que já deixou de ser caso isolado no seu Intercom.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-stone-800 lg:text-base">
              Não é necessário conectar nada agora.
            </p>

            <AttributedLink
              href="/#diagnostico"
              data-analytics-cta="demo_page_final_analyze_intercom"
              data-analytics-location="demo_page_final_cta"
              data-analytics-label="Analisar meu Intercom"
              className="mt-6 inline-flex min-h-13 w-full items-center justify-center rounded-full border border-stone-950 bg-white px-6 text-sm font-black text-stone-950 shadow-[0_6px_0_#0b0b0b] transition active:translate-y-0.5 active:shadow-[0_3px_0_#0b0b0b] sm:w-auto"
            >
              Analisar meu Intercom
            </AttributedLink>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex w-[calc(100%_-_2rem)] flex-col gap-2 py-6 text-center text-[10px] text-stone-500 sm:w-[min(calc(100%_-_2.5rem),1160px)] sm:flex-row sm:justify-between sm:text-left sm:text-xs">
        <span>© 2026 Ohrly</span>
        <span>Problemas dispersos. Impacto consolidado. Decisão priorizada.</span>
      </footer>
    </>
  );
}
