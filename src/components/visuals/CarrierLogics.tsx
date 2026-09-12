import { useLocale, useTranslations } from "next-intl";
import { VisualFrame, useEuro } from "./frame";
import { carrierLogics } from "@/lib/demo-figures";

/**
 * The payoff of the import block: three carriers priced on three different
 * bases, each kept as its own. Nothing here is flattened onto a shared scale —
 * that conversion belongs to the moment a shipment is priced.
 */
export function CarrierLogics() {
  const t = useTranslations("home.visuals.logics");
  const locale = useLocale();
  const euro = useEuro(locale);
  const cards = t.raw("cards") as {
    carrier: string;
    structure: string;
    sample: string[];
    unit: string;
  }[];

  return (
    <VisualFrame title={t("title")} caption={t("caption")}>
      <div className="space-y-3">
        {cards.map((card, index) => (
          <div key={card.carrier} className="rounded-lg border border-ink-200 bg-white p-3.5">
            <div className="flex items-baseline justify-between gap-3">
              <p className="text-xs font-semibold text-ink-900">{card.carrier}</p>
              <p className="text-[10px] uppercase tracking-wide text-ink-500">{card.unit}</p>
            </div>
            <p className="mt-0.5 text-[11px] text-brand-700">{card.structure}</p>

            <dl className="mt-2.5 space-y-1 border-t border-ink-100 pt-2.5">
              {card.sample.map((label, i) => (
                <div key={label} className="flex items-baseline justify-between gap-3">
                  <dt className="text-[11px] text-ink-600">{label}</dt>
                  <dd className="text-[11px] font-medium tabular-nums text-ink-800">
                    {euro(carrierLogics[index].prices[i])}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </VisualFrame>
  );
}
