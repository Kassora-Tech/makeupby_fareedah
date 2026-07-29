"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageSlotProps {
  src: string;
  alt: string;
  /** Shown inside the fallback block if the image can't load. */
  label?: string;
  /**
   * Wrapper classes — set the aspect ratio / size here, not on the image.
   * Note: the wrapper is always `position: relative` (next/image `fill` needs a
   * positioned ancestor). Don't pass `absolute` here — it won't reliably win the
   * cascade and the element will stay in flow. Wrap this component instead.
   */
  className?: string;
  /** Classes applied to the <Image> itself (e.g. grayscale transitions). */
  imageClassName?: string;
  /** Responsive sizes hint so the optimizer doesn't over-serve on mobile. */
  sizes?: string;
  /** Use for above-the-fold imagery only (the hero). */
  priority?: boolean;
}

/**
 * Wraps next/image with a graceful fallback.
 *
 * The wrapper owns the aspect ratio and the image fills it, so tiles reserve
 * their space before the photo arrives — no layout shift while scrolling.
 * If the file is missing (e.g. a /public path not supplied yet), it degrades to
 * a styled block instead of a broken image.
 */
export default function ImageSlot({
  src,
  alt,
  label,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: ImageSlotProps) {
  const [errored, setErrored] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`}>
      {errored ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface via-ink to-black">
          <span className="px-4 text-center font-body text-[11px] uppercase tracking-[0.2em] text-slate-300/60">
            {label ?? alt}
          </span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setErrored(true)}
          className={`object-cover ${imageClassName}`}
        />
      )}
    </div>
  );
}
