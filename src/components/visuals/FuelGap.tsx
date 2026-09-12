import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";
import { VisualFrame, useEuro, useNumber } from "./frame";

/** Figures chosen so a reader can redo the arithmetic in their head. */
const SHARE = 32;
const BASE_INDEX = 120;
const PERIOD_INDEX = 133.5;
const INVOICED_RATE = 4.9;
const BASIS = 42000;

const expectedRate = (SHARE * (PERIOD_INDEX - BASE_INDEX)) / BASE_INDEX;
const gapPoints = INVOICED_RATE - expectedRate;
const gapAmount = (BASIS * gapPoints) / 100;

export function FuelGap() {
  const t = useTranslations("home.visuals.fuelGap");
  const locale = useLocale();
  const euro = useEuro(locale);
  const num = useNumber(locale);
  const rows = t.raw("rows") as string[];
  const values = [`${num(SHARE, 0)} %`, num(BASE_INDEX, 2), num(PERIOD_INDEX, 2)];

  return (
    <VisualFrame title={t("title")} subtitle={t("contract")} caption={t("caption")}>
      <dl className="space-y-2 border-b border-ink-100 pb-4">
        {rows.map((label, i) => (
          <div key={label} className="flex items-baseline justify-between gap-4">
            <dt className="text-xs text-ink-600">{label}</dt>
            <dd className="text-xs font-medium tabular-nums text-ink-800">{values[i]}</dd>
          </div>
        ))}
      </dl>

      <dl className="mt-4 space-y-2">
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-xs text-ink-600">{t("expected")}</dt>
          <dd className="text-sm font-medium tabular-nums text-ink-800">{num(expectedRate)} %</dd>
        </div>
        <div className="flex items-baseline justify-between gap-4">
          <dt className="text-xs text-ink-600">{t("invoiced")}</dt>
          <dd className="text-sm font-medium tabular-nums text-ink-800">{num(INVOICED_RATE)} %</dd>
        </div>
      </dl>

      <div className="mt-4 rounded-lg bg-amber-50 px-4 py-3 ring-1 ring-inset ring-amber-200">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-2 text-xs font-semibold text-amber-900">
            <AlertTriangle className="h-4 w-4" aria-hidden />
            {t("gap")}
          </span>
          <span className="text-sm font-bold tabular-nums text-amber-900">
            + {num(gapPoints)} {t("gapUnit")}
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-amber-200 pt-2">
          <span className="text-xs text-amber-900/80">{t("basis")}</span>
          <span className="text-base font-bold tabular-nums text-amber-900">+ {euro(gapAmount)}</span>
        </div>
      </div>
    </VisualFrame>
  );
}
