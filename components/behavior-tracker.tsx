"use client";

import { useEffect } from "react";
import {
  CONSENT_CHANGED_EVENT,
  getConsent,
} from "@/lib/tracking/consent";

import { getClientTrackingContext, trackBehavior } from "@/lib/tracking/client";
import { flushQualifiedVisitToMeta } from "@/lib/qualification/client";
import { 
  ensureMetaPixel,
  trackMetaEngaged10s
} from "@/lib/tracking/meta-pixel";

const DEPTHS = [25, 50, 75, 90];

const ENGAGEMENT_TIMERS = [
  [1_000, "lp_engaged_1s"],
  [3_000, "lp_engaged_3s"],
  [5_000, "lp_engaged_5s"],
  [10_000, "lp_engaged_10s"],
] as const;

export function BehaviorTracker() {
  useEffect(() => {
    const sentSections = new Set<string>();
    const sentDepths = new Set<number>();

    const startedFormRuns = new Set<string>();
    const startedFields = new Set<string>();

    let engaged10Reached = false;
    let engaged10EventId: string | null = null;
    let metaEngaged10Sent = false;

    function sendMetaEngaged10IfAllowed() {
      if (!engaged10Reached) return;
      if (metaEngaged10Sent) return;
      if (!getConsent()?.marketing) return;
    
      const eventId = engaged10EventId;
    
      if (!eventId) return;
    
      trackMetaEngaged10s(eventId, {
        page: "landing",
        engagement_seconds: 10,
      });
    
      metaEngaged10Sent = true;
    }

    function activateMarketing() {
      if (!getConsent()?.marketing) return;

      ensureMetaPixel();
      sendMetaEngaged10IfAllowed();
      void flushQualifiedVisitToMeta(
        getClientTrackingContext(),
      ).catch(() => undefined);
    }

    //
    // PAGE VIEW
    //
    void trackBehavior("lp_view");

    //
    // ENGAGEMENT
    //
    const engagementTimers = ENGAGEMENT_TIMERS.map(
      ([delay, eventName]) =>
        window.setTimeout(() => {
          if (
            document.visibilityState !== "visible"
          ) {
            return;
          }
    
          if (eventName === "lp_engaged_10s") {
            const clientEventId =
              crypto.randomUUID();
    
            engaged10Reached = true;
            engaged10EventId = clientEventId;
    
            void trackBehavior(
              "lp_engaged_10s",
              {
                engagement_seconds: 10,
              },
              {
                clientEventId,
              },
            );
    
            sendMetaEngaged10IfAllowed();
    
            return;
          }
    
          void trackBehavior(eventName);
        }, delay),
    );

    //
    // SECTIONS
    //
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const element =
            entry.target as HTMLElement;

          const section =
            element.dataset.analyticsSection;

          if (!section) continue;

          if (sentSections.has(section)) continue;

          sentSections.add(section);

          void trackBehavior(
            "section_view",
            { section },
          );

          if (
            section === "trial_form_card" ||
            section === "diagnostic_form_card"
          ) {
            void trackBehavior(
              "form_view",
              { section },
            );
          }
        }
      },
      {
        threshold: 0.45,
      },
    );

    document
      .querySelectorAll<HTMLElement>(
        "[data-analytics-section]",
      )
      .forEach((element) => {
        sectionObserver.observe(element);
      });

    //
    // CTA
    //
    function onClick(event: MouseEvent) {
      const target =
        event.target as HTMLElement | null;

      const cta =
        target?.closest<HTMLElement>(
          "[data-analytics-cta]",
        );

      if (!cta) return;

      void trackBehavior("cta_click", {
        location:
          cta.dataset.analyticsLocation || null,

        ctaId:
          cta.dataset.analyticsCta || null,

        label:
          cta.dataset.analyticsLabel ||
          cta.textContent?.trim() ||
          null,
      });
    }

    //
    // FORM
    //
    // form_start deve representar interação real, não autofocus.
    function onFormInteraction(event: Event) {
      const target =
        event.target as
          | HTMLInputElement
          | HTMLSelectElement
          | HTMLTextAreaElement
          | null;

      const form =
        target?.closest<HTMLElement>(
          "[data-analytics-form]",
        );

      if (!form) return;

      const formId =
        form.dataset.analyticsForm || "form";

      const formJourneyContext = {
        journeyStage: form.dataset.journeyStage || null,
        demoId: form.dataset.demoId || null,
        demoRunId: form.dataset.demoRunId || null,
        entrySourceCtaId: form.dataset.entrySourceCtaId || null,
        entrySourceLocation: form.dataset.entrySourceLocation || null,
        selectedAccount: form.dataset.selectedAccount || null,
        selectedAction: form.dataset.selectedAction || null,
      };

      const formRunKey =
        formJourneyContext.demoRunId || `${formId}:default`;

      if (!startedFormRuns.has(formRunKey)) {
        startedFormRuns.add(formRunKey);

        void trackBehavior(
          "form_start",
          { formId, ...formJourneyContext },
        );
      }

      const fieldRunKey = target?.name
        ? `${formRunKey}:${target.name}`
        : null;

      if (
        target?.name &&
        fieldRunKey &&
        !startedFields.has(fieldRunKey)
      ) {
        startedFields.add(fieldRunKey);

        void trackBehavior(
          "form_field_started",
          {
            formId,
            ...formJourneyContext,
            field: target.name,
          },
        );
      }
    }

    //
    // SCROLL
    //
    function onScroll() {
      const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (scrollable <= 0) return;

      const depth = Math.min(
        100,
        Math.round(
          (window.scrollY / scrollable) * 100,
        ),
      );

      for (const target of DEPTHS) {
        if (
          depth >= target &&
          !sentDepths.has(target)
        ) {
          sentDepths.add(target);

          void trackBehavior(
            `scroll_${target}`,
            {
              scrollDepth: target,
            },
          );
        }
      }
    }

    activateMarketing();

    function onConsentChanged() {
      activateMarketing();
    }

    window.addEventListener(
      CONSENT_CHANGED_EVENT,
      onConsentChanged,
    );

    document.addEventListener(
      "click",
      onClick,
    );

    document.addEventListener(
      "input",
      onFormInteraction,
    );

    document.addEventListener(
      "change",
      onFormInteraction,
    );

    window.addEventListener(
      "scroll",
      onScroll,
      { passive: true },
    );

    return () => {
      for (const timer of engagementTimers) {
        window.clearTimeout(timer);
      }

      sectionObserver.disconnect();

      window.removeEventListener(
        CONSENT_CHANGED_EVENT,
        onConsentChanged,
      );

      document.removeEventListener(
        "click",
        onClick,
      );

      document.removeEventListener(
        "input",
        onFormInteraction,
      );

      document.removeEventListener(
        "change",
        onFormInteraction,
      );

      window.removeEventListener(
        "scroll",
        onScroll,
      );
    };
  }, []);

  return null;
}
