"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { AlertTriangle, CheckCircle2, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  computeFuelSurcharge,
  validateFuelInput,
  type FuelErrors,
  type FuelField,
  type FuelResult,
} from "@/lib/fuel";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const FIELDS: { name: FuelField; unit?: "euro" | "percent"; step: string }[] = [
  { name: "baseAmount", unit: "euro", step: "0.01" },
  { name: "fuelShare", unit: "percent", step: "0.1" },
  { name: "baseIndex", step: "0.01" },
  { name: "periodIndex", step: "0.01" },
  { name: "invoicedRate", unit: "percent", step: "0.01" },
];

const EMPTY: Record<FuelField, string> = {
  baseAmount: "",
  fuelShare: "",
  baseIndex: "",
  periodIndex: "",
  invoicedRate: "",
};

export function FuelIndexCalculator() {
  const t = useTranslations("tools.fuel");
  const locale = useLocale();
  const formId = useId();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<FuelErrors>({});
  const [result, setResult] = useState<FuelResult | null>(null);

  const euros = (amount: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 2,
    }).format(Math.abs(amount));

  const points = (value: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
      maximumFractionDigits: 2,
      signDisplay: "exceptZero",
    }).format(value);

  const percent = (value: number) =>
    new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
      maximumFractionDigits: 2,
    }).format(value);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const { errors: found, value } = validateFuelInput(values);
    setErrors(found);
    if (!value) {
      setResult(null);
      return;
    }
    const computed = computeFuelSurcharge(value);
    setResult(computed);
    track("fuel_calculator_used", { verdict: computed.verdict });
  }

  function onReset() {
    setValues(EMPTY);
    setErrors({});
    setResult(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <form onSubmit={onSubmit} noValidate className="rounded-xl border border-ink-200 bg-white p-6">
        <fieldset>
          <legend className="text-base font-semibold text-ink-900">{t("form.legend")}</legend>

          <div className="mt-6 space-y-5">
            {FIELDS.map((field) => {
              const fieldId = `${formId}-${field.name}`;
              const helpId = `${fieldId}-help`;
              const error = errors[field.name];
              return (
                <div key={field.name}>
                  <label htmlFor={fieldId} className="block text-sm font-medium text-ink-900">
                    {t(`form.${field.name}.label`)}
                  </label>
                  <div className="relative mt-1.5">
                    <input
                      id={fieldId}
                      name={field.name}
                      type="number"
                      inputMode="decimal"
                      step={field.step}
                      value={values[field.name]}
                      onChange={(event) =>
                        setValues((current) => ({ ...current, [field.name]: event.target.value }))
                      }
                      aria-describedby={helpId}
                      aria-invalid={error ? true : undefined}
                      className={cn(
                        "w-full rounded-lg border bg-white px-3 py-2 text-sm text-ink-900 shadow-sm",
                        "focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600",
                        field.unit && "pr-9",
                        error ? "border-red-500" : "border-ink-300"
                      )}
                    />
                    {field.unit && (
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-sm text-ink-500"
                      >
                        {field.unit === "euro" ? "€" : "%"}
                      </span>
                    )}
                  </div>
                  <p id={helpId} className={cn("mt-1.5 text-xs", error ? "text-red-600" : "text-ink-500")}>
                    {error ? t(`form.errors.${error}`) : t(`form.${field.name}.help`)}
                  </p>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 flex gap-3">
          <Button type="submit" size="md">
            {t("form.submit")}
          </Button>
          <Button type="button" variant="secondary" size="md" onClick={onReset}>
            {t("form.reset")}
          </Button>
        </div>
      </form>

      <div aria-live="polite">
        {result && (
          <div
            className={cn(
              "rounded-xl border p-6",
              result.verdict === "aligned"
                ? "border-brand-200 bg-brand-50"
                : result.verdict === "overcharged"
                  ? "border-amber-300 bg-amber-50"
                  : "border-ink-200 bg-ink-50"
            )}
          >
            <div className="flex items-start gap-3">
              {result.verdict === "aligned" ? (
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden />
              ) : result.verdict === "overcharged" ? (
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" aria-hidden />
              ) : (
                <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-ink-500" aria-hidden />
              )}
              <div>
                <h2 className="text-base font-semibold text-ink-900">{t("result.title")}</h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-700">
                  {t(`result.verdict.${result.verdict}`, { amount: euros(result.gapAmount) })}
                </p>
              </div>
            </div>

            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink-200 pt-5 text-sm">
              <Row label={t("result.expectedRate")} value={`${percent(result.expectedRate)} %`} />
              <Row label={t("result.invoicedRate")} value={`${percent(result.invoicedRate)} %`} />
              <Row
                label={t("result.gapPoints")}
                value={`${points(result.gapPoints)} ${t("result.gapPointsUnit")}`}
              />
              <Row label={t("result.gapAmount")} value={euros(result.gapAmount)} strong />
              <Row label={t("result.expectedAmount")} value={euros(result.expectedAmount)} />
              <Row label={t("result.invoicedAmount")} value={euros(result.invoicedAmount)} />
            </dl>

            {result.verdict !== "aligned" && (
              <p className="mt-5 border-t border-ink-200 pt-4 text-sm text-ink-600">
                {t("result.annualHint", { amount: euros(result.annualGapAmount) })}
              </p>
            )}
          </div>
        )}

        <div className={cn("rounded-xl border border-ink-200 bg-white p-6", result && "mt-6")}>
          <h2 className="text-base font-semibold text-ink-900">{t("formula.title")}</h2>
          <p className="mt-3 rounded-lg bg-ink-50 px-4 py-3 font-mono text-xs leading-relaxed text-ink-800">
            {t("formula.expression")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("formula.explanation")}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("formula.caveat")}</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-ink-500">{label}</dt>
      <dd
        className={cn(
          "mt-0.5 tabular-nums",
          strong ? "text-lg font-bold text-ink-950" : "text-base font-medium text-ink-900"
        )}
      >
        {value}
      </dd>
    </div>
  );
}
