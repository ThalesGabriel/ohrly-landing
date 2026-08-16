import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

function authorized(request: Request) {
  const key = process.env.QUALIFICATION_INTERNAL_API_KEY;
  return Boolean(key && request.headers.get("x-ohrly-internal-key") === key);
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json().catch(() => ({}))) as { recommendationId?: string };
    if (!body.recommendationId) {
      return NextResponse.json({ ok: false, error: "recommendation_id_required" }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.rpc(
      "activate_verified_qualification_recommendation",
      { p_recommendation_id: body.recommendationId },
    );
    if (error) throw error;

    return NextResponse.json({ ok: true, pilot: data });
  } catch (error) {
    console.error("qualification pilot start error", error);
    return NextResponse.json({ ok: false, error: "pilot_start_failed" }, { status: 500 });
  }
}
