"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { readConsent, writeConsent, type Consent } from "@/lib/analytics";

/**
 * Audience measurement here is cookieless, so nothing is stored before a
 * choice is made. The banner exists so refusing stays exactly as easy as
 * accepting — both are one click, side by side, with no dark pattern.
 */
export function CookieBanner() {
  const t = useTranslations("common.cookies");
  const [choice, setChoice] = useState<Consent | null | undefined>(undefined);

  useEffect(() => setChoice(readConsent()), []);

  useEffect(() => {
    const onChange = (event: Event) => setChoice((event as CustomEvent<Consent>).detail);
    window.addEventListener("cb-consent-change", onChange);
    return () => window.removeEventListener("cb-consent-change", onChange);
  }, []);

  // `undefined` means we have not read storage yet — render nothing to avoid a flash.
  if (choice !== null) return null;

  const decide = (consent: Consent) => {
    writeConsent(consent);
    setChoice(consent);
  };

  return (
    <div
      role="dialog"
      aria-label={t("title")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-200 bg-white shadow-[0_-8px_30px_-15px_rgba(15,23,42,0.25)]"
    >
      <Container className="flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-sm font-semibold text-ink-900">{t("title")}</h2>
          <p className="mt-1 text-sm leading-relaxed text-ink-600">
            {t("body")}{" "}
            <Link href="/cookies" className="font-medium text-brand-700 underline underline-offset-2">
              {t("more")}
            </Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <Button variant="secondary" onClick={() => decide("denied")}>
            {t("refuse")}
          </Button>
          <Button onClick={() => decide("granted")}>{t("accept")}</Button>
        </div>
      </Container>
    </div>
  );
}
