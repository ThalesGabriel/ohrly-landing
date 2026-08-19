"use client";

import { FormEvent, useState } from "react";
import {
  getClientTrackingContext,
  trackBehavior,
} from "@/lib/tracking/client";
import { trackMetaLead } from "@/lib/tracking/meta-pixel";

export function LeadForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);

    const clientEventId = crypto.randomUUID();
    const tracking = getClientTrackingContext();

    const desiredOutcome = String(
      data.get("desiredOutcome") || "",
    ).trim();

    setStatus("sending");
    setMessage("");

    void trackBehavior("form_submit_attempt", {
      elementId: "trial_lead_form",
      desiredOutcome,
    });

    try {
      const response = await fetch("/api/lead", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          companySite: data.get("companySite"),
          desiredOutcome,
          website: data.get("website"),

          clientEventId,
          tracking,
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | {
            ok?: boolean;
            metaDelivered?: boolean;
            formspreeDelivered?: boolean;
            error?: string;
          }
        | null;

      if (!response.ok || !result?.ok) {
        throw new Error(
          result?.error || "submit_failed",
        );
      }

      /*
       * Browser + server Meta deduplication
       * usa exatamente o mesmo event ID.
       */
      if (tracking.consent?.marketing) {
        trackMetaLead(clientEventId, {
          landing_variant: tracking.landingVariant,
          desired_outcome: desiredOutcome,
        });
      }

      setStatus("success");

      setMessage(
        "Tudo certo. Recebemos seus dados para começar o trial do Ohrly.",
      );

      form.reset();
    } catch (error) {
      console.error(error);

      setStatus("error");

      setMessage(
        "Não foi possível enviar agora. Tente novamente em alguns instantes.",
      );

      void trackBehavior("form_submit_error", {
        elementId: "trial_lead_form",
      });
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      data-analytics-form="trial_lead_form"
      data-ohrly-section="trial_lead_form"
      className="mt-6 grid gap-3"
    >
      {/* Nome */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-xs font-black text-[#343b35]"
        >
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
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[#d9dfd8]
            bg-white
            px-3.5
            text-sm
            text-[#121512]
            outline-none
            transition
            placeholder:text-[#9aa19b]
            focus:border-[#7f9b85]
            focus:ring-4
            focus:ring-[#e8efe9]
          "
        />
      </div>

      {/* E-mail */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-xs font-black text-[#343b35]"
        >
          E-mail
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          placeholder="voce@empresa.com"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[#d9dfd8]
            bg-white
            px-3.5
            text-sm
            text-[#121512]
            outline-none
            transition
            placeholder:text-[#9aa19b]
            focus:border-[#7f9b85]
            focus:ring-4
            focus:ring-[#e8efe9]
          "
        />
      </div>

      {/* Site */}
      <div>
        <label
          htmlFor="companySite"
          className="mb-1.5 block text-xs font-black text-[#343b35]"
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
          placeholder="https://suaempresa.com.br"
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[#d9dfd8]
            bg-white
            px-3.5
            text-sm
            text-[#121512]
            outline-none
            transition
            placeholder:text-[#9aa19b]
            focus:border-[#7f9b85]
            focus:ring-4
            focus:ring-[#e8efe9]
          "
        />
      </div>

      {/* Outcome */}
      <div>
        <label
          htmlFor="desiredOutcome"
          className="mb-1.5 block text-xs font-black text-[#343b35]"
        >
          Qual resultado você gostaria de aumentar?
        </label>

        <input
          id="desiredOutcome"
          name="desiredOutcome"
          type="text"
          required
          maxLength={180}
          placeholder="Ex.: vendas, leads, demos, assinaturas..."
          className="
            h-12
            w-full
            rounded-xl
            border
            border-[#d9dfd8]
            bg-white
            px-3.5
            text-sm
            text-[#121512]
            outline-none
            transition
            placeholder:text-[#9aa19b]
            focus:border-[#7f9b85]
            focus:ring-4
            focus:ring-[#e8efe9]
          "
        />
      </div>

      {/* Honeypot anti-spam */}
      <div
        className="
          absolute
          left-[-9999px]
          top-auto
          h-px
          w-px
          overflow-hidden
        "
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

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="
          mt-2
          min-h-13
          cursor-pointer
          rounded-full
          border
          border-[#213f2d]
          bg-[#213f2d]
          px-6
          text-sm
          font-black
          text-white
          transition
          hover:bg-[#193423]
          disabled:cursor-wait
          disabled:opacity-60
        "
      >
        {status === "sending"
          ? "Enviando..."
          : "Começar meus 45 dias grátis"}
      </button>

      <p className="text-center text-[11px] leading-4 text-[#7b847c]">
        Sem cartão. Use o período para deixar o Ohrly aprender com o
        comportamento real do seu negócio.
      </p>

      {message ? (
        <p
          role="status"
          aria-live="polite"
          className={`
            rounded-xl
            px-3
            py-2.5
            text-xs
            font-bold
            leading-5
            ${
              status === "success"
                ? "bg-[#e8f2ea] text-[#285035]"
                : "bg-red-50 text-red-700"
            }
          `}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}