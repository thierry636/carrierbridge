import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/contact/ContactForm";
import { ClientMessages } from "@/components/i18n/ClientMessages";
import { SignupButton } from "@/components/ui/signup-button";
import { site } from "@/lib/site";

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
  const t = await getTranslations({ locale, namespace: "contact.meta" });
  return pageMetadata({
    locale,
    pathname: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <div className="py-14 lg:py-20">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
              {t("h1")}
            </h1>
            <p className="mt-5 text-pretty text-base leading-relaxed text-ink-600">{t("lede")}</p>

            <div className="mt-8 rounded-xl border border-ink-200 bg-ink-50 p-6">
              <h2 className="text-base font-semibold text-ink-900">{t("selfServe.title")}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{t("selfServe.text")}</p>
              <SignupButton source="contact-selfserve" variant="secondary" className="mt-4">
                {t("selfServe.cta")}
              </SignupButton>
            </div>

            <div className="mt-8">
              <h2 className="text-sm font-semibold text-ink-900">{t("direct.title")}</h2>
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-1 inline-block text-sm font-medium text-brand-700 underline underline-offset-4"
              >
                {t("direct.email")}
              </a>
            </div>
          </div>

          <ClientMessages namespaces={["contact"]}>
            <ContactForm />
          </ClientMessages>
        </div>
      </Container>
    </div>
  );
}
