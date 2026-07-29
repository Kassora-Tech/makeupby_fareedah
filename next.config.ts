import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
      Vercel's Image Optimization is a paid/metered feature. On this account it
      returns HTTP 402 (OPTIMIZED_IMAGE_REQUEST_PAYMENT_REQUIRED) for every
      /_next/image request, which meant no image on the site rendered at all.

      Serving images as-is sidesteps the optimizer entirely and costs nothing.
      next/image still handles layout (fill + aspect-ratio wrappers), so there's
      no layout shift — we just lose automatic resizing and WebP/AVIF conversion,
      which we compensate for by shipping right-sized, pre-compressed files.

      To re-enable optimization later (after enabling it on the Vercel plan),
      delete this single line. remotePatterns below is kept for that case.
    */
    unoptimized: true,

    // Placeholder photography is served from the Unsplash CDN while the client's
    // own images are pending. Once real photos live in /public, this entry can go.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
