import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, Radio, Users, Target, Shield, ArrowRight, CheckCircle2, Bookmark } from "lucide-react";

export default function Projects() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const images = [
    {
      url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      alt: "Estratégia e Planejamento Corporativo",
      title: "Análise Estrutural"
    },
    {
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80",
      alt: "Liderança e Alinhamento Financeiro",
      title: "Mentoria Executiva"
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
      alt: "Indicadores e Métricas de Sucesso",
      title: "Crescimento Sustentável"
    }
  ];

  return (
    <section id="projetos" className="py-16 md:py-20 bg-[#f5f5f5] relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6fbc83]/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/[0.01] rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 space-y-16 md:space-y-20">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="font-sans text-xs font-semibold tracking-widest text-[#6fbc83] uppercase">
            Iniciativas & Parcerias
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#6fbc83] mt-3">
            Projetos que eu participo:
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 mt-4 leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
        </motion.div>

        {/* 1. BASTIDOR - STANDALONE SPOTLIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-[2.5rem] border border-black/[0.04] p-8 md:p-12 shadow-sm relative overflow-hidden group"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6fbc83]/5 to-transparent rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                  {/* Left side: Deep text explanation */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#6fbc83] text-white px-3.5 py-1.5 rounded-full shadow-sm select-none">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span className="font-display font-extrabold text-xs sm:text-[10px] tracking-wider uppercase">Lorem Ipsum</span>
              </div>
              
              <div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-neutral-950 tracking-tight leading-tight">
                  Bastidor
                </h3>
                <p className="font-sans text-sm sm:text-xs text-neutral-400 font-semibold tracking-wider uppercase mt-1">
                  Lorem Ipsum Dolor & Sit Amet
                </p>
              </div>

              <div className="space-y-4 font-sans text-[15px] sm:text-sm text-neutral-600 font-light leading-relaxed">
                <p>
                  Lorem ipsum <strong className="font-medium text-neutral-900">Dolor Sit Amet</strong> dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              {/* Bullet list of fields of action */}
              <div className="space-y-2.5 pt-2">
                {[
                  "Lorem ipsum dolor sit amet, consectetur.",
                  "Ut enim ad minim veniam, quis nostrud.",
                  "Duis aute irure dolor in reprehenderit in.",
                  "Excepteur sint occaecat cupidatat non proident."
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6fbc83] shrink-0" />
                    <span className="font-sans text-sm sm:text-xs text-neutral-700 font-light">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Modern Image Deck */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
                <div className="col-span-2 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
                  <img 
                    src={images[0].url} 
                    alt={images[0].alt} 
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                    <span className="font-sans text-xs sm:text-[10px] font-bold text-white uppercase tracking-widest">{images[0].title}</span>
                  </div>
                </div>

                {/* Sub image 1 */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
                  <img 
                    src={images[1].url} 
                    alt={images[1].alt} 
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                    <span className="font-sans text-xs sm:text-[9px] font-bold text-white uppercase tracking-widest">{images[1].title}</span>
                  </div>
                </div>

                {/* Sub image 2 */}
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
                  <img 
                    src={images[2].url} 
                    alt={images[2].alt} 
                    className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                    <span className="font-sans text-xs sm:text-[9px] font-bold text-white uppercase tracking-widest">{images[2].title}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* 2. THE THREE EXPANDABLE PROJECTS BELOW BASTIDOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          
          {/* Card A: Fofoca de Bolso */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-white rounded-[2rem] border p-6 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative group ${
              expandedId === "fofoca" ? "ring-2 ring-[#6fbc83] border-transparent" : "border-black/[0.04] hover:border-black/[0.08]"
            }`}
            onClick={() => toggleExpand("fofoca")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Radio className="w-5 h-5 text-[#6fbc83] animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-neutral-950 tracking-tight">
                    Fofoca de Bolso
                  </h4>
                  <p className="font-sans text-xs sm:text-[10px] text-neutral-400 font-medium uppercase tracking-wide mt-0.5">
                    Lorem Ipsum
                  </p>
                </div>
              </div>
              <motion.div 
                animate={{ rotate: expandedId === "fofoca" ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 shrink-0 group-hover:bg-neutral-100"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>

            <p className="font-sans text-sm sm:text-xs text-neutral-500 font-light mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>

            <AnimatePresence initial={false}>
              {expandedId === "fofoca" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t border-black/[0.06] space-y-4">
                    <p className="font-sans text-sm sm:text-[11px] text-neutral-500 leading-relaxed font-light">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
                    </p>

                    {/* Embed Player */}
                    <div 
                      className="w-full overflow-hidden rounded-xl bg-neutral-50 border border-black/[0.02]"
                      onClick={(e) => e.stopPropagation()} // Prevent card toggle on click
                    >
                      <iframe 
                        data-testid="embed-iframe" 
                        style={{ borderRadius: "12px" }} 
                        src="https://open.spotify.com/embed/episode/03jddbMaYVhjt8SrzbNlhS?utm_source=generator&si=be2b9301791741c8" 
                        width="100%" 
                        height="352" 
                        frameBorder="0" 
                        allowFullScreen 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="w-full h-[352px] border-0"
                      ></iframe>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card B: Supervisora Nossa */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`bg-white rounded-[2rem] border p-6 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative group ${
              expandedId === "supervisora" ? "ring-2 ring-[#6fbc83] border-transparent" : "border-black/[0.04] hover:border-black/[0.08]"
            }`}
            onClick={() => toggleExpand("supervisora")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Users className="w-5 h-5 text-[#6fbc83]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-neutral-950 tracking-tight">
                    Supervisora parceira Nossa
                  </h4>
                  <p className="font-sans text-xs sm:text-[10px] text-neutral-400 font-medium uppercase tracking-wide mt-0.5">
                    Lorem Ipsum
                  </p>
                </div>
              </div>
              <motion.div 
                animate={{ rotate: expandedId === "supervisora" ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 shrink-0 group-hover:bg-neutral-100"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>

            <p className="font-sans text-sm sm:text-xs text-neutral-500 font-light mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>

            <AnimatePresence initial={false}>
              {expandedId === "supervisora" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t border-black/[0.06] space-y-4">
                    <p className="font-sans text-sm sm:text-[11px] text-neutral-500 leading-relaxed font-light">
                      Lorem ipsum dolor sit amet, <strong className="font-medium text-neutral-800">consectetur</strong> adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                    </p>
                    <p className="font-sans text-sm sm:text-[11px] text-neutral-500 leading-relaxed font-light">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="bg-neutral-50 p-3 rounded-xl border border-black/[0.02]">
                      <span className="font-sans text-xs sm:text-[10px] font-bold text-[#6fbc83] uppercase tracking-wider block mb-1">Lorem Ipsum:</span>
                      <span className="font-sans text-xs sm:text-[10px] text-neutral-600 block leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Card C: Rodas e Workshops */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className={`bg-white rounded-[2rem] border p-6 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative group ${
              expandedId === "workshops" ? "ring-2 ring-[#6fbc83] border-transparent" : "border-black/[0.04] hover:border-black/[0.08]"
            }`}
            onClick={() => toggleExpand("workshops")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Target className="w-5 h-5 text-[#6fbc83]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-lg text-neutral-950 tracking-tight">
                    Rodas e Workshops
                  </h4>
                  <p className="font-sans text-xs sm:text-[10px] text-neutral-400 font-medium uppercase tracking-wide mt-0.5">
                    Lorem Ipsum
                  </p>
                </div>
              </div>
              <motion.div 
                animate={{ rotate: expandedId === "workshops" ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 shrink-0 group-hover:bg-neutral-100"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>

            <p className="font-sans text-sm sm:text-xs text-neutral-500 font-light mt-4 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>

            <AnimatePresence initial={false}>
              {expandedId === "workshops" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t border-black/[0.06] space-y-4">
                    <p className="font-sans text-sm sm:text-[11px] text-neutral-500 leading-relaxed font-light">
                      Lorem ipsum dolor sit amet, consectetur <strong className="font-medium text-neutral-800">adipiscing</strong> elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <p className="font-sans text-sm sm:text-[11px] text-neutral-500 leading-relaxed font-light">
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <div className="bg-neutral-50 p-3 rounded-xl border border-black/[0.02]">
                      <span className="font-sans text-xs sm:text-[10px] font-bold text-[#6fbc83] uppercase tracking-wider block mb-1">Lorem Ipsum:</span>
                      <span className="font-sans text-xs sm:text-[10px] text-neutral-600 block leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
