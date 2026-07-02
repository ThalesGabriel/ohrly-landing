import type { MetadataRoute } from "next";
import { publicReports } from "@/data/reports";

const baseUrl = "https://www.ohrly.com.br";
const locales = ["pt", "en"];
const staticRoutes = ["", "/simulations", "/request", "/reports", "/gargalo-segunda-via-boleto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticUrls = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : route === "/gargalo-segunda-via-boleto" ? 0.9 : 0.8,
    })),
  );

  const reportUrls = locales.flatMap((locale) =>
    publicReports.map((report) => ({
      url: `${baseUrl}/${locale}/reports/${report.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticUrls, ...reportUrls];
}
