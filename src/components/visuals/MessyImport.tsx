import { useLocale, useTranslations } from "next-intl";
import { FileSpreadsheet, MessageSquareText } from "lucide-react";
import { VisualFrame, useNumber } from "./frame";
import { messySheet } from "@/lib/demo-figures";
import { cn } from "@/lib/utils";

/** What a carrier rate sheet really looks like when it lands in the inbox. */
export function MessySheet() {
  const t = useTranslations("home.visuals.messy");
  const locale = useLocale();
  const num = useNumber(locale);
  const tabs = t.raw("tabs") as string[];
  const headers = t.raw("headers") as string[];
  const conditions = t.raw("conditions") as [string, string][];
  const flags = t.raw("flags") as string[];

  return (
    <VisualFrame title={t("title")} caption={t("caption")}>
      <div className="overflow-hidden rounded-lg border border-ink-200">
        <p className="flex items-center gap-1.5 border-b border-ink-200 bg-ink-50 px-3 py-1.5 font-mono text-[11px] text-ink-600">
          <FileSpreadsheet className="h-3.5 w-3.5 text-ink-400" aria-hidden />
          {t("filename")}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[22rem] text-[11px]">
            <caption className="border-b border-ink-100 bg-ink-50/60 px-3 py-1.5 text-left text-[11px] font-semibold text-ink-700">
              {t("sheetTitle")}
            </caption>
            <thead>
              <tr>
                {headers.map((header, i) => (
                  <th
                    key={header}
                    scope="col"
                    className={cn(
                      "border-b border-ink-200 px-3 py-1.5 text-left align-top font-semibold text-ink-500",
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
                  <td className="px-3 py-1.5 text-ink-500">{row.dpt}</td>
                  <td className="px-3 py-1.5 text-ink-700">{row.town}</td>
                  {row.prices.map((price, i) => (
                    <td key={i} className="relative px-3 py-1.5 tabular-nums text-ink-600">
                      {price === null ? <span className="text-ink-500">—</span> : num(price)}
                      {"comment" in row && row.comment === i && (
                        <span
                          aria-hidden
                          className="absolute right-1 top-1 h-0 w-0 border-l-[5px] border-t-[5px] border-l-transparent border-t-red-500"
                        />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td colSpan={5} className="px-3 pb-1 pt-3 text-[11px] font-semibold text-ink-700">
                  {t("conditionsLabel")}
                </td>
              </tr>
              {conditions.map(([label, value]) => (
                <tr key={label}>
                  <td colSpan={3} className="px-3 py-1 text-ink-600">
                    {label}
                  </td>
                  <td colSpan={2} className="px-3 py-1 tabular-nums text-ink-700">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap gap-1.5 border-t border-ink-200 bg-ink-50 px-3 py-2">
          {tabs.map((tab, i) => (
            <span
              key={tab}
              className={cn(
                "rounded px-2 py-0.5 text-[10px]",
                i === 0 ? "bg-white font-semibold text-ink-800 ring-1 ring-inset ring-ink-200" : "text-ink-500"
              )}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <ul className="mt-4 space-y-1.5">
        {flags.map((flag) => (
          <li key={flag} className="flex items-start gap-2 text-[11px] leading-relaxed text-ink-600">
            <span aria-hidden className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
            {flag}
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}

/** The conversational agent that turns that file into a working rate sheet. */
export function ImportAgent() {
  const t = useTranslations("home.visuals.agent");
  const thread = t.raw("thread") as { from: "agent" | "user"; text: string }[];

  return (
    <VisualFrame title={t("title")} subtitle={t("subtitle")} caption={t("caption")}>
      <ul className="space-y-3">
        {thread.map((message) => (
          <li
            key={message.text}
            className={cn("flex gap-2.5", message.from === "user" && "flex-row-reverse")}
          >
            {message.from === "agent" && (
              <span
                aria-hidden
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-600"
              >
                <MessageSquareText className="h-3.5 w-3.5 text-white" />
              </span>
            )}
            <p
              className={cn(
                "max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed",
                message.from === "agent"
                  ? "bg-ink-50 text-ink-700"
                  : "bg-brand-600 text-white"
              )}
            >
              {message.text}
            </p>
          </li>
        ))}
      </ul>
    </VisualFrame>
  );
}
