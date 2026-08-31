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

export type LeadModalSource = {
  ctaId: string;
  location: string;
  label: string;
  demoId: string;
  entrySourceCtaId?: string | null;
  entrySourceLocation?: string | null;
  selectedAccount?: string | null;
  selectedAction?: string | null;
};

type LeadModalContextValue = {
  openLeadModal: (source: LeadModalSource) => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<LeadModalSource | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const metaLeadFormOpenSentRef = useRef(false);

  function openLeadModal(nextSource: LeadModalSource) {
    setSource(nextSource);
    setIsOpen(true);

    // A partir deste fluxo, lead_form_open significa intenção comercial
    // APÓS a pessoa completar a demonstração do produto.
    void trackBehavior("lead_form_open", {
      formId: "attention_lead_form",
      journeyStage: "post_demo",
      demoId: nextSource.demoId,
      sourceCtaId: nextSource.ctaId,
      sourceLocation: nextSource.location,
      sourceLabel: nextSource.label,
      entrySourceCtaId: nextSource.entrySourceCtaId ?? null,
      entrySourceLocation: nextSource.entrySourceLocation ?? null,
      selectedAccount: nextSource.selectedAccount ?? null,
      selectedAction: nextSource.selectedAction ?? null,
    });

    const tracking = getClientTrackingContext();

    if (tracking.consent?.marketing && !metaLeadFormOpenSentRef.current) {
      metaLeadFormOpenSentRef.current = true;

      const clientEventId = crypto.randomUUID();

      trackMetaLeadFormOpen(clientEventId, {
        landing_variant: tracking.landingVariant ?? null,
        journey_stage: "post_demo",
        demo_id: nextSource.demoId,
        source_cta_id: nextSource.ctaId,
        source_location: nextSource.location,
        entry_source_cta_id: nextSource.entrySourceCtaId ?? null,
        entry_source_location: nextSource.entrySourceLocation ?? null,
        selected_account: nextSource.selectedAccount ?? null,
        selected_action: nextSource.selectedAction ?? null,
      });

      void trackBehavior("meta_optimization_signal_sent", {
        signal: "LeadFormOpen",
        journeyStage: "post_demo",
        demoId: nextSource.demoId,
        sourceCtaId: nextSource.ctaId,
        sourceLocation: nextSource.location,
        entrySourceCtaId: nextSource.entrySourceCtaId ?? null,
        entrySourceLocation: nextSource.entrySourceLocation ?? null,
      });
    }
  }

  function closeLeadModal(reason: "button" | "backdrop" | "escape") {
    if (!isOpen) return;

    void trackBehavior("lead_form_close", {
      formId: "attention_lead_form",
      journeyStage: "post_demo",
      demoId: source?.demoId ?? null,
      sourceCtaId: source?.ctaId ?? null,
      sourceLocation: source?.location ?? null,
      entrySourceCtaId: source?.entrySourceCtaId ?? null,
      entrySourceLocation: source?.entrySourceLocation ?? null,
      selectedAccount: source?.selectedAccount ?? null,
      selectedAction: source?.selectedAction ?? null,
      reason,
    });

    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeLeadModal("escape");
    }

    window.addEventListener("keydown", handleKeyDown);

    // Mantemos o autofocus por acessibilidade/UX. O behavior-tracker
    // agora cria form_start somente em input/change, não em focus.
    const frame = window.requestAnimationFrame(() => {
      const firstField = dialogRef.current?.querySelector<HTMLElement>(
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
    <LeadModalContext.Provider value={{ openLeadModal }}>
      {children}

      {isOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-[#091126]/55 backdrop-blur-[3px] sm:items-center sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLeadModal("backdrop");
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
                  Teste na sua operação
                </div>

                <h2
                  id="lead-modal-title"
                  className="mt-2 text-[27px] font-black leading-[1.08] tracking-[-0.045em] text-[#101b35]"
                >
                  Veja o que o Ohrly encontraria nas suas contas.
                </h2>

                <p className="mt-2 max-w-[410px] text-sm leading-6 text-[#748097]">
                  Agora que você viu a proposta, precisamos apenas de algumas informações para entender se existe um bom caso para testar com dados reais da sua operação.
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
                Sem migrar seu stack. Primeiro avaliamos se a leitura acrescenta algo ao seu processo atual.
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </LeadModalContext.Provider>
  );
}

type LeadFormIntentTriggerProps = LeadModalSource & {
  className?: string;
  onBeforeOpen?: () => void;
  children: ReactNode;
};

/**
 * Este trigger é propositalmente específico: ele representa a intenção de
 * avançar para o formulário DEPOIS da demo. CTAs da landing devem abrir a demo,
 * nunca este componente diretamente.
 */
export function LeadFormIntentTrigger({
  ctaId,
  location,
  label,
  demoId,
  entrySourceCtaId,
  entrySourceLocation,
  selectedAccount,
  selectedAction,
  className,
  onBeforeOpen,
  children,
}: LeadFormIntentTriggerProps) {
  const context = useContext(LeadModalContext);

  if (!context) {
    throw new Error(
      "LeadFormIntentTrigger must be used inside LeadModalProvider",
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onBeforeOpen?.();
        context.openLeadModal({
          ctaId,
          location,
          label,
          demoId,
          entrySourceCtaId,
          entrySourceLocation,
          selectedAccount,
          selectedAction,
        });
      }}
      data-analytics-cta={ctaId}
      data-analytics-location={location}
      data-analytics-label={label}
      className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl border border-[#1457ff] bg-[#1457ff] px-4 text-sm font-black text-white shadow-[0_10px_24px_rgba(20,87,255,.18)] transition hover:-translate-y-px hover:bg-[#0f49dc]"
    >
      {children}
    </button>
  );
}
