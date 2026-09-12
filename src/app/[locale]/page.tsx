import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { ClientMessages } from "@/components/i18n/ClientMessages";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { GridImport } from "@/components/sections/GridImport";
import { Surcharges } from "@/components/sections/Surcharges";
import { FuelControl } from "@/components/sections/FuelControl";
import { BestPrice } from "@/components/sections/BestPrice";
import { Operations } from "@/components/sections/Operations";
import { CarrierRegistry } from "@/components/sections/CarrierRegistry";
import { AiSourcing } from "@/components/sections/AiSourcing";
import { PricingSection } from "@/components/sections/PricingSection";
import { Support } from "@/components/sections/Support";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

function isLocale(value: string): value is Locale {
  return (routing.locales as readonly string[]).includes(value);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "home.meta" });
  return pageMetadata({
    locale,
    pathname: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "faq" });
  const faqItems = t.raw("items") as { q: string; a: string }[];

  return (
    <>
      <Hero />
      <Problem />
      <GridImport />
      <Surcharges />
      <FuelControl />
      <BestPrice />
      <Operations />
      <CarrierRegistry />
      <AiSourcing />
      <ClientMessages namespaces={["pricing"]}>
        <PricingSection />
      </ClientMessages>
      <Support />
      <ClientMessages namespaces={["faq"]}>
        <Faq />
      </ClientMessages>
      <FinalCta />
      <JsonLd data={faqJsonLd(faqItems)} />
    </>
  );
}
