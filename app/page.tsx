import type { Metadata } from "next";
import type { ReactNode } from "react";
import { CampaignTracker } from "@/components/campaign/CampaignTracker";
import { CookieConsent } from "@/components/campaign/CookieConsent";
import { DecisionForm } from "@/components/campaign/DecisionForm";
import { MetaPixel } from "@/components/campaign/MetaPixel";

export const metadata: Metadata = {
  title: "Ohrly — Investigue antes de investir",
  description:
    "Investigação para decisões importantes do negócio. Antes de comprometer mais recursos, investigue o que seus dados já conseguem dizer.",
};

function Cta({
  location,
  children,
  secondary = false,
}: {
  location: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <a
      href="#decision-sprint"
      data-track-cta={location}
      className={
        secondary
          ? "w-[100%] inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3.5 font-semibold text-slate-950 transition hover:border-slate-500"
          : "w-[100%] inline-flex items-center justify-center rounded-xl bg-[#ff4b2f] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#ff4b2f]/20 transition hover:-translate-y-0.5 hover:bg-[#ef3f25]"
      }
    >
      {children}
    </a>
  );
}

const decisionCards = [
  ["Mais marketing?", "A falta de novos clientes é mesmo o principal gargalo ou existe outra etapa limitando o crescimento?"],
  ["Mais pessoas?", "A operação está realmente sem capacidade ou existe retrabalho, fricção ou concentração de esforço?"],
  ["Mais tecnologia?", "Existe um problema claro que a nova ferramenta precisa resolver — e como você saberá se resolveu?"],
  ["Mais expansão?", "Você conhece suficientemente o comportamento atual para saber o que realmente faz sentido escalar?"],
];

export default function InvestiguePage() {
  return (
    <main className="min-h-screen bg-[#fbf7f1] text-[#071a2b]">
      <CampaignTracker />
      <MetaPixel />
      <CookieConsent />

      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <a href="#top" className="text-sm font-black uppercase tracking-[0.2em]">
          Ohrly
        </a>
        <a
          href="#decision-sprint"
          data-track-cta="nav"
          className="hidden rounded-full border border-slate-300 bg-white/60 px-4 py-2.5 text-sm font-semibold backdrop-blur md:inline-flex"
        >
          Quero investigar uma decisão
        </a>
      </header>

      <section id="top" className="mx-auto w-full max-w-7xl px-6 pb-20 pt-12 lg:px-8 lg:pb-28 lg:pt-20">
        <div className="inline-flex items-center gap-3 rounded-full border border-[#ff4b2f] bg-white/40 px-4 py-2 text-xs font-black uppercase tracking-[0.16em]">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff4b2f]" />
          Para empresários e líderes
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:items-center">
          <div>
            <h1 className="max-w-5xl font-serif text-[55px] font-medium leading-[0.94] tracking-[-0.055em]">
              Antes de investir na solução, investigue o{" "}
              <span className="decoration-[#ff4b2f] decoration-[3px] underline underline-offset-[10px]">
                problema.
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-8 text-slate-700 md:text-2xl">
              Está pensando em aumentar marketing, contratar, expandir ou implantar tecnologia?
              Investigamos o que seus dados já conseguem dizer antes de você comprometer mais recursos.
            </p>

            <div className="mt-10 flex items-start gap-4 rounded-2xl border border-[#eadfd4] bg-white/50 px-6 py-5">
              <span className="text-4xl text-[#ff4b2f]">→</span>
              <p className="text-lg font-bold tracking-tight">
                Toda decisão ensina, mas algumas custam mais do que precisavam.
              </p>
            </div>
          </div>

          <aside className="rounded-[28px] border border-[#e9ddd1] bg-white/75 p-7 shadow-xl shadow-slate-950/[0.05] backdrop-blur">
            <h2 className="text-2xl font-bold leading-tight">
              Você traz a decisão. Investigamos a hipótese por trás dela.
            </h2>
            <p className="mt-3 leading-7 text-slate-600">
              Sem dashboard por dashboard. Sem promessa de resposta pronta. Sem exigir um time de dados.
            </p>

            <div className="my-6 space-y-3 border-y border-[#eadfd4] py-5 text-sm font-semibold">
              <p>→ Investir mais em aquisição</p>
              <p>→ Contratar ou reorganizar a operação</p>
              <p>→ Expandir um canal ou unidade</p>
              <p>→ Implantar uma nova tecnologia</p>
            </div>

            <div className="text-center">
              <Cta location="hero">Quero investigar minha decisão</Cta>
              <p className="mt-3 text-xs text-slate-500">
                Projeto de consultoria pago, com escopo fechado.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-y border-[#eadfd4] bg-white/45 py-20">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4b2f]">
            O momento certo de investigar
          </p>
          <h2 className="mt-3 max-w-5xl font-serif text-5xl font-medium leading-[1.04] tracking-[-0.04em] md:text-6xl">
            Você talvez esteja prestes a executar a solução antes de entender o problema.
          </h2>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
            O Ohrly entra um passo antes da execução. Não para impedir a decisão, mas para testar o que a sustenta.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {decisionCards.map(([title, text], index) => (
              <article key={title} className="rounded-2xl border border-[#eadfd4] bg-[#fffdf9] p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fff0ea] text-sm font-black text-[#ff4b2f]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 leading-7 text-slate-600">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Cta location="mid_page" secondary>Tenho uma decisão assim</Cta>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4b2f]">
          Como funciona
        </p>
        <h2 className="mt-3 max-w-5xl font-serif text-5xl font-medium leading-[1.04] tracking-[-0.04em] md:text-6xl">
          Decisão, investigação, evidência,  próximo movimento.
        </h2>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {[
            ["1", "Você traz a decisão", "Conte o que está tentando melhorar, o que acredita estar acontecendo e qual movimento está considerando."],
            ["2", "Nós investigamos", "Mapeamos os dados disponíveis, reconstruímos o comportamento relevante e testamos as hipóteses por trás da decisão."],
            ["3", "Você decide com mais evidência", "Mostramos o que os dados sustentam, o que contradizem, o que ainda não permitem afirmar e o que vale testar em seguida."],
          ].map(([n, title, text]) => (
            <article key={n} className="border-b-2 border-[#ff4b2f] pb-5">
              <span className="font-serif text-4xl text-[#ff4b2f]">{n}</span>
              <h3 className="mt-3 text-2xl font-bold">{title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-[#eadfd4] bg-white/45 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4b2f]">
              O que você recebe
            </p>
            <h2 className="mt-3 font-serif text-5xl font-medium leading-[1.04] tracking-[-0.04em]">
              Uma leitura executiva da decisão. Não mais um dashboard.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              O objetivo é fazer a investigação terminar em clareza prática sobre o que vale, ou não vale, fazer agora.
            </p>
          </div>

          <div className="rounded-[28px] bg-[#071a2b] p-8 text-white">
            <h3 className="text-2xl font-bold">Decision Brief Ohrly</h3>
            <div className="mt-6 grid gap-5">
              {[
                ["O que os dados sustentam", "Quais hipóteses ganharam evidência."],
                ["O que os dados contradizem", "Quais suspeitas perderam força."],
                ["O que mudou", "Onde encontramos comportamento relevante e desde quando."],
                ["O que ainda não sabemos", "Quais lacunas impedem uma conclusão segura."],
                ["O que isso muda", "Como a evidência afeta a decisão original."],
                ["O próximo experimento", "O menor movimento capaz de reduzir a incerteza restante."],
              ].map(([title, text]) => (
                <div key={title} className="grid grid-cols-[24px_1fr] gap-2">
                  <span className="text-emerald-400">✓</span>
                  <div>
                    <strong>{title}</strong>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4b2f]">
          Exemplo de investigação
        </p>
        <h2 className="mt-3 max-w-5xl font-serif text-5xl font-medium leading-[1.04] tracking-[-0.04em] md:text-6xl">
          Querer expandir o digital pode revelar um problema anterior.
        </h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-slate-600">
          Um bom resultado não confirma automaticamente a solução que já estava na mesa.
          Ele pode mudar a ordem das decisões.
        </p>

        <div className="mt-10 grid gap-x-8 gap-y-6 rounded-[28px] border border-[#eadfd4] bg-[#fffdf9] p-8 md:grid-cols-2">
          {[
            ["Objetivo inicial", "Expandir as vendas no digital."],
            ["Pergunta aparente", "Como crescer o canal digital?"],
            ["O que a investigação encontrou", "Uma parcela majoritária dos compradores não podia ser acompanhada de forma consistente ao longo do tempo."],
            ["Por que isso importava", "Sem identificar adequadamente a base atual, a empresa tinha baixa capacidade de medir recorrência, comportamento e aprendizado por cliente."],
            ["O que mudou", "A discussão deixou de ser apenas “como vender mais online?” e passou a incluir uma restrição anterior: construir capacidade de conhecer a base que já existe."],
            ["Valor da investigação", "Encontrar um problema anterior à solução considerada — antes de comprometer mais recursos."],
          ].map(([label, text], index) => (
            <div key={label} className={`${![0, 1].includes(index) ? 'border-t' : ''} border-[#eadfd4] pt-4`}>
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#ff4b2f]">{label}</p>
              <p className="mt-2 leading-7 text-slate-700">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Cta location="case">Quero investigar antes de investir</Cta>
        </div>
      </section>

      <section id="decision-sprint" data-track-offer className="border-t border-[#eadfd4] bg-white/45 py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[.85fr_1.15fr] lg:px-8">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-[#ff4b2f]">
              Ohrly Decision Sprint
            </p>
            <h2 className="mt-3 font-serif text-5xl font-medium leading-[1.04] tracking-[-0.04em]">
              Uma investigação focada em uma decisão importante do seu negócio.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Começamos pela decisão, entendemos o contexto, avaliamos o que seus sistemas já registram e conduzimos uma investigação com escopo fechado.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Prazo", "10–15 dias úteis"],
                ["Escopo", "1 decisão principal"],
                ["Entrega", "Decision Brief + reunião"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-[#fff0ea] p-4">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
                  <p className="mt-1 font-bold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div data-track-form className="rounded-[28px] border border-[#eadfd4] bg-white p-7 shadow-xl shadow-slate-950/[0.05] md:p-9">
            <h3 className="font-serif text-4xl font-medium leading-tight tracking-[-0.03em]">
              Conte a decisão que você está considerando.
            </h3>
            <p className="mt-3 leading-7 text-slate-600">
              Vamos avaliar se existe uma questão suficientemente clara e investigável para um Decision Sprint.
            </p>
            <div className="mt-7">
              <DecisionForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#eadfd4] px-6 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Ohrly — Investigue antes de investir.</p>
          <div className="flex gap-5">
            <a href="/privacidade" className="underline">Privacidade</a>
            <a href="#decision-sprint" data-track-cta="footer" className="font-semibold text-slate-800">
              Investigar uma decisão →
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
