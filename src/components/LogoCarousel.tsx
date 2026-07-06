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
      className="py-8 bg-transparent overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-10 flex flex-col items-center">
        <h3 className="text-center font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#6fbc83]">
          Alguns dos clientes que já passaram por aqui
        </h3>
      </div>

      <div className="relative w-full flex items-center">
        {/* Soft fading overlays at the edges for an ultra-clean premium transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#d9d9d9] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#d9d9d9] to-transparent z-10 pointer-events-none"></div>

        <div className="w-full overflow-hidden py-4">
          <div className="animate-marquee flex gap-12 sm:gap-20">
            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center space-x-2.5 opacity-30 hover:opacity-75 transition-opacity duration-300 pointer-events-none"
              >
                <span className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-black">
                  {logo.symbol}
                </span>
                <span className="font-sans text-base sm:text-lg font-semibold tracking-wider text-black uppercase">
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
