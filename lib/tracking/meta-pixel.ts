"use client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

let initialized = false;

export function ensureMetaPixel() {
  if (typeof window === "undefined") return false;

  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId) return false;

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      const self = fbq as typeof fbq & {
        callMethod?: (...innerArgs: unknown[]) => void;
        queue: unknown[][];
      };

      if (self.callMethod) {
        self.callMethod(...args);
      } else {
        self.queue.push(args);
      }
    } as typeof window.fbq & {
      queue: unknown[][];
      loaded?: boolean;
      version?: string;
    };

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
  window.fbq?.("track", "Lead", customData, { eventID: eventId });
}
