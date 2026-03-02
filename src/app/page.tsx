import Intro from "@/components/Intro";
import LetterReveal from "@/components/LetterReveal";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import AISpotlight from "@/components/AISpotlight";
import SelectedWork from "@/components/SelectedWork";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Cinematic intro */}
      <Intro />

      {/* Scroll-driven letter reveals */}
      <LetterReveal />

      {/* Navigation appears for content sections */}
      <Navigation />

      {/* Content sections */}
      <main>
        <Services />
        <AISpotlight />
        <SelectedWork />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
