"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Link, usePathname, type AppPathname } from "@/i18n/routing";
import { signupUrl } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * The blog is reachable from the footer but not from here: pointing the main
 * navigation at an empty listing spends a click for nothing. Put it back with
 * the first published article.
 */
const navItems: { key: string; href: AppPathname }[] = [
  { key: "pricing", href: "/tarifs" },
  { key: "fuelTool", href: "/outils/indexation-energie" },
  { key: "contact", href: "/contact" },
];

export function Header() {
  const t = useTranslations("common.nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, otherwise it stays over the new page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-200",
        scrolled ? "border-b border-ink-200 bg-white/90 backdrop-blur-md" : "border-b border-transparent bg-white"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href ? "text-brand-700" : "text-ink-700 hover:text-ink-900"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <a
              href={signupUrl("header")}
              onClick={() => track("signup_click", { location: "header" })}
              className={buttonVariants({ size: "sm" })}
            >
              {t("signup")}
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink-700 hover:bg-ink-100 lg:hidden"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-ink-200 bg-white lg:hidden">
          <Container className="py-5">
            <nav aria-label="Navigation principale" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="rounded-md px-3 py-3 text-base font-medium text-ink-800 hover:bg-ink-50"
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <div className="mt-4 flex items-center justify-between gap-3 border-t border-ink-100 pt-4">
              <LanguageSwitcher />
              <a
                href={signupUrl("header-mobile")}
                onClick={() => track("signup_click", { location: "header-mobile" })}
                className={cn(buttonVariants({ size: "md" }), "flex-1")}
              >
                {t("signup")}
              </a>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
