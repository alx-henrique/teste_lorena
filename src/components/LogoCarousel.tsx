import { motion } from "motion/react";

export default function LogoCarousel() {
  // Collection of minimalist monocromáticos logo SVGs and brand names
  const logos = [
    { name: "Apex Group", symbol: "▲" },
    { name: "Nexus Finanças", symbol: "◆" },
    { name: "Verde Capital", symbol: "●" },
    { name: "Prime Partner", symbol: "■" },
    { name: "Alliance Co.", symbol: "❖" },
    { name: "Stellar", symbol: "★" },
    { name: "Zenith", symbol: "✦" },
    { name: "Vortex Asset", symbol: "▼" },
    { name: "Canela Pet", symbol: "✿" },
    { name: "Ondas Buenas", symbol: "≋" }
  ];

  // Repeat the logos array twice to ensure seamless infinite looping marquee
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 bg-neutral-50/50 border-t border-b border-black/[0.03] overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-6">
        <p className="text-center font-sans text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-400 uppercase">
          Empresas e executivos de alta performance confiam em nosso olhar
        </p>
      </div>

      <div className="relative w-full flex items-center">
        {/* Soft fading overlays at the edges for an ultra-clean premium transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-neutral-50/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-neutral-50/80 to-transparent z-10 pointer-events-none"></div>

        <div className="w-full overflow-hidden py-4">
          <div className="animate-marquee flex gap-12 sm:gap-20">
            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center space-x-2.5 opacity-30 hover:opacity-75 transition-opacity duration-300 pointer-events-none"
              >
                <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-black">
                  {logo.symbol}
                </span>
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-black uppercase">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
