import type { ClientTrackingContext } from "@/lib/tracking/types";

export const QUALIFICATION_SIGNALS = [
  "lp_view",
  "lp_engaged_1s",
  "lp_engaged_3s",
  "lp_engaged_5s",
  "lp_engaged_10s",
  "scroll_25",
  "scroll_50",
  "scroll_75",
  "scroll_90",
  "cta_click",
  "demo_start",
  "demo_step_2",
  "demo_step_3",
  "demo_step_5",
  "form_view",
  "form_start",
  "form_submit",
] as const;

export type QualificationSignal = (typeof QUALIFICATION_SIGNALS)[number];

export type QualificationRule = {
  all?: QualificationSignal[];
  any?: QualificationSignal[];
  none?: QualificationSignal[];
  minMatches?: number;
};

export type QualificationScope = {
  utm_source?: string | null;
  utm_campaign?: string | null;
  utm_campaign_prefix?: string | null;
  landing_variant?: string | null;
  page_path?: string | null;
};

export type QualificationPolicy = {
  id: string;
  version: string;
  eventName: string;
  targetEvent: QualificationSignal;
  rules: QualificationRule;
  scope: QualificationScope;
  activatedAt: string;
};

export type QualificationObservation = {
  eventName: string;
  properties?: Record<string, unknown>;
  clientEventId: string;
  context: ClientTrackingContext;
};

export type QualificationDecision = {
  qualified: boolean;
  score: number;
  matchedSignals: QualificationSignal[];
  missingSignals: QualificationSignal[];
};

export type ControllerMode = "shadow" | "manual_pilot" | "auto";

export type EpochState =
  | "discovery"
  | "collecting_confirmation"
  | "maturating"
  | "evaluating"
  | "insufficient_evidence"
  | "signal_starvation"
  | "shadow_recommended"
  | "verifying"
  | "manual_pilot_eligible"
  | "manual_pilot"
  | "validated"
  | "rejected";
