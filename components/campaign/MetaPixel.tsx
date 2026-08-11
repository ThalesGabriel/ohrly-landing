"use client";

import { useEffect } from "react";
import {
  CONSENT_EVENT,
  readConsent,
} from "@/lib/campaign/consent";
import type { CampaignConsent } from "@/lib/campaign/types";

const SCRIPT_ID = "ohrly-meta-pixel";

function ensurePixel(pixelId: string) {
  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue?.push(args);
    } as MetaFbq;

    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;
  }

  if (!document.getElementById(SCRIPT_ID)) {
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  window.fbq?.("init", pixelId);
  window.fbq?.("track", "PageView");
}

export function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (!pixelId) return;

    let initialized = false;

    const sync = (consent: CampaignConsent) => {
      if (consent.marketing && !initialized) {
        initialized = true;
        ensurePixel(pixelId);
      }
      if (!consent.marketing && initialized) {
        window.fbq?.("consent", "revoke");
      }
    };

    sync(readConsent());

    const onConsent = (event: Event) => {
      sync((event as CustomEvent<CampaignConsent>).detail);
    };

    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, [pixelId]);

  return null;
}
