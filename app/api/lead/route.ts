import { NextResponse } from "next/server";

import { insertAnalyticsEvent } from "@/lib/analytics/server";
import { sendFormspreeLead } from "@/lib/formspree";
import { sendMetaLead } from "@/lib/meta/capi";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

import type {
  Attribution,
  ClientTrackingContext,
} from "@/lib/tracking/types";

export const runtime = "nodejs";

type LeadBody = {
  email?: string;
  companySite?: string;
  customerCount?: string;
  website?: string;
  clientEventId?: string;

  tracking?: {
    visitorId?: string;
    sessionId?: string;

    trackingMode?:
      | "essential"
      | "consented";

    landingVariant?: string;
    pageUrl?: string;
    pagePath?: string;
    deviceType?: string;

    attribution?: Record<
      string,
      string | null | undefined
    >;

    consent?: {
      analytics?: boolean;
      marketing?: boolean;
    } | null;

    fbp?: string | null;
    fbc?: string | null;
  };
};

const ALLOWED_CUSTOMER_COUNTS = new Set([
  "under_100",
  "100_500",
  "500_2000",
  "2000_plus",
]);

function clean(
  value: unknown,
  max = 500,
) {
  return typeof value === "string"
    ? value.trim().slice(0, max)
    : "";
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    value,
  );
}

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

function validHttpUrl(value: string) {
  try {
    const url = new URL(value);

    return (
      url.protocol === "http:" ||
      url.protocol === "https:"
    );
  } catch {
    return false;
  }
}

function getIp(request: Request) {
  const forwarded =
    request.headers.get("x-forwarded-for");

  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    null
  );
}

function displayCustomerCount(
  value: string,
) {
  const labels: Record<string, string> = {
    under_100: "Até 100",
    "100_500": "100–500",
    "500_2000": "500–2.000",
    "2000_plus": "2.000+",
  };

  return labels[value] || value;
}

export async function POST(
  request: Request,
) {
  try {
    const body =
      (await request.json()) as LeadBody;

    /*
     * Honeypot.
     *
     * Para bots, fingimos sucesso sem
     * persistir nem disparar integrações.
     */
    if (clean(body.website)) {
      return NextResponse.json({
        ok: true,
      });
    }

    const email = clean(
      body.email,
      254,
    ).toLowerCase();

    const companySite = clean(
      body.companySite,
      300,
    );

    const customerCount = clean(
      body.customerCount,
      40,
    );

    const clientEventId = clean(
      body.clientEventId,
      64,
    );

    if (
      !validEmail(email) ||
      !validHttpUrl(companySite) ||
      !ALLOWED_CUSTOMER_COUNTS.has(
        customerCount,
      ) ||
      !isUuid(clientEventId)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "invalid_form",
        },
        {
          status: 400,
        },
      );
    }

    const tracking = (
      body.tracking || {}
    ) as Partial<ClientTrackingContext>;

    const attribution: Partial<Attribution> =
      tracking.attribution ?? {};

    const utmPlacement =
      clean(
        attribution.utm_placement,
        200,
      ) || null;

    const landingVariant = clean(
      tracking.landingVariant ||
        process.env
          .NEXT_PUBLIC_OHRLY_LANDING_VARIANT ||
        "account_attention_lp_v2",
      120,
    );

    const pageUrl =
      clean(
        tracking.pageUrl,
        1200,
      ) ||
      request.headers.get("referer") ||
      "";

    const pagePath =
      clean(
        tracking.pagePath,
        1200,
      ) || "/";

    const incomingSessionId = clean(
      tracking.sessionId,
      64,
    );

    const incomingVisitorId = clean(
      tracking.visitorId,
      64,
    );

    const sessionId = isUuid(
      incomingSessionId,
    )
      ? incomingSessionId
      : crypto.randomUUID();

    const visitorId = isUuid(
      incomingVisitorId,
    )
      ? incomingVisitorId
      : crypto.randomUUID();

    const marketingConsent = Boolean(
      tracking.consent?.marketing,
    );

    const analyticsConsent = Boolean(
      tracking.consent?.analytics,
    );

    const customerLabel =
      displayCustomerCount(customerCount);

    const supabase =
      getSupabaseAdmin();

    /*
     * Mantemos o schema atual de
     * decision_leads.
     *
     * Esta implementação assume que
     * "name" aceita null.
     */
    const { error: leadError } =
      await supabase
        .from("decision_leads")
        .insert({
          session_id: sessionId,

          name: null,

          company: companySite,

          email,

          whatsapp: null,

          decision:
            "Identificar quais contas da carteira realmente precisam de atenção e reduzir a investigação manual do time de CS",

          context:
            `Volume aproximado de contas: ${customerLabel}.`,

          question:
            "Quais contas realmente mudaram e quais o time deveria investigar primeiro?",

          decision_type:
            "b2b_account_attention_diagnostic",

          systems: null,

          urgency: null,

          stage: "new",

          landing_variant:
            landingVariant,

          source_url:
            pageUrl || null,

          attribution: {
            ...attribution,

            utm_placement:
              utmPlacement,

            device_type:
              tracking.deviceType ||
              null,

            visitor_id:
              analyticsConsent
                ? visitorId
                : null,
          },

          analytics_consent:
            analyticsConsent,

          marketing_consent:
            marketingConsent,

          consent_version: "v1",

          meta_lead_event_id:
            clientEventId,

          meta_fbp:
            marketingConsent
              ? tracking.fbp || null
              : null,

          meta_fbc:
            marketingConsent
              ? tracking.fbc || null
              : null,

          metadata: {
            source:
              "Ohrly landing page - Account attention",

            customer_count:
              customerCount,

            client_event_id:
              clientEventId,

            utm_placement:
              utmPlacement,
          },
        });

    if (leadError) {
      console.error(
        "decision_leads insert failed",
        leadError,
      );

      return NextResponse.json(
        {
          ok: false,
          error:
            "lead_persist_failed",
        },
        {
          status: 500,
        },
      );
    }

    /*
     * O evento "form_submit" representa
     * confirmação no servidor.
     *
     * Mantemos esse nome para continuidade
     * histórica da série.
     */
    const { error: eventError } =
      await insertAnalyticsEvent({
        eventName: "form_submit",

        visitorId,
        sessionId,
        pagePath,
        landingVariant,

        attribution: {
          utm_source:
            attribution.utm_source,

          utm_medium:
            attribution.utm_medium,

          utm_campaign:
            attribution.utm_campaign,

          utm_content:
            attribution.utm_content,

          utm_term:
            attribution.utm_term,

          referrer_host:
            attribution.referrer_host,
        },

        properties: {
          client_event_id:
            clientEventId,

          form_id:
            "attention_lead_form",

          customer_count:
            customerCount,

          device_type:
            tracking.deviceType ||
            null,

          utm_placement:
            utmPlacement,

          tracking_mode:
            tracking.trackingMode ===
            "consented"
              ? "consented"
              : "essential",
        },
      });

    if (eventError) {
      console.error(
        "analytics form_submit failed",
        eventError,
      );
    }

    const ipAddress =
      getIp(request);

    const userAgent =
      request.headers.get(
        "user-agent",
      );

    /*
     * Meta CAPI.
     *
     * Só enviamos quando há consentimento
     * de marketing.
     */
    const metaPromise =
      marketingConsent
        ? sendMetaLead({
            eventId:
              clientEventId,

            email,

            visitorId:
              analyticsConsent
                ? visitorId
                : null,

            pageUrl,

            ipAddress,

            userAgent,

            fbp:
              tracking.fbp ||
              null,

            fbc:
              tracking.fbc ||
              null,

            landingVariant,

            customerCount,
          })
        : Promise.resolve({
            ok: false,
            skipped: true,
            reason:
              "marketing_consent_false",
          } as const);

    /*
     * Notificação comercial via
     * Formspree.
     */
    const formspreePromise =
      sendFormspreeLead({
        email,

        companySite,

        customerCount:
          customerLabel,

        source:
          "Ohrly landing page - Account attention",

        pageUrl,

        landingVariant,

        utm: {
          utm_source:
            attribution.utm_source,

          utm_medium:
            attribution.utm_medium,

          utm_campaign:
            attribution.utm_campaign,

          utm_content:
            attribution.utm_content,

          utm_term:
            attribution.utm_term,

          utm_placement:
            utmPlacement,
        },
      });

    const [
      metaResult,
      formspreeResult,
    ] =
      await Promise.allSettled([
        metaPromise,
        formspreePromise,
      ]);

    return NextResponse.json({
      ok: true,

      clientEventId,

      metaDelivered:
        metaResult.status ===
          "fulfilled" &&
        metaResult.value.ok,

      formspreeDelivered:
        formspreeResult.status ===
          "fulfilled" &&
        formspreeResult.value.ok,
    });
  } catch (error) {
    console.error(
      "lead route error",
      error,
    );

    return NextResponse.json(
      {
        ok: false,
        error: "invalid_request",
      },
      {
        status: 400,
      },
    );
  }
}