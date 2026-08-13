export type ConsentState = {
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type Attribution = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  fbclid: string | null;
  meta_campaign_id: string | null;
  meta_adset_id: string | null;
  meta_ad_id: string | null;
  referrer: string | null;
  referrer_host: string | null;
};

export type ClientTrackingContext = {
  visitorId: string;
  sessionId: string;
  landingVariant: string;
  pageUrl: string;
  pagePath: string;
  deviceType: "mobile" | "tablet" | "desktop";
  attribution: Attribution;
  consent: ConsentState | null;
  fbp: string | null;
  fbc: string | null;
};
