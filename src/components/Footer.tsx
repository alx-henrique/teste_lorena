import { ArrowUp, Mail, Linkedin, Globe, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useContent } from "../context/ContentContext";

export default function Footer() {
  const { content } = useContent();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-transparent pt-8 pb-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand & Bio */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="font-display font-bold tracking-tight text-xl text-black">
              LORENA PIRES
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-500 font-medium max-w-xl leading-relaxed">
              Planejamento financeiro para autônomos e pequenos negócios que desejam gerir, gastar e investir seu dinheiro com estratégia e inteligência, com foco em suas prioridades particulares.
            </p>
            
            {/* Social channels */}
            <div className="flex items-center space-x-4 pt-2">
              <a
                href={content.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://lorenapirescfp.substack.com/?utm_source=global-search"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
                aria-label="Substack"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:lorena@exemplo.com.br"
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-black transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Navegação
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", id: "home" },
                { label: "Sobre mim", id: "sobre-mim" },
                { label: "Depoimentos", id: "depoimentos" },
                { label: "Bastidor", id: "projetos" }
              ].map((nav, idx) => (
                <li key={idx}>
                  <a
                    href={`#${nav.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(nav.id);
                      if (element) {
                        const offset = 80;
                        window.scrollTo({
                          top: element.getBoundingClientRect().top + window.scrollY - offset,
                          behavior: "smooth"
                        });
                      }
                    }}
                    className="font-sans text-xs sm:text-sm text-neutral-500 hover:text-black transition-colors font-medium"
                  >
                    {nav.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-4">
            <span className="font-sans text-[11px] text-neutral-400 font-medium text-center sm:text-left">
              &copy; {new Date().getFullYear()} Lorena. Todos os direitos reservados.
            </span>
            <span className="hidden sm:inline text-neutral-300">|</span>
            <span className="font-sans text-[11px] text-neutral-400 font-medium hover:text-black cursor-pointer">
              Termos de Uso & Privacidade
            </span>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            className="cursor-pointer p-2.5 rounded-full bg-white border border-black/[0.05] hover:bg-neutral-50 text-neutral-600 hover:text-black ios-widget-shadow transition-all group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
