import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Link } from "@/i18n/routing";
import { buttonVariants } from "@/components/ui/button";

export default function LocaleNotFound() {
  const t = useTranslations("common.notFound");

  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-20">
      <p className="text-sm font-semibold text-brand-600">404</p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink-950 sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-600">{t("body")}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className={buttonVariants({ size: "md" })}>
          {t("home")}
        </Link>
        <Link href="/tarifs" className={buttonVariants({ variant: "secondary", size: "md" })}>
          {t("pricing")}
        </Link>
        <Link
          href="/outils/indexation-gazole"
          className={buttonVariants({ variant: "secondary", size: "md" })}
        >
          {t("fuelTool")}
        </Link>
      </div>
    </Container>
  );
}
