"use client";

import { useEffect, useRef } from "react";
import {
  CONSENT_EVENT,
  readConsent,
} from "@/lib/campaign/consent";
import { trackEvent } from "@/lib/campaign/client";
import type { CampaignConsent } from "@/lib/campaign/types";

export function CampaignTracker() {
  const cleanups = useRef<(() => void)[]>([]);
  const started = useRef(false);
  const once = useRef(new Set<string>());

  useEffect(() => {
    function stop() {
      cleanups.current.forEach((fn) => fn());
      cleanups.current = [];
      started.current = false;
    }

    function trackOnce(
      key: string,
      eventName: Parameters<typeof trackEvent>[0],
      properties: Record<string, unknown> = {}
    ) {
      if (once.current.has(key)) return;
      once.current.add(key);
      void trackEvent(eventName, properties);
    }

    function start(consent: CampaignConsent) {
      if (!consent.analytics || started.current) return;
      started.current = true;

      trackOnce("lp_view", "lp_view");

      let accumulated = 0;
      let visibleSince =
        document.visibilityState === "visible" ? performance.now() : null;
      let timer: number | null = null;

      const schedule = () => {
        if (timer) window.clearTimeout(timer);
        if (visibleSince === null) return;
        const remaining = Math.max(0, 10_000 - accumulated);
        timer = window.setTimeout(() => {
          trackOnce("engaged_10s", "lp_engaged_10s");
        }, remaining);
      };

      const onVisibility = () => {
        const now = performance.now();
        if (document.visibilityState === "hidden") {
          if (visibleSince !== null) accumulated += now - visibleSince;
          visibleSince = null;
          if (timer) window.clearTimeout(timer);
        } else {
          visibleSince = now;
          schedule();
        }
      };

      document.addEventListener("visibilitychange", onVisibility);
      schedule();

      cleanups.current.push(() => {
        document.removeEventListener("visibilitychange", onVisibility);
        if (timer) window.clearTimeout(timer);
      });

      const onScroll = () => {
        const maxScrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        if (maxScrollable <= 0) return;

        const depth = (window.scrollY / maxScrollable) * 100;

        if (depth >= 25) trackOnce("scroll_25", "scroll_25", { depth });
        if (depth >= 50) trackOnce("scroll_50", "scroll_50", { depth });
        if (depth >= 75) trackOnce("scroll_75", "scroll_75", { depth });
      };

      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
      cleanups.current.push(() =>
        window.removeEventListener("scroll", onScroll)
      );

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const element = entry.target as HTMLElement;
            if (element.dataset.trackOffer !== undefined) {
              trackOnce("offer_view", "offer_view");
            }
            if (element.dataset.trackForm !== undefined) {
              trackOnce("form_view", "form_view");
            }
          });
        },
        { threshold: 0.35 }
      );

      document
        .querySelectorAll<HTMLElement>("[data-track-offer],[data-track-form]")
        .forEach((el) => observer.observe(el));

      cleanups.current.push(() => observer.disconnect());

      const onClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const cta = target?.closest<HTMLElement>("[data-track-cta]");
        if (!cta) return;

        void trackEvent("cta_click", {
          location: cta.dataset.trackCta || "unknown",
          label: cta.textContent?.trim().slice(0, 120),
        });
      };

      document.addEventListener("click", onClick);
      cleanups.current.push(() =>
        document.removeEventListener("click", onClick)
      );
    }

    start(readConsent());

    const onConsent = (event: Event) => {
      const consent = (event as CustomEvent<CampaignConsent>).detail;
      if (!consent.analytics) stop();
      else start(consent);
    };

    window.addEventListener(CONSENT_EVENT, onConsent);

    return () => {
      window.removeEventListener(CONSENT_EVENT, onConsent);
      stop();
    };
  }, []);

  return null;
}
