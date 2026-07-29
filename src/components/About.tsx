import { about } from "@/data/content";
import ImageSlot from "./ImageSlot";
import CurvedText from "./CurvedText";
import Reveal from "./Reveal";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[5fr_6fr] md:items-center md:gap-24">
        <Reveal className="relative mx-auto w-full max-w-sm md:mx-0">
          <CurvedText
            id="about-curve"
            text={about.curvedTag}
            // Sits high enough that the arc's descending ends clear the photo's
            // top edge — the image paints over anything that dips below it.
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 text-slate-500"
          />
          <ImageSlot
            src={about.image}
            alt={about.imageAlt}
            label="About Portrait"
            sizes="(max-width: 768px) 90vw, 40vw"
            className="aspect-[4/5] w-full rounded-[2px] ring-1 ring-slate-700/40"
            imageClassName="saturate-[0.55] brightness-[0.9]"
          />
          {/* The rare magenta spark — used once here, once on the booking CTA. */}
          <span className="absolute -bottom-3 -right-3 bg-spark px-4 py-2 font-body text-[9px] uppercase tracking-[0.28em] text-ink">
            {about.badge}
          </span>
        </Reveal>

        <div>
          <Reveal>
            <p className="font-body text-[10px] uppercase tracking-[0.45em] text-accent">
              {about.eyebrow}
            </p>
            <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.05] tracking-[-0.01em] text-text sm:text-5xl">
              {about.heading}
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 max-w-lg space-y-5 font-body text-sm leading-relaxed text-text-muted sm:text-[15px]">
              {about.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-12 border-t border-slate-700/40 pt-10">
              <h3 className="font-body text-[10px] uppercase tracking-[0.32em] text-slate-300">
                Credentials
              </h3>
              <ul className="mt-7 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {about.credentials.map((credential) => (
                  <li
                    key={credential}
                    className="flex items-start gap-3 font-body text-[13px] leading-relaxed text-text"
                  >
                    <span className="mt-[7px] h-px w-3 shrink-0 bg-accent" />
                    {credential}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
