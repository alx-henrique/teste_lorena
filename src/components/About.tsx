import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <section id="sobre-mim" className="py-8 md:py-10 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Elegant Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative group w-full max-w-xs sm:max-w-sm lg:max-w-[320px] mx-auto lg:mr-auto lg:ml-0 order-last lg:order-first"
            id="about-image-container"
          >
            {/* Soft decorative background shadow elements */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-neutral-200 to-neutral-100 rounded-3xl blur-xl opacity-40 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.03] bg-[#f5f5f5] p-2.5 ios-widget-shadow transition-transform duration-500 hover:scale-[1.005]">
              <img
                src="https://res.cloudinary.com/drrbezrpk/image/upload/v1782950670/Captura_de_tela_2026-07-01_210511_klbdxp.png"
                alt="Lorena - Planejadora Financeira"
                loading="lazy"
                className="w-full aspect-[4/5] object-cover rounded-2xl grayscale-15 hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
            </div>
          </motion.div>

          {/* Right Column: Text Content (Easy to read, comfortable maximum width) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 flex flex-col justify-center space-y-6 order-first lg:order-last"
            id="about-text-container"
          >
            <div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-4xl font-extrabold tracking-tight text-[#6fbc83] mt-2">
                Oi, sou a Lorena
              </h2>
            </div>

            <div className="flex flex-col space-y-5 max-w-xl">
              {/* Paragraph 1 */}
              <p className="font-sans text-base md:text-lg text-neutral-500 leading-relaxed font-medium">
                No meu dia a dia ofereço <strong className="text-[#6fbc83] font-semibold">consultoria financeira individual para autônomos e pequenos negócios</strong> que querem <strong className="text-[#6fbc83] font-semibold">olhar com inteligência e estratégia</strong> para a forma como geram e cuidam do dinheiro.
              </p>

              {/* Paragraph 2 */}
              <p className="font-sans text-base md:text-lg text-neutral-500 leading-relaxed font-medium">
                Entendo que nem sempre os desafios que os clientes atravessam são simples, mas quando consigo <strong className="text-[#6fbc83] font-semibold">promover clareza ao que de fato está acontecendo</strong> e a partir daí <strong className="text-[#6fbc83] font-semibold">discutir possíveis soluções para os problemas</strong>, dá pra ver no olho do cliente a empolgação e isso - honestamente - me deixa feliz demais.
              </p>
            </div>

            {/* Bottom CTA with hover */}
            <div className="pt-2">
              <Link
                to="/sobre"
                className="inline-flex cursor-pointer group items-center space-x-2 font-sans text-[11px] font-bold uppercase tracking-widest text-white border border-[#6fbc83] rounded-full px-5 py-3 bg-[#6fbc83] hover:bg-[#2e3925] hover:border-[#2e3925] transition-all duration-300"
              >
                <span>saber mais sobre mim</span>
              </Link>
            </div>

            {/* Signature & CFP Badge */}
            <div className="pt-5 flex items-center space-x-4 w-fit">
              <img
                src="https://res.cloudinary.com/drrbezrpk/image/upload/v1782950670/Captura_de_tela_2026-07-01_210511_klbdxp.png"
                alt="Lorena"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border border-[#6fbc83]/20 shadow-sm"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="font-display text-sm sm:text-base font-extrabold text-[#6fbc83]">Lorena Pires Carvalho</p>
                <p className="font-sans text-xs sm:text-sm text-neutral-500 font-medium">CFP® & CVM</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
