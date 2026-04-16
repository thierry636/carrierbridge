import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "./SectionHeader";

export function HowItWorks() {
  const t = useTranslations("howItWorks");
  const steps = t.raw("steps") as { title: string; text: string }[];

  return (
    <section className="bg-white py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="relative mt-16">
          {/* Decorative connecting line for large screens */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-8 top-7 hidden h-px bg-gradient-to-r from-transparent via-brand-200 to-transparent lg:block"
          />
          <ol className="relative grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <div className="flex items-start gap-4 lg:flex-col lg:items-center lg:text-center">
                  <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-lg font-bold text-white shadow-lg shadow-brand-600/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:mt-4">
                    <h3 className="text-lg font-semibold text-ink-900">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
