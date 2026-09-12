import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "@/components/ui/section";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

export function Support() {
  const t = useTranslations("home.support");
  const tp = useTranslations("pricing.onboarding");
  const items = tp.raw("items") as {
    name: string;
    price: string;
    summary: string;
    details: string;
    note?: string;
    cta: string;
  }[];

  return (
    <Section id="accompagnement" tone="muted">
      <SectionHeading title={t("h2")} lede={t("lede")} />
      <p className="mt-5 max-w-3xl text-base font-medium text-ink-900">{t("tagline")}</p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.name} className="flex flex-col rounded-xl border border-ink-200 bg-white p-6">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink-900">{item.name}</h3>
              <p className="text-xl font-bold tracking-tight text-ink-950">{item.price}</p>
            </div>
            <p className="mt-2 text-sm font-medium text-ink-800">{item.summary}</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">{item.details}</p>
            {item.note && <p className="mt-3 text-xs leading-relaxed text-ink-500">{item.note}</p>}
            <Link
              href="/contact"
              className={`${buttonVariants({ variant: "secondary", size: "md" })} mt-6 w-full`}
            >
              {item.cta}
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
