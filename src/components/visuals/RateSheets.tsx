import { useLocale, useTranslations } from "next-intl";
import { FileSpreadsheet, FileText } from "lucide-react";
import { VisualFrame, useNumber } from "./frame";
import { cn } from "@/lib/utils";

/** Two sheets, deliberately incompatible: different brackets, different zones. */
const SHEET_A = [
  ["0 – 10 kg", 12.4, 14.1],
  ["10 – 20 kg", 18.2, 21.5],
  ["20 – 30 kg", 24.6, 28.3],
];
const SHEET_B = [
  ["0 – 30", 21.1, 23.4, 26.0],
  ["30 – 100", 38.7, 42.2, 47.9],
];

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
          rows={SHEET_A.map((r) => [r[0] as string, ...(r.slice(1) as number[]).map((v) => num(v))])}
        />
        <MiniSheet
          icon={<FileText className="h-3.5 w-3.5" />}
          name={t("sheetB")}
          headers={headersB}
          rows={SHEET_B.map((r) => [r[0] as string, ...(r.slice(1) as number[]).map((v) => num(v))])}
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

/** Same three carriers on one base; the cheapest cell of each row is marked. */
const NORMALISED = [
  { bracket: "0 – 10 kg", prices: [12.4, 13.8, 11.9] },
  { bracket: "10 – 20 kg", prices: [18.2, 19.4, 17.6] },
  { bracket: "20 – 30 kg", prices: [24.6, 23.1, 25.2] },
  { bracket: "30 – 50 kg", prices: [31.8, 30.4, 33.1] },
];

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
          {NORMALISED.map((row) => {
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
