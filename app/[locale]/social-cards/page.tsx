"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import {
  ArrowDown,
  ArrowRight,
  Download,
  Eye,
  HelpCircle,
  MessageCircle,
  ShoppingCart,
  WalletCards,
} from "lucide-react";

type CardVariant = "statement" | "journey" | "question" | "list" | "brand";

type SocialCard = {
  id: string;
  variant: CardVariant;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  items?: string[];
  footer?: string;
};

const cards: SocialCard[] = [
  {
    id: "receita-sem-relacionamento",
    variant: "question",
    eyebrow: "Pergunta para lojistas",
    title: "Quantas vendas não viram relacionamento com cliente?",
    subtitle:
      "Nem toda venda vira cliente conhecido, recompra ou histórico útil para continuar a conversa.",
    footer: "Ohrly • Diagnóstico gratuito para lojas",
  },
  {
    id: "venda-que-some",
    variant: "statement",
    eyebrow: "Venda que entra no caixa",
    title: "Tem venda que acontece e depois desaparece.",
    subtitle:
      "O pedido entrou, o faturamento apareceu, mas depois você não sabe se aquela pessoa voltou, compraria de novo ou precisava de outro produto.",
    footer: "Nem toda receita vira continuidade.",
  },
  {
    id: "loja-vende-sem-memoria",
    variant: "list",
    eyebrow: "Cliente invisível",
    title: 'E quando não lembramos dos clientes.',
    items: [
      "Sem contato confiável",
      "Sem histórico útil",
      "Sem recompra visível",
      "Sem clareza de continuidade",
    ],
    footer: "Ohrly mostra onde a relação se perdeu.",
  },
  {
    id: "crescer-do-jeito-caro",
    variant: "statement",
    eyebrow: "Mais eficiência importa",
    title: "Às vezes gastar mais não é a resposta.",
    subtitle:
      "Mais tráfego, mais desconto, mais campanha. Mas parte do crescimento pode começar olhando para quem já comprou.",
    footer: "Antes de buscar mais gente, entenda sua base.",
  },
  {
    id: "janelas-de-decisao",
    variant: "list",
    eyebrow: "O que o Ohrly procura",
    title: "Relatórios simples podem revelar janelas importantes.",
    items: [
      "Cliente invisível",
      "Canal que vende mas não identifica",
      "Pedido que não confirma",
      "Compra que não vira recompra",
    ],
    footer: "Transforme dados em decisões melhores.",
  },
  {
    id: "nao-e-dashboard",
    variant: "statement",
    eyebrow: "Não é mais um dashboard",
    title: "A pergunta não é só se vendeu.",
    subtitle:
      "É onde olhar, por que isso importa, qual decisão testar e o que acompanhar depois.",
    footer: "Ohrly • janelas de decisão para lojistas",
  },
  {
    id: "ohrly-fechamento",
    variant: "brand",
    eyebrow: "",
    title: "Ohrly",
    subtitle: "Diagnóstico gratuito na bio.",
    footer: "",
  },
];

const variantStyles: Record<
  Exclude<CardVariant, "brand">,
  {
    gradient: string;
    iconBg: string;
    accent: string;
  }
> = {
  statement: {
    gradient: "from-slate-950 via-blue-950 to-blue-800",
    iconBg: "bg-white/10",
    accent: "text-blue-100",
  },
  question: {
    gradient: "from-blue-700 via-blue-800 to-slate-950",
    iconBg: "bg-white/10",
    accent: "text-blue-100",
  },
  journey: {
    gradient: "from-sky-600 via-blue-700 to-blue-950",
    iconBg: "bg-white/10",
    accent: "text-sky-100",
  },
  list: {
    gradient: "from-slate-900 via-slate-950 to-blue-900",
    iconBg: "bg-white/10",
    accent: "text-blue-100",
  },
};

function slugToFilename(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

async function downloadNodeAsPng(node: HTMLElement, filename: string) {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: "#ffffff",
  });

  const link = document.createElement("a");
  link.download = `${slugToFilename(filename)}.png`;
  link.href = dataUrl;
  link.click();
}

function CardIcon({ variant }: { variant: CardVariant }) {
  if (variant === "question") return <HelpCircle className="h-10 w-10" />;
  if (variant === "journey") return <ArrowRight className="h-10 w-10" />;
  if (variant === "list") return <Eye className="h-10 w-10" />;

  return <MessageCircle className="h-10 w-10" />;
}

function JourneyDiagram() {
  const steps = [
    { label: "Produto visto", icon: Eye },
    { label: "Carrinho", icon: ShoppingCart },
    { label: "Pagamento", icon: WalletCards },
    { label: "Compra", icon: ArrowDown },
  ];

  return (
    <div className="mt-10 grid gap-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isProblem = index === 2;

        return (
          <div key={step.label} className="flex items-center gap-4">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                isProblem
                  ? "bg-amber-300 text-slate-950"
                  : "bg-white/10 text-white"
              }`}
            >
              <Icon className="h-7 w-7" />
            </div>

            <div className="flex-1 rounded-2xl bg-white/10 px-5 py-4 text-xl font-semibold text-white">
              {step.label}
            </div>

            {isProblem && (
              <span className="rounded-full bg-amber-300 px-4 py-2 text-sm font-bold text-slate-950">
                perda?
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function SocialCardPreview({ card }: { card: SocialCard }) {
  if (card.variant === "brand") {
    return (
      <div className="relative flex h-[1350px] w-[1080px] overflow-hidden rounded-[56px] bg-slate-950 p-16 text-center text-white shadow-2xl">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-sky-300/10 blur-3xl" />

        <div className="relative z-10 flex h-full w-full flex-col items-center justify-between">
          <div />

          <div className="flex flex-col items-center">
            <h1 className="text-[104px] font-black tracking-[-0.08em]">
              {card.title}
            </h1>

            {card.subtitle && (
              <p className="mt-8 text-[30px] font-semibold text-white/55">
                {card.subtitle}
              </p>
            )}
          </div>

          <p className="text-2xl font-medium text-white/35">
            Para lojas
          </p>
        </div>
      </div>
    );
  }

  const style = variantStyles[card.variant];

  return (
    <div
      className={`relative flex h-[1350px] w-[1080px] overflow-hidden rounded-[56px] bg-gradient-to-br ${style.gradient} p-16 text-white shadow-2xl`}
    >
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-24 h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-3xl" />

      <div className="relative z-10 flex h-full w-full flex-col">
        <header className="flex items-center justify-between">
          <div className="text-4xl font-black tracking-tight">Ohrly</div>

          <div className="rounded-full bg-white/10 px-6 py-3 text-2xl font-semibold text-white/90">
            jornada de e-commerce
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center">
          {card.eyebrow && (
            <div
              className={`mb-8 inline-flex w-fit rounded-full bg-white/10 px-6 py-3 text-2xl font-bold ${style.accent}`}
            >
              {card.eyebrow}
            </div>
          )}

          <div
            className={`mb-10 flex h-24 w-24 items-center justify-center rounded-[28px] ${style.iconBg} text-white ring-1 ring-white/15`}
          >
            <CardIcon variant={card.variant} />
          </div>

          <h1 className="max-w-[900px] text-[76px] font-black leading-[0.98] tracking-[-0.06em]">
            {card.title}
          </h1>

          {card.subtitle && (
            <p className="mt-10 max-w-[860px] text-[38px] font-medium leading-tight text-white/82">
              {card.subtitle}
            </p>
          )}

          {card.variant === "journey" && <JourneyDiagram />}

          {card.items && card.items.length > 0 && (
            <div className="mt-12 grid gap-5">
              {card.items.map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-5 rounded-3xl bg-white/10 p-6 text-[32px] font-semibold leading-tight text-white/90 ring-1 ring-white/10"
                >
                  <span className="mt-2 flex h-5 w-5 shrink-0 rounded-full bg-blue-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          )}
        </main>

        <footer className="flex items-center justify-between border-t border-white/15 pt-8">
          <p className="max-w-[720px] text-2xl font-semibold text-white/75">
            {card.footer ?? "Ohrly • leitura gratuita para lojas virtuais"}
          </p>

          <div className="rounded-full bg-white px-5 py-3 text-xl font-black text-blue-900">
            link na bio
          </div>
        </footer>
      </div>
    </div>
  );
}

function ExportableCard({ card }: { card: SocialCard }) {
  const cardRef = useRef<HTMLDivElement | null>(null);

  async function handleDownload() {
    if (!cardRef.current) return;

    await downloadNodeAsPng(cardRef.current, card.id);
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="line-clamp-2 font-bold leading-snug text-slate-950">
            {card.title}
          </h2>

          <p className="mt-1 truncate text-sm text-slate-500">{card.id}.png</p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
        >
          <Download className="h-4 w-4" />
          Baixar
        </button>
      </div>

      <div className="relative h-[430px] overflow-hidden rounded-2xl bg-slate-100">
        <div className="absolute left-1/2 top-4 origin-top -translate-x-1/2 scale-[0.29]">
          <div ref={cardRef} data-social-card-export={card.id}>
            <SocialCardPreview card={card} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SocialCardsPage() {
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);

  async function handleDownloadAll() {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-social-card-export]")
    );

    if (nodes.length === 0) return;

    setIsDownloadingAll(true);

    try {
      for (const node of nodes) {
        const filename = node.dataset.socialCardExport ?? "ohrly-card";

        await downloadNodeAsPng(node, filename);

        await new Promise((resolve) => setTimeout(resolve, 350));
      }
    } finally {
      setIsDownloadingAll(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-950 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col justify-between gap-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">
              Ohrly Social Studio
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight">
              Cards exportáveis para Instagram e LinkedIn
            </h1>

            <p className="mt-3 max-w-3xl leading-7 text-slate-600">
              Edite os textos no array <strong>cards</strong>, visualize os posts e
              baixe cada arte em PNG. O formato padrão é 1080×1350, bom para feed.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-2xl bg-blue-50 px-5 py-4 text-sm font-semibold text-blue-800">
              1080 × 1350 px
            </div>

            <button
              type="button"
              onClick={handleDownloadAll}
              disabled={isDownloadingAll}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-4 text-sm font-semibold text-white shadow-sm shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Download className="h-4 w-4" />
              {isDownloadingAll ? "Baixando..." : "Baixar todos"}
            </button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <ExportableCard key={card.id} card={card} />
          ))}
        </section>
      </div>
    </main>
  );
}