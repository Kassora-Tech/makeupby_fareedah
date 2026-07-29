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
      which we compensate for by committing right-sized, pre-compressed files.
      See the Photography section of the README before adding new images.

      To re-enable optimization later (after enabling it on the Vercel plan),
      delete this single line.
    */
    unoptimized: true,
  },
};

export default nextConfig;
