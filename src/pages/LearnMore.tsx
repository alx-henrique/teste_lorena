import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useContent } from "../context/ContentContext";

export default function LearnMore() {
  const { content } = useContent();

  const whatsappUrl = `https://api.whatsapp.com/send/?phone=${content.whatsappPhone}&text=${encodeURIComponent(content.whatsappText)}&type=phone_number&app_absent=0`;
  
  const parseMarkdownBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-[#6fbc83] font-semibold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const textParagraphs = content.learnMoreText 
    ? content.learnMoreText.split('\n\n') 
    : [];

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
                src={content.learnMoreImageSrc || "https://res.cloudinary.com/drrbezrpk/image/upload/v1782950670/Captura_de_tela_2026-07-01_210511_klbdxp.png"}
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

            {textParagraphs.map((paragraph, index) => (
              <p key={index}>{parseMarkdownBold(paragraph)}</p>
            ))}

            <div className="pt-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex justify-center items-center space-x-2 font-sans text-sm font-semibold tracking-wide text-white bg-[#6fbc83] hover:bg-[#5aa36e] px-8 py-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <span>Quero entrar em contato</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
