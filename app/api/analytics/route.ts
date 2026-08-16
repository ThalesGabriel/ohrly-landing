import { NextResponse } from "next/server";
import { insertAnalyticsEvent } from "@/lib/analytics/server";

export const runtime = "nodejs";

function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value,
    )
  );
}

function cleanString(
  value: unknown,
  maxLength = 200,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const cleaned = value.trim();

  if (!cleaned) {
    return null;
  }

  return cleaned.slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const trackingMode =
      body.trackingMode === "consented"
        ? "consented"
        : "essential";

    //
    // Attribution allowed in analytics_events columns
    //
    const attribution = {
      utm_source: cleanString(
        body.attribution?.utm_source,
      ),

      utm_medium: cleanString(
        body.attribution?.utm_medium,
      ),

      utm_campaign: cleanString(
        body.attribution?.utm_campaign,
      ),

      utm_content: cleanString(
        body.attribution?.utm_content,
      ),

      utm_term: cleanString(
        body.attribution?.utm_term,
      ),

      referrer_host: cleanString(
        body.attribution?.referrer_host,
        500,
      ),
    };

    //
    // Placement does not currently have its own DB column.
    // Keep it in properties to avoid a schema migration.
    //
    const utmPlacement = cleanString(
      body.attribution?.utm_placement,
    );

    //
    // Meta identifiers are only persisted after
    // marketing/analytics consent according to the
    // current tracking architecture.
    //
    const enrichedProperties =
      trackingMode === "consented"
        ? {
            fbclid:
              cleanString(
                body.attribution?.fbclid,
                500,
              ),

            meta_campaign_id:
              cleanString(
                body.attribution?.meta_campaign_id,
              ),

            meta_adset_id:
              cleanString(
                body.attribution?.meta_adset_id,
              ),

            meta_ad_id:
              cleanString(
                body.attribution?.meta_ad_id,
              ),
          }
        : {};

    if (
      !body.eventName ||
      !body.visitorId ||
      !body.sessionId ||
      !body.pagePath
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "missing_event_fields",
        },
        {
          status: 400,
        },
      );
    }

    if (
      !isUuid(body.visitorId) ||
      !isUuid(body.sessionId)
    ) {
      return NextResponse.json(
        {
          ok: false,
          error: "invalid_tracking_id",
        },
        {
          status: 400,
        },
      );
    }

    const eventName = String(body.eventName)
      .trim()
      .slice(0, 64);

    if (!/^[a-z0-9_]{1,64}$/.test(eventName)) {
      return NextResponse.json(
        {
          ok: false,
          error: "invalid_event_name",
        },
        {
          status: 400,
        },
      );
    }

    const { error } =
      await insertAnalyticsEvent({
        eventName,

        visitorId: body.visitorId,

        sessionId: body.sessionId,

        pagePath:
          cleanString(
            body.pagePath,
            1200,
          ) || "/",

        landingVariant:
          cleanString(
            body.landingVariant,
            120,
          ),

        // Important: use the sanitized attribution,
        // not body.attribution directly.
        attribution,

        properties: {
          ...(body.properties || {}),

          client_event_id:
            cleanString(
              body.clientEventId,
              100,
            ),

          device_type:
            cleanString(
              body.deviceType,
              50,
            ),

          tracking_mode: trackingMode,

          analytics_consent:
            Boolean(
              body.consent?.analytics,
            ),

          marketing_consent:
            Boolean(
              body.consent?.marketing,
            ),

          utm_placement: utmPlacement,

          ...enrichedProperties,
        },
      });

    if (error) {
      console.error(
        "analytics_events insert failed",
        error,
      );

      return NextResponse.json(
        {
          ok: false,
          error: "event_persist_failed",
        },
        {
          status: 500,
        },
      );
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "analytics route error",
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
