"use client";

import type { ConsentState } from "./types";

export const CONSENT_STORAGE_KEY = "ohrly_consent_v1";
export const CONSENT_CHANGED_EVENT = "ohrly:consent-changed";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(input: Pick<ConsentState, "analytics" | "marketing">) {
  if (typeof window === "undefined") return;

  const value: ConsentState = {
    ...input,
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: value }));
}
