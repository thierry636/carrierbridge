import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Section, SectionHeading } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { RoiEstimates } from "@/components/pricing/RoiEstimates";
import { TenderPricing } from "@/components/pricing/TenderPricing";
import { Support } from "@/components/sections/Support";

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
  const t = await getTranslations({ locale, namespace: "pricing.meta" });
  return pageMetadata({
    locale,
    pathname: "/tarifs",
    title: t("title"),
    description: t("description"),
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "pricing" });
  const notes = t.raw("notes.items") as string[];

  return (
    <>
      <section className="border-b border-ink-200 bg-white py-14 lg:py-16">
        <Container>
          <h1 className="max-w-3xl text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl lg:text-[42px]">
            {t("page.h1")}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            {t("page.lede")}
          </p>
          <p className="mt-3 text-sm text-ink-500">{t("page.vatNote")}</p>
        </Container>
      </section>

      <Section>
        <PricingPlans withMatrix />
      </Section>

      <RoiEstimates />
      <TenderPricing />
      <Support />

      <Section tone="muted">
        <SectionHeading title={t("notes.h2")} />
        <ul className="mt-8 max-w-3xl space-y-3">
          {notes.map((note) => (
            <li key={note} className="border-l-2 border-ink-300 pl-4 text-sm leading-relaxed text-ink-700">
              {note}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
