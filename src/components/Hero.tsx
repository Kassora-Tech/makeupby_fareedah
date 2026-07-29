import { hero } from "@/data/content";
import ImageSlot from "./ImageSlot";

export default function Hero() {
  // Split the role line so a single word can carry the glitch treatment.
  const [beforeAccent, afterAccent] = hero.roleLine.includes(hero.accentWord)
    ? hero.roleLine.split(hero.accentWord)
    : [hero.roleLine, ""];

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink"
    >
      {/* The "cover of the magazine" moment — full-bleed portrait under a deep gradient.
          ImageSlot owns its own stacking context, so it's positioned by this wrapper
          rather than by overriding the component's own `relative`. */}
      <div className="absolute inset-0">
        <ImageSlot
          src={hero.image}
          alt={hero.imageAlt}
          label="Hero Image"
          priority
          sizes="100vw"
          className="h-full w-full"
          imageClassName="object-center saturate-[0.75] brightness-[0.95]"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/20 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-20 pt-40 sm:pb-28">
        <p className="font-body text-[10px] uppercase tracking-[0.45em] text-accent">
          {hero.location}
        </p>

        {/* Type as the design element: oversized, tight-tracked display serif. */}
        <h1 className="mt-7 font-display text-[clamp(2.75rem,11vw,8.5rem)] leading-[0.92] tracking-[-0.025em] text-text">
          Fareedah
          <br />
          Davis
        </h1>

        <div className="mt-10 h-px w-24 bg-slate-700" />

        <p className="mt-8 max-w-lg font-body text-[11px] uppercase leading-relaxed tracking-[0.24em] text-text-muted sm:text-xs">
          {beforeAccent}
          <span className="glitch text-text" data-text={hero.accentWord}>
            {hero.accentWord}
          </span>
          {afterAccent}
        </p>

        <a
          href="#portfolio"
          className="group mt-16 inline-flex items-center gap-4 font-body text-[10px] uppercase tracking-[0.3em] text-slate-300 transition-colors duration-300 hover:text-text"
        >
          <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-slate-500 p-1 transition-colors duration-300 group-hover:border-accent">
            <span className="h-1.5 w-px animate-bounce bg-accent" />
          </span>
          {hero.scrollCue}
        </a>
      </div>
    </section>
  );
}
