import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";

export function CarrierRegistry() {
  const t = useTranslations("home.registry");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="referentiel" tone="muted">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="rounded-xl border border-ink-200 bg-white p-6">
            <h3 className="text-base font-semibold text-ink-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-600">{t("disclaimer")}</p>
    </Section>
  );
}
