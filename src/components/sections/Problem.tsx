import { useTranslations } from "next-intl";
import { FileSpreadsheet, Layers, Fuel } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";

const icons = [FileSpreadsheet, Layers, Fuel];

export function Problem() {
  const t = useTranslations("home.problem");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <Section id="probleme" tone="muted">
      <SectionHeading title={t("h2")} lede={t("lede")} />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index] ?? FileSpreadsheet;
          return (
            <article key={item.title} className="rounded-xl border border-ink-200 bg-white p-6">
              <Icon className="h-6 w-6 text-brand-600" aria-hidden />
              <h3 className="mt-4 text-base font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.text}</p>
            </article>
          );
        })}
      </div>

      <p className="mt-10 max-w-3xl border-l-2 border-brand-600 pl-5 text-base leading-relaxed text-ink-800">
        {t("consequence")}
      </p>
    </Section>
  );
}
