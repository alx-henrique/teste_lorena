import { motion } from "motion/react";
import { 
  ArrowRight, 
  Calendar,
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

  const benefits = [
    {
      icon: TrendingUp,
      desc: "Quer usar os números do negócio para tomar decisões melhores"
    },
    {
      icon: Coins,
      desc: "Está cansado de trabalhar e não ver o dinheiro sobrar"
    },
    {
      icon: Percent,
      desc: "Precisa aprender a calcular o preço certo"
    },
    {
      icon: Shuffle,
      desc: "Quer lidar melhor com a falta de previsibilidade"
    },
    {
      icon: Compass,
      desc: "Quer ter autonomia e segurança para saber por quais caminhos seguir"
    },
    {
      icon: Flag,
      desc: "Quer começar um negócio de forma estratégica e sustentável"
    }
  ];

  return (
    <div className="bg-transparent py-8 md:py-10 overflow-hidden space-y-8 md:space-y-10">
      
      {/* SECTION 1: A consultoria é para quem? */}
      <section className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-3">
            A consultoria é para quem
          </h2>
          <p className="font-sans text-[15px] sm:text-base text-neutral-500 mt-4 leading-relaxed font-medium">
            Se você se identifica com algum dos cenários abaixo, o meu acompanhamento pode ser o que o seu negócio precisa hoje.
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
                className="bg-[#F0EEEE] border border-black/[0.03] hover:border-[#6fbc83]/30 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-center space-y-4"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#6fbc83]/10 flex items-center justify-center text-[#6fbc83]">
                  <IconComponent className="w-5 h-5" />
                </div>
                <p className="font-sans text-base lg:text-lg text-neutral-700 font-normal leading-relaxed">
                  {benefit.desc}
                </p>
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
          className="bg-[#F0EEEE] border border-black/[0.03] rounded-[2.5rem] p-8 md:p-12 shadow-sm relative overflow-hidden"
        >
          
          {/* Subtle background abstract shape */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#6fbc83]/5 rounded-full blur-3xl pointer-events-none translate-x-20 -translate-y-20"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left side: Info */}
            <div className="lg:col-span-7 space-y-6">
              <span className="font-sans text-sm sm:text-xs font-semibold tracking-widest text-[#6fbc83] uppercase flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                Sem compromisso
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
                Primeiro Encontro
              </h2>
              <div className="space-y-4 font-sans text-[15px] sm:text-base md:text-lg text-neutral-600 font-medium leading-relaxed">
                <p>
                  Antes de qualquer planejamento, precisamos olhar para a realidade do seu negócio. Neste momento inicial, meu foco é escutar a sua história, entender os gargalos da operação e mapear o que está travando o seu crescimento.
                </p>
                <p>
                  É uma conversa direta e produtiva. O objetivo não é vender uma fórmula mágica, mas sim desenhar um caminho seguro para que você tenha mais clareza, previsibilidade e lucro no final do mês.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={onOpenContact}
                  className="w-full sm:w-auto group cursor-pointer flex items-center justify-center space-x-2 font-sans text-sm sm:text-xs font-bold tracking-widest text-white bg-[#6fbc83] hover:bg-neutral-900 px-6 py-3.5 rounded-full transition-all duration-300 uppercase"
                >
                  <span>quero marcar!</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="font-sans text-sm text-neutral-400 font-medium whitespace-nowrap">
                  Tempo médio: <strong className="text-neutral-700">45 minutos</strong>
                </span>
              </div>
            </div>

            {/* Right side: Modern graphic representation / aesthetic focal point */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[280px] aspect-[4/5] rounded-[2rem] bg-white border border-black/[0.03] shadow-lg p-6 flex flex-col justify-between relative">
                
                {/* Floating pill badge */}
                <div className="absolute -top-3 left-6 bg-[#2e3925] text-white font-sans text-xs sm:text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  100% gratuito
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#6fbc83]"></div>
                    <span className="font-sans text-xs sm:text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Descoberta</span>
                  </div>
                  <h4 className="font-display font-extrabold text-2xl text-neutral-950 tracking-tight leading-snug">
                    Sessão de <br/>Diagnóstico
                  </h4>
                  <p className="font-sans text-sm text-neutral-500 font-medium leading-relaxed">
                    Análise inicial detalhada para mapear desafios e oportunidades reais do negócio.
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-4 flex items-center justify-between">
                  <span className="font-sans text-xs sm:text-[11px] text-neutral-400 font-medium">Tempo estimado</span>
                  <span className="font-sans text-sm font-bold text-neutral-800 bg-neutral-50 px-2.5 py-1 rounded-lg">~45 Min</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
