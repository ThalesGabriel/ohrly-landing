import crypto from "node:crypto";

function sha256(value: string) {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

type MetaWebsiteEventInput = {
  eventName: string;
  eventId: string;
  pageUrl: string;
  email?: string | null;
  visitorId?: string | null;
  ipAddress?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  customData?: Record<string, unknown>;
};

async function sendMetaWebsiteEvent(input: MetaWebsiteEventInput) {
  const datasetId = process.env.META_DATASET_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  const apiVersion = process.env.META_GRAPH_API_VERSION;

  if (!datasetId || !accessToken || !apiVersion) {
    return {
      ok: false,
      skipped: true,
      reason: "meta_not_configured",
    } as const;
  }

  const userData: Record<string, unknown> = {};

  if (input.email) userData.em = [sha256(input.email)];
  if (input.visitorId) userData.external_id = [sha256(input.visitorId)];
  if (input.ipAddress) userData.client_ip_address = input.ipAddress;
  if (input.userAgent) userData.client_user_agent = input.userAgent;
  if (input.fbp) userData.fbp = input.fbp;
  if (input.fbc) userData.fbc = input.fbc;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_source_url: input.pageUrl,
        event_id: input.eventId,
        action_source: "website",
        user_data: userData,
        custom_data: input.customData || {},
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const response = await fetch(
    `https://graph.facebook.com/${apiVersion}/${datasetId}/events?access_token=${encodeURIComponent(
      accessToken,
    )}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    },
  );

  const body = await response.json().catch(() => null);

  return {
    ok: response.ok,
    skipped: false,
    status: response.status,
    body,
  } as const;
}

export type MetaLeadInput = {
  eventId: string;
  email: string;
  visitorId?: string | null;
  pageUrl: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  landingVariant: string;
  usesIntercom: string;
  customerCount: string;
};

export async function sendMetaLead(input: MetaLeadInput) {
  return sendMetaWebsiteEvent({
    eventName: "QualifiedVisit",
    eventId: input.eventId,
    email: input.email,
    visitorId: input.visitorId,
    pageUrl: input.pageUrl,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    fbp: input.fbp,
    fbc: input.fbc,
    customData: {
      landing_variant: input.landingVariant,
      uses_intercom: input.usesIntercom,
      customer_count: input.customerCount,
      source: "ohrly_account_attention_lp",
    },
  });
}

export type MetaQualifiedVisitInput = {
  eventName?: string;
  eventId: string;
  visitorId?: string | null;
  pageUrl: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  fbp?: string | null;
  fbc?: string | null;
  policyVersion: string;
  score: number;
  targetEvent: string;
  landingVariant?: string | null;
};

export async function sendMetaQualifiedVisit(
  input: MetaQualifiedVisitInput,
) {
  return sendMetaWebsiteEvent({
    eventName:
      input.eventName ||
      process.env.META_QUALIFIED_VISIT_EVENT_NAME ||
      "QualifiedVisit",
    eventId: input.eventId,
    visitorId: input.visitorId,
    pageUrl: input.pageUrl,
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    fbp: input.fbp,
    fbc: input.fbc,
    customData: {
      policy_version: input.policyVersion,
      quality_score: input.score,
      target_event: input.targetEvent,
      landing_variant: input.landingVariant || null,
      source: "ohrly_signal_controller",
    },
  });
}
