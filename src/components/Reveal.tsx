"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Stagger within a group, in ms. Keep small — this is punctuation, not choreography. */
  delay?: number;
  className?: string;
  as?: ElementType;
}

/**
 * Reveals children as they scroll into view.
 *
 * Animates opacity/transform only (see .reveal in globals.css) so the browser can
 * keep it on the compositor — no layout or paint work during scroll. Observers
 * disconnect after firing, so nothing keeps running once an element has appeared.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion is handled in CSS (.reveal is forced visible with no
    // transition), so there's no JS branch needed for it here.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      // Fire slightly before the element is fully on screen so it lands settled.
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${isVisible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
