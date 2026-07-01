import { useState, useEffect, MouseEvent } from "react";
import { ArrowRight, Check, Shield } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface HeroProps {
  onOpenContact: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Mouse coordinates for elegant parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for lag-free premium feel
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Map mouse coordinates to subtle rotation & translation values
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  
  // Custom parallax offsets for different cards to create depth
  const card1X = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const card1Y = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  const card2X = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const card2Y = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);

  const card3X = useTransform(smoothX, [-0.5, 0.5], [-6, 6]);
  const card3Y = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalize values between -0.5 and 0.5
    const x = (e.clientX - rect.left) / width - 0.5;
    const y = (e.clientY - rect.top) / height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16 pb-14 md:pt-32 md:pb-24 bg-gradient-to-b from-[#d9d9d9] via-[#f5f5f5] to-white"
    >
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 lg:gap-12 items-center justify-center">
          
          {/* Left Column: Title and Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-8 animate-fade-in-up lg:pr-4">
            
            {/* CVM certification authority badge */}
            <div className="inline-flex items-center space-x-2 bg-[#6fbc83]/10 text-[#2e3925] border border-[#6fbc83]/20 px-3 py-1.5 rounded-full select-none">
              <Shield className="w-3.5 h-3.5 text-[#6fbc83]" />
              <span className="font-sans text-[10px] font-bold uppercase tracking-widest leading-none">Consultora certificada CVM</span>
            </div>

            {/* Grouped Title & Description with tight spacing on mobile to avoid feeling like separate elements */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              <div className="relative">
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight text-neutral-950 leading-[1.08] select-none">
                  Um olhar <br />
                  <span className="text-[#6fbc83]">estratégico</span>
                </h1>
              </div>

              {/* Structured description text */}
              <p className="font-sans text-[#1b1c24] text-sm sm:text-base md:text-lg leading-relaxed font-light max-w-xl">
                e que leve em consideração as suas particularidades é o caminho no qual eu aposto para uma vida financeira melhor,{" "}
                <span className="font-normal text-neutral-800">seja para a empresa, seja para todas as pessoas que estão por trás.</span>
              </p>
            </div>

            {/* Main Action Call to Button */}
            <div className="pt-2">
              <button
                onClick={onOpenContact}
                className="group cursor-pointer flex items-center space-x-2.5 font-sans text-sm font-semibold tracking-wide text-white bg-[#6fbc83] hover:bg-[#2e3925] px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Quero marcar uma conversa</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* Right Column: Interactive Parallax Card Composite */}
          <div 
            className="lg:col-span-5 relative w-full flex justify-center lg:justify-start lg:pl-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            
            {/* Main Interactive Stage */}
            <motion.div 
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[320px] aspect-[4/5] rounded-[2rem] p-2 bg-white/30 border border-white/40 shadow-lg"
            >
              
              {/* Backing decorative shape inside frame */}
              <div className="absolute inset-2 rounded-[1.75rem] bg-gradient-to-tr from-[#6fbc83]/15 via-neutral-100 to-[#6fbc83]/25 z-0"></div>
              
              {/* Main Portrait image of Lorena */}
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Lorena"
                className="relative z-10 w-full h-full object-cover rounded-[1.75rem] shadow-inner select-none pointer-events-none"
              />

              {/* FLOATING CARD 1: Atendimento 1-on-1 */}
              <motion.div 
                style={{ x: card1X, y: card1Y, translateZ: 40 }}
                animate={{ 
                  y: [0, -6, 0] 
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-[20%] -left-10 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/60 flex items-center space-x-2.5 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-[#6fbc83] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-sans text-[11px] font-semibold text-neutral-800 tracking-tight whitespace-nowrap">
                  Lorem Ipsum Dolor
                </span>
              </motion.div>

              {/* FLOATING CARD 2: Estratégia sob medida */}
              <motion.div 
                style={{ x: card2X, y: card2Y, translateZ: 60 }}
                animate={{ 
                  y: [0, 6, 0] 
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute bottom-[25%] -left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/60 flex items-center space-x-2.5 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-4.5 h-4.5 rounded-full bg-[#6fbc83] flex items-center justify-center text-white shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <span className="font-sans text-[11px] font-semibold text-neutral-800 tracking-tight whitespace-nowrap">
                  Lorem Ipsum Consectetur
                </span>
              </motion.div>

              {/* FLOATING GLASS BOX (Top Right): 100% Organização */}
              <motion.div 
                style={{ x: card3X, y: card3Y, translateZ: 80 }}
                animate={{ 
                  y: [0, -8, 0] 
                }}
                transition={{ 
                  duration: 7, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -top-4 -right-6 z-20 bg-white/80 backdrop-blur-lg px-4.5 py-4 rounded-2xl border border-white/50 flex flex-col space-y-1 shadow-lg max-w-[130px]"
              >
                <span className="font-sans text-[8px] font-bold text-neutral-400 uppercase tracking-widest leading-none">
                  Lorem
                </span>
                <span className="font-display text-2xl font-extrabold text-neutral-950 tracking-tight">
                  100%
                </span>
                <span className="font-sans text-[9px] text-neutral-500 leading-tight">
                  lorem ipsum dolor sit.
                </span>
              </motion.div>

              {/* FLOATING HIGHLIGHT CARD (Bottom Right): Consultoria Premium */}
              <motion.div 
                style={{ x: card1X, y: card2Y, translateZ: 50 }}
                animate={{ 
                  y: [0, 8, 0] 
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.2
                }}
                className="absolute -bottom-6 -right-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/60 flex items-center space-x-3 shadow-xl max-w-[210px]"
              >
                <div className="w-8 h-8 rounded-lg bg-[#6fbc83]/10 flex items-center justify-center text-[#6fbc83] shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-display font-bold text-[11px] text-neutral-900 leading-none">
                    Lorem Ipsum Dolor CFP®
                  </p>
                  <p className="font-sans text-[9px] text-neutral-400 font-medium mt-1">
                    Lorem ipsum dolor sit
                  </p>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
