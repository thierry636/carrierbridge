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
  const t = await getTranslations({ locale, namespace: "legal.notice.meta" });
  return pageMetadata({
    locale,
    pathname: "/mentions-legales",
    title: t("title"),
    description: t("description"),
  });
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.notice" });
  const sections = t.raw("sections") as { title: string; body: string }[];

  const tc = await getTranslations({ locale, namespace: "common" });
  const crumbs = breadcrumbJsonLd({
    locale,
    pathname: "/mentions-legales",
    homeName: tc("nav.home"),
    pageName: tc("footer.links.legalNotice"),
  });

  return (
    <>
      <JsonLd data={crumbs} />
      <LegalPage title={t("h1")}>
        <LegalSections sections={sections} />
      </LegalPage>
    </>
  );
}
