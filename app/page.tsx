import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Clock3,
  History,
  MessageSquareText,
  Repeat2,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadForm } from "@/components/lead-form";

export const metadata: Metadata = {
  title: "Ohrly, Menos contas para investigar. Mais contexto para agir.",
  description:
    "Ohrly encontra as contas que mudaram no seu histórico de suporte e prepara a primeira investigação para o CSM.",
  openGraph: {
    title: "Ohrly, Seu CSM não deveria investigar toda a carteira",
    description:
      "Conecte seu Intercom. O Ohrly encontra as contas que mudaram e prepara a primeira investigação para o CSM.",
    type: "website",
  },
};

const BLUE = "#1457ff";
const RED = "#f43b35";

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

function AccountRow({
  name,
  detail,
  badge,
  tone = "blue",
}: {
  name: string;
  detail: string;
  badge: string;
  tone?: "blue" | "red";
}) {
  const toneClass =
    tone === "red"
      ? "border-[#ffd2d0] bg-[#fff2f1] text-[#c82f2a]"
      : "border-[#d7e2ff] bg-[#edf3ff] text-[#1748c8]";

  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-t border-[#edf0f6] py-3.5 first:border-t-0">
      <div className="min-w-0">
        <div className="truncate text-sm font-black text-[#101b35]">{name}</div>
        <div className="mt-1 text-xs leading-5 text-[#68758f]">{detail}</div>
      </div>
      <span
        className={`rounded-full border px-2.5 py-1 text-[10px] font-black ${toneClass}`}
      >
        {badge}
      </span>
    </div>
  );
}

function ProblemCard({
  icon,
  number,
  title,
  children,
}: {
  icon: React.ReactNode;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-[24px] border border-[#e4e9f4] bg-white p-6 shadow-[0_16px_44px_rgba(26,45,90,.05)]">
      <div className="flex items-center justify-between">
        <div className="flex size-10 items-center justify-center rounded-xl bg-[#edf3ff] text-[#1457ff]">
          {icon}
        </div>
        <span className="text-xs font-black tracking-[.12em] text-[#a7b1c5]">
          {number}
        </span>
      </div>
      <h3 className="mt-7 text-xl font-black tracking-[-0.035em] text-[#101b35]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#68758f]">{children}</p>
    </article>
  );
}

function StepCard({
  number,
  label,
  title,
  children,
}: {
  number: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-[24px] border border-[#e4e9f4] bg-white p-6">
      <div className="absolute -right-10 -top-10 size-32 rounded-full bg-[radial-gradient(circle,rgba(20,87,255,.10),transparent_68%)]" />
      <div className="relative">
        <div className="text-[11px] font-black uppercase tracking-[.13em] text-[#1457ff]">
          {number} · {label}
        </div>
        <h3 className="mt-4 text-[23px] font-black leading-tight tracking-[-0.04em] text-[#101b35]">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-[#68758f]">{children}</p>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <>
      <CookieConsent />
      <BehaviorTracker />

      <div className="min-h-screen bg-[#f7f9fd] text-[#101b35]">
        <nav className="sticky top-0 z-40 border-b border-[#e5eaf4]/90 bg-[#f7f9fd]/86 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] w-[min(calc(100%_-_2rem),1180px)] items-center justify-between gap-5 sm:w-[min(calc(100%_-_2.5rem),1180px)]">
            <a href="#top" aria-label="Ohrly, início" data-analytics-cta="nav_logo">
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
                data-analytics-label="Participar do piloto"
              >
                Participar do piloto
                <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </nav>

        <main id="top">
          <section
            className="relative overflow-hidden px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20 lg:pb-20"
            data-analytics-section="hero"
          >
            <div className="pointer-events-none absolute left-[-140px] top-[-170px] size-[430px] rounded-full bg-[radial-gradient(circle,rgba(20,87,255,.13),transparent_67%)]" />
            <div className="pointer-events-none absolute right-[-120px] top-[-120px] size-[380px] rounded-full bg-[radial-gradient(circle,rgba(244,59,53,.10),transparent_68%)]" />

            <div className="relative mx-auto grid max-w-[1180px] items-center gap-12 lg:grid-cols-[1.03fr_.97fr] lg:gap-16">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#dce5ff] bg-white px-3 py-2 text-xs font-black text-[#1748c8] shadow-[0_8px_24px_rgba(20,87,255,.05)]">
                  <span className="size-2 rounded-full bg-gradient-to-br from-[#1457ff] to-[#f43b35]" />
                  Para Customer Success em SaaS B2B
                </div>

                <h1 className="mt-6 max-w-[760px] text-[42px] font-black leading-[.98] tracking-[-0.058em] text-[#0d1831] sm:text-[56px] lg:text-[67px]">
                  Seu CSM não deveria investigar toda a carteira para descobrir quem precisa dele.
                </h1>

                <p className="mt-6 max-w-[690px] text-base leading-7 text-[#68758f] sm:text-[18px] sm:leading-8">
                  Conecte seu Intercom. O Ohrly encontra as contas que{" "}
                  <strong className="font-black text-[#101b35]">
                    mudaram de forma persistente
                  </strong>{" "}
                  e prepara a primeira investigação, o que mudou, o que está se repetindo e por que isso merece atenção.
                </p>

                <div className="mt-7 flex flex-wrap gap-2.5">
                  <a
                    href="#piloto"
                    className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-[15px] font-black text-white shadow-[0_14px_30px_rgba(20,87,255,.20)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
                    data-analytics-cta="hero_pilot"
                    data-analytics-location="hero"
                    data-analytics-label="Quero testar com minha carteira"
                  >
                    Quero testar com minha carteira
                    <ArrowRight size={16} />
                  </a>
                  <a
                    href="#exemplo"
                    className="inline-flex min-h-13 items-center gap-2 rounded-xl border border-[#dfe5f0] bg-white px-5 text-[15px] font-black text-[#101b35] transition hover:-translate-y-px hover:border-[#cfd8eb]"
                    data-analytics-cta="hero_example"
                    data-analytics-location="hero"
                    data-analytics-label="Ver uma investigação"
                  >
                    <Search size={16} />
                    Ver uma investigação
                  </a>
                </div>

                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-[#7d899f]">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#1457ff]" />
                    Sem migrar seu help desk
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#1457ff]" />
                    Sem configurar Health Score do zero
                  </span>
                </div>
              </div>

              <div
                className="overflow-hidden rounded-[28px] border border-[#dfe5f0] bg-white shadow-[0_26px_75px_rgba(30,50,100,.12)]"
                data-analytics-section="hero_product_preview"
              >
                <div className="flex h-12 items-center justify-between border-b border-[#e7ebf3] bg-[#fbfcff] px-4">
                  <div className="flex gap-1.5">
                    <span className="size-2 rounded-full bg-[#d4dbea]" />
                    <span className="size-2 rounded-full bg-[#d4dbea]" />
                    <span className="size-2 rounded-full bg-[#d4dbea]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[.11em] text-[#929db1]">
                    Account attention
                  </span>
                </div>

                <div className="relative p-5 sm:p-6">
                  <div className="pointer-events-none absolute -left-12 -top-14 size-44 rounded-full bg-[radial-gradient(circle,rgba(20,87,255,.11),transparent_68%)]" />
                  <div className="pointer-events-none absolute -bottom-16 -right-10 size-48 rounded-full bg-[radial-gradient(circle,rgba(244,59,53,.09),transparent_68%)]" />

                  <div className="relative">
                    <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8c97aa]">
                      Hoje
                    </div>
                    <h2 className="mt-1 text-[27px] font-black tracking-[-0.045em] text-[#101b35]">
                      5 contas merecem atenção
                    </h2>
                    <p className="mt-1 text-sm text-[#7b879d]">Entre 347 contas observadas</p>

                    <div className="mt-5 rounded-2xl border border-[#e6eaf2] bg-white px-4">
                      <AccountRow
                        name="Acme"
                        detail="Fricção crescente em importação · 4 semanas"
                        badge="Investigar"
                      />
                      <AccountRow
                        name="Northstar"
                        detail="3 pessoas diferentes procuraram suporte"
                        badge="Atenção"
                        tone="red"
                      />
                      <AccountRow
                        name="Orbit"
                        detail="Problema antigo reapareceu após 74 dias"
                        badge="Reincidência"
                      />
                    </div>

                    <div className="mt-4 rounded-2xl border border-[#dfe6fa] bg-[linear-gradient(135deg,#edf3ff,#fff4f3)] p-4">
                      <div className="flex items-center gap-2 text-sm font-black text-[#101b35]">
                        <Sparkles size={16} className="text-[#1457ff]" />
                        Primeira investigação pronta
                      </div>
                      <p className="mt-2 text-xs leading-5 text-[#65728a]">
                        A Acme passou de 2 para 8 conversas/mês. Cinco estão relacionadas à importação e um episódio semelhante ocorreu em março.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-5 sm:px-6 sm:py-8"
            data-analytics-section="signal_strip"
          >
            <div className="mx-auto max-w-[1180px]">
              <p className="mb-4 text-center text-xs font-bold text-[#8a96aa]">
                Comece com o histórico que seu time já possui
              </p>
              <div className="grid overflow-hidden rounded-2xl border border-[#e2e7f1] bg-white shadow-[0_12px_36px_rgba(25,45,90,.04)] sm:grid-cols-2 lg:grid-cols-4">
                {[
                  [<Building2 key="i" size={17} />, "Companies", "Uma conta, várias pessoas"],
                  [<MessageSquareText key="i" size={17} />, "Conversas", "Contato, recorrência e esforço"],
                  [<Repeat2 key="i" size={17} />, "Problemas", "Temas que surgem e reaparecem"],
                  [<Clock3 key="i" size={17} />, "Tempo", "Mudança, persistência e recuperação"],
                ].map(([icon, label, detail], index) => (
                  <div
                    key={String(label)}
                    className={`p-5 ${index < 3 ? "border-b border-[#e9edf4] lg:border-b-0 lg:border-r" : ""} ${index === 0 ? "sm:border-r" : ""} ${index === 1 ? "sm:border-r-0 lg:border-r" : ""} ${index === 2 ? "sm:border-r" : ""}`}
                  >
                    <div className="flex items-center gap-2 text-sm font-black text-[#101b35]">
                      <span className="text-[#1457ff]">{icon}</span>
                      {label}
                    </div>
                    <p className="mt-1 text-xs text-[#7a879e]">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="problema"
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="problem"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="max-w-[790px]">
                <div className="text-xs font-black uppercase tracking-[.13em] text-[#1457ff]">
                  O problema
                </div>
                <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-0.05em] text-[#101b35] sm:text-[46px] lg:text-[52px]">
                  A carteira cresce. A capacidade de investigar cada conta, não.
                </h2>
                <p className="mt-4 text-base leading-7 text-[#68758f] sm:text-[18px]">
                  O CSM acaba sabendo muito sobre quem já chamou atenção, e pouco sobre quem ainda não teve um motivo explícito para virar prioridade.
                </p>
              </div>

              <div className="mt-9 grid gap-4 md:grid-cols-3">
                <ProblemCard icon={<Users size={18} />} number="01" title="A atenção chega tarde">
                  Reclamações, escalonamentos e renewals próximos acabam decidindo quais contas o time investiga primeiro.
                </ProblemCard>
                <ProblemCard icon={<Search size={18} />} number="02" title="O contexto está espalhado">
                  Para entender uma conta, o CSM reconstrói conversas, pessoas envolvidas, problemas recorrentes e episódios anteriores.
                </ProblemCard>
                <ProblemCard icon={<History size={18} />} number="03" title="O mesmo problema volta">
                  Uma reincidência pode parecer um novo caso até alguém lembrar que aquela conta já viveu algo semelhante.
                </ProblemCard>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-8 sm:px-6 sm:py-12"
            data-analytics-section="before_after"
          >
            <div className="mx-auto max-w-[1180px] overflow-hidden rounded-[28px] border border-[#dfe5f0] bg-white shadow-[0_18px_55px_rgba(26,45,90,.06)]">
              <div className="grid md:grid-cols-2">
                <div className="relative overflow-hidden border-b border-[#e5eaf3] bg-[linear-gradient(135deg,#fff8f7,#ffffff)] p-6 sm:p-8 md:border-b-0 md:border-r">
                  <div className="pointer-events-none absolute -bottom-16 -left-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(244,59,53,.12),transparent_68%)]" />
                  <div className="relative">
                    <span className="inline-flex rounded-lg bg-[#f43b35] px-3 py-1.5 text-xs font-black uppercase tracking-[.09em] text-white">
                      Antes
                    </span>
                    <div className="mt-6 flex items-end gap-3">
                      <strong className="text-[64px] font-black leading-none tracking-[-0.06em] text-[#f43b35] sm:text-[78px]">
                        347
                      </strong>
                      <span className="pb-2 text-lg font-black leading-tight text-[#101b35]">
                        contas para<br />investigar
                      </span>
                    </div>
                    <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#7b879b]">
                      Mais abas, mais sinais e mais contexto para reconstruir antes de qualquer decisão.
                    </p>

                    <div className="relative mt-7 h-[260px]">
                      {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                          key={item}
                          className="absolute left-0 right-0 rounded-xl border border-[#e5e7ed] bg-white px-4 py-3 shadow-[0_10px_26px_rgba(40,44,70,.08)]"
                          style={{
                            top: `${item * 28}px`,
                            transform: `translateX(${item % 2 === 0 ? item * 5 : item * 9}px) rotate(${item % 2 === 0 ? -1.2 : 1.1}deg)`,
                            zIndex: 10 - item,
                          }}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                              <span className="size-7 rounded-lg bg-[#f3f5f8]" />
                              <div>
                                <div className="h-2.5 w-24 rounded-full bg-[#dfe4ec]" />
                                <div className="mt-2 h-2 w-16 rounded-full bg-[#eef1f5]" />
                              </div>
                            </div>
                            <span className="rounded-full bg-[#fff0ef] px-2 py-1 text-[9px] font-black text-[#d2332e]">
                              risco
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="relative overflow-hidden bg-[linear-gradient(135deg,#f8fbff,#ffffff)] p-6 sm:p-8">
                  <div className="pointer-events-none absolute -right-20 -top-12 size-56 rounded-full bg-[radial-gradient(circle,rgba(20,87,255,.13),transparent_68%)]" />
                  <div className="relative">
                    <span className="inline-flex rounded-lg bg-[#1457ff] px-3 py-1.5 text-xs font-black uppercase tracking-[.09em] text-white">
                      Depois
                    </span>
                    <div className="mt-6 flex items-end gap-3">
                      <strong className="text-[64px] font-black leading-none tracking-[-0.06em] text-[#1457ff] sm:text-[78px]">
                        5
                      </strong>
                      <span className="pb-2 text-lg font-black leading-tight text-[#101b35]">
                        contas para<br />abrir hoje
                      </span>
                    </div>
                    <p className="mt-4 max-w-[420px] text-sm leading-6 text-[#68758f]">
                      Ohrly encontra quem mudou e entrega contexto suficiente para o CSM decidir onde vale gastar atenção.
                    </p>

                    <div className="mt-6 space-y-2.5">
                      {[
                        ["Acme", "Importação voltou a gerar fricção"],
                        ["Northstar", "Mais pessoas procurando suporte"],
                        ["Orbit", "Reincidência após 74 dias"],
                        ["Vector", "Tempo de resolução aumentou"],
                        ["Prime", "Padrão antigo reapareceu"],
                      ].map(([name, detail], index) => (
                        <div
                          key={name}
                          className="flex items-center gap-3 rounded-xl border border-[#dfe6f5] bg-white p-3 shadow-[0_8px_20px_rgba(20,87,255,.05)]"
                        >
                          <span className={`size-2.5 shrink-0 rounded-full ${index === 1 ? "bg-[#f43b35]" : "bg-[#1457ff]"}`} />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-black text-[#101b35]">{name}</div>
                            <div className="mt-0.5 truncate text-xs text-[#7b879b]">{detail}</div>
                          </div>
                          <ArrowRight size={14} className="shrink-0 text-[#98a5ba]" />
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#d9e3ff] bg-[#eef4ff] px-4 py-3 text-sm font-black text-[#1748c8]">
                      <Search size={16} />
                      Menos contas para abrir. Mais contexto para agir.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            id="como-funciona"
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="how_it_works"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="max-w-[810px]">
                <div className="text-xs font-black uppercase tracking-[.13em] text-[#1457ff]">
                  Como funciona
                </div>
                <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-0.05em] text-[#101b35] sm:text-[46px] lg:text-[52px]">
                  Menos contas para abrir. Mais contexto quando você abrir.
                </h2>
                <p className="mt-4 text-base leading-7 text-[#68758f] sm:text-[18px]">
                  Ohrly não substitui o julgamento do CSM. Ele comprime o trabalho que acontece antes de uma decisão.
                </p>
              </div>

              <div className="mt-9 grid gap-4 md:grid-cols-3">
                <StepCard number="01" label="Conecte" title="Use o histórico que já existe.">
                  Começamos pelo Intercom e reconstruímos Companies, contatos e conversas sem pedir uma nova instrumentação.
                </StepCard>
                <StepCard number="02" label="Priorize" title="Veja quais contas realmente mudaram.">
                  Em vez de comparar todo mundo por uma régua única, Ohrly procura mudanças persistentes em relação ao histórico da própria conta.
                </StepCard>
                <StepCard number="03" label="Decida" title="Receba a primeira investigação.">
                  O que mudou, quais problemas estão envolvidos, se isso já aconteceu antes e o que merece ser verificado primeiro.
                </StepCard>
              </div>
            </div>
          </section>

          <section
            id="exemplo"
            className="px-4 py-10 sm:px-6 sm:py-14 lg:py-18"
            data-analytics-section="investigation_example"
          >
            <div className="mx-auto grid max-w-[1180px] gap-6 lg:grid-cols-[.82fr_1.18fr] lg:gap-10">
              <aside className="rounded-[26px] bg-[linear-gradient(145deg,#163a9a,#0e204f)] p-7 text-white shadow-[0_25px_55px_rgba(15,36,93,.22)] sm:p-8 lg:sticky lg:top-[100px] lg:self-start">
                <div className="text-[10px] font-black uppercase tracking-[.14em] text-[#c9d8ff]">
                  O trabalho que queremos comprimir
                </div>
                <blockquote className="mt-4 text-[29px] font-black leading-[1.13] tracking-[-0.045em] sm:text-[34px]">
                  “Não me diga apenas que a conta está em risco. Faça o trabalho necessário para eu decidir se preciso me preocupar.”
                </blockquote>
                <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/8 p-4">
                  <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#9fb9ff]" />
                  <p className="text-sm leading-6 text-white/72">
                    Ohrly prioriza e prepara contexto. O CSM continua decidindo se investiga, usa o playbook ou ignora a leitura.
                  </p>
                </div>
              </aside>

              <div className="rounded-[26px] border border-[#e1e6f0] bg-white p-5 shadow-[0_20px_60px_rgba(25,45,90,.07)] sm:p-7">
                <div className="flex flex-col gap-4 border-b border-[#edf0f5] pb-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                      Exemplo ilustrativo
                    </div>
                    <h3 className="mt-1 text-[29px] font-black tracking-[-0.045em] text-[#101b35]">
                      Acme precisa de atenção
                    </h3>
                    <p className="mt-1 text-xs text-[#8591a5]">Mudança detectada há 4 semanas</p>
                  </div>
                  <span className="inline-flex w-fit rounded-full border border-[#d7e2ff] bg-[#edf3ff] px-3 py-1.5 text-[10px] font-black text-[#1748c8]">
                    Investigação pronta
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 py-5 sm:grid-cols-4">
                  {[
                    ["2 → 8/mês", "conversas"],
                    ["1 → 4", "pessoas no suporte"],
                    ["3", "problemas recorrentes"],
                    ["+62%", "tempo de resolução"],
                  ].map(([value, label]) => (
                    <div key={label} className="rounded-xl border border-[#e6eaf2] bg-[#f8faff] p-3.5">
                      <strong className="block text-[19px] font-black tracking-[-0.035em] text-[#101b35]">
                        {value}
                      </strong>
                      <span className="mt-1 block text-[10px] leading-4 text-[#7d899e]">{label}</span>
                    </div>
                  ))}
                </div>

                <div className="divide-y divide-[#edf0f5]">
                  <div className="py-5 first:pt-0">
                    <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">Principal mudança</div>
                    <p className="mt-2 text-sm leading-6 text-[#45516b]">
                      Problemas de importação começaram a reaparecer depois de meses sem ocorrência e agora representam a maior parte do contato recente.
                    </p>
                  </div>
                  <div className="py-5">
                    <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">Isso já aconteceu</div>
                    <p className="mt-2 text-sm leading-6 text-[#45516b]">
                      Um episódio semelhante ocorreu em março. Depois de uma revisão da configuração da integração, a conta voltou gradualmente ao padrão anterior.
                    </p>
                  </div>
                  <div className="py-5">
                    <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">Próximo passo sugerido</div>
                    <p className="mt-2 text-sm leading-6 text-[#45516b]">
                      Verificar se a configuração atual da integração é a mesma observada no episódio anterior antes de reconstruir toda a investigação do zero.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button type="button" className="rounded-xl border border-[#f43b35] bg-[#f43b35] px-3.5 py-2.5 text-xs font-black text-white">
                        Usar este playbook
                      </button>
                      <button type="button" className="rounded-xl border border-[#dfe5ef] bg-white px-3.5 py-2.5 text-xs font-black text-[#101b35]">
                        Investigar
                      </button>
                      <button type="button" className="rounded-xl border border-[#dfe5ef] bg-white px-3.5 py-2.5 text-xs font-black text-[#101b35]">
                        Já estou acompanhando
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-analytics-section="positioning"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="max-w-[820px]">
                <div className="text-xs font-black uppercase tracking-[.13em] text-[#1457ff]">
                  Uma camada de atenção
                </div>
                <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-0.05em] text-[#101b35] sm:text-[46px] lg:text-[52px]">
                  Não queremos ser outra plataforma para o seu time administrar.
                </h2>
              </div>

              <div className="mt-9 grid overflow-hidden rounded-[26px] border border-[#e2e7f1] bg-white md:grid-cols-2">
                <div className="p-6 sm:p-8">
                  <h3 className="text-xl font-black tracking-[-0.035em] text-[#101b35]">Não queremos exigir</h3>
                  <div className="mt-5 space-y-3 text-sm text-[#68758f]">
                    {[
                      "Migrar seu help desk",
                      "Configurar Health Score do zero",
                      "Escolher dezenas de pesos e thresholds",
                      "Trocar o CRM ou processo de CS",
                      "Transformar toda oscilação em alerta",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <span className="mt-2 h-px w-3 shrink-0 bg-[#aab4c5]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[#e2e7f1] bg-[#f9fbff] p-6 sm:p-8 md:border-l md:border-t-0">
                  <h3 className="text-xl font-black tracking-[-0.035em] text-[#101b35]">Queremos entregar</h3>
                  <div className="mt-5 space-y-3 text-sm text-[#4d5b76]">
                    {[
                      "Poucas contas que realmente merecem atenção",
                      "Contexto temporal da própria conta",
                      "Problemas recorrentes e reincidências",
                      "Evidências que o CSM pode auditar",
                      "Uma primeira investigação antes da decisão humana",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2.5">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e9f0ff] text-[#1457ff]">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-8 sm:px-6 sm:py-12"
            data-analytics-section="best_fit"
          >
            <div className="mx-auto grid max-w-[1180px] gap-7 rounded-[30px] bg-[linear-gradient(145deg,#133893,#0c1d4b)] p-7 text-white shadow-[0_24px_60px_rgba(13,37,94,.20)] sm:p-10 lg:grid-cols-[.9fr_1.1fr] lg:p-12">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[.14em] text-[#b9cbff]">
                  Para quem faz sentido
                </div>
                <h2 className="mt-3 text-[34px] font-black leading-[1.04] tracking-[-0.05em] sm:text-[44px]">
                  O problema aparece quando a carteira cresce além da atenção disponível.
                </h2>
                <p className="mt-4 max-w-[570px] text-sm leading-7 text-white/70 sm:text-base">
                  O primeiro piloto é pensado para SaaS B2B que já ultrapassaram o acompanhamento manual da carteira, mas ainda não querem transformar toda a stack de CS.
                </p>
              </div>

              <div className="grid gap-2.5">
                {[
                  "Seu time já possui mais contas do que consegue investigar continuamente.",
                  "O Intercom concentra parte relevante do histórico de suporte.",
                  "Várias pessoas da mesma Company entram em contato.",
                  "Problemas antigos eventualmente reaparecem.",
                  "O CSM ainda reconstrói contexto manualmente antes de agir.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/7 p-4 text-sm leading-6 text-white/84">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#a9c0ff]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            id="piloto"
            className="px-4 py-20 sm:px-6 sm:py-24 lg:py-28"
            data-analytics-section="diagnostic_form_card"
          >
            <div className="mx-auto grid max-w-[1180px] items-start gap-10 lg:grid-cols-[1fr_.82fr] lg:gap-16">
              <div>
                <div className="text-xs font-black uppercase tracking-[.13em] text-[#1457ff]">
                  Piloto inicial
                </div>
                <h2 className="mt-3 max-w-[720px] text-[36px] font-black leading-[1.03] tracking-[-0.052em] text-[#101b35] sm:text-[48px] lg:text-[55px]">
                  Quais contas seu time descobriria mais cedo se não precisasse investigar uma por uma?
                </h2>
                <p className="mt-5 max-w-[680px] text-base leading-7 text-[#68758f] sm:text-[18px]">
                  Queremos testar uma leitura retrospectiva do histórico. O objetivo é encontrar contas que mudaram e verificar se essa investigação teria economizado tempo ou mudado uma decisão real.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#e2e7f1] bg-white p-4">
                    <div className="flex items-center gap-2 text-sm font-black text-[#101b35]">
                      <ShieldCheck size={16} className="text-[#1457ff]" />
                      Sem migração
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#7b879b]">Começamos pelo histórico que já existe no seu Intercom.</p>
                  </div>
                  <div className="rounded-2xl border border-[#e2e7f1] bg-white p-4">
                    <div className="flex items-center gap-2 text-sm font-black text-[#101b35]">
                      <Sparkles size={16} className="text-[#f43b35]" />
                      Primeiro provar valor
                    </div>
                    <p className="mt-2 text-xs leading-5 text-[#7b879b]">Sem compromisso de contratar antes de descobrirmos algo realmente útil.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[26px] border border-[#dfe5f0] bg-white p-5 shadow-[0_22px_60px_rgba(24,45,92,.09)] sm:p-6">
                <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#8995a8]">
                  Quero avaliar minha carteira
                </div>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#101b35]">
                  Conte um pouco sobre a operação.
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#7a869a]">
                  São quatro campos. Usaremos as respostas para saber se o piloto faz sentido para vocês.
                </p>
                <LeadForm />
              </div>
            </div>
          </section>

          <section
            className="border-t border-[#e4e9f2] px-4 py-16 sm:px-6 sm:py-20"
            data-analytics-section="faq"
          >
            <div className="mx-auto max-w-[880px]">
              <div className="text-xs font-black uppercase tracking-[.13em] text-[#1457ff]">Perguntas</div>
              <h2 className="mt-3 text-[34px] font-black tracking-[-0.048em] text-[#101b35] sm:text-[43px]">
                O básico antes de conectar.
              </h2>

              <div className="mt-7 divide-y divide-[#e1e6ef] border-y border-[#e1e6ef]">
                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">Ohrly é um Health Score?</summary>
                  <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#68758f]">
                    Não como proposta inicial. Em vez de resumir toda a conta em uma nota, queremos mostrar quais contas mudaram, por quê e o que o CSM precisa saber antes de decidir se vale investigar.
                  </p>
                </details>
                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">Ohrly prevê churn?</summary>
                  <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#68758f]">
                    Não prometemos prever todo churn. O primeiro wedge observa mudanças no relacionamento e na fricção visível no histórico de suporte.
                  </p>
                </details>
                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">Por que começar pelo Intercom?</summary>
                  <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#68758f]">
                    Porque ele já concentra Companies, contatos, conversas e histórico suficiente para testar a hipótese com pouca fricção. SaaS B2B é o mercado; Intercom é o primeiro conector.
                  </p>
                </details>
                <details className="group py-5">
                  <summary className="cursor-pointer list-none text-base font-black text-[#101b35]">O CSM perde controle da decisão?</summary>
                  <p className="mt-3 max-w-[760px] text-sm leading-6 text-[#68758f]">
                    Não. Ohrly prioriza e prepara contexto. O CSM continua podendo usar o playbook, investigar por conta própria ou dizer que a leitura não é relevante.
                  </p>
                </details>
              </div>
            </div>
          </section>
        </main>

        <footer className="px-4 py-8 sm:px-6" data-analytics-section="footer">
          <div className="mx-auto flex max-w-[1180px] flex-col gap-4 border-t border-[#e2e7f0] pt-7 text-xs text-[#7a869a] sm:flex-row sm:items-center sm:justify-between">
            <Brand />
            <div>Menos contas para investigar. Mais contexto para agir.</div>
          </div>
        </footer>
      </div>
    </>
  );
}
