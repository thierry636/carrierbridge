import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

/**
 * Client components need their copy serialised into the page, but the whole
 * bundle — terms, privacy policy, every form — would then ship on every route.
 * This hands a subtree only the namespaces its client components read.
 */
export async function ClientMessages({
  namespaces,
  children,
}: {
  namespaces: readonly string[];
  children: ReactNode;
}) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);
  const subset = Object.fromEntries(
    namespaces.filter((ns) => ns in messages).map((ns) => [ns, messages[ns]])
  );

  return (
    <NextIntlClientProvider locale={locale} messages={subset}>
      {children}
    </NextIntlClientProvider>
  );
}
