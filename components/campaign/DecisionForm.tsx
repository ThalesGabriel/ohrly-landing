"use client";

import { FormEvent, useRef, useState } from "react";
import {
  getAttribution,
  getCookie,
  getSessionContext,
  trackEvent,
} from "@/lib/campaign/client";
import { readConsent } from "@/lib/campaign/consent";
import { trackMetaLead } from "@/lib/meta/client";

type FormState = {
  decision: string;
  context: string;
  question: string;
  decision_type: string;
  systems: string;
  urgency: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
};

const initialState: FormState = {
  decision: "",
  context: "",
  question: "",
  decision_type: "",
  systems: "",
  urgency: "",
  name: "",
  company: "",
  email: "",
  whatsapp: "",
};

const requiredFields: (keyof FormState)[] = [
  "decision",
  "context",
  "question",
  "decision_type",
  "name",
  "company",
  "email",
];

export function DecisionForm() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const started = useRef(false);
  const completedSteps = useRef(new Set<string>());

  function startForm() {
    if (started.current) return;
    started.current = true;
    void trackEvent("form_start");
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    startForm();
    setValues((current) => ({ ...current, [key]: value }));
  }

  function completeStep(key: keyof FormState) {
    if (!values[key].trim() || completedSteps.current.has(key)) return;
    completedSteps.current.add(key);
    void trackEvent("form_step", { step: key });
  }

  function validate() {
    const missing = requiredFields.filter((key) => !values[key].trim());

    if (missing.length) {
      void trackEvent("form_error", {
        kind: "required_fields",
        fields: missing,
      });
      setMessage("Preencha os campos obrigatórios antes de enviar.");
      setStatus("error");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      void trackEvent("form_error", { kind: "invalid_email" });
      setMessage("Confira o endereço de e-mail.");
      setStatus("error");
      return false;
    }

    return true;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setMessage("");

    const consent = readConsent();
    const session = getSessionContext(consent);
    const metaEventId = crypto.randomUUID();

    try {
      const response = await fetch("/api/campaign/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...session,
          attribution: getAttribution(),
          ...values,
          meta_event_id: metaEventId,
          source_url: window.location.href,
          fbp: getCookie("_fbp"),
          fbc: getCookie("_fbc"),
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body?.error || "Não foi possível enviar.");
      }

      setStatus("success");
      setMessage(
        "Recebemos sua decisão. Vamos avaliar se existe uma investigação clara e útil para um Decision Sprint."
      );

      if (consent.marketing) {
        trackMetaLead(metaEventId);
      }

      await trackEvent("thank_you_view", { lead_id: body.lead_id });
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar. Tente novamente."
      );
      void trackEvent("form_error", { kind: "submission_error" });
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-950">
        <p className="text-lg font-semibold">Decisão recebida.</p>
        <p className="mt-2 leading-7">{message}</p>
      </div>
    );
  }

  const input =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-[#ff4b2f] focus:ring-2 focus:ring-[#ff4b2f]/15";
  const label = "block text-sm font-semibold text-slate-800";

  return (
    <form noValidate onSubmit={submit} className="space-y-5">
      <label className={label}>
        O que você está pensando em fazer? *
        <textarea
          className={`${input} min-h-28`}
          value={values.decision}
          onFocus={startForm}
          onBlur={() => completeStep("decision")}
          onChange={(e) => update("decision", e.target.value)}
          placeholder="Ex.: aumentar mídia, contratar, expandir um canal ou implantar uma nova tecnologia."
        />
      </label>

      <label className={label}>
        O que está fazendo você considerar essa decisão agora? *
        <textarea
          className={`${input} min-h-28`}
          value={values.context}
          onFocus={startForm}
          onBlur={() => completeStep("context")}
          onChange={(e) => update("context", e.target.value)}
          placeholder="O que mudou, incomodou ou criou urgência?"
        />
      </label>

      <label className={label}>
        Qual dúvida você gostaria de responder antes de seguir? *
        <textarea
          className={`${input} min-h-28`}
          value={values.question}
          onFocus={startForm}
          onBlur={() => completeStep("question")}
          onChange={(e) => update("question", e.target.value)}
          placeholder="Ex.: queremos saber se aquisição é realmente o principal gargalo."
        />
      </label>

      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <label className={label}>
          Tipo de decisão *
          <select
            className={input}
            value={values.decision_type}
            onFocus={startForm}
            onBlur={() => completeStep("decision_type")}
            onChange={(e) => update("decision_type", e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="marketing">Marketing / aquisição</option>
            <option value="operation">Contratação / operação</option>
            <option value="expansion">Expansão de canal / unidade</option>
            <option value="technology">Tecnologia / sistema</option>
            <option value="retention">Retenção / recorrência</option>
            <option value="efficiency">Custo / eficiência</option>
            <option value="other">Outra</option>
          </select>
        </label>

        <label className={label}>
          Quais sistemas registram essa parte da operação?
          <input
            className={input}
            value={values.systems}
            onFocus={startForm}
            onBlur={() => completeStep("systems")}
            onChange={(e) => update("systems", e.target.value)}
            placeholder="ERP, CRM, agenda, e-commerce..."
          />
        </label>
      </div>

      <label className={label}>
        Se nada mudar nos próximos meses, o que acontece?
        <textarea
          className={`${input} min-h-24`}
          value={values.urgency}
          onFocus={startForm}
          onBlur={() => completeStep("urgency")}
          onChange={(e) => update("urgency", e.target.value)}
          placeholder="Qual é a consequência de continuar como está?"
        />
      </label>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={label}>
          Nome *
          <input
            className={input}
            value={values.name}
            onFocus={startForm}
            onBlur={() => completeStep("name")}
            onChange={(e) => update("name", e.target.value)}
          />
        </label>

        <label className={label}>
          Empresa *
          <input
            className={input}
            value={values.company}
            onFocus={startForm}
            onBlur={() => completeStep("company")}
            onChange={(e) => update("company", e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className={label}>
          E-mail *
          <input
            type="email"
            className={input}
            value={values.email}
            onFocus={startForm}
            onBlur={() => completeStep("email")}
            onChange={(e) => update("email", e.target.value)}
          />
        </label>

        <label className={label}>
          WhatsApp
          <input
            className={input}
            value={values.whatsapp}
            onFocus={startForm}
            onBlur={() => completeStep("whatsapp")}
            onChange={(e) => update("whatsapp", e.target.value)}
          />
        </label>
      </div>

      {message ? (
        <p className={status === "error" ? "text-sm font-medium text-red-700" : "text-sm text-slate-600"}>
          {message}
        </p>
      ) : null}

      <button
        disabled={status === "submitting"}
        className="w-full rounded-xl bg-[#ff4b2f] px-5 py-4 font-semibold text-white transition hover:bg-[#ef3f25] disabled:cursor-not-allowed disabled:opacity-60"
        type="submit"
      >
        {status === "submitting" ? "Enviando..." : "Enviar minha decisão"}
      </button>

      <p className="text-xs leading-5 text-slate-500">
        Ao enviar, você solicita contato sobre esta decisão. Analytics e marketing
        respeitam as preferências de privacidade escolhidas na página.
      </p>
    </form>
  );
}
