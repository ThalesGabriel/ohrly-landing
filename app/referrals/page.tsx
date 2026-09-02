import type { Metadata } from "next";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";

import ReferralClient from "./referral-client";

export const metadata: Metadata = {
  title: "Programa de indicação — Ohrly",
  description:
    "Indique um time de Customer Success para o Ohrly. Se a indicação se tornar cliente, você recebe 20% do primeiro pagamento.",
  openGraph: {
    title: "Programa de indicação — Ohrly",
    description:
      "Conhece um time de CS que já foi surpreendido por uma renovação mesmo quando os sinais pareciam saudáveis? Faça uma introdução ao Ohrly.",
    type: "website",
  },
};

export default function ReferralPage() {
  return (
    <>
      <CookieConsent />
      <BehaviorTracker />
      <ReferralClient />
    </>
  );
}
