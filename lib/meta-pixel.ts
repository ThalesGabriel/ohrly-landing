export function trackMetaLead(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (typeof window.fbq !== "function") {
    return false;
  }

  window.fbq("track", "Lead");

  return true;
}
