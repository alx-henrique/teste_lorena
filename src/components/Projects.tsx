import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Sparkles, Radio, Users, Target, Bookmark, ArrowRight, CheckCircle2 } from "lucide-react";

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
    <section id="projetos" className="py-8 md:py-10 bg-transparent relative overflow-hidden">
      {/* Background ambient blurs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#6fbc83]/5 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/[0.01] rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10 space-y-8 md:space-y-10">
        
        {/* SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#6fbc83]">
            Outros projetos dos quais participo
          </h2>
          <p className="font-sans text-base md:text-lg text-neutral-600 mt-4 leading-relaxed font-medium">
            Iniciativas e espaços onde compartilho conhecimentos sobre finanças, negócios e estratégia.
          </p>
        </motion.div>

        {/* 1. BASTIDOR - STANDALONE SPOTLIGHT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#F0EEEE] border border-black/[0.03] rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden group"
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#6fbc83]/5 to-transparent rounded-full pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left side: Deep text explanation */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-[#6fbc83] text-white px-3.5 py-1.5 rounded-full shadow-sm select-none">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                <span className="font-display font-extrabold text-xs sm:text-[10px] tracking-wider uppercase font-semibold">Bastidor da Lore</span>
              </div>
              
              <div>
                <h3 className="font-display font-extrabold text-3xl md:text-4xl text-neutral-950 tracking-tight leading-tight">
                  Bastidor
                </h3>
              </div>

              <div className="space-y-4 font-sans text-base sm:text-lg text-neutral-700 font-medium leading-relaxed">
                <p className="text-neutral-900 font-semibold text-lg">
                  Se você já oferece ou deseja oferecer atendimentos de planejamento financeiro para pequenos negócios, você deveria estar com a gente!
                </p>
                <p className="text-neutral-600">
                  Minha melhor versão como mentora é mostrando a prática real. Em vez de caminhos prontos, trago para a mesa o que acontece nos bastidores:
                </p>
              </div>

              {/* Bullet list of fields of action */}
              <div className="space-y-3 pt-2">
                {[
                  { title: "Casos Reais", desc: "Discussão de atendimentos meus ou de colegas." },
                  { title: "Mão na Massa", desc: "Mergulhos conjuntos para mapear soluções e testar possibilidades." },
                  { title: "Entregáveis", desc: "Acesso a todas as planilhas, propostas e roteiros desenvolvidos." }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#6fbc83] shrink-0 mt-1" />
                    <span className="font-sans text-base text-neutral-700 font-medium">
                      <strong className="text-[#6fbc83] font-semibold">{item.title}:</strong> {item.desc}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Link */}
              <div className="pt-2">
                <a 
                  href="https://bastidordalore.substack.com/p/bastidor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer inline-flex items-center space-x-2 font-sans text-sm font-bold tracking-wide text-white bg-[#6fbc83] hover:bg-[#5aa36e] px-6 py-3 rounded-full transition-all duration-300 shadow-md"
                >
                  <span>Saiba Mais</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right side: Modern Image Deck */}
            <div className="lg:col-span-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Main large image */}
                <div className="col-span-2 relative aspect-[21/9] rounded-2xl overflow-hidden shadow-sm border border-black/[0.03]">
                  <img 
                    src={images[0].url} 
                    alt={images[0].alt} 
                    loading="lazy"
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
                    loading="lazy"
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
                    loading="lazy"
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

        {/* 2. THREE EXPANDABLE PROJECTS BELOW BASTIDOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          {/* Card A: Fofoca de Bolso */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`bg-[#F0EEEE] rounded-[2rem] border p-6 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative group ${
              expandedId === "fofoca" ? "ring-2 ring-[#6fbc83] border-transparent" : "border-black/[0.04] hover:border-black/[0.08]"
            }`}
            onClick={() => toggleExpand("fofoca")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Radio className="w-5 h-5 text-[#6fbc83] animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-neutral-950 tracking-tight">
                    Fofoca de Bolso
                  </h4>
                  <p className="font-sans text-[10px] text-neutral-400 font-semibold uppercase tracking-wide mt-0.5">
                    Podcast
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

            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium mt-4 leading-relaxed">
              Um podcast sobre inteligência financeira, feito por <strong className="text-[#6fbc83] font-semibold">planejadores financeiros independentes, em ritmo de contação de caso</strong> - porque planejamento financeiro é pra todo mundo, sim!
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
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">
                      No episódio mais recente, conversamos sobre os <strong className="text-[#6fbc83] font-semibold">desafios reais de quem decide mudar de rumo profissional</strong> de forma planejada. Dê o play para conferir!
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

          {/* Card B: Nossa */}
          <motion.div 
            layout
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className={`bg-[#F0EEEE] rounded-[2rem] border p-6 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative group ${
              expandedId === "nossa" ? "ring-2 ring-[#6fbc83] border-transparent" : "border-black/[0.04] hover:border-black/[0.08]"
            }`}
            onClick={() => toggleExpand("nossa")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Users className="w-5 h-5 text-[#6fbc83]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-neutral-950 tracking-tight">
                    Nossa
                  </h4>
                  <p className="font-sans text-[10px] text-neutral-400 font-semibold uppercase tracking-wide mt-0.5">
                    Escola de Planejadores
                  </p>
                </div>
              </div>
              <motion.div 
                animate={{ rotate: expandedId === "nossa" ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-7 h-7 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-400 shrink-0 group-hover:bg-neutral-100"
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </div>

            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium mt-4 leading-relaxed">
              Atuo na Nossa – Escola para Planejadores Financeiros, onde <strong className="text-[#6fbc83] font-semibold">ofereço aulas e encontros de supervisão</strong> para colegas de profissão em formação ou supervisão.
            </p>

            <AnimatePresence initial={false}>
              {expandedId === "nossa" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pt-5 mt-5 border-t border-black/[0.06] space-y-4">
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">
                      Como supervisora, acompanho de perto a sua trajetória, ajudando a guiar os seus passos e a <strong className="text-[#6fbc83] font-semibold">desenhar soluções para os desafios práticos</strong> do dia a dia de atendimento.
                    </p>
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">
                      Acredito no planejamento pé no chão, focado nas ciências comportamentais para garantir que você atenda com <strong className="text-[#6fbc83] font-semibold">confiança, sensibilidade e excelência</strong>.
                    </p>
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
            className={`bg-[#F0EEEE] rounded-[2rem] border p-6 shadow-sm transition-all duration-300 cursor-pointer overflow-hidden relative group ${
              expandedId === "workshops" ? "ring-2 ring-[#6fbc83] border-transparent" : "border-black/[0.04] hover:border-black/[0.08]"
            }`}
            onClick={() => toggleExpand("workshops")}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-800 shrink-0">
                  <Target className="w-5 h-5 text-[#6fbc83]" />
                </div>
                <div>
                  <h4 className="font-display font-extrabold text-base text-neutral-950 tracking-tight">
                    Rodas e Workshops
                  </h4>
                  <p className="font-sans text-[10px] text-neutral-400 font-semibold uppercase tracking-wide mt-0.5">
                    Facilitação
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

            <p className="font-sans text-sm sm:text-base text-neutral-600 font-medium mt-4 leading-relaxed">
              Conduzo rodas de conversa e workshops onde <strong className="text-[#6fbc83] font-semibold">traduzo as finanças de forma acessível</strong> para criar ambientes de clareza estratégica e soluções reais.
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
                    <p className="font-sans text-xs sm:text-sm text-neutral-500 leading-relaxed font-medium">
                      <strong className="font-bold text-[#6fbc83] block mb-1">FOCO DA ATUAÇÃO:</strong>
                      Workshops práticos e rodas de conversa voltados para a <strong className="text-[#6fbc83] font-semibold">organização de finanças pessoais e a estruturação de pequenos negócios</strong>.
                    </p>
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
