import { useLocale, useTranslations } from "next-intl";
import { VisualFrame, useEuro } from "./frame";
import { bestBreakdownTotal, priceBreakdown } from "@/lib/demo-figures";
import { cn } from "@/lib/utils";


export function PriceBreakdown() {
  const t = useTranslations("home.visuals.breakdown");
  const locale = useLocale();
  const euro = useEuro(locale);
  const columns = t.raw("columns") as string[];
  const rows = t.raw("rows") as string[];

  return (
    <VisualFrame title={t("title")} subtitle={t("shipment")} caption={t("caption")}>
      <table className="w-full text-xs">
        <thead>
          <tr>
            <th scope="col" className="pb-2 text-left font-semibold text-ink-500">
              <span className="sr-only">{t("total")}</span>
            </th>
            {columns.map((column) => (
              <th key={column} scope="col" className="pb-2 text-right font-semibold text-ink-700">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((label, rowIndex) => (
            <tr key={label} className="border-t border-ink-100">
              <th scope="row" className="py-2 text-left font-normal text-ink-600">
                {label}
              </th>
              {priceBreakdown.map((line, i) => (
                <td key={i} className="py-2 text-right tabular-nums text-ink-700">
                  {euro(line.values[rowIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t-2 border-ink-300">
            <th scope="row" className="pt-3 text-left font-semibold text-ink-900">
              {t("total")}
            </th>
            {priceBreakdown.map((line, i) => (
              <td key={i} className="pt-3 text-right">
                <span
                  className={cn(
                    "tabular-nums",
                    line.total === bestBreakdownTotal
                      ? "rounded bg-brand-50 px-2 py-1 text-sm font-bold text-brand-800 ring-1 ring-inset ring-brand-200"
                      : "text-sm font-medium text-ink-500"
                  )}
                >
                  {euro(line.total)}
                </span>
              </td>
            ))}
          </tr>
        </tfoot>
      </table>
    </VisualFrame>
  );
}
