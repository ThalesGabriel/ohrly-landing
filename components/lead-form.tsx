"use client";

import { FormEvent, useState } from "react";
import {
  getClientTrackingContext,
  trackBehavior,
} from "@/lib/tracking/client";
import { trackMetaLead } from "@/lib/tracking/meta-pixel";

export function LeadForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const clientEventId = crypto.randomUUID();
    const tracking = getClientTrackingContext();
    const usesIntercom = String(data.get("usesIntercom") || "").trim();
    const customerCount = String(data.get("customerCount") || "").trim();

    setStatus("sending");
    setMessage("");

    void trackBehavior("form_submit_attempt", {
      elementId: "intercom_lead_form",
      usesIntercom,
      customerCount,
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          companySite: data.get("companySite"),
          usesIntercom,
          customerCount,
          website: data.get("website"),
          clientEventId,
          tracking,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "submit_failed");
      }

      if (tracking.consent?.marketing) {
        trackMetaLead(clientEventId, {
          landing_variant: tracking.landingVariant,
          uses_intercom: usesIntercom,
          customer_count: customerCount,
        });
      }

      setStatus("success");
      setMessage(
        "Recebemos seus dados. Vamos avaliar se o piloto faz sentido para a sua operação.",
      );
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Não foi possível enviar agora. Tente novamente em alguns instantes.");

      void trackBehavior("form_submit_error", {
        elementId: "intercom_lead_form",
      });
    }
  }

  const inputClass =
    "h-12 w-full rounded-xl border border-[#dce3ef] bg-[#fbfcff] px-3.5 text-sm text-[#101b35] outline-none transition placeholder:text-[#9ca7b8] focus:border-[#8aa9ff] focus:bg-white focus:ring-4 focus:ring-[#edf3ff]";

  return (
    <form
      onSubmit={onSubmit}
      data-analytics-form="intercom_lead_form"
      data-ohrly-section="intercom_lead_form"
      className="mt-6 grid gap-3"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-black text-[#36425a]">
          Seu nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={120}
          placeholder="Seu nome"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-black text-[#36425a]">
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
        <label htmlFor="companySite" className="mb-1.5 block text-xs font-black text-[#36425a]">
          Site da empresa
        </label>
        <input
          id="companySite"
          name="companySite"
          type="url"
          autoComplete="url"
          required
          maxLength={300}
          placeholder="https://suaempresa.com.br"
          className={inputClass}
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="usesIntercom" className="mb-1.5 block text-xs font-black text-[#36425a]">
            Vocês usam Intercom?
          </label>
          <select id="usesIntercom" name="usesIntercom" required defaultValue="" className={inputClass}>
            <option value="" disabled>Selecione</option>
            <option value="yes">Sim</option>
            <option value="no">Não</option>
            <option value="unknown">Não sei</option>
          </select>
        </div>

        <div>
          <label htmlFor="customerCount" className="mb-1.5 block text-xs font-black text-[#36425a]">
            Quantas contas/clientes?
          </label>
          <select id="customerCount" name="customerCount" required defaultValue="" className={inputClass}>
            <option value="" disabled>Selecione</option>
            <option value="under_100">Até 100</option>
            <option value="100_500">100–500</option>
            <option value="500_2000">500–2.000</option>
            <option value="2000_plus">2.000+</option>
          </select>
        </div>
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 min-h-13 rounded-xl border border-[#1457ff] bg-[#1457ff] px-6 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:bg-[#0f49dc] disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Quero participar do piloto"}
      </button>

      <p className="text-center text-[11px] leading-4 text-[#8995a8]">
        Sem migração de ferramenta e sem compromisso de contratar.
      </p>

      {message ? (
        <p
          role="status"
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
