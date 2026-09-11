export type FormspreeLeadInput = {
  email: string;

  companySite?: string | null;

  changeType?: string | null;

  rolloutStage?: string | null;

  source: string;

  pageUrl: string;

  landingVariant: string;

  utm: Record<
    string,
    string | null | undefined
  >;
};

export async function sendFormspreeLead(
  input: FormspreeLeadInput,
) {
  const formId =
    process.env.FORMSPREE_FORM_ID;

  if (!formId) {
    return {
      ok: false,
      skipped: true,
      reason:
        "formspree_not_configured",
    } as const;
  }

  const response =
    await fetch(
      `https://formspree.io/f/${formId}`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          Accept:
            "application/json",

          Referer:
            input.pageUrl,
        },

        body: JSON.stringify({
          email:
            input.email,

          company:
            input.companySite || undefined,

          change_type:
            input.changeType || undefined,

          rollout_stage:
            input.rolloutStage || undefined,

          source:
            input.source,

          landing_variant:
            input.landingVariant,

          page_url:
            input.pageUrl,

          ...input.utm,

          _subject:
            "Novo lead — Ohrly Change Monitor",
        }),

        cache: "no-store",
      },
    );

  const body =
    await response
      .json()
      .catch(() => null);

  return {
    ok: response.ok,
    skipped: false,
    status: response.status,
    body,
  } as const;
}