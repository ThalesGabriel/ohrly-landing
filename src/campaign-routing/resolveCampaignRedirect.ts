import { NextRequest, NextResponse } from "next/server";
import { campaignRoutes, CampaignRoute, CampaignSource } from "./campaignRoutes";

const SUPPORTED_LOCALES = ["pt", "en"] as const;

const META_REFERERS = [
  "facebook.com",
  "instagram.com",
  "l.facebook.com",
  "lm.facebook.com",
  "m.facebook.com",
];

const LINKEDIN_REFERERS = ["linkedin.com", "lnkd.in"];
const GOOGLE_REFERERS = ["google.com", "google.com.br"];

type ResolveCampaignRedirectOptions = {
  enabled?: boolean;
  now?: Date;
};

function getLocaleFromPathname(pathname: string) {
  const maybeLocale = pathname.split("/")[1];

  if (SUPPORTED_LOCALES.includes(maybeLocale as "pt" | "en")) {
    return maybeLocale as "pt" | "en";
  }

  return null;
}

function hostMatches(hostname: string, domains: string[]) {
  return domains.some(
    (domain) => hostname === domain || hostname.endsWith(`.${domain}`)
  );
}

function getRefererHost(request: NextRequest) {
  const referer = request.headers.get("referer");

  if (!referer) return null;

  try {
    return new URL(referer).hostname;
  } catch {
    return null;
  }
}

function detectSource(request: NextRequest): CampaignSource {
  const utmSource = request.nextUrl.searchParams.get("utm_source");
  const refererHost = getRefererHost(request);

  if (utmSource === "meta") return "meta";
  if (utmSource === "linkedin") return "linkedin";
  if (utmSource === "google") return "google";

  if (!refererHost) return "direct";

  if (hostMatches(refererHost, META_REFERERS)) return "meta";
  if (hostMatches(refererHost, LINKEDIN_REFERERS)) return "linkedin";
  if (hostMatches(refererHost, GOOGLE_REFERERS)) return "google";

  return "direct";
}

function isInsideDateWindow(route: CampaignRoute, now: Date) {
  if (route.startsAt && now < new Date(route.startsAt)) {
    return false;
  }

  if (route.endsAt && now > new Date(route.endsAt)) {
    return false;
  }

  return true;
}

function matchesRoute(request: NextRequest, route: CampaignRoute, now: Date) {
  if (!route.enabled) return false;

  const { pathname, searchParams } = request.nextUrl;

  if (!route.matchPaths.includes(pathname)) {
    return false;
  }

  if (!isInsideDateWindow(route, now)) {
    return false;
  }

  const source = detectSource(request);

  if (source !== route.source) {
    return false;
  }

  if (route.utmCampaign) {
    const utmCampaign = searchParams.get("utm_campaign");

    if (utmCampaign !== route.utmCampaign) {
      return false;
    }
  }

  if (route.utmContent) {
    const utmContent = searchParams.get("utm_content");

    if (utmContent !== route.utmContent) {
      return false;
    }
  }

  return true;
}

function getRedirectPath(request: NextRequest, route: CampaignRoute) {
  const locale = getLocaleFromPathname(request.nextUrl.pathname);

  if (locale) {
    return route.redirectTo[locale];
  }

  return route.redirectTo.fallback;
}

export function resolveCampaignRedirect(
  request: NextRequest,
  options: ResolveCampaignRedirectOptions = {}
) {
  const enabled =
    options.enabled ?? process.env.ENABLE_CAMPAIGN_ROUTING === "true";

  if (!enabled) {
    return null;
  }

  const now = options.now ?? new Date();

  const matchedRoute = campaignRoutes
    .filter((route) => matchesRoute(request, route, now))
    .sort((a, b) => b.priority - a.priority)[0];

  if (!matchedRoute) {
    return null;
  }

  const url = request.nextUrl.clone();

  url.pathname = getRedirectPath(request, matchedRoute);
  url.searchParams.set("campaign_route", matchedRoute.id);

  return NextResponse.redirect(url);
}