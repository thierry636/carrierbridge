"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { key: "features", href: "#features" },
  { key: "agent", href: "#agent" },
  { key: "useCases", href: "#use-cases" },
  { key: "faq", href: "#faq" },
  { key: "contact", href: "#contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-ink-200/60 bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/0"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:text-ink-900"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <LanguageSwitcher />
            <a href="#contact">
              <Button size="sm">{t("demo")}</Button>
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 lg:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div className="border-t border-ink-200 bg-white">
            <Container className="py-6">
              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
                  >
                    {t(item.key)}
                  </a>
                ))}
              </nav>
              <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
                <LanguageSwitcher />
                <a href="#contact" onClick={() => setOpen(false)} className="flex-1">
                  <Button className="w-full">{t("demo")}</Button>
                </a>
              </div>
            </Container>
          </div>
        </div>
      )}
    </header>
  );
}
