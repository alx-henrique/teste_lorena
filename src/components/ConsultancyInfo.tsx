import { motion } from "motion/react";
import { 
  ArrowRight, 
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
      desc: "Quer construir um caminho para que seja possível se aposentar"
    },
    {
      icon: Compass,
      desc: "Busca um olhar sensível que integre o negócio com a pessoa, entendo que um faz parte do outro"
    },
    {
      icon: Flag,
      desc: "Quer começar um negócio de forma estratégica e sustentável"
    }
  ];

  const whatsappUrl = "https://api.whatsapp.com/send/?phone=5562999945420&text=Oi%21+Vim+pelo+site+e+me+interessei+em+saber+mais+sobre+a+consultoria+financeira.&type=phone_number&app_absent=0";

  return (
    <div className="bg-transparent py-8 md:py-10 overflow-hidden space-y-8 md:space-y-10">
      
      {/* SECTION 1: A consultoria é para quem? */}
      <section className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-950 mt-3 leading-tight">
            A consultoria é para o(a) autônomo(a) ou empreendedor(a) que…
          </h2>
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

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-950">
              Primeiro Encontro
            </h2>
            <div className="space-y-4 font-sans text-[15px] sm:text-base md:text-lg text-neutral-600 font-medium leading-relaxed">
              <p>
                Cada pessoa e cada empresa são únicas. É por isso que não acredito que soluções e caminhos possam ser construídos de forma padronizada, em linha de montagem. São as particularidades de cada caso que ditam qual vai ser a melhor condução: número de encontros, forma de pagamento, escopo e tempo de acompanhamento.
              </p>
              <p>
                É por isso que tudo começa com a escuta. A gente marca uma conversa on-line (algo entre 20 e 30 minutos) para você me contar o que está acontecendo, e a partir daí eu desenvolvo uma proposta de trabalho focada no que você precisa. Essa conversa é gratuita e é o nosso ponto de partida!
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto group flex items-center justify-center space-x-2 font-sans text-sm sm:text-xs font-bold tracking-widest text-white bg-[#6fbc83] hover:bg-neutral-900 px-8 py-4 rounded-full transition-all duration-300 uppercase shadow-md hover:shadow-lg"
              >
                <span>QUERO MARCAR</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="font-sans text-sm text-neutral-400 font-medium whitespace-nowrap">
                Tempo médio: <strong className="text-neutral-700">30 minutos</strong>
              </span>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
