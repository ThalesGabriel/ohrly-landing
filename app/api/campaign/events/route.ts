import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import {
  CAMPAIGN_EVENT_NAMES,
  type CampaignEventPayload,
} from "@/lib/campaign/types";

export const runtime = "nodejs";

const allowedEvents = new Set<string>(CAMPAIGN_EVENT_NAMES);

function isUuid(value: unknown): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    )
  );
}

function safeString(value: unknown, max = 500) {
  if (typeof value !== "string") return null;

  const trimmed = value.trim();

  return trimmed
    ? trimmed.slice(0, max)
    : null;
}

function getReferrerHost(value: unknown) {
  const referrer = safeString(value, 2000);

  if (!referrer) return null;

  try {
    return new URL(referrer)
      .hostname
      .slice(0, 500);
  } catch {
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body =
      (await request.json()) as CampaignEventPayload;

    // ---------------------------------------------------------
    // IDs obrigatórios
    // ---------------------------------------------------------

    if (
      !isUuid(body.client_event_id) ||
      !isUuid(body.session_id) ||
      !isUuid(body.visitor_id)
    ) {
      return NextResponse.json(
        {
          error:
            "client_event_id, session_id ou visitor_id inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------------------
    // Evento permitido
    // ---------------------------------------------------------

    if (!allowedEvents.has(body.event_name)) {
      return NextResponse.json(
        {
          error: "Evento inválido.",
        },
        {
          status: 400,
        }
      );
    }

    // form_submit é um evento autoritativo do servidor.
    // Só existe depois que decision_leads foi realmente salvo.
    if (body.event_name === "form_submit") {
      return NextResponse.json(
        {
          error:
            "form_submit deve ser registrado pelo endpoint de lead.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------------------
    // Consentimento
    // ---------------------------------------------------------

    if (!body.consent?.analytics) {
      return NextResponse.json(
        {
          skipped: true,
        },
        {
          status: 202,
        }
      );
    }

    // ---------------------------------------------------------
    // Timestamp
    // ---------------------------------------------------------

    const now = new Date().toISOString();

    const parsedOccurredAt =
      new Date(body.occurred_at);

    const occurredAt =
      Number.isNaN(parsedOccurredAt.getTime())
        ? now
        : parsedOccurredAt.toISOString();

    // ---------------------------------------------------------
    // Properties
    // ---------------------------------------------------------

    const rawProperties =
      body.properties &&
      typeof body.properties === "object" &&
      !Array.isArray(body.properties)
        ? body.properties
        : {};

    const properties = {
      ...rawProperties,

      device_type:
        body.device_type || "unknown",

      marketing_consent:
        body.consent?.marketing === true,

      // IDs de atribuição que não possuem coluna própria
      // continuam disponíveis no JSON.
      fbclid:
        safeString(
          body.attribution?.fbclid,
          1000
        ),

      meta_campaign_id:
        safeString(
          body.attribution?.meta_campaign_id,
          500
        ),

      meta_adset_id:
        safeString(
          body.attribution?.meta_adset_id,
          500
        ),

      meta_ad_id:
        safeString(
          body.attribution?.meta_ad_id,
          500
        ),
    };

    const supabase =
      getSupabaseAdmin();

    // ---------------------------------------------------------
    // analytics_events é nossa fonte canônica.
    //
    // client_event_id vira o próprio PK da tabela.
    // Isso nos dá idempotência sem criar outra coluna.
    // ---------------------------------------------------------

    const { error } = await supabase
      .from("analytics_events")
      .insert({
        id:
          body.client_event_id,

        occurred_at:
          occurredAt,

        event_name:
          body.event_name,

        visitor_id:
          body.visitor_id,

        session_id:
          body.session_id,

        page_path:
          safeString(
            body.page_path,
            1000
          ) || "/investigue",

        landing_variant:
          safeString(
            body.landing_variant,
            120
          ) || "decision_lp_v1",

        utm_source:
          safeString(
            body.attribution?.utm_source,
            500
          ),

        utm_medium:
          safeString(
            body.attribution?.utm_medium,
            500
          ),

        utm_campaign:
          safeString(
            body.attribution?.utm_campaign,
            500
          ),

        utm_content:
          safeString(
            body.attribution?.utm_content,
            500
          ),

        utm_term:
          safeString(
            body.attribution?.utm_term,
            500
          ),

        referrer_host:
          getReferrerHost(
            body.attribution?.referrer
          ),

        properties,
      });

    if (error) {
      // analytics_events.id é PK.
      // Retry do mesmo evento não cria duplicata.
      if (error.code === "23505") {
        return NextResponse.json({
          ok: true,
          duplicate: true,
        });
      }

      throw error;
    }

    return NextResponse.json({
      ok: true,
    });
  } catch (error) {
    console.error(
      "campaign event error",
      error
    );

    return NextResponse.json(
      {
        error:
          "Falha ao registrar evento.",
      },
      {
        status: 500,
      }
    );
  }
}