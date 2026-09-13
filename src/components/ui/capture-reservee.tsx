import { cn } from "@/lib/utils";

/**
 * Reserved frame for a screenshot that does not exist yet. The layout is final
 * from now on — only the image is missing — so nothing shifts when the capture
 * lands. "Capture à venir" shows in development only; in production the frame
 * carries just its legend.
 */
export function CaptureReservee({
  legende,
  ratio = "aspect-[16/10]",
  className,
}: {
  legende: string;
  /** Tailwind aspect ratio class. Defaults to a real screenshot's 16:10. */
  ratio?: string;
  className?: string;
}) {
  const enDeveloppement = process.env.NODE_ENV === "development";

  return (
    <figure className={cn("w-full", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-xl border border-ink-200 bg-ink-50",
          ratio
        )}
      >
        {enDeveloppement && (
          <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-ink-500 ring-1 ring-inset ring-ink-200">
            Capture à venir
          </span>
        )}
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-ink-500">{legende}</figcaption>
    </figure>
  );
}
