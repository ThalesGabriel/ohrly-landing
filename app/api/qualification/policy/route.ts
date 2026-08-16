import { NextResponse } from "next/server";
import {
  getActiveQualificationPolicyRow,
  getControllerConfig,
  serializePolicy,
} from "@/lib/qualification/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [config, policy] = await Promise.all([
      getControllerConfig(),
      getActiveQualificationPolicyRow(),
    ]);

    const canEmit =
      config.enabled &&
      config.mode !== "shadow" &&
      config.send_qualified_visit_to_meta;

    return NextResponse.json(
      {
        ok: true,
        mode: config.mode,
        canEmit,
        policy: canEmit && policy ? serializePolicy(policy) : null,
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("qualification policy route error", error);
    return NextResponse.json(
      { ok: false, error: "policy_read_failed" },
      { status: 500 },
    );
  }
}
