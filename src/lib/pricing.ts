/**
 * The pricing grid lives here, once. The home teaser, the /tarifs table and
 * the schema.org `offers` payload all read from it, so the three can never
 * drift apart. Labels stay in the pricing.json message files — this file holds only
 * structure, numbers and the i18n keys that name each cell.
 */

export type PlanId = "discovery" | "essential" | "pro" | "business" | "enterprise";

export interface Plan {
  id: PlanId;
  monthly: number;
  /** null for the free tier, which has no annual commitment. */
  annual: number | null;
  /** Self-serve plans link to signup; the others open the contact form. */
  selfServe: boolean;
  highlighted?: boolean;
}

export const plans: readonly Plan[] = [
  { id: "discovery", monthly: 0, annual: null, selfServe: true },
  { id: "essential", monthly: 79, annual: 790, selfServe: true },
  { id: "pro", monthly: 199, annual: 1990, selfServe: true, highlighted: true },
  { id: "business", monthly: 449, annual: 4490, selfServe: false },
  { id: "enterprise", monthly: 1200, annual: 12000, selfServe: false },
];

/** Three columns at a time: five side by side stops people deciding. */
export const standardPlanIds: readonly PlanId[] = ["discovery", "essential", "pro"];
export const enterprisePlanIds: readonly PlanId[] = ["business", "enterprise"];

export function getPlan(id: PlanId): Plan {
  const plan = plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

/** Annual billing is priced at ten months, so the saving is two months. */
export function monthsSavedAnnually(plan: Plan) {
  if (!plan.annual || plan.monthly === 0) return 0;
  return Math.round((plan.monthly * 12 - plan.annual) / plan.monthly);
}

export type FeatureId =
  | "users" | "carriers" | "sites" | "quotes"
  | "grids" | "ancillary" | "calculator"
  | "fuelControl" | "history" | "vigilance" | "driftReport"
  | "opsSuite" | "groupConsolidation"
  | "tender" | "aiSourcing"
  | "api" | "support";

/** Every cell is a key under `pricing.features.values`, so numbers and words translate alike. */
export type CellKey = string;

export interface FeatureRow {
  id: FeatureId;
  cells: Record<PlanId, CellKey>;
}

export interface FeatureGroup {
  id: "base" | "rates" | "control" | "operations" | "sourcing" | "support";
  rows: readonly FeatureRow[];
}

const row = (
  id: FeatureId,
  discovery: CellKey,
  essential: CellKey,
  pro: CellKey,
  business: CellKey,
  enterprise: CellKey
): FeatureRow => ({ id, cells: { discovery, essential, pro, business, enterprise } });

export const featureGroups: readonly FeatureGroup[] = [
  {
    id: "base",
    rows: [
      row("users", "one", "unlimitedPlural", "unlimitedPlural", "unlimitedPlural", "unlimitedPlural"),
      row("carriers", "three", "unlimitedPlural", "unlimitedPlural", "unlimitedPlural", "unlimitedPlural"),
      row("sites", "one", "one", "three", "unlimited", "unlimited"),
      row("quotes", "twenty", "fiveHundred", "threeThousand", "unlimited", "unlimited"),
    ],
  },
  {
    id: "rates",
    rows: [
      row("grids", "three", "unlimited", "unlimited", "unlimited", "unlimited"),
      row("ancillary", "no", "yes", "yes", "yes", "yes"),
      row("calculator", "yes", "yes", "yes", "yes", "yes"),
    ],
  },
  {
    id: "control",
    rows: [
      row("fuelControl", "occasional", "yes", "yes", "withAlerts", "withAlerts"),
      row("history", "no", "months12", "unlimited", "unlimited", "unlimited"),
      row("vigilance", "no", "no", "yes", "yes", "yes"),
      row("driftReport", "no", "no", "no", "no", "yes"),
    ],
  },
  {
    id: "operations",
    rows: [
      row("opsSuite", "no", "no", "no", "yes", "yes"),
      row("groupConsolidation", "no", "no", "no", "no", "yes"),
      row("api", "no", "no", "no", "yes", "yes"),
    ],
  },
  {
    id: "sourcing",
    rows: [
      row("tender", "no", "perAct", "perAct", "perAct", "tenderIncluded"),
      row("aiSourcing", "no", "no", "included", "included", "included"),
    ],
  },
  {
    id: "support",
    rows: [row("support", "no", "supportEmail", "supportPriority", "supportPriority", "supportDedicated")],
  },
];

/** Plans that carry a ROI estimate on /tarifs. The free tier deliberately has none. */
export const roiPlanIds: readonly PlanId[] = ["essential", "pro", "business", "enterprise"];

export function formatEuros(amount: number, locale: string) {
  return new Intl.NumberFormat(locale === "en" ? "en-GB" : "fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
}
