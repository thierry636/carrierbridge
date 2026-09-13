import { useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Positioning, deliberately plain: this reads as a boundary drawn on purpose,
 * not as an apology. No panel, no colour block — two lists and a closing line.
 */
export function ProductScope() {
  const t = useTranslations("home.scope");
  const intro = t.raw("intro") as string[];
  const does = t.raw("does") as { title: string; lede: string; items: string[] };
  const doesNot = t.raw("doesNot") as { title: string; lede: string; items: string[] };

  return (
    <Section id="perimetre" tone="muted">
      <SectionHeading title={t("h2")} />
      <div className="mt-6 max-w-3xl space-y-4">
        {intro.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-ink-600">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        <ScopeList variant="does" heading={does.title} lede={does.lede} items={does.items} />
        <ScopeList variant="doesNot" heading={doesNot.title} lede={doesNot.lede} items={doesNot.items} />
      </div>

      <p className="mt-10 max-w-3xl text-base leading-relaxed text-ink-800">{t("closing")}</p>
    </Section>
  );
}

function ScopeList({
  variant,
  heading,
  lede,
  items,
}: {
  variant: "does" | "doesNot";
  heading: string;
  lede: string;
  items: string[];
}) {
  const isDoes = variant === "does";
  const Icon = isDoes ? Check : Minus;

  return (
    <section
      className={cn(
        "rounded-xl border bg-white p-6",
        isDoes ? "border-brand-200" : "border-ink-200"
      )}
    >
      <h3 className="text-base font-semibold text-ink-900">{heading}</h3>
      <p className="mt-1 text-sm text-ink-600">{lede}</p>
      <ul className="mt-5 space-y-3 border-t border-ink-100 pt-5">
        {items.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-700">
            <Icon
              aria-hidden
              className={cn("mt-0.5 h-4 w-4 shrink-0", isDoes ? "text-brand-600" : "text-ink-400")}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
