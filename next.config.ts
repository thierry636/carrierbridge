import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const CANONICAL_HOST = "carrier-bridge.com";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async redirects() {
    return [
      // The site used to advertise carrierbridge.com. Anything still arriving
      // on that host — or on www — is sent to the canonical one, permanently.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(www\\.)?carrierbridge\\.com" }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: `www\\.${CANONICAL_HOST.replace(".", "\\.")}` }],
        destination: `https://${CANONICAL_HOST}/:path*`,
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
