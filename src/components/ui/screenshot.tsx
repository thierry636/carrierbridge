import { existsSync } from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { CAPTURES_DIR, screenshotSrc, screenshots, type ScreenshotId } from "@/lib/media";
import { cn } from "@/lib/utils";

/**
 * Optional override. The site ships with drawn visuals, which stay legible at
 * the width they occupy and need no demo dataset. Drop a real capture into
 * public/captures and it takes that slot instead; remove it and the visual
 * comes back. The check runs at build time, since these pages are static.
 */
export async function Screenshot({
  id,
  ratio,
  priority,
  className,
  children,
}: {
  id: ScreenshotId;
  ratio: string;
  priority?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const { file, width, height } = screenshots[id];
  if (!existsSync(path.join(process.cwd(), "public", CAPTURES_DIR, file))) {
    return <>{children}</>;
  }

  const t = await getTranslations("common");
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
