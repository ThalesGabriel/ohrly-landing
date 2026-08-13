import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type AnalyticsInsert = {
  eventName: string;
  visitorId: string;
  sessionId: string;
  pagePath: string;
  landingVariant?: string | null;
  attribution?: {
    utm_source?: string | null;
    utm_medium?: string | null;
    utm_campaign?: string | null;
    utm_content?: string | null;
    utm_term?: string | null;
    referrer_host?: string | null;
  };
  properties?: Record<string, unknown>;
};

export async function insertAnalyticsEvent(input: AnalyticsInsert) {
  const supabase = getSupabaseAdmin();
  return supabase.from("analytics_events").insert({
    occurred_at: new Date().toISOString(),
    event_name: input.eventName,
    visitor_id: input.visitorId,
    session_id: input.sessionId,
    page_path: input.pagePath || "/",
    landing_variant: input.landingVariant || null,
    utm_source: input.attribution?.utm_source || null,
    utm_medium: input.attribution?.utm_medium || null,
    utm_campaign: input.attribution?.utm_campaign || null,
    utm_content: input.attribution?.utm_content || null,
    utm_term: input.attribution?.utm_term || null,
    referrer_host: input.attribution?.referrer_host || null,
    properties: input.properties || {},
  });
}
