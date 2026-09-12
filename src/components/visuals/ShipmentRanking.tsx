import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { VisualFrame, useEuro } from "./frame";
import { cn } from "@/lib/utils";

/** Prices rise from the best one; the gap column is derived, never hand-typed. */
const QUOTES = [
  { carrier: "A", price: 187.4 },
  { carrier: "B", price: 201.1 },
  { carrier: "C", price: 214.8 },
  { carrier: "D", price: 229.0 },
];

export function ShipmentRanking() {
  const t = useTranslations("home.visuals.ranking");
  const locale = useLocale();
  const euro = useEuro(locale);
  const best = QUOTES[0].price;

  return (
    <VisualFrame
      title={t("title")}
      subtitle={`${t("shipment")} · ${t("options")}`}
      caption={t("footnote")}
    >
      <ul className="space-y-1.5">
        {QUOTES.map((quote, index) => {
          const isBest = index === 0;
          const gap = Math.round(((quote.price - best) / best) * 100);
          return (
            <li
              key={quote.carrier}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                isBest ? "bg-brand-50 ring-1 ring-inset ring-brand-200" : "bg-ink-50/60"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  isBest ? "bg-brand-600 text-white" : "bg-white text-ink-500 ring-1 ring-inset ring-ink-200"
                )}
              >
                {isBest ? <Check className="h-3.5 w-3.5" /> : quote.carrier}
              </span>
              <span className={cn("flex-1 text-sm", isBest ? "font-semibold text-ink-900" : "text-ink-700")}>
                {t("carrier", { letter: quote.carrier })}
              </span>
              <span
                className={cn(
                  "text-sm tabular-nums",
                  isBest ? "font-bold text-ink-950" : "font-medium text-ink-700"
                )}
              >
                {euro(quote.price)}
              </span>
              <span
                className={cn(
                  "w-20 shrink-0 text-right text-xs tabular-nums",
                  isBest ? "font-semibold text-brand-700" : "text-ink-500"
                )}
              >
                {isBest ? t("best") : `+ ${gap} %`}
              </span>
            </li>
          );
        })}
      </ul>
    </VisualFrame>
  );
}
