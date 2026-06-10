import type { Metadata } from "next";
import type { ReactNode } from "react";

const formspreeEndpoint = "https://formspree.io/f/mkoygpnk";

export const metadata: Metadata = {
  title: "Ohrly para E-commerce | Snapshot gratuito da jornada de compra",
  description:
    "Envie o link da sua loja e receba um Snapshot gratuito com maturidade da jornada, janelas de conversão e próximos testes recomendados.",
  alternates: {
    canonical: "/ecommerce",
  },
  openGraph: {
    title: "Ohrly para E-commerce",
    description:
      "Descubra onde sua loja pode estar perdendo conversão antes de investir mais em tráfego.",
    url: "/ecommerce",
    type: "website",
    images: [
      {
        url: "/images/og-ohrly-ecommerce.png",
        width: 1200,
        height: 630,
        alt: "Ohrly para E-commerce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ohrly para E-commerce",
    description:
      "Snapshot gratuito da jornada da sua loja com benchmarks e próximos testes recomendados.",
    images: ["/images/og-ohrly-ecommerce.png"],
  },
};

type IconName =
  | "logo"
  | "store"
  | "cart"
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
  | "target"
  | "truck"
  | "message"
  | "spark"
  | "clock"
  | "wallet"
  | "package"
  | "users";

type FeatureCard = {
  icon: IconName;
  title: string;
  text: string;
  tone: "indigo" | "red" | "teal" | "violet" | "orange";
};

type ComparisonRow = {
  common: string;
  ohrly: string;
};

type Step = {
  icon: IconName;
  title: string;
  text: string;
};

type Audience = {
  icon: IconName;
  title: string;
  text: string;
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
  cart: (
    <>
      <path d="M6 6h15l-1.5 8.5a2 2 0 0 1-2 1.5H9a2 2 0 0 1-2-1.7L5.2 3H2" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
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
  truck: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
  message: (
    <>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.5-4A8 8 0 1 1 21 12Z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </>
  ),
  spark: (
    <>
      <path d="M12 2 14 8l6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
      <path d="M19 15v4" />
      <path d="M17 17h4" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  wallet: (
    <>
      <path d="M4 7h15a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h13" />
      <path d="M16 13h5" />
    </>
  ),
  package: (
    <>
      <path d="m21 8-9-5-9 5 9 5 9-5Z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13v8" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
};

const toneClasses: Record<FeatureCard["tone"], string> = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  red: "bg-rose-50 text-rose-600 border-rose-100",
  teal: "bg-teal-50 text-teal-600 border-teal-100",
  violet: "bg-violet-50 text-violet-600 border-violet-100",
  orange: "bg-orange-50 text-orange-600 border-orange-100",
};

const features: FeatureCard[] = [
  {
    icon: "stage",
    title: "Nota de maturidade",
    text: "Entenda em que estágio a jornada digital da sua loja parece estar.",
    tone: "indigo",
  },
  {
    icon: "warning",
    title: "Janelas de conversão",
    text: "Veja onde a compra pode estar ficando difícil antes do pedido acontecer.",
    tone: "red",
  },
  {
    icon: "bar",
    title: "Benchmark aplicado",
    text: "Compare os sinais observados com referências de e-commerce e do segmento.",
    tone: "teal",
  },
  {
    icon: "target",
    title: "Próximo teste",
    text: "Receba uma ação simples para testar por 7 a 14 dias e medir resultado.",
    tone: "violet",
  },
];

const comparisonRows: ComparisonRow[] = [
  {
    common: "Lista problemas de UX, SEO ou velocidade.",
    ohrly: "Mostra qual decisão da jornada merece atenção primeiro.",
  },
  {
    common: "Diz para melhorar checkout ou instalar popup.",
    ohrly: "Pergunta se aquele produto deveria ir para checkout direto ou compra assistida.",
  },
  {
    common: "Olha a página como checklist.",
    ohrly: "Olha a compra como comportamento: dúvida, frete, confiança, abandono e ticket.",
  },
  {
    common: "Entrega um score genérico.",
    ohrly: "Entrega maturidade da jornada, janelas, benchmarks e testes mensuráveis.",
  },
];

const steps: Step[] = [
  {
    icon: "link",
    title: "Você envia o link",
    text: "Mande a loja, segmento e o principal objetivo: vender mais, entender abandono ou melhorar ticket.",
  },
  {
    icon: "search",
    title: "Analisamos a jornada",
    text: "Observamos a compra como cliente, procurando sinais de fricção e decisões pesadas.",
  },
  {
    icon: "bar",
    title: "Aplicamos benchmarks",
    text: "Relacionamos o que foi visto com referências de conversão, frete, abandono e compra assistida.",
  },
  {
    icon: "document",
    title: "Você recebe o Snapshot",
    text: "Um relatório com nota de maturidade, janelas, impacto esperado e próximos testes.",
  },
];

const audiences: Audience[] = [
  {
    icon: "store",
    title: "Lojas virtuais em operação",
    text: "Para quem já vende online, mas não sabe se o problema é tráfego, checkout, produto, frete ou confiança.",
  },
  {
    icon: "cart",
    title: "Lojas com visitas e poucas compras",
    text: "Para negócios que recebem interesse, mas sentem que a venda trava antes do pedido.",
  },
  {
    icon: "message",
    title: "Vendas por WhatsApp ou Instagram",
    text: "Para operações em que o site, WhatsApp, Instagram e atendimento se misturam na decisão de compra.",
  },
  {
    icon: "users",
    title: "Gestores e consultores",
    text: "Para quem precisa explicar ao lojista onde agir antes de pedir mais tráfego ou desconto.",
  },
];

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
            Em até 24h
          </span>
        </div>

        <div className="space-y-3">
          <SnapshotRow icon="store" label="Loja analisada" value="Loja de exemplo" />
          <SnapshotRow icon="tag" label="Segmento" value="Moda infantil" />

          <div className="rounded-2xl border border-slate-100 bg-white p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-600">
                <Icon name="stage" className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-wide text-slate-500">Maturidade aparente</p>
                  <span className="rounded-full bg-teal-100 px-3 py-1 text-xs font-black text-teal-700">2,5 de 5</span>
                </div>
                <div className="mt-3 flex gap-1.5">
                  <span className="h-2 flex-1 rounded-full bg-teal-500" />
                  <span className="h-2 flex-1 rounded-full bg-teal-500" />
                  <span className="h-2 flex-1 rounded-full bg-teal-300" />
                  <span className="h-2 flex-1 rounded-full bg-slate-200" />
                  <span className="h-2 flex-1 rounded-full bg-slate-200" />
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
                  Loja transacional com potencial de evoluir para compra assistida.
                </p>
              </div>
            </div>
          </div>

          <SnapshotInsight
            icon="message"
            tone="rose"
            label="Janela 1"
            title="Compra assistida em produtos de alta incerteza"
            text="Vestidos, fantasias e itens de ocasião podem pedir ajuda com tamanho, prazo e combinação."
          />
          <SnapshotInsight
            icon="truck"
            tone="orange"
            label="Janela 2"
            title="Frete pesado em compra unitária"
            text="Produto de R$100 com frete de R$30 coloca o frete em 30% do valor do item."
          />
          <SnapshotInsight
            icon="target"
            tone="teal"
            label="Próximo teste"
            title="WhatsApp contextual + resposta para frete pesado"
            text="Transformar dúvida em conversa e tentar diluir o frete com segunda peça ou look completo."
          />
        </div>
      </div>
    </div>
  );
}

function SnapshotRow({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <div className="flex gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-1 text-sm font-black text-slate-950">{value}</p>
        </div>
      </div>
    </div>
  );
}

function SnapshotInsight({ icon, tone, label, title, text }: {
  icon: IconName;
  tone: "rose" | "orange" | "teal";
  label: string;
  title: string;
  text: string;
}) {
  const colors = {
    rose: "border-rose-100 bg-rose-50/70 text-rose-700",
    orange: "border-orange-100 bg-orange-50/70 text-orange-700",
    teal: "border-teal-100 bg-teal-50/70 text-teal-700",
  }[tone];

  return (
    <div className={`rounded-2xl border p-4 ${colors}`}>
      <div className="flex gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80">
          <Icon name={icon} className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-black uppercase tracking-wide opacity-80">{label}</p>
          <p className="mt-1 text-sm font-black text-slate-950">{title}</p>
          <p className="mt-1 text-sm leading-6 text-slate-700">{text}</p>
        </div>
      </div>
    </div>
  );
}

function FeatureCardView({ icon, title, text, tone }: FeatureCard) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/5">
      <span className={`flex h-14 w-14 items-center justify-center rounded-2xl border ${toneClasses[tone]}`}>
        <Icon name={icon} />
      </span>
      <h3 className="mt-5 text-lg font-black">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}

function WindowCard({
  icon,
  label,
  title,
  observation,
  benchmark,
  correction,
  impact,
  tone,
}: {
  icon: IconName;
  label: string;
  title: string;
  observation: string;
  benchmark: string;
  correction: string;
  impact: { conservative: string; moderate: string; strong: string };
  tone: "indigo" | "orange";
}) {
  const accent = tone === "indigo" ? "text-indigo-700 bg-indigo-50 border-indigo-100" : "text-orange-700 bg-orange-50 border-orange-100";

  return (
    <div className={`rounded-[2rem] border p-6 shadow-sm ${tone === "indigo" ? "border-indigo-100 bg-white" : "border-orange-100 bg-white"}`}>
      <div className="flex items-start gap-4">
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${accent}`}>
          <Icon name={icon} className="h-7 w-7" />
        </span>
        <div>
          <p className={`text-xs font-black uppercase tracking-wide ${tone === "indigo" ? "text-indigo-600" : "text-orange-600"}`}>{label}</p>
          <h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-slate-950">{title}</h3>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <InfoBlock label="O que observamos" text={observation} />
        <InfoBlock label="Benchmark aplicado" text={benchmark} />
        <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
          <p className="text-xs font-black uppercase tracking-wide text-slate-500">Potencial de conversão</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <ImpactPill label="Conservador" value={impact.conservative} tone="green" />
            <ImpactPill label="Moderado" value={impact.moderate} tone="orange" />
            <ImpactPill label="Forte" value={impact.strong} tone="purple" />
          </div>
        </div>
        <InfoBlock label="Sugestão de correção" text={correction} />
      </div>
    </div>
  );
}

function InfoBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4">
      <p className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
    </div>
  );
}

function ImpactPill({ label, value, tone }: { label: string; value: string; tone: "green" | "orange" | "purple" }) {
  const classes = {
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
    orange: "bg-orange-50 text-orange-700 border-orange-100",
    purple: "bg-indigo-50 text-indigo-700 border-indigo-100",
  }[tone];

  return (
    <div className={`rounded-2xl border p-3 text-center ${classes}`}>
      <p className="text-[11px] font-black uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-xl font-black">{value}</p>
    </div>
  );
}

function Field({ label, name, placeholder, type = "text", required = false }: { label: string; name: string; placeholder: string; type?: string; required?: boolean }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input
        required={required}
        type={type}
        name={name}
        className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4"
        placeholder={placeholder}
      />
    </label>
  );
}

export default function OhrlyEcommerceLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FBFCFF] text-slate-950">
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Ohrly">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white">
              <Icon name="logo" className="h-6 w-6" />
            </span>
            <span className="text-2xl font-black tracking-tight">ohrly</span>
          </a>
          <div className="hidden items-center gap-8 text-sm font-semibold text-slate-700 md:flex">
            <a href="#snapshot" className="hover:text-indigo-600">O Snapshot</a>
            <a href="#janelas" className="hover:text-indigo-600">Janelas</a>
            <a href="#como-funciona" className="hover:text-indigo-600">Como funciona</a>
            <a href="#para-quem" className="hover:text-indigo-600">Para quem</a>
          </div>
          <a href="#contato" className="rounded-2xl bg-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700">
            Receber meu Snapshot
          </a>
        </nav>
      </header>

      <Section id="top" className="relative grid items-center gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-indigo-100 blur-3xl" />
        <div className="absolute -right-40 top-36 h-80 w-80 rounded-full bg-teal-100 blur-3xl" />

        <div className="relative">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-black uppercase tracking-wide text-indigo-700">
            Ohrly para e-commerce
          </span>
          <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
            Sua loja recebe visitas, mas <span className="text-indigo-600">vende menos do que poderia?</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Envie o link do seu e-commerce e receba um Snapshot gratuito com a maturidade da jornada, as janelas mais evidentes de conversão, benchmarks do segmento e os próximos testes recomendados.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#contato">Receber meu Snapshot gratuito</Button>
            <Button href="#exemplo" variant="secondary">Ver exemplo de leitura</Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="inline-flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-indigo-600" /> Sem CSV nesta etapa</span>
            <span className="inline-flex items-center gap-2"><Icon name="clock" className="h-4 w-4 text-indigo-600" /> Análise em até 24h</span>
            <span className="inline-flex items-center gap-2"><Icon name="bar" className="h-4 w-4 text-indigo-600" /> Benchmarks aplicados</span>
            <span className="inline-flex items-center gap-2"><Icon name="target" className="h-4 w-4 text-indigo-600" /> Foco no próximo teste</span>
          </div>
        </div>

        <SnapshotCard />
      </Section>

      <Section id="snapshot" className="py-10">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">O que é o Ohrly Snapshot?</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              É uma leitura rápida da jornada visível da sua loja. Em vez de entregar uma lista genérica de problemas, o Snapshot mostra onde a compra pode estar ficando difícil para o cliente e quais decisões podem destravar conversão.
            </p>
            <p className="mt-5 rounded-2xl bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">
              Nesta etapa, não pedimos senha, integração ou planilhas. A análise detalhada com dados reais vem depois, se fizer sentido para a loja.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => <FeatureCardView key={feature.title} {...feature} />)}
          </div>
        </div>
      </Section>

      <Section id="janelas" className="py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-indigo-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-wide text-indigo-700">
            Janelas decisórias
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.03em] sm:text-4xl">Exemplo do que procuramos em uma loja virtual</h2>
          <p className="mt-4 text-slate-600">
            O Ohrly observa pontos em que o cliente demonstra intenção, mas a jornada pode criar dúvida, custo, atrito ou abandono.
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <WindowCard
            icon="message"
            label="Janela 1"
            title="Compra assistida em produtos de alta incerteza"
            observation="Produtos de ocasião, tamanho, compatibilidade, prova, prazo ou alto valor não deveriam ser tratados como compra fria comum."
            benchmark="Atendimento em tempo real e live chat aparecem em benchmarks como alavancas de conversão e ticket médio em compras assistidas."
            correction="Adicionar CTA de WhatsApp contextual em categorias de maior dúvida, com mensagens orientadas a tamanho, prazo, compatibilidade ou composição."
            impact={{ conservative: "+5%", moderate: "+10%", strong: "+20%" }}
            tone="indigo"
          />
          <WindowCard
            icon="truck"
            label="Janela 2"
            title="Frete pesado em compra unitária"
            observation="Quando o frete representa uma parcela alta do carrinho, o cliente passa a avaliar o custo total, não apenas o preço do produto."
            benchmark="Custos extras e frete alto aparecem entre os principais motivos de abandono de carrinho em e-commerce."
            correction="Criar respostas comerciais quando o frete pesar: segunda peça com desconto, look completo, cupom contextual ou atendimento via WhatsApp."
            impact={{ conservative: "+3%", moderate: "+7%", strong: "+10%" }}
            tone="orange"
          />
        </div>
      </Section>

      <Section className="grid gap-8 py-16 lg:grid-cols-[1fr_0.55fr]">
        <div>
          <h2 className="text-3xl font-black tracking-[-0.03em]">Não é uma auditoria genérica</h2>
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="grid border-b border-slate-100 bg-slate-50 p-4 text-sm font-black text-slate-600 sm:grid-cols-2">
              <span>Auditoria comum</span>
              <span className="hidden text-indigo-700 sm:block">Ohrly Snapshot</span>
            </div>
            {comparisonRows.map((row) => (
              <div key={row.common} className="grid gap-2 border-b border-slate-100 p-4 text-sm last:border-b-0 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
                <span className="text-slate-600">{row.common}</span>
                <span className="hidden text-indigo-300 sm:block">→</span>
                <span className="font-semibold text-slate-950">{row.ohrly}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-8 shadow-sm">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-indigo-600 shadow-sm">
            <Icon name="spark" className="h-8 w-8" />
          </span>
          <h3 className="mt-8 text-3xl font-black tracking-[-0.03em]">A pergunta central</h3>
          <p className="mt-4 text-xl font-black leading-8 text-indigo-700">
            A loja está pedindo a decisão certa para o cliente certo, no produto certo?
          </p>
        </div>
      </Section>

      <Section id="como-funciona" className="py-16">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-[-0.03em] sm:text-4xl">Como funciona</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">Você envia o link. O Ohrly transforma a jornada visível em uma leitura de maturidade, janelas e testes.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <span className="absolute -top-3 left-5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-black text-white">
                {index + 1}
              </span>
              <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Icon name={step.icon} />
              </span>
              <h3 className="mt-5 font-black">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="exemplo" className="grid gap-8 py-14 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-xl shadow-indigo-950/5 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black text-indigo-600">Exemplo de leitura</p>
              <h2 className="text-2xl font-black tracking-[-0.03em]">Moda infantil com compra de ocasião</h2>
            </div>
            <span className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">Maturidade 2,5/5</span>
          </div>
          <div className="mt-6 space-y-5 text-sm leading-7 text-slate-700">
            <p>
              Uma loja de moda infantil pode ter produtos, categorias e checkout funcionando, mas ainda vender produtos sensíveis a tamanho, prazo e ocasião como se fossem compras simples.
            </p>
            <p>
              <strong className="text-slate-950">Leitura Ohrly:</strong> a compra pode estar ficando pesada demais para ser feita sozinha, especialmente quando dúvida de tamanho e frete alto aparecem juntos.
            </p>
            <p>
              <strong className="text-slate-950">Próximo teste:</strong> ativar WhatsApp contextual em vestidos, fantasias e roupas de ocasião, além de sugerir segunda peça ou look completo quando o frete representar parcela alta do carrinho.
            </p>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-indigo-50 p-4 text-indigo-900">
              <p className="text-xs font-black uppercase tracking-wide">Benchmark</p>
              <p className="mt-2 text-2xl font-black">+20%</p>
              <p className="mt-1 text-xs leading-5">potencial forte em compra assistida</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-orange-900">
              <p className="text-xs font-black uppercase tracking-wide">Frete observado</p>
              <p className="mt-2 text-2xl font-black">30%</p>
              <p className="mt-1 text-xs leading-5">do valor do produto no exemplo</p>
            </div>
            <div className="rounded-2xl bg-teal-50 p-4 text-teal-900">
              <p className="text-xs font-black uppercase tracking-wide">Ação</p>
              <p className="mt-2 text-2xl font-black">14d</p>
              <p className="mt-1 text-xs leading-5">teste simples e mensurável</p>
            </div>
          </div>
        </div>

        <div id="para-quem" className="rounded-[2rem] bg-slate-950 p-6 text-white md:p-8">
          <p className="text-sm font-black text-indigo-300">Para quem é</p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.03em]">Lojas que precisam saber onde mexer primeiro</h2>
          <div className="mt-7 space-y-3">
            {audiences.map((audience) => (
              <div key={audience.title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-indigo-600">
                    <Icon name={audience.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-black">{audience.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-300">{audience.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section className="py-14">
        <div className="grid overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-700 to-violet-700 text-white shadow-2xl shadow-indigo-950/20 lg:grid-cols-[0.8fr_1fr]">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-black tracking-[-0.03em]">Depois do Snapshot, vem o ciclo de melhoria</h2>
            <p className="mt-4 leading-7 text-indigo-100">
              O Snapshot mostra onde a jornada parece travar. Com dados simples da loja, o próximo passo é acompanhar por 4 semanas se os ajustes estão melhorando conversão, ticket e abandono.
            </p>
          </div>
          <div className="border-t border-white/15 bg-white/10 p-8 md:p-10 lg:border-l lg:border-t-0">
            <h3 className="text-2xl font-black">Ciclo Ohrly - 4 semanas</h3>
            <p className="mt-4 leading-7 text-indigo-50">
              Leituras semanais para entender se as mudanças estão dando certo ou errado, usando pedidos, carrinhos, cliques no WhatsApp, ticket médio e categorias mais acessadas.
            </p>
          </div>
        </div>
      </Section>

      <Section id="contato" className="py-16">
        <div className="grid gap-8 rounded-[2rem] border border-indigo-100 bg-white p-6 shadow-2xl shadow-indigo-950/5 md:p-10 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">
              <Icon name="target" className="h-8 w-8" />
            </span>
            <h2 className="mt-6 text-4xl font-black tracking-[-0.04em]">Receba seu Snapshot gratuito</h2>
            <p className="mt-4 leading-8 text-slate-600">
              Envie o link da sua loja e receba uma leitura inicial com maturidade da jornada, janelas evidentes, benchmarks aplicados e próximos testes recomendados.
            </p>
            <p className="mt-6 rounded-2xl bg-indigo-50 p-4 text-sm leading-6 text-indigo-900">
              Não pedimos senha, integração ou planilhas nesta etapa. A análise é feita a partir da jornada visível da loja.
            </p>
          </div>

          <form action={formspreeEndpoint} method="POST" className="rounded-[1.5rem] bg-slate-50 p-5 md:p-6">
            <input type="hidden" name="_subject" value="Novo pedido de Snapshot Ohrly para E-commerce" />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field required label="Nome" name="name" placeholder="Seu nome" />
              <Field required label="Email ou WhatsApp" name="contact" placeholder="seu@email.com ou (81) 99999-9999" />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field required label="Link da loja" name="store_url" placeholder="https://sualoja.com.br" />
              <label className="text-sm font-bold text-slate-700">
                Segmento
                <select required name="segment" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4">
                  <option value="">Selecione</option>
                  <option>Moda / Acessórios</option>
                  <option>Beleza / Cosméticos</option>
                  <option>Motopeças / Autopeças</option>
                  <option>Casa / Decoração</option>
                  <option>Alimentos / Bebidas</option>
                  <option>Outro</option>
                </select>
              </label>
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-bold text-slate-700">
                A loja tem operação física?
                <select name="physical_operation" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4">
                  <option>Selecione</option>
                  <option>Sim</option>
                  <option>Não</option>
                  <option>Atendo por Instagram/WhatsApp</option>
                </select>
              </label>
              <label className="text-sm font-bold text-slate-700">
                Principal objetivo
                <select name="goal" className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4">
                  <option>Selecione</option>
                  <option>Tenho visitas, mas poucas compras</option>
                  <option>Não sei onde está o problema</option>
                  <option>Quero melhorar carrinho abandonado</option>
                  <option>Quero aumentar ticket médio</option>
                  <option>Quero vender melhor pelo WhatsApp</option>
                  <option>Quero comparar minha loja com o segmento</option>
                </select>
              </label>
            </div>
            <label className="mt-4 block text-sm font-bold text-slate-700">
              Contexto opcional
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none ring-indigo-200 transition focus:ring-4"
                placeholder="Conte em uma frase o que mais te incomoda hoje na loja."
              />
            </label>
            <button type="submit" className="mt-5 w-full rounded-2xl bg-indigo-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-indigo-500/25 transition hover:bg-indigo-700">
              Receber Snapshot gratuito →
            </button>
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">
              Ao enviar, você autoriza a Ohrly a analisar a jornada pública da loja e retornar uma leitura inicial por email ou WhatsApp.
            </p>
          </form>
        </div>
      </Section>
    </main>
  );
}
