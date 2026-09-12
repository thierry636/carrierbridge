"use client";

/** The five conversion events we care about, per the measurement plan. */
export type AnalyticsEvent =
  | "signup_click"
  | "grid_import"
  | "fuel_calculator_used"
  | "pricing_tier_click"
  | "contact_request";

declare global {
  interface Window {
    plausible?: (event: string, options?: { props?: Record<string, string> }) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.plausible?.(event, props ? { props } : undefined);
}

export const CONSENT_KEY = "cb-analytics-consent";
export type Consent = "granted" | "denied";

export function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    // Private browsing or blocked storage: behave as if no choice was made.
    return null;
  }
}

export function writeConsent(consent: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Nothing to do — the banner simply reappears on the next visit.
  }
  window.dispatchEvent(new CustomEvent("cb-consent-change", { detail: consent }));
}
