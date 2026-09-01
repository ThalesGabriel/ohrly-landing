"use client";

import { createContext, ReactNode, useContext } from "react";

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

  function openCommercialIntent(source: CommercialIntentSource) {
    /*
     * Mantemos commercial_intent_open por compatibilidade com a série histórica
     * e deixamos explícito que o novo modo não possui mais modal de escolha.
     */
    void trackBehavior("commercial_intent_open", {
      sourceCtaId: source.ctaId,
      sourceLocation: source.location,
      sourceLabel: source.label,
      mode: "direct_form",
    });

    void trackBehavior("commercial_intent_direct_form", {
      sourceCtaId: source.ctaId,
      sourceLocation: source.location,
      sourceLabel: source.label,
      mode: "direct_form",
    });

    openLeadModal({
      ctaId: "commercial_intent_direct_form",
      location: "commercial_intent_direct",
      label: "Revisar minhas contas",
      journeyStage: "direct_intent",
      demoId: null,
      demoRunId: null,
      entrySourceCtaId: source.ctaId,
      entrySourceLocation: source.location,
      selectedAccount: null,
      selectedAction: null,
    });
  }

  return (
    <CommercialIntentContext.Provider value={{ openCommercialIntent }}>
      {children}
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
