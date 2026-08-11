// src/lib/campaign/types.ts

// ============================================================
// CAMPAIGN EVENTS
// ============================================================

export const CAMPAIGN_EVENT_NAMES = [
  "lp_view",

  // Nome canônico já usado no analytics do Ohrly.
  "lp_engaged_10s",

  "scroll_25",
  "scroll_50",
  "scroll_75",

  "offer_view",

  "cta_click",

  "form_view",
  "form_start",
  "form_step",
  "form_error",

  // Evento autoritativo:
  // somente o backend /api/campaign/lead deve criá-lo.
  "form_submit",

  "thank_you_view",
] as const;

export type CampaignEventName =
  (typeof CAMPAIGN_EVENT_NAMES)[number];


// ============================================================
// DEVICE
// ============================================================

export const DEVICE_TYPES = [
  "mobile",
  "tablet",
  "desktop",
  "unknown",
] as const;

export type DeviceType =
  (typeof DEVICE_TYPES)[number];


// ============================================================
// CONSENT
// ============================================================

export const CAMPAIGN_CONSENT_VERSION =
  "2026-08-v1" as const;

export type CampaignConsent = {
  analytics: boolean;
  marketing: boolean;

  /**
   * ISO timestamp da decisão.
   * Ex. 2026-08-11T18:00:00.000Z
   *
   * String vazia significa que o usuário ainda
   * não tomou uma decisão explícita.
   */
  decidedAt: string;

  /**
   * Versão do contrato/banner apresentado.
   */
  version: string;
};


// ============================================================
// ATTRIBUTION
// ============================================================

export type CampaignAttribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;

  /**
   * Meta click identifier vindo da URL.
   */
  fbclid?: string;

  /**
   * IDs opcionais passados via parâmetros dinâmicos
   * configurados no Meta Ads.
   */
  meta_campaign_id?: string;
  meta_adset_id?: string;
  meta_ad_id?: string;

  /**
   * document.referrer original da sessão.
   */
  referrer?: string;
};


// ============================================================
// SESSION CONTEXT
// ============================================================

export type CampaignSessionContext = {
  /**
   * visitor_id é opcional neste nível porque uma pessoa
   * pode recusar analytics e ainda enviar o formulário.
   *
   * Para CampaignEventPayload ele se torna obrigatório.
   */
  visitor_id?: string;

  session_id: string;

  landing_variant: string;

  page_path: string;

  device_type: DeviceType;

  attribution: CampaignAttribution;

  consent: CampaignConsent;
};


// ============================================================
// ANALYTICS EVENT PAYLOAD
// ============================================================

export type CampaignEventPayload =
  Omit<CampaignSessionContext, "visitor_id"> & {
    /**
     * analytics_events.visitor_id é UUID NOT NULL.
     * Portanto qualquer evento analítico precisa dele.
     */
    visitor_id: string;

    /**
     * Este UUID será usado diretamente como
     * analytics_events.id.
     *
     * Isso também nos dá idempotência.
     */
    client_event_id: string;

    event_name: CampaignEventName;

    occurred_at: string;

    /**
     * Apenas metadados comportamentais.
     * Nunca colocar conteúdo textual do formulário aqui.
     */
    properties?: Record<string, unknown>;
  };


// ============================================================
// DECISION TYPES
// ============================================================

export const DECISION_TYPES = [
  "marketing",
  "operation",
  "expansion",
  "technology",
  "retention",
  "efficiency",
  "other",
] as const;

export type DecisionType =
  (typeof DECISION_TYPES)[number];


// ============================================================
// LEAD PAYLOAD
// ============================================================

export type LeadPayload =
  CampaignSessionContext & {
    /**
     * UUID único da submissão.
     *
     * É usado para:
     * - decision_leads.meta_lead_event_id
     * - analytics_events.id do form_submit
     * - Meta Pixel/CAPI event_id para deduplicação
     */
    meta_event_id: string;

    source_url: string;

    /**
     * Meta identifiers.
     * Só devem ser persistidos/enviados quando
     * marketing consent = true.
     */
    fbp?: string;
    fbc?: string;

    name: string;
    company: string;
    email: string;
    whatsapp?: string;

    decision: string;
    context: string;
    question: string;

    decision_type: DecisionType;

    systems?: string;
    urgency?: string;
  };


// ============================================================
// COMMERCIAL PIPELINE
// ============================================================

export const LEAD_STAGES = [
  "new",
  "oqp",
  "not_qualified",
  "contacted",
  "diagnostic_booked",
  "diagnostic_held",
  "proposal",
  "sprint_paid",
  "lost",
] as const;

export type LeadStage =
  (typeof LEAD_STAGES)[number];


// ============================================================
// LEAD STAGE API
// ============================================================

export type LeadStagePayload = {
  lead_id: string;
  stage: LeadStage;
  note?: string;
};