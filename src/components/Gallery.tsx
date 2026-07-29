"use client";

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { galleryCategories, galleryImages, type GalleryCategory } from "@/data/content";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";

type FilterValue = "All" | GalleryCategory;

/** Aspect ratios are varied on purpose so the grid reads art-directed, not mechanical. */
const aspectClass: Record<string, string> = {
  portrait: "aspect-[3/4]",
  square: "aspect-square",
  tall: "aspect-[2/3]",
  wide: "aspect-[4/3]",
};

/**
 * Avant-Garde is the one category that gets the magenta spark — every other tab
 * uses the signature cobalt, keeping magenta an accent rather than a second theme.
 */
const isSparkCategory = (value: FilterValue) => value === "Avant-Garde / Color";

export default function Gallery() {
  const [filter, setFilter] = useState<FilterValue>("All");

  const filters = useMemo<FilterValue[]>(() => ["All", ...galleryCategories], []);

  const filtered = useMemo(
    () =>
      filter === "All" ? galleryImages : galleryImages.filter((img) => img.category === filter),
    [filter]
  );

  // ——— Sliding tab indicator (the site's one signature micro-interaction) ———
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<FilterValue, HTMLButtonElement>());
  const [indicator, setIndicator] = useState({ x: 0, y: 0, width: 0, ready: false });

  const measure = useCallback(() => {
    const container = tabsRef.current;
    const active = tabRefs.current.get(filter);
    if (!container || !active) return;

    const containerBox = container.getBoundingClientRect();
    const activeBox = active.getBoundingClientRect();

    setIndicator({
      x: activeBox.left - containerBox.left,
      // Sits just under the active pill — pills wrap on mobile, so track Y too.
      y: activeBox.bottom - containerBox.top + 6,
      width: activeBox.width,
      ready: true,
    });
  }, [filter]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  // Keep the bar aligned when the pills reflow (resize, font load, orientation).
  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  return (
    <section id="portfolio" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.45em] text-accent">Portfolio</p>
          <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] tracking-[-0.01em] text-text sm:text-6xl">
            Selected work.
          </h2>
          <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-text-muted">
            A cross-section of editorial, film, and creative work. Filter by category to explore.
          </p>
        </Reveal>

        {/* ——— Filter pills with sliding underline ——— */}
        <Reveal delay={80}>
          <div ref={tabsRef} className="relative mt-14 flex flex-wrap gap-x-7 gap-y-4 pb-3">
            {filters.map((value) => {
              const isActive = filter === value;
              return (
                <button
                  key={value}
                  type="button"
                  ref={(node) => {
                    if (node) tabRefs.current.set(value, node);
                    else tabRefs.current.delete(value);
                  }}
                  onClick={() => setFilter(value)}
                  aria-pressed={isActive}
                  className={`font-body text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    isActive
                      ? isSparkCategory(value)
                        ? "text-spark"
                        : "text-text"
                      : "text-slate-300 hover:text-text"
                  }`}
                >
                  {value}
                </button>
              );
            })}

            {/* 1px-wide bar scaled to the active tab: transform-only, so it stays on the compositor. */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-0 top-0 h-px w-px origin-left ${
                isSparkCategory(filter) ? "bg-spark" : "bg-accent"
              } ${indicator.ready ? "opacity-100" : "opacity-0"}`}
              style={{
                transform: `translate3d(${indicator.x}px, ${indicator.y}px, 0) scaleX(${indicator.width})`,
                transition:
                  "transform 420ms cubic-bezier(0.22, 0.61, 0.36, 1), opacity 200ms linear",
              }}
            />
          </div>
        </Reveal>

        {/* ——— Art-directed masonry ——— */}
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {filtered.map((item, index) => (
            <Reveal
              key={item.id}
              delay={Math.min(index * 55, 280)}
              className="mb-5 break-inside-avoid"
            >
              <figure className="group relative cursor-pointer overflow-hidden rounded-[2px] ring-1 ring-slate-700/40 transition-shadow duration-500 hover:ring-accent/50 hover:shadow-[0_0_36px_-8px_rgba(61,107,255,0.45)]">
                <ImageSlot
                  src={item.src}
                  alt={item.alt}
                  label={item.category}
                  className={`w-full ${aspectClass[item.aspect]}`}
                  // Muted at rest, full colour on hover — restrained, not animated everywhere.
                  imageClassName="saturate-[0.45] brightness-[0.85] transition-[transform,filter] duration-[600ms] ease-out will-change-transform group-hover:scale-[1.04] group-hover:saturate-100 group-hover:brightness-100"
                />

                {/* Keeps the caption legible over bright frames. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/85 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <figcaption className="pointer-events-none absolute bottom-4 left-4 translate-y-1 font-body text-[10px] uppercase tracking-[0.24em] text-text opacity-0 transition-[opacity,transform] duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.category}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
