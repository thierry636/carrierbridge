/**
 * Single source of truth for everything that used to be hard-coded across
 * layout, robots, sitemap and the contact route. The site is served on
 * carrier-bridge.com; carrierbridge.com is redirected to it at the edge.
 */
export const site = {
  name: "CarrierBridge",
  url: normalise(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://carrier-bridge.com",
  appUrl: normalise(process.env.NEXT_PUBLIC_APP_URL) ?? "https://app.carrier-bridge.com",
  contactEmail: "contact@carrier-bridge.com",
  plausibleDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
} as const;

function normalise(value: string | undefined) {
  return value?.replace(/\/+$/, "") || undefined;
}

/** Signup links carry their origin so we can tell which block converts. */
export function signupUrl(source: string) {
  const url = new URL(site.appUrl);
  url.searchParams.set("utm_source", "site");
  url.searchParams.set("utm_medium", "cta");
  url.searchParams.set("utm_campaign", source);
  return url.toString();
}
