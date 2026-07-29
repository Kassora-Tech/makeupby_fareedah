import { services, servicesSection } from "@/data/content";
import ImageSlot from "./ImageSlot";
import Reveal from "./Reveal";

export default function Services() {
  return (
    <section id="services" className="relative px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-body text-[10px] uppercase tracking-[0.45em] text-accent">
            {servicesSection.eyebrow}
          </p>
          <h2 className="mt-5 max-w-md font-display text-4xl leading-[1.05] tracking-[-0.01em] text-text sm:text-5xl">
            {servicesSection.heading}
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-16 md:grid-cols-[6fr_5fr] md:items-start md:gap-24">
          {/* Numbered rows separated by hairlines — reads as a studio capability list. */}
          <div>
            {services.map((service, index) => (
              <Reveal key={service.title} delay={index * 70}>
                <div className="group flex items-baseline gap-6 border-b border-slate-700/40 py-7 first:border-t first:border-slate-700/40">
                  <span className="font-body text-[10px] tracking-[0.2em] text-slate-500 transition-colors duration-300 group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight text-text transition-colors duration-300 group-hover:text-accent sm:text-[28px]">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-sm font-body text-[13px] leading-relaxed text-text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="md:sticky md:top-28">
            <ImageSlot
              src={servicesSection.image}
              alt={servicesSection.imageAlt}
              label="Services Image"
              sizes="(max-width: 768px) 90vw, 40vw"
              className="aspect-[4/5] w-full rounded-[2px] ring-1 ring-slate-700/40"
              imageClassName="saturate-[0.5] brightness-[0.85]"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
