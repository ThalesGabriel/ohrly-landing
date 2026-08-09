"use client";

import { useEffect } from "react";
import { trackEvent } from "../../lib/analytics";

const FORM_ID = "pilot_lead";

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

export function LandingAnalytics() {
    useEffect(() => {
        trackEvent("lp_view", {
            pageType: "pilot",
            audience: "trinks_salons",
            offer: "return_predictability_pilot",
        });

        // 10 seconds of visible page time, rather than merely 10 seconds since mount.
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

        // Scroll depth: one event per threshold per page load.
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
                Math.round((window.scrollY / scrollable) * 100),
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

        // Section impressions.
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

        // Form impression + interaction telemetry.
        const pilotSection =
            document.getElementById("piloto");
        const pilotForm =
            pilotSection?.querySelector<HTMLFormElement>(
                `form[data-form-id="${FORM_ID}"]`,
            ) ??
            pilotSection?.querySelector<HTMLFormElement>(
                "form",
            ) ??
            null;

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

            // Deliberately does NOT send the field value.
            trackEvent("form_field_blur", {
                formId: FORM_ID,
                fieldName: field.fieldName,
                fieldType: field.fieldType,
                hasValue: field.hasValue,
            });
        };

        document.addEventListener("focusin", handleFocusIn);
        document.addEventListener("focusout", handleFocusOut);

        // CTA clicks. Submit button is measured by form_submit_attempt in PilotForm.
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

        document.addEventListener("click", handleClick);

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
                "click",
                handleClick,
            );
        };
    }, []);

    return null;
}