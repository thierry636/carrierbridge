"use client";

import type { ReactNode } from "react";
import { buttonVariants } from "./button";
import { signupUrl } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Every path into signup goes through here so the conversion event and the
 * campaign parameter are never forgotten on a new CTA.
 */
export function SignupButton({
  source,
  size = "md",
  variant = "primary",
  className,
  children,
}: {
  source: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={signupUrl(source)}
      onClick={() => track("signup_click", { location: source })}
      className={cn(buttonVariants({ variant, size }), className)}
    >
      {children}
    </a>
  );
}
