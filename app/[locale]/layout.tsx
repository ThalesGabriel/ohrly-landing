import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ohrly.com.br"),

  title: {
    default: "Ohrly | Observabilidade comportamental para fluxos digitais",
    template: "%s | Ohrly",
  },

  description:
    "A Ohrly ajuda empresas a identificar quando fluxos digitais começam a perder consistência antes que a degradação vire incidente, retrabalho ou perda operacional.",

  applicationName: "Ohrly",

  keywords: [
    "observabilidade comportamental",
    "fluxos digitais",
    "degradação operacional",
    "operação digital",
    "chatbot",
    "WhatsApp",
    "atendimento digital",
    "monitoramento de fluxos",
    "incidentes",
    "eficiência operacional",
  ],

  authors: [{ name: "Ohrly" }],
  creator: "Ohrly",
  publisher: "Ohrly",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Ohrly | Observabilidade comportamental para fluxos digitais",
    description:
      "Identifique quando um fluxo digital ainda funciona, mas já começou a acumular atraso, retrabalho, transbordo ou perda de conversão.",
    url: "/",
    siteName: "Ohrly",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ohrly — Observabilidade comportamental para fluxos digitais",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Ohrly | Observabilidade comportamental para fluxos digitais",
    description:
      "Transforme sinais silenciosos de degradação em janelas de decisão operacional.",
    images: ["/images/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            {children}
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}