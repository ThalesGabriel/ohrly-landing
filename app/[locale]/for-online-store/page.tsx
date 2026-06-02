"use client";

import { useState, type FormEvent } from "react";

import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  Cloud,
  Download,
  Eye,
  FileText,
  Heart,
  HelpCircle,
  Lock,
  PackageCheck,
  Plug,
  Search,
  ShieldCheck,
  ShoppingCart,
  Target,
  Truck,
  UserRound,
  WalletCards,
  Zap,
} from "lucide-react";
import { trackMetaEvent } from "@/lib/meta-pixel";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkoygpnk";

const requiredDataGroups = [
  {
    title: "Comece por aqui",
    description: "Já permite uma primeira leitura da jornada.",
    items: [
      "Pedidos e vendas",
      "Clientes",
      "Produtos",
    ],
  },
  {
    title: "Deixa a leitura mais forte",
    description: "Ajuda a entender onde a intenção se perde.",
    items: [
      "Carrinhos abandonados",
      "Pagamentos recusados ou pendentes",
      "Formas de entrega e retirada",
    ],
  },
  {
    title: "Fecha melhor as hipóteses",
    description: "Ajuda a enxergar o começo da jornada.",
    items: [
      "Visitas e produtos acessados",
      "Origem do tráfego",
      "Atendimento / WhatsApp",
    ],
  },
];

const observableWindows = [
  {
    title: "Carrinho abandonado",
    description: "Cliente escolheu produto, mas não concluiu a compra.",
  },
  {
    title: "Pagamento não concluído",
    description: "Pode ser cliente recuperável, tentativa suspeita ou ruído.",
  },
  {
    title: "Compra sem continuidade",
    description: "Cliente comprou uma vez, mas não voltou para recompra.",
  },
  {
    title: "Produto recorrente escondido",
    description: "Itens simples podem sustentar continuidade, mas talvez nem apareçam no online.",
  },
];

const journeySteps = [
  {
    label: "interesse",
    icon: Heart,
  },
  {
    label: "pagamento",
    icon: WalletCards,
  },
  {
    label: "atendimento",
    icon: HelpCircle,
  },
  {
    label: "entrega",
    icon: Truck,
  },
];

const explanationCards = [
  {
    title: "Você não precisa entender de dados",
    description:
      "Eliminamos a complexidade técnica. Você envia os relatórios e recebe uma leitura clara, em linguagem simples.",
    icon: UserRound,
  },
  {
    title: "A análise mostra onde olhar primeiro",
    description:
      "Priorizamos os pontos com maior impacto potencial na sua jornada, com base no que os dados permitem observar.",
    icon: Search,
  },
  {
    title: "Não é promessa de vender mais",
    description:
      "Não garantimos resultados. Entregamos uma leitura honesta sobre onde a jornada pode estar perdendo continuidade.",
    icon: ShieldCheck,
  },
  {
    title: "O acompanhamento vem depois",
    description:
      "Após a leitura inicial, você pode acompanhar a evolução com nosso plugin e validar hipóteses continuamente.",
    icon: BarChart3,
  },
];

const analysisSteps = [
  {
    number: "1",
    title: "Contexto",
    description: "Fale sobre seu negócio, canais, produtos e objetivos.",
    icon: FileText,
  },
  {
    number: "2",
    title: "Dados disponíveis",
    description: "Descubra quais relatórios sua plataforma já permite exportar.",
    icon: Download,
  },
  {
    number: "3",
    title: "Análise inicial",
    description: "Você recebe uma leitura objetiva com sinais e próximos passos.",
    icon: BarChart3,
  },
];

const interpretationCards = [
  {
    title: "O que os dados permitem observar",
    description: "Transformamos relatórios brutos em sinais claros.",
    icon: Eye,
  },
  {
    title: "Onde a venda pode estar travando",
    description: "Identificamos os pontos com maior potencial de impacto.",
    icon: Zap,
  },
  {
    title: "Quais sinais merecem atenção",
    description: "Priorizamos o que realmente pode explicar a queda.",
    icon: Bell,
  },
  {
    title: "Qual próximo dado ajudaria mais",
    description: "Indicamos o próximo passo para ampliar a clareza.",
    icon: ArrowRight,
  },
];

const freePlanItems = [
  "Primeiro contato para entender sua loja",
  "Principais sinais e possíveis gargalos",
  "Sugestão de próximo passo",
  "Entrega em até 3 dias úteis",
];

const consolidatedPlanItems = [
  "Leitura aprofundada e consolidada",
  "Janelas de decisão priorizadas",
  "Insights acionáveis para sua operação",
  "Entrega em até 3 dias úteis",
];

const followUpSteps = [
  {
    title: "Leitura gratuita",
    description: "Identificamos sinais e possíveis gargalos.",
    icon: FileText,
  },
  {
    title: "Hipóteses",
    description: "Levantamos hipóteses sobre os pontos críticos.",
    icon: Bell,
  },
  {
    title: "Plugin / Acompanhamento",
    description: "Observamos a jornada real ao longo do tempo.",
    icon: Plug,
  },
  {
    title: "Refino contínuo",
    description: "Validamos, ajustamos e priorizamos decisões.",
    icon: Target,
  },
];

const platforms = [
  "Nuvemshop",
  "Shopify",
  "WooCommerce",
  "Loja Integrada",
  "Instagram",
  "WhatsApp",
  "Outros sistemas",
];

export default function ForEcommerceLandingPage() {
  const [isFreeAnalysisModalOpen, setIsFreeAnalysisModalOpen] = useState(false);
  const [isNextStepModalOpen, setIsNextStepModalOpen] = useState(false);
  const [isFreeAnalysisSubmitted, setIsFreeAnalysisSubmitted] = useState(false);
  const [isSubmittingFreeAnalysis, setIsSubmittingFreeAnalysis] = useState(false);
  const [freeAnalysisError, setFreeAnalysisError] = useState<string | null>(null);

  async function handleFreeAnalysisSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmittingFreeAnalysis(true);
    setFreeAnalysisError(null);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Não foi possível enviar a solicitação.");
      }

      setIsFreeAnalysisSubmitted(true);

      trackMetaEvent("track", {
        event_name: "Lead",
        content_name: "Leitura gratuita Ohrly",
        content_category: "Landing Page",
        lead_source: "Formspree",
        page: "for-ecommerce",
      });

    } catch {
      setFreeAnalysisError(
        "Não conseguimos enviar agora. Tente novamente ou entre em contato pelo nosso e-mail."
      );
    } finally {
      setIsSubmittingFreeAnalysis(false);
    }
  }

  function openFreeAnalysisModal() {
    setIsFreeAnalysisSubmitted(false);
    setFreeAnalysisError(null);
    setIsFreeAnalysisModalOpen(true);

    trackMetaEvent("trackCustom", {
      event_name: "LeadFormOpen",
      content_name: "Leitura gratuita Ohrly",
      content_category: "Landing Page",
      page: "for-ecommerce",
    });
  }

  return (
    <main className="min-h-screen bg-[#f7fbff] text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#" className="text-2xl font-bold tracking-tight text-slate-950">
            Ohrly
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <a href="#o-que" className="transition hover:text-blue-700">
              O que é
            </a>
            <a href="#como-funciona" className="transition hover:text-blue-700">
              Como funciona
            </a>
            <a href="#exemplo" className="transition hover:text-blue-700">
              Exemplo
            </a>
            <a href="#oferta" className="transition hover:text-blue-700">
              Análise gratuita
            </a>
          </nav>

          <button
            type="button"
            onClick={openFreeAnalysisModal}
            className="cursor-pointer hidden rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition hover:bg-blue-800 md:inline-flex"
          >
            Receber leitura gratuita
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute left-10 top-40 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Cloud className="h-4 w-4" />
              Leitura gratuita para lojistas em plataformas de ecommerce
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Sua loja virtual vende menos do que poderia?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Antes de gastar mais com anúncio, entenda onde a jornada do cliente
              pode estar perdendo continuidade: produto, carrinho, pagamento,
              recompra ou atendimento.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openFreeAnalysisModal}
                className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Quero minha leitura gratuita
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <a
                href="#exemplo"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Ver exemplo de leitura
              </a>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <div key={step.label} className="relative flex flex-col items-center gap-3">
                    {index < journeySteps.length - 1 && (
                      <div className="absolute left-[62%] top-7 hidden h-px w-[76%] border-t border-dashed border-blue-200 sm:block" />
                    )}

                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>

                    <span className="text-sm font-medium text-slate-600">{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl shadow-blue-950/10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <FileText className="h-6 w-6" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                Comece com uma leitura gratuita
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Envie relatórios que sua loja virtual já exporta. O Ohrly devolve
                uma primeira leitura mostrando onde a jornada pode estar perdendo
                continuidade.
              </p>

              <a
                href="#como-funciona"
                className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Ver como funciona
              </a>

              <div className="mt-6 flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 justify-center">
                <Lock className="h-4 w-4 shrink-0 text-slate-500" />
                Não é necessário enviar dados sensíveis agora.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="o-que" className="px-5 pb-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[0.95fr_1.05fr]">
          <div className="bg-gradient-to-br from-blue-700 to-blue-950 p-8 text-white lg:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              O que é o Ohrly?
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              Uma leitura simples para entender onde a jornada do cliente pode
              estar perdendo continuidade.
            </h2>

            <p className="mt-5 leading-7 text-blue-50">
              O Ohrly olha para relatórios que sua loja já gera — pedidos, produtos,
              clientes, carrinhos, pagamentos e atendimento — e organiza esses
              sinais em uma leitura clara sobre onde clientes demonstram intenção,
              mas deixam de continuar a jornada.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
              <div className="flex items-start gap-4">
                <Target className="mt-1 h-6 w-6 text-blue-100" />
                <p className="font-semibold leading-7 text-white">
                  Mais clareza para priorizar o que realmente pode destravar suas
                  vendas.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-8 lg:p-10">
            {explanationCards.map((card) => {
              const Icon = card.icon;

              return (
                <div key={card.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">{card.title}</h3>
                    <p className="mt-1 leading-6 text-slate-600">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Como funciona a análise
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  {index < analysisSteps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 shadow-sm md:flex">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <span className="text-sm font-semibold text-blue-700">{step.number}</span>
                      <h3 className="text-lg font-bold text-slate-950">{step.title}</h3>
                    </div>
                  </div>

                  <p className="mt-4 leading-7 text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Dados que a plataforma já pode te dar
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              Quais dados ajudam a leitura?
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Você não precisa enviar tudo de uma vez. A primeira leitura pode começar
              com pedidos, clientes e produtos. Quanto mais etapas da jornada você
              envia, mais o Ohrly consegue separar intenção real, ruído, abandono e
              oportunidades de continuidade.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {requiredDataGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950">{group.title}</h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {group.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-3xl border border-blue-100 bg-blue-50/70 p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold text-slate-950">
                  A lógica é reconstruir a jornada observável
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  Primeiro entendemos o que os dados permitem observar. Depois
                  separamos o que é fato, hipótese, ruído e próximo dado necessário.
                  Isso evita tratar todo carrinho abandonado como venda perdida ou todo
                  pagamento recusado como cliente real.
                </p>
              </div>

              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-blue-700 shadow-sm">
                Pedidos → Carrinhos → Pagamentos → Recompra
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="exemplo" className="px-5 py-10 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Exemplo inspirado em uma leitura real
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              O que você envia e o que recebe de volta
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A análise inicial não tenta adivinhar uma causa. Ela mostra onde a
              jornada parece perder continuidade e quais perguntas merecem ser
              investigadas antes de decidir por desconto, campanha ou tráfego.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div>
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <ShoppingCart className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-950">
                      Exemplo de dados enviados
                    </h3>
                    <p className="text-sm text-slate-500">
                      Relatórios exportados da plataforma de ecommerce
                    </p>
                  </div>
                </div>

                <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Origem</th>
                        <th className="px-4 py-3 font-semibold">Produto</th>
                        <th className="px-4 py-3 font-semibold">Status</th>
                        <th className="px-4 py-3 font-semibold">Valor</th>
                        <th className="px-4 py-3 font-semibold">Canal</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      <tr>
                        <td className="px-4 py-3">Carrinho</td>
                        <td className="px-4 py-3">Capacete Norisk</td>
                        <td className="px-4 py-3">Abandonado</td>
                        <td className="px-4 py-3">R$ 799,90</td>
                        <td className="px-4 py-3">Mobile</td>
                      </tr>

                      <tr>
                        <td className="px-4 py-3">Pedido</td>
                        <td className="px-4 py-3">Capacete ASX</td>
                        <td className="px-4 py-3">Pagamento recusado</td>
                        <td className="px-4 py-3">R$ 599,90</td>
                        <td className="px-4 py-3">Site</td>
                      </tr>

                      <tr>
                        <td className="px-4 py-3">Venda</td>
                        <td className="px-4 py-3">Balaclava + limpeza</td>
                        <td className="px-4 py-3">Pago</td>
                        <td className="px-4 py-3">R$ 58,90</td>
                        <td className="px-4 py-3">Online</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Enviado
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Pedidos, clientes, produtos e carrinhos
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Ainda faltaria
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">
                      Visitas, produtos acessados e WhatsApp
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Análise gratuita
                </span>

                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Leitura inicial
                </span>
              </div>

              <h3 className="mt-5 text-2xl font-bold tracking-tight text-slate-950">
                A jornada parece perder continuidade antes da conclusão da compra
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                Os carrinhos abandonados aparecem concentrados em produtos de maior
                decisão, como capacetes. Isso pode indicar intenção real, mas também
                dúvida sobre tamanho, prova, encaixe, confiança ou risco operacional.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-950">
                    Janela 1 — Carrinho de capacete
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    A decisão pode não ser dar desconto, mas testar um caminho
                    intermediário: reservar online e provar na loja.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-950">
                    Janela 2 — Pagamento não concluído
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Pedido recusado pode misturar cliente real, tentativa suspeita,
                    cartão clonado ou ruído.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-950">
                    Janela 3 — Produtos de continuidade
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Produtos simples, de menor risco e possível recompra podem sustentar
                    continuidade depois da primeira intenção.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl bg-emerald-50 p-5 ring-1 ring-emerald-100">
                <div className="flex gap-3">
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-emerald-700" />
                  <div>
                    <h4 className="font-bold text-emerald-950">
                      Próximo dado que mais ajudaria
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-emerald-900">
                      Relatório de visitas e produtos acessados para entender se produtos
                      recorrentes não vendem porque ninguém vê, porque não entram no
                      carrinho ou porque entram e depois abandonam.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-950">
                  Como a Ohrly organiza essa interpretação
                </h3>

                <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                  A leitura separa o que foi observado, o que é hipótese, o que ainda não
                  dá para afirmar e qual decisão ficou aberta para o lojista.
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
                Observado → Hipótese → Decisão
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
              {interpretationCards.map((card) => {
                const Icon = card.icon;

                return (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h4 className="font-bold leading-6 text-slate-950">{card.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {card.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="oferta" className="bg-gradient-to-b from-blue-50/80 to-white px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Comece com uma análise gratuita
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Envie os relatórios que sua loja já consegue exportar. O Ohrly analisa
              o que é possível observar e mostra onde a jornada do cliente pode estar perdendo continuidade.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">Análise inicial gratuita</h3>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-bold tracking-tight text-slate-950">R$ 0</span>
                <span className="pb-2 text-sm text-slate-500">preço de validação</span>
              </div>

              <ul className="mt-6 space-y-3">
                {freePlanItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={openFreeAnalysisModal}
                className="cursor-pointer mt-8 inline-flex w-full items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Quero uma análise gratuita
              </button>
            </div>

            <div className="relative rounded-3xl border-2 border-blue-200 bg-white p-8 shadow-xl shadow-blue-950/10">
              <div className="absolute right-6 top-6 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Oferta de validação
              </div>

              <h3 className="text-xl font-bold text-slate-950">Leitura Ohrly consolidada</h3>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-bold tracking-tight text-slate-950">R$ 49</span>
                <span className="pb-2 text-sm text-slate-500 line-through">de R$ 97</span>
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                Após a análise gratuita, aprofunde a leitura com contexto e janelas
                de decisão priorizadas.
              </p>

              <ul className="mt-6 space-y-3">
                {consolidatedPlanItems.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => {
                  setIsNextStepModalOpen(true);

                  trackMetaEvent("trackCustom", {
                    eventName: "NextStepModalOpen",
                    content_name: "Leitura Ohrly consolidada",
                    content_category: "Landing Page",
                    page: "for-ecommerce",
                  });
                }}
                className="cursor-pointer mt-8 inline-flex w-full items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Entender próximo passo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              A leitura mostra onde olhar. O acompanhamento valida isso continuamente.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A leitura gratuita identifica hipóteses e pontos críticos. O plugin e o
              acompanhamento observam a jornada real todos os dias, refinando as
              análises e confirmando o que realmente impacta suas vendas.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {followUpSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  {index < followUpSteps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 shadow-sm lg:flex">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  )}

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="font-bold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pb-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-2xl font-bold tracking-tight text-slate-950">
            Funciona com plataformas e canais comuns do comércio digital
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {platforms.map((platform, index) => (
              <div
                key={platform}
                className={`inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-sm font-semibold shadow-sm ${index === 0
                  ? "border-blue-200 bg-blue-50 text-blue-800"
                  : "border-slate-200 bg-white text-slate-700"
                  }`}
              >
                {index === 0 ? <Cloud className="h-4 w-4" /> : <PackageCheck className="h-4 w-4" />}
                {platform}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-10 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 p-8 text-white shadow-2xl shadow-blue-950/20 lg:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div className="hidden lg:block">
              <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-[2rem] bg-white/10 ring-1 ring-white/20">
                <Cloud className="h-20 w-20 text-blue-100" />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Envie relatórios do seu ecommerce e receba uma primeira leitura gratuita.
              </h2>

              <p className="mt-5 max-w-3xl leading-7 text-blue-50">
                Descubra se seus dados já mostram clientes escapando da jornada,
                sinais online que precisam ser filtrados e decisões que não deveriam
                esperar mais.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openFreeAnalysisModal}
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-lg transition hover:bg-blue-50"
                >
                  Quero minha leitura gratuita
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>

                <div className="inline-flex items-center gap-2 text-sm text-blue-100">
                  <Lock className="h-4 w-4" />
                  Sem instalação inicial. Sem necessidade de dados sensíveis.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isFreeAnalysisModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-5 py-6 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Leitura gratuita
                </span>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                  Solicitar leitura gratuita da sua loja
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Conte rapidamente o segmento da sua loja e o que você gostaria de entender.
                  Depois entramos em contato para orientar quais relatórios exportar da plataforma.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsFreeAnalysisModalOpen(false)}
                className="cursor-pointer rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500 transition hover:bg-slate-50"
              >
                Fechar
              </button>
            </div>

            {isFreeAnalysisSubmitted ? (
              <div className="mt-8 rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
                <div className="flex gap-4">
                  <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-emerald-700" />

                  <div>
                    <h3 className="text-lg font-bold text-emerald-950">
                      Solicitação enviada
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-emerald-900">
                      Recebemos sua solicitação. Vamos entrar em contato pelo e-mail informado
                      com mais detalhes sobre a leitura gratuita e orientar quais relatórios
                      exportar da plataforma. Se preferir adiantar, entre em contato pelo e-mail{" "}
                      <a
                        href="mailto:taraujo@ohrly.com.br"
                        className="font-semibold underline decoration-emerald-700/40 underline-offset-4 hover:text-emerald-800"
                      >
                        taraujo@ohrly.com.br
                      </a>
                      .
                    </p>

                    <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-emerald-950 ring-1 ring-emerald-100">
                      Se quiser adiantar, envie para o nosso contato os relatórios de:
                      <strong> pedidos e vendas, clientes, produtos, carrinhos abandonados,
                        pagamentos recusados</strong> e, se tiver, <strong>visitas/produtos acessados</strong>.
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFreeAnalysisModalOpen(false)}
                      className="cursor-pointer mt-5 inline-flex rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
                    >
                      Entendi
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form className="mt-6 grid gap-4" onSubmit={handleFreeAnalysisSubmit}>
                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  E-mail para contato
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="voce@email.com"
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  Segmento da loja
                  <input
                    name="segmento"
                    required
                    placeholder="Ex: moda, motopeças, cosméticos, suplementos..."
                    className="rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label className="grid gap-2 text-sm font-medium text-slate-700">
                  O que você gostaria de entender?
                  <textarea
                    name="mensagem"
                    required
                    rows={6}
                    placeholder="Ex: Minha loja recebe visitas, mas vende pouco. Quero entender se o problema parece estar no carrinho, pagamento, produtos, recompra ou atendimento."
                    className="resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <input
                  type="hidden"
                  name="origem"
                  value="Landing Page Ohrly para Lojas Virtuais"
                />

                <input
                  type="hidden"
                  name="tipo_de_solicitacao"
                  value="Leitura gratuita"
                />

                <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  Você não precisa enviar CSV agora. A primeira etapa é entendermos o
                  contexto e depois indicarmos quais relatórios exportar.
                </div>

                {freeAnalysisError && (
                  <div className="rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700 ring-1 ring-red-100">
                    {freeAnalysisError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingFreeAnalysis}
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmittingFreeAnalysis ? "Enviando..." : "Enviar solicitação"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {isNextStepModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-5 py-6 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Próximo passo
                </span>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                  O que acontece depois da leitura gratuita?
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsNextStepModalOpen(false)}
                className="cursor-pointer rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-500 transition hover:bg-slate-50"
              >
                Fechar
              </button>
            </div>

            <div className="mt-6 space-y-4 text-sm leading-6 text-slate-600">
              <p>
                A análise gratuita mostra onde olhar. Se a leitura fizer sentido,
                a Leitura Ohrly Consolidada aprofunda o contexto do negócio e
                organiza as janelas de decisão com mais clareza.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">Inclui:</h3>

                <ul className="mt-3 space-y-2">
                  <li>• Revisão dos sinais encontrados</li>
                  <li>• Separação entre fato, hipótese, ruído e oportunidade</li>
                  <li>• Janelas de decisão priorizadas</li>
                  <li>• Próximos dados que aumentariam a precisão</li>
                  <li>• Leitura final mais consolidada</li>
                </ul>
              </div>

              <p>
                A ideia não é vender uma consultoria genérica. É entender se os
                dados já mostram perda de continuidade na jornada do cliente e
                quais decisões merecem ser investigadas.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  trackMetaEvent("trackCustom", {
                    event_name: "NextStepToFreeAnalysis",
                    content_name: "Leitura Ohrly consolidada",
                    content_category: "Landing Page",
                    page: "for-ecommerce",
                  });

                  setIsNextStepModalOpen(false);
                  openFreeAnalysisModal();
                }}
                className="cursor-pointer inline-flex flex-1 items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Começar pela análise gratuita
              </button>

              <button
                type="button"
                onClick={() => setIsNextStepModalOpen(false)}
                className="cursor-pointer inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}