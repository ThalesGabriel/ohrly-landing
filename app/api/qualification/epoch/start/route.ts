import { NextResponse } from "next/server";
import { startShadowEpoch } from "@/lib/qualification/engine";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function authorized(request: Request) {
  const internalKey = process.env.QUALIFICATION_INTERNAL_API_KEY;
  return Boolean(
    internalKey && request.headers.get("x-ohrly-internal-key") === internalKey,
  );
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    return NextResponse.json(await startShadowEpoch());
  } catch (error) {
    console.error("qualification epoch start error", error);
    return NextResponse.json(
      { ok: false, error: "epoch_start_failed" },
      { status: 500 },
    );
  }
}
