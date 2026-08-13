import { NextResponse } from "next/server";
import { insertAnalyticsEvent } from "@/lib/analytics/server";

export const runtime = "nodejs";

function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value)
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.consent?.analytics) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    if (!body.eventName || !body.visitorId || !body.sessionId || !body.pagePath) {
      return NextResponse.json({ ok: false, error: "missing_event_fields" }, { status: 400 });
    }

    if (!isUuid(body.visitorId) || !isUuid(body.sessionId)) {
      return NextResponse.json({ ok: false, error: "invalid_tracking_id" }, { status: 400 });
    }

    const eventName = String(body.eventName).trim().slice(0, 64);
    if (!/^[a-z0-9_]{1,64}$/.test(eventName)) {
      return NextResponse.json({ ok: false, error: "invalid_event_name" }, { status: 400 });
    }

    const { error } = await insertAnalyticsEvent({
      eventName,
      visitorId: body.visitorId,
      sessionId: body.sessionId,
      pagePath: body.pagePath,
      landingVariant: body.landingVariant || null,
      attribution: body.attribution || {},
      properties: {
        ...(body.properties || {}),
        client_event_id: body.clientEventId || null,
        device_type: body.deviceType || null,
        fbclid: body.attribution?.fbclid || null,
        meta_campaign_id: body.attribution?.meta_campaign_id || null,
        meta_adset_id: body.attribution?.meta_adset_id || null,
        meta_ad_id: body.attribution?.meta_ad_id || null,
      },
    });

    if (error) {
      console.error("analytics_events insert failed", error);
      return NextResponse.json({ ok: false, error: "event_persist_failed" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("analytics route error", error);
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
}
