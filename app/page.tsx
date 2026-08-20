import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

import {
  ArrowRight,
  Check,
  ChevronRight,
  Eye,
  GitBranch,
  Route,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Ohrly — Entenda a qualidade das visitas antes de escalar",
  description:
    "Veja como as pessoas avançam no seu site, teste o que define uma boa visita e aprenda antes de colocar mais dinheiro na aquisição.",
};

type SearchParams = Promise<
  Record<string, string | string[] | undefined>
>;

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_placement",
  "fbclid",
  "gclid",
] as const;

function firstValue(
  value: string | string[] | undefined,
): string | null {
  if (Array.isArray(value)) return value[0] || null;
  return value || null;
}

function withAttribution(
  baseUrl: string,
  searchParams: Record<
    string,
    string | string[] | undefined
  >,
  extra: Record<string, string> = {},
) {
  try {
    const url = new URL(baseUrl);

    for (const key of ATTRIBUTION_KEYS) {
      const value = firstValue(searchParams[key]);
      if (value) url.searchParams.set(key, value);
    }

    for (const [key, value] of Object.entries(extra)) {
      url.searchParams.set(key, value);
    }

    return url.toString();
  } catch {
    return baseUrl;
  }
}

function MetricCard({
  label,
  value,
  name,
  detail,
  badge,
  tone = "neutral",
}: {
  label: string;
  value: string;
  name?: string;
  detail: string;
  badge?: string;
  tone?: "neutral" | "green" | "blue" | "dark";
}) {
  const badgeClass =
    tone === "green"
      ? "bg-[#edf5ef] text-[#2e6b48]"
      : tone === "blue"
        ? "bg-[#eef4ff] text-[#2f6fed]"
        : tone === "dark"
          ? "bg-[#eef1ef] text-[#173a27]"
          : "bg-[#f1f3f5] text-[#69717d]";

  return (
    <article className="min-h-[132px] border-b border-[#e5e7eb] p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <div className="text-xs font-semibold text-[#69717d]">
        {label}
      </div>

      <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <strong className="text-[30px] font-bold tracking-[-0.05em] text-[#16181c]">
          {value}
        </strong>
        {name ? (
          <span className="text-sm font-semibold text-[#34383e]">
            {name}
          </span>
        ) : null}
      </div>

      <div className="mt-1.5 text-xs leading-5 text-[#69717d]">
        {detail}
      </div>

      {badge ? (
        <span
          className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${badgeClass}`}
        >
          {badge}
        </span>
      ) : null}
    </article>
  );
}

function InsightCard({
  icon,
  value,
  title,
  children,
}: {
  icon: React.ReactNode;
  value: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,.02)]">
      <div className="flex size-9 items-center justify-center rounded-xl bg-[#edf5ef] text-[#2e6b48]">
        {icon}
      </div>
      <div className="mt-5 text-4xl font-bold tracking-[-0.05em]">
        {value}
      </div>
      <h3 className="mt-2 text-base font-semibold tracking-[-0.02em]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#69717d]">
        {children}
      </p>
    </article>
  );
}

function StepCard({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-2xl border border-[#e5e7eb] bg-white p-6">
      <div className="flex size-8 items-center justify-center rounded-full bg-[#16181c] text-xs font-bold text-white">
        {number}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-[-0.025em]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-6 text-[#69717d]">
        {children}
      </p>
    </article>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = await searchParams;

  const appUrl = (
    process.env.NEXT_PUBLIC_OHRLY_APP_URL ||
    "https://app.ohrly.com.br"
  ).replace(/\/$/, "");

  const signupBase =
    process.env.NEXT_PUBLIC_OHRLY_SIGNUP_URL ||
    `${appUrl}/signup`;

  const loginBase =
    process.env.NEXT_PUBLIC_OHRLY_LOGIN_URL ||
    `${appUrl}/login`;

  const signupUrl = withAttribution(
    signupBase,
    query,
    {
      ref: "ohrly_lp",
    },
  );

  const loginUrl = withAttribution(
    loginBase,
    query,
    {
      ref: "ohrly_lp",
    },
  );

  const projectKey =
    process.env.NEXT_PUBLIC_OHRLY_PROJECT_KEY || "";

  const collectionMode =
    process.env
      .NEXT_PUBLIC_OHRLY_COLLECTION_MODE ||
    "first_party_measurement";

  const storageMode =
    process.env.NEXT_PUBLIC_OHRLY_STORAGE_MODE ||
    "session";

  return (
    <>
      {projectKey ? (
        <Script
          id="ohrly-sdk"
          strategy="afterInteractive"
          src={`${appUrl}/ohrly.js`}
          data-project-key={projectKey}
          data-storage={storageMode}
          data-collection-mode={collectionMode}
          data-observe-consent-events="true"
          data-activation-requires-marketing-consent="true"
        />
      ) : null}

      <div className="min-h-screen bg-[#f6f7f8] text-[#16181c]">
        <nav className="sticky top-0 z-50 border-b border-[#e5e7eb]/90 bg-[#f6f7f8]/85 backdrop-blur-xl">
          <div className="mx-auto flex h-[68px] max-w-[1180px] items-center justify-between gap-5 px-4 sm:px-6">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.04em]"
              data-ohrly-cta="nav_logo"
            >
              <span className="relative flex size-7 items-center justify-center rounded-full border-[3px] border-[#2e6b48]">
                <span className="absolute right-[3px] top-[3px] size-2 rounded-full bg-[#2e6b48]" />
              </span>
              Ohrly
            </Link>

            <div className="flex items-center gap-1 sm:gap-2">
              <Link
                href="#como-funciona"
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#69717d] transition hover:bg-white hover:text-black md:inline-flex"
                data-ohrly-cta="nav_how_it_works"
              >
                Como funciona
              </Link>

              <Link
                href="#produto"
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#69717d] transition hover:bg-white hover:text-black md:inline-flex"
                data-ohrly-cta="nav_product"
              >
                Produto
              </Link>

              <Link
                href={loginUrl}
                className="hidden rounded-xl px-3 py-2 text-sm font-semibold text-[#69717d] transition hover:bg-white hover:text-black sm:inline-flex"
                data-ohrly-cta="nav_login"
              >
                Entrar
              </Link>

              <Link
                href={signupUrl}
                className="inline-flex items-center gap-2 rounded-xl border border-[#16181c] bg-[#16181c] px-4 py-2.5 text-sm font-bold text-white transition hover:-translate-y-px"
                data-ohrly-cta="nav_start_free"
                data-ohrly-event="signup_intent"
              >
                Começar grátis
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </nav>

        <main>
          <section
            className="px-4 pb-12 pt-16 text-center sm:px-6 sm:pt-20"
            data-ohrly-section="hero"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs font-bold text-[#69717d]">
                <span className="size-2 rounded-full bg-[#2e6b48]" />
                Para quem está começando a trazer
                tráfego
              </div>

              <h1 className="mx-auto mt-6 max-w-[900px] text-[42px] font-bold leading-[.98] tracking-[-0.055em] sm:text-[54px] lg:text-[64px]">
                Entenda a qualidade das visitas
                antes de escalar.
              </h1>

              <p className="mx-auto mt-6 max-w-[730px] text-base leading-7 text-[#69717d] sm:text-[19px] sm:leading-8">
                Veja como as pessoas avançam no seu
                site, teste o que define uma boa
                visita e aprenda antes de colocar
                mais dinheiro na aquisição.
              </p>

              <div className="mt-7 flex flex-wrap justify-center gap-2.5">
                <Link
                  href={signupUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#16181c] bg-[#16181c] px-5 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-px"
                  data-ohrly-cta="hero_start_free"
                  data-ohrly-event="signup_intent"
                >
                  Começar grátis
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="#produto"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-5 py-3.5 text-[15px] font-bold transition hover:-translate-y-px"
                  data-ohrly-cta="hero_see_product"
                  data-ohrly-event="product_explore"
                >
                  Ver como funciona
                  <ChevronRight size={16} />
                </Link>
              </div>

              <div
                id="produto"
                className="mx-auto mt-12 overflow-hidden rounded-[22px] border border-[#e5e7eb] bg-white text-left shadow-[0_1px_2px_rgba(16,24,40,.03),0_12px_40px_rgba(16,24,40,.06)] sm:mt-14"
                data-ohrly-section="dashboard_preview"
              >
                <div className="flex flex-col gap-3 border-b border-[#e5e7eb] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                  <div className="text-xs font-bold uppercase tracking-[.12em] text-[#69717d]">
                    Dashboard
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <div className="rounded-lg border border-[#e6e8eb] bg-[#f1f3f5] px-2.5 py-1.5 text-xs font-medium">
                      Regime #3 · Meta
                    </div>
                    <div className="rounded-lg border border-[#e6e8eb] bg-[#f1f3f5] px-2.5 py-1.5 text-xs font-medium">
                      Ciclo 2 · Teste de QV
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="mb-4 flex items-center gap-2 text-xs text-[#69717d]">
                    <span className="size-1.5 rounded-full bg-[#9ba2aa]" />
                    Ainda sem histórico suficiente
                    para comparação.
                  </div>

                  <div className="grid overflow-hidden rounded-2xl border border-[#e5e7eb] md:grid-cols-4">
                    <MetricCard
                      label="Sessões observadas"
                      value="52"
                      detail="nas últimas 24h"
                    />
                    <MetricCard
                      label="QualifiedVisit usada"
                      value="51"
                      name="page_view"
                      detail="98,1% das sessões"
                      badge="usada agora"
                      tone="green"
                    />
                    <MetricCard
                      label="QualifiedVisit em teste"
                      value="10"
                      name="≥5 segundos"
                      detail="19,2% das sessões"
                      badge="challenger"
                      tone="blue"
                    />
                    <MetricCard
                      label="Resultado"
                      value="3"
                      name="FormStart"
                      detail="5,8% das sessões"
                      badge="destino"
                      tone="dark"
                    />
                  </div>

                  <div className="mt-4 overflow-hidden rounded-2xl border border-[#e5e7eb] bg-white p-3">
                    <svg
                      viewBox="0 0 1000 250"
                      className="h-auto w-full"
                      role="img"
                      aria-label="Exemplo do movimento de sessões, QualifiedVisit usada, QualifiedVisit em teste e resultado"
                    >
                      <defs>
                        <linearGradient
                          id="lp-session-area"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#d2d7db"
                            stopOpacity=".58"
                          />
                          <stop
                            offset="100%"
                            stopColor="#d2d7db"
                            stopOpacity=".05"
                          />
                        </linearGradient>
                      </defs>

                      <g
                        stroke="#eceff1"
                        strokeWidth="1"
                      >
                        <line
                          x1="0"
                          y1="40"
                          x2="1000"
                          y2="40"
                        />
                        <line
                          x1="0"
                          y1="90"
                          x2="1000"
                          y2="90"
                        />
                        <line
                          x1="0"
                          y1="140"
                          x2="1000"
                          y2="140"
                        />
                        <line
                          x1="0"
                          y1="190"
                          x2="1000"
                          y2="190"
                        />
                      </g>

                      <path
                        d="M0 210 L650 210 L710 185 L760 50 L810 202 L870 204 L930 208 L1000 210 L1000 230 L0 230 Z"
                        fill="url(#lp-session-area)"
                      />
                      <path
                        d="M0 210 L650 210 L710 185 L760 50 L810 202 L870 204 L930 208 L1000 210"
                        fill="none"
                        stroke="#c9cfd4"
                        strokeWidth="2"
                      />
                      <path
                        d="M0 211 L650 211 L710 187 L760 55 L810 204 L870 205 L930 209 L1000 211"
                        fill="none"
                        stroke="#6b9278"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M0 212 L650 212 L710 205 L760 165 L810 211 L870 212 L930 212 L1000 212"
                        fill="none"
                        stroke="#2f6fed"
                        strokeDasharray="7 6"
                        strokeWidth="2.5"
                      />
                      <path
                        d="M0 213 L650 213 L710 195 L760 212 L810 213 L870 213 L930 213 L1000 213"
                        fill="none"
                        stroke="#173a27"
                        strokeWidth="2.2"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-ohrly-section="visit_quality_insights"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-bold uppercase tracking-[.12em] text-[#69717d]">
                O que você passa a enxergar
              </div>

              <h2 className="mt-3 max-w-[780px] text-[34px] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[42px]">
                Mais do que cliques. O comportamento
                de quem chegou.
              </h2>

              <p className="mt-4 max-w-[700px] text-base leading-7 text-[#69717d] sm:text-[17px]">
                O Ohrly transforma uma sequência
                pequena de visitas em sinais que
                ajudam você a entender quem realmente
                avançou.
              </p>

              <div className="mt-8 grid gap-3.5 md:grid-cols-3">
                <InsightCard
                  icon={<Route size={17} />}
                  value="10"
                  title="visitas realmente avançaram"
                >
                  Em vez de tratar toda chegada como
                  igual, veja quantas pessoas atingiram
                  comportamentos mais relevantes.
                </InsightCard>

                <InsightCard
                  icon={<Target size={17} />}
                  value="≥5s"
                  title="um comportamento vale ser testado"
                >
                  Descubra quais marcos parecem separar
                  melhor uma visita qualquer de uma
                  visita promissora.
                </InsightCard>

                <InsightCard
                  icon={<GitBranch size={17} />}
                  value="A + B"
                  title="combinações também podem importar"
                >
                  Teste caminhos simples, como
                  permanecer alguns segundos ou chegar
                  a uma região importante.
                </InsightCard>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-10 sm:px-6 sm:py-14"
            data-ohrly-section="behavior_map"
          >
            <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
              <div>
                <div className="text-xs font-bold uppercase tracking-[.12em] text-[#69717d]">
                  Mapa
                </div>

                <h2 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[42px]">
                  Entenda por que algumas visitas
                  avançam.
                </h2>

                <p className="mt-4 max-w-[650px] text-base leading-7 text-[#69717d] sm:text-[17px]">
                  Veja marcos, combinações e o que está
                  sendo usado ou testado como
                  QualifiedVisit. O Dashboard mostra o
                  estado. O Mapa explica o caminho.
                </p>

                <Link
                  href="#como-funciona"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#2e6b48]"
                  data-ohrly-cta="map_continue_how_it_works"
                  data-ohrly-event="map_explore"
                >
                  Ver como começar
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="rounded-[18px] border border-[#e5e7eb] bg-white p-4 shadow-[0_1px_2px_rgba(16,24,40,.03),0_12px_40px_rgba(16,24,40,.06)] sm:p-5">
                <div className="inline-flex rounded-xl border border-[#e6e8ec] bg-[#f1f3f5] p-1 text-xs font-semibold">
                  <span className="rounded-lg bg-white px-3 py-2 text-black shadow-sm">
                    Marcos
                  </span>
                  <span className="px-3 py-2 text-[#69717d]">
                    Combinações
                  </span>
                </div>

                <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  <div className="rounded-xl border border-[#e5e7eb] p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-[.08em] text-[#69717d]">
                      QualifiedVisit usada
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      page_view
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#d7e2ff] bg-[#f8faff] p-3.5">
                    <div className="text-[10px] font-bold uppercase tracking-[.08em] text-[#69717d]">
                      QualifiedVisit em teste
                    </div>
                    <div className="mt-1.5 text-sm font-bold">
                      Permaneceu pelo menos 5 segundos
                    </div>
                  </div>
                </div>

                <div className="mt-4 overflow-hidden rounded-xl border border-[#e5e7eb] text-xs">
                  <div className="grid grid-cols-[1.5fr_.65fr_.8fr] bg-[#f1f3f5] px-3 py-2.5 font-bold text-[#69717d]">
                    <span>Marco</span>
                    <span>Visitas</span>
                    <span>vs. média</span>
                  </div>

                  {[
                    ["Chegada", "52", "1,0×"],
                    ["≥ 3 segundos", "21", "0,8×"],
                    ["≥ 5 segundos", "10", "1,7×"],
                    ["≥ 10 segundos", "6", "2,8×"],
                    [
                      "Início de formulário",
                      "3",
                      "17×",
                    ],
                  ].map(([label, visits, lift]) => (
                    <div
                      key={label}
                      className="grid grid-cols-[1.5fr_.65fr_.8fr] border-t border-[#e5e7eb] px-3 py-3"
                    >
                      <strong>{label}</strong>
                      <span>{visits}</span>
                      <span>{lift}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="como-funciona"
            className="px-4 py-16 sm:px-6 sm:py-20 lg:py-24"
            data-ohrly-section="how_it_works"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-bold uppercase tracking-[.12em] text-[#69717d]">
                Como começar
              </div>

              <h2 className="mt-3 max-w-[800px] text-[34px] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[42px]">
                Três passos. Depois, continue trazendo
                visitas.
              </h2>

              <div className="mt-8 grid gap-3.5 md:grid-cols-3">
                <StepCard
                  number={1}
                  title="Instale o Ohrly"
                >
                  Adicione o snippet ao seu site para
                  começar a observar como as visitas se
                  comportam.
                </StepCard>

                <StepCard
                  number={2}
                  title="Defina o resultado"
                >
                  Escolha o evento que representa
                  avanço real: início de formulário,
                  cadastro, compra ou outro resultado.
                </StepCard>

                <StepCard
                  number={3}
                  title="Observe e teste"
                >
                  O Ohrly organiza os caminhos, encontra
                  candidatos e permite testar uma
                  definição de QualifiedVisit.
                </StepCard>
              </div>

              <div className="mt-8 flex">
                <Link
                  href={signupUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#16181c] bg-[#16181c] px-5 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-px"
                  data-ohrly-cta="how_it_works_start_free"
                  data-ohrly-event="signup_intent"
                >
                  Criar projeto grátis
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>

          <section
            className="px-4 py-12 sm:px-6 sm:py-16"
            data-ohrly-section="best_fit"
          >
            <div className="mx-auto grid max-w-[1180px] gap-10 rounded-[24px] bg-[#16181c] p-7 text-white sm:p-10 lg:grid-cols-2 lg:p-12">
              <div>
                <div className="text-xs font-bold uppercase tracking-[.12em] text-[#9ca3ad]">
                  Quando faz mais sentido
                </div>

                <h2 className="mt-3 text-[34px] font-bold leading-[1.05] tracking-[-0.045em] sm:text-[42px]">
                  Especialmente útil quando você ainda
                  está aprendendo o tráfego.
                </h2>

                <p className="mt-4 max-w-[640px] text-base leading-7 text-[#b7bdc6]">
                  O Ohrly não substitui o Meta Ads. Ele
                  ajuda a entender o que acontece com
                  as pessoas depois que elas chegam.
                </p>
              </div>

              <div className="grid gap-2.5">
                {[
                  <>
                    Você <strong>começou agora</strong>{" "}
                    a rodar tráfego pago.
                  </>,
                  <>
                    Ainda existem{" "}
                    <strong>poucas conversões</strong>{" "}
                    para tirar conclusões.
                  </>,
                  <>
                    Você não sabe se os cliques estão
                    virando{" "}
                    <strong>visitas boas</strong>.
                  </>,
                  <>
                    Quer aprender antes de{" "}
                    <strong>aumentar orçamento</strong>.
                  </>,
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 rounded-xl border border-[#2b2e33] bg-[#1b1d21] p-4 text-sm leading-6 text-[#e8eaed]"
                  >
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#203f2e] text-[#8dd0a7]">
                      <Check size={12} strokeWidth={3} />
                    </span>
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="px-4 py-20 text-center sm:px-6 sm:py-24 lg:py-28"
            data-ohrly-section="final_cta"
          >
            <div className="mx-auto max-w-[1180px]">
              <div className="text-xs font-bold uppercase tracking-[.12em] text-[#69717d]">
                Comece agora
              </div>

              <h2 className="mx-auto mt-3 max-w-[820px] text-[36px] font-bold leading-[1.05] tracking-[-0.05em] sm:text-[48px]">
                Comece com as visitas que você já está
                trazendo.
              </h2>

              <p className="mx-auto mt-4 max-w-[690px] text-base leading-7 text-[#69717d] sm:text-[17px]">
                Instale o Ohrly, continue rodando sua
                campanha e descubra quais
                comportamentos vale acompanhar.
              </p>

              <div className="mt-7 flex justify-center">
                <Link
                  href={signupUrl}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#16181c] bg-[#16181c] px-5 py-3.5 text-[15px] font-bold text-white transition hover:-translate-y-px"
                  data-ohrly-cta="final_start_free"
                  data-ohrly-event="signup_intent"
                >
                  Criar projeto grátis
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </section>
        </main>

        <footer
          className="border-t border-[#e5e7eb] px-4 py-8 text-xs text-[#69717d] sm:px-6"
          data-ohrly-section="footer"
        >
          <div className="mx-auto flex max-w-[1180px] flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2.5 text-base font-bold tracking-[-0.03em] text-[#16181c]">
              <span className="relative flex size-6 items-center justify-center rounded-full border-2 border-[#2e6b48]">
                <span className="absolute right-[3px] top-[3px] size-1.5 rounded-full bg-[#2e6b48]" />
              </span>
              Ohrly
            </div>

            <div className="flex items-center gap-2">
              <Eye size={14} />
              Entenda o que acontece depois do clique.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
