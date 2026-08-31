"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";

import { LeadForm } from "@/components/lead-form";
import {
  getClientTrackingContext,
  trackBehavior,
} from "@/lib/tracking/client";
import { trackMetaLeadFormOpen } from "@/lib/tracking/meta-pixel";

type LeadModalSource = {
  ctaId: string;
  location: string;
  label: string;
};

type LeadModalContextValue = {
  openLeadModal: (source: LeadModalSource) => void;
};

const LeadModalContext =
  createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] =
    useState<LeadModalSource | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const metaLeadFormOpenSentRef = useRef(false);

  function openLeadModal(nextSource: LeadModalSource) {
    setSource(nextSource);
    setIsOpen(true);

    void trackBehavior("lead_form_open", {
      formId: "attention_lead_form",
      sourceCtaId: nextSource.ctaId,
      sourceLocation: nextSource.location,
      sourceLabel: nextSource.label,
    });

    const tracking = getClientTrackingContext();

    if (
      tracking.consent?.marketing &&
      !metaLeadFormOpenSentRef.current
    ) {
      metaLeadFormOpenSentRef.current = true;

      const clientEventId = crypto.randomUUID();

      trackMetaLeadFormOpen(clientEventId, {
        landing_variant: tracking.landingVariant ?? null,
        source_cta_id: nextSource.ctaId,
        source_location: nextSource.location,
      });

      void trackBehavior("meta_optimization_signal_sent", {
        signal: "LeadFormOpen",
        sourceCtaId: nextSource.ctaId,
        sourceLocation: nextSource.location,
      });
    }
  }

  function closeLeadModal(
    reason: "button" | "backdrop" | "escape",
  ) {
    if (!isOpen) return;

    void trackBehavior("lead_form_close", {
      formId: "attention_lead_form",
      sourceCtaId: source?.ctaId || null,
      sourceLocation: source?.location || null,
      reason,
    });

    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeLeadModal("escape");
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    const frame = window.requestAnimationFrame(() => {
      const firstField =
        dialogRef.current?.querySelector<HTMLElement>(
          'input:not([type="hidden"]), select, textarea',
        );

      firstField?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.cancelAnimationFrame(frame);
    };
  }, [isOpen]);

  return (
    <LeadModalContext.Provider
      value={{
        openLeadModal,
      }}
    >
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#091126]/55 backdrop-blur-[3px] sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeLeadModal("backdrop");
            }
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            className="relative max-h-[94dvh] w-full overflow-y-auto rounded-t-[28px] border border-[#dfe5f0] bg-white px-5 pb-7 pt-5 shadow-[0_30px_100px_rgba(8,22,60,.28)] sm:max-w-[520px] sm:rounded-[28px] sm:p-7"
          >
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-[10px] font-black uppercase tracking-[.13em] text-[#1457ff]">
                  Avaliação inicial
                </div>

                <h2
                  id="lead-modal-title"
                  className="mt-2 text-[27px] font-black leading-[1.08] tracking-[-0.045em] text-[#101b35]"
                >
                  Entenda se o Ohrly faz sentido para sua operação.
                </h2>

                <p className="mt-2 max-w-[410px] text-sm leading-6 text-[#748097]">
                  Algumas informações são suficientes para avaliarmos seu processo atual de risco e entender se existe um bom cenário para testar o Ohrly.
                </p>
              </div>

              <button
                type="button"
                aria-label="Fechar"
                onClick={() => closeLeadModal("button")}
                className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-[#e1e6ef] bg-[#f8faff] text-[#6f7b91] transition hover:bg-[#eef3ff] hover:text-[#101b35]"
              >
                <X size={18} />
              </button>
            </div>

            <LeadForm />

            <div className="mt-4 border-t border-[#edf0f5] pt-4">
              <p className="text-center text-[11px] leading-5 text-[#8995a8]">
                Sem migração de ferramenta. Sem compromisso de contratar antes de verificarmos se o cenário faz sentido.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </LeadModalContext.Provider>
  );
}

type LeadModalTriggerProps = {
  ctaId: string;
  location: string;
  label: string;
  className?: string;
  children: ReactNode;
};

export function LeadModalTrigger({
  ctaId,
  location,
  label,
  className,
  children,
}: LeadModalTriggerProps) {
  const context = useContext(LeadModalContext);

  if (!context) {
    throw new Error(
      "LeadModalTrigger must be used inside LeadModalProvider",
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() =>
        context.openLeadModal({
          ctaId,
          location,
          label,
        })
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