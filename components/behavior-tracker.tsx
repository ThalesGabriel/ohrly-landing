"use client";

import { useEffect } from "react";
import { CONSENT_CHANGED_EVENT, getConsent } from "@/lib/tracking/consent";
import { trackBehavior } from "@/lib/tracking/client";
import { ensureMetaPixel } from "@/lib/tracking/meta-pixel";

const DEPTHS = [25, 50, 75, 90];

export function BehaviorTracker() {
  useEffect(() => {
    let sectionObserver: IntersectionObserver | null = null;
    let engagedTimer: ReturnType<typeof setTimeout> | null = null;
    const sentDepths = new Set<number>();

    function activate() {
      const consent = getConsent();
      if (!consent) return;

      if (consent.marketing) {
        ensureMetaPixel();
      }

      if (!consent.analytics) return;

      const viewKey = `ohrly_lp_view:${process.env.NEXT_PUBLIC_OHRLY_LANDING_VARIANT || "decision_lp_v1"}`;
      if (!sessionStorage.getItem(viewKey)) {
        sessionStorage.setItem(viewKey, "1");
        void trackBehavior("lp_view");
      }

      if (!engagedTimer) {
        engagedTimer = setTimeout(() => {
          if (getConsent()?.analytics) {
            void trackBehavior("lp_engaged_10s");
          }
        }, 10_000);
      }

      if (!sectionObserver) {
        sectionObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              const element = entry.target as HTMLElement;
              const section = element.dataset.analyticsSection;
              if (!section) continue;

              const key = `ohrly_section_view:${section}`;
              if (sessionStorage.getItem(key)) continue;
              sessionStorage.setItem(key, "1");

              void trackBehavior("section_view", { section });
              if (section === "hero_form") {
                void trackBehavior("form_view", { section });
              }
            }
          },
          { threshold: 0.45 },
        );

        document.querySelectorAll<HTMLElement>("[data-analytics-section]").forEach((element) => {
          sectionObserver?.observe(element);
        });
      }
    }

    function onConsentChanged() {
      activate();
    }

    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const cta = target?.closest<HTMLElement>("[data-analytics-cta]");
      if (!cta) return;

      void trackBehavior("cta_click", {
        location: cta.dataset.analyticsLocation || null,
        ctaId: cta.dataset.analyticsCta || null,
        label: cta.dataset.analyticsLabel || cta.textContent?.trim() || null,
      });
    }

    function onFocus(event: FocusEvent) {
      if (!getConsent()?.analytics) return;

      const target = event.target as HTMLInputElement | HTMLSelectElement | null;
      const form = target?.closest<HTMLElement>("[data-analytics-form]");
      if (!form) return;

      const formId = form.dataset.analyticsForm || "form";
      const startKey = `ohrly_form_started:${formId}`;
      if (!sessionStorage.getItem(startKey)) {
        sessionStorage.setItem(startKey, "1");
        void trackBehavior("form_start", { formId });
      }

      if (target?.name) {
        const fieldKey = `ohrly_form_field:${formId}:${target.name}`;
        if (!sessionStorage.getItem(fieldKey)) {
          sessionStorage.setItem(fieldKey, "1");
          void trackBehavior("form_field_started", {
            formId,
            field: target.name,
          });
        }
      }
    }

    function onScroll() {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const depth = Math.min(100, Math.round((window.scrollY / scrollable) * 100));
      for (const target of DEPTHS) {
        if (depth >= target && !sentDepths.has(target)) {
          sentDepths.add(target);
          void trackBehavior(`scroll_${target}`, { scrollDepth: target });
        }
      }
    }

    activate();
    window.addEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
    document.addEventListener("click", onClick);
    document.addEventListener("focusin", onFocus);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      sectionObserver?.disconnect();
      if (engagedTimer) clearTimeout(engagedTimer);
      window.removeEventListener(CONSENT_CHANGED_EVENT, onConsentChanged);
      document.removeEventListener("click", onClick);
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
