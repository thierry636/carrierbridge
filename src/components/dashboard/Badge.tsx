import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium whitespace-nowrap",
  {
    variants: {
      variant: {
        success: "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
        info: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
        accent: "bg-cyan-50 text-cyan-700 ring-1 ring-inset ring-cyan-200",
        neutral: "bg-ink-100 text-ink-700 ring-1 ring-inset ring-ink-200",
        warning: "bg-amber-50 text-amber-800 ring-1 ring-inset ring-amber-200",
        outline: "bg-white text-ink-700 ring-1 ring-inset ring-ink-200",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
      },
    },
    defaultVariants: { variant: "neutral", size: "sm" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />;
}
