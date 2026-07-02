import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";

export default function Counters() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
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

  useEffect(() => {
    if (!hasAnimated) return;

    let startTimestamp1: number | null = null;
    let startTimestamp2: number | null = null;
    
    const duration1 = 1800; // ms
    const duration2 = 1400; // ms
    const target1 = 210;
    const target2 = 170;

    const step1 = (timestamp: number) => {
      if (!startTimestamp1) startTimestamp1 = timestamp;
      const progress = Math.min((timestamp - startTimestamp1) / duration1, 1);
      // Easing function: cubic-out for Apple-like smoothness
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount1(Math.floor(easeProgress * target1));
      if (progress < 1) {
        window.requestAnimationFrame(step1);
      }
    };

    const step2 = (timestamp: number) => {
      if (!startTimestamp2) startTimestamp2 = timestamp;
      const progress = Math.min((timestamp - startTimestamp2) / duration2, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount2(Math.floor(easeProgress * target2));
      if (progress < 1) {
        window.requestAnimationFrame(step2);
      }
    };

    window.requestAnimationFrame(step1);
    window.requestAnimationFrame(step2);

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
              +{count1}
            </span>
            <div className="w-8 h-[1.5px] bg-[#6fbc83]/30 group-hover:w-16 transition-all duration-500 ease-out"></div>
            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium max-w-xs tracking-wide leading-relaxed">
              Pessoas físicas e profissionais autônomos
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
              +{count2}
            </span>
            <div className="w-8 h-[1.5px] bg-[#6fbc83]/30 group-hover:w-16 transition-all duration-500 ease-out"></div>
            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium max-w-xs tracking-wide leading-relaxed">
              Pequenos negócios organizados e estruturados
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
