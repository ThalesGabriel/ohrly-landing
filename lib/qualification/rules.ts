import {
  QUALIFICATION_SIGNALS,
  type QualificationDecision,
  type QualificationRule,
  type QualificationScope,
  type QualificationSignal,
} from "./types";
import type { ClientTrackingContext } from "@/lib/tracking/types";

const SIGNAL_SET = new Set<string>(QUALIFICATION_SIGNALS);

export function isQualificationSignal(value: string): value is QualificationSignal {
  return SIGNAL_SET.has(value);
}

export function evaluateQualificationRule(
  rule: QualificationRule,
  observed: ReadonlySet<string>,
): QualificationDecision {
  const all = (rule.all || []).filter(isQualificationSignal);
  const any = (rule.any || []).filter(isQualificationSignal);
  const none = (rule.none || []).filter(isQualificationSignal);

  const requiredUniverse = [...new Set([...all, ...any])];
  const matchedSignals = requiredUniverse.filter((signal) => observed.has(signal));
  const missingSignals = all.filter((signal) => !observed.has(signal));

  const allSatisfied = missingSignals.length === 0;
  const anySatisfied = any.length === 0 || any.some((signal) => observed.has(signal));
  const noneSatisfied = none.every((signal) => !observed.has(signal));

  const minMatches = Math.max(0, rule.minMatches || 0);
  const matchCount = requiredUniverse.filter((signal) => observed.has(signal)).length;
  const minSatisfied = minMatches === 0 || matchCount >= minMatches;

  const denominator = Math.max(1, requiredUniverse.length);
  const score = Math.min(1, matchCount / denominator);

  return {
    qualified: allSatisfied && anySatisfied && noneSatisfied && minSatisfied,
    score,
    matchedSignals,
    missingSignals,
  };
}

export function matchesQualificationScope(
  scope: QualificationScope,
  context: ClientTrackingContext,
) {
  const attribution = context.attribution;

  if (scope.utm_source && attribution.utm_source !== scope.utm_source) {
    return false;
  }

  if (scope.utm_campaign && attribution.utm_campaign !== scope.utm_campaign) {
    return false;
  }

  if (
    scope.utm_campaign_prefix &&
    !attribution.utm_campaign?.startsWith(scope.utm_campaign_prefix)
  ) {
    return false;
  }

  if (scope.landing_variant && context.landingVariant !== scope.landing_variant) {
    return false;
  }

  if (scope.page_path && context.pagePath !== scope.page_path) {
    return false;
  }

  return true;
}
