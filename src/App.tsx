import { useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Counters from "./components/Counters";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import LogoCarousel from "./components/LogoCarousel";
import Projects from "./components/Projects";
import ConsultancyInfo from "./components/ConsultancyInfo";
import Footer from "./components/Footer";
import ContactModal from "./components/ContactModal";

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);
  const closeContact = () => setIsContactOpen(false);

  // Hook into viewport scroll progress
  const { scrollY } = useScroll();

  // Create different speed factors for parallax background layers (WOW factor)
  const bgBlob1Y = useTransform(scrollY, [0, 4000], [0, -350]);
  const bgBlob2Y = useTransform(scrollY, [0, 4000], [0, 300]);
  const bgBlob3Y = useTransform(scrollY, [0, 4000], [0, -200]);
  const bgBlob4Y = useTransform(scrollY, [0, 4000], [0, 250]);

  return (
    <div className="relative min-h-screen bg-[#fafafa] overflow-x-hidden selection:bg-[#6fbc83]/20 selection:text-neutral-900">
      
      {/* PARALLAX LAYER: Floating organic blurs sliding behind foreground */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div 
          style={{ y: bgBlob1Y }}
          className="absolute top-[5%] -left-[10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-[#6fbc83]/6 blur-[120px]"
        />
        <motion.div 
          style={{ y: bgBlob2Y }}
          className="absolute top-[30%] -right-[10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-[#2e3925]/4 blur-[140px]"
        />
        <motion.div 
          style={{ y: bgBlob3Y }}
          className="absolute top-[55%] -left-[5%] w-[55vw] h-[55vw] max-w-[550px] rounded-full bg-[#6fbc83]/5 blur-[110px]"
        />
        <motion.div 
          style={{ y: bgBlob4Y }}
          className="absolute top-[75%] -right-[5%] w-[45vw] h-[45vw] max-w-[450px] rounded-full bg-[#2e3925]/3 blur-[100px]"
        />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Premium Apple Navigation */}
        <Navbar onOpenContact={openContact} />

        {/* Hero Section with fluid Parallax */}
        <Hero onOpenContact={openContact} />

        {/* Animated Numerical Counters */}
        <Counters />

        {/* About Section - 2 columns */}
        <About />

        {/* Infinite Client Logo Carousel */}
        <LogoCarousel />

        {/* iOS Widget-styled Testimonials */}
        <Testimonials />

        {/* Projects and Initiatives Section */}
        <Projects />

        {/* Deep-dive Consultancy Profiles and Newsletters */}
        <ConsultancyInfo onOpenContact={openContact} />

        {/* Elegant Monochromatic Footer */}
        <Footer />
      </div>

      {/* Dynamic Scheduling Dialog Sheet */}
      <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      
    </div>
  );
}
