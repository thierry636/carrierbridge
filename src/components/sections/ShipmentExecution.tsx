import { useTranslations } from "next-intl";
import { FileCheck2, Link2, Receipt } from "lucide-react";
import { Section, SectionHeading, Badge } from "@/components/ui/section";
import { CaptureReservee } from "@/components/ui/capture-reservee";

export function ShipmentExecution() {
  const t = useTranslations("home.execution");
  const steps = t.raw("lifecycle.steps") as { title: string; text: string }[];
  const linkParagraphs = t.raw("link.paragraphs") as string[];
  const linkPoints = t.raw("link.points") as { title: string; text: string }[];
  const documents = t.raw("documents.paragraphs") as string[];
  const invoice = t.raw("invoice.paragraphs") as string[];

  return (
    <Section id="execution">
      <SectionHeading eyebrow={<Badge>{t("badge")}</Badge>} title={t("h2")} lede={t("lede")} />

      <h3 className="mt-14 text-lg font-semibold text-ink-900">{t("lifecycle.title")}</h3>
      <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step.title} className="border-t-2 border-ink-200 pt-4">
            <span className="text-xs font-semibold tabular-nums text-brand-600">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-2 text-base font-semibold text-ink-900">{step.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.text}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10 lg:max-w-3xl">
        <CaptureReservee legende={t("lifecycle.capture")} />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <div>
          <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink-900">
            <Link2 className="h-5 w-5 text-brand-600" aria-hidden />
            {t("link.title")}
          </h3>
          {linkParagraphs.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-ink-600">
              {paragraph}
            </p>
          ))}
          <dl className="mt-6 space-y-4 border-t border-ink-200 pt-6">
            {linkPoints.map((point) => (
              <div key={point.title}>
                <dt className="text-sm font-semibold text-ink-900">{point.title}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-ink-600">{point.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <CaptureReservee legende={t("link.capture")} />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink-900">
            <FileCheck2 className="h-5 w-5 text-brand-600" aria-hidden />
            {t("documents.title")}
          </h3>
          {documents.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-ink-600">
              {paragraph}
            </p>
          ))}
        </div>

        {/* The loop most shippers never close, so it gets the emphasis — tinted
            rather than dark, since the assignment section already uses dark. */}
        <div className="rounded-2xl border border-brand-200 bg-brand-50 p-7">
          <h3 className="flex items-center gap-2.5 text-lg font-semibold text-ink-950">
            <Receipt className="h-5 w-5 text-brand-600" aria-hidden />
            {t("invoice.title")}
          </h3>
          {invoice.map((paragraph) => (
            <p key={paragraph} className="mt-4 text-base leading-relaxed text-ink-700">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-600">{t("disclaimer")}</p>
    </Section>
  );
}
