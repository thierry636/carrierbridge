import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://carrierbridge.com";

  return routing.locales.map((locale) => ({
    url:
      locale === routing.defaultLocale ? `${base}/` : `${base}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: {
      languages: {
        fr: `${base}/`,
        en: `${base}/en`,
      },
    },
  }));
}
