import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("inline-flex items-center gap-2.5 font-semibold tracking-tight", className)}
      aria-label="CarrierBridge — accueil"
    >
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" className="fill-brand-600" />
        <path d="M7 21c0-5 4-9 9-9s9 4 9 9" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M7 21h18" stroke="white" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="7" cy="21" r="1.6" fill="white" />
        <circle cx="25" cy="21" r="1.6" fill="white" />
        <circle cx="16" cy="12" r="1.8" fill="white" />
      </svg>
      <span className="text-[17px] leading-none text-ink-900">
        Carrier<span className="text-brand-600">Bridge</span>
      </span>
    </Link>
  );
}
