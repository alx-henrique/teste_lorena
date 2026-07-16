import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Maximize2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { useContent } from "../context/ContentContext";
import { Testimonial } from "../content-default";

export default function Testimonials() {
  const { content } = useContent();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

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

  const testimonials = content.testimonials || [];

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
            Histórias reais de quem já passou pelo processo de planejamento financeiro
          </h2>
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
              onClick={() => setSelectedTestimonial(t)}
              className="select-none bg-[#6fbc83] rounded-3xl p-6 border border-[#6fbc83]/20 ios-widget-shadow ios-widget-shadow-hover transition-all duration-300 flex flex-col justify-between w-[300px] max-w-[85vw] sm:w-auto sm:max-w-none sm:min-w-0 snap-center shrink-0 cursor-pointer group"
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
                <div className="max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <p className="whitespace-pre-wrap font-sans text-[15px] sm:text-sm text-white leading-relaxed font-medium mb-4">
                    "{t.feedback}"
                  </p>
                </div>
              </div>

              {/* iOS-Style Avatar & Identity Info */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-3.5">
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
                <div className="text-white/70 group-hover:text-white transition-colors p-1.5 bg-white/15 rounded-full shadow-sm">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
          {/* Spacer to ensure right padding on mobile scroll */}
          <div className="w-1 shrink-0 sm:hidden"></div>
        </div>

      </div>

      {/* Testimonial Expanded Modal */}
      <AnimatePresence>
        {selectedTestimonial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTestimonial(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
            />
            
            {/* Modal Container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative bg-[#FAFAFA] rounded-[2rem] shadow-2xl max-w-2xl w-full border border-black/5 p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start overflow-hidden z-10"
            >
              {/* Elegant top-right Close button */}
              <button
                onClick={() => setSelectedTestimonial(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-800 transition-colors cursor-pointer z-20 shadow-sm"
                aria-label="Fechar"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Left side: Highlighted Portrait */}
              <div className="relative w-28 h-28 md:w-44 md:h-44 shrink-0 rounded-2xl overflow-hidden shadow-md border border-[#6fbc83]/10">
                <img
                  src={selectedTestimonial.avatar}
                  alt={selectedTestimonial.name}
                  className="w-full h-full object-cover grayscale-0 transition-transform duration-700"
                />
              </div>

              {/* Right side: Testimonial details */}
              <div className="flex-1 space-y-4 text-center md:text-left w-full">
                <div>
                  <h3 className="font-display font-extrabold text-2xl md:text-3xl text-[#6fbc83] tracking-tight leading-none">
                    {selectedTestimonial.name}
                  </h3>
                  {selectedTestimonial.role && (
                    <p className="font-sans text-sm text-neutral-500 font-medium mt-1.5 tracking-wide">
                      {selectedTestimonial.role}
                    </p>
                  )}
                </div>

                {/* Decorative separator */}
                <div className="h-[1px] bg-neutral-200 w-12 md:w-16 my-2 mx-auto md:mx-0"></div>

                {/* Highlighted text container */}
                <div className="max-h-[300px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
                  <p className="whitespace-pre-wrap font-sans text-base md:text-[17px] text-neutral-700 leading-relaxed font-semibold">
                    "{selectedTestimonial.feedback}"
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
