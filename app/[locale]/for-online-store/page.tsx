"use client";

import { useState, type FormEvent } from "react";

import {
  Activity,
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Cloud,
  Download,
  Eye,
  FileText,
  GitBranch,
  HelpCircle,
  Lock,
  PackageCheck,
  Plug,
  Search,
  ShieldCheck,
  Target,
  UserRound,
  WalletCards,
  Zap,
} from "lucide-react";
import { trackMetaEvent } from "@/lib/meta-pixel";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mkoygpnk";

const policyFamilies = [
  {
    title: "Cliente invisível",
    description:
      "Quando a venda acontece, mas não vira comprador confiável para recompra, LTV ou campanha.",
    icon: UserRound,
  },
  {
    title: "Canal dominante",
    description:
      "Quando quase toda a receita depende de um canal e os demais ainda têm papel pequeno.",
    icon: GitBranch,
  },
  {
    title: "Mensurabilidade por canal",
    description:
      "Quando o canal que mais vende também é o que menos identifica compradores.",
    icon: Eye,
  },
  {
    title: "Pressão de desconto",
    description:
      "Quando o crescimento começa a depender demais de incentivo, cupom ou desconto.",
    icon: CircleDollarSign,
  },
  {
    title: "Conclusão de pedido",
    description:
      "Quando pedidos, pagamentos ou status distorcem a leitura de venda real.",
    icon: WalletCards,
  },
  {
    title: "Continuidade pós-compra",
    description:
      "Quando a primeira compra não vira recompra, complemento ou relacionamento.",
    icon: Activity,
  },
];

const realDiagnosticFindings = [
  {
    label: "Crítico",
    title: "61,55% da receita sem comprador confiável",
    description:
      "A operação vende, mas parte relevante da receita não permite medir recompra, LTV ou continuidade.",
    metric: "unidentified_revenue_share",
    value: "61,55%",
    tone: "critical",
  },
  {
    label: "Crítico",
    title: "94,26% da receita no Ponto de venda",
    description:
      "O canal físico é o motor da operação. O digital existe, mas ainda tem papel pequeno.",
    metric: "top_channel_revenue_share",
    value: "94,26%",
    tone: "critical",
  },
  {
    label: "Crítico",
    title: "65,24% da receita do Ponto de venda sem comprador confiável",
    description:
      "A principal janela não é só vender mais online; é transformar a venda física em relacionamento mensurável.",
    metric: "top_channel_unidentified_revenue_share",
    value: "65,24%",
    tone: "critical",
  },
  {
    label: "Dentro da referência",
    title: "8,02% de desconto agregado",
    description:
      "Desconto não apareceu como principal pressão no agregado inicial.",
    metric: "discount_share",
    value: "8,02%",
    tone: "healthy",
  },
  {
    label: "Dentro da referência",
    title: "0% de receita não confirmada",
    description:
      "Pelos dados analisados, a qualidade de conclusão não foi o gargalo principal.",
    metric: "unconfirmed_revenue_share",
    value: "0%",
    tone: "healthy",
  },
];

const requiredDataGroups = [
  {
    title: "Comece por aqui",
    description: "Já permite uma primeira leitura diagnóstica.",
    items: ["Pedidos e vendas", "Clientes", "Produtos"],
  },
  {
    title: "Deixa a leitura mais forte",
    description: "Ajuda a separar venda boa, ruído e intenção perdida.",
    items: [
      "Carrinhos abandonados",
      "Pagamentos recusados ou pendentes",
      "Formas de entrega e retirada",
    ],
  },
  {
    title: "Fecha melhor as hipóteses",
    description: "Ajuda a entender o começo e a continuidade da jornada.",
    items: [
      "Visitas e produtos acessados",
      "Origem do tráfego",
      "Atendimento / WhatsApp",
    ],
  },
];

const analysisSteps = [
  {
    number: "1",
    title: "Você envia relatórios",
    description:
      "Comece com CSVs que sua plataforma já exporta: vendas, clientes, produtos e canais.",
    icon: Download,
  },
  {
    number: "2",
    title: "O Ohrly normaliza",
    description:
      "Os dados viram um modelo semântico: venda, canal, comprador, status, desconto e continuidade.",
    icon: GitBranch,
  },
  {
    number: "3",
    title: "Policies rodam",
    description:
      "O motor calcula métricas diagnósticas e compara com referências iniciais.",
    icon: Search,
  },
  {
    number: "4",
    title: "Janelas aparecem",
    description:
      "Você recebe uma leitura com problemas críticos, sinais saudáveis e próximos testes.",
    icon: Bell,
  },
];

const learningSteps = [
  {
    title: "Degradação detectada",
    description:
      "O Ohrly encontra um comportamento relevante nos dados, como receita sem comprador confiável.",
    icon: Search,
  },
  {
    title: "Cliente valida",
    description:
      "O lojista confirma se aquilo é um problema real para a operação.",
    icon: CheckCircle2,
  },
  {
    title: "Janela acompanhada",
    description:
      "A leitura deixa de ser pontual e passa a acompanhar se a janela voltou, reduziu ou piorou.",
    icon: Activity,
  },
  {
    title: "Policy evolui",
    description:
      "Quando o padrão se repete em lojas parecidas, ele pode virar candidata a policy curada.",
    icon: ShieldCheck,
  },
];

const freePlanItems = [
  "Primeiro contato para entender sua loja",
  "Leitura inicial com janelas possíveis",
  "Sinais críticos, saudáveis e inconclusivos",
  "Sugestão de próximo dado ou próximo teste",
];

const consolidatedPlanItems = [
  "Leitura aprofundada dos achados",
  "Janelas de decisão priorizadas",
  "Separação entre fato, hipótese e ruído",
  "Comportamentos para acompanhar depois",
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

function findingToneClasses(tone: string) {
  if (tone === "critical") {
    return {
      badge: "bg-red-50 text-red-700 ring-red-100",
      card: "border-red-100 bg-red-50/40",
      value: "text-red-700",
    };
  }

  return {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    card: "border-emerald-100 bg-emerald-50/40",
    value: "text-emerald-700",
  };
}

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

      trackMetaEvent("Lead", {
        content_name: "Diagnóstico gratuito Ohrly",
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

    trackMetaEvent("LeadFormOpen", {
      content_name: "Diagnóstico gratuito Ohrly",
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
              O que encontra
            </a>
            <a href="#exemplo" className="transition hover:text-blue-700">
              Exemplo real
            </a>
            <a href="#como-funciona" className="transition hover:text-blue-700">
              Como funciona
            </a>
            <a href="#oferta" className="transition hover:text-blue-700">
              Diagnóstico gratuito
            </a>
          </nav>

          <button
            type="button"
            onClick={openFreeAnalysisModal}
            className="hidden cursor-pointer rounded-full bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition hover:bg-blue-800 md:inline-flex"
          >
            Receber diagnóstico gratuito
          </button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute left-10 top-40 h-72 w-72 rounded-full bg-sky-100 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Cloud className="h-4 w-4" />
              Diagnóstico gratuito para lojistas digitais e físico-digitais
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Sua loja vende. Mas ela consegue enxergar onde o crescimento está vazando?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              O Ohrly analisa relatórios da sua loja como: Pedidos, clientes,
              produtos e canais para identificar situações de cliente invisível,
              concentração de receita, pressão de desconto, venda não confirmada e
              continuidade perdida.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={openFreeAnalysisModal}
                className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Quero meu diagnóstico gratuito
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>

              <a
                href="#exemplo"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
              >
                Ver exemplo real
              </a>
            </div>

            <div className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-3">
              {[
                "Sem instalação inicial",
                "Comece com CSVs exportados",
                "Receba janelas priorizadas",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-blue-700" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl shadow-blue-950/10">
              <div className="mb-6 flex items-center justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <BarChart3 className="h-6 w-6" />
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Exemplo de saída
                </span>
              </div>

              <h2 className="text-2xl font-bold tracking-tight text-slate-950">
                De relatórios brutos para janelas de decisão.
              </h2>

              <div className="mt-6 space-y-3">
                {realDiagnosticFindings.slice(0, 3).map((finding) => {
                  const classes = findingToneClasses(finding.tone);

                  return (
                    <div
                      key={finding.metric}
                      className={`rounded-2xl border p-4 ${classes.card}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-sm font-bold text-slate-950">
                          {finding.title}
                        </p>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${classes.badge}`}
                        >
                          {finding.label}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {finding.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                O diagnóstico não promete recuperar faturamento. Ele mostra o que
                está exposto, onde olhar e qual comportamento acompanhar.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="o-que" className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              O que o Ohrly procura
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Temos uma base de políticas capazes de diagnosticar o seu negócio
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Em vez de entregar um dashboard com métricas soltas, o Ohrly interpreta os
              seus dados e mostra onde existe perda de mensurabilidade, concentração,
              continuidade ou qualidade.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {policyFamilies.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="exemplo" className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Exemplo de relatório Ohrly
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              O diagnóstico vira um artefato claro para decidir o próximo passo.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              O Ohrly organiza os achados em janelas decisórias, valor exposto,
              experimentos recomendados e comportamentos para acompanhar. A ideia não é
              entregar uma lista de métricas soltas, mas mostrar onde agir, por que isso
              importa e como validar se melhorou.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-3 shadow-2xl shadow-blue-950/10">
              <img
                src="/images/ohrly-report-example.png"
                alt="Exemplo de relatório de resultados do Ohrly com resumo executivo, janelas decisórias, experimentos recomendados e comportamentos monitoráveis"
                className="w-full rounded-2xl"
              />
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:p-8">
              <h3 className="text-2xl font-bold tracking-tight text-slate-950">
                O que aparece no relatório
              </h3>

              <div className="mt-6 space-y-4">
                {[
                  "Resumo executivo com as principais janelas encontradas",
                  "Janelas decisórias priorizadas por impacto e confiança",
                  "Valor operacional exposto sem prometer recuperação automática",
                  "Experimentos recomendados para validar a hipótese",
                  "Comportamentos que devem ser monitorados depois",
                  "Próximos passos para reduzir a janela ou melhorar a mensurabilidade",
                ].map((item) => (
                  <div key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-blue-50 p-5 ring-1 ring-blue-100">
                <p className="text-sm font-semibold text-blue-950">
                  Exemplo de leitura:
                </p>
                <p className="mt-2 text-sm leading-6 text-blue-900">
                  Em uma base Nuvemshop analisada, o Ohrly identificou receita sem
                  comprador confiável, concentração no Ponto de venda e perda de
                  mensurabilidade no canal dominante.
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-slate-500">
            Os valores apresentados são exemplos de valor operacional exposto e leitura
            investigativa. Eles não representam promessa de recuperação integral de faturamento.
          </p>
        </div>
      </section>

      <section id="como-funciona" className="px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
              Como funciona
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Do CSV ao diagnóstico acompanhável.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A análise começa com dados exportados. Depois, o Ohrly normaliza os
              campos, roda policies e transforma achados em janelas de decisão.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {analysisSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.title}
                  className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  {index < analysisSteps.length - 1 && (
                    <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-700 shadow-sm lg:flex">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  )}

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="mt-5 inline-flex text-sm font-semibold text-blue-700">
                    {step.number}
                  </span>

                  <h3 className="mt-1 text-lg font-bold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-14 lg:px-8">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:grid lg:grid-cols-[0.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-blue-700 to-blue-950 p-8 text-white lg:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
              Diferencial do Ohrly
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              O diagnóstico melhora quando o cliente confirma o que é relevante.
            </h2>

            <p className="mt-5 leading-7 text-blue-50">
              O Ohrly não precisa depender de humanos criando tudo do zero para
              sempre. Degradações validadas viram janelas acompanhadas. Quando se
              repetem em lojas parecidas, podem virar candidatas a policy curada.
            </p>

            <div className="mt-8 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
              <p className="font-semibold leading-7 text-white">
                Não é só uma análise pontual. É um ciclo de aprendizado operacional.
              </p>
            </div>
          </div>

          <div className="grid gap-5 p-8 lg:p-10">
            {learningSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.title} className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                      {step.description}
                    </p>
                  </div>
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
              Dados que ajudam a leitura
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
              Você não precisa enviar tudo de uma vez.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              A primeira leitura pode começar com pedidos, clientes e produtos.
              Quanto mais etapas da jornada você envia, mais o Ohrly consegue
              separar fato, hipótese, ruído e próximo dado necessário.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {requiredDataGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-950">
                  {group.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {group.description}
                </p>

                <ul className="mt-6 space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
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
                </p>
              </div>

              <div className="rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-blue-700 shadow-sm">
                Pedidos → Clientes → Canais → Continuidade
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="oferta" className="bg-gradient-to-b from-blue-50/80 to-white px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-950">
              Comece com um diagnóstico gratuito.
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Envie os relatórios que sua loja já consegue exportar. O Ohrly
              analisa o que é possível observar e mostra quais janelas merecem
              decisão.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-950">
                Diagnóstico inicial gratuito
              </h3>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-bold tracking-tight text-slate-950">
                  R$ 0
                </span>
                <span className="pb-2 text-sm text-slate-500">
                  preço de validação
                </span>
              </div>

              <ul className="mt-6 space-y-3">
                {freePlanItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={openFreeAnalysisModal}
                className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Quero meu diagnóstico gratuito
              </button>
            </div>

            <div className="relative rounded-3xl border-2 border-blue-200 bg-white p-8 shadow-xl shadow-blue-950/10">
              <div className="absolute right-6 top-6 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Oferta de validação
              </div>

              <h3 className="text-xl font-bold text-slate-950">
                Leitura Ohrly consolidada
              </h3>

              <div className="mt-5 flex items-end gap-3">
                <span className="text-5xl font-bold tracking-tight text-slate-950">
                  R$ 99
                </span>
                <span className="pb-2 text-sm text-slate-500 line-through">
                  de R$ 197
                </span>
              </div>

              <p className="mt-5 leading-7 text-slate-600">
                Após o diagnóstico gratuito, aprofunde a leitura com contexto,
                priorização e próximos comportamentos para acompanhar.
              </p>

              <ul className="mt-6 space-y-3">
                {consolidatedPlanItems.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
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
                className="mt-8 inline-flex w-full cursor-pointer items-center justify-center rounded-xl border border-blue-200 bg-white px-5 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                Entender próximo passo
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-8">
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
                {index === 0 ? (
                  <Cloud className="h-4 w-4" />
                ) : (
                  <PackageCheck className="h-4 w-4" />
                )}
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
                Envie relatórios da sua loja e receba uma primeira leitura gratuita.
              </h2>

              <p className="mt-5 max-w-3xl leading-7 text-blue-50">
                Descubra se seus dados já mostram clientes invisíveis, concentração
                de canal, pressão de desconto ou decisões que não deveriam esperar.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={openFreeAnalysisModal}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-800 shadow-lg transition hover:bg-blue-50"
                >
                  Quero meu diagnóstico gratuito
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
                  Diagnóstico gratuito
                </span>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                  Solicitar diagnóstico gratuito da sua loja
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Conte rapidamente o segmento da sua loja e o que você gostaria
                  de entender. Depois entramos em contato para orientar quais
                  relatórios exportar.
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
                      Recebemos sua solicitação. Vamos entrar em contato pelo e-mail
                      informado para orientar os próximos passos. Se preferir adiantar,
                      fale pelo e-mail{" "}
                      <a
                        href="mailto:taraujo@ohrly.com.br"
                        className="font-semibold underline decoration-emerald-700/40 underline-offset-4 hover:text-emerald-800"
                      >
                        taraujo@ohrly.com.br
                      </a>
                      .
                    </p>

                    <div className="mt-5 rounded-2xl bg-white p-4 text-sm leading-6 text-emerald-950 ring-1 ring-emerald-100">
                      Se quiser adiantar, envie relatórios de{" "}
                      <strong>pedidos e vendas, clientes e produtos</strong>. Se
                      tiver, inclua também <strong>carrinhos, pagamentos, visitas</strong>{" "}
                      e <strong>atendimento</strong>.
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsFreeAnalysisModalOpen(false)}
                      className="mt-5 inline-flex cursor-pointer rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-800"
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
                    placeholder="Ex: Minha loja vende pelo físico e pelo online, mas não sei onde estou perdendo recompra, cliente identificável ou continuidade."
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
                  value="Diagnóstico gratuito"
                />

                <div className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  Você não precisa enviar CSV agora. Primeiro entendemos o contexto;
                  depois indicamos quais relatórios exportar.
                </div>

                {freeAnalysisError && (
                  <div className="rounded-2xl bg-red-50 p-4 text-sm leading-6 text-red-700 ring-1 ring-red-100">
                    {freeAnalysisError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmittingFreeAnalysis}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
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
                  O que acontece depois do diagnóstico gratuito?
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
                O diagnóstico gratuito mostra onde olhar. Se a leitura fizer sentido,
                a Leitura Ohrly Consolidada aprofunda o contexto e organiza as
                janelas de decisão com mais clareza.
              </p>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="font-bold text-slate-950">Inclui:</h3>

                <ul className="mt-3 space-y-2">
                  <li>• Revisão dos sinais encontrados</li>
                  <li>• Separação entre fato, hipótese, ruído e oportunidade</li>
                  <li>• Janelas de decisão priorizadas</li>
                  <li>• Próximos dados que aumentariam a precisão</li>
                  <li>• Comportamentos para acompanhar depois</li>
                </ul>
              </div>

              <p>
                A ideia não é vender uma consultoria genérica. É entender se os
                dados já mostram perda de mensurabilidade, continuidade ou qualidade
                na jornada do cliente.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => {
                  trackMetaEvent("NextStepToFreeAnalysis", {
                    content_name: "Leitura Ohrly consolidada",
                    content_category: "Landing Page",
                    page: "for-ecommerce",
                  });

                  setIsNextStepModalOpen(false);
                  openFreeAnalysisModal();
                }}
                className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800"
              >
                Começar pelo diagnóstico gratuito
              </button>

              <button
                type="button"
                onClick={() => setIsNextStepModalOpen(false)}
                className="inline-flex flex-1 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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