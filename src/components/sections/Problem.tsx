import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./SectionHeader";
import { AlertTriangle, Clock, ScanSearch } from "lucide-react";

const icons = [AlertTriangle, Clock, ScanSearch];

export function Problem() {
  const t = useTranslations("problem");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? AlertTriangle;
            return (
              <div
                key={item.title}
                className="rounded-2xl border border-ink-200 bg-white p-7 transition-colors hover:border-brand-200 hover:bg-brand-50/30"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-ink-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
