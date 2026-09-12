import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Deliberately looks unfinished: product screenshots are still missing and a
 * polished stand-in would hide that. Replace with a real <Image> in WebP.
 */
export function ScreenshotPlaceholder({
  label,
  ratio = "aspect-[16/10]",
  className,
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ink-300 bg-ink-50 p-8 text-center",
        ratio,
        className
      )}
    >
      <ImageIcon className="h-6 w-6 text-ink-400" aria-hidden />
      <p className="max-w-xs text-sm font-medium text-ink-500">{label}</p>
    </div>
  );
}
