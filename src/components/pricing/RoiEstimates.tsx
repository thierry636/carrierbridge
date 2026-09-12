import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { roiPlanIds } from "@/lib/pricing";

export function RoiEstimates() {
  const t = useTranslations("pricing.roi");
  const tp = useTranslations("pricing.plans");

  return (
    <Section tone="muted">
      <SectionHeading title={t("title")} />

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {roiPlanIds.map((id) => (
          <article key={id} className="rounded-xl border border-ink-200 bg-white p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              {tp(`${id}.name`)}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-ink-800">{t(`items.${id}`)}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-500">{t("disclaimer")}</p>
    </Section>
  );
}
