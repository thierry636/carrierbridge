/**
 * The figures behind the illustrative visuals, in one place so the hero and
 * the fuel section can never quote different numbers for the same example.
 * Everything derived — totals, gaps, percentages — is computed here rather
 * than typed into a component.
 */

export const shipmentQuotes = [
  { carrier: "A", price: 187.4 },
  { carrier: "B", price: 201.1 },
  { carrier: "C", price: 214.8 },
  { carrier: "D", price: 229.0 },
] as const;

export const bestQuote = shipmentQuotes[0];

export function gapToBest(price: number) {
  return Math.round(((price - bestQuote.price) / bestQuote.price) * 100);
}

/** Chosen so a reader can redo the arithmetic: 32% × 13.5/120 = 3.60%. */
const FUEL = {
  share: 32,
  baseIndex: 120,
  periodIndex: 133.5,
  invoicedRate: 4.9,
  basis: 42000,
};

const expectedRate = (FUEL.share * (FUEL.periodIndex - FUEL.baseIndex)) / FUEL.baseIndex;
const gapPoints = FUEL.invoicedRate - expectedRate;

export const fuelExample = {
  ...FUEL,
  expectedRate,
  gapPoints,
  gapAmount: (FUEL.basis * gapPoints) / 100,
};

/** Two sheets that deliberately do not line up: different brackets, different zones. */
export const rawSheets = {
  a: [
    ["0 – 10 kg", 12.4, 14.1],
    ["10 – 20 kg", 18.2, 21.5],
    ["20 – 30 kg", 24.6, 28.3],
  ] as const,
  b: [
    ["0 – 30", 21.1, 23.4, 26.0],
    ["30 – 100", 38.7, 42.2, 47.9],
  ] as const,
};

export const normalisedSheet = [
  { bracket: "0 – 10 kg", prices: [12.4, 13.8, 11.9] },
  { bracket: "10 – 20 kg", prices: [18.2, 19.4, 17.6] },
  { bracket: "20 – 30 kg", prices: [24.6, 23.1, 25.2] },
  { bracket: "30 – 50 kg", prices: [31.8, 30.4, 33.1] },
] as const;

/** A has the lower base rate; B is cheaper once the extras are counted. */
const FUEL_SURCHARGE_RATE = 0.084;
const carriers = [
  { base: 142, tailLift: 18, slot: 15.5 },
  { base: 151, tailLift: 9.5, slot: 0 },
];

export const priceBreakdown = carriers.map((c) => {
  const fuel = c.base * FUEL_SURCHARGE_RATE;
  return {
    values: [c.base, fuel, c.tailLift, c.slot],
    total: c.base + fuel + c.tailLift + c.slot,
  };
});

export const bestBreakdownTotal = Math.min(...priceBreakdown.map((l) => l.total));

/**
 * A deliberately awkward sheet, modelled on what carriers actually send:
 * gaps where a carrier does not serve a town, one column covering two
 * carriers, a price carrying a comment, and a second table underneath.
 */
export const messySheet = [
  { dpt: "26", town: "VALENCE", prices: [142, null, 164.424] },
  { dpt: "84", town: "AVIGNON", prices: [167, 186, 178.5], comment: 1 },
  { dpt: "13", town: "MARSEILLE", prices: [null, 410, null] },
  { dpt: "30", town: "BAGNOLS", prices: [162, 176, 176.093] },
] as const;

/** The same three carriers, each priced on a different basis. */
export const carrierLogics = [
  { prices: [142, 167, 410] },
  { prices: [230, 176.923, 123.846] },
  { prices: [23.97, 36.11, 44.47] },
] as const;
