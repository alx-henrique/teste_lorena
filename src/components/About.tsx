import { useState } from "react";
import { motion } from "motion/react";

export default function About() {
  return (
    <section id="sobre-mim" className="py-16 md:py-20 bg-[#fafafa]">
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
            
            <div className="relative overflow-hidden rounded-3xl border border-black/[0.03] bg-white p-2.5 ios-widget-shadow transition-transform duration-500 hover:scale-[1.005]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
                alt="Lorena - Planejadora Financeira"
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
              <span className="font-sans text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                Sobre mim & Filosofia
              </span>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#6fbc83] mt-2">
                Oi, eu sou a Lorena
              </h2>
            </div>

            <div className="flex flex-col space-y-5 max-w-xl">
              {/* Paragraph 1 */}
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
                No meu dia a dia ofereço consultoria financeira individual para autônomos e pequenos negócios que querem olhar com inteligência e estratégia para a forma como geram e cuidam do dinheiro.
              </p>

              {/* Paragraph 2 */}
              <p className="font-sans text-sm sm:text-base text-neutral-500 leading-relaxed font-light">
                Entendo que nem sempre os desafios que os clientes atravessam são simples, mas quando consigo promover clareza ao que de fato está acontecendo e a partir daí discutir possíveis soluções para os problemas, dá pra ver no olho do cliente a empolgação e isso - honestamente - me deixa feliz demais.
              </p>
            </div>

            {/* Bottom CTA with hover */}
            <div className="pt-2">
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById("faq");
                  if (el) {
                    const offset = 80;
                    window.scrollTo({
                      top: el.getBoundingClientRect().top + window.scrollY - offset,
                      behavior: "smooth"
                    });
                  }
                }}
                className="inline-flex cursor-pointer group items-center space-x-2 font-sans text-[11px] font-bold uppercase tracking-widest text-white border border-[#6fbc83] rounded-full px-5 py-3 bg-[#6fbc83] hover:bg-[#2e3925] hover:border-[#2e3925] transition-all duration-300"
              >
                <span>saber mais sobre mim</span>
              </a>
            </div>

            {/* Signature & CFP Badge */}
            <div className="pt-5 flex items-center space-x-4 border-t border-black/[0.04] w-fit">
              <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center font-display font-semibold text-black text-sm border border-black/[0.03]">
                LO
              </div>
              <div>
                <p className="font-display text-xs font-semibold text-[#6fbc83]">Lorena</p>
                <p className="font-sans text-[10px] text-neutral-400 tracking-wider">Lorem Ipsum Dolor & CFP® CVM</p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
