import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Sparkles, ArrowLeft } from "lucide-react";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Preview – CarrierBridge",
  robots: { index: false, follow: false },
};

export default function PreviewLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="bg-ink-50 font-sans text-ink-900 antialiased">
        <div className="min-h-screen">
          <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/85 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-6">
              <div className="flex items-center gap-3">
                <Link
                  href="/preview"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-ink-900"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 to-brand-600 text-white">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  CarrierBridge
                </Link>
                <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-amber-800">
                  Prototype UX
                </span>
              </div>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-500 hover:text-ink-900"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Retour au site
              </Link>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
