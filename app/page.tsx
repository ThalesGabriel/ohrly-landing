"use client";

import {
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { trackEvent } from "@/lib/analytics";
import { trackMetaLead } from "@/lib/meta-pixel";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Clock3,
  Download,
  LockKeyhole,
  RefreshCcw,
  ShieldCheck,
  TrendingDown,
  Users,
} from "lucide-react";
import Image from "next/image";

const LANDING_VARIANT = "churn_ebook_v1_hero_form";
const EBOOK_FORM_ID = "ebook_download";
const PILOT_FORM_ID = "pilot_application";
const EBOOK_URL =
  process.env.NEXT_PUBLIC_EBOOK_URL ??
  "/antes_do_churn.pdf";

const timelineItems = [
  {
    week: "Semana 1",
    title: "A frequência fica abaixo do padrão",
    description:
      "A conta começa a se afastar do próprio comportamento histórico.",
  },
  {
    week: "Semana 2",
    title: "A mudança permanece",
    description:
      "O desvio deixa de parecer apenas uma oscilação pontual.",
  },
  {
    week: "Semana 3",
    title: "Menos usuários continuam ativos",
    description:
      "A adoção passa a se concentrar em um grupo menor dentro da conta.",
  },
  {
    week: "Semana 4",
    title: "O uso se concentra em uma pessoa",
    description:
      "A dependência de poucos usuários aumenta a fragilidade da relação.",
  },
  {
    week: "Semana 5",
    title: "Há melhora parcial, mas não recuperação",
    description:
      "A conta ainda permanece materialmente distante do padrão anterior.",
  },
];

const problemCards = [
  {
    title: "Os sinais estão espalhados",
    description:
      "Uso, atendimento, CRM e contexto comercial contam partes diferentes da história.",
    icon: BarChart3,
  },
  {
    title: "A conta ainda parece normal",
    description:
      "Pequenas mudanças são tratadas como ruído até se acumularem por várias semanas.",
    icon: Clock3,
  },
  {
    title: "O time precisa priorizar",
    description:
      "Com muitas contas, o CSM não consegue reconstruir manualmente cada trajetória.",
    icon: Users,
  },
];

const pilotSteps = [
  "Selecionamos uma população de contas.",
  "Usamos o histórico de comportamento e relacionamento.",
  "Reconstruímos trajetórias anteriores ao churn.",
  "Comparamos contas churnadas, recuperadas e saudáveis.",
  "Revisamos os casos com quem conhece a operação.",
];

const deliverables = [
  "Trajetórias reconstruídas por conta",
  "Mudanças que apareceram antes do churn",
  "Casos em que houve recuperação",
  "Sinais que já estavam ou não no radar do time",
  "Hipóteses para o primeiro monitoramento contínuo",
];

const nonPromises = [
  "Prever todo churn",
  "Identificar causa raiz automaticamente",
  "Substituir o julgamento do CSM",
  "Provar prevenção antes do piloto",
];

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

function CheckList({
  items,
  tone = "positive",
}: {
  items: string[];
  tone?: "positive" | "neutral";
}) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
          <span
            className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${tone === "positive"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-500"
              }`}
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function OhrlyLandingPage() {
  type SubmitStatus = {
    type: "idle" | "success" | "error";
    message: string;
  };

  const idleSubmitStatus: SubmitStatus = {
    type: "idle",
    message: "",
  };

  const [submittingFormId, setSubmittingFormId] = useState<string | null>(null);
  const [attribution, setAttribution] =
    useState<Attribution>(emptyAttribution);
  const [submitStatusByForm, setSubmitStatusByForm] = useState<
    Record<string, SubmitStatus>
  >({
    [EBOOK_FORM_ID]: idleSubmitStatus,
    [PILOT_FORM_ID]: idleSubmitStatus,
  });

  const ebookFormRef = useRef<HTMLFormElement | null>(null);
  const pilotFormRef = useRef<HTMLFormElement | null>(null);
  const formStartedRef = useRef(new Set<string>());
  const formViewTrackedRef = useRef(new Set<string>());
  const trackedSectionsRef = useRef(new Set<string>());
  const trackedScrollDepthsRef = useRef(new Set<number>());
  const trackedStartedFieldsRef = useRef(new Set<string>());

  useEffect(() => {
    const currentAttribution = readAttributionFromUrl();
    setAttribution(currentAttribution);

    trackEvent("lp_view", {
      landingVariant: LANDING_VARIANT,
    });

    const engagementTimer = window.setTimeout(() => {
      trackEvent("lp_engaged_10s", {
        landingVariant: LANDING_VARIANT,
      });
    }, 10_000);

    return () => {
      window.clearTimeout(engagementTimer);
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "inicio",
      "ponte-churn",
      "exemplo",
      "problema",
      "como-funciona",
      "piloto",
      "fundador",
      "contato",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const section = entry.target.id;

          if (!section || trackedSectionsRef.current.has(section)) {
            continue;
          }

          trackedSectionsRef.current.add(section);

          trackEvent("section_view", {
            section,
            landingVariant: LANDING_VARIANT,
          });

          if (section === "ponte-churn") {
            trackEvent("churn_bridge_view", {
              landingVariant: LANDING_VARIANT,
            });
          }

          if (section === "exemplo") {
            trackEvent("example_view", {
              exampleId: "account_trajectory",
              landingVariant: LANDING_VARIANT,
            });
          }

          if (section === "piloto") {
            trackEvent("pilot_details_view", {
              pilotId: LANDING_VARIANT,
              landingVariant: LANDING_VARIANT,
            });
          }
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px",
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
    const forms = [ebookFormRef.current, pilotFormRef.current].filter(
      (form): form is HTMLFormElement => Boolean(form),
    );

    if (forms.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          const form = entry.target as HTMLFormElement;
          const formId = form.dataset.formId;

          if (!formId || formViewTrackedRef.current.has(formId)) {
            continue;
          }

          formViewTrackedRef.current.add(formId);

          trackEvent("form_view", {
            formId,
            landingVariant: LANDING_VARIANT,
          });
        }
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    for (const form of forms) {
      observer.observe(form);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    function handleScroll() {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

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
            landingVariant: LANDING_VARIANT,
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

  function getFormIdFromElement(element: Element) {
    return (
      element.closest("form")?.getAttribute("data-form-id") ??
      "unknown_form"
    );
  }

  function setFormStatus(formId: string, status: SubmitStatus) {
    setSubmitStatusByForm((current) => ({
      ...current,
      [formId]: status,
    }));
  }

  function handleFormFocus(event: FocusEvent<HTMLFormElement>) {
    const formId =
      event.currentTarget.dataset.formId ?? "unknown_form";

    if (formStartedRef.current.has(formId)) {
      return;
    }

    formStartedRef.current.add(formId);

    trackEvent("form_start", {
      formId,
      landingVariant: LANDING_VARIANT,
    });
  }

  function handleFieldChange(
    event:
      | ChangeEvent<HTMLInputElement>
      | ChangeEvent<HTMLTextAreaElement>
      | ChangeEvent<HTMLSelectElement>,
  ) {
    const formId = getFormIdFromElement(event.currentTarget);
    const fieldName = event.currentTarget.name;
    const fieldKey = `${formId}:${fieldName}`;
    const fieldValue =
      event.currentTarget instanceof HTMLInputElement &&
      event.currentTarget.type === "checkbox"
        ? event.currentTarget.checked
          ? event.currentTarget.value
          : ""
        : event.currentTarget.value;

    if (
      fieldValue.trim().length > 0 &&
      !trackedStartedFieldsRef.current.has(fieldKey)
    ) {
      trackedStartedFieldsRef.current.add(fieldKey);

      trackEvent("form_field_started", {
        formId,
        fieldName,
        landingVariant: LANDING_VARIANT,
      });
    }
  }

  function handleFieldBlur(
    event:
      | FocusEvent<HTMLInputElement>
      | FocusEvent<HTMLTextAreaElement>
      | FocusEvent<HTMLSelectElement>,
  ) {
    const formId = getFormIdFromElement(event.currentTarget);
    const value =
      event.currentTarget instanceof HTMLInputElement &&
      event.currentTarget.type === "checkbox"
        ? event.currentTarget.checked
          ? event.currentTarget.value
          : ""
        : event.currentTarget.value;

    trackEvent("form_field_blur", {
      formId,
      fieldName: event.currentTarget.name,
      hasValue: value.trim().length > 0,
      landingVariant: LANDING_VARIANT,
    });
  }

  function triggerEbookDownload() {
    const anchor = document.createElement("a");
    anchor.href = EBOOK_URL;
    anchor.download = "churn-antes-do-churn-ohrly.pdf";
    anchor.rel = "noopener";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formId = form.dataset.formId ?? "unknown_form";
    const isEbookForm = formId === EBOOK_FORM_ID;
    const formspreeFormId =
      process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID ??
      "mkoygpnk";

    if (!formspreeFormId) {
      setFormStatus(formId, {
        type: "error",
        message:
          "O formulário ainda não foi configurado. Defina NEXT_PUBLIC_FORMSPREE_FORM_ID.",
      });
      return;
    }

    trackEvent("form_submit_attempt", {
      formId,
      landingVariant: LANDING_VARIANT,
    });

    setSubmittingFormId(formId);
    setFormStatus(formId, idleSubmitStatus);

    try {
      const response = await fetch(
        `https://formspree.io/f/${formspreeFormId}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: new FormData(form),
        },
      );

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
            "Não foi possível enviar suas informações. Tente novamente em instantes.",
        );
      }

      form.reset();
      formStartedRef.current.delete(formId);

      for (const fieldKey of Array.from(
        trackedStartedFieldsRef.current,
      )) {
        if (fieldKey.startsWith(`${formId}:`)) {
          trackedStartedFieldsRef.current.delete(fieldKey);
        }
      }

      trackEvent("form_submit_success", {
        formId,
        landingVariant: LANDING_VARIANT,
      });

      trackMetaLead();

      if (isEbookForm) {
        trackEvent("ebook_download", {
          ebookId: "churn_antes_do_churn",
          source: "hero_form",
          landingVariant: LANDING_VARIANT,
        });

        triggerEbookDownload();

        setFormStatus(formId, {
          type: "success",
          message:
            "Pronto. O download do ebook foi iniciado. Se ele não abrir automaticamente, use o link abaixo.",
        });
      } else {
        setFormStatus(formId, {
          type: "success",
          message:
            "Recebemos suas informações. Entraremos em contato para avaliar a aderência da operação ao piloto.",
        });
      }
    } catch (error) {
      trackEvent("form_submit_error", {
        formId,
        errorType: "formspree_request_failed",
        landingVariant: LANDING_VARIANT,
      });

      setFormStatus(formId, {
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado durante o envio.",
      });
    } finally {
      setSubmittingFormId(null);
    }
  }

  const ebookSubmitStatus =
    submitStatusByForm[EBOOK_FORM_ID] ?? idleSubmitStatus;
  const pilotSubmitStatus =
    submitStatusByForm[PILOT_FORM_ID] ?? idleSubmitStatus;
  const ebookIsSubmitting = submittingFormId === EBOOK_FORM_ID;
  const pilotIsSubmitting = submittingFormId === PILOT_FORM_ID;

  return (
    <main className="min-h-screen bg-[#fbfcfb] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a
            href="#inicio"
            className="text-2xl font-semibold tracking-tight"
          >
            Ohrly
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 lg:flex">
            <a
              className="transition hover:text-emerald-800"
              href="#exemplo"
            >
              Exemplo
            </a>
            <a
              className="transition hover:text-emerald-800"
              href="#como-funciona"
            >
              Como funciona
            </a>
            <a
              className="transition hover:text-emerald-800"
              href="#piloto"
            >
              Piloto
            </a>
          </nav>

          <a
            href="#ebook-form"
            onClick={() =>
              trackEvent("cta_click", {
                location: "header",
                ctaId: "download_ebook",
                target: "ebook_form",
                landingVariant: LANDING_VARIANT,
              })
            }
            className="rounded-xl bg-emerald-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800"
          >
            Baixar ebook
          </a>
        </div>
      </header>

      <section
        id="inicio"
        className="relative overflow-hidden border-b border-slate-200 bg-[#fbfcf9] px-5 py-14 sm:py-20 lg:px-8 lg:py-24"
      >
        <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-emerald-50/70" />
        <div className="pointer-events-none absolute right-[8%] top-24 hidden grid-cols-6 gap-3 opacity-50 lg:grid">
          {Array.from({ length: 24 }).map((_, index) => (
            <span
              key={index}
              className="h-1 w-1 rounded-full bg-emerald-800"
            />
          ))}
        </div>

        <div className="relative mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          <div className="lg:pt-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
              <BookOpen className="h-4 w-4" />
              Ebook gratuito para SaaS B2B
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              O churn do seu SaaS B2B está acima da meta?
            </h1>

            <div className="mt-6 h-1.5 w-24 rounded-full bg-emerald-900" />

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Descubra onde o comportamento do cliente começa a mudar antes
              do cancelamento, e por que olhar apenas o estado atual pode
              esconder parte da história.
            </p>

            <div className="mt-8 max-w-xl rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                Exemplo ilustrativo
              </p>

              <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-5">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Meta de churn
                  </p>
                  <p className="mt-1 text-5xl font-medium tracking-tight text-emerald-900">
                    3%
                  </p>
                </div>

                <div className="h-20 w-px bg-slate-200" />

                <div>
                  <p className="text-sm font-medium text-slate-600">Atual</p>
                  <div className="mt-1 flex items-center gap-3">
                    <p className="text-5xl font-semibold tracking-tight text-slate-950">
                      5,1%
                    </p>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-700">
                      <TrendingDown className="h-5 w-5 rotate-180" />
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-rose-700">
                    Acima da meta
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
              {[
                {
                  label: "snapshot ≠ trajetória",
                  icon: TrendingDown,
                },
                {
                  label: "melhorar ≠ recuperar",
                  icon: RefreshCcw,
                },
                {
                  label: "quando esperar deixa de ser neutro?",
                  icon: Clock3,
                },
              ].map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-start gap-2.5 border-t border-slate-200 pt-3 text-sm leading-5 text-slate-600"
                >
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-800" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <form
            id="ebook-form"
            ref={ebookFormRef}
            data-form-id={EBOOK_FORM_ID}
            onSubmit={handleSubmit}
            onFocusCapture={handleFormFocus}
            className="relative rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_70px_rgba(15,23,42,0.11)] sm:p-7 lg:p-8"
          >
            <input
              type="hidden"
              name="source"
              value="Ohrly landing page - ebook Churn antes do churn"
            />
            <input type="hidden" name="intent" value="ebook_download" />
            <input
              type="hidden"
              name="ebook"
              value="churn_antes_do_churn"
            />
            <input
              type="hidden"
              name="landing_variant"
              value={LANDING_VARIANT}
            />
            <input type="hidden" name="utm_source" value={attribution.utmSource} />
            <input type="hidden" name="utm_medium" value={attribution.utmMedium} />
            <input type="hidden" name="utm_campaign" value={attribution.utmCampaign} />
            <input type="hidden" name="utm_content" value={attribution.utmContent} />
            <input type="hidden" name="utm_term" value={attribution.utmTerm} />

            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <BookOpen className="h-4 w-4" />
              Ebook gratuito
            </div>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Baixe Churn antes do churn
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Uma leitura curta sobre trajetória, recuperação e o momento em
              que esperar por mais certeza começa a consumir a janela de
              decisão.
            </p>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Nome
                <input
                  name="name"
                  type="text"
                  placeholder="Seu nome"
                  autoComplete="name"
                  required
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                E-mail profissional
                <input
                  name="email"
                  type="email"
                  placeholder="voce@empresa.com"
                  autoComplete="email"
                  inputMode="email"
                  required
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                />
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Empresa
                <input
                  name="company"
                  type="text"
                  placeholder="Nome da empresa"
                  autoComplete="organization"
                  required
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={ebookIsSubmitting}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {ebookIsSubmitting ? "Preparando download..." : "Baixar ebook gratuito"}
              {!ebookIsSubmitting && <Download className="h-4 w-4" />}
            </button>

            <div className="mt-3 flex items-center justify-center gap-2 text-xs leading-5 text-slate-500">
              <LockKeyhole className="h-3.5 w-3.5" />
              <span>Sem spam. Apenas o material.</span>
            </div>

            {ebookSubmitStatus.type !== "idle" && (
              <div
                role={ebookSubmitStatus.type === "error" ? "alert" : "status"}
                aria-live="polite"
                className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${
                  ebookSubmitStatus.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                <p>{ebookSubmitStatus.message}</p>
                {ebookSubmitStatus.type === "success" && (
                  <a
                    href={EBOOK_URL}
                    download="churn-antes-do-churn-ohrly.pdf"
                    onClick={() =>
                      trackEvent("ebook_download_fallback", {
                        ebookId: "churn_antes_do_churn",
                        landingVariant: LANDING_VARIANT,
                      })
                    }
                    className="mt-2 inline-flex items-center gap-1.5 font-semibold underline underline-offset-4"
                  >
                    Baixar novamente
                    <Download className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}

            <div className="mt-7 flex items-end justify-between gap-6 border-t border-slate-100 pt-5">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                  <Clock3 className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="font-semibold text-slate-800">Leitura rápida</p>
                  <p className="text-xs text-slate-500">5 páginas · SaaS B2B</p>
                </div>
              </div>

              <div className="hidden h-36 w-24 rotate-2 rounded-sm border border-stone-200 bg-[#faf9f4] p-3 shadow-[8px_10px_24px_rgba(15,23,42,0.12)] sm:block">
                <p className="text-[7px] font-semibold tracking-[0.22em] text-slate-800">
                  OHRLY
                </p>
                <p className="mt-5 text-lg font-semibold leading-5 tracking-tight text-slate-900">
                  Churn
                  <br />
                  antes do
                  <br />
                  churn
                </p>
                <div className="mt-5 h-7 w-7 rounded-full bg-emerald-100" />
              </div>
            </div>
          </form>
        </div>
      </section>

      <section
        id="ponte-churn"
        className="border-b border-slate-200 bg-emerald-950 px-5 py-16 text-white lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-300">
            Antes do cancelamento
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            O cancelamento é o fim da história. O Ohrly procura onde ela
            começou.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-emerald-50/80 sm:text-lg">
            Antes de alguns churns, a conta passa por mudanças graduais de
            uso, adoção, atendimento ou relacionamento. Nenhum sinal
            isolado prova que haverá cancelamento. O que importa é saber se
            a mudança persistiu e qual trajetória está em curso.
          </p>

          <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-5">
            {[
              "Comportamento habitual",
              "Primeira mudança",
              "Persistência",
              "Não recuperação",
              "Churn evidente",
            ].map((item, index) => (
              <div
                key={item}
                className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-medium text-white"
              >
                <span className="mb-2 block text-xs font-semibold text-emerald-300">
                  0{index + 1}
                </span>
                {item}
              </div>
            ))}
          </div>

          <p className="mt-5 text-sm font-semibold text-emerald-300">
            A janela de investigação acontece antes de o churn ficar
            evidente.
          </p>
        </div>
      </section>

      <section
        id="exemplo"
        className="border-b border-slate-200 bg-white px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Exemplo de análise
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Como o Ohrly leria uma conta antes do cancelamento
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              O objetivo não é afirmar que a conta vai churnar. É mostrar
              quando uma mudança deixou de parecer apenas uma semana ruim.
            </p>

            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
              <p className="text-sm font-semibold text-emerald-950">
                O que o time poderia investigar
              </p>
              <p className="mt-2 text-sm leading-6 text-emerald-900">
                Adoção interna, mudança de champion, fricção no produto ou
                problema recorrente no suporte.
              </p>
            </div>
          </div>

          <ol className="relative space-y-4 before:absolute before:bottom-6 before:left-[17px] before:top-6 before:w-px before:bg-emerald-200">
            {timelineItems.map((item, index) => (
              <li
                key={item.week}
                className="relative flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
              >
                <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-900 text-xs font-bold text-white ring-4 ring-white">
                  {index + 1}
                </span>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    {item.week}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="problema"
        className="border-b border-slate-200 px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Por que o churn costuma parecer repentino?
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              O problema não é a ausência de dados. É transformar sinais
              pequenos e dispersos em uma leitura que ajude o time a decidir.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {problemCards.map(({ title, description, icon: Icon }) => (
              <article
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-800">
                  <Icon className="h-5 w-5" />
                </span>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-10 max-w-3xl border-l-2 border-emerald-700 pl-5">
            <p className="text-base leading-7 text-slate-700">
              O Ohrly não tenta transformar toda oscilação em alerta.
              <strong className="block text-emerald-800">
                Ele mostra quando uma mudança persistente deixou de parecer
                apenas variação.
              </strong>
            </p>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="border-b border-slate-200 bg-white px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.82fr_1.18fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Como o estudo começa
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Começamos com um problema pequeno e verificável
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              O objetivo inicial não é prometer que todo churn pode ser
              previsto. É descobrir se existem mudanças que o seu time
              poderia ter percebido enquanto ainda havia algo a fazer.
            </p>
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {pilotSteps.map((step, index) => (
              <li
                key={step}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-900 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="text-sm font-medium leading-6 text-slate-700">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        id="piloto"
        className="border-b border-emerald-100 bg-emerald-50/45 px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Programa piloto acompanhado
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Vamos investigar se os seus churns anteriores deixaram sinais
              antes do cancelamento
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-600">
              Selecionaremos uma operação para um ciclo de 6 a 8 semanas,
              com escopo reduzido, revisão dos casos e aprendizado
              compartilhado.
            </p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                O que entregamos
              </h3>
              <CheckList items={deliverables} />
            </article>

            <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">
                O que não prometemos
              </h3>
              <CheckList items={nonPromises} tone="neutral" />
            </article>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#contato"
              onClick={() =>
                trackEvent("cta_click", {
                  location: "pilot",
                  ctaId: "evaluate_pilot_fit",
                  target: "contact",
                  landingVariant: LANDING_VARIANT,
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Quero avaliar aderência ao piloto
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section
        id="fundador"
        className="border-b border-slate-200 bg-white px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-5xl gap-6 rounded-[28px] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:grid-cols-[96px_1fr] sm:items-center sm:p-8 lg:grid-cols-[112px_1fr_auto] lg:gap-8">
          <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mx-0 lg:h-28 lg:w-28">
            <Image
              src="/images/thales_profile.png"
              alt="Thales Araujo, fundador do Ohrly"
              fill
              sizes="(min-width: 1024px) 112px, 96px"
              className="object-cover"
            />
          </div>

          <div className="text-center sm:text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Acompanhamento direto
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
              O piloto será conduzido diretamente por Thales Araujo
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Engenheiro de software e fundador do Ohrly, com experiência em
              sistemas conversacionais e operações digitais. As revisões dos casos
              e a evolução do modelo serão realizadas em conjunto com a operação
              parceira.
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800">
                Revisões dos casos
              </span>

              <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800">
                Escopo reduzido
              </span>

              <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-medium text-emerald-800">
                Evolução conjunta
              </span>
            </div>
          </div>

          <a
            href="#contato"
            onClick={() =>
              trackEvent("cta_click", {
                location: "founder",
                ctaId: "talk_to_founder",
                target: "contact",
                landingVariant: LANDING_VARIANT,
              })
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-emerald-700 hover:text-emerald-800 sm:col-start-2 sm:w-fit lg:col-start-auto"
          >
            Conversar com o fundador
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section
        id="contato"
        className="px-5 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
              Primeiro contato
            </p>
      
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Vamos entender se o piloto faz sentido para sua operação
            </h2>
      
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600">
              Deixe seus dados de contato. Vou analisar pessoalmente o
              contexto da empresa e retornar para uma conversa inicial,
              sem compromisso.
            </p>
      
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
      
                <p className="text-sm leading-6 text-slate-600">
                  Nenhuma contratação é feita nesta etapa.
                </p>
              </div>
      
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
      
                <p className="text-sm leading-6 text-slate-600">
                  O preenchimento leva menos de 30 segundos.
                </p>
              </div>
      
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-800" />
      
                <p className="text-sm leading-6 text-slate-600">
                  Volume de contas, fontes de dados e cenário de churn serão
                  discutidos somente depois.
                </p>
              </div>
            </div>
          </div>
      
          <form
            ref={pilotFormRef}
            data-form-id={PILOT_FORM_ID}
            onSubmit={handleSubmit}
            onFocusCapture={handleFormFocus}
            className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-7"
          >
            <input
              type="hidden"
              name="source"
              value="Ohrly landing page - pilot application"
            />
      
            <input
              type="hidden"
              name="landing_variant"
              value={LANDING_VARIANT}
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
                  onChange={handleFieldChange}
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
                  onChange={handleFieldChange}
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
                inputMode="email"
                required
                onChange={handleFieldChange}
                onBlur={handleFieldBlur}
                className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100"
              />
            </label>
      
            <button
              type="submit"
              disabled={pilotIsSubmitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-900 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pilotIsSubmitting
                ? "Enviando..."
                : "Quero conversar sobre o piloto"}
      
              {!pilotIsSubmitting && (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
      
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Sem compromisso e sem contratação automática. Você receberá
              um retorno por e-mail para combinar a conversa inicial.
            </p>
      
            {pilotSubmitStatus.type !== "idle" && (
              <p
                role={
                  pilotSubmitStatus.type === "error"
                    ? "alert"
                    : "status"
                }
                aria-live="polite"
                className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${
                  pilotSubmitStatus.type === "success"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                    : "border-rose-200 bg-rose-50 text-rose-800"
                }`}
              >
                {pilotSubmitStatus.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white px-5 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <span>
            © {new Date().getFullYear()} Ohrly. Todos os direitos
            reservados.
          </span>
          <span>
            Contexto comportamental para decisões de retenção.
          </span>
        </div>
      </footer>
    </main>
  );
}
