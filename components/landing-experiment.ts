export const LANDING_EXPERIMENT = "churn_problem_v1" as const;

export const LANDING_VARIANTS = {
  queue: {
    variant: "queue",
    hypothesis: "H2_queue_compression",
  },
  post_alert: {
    variant: "post_alert",
    hypothesis: "H1_post_alert_workflow",
  },
} as const;

export type LandingVariant = keyof typeof LANDING_VARIANTS;

export function resolveLandingVariant(value?: string | string[]): LandingVariant {
  const raw = Array.isArray(value) ? value[0] : value;
  return raw === "queue" ? "queue" : "post_alert";
}
