import { useTranslations } from "next-intl";
import { ShieldCheck, Gauge, Handshake, Scale } from "lucide-react";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { CaptureReservee } from "@/components/ui/capture-reservee";

const ruleIcons = [ShieldCheck, Gauge, Handshake];

export function AssignmentConstraints() {
  const t = useTranslations("home.assignment");
  const rules = t.raw("rules.items") as {
    title: string;
    lede: string;
    points: string[];
  }[];
  const paragraphs = t.raw("engine.paragraphs") as string[];
  const indicators = t.raw("tracking.indicators") as string[];

  return (
    <Section id="affectation" tone="muted">
      <SectionHeading eyebrow={<Badge>{t("badge")}</Badge>} title={t("h2")} lede={t("lede")} />

      <h3 className="mt-14 text-lg font-semibold text-ink-900">{t("rules.title")}</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {rules.map((rule, index) => {
          const Icon = ruleIcons[index] ?? ShieldCheck;
          return (
            <article key={rule.title} className="rounded-xl border border-ink-200 bg-white p-6">
              <Icon className="h-5 w-5 text-brand-600" aria-hidden />
              <h4 className="mt-4 text-base font-semibold text-ink-900">{rule.title}</h4>
              <p className="mt-1 text-sm text-ink-600">{rule.lede}</p>
              <ul className="mt-4 space-y-2 border-t border-ink-100 pt-4">
                {rule.points.map((point) => (
                  <li key={point} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <h3 className="text-lg font-semibold text-ink-900">{t("engine.title")}</h3>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-ink-600">
              {paragraph}
            </p>
          ))}
          <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
            <p className="text-sm leading-relaxed text-ink-800">
              <strong className="font-semibold text-ink-950">
                {t("engine.traceability.title")}
              </strong>{" "}
              {t("engine.traceability.text")}
            </p>
          </div>
        </div>
        <CaptureReservee legende={t("engine.capture")} />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <h3 className="text-lg font-semibold text-ink-900">{t("tracking.title")}</h3>
          <p className="mt-4 text-base leading-relaxed text-ink-600">{t("tracking.text")}</p>
          <ul className="mt-6 space-y-2.5">
            {indicators.map((indicator) => (
              <li key={indicator} className="flex gap-2.5 text-sm leading-relaxed text-ink-700">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-600" />
                {indicator}
              </li>
            ))}
          </ul>
        </div>
        <CaptureReservee legende={t("tracking.capture")} />
      </div>

      {/* The one thing no competitor puts a number on, so it gets the weight. */}
      <div className="mt-16 rounded-2xl bg-ink-950 p-8 lg:p-10">
        <div className="flex max-w-3xl gap-5">
          <Scale className="mt-1 hidden h-7 w-7 shrink-0 text-brand-400 sm:block" aria-hidden />
          <div>
            <h3 className="text-xl font-bold tracking-tight text-white">{t("cost.title")}</h3>
            <p className="mt-4 text-base leading-relaxed text-white/75">{t("cost.text")}</p>
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-600">{t("disclaimer")}</p>
    </Section>
  );
}
