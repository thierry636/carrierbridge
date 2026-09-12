"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { readConsent, type Consent } from "@/lib/analytics";
import { site } from "@/lib/site";

/**
 * Plausible is cookieless, but the brief asks that refusing actually stop the
 * measurement — so the script is only injected once consent is granted.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => setConsent(readConsent()), []);

  useEffect(() => {
    const onChange = (event: Event) => setConsent((event as CustomEvent<Consent>).detail);
    window.addEventListener("cb-consent-change", onChange);
    return () => window.removeEventListener("cb-consent-change", onChange);
  }, []);

  if (!site.plausibleDomain || consent !== "granted") return null;

  return (
    <Script
      defer
      data-domain={site.plausibleDomain}
      src="https://plausible.io/js/script.tagged-events.js"
      strategy="afterInteractive"
    />
  );
}
