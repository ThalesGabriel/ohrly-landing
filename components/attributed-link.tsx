"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";

const ATTRIBUTION_PARAMS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_placement",
] as const;

type AttributedLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

function buildAttributedHref(href: string) {
  if (typeof window === "undefined") return href;

  const currentParams = new URLSearchParams(window.location.search);
  const target = new URL(href, window.location.origin);

  for (const key of ATTRIBUTION_PARAMS) {
    const value = currentParams.get(key);

    if (value && !target.searchParams.has(key)) {
      target.searchParams.set(key, value);
    }
  }

  return `${target.pathname}${target.search}${target.hash}`;
}

export function AttributedLink({ href, ...props }: AttributedLinkProps) {
  const [resolvedHref, setResolvedHref] = useState(href);

  useEffect(() => {
    setResolvedHref(buildAttributedHref(href));
  }, [href]);

  return <Link href={resolvedHref} {...props} />;
}
