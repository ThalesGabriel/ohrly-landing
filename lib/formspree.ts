export type FormspreeLeadInput = {
  name: string;
  email: string;
  companySite: string;
  attentionMethod: string;
  customerCount: string;
  source: string;
  pageUrl: string;
  landingVariant: string;
  utm: Record<string, string | null | undefined>;
};

export async function sendFormspreeLead(
  input: FormspreeLeadInput,
) {
  const formId = process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    return {
      ok: false,
      skipped: true,
      reason: "formspree_not_configured",
    } as const;
  }

  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: input.pageUrl,
    },
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      company: input.companySite,

      attention_method: input.attentionMethod,
      customer_count: input.customerCount,

      source: input.source,
      landing_variant: input.landingVariant,
      page_url: input.pageUrl,

      ...input.utm,

      _subject: "Novo lead — Ohrly Account Attention",
    }),
    cache: "no-store",
  });

  const body = await response.json().catch(() => null);

  return {
    ok: response.ok,
    skipped: false,
    status: response.status,
    body,
  } as const;
}
