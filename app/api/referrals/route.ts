import { NextResponse } from "next/server";

type ReferralBody = {
  referrerName?: string;
  referrerEmail?: string;
  referredCompany?: string | null;
  context?: string | null;
  introductionMode?: "intro" | "already_introduced" | "share";
  source?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  if (!normalized) return null;
  return normalized.slice(0, maxLength);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReferralBody;

    const referrerName = clean(body.referrerName, 160);
    const referrerEmail = clean(body.referrerEmail, 320)?.toLowerCase() ?? null;
    const referredCompany = clean(body.referredCompany, 240);
    const context = clean(body.context, 2000);
    const introductionMode =
      body.introductionMode === "already_introduced" ||
      body.introductionMode === "share"
        ? body.introductionMode
        : "intro";

    if (!referrerName || !referrerEmail || !EMAIL_RE.test(referrerEmail)) {
      return NextResponse.json(
        {
          ok: false,
          error: "Nome e e-mail válidos são obrigatórios.",
        },
        { status: 400 },
      );
    }

    const supabaseUrl =
      process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "O cadastro de indicações ainda não foi configurado no servidor.",
        },
        { status: 503 },
      );
    }

    const source = body.source ?? {};

    const payload = {
      referrer_name: referrerName,
      referrer_email: referrerEmail,
      referred_company: referredCompany,
      context,
      introduction_mode: introductionMode,
      utm_source: clean(source.utm_source, 180),
      utm_medium: clean(source.utm_medium, 180),
      utm_campaign: clean(source.utm_campaign, 240),
      utm_content: clean(source.utm_content, 240),
      utm_term: clean(source.utm_term, 240),
      incoming_referral_code: clean(source.ref, 120),
      reward_percent: 20,
      reward_basis: "first_payment",
      status: "new",
    };

    const response = await fetch(`${supabaseUrl}/rest/v1/referrals`, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Referral insert failed", {
        status: response.status,
        message:
          Array.isArray(result) && result[0]?.message
            ? result[0].message
            : result?.message,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "Não foi possível registrar a indicação.",
        },
        { status: 500 },
      );
    }

    const inserted = Array.isArray(result) ? result[0] : result;

    if (!inserted?.referral_code) {
      return NextResponse.json(
        {
          ok: false,
          error: "A indicação foi registrada sem um código de referência.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        referralCode: inserted.referral_code,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Referral API error", error);

    return NextResponse.json(
      {
        ok: false,
        error: "Não foi possível registrar a indicação.",
      },
      { status: 500 },
    );
  }
}
