import { motion } from "motion/react";
import { BookOpen, ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="bg-transparent py-8 md:py-10 overflow-hidden">
      <section className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[2.5rem] bg-[#2e3925] text-white p-8 md:p-14 overflow-hidden shadow-xl"
        >
          {/* Top subtle glow overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(111,188,131,0.15),transparent_60%)] pointer-events-none"></div>

          <div className="max-w-2xl space-y-6 relative z-10">
            <span className="font-sans text-sm sm:text-xs font-semibold tracking-widest text-[#6fbc83] uppercase flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              Substack
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Se pequenos <br className="hidden sm:block" />
              negócios falassem...
            </h2>
            
            <p className="font-sans text-[15px] sm:text-base md:text-lg text-neutral-200/90 font-medium leading-relaxed">
              Quinzenalmente um texto novo compartilhando um pouco mais sobre como enxergo finanças e empreendedorismo.
            </p>

            <div className="pt-4 flex">
              <a
                href="https://lorenapirescfp.substack.com/?utm_source=global-search"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer inline-flex items-center space-x-2 font-sans text-sm sm:text-xs font-bold tracking-widest text-neutral-950 bg-white hover:bg-[#6fbc83] hover:text-white px-8 py-4 rounded-full transition-all duration-300 uppercase shrink-0 shadow-md"
              >
                <span>Ler artigos</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
