import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  const t = useTranslations("legal.common");

  return (
    <article className="py-14 lg:py-20">
      <Container>
        <div className="max-w-3xl">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-ink-500">{t("lastUpdated")}</p>
          {intro && <p className="mt-6 text-base leading-relaxed text-ink-700">{intro}</p>}
          <div className="mt-10 space-y-10">{children}</div>
          <p className="mt-12 border-t border-ink-200 pt-6 text-sm text-ink-600">
            {t("contactLine")}
          </p>
        </div>
      </Container>
    </article>
  );
}

/** Section bodies use "\n" to separate paragraphs, so each line stays readable. */
export function LegalSections({ sections }: { sections: { title: string; body: string }[] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="text-lg font-semibold text-ink-900">{section.title}</h2>
          <div className="mt-3 space-y-3">
            {section.body.split("\n").map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-ink-600">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}
