"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ArrowRight, PlayCircle, X } from "lucide-react";

import { useCommercialDemo } from "@/components/commercial-demo-modal";
import { useLeadModal } from "@/components/lead-form-modal";
import { trackBehavior } from "@/lib/tracking/client";

type CommercialIntentSource = {
  ctaId: string;
  location: string;
  label: string;
};

type CommercialIntentContextValue = {
  openCommercialIntent: (source: CommercialIntentSource) => void;
};

const CommercialIntentContext =
  createContext<CommercialIntentContextValue | null>(null);

export function CommercialIntentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { openLeadModal } = useLeadModal();
  const { openDemo } = useCommercialDemo();

  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<CommercialIntentSource | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  function openCommercialIntent(nextSource: CommercialIntentSource) {
    setSource(nextSource);
    setIsOpen(true);

    void trackBehavior("commercial_intent_open", {
      sourceCtaId: nextSource.ctaId,
      sourceLocation: nextSource.location,
      sourceLabel: nextSource.label,
    });
  }

  function closeCommercialIntent(
    reason: "button" | "backdrop" | "escape",
  ) {
    if (!isOpen) return;

    void trackBehavior("commercial_intent_close", {
      sourceCtaId: source?.ctaId ?? null,
      sourceLocation: source?.location ?? null,
      sourceLabel: source?.label ?? null,
      reason,
    });

    setIsOpen(false);
  }

  function chooseDirectForm() {
    if (!source) return;

    void trackBehavior("commercial_intent_direct_form", {
      sourceCtaId: source.ctaId,
      sourceLocation: source.location,
      sourceLabel: source.label,
    });

    setIsOpen(false);

    openLeadModal({
      ctaId: "commercial_intent_direct_form",
      location: "commercial_intent_modal",
      label: "Avaliar minha carteira",
      journeyStage: "direct_intent",
      demoId: null,
      demoRunId: null,
      entrySourceCtaId: source.ctaId,
      entrySourceLocation: source.location,
      selectedAccount: null,
      selectedAction: null,
    });
  }

  function chooseDemo() {
    if (!source) return;

    void trackBehavior("commercial_intent_demo", {
      sourceCtaId: source.ctaId,
      sourceLocation: source.location,
      sourceLabel: source.label,
    });

    setIsOpen(false);
    openDemo(source);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeCommercialIntent("escape");
    }

    window.addEventListener("keydown", handleKeyDown);

    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  return (
    <CommercialIntentContext.Provider value={{ openCommercialIntent }}>
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-[#091126]/55 backdrop-blur-[3px] sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeCommercialIntent("backdrop");
            }
          }}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="commercial-intent-title"
            className="relative w-full rounded-t-[28px] border border-[#dfe5f0] bg-white p-5 shadow-[0_30px_100px_rgba(8,22,60,.28)] outline-none sm:max-w-[520px] sm:rounded-[28px] sm:p-7"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#1457ff]">
                  Próximo passo
                </div>

                <h2
                  id="commercial-intent-title"
                  className="mt-2 text-[28px] font-black leading-[1.06] tracking-[-0.045em] text-[#101b35]"
                >
                  Veja se isso faz sentido para sua operação.
                </h2>

                <p className="mt-2 max-w-[420px] text-sm leading-6 text-[#748097]">
                  Podemos começar entendendo como seu time acompanha contas em risco hoje.
                </p>
              </div>

              <button
                type="button"
                aria-label="Fechar"
                onClick={() => closeCommercialIntent("button")}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e1e6ef] bg-[#f8faff] text-[#6f7b91] transition hover:bg-[#eef3ff] hover:text-[#101b35]"
              >
                <X size={18} />
              </button>
            </div>

            <button
              type="button"
              onClick={chooseDirectForm}
              data-analytics-cta="commercial_intent_direct_form"
              data-analytics-location="commercial_intent_modal"
              data-analytics-label="Avaliar minha carteira"
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-5 text-sm font-black text-white shadow-[0_12px_26px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
            >
              Avaliar minha carteira
              <ArrowRight size={16} />
            </button>

            <p className="mt-2 text-center text-[11px] leading-5 text-[#8995a8]">
              Conte rapidamente como vocês trabalham hoje.
            </p>

            <div className="my-5 flex items-center gap-3" aria-hidden="true">
              <span className="h-px flex-1 bg-[#e7ebf2]" />
              <span className="text-[10px] font-black uppercase tracking-[.11em] text-[#a0a9b8]">
                ou
              </span>
              <span className="h-px flex-1 bg-[#e7ebf2]" />
            </div>

            <button
              type="button"
              onClick={chooseDemo}
              data-analytics-cta="commercial_intent_demo"
              data-analytics-location="commercial_intent_modal"
              data-analytics-label="Ver uma demo rápida primeiro"
              className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#dce3ef] bg-[#f8faff] px-5 text-sm font-black text-[#31405c] transition hover:border-[#c9d6ef] hover:bg-[#eef3ff] hover:text-[#101b35]"
            >
              <PlayCircle size={16} className="text-[#1457ff]" />
              Ver uma demo rápida primeiro
            </button>

            <p className="mt-2 text-center text-[11px] leading-5 text-[#8995a8]">
              Menos de 1 minuto. Depois você pode voltar para a avaliação.
            </p>
          </div>
        </div>
      ) : null}
    </CommercialIntentContext.Provider>
  );
}

type CommercialIntentTriggerProps = CommercialIntentSource & {
  className?: string;
  children: ReactNode;
};

export function CommercialIntentTrigger({
  ctaId,
  location,
  label,
  className,
  children,
}: CommercialIntentTriggerProps) {
  const context = useContext(CommercialIntentContext);

  if (!context) {
    throw new Error(
      "CommercialIntentTrigger must be used inside CommercialIntentProvider",
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() =>
        context.openCommercialIntent({ ctaId, location, label })
      }
      data-analytics-cta={ctaId}
      data-analytics-location={location}
      data-analytics-label={label}
      className={className}
    >
      {children}
    </button>
  );
}
