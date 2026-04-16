import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Logo } from "./Logo";

export function Footer() {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-ink-50/50">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">
              {t("tagline")}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">{t("product")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li>
                <a href="#features" className="transition-colors hover:text-ink-900">
                  {t("productLinks.features")}
                </a>
              </li>
              <li>
                <a href="#agent" className="transition-colors hover:text-ink-900">
                  {t("productLinks.agent")}
                </a>
              </li>
              <li>
                <a href="#use-cases" className="transition-colors hover:text-ink-900">
                  {t("productLinks.useCases")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">{t("company")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li>
                <a href="#contact" className="transition-colors hover:text-ink-900">
                  {t("companyLinks.contact")}
                </a>
              </li>
              <li>
                <a href="#contact" className="transition-colors hover:text-ink-900">
                  {t("companyLinks.demo")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-ink-900">{t("legal")}</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li>
                <a href="#" className="transition-colors hover:text-ink-900">
                  {t("legalLinks.privacy")}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-ink-900">
                  {t("legalLinks.terms")}
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-ink-900">
                  {t("legalLinks.cookies")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-sm text-ink-500 md:flex-row md:items-center">
          <p>
            © {year} Carrier Bridge. {t("rights")}
          </p>
          <p className="text-xs uppercase tracking-wider text-ink-400">
            Made in Europe
          </p>
        </div>
      </Container>
    </footer>
  );
}
