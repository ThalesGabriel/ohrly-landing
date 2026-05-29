import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

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

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = getLocaleFromPathname(pathname);

  const isRootHome = pathname === "/";
  const isLocaleHome = locale !== null && pathname === `/${locale}`;

  const shouldRedirectFromMeta =
    (isRootHome || isLocaleHome) &&
    isMetaReferer(request.headers.get("referer"));

  if (shouldRedirectFromMeta) {
    const url = request.nextUrl.clone();

    url.pathname = locale ? `/${locale}/for-ecommerce` : "/pt/for-ecommerce";

    return NextResponse.redirect(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};