import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/**
 * Shared shell for the schematic visuals. They are drawn rather than
 * photographed so they stay legible at the width they actually occupy, and
 * every one of them is labelled as an example — the figures illustrate the
 * mechanism, they are not client data.
 */
export function VisualFrame({
  title,
  subtitle,
  caption,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  caption?: string;
  children: ReactNode;
  className?: string;
}) {
  const t = useTranslations("home.visuals");

  return (
    <figure className={cn("overflow-hidden rounded-xl border border-ink-200 bg-white", className)}>
      <div className="flex items-start justify-between gap-4 border-b border-ink-200 bg-ink-50 px-5 py-3.5">
        <div>
          <p className="text-sm font-semibold text-ink-900">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ink-500">{subtitle}</p>}
        </div>
        <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide text-ink-500 ring-1 ring-inset ring-ink-200">
          {t("note")}
        </span>
      </div>

      <div className="px-5 py-5">{children}</div>

      {caption && (
        <figcaption className="border-t border-ink-100 bg-white px-5 py-3.5 text-xs leading-relaxed text-ink-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** Money, formatted for the active locale. */
export function useEuro(locale: string) {
  return (amount: number, decimals = 2) =>
    new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
}

export function useNumber(locale: string) {
  return (value: number, decimals = 2) =>
    new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
}
