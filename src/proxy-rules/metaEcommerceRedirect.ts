import { NextRequest, NextResponse } from "next/server";
import { getFeatureFlags } from "../feature-flags";

const META_REFERERS = [
  "facebook.com",
  "instagram.com",
  "l.facebook.com",
  "lm.facebook.com",
  "m.facebook.com",
];

const SUPPORTED_LOCALES = ["pt", "en"] as const;

function isMetaReferer(referer: string | null) {
  if (!referer) return false;

  try {
    const refererHost = new URL(referer).hostname;

    return META_REFERERS.some(
      (domain) => refererHost === domain || refererHost.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}

function getLocaleFromPathname(pathname: string) {
  const maybeLocale = pathname.split("/")[1];

  if (SUPPORTED_LOCALES.includes(maybeLocale as "pt" | "en")) {
    return maybeLocale;
  }

  return null;
}

function buildEcommerceRedirectUrl(request: NextRequest) {
  const url = request.nextUrl.clone();

  const locale = getLocaleFromPathname(url.pathname);

  url.pathname = locale
    ? `/${locale}/solutions/for-ecommerce`
    : "/pt/solutions/for-ecommerce";

  return url;
}

export function handleMetaEcommerceRedirect(request: NextRequest) {
  if (!getFeatureFlags().metaEcommerceRedirect) {
    return null;
  }

  const { pathname } = request.nextUrl;

  const locale = getLocaleFromPathname(pathname);

  const isRootHome = pathname === "/";
  const isLocaleHome = locale !== null && pathname === `/${locale}`;

  const shouldRedirect =
    (isRootHome || isLocaleHome) &&
    isMetaReferer(request.headers.get("referer"));

  if (!shouldRedirect) {
    return null;
  }

  return NextResponse.redirect(buildEcommerceRedirectUrl(request));
}