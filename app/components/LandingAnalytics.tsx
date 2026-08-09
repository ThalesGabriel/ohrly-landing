"use client";

import { useEffect } from "react";
import { trackEvent } from "../../lib/analytics";
import { trackMetaLead } from "@/lib/meta-pixel";

const FORM_ID = "pilot_lead";
const LANDING_VARIANT = "return_predictability_v2";

function getFieldMetadata(
  target: EventTarget | null,
): {
  fieldName: string;
  fieldType: string;
  hasValue: boolean;
} | null {
  if (
    !(
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    )
  ) {
    return null;
  }

  const hasValue =
    target instanceof HTMLInputElement &&
    target.type === "checkbox"
      ? target.checked
      : target.value.trim().length > 0;

  return {
    fieldName: target.name || "unnamed",
    fieldType:
      target instanceof HTMLSelectElement
        ? "select"
        : target instanceof HTMLTextAreaElement
          ? "textarea"
          : target.type || "text",
    hasValue,
  };
}

function getUtms() {
  const params = new URLSearchParams(
    window.location.search,
  );

  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  };
}

export function LandingAnalytics() {
  useEffect(() => {
    trackEvent("lp_view", {
      pageType: "pilot",
      audience: "trinks_salons",
      offer: "return_predictability_pilot",
    });

    let remainingEngagementMs = 10_000;
    let visibleSince =
      document.visibilityState === "visible"
        ? Date.now()
        : null;
    let engagementTimer: ReturnType<typeof setTimeout> | null =
      null;
    let engagementSent = false;

    const sendEngagement = () => {
      if (engagementSent) {
        return;
      }

      engagementSent = true;

      trackEvent("lp_engaged_10s", {
        visibleSeconds: 10,
      });
    };

    const scheduleEngagement = () => {
      if (
        engagementSent ||
        document.visibilityState !== "visible"
      ) {
        return;
      }

      visibleSince = Date.now();

      engagementTimer = setTimeout(
        sendEngagement,
        remainingEngagementMs,
      );
    };

    const pauseEngagement = () => {
      if (
        engagementTimer !== null &&
        visibleSince !== null
      ) {
        clearTimeout(engagementTimer);
        engagementTimer = null;

        remainingEngagementMs = Math.max(
          0,
          remainingEngagementMs -
            (Date.now() - visibleSince),
        );
      }

      visibleSince = null;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        scheduleEngagement();
      } else {
        pauseEngagement();
      }
    };

    scheduleEngagement();

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    const sentScrollThresholds = new Set<number>();
    const scrollThresholds = [25, 50, 75, 90] as const;

    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

      if (scrollable <= 0) {
        return;
      }

      const percentage = Math.min(
        100,
        Math.round(
          (window.scrollY / scrollable) * 100,
        ),
      );

      for (const threshold of scrollThresholds) {
        if (
          percentage >= threshold &&
          !sentScrollThresholds.has(threshold)
        ) {
          sentScrollThresholds.add(threshold);

          trackEvent(`scroll_${threshold}`, {
            percentage: threshold,
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    const seenSections = new Set<string>();

    const sectionElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-analytics-section]",
      ),
    );

    const sectionObserver =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, observer) => {
              for (const entry of entries) {
                if (
                  !entry.isIntersecting ||
                  entry.intersectionRatio < 0.35
                ) {
                  continue;
                }

                const element =
                  entry.target as HTMLElement;

                const section =
                  element.dataset.analyticsSection;

                if (
                  !section ||
                  seenSections.has(section)
                ) {
                  continue;
                }

                seenSections.add(section);

                trackEvent("section_view", {
                  section,
                  visibilityThreshold: 0.35,
                });

                if (section === "pilot_details") {
                  trackEvent("pilot_details_view", {
                    section,
                  });
                }

                observer.unobserve(entry.target);
              }
            },
            { threshold: [0.35] },
          )
        : null;

    if (sectionObserver) {
      for (const element of sectionElements) {
        sectionObserver.observe(element);
      }
    }

    const pilotSection =
      document.getElementById("piloto");

    const pilotForm =
      pilotSection?.querySelector<HTMLFormElement>(
        `form[data-form-id="${FORM_ID}"]`,
      ) ?? null;

    let formViewed = false;
    let formStarted = false;

    const startedFields = new Set<string>();

    const formObserver =
      pilotForm && "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries, observer) => {
              for (const entry of entries) {
                if (
                  entry.isIntersecting &&
                  entry.intersectionRatio >= 0.5 &&
                  !formViewed
                ) {
                  formViewed = true;

                  trackEvent("form_view", {
                    formId: FORM_ID,
                    visibilityThreshold: 0.5,
                  });

                  observer.disconnect();
                }
              }
            },
            { threshold: [0.5] },
          )
        : null;

    if (pilotForm && formObserver) {
      formObserver.observe(pilotForm);
    }

    const handleFocusIn = (event: FocusEvent) => {
      if (
        !pilotForm ||
        !(event.target instanceof Node) ||
        !pilotForm.contains(event.target)
      ) {
        return;
      }

      const field = getFieldMetadata(event.target);

      if (!field) {
        return;
      }

      if (!formStarted) {
        formStarted = true;

        trackEvent("form_start", {
          formId: FORM_ID,
          firstField: field.fieldName,
        });
      }

      if (!startedFields.has(field.fieldName)) {
        startedFields.add(field.fieldName);

        trackEvent("form_field_started", {
          formId: FORM_ID,
          fieldName: field.fieldName,
          fieldType: field.fieldType,
        });
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (
        !pilotForm ||
        !(event.target instanceof Node) ||
        !pilotForm.contains(event.target)
      ) {
        return;
      }

      const field = getFieldMetadata(event.target);

      if (!field) {
        return;
      }

      trackEvent("form_field_blur", {
        formId: FORM_ID,
        fieldName: field.fieldName,
        fieldType: field.fieldType,
        hasValue: field.hasValue,
      });
    };

    const handleSubmit = async (
      event: SubmitEvent,
    ) => {
      if (
        !pilotForm ||
        event.target !== pilotForm
      ) {
        return;
      }

      event.preventDefault();

      if (!pilotForm.reportValidity()) {
        return;
      }

      trackEvent("form_submit_attempt", {
        formId: FORM_ID,
      });

      const button =
        pilotForm.querySelector<HTMLButtonElement>(
          'button[type="submit"]',
        );

      const submitLabel =
        pilotForm.querySelector<HTMLElement>(
          "[data-submit-label]",
        );

      const message =
        pilotForm.querySelector<HTMLElement>(
          "[data-form-message]",
        );

      if (button) {
        button.disabled = true;
      }

      if (submitLabel) {
        submitLabel.textContent = "Enviando...";
      }

      const formData = new FormData(pilotForm);
      const payload = Object.fromEntries(
        formData.entries(),
      );

      const formspreeFormId =
        process.env
          .NEXT_PUBLIC_FORMSPREE_FORM_ID ||
        "mkoygpnk";

      let responseStatus: number | null = null;

      try {
        const response = await fetch(
          `https://formspree.io/f/${formspreeFormId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              ...payload,
              uses_trinks:
                payload.uses_trinks === "on"
                  ? "sim"
                  : payload.uses_trinks,
              consent:
                payload.consent === "on"
                  ? "sim"
                  : payload.consent,
              ...getUtms(),
              landing_variant: LANDING_VARIANT,
              page_path: window.location.pathname,
              submitted_at:
                new Date().toISOString(),
            }),
          },
        );

        responseStatus = response.status;

        if (!response.ok) {
          throw new Error(
            "Não foi possível enviar seus dados.",
          );
        }

        trackEvent("form_submit_success", {
          formId: FORM_ID,
          usesTrinks: true,
        });

        trackMetaLead();

        pilotForm.reset();

        if (message) {
          message.className =
            "block rounded-xl border border-[#bcd8cf] bg-[#eff8f4] px-4 py-3 text-xs leading-5 text-[#38645e]";

          message.textContent =
            "Recebemos seus dados. Vamos avaliar se sua operação se encaixa no piloto.";
        }

        if (submitLabel) {
          submitLabel.textContent =
            "Inscrição recebida";
        }
      } catch (error) {
        trackEvent("form_submit_error", {
          formId: FORM_ID,
          responseStatus,
          errorType:
            error instanceof Error
              ? error.name
              : "unknown",
        });

        if (button) {
          button.disabled = false;
        }

        if (submitLabel) {
          submitLabel.textContent =
            "Quero tornar minha receita mais previsível";
        }

        if (message) {
          message.className =
            "block rounded-xl border border-[#edc7bf] bg-[#fff5f2] px-4 py-3 text-xs leading-5 text-[#a34838]";

          message.textContent =
            error instanceof Error
              ? error.message
              : "Não foi possível enviar seus dados.";
        }
      }
    };

    document.addEventListener(
      "focusin",
      handleFocusIn,
    );

    document.addEventListener(
      "focusout",
      handleFocusOut,
    );

    document.addEventListener(
      "submit",
      handleSubmit,
    );

    const handleClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) {
        return;
      }

      const cta =
        event.target.closest<HTMLElement>(
          "[data-analytics-cta]",
        );

      if (!cta) {
        return;
      }

      trackEvent("cta_click", {
        location:
          cta.dataset.analyticsLocation ?? "",
        label:
          cta.dataset.analyticsLabel ??
          cta.textContent?.trim() ??
          "",
        target:
          cta.getAttribute("href") ?? "",
      });
    };

    document.addEventListener(
      "click",
      handleClick,
    );

    return () => {
      pauseEngagement();

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );

      window.removeEventListener(
        "scroll",
        handleScroll,
      );

      sectionObserver?.disconnect();
      formObserver?.disconnect();

      document.removeEventListener(
        "focusin",
        handleFocusIn,
      );

      document.removeEventListener(
        "focusout",
        handleFocusOut,
      );

      document.removeEventListener(
        "submit",
        handleSubmit,
      );

      document.removeEventListener(
        "click",
        handleClick,
      );
    };
  }, []);

  return null;
}