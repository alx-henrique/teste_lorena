import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { 
  Check, 
  HelpCircle, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  Coins, 
  Percent, 
  Shuffle, 
  Compass, 
  Flag 
} from "lucide-react";

interface ConsultancyInfoProps {
  onOpenContact: () => void;
}

export default function ConsultancyInfo({ onOpenContact }: ConsultancyInfoProps) {
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setEmailSubscribed(true);
      setTimeout(() => {
        setEmailSubscribed(false);
        setNewsletterEmail("");
      }, 5000);
    }
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Decisões Inteligentes",
      desc: "Quer usar os números do negócio para tomar decisões melhores"
    },
    {
      icon: Coins,
      title: "Retorno do Trabalho",
      desc: "Está cansado de trabalhar e não ver o dinheiro sobrar"
    },
    {
      icon: Percent,
      title: "Preço Correto",
      desc: "Precisa aprender a calcular o preço certo"
    },
    {
      icon: Shuffle,
      title: "Previsibilidade Clara",
      desc: "Quer lidar melhor com a falta de previsibilidade"
    },
    {
      icon: Compass,
      title: "Autonomia & Segurança",
      desc: "Quer ter autonomia e segurança para saber por quais caminhos seguir"
    },
    {
      icon: Flag,
      title: "Começo Estratégico",
      desc: "Quer começar um negócio de forma estratégica e sustentável"
    }
  ];

  return (
    <div className="bg-white py-16 md:py-20 overflow-hidden space-y-16 md:space-y-20">
      
      {/* SECTION 1: A consultoria é para quem? */}
      <section className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="font-sans text-sm sm:text-xs font-semibold tracking-widest text-[#6fbc83] uppercase flex items-center justify-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            Perfil Ideal
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-3">
            A consultoria é para quem
          </h2>
          <p className="font-sans text-[15px] sm:text-base text-neutral-500 mt-4 leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
        </motion.div>

        {/* Beautiful Bento-like benefit list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, idx) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-[#fcfcfc] border border-neutral-100 hover:border-[#6fbc83]/20 rounded-3xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#6fbc83]/10 flex items-center justify-center text-[#6fbc83]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-sm text-neutral-900 tracking-tight uppercase">
                    {benefit.title}
                  </h3>
                  <p className="font-sans text-sm text-neutral-600 font-light leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: O primeiro encontro */}
      <section className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-gradient-to-br from-neutral-50 to-[#fdfdfd] border border-neutral-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden"
        >
          
          {/* Subtle background abstract shape */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6fbc83]/5 rounded-full blur-3xl pointer-events-none translate-x-20 -translate-y-20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side: Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-sans text-sm sm:text-xs font-semibold tracking-widest text-[#6fbc83] uppercase flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Sem compromisso
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
                O primeiro encontro
              </h2>
              <div className="space-y-4 font-sans text-[15px] sm:text-base text-neutral-600 font-light leading-relaxed">
                <p>
                  Nosso primeiro encontro é <span className="font-normal text-[#6fbc83]">gratuito</span> e serve para você me contar mais sobre o seu negócio, seus projetos, sua realidade financeira e objetivos.
                </p>
                <p>
                  É com essa conversa que vou entender como eu posso te ajudar e assim te passo uma proposta personalizada!
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenContact}
                  className="group cursor-pointer flex items-center space-x-2 font-sans text-sm sm:text-xs font-bold tracking-widest text-white bg-[#6fbc83] hover:bg-neutral-900 px-6 py-3.5 rounded-full transition-all duration-300 uppercase"
                >
                  <span>quero marcar!</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right side: Modern graphic representation / aesthetic focal point */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] aspect-square rounded-[2rem] bg-white border border-neutral-100 shadow-lg p-6 flex flex-col justify-between relative">
                
                {/* Floating pill badge */}
                <div className="absolute -top-3 left-6 bg-[#2e3925] text-white font-sans text-xs sm:text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  100% gratuito
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6fbc83]"></div>
                    <span className="font-sans text-xs sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Lorem Ipsum</span>
                  </div>
                  <h4 className="font-display font-extrabold text-xl text-neutral-950 tracking-tight leading-snug">
                    Lorem Ipsum Dolor
                  </h4>
                  <p className="font-sans text-sm sm:text-xs text-neutral-500 font-light leading-relaxed">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                  <span className="font-sans text-xs sm:text-[10px] text-neutral-400 font-medium">Lorem Ipsum</span>
                  <span className="font-sans text-sm sm:text-xs font-bold text-neutral-800 bg-neutral-50 px-2.5 py-1 rounded-lg">45 Min</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: Se pequenos negócios falassem */}
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
              Lorem Ipsum
            </span>
            
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Se pequenos <br className="hidden sm:block" />
              negócios falassem...
            </h2>
            
            <p className="font-sans text-[15px] sm:text-base text-neutral-200/90 font-light leading-relaxed">
              Quinzenalmente um texto novo compartilhando um pouco mais sobre como enxergo finanças e empreendedorismo.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {emailSubscribed ? (
                <div className="bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 text-sm sm:text-xs font-sans text-white/95 flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[#6fbc83] shrink-0" />
                  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch w-full max-w-md gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Lorem Ipsum Dolor"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-white/10 hover:bg-white/[0.14] focus:bg-white text-white focus:text-neutral-900 placeholder-white/50 focus:placeholder-neutral-400 rounded-full px-5 py-3.5 text-sm sm:text-xs font-sans border border-white/10 focus:border-white focus:outline-none transition-all duration-300 flex-1 min-w-0"
                  />
                  <button
                    type="submit"
                    className="group cursor-pointer flex items-center justify-center space-x-2 font-sans text-sm sm:text-xs font-bold tracking-widest text-neutral-950 bg-white hover:bg-[#6fbc83] hover:text-white px-6 py-3.5 rounded-full transition-all duration-300 uppercase shrink-0"
                  >
                    <span>quero conhecer!</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
