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

const baseUrl = "https://www.ohrly.com.br";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === "en";

  const title = isEn
    ? "Ohrly | Detect bottlenecks before they become rework"
    : "Ohrly | Identifique gargalos antes que virem retrabalho";

  const description = isEn
    ? "Detect bottlenecks, delays, handoff and rework in digital flows before they become queues, complaints, operational loss or incidents."
    : "Identifique gargalos, atrasos, handoff e retrabalho em fluxos digitais antes que virem fila, reclamação, perda operacional ou incidente.";

  return {
    metadataBase: new URL(baseUrl),

    title: {
      default: title,
      template: "%s | Ohrly",
    },

    description,
    applicationName: "Ohrly",

    keywords: [
      "gargalos de atendimento",
      "gargalos operacionais",
      "fluxos digitais",
      "retrabalho no atendimento",
      "fila de atendimento",
      "handoff chatbot",
      "atendimento digital",
      "monitoramento de fluxos",
      "degradação operacional",
      "observabilidade comportamental",
    ],

    authors: [{ name: "Ohrly" }],
    creator: "Ohrly",
    publisher: "Ohrly",

    alternates: {
      canonical: `/${locale}`,
      languages: {
        "pt-BR": "/pt",
        "en-US": "/en",
      },
    },

    openGraph: {
      title,
      description,
      url: `/${locale}`,
      siteName: "Ohrly",
      locale: isEn ? "en_US" : "pt_BR",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: isEn
            ? "Ohrly — Detect bottlenecks before they become rework"
            : "Ohrly — Identifique gargalos antes que virem retrabalho",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
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

  return (
    <html
      lang={locale === "en" ? "en-US" : "pt-BR"}
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
