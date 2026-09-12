import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/section";

/**
 * Deliberately the smallest block on the page: the module is in beta and is
 * not what the product is sold on.
 */
export function AiSourcing() {
  const t = useTranslations("home.sourcing");

  return (
    <section id="sourcing" className="scroll-mt-20 border-y border-ink-200 bg-white py-12">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Badge tone="neutral">{t("badge")}</Badge>
          <h2 className="mt-4 text-xl font-semibold tracking-tight text-ink-950">{t("h2")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{t("text")}</p>
          <p className="mt-3 text-sm leading-relaxed text-ink-500">{t("caveat")}</p>
        </div>
      </Container>
    </section>
  );
}
