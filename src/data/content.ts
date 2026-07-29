/*
  Single source of truth for site copy and image slots.

  SWAPPING IN REAL PHOTOGRAPHY
  Every image below is one string. To replace a placeholder with Fareedah's own
  photo, drop the file in /public and change that single line, e.g.
      src: U("1502823403499-6ccfcf4fb453")   ->   src: "/glam-01.jpg"
  Nothing else in the codebase needs to change.

  PLACEHOLDER PHOTOGRAPHY
  These are hand-picked Unsplash photos (free license, commercial use OK) chosen
  for cool-toned, editorial mood. While they are in use, the footer shows a
  "Photos via Unsplash" line — delete `showsStockCredit` below once real client
  photography replaces them. See scripts/fetch-unsplash.mjs to regenerate a wider
  curated set once an Unsplash API key is available.
*/

/** Builds an Unsplash CDN URL. next/image re-optimizes and resizes from this source. */
const U = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1400&q=80`;

/**
 * The curated placeholder pool. Each entry was verified to load and to match the
 * cool-toned / editorial brief. Named so it's obvious which slot uses which shot.
 */
const STOCK = {
  gelLight: U("1502823403499-6ccfcf4fb453"), // magenta + teal gel lighting, high drama
  moodyBlack: U("1524504388940-b1c1722653e1"), // dark ground, soft key, editorial
  coolBlue: U("1534528741775-53994a69daeb"), // cool blue-lit face against dark
  redLip: U("1616683693504-3ea7e9ad6fec"), // graphic red lip on black
  electricTeal: U("1529626455594-4ff0802cfb7e"), // saturated cool colour block
  street: U("1517841905240-472988babdf9"), // desaturated street/denim, grunge edge
  lavender: U("1567532939604-b6b5b0db2604"), // pale lavender wash, cool cast
  brick: U("1526510747491-58f928ec870f"), // textured wall, raw grunge tone
} as const;

/** Set to false once real client photography replaces the stock placeholders. */
export const showsStockCredit = true;

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
  image: STOCK.gelLight,
  imageAlt: "Editorial makeup portrait lit with coloured gels",
};

export type GalleryCategory =
  | "Glam"
  | "Editorial"
  | "Grunge"
  | "Avant-Garde / Color"
  | "Film & TV";

export const galleryCategories: GalleryCategory[] = [
  "Glam",
  "Editorial",
  "Grunge",
  "Avant-Garde / Color",
  "Film & TV",
];

export interface GalleryImageSlot {
  id: string;
  category: GalleryCategory;
  src: string;
  alt: string;
  /** Drives the tile's aspect ratio, so the masonry reads art-directed rather than uniform. */
  aspect: "portrait" | "square" | "tall" | "wide";
}

/*
  Three slots per category. Aspect ratios are deliberately varied so the grid
  looks curated rather than mechanical. Replace `src` per slot with real work.
*/
export const galleryImages: GalleryImageSlot[] = [
  // — Glam
  { id: "glam-1", category: "Glam", src: STOCK.redLip, alt: "Graphic red lip, glam finish", aspect: "tall" },
  { id: "glam-2", category: "Glam", src: STOCK.moodyBlack, alt: "Soft glam with sculpted contour", aspect: "portrait" },
  { id: "glam-3", category: "Glam", src: STOCK.lavender, alt: "Luminous skin and cool-toned glam", aspect: "square" },

  // — Editorial
  { id: "editorial-1", category: "Editorial", src: STOCK.coolBlue, alt: "Cool-lit editorial beauty portrait", aspect: "portrait" },
  { id: "editorial-2", category: "Editorial", src: STOCK.moodyBlack, alt: "Low-key editorial beauty shot", aspect: "tall" },
  { id: "editorial-3", category: "Editorial", src: STOCK.gelLight, alt: "Gel-lit editorial makeup concept", aspect: "wide" },

  // — Grunge
  { id: "grunge-1", category: "Grunge", src: STOCK.street, alt: "Smudged liner, raw street styling", aspect: "portrait" },
  { id: "grunge-2", category: "Grunge", src: STOCK.brick, alt: "Textured grunge beauty against concrete", aspect: "tall" },
  { id: "grunge-3", category: "Grunge", src: STOCK.coolBlue, alt: "Washed-out grunge tones, cool cast", aspect: "square" },

  // — Avant-Garde / Color
  { id: "avant-1", category: "Avant-Garde / Color", src: STOCK.gelLight, alt: "Saturated colour and graphic shapes", aspect: "tall" },
  { id: "avant-2", category: "Avant-Garde / Color", src: STOCK.electricTeal, alt: "Electric colour-block beauty concept", aspect: "portrait" },
  { id: "avant-3", category: "Avant-Garde / Color", src: STOCK.lavender, alt: "Pastel-into-neon avant-garde look", aspect: "wide" },

  // — Film & TV
  { id: "film-1", category: "Film & TV", src: STOCK.moodyBlack, alt: "Character makeup for screen", aspect: "portrait" },
  { id: "film-2", category: "Film & TV", src: STOCK.street, alt: "Continuity beauty makeup on location", aspect: "square" },
  { id: "film-3", category: "Film & TV", src: STOCK.redLip, alt: "Period-inspired screen makeup", aspect: "tall" },
];

export const about = {
  eyebrow: "About",
  heading: "Makeup built for the lens.",
  image: STOCK.moodyBlack,
  imageAlt: "Fareedah Davis at work — portrait placeholder",
  curvedTag: "EDITORIAL • GRUNGE • CAPE TOWN •",
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
  image: STOCK.coolBlue,
  imageAlt: "Creative makeup detail — texture placeholder",
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
  image: STOCK.electricTeal,
  imageAlt: "Colour-block beauty portrait — background placeholder",
  subheading:
    "For bookings, collaborations, or press inquiries, send a message below or reach out directly on Instagram.",
  instagramHandle: "@makeupby_fareedah",
  instagramUrl: "https://www.instagram.com/makeupby_fareedah",
  dmCta: "DM to Book",
};

export const footer = {
  copyright: `© ${new Date().getFullYear()} ${brand.legalName}. All rights reserved.`,
  credit: "Site by Kassora Tech",
  stockCredit: "Photos via Unsplash",
};

export const siteMeta = {
  title: "Fareedah Davis — Senior Makeup Artist | Cape Town",
  description:
    "Fareedah Davis is a Cape Town-based Senior Makeup Artist working across Editorial & Beauty, TV & Film, and Creative & SFX. Ultra Music Festival Key Artist.",
};
