import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useContent } from "../context/ContentContext";

export default function Hero() {
  const { content } = useContent();
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(content.heroImageSrc);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    setImageSrc(content.heroImageSrc);
  }, [content.heroImageSrc]);

  const handleImageError = () => {
    if (retryCount === 0) {
      setImageSrc("https://res.cloudinary.com/drrbezrpk/image/upload/v1783000000/Untitled-1_r6yx8s.jpg");
      setRetryCount(1);
    } else if (retryCount === 1) {
      setImageSrc("https://res.cloudinary.com/drrbezrpk/image/upload/Untitled-1_r6yx8s.png");
      setRetryCount(2);
    } else if (retryCount === 2) {
      setImageSrc("https://res.cloudinary.com/drrbezrpk/image/upload/v1782950670/Captura_de_tela_2026-07-01_210511_klbdxp.png");
      setRetryCount(3);
    }
  };

  const whatsappUrl = content.heroCtaLink || `https://api.whatsapp.com/send/?phone=${content.whatsappPhone}&text=${encodeURIComponent(content.whatsappText)}&type=phone_number&app_absent=0`;

  return (
    <section
      id="home"
      className="relative flex items-center min-h-[85vh] md:min-h-screen max-h-[1300px] overflow-hidden bg-black"
    >
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0 bg-black">
        <img
          src={imageSrc}
          alt="Lorena"
          fetchPriority="high"
          onError={handleImageError}
          className="w-full h-full object-cover object-center md:object-[80%_center] opacity-100"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent pointer-events-none"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-left pt-20 pb-16 md:py-0">
        <div className="max-w-3xl space-y-6 md:space-y-8">
          {/* Title & Description */}
          <div className="space-y-4 md:space-y-5">
            <h1 className="font-overtide text-[50px] sm:text-[64px] md:text-[80px] lg:text-[96px] xl:text-[104px] font-normal tracking-wide text-white leading-[0.85] select-none">
              Um olhar <br className="hidden sm:block" />
              <span className="text-[#6fbc83]">estratégico</span>
            </h1>

            <p className="max-w-lg lg:max-w-[540px] font-sans text-neutral-200 text-sm md:text-base lg:text-lg leading-relaxed font-medium">
              {content.heroSubtitle}
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2 md:pt-4 flex justify-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group cursor-pointer flex items-center space-x-2 md:space-x-3 font-sans text-sm font-bold tracking-wide text-white bg-[#6fbc83] hover:bg-[#5aa36e] px-6 py-3 md:px-8 md:py-4 rounded-full transition-all duration-300 shadow-lg transform hover:-translate-y-1 active:translate-y-0"
            >
              <span>{content.heroCtaText || "Quero marcar uma conversa"}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
