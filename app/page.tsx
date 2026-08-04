"use client";

import {
  type FocusEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { trackEvent } from "@/lib/analytics";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Box,
  CalendarDays,
  Check,
  CheckCircle2,
  CreditCard,
  Headphones,
  Lightbulb,
  LockKeyhole,
  Search,
  ShieldCheck,
  TriangleAlert,
  TrendingDown,
  Users,
} from "lucide-react";

const evidenceCards = [
  {
    title: "Frequência caiu 34%",
    icon: TrendingDown,
    iconClass: "bg-emerald-50 text-emerald-700",
  },
  {
    title: "Mudança persistente há 5 semanas",
    icon: CalendarDays,
    iconClass: "bg-violet-50 text-violet-700",
  },
  {
    title: "Adoção interna mais concentrada",
    icon: Users,
    iconClass: "bg-blue-50 text-blue-700",
  },
  {
    title: "Sem sinais claros de recuperação",
    icon: TrendingDown,
    iconClass: "bg-rose-50 text-rose-700",
  },
];

const problemCards = [
  {
    title: "Alertas sem contexto",
    description: "Sinais importam, mas chegam sem explicação.",
    icon: Bell,
    iconClass: "bg-amber-50 text-amber-600",
  },
  {
    title: "Investigação manual",
    description: "Muitas telas, planilhas e mensagens soltas.",
    icon: Search,
    iconClass: "bg-cyan-50 text-cyan-700",
  },
  {
    title: "Falsos positivos",
    description: "Alertas que não viram ação nem aprendizado.",
    icon: TriangleAlert,
    iconClass: "bg-rose-50 text-rose-600",
  },
  {
    title: "Aprendizado disperso",
    description: "Cada caso fica com quem atendeu, não com o time.",
    icon: BookOpen,
    iconClass: "bg-indigo-50 text-indigo-700",
  },
];

const timelineItems = [
  "O que mudou",
  "Quando começou",
  "Se persistiu",
  "Se houve recuperação",
  "Qual hipótese merece investigação",
];

const readingItems = [
  { label: "Uso do produto em queda", icon: TrendingDown },
  { label: "Menos usuários recorrentes", icon: Users },
  { label: "Atendimento aumentou", icon: Headphones },
  { label: "Padrão semelhante no passado", icon: CalendarDays },
];

const sourceCards = [
  { label: "Produto", icon: Box },
  { label: "Atendimento", icon: Headphones },
  { label: "CRM / CS", icon: Users },
  { label: "Billing", icon: CreditCard },
];

const deliverables = [
  "Integração inicial com uma ou duas fontes",
  "Leitura contextual das contas selecionadas",
  "Revisões semanais com o time",
  "Evolução orientada pelo feedback real",
];

const requirements = [
  "Histórico mínimo de uso ou relacionamento",
  "Responsável por retenção, CS ou operações",
  "Disponibilidade para revisar casos",
  "Um problema de retenção bem delimitado",
];

function LineChart() {
  const points = [
    [0, 14],
    [22, 20],
    [46, 48],
    [70, 60],
    [94, 56],
    [118, 65],
    [142, 48],
    [166, 60],
    [190, 71],
    [214, 88],
  ];

  const path = points
    .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");

  return (
    <div className="mt-5">
      <div className="relative h-44 overflow-hidden rounded-2xl bg-white">
        <svg
          viewBox="0 0 220 110"
          className="h-full w-full"
          role="img"
          aria-label="Trajetória descendente da conta entre março e julho"
          preserveAspectRatio="none"
        >
          {[14, 39, 64, 89].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="220"
              y2={y}
              stroke="#E5E7EB"
              strokeWidth="1"
              strokeDasharray="3 4"
            />
          ))}

          <path
            d={`${path} L 214 110 L 0 110 Z`}
            fill="url(#area)"
            opacity="0.7"
          />
          <path
            d={path}
            fill="none"
            stroke="#047857"
            strokeWidth="2.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="214" cy="88" r="3.5" fill="#DC2626" />

          <defs>
            <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#A7F3D0" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#ECFDF5" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-x-0 bottom-2 flex justify-between px-4 text-[10px] font-medium text-slate-400">
          <span>Mar</span>
          <span>Abr</span>
          <span>Mai</span>
          <span>Jun</span>
          <span>Jul</span>
        </div>
      </div>
    </div>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

const emptyAttribution: Attribution = {
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
  utmTerm: "",
};

function readAttributionFromUrl(): Attribution {
  if (typeof window === "undefined") {
    return emptyAttribution;
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    utmTerm: params.get("utm_term") ?? "",
  };
}

export default function OhrlyLandingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [attribution, setAttribution] =
    useState<Attribution>(emptyAttribution);

  const formStartedRef = useRef(false);
  const trackedSectionsRef = useRef(new Set<string>());
  const trackedScrollDepthsRef = useRef(new Set<number>());

  useEffect(() => {
    const currentAttribution = readAttributionFromUrl();
    setAttribution(currentAttribution);

    trackEvent("lp_view", {
      landingVariant: "founding_customer_v1",
    });

    const engagementTimer = window.setTimeout(() => {
      trackEvent("lp_engaged_10s", {
        landingVariant: "founding_customer_v1",
      });
    }, 10_000);

    return () => {
      window.clearTimeout(engagementTimer);
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "inicio",
      "contato",
      "exemplo",
      "como-funciona",
      "piloto",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const section = entry.target.id;

          if (
            !section ||
            trackedSectionsRef.current.has(section)
          ) {
            continue;
          }

          trackedSectionsRef.current.add(section);

          trackEvent("section_view", {
            section,
            landingVariant: "founding_customer_v1",
          });

          if (section === "contato") {
            trackEvent("form_view", {
              formId: "pilot_application",
            });
          }

          if (section === "exemplo") {
            trackEvent("example_view", {
              exampleId: "account_trajectory",
            });
          }

          if (section === "piloto") {
            trackEvent("pilot_details_view", {
              pilotId: "founding_customer_v1",
            });
          }
        }
      },
      {
        threshold: 0.45,
      },
    );

    for (const sectionId of sectionIds) {
      const element = document.getElementById(sectionId);

      if (element) {
        observer.observe(element);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (documentHeight <= 0) {
        return;
      }

      const depth = Math.min(
        100,
        Math.round((window.scrollY / documentHeight) * 100),
      );

      for (const threshold of [25, 50, 75, 90]) {
        if (
          depth >= threshold &&
          !trackedScrollDepthsRef.current.has(threshold)
        ) {
          trackedScrollDepthsRef.current.add(threshold);

          trackEvent(`scroll_${threshold}`, {
            depthPercent: threshold,
          });
        }
      }
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "idle" | "success" | "error";
    message: string;
  }>({
    type: "idle",
    message: "",
  });

  function handleFormFocus() {
    if (formStartedRef.current) {
      return;
    }

    formStartedRef.current = true;

    trackEvent("form_start", {
      formId: "pilot_application",
    });
  }

  function handleFieldBlur(
    event:
      | FocusEvent<HTMLInputElement>
      | FocusEvent<HTMLTextAreaElement>,
  ) {
    trackEvent("form_field_blur", {
      formId: "pilot_application",
      fieldName: event.currentTarget.name,
      hasValue: event.currentTarget.value.trim().length > 0,
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formId =
      process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ??
      "mkoygpnk";

    if (!formId) {
      setSubmitStatus({
        type: "error",
        message:
          "O formulário ainda não foi configurado. Defina NEXT_PUBLIC_FORMSPREE_FORM_ID.",
      });
      return;
    }

    trackEvent("form_submit_attempt", {
      formId: "pilot_application",
    });

    setIsSubmitting(true);
    setSubmitStatus({
      type: "idle",
      message: "",
    });

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(form),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            errors?: Array<{
              message?: string;
            }>;
          }
        | null;

      if (!response.ok) {
        const formspreeMessage = result?.errors
          ?.map((error) => error.message)
          .filter(Boolean)
          .join(" ");

        throw new Error(
          formspreeMessage ||
            "Não foi possível enviar sua mensagem. Tente novamente em instantes.",
        );
      }

      form.reset();
      formStartedRef.current = false;

      trackEvent("form_submit_success", {
        formId: "pilot_application",
      });

      setSubmitStatus({
        type: "success",
        message:
          "Recebemos sua mensagem. Em breve entraremos em contato para entender sua operação e avaliar se o piloto faz sentido.",
      });
    } catch (error) {
      trackEvent("form_submit_error", {
        formId: "pilot_application",
        errorType: "formspree_request_failed",
      });

      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado durante o envio.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fbfcfb] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#inicio" className="text-2xl font-semibold tracking-tight">
            Ohrly
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <a className="transition hover:text-emerald-800" href="#como-funciona">
              Como funciona
            </a>
            <a className="transition hover:text-emerald-800" href="#piloto">
              Programa piloto
            </a>
            <a className="transition hover:text-emerald-800" href="#exemplo">
              Exemplo
            </a>
            <a className="transition hover:text-emerald-800" href="#contato">
              Contato
            </a>
          </nav>

          <a
            href="#exemplo"
            onClick={() =>
              trackEvent("cta_click", {
                location: "header",
                ctaId: "see_example",
                target: "example",
              })
            }
            className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800"
          >
            Ver exemplo
          </a>
        </div>
      </header>

      <section
        id="inicio"
        className="border-b border-slate-200 bg-white px-5 py-16 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <Users className="h-4 w-4" />
              Em validação com operações SaaS B2B
            </div>

            <h1 className="mt-7 max-w-xl text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-slate-950 sm:text-5xl lg:text-6xl">
              Seu sistema mostra o risco. Mostramos o que está por trás dele.
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Conectamos sinais de produto, atendimento e relacionamento para
              explicar o que mudou na trajetória de cada conta, sem substituir
              as ferramentas que sua empresa já utiliza.
            </p>


          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-[0_24px_70px_rgba(15,23,42,0.09)] sm:p-6">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="text-xs font-medium uppercase tracking-[0.16em] text-slate-400">
                  Análise de conta
                </span>
                <h2 className="mt-1 text-xl font-semibold">Seu negócio</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700">
                  <TriangleAlert className="h-3.5 w-3.5" />
                  Risco atual: alto
                </span>
                <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
                  Health score: 42
                </span>
              </div>
            </div>

            <div className="grid gap-4 pt-5 xl:grid-cols-[1.08fr_0.92fr]">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      Trajetória da conta
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Últimos cinco meses
                    </p>
                  </div>
                  <span className="rounded-lg bg-white px-2 py-1 text-[11px] font-medium text-slate-500 shadow-sm">
                    Uso consolidado
                  </span>
                </div>
                <LineChart />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {evidenceCards.map(({ title, icon: Icon, iconClass }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                  >
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconClass}`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <p className="mt-3 text-sm font-semibold leading-5 text-slate-800">
                      {title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-800 shadow-sm">
                <Lightbulb className="h-5 w-5" />
              </span>
              <p className="text-sm leading-6 text-emerald-950">
                <strong>Leitura contextual:</strong> o risco parece mais ligado à
                perda de adoção do que a um problema contratual.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contato" className="border-b border-slate-200 px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Quantas telas seu time precisa abrir para entender uma conta em
              risco?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Vamos entender como seu time investiga contas em risco e avaliar
              se existe um recorte pequeno e útil para um primeiro piloto.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
                <p className="text-sm leading-6 text-slate-600">
                  Segurança e privacidade levadas a sério
                </p>
              </div>

              <div className="flex items-start gap-3">
                <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
                <p className="text-sm leading-6 text-slate-600">
                  Seus dados ficam sempre sob controle
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Users className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
                <p className="text-sm leading-6 text-slate-600">
                  Desenvolvido junto com uma operação parceira
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            onFocusCapture={handleFormFocus}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-7"
          >
            <input
              type="hidden"
              name="source"
              value="Ohrly landing page - programa piloto"
            />
            <input
              type="hidden"
              name="landing_variant"
              value="founding_customer_v1"
            />
            <input
              type="hidden"
              name="utm_source"
              value={attribution.utmSource}
            />
            <input
              type="hidden"
              name="utm_medium"
              value={attribution.utmMedium}
            />
            <input
              type="hidden"
              name="utm_campaign"
              value={attribution.utmCampaign}
            />
            <input
              type="hidden"
              name="utm_content"
              value={attribution.utmContent}
            />
            <input
              type="hidden"
              name="utm_term"
              value={attribution.utmTerm}
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm font-medium text-slate-700">
                Nome
                <input
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                  onBlur={handleFieldBlur}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                />
              </label>

              <label className="space-y-2 text-sm font-medium text-slate-700">
                Empresa
                <input
                  name="company"
                  type="text"
                  placeholder="Nome da empresa"
                  autoComplete="organization"
                  required
                  onBlur={handleFieldBlur}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
            </div>

            <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
              E-mail corporativo
              <input
                name="email"
                type="email"
                placeholder="voce@empresa.com"
                autoComplete="email"
                required
                onBlur={handleFieldBlur}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <label className="mt-4 block space-y-2 text-sm font-medium text-slate-700">
              Como vocês identificam contas em risco hoje?
              <textarea
                name="message"
                rows={5}
                placeholder="Conte brevemente como funciona o processo atual."
                required
                onBlur={handleFieldBlur}
                className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Enviando..."
                : "Quero avaliar um piloto"}
              {!isSubmitting && <ArrowRight className="h-4 w-4" />}
            </button>

            {submitStatus.type !== "idle" && (
              <p
                role={submitStatus.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${
                  submitStatus.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                {submitStatus.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="bg-white px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[0.78fr_1.22fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Uma conta aparece como risco. E agora?
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Times de receita precisam abrir várias ferramentas, juntar pedaços
              de informação e reconstruir a história para entender o que
              realmente está acontecendo.
            </p>

            <div className="mt-8 border-l-2 border-emerald-700 pl-5">
              <p className="max-w-lg text-base leading-7 text-slate-700">
                O problema nem sempre é descobrir o risco.
                <strong className="block text-emerald-800">
                  É transformar o risco em contexto suficiente para decidir.
                </strong>
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {problemCards.map(
              ({ title, description, icon: Icon, iconClass }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-base font-semibold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section
        id="exemplo"
        className="border-y border-slate-200 px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Uma leitura única da trajetória da conta
            </h2>

            <ol className="relative mt-9 space-y-6 before:absolute before:bottom-4 before:left-4 before:top-4 before:w-px before:bg-emerald-200">
              {timelineItems.map((item, index) => (
                <li key={item} className="relative flex items-center gap-4">
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs font-bold text-white ring-4 ring-white">
                    {index + 1}
                  </span>
                  <span className="text-base font-medium text-slate-700">
                    {item}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:p-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                    Exemplo de leitura
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">
                    O que merece investigação agora
                  </h3>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                  Contexto consolidado
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {readingItems.map(({ label, icon: Icon }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-800">
                      <Icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-medium text-slate-700">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "fora do padrão",
                "persistência",
                "recuperação",
                "adoção",
                "suporte",
                "trajetória",
              ].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-white border-b border-slate-200 px-5 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Não substituímos sua ferramenta atual
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              O Ohrly funciona sobre o que sua empresa já utiliza.
            </p>
          </div>

          <div className="mt-12 grid items-center gap-6 lg:grid-cols-[1fr_auto_0.48fr_auto_0.48fr]">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {sourceCards.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
                >
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 text-sm font-medium text-slate-700">{label}</p>
                </div>
              ))}
            </div>

            <ArrowRight className="mx-auto hidden h-6 w-6 text-slate-400 lg:block" />

            <div className="rounded-2xl bg-emerald-900 px-6 py-8 text-center text-2xl font-semibold text-white shadow-lg shadow-emerald-950/10">
              Ohrly
            </div>

            <ArrowRight className="mx-auto hidden h-6 w-6 text-slate-400 lg:block" />

            <div className="flex min-h-28 items-center justify-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-6 text-center text-sm font-semibold text-emerald-900">
              <CheckCircle2 className="h-6 w-6 shrink-0" />
              Contexto para agir
            </div>
          </div>

          <p className="mt-7 text-center text-sm text-slate-500">
            Sua ferramenta aponta a conta. O Ohrly ajuda o time a entender a
            trajetória.
          </p>
        </div>
      </section>

      <section
        id="piloto"
        className="border-y border-emerald-100 bg-emerald-50/45 px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="self-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Programa piloto acompanhado
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Aplicamos o Ohrly a um problema real da sua operação
            </h2>
            <p className="mt-5 max-w-lg text-base leading-7 text-slate-600">
              Selecionaremos uma operação para um ciclo de 6 a 8 semanas,
              com escopo reduzido, revisão semanal e aprendizado compartilhado
              sobre quais sinais realmente ajudam o time a decidir.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                O que entregamos
              </h3>
              <CheckList items={deliverables} />
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                O que precisamos
              </h3>
              <CheckList items={requirements} />
            </article>
          </div>
          <div >
              <a
                href="#contato"
                onClick={() =>
                  trackEvent("cta_click", {
                    location: "pilot",
                    ctaId: "evaluate_pilot",
                    target: "contact",
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
              >
                Quero avaliar um piloto
                <ArrowRight className="h-4 w-4" />
              </a>
              <p className="mt-3 text-xs leading-5 text-slate-500">
                Começamos com um único problema de retenção, uma população de
                contas e uma ou duas fontes de dados, sem substituir suas
                ferramentas atuais.
              </p>
            </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>© {new Date().getFullYear()} Ohrly. Todos os direitos reservados.</span>
          <span>Contexto comportamental para decisões de retenção.</span>
        </div>
      </footer>
    </main>
  );
}