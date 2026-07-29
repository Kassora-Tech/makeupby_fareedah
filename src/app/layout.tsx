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
  Marks the intro card as already-seen before the browser paints, so returning
  visitors in the same session never flash it.

  This runs immediately after the overlay element in <body> (not in <head>) and
  tags the overlay itself rather than <html>. Stamping an attribute onto <html>
  reliably trips React's hydration check, and suppressHydrationWarning doesn't
  cover the root element — tagging the overlay, which carries
  suppressHydrationWarning, keeps hydration clean.
*/
const introFlagScript = `
try {
  if (sessionStorage.getItem('fd-intro-seen') === '1') {
    var el = document.querySelector('.intro-overlay');
    if (el) el.setAttribute('data-seen', '');
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
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-text font-body">
        <IntroLoader />
        <script dangerouslySetInnerHTML={{ __html: introFlagScript }} />
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
