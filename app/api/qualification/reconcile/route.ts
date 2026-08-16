import { NextResponse } from "next/server";
import { reconcileShadowEpoch } from "@/lib/qualification/engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const internalKey = process.env.QUALIFICATION_INTERNAL_API_KEY;
  const cronSecret = process.env.CRON_SECRET;
  const authorization = request.headers.get("authorization");
  const internalHeader = request.headers.get("x-ohrly-internal-key");

  if (internalKey && internalHeader === internalKey) return true;
  if (cronSecret && authorization === `Bearer ${cronSecret}`) return true;
  return false;
}

async function handle(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await reconcileShadowEpoch());
  } catch (error) {
    console.error("qualification reconcile error", error);
    return NextResponse.json(
      { ok: false, error: "reconcile_failed" },
      { status: 500 },
    );
  }
}

export const GET = handle;
export const POST = handle;
