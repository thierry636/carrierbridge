import { useLocale, useTranslations } from "next-intl";
import { Check, FileSpreadsheet, MessageSquareText } from "lucide-react";
import { VisualFrame, useNumber } from "./frame";
import { messySheet } from "@/lib/demo-figures";
import { cn } from "@/lib/utils";

/**
 * One compact card for the whole import story: the file as it lands, and the
 * agent settling the one ambiguity in it. Showing how the sheet is then
 * restructured explains a mechanism nobody is buying.
 */
export function ImportSheet() {
  const t = useTranslations("home.visuals.sheet");
  const locale = useLocale();
  const num = useNumber(locale);
  const tabs = t.raw("tabs") as string[];
  const headers = t.raw("headers") as string[];
  const conditions = t.raw("conditions") as [string, string][];

  return (
    <VisualFrame title={t("title")} caption={t("caption")}>
      <div className="overflow-hidden rounded-lg border border-ink-200">
        <p className="flex items-center gap-1.5 border-b border-ink-200 bg-ink-50 px-3 py-1.5 font-mono text-[11px] text-ink-600">
          <FileSpreadsheet className="h-3.5 w-3.5 text-ink-500" aria-hidden />
          {t("filename")}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[21rem] text-[11px]">
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={header}
                    scope="col"
                    className={cn(
                      "border-b border-ink-200 px-2.5 py-1.5 text-left align-top font-semibold text-ink-500",
                      i === 2 && "bg-amber-50 text-amber-900"
                    )}
                  >
                    {header.split("\n").map((line) => (
                      <span key={line} className="block whitespace-nowrap">
                        {line}
                      </span>
                    ))}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {messySheet.map((row) => (
                <tr key={row.town} className="border-t border-ink-100">
                  <td className="px-2.5 py-1 text-ink-500">{row.dpt}</td>
                  <td className="px-2.5 py-1 text-ink-700">{row.town}</td>
                  {row.prices.map((price, i) => (
                    <td key={i} className="relative px-2.5 py-1 tabular-nums text-ink-600">
                      {price === null ? <span className="text-ink-500">—</span> : num(price)}
                      {"comment" in row && row.comment === i && (
                        <span
                          aria-hidden
                          className="absolute right-0.5 top-0.5 h-0 w-0 border-l-[5px] border-t-[5px] border-l-transparent border-t-red-500"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr className="border-t-2 border-ink-200">
                <td colSpan={5} className="px-2.5 pb-0.5 pt-2 font-semibold text-ink-700">
                  {t("conditionsLabel")}
                </td>
              </tr>
              {conditions.map(([label, value]) => (
                <tr key={label}>
                  <td colSpan={3} className="px-2.5 py-0.5 text-ink-600">
                    {label}
                  </td>
                  <td colSpan={2} className="px-2.5 py-0.5 tabular-nums text-ink-700">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-1 border-t border-ink-200 bg-ink-50 px-2.5 py-1.5">
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={cn(
                "rounded px-2 py-0.5 text-[10px]",
                i === 0
                  ? "bg-white font-semibold text-ink-800 ring-1 ring-inset ring-ink-200"
                  : "text-ink-500"
              )}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2.5">
        <span
          aria-hidden
          className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600"
        >
          <MessageSquareText className="h-3.5 w-3.5 text-white" />
        </span>
        <p className="flex-1 rounded-xl bg-ink-50 px-3.5 py-2.5 text-xs leading-relaxed text-ink-700">
          {t("agentQuestion")}
        </p>
        <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-600 px-2.5 py-1 text-[11px] font-semibold text-white">
          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          {t("agentAnswer")}
        </span>
      </div>
    </VisualFrame>
  );
}
