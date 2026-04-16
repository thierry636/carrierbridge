import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  FileSpreadsheet,
  FileText,
  Mail,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Row = {
  name: string;
  b1: string;
  b2: string;
  b3: string;
  adr: string;
  fuel: string;
};

type ColKey = Exclude<keyof Row, "name">;

export function AIAgent() {
  const t = useTranslations("agent");
  const bullets = t.raw("bullets") as string[];

  return (
    <section
      id="agent"
      className="relative overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      <div className="absolute inset-0 grid-bg-dark opacity-60" aria-hidden />
      <div
        className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-brand-600/30 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-500/20 blur-[120px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              {t("eyebrow")}
            </p>
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[52px]">
              {t("title1")}{" "}
              <span className="bg-gradient-to-r from-accent-400 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-base text-white/85"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <a href="#contact">
                <Button size="lg" variant="dark">
                  {t("cta")} <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          <RateGridMockup />
        </div>
      </Container>
    </section>
  );
}

function RateGridMockup() {
  const t = useTranslations("agent.grid");
  const rows = t.raw("rows") as Row[];

  const cols: { key: ColKey; label: string }[] = [
    { key: "b1", label: t("cols.b1") },
    { key: "b2", label: t("cols.b2") },
    { key: "b3", label: t("cols.b3") },
    { key: "adr", label: t("cols.adr") },
    { key: "fuel", label: t("cols.fuel") },
  ];

  // Determine the row index with the best (minimum) value per column.
  // Parsing strips currency / percent / commas so we can compare numerically.
  const parse = (s: string) =>
    parseFloat(s.replace(/[^\d.,-]/g, "").replace(",", "."));
  const bestByCol: Record<ColKey, number> = cols.reduce(
    (acc, c) => {
      const values = rows.map((r) => parse(r[c.key]));
      let best = 0;
      for (let i = 1; i < values.length; i++) {
        if (values[i] < values[best]) best = i;
      }
      acc[c.key] = best;
      return acc;
    },
    {} as Record<ColKey, number>
  );

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-brand-500/30 via-transparent to-accent-500/20 blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl backdrop-blur">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-xs font-medium text-white/40">
            Carrier Bridge — Rate comparator
          </span>
        </div>

        {/* Source files banner */}
        <div className="flex flex-wrap items-center gap-2 border-b border-white/5 px-5 py-3 text-[11px] text-white/60">
          <SourceChip icon={<FileSpreadsheet className="h-3 w-3" />} label="translogi_2025.xlsx" />
          <SourceChip icon={<FileText className="h-3 w-3" />} label="chimico-rates.pdf" />
          <SourceChip icon={<Mail className="h-3 w-3" />} label="nordic-tank.eml" />
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-accent-400/30 bg-accent-500/10 px-2 py-0.5 text-[10px] font-semibold text-accent-400">
            <Sparkles className="h-3 w-3" />
            {t("normalizedBadge")}
          </span>
        </div>

        {/* Grid */}
        <div className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
            {t("header")}
          </p>

          <div className="mt-3 overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/[0.04]">
                <tr>
                  <th className="px-3 py-2.5 font-medium text-white/60">
                    {t("carrierLabel")}
                  </th>
                  {cols.map((c) => (
                    <th
                      key={c.key}
                      className="px-3 py-2.5 text-right font-medium text-white/60"
                    >
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {rows.map((r, rowIndex) => (
                  <tr key={r.name} className="hover:bg-white/[0.02]">
                    <td className="whitespace-nowrap px-3 py-2.5 font-semibold text-white/90">
                      {r.name}
                    </td>
                    {cols.map((c) => {
                      const isBest = bestByCol[c.key] === rowIndex;
                      return (
                        <td
                          key={c.key}
                          className={cn(
                            "px-3 py-2.5 text-right font-mono tabular-nums",
                            isBest
                              ? "font-semibold text-emerald-300"
                              : "text-white/70"
                          )}
                        >
                          <span
                            className={cn(
                              "inline-block rounded-md px-1.5",
                              isBest && "bg-emerald-400/10"
                            )}
                          >
                            {r[c.key]}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] text-white/50">
            <span className="inline-block h-2 w-2 rounded-sm bg-emerald-400/70" />
            <span>{t("bestLabel")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function SourceChip({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-white/70">
      <span className="text-white/50">{icon}</span>
      <span className="font-mono">{label}</span>
    </span>
  );
}
