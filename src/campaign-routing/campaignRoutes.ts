export type CampaignSource = "meta" | "linkedin" | "google" | "direct";

export type CampaignRoute = {
  id: string;
  enabled: boolean;
  priority: number;

  source: CampaignSource;

  /**
   * Paths where this rule is allowed to run.
   * Example: ["/", "/pt", "/en"]
   */
  matchPaths: string[];

  /**
   * Optional UTM campaign filter.
   * If provided, this rule only applies when utm_campaign matches.
   */
  utmCampaign?: string;

  /**
   * Optional UTM content filter.
   */
  utmContent?: string;

  /**
   * Target path by locale.
   */
  redirectTo: {
    pt: string;
    en: string;
    fallback: string;
  };

  /**
   * Optional date window.
   */
  startsAt?: string;
  endsAt?: string;
};

export const campaignRoutes: CampaignRoute[] = [
  {
    id: "meta-ecommerce-default",
    enabled: false,
    priority: 10,
    source: "meta",
    matchPaths: ["/", "/pt", "/en"],
    redirectTo: {
      pt: "/pt/solutions/for-ecommerce",
      en: "/en/solutions/for-ecommerce",
      fallback: "/pt/solutions/for-ecommerce",
    },
  },
  {
    id: "meta-checkout-lab-test",
    enabled: false,
    priority: 20,
    source: "meta",
    matchPaths: ["/", "/pt", "/en"],
    utmCampaign: "ohrly_ecommerce_teste_01",
    utmContent: "checkout_funcionando",
    redirectTo: {
      pt: "/pt/lab/checkout",
      en: "/en/lab/checkout",
      fallback: "/pt/lab/checkout",
    },
  },
];