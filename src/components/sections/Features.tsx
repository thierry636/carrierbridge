import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./SectionHeader";
import {
  MessageSquare,
  Database,
  ShieldCheck,
  FileSpreadsheet,
  Tags,
  Scale,
} from "lucide-react";

// 3 first = sourcing pillar · 3 last = pricing pillar
const icons = [MessageSquare, Database, ShieldCheck, FileSpreadsheet, Tags, Scale];

const tones = [
  "bg-brand-50 text-brand-600",
  "bg-brand-50 text-brand-600",
  "bg-brand-50 text-brand-600",
  "bg-cyan-50 text-cyan-600",
  "bg-cyan-50 text-cyan-600",
  "bg-cyan-50 text-cyan-600",
];

export function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="features" className="bg-ink-50/60 py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i] ?? MessageSquare;
            const tone = tones[i] ?? tones[0];
            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-ink-200 bg-white p-7 transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)]"
              >
                <span
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${tone}`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink-900">
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
