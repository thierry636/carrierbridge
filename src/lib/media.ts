/**
 * Every image slot on the site, in one place.
 *
 * To fill a slot: export a WebP at the size below, name it exactly as `file`
 * says, and drop it in `public/captures/`. Nothing else to change — the slot
 * shows a dashed placeholder while the file is missing and the real image as
 * soon as it is there. Alt text lives in the message files under
 * `common.screenshots.<id>`, so it is translated like the rest of the copy.
 */
export const screenshots = {
  hero: { file: "hero.webp", width: 1280, height: 800 },
  gridBefore: { file: "grille.webp", width: 1280, height: 720 },
  bestPrice: { file: "meilleur-prix.webp", width: 1200, height: 900 },
  fuelGap: { file: "ecart-gazole.webp", width: 1200, height: 900 },
  demoPoster: { file: "demo-poster.webp", width: 1280, height: 720 },
} as const;

export type ScreenshotId = keyof typeof screenshots;

export const CAPTURES_DIR = "captures";

export function screenshotSrc(id: ScreenshotId) {
  return `/${CAPTURES_DIR}/${screenshots[id].file}`;
}

/**
 * The demo video is not self-hosted: a three-minute MP4 on the app server is
 * slow and expensive. Set NEXT_PUBLIC_DEMO_VIDEO_URL to a YouTube, Vimeo or
 * Loom embed URL. Nothing from that host loads until the visitor clicks play,
 * so no third-party request happens without an explicit action.
 */
export const demoVideoUrl = process.env.NEXT_PUBLIC_DEMO_VIDEO_URL;

/**
 * Accepts the URL people actually copy from the address bar and returns an
 * embeddable one. YouTube goes through youtube-nocookie.com.
 */
export function toEmbedUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      return `https://www.youtube-nocookie.com/embed/${parsed.pathname.slice(1)}?autoplay=1`;
    }
    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop();
      return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    }
    if (host.endsWith("vimeo.com") && !host.startsWith("player.")) {
      return `https://player.vimeo.com/video/${parsed.pathname.split("/").pop()}?autoplay=1`;
    }
    if (host.endsWith("loom.com")) {
      return url.replace("/share/", "/embed/");
    }
    // Already an embed URL, or a host we do not rewrite.
    return url;
  } catch {
    return url;
  }
}
