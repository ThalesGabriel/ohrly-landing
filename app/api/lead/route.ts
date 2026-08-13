import { NextResponse } from "next/server";
import { insertAnalyticsEvent } from "@/lib/analytics/server";
import { sendFormspreeLead } from "@/lib/formspree";
import { sendMetaLead } from "@/lib/meta/capi";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

type LeadBody = {
  name?: string;
  email?: string;
  companySite?: string;
  usesIntercom?: string;
  customerCount?: string;
  website?: string;
  clientEventId?: string;
  tracking?: {
    visitorId?: string;
    sessionId?: string;
    landingVariant?: string;
    pageUrl?: string;
    pagePath?: string;
    deviceType?: string;
    attribution?: Record<string, string | null | undefined>;
    consent?: { analytics?: boolean; marketing?: boolean } | null;
    fbp?: string | null;
    fbc?: string | null;
  };
};

function clean(value: unknown, max = 500) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function validHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function getIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || null;
}

function displayIntercom(value: string) {
  if (value === "yes") return "Sim";
  if (value === "no") return "Não";
  return "Não sei";
}

const ALLOWED_INTERCOM_VALUES = new Set(["yes", "no", "unknown"]);
const ALLOWED_CUSTOMER_COUNTS = new Set([
  "under_100",
  "100_500",
  "500_2000",
  "2000_plus",
]);

function displayCustomerCount(value: string) {
  const labels: Record<string, string> = {
    under_100: "Até 100",
    "100_500": "100–500",
    "500_2000": "500–2.000",
    "2000_plus": "2.000+",
  };
  return labels[value] || value;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadBody;

    if (clean(body.website)) {
      return NextResponse.json({ ok: true });
    }

    const name = clean(body.name, 120);
    const email = clean(body.email, 254).toLowerCase();
    const companySite = clean(body.companySite, 300);
    const usesIntercom = clean(body.usesIntercom, 40);
    const customerCount = clean(body.customerCount, 40);
    const clientEventId = clean(body.clientEventId, 64);

    if (
      !name ||
      !validEmail(email) ||
      !validHttpUrl(companySite) ||
      !ALLOWED_INTERCOM_VALUES.has(usesIntercom) ||
      !ALLOWED_CUSTOMER_COUNTS.has(customerCount) ||
      !isUuid(clientEventId)
    ) {
      return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
    }

    const tracking = body.tracking || {};
    const attribution = tracking.attribution || {};
    const landingVariant = clean(
      tracking.landingVariant || process.env.NEXT_PUBLIC_OHRLY_LANDING_VARIANT || "decision_lp_v1",
      120,
    );
    const pageUrl = clean(tracking.pageUrl, 1200) || request.headers.get("referer") || "";
    const pagePath = clean(tracking.pagePath, 1200) || "/";
    const incomingSessionId = clean(tracking.sessionId, 64);
    const incomingVisitorId = clean(tracking.visitorId, 64);
    const sessionId = isUuid(incomingSessionId) ? incomingSessionId : crypto.randomUUID();
    const visitorId = isUuid(incomingVisitorId) ? incomingVisitorId : crypto.randomUUID();
    const marketingConsent = Boolean(tracking.consent?.marketing);
    const analyticsConsent = Boolean(tracking.consent?.analytics);
    const intercomLabel = displayIntercom(usesIntercom);
    const customerLabel = displayCustomerCount(customerCount);

    const supabase = getSupabaseAdmin();

    // Existing production decision_leads schema: no new columns required.
    const { error: leadError } = await supabase.from("decision_leads").insert({
      session_id: sessionId,
      name,
      company: companySite,
      email,
      whatsapp: null,
      decision: "Identificar quais problemas do SaaS deixaram de ser casos isolados",
      context: `Intercom: ${intercomLabel}. Volume aproximado de clientes: ${customerLabel}.`,
      question:
        "Quais problemas começaram a se repetir, qual o impacto consolidado e o que merece atenção primeiro?",
      decision_type: "intercom_behavioral_diagnostic",
      systems: intercomLabel === "Sim" ? "Intercom" : null,
      urgency: null,
      stage: "new",
      landing_variant: landingVariant,
      source_url: pageUrl || null,
      attribution: {
        ...attribution,
        device_type: tracking.deviceType || null,
        visitor_id: analyticsConsent ? visitorId : null,
      },
      analytics_consent: analyticsConsent,
      marketing_consent: marketingConsent,
      consent_version: "v1",
      meta_lead_event_id: clientEventId,
      meta_fbp: marketingConsent ? tracking.fbp || null : null,
      meta_fbc: marketingConsent ? tracking.fbc || null : null,
      metadata: {
        source: "Ohrly landing page - Intercom behavioral analysis",
        uses_intercom: usesIntercom,
        customer_count: customerCount,
        client_event_id: clientEventId,
      },
    });

    if (leadError) {
      console.error("decision_leads insert failed", leadError);
      return NextResponse.json({ ok: false, error: "lead_persist_failed" }, { status: 500 });
    }

    if (analyticsConsent) {
      const { error: eventError } = await insertAnalyticsEvent({
        eventName: "form_submit",
        visitorId,
        sessionId,
        pagePath,
        landingVariant,
        attribution,
        properties: {
          client_event_id: clientEventId,
          form_id: "intercom_lead_form",
          uses_intercom: usesIntercom,
          customer_count: customerCount,
          device_type: tracking.deviceType || null,
        },
      });

      if (eventError) {
        console.error("analytics form_submit failed", eventError);
      }
    }

    const ipAddress = getIp(request);
    const userAgent = request.headers.get("user-agent");

    const metaPromise = marketingConsent
      ? sendMetaLead({
          eventId: clientEventId,
          email,
          visitorId: analyticsConsent ? visitorId : null,
          pageUrl,
          ipAddress,
          userAgent,
          fbp: tracking.fbp || null,
          fbc: tracking.fbc || null,
          landingVariant,
          usesIntercom,
          customerCount,
        })
      : Promise.resolve({ ok: false, skipped: true, reason: "marketing_consent_false" } as const);

    const formspreePromise = sendFormspreeLead({
      name,
      email,
      companySite,
      usesIntercom: intercomLabel,
      customerCount: customerLabel,
      source: "Ohrly landing page - Intercom behavioral analysis",
      pageUrl,
      landingVariant,
      utm: {
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        utm_term: attribution.utm_term,
      },
    });

    const [metaResult, formspreeResult] = await Promise.allSettled([
      metaPromise,
      formspreePromise,
    ]);

    return NextResponse.json({
      ok: true,
      clientEventId,
      metaDelivered: metaResult.status === "fulfilled" && metaResult.value.ok,
      formspreeDelivered:
        formspreeResult.status === "fulfilled" && formspreeResult.value.ok,
    });
  } catch (error) {
    console.error("lead route error", error);
    return NextResponse.json({ ok: false, error: "invalid_request" }, { status: 400 });
  }
}
