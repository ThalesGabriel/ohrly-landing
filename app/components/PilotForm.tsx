"use client";

import {
    FormEvent,
    useMemo,
    useState,
} from "react";
import { trackEvent } from "../../lib/analytics";
import { trackMetaLead } from "@/lib/meta-pixel";

type FormState =
    | "idle"
    | "loading"
    | "success"
    | "error";

type FormspreeResponse = {
    ok?: boolean;
    error?: string;
    errors?: Array<{
        message?: string;
        field?: string;
        code?: string;
    }>;
};

const fieldClass =
    "mt-2 w-full rounded-xl border border-[#d7e1dd] bg-[#fbfcfa] px-3.5 py-3 text-sm text-[#153d3e] outline-none transition placeholder:text-[#9aabaa] focus:border-[#7ca7a2] focus:ring-4 focus:ring-[#0d6867]/[0.06]";

export function PilotForm() {

    const [state, setState] =
        useState<FormState>("idle");

    const [message, setMessage] =
        useState("");

    function getUtms() {
        const params = new URLSearchParams(
            window.location.search,
        );

        return {
            utm_source:
                params.get("utm_source") || "",
            utm_medium:
                params.get("utm_medium") || "",
            utm_campaign:
                params.get("utm_campaign") || "",
            utm_content:
                params.get("utm_content") || "",
            utm_term:
                params.get("utm_term") || "",
        };
    }

    async function handleSubmit(
        event: FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();

        const form = event.currentTarget;

        trackEvent("form_submit_attempt", {
            formId: "pilot_lead",
        });

        setState("loading");
        setMessage("");

        const formspreeFormId =
            process.env
                .NEXT_PUBLIC_FORMSPREE_FORM_ID || 'mkoygpnk';

        if (!formspreeFormId) {
            trackEvent("form_submit_error", {
                formId: "pilot_lead",
                errorType:
                    "formspree_not_configured",
            });

            setState("error");

            setMessage(
                "O formulário está temporariamente indisponível.",
            );

            return;
        }

        const formData = new FormData(form);

        const payload = Object.fromEntries(formData.entries());
        const utms = getUtms();

        let responseStatus:
            | number
            | null = null;

        try {
            const response = await fetch(
                `https://formspree.io/f/${formspreeFormId}`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Accept:
                            "application/json",
                    },

                    body: JSON.stringify({
                        ...payload,
                        ...utms,

                        consent:
                            payload.consent === "on"
                                ? "sim"
                                : payload.consent,

                        landing_variant:
                            "return_predictability_v1",

                        page_path:
                            window.location.pathname,

                        submitted_at:
                            new Date().toISOString(),
                    }),
                },
            );

            responseStatus =
                response.status;

            let data:
                | FormspreeResponse
                | null = null;

            try {
                data =
                    (await response.json()) as FormspreeResponse;
            } catch {
                // Formspree normalmente retorna JSON
                // quando Accept: application/json é enviado.
            }

            if (!response.ok) {
                const formspreeMessage =
                    data?.errors?.[0]
                        ?.message ||
                    data?.error ||
                    "Não foi possível enviar seus dados.";

                throw new Error(
                    formspreeMessage,
                );
            }

            trackEvent(
                "form_submit_success",
                {
                    formId: "pilot_lead",

                    trinksHistory:
                        typeof payload
                            .trinks_history ===
                            "string"
                            ? payload.trinks_history
                            : "",

                    monthlyAppointments:
                        typeof payload
                            .monthly_appointments ===
                            "string"
                            ? payload
                                .monthly_appointments
                            : "",

                    canAct:
                        typeof payload.can_act ===
                            "string"
                            ? payload.can_act
                            : "",
                },
            );

            trackMetaLead();

            setState("success");

            setMessage(
                "Recebemos seus dados. Vamos avaliar se sua operação tem o histórico necessário para o piloto.",
            );

            form.reset();
        } catch (error) {
            trackEvent(
                "form_submit_error",
                {
                    formId: "pilot_lead",
                    responseStatus,

                    errorType:
                        error instanceof Error
                            ? error.name
                            : "unknown",
                },
            );

            setState("error");

            setMessage(
                error instanceof Error
                    ? error.message
                    : "Não foi possível enviar seus dados.",
            );
        }
    }

    if (state === "success") {
        return (
            <div className="rounded-2xl border border-[#bcd8cf] bg-[#eff8f4] p-5">
                <p className="text-sm font-semibold text-[#175b52]">
                    Inscrição recebida.
                </p>

                <p className="mt-2 text-sm leading-6 text-[#4d706b]">
                    {message}
                </p>
            </div>
        );
    }

    return (
        <form
            data-form-id="pilot_lead"
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-[#526d6c]">
                    Seu nome

                    <input
                        name="name"
                        autoComplete="name"
                        required
                        placeholder="Como podemos chamar você?"
                        className={fieldClass}
                    />
                </label>

                <label className="text-xs font-medium text-[#526d6c]">
                    WhatsApp

                    <input
                        name="whatsapp"
                        autoComplete="tel"
                        required
                        placeholder="(81) 99999-9999"
                        className={fieldClass}
                    />
                </label>
            </div>

            <label className="block text-xs font-medium text-[#526d6c]">
                Nome da operação

                <input
                    name="business_name"
                    required
                    placeholder="Ex.: Studio Ana"
                    className={fieldClass}
                />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-xs font-medium text-[#526d6c]">
                    Há quanto tempo usa Trinks?

                    <select
                        name="trinks_history"
                        required
                        defaultValue=""
                        className={fieldClass}
                    >
                        <option
                            value=""
                            disabled
                        >
                            Selecione
                        </option>

                        <option value="menos_3_meses">
                            Menos de 3 meses
                        </option>

                        <option value="3_6_meses">
                            3–6 meses
                        </option>

                        <option value="6_12_meses">
                            6–12 meses
                        </option>

                        <option value="12_24_meses">
                            1–2 anos
                        </option>

                        <option value="24_mais">
                            Mais de 2 anos
                        </option>
                    </select>
                </label>

                <label className="text-xs font-medium text-[#526d6c]">
                    Atendimentos por mês

                    <select
                        name="monthly_appointments"
                        required
                        defaultValue=""
                        className={fieldClass}
                    >
                        <option
                            value=""
                            disabled
                        >
                            Selecione
                        </option>

                        <option value="menos_100">
                            Menos de 100
                        </option>

                        <option value="100_300">
                            100–300
                        </option>

                        <option value="300_700">
                            300–700
                        </option>

                        <option value="700_1500">
                            700–1.500
                        </option>

                        <option value="1500_mais">
                            Mais de 1.500
                        </option>
                    </select>
                </label>
            </div>

            <label className="block text-xs font-medium text-[#526d6c]">
                Se encontrarmos um grupo relevante fora
                do ritmo esperado, você consegue executar
                uma ação?

                <select
                    name="can_act"
                    required
                    defaultValue=""
                    className={fieldClass}
                >
                    <option
                        value=""
                        disabled
                    >
                        Selecione
                    </option>

                    <option value="sim">
                        Sim
                    </option>

                    <option value="talvez">
                        Talvez, depende da ação
                    </option>

                    <option value="nao">
                        Não neste momento
                    </option>
                </select>
            </label>

            <label className="flex items-start gap-3 pt-1 text-xs leading-5 text-[#718886]">
                <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-4 w-4 rounded border-[#c7d6d1] accent-[#0d6867]"
                />

                <span>
                    Concordo em receber contato sobre o
                    piloto e autorizo o uso destes dados
                    apenas para avaliação da minha
                    inscrição.
                </span>
            </label>

            <button
                type="submit"
                disabled={
                    state === "loading"
                }
                className="inline-flex w-full items-center justify-center rounded-2xl bg-[#0d6867] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0a5c5b] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {state === "loading"
                    ? "Enviando..."
                    : "Quero analisar minha recorrência"}
            </button>

            {state === "error" && (
                <p
                    className="text-xs leading-5 text-[#b24d3a]"
                    role="alert"
                >
                    {message}
                </p>
            )}

            <p className="text-center text-[11px] leading-5 text-[#8a9c9a]">
                Esta inscrição não cobra nada
                agora. Primeiro verificamos se
                sua operação se qualifica para
                o piloto.
            </p>
        </form>
    );
}