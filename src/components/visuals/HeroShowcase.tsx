import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import { useEuro, useNumber } from "./frame";
import { bestQuote, fuelExample, gapToBest, shipmentQuotes } from "@/lib/demo-figures";

/**
 * The hero has one job: make the product feel real before a word is read.
 * So this is dressed as an application surface — dark chrome, elevated
 * winning row, and a second card breaking out of the frame — rather than the
 * flat figure used in the sections further down.
 */
export function HeroShowcase() {
  const t = useTranslations("home.visuals.ranking");
  const tv = useTranslations("home.visuals");
  const locale = useLocale();
  const euro = useEuro(locale);
  const num = useNumber(locale);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl bg-white shadow-[0_28px_70px_-24px_rgba(15,23,42,0.35)] ring-1 ring-ink-900/10">
        {/* Application chrome: the dark band is what separates a product from a table. */}
        <div className="flex items-center gap-2.5 bg-ink-950 px-4 py-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-600" aria-hidden>
            <svg viewBox="0 0 32 32" className="h-4 w-4">
              <path d="M7 21c0-5 4-9 9-9s9 4 9 9" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
              <path d="M7 21h18" stroke="white" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </span>
          <p className="text-[13px] font-medium text-white">{t("appLabel")}</p>
          <span className="ml-auto text-[11px] font-medium text-white/60">{tv("note")}</span>
        </div>

        <div className="border-b border-ink-100 px-5 py-3.5">
          <p className="text-sm font-semibold text-ink-900">{t("shipment")}</p>
          <p className="mt-0.5 text-xs text-ink-500">{t("options")}</p>
        </div>

        <div className="space-y-2 px-5 py-5">
          {shipmentQuotes.map((quote, index) => {
            const isBest = index === 0;
            if (isBest) {
              return (
                <div
                  key={quote.carrier}
                  className="relative overflow-hidden rounded-xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(37,99,235,0.45)] ring-1 ring-brand-200"
                >
                  <span className="absolute inset-y-0 left-0 w-1 bg-brand-600" aria-hidden />
                  <div className="flex items-center gap-3 pl-2">
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white"
                    >
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    <div className="flex-1">
                      <p className="text-[15px] font-semibold text-ink-950">
                        {t("carrier", { letter: quote.carrier })}
                      </p>
                      <p className="text-xs font-medium text-brand-700">{t("bestCaption")}</p>
                    </div>
                    <p className="text-xl font-bold tabular-nums tracking-tight text-ink-950">
                      {euro(quote.price)}
                    </p>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={quote.carrier}
                className="flex items-center gap-3 rounded-lg px-4 py-2.5"
              >
                <span
                  aria-hidden
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-50 text-xs font-semibold text-ink-500 ring-1 ring-inset ring-ink-200"
                >
                  {quote.carrier}
                </span>
                <p className="flex-1 text-sm text-ink-600">
                  {t("carrier", { letter: quote.carrier })}
                </p>
                <p className="text-sm font-medium tabular-nums text-ink-500">{euro(quote.price)}</p>
                <p className="w-14 shrink-0 text-right text-xs tabular-nums text-ink-500">
                  + {gapToBest(quote.price)} %
                </p>
              </div>
            );
          })}
        </div>

        {/* Right-aligned so the alert card can overhang the bottom-left corner. */}
        <div className="flex items-center justify-end gap-2 border-t border-ink-100 bg-ink-50/70 px-5 py-3">
          <p className="text-xs text-ink-600">{t("sheetsQueried", { count: 12 })}</p>
          <ArrowRight className="h-3.5 w-3.5 text-brand-600" aria-hidden />
        </div>
      </div>

      {/* Breaks out of the card: depth, and the second value proposition in the hero. */}
      <div className="absolute -bottom-10 -left-10 hidden w-60 rounded-xl bg-white p-4 shadow-[0_18px_45px_-18px_rgba(15,23,42,0.4)] ring-1 ring-ink-900/10 lg:block">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100" aria-hidden>
            <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
          </span>
          <p className="text-xs font-semibold text-ink-900">{t("alert.title")}</p>
        </div>
        <p className="mt-2.5 text-2xl font-bold tabular-nums tracking-tight text-ink-950">
          + {euro(fuelExample.gapAmount)}
        </p>
        <p className="mt-0.5 text-xs text-ink-500">
          {t("alert.detail", { points: num(fuelExample.gapPoints) })}
        </p>
      </div>
    </div>
  );
}

/** Kept so the best price stays quotable elsewhere without re-deriving it. */
export const heroBestPrice = bestQuote.price;
