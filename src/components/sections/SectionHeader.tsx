import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  variant?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.18em]",
            variant === "dark" ? "text-accent-400" : "text-brand-600"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-balance text-3xl font-bold tracking-tight sm:text-4xl lg:text-[42px] lg:leading-[1.1]",
          variant === "dark" ? "text-white" : "text-ink-950"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed",
            variant === "dark" ? "text-white/70" : "text-ink-600",
            align === "left" && "mx-0"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
