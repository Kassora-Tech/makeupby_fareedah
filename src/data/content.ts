/*
  Single source of truth for site copy and image slots.

  PHOTOGRAPHY
  Every image is Fareedah's own work, living in /public/images. Each entry is a
  single string, so swapping a shot is a one-line change.

  Files are committed as optimised .jpg; the .png masters sit beside them locally
  and are gitignored. Vercel's Image Optimization is disabled (see next.config.ts),
  so whatever is committed is exactly what browsers download — always add new work
  as a right-sized .jpg rather than a multi-megabyte .png.

  ADDING WORK
  Push a new object into `galleryImages` with a `category`. The filter tabs are
  derived from what's actually present, so a new category creates its own tab and
  no tab can ever appear with nothing behind it.
*/


export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

/**
 * The brand mark, used for the nav logotype, the intro card, and the hero.
 *
 * `mark` is the handle set as a wordmark. `heroLines` splits it across two lines
 * for the oversized hero treatment — kept as data so the break point is a content
 * decision, not something buried in the component.
 *
 * `legalName` stays the real name: it's what the copyright line and page metadata
 * should say, and it's what people search for.
 */
export const brand = {
  mark: "makeupby_fareedah",
  heroLines: ["makeupby", "_fareedah"],
  legalName: "Fareedah Davis",
};

export const hero = {
  accentWord: "Editorial", // the one word that gets the glitch treatment
  roleLine: "Senior Makeup Artist — Editorial · TV & Film · SFX",
  location: "Cape Town, South Africa",
  scrollCue: "Scroll",
  // Real client photography (not a stock placeholder).
  image: "/images/hero.jpg",
  imageAlt:
    "Close-up editorial makeup: graphic orange and green eye work in hard directional light",
};

export type GalleryCategory = "Glam" | "Editorial" | "Creative & SFX";

export interface GalleryImageSlot {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  /** Drives the tile's aspect ratio, so the masonry reads art-directed rather than uniform. */
  aspect: "portrait" | "square" | "tall" | "wide";
}

/*
  The real portfolio. Aspect ratios are varied deliberately so the grid reads
  art-directed rather than mechanical — they crop the source, they don't distort it.
*/
export const galleryImages: GalleryImageSlot[] = [
  // — Glam
  {
    id: "wedding",
    category: "Glam",
    src: "/images/wedding.jpg",
    alt: "Bridal makeup: soft luminous glam with a defined eye",
    aspect: "portrait",
  },

  // — Editorial
  {
    id: "photoshoot",
    category: "Editorial",
    src: "/images/photoshoot.jpg",
    alt: "Editorial beauty look with sculpted bronze tones on a studio shoot",
    aspect: "tall",
  },
  {
    id: "photoshoot2",
    category: "Editorial",
    src: "/images/photoshoot2.jpg",
    alt: "Floral editorial concept: coral makeup with fresh flowers set into the hair and skin",
    aspect: "portrait",
  },

  // — Creative & SFX (Comic Con character work)
  {
    id: "comiccon-4",
    category: "Creative & SFX",
    src: "/images/comicCon4.jpg",
    alt: "Comic-book split-face paint in bold red, yellow and blue graphic blocks",
    aspect: "portrait",
  },
  {
    id: "comiccon-2",
    category: "Creative & SFX",
    src: "/images/comicCon2.jpg",
    alt: "SFX character look with a spiked halo headpiece and prosthetic wound work",
    aspect: "tall",
  },
  {
    id: "comiccon-1",
    category: "Creative & SFX",
    src: "/images/comicCon1.jpg",
    alt: "Special effects makeup: detailed wound and blood work across the face",
    aspect: "square",
  },
  {
    id: "comiccon-3",
    category: "Creative & SFX",
    src: "/images/comicCon3.jpg",
    alt: "SFX character makeup in red and black with textured scarring",
    aspect: "portrait",
  },
];

/**
 * Derived from the work that actually exists, in first-appearance order, so a
 * filter tab can never render with nothing behind it. Adding an image with a new
 * category is all it takes to add a tab.
 */
export const galleryCategories: GalleryCategory[] = Array.from(
  new Set(galleryImages.map((image) => image.category))
);

export const about = {
  eyebrow: "About",
  heading: "Makeup built for the lens.",
  image: "/images/artistportrait.jpg",
  imageAlt: "Fareedah Davis",
  curvedTag: "EDITORIAL • SFX • CAPE TOWN •",
  badge: "Key Artist",
  bio: [
    "Fareedah Davis is a Cape Town-based makeup artist working at the intersection of high fashion and grit — building looks for editorial shoots, TV and film productions, and the stage.",
    "Her work moves fluidly between polished beauty and eccentric, avant-garde concepts, with a reputation for pushing colour, texture, and prosthetics into unexpected territory.",
  ],
  credentials: [
    "Ultra Music Festival — Key Artist",
    "TV & Film makeup department experience",
    "Editorial & beauty campaign background",
    "Creative & SFX specialist",
    "Based in Cape Town, South Africa",
  ],
};

export interface Service {
  title: string;
  description: string;
}

export const servicesSection = {
  eyebrow: "Services",
  heading: "What I do.",
  image: "/images/whatweOffer.jpg",
  imageAlt: "Soft-glam beauty makeup in natural light",
};

export const services: Service[] = [
  {
    title: "Editorial & Beauty",
    description: "Fashion-forward looks built for the lens — magazine shoots, lookbooks, and campaigns.",
  },
  {
    title: "TV & Film",
    description: "Continuity-precise makeup for on-camera work, from natural coverage to character transformation.",
  },
  {
    title: "Creative & SFX",
    description: "Avant-garde concepts, prosthetics, and special effects for bold, boundary-pushing projects.",
  },
  {
    title: "Events",
    description: "Festival, stage, and performance makeup designed to hold up under lights and movement.",
  },
];

export const contact = {
  eyebrow: "Contact",
  heading: "Let's make something.",
  // Doubles as the closing backdrop; sits under a heavy dark gradient.
  image: "/images/photoshoot2.jpg",
  imageAlt: "Floral editorial makeup concept",
  subheading:
    "For bookings, collaborations, or press inquiries, send a message below or reach out directly on Instagram.",
  instagramHandle: "@makeupby_fareedah",
  instagramUrl: "https://www.instagram.com/makeupby_fareedah",
  dmCta: "DM to Book",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} ${brand.legalName}. All rights reserved.`,
  credit: "Site by Kassora Tech",
};

export const siteMeta = {
  title: "Fareedah Davis — Senior Makeup Artist | Cape Town",
  description:
    "Fareedah Davis is a Cape Town-based Senior Makeup Artist working across Editorial & Beauty, TV & Film, and Creative & SFX. Ultra Music Festival Key Artist.",
};
