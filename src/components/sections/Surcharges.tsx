import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";

export function Surcharges() {
  const t = useTranslations("home.surcharges");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="prestations-annexes" tone="muted">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-ink-200 bg-ink-200 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <li key={item.title} className="bg-white p-6">
            <h3 className="text-base font-semibold text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p>
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink-800">{t("conclusion")}</p>
    </Section>
  );
}
