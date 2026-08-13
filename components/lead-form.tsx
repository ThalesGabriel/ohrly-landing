"use client";

import { FormEvent, useState } from "react";
import { getClientTrackingContext, trackBehavior } from "@/lib/tracking/client";
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

    setStatus("sending");
    setMessage("");

    void trackBehavior("form_submit_attempt", {
      elementId: "intercom_lead_form",
      usesIntercom: String(data.get("usesIntercom") || ""),
      customerCount: String(data.get("customerCount") || ""),
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          companySite: data.get("companySite"),
          usesIntercom: data.get("usesIntercom"),
          customerCount: data.get("customerCount"),
          website: data.get("website"),
          clientEventId,
          tracking,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; metaDelivered?: boolean; formspreeDelivered?: boolean; error?: string }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || "submit_failed");
      }

      // Browser + server Meta deduplication uses the same ID.
      if (tracking.consent?.marketing) {
        trackMetaLead(clientEventId, {
          landing_variant: tracking.landingVariant,
          uses_intercom: String(data.get("usesIntercom") || ""),
          customer_count: String(data.get("customerCount") || ""),
        });
      }

      setStatus("success");
      setMessage("Recebemos seus dados. Vamos avaliar a aderência da operação ao diagnóstico.");
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Não foi possível enviar agora. Tente novamente em alguns instantes.");
      void trackBehavior("form_submit_error", { elementId: "intercom_lead_form" });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      data-analytics-form="intercom_lead_form"
      className="mt-6 grid gap-3"
    >
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-black text-stone-800">
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
          className="h-12 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm outline-none transition focus:border-[#ff6f1f] focus:ring-4 focus:ring-orange-100"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-black text-stone-800">
          E-mail corporativo
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="voce@empresa.com"
          className="h-12 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm outline-none transition focus:border-[#ff6f1f] focus:ring-4 focus:ring-orange-100"
        />
      </div>

      <div>
        <label htmlFor="companySite" className="mb-1.5 block text-xs font-black text-stone-800">
          Site do SaaS
        </label>
        <input
          id="companySite"
          name="companySite"
          type="url"
          required
          maxLength={300}
          placeholder="https://suaempresa.com.br"
          className="h-12 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm outline-none transition focus:border-[#ff6f1f] focus:ring-4 focus:ring-orange-100"
        />
      </div>

      <div>
        <label htmlFor="usesIntercom" className="mb-1.5 block text-xs font-black text-stone-800">
          Sua empresa usa Intercom?
        </label>
        <select
          id="usesIntercom"
          name="usesIntercom"
          defaultValue=""
          required
          className="h-12 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm outline-none transition focus:border-[#ff6f1f] focus:ring-4 focus:ring-orange-100"
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="yes">Sim</option>
          <option value="no">Não</option>
          <option value="unknown">Não sei</option>
        </select>
      </div>

      <div>
        <label htmlFor="customerCount" className="mb-1.5 block text-xs font-black text-stone-800">
          Volume aproximado de clientes
        </label>
        <select
          id="customerCount"
          name="customerCount"
          defaultValue=""
          required
          className="h-12 w-full rounded-xl border border-stone-300 bg-white px-3.5 text-sm outline-none transition focus:border-[#ff6f1f] focus:ring-4 focus:ring-orange-100"
        >
          <option value="" disabled>
            Selecione
          </option>
          <option value="under_100">Até 100</option>
          <option value="100_500">100–500</option>
          <option value="500_2000">500–2.000</option>
          <option value="2000_plus">2.000+</option>
        </select>
      </div>

      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 min-h-13 cursor-pointer rounded-full border border-[#ff6f1f] bg-white px-6 text-sm font-black text-stone-950 shadow-[0_6px_0_#ff6f1f] transition hover:translate-y-0.5 hover:shadow-[0_4px_0_#ff6f1f] disabled:cursor-wait disabled:opacity-60"
      >
        {status === "sending" ? "Enviando..." : "Quero analisar meu Intercom"}
      </button>

      <p className="text-center text-[11px] leading-4 text-stone-500">
        Sem compromisso. O primeiro contato serve para validar aderência ao estudo.
      </p>

      {message ? (
        <p
          role="status"
          className={`rounded-xl px-3 py-2 text-xs font-bold ${
            status === "success"
              ? "bg-emerald-50 text-emerald-800"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
