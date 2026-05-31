export type MetaPixelEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (
      command: "track" | "trackCustom",
      eventName: string,
      params?: MetaPixelEventParams
    ) => void;
  }
}

export function trackMetaEvent(
  eventName: string,
  params?: MetaPixelEventParams
) {
  if (typeof window === "undefined") return;

  if (typeof window.fbq !== "function") return;

  window.fbq("trackCustom", eventName, params);
}