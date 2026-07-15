import { motion } from "motion/react";
import { MessageSquare } from "lucide-react";
import React, { useRef, useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  feedback: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Livia Leite",
    role: "Estúdio Maré",
    avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132372/Livia_Leite_-_Est%C3%BAdio_Mar%C3%A9_az85yl.jpg",
    feedback: `A consultoria me ajudou muito a entender onde a minha empresa se encontra, definir onde queremos chegar e qual é o caminho para isso. 

A metodologia da Lorena me deu mais confiança para lidar com os processos dentro da empresa e também me ajudou a estruturar toda a parte financeira do meu negócio!`
  },
  {
    id: 2,
    name: "Adeyc Borges",
    role: "",
    avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132420/Adeyc_Borges_nh25yy.jpg",
    feedback: `Existem pessoas que fazem muito mais do que prestar um serviço: elas caminham ao nosso lado nos momentos mais importantes. A Lorena foi exatamente essa pessoa para mim.

Ela chegou em um dos períodos mais desafiadores da minha trajetória profissional, quando eu estava recomeçando e precisava tomar decisões importantes para construir uma empresa sólida. Sempre fui apaixonado pelo que faço, mas administrar as finanças de um negócio era um grande desafio para mim.

Em cada reunião, a Lorena me ajudava a enxergar o cenário com clareza. Juntos analisávamos cada passo, decidíamos o que fazia sentido naquele momento, o que precisava esperar e quais eram os caminhos mais seguros para o crescimento da minha marca. Esse suporte foi essencial para que eu tomasse decisões com mais confiança e responsabilidade.

Hoje posso dizer que grande parte da tranquilidade que tenho para gerir o meu negócio vem desse acompanhamento. Afinal, a saúde financeira é a base de qualquer empresa que deseja crescer de forma sustentável.

Sou muito grato à Lorena por todo o profissionalismo, dedicação e parceria. E mais do que uma consultora financeira, ela se tornou alguém em quem confio para me orientar nas decisões mais importantes da minha empresa. Recomendo o trabalho dela de olhos fechados.`
  },
  {
    id: 3,
    name: "Claudia Kievel",
    role: "Jardim Secreto",
    avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132418/Claudia_Kievel_-_Jardim_Secreto_reqxed.png",
    feedback: `Ter começado a consultoria financeira com a Lorena foi essencial para entender que precisava de uma organização e revisão mais aprofundada das questões administrativas, burocráticas e dos números do meu negócio. 

Com ela pude entender como ser a administradora que meu negócio precisava - e que eu nem achava que conseguiria ser - mesmo não sendo a minha área de atuação ou formação, mas por ser uma necessidade e responsabilidade dentro da empresa.

Me sinto cada vez mais tranquila e consciente com o meu negócio. Tanto na visão do dia a dia, como numa visão mais macro. 

Me sinto no controle e claro, mais em paz!`
  },
  {
    id: 4,
    name: "Stephanie",
    role: "Ondas Buenas",
    avatar: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132419/Stephanie_-_Ondas_Buenas_hdaiol.png",
    feedback: `Adoro o tema, tento estudar sobre na medida do possível e pensava que poderia fazer tudo sozinha, com meus papéis e tabelinhas do excel. Que iludida! 

Ter o conhecimento da Lorena fez eu entender que era uma necessidade da minha empresa essa atenção mais detalhada para o financeiro e tudo que atravessa esse campo. 

Ela é uma profissional muito atenta e o que mais me encantou é que não toma uma decisão sem antes pensar junto, entender a realidade, que é particular de cada um.

Com ela pude me sentir mais segura para seguir dirigindo meu negócio, assim como dando mais razão ao que acredito onde minha marca pode chegar. Hoje, posso afirmar que tenho além de contas, números organizados e calculados, tenho consciência do rumo que meu negócio está tomando e que consequências o movimento dele pode resultar. Obrigada, Lore!

Como falamos na Argentina: 
vamos por más!`
  }
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const onMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="depoimentos" className="py-8 md:py-10 bg-transparent relative overflow-hidden">
      {/* Background ambient gradient blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-neutral-100/50 rounded-full blur-3xl pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#6fbc83]">
            Histórias reais de quem já passou pelo processo de planejamento financeiro
          </h2>
        </motion.div>

        {/* Mobile Swipe Hint */}
        <div className="flex sm:hidden justify-center mb-6">
          <div className="inline-flex items-center space-x-2 bg-neutral-100 text-neutral-500 px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span className="font-sans text-[10px] font-bold uppercase tracking-widest leading-none">Deslize para o lado</span>
          </div>
        </div>

        {/* Testimonials Grid (Simulating iOS Push Notification Widgets) */}
        <div 
          ref={scrollRef}
          onMouseDown={onMouseDown}
          onMouseLeave={onMouseUpOrLeave}
          onMouseUp={onMouseUpOrLeave}
          onMouseMove={onMouseMove}
          className={`flex flex-nowrap overflow-x-auto overflow-y-hidden pb-8 -mx-6 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 sm:mx-0 sm:px-0 sm:overflow-visible sm:pb-0 touch-pan-x cursor-grab active:cursor-grabbing ${isDragging ? '' : 'snap-x snap-mandatory scroll-smooth'}`} 
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          id="testimonials-grid"
        >
          <style dangerouslySetInnerHTML={{__html: `
            #testimonials-grid::-webkit-scrollbar { display: none; }
          `}} />
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="select-none bg-[#6fbc83] rounded-3xl p-6 border border-[#6fbc83]/20 ios-widget-shadow ios-widget-shadow-hover transition-all duration-300 flex flex-col justify-between w-[300px] max-w-[85vw] sm:w-auto sm:max-w-none sm:min-w-0 snap-center shrink-0"
              id={`testimonial-card-${t.id}`}
            >
              {/* iOS-Style Notification Header */}
              <div>
                <div className="flex items-center justify-between mb-5 border-b border-white/10 pb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-white/20 text-white p-1 rounded-lg">
                       <MessageSquare className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-sans text-xs sm:text-[11px] font-bold tracking-wider text-white/85 uppercase">
                      Feedback de Cliente
                    </span>
                  </div>
                </div>

                {/* Feedback Text */}
                <div className="max-h-[280px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <p className="whitespace-pre-wrap font-sans text-[15px] sm:text-sm text-white leading-relaxed font-medium mb-4">
                    "{t.feedback}"
                  </p>
                </div>
              </div>

              {/* iOS-Style Avatar & Identity Info */}
              <div className="flex items-center space-x-3.5 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-display font-semibold text-sm sm:text-xs text-white">
                    {t.name}
                  </h4>
                  <p className="font-sans text-xs sm:text-[10px] text-white/70 font-medium tracking-wide">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Spacer to ensure right padding on mobile scroll */}
          <div className="w-1 shrink-0 sm:hidden"></div>
        </div>

      </div>
    </section>
  );
}
