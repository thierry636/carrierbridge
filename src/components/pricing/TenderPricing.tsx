import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";

export function TenderPricing() {
  const t = useTranslations("pricing.tenders");
  const items = t.raw("items") as { name: string; scope: string; price: string }[];

  return (
    <Section>
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <ul className="mt-10 divide-y divide-ink-200 rounded-xl border border-ink-200">
        {items.map((item) => (
          <li key={item.name} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-base font-semibold text-ink-900">{item.name}</p>
              <p className="text-sm text-ink-600">{item.scope}</p>
            </div>
            <p className="text-lg font-bold tracking-tight text-ink-950">{item.price}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
