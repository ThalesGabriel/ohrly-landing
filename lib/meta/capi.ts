import { createHash } from "node:crypto";

type Input = {
  eventName: string;
  eventId: string;
  eventSourceUrl?: string;
  email?: string;
  phone?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbp?: string;
  fbc?: string;
  customData?: Record<string, unknown>;
};

function sha256(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function normalizePhone(value?: string) {
  const digits = value?.replace(/\D/g, "");
  return digits || undefined;
}

export async function sendMetaServerEvent(input: Input) {
  const datasetId = process.env.META_DATASET_ID;
  const accessToken = process.env.META_ACCESS_TOKEN;
  const version = process.env.META_GRAPH_API_VERSION;

  if (!datasetId || !accessToken || !version) {
    return { skipped: true } as const;
  }

  const email = input.email?.trim().toLowerCase();
  const phone = normalizePhone(input.phone);

  const user_data = Object.fromEntries(
    Object.entries({
      em: email ? [sha256(email)] : undefined,
      ph: phone ? [sha256(phone)] : undefined,
      client_ip_address: input.clientIpAddress,
      client_user_agent: input.clientUserAgent,
      fbp: input.fbp,
      fbc: input.fbc,
    }).filter(([, value]) => value !== undefined && value !== "")
  );

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: input.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: input.eventId,
        action_source: "website",
        event_source_url: input.eventSourceUrl,
        user_data,
        custom_data: input.customData || {},
      },
    ],
  };

  if (process.env.META_TEST_EVENT_CODE) {
    body.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  const endpoint =
    `https://graph.facebook.com/${encodeURIComponent(version)}/` +
    `${encodeURIComponent(datasetId)}/events?access_token=` +
    encodeURIComponent(accessToken);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const text = await response.text();

  if (!response.ok) {
    console.error("Meta CAPI error:", response.status, text);
    return { skipped: false, ok: false, status: response.status } as const;
  }

  return { skipped: false, ok: true, status: response.status } as const;
}
