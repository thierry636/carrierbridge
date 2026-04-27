import { cn } from "@/lib/utils";

type Cell = { value: string; highlight?: "header" | "zone1" | "zone2" | "missing" };

export function ExcelPreview({
  rows,
  caption,
  highlightedZones = false,
}: {
  rows: Cell[][];
  caption?: string;
  highlightedZones?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-ink-200 bg-white">
      <div className="flex items-center justify-between border-b border-ink-100 bg-ink-50/60 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300" />
          </div>
          <span className="ml-2 text-xs font-medium text-ink-600">
            {caption ?? "Aperçu de la feuille"}
          </span>
        </div>
        {highlightedZones && (
          <div className="flex items-center gap-3 text-[11px] text-ink-600">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              Grille A
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Grille B
            </span>
          </div>
        )}
      </div>
      <div className="max-h-[420px] overflow-auto">
        <table className="w-full text-xs">
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="divide-x divide-ink-100">
                <td className="bg-ink-50 px-2 py-1.5 text-center font-mono text-[10px] text-ink-400 sticky left-0">
                  {rIdx + 1}
                </td>
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={cn(
                      "px-3 py-1.5 whitespace-nowrap",
                      cell.highlight === "header" &&
                        "bg-ink-100 font-semibold text-ink-800",
                      cell.highlight === "zone1" &&
                        "bg-cyan-50 text-cyan-900",
                      cell.highlight === "zone2" &&
                        "bg-violet-50 text-violet-900",
                      cell.highlight === "missing" &&
                        "bg-amber-50 text-amber-800 italic",
                      !cell.highlight && "text-ink-700"
                    )}
                  >
                    {cell.value || <span className="text-ink-300">—</span>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
