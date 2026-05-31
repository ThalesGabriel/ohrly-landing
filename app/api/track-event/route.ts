import { NextRequest, NextResponse } from "next/server";

type TrackEventPayload = {
  eventName?: string;
  page?: string;
  source?: string;
  offer?: string;
  contact_method?: string;
  metadata?: Record<string, unknown>;
};

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as TrackEventPayload;

    const eventName = payload.eventName ?? "unknown_event";

    console.log(
      JSON.stringify({
        marker: "OHRLY_LP_EVENT",
        eventName,
        page: payload.page ?? null,
        source: payload.source ?? null,
        offer: payload.offer ?? null,
        contact_method: payload.contact_method ?? null,
        metadata: payload.metadata ?? {},
        userAgent: request.headers.get("user-agent"),
        referer: request.headers.get("referer"),
        ip:
          request.headers.get("x-forwarded-for") ??
          request.headers.get("x-real-ip") ??
          null,
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(
      JSON.stringify({
        marker: "OHRLY_LP_EVENT_ERROR",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      })
    );

    return NextResponse.json({ ok: false }, { status: 400 });
  }
}