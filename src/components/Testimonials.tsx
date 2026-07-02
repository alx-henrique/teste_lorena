import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import React, { useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  feedback: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Isis",
    role: "Canela Pet e Café",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80",
    feedback: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
  },
  {
    id: 2,
    name: "Thais Helena",
    role: "",
    avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=120&h=120&q=80",
    feedback: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
  },
  {
    id: 3,
    name: "Carol",
    role: "Arte da Conversa",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&h=120&q=80",
    feedback: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit."
  },
  {
    id: 4,
    name: "Ste",
    role: "Ondas Buenas",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&h=120&q=80",
    feedback: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet."
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="depoimentos" className="py-8 md:py-10 bg-transparent relative overflow-hidden">
      {/* Background ambient gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neutral-100/50 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#6fbc83]">
            Depoimentos de quem passou por aqui
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-600 mt-4 leading-relaxed font-medium">
            Histórias reais de quem transformou a sua organização financeira e alcançou novos patamares.
          </p>
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden justify-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-500 px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest leading-none">Deslize para o lado</span>
          </div>
        </div>

        {/* Testimonials Grid (Simulating iOS Push Notification Widgets) */}
        <div 
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUpOrLeave}
          onMouseUp={onMouseUpOrLeave}
          onMouseMove={onMouseMove}
          className={`flex flex-nowrap overflow-x-auto overflow-y-hidden pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 touch-pan-x cursor-grab active:cursor-grabbing ${isDragging ? '' : 'snap-x snap-mandatory scroll-smooth'}`} 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          id="testimonials-grid"
        >
          <style dangerouslySetInnerHTML={{__html: `
            #testimonials-grid::-webkit-scrollbar { display: none; }
          `}} />
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="select-none bg-[#6fbc83] rounded-3xl p-6 border border-[#6fbc83]/20 ios-widget-shadow ios-widget-shadow-hover transition-all duration-300 flex flex-col justify-between w-[300px] max-w-[85vw] sm:w-auto sm:max-w-none sm:min-w-0 snap-center shrink-0"
              id={`testimonial-card-${t.id}`}
            >
              {/* iOS-Style Notification Header */}
              <div>
                <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/20 text-white p-1 rounded-lg">
                       <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans text-xs sm:text-[11px] font-bold tracking-wider text-white/85 uppercase">
                      Feedback de Cliente
                    </span>
                  </div>
                </div>

                {/* Feedback Text */}
                <p className="font-sans text-[15px] sm:text-sm text-white leading-relaxed font-medium mb-6">
                  "{t.feedback}"
                </p>
              </div>

              {/* iOS-Style Avatar & Identity Info */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-xs text-white">
                    {t.name}
                  </h4>
                  <p className="font-sans text-xs sm:text-[10px] text-white/70 font-medium tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Spacer to ensure right padding on mobile scroll */}
          <div className="w-1 shrink-0 sm:hidden"></div>
        </div>

      </div>
    </section>
  );
}
