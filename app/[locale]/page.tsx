import type { Metadata } from "next";
import type { ReactNode } from "react";
// import LocaleSwitcher from "@/components/i18n/LocaleSwitcher";

const formspreeEndpoint = "https://formspree.io/f/mkoygpnk";

type IconName =
  | "logo"
  | "store"
  | "tag"
  | "chart"
  | "warning"
  | "check"
  | "bar"
  | "stage"
  | "arrow"
  | "link"
  | "search"
  | "mail"
  | "shield"
  | "document"
  | "target";

type FeatureCard = {
  icon: IconName;
  title: string;
  text: string;
  tone: "indigo" | "red" | "teal" | "violet";
};

type ComparisonRow = {
  common: string;
  ohrly: string;
};

const iconPaths: Record<IconName, ReactNode> = {
  logo: (
    <>
      <path d="M12 3a9 9 0 1 0 9 9h-4.2a4.8 4.8 0 1 1-4.8-4.8V3Z" />
      <path d="M12 7.2a4.8 4.8 0 1 0 4.8 4.8H12V7.2Z" />
    </>
  ),
  store: (
    <>
      <path d="M4 10h16l-1.2-5.5H5.2L4 10Z" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
      <path d="M4 10c.6 1.2 2.4 1.2 3 0 .6 1.2 2.4 1.2 3 0 .6 1.2 2.4 1.2 3 0 .6 1.2 2.4 1.2 3 0 .6 1.2 2.4 1.2 3 0" />
    </>
  ),
  tag: (
    <>
      <path d="M20 13 11 22 2 13V4h9l9 9Z" />
      <path d="M7 8h.01" />
    </>
  ),
  chart: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="m7 15 4-4 3 3 5-7" />
    </>
  ),
  warning: (
    <>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 9v5" />
      <path d="M12 17h.01" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 5-5" />
    </>
  ),
  bar: (
    <>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <rect x="7" y="12" width="2.5" height="4" rx="1" />
      <rect x="12" y="9" width="2.5" height="7" rx="1" />
      <rect x="17" y="6" width="2.5" height="10" rx="1" />
    </>
  ),
  stage: (
    <>
      <path d="M4 12a8 8 0 1 0 8-8v8h8" />
      <path d="M12 4v8h8" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  link: (
    <>
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-5" />
    </>
  ),
  document: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8" />
      <path d="M8 17h5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
};

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
      {children}
    </section>
  );
}

function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "secondary" }) {
  const styles =
    variant === "primary"
      ? "bg-[#5B3FF4] text-white shadow-lg shadow-indigo-500/25 hover:bg-[#4F35DF]"
      : "border border-indigo-200 bg-white text-[#312E81] hover:border-indigo-300 hover:bg-indigo-50";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-black transition ${styles}`}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

function SnapshotCard() {
  return (
    <div className="relative rounded-[2rem] border border-indigo-100 bg-white/95 p-5 shadow-2xl shadow-indigo-950/10 backdrop-blur md:p-6">
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="relative">
        <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <Icon name="logo" />
            </span>
            <div>
              <p className="text-sm font-black text-slate-950">Ohrly Snapshot</p>
              <p className="text-xs font-semibold text-slate-500">Leitura gratuita da jornada</p>
            </div>
          </div>
          <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-black text-teal-700">
            Análise em até 24h
          </span>
        </div>

        <div className="space-y-3">
          <SnapshotRow icon="store" label="Loja analisada" value="Moto Center Nordeste" />
          <SnapshotRow icon="tag" label="Segmento" value="Motopeças e acessórios" />

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Icon name="chart" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">Estágio aparente</p>
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-700">2 de 5</span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <span className="h-2 flex-1 rounded-full bg-teal-500" />
                  <span className="h-2 flex-1 rounded-full bg-teal-500" />
                  <span className="h-2 flex-1 rounded-full bg-slate-200" />
                  <span className="h-2 flex-1 rounded-full bg-slate-200" />
                  <span className="h-2 flex-1 rounded-full bg-slate-200" />
                </div>
              </div>
            </div>
          </div>

          <SnapshotRow
            icon="warning"
            label="Gargalo visível"
            value="Produtos de alto atrito tratados como compra direta"
            tone="red"
          />
          <SnapshotRow
            icon="check"
            label="Próximo passo"
            value="Criar jornada assistida para capacetes"
            tone="teal"
          />

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <Icon name="bar" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-slate-500">Dados que confirmariam</p>
                <ul className="mt-2 space-y-1 text-sm font-semibold leading-6 text-slate-700">
                  <li>• carrinhos por categoria</li>
                  <li>• pedidos não concluídos</li>
                  <li>• cliques no WhatsApp</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SnapshotRow({ icon, label, value, tone = "indigo" }: { icon: IconName; label: string; value: string; tone?: "indigo" | "red" | "teal" }) {
  const toneClasses = {
    indigo: "bg-indigo-50 text-indigo-600",
    red: "bg-red-50 text-red-600",
    teal: "bg-teal-50 text-teal-600",
  } satisfies Record<typeof tone, string>;

  const valueClasses = {
    indigo: "text-slate-950",
    red: "text-red-600",
    teal: "text-teal-700",
  } satisfies Record<typeof tone, string>;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="flex items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
          <p className={`mt-1 text-sm font-black leading-5 ${valueClasses[tone]}`}>{value}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, text, tone }: FeatureCard) {
  const toneClasses = {
    indigo: "bg-indigo-50 text-indigo-600",
    red: "bg-red-50 text-red-600",
    teal: "bg-teal-50 text-teal-600",
    violet: "bg-violet-50 text-violet-600",
  } satisfies Record<FeatureCard["tone"], string>;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/5">
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${toneClasses[tone]}`}>
        <Icon name={icon} />
      </span>
      <h3 className="mt-5 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

const features: FeatureCard[] = [
  {
    icon: "stage",
    title: "Estágio da loja",
    text: "Entenda em que ponto da jornada de compra sua loja aparenta estar no seu segmento.",
    tone: "indigo",
  },
  {
    icon: "warning",
    title: "Gargalo visível",
    text: "Identificamos o principal atrito que pode estar limitando suas vendas agora.",
    tone: "red",
  },
  {
    icon: "chart",
    title: "Comparação com o segmento",
    text: "Veja como sua loja se posiciona em relação ao padrão esperado para lojas parecidas.",
    tone: "teal",
  },
  {
    icon: "arrow",
    title: "Próximo passo",
    text: "Uma recomendação objetiva e priorizada para destravar o que mais importa.",
    tone: "violet",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    common: "Lista problemas",
    ohrly: "Mostra a decisão prioritária",
  },
  {
    common: "Melhore seu checkout",
    ohrly: "Talvez esse produto nem devesse ir para checkout direto",
  },
  {
    common: "Use popup",
    ohrly: "Antes, entenda se a intenção é boa, assistida ou ruim",
  },
  {
    common: "Score de UX",
    ohrly: "Estágio de maturidade da jornada",
  },
];

const segments = [
  "Selecione seu segmento",
  "Motopeças e acessórios",
  "Autopeças",
  "Moda e acessórios",
  "Cosméticos e beleza",
  "Casa e decoração",
  "Eletrônicos",
  "Outro",
];

const goals = [
  "Selecione seu principal objetivo",
  "Vender mais pelo site",
  "Gerar mais WhatsApp",
  "Comparar minha loja com o setor",
  "Entender por que as pessoas não compram",
  "Melhorar confiança",
  "Aumentar recompra",
  "Não sei onde mexer primeiro",
];

export const metadata: Metadata = {
  title: "Ohrly Snapshot | Descubra onde sua loja parece travar",
  description:
    "Envie o link do seu e-commerce e receba em até 24h um relatório gratuito com estágio da loja, gargalo visível e próximo passo recomendado.",
  alternates: {
    canonical: "/snapshot",
  },
  openGraph: {
    title: "Ohrly Snapshot | Relatório gratuito em até 24h",
    description:
      "Uma leitura rápida da maturidade da sua loja em relação ao seu segmento. Sem CSV, sem integração e sem senha.",
    url: "/snapshot",
    type: "website",
  },
};

export default function OhrlySnapshotLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FBFCFF] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Ohrly">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white">
              <Icon name="logo" className="h-6 w-6" />
            </span>
            <span className="text-2xl font-black tracking-tight">Ohrly</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <a href="#como-funciona" className="hover:text-indigo-600">Como funciona</a>
            <a href="#exemplo" className="hover:text-indigo-600">Exemplo</a>
            <a href="#para-quem" className="hover:text-indigo-600">Para quem</a>
          </div>

          <div className="flex items-center gap-3">
            {/* <LocaleSwitcher /> */}
            <a href="#contato" className="rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700">
              Receber meu Snapshot
            </a>
          </div>
        </nav>
      </header>

      <Section id="top" className="relative grid items-center gap-10 py-14 lg:grid-cols-[0.95fr_1.05fr] lg:py-20">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute right-0 top-12 hidden h-[500px] w-[500px] rounded-full bg-teal-100/50 blur-3xl lg:block" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-indigo-700">
            Relatório gratuito em até 24h
          </span>

          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
            Sua loja vende menos do que poderia?
          </h1>

          <p className="mt-5 max-w-2xl text-2xl font-black leading-tight text-indigo-600 sm:text-3xl">
            Em até 24h, mostramos onde a jornada parece travar.
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Envie o link do seu e-commerce e receba um relatório gratuito com o estágio da sua loja no seu segmento, o gargalo visível mais importante e o próximo passo recomendado.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contato">Receber meu relatório gratuito</Button>
            <Button href="#exemplo" variant="secondary">Ver exemplo de relatório</Button>
          </div>

          <div className="mt-8 grid gap-2 rounded-2xl border border-slate-200 bg-white/80 p-3 text-sm font-semibold text-slate-600 shadow-sm sm:inline-grid sm:grid-cols-4 sm:gap-4">
            <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-indigo-600" /> Sem CSV</span>
            <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-indigo-600" /> Sem integração</span>
            <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-indigo-600" /> Análise em até 24h</span>
            <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-indigo-600" /> Foco no próximo passo</span>
          </div>
        </div>

        <SnapshotCard />
      </Section>

      <Section className="py-12 text-center">
        <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-[-0.03em] sm:text-4xl">O que você recebe</h2>
        <p className="mx-auto mt-4 max-w-3xl text-slate-600">
          Uma leitura curta, prática e orientada por decisão. Não é uma lista infinita de melhorias: é um caminho para saber onde mexer primeiro.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </Section>

      <Section className="py-12">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Não é uma auditoria genérica</h2>
          <p className="mx-auto mt-4 max-w-3xl text-slate-600">
            Ferramentas de auditoria mostram problemas da página. O Ohrly mostra o que esses problemas revelam sobre a maturidade da sua jornada de venda.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-2 text-sm font-black">
            <div className="bg-slate-100 p-4 text-center text-slate-700">Auditoria comum</div>
            <div className="bg-indigo-600 p-4 text-center text-white">Ohrly Snapshot</div>
          </div>
          {comparisonRows.map((row) => (
            <div key={row.common} className="grid border-t border-slate-100 text-sm sm:grid-cols-[1fr_auto_1fr]">
              <div className="p-4 text-center font-semibold text-slate-600">{row.common}</div>
              <div className="hidden items-center justify-center px-2 text-slate-300 sm:flex">→</div>
              <div className="p-4 text-center font-black text-indigo-700">{row.ohrly}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="exemplo" className="py-14">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Exemplo de leitura</h2>
            <p className="mx-auto mt-4 max-w-3xl text-slate-600">
              O exemplo abaixo mostra como o Snapshot traduz uma jornada pública em uma hipótese prática de maturidade.
            </p>
          </div>

          <div className="mt-10 grid gap-6 rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/70 p-5 shadow-xl shadow-indigo-950/5 lg:grid-cols-[0.48fr_1fr] lg:p-8">
            <div className="rounded-[1.5rem] bg-slate-950 p-5 text-white shadow-lg shadow-slate-950/20">
              <div className="flex min-h-[190px] items-end rounded-2xl bg-[radial-gradient(circle_at_30%_20%,rgba(239,68,68,.45),transparent_28%),linear-gradient(135deg,#111827,#020617)] p-5">
                <div>
                  <p className="text-2xl font-black tracking-[-0.03em]">Moto Center Nordeste</p>
                  <p className="mt-1 text-sm font-semibold text-slate-300">Motopeças e acessórios</p>
                  <div className="mt-5 flex items-center gap-3">
                    <span className="text-xs font-black text-slate-300">Estágio aparente</span>
                    <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-700">2 de 5</span>
                  </div>
                  <div className="mt-3 flex max-w-[180px] gap-1.5">
                    <span className="h-2 flex-1 rounded-full bg-teal-400" />
                    <span className="h-2 flex-1 rounded-full bg-teal-400" />
                    <span className="h-2 flex-1 rounded-full bg-white/25" />
                    <span className="h-2 flex-1 rounded-full bg-white/25" />
                    <span className="h-2 flex-1 rounded-full bg-white/25" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center text-sm leading-7 text-slate-700">
              <p>
                Sua loja aparenta estar em estágio <strong className="text-slate-950">2/5</strong> no segmento de motopeças e acessórios. Notamos que produtos de maior avaliação emocional, como capacetes, estão sendo tratados como compra direta.
              </p>
              <p className="mt-4 font-black text-slate-950">
                Isso costuma gerar fricção e abandono da compra.
              </p>
              <p className="mt-4">
                <strong className="text-slate-950">Recomendação:</strong> criar uma jornada mais assistida para capacetes, com apoio via WhatsApp, retirada ou prova.
              </p>
              <p className="mt-4 text-sm font-black text-indigo-700">
                Dados que confirmariam: carrinhos por categoria, pedidos não concluídos e cliques no WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section id="como-funciona" className="py-14">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Como funciona</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Baixa fricção para você pedir. Clareza suficiente para decidir o próximo passo.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <StepCard number="1" icon="link" title="Você envia o link" text="Preencha o formulário com o link da sua loja e algumas informações rápidas." />
          <StepCard number="2" icon="search" title="Analisamos a jornada visível" text="Avaliamos a loja como um comprador e comparamos com o padrão esperado do seu segmento." />
          <StepCard number="3" icon="mail" title="Você recebe em até 24h" text="Entregamos o Snapshot com estágio, gargalo visível e próximo passo recomendado." />
        </div>
      </Section>

      <Section id="para-quem" className="py-14">
        <div className="grid gap-8 rounded-[2rem] bg-slate-950 p-6 text-white md:p-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-wide text-indigo-300">Para quem é</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.03em] sm:text-4xl">Lojas que precisam saber onde mexer primeiro</h2>
            <p className="mt-4 leading-8 text-slate-300">
              O Snapshot funciona melhor para e-commerces ativos, lojas físico-digitais e segmentos onde a compra depende de confiança, assistência, compatibilidade, recorrência ou prova.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["E-commerce ativo", "A loja já vende ou tenta vender online, mas não sabe onde a jornada trava."],
              ["Físico + digital", "A operação presencial existe, mas ainda pode virar vantagem na jornada online."],
              ["Produto de decisão difícil", "Tamanho, compatibilidade, confiança, prova, garantia ou atendimento pesam na compra."],
              ["Gestores e consultores", "Quem precisa priorizar rapidamente onde mexer antes de gastar mais tráfego."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="contato" className="py-16">
        <div className="grid gap-8 rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-6 shadow-2xl shadow-indigo-950/5 md:p-10 lg:grid-cols-[0.65fr_1fr]">
          <div>
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-lg shadow-indigo-500/25">
              <Icon name="document" className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.04em]">Receba seu Snapshot gratuito</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Rápido, prático e 100% gratuito. Sem compromisso.
            </p>
            <p className="mt-6 flex gap-3 rounded-2xl bg-white p-4 text-sm font-semibold leading-6 text-slate-600 shadow-sm">
              <Icon name="shield" className="h-5 w-5 shrink-0 text-indigo-600" />
              Não pedimos planilhas, integração ou senha nesta etapa.
            </p>
          </div>

          <form action={formspreeEndpoint} method="POST" className="rounded-[1.5rem] bg-white p-5 shadow-sm md:p-6">
            <input type="hidden" name="_subject" value="Novo pedido de Ohrly Snapshot" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput label="Nome" name="name" placeholder="Seu nome completo" required />
              <TextInput label="Email ou WhatsApp" name="contact" placeholder="seu@email.com ou (81) 99999-9999" required />
              <TextInput label="Link da loja" name="store_url" placeholder="https://seudominio.com.br" required />
              <SelectInput label="Segmento" name="segment" options={segments} />
              <SelectInput label="A loja tem operação física?" name="has_physical_store" options={["Selecione", "Sim", "Não", "Não sei dizer"]} />
              <SelectInput label="Principal objetivo" name="main_goal" options={goals} />
            </div>

            <label className="mt-4 block text-sm font-bold text-slate-700">
              Algo importante sobre sua loja? <span className="font-medium text-slate-400">(opcional)</span>
              <textarea
                name="context"
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4"
                placeholder="Ex.: recebemos visitas, mas poucas compras; vendemos mais pelo WhatsApp; temos loja física; queremos comparar com o segmento..."
              />
            </label>

            <button type="submit" className="mt-5 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700">
              Receber relatório gratuito em até 24h →
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Usamos as informações apenas para preparar sua leitura inicial. Sem spam.
            </p>
          </form>
        </div>
      </Section>

      <footer className="border-t border-slate-100 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center text-sm text-slate-500 sm:px-8 lg:flex-row lg:text-left">
          <a href="#top" className="flex items-center gap-3 text-slate-950" aria-label="Ohrly">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Icon name="logo" className="h-5 w-5" />
            </span>
            <span className="text-xl font-black">Ohrly</span>
          </a>
          <p>Ohrly começa olhando sua loja como comprador. Depois, quando fizer sentido, olha seus dados como operação.</p>
          <div className="flex gap-5 font-semibold text-slate-600">
            {/* <a href="/privacidade" className="hover:text-indigo-600">Privacidade</a> */}
            {/* <a href="/termos" className="hover:text-indigo-600">Termos</a> */}
          </div>
        </div>
      </footer>
    </main>
  );
}

function StepCard({ number, icon, title, text }: { number: string; icon: IconName; title: string; text: string }) {
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <span className="absolute -top-3 left-6 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
        {number}
      </span>
      <span className="mt-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
        <Icon name={icon} className="h-8 w-8" />
      </span>
      <h3 className="mt-6 text-lg font-black text-slate-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function TextInput({ label, name, placeholder, required = false }: { label: string; name: string; placeholder: string; required?: boolean }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input
        required={required}
        name={name}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4"
        placeholder={placeholder}
      />
    </label>
  );
}

function SelectInput({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <select
        name={name}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4"
        defaultValue={options[0]}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
