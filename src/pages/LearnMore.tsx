import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface LearnMoreProps {
  openContact: () => void;
}

export default function LearnMore({ openContact }: LearnMoreProps) {
  return (
    <div className="min-h-screen bg-[#2E3925] text-neutral-200 pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 text-[#6fbc83] hover:text-white transition-colors duration-300 mb-12"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-sans font-medium">Voltar para a página inicial</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="md:col-span-5"
          >
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://res.cloudinary.com/drrbezrpk/image/upload/v1783000000/design-sem-nome-AoPvrqL3KVfbBQeq_jwkugr.avif" 
                alt="Lorena" 
                className="w-full aspect-[4/5] object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="md:col-span-7 space-y-6 font-sans font-medium leading-relaxed text-base md:text-lg text-neutral-300"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-8 tracking-tight">
              Mais sobre mim
            </h1>
            <p>
              Comecei a minha carreira como planejadora financeira em 2018 na Papo de Valor, empresa da qual fiz parte até 2024. Por lá, comecei atendendo pessoas físicas. Talvez por isso, ainda que atendendo negócios, o <strong className="text-[#6fbc83] font-semibold">meu ponto de partida são as pessoas e vidas envolvidas ali</strong>, e não só números, gráficos, indicadores e processos. Vai além. E que bom!
            </p>
            <p>
              Além das consultorias, também ofereço palestras, workshops, aulas, rodas de conversas, sempre com o intuito de <strong className="text-[#6fbc83] font-semibold">trazer o assunto “grana” pra mesa, e de uma forma clara, realista e acessível</strong>.
            </p>
            <p>
              Por entender o impacto do meu trabalho é que sempre me preocupei em <strong className="text-[#6fbc83] font-semibold">seguir estudando e me aperfeiçoando</strong>. Sou engenheira civil formada pela UFG, fiz mestrado na mesma faculdade, e desde que migrei para a área de planejamento financeiro me preocupei em seguir me desenvolvendo. 
            </p>
            <p>
              De lá pra cá já fiz muitos cursos e tirei algumas certificações, mas quero dar destaque àquelas que mais me marcaram: em 2021 tirei a <strong className="text-[#6fbc83] font-semibold">certificação CFP pela Planejar</strong>, em 2024 fui aluna da Nossa - Escola para Planejadores Financeiros (escola onde sigo em supervisão) e hoje sou <strong className="text-[#6fbc83] font-semibold">pós-graduanda em Gestão de Negócios pela USP/Esalq</strong>. E este é só começo. Ter o hábito de estudar faz parte de ser a profissional que me orgulho em ser.
            </p>
            
            <div className="pt-8">
              <button
                onClick={openContact}
                className="group w-full sm:w-auto inline-flex justify-center items-center space-x-2 font-sans text-sm font-semibold tracking-wide text-white bg-[#6fbc83] hover:bg-[#5aa36e] px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Quero entrar em contato</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
