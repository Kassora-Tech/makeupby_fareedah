"use client";

import { useCallback, useEffect, useState } from "react";
import { brand } from "@/data/content";

const INTRO_KEY = "fd-intro-seen";
const HOLD_MS = 1250; // logotype on screen
const FADE_MS = 450; // overlay fade-out

/**
 * Brief studio-opening title card on first load.
 *
 * Repeat visits never see it: an inline script in <head> (see layout.tsx) reads
 * sessionStorage and stamps `data-intro="seen"` on <html> before first paint, and
 * CSS hides the overlay outright — so there's no flash for returning visitors.
 *
 * It's skippable by click, tap, or any keypress, and always self-dismisses.
 *
 * Note: this deliberately does NOT set `data-intro` at runtime on dismissal —
 * doing so would apply `display: none` instantly and cut the fade-out short.
 * Writing sessionStorage is enough; the inline script handles the next load.
 */
export default function IntroLoader() {
  // Rendered on the server so the very first paint of a cold visit is covered.
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const dismiss = useCallback(() => setIsDismissed(true), []);

  // Auto-dismiss, plus click/keypress to skip.
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(dismiss, prefersReduced ? 0 : HOLD_MS);
    window.addEventListener("keydown", dismiss);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", dismiss);
    };
  }, [dismiss]);

  // Remember for the session, then unmount once the fade has played out.
  useEffect(() => {
    if (!isDismissed) return;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // Private/blocked storage — worst case the intro plays again next load.
    }
    const timer = window.setTimeout(() => setIsMounted(false), FADE_MS);
    return () => window.clearTimeout(timer);
  }, [isDismissed]);

  // Hold scroll only while the card is genuinely visible. On a repeat visit the
  // overlay is hidden by CSS, so locking would trap the page for no reason.
  useEffect(() => {
    if (!isMounted) return;

    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      // Storage unavailable — treat as a first visit and lock as normal.
    }
    if (alreadySeen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div
      onClick={dismiss}
      role="presentation"
      className={`intro-overlay fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-opacity duration-[450ms] ease-out ${
        isDismissed ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="intro-mark text-center">
        <p className="font-display text-3xl lowercase tracking-[-0.015em] text-text sm:text-5xl">
          {brand.mark}
        </p>
        <p className="mt-4 font-body text-[10px] uppercase tracking-[0.45em] text-slate-300">
          Makeup Artist
        </p>
      </div>

      <span className="absolute bottom-10 font-body text-[10px] uppercase tracking-[0.3em] text-slate-500">
        Skip
      </span>
    </div>
  );
}
