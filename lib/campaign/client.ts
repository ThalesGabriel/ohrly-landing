"use client";

import type {
  CampaignAttribution,
  CampaignConsent,
  CampaignEventName,
  CampaignEventPayload,
  CampaignSessionContext,
  DeviceType,
} from "./types";

import { readConsent } from "./consent";

const SESSION_ID_KEY =
  "ohrly_campaign_session_id_v1";

const VISITOR_ID_KEY =
  "ohrly_campaign_visitor_id_v1";

const ATTRIBUTION_KEY =
  "ohrly_campaign_attribution_v1";

export const LANDING_VARIANT =
  process.env.NEXT_PUBLIC_OHRLY_LANDING_VARIANT ||
  "decision_lp_v1";


// ============================================================
// HELPERS
// ============================================================

function clean(
  value: string | null
) {
  const trimmed =
    value?.trim();

  return trimmed
    ? trimmed.slice(0, 500)
    : undefined;
}

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


// ============================================================
// DEVICE
// ============================================================

function detectDevice(): DeviceType {
  const width =
    window.innerWidth;

  if (width < 768) {
    return "mobile";
  }

  if (width < 1024) {
    return "tablet";
  }

  return "desktop";
}


// ============================================================
// SESSION ID
//
// Dura apenas a sessão atual do navegador.
// ============================================================

export function getSessionId() {
  const current =
    sessionStorage.getItem(
      SESSION_ID_KEY
    );

  if (
    current &&
    isUuid(current)
  ) {
    return current;
  }

  const created =
    crypto.randomUUID();

  sessionStorage.setItem(
    SESSION_ID_KEY,
    created
  );

  return created;
}


// ============================================================
// VISITOR ID
//
// Persistente entre sessões.
//
// IMPORTANTE:
// só chamar quando analytics consent === true.
// ============================================================

export function getVisitorId() {
  const current =
    localStorage.getItem(
      VISITOR_ID_KEY
    );

  if (
    current &&
    isUuid(current)
  ) {
    return current;
  }

  const created =
    crypto.randomUUID();

  localStorage.setItem(
    VISITOR_ID_KEY,
    created
  );

  return created;
}


// ============================================================
// ATTRIBUTION
// ============================================================

function attributionFromUrl():
  CampaignAttribution {
  const params =
    new URLSearchParams(
      window.location.search
    );

  return {
    utm_source:
      clean(
        params.get(
          "utm_source"
        )
      ),

    utm_medium:
      clean(
        params.get(
          "utm_medium"
        )
      ),

    utm_campaign:
      clean(
        params.get(
          "utm_campaign"
        )
      ),

    utm_content:
      clean(
        params.get(
          "utm_content"
        )
      ),

    utm_term:
      clean(
        params.get(
          "utm_term"
        )
      ),

    fbclid:
      clean(
        params.get(
          "fbclid"
        )
      ),

    meta_campaign_id:
      clean(
        params.get(
          "meta_campaign_id"
        ) ||
        params.get(
          "campaign_id"
        )
      ),

    meta_adset_id:
      clean(
        params.get(
          "meta_adset_id"
        ) ||
        params.get(
          "adset_id"
        )
      ),

    meta_ad_id:
      clean(
        params.get(
          "meta_ad_id"
        ) ||
        params.get(
          "ad_id"
        )
      ),

    referrer:
      clean(
        document.referrer
      ),
  };
}

export function getAttribution():
  CampaignAttribution {
  const current =
    attributionFromUrl();

  const hasAttribution =
    Boolean(
      current.utm_source ||
      current.utm_campaign ||
      current.fbclid ||
      current.meta_ad_id
    );

  if (hasAttribution) {
    sessionStorage.setItem(
      ATTRIBUTION_KEY,
      JSON.stringify(
        current
      )
    );

    return current;
  }

  const raw =
    sessionStorage.getItem(
      ATTRIBUTION_KEY
    );

  if (raw) {
    try {
      const parsed =
        JSON.parse(
          raw
        ) as CampaignAttribution;

      return parsed;
    } catch {
      // attribution inválida:
      // segue para recriar abaixo
    }
  }

  sessionStorage.setItem(
    ATTRIBUTION_KEY,
    JSON.stringify(
      current
    )
  );

  return current;
}


// ============================================================
// SESSION CONTEXT
// ============================================================

export function getSessionContext(
  consent:
    CampaignConsent =
      readConsent()
): CampaignSessionContext {
  return {
    /**
     * Só criamos/persistimos visitor_id
     * quando analytics está autorizado.
     */
    visitor_id:
      consent.analytics
        ? getVisitorId()
        : undefined,

    session_id:
      getSessionId(),

    landing_variant:
      LANDING_VARIANT,

    page_path:
      `${window.location.pathname}${window.location.search}`,

    device_type:
      detectDevice(),

    attribution:
      getAttribution(),

    consent,
  };
}


// ============================================================
// TRACK EVENT
// ============================================================

export async function trackEvent(
  event_name:
    CampaignEventName,

  properties:
    Record<
      string,
      unknown
    > = {}
) {
  if (
    typeof window ===
    "undefined"
  ) {
    return;
  }

  const consent =
    readConsent();

  // Sem analytics consent:
  // absolutamente nenhum analytics event.
  if (!consent.analytics) {
    return;
  }

  const context =
    getSessionContext(
      consent
    );

  /**
   * Defensive check.
   *
   * Pela lógica acima visitor_id sempre existe
   * quando analytics=true, mas isso também ajuda
   * o TypeScript a estreitar:
   *
   * string | undefined
   *        ↓
   * string
   */
  if (
    !context.visitor_id
  ) {
    return;
  }

  const payload:
    CampaignEventPayload = {
      ...context,

      /**
       * Explicitamente atribuído porque
       * CampaignSessionContext define visitor_id
       * como opcional, enquanto
       * CampaignEventPayload o exige.
       */
      visitor_id:
        context.visitor_id,

      client_event_id:
        crypto.randomUUID(),

      event_name,

      occurred_at:
        new Date()
          .toISOString(),

      properties,
    };

  try {
    await fetch(
      "/api/campaign/events",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body:
          JSON.stringify(
            payload
          ),

        keepalive: true,
      }
    );
  } catch {
    // Analytics nunca quebra a LP.
  }
}


// ============================================================
// COOKIE
// ============================================================

export function getCookie(
  name: string
) {
  const prefix =
    `${name}=`;

  const item =
    document.cookie
      .split(";")
      .map(
        (part) =>
          part.trim()
      )
      .find(
        (part) =>
          part.startsWith(
            prefix
          )
      );

  return item
    ? decodeURIComponent(
        item.slice(
          prefix.length
        )
      )
    : undefined;
}