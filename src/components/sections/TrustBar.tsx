import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/container";

export function TrustBar() {
  const t = useTranslations("trust");

  return (
    <section aria-label="Trust" className="border-y border-ink-100 bg-white py-10">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-ink-400">
          {t("label")}
        </p>
        <div className="mt-6 grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex h-8 items-center justify-center text-ink-300"
              aria-hidden
            >
              <svg viewBox="0 0 100 24" className="h-6 w-auto">
                <rect
                  x="0"
                  y="6"
                  width="22"
                  height="12"
                  rx="3"
                  className="fill-ink-200"
                />
                <rect
                  x="28"
                  y="9"
                  width="64"
                  height="6"
                  rx="3"
                  className="fill-ink-200"
                />
              </svg>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
