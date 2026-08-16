import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  benjaminiHochberg,
  enrichmentPValue,
  holmAdjustment,
  wilsonInterval,
} from "./statistics";
import {
  evaluateFeatureRow,
  fetchQualificationFeatureRows,
  getActiveEpoch,
  getControllerConfig,
  getEnabledQualificationCandidates,
  getEpochCandidates,
  targetReached,
  type CandidateRow,
  type ControllerConfigRow,
  type EpochCandidateRow,
  type EpochRow,
  type QualificationFeatureRow,
} from "./server";
import type { QualificationRule, QualificationScope } from "./types";

function rate(numerator: number, denominator: number) {
  return denominator > 0 ? numerator / denominator : 0;
}

function round(value: number, digits = 4) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function hoursBetween(a: Date, b: Date) {
  return Math.max(0, (a.getTime() - b.getTime()) / 3_600_000);
}

type RuleMetrics = {
  sessions: number;
  positives: number;
  targetRate: number;
  lift: number;
  supplyRate: number;
  marketingEligible: number;
  pValue: number;
  interval: { low: number; high: number };
};

function metricsForRule(
  rows: QualificationFeatureRow[],
  rule: QualificationRule,
  targetEvent: string,
): RuleMetrics {
  const landingRows = rows.filter((row) => row.lp_view);
  const baselinePositives = landingRows.filter((row) =>
    targetReached(row, targetEvent),
  ).length;
  const baselineRate = rate(baselinePositives, landingRows.length);

  const qualified = landingRows.filter(
    (row) => evaluateFeatureRow(row, rule).qualified,
  );
  const positives = qualified.filter((row) => targetReached(row, targetEvent)).length;
  const targetRate = rate(positives, qualified.length);
  const lift = baselineRate > 0 ? targetRate / baselineRate : 0;
  const marketingEligible = qualified.filter((row) => row.marketing_consent_seen).length;

  const qualifiedIds = new Set(qualified.map((row) => row.session_id));
  const complement = landingRows.filter((row) => !qualifiedIds.has(row.session_id));
  const complementPositives = complement.filter((row) =>
    targetReached(row, targetEvent),
  ).length;

  return {
    sessions: qualified.length,
    positives,
    targetRate,
    lift,
    supplyRate: rate(qualified.length, landingRows.length),
    marketingEligible,
    pValue: enrichmentPValue({
      candidatePositives: positives,
      candidateTotal: qualified.length,
      complementPositives,
      complementTotal: complement.length,
    }),
    interval: wilsonInterval(positives, qualified.length),
  };
}


function rowsEligibleForCandidate(rows: QualificationFeatureRow[], candidate: CandidateRow) {
  if (!candidate.eligible_from) return rows;
  const eligibleFrom = new Date(candidate.eligible_from);
  return rows.filter((row) => new Date(row.first_seen) >= eligibleFrom);
}

function projectedWeeklySupply(input: {
  rows: QualificationFeatureRow[];
  rule: QualificationRule;
  windowHours: number;
  notBefore: Date;
}) {
  const now = new Date();
  const windowStart = new Date(
    Math.max(input.notBefore.getTime(), now.getTime() - input.windowHours * 3_600_000),
  );
  const rows = input.rows.filter(
    (row) => new Date(row.first_seen) >= windowStart && row.lp_view,
  );
  const eligible = rows.filter(
    (row) =>
      row.marketing_consent_seen && evaluateFeatureRow(row, input.rule).qualified,
  ).length;
  const observedHours = Math.max(1, hoursBetween(now, windowStart));
  return {
    eligible,
    observedHours,
    projected: (eligible / observedHours) * 168,
  };
}

function candidateById(candidates: CandidateRow[], id: string | null) {
  return candidates.find((candidate) => candidate.id === id) || null;
}

export async function startShadowEpoch() {
  const supabase = getSupabaseAdmin();
  const config = await getControllerConfig();
  const existing = await getActiveEpoch();

  if (existing) {
    return { ok: true, created: false, epoch: existing } as const;
  }

  const now = new Date();
  const discoveryStart = new Date(
    now.getTime() - Number(config.discovery_lookback_days || 30) * 86_400_000,
  );

  const candidates = await getEnabledQualificationCandidates();
  const champion = candidates.find((item) => item.key === "engaged_10s") || candidates[0];
  if (!champion) throw new Error("no_qualification_candidates");

  const version = `shadow_${now.toISOString().replace(/[-:.TZ]/g, "").slice(0, 14)}`;
  const discoveryScope: QualificationScope = config.discovery_scope || {
    utm_source: "meta",
    page_path: "/",
  };
  const confirmationScope: QualificationScope = config.confirmation_scope || {
    utm_source: "meta",
    utm_campaign: "ohrly_intercom_engaged10_v1",
    page_path: "/",
  };

  const { data, error } = await supabase
    .from("qualification_epochs")
    .insert({
      version,
      state: "discovery",
      champion_candidate_id: champion.id,
      target_event: config.target_event || "form_start",
      discovery_scope: discoveryScope,
      scope: confirmationScope,
      discovery_started_at: discoveryStart.toISOString(),
      discovery_ended_at: now.toISOString(),
      confirmation_started_at: now.toISOString(),
    })
    .select("*")
    .single();
  if (error) throw error;

  await supabase
    .from("qualification_controller_config")
    .update({ shadow_started_at: now.toISOString(), updated_at: now.toISOString() })
    .eq("id", 1);

  const epoch = data as EpochRow;
  const discovery = await runDiscovery(epoch, config, candidates);
  return { ok: true, created: true, epoch, discovery } as const;
}

async function runDiscovery(
  epoch: EpochRow,
  config: ControllerConfigRow,
  candidates: CandidateRow[],
) {
  const supabase = getSupabaseAdmin();
  const rows = await fetchQualificationFeatureRows({
    since: epoch.discovery_started_at,
    before: epoch.discovery_ended_at,
    scope: epoch.discovery_scope || {},
  });
  const landingRows = rows.filter((row) => row.lp_view);
  const targetEvent = epoch.target_event;
  const baselinePositives = landingRows.filter((row) => targetReached(row, targetEvent)).length;
  const baselineRate = rate(baselinePositives, landingRows.length);

  const tested = candidates.map((candidate) => {
    const candidateRows = rowsEligibleForCandidate(rows, candidate);
    const metrics = metricsForRule(candidateRows, candidate.rules, targetEvent);
    return { candidate, metrics };
  });

  // BH is applied to the full pre-specified family with enough raw sample to test.
  const testable = tested.filter(
    ({ metrics }) => metrics.sessions >= Number(config.min_discovery_candidate_sessions || 30),
  );
  const qValues = benjaminiHochberg(
    testable.map(({ candidate, metrics }) => ({ id: candidate.id, pValue: metrics.pValue })),
  );

  const eligible = testable
    .map(({ candidate, metrics }) => ({
      candidate,
      metrics,
      qValue: qValues.get(candidate.id) ?? 1,
    }))
    .filter(
      ({ candidate, metrics, qValue }) =>
        candidate.id !== epoch.champion_candidate_id &&
        metrics.positives >= Number(config.min_discovery_target_positives || 10) &&
        metrics.supplyRate >= Number(config.min_candidate_supply_rate || 0.03) &&
        metrics.lift >= Number(config.min_lift || 1.5) &&
        qValue <= Number(config.discovery_fdr_alpha || 0.05),
    )
    .sort((a, b) => {
      if (a.qValue !== b.qValue) return a.qValue - b.qValue;
      if (b.metrics.lift !== a.metrics.lift) return b.metrics.lift - a.metrics.lift;
      return b.metrics.supplyRate - a.metrics.supplyRate;
    })
    .slice(0, Number(config.max_challengers || 5));

  if (eligible.length > 0) {
    const { error } = await supabase.from("qualification_epoch_candidates").insert(
      eligible.map((item, index) => ({
        epoch_id: epoch.id,
        candidate_id: item.candidate.id,
        rank: index + 1,
        discovery_sessions: item.metrics.sessions,
        discovery_positives: item.metrics.positives,
        discovery_rate: round(item.metrics.targetRate, 6),
        discovery_lift: round(item.metrics.lift, 4),
        discovery_p_value: item.metrics.pValue,
        discovery_q_value: item.qValue,
        discovery_supply_rate: round(item.metrics.supplyRate, 6),
        discovery_snapshot: {
          baseline_sessions: landingRows.length,
          baseline_positives: baselinePositives,
          baseline_rate: baselineRate,
          interval: item.metrics.interval,
        },
        confirmation_status: "pending",
      })),
    );
    if (error) throw error;
  }

  const state = eligible.length > 0 ? "collecting_confirmation" : "insufficient_evidence";
  const epochUpdatedAt = new Date().toISOString();
  const { error: epochError } = await supabase
    .from("qualification_epochs")
    .update({
      state,
      updated_at: epochUpdatedAt,
      ...(eligible.length > 0 ? {} : { closed_at: epochUpdatedAt }),
    })
    .eq("id", epoch.id);
  if (epochError) throw epochError;

  await supabase.from("qualification_evaluations").insert({
    epoch_id: epoch.id,
    state,
    reason: eligible.length > 0 ? "discovery_candidates_frozen" : "no_discovery_candidate_passed_fdr",
    metrics: {
      discovery_sessions: landingRows.length,
      discovery_positives: baselinePositives,
      baseline_rate: baselineRate,
      candidates_tested: tested.length,
      candidates_testable: testable.length,
      challengers_frozen: eligible.length,
    },
    decision: {
      action: "keep_production_untouched",
      challenger_ids: eligible.map((item) => item.candidate.id),
    },
  });

  return {
    state,
    discoverySessions: landingRows.length,
    discoveryPositives: baselinePositives,
    frozen: eligible.map((item) => ({
      key: item.candidate.key,
      lift: round(item.metrics.lift, 2),
      supplyRate: round(item.metrics.supplyRate, 4),
      qValue: item.qValue,
    })),
  };
}

async function runVerification(input: {
  epoch: EpochRow;
  config: ControllerConfigRow;
  candidates: CandidateRow[];
  recommendation: {
    id: string;
    candidate_id: string;
    verification_started_at: string;
  };
}) {
  const supabase = getSupabaseAdmin();
  const candidate = candidateById(input.candidates, input.recommendation.candidate_id);
  if (!candidate) throw new Error("recommended_candidate_missing");

  const maturityCutoff = new Date(
    Date.now() - Number(input.config.outcome_maturation_hours || 48) * 3_600_000,
  );
  const rows = await fetchQualificationFeatureRows({
    since: input.recommendation.verification_started_at,
    before: maturityCutoff.toISOString(),
    scope: input.epoch.scope || {},
  });
  const landingRows = rows.filter((row) => row.lp_view);
  const candidateRows = rowsEligibleForCandidate(rows, candidate);
  const metrics = metricsForRule(candidateRows, candidate.rules, input.epoch.target_event);

  if (
    landingRows.length < Number(input.config.min_verification_sessions || 200) ||
    metrics.positives < Number(input.config.min_verification_target_positives || 10)
  ) {
    await supabase
      .from("qualification_epochs")
      .update({ state: "verifying", updated_at: new Date().toISOString() })
      .eq("id", input.epoch.id);
    return {
      state: "verifying",
      reason: "verification_needs_more_mature_evidence",
      metrics,
    };
  }

  const supply = projectedWeeklySupply({
    rows: rowsEligibleForCandidate(
      await fetchQualificationFeatureRows({
        since: input.recommendation.verification_started_at,
        scope: input.epoch.scope || {},
      }),
      candidate,
    ),
    rule: candidate.rules,
    windowHours: Number(input.config.supply_window_hours || 72),
    notBefore: new Date(input.recommendation.verification_started_at),
  });

  const passed =
    metrics.pValue <= Number(input.config.confirmation_familywise_alpha || 0.05) &&
    metrics.lift >= Number(input.config.min_lift || 1.5) &&
    supply.projected >= Number(input.config.min_weekly_meta_supply || 30);

  const state = passed ? "manual_pilot_eligible" : "rejected";
  const now = new Date().toISOString();

  await supabase
    .from("qualification_recommendations")
    .update({
      status: passed ? "verified" : "rejected",
      verified_at: now,
      verification_sessions: metrics.sessions,
      verification_positives: metrics.positives,
      verification_rate: round(metrics.targetRate, 6),
      verification_lift: round(metrics.lift, 4),
      verification_p_value: metrics.pValue,
      verification_projected_weekly_meta_supply: round(supply.projected, 2),
      verification_snapshot: { baseline_sessions: landingRows.length, interval: metrics.interval },
    })
    .eq("id", input.recommendation.id);

  await supabase
    .from("qualification_epochs")
    .update({ state, updated_at: now, ...(passed ? {} : { closed_at: now }) })
    .eq("id", input.epoch.id);

  return {
    state,
    reason: passed ? "challenger_survived_independent_verification" : "challenger_failed_verification",
    candidate: candidate.key,
    metrics,
    projectedWeeklyMetaSupply: round(supply.projected, 1),
  };
}

export async function reconcileShadowEpoch() {
  const supabase = getSupabaseAdmin();
  const [config, epoch, candidates] = await Promise.all([
    getControllerConfig(),
    getActiveEpoch(),
    getEnabledQualificationCandidates(),
  ]);

  if (!config.enabled) return { ok: true, state: "disabled" } as const;
  if (!epoch) return { ok: false, state: "no_epoch", error: "shadow_epoch_not_started" } as const;
  if (config.mode !== "shadow") {
    return {
      ok: true,
      epoch: epoch.version,
      state: config.mode,
      reason: "shadow_reconciliation_frozen_outside_shadow_mode",
    } as const;
  }

  const { data: recommendation, error: recommendationError } = await supabase
    .from("qualification_recommendations")
    .select("id,candidate_id,status,verification_started_at")
    .eq("epoch_id", epoch.id)
    .in("status", ["shadow_recommended", "verifying"])
    .order("recommended_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (recommendationError) throw recommendationError;

  if (recommendation?.verification_started_at) {
    const verification = await runVerification({
      epoch,
      config,
      candidates,
      recommendation: recommendation as {
        id: string;
        candidate_id: string;
        verification_started_at: string;
      },
    });

    await supabase.from("qualification_evaluations").insert({
      epoch_id: epoch.id,
      state: verification.state,
      reason: verification.reason,
      metrics: verification,
      decision: { action: "keep_production_untouched" },
    });

    return { ok: true, epoch: epoch.version, ...verification } as const;
  }

  const frozen = await getEpochCandidates(epoch.id);
  if (frozen.length === 0) {
    return {
      ok: true,
      epoch: epoch.version,
      state: epoch.state,
      reason: "no_frozen_challengers",
    } as const;
  }

  const maturityCutoff = new Date(
    Date.now() - Number(config.outcome_maturation_hours || 48) * 3_600_000,
  );
  const confirmationRows = await fetchQualificationFeatureRows({
    since: epoch.confirmation_started_at,
    before: maturityCutoff.toISOString(),
    scope: epoch.scope || {},
  });
  const confirmationLanding = confirmationRows.filter((row) => row.lp_view);
  const targetEvent = epoch.target_event;
  const baselinePositives = confirmationLanding.filter((row) =>
    targetReached(row, targetEvent),
  ).length;
  const baselineRate = rate(baselinePositives, confirmationLanding.length);

  const champion = candidateById(candidates, epoch.champion_candidate_id);
  const championMetrics = champion
    ? metricsForRule(
        rowsEligibleForCandidate(confirmationRows, champion),
        champion.rules,
        targetEvent,
      )
    : null;

  if (
    confirmationLanding.length < Number(config.min_confirmation_sessions || 200) ||
    baselinePositives < Number(config.min_confirmation_target_positives || 10)
  ) {
    const state = confirmationLanding.length === 0 ? "maturating" : "collecting_confirmation";
    await supabase
      .from("qualification_epochs")
      .update({ state, updated_at: new Date().toISOString() })
      .eq("id", epoch.id);

    const result = {
      state,
      reason: "confirmation_needs_more_mature_evidence",
      matureSessions: confirmationLanding.length,
      maturePositives: baselinePositives,
    };
    await supabase.from("qualification_evaluations").insert({
      epoch_id: epoch.id,
      state,
      reason: result.reason,
      metrics: result,
      decision: { action: "keep_production_untouched" },
    });
    return { ok: true, epoch: epoch.version, ...result } as const;
  }

  const recentRows = await fetchQualificationFeatureRows({
    since: epoch.confirmation_started_at,
    scope: epoch.scope || {},
  });

  const raw = frozen.map((frozenCandidate) => {
    const candidate = candidateById(candidates, frozenCandidate.candidate_id);
    if (!candidate) throw new Error("frozen_candidate_missing");
    const candidateConfirmationRows = rowsEligibleForCandidate(
      confirmationRows,
      candidate,
    );
    const metrics = metricsForRule(candidateConfirmationRows, candidate.rules, targetEvent);
    const supply = projectedWeeklySupply({
      rows: rowsEligibleForCandidate(recentRows, candidate),
      rule: candidate.rules,
      windowHours: Number(config.supply_window_hours || 72),
      notBefore: new Date(epoch.confirmation_started_at),
    });
    return { frozenCandidate, candidate, metrics, supply };
  });

  const holm = holmAdjustment(
    raw.map((item) => ({ id: item.candidate.id, pValue: item.metrics.pValue })),
  );

  const minimumLift = Math.max(
    Number(config.min_lift || 1.5),
    (championMetrics?.lift || 0) * (1 + Number(config.promotion_margin || 0.15)),
  );

  const updated = raw.map((item) => {
    const adjusted = holm.get(item.candidate.id) ?? 1;
    const supplyStarved =
      item.supply.projected < Number(config.min_weekly_meta_supply || 30);
    const enoughPositives =
      item.metrics.positives >= Number(config.min_confirmation_target_positives || 10);
    const consistent = item.frozenCandidate.discovery_lift > 1 && item.metrics.lift > 1;
    const passed =
      enoughPositives &&
      consistent &&
      !supplyStarved &&
      item.metrics.lift >= minimumLift &&
      adjusted <= Number(config.confirmation_familywise_alpha || 0.05);

    return {
      ...item,
      adjusted,
      status: supplyStarved
        ? "signal_starvation"
        : passed
          ? "passed"
          : enoughPositives
            ? "failed"
            : "needs_more_positives",
      passed,
    };
  });

  for (const item of updated) {
    const { error } = await supabase
      .from("qualification_epoch_candidates")
      .update({
        confirmation_sessions: item.metrics.sessions,
        confirmation_positives: item.metrics.positives,
        confirmation_rate: round(item.metrics.targetRate, 6),
        confirmation_lift: round(item.metrics.lift, 4),
        confirmation_p_value: item.metrics.pValue,
        confirmation_adjusted_p_value: item.adjusted,
        confirmation_supply_rate: round(item.metrics.supplyRate, 6),
        confirmation_projected_weekly_meta_supply: round(item.supply.projected, 2),
        confirmation_status: item.status,
        confirmation_snapshot: {
          baseline_sessions: confirmationLanding.length,
          baseline_positives: baselinePositives,
          baseline_rate: baselineRate,
          interval: item.metrics.interval,
        },
      })
      .eq("id", item.frozenCandidate.id);
    if (error) throw error;
  }

  const winner = updated
    .filter((item) => item.passed)
    .sort((a, b) => {
      if (a.adjusted !== b.adjusted) return a.adjusted - b.adjusted;
      if (b.metrics.lift !== a.metrics.lift) return b.metrics.lift - a.metrics.lift;
      return b.supply.projected - a.supply.projected;
    })[0];

  let state = "insufficient_evidence";
  let reason = "no_challenger_passed_confirmation";
  let action = "keep_production_untouched";
  let recommendationId: string | null = null;

  if (winner) {
    const now = new Date().toISOString();
    const verificationStartedAt = config.verification_required ? now : null;
    const { data: inserted, error } = await supabase
      .from("qualification_recommendations")
      .insert({
        epoch_id: epoch.id,
        candidate_id: winner.candidate.id,
        status: config.verification_required ? "verifying" : "verified",
        recommended_at: now,
        verification_started_at: verificationStartedAt,
        expected_lift: round(winner.metrics.lift, 4),
        expected_supply_rate: round(winner.metrics.supplyRate, 6),
        expected_weekly_meta_supply: round(winner.supply.projected, 2),
        confirmation_snapshot: {
          candidate: winner.candidate.key,
          adjusted_p_value: winner.adjusted,
          champion_lift: championMetrics?.lift || null,
          minimum_lift_required: minimumLift,
          candidate_metrics: winner.metrics,
        },
        reason: "passed_discovery_fdr_and_confirmation_holm",
      })
      .select("id")
      .single();
    if (error) throw error;
    recommendationId = inserted.id as string;
    state = config.verification_required ? "verifying" : "manual_pilot_eligible";
    reason = config.verification_required
      ? "shadow_recommendation_waiting_independent_verification"
      : "challenger_passed_confirmation";
    action = "shadow_recommendation_created";

    await supabase
      .from("qualification_epochs")
      .update({
        state,
        recommendation_id: recommendationId,
        verification_started_at: verificationStartedAt,
        updated_at: now,
      })
      .eq("id", epoch.id);
  } else {
    const allStarved = updated.every((item) => item.status === "signal_starvation");
    if (allStarved) {
      state = "signal_starvation";
      reason = "all_confirmed_challengers_below_supply_floor";
    }
    await supabase
      .from("qualification_epochs")
      .update({ state, updated_at: new Date().toISOString() })
      .eq("id", epoch.id);
  }

  const metricsSnapshot = {
    confirmation_sessions: confirmationLanding.length,
    confirmation_positives: baselinePositives,
    baseline_rate: baselineRate,
    champion: champion
      ? {
          key: champion.key,
          sessions: championMetrics?.sessions,
          positives: championMetrics?.positives,
          lift: round(championMetrics?.lift || 0, 2),
        }
      : null,
    challengers: updated.map((item) => ({
      key: item.candidate.key,
      positives: item.metrics.positives,
      lift: round(item.metrics.lift, 2),
      adjusted_p_value: item.adjusted,
      projected_weekly_meta_supply: round(item.supply.projected, 1),
      status: item.status,
    })),
  };

  await supabase.from("qualification_evaluations").insert({
    epoch_id: epoch.id,
    state,
    reason,
    metrics: metricsSnapshot,
    decision: { action, recommendation_id: recommendationId },
  });

  return {
    ok: true,
    epoch: epoch.version,
    state,
    reason,
    action,
    recommendationId,
    metrics: metricsSnapshot,
  } as const;
}
