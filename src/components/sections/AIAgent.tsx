import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Sparkles, Truck, User } from "lucide-react";

export function AIAgent() {
  const t = useTranslations("agent");
  const bullets = t.raw("bullets") as string[];

  return (
    <section
      id="agent"
      className="relative overflow-hidden bg-ink-950 py-24 lg:py-32"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 grid-bg-dark opacity-60" aria-hidden />
      <div
        className="absolute -top-40 left-1/3 h-[500px] w-[500px] rounded-full bg-brand-600/30 blur-[120px]"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 right-1/4 h-[400px] w-[400px] rounded-full bg-accent-500/20 blur-[120px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-400">
              {t("eyebrow")}
            </p>
            <h2 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-[52px]">
              {t("title1")}{" "}
              <span className="bg-gradient-to-r from-accent-400 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/70">
              {t("subtitle")}
            </p>

            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-base text-white/85"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-500/20 text-accent-400">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <a href="#contact">
                <Button size="lg" variant="dark">
                  {t("cta")} <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>

          {/* Chat mockup */}
          <ChatMockup />
        </div>
      </Container>
    </section>
  );
}

function ChatMockup() {
  const t = useTranslations("agent.chat");

  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[28px] bg-gradient-to-br from-brand-500/30 via-transparent to-accent-500/20 blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 shadow-2xl backdrop-blur">
        {/* Window controls */}
        <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-xs font-medium text-white/40">
            Carrier Bridge — AI agent
          </span>
        </div>

        <div className="space-y-4 p-5">
          {/* User message */}
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/70">
              <User className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-white/50">{t("you")}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/85">
                {t("userMessage")}
              </p>
            </div>
          </div>

          {/* AI message */}
          <div className="flex items-start gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-accent-500 text-white">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-xs font-semibold text-accent-400">{t("ai")}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/85">
                {t("aiMessage")}
              </p>

              <div className="mt-3 space-y-2">
                {[t("result1"), t("result2"), t("result3")].map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-2.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white/85"
                  >
                    <Truck className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                    <span className="truncate">{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
