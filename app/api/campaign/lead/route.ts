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

import type {
  LeadPayload,
} from "@/lib/campaign/types";

export const runtime = "nodejs";

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

function clean(
  value: unknown,
  max = 5000
) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .trim()
    .slice(0, max);
}

function optional(
  value: unknown,
  max = 5000
) {
  const result =
    clean(value, max);

  return result || null;
}

function getClientIp(
  request: NextRequest
) {
  const forwarded =
    request.headers.get(
      "x-forwarded-for"
    );

  if (forwarded) {
    return forwarded
      .split(",")[0]
      ?.trim();
  }

  return (
    request.headers.get(
      "x-real-ip"
    ) ||
    request.headers.get(
      "cf-connecting-ip"
    ) ||
    undefined
  );
}

function getReferrerHost(
  value: unknown
) {
  const referrer =
    optional(value, 2000);

  if (!referrer) {
    return null;
  }

  try {
    return new URL(referrer)
      .hostname
      .slice(0, 500);
  } catch {
    return null;
  }
}

function buildAttribution(
  body: LeadPayload
) {
  return {
    utm_source:
      optional(
        body.attribution?.utm_source,
        500
      ),

    utm_medium:
      optional(
        body.attribution?.utm_medium,
        500
      ),

    utm_campaign:
      optional(
        body.attribution?.utm_campaign,
        500
      ),

    utm_content:
      optional(
        body.attribution?.utm_content,
        500
      ),

    utm_term:
      optional(
        body.attribution?.utm_term,
        500
      ),

    fbclid:
      optional(
        body.attribution?.fbclid,
        1000
      ),

    meta_campaign_id:
      optional(
        body.attribution?.meta_campaign_id,
        500
      ),

    meta_adset_id:
      optional(
        body.attribution?.meta_adset_id,
        500
      ),

    meta_ad_id:
      optional(
        body.attribution?.meta_ad_id,
        500
      ),

    referrer:
      optional(
        body.attribution?.referrer,
        2000
      ),
  };
}

async function notifyFormspree(data: {
  name: string;
  company: string;
  email: string;
  whatsapp?: string | null;

  decision: string;
  context: string;
  question: string;
  decisionType: string;

  systems?: string | null;
  urgency?: string | null;

  leadId: string;

  utmCampaign?: string | null;
  utmContent?: string | null;
}) {
  const formId =
    process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    console.warn(
      "FORMSPREE_FORM_ID não configurado. Lead salvo sem notificação."
    );

    return false;
  }

  try {
    const response =
      await fetch(
        `https://formspree.io/f/${formId}`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Accept:
              "application/json",
          },

          body: JSON.stringify({
            _subject:
              `Novo Decision Sprint — ${data.company}`,

            name:
              data.name,

            company:
              data.company,

            email:
              data.email,

            whatsapp:
              data.whatsapp,

            decision:
              data.decision,

            context:
              data.context,

            question:
              data.question,

            decision_type:
              data.decisionType,

            systems:
              data.systems,

            urgency:
              data.urgency,

            lead_id:
              data.leadId,

            utm_campaign:
              data.utmCampaign,

            utm_content:
              data.utmContent,
          }),
        }
      );

    if (!response.ok) {
      console.error(
        "Formspree notification failed:",
        response.status,
        await response.text()
      );

      return false;
    }

    return true;
  } catch (error) {
    console.error(
      "Formspree notification error:",
      error
    );

    return false;
  }
}

export async function POST(
  request: NextRequest
) {
  try {
    const body =
      (await request.json()) as LeadPayload;

    // ---------------------------------------------------------
    // Identificadores
    // ---------------------------------------------------------

    if (
      !isUuid(body.session_id) ||
      !isUuid(body.meta_event_id)
    ) {
      return NextResponse.json(
        {
          error:
            "Sessão inválida.",
        },
        {
          status: 400,
        }
      );
    }

    const analyticsConsent =
      body.consent?.analytics === true;

    const marketingConsent =
      body.consent?.marketing === true;

    // visitor_id só é obrigatório se estamos
    // efetivamente gravando analytics.
    const visitorId =
      isUuid(body.visitor_id)
        ? body.visitor_id
        : null;

    if (
      analyticsConsent &&
      !visitorId
    ) {
      return NextResponse.json(
        {
          error:
            "visitor_id inválido para sessão com analytics.",
        },
        {
          status: 400,
        }
      );
    }

    // ---------------------------------------------------------
    // Campos do formulário
    // ---------------------------------------------------------

    const name =
      clean(body.name, 200);

    const company =
      clean(body.company, 300);

    const email =
      clean(
        body.email,
        320
      ).toLowerCase();

    const whatsapp =
      optional(
        body.whatsapp,
        100
      );

    const decision =
      clean(body.decision);

    const context =
      clean(body.context);

    const question =
      clean(body.question);

    const decisionType =
      clean(
        body.decision_type,
        120
      );

    const systems =
      optional(body.systems);

    const urgency =
      optional(body.urgency);

    if (
      !name ||
      !company ||
      !email ||
      !decision ||
      !context ||
      !question ||
      !decisionType
    ) {
      return NextResponse.json(
        {
          error:
            "Preencha os campos obrigatórios.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        email
      )
    ) {
      return NextResponse.json(
        {
          error:
            "E-mail inválido.",
        },
        {
          status: 400,
        }
      );
    }

    const supabase =
      getSupabaseAdmin();

    const now =
      new Date().toISOString();

    const attribution =
      buildAttribution(body);

    const landingVariant =
      clean(
        body.landing_variant,
        120
      ) ||
      "decision_lp_v1";

    const pagePath =
      clean(
        body.page_path,
        1000
      ) ||
      "/investigue";

    const sourceUrl =
      optional(
        body.source_url,
        2000
      );

    // ---------------------------------------------------------
    // Idempotência
    // ---------------------------------------------------------

    const {
      data: existingLead,
      error: existingLeadError,
    } = await supabase
      .from("decision_leads")
      .select("id")
      .eq(
        "meta_lead_event_id",
        body.meta_event_id
      )
      .maybeSingle();

    if (existingLeadError) {
      throw existingLeadError;
    }

    if (existingLead) {
      return NextResponse.json({
        ok: true,
        lead_id:
          existingLead.id,
        duplicate: true,
      });
    }

    // ---------------------------------------------------------
    // Fonte oficial do lead
    // ---------------------------------------------------------

    const {
      data: lead,
      error: leadError,
    } = await supabase
      .from("decision_leads")
      .insert({
        visitor_id:
          visitorId,

        session_id:
          body.session_id,

        name,
        company,
        email,
        whatsapp,

        decision,
        context,
        question,

        decision_type:
          decisionType,

        systems,
        urgency,

        landing_variant:
          landingVariant,

        source_url:
          sourceUrl,

        attribution,

        analytics_consent:
          analyticsConsent,

        marketing_consent:
          marketingConsent,

        consent_version:
          "2026-08-v1",

        meta_lead_event_id:
          body.meta_event_id,

        meta_fbp:
          marketingConsent
            ? optional(
                body.fbp,
                1000
              )
            : null,

        meta_fbc:
          marketingConsent
            ? optional(
                body.fbc,
                1000
              )
            : null,
      })
      .select("id")
      .single();

    if (leadError) {
      // O índice UNIQUE de meta_lead_event_id
      // é a defesa definitiva contra concorrência.
      if (
        leadError.code ===
        "23505"
      ) {
        const {
          data: duplicateLead,
        } = await supabase
          .from("decision_leads")
          .select("id")
          .eq(
            "meta_lead_event_id",
            body.meta_event_id
          )
          .maybeSingle();

        if (duplicateLead) {
          return NextResponse.json({
            ok: true,
            lead_id:
              duplicateLead.id,
            duplicate: true,
          });
        }
      }

      throw leadError;
    }

    // O trigger do banco cria automaticamente:
    //
    // lead_stage_events
    // stage = new
    //
    // Não inserir manualmente.

    // ---------------------------------------------------------
    // Evento autoritativo form_submit
    // ---------------------------------------------------------

    if (
      analyticsConsent &&
      visitorId
    ) {
      const {
        error: analyticsError,
      } = await supabase
        .from("analytics_events")
        .insert({
          // Usamos o mesmo UUID da submissão.
          id:
            body.meta_event_id,

          occurred_at:
            now,

          event_name:
            "form_submit",

          visitor_id:
            visitorId,

          session_id:
            body.session_id,

          page_path:
            pagePath,

          landing_variant:
            landingVariant,

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
            getReferrerHost(
              attribution.referrer
            ),

          properties: {
            lead_id:
              lead.id,

            source:
              "lead_route",

            decision_type:
              decisionType,
          },
        });

      if (
        analyticsError &&
        analyticsError.code !==
          "23505"
      ) {
        // Lead já existe; analytics não deve
        // transformar a submissão em falha.
        console.error(
          "form_submit analytics error:",
          analyticsError
        );
      }
    }

    // ---------------------------------------------------------
    // Efeitos posteriores
    // ---------------------------------------------------------

    const formspreePromise =
      notifyFormspree({
        name,
        company,
        email,
        whatsapp,

        decision,
        context,
        question,

        decisionType,

        systems,
        urgency,

        leadId:
          lead.id,

        utmCampaign:
          attribution.utm_campaign,

        utmContent:
          attribution.utm_content,
      });

    const metaPromise =
      marketingConsent
        ? sendMetaServerEvent({
            eventName:
              "Lead",

            eventId:
              body.meta_event_id,

            eventSourceUrl:
              body.source_url,

            email,

            phone:
              body.whatsapp,

            clientIpAddress:
              getClientIp(
                request
              ),

            clientUserAgent:
              request.headers.get(
                "user-agent"
              ) || undefined,

            fbp:
              body.fbp,

            fbc:
              body.fbc,

            customData: {
              landing_variant:
                landingVariant,

              decision_type:
                decisionType,
            },
          })
        : Promise.resolve({
            skipped: true,
          });

    const [
      formspreeResult,
      metaResult,
    ] = await Promise.allSettled([
      formspreePromise,
      metaPromise,
    ]);

    const notificationSent =
      formspreeResult.status ===
      "fulfilled"
        ? formspreeResult.value
        : false;

    if (
      formspreeResult.status ===
      "rejected"
    ) {
      console.error(
        "Formspree rejected:",
        formspreeResult.reason
      );
    }

    if (
      metaResult.status ===
      "rejected"
    ) {
      console.error(
        "Meta CAPI rejected:",
        metaResult.reason
      );
    }

    // ---------------------------------------------------------
    // Lead está salvo independentemente dos side-effects.
    // ---------------------------------------------------------

    return NextResponse.json({
      ok: true,

      lead_id:
        lead.id,

      notification_sent:
        notificationSent,
    });
  } catch (error) {
    console.error(
      "campaign lead error",
      error
    );

    return NextResponse.json(
      {
        error:
          "Não foi possível enviar sua decisão.",
      },
      {
        status: 500,
      }
    );
  }
}