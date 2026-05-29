export type FeatureFlags = {
  campaignRouting: boolean;
  metaEcommerceRedirect: boolean;
};

export function getFeatureFlags(): FeatureFlags {
  return {
    campaignRouting: process.env.ENABLE_CAMPAIGN_ROUTING === "true",
    metaEcommerceRedirect:
      process.env.ENABLE_META_ECOMMERCE_REDIRECT === "true",
  };
}