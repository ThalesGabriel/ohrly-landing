"use client";

import { readConsent } from "@/lib/campaign/consent";

export function trackMetaLead(eventId: string) {
  if (typeof window === "undefined") return;
  if (!readConsent().marketing || !window.fbq) return;
  window.fbq("track", "Lead", {}, { eventID: eventId });
}
