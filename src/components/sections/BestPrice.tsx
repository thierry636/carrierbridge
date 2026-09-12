import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Screenshot } from "@/components/ui/screenshot";
import { PriceBreakdown } from "@/components/visuals/PriceBreakdown";

export function BestPrice() {
  const t = useTranslations("home.bestPrice");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="calculatrice" tone="muted">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <Screenshot id="bestPrice" ratio="aspect-[4/3]">
          <PriceBreakdown />
        </Screenshot>
        <dl className="grid gap-6">
          {items.map((item) => (
            <div key={item.title} className="border-t border-ink-200 pt-4">
              <dt className="text-base font-semibold text-ink-900">{item.title}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
