import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Screenshot } from "@/components/ui/screenshot";
import { ImportSheet } from "@/components/visuals/ImportSheet";

export function GridImport() {
  const t = useTranslations("home.import");
  const formats = t.raw("formats") as string[];
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="import">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-2">
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
          <p className="mt-2.5 text-sm text-ink-500">{t("formatsNote")}</p>

          <dl className="mt-8 space-y-6">
            {items.map((item) => (
              <div key={item.title} className="border-t border-ink-200 pt-4">
                <dt className="text-base font-semibold text-ink-900">{item.title}</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        <Screenshot id="gridBefore" ratio="aspect-[16/9]">
          <ImportSheet />
        </Screenshot>
      </div>
    </Section>
  );
}
