import { NextResponse } from "next/server";
import { insertAnalyticsEvent } from "@/lib/analytics/server";
import {
  evaluateFeatureRow,
  featureRowMatchesScope,
  getActiveQualificationPolicyRow,
  getControllerConfig,
  getSessionFeatureRow,
} from "@/lib/qualification/server";
import { sendMetaQualifiedVisit } from "@/lib/meta/capi";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { ClientTrackingContext } from "@/lib/tracking/types";

export const runtime = "nodejs";

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
}

type Body = {
  policyId?: string;
  eventId?: string;
  tracking?: Partial<ClientTrackingContext>;
};

export async function POST(request: Request) {
  try {
    const [config, activePolicy] = await Promise.all([
      getControllerConfig(),
      getActiveQualificationPolicyRow(),
    ]);

    if (
      !config.enabled ||
      config.mode === "shadow" ||
      !config.send_qualified_visit_to_meta ||
      !activePolicy
    ) {
      return NextResponse.json(
        { ok: false, error: "qualified_visit_emission_disabled" },
        { status: 409 },
      );
    }

    const body = (await request.json()) as Body;
    const policyId = clean(body.policyId, 64);
    const eventId = clean(body.eventId, 64);
    const tracking = body.tracking || {};
    const sessionId = clean(tracking.sessionId, 64);
    const visitorId = clean(tracking.visitorId, 64);

    if (!isUuid(policyId) || !isUuid(eventId) || !isUuid(sessionId) || !isUuid(visitorId)) {
      return NextResponse.json(
        { ok: false, error: "invalid_qualification_payload" },
        { status: 400 },
      );
    }

    if (activePolicy.id !== policyId) {
      return NextResponse.json({ ok: false, error: "stale_policy" }, { status: 409 });
    }

    const featureRow = await getSessionFeatureRow(sessionId);
    if (!featureRow) {
      return NextResponse.json(
        { ok: false, error: "session_features_not_ready" },
        { status: 409 },
      );
    }

    if (!featureRowMatchesScope(featureRow, activePolicy.scope || {})) {
      return NextResponse.json({ ok: true, qualified: false, reason: "out_of_scope" });
    }

    const decision = evaluateFeatureRow(featureRow, activePolicy.rules || {});
    if (!decision.qualified) {
      return NextResponse.json({ ok: true, qualified: false, reason: "rule_not_satisfied" });
    }

    const supabase = getSupabaseAdmin();
    const marketingConsent = Boolean(tracking.consent?.marketing);
    const analyticsConsent = Boolean(tracking.consent?.analytics);
    const pageUrl = clean(tracking.pageUrl, 1200) || request.headers.get("referer") || "";
    const pagePath = clean(tracking.pagePath, 1200) || "/";
    const landingVariant = clean(tracking.landingVariant, 120) || null;

    const insertPayload = {
      session_id: sessionId,
      visitor_id: analyticsConsent ? visitorId : null,
      policy_id: activePolicy.id,
      policy_version: activePolicy.version,
      event_name: activePolicy.event_name,
      qualified_at: new Date().toISOString(),
      score: decision.score,
      matched_signals: decision.matchedSignals,
      target_event: activePolicy.target_event,
      landing_variant: landingVariant,
      page_path: pagePath,
      utm_source: featureRow.utm_source,
      utm_medium: featureRow.utm_medium,
      utm_campaign: featureRow.utm_campaign,
      utm_content: featureRow.utm_content,
      utm_term: featureRow.utm_term,
      utm_placement: featureRow.utm_placement,
      marketing_consent: marketingConsent,
      meta_event_id: eventId,
    };

    const { data: inserted, error: insertError } = await supabase
      .from("qualified_visits")
      .insert(insertPayload)
      .select("id,meta_event_id,policy_version,score")
      .single();

    if (insertError) {
      if (insertError.code === "23505") {
        const { data: existing, error: existingError } = await supabase
          .from("qualified_visits")
          .select("id,meta_event_id,policy_version,score")
          .eq("session_id", sessionId)
          .eq("policy_id", activePolicy.id)
          .maybeSingle();
        if (existingError) throw existingError;
        return NextResponse.json({
          ok: true,
          qualified: true,
          created: false,
          eventId: existing?.meta_event_id || eventId,
          eventName: activePolicy.event_name,
          policyVersion: existing?.policy_version || activePolicy.version,
          score: Number(existing?.score ?? decision.score),
        });
      }
      throw insertError;
    }

    await insertAnalyticsEvent({
      eventName: "qualified_visit",
      visitorId,
      sessionId,
      pagePath,
      landingVariant,
      attribution: {
        utm_source: featureRow.utm_source,
        utm_medium: featureRow.utm_medium,
        utm_campaign: featureRow.utm_campaign,
        utm_content: featureRow.utm_content,
        utm_term: featureRow.utm_term,
        referrer_host: null,
      },
      properties: {
        policy_id: activePolicy.id,
        policy_version: activePolicy.version,
        target_event: activePolicy.target_event,
        quality_score: decision.score,
        matched_signals: decision.matchedSignals,
        client_event_id: eventId,
        utm_placement: featureRow.utm_placement,
        tracking_mode: tracking.trackingMode === "consented" ? "consented" : "essential",
        marketing_consent: marketingConsent,
      },
    });

    let metaDelivered = false;
    if (marketingConsent) {
      const metaResult = await sendMetaQualifiedVisit({
        eventId,
        visitorId: analyticsConsent ? visitorId : null,
        pageUrl,
        ipAddress: getIp(request),
        userAgent: request.headers.get("user-agent"),
        fbp: tracking.fbp || null,
        fbc: tracking.fbc || null,
        eventName: activePolicy.event_name,
        policyVersion: activePolicy.version,
        score: decision.score,
        targetEvent: activePolicy.target_event,
        landingVariant,
      });
      metaDelivered = metaResult.ok;

      await supabase
        .from("qualified_visits")
        .update({
          meta_capi_delivered: metaDelivered,
          meta_capi_delivered_at: metaDelivered ? new Date().toISOString() : null,
          meta_capi_status: "status" in metaResult ? metaResult.status : null,
          meta_capi_response: "body" in metaResult ? metaResult.body : metaResult,
        })
        .eq("id", inserted.id);
    }

    return NextResponse.json({
      ok: true,
      qualified: true,
      created: true,
      eventId,
      eventName: activePolicy.event_name,
      policyVersion: activePolicy.version,
      score: decision.score,
      metaDelivered,
    });
  } catch (error) {
    console.error("qualification emit route error", error);
    return NextResponse.json(
      { ok: false, error: "qualification_emit_failed" },
      { status: 500 },
    );
  }
}
