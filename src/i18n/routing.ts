import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

/**
 * French is the default locale and carries no prefix. English URLs use real
 * translated slugs (/en/pricing, not /en/tarifs) — the keys below are the
 * internal paths, which match the directory names under app/[locale].
 */
export const routing = defineRouting({
  locales: ["fr", "en"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/tarifs": { fr: "/tarifs", en: "/pricing" },
    "/outils/indexation-gazole": {
      fr: "/outils/indexation-gazole",
      en: "/tools/fuel-index",
    },
    "/contact": { fr: "/contact", en: "/contact" },
    "/blog": { fr: "/blog", en: "/blog" },
    "/mentions-legales": { fr: "/mentions-legales", en: "/legal-notice" },
    "/cgu": { fr: "/cgu", en: "/terms" },
    "/confidentialite": { fr: "/confidentialite", en: "/privacy" },
    "/cookies": { fr: "/cookies", en: "/cookies" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
