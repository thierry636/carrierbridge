import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Screenshot } from "@/components/ui/screenshot";
import { SignupButton } from "@/components/ui/signup-button";
import { buttonVariants } from "@/components/ui/button";

export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");
  const proof = t.raw("proof") as string[];

  return (
    <section className="border-b border-ink-200 bg-white py-14 lg:py-20">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h1 className="text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink-950 sm:text-5xl lg:text-[52px]">
              {t("h1")}
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <SignupButton source="hero" size="lg">
                {tc("cta.signup")} <ArrowRight className="h-4 w-4" aria-hidden />
              </SignupButton>
              <a href="#demo" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                {tc("cta.demo")}
              </a>
            </div>
            <p className="mt-3 text-sm text-ink-500">{tc("cta.signupNote")}</p>

            <ul className="mt-8 space-y-2.5 border-t border-ink-200 pt-6">
              {proof.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Screenshot id="hero" ratio="aspect-[16/10]" priority />
        </div>
      </Container>
    </section>
  );
}
