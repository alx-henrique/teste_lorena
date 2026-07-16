import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export default function Counters() {
  const { content } = useContent();
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section
      ref={sectionRef}
      className="py-6 md:py-8 bg-transparent"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0">
          
          {/* Counter 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center space-y-3 pb-10 md:pb-0 group text-center"
          >
            <span className="font-display text-6xl sm:text-7xl md:text-7xl font-extrabold tracking-tight text-[#6fbc83] select-none">
              {content.stat1Value}
            </span>
            <div className="w-8 h-[1.5px] bg-[#6fbc83]/30 group-hover:w-16 transition-all duration-500 ease-out"></div>
            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium max-w-xs tracking-wide leading-relaxed">
              {content.stat1Text}
            </p>
          </motion.div>

          {/* Counter 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-center justify-center space-y-3 pt-10 md:pt-0 group text-center"
          >
            <span className="font-display text-6xl sm:text-7xl md:text-7xl font-extrabold tracking-tight text-[#6fbc83] select-none">
              {content.stat2Value}
            </span>
            <div className="w-8 h-[1.5px] bg-[#6fbc83]/30 group-hover:w-16 transition-all duration-500 ease-out"></div>
            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium max-w-xs tracking-wide leading-relaxed">
              {content.stat2Text}
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
