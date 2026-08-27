"use client";

import { trackMetaQualifiedVisit } from "@/lib/tracking/meta-pixel";
import { evaluateQualificationRule, matchesQualificationScope } from "./rules";
import type {
  QualificationObservation,
  QualificationPolicy,
} from "./types";
import type { ClientTrackingContext } from "@/lib/tracking/types";

let policyPromise: Promise<QualificationPolicy | null> | null = null;
let policyForPage: QualificationPolicy | null = null;
let policyLoadedForPage = false;
let emittedPolicyId: string | null = null;
let emitting = false;
let latestObservation: QualificationObservation | null = null;
const observedSignals = new Set<string>();

type EmittedQualification = {
  eventId: string;
  policyVersion: string;
  eventName: string;
  targetEvent: string;
  score: number;
  metaBrowserSent: boolean;
  metaServerDelivered: boolean;
};

let emittedQualification: EmittedQualification | null = null;

async function loadPolicy() {
  if (policyLoadedForPage) return policyForPage;

  if (!policyPromise) {
    policyPromise = fetch("/api/qualification/policy", {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
    })
      .then(async (response) => {
        if (!response.ok) return null;
        const body = (await response.json()) as {
          ok?: boolean;
          policy?: QualificationPolicy | null;
        };
        return body.ok ? body.policy || null : null;
      })
      .catch(() => null);
  }

  policyForPage = await policyPromise;
  policyLoadedForPage = true;
  return policyForPage;
}

function sendBrowserQualifiedVisitIfAllowed(context: ClientTrackingContext) {
  return;
  // if (!emittedQualification) return;
  // if (emittedQualification.metaBrowserSent) return;
  // if (!context.consent?.marketing) return;

  // trackMetaQualifiedVisit(
  //   emittedQualification.eventId,
  //   {
  //     policy_version: emittedQualification.policyVersion,
  //     quality_score: emittedQualification.score,
  //     target_event: emittedQualification.targetEvent,
  //   },
  //   emittedQualification.eventName,
  // );

  // emittedQualification.metaBrowserSent = true;
}

export async function flushQualifiedVisitToMeta(
  context: ClientTrackingContext,
) {
  if (!emittedQualification || !context.consent?.marketing) return;

  if (!emittedQualification.metaServerDelivered) {
    const response = await fetch("/api/qualification/meta", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        eventId: emittedQualification.eventId,
        tracking: context,
      }),
    }).catch(() => undefined);

    if (response?.ok) {
      const body = (await response.json().catch(() => null)) as
        | { delivered?: boolean; eventName?: string }
        | null;
      emittedQualification.metaServerDelivered = Boolean(body?.delivered);
      if (body?.eventName) {
        emittedQualification.eventName = body.eventName;
      }
    }
  }

  sendBrowserQualifiedVisitIfAllowed(context);
}

async function tryEmitQualification() {
  if (emitting || !latestObservation) return;

  const policy = await loadPolicy();
  if (!policy) return;
  if (emittedPolicyId === policy.id) return;

  const observation = latestObservation;

  if (!matchesQualificationScope(policy.scope, observation.context)) {
    return;
  }

  const decision = evaluateQualificationRule(policy.rules, observedSignals);
  if (!decision.qualified) return;

  emitting = true;

  try {
    const eventId = crypto.randomUUID();

    const response = await fetch("/api/qualification/emit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "same-origin",
      body: JSON.stringify({
        policyId: policy.id,
        policyVersion: policy.version,
        eventId,
        score: decision.score,
        matchedSignals: decision.matchedSignals,
        tracking: observation.context,
      }),
    });

    const body = (await response.json().catch(() => null)) as
      | {
          ok?: boolean;
          created?: boolean;
          qualified?: boolean;
          eventId?: string;
          eventName?: string;
          policyVersion?: string;
          score?: number;
          metaDelivered?: boolean;
        }
      | null;

    if (!response.ok || !body?.ok || !body.qualified) return;

    emittedPolicyId = policy.id;

    if (body.created && body.eventId) {
      emittedQualification = {
        eventId: body.eventId,
        eventName: body.eventName || policy.eventName,
        policyVersion: body.policyVersion || policy.version,
        targetEvent: policy.targetEvent,
        score: body.score ?? decision.score,
        metaBrowserSent: false,
        metaServerDelivered: Boolean(body.metaDelivered),
      };

      sendBrowserQualifiedVisitIfAllowed(observation.context);
    }
  } finally {
    emitting = false;
  }
}

export async function observeQualificationSignal(
  observation: QualificationObservation,
) {
  latestObservation = observation;
  observedSignals.add(observation.eventName);
  await tryEmitQualification();
}
