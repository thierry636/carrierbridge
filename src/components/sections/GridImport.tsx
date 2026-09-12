import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Screenshot } from "@/components/ui/screenshot";
import { RateSheetBefore, RateSheetAfter } from "@/components/visuals/RateSheets";

export function GridImport() {
  const t = useTranslations("home.import");
  const formats = t.raw("formats") as string[];
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="import">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-ink-500">{t("formatsLabel")} :</span>
        {formats.map((format) => (
          <span
            key={format}
            className="rounded-md bg-ink-100 px-2.5 py-1 text-sm font-medium text-ink-700"
          >
            {format}
          </span>
        ))}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item) => (
            <div key={item.title} className="border-t border-ink-200 pt-4">
              <dt className="text-base font-semibold text-ink-900">{item.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.text}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-4">
          <figure>
            <Screenshot id="gridBefore" ratio="aspect-[16/9]">
              <RateSheetBefore />
            </Screenshot>
            <figcaption className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-500">
              {t("visual.beforeLabel")}
            </figcaption>
          </figure>
          <figure>
            <Screenshot id="gridAfter" ratio="aspect-[16/9]">
              <RateSheetAfter />
            </Screenshot>
            <figcaption className="mt-2 text-xs font-medium uppercase tracking-wide text-ink-500">
              {t("visual.afterLabel")}
            </figcaption>
          </figure>
        </div>
      </div>
    </Section>
  );
}
