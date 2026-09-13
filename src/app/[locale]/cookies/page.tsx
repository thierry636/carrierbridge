import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalPage } from "@/components/legal/LegalPage";
import { CookiePreferences } from "@/components/legal/CookiePreferences";

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
  const t = await getTranslations({ locale, namespace: "legal.cookies.meta" });
  return pageMetadata({
    locale,
    pathname: "/cookies",
    title: t("title"),
    description: t("description"),
  });
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "legal.cookies" });
  const rows = t.raw("rows") as {
    name: string;
    purpose: string;
    duration: string;
    consent: string;
  }[];
  const headers = ["name", "purpose", "duration", "consent"] as const;

  const tc = await getTranslations({ locale, namespace: "common" });
  const crumbs = breadcrumbJsonLd({
    locale,
    pathname: "/cookies",
    homeName: tc("nav.home"),
    pageName: tc("footer.links.cookies"),
  });

  return (
    <>
      <JsonLd data={crumbs} />
      <LegalPage title={t("h1")} intro={t("intro")}>
        <section>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <thead>
                <tr>
                  {headers.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="border-b border-ink-300 py-3 pr-4 text-left font-semibold text-ink-900"
                    >
                      {t(`tableHeaders.${header}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name} className="border-b border-ink-100 align-top">
                    <th scope="row" className="py-3 pr-4 text-left font-medium text-ink-800">
                      {row.name}
                    </th>
                    <td className="py-3 pr-4 leading-relaxed text-ink-600">{row.purpose}</td>
                    <td className="py-3 pr-4 text-ink-600">{row.duration}</td>
                    <td className="py-3 pr-4 text-ink-600">{row.consent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink-900">{t("manage.title")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("manage.body")}</p>
          <CookiePreferences />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-ink-900">{t("browser.title")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("browser.body")}</p>
        </section>
      </LegalPage>
    </>
  );
}
