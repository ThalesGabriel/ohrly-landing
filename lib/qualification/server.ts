import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  evaluateQualificationRule,
  isQualificationSignal,
} from "./rules";
import type {
  ControllerMode,
  QualificationPolicy,
  QualificationRule,
  QualificationScope,
  QualificationSignal,
} from "./types";

export type QualificationFeatureRow = {
  session_id: string;
  visitor_id: string | null;
  first_seen: string;
  last_seen: string;
  landing_variant: string | null;
  entry_page_path: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  utm_placement: string | null;
  marketing_consent_seen: boolean;
  lp_view: boolean;
  lp_engaged_1s: boolean;
  lp_engaged_3s: boolean;
  lp_engaged_5s: boolean;
  lp_engaged_10s: boolean;
  scroll_25: boolean;
  scroll_50: boolean;
  scroll_75: boolean;
  scroll_90: boolean;
  cta_click: boolean;
  demo_start: boolean;
  demo_step_2: boolean;
  demo_step_3: boolean;
  demo_step_5: boolean;
  form_view: boolean;
  form_start: boolean;
  form_submit: boolean;
};

export type PolicyRow = {
  id: string;
  version: string;
  event_name: string;
  target_event: string;
  source_candidate_id: string | null;
  rules: QualificationRule;
  scope: QualificationScope;
  activated_at: string;
  optimization_started_at: string | null;
  status: string;
};

export type CandidateRow = {
  id: string;
  key: string;
  label: string;
  family: string;
  priority: number;
  eligible_from: string | null;
  rules: QualificationRule;
  is_enabled: boolean;
  fallback_allowed: boolean;
};

export type ControllerConfigRow = {
  id: number;
  enabled: boolean;
  mode: ControllerMode;
  auto_promote: boolean;
  send_qualified_visit_to_meta: boolean;
  public_evidence_enabled: boolean;
  target_event: string;
  shadow_started_at: string | null;
  discovery_scope: QualificationScope;
  confirmation_scope: QualificationScope;
  discovery_lookback_days: number;
  supply_window_hours: number;
  outcome_maturation_hours: number;
  max_challengers: number;
  min_discovery_candidate_sessions: number;
  min_discovery_target_positives: number;
  discovery_fdr_alpha: number;
  min_confirmation_sessions: number;
  min_confirmation_target_positives: number;
  confirmation_familywise_alpha: number;
  min_verification_sessions: number;
  min_verification_target_positives: number;
  min_lift: number;
  promotion_margin: number;
  min_candidate_supply_rate: number;
  min_weekly_meta_supply: number;
  target_weekly_meta_supply: number;
  starvation_grace_hours: number;
  starvation_min_sessions: number;
  starvation_min_events: number;
  verification_required: boolean;
};

export type EpochRow = {
  id: string;
  version: string;
  state: string;
  champion_candidate_id: string | null;
  target_event: string;
  discovery_scope: QualificationScope;
  scope: QualificationScope;
  discovery_started_at: string;
  discovery_ended_at: string;
  confirmation_started_at: string;
  recommendation_id: string | null;
  verification_started_at: string | null;
  closed_at: string | null;
};

export type EpochCandidateRow = {
  id: string;
  epoch_id: string;
  candidate_id: string;
  rank: number;
  discovery_sessions: number;
  discovery_positives: number;
  discovery_rate: number;
  discovery_lift: number;
  discovery_p_value: number;
  discovery_q_value: number;
  discovery_supply_rate: number;
  confirmation_sessions: number | null;
  confirmation_positives: number | null;
  confirmation_rate: number | null;
  confirmation_lift: number | null;
  confirmation_p_value: number | null;
  confirmation_adjusted_p_value: number | null;
  confirmation_supply_rate: number | null;
  confirmation_projected_weekly_meta_supply: number | null;
  confirmation_status: string;
};

export function serializePolicy(row: PolicyRow): QualificationPolicy {
  return {
    id: row.id,
    version: row.version,
    eventName: row.event_name,
    targetEvent: isQualificationSignal(row.target_event)
      ? row.target_event
      : "form_start",
    rules: row.rules || {},
    scope: row.scope || {},
    activatedAt: row.activated_at,
  };
}

export async function getControllerConfig() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("qualification_controller_config")
    .select("*")
    .eq("id", 1)
    .single();
  if (error) throw error;
  return data as ControllerConfigRow;
}

export async function getActiveQualificationPolicyRow() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("qualification_policies")
    .select("*")
    .eq("status", "active")
    .order("activated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as PolicyRow | null) || null;
}

export async function getActiveEpoch() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("qualification_epochs")
    .select("*")
    .is("closed_at", null)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as EpochRow | null) || null;
}

export async function getSessionFeatureRow(sessionId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("qualification_session_features")
    .select("*")
    .eq("session_id", sessionId)
    .maybeSingle();
  if (error) throw error;
  return (data as QualificationFeatureRow | null) || null;
}

export function signalsFromFeatureRow(row: QualificationFeatureRow) {
  const signals = new Set<string>();
  const keys: QualificationSignal[] = [
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
  ];

  for (const key of keys) {
    if (row[key]) signals.add(key);
  }

  return signals;
}

export function featureRowMatchesScope(
  row: QualificationFeatureRow,
  scope: QualificationScope,
) {
  if (scope.utm_source && row.utm_source !== scope.utm_source) return false;
  if (scope.utm_campaign && row.utm_campaign !== scope.utm_campaign) return false;
  if (
    scope.utm_campaign_prefix &&
    !row.utm_campaign?.startsWith(scope.utm_campaign_prefix)
  ) {
    return false;
  }
  if (scope.landing_variant && row.landing_variant !== scope.landing_variant) {
    return false;
  }
  if (scope.page_path && row.entry_page_path !== scope.page_path) return false;
  return true;
}

export function evaluateFeatureRow(
  row: QualificationFeatureRow,
  rule: QualificationRule,
) {
  return evaluateQualificationRule(rule, signalsFromFeatureRow(row));
}

export function targetReached(row: QualificationFeatureRow, targetEvent: string) {
  return Boolean((row as unknown as Record<string, unknown>)[targetEvent]);
}

export async function fetchQualificationFeatureRows(input: {
  since?: string;
  before?: string;
  scope?: QualificationScope;
}) {
  const supabase = getSupabaseAdmin();
  const pageSize = 1000;
  const rows: QualificationFeatureRow[] = [];

  for (let offset = 0; ; offset += pageSize) {
    let query = supabase
      .from("qualification_session_features")
      .select("*")
      .order("first_seen", { ascending: true })
      .range(offset, offset + pageSize - 1);

    if (input.since) query = query.gte("first_seen", input.since);
    if (input.before) query = query.lt("first_seen", input.before);

    const { data, error } = await query;
    if (error) throw error;

    const batch = (data || []) as QualificationFeatureRow[];
    rows.push(...batch);
    if (batch.length < pageSize) break;
  }

  return input.scope
    ? rows.filter((row) => featureRowMatchesScope(row, input.scope || {}))
    : rows;
}

export async function getEnabledQualificationCandidates() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("qualification_candidates")
    .select("id,key,label,family,priority,eligible_from,rules,is_enabled,fallback_allowed")
    .eq("is_enabled", true)
    .order("priority", { ascending: true });
  if (error) throw error;
  return (data || []) as CandidateRow[];
}

export async function getEpochCandidates(epochId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("qualification_epoch_candidates")
    .select("*")
    .eq("epoch_id", epochId)
    .order("rank", { ascending: true });
  if (error) throw error;
  return (data || []) as EpochCandidateRow[];
}
