import { useLocale, useTranslations } from "next-intl";
import { FileSpreadsheet, FileText } from "lucide-react";
import { VisualFrame, useNumber } from "./frame";
import { normalisedSheet, rawSheets } from "@/lib/demo-figures";
import { cn } from "@/lib/utils";

export function RateSheetBefore() {
  const t = useTranslations("home.visuals.before");
  const locale = useLocale();
  const num = useNumber(locale);
  const headersA = t.raw("headersA") as string[];
  const headersB = t.raw("headersB") as string[];

  return (
    <VisualFrame title={t("title")} caption={t("caption")}>
      <div className="space-y-4">
        <MiniSheet
          icon={<FileSpreadsheet className="h-3.5 w-3.5" />}
          name={t("sheetA")}
          headers={headersA}
          rows={rawSheets.a.map((r) => [r[0] as string, ...(r.slice(1) as number[]).map((v) => num(v))])}
        />
        <MiniSheet
          icon={<FileText className="h-3.5 w-3.5" />}
          name={t("sheetB")}
          headers={headersB}
          rows={rawSheets.b.map((r) => [r[0] as string, ...(r.slice(1) as number[]).map((v) => num(v))])}
        />
      </div>
    </VisualFrame>
  );
}

function MiniSheet({
  icon,
  name,
  headers,
  rows,
}: {
  icon: React.ReactNode;
  name: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-ink-200">
      <p className="flex items-center gap-1.5 border-b border-ink-200 bg-ink-50 px-3 py-1.5 font-mono text-[11px] text-ink-600">
        <span className="text-ink-400" aria-hidden>
          {icon}
        </span>
        {name}
      </p>
      <table className="w-full text-[11px]">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-3 py-1.5 text-left font-semibold text-ink-500">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]} className="border-t border-ink-100">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={cn("px-3 py-1.5 tabular-nums", i === 0 ? "text-ink-700" : "text-ink-600")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


export function RateSheetAfter() {
  const t = useTranslations("home.visuals.after");
  const locale = useLocale();
  const num = useNumber(locale);
  const headers = t.raw("headers") as string[];

  return (
    <VisualFrame title={t("title")} caption={t("caption")}>
      <table className="w-full text-xs">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th
                key={header}
                scope="col"
                className={cn(
                  "pb-2 font-semibold text-ink-500",
                  i === 0 ? "text-left" : "text-right"
                )}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {normalisedSheet.map((row) => {
            const best = Math.min(...row.prices);
            return (
              <tr key={row.bracket} className="border-t border-ink-100">
                <th scope="row" className="py-2 text-left font-medium text-ink-700">
                  {row.bracket}
                </th>
                {row.prices.map((price, i) => (
                  <td key={i} className="py-2 text-right tabular-nums">
                    <span
                      className={cn(
                        price === best
                          ? "rounded bg-brand-50 px-1.5 py-0.5 font-semibold text-brand-800 ring-1 ring-inset ring-brand-200"
                          : "text-ink-600"
                      )}
                    >
                      {num(price)}
                    </span>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </VisualFrame>
  );
}
