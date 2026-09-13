import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Screenshot } from "@/components/ui/screenshot";
import { HeroShowcase } from "@/components/visuals/HeroShowcase";
import { SignupButton } from "@/components/ui/signup-button";

export function Hero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");
  const proof = t.raw("proof") as string[];

  return (
    <section className="relative isolate overflow-hidden border-b border-ink-200 bg-white pb-20 pt-14 lg:pb-28 lg:pt-20">
      {/* Restrained atmosphere: a cool wash behind the product, a grid that
          fades before it becomes decoration. Flat white read as unfinished. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(75%_60%_at_78%_-5%,rgba(37,99,235,0.13),transparent_62%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[420px] grid-bg opacity-[0.35] [mask-image:radial-gradient(80%_70%_at_60%_0%,black,transparent)]"
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
          <div>
            <h1 className="text-4xl font-bold leading-[1.06] tracking-tight text-ink-950 sm:text-5xl lg:text-[52px]">
              {t("h1")}{" "}
              {/* Subordinate clause, so it is set smaller and lighter rather
                  than competing with the claim for four heavy lines. The space
                  above matters: without it the heading text content reads
                  "expédition.Sans TMS". */}
              <span className="mt-2 block text-[0.6em] font-semibold leading-tight text-ink-500">
                {t("h1Qualifier")}
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">
              {t("subtitle")}
            </p>

            {/* The demo button is out until the video exists: a primary CTA that
                leads nowhere costs more than its absence. `common.cta.demo` is
                kept for when it comes back. */}
            <div className="mt-9">
              <SignupButton source="hero" size="lg">
                {tc("cta.signup")} <ArrowRight className="h-4 w-4" aria-hidden />
              </SignupButton>
            </div>
            <p className="mt-3 text-sm text-ink-500">{tc("cta.signupNote")}</p>

            <ul className="mt-10 space-y-3 border-t border-ink-200 pt-7">
              {proof.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* The floating alert card overhangs the frame, so the column keeps
              room for it rather than letting it collide with the next section. */}
          <div className="lg:pl-10 lg:pr-0">
            <Screenshot id="hero" ratio="aspect-[16/10]" priority>
              <HeroShowcase />
            </Screenshot>
          </div>
        </div>
      </Container>
    </section>
  );
}
