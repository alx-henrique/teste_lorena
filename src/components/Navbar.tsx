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
    <div className="fixed bottom-0 md:bottom-auto md:top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 sm:px-6 md:py-4 pointer-events-none pb-6 md:pb-0">
      <nav
        id="navbar"
        className={`pointer-events-auto w-full max-w-4xl rounded-3xl md:rounded-full transition-all duration-500 flex flex-col-reverse md:flex-row md:items-center justify-between px-5 py-3 md:py-1.5 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl border border-black/[0.06] shadow-[0_12px_40px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.01)]"
            : "bg-white/50 backdrop-blur-lg border border-black/[0.03] shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        }`}
      >
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 group"
            id="nav-logo"
          >
            <span className="font-display font-bold tracking-tight text-base sm:text-lg text-black transition-opacity group-hover:opacity-80">
              Lorena
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-black/35"></span>
            <span className="hidden sm:inline-block font-sans text-[10px] tracking-wider text-black/50 uppercase font-medium">
              Consultoria
            </span>
          </a>

          {/* Mobile CTA & Menu Trigger */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={onOpenContact}
              className="cursor-pointer font-sans text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white bg-[#6fbc83] hover:bg-[#2e3925] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300"
            >
              Marcar conversa
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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6" id="desktop-nav-links">
          {[
            { label: "Home", id: "home" },
            { label: "Sobre mim", id: "sobre-mim" },
            { label: "Bastidor", id: "projetos" },
            { label: "Depoimentos", id: "depoimentos" }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="font-sans text-[13px] font-medium text-black/60 hover:text-black transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-black/80 after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
          
          <a
            href="https://substack.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-0.5 font-sans text-[13px] font-medium text-black/60 hover:text-black transition-colors duration-300 relative group"
          >
            <span>Substack</span>
            <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden md:block" id="desktop-nav-cta">
          <button
            onClick={onOpenContact}
            className="cursor-pointer font-sans text-xs font-semibold uppercase tracking-wider text-white bg-[#6fbc83] hover:bg-[#2e3925] px-4 py-2 rounded-full transition-all duration-300 transform active:scale-98"
          >
            Contato
          </button>
        </div>

        {/* Mobile Drawer (Nested, smooth accordion-like expand inside the floating card, opening upwards) */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full flex flex-col pb-5 pt-2 space-y-4 border-b border-black/[0.04] mb-3 animate-fade-in">
            <div className="flex flex-col space-y-3.5">
              {[
                { label: "Home", id: "home" },
                { label: "Sobre mim", id: "sobre-mim" },
                { label: "Bastidor", id: "projetos" },
                { label: "Depoimentos", id: "depoimentos" }
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
                href="https://substack.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 font-display text-base font-semibold text-black/75 hover:text-black"
              >
                <span>Substack</span>
                <ArrowUpRight className="w-4 h-4 opacity-60" />
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full text-center font-sans text-xs font-bold uppercase tracking-wider text-white bg-[#6fbc83] hover:bg-[#2e3925] py-3 rounded-xl transition-colors cursor-pointer"
              >
                Quero marcar uma conversa
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
