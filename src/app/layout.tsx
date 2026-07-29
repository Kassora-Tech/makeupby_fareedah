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

  Lives in <head> so it runs during parse, ahead of first paint. It must not be
  rendered inside <body> as a React child: React never executes script tags it
  renders on the client, and warns about them.

  <html> carries suppressHydrationWarning because this attribute is added before
  hydration on purpose.
*/
const introFlagScript = `
try {
  if (sessionStorage.getItem('fd-intro-seen') === '1') {
    document.documentElement.setAttribute('data-intro', 'seen');
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
