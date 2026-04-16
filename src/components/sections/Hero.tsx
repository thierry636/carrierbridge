import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search, Sparkles, Truck } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-ink-50 via-white to-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] grid-bg opacity-40" />
      <div className="absolute -top-32 right-1/2 -z-10 h-[480px] w-[480px] translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />

      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              {t("badge")}
            </span>

            <h1 className="mt-5 text-balance text-4xl font-bold leading-[1.05] tracking-tight text-ink-950 sm:text-5xl lg:text-[58px]">
              {t("title1")}{" "}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
              <br className="hidden sm:block" /> {t("title2")}
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-ink-600">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#contact">
                <Button size="lg" className="w-full sm:w-auto">
                  {t("ctaPrimary")} <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a href="#features">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t("ctaSecondary")}
                </Button>
              </a>
            </div>
          </div>

          {/* Mockup */}
          <HeroMockup />
        </div>
      </Container>
    </section>
  );
}

function HeroMockup() {
  const t = useTranslations("hero.mockup");

  const cards = [
    {
      title: t("card1Title"),
      meta: t("card1Meta"),
      match: 98,
    },
    {
      title: t("card2Title"),
      meta: t("card2Meta"),
      match: 94,
    },
    {
      title: t("card3Title"),
      meta: t("card3Meta"),
      match: 91,
    },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-brand-100/60 via-white to-accent-400/20 blur-2xl" />
      <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-[0_30px_70px_-25px_rgba(15,23,42,0.18)]">
        {/* Search bar */}
        <div className="rounded-xl border border-ink-200 bg-ink-50/50 p-3">
          <div className="flex items-center gap-2 text-xs font-medium text-ink-500">
            <Search className="h-3.5 w-3.5" />
            <span>{t("label")}</span>
          </div>
          <p className="mt-2 text-sm font-medium text-ink-800">
            “{t("query")}”
          </p>
        </div>

        {/* Results */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-ink-500">
            <span className="text-brand-600">{cards.length}</span>{" "}
            {t("resultsLabel")}
          </p>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current">
              <path d="M6.5 11.5 3 8l1.4-1.4 2.1 2.1 5.1-5.1L13 5z" />
            </svg>
          </span>
        </div>

        <ul className="mt-3 space-y-2.5">
          {cards.map((c) => (
            <li
              key={c.title}
              className="flex items-center gap-3 rounded-xl border border-ink-200 bg-white p-3 transition-colors hover:border-brand-300 hover:bg-brand-50/40"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <Truck className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-ink-900">
                  {c.title}
                </p>
                <p className="truncate text-xs text-ink-500">{c.meta}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
                {c.match}% {t("matchLabel")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
