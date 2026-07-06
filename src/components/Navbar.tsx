import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenContact: () => void;
}

export default function Navbar({ onOpenContact }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="fixed bottom-0 md:bottom-auto md:top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:px-6 md:py-5 pointer-events-none pb-6 md:pb-0">
      
      {/* Desktop Navbar (Split Layout) */}
      <div className="hidden md:flex items-stretch justify-center space-x-4 w-auto">
        {/* Logo Box */}
        <div className={`pointer-events-auto flex items-center justify-center px-8 py-3 rounded-[32px] transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]" : "bg-white/80 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-black/[0.03]"}`}>
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group"
          >
            <img 
              src="https://res.cloudinary.com/drrbezrpk/image/upload/v1783000000/lorena---marca-1-mk3zrv3DqVIqJaBv_zmnbhn.avif" 
              alt="Lorena" 
              className="h-10 lg:h-12 w-auto transition-opacity group-hover:opacity-80 object-contain" 
            />
          </a>
        </div>

        {/* Navigation & CTA Pill */}
        <nav className={`pointer-events-auto flex items-center space-x-8 pl-10 pr-3 py-3 rounded-full transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.06)] border border-black/[0.03]" : "bg-white/80 backdrop-blur-lg shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-black/[0.03]"}`}>
          <div className="flex items-center space-x-6 lg:space-x-8">
            {[
              { label: "Home", id: "home" },
              { label: "Sobre mim", id: "sobre-mim" },
              { label: "Depoimentos", id: "depoimentos" },
              { label: "Bastidor", id: "projetos" }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="font-sans text-[13px] lg:text-[14px] font-medium text-black/60 hover:text-black transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-black/80 after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
            
            <a
              href="https://lorenapirescfp.substack.com/?utm_source=global-search"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-0.5 font-sans text-[13px] lg:text-[14px] font-medium text-black/60 hover:text-black transition-colors duration-300 relative group"
            >
              <span>Substack</span>
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <button
            onClick={onOpenContact}
            className="cursor-pointer font-sans text-[11px] lg:text-xs font-bold uppercase tracking-wider text-white bg-[#6fbc83] hover:bg-[#5aa36e] px-6 py-3 rounded-full transition-all duration-300 transform active:scale-98 shadow-sm"
          >
            Contato
          </button>
        </nav>
      </div>

      {/* Mobile Navbar */}
      <nav
        id="mobile-navbar"
        className={`md:hidden pointer-events-auto w-full rounded-3xl transition-all duration-500 flex flex-col-reverse px-5 py-4 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04)]"
            : "bg-white/80 backdrop-blur-lg border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        }`}
      >
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center group"
          >
            <img 
              src="https://res.cloudinary.com/drrbezrpk/image/upload/v1783000000/lorena---marca-1-mk3zrv3DqVIqJaBv_zmnbhn.avif" 
              alt="Lorena" 
              className="h-8 w-auto transition-opacity group-hover:opacity-80" 
            />
          </a>

          {/* Mobile CTA & Menu Trigger */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenContact}
              className="cursor-pointer font-sans text-[10px] font-bold uppercase tracking-wider text-white bg-[#6fbc83] hover:bg-[#5aa36e] px-3 py-1.5 rounded-full transition-all duration-300 shadow-sm"
            >
              Contato
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-black/80 hover:text-black transition-colors focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="w-full flex flex-col pb-5 pt-2 space-y-4 border-b border-black/[0.04] mb-3 animate-fade-in">
            <div className="flex flex-col space-y-3.5">
              {[
                { label: "Home", id: "home" },
                { label: "Sobre mim", id: "sobre-mim" },
                { label: "Depoimentos", id: "depoimentos" },
                { label: "Bastidor", id: "projetos" }
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="font-display text-base font-semibold text-black/75 hover:text-black transition-colors"
                >
                  {item.label}
                </a>
              ))}
              
              <a
                href="https://lorenapirescfp.substack.com/?utm_source=global-search"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 font-display text-base font-semibold text-black/75 hover:text-black"
              >
                <span>Substack</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://api.whatsapp.com/send/?phone=5562999945420&text=Oi%21+Vim+pelo+site+e+me+interessei+em+saber+mais+sobre+a+consultoria+financeira.&type=phone_number&app_absent=0"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center font-sans text-xs font-bold uppercase tracking-wider text-white bg-[#6fbc83] hover:bg-[#2e3925] py-3 rounded-xl transition-colors cursor-pointer"
              >
                Quero marcar uma conversa
              </a>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
