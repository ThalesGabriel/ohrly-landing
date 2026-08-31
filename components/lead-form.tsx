"use client";

import {
  FormEvent,
  InvalidEvent,
  MouseEvent,
  useState,
} from "react";

import {
  getClientTrackingContext,
  trackBehavior,
} from "@/lib/tracking/client";
import { trackMetaLead } from "@/lib/tracking/meta-pixel";

type SubmitStatus = "idle" | "sending" | "success" | "error";

export type LeadFormAnalyticsContext = {
  journeyStage?: string | null;
  demoId?: string | null;
  demoRunId?: string | null;
  entrySourceCtaId?: string | null;
  entrySourceLocation?: string | null;
  selectedAccount?: string | null;
  selectedAction?: string | null;
};

export function LeadForm({
  analyticsContext = {},
}: {
  analyticsContext?: LeadFormAnalyticsContext;
}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const eventContext = {
    journeyStage: analyticsContext.journeyStage ?? "post_demo",
    demoId: analyticsContext.demoId ?? null,
    demoRunId: analyticsContext.demoRunId ?? null,
    entrySourceCtaId: analyticsContext.entrySourceCtaId ?? null,
    entrySourceLocation: analyticsContext.entrySourceLocation ?? null,
    selectedAccount: analyticsContext.selectedAccount ?? null,
    selectedAction: analyticsContext.selectedAction ?? null,
  };

  function onSubmitClick(
    event: MouseEvent<HTMLButtonElement>,
  ) {
    if (status === "sending") return;

    void trackBehavior("form_submit_click", {
      elementId: "attention_lead_form",
      ...eventContext,
    });
  }

  function onInvalid(
    event: InvalidEvent<HTMLFormElement>,
  ) {
    const field = event.target as
      | HTMLInputElement
      | HTMLSelectElement;

    if (!field?.name) return;

    void trackBehavior("form_validation_error", {
      elementId: "attention_lead_form",
      ...eventContext,
      field: field.name,
      validity: {
        valueMissing: field.validity.valueMissing,
        typeMismatch: field.validity.typeMismatch,
        patternMismatch: field.validity.patternMismatch,
      },
    });
  }

  function normalizeCompanySite(value: string) {
  const raw = value.trim();

  if (!raw) return null;

  const candidate = /^https?:\/\//i.test(raw)
    ? raw
    : `https://${raw}`;

  try {
    const url = new URL(candidate);

    if (!url.hostname || !url.hostname.includes(".")) {
      return null;
    }

    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function isValidEmail(value: string) {
  const email = value.trim();

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function onSubmit(
  event: FormEvent<HTMLFormElement>,
) {
  event.preventDefault();

  if (status === "sending") return;

  const form = event.currentTarget;
  const data = new FormData(form);

  const email = String(
    data.get("email") || "",
  ).trim();

  const rawCompanySite = String(
    data.get("companySite") || "",
  ).trim();

  const companySite =
    normalizeCompanySite(rawCompanySite);

  const customerCount = String(
    data.get("customerCount") || "",
  ).trim();

  const website = String(
    data.get("website") || "",
  ).trim();

  /*
   * 1. VALIDAÇÃO
   *
   * form_submit_attempt ainda NÃO aconteceu.
   */

  const errors: Array<{
    field: string;
    message: string;
  }> = [];

  if (!isValidEmail(email)) {
    errors.push({
      field: "email",
      message: "Digite um e-mail válido.",
    });
  }

  if (!companySite) {
    errors.push({
      field: "companySite",
      message:
        "Digite um site válido, como empresa.com.br.",
    });
  }

  if (!customerCount) {
    errors.push({
      field: "customerCount",
      message:
        "Selecione quantas contas o time acompanha.",
    });
  }

  if (errors.length > 0) {
    setMessage(errors[0].message);

    for (const error of errors) {
      void trackBehavior(
        "form_validation_error",
        {
          elementId: "attention_lead_form",
          ...eventContext,
          field: error.field,
          reason: "invalid_value",
        },
      );
    }

    const firstInvalid =
      form.elements.namedItem(
        errors[0].field,
      );

    if (
      firstInvalid instanceof
        HTMLElement
    ) {
      firstInvalid.focus();
    }

    return;
  }

  /*
   * 2. A partir daqui temos um formulário
   * realmente válido.
   */

  const clientEventId =
    crypto.randomUUID();

  const tracking =
    getClientTrackingContext();

  setStatus("sending");
  setMessage("");

  void trackBehavior(
    "form_submit_attempt",
    {
      elementId:
        "attention_lead_form",
      ...eventContext,
      customerCount,
    },
  );

  try {
    const response = await fetch(
      "/api/lead",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          companySite,
          customerCount,
          website,
          clientEventId,
          tracking,
          journey: eventContext,
        }),
      },
    );

    const result =
      (await response
        .json()
        .catch(() => null)) as
        | {
            ok?: boolean;
            error?: string;
          }
        | null;

    if (
      !response.ok ||
      !result?.ok
    ) {
      throw new Error(
        result?.error ||
          "submit_failed",
      );
    }

    if (
      tracking.consent?.marketing
    ) {
      trackMetaLead(
        clientEventId,
        {
          landing_variant:
            tracking.landingVariant,
          customer_count:
            customerCount,
          journey_stage: eventContext.journeyStage,
          demo_id: eventContext.demoId,
          demo_run_id: eventContext.demoRunId,
          selected_account: eventContext.selectedAccount,
          selected_action: eventContext.selectedAction,
        },
      );
    }

    setStatus("success");

    setMessage(
      "Recebemos suas informações. Vamos avaliar se o Ohrly faz sentido para a sua operação e retornar em breve.",
    );

    form.reset();
  } catch (error) {
    console.error(error);

    setStatus("error");

    setMessage(
      "Não foi possível enviar agora. Tente novamente em alguns instantes.",
    );

    void trackBehavior(
      "form_submit_error",
      {
        elementId:
          "attention_lead_form",
        ...eventContext,
        customerCount,
      },
    );
  }
}

  const inputClass =
    "h-12 w-full rounded-xl border border-[#dce3ef] bg-[#fbfcff] px-3.5 text-sm text-[#101b35] outline-none transition placeholder:text-[#9ca7b8] focus:border-[#8aa9ff] focus:bg-white focus:ring-4 focus:ring-[#edf3ff]";

  const labelClass =
    "mb-1.5 block text-xs font-black text-[#36425a]";

  return (
    <form
      onSubmit={onSubmit}
      onInvalidCapture={onInvalid}
      data-analytics-form="attention_lead_form"
      data-ohrly-section="attention_lead_form"
      data-journey-stage={eventContext.journeyStage ?? undefined}
      data-demo-id={eventContext.demoId ?? undefined}
      data-demo-run-id={eventContext.demoRunId ?? undefined}
      data-entry-source-cta-id={eventContext.entrySourceCtaId ?? undefined}
      data-entry-source-location={eventContext.entrySourceLocation ?? undefined}
      data-selected-account={eventContext.selectedAccount ?? undefined}
      data-selected-action={eventContext.selectedAction ?? undefined}
      className="mt-6 grid gap-3"
      noValidate
    >
      <div>
        <label
          htmlFor="email"
          className={labelClass}
        >
          E-mail de trabalho
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="voce@empresa.com"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="companySite"
          className={labelClass}
        >
          Site da empresa
        </label>

        <input
          id="companySite"
          name="companySite"
          type="url"
          autoComplete="url"
          required
          maxLength={300}
          placeholder="suaempresa.com.br"
          className={inputClass}
        />
      </div>

      <div>
        <label
          htmlFor="customerCount"
          className={labelClass}
        >
          Quantas contas/clientes o time acompanha hoje?
        </label>

        <select
          id="customerCount"
          name="customerCount"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            Selecione
          </option>

          <option value="under_100">
            Até 100
          </option>

          <option value="100_500">
            100–500
          </option>

          <option value="500_2000">
            500–2.000
          </option>

          <option value="2000_plus">
            2.000+
          </option>
        </select>
      </div>

      {/* Honeypot */}
      <div
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        onClick={onSubmitClick}
        data-analytics-cta="lead_form_submit"
        data-analytics-location="lead_form"
        data-analytics-label="Solicitar avaliação"
        className="mt-2 min-h-13 rounded-xl border border-[#1457ff] bg-[#1457ff] px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:bg-[#0f49dc] disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending"
          ? "Enviando..."
          : "Solicitar avaliação"}
      </button>

      <p className="text-center text-[11px] leading-4 text-[#8995a8]">
        Sem migração de ferramenta e sem compromisso de contratar.
      </p>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`rounded-xl border px-3.5 py-3 text-xs font-bold leading-5 ${
            status === "success"
              ? "border-[#cfe0ff] bg-[#edf3ff] text-[#1748c8]"
              : "border-[#ffd4d1] bg-[#fff2f1] text-[#b72f2a]"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}