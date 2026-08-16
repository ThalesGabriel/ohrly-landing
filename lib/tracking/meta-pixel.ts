"use client";

type MetaFbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    fbq?: MetaFbq;
    _fbq?: MetaFbq;
  }
}

let initialized = false;

export function ensureMetaPixel() {
  if (typeof window === "undefined") return false;

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return false;

  if (!window.fbq) {
    const fbq = ((...args: unknown[]) => {
      const current = window.fbq;

      if (current?.callMethod) {
        current.callMethod(...args);
      } else {
        current?.queue.push(args);
      }
    }) as MetaFbq;

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";

    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  if (!initialized) {
    window.fbq?.("init", pixelId);
    window.fbq?.("track", "PageView");
    initialized = true;
  }

  return true;
}

export function trackMetaLead(
  eventId: string,
  customData: Record<string, unknown> = {},
) {
  if (!ensureMetaPixel()) return;

  window.fbq?.("track", "Lead", customData, {
    eventID: eventId,
  });
}

export function trackMetaDemoStart(
  eventId: string,
  customData: Record<string, unknown> = {},
) {
  if (!ensureMetaPixel()) return;

  window.fbq?.("trackCustom", "DemoStart", customData, {
    eventID: eventId,
  });
}

export function trackMetaEngaged10s(
  eventId: string,
  customData: Record<string, unknown> = {},
) {
  if (!ensureMetaPixel()) return;

  window.fbq?.(
    "trackCustom",
    "Engaged10s",
    customData,
    {
      eventID: eventId,
    },
  );
}


export function trackMetaQualifiedVisit(
  eventId: string,
  customData: Record<string, unknown> = {},
  eventName =
    process.env.NEXT_PUBLIC_META_QUALIFIED_VISIT_EVENT_NAME ||
    "QualifiedVisit",
) {
  if (!ensureMetaPixel()) return;

  window.fbq?.(
    "trackCustom",
    eventName,
    customData,
    { eventID: eventId },
  );
}
