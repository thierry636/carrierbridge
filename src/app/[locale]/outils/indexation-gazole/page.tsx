import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, Lock } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { FuelIndexCalculator } from "@/components/tools/FuelIndexCalculator";
import { SignupButton } from "@/components/ui/signup-button";

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
  const t = await getTranslations({ locale, namespace: "tools.fuel.meta" });
  return pageMetadata({
    locale,
    pathname: "/outils/indexation-gazole",
    title: t("title"),
    description: t("description"),
  });
}

export default async function FuelIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "tools.fuel" });

  return (
    <>
      <section className="border-b border-ink-200 bg-white py-14 lg:py-16">
        <Container>
          <h1 className="max-w-3xl text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl lg:text-[42px]">
            {t("h1")}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-ink-600">
            {t("lede")}
          </p>
          <p className="mt-5 inline-flex items-start gap-2 rounded-lg bg-brand-50 px-4 py-3 text-sm text-brand-900 ring-1 ring-inset ring-brand-200">
            <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            {t("privacy")}
          </p>
        </Container>
      </section>

      <Section>
        <FuelIndexCalculator />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-ink-200 bg-white p-6">
            <h2 className="text-base font-semibold text-ink-900">{t("source.title")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("source.body")}</p>
            <p className="mt-3 rounded-lg border-2 border-dashed border-ink-300 bg-ink-50 px-4 py-3 text-sm text-ink-500">
              {t("source.placeholder")}
            </p>
          </div>
          <div className="rounded-xl border border-ink-200 bg-ink-50 p-6">
            <p className="text-sm leading-relaxed text-ink-600">{t("disclaimer")}</p>
          </div>
        </div>
      </Section>

      <section className="border-t border-ink-200 bg-ink-950 py-16 lg:py-20">
        <Container>
          <div className="max-w-3xl">
            <h2 className="text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {t("cta.h2")}
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/70">
              {t("cta.text")}
            </p>
            <SignupButton source="fuel-tool" size="lg" className="mt-7">
              {t("cta.button")} <ArrowRight className="h-4 w-4" aria-hidden />
            </SignupButton>
          </div>
        </Container>
      </section>
    </>
  );
}
