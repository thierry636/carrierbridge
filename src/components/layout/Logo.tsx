import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export function Logo({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className
      )}
      aria-label="Carrier Bridge — accueil"
    >
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg viewBox="0 0 32 32" fill="none" className="h-9 w-9">
          <defs>
            <linearGradient
              id="logoGradient"
              x1="0"
              y1="0"
              x2="32"
              y2="32"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stopColor="#2563EB" />
              <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
          <rect width="32" height="32" rx="8" fill="url(#logoGradient)" />
          <path
            d="M7 21c0-5 4-9 9-9s9 4 9 9"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M7 21h18"
            stroke="white"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="7" cy="21" r="1.6" fill="white" />
          <circle cx="25" cy="21" r="1.6" fill="white" />
          <circle cx="16" cy="12" r="1.8" fill="white" />
        </svg>
      </span>
      <span
        className={cn(
          "text-[17px] leading-none",
          variant === "dark" ? "text-white" : "text-ink-900"
        )}
      >
        Carrier <span className="text-brand-600">Bridge</span>
      </span>
    </Link>
  );
}
