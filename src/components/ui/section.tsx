import type { ReactNode } from "react";
import { Container } from "./container";
import { cn } from "@/lib/utils";

export function Section({
  id,
  tone = "white",
  className,
  children,
}: {
  id?: string;
  tone?: "white" | "muted" | "dark";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-16 lg:py-24",
        tone === "muted" && "bg-ink-50",
        tone === "dark" && "bg-ink-950 text-white",
        className
      )}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "light",
}: {
  eyebrow?: ReactNode;
  title: string;
  lede?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <div className="mb-4">{eyebrow}</div>}
      <h2
        className={cn(
          "text-balance text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl",
          tone === "dark" ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed lg:text-lg",
            tone === "dark" ? "text-white/70" : "text-ink-600"
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

export function Badge({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "neutral" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        tone === "brand" ? "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200" : "bg-ink-100 text-ink-700"
      )}
    >
      {children}
    </span>
  );
}
