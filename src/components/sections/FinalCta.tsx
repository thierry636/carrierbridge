import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SignupButton } from "@/components/ui/signup-button";
import { ScreenshotPlaceholder } from "@/components/ui/placeholder";

export function FinalCta() {
  const t = useTranslations("home.finalCta");
  const tc = useTranslations("common");

  return (
    <section id="demo" className="scroll-mt-20 border-t border-ink-200 bg-ink-50 py-16 lg:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-balance text-2xl font-bold tracking-tight text-ink-950 sm:text-3xl">
              {t("h2")}
            </h2>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-600">
              {t("text")}
            </p>
            <SignupButton source="final" size="lg" className="mt-7">
              {tc("cta.signup")} <ArrowRight className="h-4 w-4" aria-hidden />
            </SignupButton>
            <p className="mt-3 text-sm text-ink-500">{tc("cta.signupNote")}</p>
          </div>
          <ScreenshotPlaceholder label={tc("placeholder.video")} ratio="aspect-video" />
        </div>
      </Container>
    </section>
  );
}
