"use client";

import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Gift,
  Link2,
  Loader2,
  MessageCircle,
} from "lucide-react";

const FIXED_REWARD = "R$100";
const PERCENT_REWARD = "20% do primeiro pagamento";

type RewardType = "fixed_100" | "percent_20_after_30d";

type IntroMode = "intro" | "already_introduced" | "share";

type ReferralResponse = {
  ok?: boolean;
  referralCode?: string;
  error?: string;
};

type FormState = {
  name: string;
  email: string;
  company: string;
  context: string;
  introductionMode: IntroMode;
  rewardType: RewardType | null;
};

const initialForm: FormState = {
  name: "",
  email: "",
  company: "",
  context: "",
  introductionMode: "intro",
  rewardType: null,
};

function Brand() {
  return (
    <div className="flex items-center gap-2.5 text-[22px] font-black tracking-[-0.04em] text-[#0b0d12]">
      <svg
        viewBox="0 0 44 44"
        aria-hidden="true"
        className="h-[34px] w-[34px]"
      >
        <circle
          cx="19"
          cy="22"
          r="12"
          fill="none"
          stroke="#3568f5"
          strokeWidth="7"
        />
        <path
          d="M18 23h7l3-9 4 17 4-11 3 7h5"
          fill="none"
          stroke="#e43b32"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Ohrly
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[.08em] text-[#3568f5]">
      <span className="h-[3px] w-6 rounded-full bg-[#3568f5]" />
      {children}
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[42px_1fr] gap-3 rounded-[18px] border border-[#e7e9ef] bg-white p-4">
      <div className="grid size-9 place-items-center rounded-full bg-[#0b0d12] text-xs font-black text-white">
        {number}
      </div>
      <div>
        <strong className="block text-[14px] text-[#0b0d12]">{title}</strong>
        <p className="mt-1 text-[12px] leading-[1.45] text-[#68717e]">
          {children}
        </p>
      </div>
    </div>
  );
}

function Choice({
  active,
  title,
  body,
  onClick,
  ctaId,
}: {
  active: boolean;
  title: string;
  body: string;
  onClick: () => void;
  ctaId: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-analytics-cta={ctaId}
      data-analytics-location="referral_form"
      className={`rounded-[16px] border p-3.5 text-left transition ${
        active
          ? "border-[#3568f5] bg-[#f2f5ff]"
          : "border-[#e3e6ec] bg-white hover:bg-[#fafbfe]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <strong className="block text-[13px] text-[#0b0d12]">{title}</strong>
          <span className="mt-1 block text-[11px] leading-[1.4] text-[#727b87]">
            {body}
          </span>
        </div>
        {active ? (
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#3568f5] text-white">
            <Check size={13} />
          </span>
        ) : null}
      </div>
    </button>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-black text-[#0b0d12]">{label}</span>
      {hint ? (
        <span className="ml-2 text-[11px] font-medium text-[#8a929f]">
          {hint}
        </span>
      ) : null}
      <div className="mt-2">{children}</div>
    </label>
  );
}


const QUALIFIED_VISIT_SESSION_KEY = "ohrly:qualified_visit:referral_form_start";

type QualifiedVisitTrigger =
  | "name"
  | "email"
  | "company"
  | "context"
  | "reward"
  | "introduction_mode";

function readCookie(name: string) {
  if (typeof document === "undefined") return null;

  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : null;
}

export default function ReferralClient() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [copied, setCopied] = useState<"message" | "link" | null>(null);

  /*
   * QualifiedVisit representa, neste experimento, intenção real:
   * a pessoa começou a preencher o fluxo de indicação.
   *
   * Não disparamos em focus/autofocus. Somente em mudança real de campo
   * ou escolha explícita de recompensa/modo de introdução.
   */
  const qualifiedVisitSentRef = useRef(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tracked = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "ref",
    ];

    const values: Record<string, string> = {};
    tracked.forEach((key) => {
      const value = params.get(key);
      if (value) values[key] = value;
    });

    setUtm(values);
  }, []);

  const referralLink = useMemo(() => {
    if (!referralCode || typeof window === "undefined") return "";
    return `${window.location.origin}/?ref=${encodeURIComponent(referralCode)}`;
  }, [referralCode]);

  const introMessage = useMemo(() => {
    const link = referralLink || "https://ohrly.com.br";

    return [
      "Vi o Ohrly e lembrei de vocês.",
      "",
      "Eles estão trabalhando em casos em que uma conta parece saudável, mas a relação que sustenta a renovação já mudou — por exemplo, perda de champion, falta de acesso ao decisor ou mudanças que ficam claras tarde demais.",
      "",
      "Achei que poderia fazer sentido vocês conhecerem:",
      link,
    ].join("\n");
  }, [referralLink]);

  function emitQualifiedVisitOnce(trigger: QualifiedVisitTrigger) {
    if (typeof window === "undefined") return;
    if (qualifiedVisitSentRef.current) return;

    try {
      if (window.sessionStorage.getItem(QUALIFIED_VISIT_SESSION_KEY) === "1") {
        qualifiedVisitSentRef.current = true;
        return;
      }
    } catch {
      // sessionStorage pode estar indisponível em alguns navegadores/modos.
    }

    /*
     * O Pixel é carregado/gerenciado pela infraestrutura de consentimento
     * já existente no site. Se fbq não estiver disponível, não forçamos
     * nenhuma chamada de marketing por fora desse fluxo.
     */
    const fbq = (
      window as typeof window & {
        fbq?: (...args: unknown[]) => void;
      }
    ).fbq;

    if (typeof fbq !== "function") return;

    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `qv_referral_${Date.now()}_${Math.random().toString(36).slice(2)}`;

    const params = {
      funnel: "referral",
      milestone: "form_start",
      source: "referral_program",
      trigger,
      page_path: window.location.pathname,
      utm_source: utm.utm_source ?? undefined,
      utm_medium: utm.utm_medium ?? undefined,
      utm_campaign: utm.utm_campaign ?? undefined,
      utm_content: utm.utm_content ?? undefined,
      utm_term: utm.utm_term ?? undefined,
    };

    /*
     * Evento customizado já existente no dataset da Meta.
     * eventID fica pronto para deduplicação caso CAPI seja reativada
     * para este mesmo marco posteriormente.
     */
    fbq("trackCustom", "QualifiedVisit", params, {
      eventID: eventId,
    });

    qualifiedVisitSentRef.current = true;

    try {
      window.sessionStorage.setItem(QUALIFIED_VISIT_SESSION_KEY, "1");
    } catch {
      // O ref em memória ainda impede duplicidade na página atual.
    }

    /*
     * Evento local opcional para qualquer listener do Ohrly.
     * Não interfere no envio para a Meta.
     */
    window.dispatchEvent(
      new CustomEvent("ohrly:qualified-visit", {
        detail: {
          signal: "QualifiedVisit",
          eventId,
          funnel: "referral",
          milestone: "form_start",
          trigger,
          fbp: readCookie("_fbp"),
          fbc: readCookie("_fbc"),
        },
      }),
    );
  }

  async function copyText(text: string, type: "message" | "link") {
    await navigator.clipboard.writeText(text);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1800);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim()) {
      setStatus("error");
      setError("Preencha seu nome e e-mail para registrar a indicação.");
      return;
    }

    if (!form.rewardType) {
      setStatus("error");
      setError("Escolha como você prefere receber a recompensa.");
      return;
    }

    setStatus("loading");

    try {
      const response = await fetch("/api/referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          referrerName: form.name.trim(),
          referrerEmail: form.email.trim(),
          referredCompany: form.company.trim() || null,
          context: form.context.trim() || null,
          introductionMode: form.introductionMode,
          rewardType: form.rewardType,
          source: utm,
        }),
      });

      const data = (await response.json()) as ReferralResponse;

      if (!response.ok || !data.ok || !data.referralCode) {
        throw new Error(
          data.error || "Não foi possível registrar sua indicação agora.",
        );
      }

      setReferralCode(data.referralCode);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível registrar sua indicação agora.",
      );
    }
  }

  const whatsappHref = referralLink
    ? `https://wa.me/?text=${encodeURIComponent(introMessage)}`
    : "#";

  return (
    <div className="min-h-screen bg-white text-[#0b0d12]">
      <header className="sticky top-0 z-50 border-b border-[#e7e9ef]/80 bg-white/92 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[70px] w-[min(1080px,calc(100%_-_32px))] items-center justify-between gap-4">
          <Link href="/" aria-label="Ohrly">
            <Brand />
          </Link>

          <Link
            href="/"
            data-analytics-cta="referral_back_home"
            data-analytics-location="referral_navigation"
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#e7e9ef] bg-white px-4 text-[13px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
          >
            <ArrowLeft size={14} />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main>
        <section
          className="border-b border-[#e7e9ef] bg-[#f6f8fc] py-12 sm:py-16"
          data-analytics-section="referral_hero"
        >
          <div className="mx-auto grid w-[min(1080px,calc(100%_-_32px))] gap-8 lg:grid-cols-[1fr_330px] lg:items-center">
            <div>
              <Eyebrow>Programa de indicação</Eyebrow>

              <h1 className="mt-4 max-w-[760px] text-[42px] font-black leading-[1.01] tracking-[-0.055em] sm:text-[56px] lg:text-[64px]">
                Indique um time que{" "}
                <span className="text-[#3568f5]">vive esse problema.</span>
              </h1>

              <p className="mt-5 max-w-[720px] text-[16px] leading-[1.6] text-[#505966] sm:text-[18px]">
                Conhece alguém que já foi surpreendido por uma renovação mesmo
                quando os sinais pareciam saudáveis? Faça uma introdução.{" "}
                <strong className="font-black text-[#0b0d12]">
                  Se a indicação se tornar cliente, você escolhe entre{" "}
                  <strong className="font-black text-[#0b0d12]">
                    R$100 na conversão
                  </strong>{" "}
                  ou{" "}
                  <strong className="font-black text-[#0b0d12]">
                    20% do primeiro pagamento após 30 dias
                  </strong>
                  .
                </strong>
              </p>
            </div>

            <div className="rounded-[26px] border border-[#dfe7ff] bg-white p-5 shadow-[0_18px_50px_rgba(11,13,18,.06)]">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-[14px] bg-[#edf2ff] text-[#3568f5]">
                  <Gift size={20} />
                </span>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-[.07em] text-[#87909d]">
                    Você escolhe
                  </div>
                  <div className="mt-1 text-[18px] font-black tracking-[-0.03em]">
                    Recompensa imediata ou maior
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-[15px] border border-[#e7e9ef] bg-[#fbfcfe] p-3.5">
                  <strong className="text-[22px] tracking-[-0.04em]">
                    {FIXED_REWARD}
                  </strong>
                  <span className="mt-0.5 block text-[11px] font-bold text-[#3568f5]">
                    primeiro pagamento confirmado
                  </span>
                </div>

                <div className="rounded-[15px] border border-[#cdd9ff] bg-[#f4f7ff] p-3.5">
                  <strong className="text-[22px] tracking-[-0.04em] text-[#3568f5]">
                    20%
                  </strong>
                  <span className="mt-0.5 block text-[11px] font-bold text-[#0b0d12]">
                    após 30 dias ativo e adimplente
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="py-10 sm:py-12"
          data-analytics-section="referral_how_it_works"
        >
          <div className="mx-auto w-[min(1080px,calc(100%_-_32px))]">
            <div className="grid gap-3 lg:grid-cols-3">
              <Step number="01" title="Registre a indicação">
                Informe apenas seus dados e, se quiser, o nome da empresa que
                você tem em mente. Não precisamos do e-mail de terceiros.
              </Step>

              <Step number="02" title="Faça a introdução">
                Depois do cadastro, você recebe um link e uma mensagem pronta
                para encaminhar por WhatsApp, e-mail ou LinkedIn.
              </Step>

              <Step number="03" title="Escolha sua recompensa">
                Prefira R$100 assim que o primeiro pagamento for confirmado ou
                20% desse pagamento após 30 dias com o cliente ativo e adimplente.
              </Step>
            </div>
          </div>
        </section>

        <section
          id="registrar"
          className="pb-14 sm:pb-20"
          data-analytics-section="referral_form"
        >
          <div className="mx-auto grid w-[min(1080px,calc(100%_-_32px))] gap-8 lg:grid-cols-[.78fr_1.22fr]">
            <div className="lg:pt-7">
              <Eyebrow>Faça a ponte</Eyebrow>

              <h2 className="mt-3 text-[32px] font-black leading-[1.04] tracking-[-0.045em] sm:text-[42px]">
                Você não precisa vender o Ohrly por nós.
              </h2>

              <p className="mt-4 text-[15px] leading-[1.6] text-[#606773]">
                Basta colocar na conversa alguém que você acredita que reconheça
                esse problema. Nós assumimos daí: entendemos o caso, mostramos o
                que estamos construindo e descobrimos se há fit.
              </p>

              <div className="mt-5 rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] p-4 text-[13px] leading-[1.5] text-[#31415f]">
                <strong className="text-[#0b0d12]">Privacidade:</strong>{" "}
                preferimos uma introdução com consentimento. Por isso, não
                pedimos telefone ou e-mail da pessoa indicada neste formulário.
              </div>

              <p className="mt-4 text-[12px] leading-[1.5] text-[#7a8390]">
                Ao registrar sua indicação, seus dados serão tratados conforme a{" "}
                <Link
                  href="/privacidade"
                  className="font-bold text-[#3568f5] underline underline-offset-4"
                >
                  Política de Privacidade
                </Link>
                .
              </p>
            </div>

            <div className="rounded-[28px] border border-[#e7e9ef] bg-white p-5 shadow-[0_18px_60px_rgba(11,13,18,.06)] sm:p-7">
              {status !== "success" ? (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ohrly-form="referral"
                  data-qualified-visit-policy="referral_form_start"
                >
                  <div>
                    <div className="text-[11px] font-extrabold uppercase tracking-[.07em] text-[#87909d]">
                      Registrar indicação
                    </div>
                    <h3 className="mt-1 text-[24px] font-black tracking-[-0.035em]">
                      Primeiro, quem está indicando?
                    </h3>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Seu nome">
                      <input
                        required
                        value={form.name}
                        onChange={(event) => {
                          emitQualifiedVisitOnce("name");
                          setForm((current) => ({
                            ...current,
                            name: event.target.value,
                          }));
                        }}
                        name="name"
                        autoComplete="name"
                        placeholder="Seu nome"
                        className="min-h-12 w-full rounded-[14px] border border-[#dfe3eb] bg-white px-4 text-[14px] outline-none transition placeholder:text-[#a4abb5] focus:border-[#3568f5] focus:ring-4 focus:ring-[#3568f5]/10"
                      />
                    </Field>

                    <Field label="Seu e-mail">
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(event) => {
                          emitQualifiedVisitOnce("email");
                          setForm((current) => ({
                            ...current,
                            email: event.target.value,
                          }));
                        }}
                        name="email"
                        autoComplete="email"
                        placeholder="voce@empresa.com"
                        className="min-h-12 w-full rounded-[14px] border border-[#dfe3eb] bg-white px-4 text-[14px] outline-none transition placeholder:text-[#a4abb5] focus:border-[#3568f5] focus:ring-4 focus:ring-[#3568f5]/10"
                      />
                    </Field>
                  </div>

                  <Field
                    label="Empresa que você tem em mente"
                    hint="opcional"
                  >
                    <input
                      value={form.company}
                      onChange={(event) => {
                        emitQualifiedVisitOnce("company");
                        setForm((current) => ({
                          ...current,
                          company: event.target.value,
                        }));
                      }}
                      name="company"
                      placeholder="Nome da empresa — não precisamos do contato dela"
                      className="min-h-12 w-full rounded-[14px] border border-[#dfe3eb] bg-white px-4 text-[14px] outline-none transition placeholder:text-[#a4abb5] focus:border-[#3568f5] focus:ring-4 focus:ring-[#3568f5]/10"
                    />
                  </Field>

                  <Field
                    label="Por que você lembrou dessa empresa ou pessoa?"
                    hint="opcional"
                  >
                    <textarea
                      value={form.context}
                      onChange={(event) => {
                        emitQualifiedVisitOnce("context");
                        setForm((current) => ({
                          ...current,
                          context: event.target.value,
                        }));
                      }}
                      name="context"
                      rows={3}
                      placeholder="Ex.: comentaram recentemente que foram surpreendidos em uma renovação..."
                      className="w-full resize-none rounded-[14px] border border-[#dfe3eb] bg-white px-4 py-3 text-[14px] outline-none transition placeholder:text-[#a4abb5] focus:border-[#3568f5] focus:ring-4 focus:ring-[#3568f5]/10"
                    />
                  </Field>


                  <div>
                    <div className="text-[13px] font-black text-[#0b0d12]">
                      Como você prefere receber se a indicação virar cliente?
                    </div>

                    <p className="mt-1 text-[11px] leading-[1.45] text-[#7b8490]">
                      A escolha fica vinculada a esta indicação e não pode ser
                      alterada depois que ela for registrada.
                    </p>

                    <div className="mt-2 grid gap-2 sm:grid-cols-2">
                      <Choice
                        active={form.rewardType === "fixed_100"}
                        title="R$100 na conversão"
                        body="Liberado quando o primeiro pagamento do cliente indicado for confirmado."
                        ctaId="referral_reward_fixed_100"
                        onClick={() => {
                          emitQualifiedVisitOnce("reward");
                          setForm((current) => ({
                            ...current,
                            rewardType: "fixed_100",
                          }));
                        }}
                      />

                      <Choice
                        active={form.rewardType === "percent_20_after_30d"}
                        title="20% do primeiro pagamento"
                        body="Liberado após 30 dias com o cliente ativo, adimplente e sem estorno."
                        ctaId="referral_reward_percent_20"
                        onClick={() => {
                          emitQualifiedVisitOnce("reward");
                          setForm((current) => ({
                            ...current,
                            rewardType: "percent_20_after_30d",
                          }));
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-[13px] font-black text-[#0b0d12]">
                      Como você pretende fazer a indicação?
                    </div>

                    <div className="mt-2 grid gap-2">
                      <Choice
                        active={form.introductionMode === "intro"}
                        title="Quero receber uma mensagem pronta"
                        body="Você registra agora e encaminha a introdução quando quiser."
                        ctaId="referral_mode_intro"
                        onClick={() => {
                          emitQualifiedVisitOnce("introduction_mode");
                          setForm((current) => ({
                            ...current,
                            introductionMode: "intro",
                          }));
                        }}
                      />

                      <Choice
                        active={
                          form.introductionMode === "already_introduced"
                        }
                        title="Já fiz a introdução"
                        body="Use esta opção se você já colocou o Ohrly na conversa."
                        ctaId="referral_mode_already_introduced"
                        onClick={() => {
                          emitQualifiedVisitOnce("introduction_mode");
                          setForm((current) => ({
                            ...current,
                            introductionMode: "already_introduced",
                          }));
                        }}
                      />

                      <Choice
                        active={form.introductionMode === "share"}
                        title="Quero apenas compartilhar um link"
                        body="Geramos um link de indicação para você encaminhar."
                        ctaId="referral_mode_share"
                        onClick={() => {
                          emitQualifiedVisitOnce("introduction_mode");
                          setForm((current) => ({
                            ...current,
                            introductionMode: "share",
                          }));
                        }}
                      />
                    </div>
                  </div>

                  {status === "error" && error ? (
                    <div className="rounded-[14px] border border-[#ffd7d3] bg-[#fff4f3] px-4 py-3 text-[12px] leading-[1.45] text-[#9f2921]">
                      {error}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    data-analytics-cta="referral_submit"
                    data-analytics-location="referral_form"
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-5 text-[14px] font-extrabold text-white shadow-[0_6px_0_#3568f5] transition hover:-translate-y-px hover:shadow-[0_8px_0_#3568f5] disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Registrando
                      </>
                    ) : (
                      <>
                        Registrar minha indicação
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] leading-[1.45] text-[#87909d]">
                    Sua preferência de recompensa fica registrada nesta indicação.
                    R$100 é liberado na confirmação do primeiro pagamento; a opção
                    percentual exige 30 dias de cliente ativo e adimplente.
                  </p>
                </form>
              ) : (
                <div data-analytics-section="referral_success">
                  <span className="grid size-12 place-items-center rounded-full bg-[#eaf8f1] text-[#18794e]">
                    <Check size={22} />
                  </span>

                  <div className="mt-5 text-[11px] font-extrabold uppercase tracking-[.07em] text-[#87909d]">
                    Indicação registrada
                  </div>

                  <h3 className="mt-1 text-[28px] font-black leading-[1.04] tracking-[-0.04em]">
                    Agora é só fazer a ponte.
                  </h3>

                  <p className="mt-3 text-[14px] leading-[1.55] text-[#606773]">
                    Criamos um link associado à sua indicação. Você pode copiar a
                    mensagem pronta ou compartilhar diretamente.
                  </p>

                  <div className="mt-4 rounded-[16px] border border-[#dfe7ff] bg-[#f4f7ff] px-4 py-3 text-[12px] leading-[1.45] text-[#40506c]">
                    <strong className="text-[#0b0d12]">Recompensa escolhida:</strong>{" "}
                    {form.rewardType === "fixed_100"
                      ? "R$100 quando o primeiro pagamento for confirmado."
                      : "20% do primeiro pagamento após 30 dias com o cliente ativo e adimplente."}
                  </div>

                  <div className="mt-5 rounded-[18px] border border-[#e7e9ef] bg-[#f8f9fc] p-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-[.07em] text-[#87909d]">
                      Seu link
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <div className="min-w-0 flex-1 truncate rounded-[12px] border border-[#e2e5eb] bg-white px-3 py-2.5 text-[12px] font-semibold text-[#4f5865]">
                        {referralLink}
                      </div>

                      <button
                        type="button"
                        onClick={() => copyText(referralLink, "link")}
                        data-analytics-cta="referral_copy_link"
                        data-analytics-location="referral_success"
                        className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dfe3eb] bg-white text-[#0b0d12]"
                        aria-label="Copiar link"
                      >
                        {copied === "link" ? (
                          <Check size={15} />
                        ) : (
                          <Link2 size={15} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 rounded-[18px] border border-[#dfe7ff] bg-[#f4f7ff] p-4">
                    <div className="text-[10px] font-extrabold uppercase tracking-[.07em] text-[#6f7e9a]">
                      Mensagem sugerida
                    </div>
                    <p className="mt-2 whitespace-pre-line text-[12px] leading-[1.55] text-[#40506c]">
                      {introMessage}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => copyText(introMessage, "message")}
                      data-analytics-cta="referral_copy_message"
                      data-analytics-location="referral_success"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#dfe3eb] bg-white px-4 text-[12px] font-extrabold text-[#0b0d12] transition hover:-translate-y-px"
                    >
                      {copied === "message" ? (
                        <>
                          <Check size={14} />
                          Mensagem copiada
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copiar mensagem
                        </>
                      )}
                    </button>

                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      data-analytics-cta="referral_share_whatsapp"
                      data-analytics-location="referral_success"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#0b0d12] bg-[#0b0d12] px-4 text-[12px] font-extrabold text-white transition hover:-translate-y-px"
                    >
                      <MessageCircle size={14} />
                      Compartilhar no WhatsApp
                      <ExternalLink size={12} />
                    </a>
                  </div>

                  <div className="mt-5 border-t border-[#e7e9ef] pt-5">
                    <button
                      type="button"
                      onClick={() => {
                        setForm(initialForm);
                        setReferralCode("");
                        setStatus("idle");
                      }}
                      data-analytics-cta="referral_add_another"
                      data-analytics-location="referral_success"
                      className="text-[12px] font-black text-[#3568f5]"
                    >
                      Registrar outra indicação
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section
          className="border-t border-[#e7e9ef] bg-[#f6f8fc] py-10"
          data-analytics-section="referral_terms"
        >
          <div className="mx-auto w-[min(880px,calc(100%_-_32px))]">
            <h2 className="text-[20px] font-black tracking-[-0.03em]">
              Regras simples do experimento
            </h2>

            <div className="mt-4 grid gap-3 text-[12px] leading-[1.55] text-[#68717e] sm:grid-cols-2">
              <p>
                <strong className="text-[#0b0d12]">Indicação válida:</strong>{" "}
                precisa ser uma introdução genuína a uma empresa ou profissional
                que ainda não esteja em negociação ativa com o Ohrly.
              </p>

              <p>
                <strong className="text-[#0b0d12]">Conversão:</strong> para a
                opção fixa, R$100 é liberado quando o primeiro pagamento for
                confirmado. Para a opção percentual, 20% do primeiro pagamento
                é liberado após 30 dias com o cliente ativo, adimplente e sem
                estorno ou reembolso.
              </p>

              <p>
                <strong className="text-[#0b0d12]">Duplicidade:</strong> se a
                mesma empresa for indicada por mais de uma pessoa, consideramos
                a primeira indicação válida registrada.
              </p>

              <p>
                <strong className="text-[#0b0d12]">Preferência registrada:</strong>{" "}
                cada indicação guarda a modalidade escolhida no cadastro. Preço,
                percentual e regras podem evoluir para novas indicações, mas as
                condições registradas para uma indicação válida são preservadas.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e7e9ef] py-8">
        <div className="mx-auto flex w-[min(1080px,calc(100%_-_32px))] flex-col items-start justify-between gap-4 text-[12px] text-[#727a86] sm:flex-row sm:items-center">
          <Brand />

          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link
              href="/privacidade"
              className="font-bold text-[#596270] hover:text-[#0b0d12]"
            >
              Privacidade
            </Link>
            <Link
              href="/"
              className="font-bold text-[#596270] hover:text-[#0b0d12]"
            >
              Ohrly
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
