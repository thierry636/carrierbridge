import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { LegalPage, LegalSections } from "@/components/legal/LegalPage";

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
  const t = await getTranslations({ locale, namespace: "legal.terms.meta" });
  return pageMetadata({
    locale,
    pathname: "/cgu",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.terms" });
  const sections = t.raw("sections") as { title: string; body: string }[];

  return (
    <LegalPage title={t("h1")} intro={t("intro")}>
      <LegalSections sections={sections} />
    </LegalPage>
  );
}
