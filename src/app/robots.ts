import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * Answer-engine crawlers are explicitly allowed: being cited by them is part
 * of the acquisition plan, so none of them is disallowed here.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
