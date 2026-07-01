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
      className="py-8 md:py-10 border-y border-black/[0.04] bg-white"
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-black/[0.05] text-center md:text-left">
          
          {/* Counter 1 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center md:items-start space-y-2.5 pb-8 md:pb-0 md:pr-16 group"
          >
            <span className="font-display text-4xl sm:text-5xl md:text-5xl font-semibold tracking-tight text-[#6fbc83] select-none">
              +{count1}
            </span>
            <div className="w-8 h-[1px] bg-black/15 group-hover:w-16 transition-all duration-500 ease-out"></div>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 font-light max-w-xs tracking-wide leading-relaxed text-center md:text-left">
              clientes pessoa física e autônomos
            </p>
          </motion.div>

          {/* Counter 2 */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col items-center md:items-start space-y-2.5 pt-8 md:pt-0 md:pl-16 group"
          >
            <span className="font-display text-4xl sm:text-5xl md:text-5xl font-semibold tracking-tight text-[#6fbc83] select-none">
              +{count2}
            </span>
            <div className="w-8 h-[1px] bg-black/15 group-hover:w-16 transition-all duration-500 ease-out"></div>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 font-light max-w-xs tracking-wide leading-relaxed text-center md:text-left">
              pequenos negócios
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
