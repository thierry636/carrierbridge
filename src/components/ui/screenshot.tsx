import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ImageIcon } from "lucide-react";
import { CAPTURES_DIR, screenshotSrc, screenshots, type ScreenshotId } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Renders the real screenshot when the file has been dropped into
 * public/captures, and a visible placeholder while it has not. The check runs
 * at build time, since every page using this is statically generated.
 */
export async function Screenshot({
  id,
  ratio,
  priority,
  className,
}: {
  id: ScreenshotId;
  ratio: string;
  priority?: boolean;
  className?: string;
}) {
  const { file, width, height } = screenshots[id];
  const present = existsSync(path.join(process.cwd(), "public", CAPTURES_DIR, file));
  const t = await getTranslations("common");

  if (!present) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-ink-300 bg-ink-50 p-8 text-center",
          ratio,
          className
        )}
      >
        <ImageIcon className="h-6 w-6 text-ink-400" aria-hidden />
        <p className="max-w-xs text-sm font-medium text-ink-500">
          {t("placeholder.missing", { file: `public/${CAPTURES_DIR}/${file}` })}
        </p>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-ink-200 bg-white", ratio, className)}>
      <Image
        src={screenshotSrc(id)}
        alt={t(`screenshots.${id}`)}
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="h-full w-full object-cover"
      />
    </div>
  );
}
