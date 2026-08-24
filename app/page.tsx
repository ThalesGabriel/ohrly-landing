import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Search,
  Sparkles,
} from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Ohrly — Saiba quais contas investigar primeiro",
  description:
    "100 contas em risco de churn. Por qual delas você começa? O Ohrly identifica onde a relação realmente mudou para seu time saber quais contas investigar primeiro.",
  openGraph: {
    title: "Ohrly — 100 contas em risco. Por qual você começa?",
    description:
      "Seu health score ou modelo de churn encontra o risco. O Ohrly ajuda seu time a decidir onde investigar primeiro.",
    type: "website",
  },
};


function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-10 items-center justify-center rounded-xl border border-[#dce5ff] bg-white shadow-[0_8px_24px_rgba(20,87,255,.10)]">
        <Image
          src="/ohrly-logo.png"
          alt="Ohrly"
          width={34}
          height={24}
          className="h-auto w-[34px] object-contain"
          priority
        />
      </span>
      <span className="text-[22px] font-black tracking-[-0.05em] text-[#0c1732]">
        ohrly
      </span>
    </div>
  );
}

function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[.13em] ${
        light ? "text-[#b9cbff]" : "text-[#1457ff]"
      }`}
    >
      <span
        className={`size-2 rounded-full ${
          light
            ? "bg-[#f43b35] shadow-[0_0_0_5px_rgba(244,59,53,.12)]"
            : "bg-[#f43b35] shadow-[0_0_0_5px_#fff0ef]"
        }`}
      />
      {children}
    </div>
  );
}

function AccountDots({
  total,
  tone,
}: {
  total: number;
  tone: "risk" | "focus";
}) {
  return (
    <div className="grid grid-cols-10 gap-1.5">
      {Array.from({ length: total }).map((_, index) => (
        <span
          key={index}
          className={`h-3.5 rounded-[5px] ${
            tone === "risk"
              ? index % 3 === 0
                ? "bg-[#f3aaa7]"
                : "bg-[#dce2ec]"
              : "bg-[#84a8ff]"
          }`}
        />
      ))}
    </div>
  );
}

function SignalRow({
  label,
  value,
  width,
  changed = false,
}: {
  label: string;
  value: string;
  width: string;
  changed?: boolean;
}) {
  return (
    <div className="grid grid-cols-[84px_1fr_auto] items-center gap-3 text-xs sm:grid-cols-[96px_1fr_auto]">
      <span className="font-bold text-[#59667e]">{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-[#edf1f6]">
        <span
          className={`block h-full rounded-full ${
            changed ? "bg-[#f43b35]" : "bg-[#1457ff]"
          }`}
          style={{ width }}
        />
      </div>
      <strong
        className={`text-[11px] ${
          changed ? "text-[#c8322d]" : "text-[#39455c]"
        }`}
      >
        {value}
      </strong>
    </div>
  );
}

export default function Page() {
  return (
    <>
      <CookieConsent />
      <BehaviorTracker />

      <div className="min-h-screen bg-[#f8fafc] text-[#101828]">
        <nav className="sticky top-0 z-40 border-b border-[#e5eaf4]/90 bg-[#f8fafc]/88 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] w-[min(calc(100%_-_2rem),1120px)] items-center justify-between gap-5 sm:w-[min(calc(100%_-_2.5rem),1120px)]">
            <a
              href="#top"
              aria-label="Ohrly, início"
              data-analytics-cta="nav_logo"
              data-analytics-location="navigation"
            >
              <Brand />
            </a>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="#problema"
                className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#68758f] transition hover:bg-white hover:text-[#101b35] md:inline-flex"
                data-analytics-cta="nav_problem"
                data-analytics-location="navigation"
              >
                Problema
              </a>
              <a
                href="#como-funciona"
                className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#68758f] transition hover:bg-white hover:text-[#101b35] md:inline-flex"
                data-analytics-cta="nav_how_it_works"
                data-analytics-location="navigation"
              >
                Como funciona
              </a>
              <a
                href="#exemplo"
                className="hidden rounded-xl px-3 py-2 text-sm font-bold text-[#68758f] transition hover:bg-white hover:text-[#101b35] md:inline-flex"
                data-analytics-cta="nav_example"
                data-analytics-location="navigation"
              >
                Exemplo
              </a>
              <a
                href="#piloto"
                className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                data-analytics-cta="nav_pilot"
                data-analytics-location="navigation"
                data-analytics-label="Quero testar"
              >
                Quero testar
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </nav>

        <main id="top">
          {/* HERO */}
          <section
            className="relative overflow-hidden px-4 pb-14 pt-14 sm:px-6 sm:pb-18 sm:pt-20 lg:pb-20"
            data-analytics-section="hero"
          >
            <div className="pointer-events-none absolute -left-40 -top-48 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(20,87,255,.11),transparent_68%)]" />
            <div className="pointer-events-none absolute -right-36 top-[-120px] size-[390px] rounded-full bg-[radial-gradient(circle,rgba(244,59,53,.08),transparent_70%)]" />

            <div className="relative mx-auto grid max-w-[1120px] items-center gap-12 lg:grid-cols-[1.04fr_.96fr] lg:gap-16">
              <div>
                <Eyebrow>Para SaaS B2B</Eyebrow>

                <h1 className="mt-5 max-w-[720px] text-[44px] font-black leading-[.98] tracking-[-0.062em] text-[#0d1831] sm:text-[58px] lg:text-[70px]">
                  100 contas em risco de churn.{" "}
                  <span className="text-[#1457ff]">Por qual delas você começa?</span>
                </h1>

                <p className="mt-6 max-w-[640px] text-base leading-7 text-[#68758f] sm:text-[18px] sm:leading-8">
                  O Ohrly analisa os sinais que você já tem e identifica quais
                  relações realmente mudaram — para seu time saber{" "}
                  <strong className="font-black text-[#101b35]">
                    quais contas investigar primeiro.
                  </strong>
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a
                    href="#piloto"
                    className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-[15px] font-black text-white shadow-[0_14px_30px_rgba(20,87,255,.20)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                    data-analytics-cta="hero_pilot"
                    data-analytics-location="hero"
                    data-analytics-label="Descobrir quais contas investigar primeiro"
                  >
                    Descobrir quais contas investigar primeiro
                    <ArrowRight size={16} />
                  </a>

                  <a
                    href="#como-funciona"
                    className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-[#dfe5f0] bg-white px-5 text-[15px] font-black text-[#101b35] transition hover:-translate-y-px hover:border-[#cfd8eb]"
                    data-analytics-cta="hero_example"
                    data-analytics-location="hero"
                    data-analytics-label="Ver como funciona"
                  >
                    <Search size={16} />
                    Ver como funciona
                  </a>
                </div>
              </div>

              <div
                className="mx-auto w-full max-w-[390px] rounded-[40px] border-[10px] border-[#0b1020] bg-[#0b1020] shadow-[0_34px_80px_rgba(15,23,42,.18)] lg:rotate-[1.5deg]"
                data-analytics-section="hero_product_preview"
              >
                <div className="min-h-[510px] rounded-[30px] bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-black text-[#101b35]">
                      Fila de churn
                    </strong>
                    <span className="text-[10px] font-bold text-[#8b96aa]">
                      Hoje
                    </span>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[#e5e9f1] bg-[#fbfcfe] p-4">
                    <div className="text-[9px] font-black uppercase tracking-[.12em] text-[#8995a8]">
                      Seu processo atual
                    </div>
                    <div className="mt-1 text-[24px] font-black tracking-[-0.045em] text-[#101b35]">
                      100 contas em risco
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-[#7b879b]">
                      Seu radar já fez o primeiro corte.
                    </p>
                    <div className="mt-4">
                      <AccountDots total={50} tone="risk" />
                    </div>
                  </div>

                  <div className="py-3 text-center text-xl font-black text-[#1457ff]">
                    ↓
                  </div>

                  <div className="rounded-2xl border border-[#bfd2ff] bg-[#f5f8ff] p-4">
                    <div className="text-[9px] font-black uppercase tracking-[.12em] text-[#1457ff]">
                      Ohrly
                    </div>
                    <div className="mt-1 text-[24px] font-black tracking-[-0.045em] text-[#101b35]">
                      Onde mudou?
                    </div>
                    <p className="mt-1 text-[11px] leading-5 text-[#7b879b]">
                      Uma prioridade menor para abrir primeiro.
                    </p>
                    <div className="mt-4">
                      <AccountDots total={20} tone="focus" />
                    </div>

                    <div className="mt-4 flex items-center justify-between rounded-xl bg-[#10182f] px-3.5 py-3 text-white">
                      <span className="text-[10px] font-semibold text-[#c9d2e5]">
                        Investigar primeiro
                      </span>
                      <strong className="text-xl tracking-[-0.04em]">20*</strong>
                    </div>
                  </div>

                  <p className="mt-4 text-center text-[9px] leading-4 text-[#8995a8]">
                    *Exemplo visual da proposta, não resultado de cliente.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* PROBLEMA */}
          <section
            id="problema"
            className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="problem"
          >
            <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[.88fr_1.12fr]">
              <div>
                <Eyebrow>O problema</Eyebrow>

                <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                  Seu radar encontrou o risco. Agora começa o trabalho.
                </h2>

                <p className="mt-5 max-w-[600px] text-base leading-7 text-[#68758f] sm:text-[17px]">
                  Para cada conta, alguém ainda precisa olhar histórico, uso,
                  tickets, contrato e contexto para decidir se aquilo realmente
                  merece atenção.
                </p>
              </div>

              <div className="rounded-[24px] border border-[#e3e8f1] bg-[#fbfcfe] p-5 sm:p-6">
                {[
                  ["Acme", "Health 41 · renewal em 32 dias"],
                  ["Beta Labs", "Queda de uso · ticket aberto"],
                  ["Cloud One", "Uso estável · financeiro normal"],
                ].map(([name, detail]) => (
                  <div
                    key={name}
                    className="grid grid-cols-[42px_1fr_auto] items-center gap-3 border-t border-[#edf0f5] py-3.5 first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <span className="flex size-10 items-center justify-center rounded-xl bg-[#edf3ff] text-sm font-black text-[#1457ff]">
                      {name.charAt(0)}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm font-black text-[#101b35]">
                        {name}
                      </div>
                      <div className="mt-0.5 truncate text-xs text-[#7b879b]">
                        {detail}
                      </div>
                    </div>
                    <span className="rounded-full bg-[#fff0ef] px-2.5 py-1 text-[9px] font-black text-[#d2332e]">
                      Risco
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* COMO FUNCIONA */}
          <section
            id="como-funciona"
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="how_it_works"
          >
            <div className="mx-auto grid max-w-[1120px] items-center gap-10 rounded-[28px] border border-[#e3e8f1] bg-white p-6 shadow-[0_18px_50px_rgba(25,45,90,.05)] sm:p-8 lg:grid-cols-[.88fr_1.12fr]">
              <div>
                <Eyebrow>Ohrly</Eyebrow>

                <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                  Encontre onde a relação realmente mudou.
                </h2>

                <p className="mt-5 text-base leading-7 text-[#68758f] sm:text-[17px]">
                  O Ohrly aprende como cada conta normalmente se comporta e combina
                  sinais de uso, suporte, financeiro, contrato e outros dados
                  disponíveis.
                </p>
              </div>

              <div>
                <div className="space-y-3">
                  <SignalRow label="Uso" value="Estável" width="86%" />
                  <SignalRow label="Suporte" value="Normal" width="58%" />
                  <SignalRow label="Financeiro" value="Normal" width="74%" />
                  <SignalRow
                    label="Contrato"
                    value="Mudou"
                    width="28%"
                    changed
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-[#ffd2d0] bg-[#fff2f1] p-4 text-sm font-black text-[#b8322e]">
                  A relação mudou apesar dos outros sinais parecerem normais.
                </div>
              </div>
            </div>
          </section>

          {/* POSICIONAMENTO */}
          <section
            className="bg-[#10182f] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="positioning"
          >
            <div className="mx-auto max-w-[1120px]">
              <div className="max-w-[760px]">
                <Eyebrow light>Funciona junto do que você já usa</Eyebrow>

                <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] sm:text-[48px]">
                  Já tem health score ou modelo de churn? Melhor ainda.
                </h2>

                <p className="mt-5 text-base leading-7 text-white/65 sm:text-[17px]">
                  Ele continua encontrando quem pode estar em risco. O Ohrly ajuda
                  seu time a decidir onde investigar primeiro.
                </p>
              </div>

              <div className="mt-9 grid gap-3 lg:grid-cols-[1fr_64px_1fr_64px_1fr] lg:items-center">
                {[
                  {
                    title: "Seu radar",
                    body: "Health score, modelo próprio ou regras.",
                    question: "Quem está em risco?",
                  },
                  {
                    title: "Ohrly",
                    body: "Observa mudança na relação.",
                    question: "Onde realmente mudou?",
                    active: true,
                  },
                  {
                    title: "Seu time",
                    body: "Recebe prioridade e contexto.",
                    question: "Onde começo?",
                  },
                ].map((item, index) => (
                  <div key={item.title} className="contents">
                    <div
                      className={`min-h-[180px] rounded-[22px] border p-5 ${
                        item.active
                          ? "border-[#315ec2] bg-[linear-gradient(160deg,#0f2a62,#123990)]"
                          : "border-[#2b3960] bg-[#121f43]"
                      }`}
                    >
                      <strong className="block text-lg font-black">
                        {item.title}
                      </strong>
                      <p className="mt-2 text-sm leading-6 text-white/60">
                        {item.body}
                      </p>
                      <div className="mt-6 rounded-xl bg-black/15 px-3 py-3 text-sm font-black text-white/90">
                        {item.question}
                      </div>
                    </div>

                    {index < 2 && (
                      <div className="hidden text-center text-3xl font-black text-[#7fa8ff] lg:block">
                        →
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* EXEMPLO */}
          <section
            id="exemplo"
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="investigation_example"
          >
            <div className="mx-auto grid max-w-[1120px] items-center gap-10 lg:grid-cols-[.84fr_1.16fr]">
              <div>
                <Eyebrow>Mais contexto</Eyebrow>

                <h2 className="mt-4 text-[36px] font-black leading-[1.04] tracking-[-0.052em] text-[#101b35] sm:text-[48px]">
                  Menos contas para abrir. Mais contexto quando você abrir.
                </h2>

                <p className="mt-5 text-base leading-7 text-[#68758f] sm:text-[17px]">
                  O Ohrly não entrega apenas outra lista de risco. Para cada conta
                  priorizada, mostra o que mudou e por que vale investigar agora.
                </p>
              </div>

              <div className="rounded-[26px] border border-[#e1e6ef] bg-white p-5 shadow-[0_20px_60px_rgba(25,45,90,.07)] sm:p-7">
                <div className="flex items-start justify-between gap-4 border-b border-[#edf0f5] pb-5">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                      Conta priorizada
                    </div>
                    <h3 className="mt-1 text-[28px] font-black tracking-[-0.045em] text-[#101b35]">
                      Acme Inc.
                    </h3>
                  </div>

                  <span className="rounded-full border border-[#ffd2d0] bg-[#fff2f1] px-3 py-1.5 text-[9px] font-black text-[#c8322d]">
                    INVESTIGAR PRIMEIRO
                  </span>
                </div>

                <div className="space-y-3 py-5">
                  <SignalRow label="Uso" value="Estável" width="86%" />
                  <SignalRow label="Suporte" value="Normal" width="58%" />
                  <SignalRow
                    label="Contrato"
                    value="Mudou"
                    width="29%"
                    changed
                  />
                </div>

                <div className="rounded-2xl bg-[#10182f] p-4 text-white">
                  <div className="flex items-center gap-2 text-sm font-black">
                    <Sparkles size={15} className="text-[#8fb0ff]" />
                    A relação mudou apesar do uso estável.
                  </div>
                  <p className="mt-2 text-xs leading-5 text-white/65">
                    O estado contratual saiu do padrão enquanto comportamento e
                    suporte permaneceram próximos do normal.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* EVIDÊNCIA */}
          <section
            className="bg-[linear-gradient(180deg,#eef4ff_0%,#f8fafc_100%)] px-4 py-16 sm:px-6 sm:py-20"
            data-analytics-section="evidence"
          >
            <div className="mx-auto grid max-w-[1120px] items-center gap-10 rounded-[28px] border border-[#cfe0ff] bg-white p-6 sm:p-8 lg:grid-cols-2">
              <div>
                <Eyebrow>Evidência</Eyebrow>

                <h2 className="mt-4 text-[34px] font-black leading-[1.04] tracking-[-0.05em] text-[#101b35] sm:text-[44px]">
                  Testamos a hipótese antes de levá-la ao mercado.
                </h2>

                <p className="mt-4 text-sm leading-6 text-[#68758f] sm:text-base">
                  Em uma validação histórica cega, os grupos foram encontrados
                  antes de abrirmos os outcomes de churn.
                </p>

                <p className="mt-4 text-[10px] leading-4 text-[#8995a8]">
                  Experimento retrospectivo em dataset público. Não representa
                  resultado garantido nem redução de churn em clientes.
                </p>
              </div>

              <div className="grid items-center gap-3 sm:grid-cols-[1fr_54px_1fr]">
                <div className="rounded-2xl border border-[#e3e8f1] bg-[#fbfcfe] p-5 text-center">
                  <strong className="block text-[42px] font-black tracking-[-0.055em] text-[#1457ff]">
                    1 em 5
                  </strong>
                  <span className="mt-2 block text-xs leading-5 text-[#68758f]">
                    relações em modos priorizados
                  </span>
                </div>

                <div className="hidden text-center text-2xl font-black text-[#f43b35] sm:block">
                  →
                </div>

                <div className="rounded-2xl border border-[#e3e8f1] bg-[#fbfcfe] p-5 text-center">
                  <strong className="block text-[42px] font-black tracking-[-0.055em] text-[#1457ff]">
                    47,7%
                  </strong>
                  <span className="mt-2 block text-xs leading-5 text-[#68758f]">
                    dos churns posteriores em uma das janelas
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* PILOTO */}
          <section
            id="piloto"
            className="px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
            data-analytics-section="diagnostic_form_card"
          >
            <div className="mx-auto grid max-w-[1120px] items-start gap-10 lg:grid-cols-[1fr_.82fr] lg:gap-16">
              <div>
                <Eyebrow>Piloto assistido</Eyebrow>

                <h2 className="mt-4 max-w-[720px] text-[38px] font-black leading-[1.03] tracking-[-0.052em] text-[#101b35] sm:text-[50px]">
                  Vamos testar isso na sua fila de churn.
                </h2>

                <p className="mt-5 max-w-[650px] text-base leading-7 text-[#68758f] sm:text-[18px]">
                  Pegamos dados históricos, comparamos o processo atual com a
                  priorização do Ohrly e medimos se seu time teria precisado
                  investigar menos contas.
                </p>

                <div className="mt-7 space-y-3">
                  {[
                    "Use seu health score ou processo atual como referência.",
                    "Conecte os sinais que já existem.",
                    "Compare o que o Ohrly teria priorizado.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-[#e2e7f1] bg-white p-4 text-sm leading-6 text-[#4d5b76]"
                    >
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e9f0ff] text-[#1457ff]">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#7d899f]">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#1457ff]" />
                    Sem migrar seu help desk
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#1457ff]" />
                    Podemos começar pelo Intercom
                  </span>
                </div>
              </div>

              <div className="rounded-[26px] border border-[#dfe5f0] bg-white p-5 shadow-[0_22px_60px_rgba(24,45,92,.09)] sm:p-6">
                <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                  Quero testar com minhas contas
                </div>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101b35]">
                  Conte um pouco sobre a operação.
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#7a869a]">
                  Usaremos suas respostas para entender se o piloto faz sentido.
                </p>

                {/* Mantém o mesmo componente para preservar os eventos de formulário já implementados nele. */}
                <LeadForm />
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section
            className="border-t border-[#e4e9f2] px-4 py-16 sm:px-6 sm:py-20"
            data-analytics-section="faq"
          >
            <div className="mx-auto max-w-[820px]">
              <Eyebrow>Perguntas</Eyebrow>
              <h2 className="mt-3 text-[34px] font-black tracking-[-0.048em] text-[#101b35] sm:text-[43px]">
                O básico antes de testar.
              </h2>

              <div className="mt-7 divide-y divide-[#e1e6ef] border-y border-[#e1e6ef]">
                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                    Ohrly substitui meu health score?
                  </summary>
                  <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                    Não precisa substituir. Seu health score pode continuar sendo o
                    radar de risco. O Ohrly entra depois para identificar onde a
                    relação realmente mudou e ajudar o time a priorizar a
                    investigação.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                    Ohrly prevê churn?
                  </summary>
                  <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                    Não prometemos prever todo churn. O foco inicial é reduzir a
                    superfície de investigação encontrando mudanças relevantes na
                    relação antes da decisão humana.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                    Preciso trocar de ferramenta?
                  </summary>
                  <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                    Não. A proposta é trabalhar com os sinais que você já possui.
                    Podemos começar pelo Intercom e evoluir para outras fontes como
                    produto, financeiro e contrato.
                  </p>
                </details>

                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">
                    Quem decide se uma conta realmente merece ação?
                  </summary>
                  <p className="mt-3 max-w-[740px] text-sm leading-6 text-[#68758f]">
                    Seu time. O Ohrly prioriza e prepara contexto; a decisão de
                    investigar, agir ou ignorar continua humana.
                  </p>
                </details>
              </div>
            </div>
          </section>
        </main>

        <footer
          className="px-4 py-8 sm:px-6"
          data-analytics-section="footer"
        >
          <div className="mx-auto flex max-w-[1120px] flex-col gap-4 border-t border-[#e2e7f0] pt-7 text-xs text-[#7a869a] sm:flex-row sm:items-center sm:justify-between">
            <Brand />
            <div>
              Seu radar encontra risco. O Ohrly ajuda a decidir onde investigar primeiro.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
