import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore."
  },
  {
    id: 2,
    question: "Duis aute irure dolor in reprehenderit in voluptate?",
    answer: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud."
  },
  {
    id: 3,
    question: "Excepteur sint occaecat cupidatat non proident?",
    answer: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 md:py-32 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs font-semibold tracking-widest text-neutral-400 uppercase">
            Lorem Ipsum Dolor
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#6fbc83] mt-3">
            Lorem Ipsum FAQ
          </h2>
          <p className="font-sans text-sm sm:text-base text-neutral-500 mt-4 leading-relaxed font-medium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
          </p>
        </motion.div>

        {/* Apple Purist Accordion Container */}
        <div className="space-y-4" id="faq-accordion-container">
          {faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                className="bg-white border border-black/[0.04] rounded-2xl overflow-hidden ios-widget-shadow transition-all duration-300"
                id={`faq-item-${faq.id}`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-sm sm:text-base text-[#6fbc83] group-hover:text-[#2e3925] transition-colors">
                    {faq.question}
                  </span>
                  <span className="ml-4 p-1.5 rounded-full bg-neutral-50 group-hover:bg-neutral-100 transition-colors flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-black transition-transform" />
                    ) : (
                      <Plus className="w-4 h-4 text-black transition-transform" />
                    )}
                  </span>
                </button>

                {/* Smooth transition using motion/react */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-500 font-medium leading-relaxed border-t border-black/[0.01]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
