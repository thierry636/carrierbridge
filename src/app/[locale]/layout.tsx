import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/seo/JsonLd";
import { softwareApplicationJsonLd } from "@/lib/seo";
import { site } from "@/lib/site";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    metadataBase: new URL(site.url),
    // Each page sets a complete, self-contained title; this is only the
    // fallback for any route that sets none.
    title: site.name,
    icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });

  // Header and the cookie banner are the only client components at this level,
  // and both read `common`. Pages add the namespaces their own client parts
  // need, so terms and privacy copy never ship with the home page.
  const shellMessages = { common: messages.common };

  return (
    <html lang={locale} className={inter.variable}>
      <body className="bg-white font-sans text-ink-900 antialiased">
        <NextIntlClientProvider locale={locale} messages={shellMessages}>
          <a
            href="#contenu"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow"
          >
            {t("nav.skipToContent")}
          </a>
          <Header />
          <main id="contenu" className="pt-16">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Analytics />
        </NextIntlClientProvider>
        <JsonLd data={softwareApplicationJsonLd(locale, t("brand.definition"))} />
      </body>
    </html>
  );
}
