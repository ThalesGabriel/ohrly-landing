"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileSpreadsheet,
  FolderOpen,
  Gift,
  Info,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  PackageCheck,
  Rocket,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
  X,
  Target,
  File,
  FileText,
} from "lucide-react";
import { trackMetaEvent } from "@/lib/meta-pixel";

const CONTACT_EMAIL = "taraujo@ohrly.com.br";

const journeySteps = [
  {
    label: "interesse",
    icon: User,
  },
  {
    label: "pagamento",
    icon: CreditCard,
  },
  {
    label: "atendimento",
    icon: MessageCircle,
  },
  {
    label: "entrega",
    icon: Truck,
  },
];

const howItWorksSteps = [
  {
    title: "Contexto",
    description: "Fale sobre seu negócio, canais, produtos e objetivos.",
    icon: ClipboardList,
  },
  {
    title: "Dados disponíveis",
    description: "Descubra quais relatórios sua plataforma já permite exportar.",
    icon: FolderOpen,
  },
  {
    title: "Análise inicial",
    description: "Você recebe uma leitura objetiva com sinais e próximos passos.",
    icon: BarChart3,
  },
];

const platforms = [
  "Nuvemshop",
  "Yampi",
  "Shopify",
  "WooCommerce",
  "Loja Integrada",
  "Bagy",
  "Instagram",
  "WhatsApp",
  "Outros sistemas",
];

function ExampleInputAndReportSection() {
  const exampleRows = [
    {
      pedido: "#1048",
      data: "12/05/2026",
      produto: "Tênis casual",
      status: "Pago",
      pagamento: "Pix",
      valor: "R$ 189,90",
      canal: "Instagram",
    },
    {
      pedido: "#1049",
      data: "12/05/2026",
      produto: "Bolsa feminina",
      status: "Carrinho abandonado",
      pagamento: "Cartão",
      valor: "R$ 249,90",
      canal: "Google",
    },
    {
      pedido: "#1050",
      data: "13/05/2026",
      produto: "Camiseta básica",
      status: "Pagamento recusado",
      pagamento: "Cartão",
      valor: "R$ 79,90",
      canal: "Instagram",
    },
  ];

  const reportItems = [
    {
      title: "O que os dados permitem observar",
      description:
        "Pedidos, produtos, status, canais e sinais de abandono ou pagamento recusado.",
    },
    {
      title: "Onde a venda pode estar travando",
      description:
        "Ex: interesse existe, mas parte dos clientes parece parar entre carrinho e pagamento.",
    },
    {
      title: "Quais sinais merecem atenção",
      description:
        "Ex: concentração de abandono em determinados produtos, canais ou formas de pagamento.",
    },
    {
      title: "Qual próximo dado ajudaria mais",
      description:
        "Ex: carrinhos abandonados, pagamentos não aprovados ou dúvidas recebidas no WhatsApp.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          O que você pode enviar e o que recebe de volta
        </h2>

        <p className="mt-4 text-base leading-7 text-slate-600">
          Não precisa preparar um arquivo perfeito. Se sua plataforma exporta pedidos,
          produtos, carrinhos ou pagamentos, já dá para começar uma análise inicial.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <FileSpreadsheet className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Exemplo de dados enviados
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Uma planilha simples exportada da sua plataforma.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <table className="min-w-[680px] w-full border-separate border-spacing-0 text-left text-sm">
              <thead>
                <tr>
                  {[
                    "Pedido",
                    "Data",
                    "Produto",
                    "Status",
                    "Pagamento",
                    "Valor",
                    "Canal",
                  ].map((header) => (
                    <th
                      key={header}
                      className="border-b border-slate-200 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {exampleRows.map((row) => (
                  <tr key={row.pedido} className="text-slate-700">
                    <td className="border-b border-slate-100 px-3 py-3 font-semibold text-slate-950">
                      {row.pedido}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      {row.data}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      {row.produto}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                        {row.status}
                      </span>
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      {row.pagamento}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      {row.valor}
                    </td>
                    <td className="border-b border-slate-100 px-3 py-3">
                      {row.canal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5">
            <p className="text-sm leading-6 text-slate-600">
              Também podem ajudar: relatório de produtos, carrinhos abandonados,
              pagamentos não aprovados, visitas por canal e mensagens do atendimento.
            </p>
          </div>
        </article>

        <article className="rounded-[2rem] border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
              <BarChart3 className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Exemplo de análise recebida
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Uma leitura curta para entender onde olhar primeiro.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-blue-100 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                Análise gratuita
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                Leitura inicial
              </span>
            </div>

            <h4 className="mt-5 text-xl font-semibold tracking-tight text-slate-950">
              A venda parece perder força entre carrinho e pagamento
            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Já existe informação suficiente para observar como os dados se comportam ao longo
              da jornada. O interesse existe, mas parte da jornada pode estar travando antes da
              conclusão.
            </p>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
              <p className="text-sm font-semibold text-emerald-950">
                Próximo passo sugerido
              </p>
              <p className="mt-1 text-sm leading-6 text-emerald-900">
                Antes de aumentar o orçamento em anúncio, faz sentido entender melhor
                abandono de carrinho, recusas de pagamento e dúvidas no atendimento.
              </p>
            </div>
          </div>
        </article>
      </div>

      <article className="mt-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <FileText className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-950">
              Como a Ohrly organiza essa interpretação
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              A análise gratuita resume os sinais em pontos fáceis de entender.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {reportItems.map((item) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-5"
            >
              <CheckCircle2 className="h-5 w-5 text-blue-700" />

              <p className="mt-4 text-sm font-semibold leading-5 text-slate-950">
                {item.title}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

export default function DigitalJourneysLandingPage() {
  const [isNextStepOpen, setIsNextStepOpen] = useState(false);

  function scrollToOffer() {
    document.getElementById("oferta")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    trackMetaEvent("cta_scroll_to_offer", {
      page: "digital_journeys_landing_page",
      source: "hero_card",
    });
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fbff] text-slate-950">
      <Header />

      <HeroSection onScrollToOffer={scrollToOffer} />

      <WhatIsOhrlyForMerchantsSection />

      <HowItWorksSection />

      <ExampleInputAndReportSection />

      <FreeAnalysisOfferSection
        onOpenNextStep={() => setIsNextStepOpen(true)}
      />

      <NextStepSection />

      <PlatformsSection />

      <FinalReassuranceSection />

      {isNextStepOpen && (
        <FreeAnalysisNextStepModal
          onClose={() => setIsNextStepOpen(false)}
        />
      )}
    </main>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-center px-5 sm:h-20 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ohrly home">
          <span className="text-3xl font-semibold tracking-[-0.06em] text-slate-950">
            Ohrly
          </span>
        </Link>
      </div>
    </header>
  );
}

function HeroSection({
  onScrollToOffer,
}: {
  onScrollToOffer: () => void;
}) {
  return (
    <section className="relative border-b border-slate-200/70 bg-gradient-to-b from-white to-sky-50/70">
      <div className="absolute inset-y-0 right-0 hidden w-1/2 rounded-bl-[8rem] bg-blue-100/30 lg:block" />
      <div className="absolute right-10 top-32 hidden h-40 w-40 rounded-full bg-blue-200/20 blur-3xl lg:block" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-6 lg:grid-cols-[1.25fr_0.85fr] lg:px-8 lg:py-20 xl:gap-20">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-50">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            Análise inicial da sua venda online
            <ChevronRight className="h-4 w-4" />
          </div>

          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
            Sua produto é bom, mas não vende como deveria?
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-xl">
            Antes de gastar mais com anúncio, entenda onde a venda pode estar travando:
            Produto, carrinho, pagamento, frete, atendimento ou entrega.
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
            {journeySteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.label} className="relative flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="text-xs font-semibold text-slate-600">
                    {step.label}
                  </span>

                  {index < journeySteps.length - 1 && (
                    <div className="absolute left-[calc(50%+2rem)] top-7 hidden h-px w-[calc(100%-1rem)] border-t border-dashed border-blue-200 sm:block" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-7 text-center shadow-2xl shadow-blue-100/70">
            <h2 className="mt-7 text-2xl font-semibold tracking-tight text-slate-950">
              Comece com uma análise gratuita
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Muitos relatórios que sua loja já exporta podem ser suficientes para uma
              primeira leitura.
            </p>

            <button
              type="button"
              onClick={onScrollToOffer}
              className="mt-7 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800 hover:shadow-xl hover:shadow-blue-700/25"
            >
              Ver como funciona
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="mt-5 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
              <Lock className="h-4 w-4" />
              Não é necessário enviar dados sensíveis agora.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatIsOhrlyForMerchantsSection() {
  return (
    <section id="oferta" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-sm">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-blue-700 to-blue-500 p-8 text-white sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white">
              <Sparkles className="h-4 w-4" />
              O que é o Ohrly?
            </div>

            <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
              Uma leitura simples para entender onde sua venda pode estar travando.
            </h2>

            <p className="mt-5 text-base leading-8 text-blue-50">
              O Ohrly olha para os dados que sua loja já gera: Pedidos, produtos,
              carrinhos, pagamentos ou atendimento... E organiza esses sinais em uma
              explicação mais clara sobre o que pode estar dificultando a compra.
            </p>

            <div className="mt-7 rounded-2xl border border-white/20 bg-white/10 p-5">
              <p className="text-base leading-7 text-blue-50">
                O Ohrly ajuda lojistas a transformar relatórios soltos da loja em uma
                leitura clara sobre onde a jornada de venda pode estar perdendo força.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10 flex">
            <div className="grid gap-4 m-auto">
              <OhrlyExplanationItem
                icon={FileSpreadsheet}
                title="Você não precisa entender de dados"
                description="Você envia relatórios simples exportados da sua plataforma. O Ohrly organiza os sinais para você."
              />

              <OhrlyExplanationItem
                icon={Search}
                title="A análise mostra onde olhar primeiro"
                description="A leitura ajuda a entender se o atrito parece estar no produto, carrinho, pagamento, frete, atendimento ou entrega."
              />

              <OhrlyExplanationItem
                icon={ShieldCheck}
                title="Não é promessa de vender mais"
                description="O Ohrly não substitui sua decisão. Ele ajuda você a enxergar melhor o que seus dados já podem estar indicando."
              />

              <OhrlyExplanationItem
                icon={Rocket}
                title="O plano de ação vem depois"
                description="A análise inicial é gratuita. Se fizer sentido, você pode transformar a leitura em um plano prático do que testar ou ajustar primeiro."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OhrlyExplanationItem({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileSpreadsheet;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
        <Icon className="h-5 w-5" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Como funciona a análise
        </h2>
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-3">
        {howItWorksSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article
              key={step.title}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start gap-5">
                <div className="flex flex-col items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-lg font-semibold text-blue-700">
                    {index + 1}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-6 text-slate-950">
                    {index + 1}. {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function FreeAnalysisOfferSection({
  onOpenNextStep,
}: {
  onOpenNextStep: () => void;
}) {
  function handleFreeAnalysisClick() {
    trackMetaEvent("free_analysis_interest", {
      offer: "free_initial_analysis",
      page: "digital_journeys_landing_page",
      source: "free_analysis_offer_section",
    });

    onOpenNextStep();
  }

  function handleActionPlanClick() {
    trackMetaEvent("action_plan_offer_interest", {
      offer: "action_plan",
      original_price: 97,
      validation_price: 49,
      page: "digital_journeys_landing_page",
      source: "action_plan_offer_section",
    });

    onOpenNextStep();
  }

  return (
    <section className="scroll-mt-24 bg-white/50 py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <Sparkles className="h-5 w-5" />
          </div>

          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Comece com uma análise gratuita
          </h2>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Envie os relatórios que sua loja já consegue exportar. O Ohrly analisa o que é
            possível observar e mostra onde a venda pode estar travando.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[2rem] border border-blue-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <Gift className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
              Análise inicial gratuita
            </h3>

            <p className="mt-4 text-base leading-7 text-slate-600">
              A primeira análise serve para entender se seus dados já permitem uma leitura
              útil da jornada de venda. Você não paga para descobrir se faz sentido continuar.
            </p>

            <div className="mt-6">
              <div className="flex items-end gap-2">
                <span className="text-lg font-semibold text-slate-950">R$</span>
                <span className="text-6xl font-semibold tracking-tight text-slate-950">
                  0
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                preço de validação
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">
              <p className="text-sm font-semibold text-blue-950">
                O que você recebe gratuitamente:
              </p>

              <ul className="mt-4 space-y-3">
                {[
                  "Quais sinais seus dados permitem observar.",
                  "Onde a venda parece estar travando.",
                  "Quais relatórios ajudam a melhorar a leitura.",
                  "Se faz sentido transformar a análise em um plano de ação.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-blue-950 items-center">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleFreeAnalysisClick}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
            >
              Quero uma análise gratuita
              <ArrowRight className="h-5 w-5" />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-center text-sm text-slate-500">
              <ShieldCheck className="h-4 w-4" />
              Não é necessário enviar dados sensíveis.
            </p>
          </article>

          <article className="relative overflow-hidden rounded-[2rem] border border-emerald-200 bg-gradient-to-b from-emerald-50 to-white p-6 shadow-xl shadow-emerald-100/60 sm:p-8">
            <div className="absolute right-6 top-6 rounded-full bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white">
              Oferta de validação
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Rocket className="h-6 w-6" />
            </div>

            <h3 className="mt-6 text-2xl font-semibold tracking-tight text-slate-950">
              Plano de ação Ohrly
            </h3>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Depois da análise gratuita, você pode transformar a leitura em um plano prático
              para decidir o que observar, testar ou ajustar primeiro.
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-500 line-through">
                R$ 97
              </p>

              <div className="flex items-end gap-2">
                <span className="text-lg font-semibold text-slate-950">R$</span>
                <span className="text-6xl font-semibold tracking-tight text-slate-950">
                  49
                </span>
              </div>

              <p className="mt-1 text-sm text-slate-500">
                preço de validação
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-emerald-100 bg-white p-5">
              <p className="text-sm font-semibold text-slate-950">
                O que entra no plano:
              </p>

              <ul className="mt-4 space-y-3">
                {[
                  "Prioridade dos possíveis gargalos.",
                  "Plano simples do que olhar primeiro.",
                  "Hipóteses de ação para produto, carrinho, pagamento, frete ou atendimento.",
                  "Próximos dados que vale acompanhar.",
                  "Resumo prático para os próximos 7 a 15 dias.",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={handleActionPlanClick}
              className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition hover:-translate-y-0.5 hover:bg-emerald-700"
            >
              Quero entender o plano de ação
              <ArrowRight className="h-5 w-5" />
            </button>

            <div className="mt-5 flex gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />
              <p>
                Você só decide pelo plano pago depois de saber se a análise gratuita encontrou
                sinais úteis nos seus dados.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function NextStepSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-700">
            <Rocket className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              Próximo passo
            </h2>

            <div className="mt-6 grid gap-5 lg:grid-cols-3">
              <StepItem
                number="1"
                title="Exporte os relatórios da sua plataforma"
                description="Pedidos, produtos, carrinhos, pagamentos, visitas ou canais."
              />
              <StepItem
                number="2"
                title={`Envie para ${CONTACT_EMAIL}`}
                description="Analisamos os dados com segurança e confidencialidade."
              />
              <StepItem
                number="3"
                title="Receba uma análise gratuita inicial"
                description="Com os primeiros sinais e próximos passos recomendados."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepItem({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800">
        {number}
      </div>

      <div>
        <h3 className="font-semibold leading-6 text-slate-950">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}

function PlatformsSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Funciona com dados exportados de plataformas comuns
        </h2>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {platforms.slice(0, 6).map((platform) => (
            <div
              key={platform}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm font-semibold text-slate-800 shadow-sm"
            >
              {platform}
            </div>
          ))}
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {platforms.slice(6).map((platform) => (
            <div
              key={platform}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              {platform}
            </div>
          ))}
        </div>

        <p className="mt-5 text-sm leading-6 text-slate-600">
          Se sua plataforma exporta pedidos, carrinhos ou pagamentos, já podemos começar.
        </p>
      </div>
    </section>
  );
}

function FinalReassuranceSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-blue-100 text-blue-700">
            <ShieldCheck className="h-10 w-10" />
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-950">
              O Ohrly não promete vender mais.
            </h2>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Ele ajuda você a entender se os dados da sua loja já mostram sinais de onde a
              venda pode estar travando.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:min-w-[360px]">
            <MiniTrustItem icon={Lock} text="Seus dados protegidos" />
            <MiniTrustItem icon={Target} text="Foco no que importa" />
            <MiniTrustItem icon={PackageCheck} text="Feito para lojistas" />
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniTrustItem({
  icon: Icon,
  text,
}: {
  icon: typeof Lock;
  text: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl bg-white/70 p-4 text-center">
      <Icon className="h-5 w-5 text-blue-700" />
      <span className="mt-2 text-xs font-semibold leading-5 text-slate-700">
        {text}
      </span>
    </div>
  );
}

function FreeAnalysisNextStepModal({
  onClose,
}: {
  onClose: () => void;
}) {
  const subject = "Quero uma análise gratuita da minha loja";

  const body = `Olá, gostaria de receber uma análise gratuita do Ohrly.

Minha loja/plataforma:

Dados que consigo exportar:
- Pedidos/vendas:
- Produtos:
- Carrinhos abandonados:
- Pagamentos não aprovados:
- Visitas/canais:
- Atendimento/WhatsApp:

O que gostaria de entender:
Ex: Tenho visitas, mas poucas compras. Quero saber se o problema parece estar no carrinho, pagamento, frete ou atendimento.
`;

  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  function handleEmailClick() {
    trackMetaEvent("free_analysis_email_click", {
      offer: "free_initial_analysis",
      page: "digital_journeys_landing_page",
      contact_method: "email",
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
          aria-label="Fechar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Send className="h-6 w-6" />
        </div>

        <h3 className="mt-5 pr-10 text-3xl font-semibold tracking-tight text-slate-950">
          Envie seus dados para uma análise gratuita
        </h3>

        <p className="mt-4 text-base leading-7 text-slate-600">
          A análise gratuita mostra o que já é possível observar com os relatórios da sua loja.
          Depois disso, você decide se quer transformar a leitura em um plano de ação por{" "}
          <span className="font-semibold text-slate-950">R$ 49</span>.
        </p>

        <div className="mt-6 space-y-4">
          <ModalStep
            number="1"
            title="Exporte os relatórios da sua plataforma"
            description="Pode ser pedidos, produtos, carrinhos abandonados, pagamentos não aprovados, visitas, canais ou atendimento."
            icon={FileSpreadsheet}
          />

          <ModalStep
            number="2"
            title={`Envie para ${CONTACT_EMAIL}`}
            description="Inclua os arquivos exportados e uma frase dizendo o que você gostaria de entender."
            icon={Mail}
          />

          <ModalStep
            number="3"
            title="Receba uma análise inicial gratuita"
            description="A resposta mostra quais sinais conseguimos observar, onde a venda pode estar travando e se faz sentido avançar para um plano de ação."
            icon={CheckCircle2}
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <p className="text-sm font-semibold text-slate-950">
            Exemplo de mensagem:
          </p>

          <p className="mt-3 text-sm leading-6 text-slate-600">
            “Tenho visitas, mas poucas compras. Quero saber se o problema está no carrinho,
            pagamento, frete ou atendimento.”
          </p>
        </div>

        <a
          href={mailtoHref}
          onClick={handleEmailClick}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-base font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
        >
          Enviar email para o Ohrly
          <Mail className="h-5 w-5" />
        </a>

        <p className="mt-4 text-center text-sm leading-6 text-slate-500">
          A análise gratuita não promete vender mais. Ele mostra onde os dados indicam que faz
          sentido olhar primeiro.
        </p>
      </div>
    </div>
  );
}

function ModalStep({
  number,
  title,
  description,
  icon: Icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: typeof FileSpreadsheet;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-800">
        {number}
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-blue-700" />
          <h4 className="font-semibold text-slate-950">{title}</h4>
        </div>

        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
      </div>
    </div>
  );
}