/**
 * Energy-index recalculation, kept pure and free of React so it can be checked
 * in isolation. It runs in the browser only — no rate data leaves the page.
 *
 * The formula is identical for diesel, gas and electricity; only the index the
 * contract names changes, and that value is supplied by the user.
 */

/** Which energy the contract indexes. Affects wording and guidance, not maths. */
export const ENERGIES = ["diesel", "gas", "electric"] as const;
export type Energy = (typeof ENERGIES)[number];

export interface FuelInput {
  /** Transport amount excluding the fuel surcharge, in euros. */
  baseAmount: number;
  /** Share of the price deemed energy-sensitive, in percent. */
  energyShare: number;
  /** Contractual reference index. */
  baseIndex: number;
  /** Index published for the invoiced period. */
  periodIndex: number;
  /** Surcharge rate actually applied on the invoice, in percent. */
  invoicedRate: number;
}

export type FuelVerdict = "aligned" | "overcharged" | "undercharged";

export interface FuelResult {
  expectedRate: number;
  invoicedRate: number;
  gapPoints: number;
  expectedAmount: number;
  invoicedAmount: number;
  gapAmount: number;
  annualGapAmount: number;
  verdict: FuelVerdict;
}

/** Below this, the difference is rounding in the contract, not a real gap. */
const TOLERANCE_POINTS = 0.05;

export function computeFuelSurcharge(input: FuelInput): FuelResult {
  const { baseAmount, energyShare, baseIndex, periodIndex, invoicedRate } = input;

  // The most widespread clause: apply the index variation to the energy share only.
  const variation = (periodIndex - baseIndex) / baseIndex;
  const expectedRate = energyShare * variation;

  const expectedAmount = (baseAmount * expectedRate) / 100;
  const invoicedAmount = (baseAmount * invoicedRate) / 100;
  const gapPoints = invoicedRate - expectedRate;
  const gapAmount = invoicedAmount - expectedAmount;

  return {
    expectedRate,
    invoicedRate,
    gapPoints,
    expectedAmount,
    invoicedAmount,
    gapAmount,
    annualGapAmount: gapAmount * 12,
    verdict:
      Math.abs(gapPoints) < TOLERANCE_POINTS
        ? "aligned"
        : gapPoints > 0
          ? "overcharged"
          : "undercharged",
  };
}

export type FuelField = keyof FuelInput;
export type FuelErrors = Partial<Record<FuelField, "required" | "number" | "positive" | "percentRange">>;

/** A base index of zero would divide by zero, so it is rejected rather than clamped. */
export function validateFuelInput(raw: Record<FuelField, string>): {
  errors: FuelErrors;
  value?: FuelInput;
} {
  const errors: FuelErrors = {};
  const parsed = {} as FuelInput;

  const rules: Record<FuelField, { positive?: boolean; percent?: boolean }> = {
    baseAmount: { positive: true },
    energyShare: { positive: true, percent: true },
    baseIndex: { positive: true },
    periodIndex: { positive: true },
    invoicedRate: {},
  };

  for (const field of Object.keys(rules) as FuelField[]) {
    const input = raw[field]?.trim().replace(",", ".");
    if (!input) {
      errors[field] = "required";
      continue;
    }
    const value = Number(input);
    if (!Number.isFinite(value)) {
      errors[field] = "number";
      continue;
    }
    if (rules[field].positive && value <= 0) {
      errors[field] = "positive";
      continue;
    }
    if (rules[field].percent && (value < 0 || value > 100)) {
      errors[field] = "percentRange";
      continue;
    }
    parsed[field] = value;
  }

  return Object.keys(errors).length > 0 ? { errors } : { errors, value: parsed };
}
