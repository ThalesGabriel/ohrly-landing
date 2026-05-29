import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { resolveCampaignRedirect } from "./src/campaign-routing/resolveCampaignRedirect";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const campaignRedirect = resolveCampaignRedirect(request);

  if (campaignRedirect) {
    return campaignRedirect;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};