"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { brand, navLinks } from "@/data/content";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // The bar stays transparent over the hero and only picks up a backdrop once
  // you've scrolled, so the title card reads uninterrupted on load.
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled || isOpen
          ? "border-b border-slate-700/40 bg-ink/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#hero"
          aria-label={`${brand.mark} — back to top`}
          className="group relative block h-[22px] w-[180px] transition-opacity duration-300 hover:opacity-80 sm:h-[26px] sm:w-[210px]"
        >
          <Image
            src={brand.logoWordmark}
            alt={brand.mark}
            fill
            sizes="210px"
            priority
            className="object-contain object-left"
          />
        </a>

        <ul className="hidden items-center gap-10 font-body text-[10px] uppercase tracking-[0.28em] md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="text-text md:hidden"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex w-5 flex-col gap-[5px]">
            <span
              className={`h-px bg-current transition-transform duration-300 ${
                isOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px bg-current transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px bg-current transition-transform duration-300 ${
                isOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {isOpen && (
        <ul className="flex flex-col border-t border-slate-700/40 bg-ink px-6 py-3 font-body text-[11px] uppercase tracking-[0.28em] md:hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 text-slate-300 transition-colors duration-300 hover:text-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
