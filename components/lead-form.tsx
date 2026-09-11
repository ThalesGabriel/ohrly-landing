"use client";

import { FormEvent, MouseEvent, useState } from "react";

import {
  getClientTrackingContext,
  trackBehavior,
} from "@/lib/tracking/client";
import { trackMetaLead } from "@/lib/tracking/meta-pixel";

type SubmitStatus = "idle" | "sending" | "success" | "error";
type Step = "change_type" | "rollout_stage" | "contact";

type ChangeType =
  | "onboarding"
  | "automation_ai"
  | "playbook_cadence"
  | "segmentation"
  | "support"
  | "other";

type RolloutStage = "in_production" | "starting" | "planned";

export type LeadFormAnalyticsContext = {
  journeyStage?: string | null;
  demoId?: string | null;
  demoRunId?: string | null;
  entrySourceCtaId?: string | null;
  entrySourceLocation?: string | null;
  selectedAccount?: string | null;
  selectedAction?: string | null;
};

const CHANGE_OPTIONS: Array<{ value: ChangeType; label: string }> = [
  { value: "onboarding", label: "Implantação / onboarding" },
  { value: "automation_ai", label: "Automação ou IA" },
  { value: "playbook_cadence", label: "Playbook ou cadência" },
  { value: "segmentation", label: "Segmentação" },
  { value: "support", label: "Atendimento / suporte" },
  { value: "other", label: "Outra mudança" },
];

const ROLLOUT_OPTIONS: Array<{ value: RolloutStage; label: string }> = [
  { value: "in_production", label: "Sim, já está em produção" },
  { value: "starting", label: "Está começando agora" },
  { value: "planned", label: "Ainda vamos implantar" },
];

function isValidEmail(value: string) {
  const email = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function LeadForm({
  analyticsContext = {},
}: {
  analyticsContext?: LeadFormAnalyticsContext;
}) {
  const [step, setStep] = useState<Step>("change_type");
  const [changeType, setChangeType] = useState<ChangeType | null>(null);
  const [rolloutStage, setRolloutStage] = useState<RolloutStage | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [message, setMessage] = useState("");

  const eventContext = {
    formFlowVersion: "change_first_v1",
    journeyStage: analyticsContext.journeyStage ?? "post_demo",
    demoId: analyticsContext.demoId ?? null,
    demoRunId: analyticsContext.demoRunId ?? null,
    entrySourceCtaId: analyticsContext.entrySourceCtaId ?? null,
    entrySourceLocation: analyticsContext.entrySourceLocation ?? null,
    selectedAccount: analyticsContext.selectedAccount ?? null,
    selectedAction: analyticsContext.selectedAction ?? null,
  };

  function completeChangeType(value: ChangeType) {
    setChangeType(value);
    setMessage("");

    void trackBehavior("change_form_step_completed", {
      elementId: "attention_lead_form",
      ...eventContext,
      step: "change_type",
      changeType: value,
    });

    setStep("rollout_stage");
  }

  function completeRolloutStage(value: RolloutStage) {
    setRolloutStage(value);
    setMessage("");

    void trackBehavior("change_form_step_completed", {
      elementId: "attention_lead_form",
      ...eventContext,
      step: "rollout_stage",
      changeType,
      rolloutStage: value,
    });

    setStep("contact");
  }

  function goBack(target: Step) {
    void trackBehavior("change_form_step_back", {
      elementId: "attention_lead_form",
      ...eventContext,
      fromStep: step,
      toStep: target,
      changeType,
      rolloutStage,
    });

    setMessage("");
    setStep(target);
  }

  function onSubmitClick(event: MouseEvent<HTMLButtonElement>) {
    if (status === "sending") return;

    void trackBehavior("form_submit_click", {
      elementId: "attention_lead_form",
      ...eventContext,
      changeType,
      rolloutStage,
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") || "").trim();
    const website = String(data.get("website") || "").trim();

    if (!changeType) {
      setMessage("Escolha o tipo de mudança.");
      setStep("change_type");

      void trackBehavior("form_validation_error", {
        elementId: "attention_lead_form",
        ...eventContext,
        field: "changeType",
        reason: "missing_value",
      });

      return;
    }

    if (!rolloutStage) {
      setMessage("Informe em que momento essa mudança está.");
      setStep("rollout_stage");

      void trackBehavior("form_validation_error", {
        elementId: "attention_lead_form",
        ...eventContext,
        field: "rolloutStage",
        reason: "missing_value",
        changeType,
      });

      return;
    }

    if (!isValidEmail(email)) {
      setMessage("Digite um e-mail válido.");

      void trackBehavior("form_validation_error", {
        elementId: "attention_lead_form",
        ...eventContext,
        field: "email",
        reason: "invalid_value",
        changeType,
        rolloutStage,
      });

      return;
    }

    const clientEventId = crypto.randomUUID();
    const tracking = getClientTrackingContext();

    setStatus("sending");
    setMessage("");

    void trackBehavior("form_submit_attempt", {
      elementId: "attention_lead_form",
      ...eventContext,
      changeType,
      rolloutStage,
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,

          // Mantidos explicitamente como nulos nesta versão para deixar
          // claro no contrato que não são mais coletados no primeiro contato.
          companySite: null,
          customerCount: null,

          changeType,
          rolloutStage,
          website,
          clientEventId,
          tracking,
          journey: {
            ...eventContext,
            changeType,
            rolloutStage,
          },
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            error?: string;
          }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "submit_failed");
      }

      if (tracking.consent?.marketing) {
        trackMetaLead(clientEventId, {
          landing_variant: tracking.landingVariant,
          // Mantém o shape atual do evento Meta sem inventar volume de carteira.
          customer_count: "not_collected",
          journey_stage: eventContext.journeyStage,
          demo_id: eventContext.demoId,
          demo_run_id: eventContext.demoRunId,
          selected_account: eventContext.selectedAccount,
          selected_action: eventContext.selectedAction,
        });
      }

      void trackBehavior("change_form_step_completed", {
        elementId: "attention_lead_form",
        ...eventContext,
        step: "contact",
        changeType,
        rolloutStage,
      });

      setStatus("success");
      setMessage(
        "Recebemos sua mudança. Vamos avaliar se existe um bom caso para acompanhar e retornar em breve.",
      );

      form.reset();
    } catch (error) {
      console.error(error);

      setStatus("error");
      setMessage(
        "Não foi possível enviar agora. Tente novamente em alguns instantes.",
      );

      void trackBehavior("form_submit_error", {
        elementId: "attention_lead_form",
        ...eventContext,
        changeType,
        rolloutStage,
      });
    }
  }

  const optionClass =
    "flex min-h-12 w-full items-center justify-between rounded-xl border border-[#dce3ef] bg-[#fbfcff] px-4 py-3 text-left text-sm font-extrabold text-[#26324a] transition hover:border-[#a9bfff] hover:bg-white focus:outline-none focus:ring-4 focus:ring-[#edf3ff]";

  const progressIndex =
    step === "change_type" ? 1 : step === "rollout_stage" ? 2 : 3;

  if (status === "success") {
    return (
      <div
        className="mt-6 rounded-[20px] border border-[#cfe0ff] bg-[#f5f8ff] p-5"
        data-form-flow-version="change_first_v1"
      >
        <div className="text-[10px] font-black uppercase tracking-[.1em] text-[#1457ff]">
          Recebido
        </div>
        <h3 className="mt-2 text-[20px] font-black tracking-[-0.03em] text-[#101b35]">
          Obrigado por compartilhar essa mudança.
        </h3>
        <p className="mt-2 text-sm leading-6 text-[#66758d]">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      data-analytics-form="attention_lead_form"
      data-ohrly-section="attention_lead_form"
      data-form-flow-version="change_first_v1"
      data-journey-stage={eventContext.journeyStage ?? undefined}
      data-demo-id={eventContext.demoId ?? undefined}
      data-demo-run-id={eventContext.demoRunId ?? undefined}
      data-entry-source-cta-id={eventContext.entrySourceCtaId ?? undefined}
      data-entry-source-location={eventContext.entrySourceLocation ?? undefined}
      data-selected-account={eventContext.selectedAccount ?? undefined}
      data-selected-action={eventContext.selectedAction ?? undefined}
      className="mt-6"
      noValidate
    >
      <div className="mb-4 flex items-center gap-2">
        {[1, 2, 3].map((item) => (
          <span
            key={item}
            className={`h-1.5 flex-1 rounded-full ${
              item <= progressIndex ? "bg-[#1457ff]" : "bg-[#e7ebf2]"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>

      <div className="mb-5 flex items-center justify-between text-sm font-bold text-[#8995a8]">
        <span>Passo {progressIndex} de 3</span>
        <span>mudança primeiro · contato no final</span>
      </div>

      {step === "change_type" ? (
        <fieldset>
          <legend className="text-[16px] font-black leading-6 text-[#101b35]">
            O que mudou na sua operação?
          </legend>
          <p className="mt-1.5 text-sm leading-5 text-[#7a869a]">
            Escolha o caso que mais se aproxima. Não precisa explicar tudo agora.
          </p>

          <div className="mt-4 grid gap-2.5">
            {CHANGE_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={optionClass}
                onClick={() => completeChangeType(option.value)}
                data-analytics-cta={`change_type_${option.value}`}
                data-analytics-location="lead_form_change_type"
              >
                <span>{option.label}</span>
                <span className="text-[#9aa5b8]">→</span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === "rollout_stage" ? (
        <fieldset>
          <button
            type="button"
            onClick={() => goBack("change_type")}
            className="mb-4 text-sm font-extrabold text-[#66758d] hover:text-[#1457ff]"
          >
            ← Voltar
          </button>

          <legend className="text-[16px] font-black leading-6 text-[#101b35]">
            Essa mudança já está chegando aos clientes?
          </legend>
          <p className="mt-1.5 text-sm leading-5 text-[#7a869a]">
            Isso nos ajuda a entender se já existe uma janela real para acompanhar.
          </p>

          <div className="mt-4 grid gap-2.5">
            {ROLLOUT_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className={optionClass}
                onClick={() => completeRolloutStage(option.value)}
                data-analytics-cta={`rollout_stage_${option.value}`}
                data-analytics-location="lead_form_rollout_stage"
              >
                <span>{option.label}</span>
                <span className="text-[#9aa5b8]">→</span>
              </button>
            ))}
          </div>
        </fieldset>
      ) : null}

      {step === "contact" ? (
        <div>
          <button
            type="button"
            onClick={() => goBack("rollout_stage")}
            className="mb-4 text-sm font-extrabold text-[#66758d] hover:text-[#1457ff]"
          >
            ← Voltar
          </button>

          <div className="rounded-xl border border-[#dce5ff] bg-[#f6f8ff] px-4 py-3 text-sm leading-5 text-[#52658a]">
            <strong className="text-[#263f82]">Temos um caso concreto.</strong>{" "}
            Agora só precisamos saber como falar com você para continuar essa análise.
          </div>

          <label
            htmlFor="email"
            className="mb-1.5 mt-4 block text-xs font-black text-[#36425a]"
          >
            E-mail de trabalho
          </label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="voce@empresa.com"
            className="h-12 w-full rounded-xl border border-[#dce3ef] bg-[#fbfcff] px-3.5 text-sm text-[#101b35] outline-none transition placeholder:text-[#9ca7b8] focus:border-[#8aa9ff] focus:bg-white focus:ring-4 focus:ring-[#edf3ff]"
            onBlur={(event) => {
              const value = event.currentTarget.value.trim();
              if (!value) return;

              void trackBehavior("form_field_completed", {
                elementId: "attention_lead_form",
                ...eventContext,
                field: "email",
                valid: isValidEmail(value),
                changeType,
                rolloutStage,
              });
            }}
          />

          {/* Honeypot */}
          <div
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor="website">Website</label>
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
            data-analytics-label="Quero conversar sobre essa mudança"
            className="mt-4 min-h-13 w-full rounded-xl border border-[#1457ff] bg-[#1457ff] px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:bg-[#0f49dc] disabled:cursor-wait disabled:opacity-60"
          >
            {status === "sending"
              ? "Enviando..."
              : "Quero conversar sobre essa mudança"}
          </button>

          <p className="mt-2 text-center text-sm leading-4 text-[#8995a8]">
            Sem migração de ferramenta e sem compromisso de contratar.
          </p>
        </div>
      ) : null}

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className="mt-3 rounded-xl border border-[#ffd4d1] bg-[#fff2f1] px-3.5 py-3 text-xs font-bold leading-5 text-[#b72f2a]"
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
