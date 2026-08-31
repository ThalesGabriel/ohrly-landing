"use client";

import { useEffect } from "react";

import type { LandingVariant } from "./landing-experiment";

export function LandingExperimentMarker({
  experiment,
  variant,
  hypothesis,
}: {
  experiment: string;
  variant: LandingVariant;
  hypothesis: string;
}) {
  useEffect(() => {
    const context = { experiment, variant, hypothesis };

    sessionStorage.setItem("ohrly_landing_experiment", JSON.stringify(context));

    document.documentElement.dataset.landingExperiment = experiment;
    document.documentElement.dataset.landingVariant = variant;
    document.documentElement.dataset.landingHypothesis = hypothesis;

    document.cookie = `ohrly_lp_variant=${encodeURIComponent(variant)}; Path=/; Max-Age=2592000; SameSite=Lax`;
    document.cookie = `ohrly_lp_experiment=${encodeURIComponent(experiment)}; Path=/; Max-Age=2592000; SameSite=Lax`;

    window.dispatchEvent(
      new CustomEvent("ohrly:landing-experiment", { detail: context }),
    );
  }, [experiment, variant, hypothesis]);

  return (
    <span
      id="ohrly-landing-experiment"
      hidden
      data-experiment={experiment}
      data-variant={variant}
      data-hypothesis={hypothesis}
    />
  );
}
