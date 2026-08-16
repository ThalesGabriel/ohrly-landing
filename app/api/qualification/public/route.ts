import { NextResponse } from "next/server";
import { getActiveEpoch, getControllerConfig } from "@/lib/qualification/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [config, epoch] = await Promise.all([
      getControllerConfig(),
      getActiveEpoch(),
    ]);

    if (!config.public_evidence_enabled || !epoch) {
      return NextResponse.json(
        { ok: true, visible: false },
        { headers: { "Cache-Control": "no-store, max-age=0" } },
      );
    }

    const supabase = getSupabaseAdmin();
    const [{ data: evaluation, error: evaluationError }, { data: recommendation, error: recommendationError }] =
      await Promise.all([
        supabase
          .from("qualification_evaluations")
          .select("evaluated_at,state,reason,metrics,decision")
          .eq("epoch_id", epoch.id)
          .order("evaluated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("qualification_recommendations")
          .select("status,expected_lift,expected_supply_rate,expected_weekly_meta_supply,recommended_at")
          .eq("epoch_id", epoch.id)
          .order("recommended_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

    if (evaluationError) throw evaluationError;
    if (recommendationError) throw recommendationError;

    const metrics = (evaluation?.metrics || {}) as Record<string, unknown>;
    const matureSessions = Number(
      metrics.confirmation_sessions || metrics.matureSessions || 0,
    );
    const maturePositives = Number(
      metrics.confirmation_positives || metrics.maturePositives || 0,
    );

    // Stronger public gate than the controller's internal evaluation gate.
    const enoughEvidence = matureSessions >= 300 && maturePositives >= 10;

    return NextResponse.json(
      {
        ok: true,
        visible: enoughEvidence,
        epoch: enoughEvidence
          ? {
              version: epoch.version,
              state: evaluation?.state || epoch.state,
              startedAt: epoch.confirmation_started_at,
            }
          : null,
        evidence: enoughEvidence
          ? {
              evaluatedAt: evaluation?.evaluated_at || null,
              matureSessions,
              maturePositives,
              recommendationStatus: recommendation?.status || null,
              expectedLift: Number(recommendation?.expected_lift || 0),
              expectedSupplyRate: Number(recommendation?.expected_supply_rate || 0),
              expectedWeeklyMetaSupply: Number(
                recommendation?.expected_weekly_meta_supply || 0,
              ),
            }
          : null,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("qualification public state error", error);
    return NextResponse.json({ ok: false, visible: false }, { status: 500 });
  }
}
