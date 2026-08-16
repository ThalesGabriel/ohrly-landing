import { NextResponse } from "next/server";
import { getActiveEpoch, getControllerConfig } from "@/lib/qualification/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const key = process.env.QUALIFICATION_INTERNAL_API_KEY;
  return Boolean(key && request.headers.get("x-ohrly-internal-key") === key);
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const [config, epoch] = await Promise.all([getControllerConfig(), getActiveEpoch()]);
    const supabase = getSupabaseAdmin();

    if (!epoch) {
      return NextResponse.json({ ok: true, config, epoch: null });
    }

    const [{ data: evaluation }, { data: recommendation }, { data: challengers }] =
      await Promise.all([
        supabase
          .from("qualification_evaluations")
          .select("*")
          .eq("epoch_id", epoch.id)
          .order("evaluated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("qualification_recommendations")
          .select("*")
          .eq("epoch_id", epoch.id)
          .order("recommended_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("qualification_epoch_candidates")
          .select("*,qualification_candidates(key,label,family)")
          .eq("epoch_id", epoch.id)
          .order("rank", { ascending: true }),
      ]);

    return NextResponse.json({
      ok: true,
      config,
      epoch,
      latestEvaluation: evaluation || null,
      recommendation: recommendation || null,
      challengers: challengers || [],
    });
  } catch (error) {
    console.error("qualification status error", error);
    return NextResponse.json({ ok: false, error: "status_failed" }, { status: 500 });
  }
}
