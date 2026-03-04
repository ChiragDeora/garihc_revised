import Intro from "@/components/Intro";
import Navigation from "@/components/Navigation";
import Services from "@/components/Services";
import AISpotlight from "@/components/AISpotlight";
import SelectedWork from "@/components/SelectedWork";
import GarihcMeaning from "@/components/GarihcMeaning";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Noise texture overlay */}
      <div className="noise-overlay" />

      {/* Cinematic intro */}
      <Intro />

      {/* Navigation appears for content sections */}
      <Navigation />

      {/* Content sections */}
      <main>
        <About />
        <Services />
        <AISpotlight />
        <SelectedWork />
        <GarihcMeaning />
        <Contact />
      </main>

      <Footer />
      <ChatWidget />
    </>
  );
}
