import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import About from "@/components/About";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

/** Hairline rule between sections — a refined gallery-wall seam, not a hard color block. */
function Divider() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <hr className="hairline" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Gallery />
        <Divider />
        <About />
        <Divider />
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
