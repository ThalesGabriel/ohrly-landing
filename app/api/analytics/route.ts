import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const allowedEvents = new Set([
  "lp_view",
  "lp_engaged_10s",
  "section_view",
  "example_view",
  "pilot_details_view",
  "cta_click",
  "form_view",
  "form_start",
  "form_submit_attempt",
  "form_submit_success",
  "form_submit_error",
]);

type AnalyticsPayload = {
  eventName: string;
  visitorId: string;
  sessionId: string;
  pagePath: string;
  landingVariant?: string;
  attribution?: {
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmContent?: string;
    utmTerm?: string;
  };
  referrerHost?: string;
  properties?: Record<string, unknown>;
};

function limitText(
  value: unknown,
  maximumLength = 255,
): string | null {
  if (typeof value !== "string") {
    return null;
  }

  return value.trim().slice(0, maximumLength);
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value,
  );
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as AnalyticsPayload;

    if (!allowedEvents.has(body.eventName)) {
      return NextResponse.json(
        { error: "Evento não permitido." },
        { status: 400 },
      );
    }

    if (
      !isUuid(body.visitorId) ||
      !isUuid(body.sessionId)
    ) {
      return NextResponse.json(
        { error: "Identificadores inválidos." },
        { status: 400 },
      );
    }

    const serializedProperties = JSON.stringify(
      body.properties ?? {},
    );

    if (serializedProperties.length > 8_000) {
      return NextResponse.json(
        { error: "Propriedades excedem o tamanho permitido." },
        { status: 413 },
      );
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Supabase analytics environment variables are missing.",
      );

      return NextResponse.json(
        { error: "Analytics indisponível." },
        { status: 503 },
      );
    }

    const supabase = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
      },
    );

    const { error } = await supabase
      .from("analytics_events")
      .insert({
        event_name: body.eventName,
        visitor_id: body.visitorId,
        session_id: body.sessionId,
        page_path:
          limitText(body.pagePath, 500) ?? "/",
        landing_variant: limitText(
          body.landingVariant,
        ),

        utm_source: limitText(
          body.attribution?.utmSource,
        ),
        utm_medium: limitText(
          body.attribution?.utmMedium,
        ),
        utm_campaign: limitText(
          body.attribution?.utmCampaign,
        ),
        utm_content: limitText(
          body.attribution?.utmContent,
        ),
        utm_term: limitText(
          body.attribution?.utmTerm,
        ),

        referrer_host: limitText(
          body.referrerHost,
        ),

        properties: body.properties ?? {},
      });

    if (error) {
      console.error("Supabase analytics error:", error);

      return NextResponse.json(
        { error: "Não foi possível registrar o evento." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { accepted: true },
      { status: 202 },
    );
  } catch (error) {
    console.error("Analytics route error:", error);

    return NextResponse.json(
      { error: "Payload inválido." },
      { status: 400 },
    );
  }
}