import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { MetaPixel } from "@/components/analytics/MetaPixel";

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
    default: "Ohrly | Behavioral observability for digital flows",
    template: "%s | Ohrly",
  },

  description:
    "Ohrly helps teams identify when digital flows start losing efficiency before silent degradation becomes incidents, rework, operational cost, or revenue impact.",

  applicationName: "Ohrly",

  keywords: [
    "behavioral observability",
    "digital flows",
    "operational degradation",
    "digital operations",
    "synthetic data",
    "checkout monitoring",
    "payment flows",
    "customer support automation",
    "chatbot operations",
    "WhatsApp automation",
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
    canonical: "/",
    languages: {
      en: "/en",
      pt: "/pt",
    },
  },

  openGraph: {
    title: "Ohrly | Behavioral observability for digital flows",
    description:
      "Identify when a digital flow still works, but is already accumulating delays, rework, handoffs, retries, or conversion loss.",
    url: "/",
    siteName: "Ohrly",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
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
    title: "Ohrly | Behavioral observability for digital flows",
    description:
      "Turn silent degradation signals into operational decision windows before impact becomes obvious.",
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

function getHtmlLang(locale: string) {
  if (locale === "pt") return "pt-BR";
  if (locale === "en") return "en";
  return locale;
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

  return (
    <html
      lang={getHtmlLang(locale)}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NextIntlClientProvider>
          <ThemeProvider>
            <MetaPixel />
            {children}
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}