import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Logo } from "./Logo";
import { Link, type AppPathname } from "@/i18n/routing";
import { site, signupUrl } from "@/lib/site";

const columns: { id: string; links: { key: string; href: AppPathname }[] }[] = [
  {
    id: "product",
    links: [
      { key: "pricing", href: "/tarifs" },
      { key: "faq", href: "/" },
    ],
  },
  {
    id: "resources",
    links: [
      { key: "fuelTool", href: "/outils/indexation-energie" },
      { key: "blog", href: "/blog" },
    ],
  },
  {
    id: "company",
    links: [{ key: "contact", href: "/contact" }],
  },
  {
    id: "legal",
    links: [
      { key: "legalNotice", href: "/mentions-legales" },
      { key: "terms", href: "/cgu" },
      { key: "privacy", href: "/confidentialite" },
      { key: "cookies", href: "/cookies" },
    ],
  },
];

export function Footer() {
  const t = useTranslations("common.footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-600">{t("tagline")}</p>
            <a
              href={`mailto:${site.contactEmail}`}
              className="mt-4 inline-block text-sm font-medium text-brand-700 underline underline-offset-4 hover:text-brand-800"
            >
              {site.contactEmail}
            </a>
          </div>

          {columns.map((column) => (
            <nav key={column.id} aria-label={t(`columns.${column.id}`)}>
              <h2 className="text-sm font-semibold text-ink-900">{t(`columns.${column.id}`)}</h2>
              <ul className="mt-4 space-y-3 text-sm text-ink-600">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      href={link.key === "faq" ? { pathname: "/", hash: "faq" } : link.href}
                      className="transition-colors hover:text-ink-900"
                    >
                      {t(`links.${link.key}`)}
                    </Link>
                  </li>
                ))}
                {column.id === "company" && (
                  <li>
                    <a href={signupUrl("footer")} className="transition-colors hover:text-ink-900">
                      {t("links.signup")}
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-ink-200 pt-6 text-sm text-ink-500 md:flex-row md:items-center">
          <p>
            © {year} CarrierBridge. {t("rights")}
          </p>
          <p>{t("madeIn")}</p>
        </div>
      </Container>
    </footer>
  );
}
