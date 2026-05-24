import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve static assets via Vercel Edge CDN (Ch. 1: host static assets in CDN)
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 24-hour CDN cache for profile photo
  },
  // Long-lived cache headers for static assets (Ch. 1: cache data as much as possible)
  async headers() {
    return [
      {
        source: "/:path*.(ico|png|jpg|jpeg|svg|webp|avif|woff2|woff|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
