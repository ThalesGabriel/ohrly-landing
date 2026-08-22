import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ohrly — Menos contas para investigar. Mais contexto para agir.",
  description:
    "Ohrly encontra as contas que mudaram no seu histórico de suporte e prepara a primeira investigação para o CSM.",
  openGraph: {
    title: "Ohrly — Seu CSM não deveria investigar toda a carteira",
    description:
      "Conecte seu Intercom. O Ohrly encontra as contas que mudaram e prepara a primeira investigação para o CSM.",
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
