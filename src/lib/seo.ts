import type { Metadata } from "next";
import { getPathname, routing, type AppPathname, type Locale } from "@/i18n/routing";
import { site } from "./site";
import { plans } from "./pricing";

export function absoluteUrl(locale: Locale, pathname: AppPathname) {
  return `${site.url}${getPathname({ locale, href: pathname })}`;
}

/** Canonical plus a complete hreflang set, with French as x-default. */
export function alternatesFor(pathname: AppPathname, locale: Locale): Metadata["alternates"] {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, absoluteUrl(l, pathname)])
  );
  return {
    canonical: absoluteUrl(locale, pathname),
    languages: { ...languages, "x-default": absoluteUrl(routing.defaultLocale, pathname) },
  };
}

export function pageMetadata({
  locale,
  pathname,
  title,
  description,
}: {
  locale: Locale;
  pathname: AppPathname;
  title: string;
  description: string;
}): Metadata {
  const url = absoluteUrl(locale, pathname);
  return {
    title,
    description,
    alternates: alternatesFor(pathname, locale),
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === "fr" ? "fr_FR" : "en_GB",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function softwareApplicationJsonLd(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: site.name,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Transportation Management",
    operatingSystem: "Web",
    url: absoluteUrl(locale, "/"),
    inLanguage: locale,
    description,
    offers: plans.map((plan) => ({
      "@type": "Offer",
      name: plan.id,
      price: plan.monthly,
      priceCurrency: "EUR",
      url: absoluteUrl(locale, "/tarifs"),
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.monthly,
        priceCurrency: "EUR",
        unitCode: "MON",
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
