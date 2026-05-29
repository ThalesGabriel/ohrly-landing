import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { resolveCampaignRedirect } from "./resolveCampaignRedirect";

function createRequest(url: string, referer?: string) {
  return new NextRequest(url, {
    headers: referer
      ? {
          referer,
        }
      : undefined,
  });
}

function getLocation(response: Response | null) {
  return response?.headers.get("location");
}

describe("resolveCampaignRedirect", () => {
  it("does not redirect when campaign routing is disabled", () => {
    const request = createRequest(
      "http://localhost:3000/?utm_source=meta"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: false,
    });

    expect(response).toBeNull();
  });

  it("redirects Meta traffic from root to default ecommerce page", () => {
    const request = createRequest(
      "http://localhost:3000/",
      "https://www.facebook.com/"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(getLocation(response)).toContain("/pt/solutions/for-ecommerce");
    expect(getLocation(response)).toContain(
      "campaign_route=meta-ecommerce-default"
    );
  });

  it("preserves pt locale when redirecting from /pt", () => {
    const request = createRequest(
      "http://localhost:3000/pt",
      "https://www.instagram.com/"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(getLocation(response)).toContain("/pt/solutions/for-ecommerce");
  });

  it("preserves en locale when redirecting from /en", () => {
    const request = createRequest(
      "http://localhost:3000/en",
      "https://www.instagram.com/"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(getLocation(response)).toContain("/en/solutions/for-ecommerce");
  });

  it("does not redirect internal pages even when traffic comes from Meta", () => {
    const request = createRequest(
      "http://localhost:3000/pt/about",
      "https://www.facebook.com/"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(response).toBeNull();
  });

  it("uses utm_source=meta even without referer", () => {
    const request = createRequest(
      "http://localhost:3000/?utm_source=meta"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(getLocation(response)).toContain("/pt/solutions/for-ecommerce");
  });

  it("specific campaign route overrides default route by priority", () => {
    const request = createRequest(
      "http://localhost:3000/?utm_source=meta&utm_medium=paid_social&utm_campaign=ohrly_ecommerce_teste_01&utm_content=checkout_funcionando"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(getLocation(response)).toContain("/pt/lab/checkout");
    expect(getLocation(response)).toContain(
      "campaign_route=meta-checkout-lab-test"
    );
  });

  it("does not redirect LinkedIn traffic when only Meta route matches", () => {
    const request = createRequest(
      "http://localhost:3000/",
      "https://www.linkedin.com/"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(response).toBeNull();
  });

  it("does not redirect when UTM campaign does not match specific route", () => {
    const request = createRequest(
      "http://localhost:3000/?utm_source=meta&utm_campaign=another_campaign&utm_content=checkout_funcionando"
    );

    const response = resolveCampaignRedirect(request, {
      enabled: true,
    });

    expect(getLocation(response)).toContain(
      "campaign_route=meta-ecommerce-default"
    );
  });
});