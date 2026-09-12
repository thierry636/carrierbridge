"use client";

import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { toEmbedUrl } from "@/lib/media";

/**
 * Click-to-load: the poster is ours, and nothing is requested from the video
 * host until someone presses play. That keeps the page free of third-party
 * requests for visitors who never watch it.
 */
export function DemoVideo({ url, poster }: { url?: string; poster: ReactNode }) {
  const t = useTranslations("common.video");
  const [playing, setPlaying] = useState(false);

  if (!url) return <>{poster}</>;

  if (playing) {
    return (
      <div className="aspect-video overflow-hidden rounded-xl border border-ink-200 bg-ink-950">
        <iframe
          src={toEmbedUrl(url)}
          title={t("title")}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative block w-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      {poster}
      <span className="absolute inset-0 flex items-center justify-center rounded-xl bg-ink-950/25 transition-colors group-hover:bg-ink-950/35">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-lg">
          <Play className="ml-1 h-6 w-6 text-brand-600" aria-hidden />
        </span>
      </span>
      <span className="sr-only">{t("play")}</span>
      <span className="absolute bottom-3 left-3 rounded bg-ink-950/75 px-2 py-1 text-xs font-medium text-white">
        {t("privacy")}
      </span>
    </button>
  );
}
