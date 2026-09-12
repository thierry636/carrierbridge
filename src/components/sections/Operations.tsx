import { useTranslations } from "next-intl";
import { Section, SectionHeading, Badge } from "@/components/ui/section";

export function Operations() {
  const t = useTranslations("home.operations");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="exploitation">
      <SectionHeading eyebrow={<Badge>{t("badge")}</Badge>} title={t("h2")} lede={t("lede")} />

      <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.title} className="rounded-xl border border-ink-200 bg-white p-6">
            <span className="text-xs font-semibold tabular-nums text-brand-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-base font-semibold text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
