"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { useTransition } from "react";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale as "fr" | "en" });
    });
  };

  return (
    <label
      className={cn(
        "relative inline-flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium",
        variant === "dark"
          ? "text-white/80 hover:text-white"
          : "text-ink-700 hover:text-ink-900"
      )}
    >
      <Globe className="h-4 w-4 opacity-70" aria-hidden />
      <span className="sr-only">Langue / Language</span>
      <select
        value={locale}
        disabled={isPending}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "appearance-none bg-transparent pr-4 text-sm font-medium focus:outline-none",
          variant === "dark" ? "text-white" : "text-ink-900"
        )}
      >
        {routing.locales.map((l) => (
          <option key={l} value={l} className="bg-white text-ink-900">
            {l.toUpperCase()}
          </option>
        ))}
      </select>
    </label>
  );
}
