"use client";

import {
  CAMPAIGN_CONSENT_VERSION,
  type CampaignConsent,
} from "./types";

const CONSENT_KEY = "ohrly_campaign_consent_v1";

export const CONSENT_EVENT =
  "ohrly:campaign-consent";

// ============================================================
// DEFAULT
// ============================================================

export function defaultConsent(): CampaignConsent {
  return {
    analytics: false,
    marketing: false,
    decidedAt: "",
    version: CAMPAIGN_CONSENT_VERSION,
  };
}

// ============================================================
// READ
// ============================================================

export function readConsent(): CampaignConsent {
  if (typeof window === "undefined") {
    return defaultConsent();
  }

  try {
    const raw =
      localStorage.getItem(CONSENT_KEY);

    if (!raw) {
      return defaultConsent();
    }

    const parsed =
      JSON.parse(raw) as Partial<CampaignConsent>;

    return {
      analytics:
        parsed.analytics === true,

      marketing:
        parsed.marketing === true,

      decidedAt:
        typeof parsed.decidedAt === "string"
          ? parsed.decidedAt
          : "",

      /**
       * Importante:
       *
       * Não substituímos uma versão ausente pela versão
       * atual. Caso exista um consentimento antigo sem
       * version, ele será considerado desatualizado e o
       * banner poderá ser mostrado novamente.
       */
      version:
        typeof parsed.version === "string"
          ? parsed.version
          : "",
    };
  } catch {
    return defaultConsent();
  }
}

// ============================================================
// HAS CURRENT CONSENT
// ============================================================

export function hasConsentDecision() {
  const consent =
    readConsent();

  return Boolean(
    consent.decidedAt &&
    consent.version ===
      CAMPAIGN_CONSENT_VERSION
  );
}

// ============================================================
// WRITE
// ============================================================

export function writeConsent(
  value: Pick<
    CampaignConsent,
    "analytics" | "marketing"
  >
) {
  if (typeof window === "undefined") {
    return;
  }

  const consent: CampaignConsent = {
    analytics:
      value.analytics === true,

    marketing:
      value.marketing === true,

    decidedAt:
      new Date().toISOString(),

    version:
      CAMPAIGN_CONSENT_VERSION,
  };

  localStorage.setItem(
    CONSENT_KEY,
    JSON.stringify(consent)
  );

  window.dispatchEvent(
    new CustomEvent(
      CONSENT_EVENT,
      {
        detail: consent,
      }
    )
  );

  return consent;
}