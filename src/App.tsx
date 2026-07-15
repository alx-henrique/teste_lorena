import React, { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { motion, useScroll, useTransform } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

// Lazy load below-the-fold components for better performance
const Counters = React.lazy(() => import("./components/Counters"));
const About = React.lazy(() => import("./components/About"));
const Testimonials = React.lazy(() => import("./components/Testimonials"));
const LogoCarousel = React.lazy(() => import("./components/LogoCarousel"));
const Projects = React.lazy(() => import("./components/Projects"));
const ConsultancyInfo = React.lazy(() => import("./components/ConsultancyInfo"));
const Newsletter = React.lazy(() => import("./components/Newsletter"));
const Footer = React.lazy(() => import("./components/Footer"));
const ContactModal = React.lazy(() => import("./components/ContactModal"));
const LearnMore = React.lazy(() => import("./pages/LearnMore"));

function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="h-20" />}>
        <Counters />
        <About />
        <LogoCarousel />
        <Testimonials />
        <ConsultancyInfo />
        <Projects />
        <Newsletter />
        <Footer />
      </Suspense>
    </>
  );
}

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
    <div className="relative min-h-screen bg-[#d9d9d9] overflow-x-hidden selection:bg-[#6fbc83]/20 selection:text-neutral-900">
      
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
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sobre" element={
            <Suspense fallback={<div className="h-20" />}>
              <LearnMore />
            </Suspense>
          } />
        </Routes>
      </div>

      {/* Dynamic Scheduling Dialog Sheet */}
      <Suspense fallback={null}>
        <ContactModal isOpen={isContactOpen} onClose={closeContact} />
      </Suspense>
      
    </div>
  );
}
