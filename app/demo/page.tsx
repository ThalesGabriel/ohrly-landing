import type { Metadata } from "next";

import { BehaviorTracker } from "@/components/behavior-tracker";
import { CookieConsent } from "@/components/cookie-consent";
import { LeadModalProvider } from "@/components/lead-form-modal";
import { CommercialIntentProvider } from "@/components/commercial-intent-modal";

import DemoClient from "./demo-client";

export const metadata: Metadata = {
  title: "Ohrly — Veja uma relação mudar",
  description:
    "Explore como o Ohrly acompanha timeline, mudanças, stakeholder coverage, ciclos, renovação, intervenção, resposta e memória em uma relação B2B.",
  openGraph: {
    title: "Ohrly — Veja uma relação mudar",
    description:
      "Explore uma relação B2B ao longo do tempo e veja como contexto, trajetória e resposta mudam a leitura além do risco.",
    type: "website",
  },
};

export default function DemoPage() {
  return (
    <>
      <CookieConsent />
      <BehaviorTracker />

      <LeadModalProvider>
        <CommercialIntentProvider>
          <DemoClient />
        </CommercialIntentProvider>
      </LeadModalProvider>
    </>
  );
}
