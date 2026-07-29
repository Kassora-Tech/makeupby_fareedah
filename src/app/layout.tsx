import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { siteMeta } from "@/data/content";
import IntroLoader from "@/components/IntroLoader";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

/*
  Runs before first paint so returning visitors never flash the intro card.
  Mirrors the sessionStorage key used by IntroLoader.
*/
const introFlagScript = `
try {
  if (sessionStorage.getItem('fd-intro-seen') === '1') {
    document.documentElement.dataset.intro = 'seen';
  }
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The intro script below stamps data-intro on <html> before hydration by design,
      // so React should not treat that attribute difference as a mismatch.
      suppressHydrationWarning
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introFlagScript }} />
      </head>
      <body className="min-h-full flex flex-col bg-ink text-text font-body">
        <IntroLoader />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
