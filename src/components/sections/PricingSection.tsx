import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PricingPlans } from "@/components/pricing/PricingPlans";
import { Link } from "@/i18n/routing";

export function PricingSection() {
  const t = useTranslations("home.pricingTeaser");

  return (
    <Section id="tarifs">
      <SectionHeading title={t("h2")} lede={t("lede")} />
      <div className="mt-10">
        <PricingPlans />
      </div>
      <Link
        href="/tarifs"
        className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 underline underline-offset-4 hover:text-brand-800"
      >
        {t("allPlans")} <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </Section>
  );
}
