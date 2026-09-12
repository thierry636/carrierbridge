import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Screenshot } from "@/components/ui/screenshot";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

export function FuelControl() {
  const t = useTranslations("home.fuel");
  const tc = useTranslations("common");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <Section id="indexation-gazole">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ol className="space-y-8">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span
                aria-hidden
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <Screenshot id="fuelGap" ratio="aspect-[4/3]" />
      </div>

      <div className="mt-12 rounded-xl border border-ink-200 bg-ink-50 p-6 lg:flex lg:items-center lg:justify-between lg:gap-8">
        <div className="max-w-2xl">
          <p className="text-sm leading-relaxed text-ink-700">{t("disclaimer")}</p>
          <p className="mt-3 text-base font-medium text-ink-900">{t("toolTeaser")}</p>
        </div>
        <Link
          href="/outils/indexation-gazole"
          className={`${buttonVariants({ size: "md" })} mt-5 lg:mt-0 lg:shrink-0`}
        >
          {tc("cta.fuelToolFree")} <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
