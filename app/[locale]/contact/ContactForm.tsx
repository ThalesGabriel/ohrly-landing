"use client";

import { FormEvent, useMemo, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type SubmitState = "idle" | "submitting" | "success" | "error";

type IconProps = {
  className?: string;
};

function ArrowRightIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function CheckIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.3"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
    </svg>
  );
}

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-[#071545] outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

const labelClassName = "text-sm font-black text-[#071545]";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const endpoint = useMemo(
    () =>
      process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ??
      "https://formspree.io/f/mkoygpnk",
    [],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.set("source", "landing_ecommerce_alerts");
    formData.set("page_url", window.location.href);
    formData.set("_subject", "Novo contato — Ohrly para e-commerce");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { errors?: Array<{ message?: string }> }
          | null;

        const message =
          body?.errors?.map((item) => item.message).filter(Boolean).join(" ") ||
          "Não foi possível enviar o formulário agora.";

        throw new Error(message);
      }

      window.fbq?.("track", "Lead", {
        content_name: "Contato Ohrly para e-commerce",
        content_category: "Ecommerce behavioral regression",
      });

      window.gtag?.("event", "generate_lead", {
        event_category: "contact",
        event_label: "ohrly_ecommerce_contact",
      });

      form.reset();
      setSubmitState("success");
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar o formulário agora.",
      );
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="py-10 text-center" role="status">
        <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckIcon className="h-8 w-8" />
        </span>

        <h3 className="mt-6 text-3xl font-black tracking-[-0.04em] text-[#071545]">
          Mensagem recebida.
        </h3>

        <p className="mx-auto mt-4 max-w-lg leading-7 text-slate-600">
          Vamos revisar o contexto informado e responder com o melhor próximo
          passo para entender esse fluxo.
        </p>

        <button
          type="button"
          onClick={() => setSubmitState("idle")}
          className="mt-7 text-sm font-black text-blue-700 transition hover:text-blue-900"
        >
          Enviar outro contato
        </button>
      </div>
    );
  }

  return (
    <form className="mt-8" onSubmit={handleSubmit}>
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="name">
            Seu nome
          </label>
          <input
            className={inputClassName}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Como podemos te chamar?"
            required
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="email">
            E-mail profissional
          </label>
          <input
            className={inputClassName}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com.br"
            required
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="company">
            Empresa ou loja
          </label>
          <input
            className={inputClassName}
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Nome da operação"
            required
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="whatsapp">
            WhatsApp <span className="font-medium text-slate-400">(opcional)</span>
          </label>
          <input
            className={inputClassName}
            id="whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="(81) 99999-9999"
          />
        </div>

        <div>
          <label className={labelClassName} htmlFor="role">
            Seu papel na operação
          </label>
          <select className={inputClassName} id="role" name="role" required defaultValue="">
            <option value="" disabled>
              Selecione
            </option>
            <option value="lojista">Lojista ou fundador</option>
            <option value="gestor-ecommerce">Gestão de e-commerce</option>
            <option value="produto">Produto ou tecnologia</option>
            <option value="marketing">Marketing ou tráfego</option>
            <option value="operacoes">Operações ou atendimento</option>
            <option value="agencia">Agência ou consultoria</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div>
          <label className={labelClassName} htmlFor="platform">
            Plataforma principal
          </label>
          <select
            className={inputClassName}
            id="platform"
            name="platform"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Selecione
            </option>
            <option value="nuvemshop">Nuvemshop</option>
            <option value="shopify">Shopify</option>
            <option value="vtex">VTEX</option>
            <option value="woocommerce">WooCommerce</option>
            <option value="tray">Tray</option>
            <option value="loja-integrada">Loja Integrada</option>
            <option value="magento">Magento / Adobe Commerce</option>
            <option value="custom">Plataforma própria</option>
            <option value="outro">Outra</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label className={labelClassName} htmlFor="store_url">
          Endereço da loja <span className="font-medium text-slate-400">(opcional)</span>
        </label>
        <input
          className={inputClassName}
          id="store_url"
          name="store_url"
          type="url"
          inputMode="url"
          placeholder="https://sualoja.com.br"
        />
      </div>

      <div className="mt-5">
        <label className={labelClassName} htmlFor="flow">
          Qual fluxo mais preocupa hoje?
        </label>
        <select className={inputClassName} id="flow" name="flow" required defaultValue="">
          <option value="" disabled>
            Selecione
          </option>
          <option value="checkout">Checkout e conclusão da compra</option>
          <option value="payment">Pagamento e aprovação</option>
          <option value="shipping">Frete e cálculo de entrega</option>
          <option value="delivery">Envio e entrega</option>
          <option value="cart-recovery">Carrinho e recuperação</option>
          <option value="repurchase">Recompra e continuidade</option>
          <option value="support">Atendimento e WhatsApp</option>
          <option value="unclear">Ainda não sei onde está</option>
        </select>
      </div>

      <div className="mt-5">
        <label className={labelClassName} htmlFor="context">
          O que fez você perceber que algo pode ter mudado?
        </label>
        <textarea
          className={`${inputClassName} min-h-36 resize-y`}
          id="context"
          name="context"
          placeholder="Ex.: o tráfego continua chegando, mas aumentaram as tentativas no pagamento e o atendimento começou a receber mais dúvidas..."
          minLength={20}
          required
        />
        <p className="mt-2 text-xs leading-5 text-slate-500">
          Não precisa apresentar uma análise pronta. Descreva sinais, mudanças
          recentes ou uma sensação recorrente da operação.
        </p>
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4">
        <input
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-500"
          type="checkbox"
          name="privacy_consent"
          value="accepted"
          required
        />
        <span className="text-sm leading-6 text-slate-600">
          Concordo que a Ohrly utilize estas informações para responder ao contato,
          conforme a{" "}
          <a
            className="font-bold text-blue-700 underline decoration-blue-300 underline-offset-2"
            href="/pt/privacy"
            target="_blank"
            rel="noreferrer"
          >
            Política de Privacidade
          </a>
          .
        </span>
      </label>

      {submitState === "error" && (
        <div
          className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          role="alert"
        >
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={submitState === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-4 text-sm font-black text-white shadow-xl shadow-blue-200 transition hover:-translate-y-0.5 hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitState === "submitting"
          ? "Enviando..."
          : "Quero entender o que está mudando"}
        {submitState !== "submitting" && <ArrowRightIcon />}
      </button>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        Ao enviar, você não está autorizando nenhuma integração ou análise de
        dados. Este é apenas o primeiro contato.
      </p>
    </form>
  );
}