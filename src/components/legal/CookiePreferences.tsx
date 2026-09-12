"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { readConsent, writeConsent, type Consent } from "@/lib/analytics";

/** Lets someone change their mind after the banner is gone. */
export function CookiePreferences() {
  const t = useTranslations("common.cookies");
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => setConsent(readConsent()), []);

  const choose = (value: Consent) => {
    writeConsent(value);
    setConsent(value);
  };

  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <Button
        variant={consent === "granted" ? "primary" : "secondary"}
        size="sm"
        aria-pressed={consent === "granted"}
        onClick={() => choose("granted")}
      >
        {t("accept")}
      </Button>
      <Button
        variant={consent === "denied" ? "primary" : "secondary"}
        size="sm"
        aria-pressed={consent === "denied"}
        onClick={() => choose("denied")}
      >
        {t("refuse")}
      </Button>
    </div>
  );
}
