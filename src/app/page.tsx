import dynamic from "next/dynamic";
import Intro from "@/components/Intro";
import Navigation from "@/components/Navigation";
import FuturisticCursor from "@/components/FuturisticCursor";
import SectionRouting from "@/components/SectionRouting";
import { SmoothScroll } from "@/lib/scroll";

const SelectedWork = dynamic(() => import("@/components/SelectedWork"));
const About = dynamic(() => import("@/components/About"));
const Services = dynamic(() => import("@/components/Services"));
const Contact = dynamic(() => import("@/components/Contact"));
const Footer = dynamic(() => import("@/components/Footer"));
const ChatWidget = dynamic(() => import("@/components/ChatWidget"));

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SectionRouting />
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
