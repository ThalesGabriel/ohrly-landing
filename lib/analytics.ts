type AnalyticsProperties = Record<string, unknown>;

type Attribution = {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
};

const VISITOR_KEY = "ohrly_visitor_id";
const SESSION_KEY = "ohrly_session_id";
const ATTRIBUTION_KEY = "ohrly_first_attribution";

function getOrCreateId(
  storage: Storage,
  key: string,
): string {
  const existing = storage.getItem(key);

  if (existing) {
    return existing;
  }

  const id = crypto.randomUUID();
  storage.setItem(key, id);

  return id;
}

function readAttribution(): Attribution {
  const params = new URLSearchParams(
    window.location.search,
  );

  const incoming: Attribution = {
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
    utmContent: params.get("utm_content") ?? "",
    utmTerm: params.get("utm_term") ?? "",
  };

  const hasIncomingAttribution = Object.values(
    incoming,
  ).some(Boolean);

  if (hasIncomingAttribution) {
    localStorage.setItem(
      ATTRIBUTION_KEY,
      JSON.stringify(incoming),
    );

    return incoming;
  }

  try {
    const stored = localStorage.getItem(
      ATTRIBUTION_KEY,
    );

    return stored
      ? (JSON.parse(stored) as Attribution)
      : incoming;
  } catch {
    return incoming;
  }
}

function getReferrerHost(): string {
  if (!document.referrer) {
    return "";
  }

  try {
    return new URL(document.referrer).hostname;
  } catch {
    return "";
  }
}

export function trackEvent(
  eventName: string,
  properties: AnalyticsProperties = {},
): void {
  if (
    typeof window === "undefined" ||
    isAnalyticsDisabled()
  ) {
    return;
  }

  const visitorId = getOrCreateId(
    localStorage,
    VISITOR_KEY,
  );

  const sessionId = getOrCreateId(
    sessionStorage,
    SESSION_KEY,
  );

  const payload = {
    eventName,
    visitorId,
    sessionId,
    pagePath: window.location.pathname,
    landingVariant: "churn_target_v2",
    attribution: readAttribution(),
    referrerHost: getReferrerHost(),
    properties,
  };

  void fetch("/api/analytics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch((error) => {
    console.warn(
      `Analytics event failed: ${eventName}`,
      error,
    );
  });
}

const ANALYTICS_OPT_OUT_KEY =
  "ohrly_analytics_opt_out";

export function disableAnalytics(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    ANALYTICS_OPT_OUT_KEY,
    "true",
  );
}

export function enableAnalytics(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(
    ANALYTICS_OPT_OUT_KEY,
  );
}

function isAnalyticsDisabled(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  return (
    localStorage.getItem(
      ANALYTICS_OPT_OUT_KEY,
    ) === "true"
  );
}