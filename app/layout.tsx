import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ohrly — Descubra quais problemas deixaram de ser casos isolados",
  description:
    "Analisamos seu histórico do Intercom para descobrir o que começou a se repetir, consolidamos o impacto e mostramos quais problemas merecem atenção primeiro.",
  openGraph: {
    title: "Ohrly — Problemas que deixaram de ser casos isolados",
    description:
      "Descubra o que está se repetindo no seu Intercom antes que a repetição vire custo normalizado.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
