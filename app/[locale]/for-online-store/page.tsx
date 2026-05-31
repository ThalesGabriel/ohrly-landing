"use client";

import Link from "next/link";
import {
  ArrowRight,
  Box,
  Clock3,
  CreditCard,
  FileSearch,
  Lock,
  Mail,
  MessageCircle,
  MousePointer2,
  Route,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
} from "lucide-react";

import { useRef } from "react";
import { trackMetaEvent } from "@/lib/meta-pixel";

const organizedItems = [
  {
    title: "Caminho da venda",
    description: "Por onde o cliente passa antes de comprar?",
    icon: Route,
    className: "bg-sky-50 text-sky-700",
  },
  {
    title: "Sinais de atrito",
    description: "O que pode estar fazendo a pessoa desistir?",
    icon: Workflow,
    className: "bg-teal-50 text-teal-700",
  },
  {
    title: "Ponto de travamento",
    description: "Onde a venda parece perder força?",
    icon: Target,
    className: "bg-violet-50 text-violet-700",
  },
  {
    title: "Repetição",
    description: "Isso acontece uma vez ou vem se repetindo?",
    icon: Clock3,
    className: "bg-orange-50 text-orange-700",
  },
  {
    title: "Próximo dado",
    description: "O que olhar para confirmar o problema?",
    icon: FileSearch,
    className: "bg-emerald-50 text-emerald-700",
  },
];

const journeySteps = [
  { label: "interesse", icon: MousePointer2 },
  { label: "pagamento", icon: CreditCard },
  { label: "atendimento", icon: MessageCircle },
  { label: "entrega", icon: Box },
];

export default function DigitalJourneysLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-center px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="Ohrly home">
            <span className="text-2xl font-semibold tracking-tight text-slate-950">
              Ohrly
            </span>
          </Link>
        </div>
      </header>

      <section className="relative border-b border-slate-200/70 bg-gradient-to-b from-white to-sky-50/50">
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.5fr_1fr] lg:px-8 lg:py-20 xl:gap-20">
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <Sparkles className="h-4 w-4" />
              Análise inicial da sua venda online
            </div>

            <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
              Sua loja online recebe visitas,{" "}
              <span className="text-blue-700">mas não vende</span> como deveria?
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl">
              Antes de gastar mais com anúncio, entenda onde a venda pode estar travando:
              produto, carrinho, pagamento, frete, atendimento ou entrega.
            </p>

            <div className="mt-10 hidden max-w-xl items-center gap-4 lg:flex">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.label} className="flex items-center gap-4">
                    <div className="group flex flex-col items-center gap-2">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 shadow-sm transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-xs font-medium text-slate-500">
                        {step.label}
                      </span>
                    </div>

                    {index < journeySteps.length - 1 && (
                      <div className="h-px w-8 bg-gradient-to-r from-slate-200 to-sky-200" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <RequestCard />
        </div>
      </section>

      <section id="como-funciona" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <Search className="h-5 w-5" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            O que a Ohrly organiza
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            A primeira análise não tenta adivinhar a causa. Ela organiza o que você percebe
            para mostrar onde faz sentido olhar primeiro.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {organizedItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${item.className}`}
                >
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-950">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 lg:px-8">
        <div className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700">
              <Sparkles className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
                Exemplo de análise inicial
              </h2>

              <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-6 text-lg leading-8 text-slate-700">
                <span className="mr-2 text-4xl font-semibold leading-none text-blue-600">
                  “
                </span>
                Pelo que você descreveu, a venda parece perder força entre o interesse e a
                conclusão da compra. Antes de mexer no anúncio, faria sentido observar:
                abandono de carrinho, dúvidas no atendimento, frete, tentativas de pagamento
                e clareza da oferta. A Ohrly não substitui sua decisão. Ela mostra onde olhar
                primeiro.
                <span className="ml-2 text-4xl font-semibold leading-none text-blue-600">
                  ”
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:flex sm:items-center sm:gap-5 sm:p-8">
          <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700 sm:mb-0">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-semibold tracking-tight text-slate-950">
              A Ohrly não promete vender mais.
            </h2>

            <p className="mt-1 text-base leading-7 text-slate-600">
              Ela ajuda você a entender onde a venda online pode estar travando.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export function RequestCard() {
  const hasStartedRef = useRef(false);

  function handleFormStart() {
    if (hasStartedRef.current) return;

    hasStartedRef.current = true;

    trackMetaEvent("form_started", {
      form_name: "analise_inicial_jornada_digital",
      page: "digital_journeys_landing_page",
      source: "landing_jornada_digital",
    });
  }

  return (
    <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7 lg:p-8">
      <form
        action="https://formspree.io/f/mkoygpnk"
        method="POST"
        className="space-y-6"
        onFocus={handleFormStart}
      >
        <input
          type="hidden"
          name="_redirect"
          value="https://www.ohrly.com.br/pt/obrigado"
        />

        <input
          type="hidden"
          name="_subject"
          value="Novo pedido de análise inicial - Ohrly"
        />

        <input
          type="hidden"
          name="source"
          value="landing_jornada_digital"
        />

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-slate-900">
            Email
          </label>

          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 shadow-sm transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
            <Mail className="h-5 w-5 text-slate-400" />

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="seu@email.com"
              className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label htmlFor="journey" className="text-sm font-semibold text-slate-900">
            Qual parte da venda você quer entender?
          </label>

          <input
            id="journey"
            name="parte_da_venda"
            type="text"
            required
            placeholder="Ex: carrinho, pagamento Pix, frete, atendimento no WhatsApp..."
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <div>
          <label htmlFor="context" className="text-sm font-semibold text-slate-900">
            O que está acontecendo hoje?
          </label>

          <textarea
            id="context"
            name="contexto"
            rows={6}
            required
            placeholder="Ex: As pessoas entram na loja, perguntam no WhatsApp, mas não compram. Acho que pode ser frete, preço, pagamento ou falta de confiança."
            className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25"
        >
          Entender onde minha venda trava
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
        </button>

        <p className="flex items-center justify-center gap-2 text-center text-sm text-slate-500">
          <Lock className="h-4 w-4" />
          Não é necessário enviar dados sensíveis agora.
        </p>
      </form>
    </div>
  );
}