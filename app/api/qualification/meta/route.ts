import { NextResponse } from "next/server";
import { getControllerConfig } from "@/lib/qualification/server";
import { sendMetaQualifiedVisit } from "@/lib/meta/capi";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ClientTrackingContext } from "@/lib/tracking/types";

export const runtime = "nodejs";

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
}

type Body = { eventId?: string; tracking?: Partial<ClientTrackingContext> };

export async function POST(request: Request) {
  try {
    const config = await getControllerConfig();
    if (config.mode === "shadow" || !config.send_qualified_visit_to_meta) {
      return NextResponse.json(
        { ok: false, error: "qualified_visit_emission_disabled" },
        { status: 409 },
      );
    }

    const body = (await request.json()) as Body;
    const eventId = clean(body.eventId, 64);
    const tracking = body.tracking || {};
    if (!isUuid(eventId) || !tracking.consent?.marketing) {
      return NextResponse.json(
        { ok: false, error: "marketing_consent_required" },
        { status: 400 },
      );
    }

    const supabase = getSupabaseAdmin();
    const { data: qv, error } = await supabase
      .from("qualified_visits")
      .select("id,visitor_id,policy_version,event_name,score,target_event,landing_variant,meta_event_id,meta_capi_delivered")
      .eq("meta_event_id", eventId)
      .maybeSingle();
    if (error) throw error;
    if (!qv) {
      return NextResponse.json({ ok: false, error: "qualified_visit_not_found" }, { status: 404 });
    }
    if (qv.meta_capi_delivered) {
      return NextResponse.json({ ok: true, delivered: true, alreadyDelivered: true, eventId });
    }

    const analyticsConsent = Boolean(tracking.consent?.analytics);
    const result = await sendMetaQualifiedVisit({
      eventId,
      visitorId: analyticsConsent ? tracking.visitorId || qv.visitor_id : null,
      pageUrl: clean(tracking.pageUrl, 1200) || request.headers.get("referer") || "",
      ipAddress: getIp(request),
      userAgent: request.headers.get("user-agent"),
      fbp: tracking.fbp || null,
      fbc: tracking.fbc || null,
      eventName: qv.event_name,
      policyVersion: qv.policy_version,
      score: Number(qv.score || 0),
      targetEvent: qv.target_event,
      landingVariant: qv.landing_variant,
    });

    await supabase
      .from("qualified_visits")
      .update({
        meta_capi_delivered: result.ok,
        meta_capi_delivered_at: result.ok ? new Date().toISOString() : null,
        meta_capi_status: "status" in result ? result.status : null,
        meta_capi_response: "body" in result ? result.body : result,
      })
      .eq("id", qv.id);

    return NextResponse.json({ ok: true, delivered: result.ok, eventId });
  } catch (error) {
    console.error("qualification meta route error", error);
    return NextResponse.json({ ok: false, error: "qualification_meta_failed" }, { status: 500 });
  }
}
