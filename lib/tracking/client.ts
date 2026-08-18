"use client";

import { getConsent } from "./consent";
import { observeQualificationSignal } from "@/lib/qualification/client";
import type {
  Attribution,
  ClientTrackingContext,
  TrackingMode,
} from "./types";

const VISITOR_KEY = "ohrly_visitor_id_v1";
const SESSION_KEY = "ohrly_session_id_v1";
const FBC_KEY = "ohrly_fbc_v1";

let ephemeralPageId: string | null = null;
let pageTrackingMode: TrackingMode | null = null;

function uuid() {
  return crypto.randomUUID();
}

function getEphemeralPageId() {
  if (!ephemeralPageId) {
    ephemeralPageId = uuid();
  }

  return ephemeralPageId;
}

function getPageTrackingMode(): TrackingMode {
  if (!pageTrackingMode) {
    pageTrackingMode = getConsent()?.analytics
      ? "consented"
      : "essential";
  }

  return pageTrackingMode;
}

function readOrCreate(storage: Storage, key: string, fallback?: string) {
  const current = storage.getItem(key);
  if (current) return current;

  const created = fallback || uuid();
  storage.setItem(key, created);

  return created;
}

function queryValue(params: URLSearchParams, ...keys: string[]) {
  for (const key of keys) {
    const value = params.get(key);
    if (value) return value;
  }

  return null;
}

function cookie(name: string) {
  const prefix = `${name}=`;

  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  return match
    ? decodeURIComponent(match.slice(prefix.length))
    : null;
}

function createOrReadFbc(fbclid: string | null) {
  if (!fbclid) return null;

  const existing = window.sessionStorage.getItem(FBC_KEY);
  if (existing) return existing;

  const created = `fb.1.${Date.now()}.${fbclid}`;

  window.sessionStorage.setItem(FBC_KEY, created);

  return created;
}

function deviceType(): ClientTrackingContext["deviceType"] {
  const width = window.innerWidth;

  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";

  return "desktop";
}

function referrerHost(referrer: string | null) {
  if (!referrer) return null;

  try {
    return new URL(referrer).hostname;
  } catch {
    return null;
  }
}

export function getAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || null;

  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    utm_term: params.get("utm_term"),
    utm_placement: params.get("utm_placement"),

    fbclid: params.get("fbclid"),

    meta_campaign_id: queryValue(
      params,
      "meta_campaign_id",
      "campaign_id",
    ),

    meta_adset_id: queryValue(
      params,
      "meta_adset_id",
      "adset_id",
    ),

    meta_ad_id: queryValue(
      params,
      "meta_ad_id",
      "ad_id",
    ),

    referrer,
    referrer_host: referrerHost(referrer),
  };
}

export function getClientTrackingContext(): ClientTrackingContext {
  const consent = getConsent();
  const trackingMode = getPageTrackingMode();

  const ephemeralId = getEphemeralPageId();

  const visitorId =
    trackingMode === "consented"
      ? readOrCreate(window.localStorage, VISITOR_KEY)
      : ephemeralId;

  const sessionId =
    trackingMode === "consented"
      ? readOrCreate(
          window.sessionStorage,
          SESSION_KEY,
          ephemeralId,
        )
      : ephemeralId;

  const attribution = getAttribution();

  const marketingAllowed = Boolean(consent?.marketing);

  return {
    visitorId,
    sessionId,
    trackingMode,

    landingVariant:
      process.env.NEXT_PUBLIC_OHRLY_LANDING_VARIANT ||
      "behavioral_signal_trial_lp_v1",

    pageUrl: window.location.href,

    // Não persistimos query string no page_path.
    pagePath: window.location.pathname,

    deviceType: deviceType(),

    attribution,
    consent,

    fbp: marketingAllowed ? cookie("_fbp") : null,

    fbc: marketingAllowed
      ? cookie("_fbc") ||
        createOrReadFbc(attribution.fbclid)
      : null,
  };
}

export async function trackBehavior(
  eventName: string,
  properties: Record<string, unknown> = {},
  options?: {
    keepalive?: boolean;
    clientEventId?: string;
  },
) {
  const context = getClientTrackingContext();

  const clientEventId =
    options?.clientEventId || uuid();

  const response = await fetch("/api/analytics", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      ...context,

      eventName,
      clientEventId,

      properties,
    }),

    credentials: "same-origin",

    keepalive: options?.keepalive,
  }).catch(() => undefined);

  if (response?.ok) {
    void observeQualificationSignal({
      eventName,
      properties,
      clientEventId,
      context,
    }).catch(() => undefined);
  }

  return clientEventId;
}
