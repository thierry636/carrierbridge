import type { AbstractIntlMessages } from "next-intl";
import type { Locale } from "./routing";
import { routing } from "./routing";

/**
 * Copy is split by domain rather than kept in one large file per locale, so
 * FR/EN gaps stay visible as the site grows. Namespaces are addressed as
 * `home.hero`, `pricing.plans`, and so on.
 */
const NAMESPACES = [
  "common",
  "home",
  "pricing",
  "faq",
  "tools",
  "contact",
  "blog",
  "legal",
] as const;

type Messages = Record<string, unknown>;

async function bundle(locale: Locale): Promise<Messages> {
  const files = await Promise.all(
    NAMESPACES.map((ns) => import(`../../messages/${locale}/${ns}.json`))
  );
  return Object.fromEntries(
    NAMESPACES.map((ns, i) => [ns, files[i].default as Messages])
  );
}

/**
 * A locale falls back to the default one key by key. While the English copy is
 * being written, an untranslated key renders its French source instead of
 * throwing — and a translated one always wins.
 */
export async function loadMessages(locale: Locale): Promise<AbstractIntlMessages> {
  const base = await bundle(routing.defaultLocale);
  const merged =
    locale === routing.defaultLocale ? base : deepMerge(base, await bundle(locale));
  // JSON arrays are read back through `t.raw`, which next-intl's message type
  // does not model; the cast is confined to this one boundary.
  return merged as AbstractIntlMessages;
}

function deepMerge(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(override)) {
    const current = out[key];
    if (isPlainObject(current) && isPlainObject(value)) {
      out[key] = deepMerge(current, value);
    } else if (value !== undefined) {
      // Arrays and scalars replace wholesale: a translated list must be complete.
      out[key] = value;
    }
  }
  return out;
}

function isPlainObject(value: unknown): value is Messages {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
