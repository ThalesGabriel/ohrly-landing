import {
  NextRequest,
  NextResponse,
} from "next/server";

import {
  getSupabaseAdmin,
} from "@/lib/supabase/admin";

import {
  sendMetaServerEvent,
} from "@/lib/meta/capi";

import {
  LEAD_STAGES,
  type LeadStage,
} from "@/lib/campaign/types";

export const runtime = "nodejs";

const stages =
  new Set<string>(
    LEAD_STAGES
  );

function isUuid(
  value: unknown
): value is string {
  return (
    typeof value === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      value
    )
  );
}

function isAuthorized(
  request: NextRequest
) {
  const secret =
    process.env
      .CAMPAIGN_INTERNAL_API_KEY;

  if (!secret) {
    return false;
  }

  return (
    request.headers.get(
      "authorization"
    ) ===
    `Bearer ${secret}`
  );
}

function metaEventName(
  stage: LeadStage
) {
  if (stage === "oqp") {
    return (
      process.env
        .META_QUALIFIED_EVENT_NAME ||
      null
    );
  }

  if (
    stage === "sprint_paid"
  ) {
    return (
      process.env
        .META_SPRINT_PAID_EVENT_NAME ||
      null
    );
  }

  return null;
}

export async function POST(
  request: NextRequest
) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  try {
    const body =
      await request.json();

    const leadId =
      body.lead_id;

    const stage =
      body.stage as LeadStage;

    const note =
      typeof body.note === "string"
        ? body.note
            .trim()
            .slice(0, 5000)
        : null;

    if (
      !isUuid(leadId) ||
      !stages.has(stage)
    ) {
      return NextResponse.json(
        {
          error:
            "lead_id ou stage inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      getSupabaseAdmin();

    // ---------------------------------------------------------
    // Busca estado atual
    // ---------------------------------------------------------

    const {
      data: lead,
      error: leadError,
    } = await supabase
      .from("decision_leads")
      .select(`
        id,
        stage,
        email,
        whatsapp,
        source_url,
        marketing_consent,
        meta_fbp,
        meta_fbc
      `)
      .eq(
        "id",
        leadId
      )
      .single();

    if (leadError) {
      throw leadError;
    }

    // ---------------------------------------------------------
    // Idempotência da transição
    // ---------------------------------------------------------

    if (
      lead.stage === stage
    ) {
      return NextResponse.json({
        ok: true,
        lead_id:
          leadId,
        stage,
        duplicate: true,
      });
    }

    // ---------------------------------------------------------
    // Apenas alteramos o estado atual.
    //
    // O trigger do banco:
    //
    // - atualiza updated_at
    // - define qualified_at
    // - define paid_at
    // - adiciona lead_stage_events
    // ---------------------------------------------------------

    const {
      error: updateError,
    } = await supabase
      .from("decision_leads")
      .update({
        stage,
        stage_note:
          note,
      })
      .eq(
        "id",
        leadId
      );

    if (updateError) {
      throw updateError;
    }

    // ---------------------------------------------------------
    // Feedback downstream para Meta
    //
    // Na V1 os envs ficarão vazios.
    // Portanto nada será enviado ainda.
    // ---------------------------------------------------------

    const eventName =
      metaEventName(stage);

    if (
      eventName &&
      lead.marketing_consent
    ) {
      try {
        await sendMetaServerEvent({
          eventName,

          eventId:
            crypto.randomUUID(),

          eventSourceUrl:
            lead.source_url ||
            undefined,

          email:
            lead.email,

          phone:
            lead.whatsapp ||
            undefined,

          fbp:
            lead.meta_fbp ||
            undefined,

          fbc:
            lead.meta_fbc ||
            undefined,

          customData: {
            lead_id:
              leadId,

            stage,
          },
        });
      } catch (error) {
        // O estágio comercial já foi persistido.
        // Meta nunca deve causar rollback comercial.
        console.error(
          "Meta downstream event failed:",
          error
        );
      }
    }

    return NextResponse.json({
      ok: true,
      lead_id:
        leadId,
      stage,
    });
  } catch (error) {
    console.error(
      "lead stage error",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível atualizar o estágio.",
      },
      {
        status: 500,
      }
    );
  }
}