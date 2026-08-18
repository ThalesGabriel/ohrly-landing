import type { Metadata } from "next";
import Script from "next/script"
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ohrly — Muita gente chega. Pouca vira cliente.",
  description:
    "Descubra onde seu público deixa de avançar e quais sinais revelam oportunidades de otimização antes da próxima conversão.",
  openGraph: {
    title: "Ohrly — Muita gente chega. Pouca vira cliente.",
    description:
      "Use sinais do comportamento para descobrir onde existe oportunidade e o que vale testar primeiro.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
        <Script
          src="https://www.app.ohrly.com.br/ohrly.js"
          strategy="afterInteractive"
          data-project-key="pk_af23ee02a84cbb59a2e92d2a987358f88ddb"
          data-storage="session"
        />
      </body>
    </html>
  );
}