import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
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
  const t = await getTranslations({ locale, namespace: "legal.privacy.meta" });
  return pageMetadata({
    locale,
    pathname: "/confidentialite",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  const sections = t.raw("sections") as { title: string; body: string }[];

  const tc = await getTranslations({ locale, namespace: "common" });
  const crumbs = breadcrumbJsonLd({
    locale,
    pathname: "/confidentialite",
    homeName: tc("nav.home"),
    pageName: tc("footer.links.privacy"),
  });

  return (
    <>
      <JsonLd data={crumbs} />
      <LegalPage title={t("h1")} intro={t("intro")}>
        <LegalSections sections={sections} />
      </LegalPage>
    </>
  );
}
