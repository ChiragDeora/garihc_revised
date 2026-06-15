import Intro from "@/components/Intro";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import SelectedWork from "@/components/SelectedWork";
import GarihcMeaning from "@/components/GarihcMeaning";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FuturisticCursor from "@/components/FuturisticCursor";
import { SmoothScroll } from "@/lib/scroll";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <FuturisticCursor />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Cinematic intro */}
      <Intro />

      {/* Navigation appears for content sections */}
      <Navigation />

      {/* Content sections */}
      <main>
        <SelectedWork />
        <About />
        <Services />
        {/* <GarihcMeaning /> */}
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
