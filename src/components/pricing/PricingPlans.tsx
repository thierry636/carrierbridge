"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, Minus } from "lucide-react";
import {
  enterprisePlanIds,
  featureGroups,
  formatEuros,
  getPlan,
  standardPlanIds,
  type PlanId,
} from "@/lib/pricing";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { signupUrl } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "annual";
type Tab = "standard" | "enterprise";

export function PricingPlans({ withMatrix = false }: { withMatrix?: boolean }) {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [billing, setBilling] = useState<Billing>("monthly");
  const [tab, setTab] = useState<Tab>("standard");

  const planIds = tab === "standard" ? standardPlanIds : enterprisePlanIds;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label={t("tabs.standard")} className="flex rounded-lg bg-ink-100 p-1">
          {(["standard", "enterprise"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="tab"
              aria-selected={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                tab === value ? "bg-white text-ink-900 shadow-sm" : "text-ink-600 hover:text-ink-900"
              )}
            >
              {t(`tabs.${value}`)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-ink-100 p-1">
          {(["monthly", "annual"] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={billing === value}
              onClick={() => setBilling(value)}
              className={cn(
                "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                billing === value ? "bg-white text-ink-900 shadow-sm" : "text-ink-600 hover:text-ink-900"
              )}
            >
              {t(`billing.${value}`)}
              {value === "annual" && (
                <span className="ml-2 hidden rounded bg-brand-50 px-1.5 py-0.5 text-xs font-semibold text-brand-700 sm:inline">
                  {t("billing.annualBadge")}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {tab === "enterprise" && (
        <p className="mt-4 text-sm text-ink-600">{t("tabs.enterpriseHint")}</p>
      )}

      <div
        className={cn(
          "mt-8 grid gap-6",
          planIds.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"
        )}
      >
        {planIds.map((id) => (
          <PlanCard key={id} id={id} billing={billing} locale={locale} />
        ))}
      </div>

      {withMatrix && <FeatureMatrix planIds={planIds} />}

      <ConnectorRow />
    </div>
  );
}

function PlanCard({ id, billing, locale }: { id: PlanId; billing: Billing; locale: string }) {
  const t = useTranslations("pricing");
  const plan = getPlan(id);
  const isAnnual = billing === "annual" && plan.annual !== null;
  const displayed = isAnnual ? Math.round(plan.annual! / 12) : plan.monthly;

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-xl border bg-white p-6",
        plan.highlighted ? "border-brand-600 ring-1 ring-brand-600" : "border-ink-200"
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white">
          {t("plans.pro.badge")}
        </span>
      )}

      <h3 className="text-lg font-semibold text-ink-900">{t(`plans.${id}.name`)}</h3>
      <p className="mt-1.5 min-h-[3rem] text-sm leading-relaxed text-ink-600">
        {t(`plans.${id}.tagline`)}
      </p>

      <p className="mt-5 flex items-baseline gap-1.5">
        <span className="text-3xl font-bold tracking-tight text-ink-950">
          {plan.monthly === 0 ? t("billing.free") : formatEuros(displayed, locale)}
        </span>
        {plan.monthly > 0 && <span className="text-sm text-ink-500">{t("billing.perMonth")}</span>}
      </p>
      <p className="mt-1 min-h-[1.25rem] text-xs text-ink-500">
        {isAnnual && plan.annual
          ? t("billing.billedAnnually", { amount: formatEuros(plan.annual, locale) })
          : ""}
      </p>

      {plan.selfServe ? (
        <a
          href={signupUrl(`pricing-${id}`)}
          onClick={() => track("pricing_tier_click", { plan: id, action: "signup" })}
          className={cn(
            buttonVariants({ variant: plan.highlighted ? "primary" : "secondary", size: "md" }),
            "mt-5 w-full"
          )}
        >
          {t(`plans.${id}.cta`)}
        </a>
      ) : (
        <Link
          href="/contact"
          onClick={() => track("pricing_tier_click", { plan: id, action: "contact" })}
          className={cn(buttonVariants({ variant: "secondary", size: "md" }), "mt-5 w-full")}
        >
          {t(`plans.${id}.cta`)}
        </Link>
      )}
    </article>
  );
}

function FeatureMatrix({ planIds }: { planIds: readonly PlanId[] }) {
  const t = useTranslations("pricing");

  return (
    <div className="mt-12 overflow-x-auto">
      <table className="w-full min-w-[36rem] border-collapse text-sm">
        <caption className="sr-only">{t("page.h1")}</caption>
        <thead>
          <tr>
            <th scope="col" className="w-2/5 border-b border-ink-200 py-3 text-left font-semibold text-ink-900">
              <span className="sr-only">{t("features.groups.base")}</span>
            </th>
            {planIds.map((id) => (
              <th key={id} scope="col" className="border-b border-ink-200 py-3 text-left font-semibold text-ink-900">
                {t(`plans.${id}.name`)}
              </th>
            ))}
          </tr>
        </thead>
        {featureGroups.map((group) => (
          <tbody key={group.id}>
            <tr>
              <th
                scope="colgroup"
                colSpan={planIds.length + 1}
                className="bg-ink-50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-ink-600"
              >
                {t(`features.groups.${group.id}`)}
              </th>
            </tr>
            {group.rows.map((featureRow) => (
              <tr key={featureRow.id} className="border-b border-ink-100">
                <th scope="row" className="py-3 pr-4 text-left font-medium text-ink-700">
                  {t(`features.labels.${featureRow.id}`)}
                </th>
                {planIds.map((id) => (
                  <td key={id} className="py-3 pr-4 text-ink-700">
                    <Cell valueKey={featureRow.cells[id]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}

/** "yes" and "no" read better as icons; everything else is a translated string. */
function Cell({ valueKey }: { valueKey: string }) {
  const t = useTranslations("pricing.features.values");
  const label = t(valueKey);

  if (valueKey === "yes") {
    return (
      <>
        <Check className="h-4 w-4 text-brand-600" aria-hidden />
        <span className="sr-only">{label}</span>
      </>
    );
  }
  if (valueKey === "no") {
    return (
      <>
        <Minus className="h-4 w-4 text-ink-300" aria-hidden />
        <span className="sr-only">{label}</span>
      </>
    );
  }
  return <>{label}</>;
}

function ConnectorRow() {
  const t = useTranslations("pricing.connectors");

  return (
    <div className="mt-8 flex flex-col gap-4 rounded-xl border border-ink-200 bg-ink-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-ink-800">
        <span className="font-medium">{t("label")}</span> : {t("price")}.
      </p>
      <Link
        href="/contact"
        className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "shrink-0")}
      >
        {t("cta")}
      </Link>
    </div>
  );
}
