import type { ReactNode } from "react";

// The actual <html> and <body> are rendered by the [locale] layout so that
// the lang attribute reflects the active locale. Next.js still requires a
// root layout, so we simply pass children through here.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
