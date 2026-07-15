import { motion } from "motion/react";

export default function LogoCarousel() {
  // Collection of actual client logo images, keeping all monochrome (grayscale)
  const logos = [
    { name: "Claraboia", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132989/claraboia_ttsdxv.png" },
    { name: "Marcelo Eco", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132990/marcelo-eco_rbwcdg.png" },
    { name: "Jardim Secreto", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132990/jardim-secreto_z3ncvs.png" },
    { name: "FoodSeg", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132990/foodseg_evjswm.png" },
    { name: "Dodd Lab", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132990/dodd_lab_psgsfx.png" },
    { name: "Ondas Buenas", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132990/ondas-buenas_bjwamv.png" },
    { name: "Estúdio Maré", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132990/estudio-mare_vzrmge.png" },
    { name: "Adeyc Borges", url: "https://res.cloudinary.com/drrbezrpk/image/upload/v1784132989/adeyc_borges_gs7jta.png" }
  ];

  // Repeat the logos array three times to ensure seamless infinite looping marquee
  const marqueeLogos = [...logos, ...logos, ...logos];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="py-12 bg-transparent overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col items-center">
        <h3 className="text-center font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#6fbc83]">
          Alguns dos clientes que já passaram por aqui
        </h3>
      </div>

      <div className="relative w-full flex items-center py-4 bg-transparent">
        {/* Soft fading overlays at the edges for an ultra-clean premium transition */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-[#fafafa] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-[#fafafa] to-transparent z-10 pointer-events-none"></div>

        <div className="w-full overflow-hidden">
          <div className="animate-marquee flex gap-16 sm:gap-24 items-center">
            {marqueeLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex items-center justify-center shrink-0"
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-11 sm:h-14 w-auto max-w-[130px] sm:max-w-[160px] object-contain grayscale opacity-45 hover:opacity-100 hover:grayscale-0 transition-all duration-300 filter"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
