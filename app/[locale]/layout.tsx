import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Script from "next/script";

import "../globals.css";

import { MetaPixel } from "@/components/analytics/MetaPixel";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { routing } from "@/i18n/routing";

const googleAdsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function getHtmlLang(locale: string) {
  if (locale === "pt") return "pt-BR";
  if (locale === "en") return "en";
  return locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isPt = locale === "pt";

  return {
    metadataBase: new URL("https://www.ohrly.com.br"),

    title: {
      default: isPt
        ? "Ohrly | Leitura de consistência para fluxos digitais"
        : "Ohrly | Behavioral observability for digital flows",
      template: "%s | Ohrly",
    },

    description: isPt
      ? "O Ohrly ajuda times a identificar quando fluxos digitais começam a perder consistência antes de virarem incidentes, retrabalho, custo operacional ou impacto em receita."
      : "Ohrly helps teams identify when digital flows start losing efficiency before silent degradation becomes incidents, rework, operational cost, or revenue impact.",

    applicationName: "Ohrly",

    keywords: [
      "behavioral observability",
      "digital flows",
      "operational degradation",
      "chatbot operations",
      "WhatsApp automation",
      "customer support automation",
      "flow monitoring",
      "operational efficiency",
      "incident prevention",
      "workflow analytics",
      "business observability",
    ],

    authors: [{ name: "Ohrly" }],
    creator: "Ohrly",
    publisher: "Ohrly",

    alternates: {
      canonical: isPt ? "/pt" : "/en",
      languages: {
        en: "/en",
        pt: "/pt",
        "x-default": "/en",
      },
    },

    openGraph: {
      title: isPt
        ? "Ohrly | Leitura de consistência para fluxos digitais"
        : "Ohrly | Behavioral observability for digital flows",
      description: isPt
        ? "Identifique quando um fluxo digital ainda funciona, mas já começa a acumular atrasos, retrabalho, handoffs, retries ou perda de conversão."
        : "Identify when a digital flow still works, but is already accumulating delays, rework, handoffs, retries, or conversion loss.",
      url: isPt ? "/pt" : "/en",
      siteName: "Ohrly",
      locale: isPt ? "pt_BR" : "en_US",
      alternateLocale: isPt ? ["en_US"] : ["pt_BR"],
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Ohrly — Behavioral observability for digital flows",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: isPt
        ? "Ohrly | Leitura de consistência para fluxos digitais"
        : "Ohrly | Behavioral observability for digital flows",
      description: isPt
        ? "Transforme sinais silenciosos de degradação em janelas de decisão operacional."
        : "Turn silent degradation signals into operational decision windows before impact becomes obvious.",
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
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
  };
}

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

  const messages = await getMessages();

  return (
    <html
      lang={getHtmlLang(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>

        <MetaPixel />

        {googleAdsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
              strategy="afterInteractive"
            />

            <Script id="google-ads-tag" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAdsId}');
              `}
            </Script>
          </>
        )}

        <Analytics />
      </body>
    </html>
  );
}