import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacidade — Ohrly",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fbf7f1] px-6 py-16 text-[#071a2b]">
      <article className="mx-auto max-w-3xl">
        <a className="text-sm font-bold" href="/investigue">← Voltar</a>
        <h1 className="mt-8 font-serif text-5xl font-medium tracking-tight">Privacidade</h1>

        <div className="mt-8 space-y-8 leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-bold text-slate-950">Importante</h2>
            <p className="mt-2">
              Esta é uma página técnica inicial. Antes da publicação, substitua
              este conteúdo pela política formal da Ohrly e valide o tratamento
              real de dados com quem cuida de LGPD.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950">Analytics</h2>
            <p className="mt-2">
              Quando autorizado, registramos eventos de navegação como
              visualização, engajamento, scroll, cliques e etapas do formulário.
              O texto digitado no formulário não é armazenado na tabela de
              eventos analíticos.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950">Formulário</h2>
            <p className="mt-2">
              As informações fornecidas voluntariamente são armazenadas
              separadamente e usadas para avaliar a solicitação de contato e a
              possibilidade de um Decision Sprint.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950">Marketing</h2>
            <p className="mt-2">
              Meta Pixel e Conversions API só são usados quando a categoria de
              marketing é autorizada.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-950">Antes de publicar</h2>
            <p className="mt-2">
              Inclua controlador, contato, bases legais, prazos de retenção,
              direitos do titular e demais informações aplicáveis à operação real.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
