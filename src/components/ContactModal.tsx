import { useState, FormEvent } from "react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useContent } from "../context/ContentContext";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { content } = useContent();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "Pessoa Física",
    mensagem: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const baseText = `Oi! Meu nome é ${formData.nome}. Vim pelo site e me interessei em saber mais sobre a consultoria financeira para ${formData.tipo}.`;
    const msgText = formData.mensagem ? ` Mensagem: ${formData.mensagem}` : "";
    const telText = formData.telefone ? ` Meu telefone/WhatsApp é: ${formData.telefone}.` : "";
    
    const text = `${baseText}${msgText}${telText}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=${content.whatsappPhone}&text=${encodedText}&type=phone_number&app_absent=0`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 800);
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      tipo: "Pessoa Física",
      mensagem: ""
    });
    setIsSuccess(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              onClose();
              setTimeout(resetForm, 300);
            }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          ></motion.div>

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 350 }}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl border border-black/[0.05] rounded-3xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={() => {
                onClose();
                setTimeout(resetForm, 300);
              }}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-neutral-500 hover:text-black" />
            </button>

            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="font-sans text-[10px] sm:text-xs font-semibold tracking-widest text-neutral-400 uppercase">
                    Agende sua sessão
                  </span>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-neutral-950 mt-1">
                    Vamos desenhar sua estratégia?
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-neutral-500 font-medium mt-1.5">
                    Preencha os campos abaixo e entrarei em contato em até 24 horas para alinhar nossos próximos passos.
                  </p>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                  {/* Name */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-sans text-xs font-semibold text-neutral-700" htmlFor="nome">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      id="nome"
                      required
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      placeholder="Ex: Amanda Silva"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-neutral-50/50 font-sans text-sm focus:border-black focus:bg-white focus:outline-none transition-all duration-300"
                    />
                  </div>

                  {/* Contact Info (Two Columns) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1">
                      <label className="font-sans text-xs font-semibold text-neutral-700" htmlFor="email">
                        E-mail de contato
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="amanda@exemplo.com"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-neutral-50/50 font-sans text-sm focus:border-black focus:bg-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="font-sans text-xs font-semibold text-neutral-700" htmlFor="telefone">
                        Telefone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        placeholder="(11) 99999-9999"
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-neutral-50/50 font-sans text-sm focus:border-black focus:bg-white focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Service Type tabs */}
                  <div className="flex flex-col space-y-1.5">
                    <span className="font-sans text-xs font-semibold text-neutral-700">
                      Foco da Consultoria
                    </span>
                    <div className="grid grid-cols-3 gap-2 bg-neutral-100 p-1 rounded-xl">
                      {["Pessoa Física", "Pequeno Negócio", "Ambos"].map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setFormData({ ...formData, tipo: opt })}
                          className={`py-2 rounded-lg font-sans text-xs font-semibold transition-all cursor-pointer ${
                            formData.tipo === opt
                              ? "bg-white text-black shadow-xs"
                              : "text-neutral-500 hover:text-black"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col space-y-1">
                    <label className="font-sans text-xs font-semibold text-neutral-700" htmlFor="mensagem">
                      Mensagem / Contexto (Opcional)
                    </label>
                    <textarea
                      id="mensagem"
                      rows={3}
                      value={formData.mensagem}
                      onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                      placeholder="Conte-me um pouco sobre seus objetivos e necessidades atuais..."
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.06] bg-neutral-50/50 font-sans text-sm focus:border-black focus:bg-white focus:outline-none transition-all duration-300 resize-none"
                    />
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full cursor-pointer group flex items-center justify-center space-x-2 font-sans text-sm font-semibold text-white bg-[#6fbc83] hover:bg-[#2e3925] disabled:bg-neutral-300 py-3.5 rounded-xl transition-all duration-300"
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Processando...</span>
                    </span>
                  ) : (
                    <>
                      <span>Enviar Mensagem</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* Success screen resembling Apple receipts */
              <div className="flex flex-col items-center justify-center text-center py-8 space-y-5 animate-fade-in">
                <CheckCircle2 className="w-16 h-16 text-[#6fbc83]" />
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-neutral-950">
                    Sessão Solicitada!
                  </h3>
                  <p className="font-sans text-sm text-neutral-500 font-medium max-w-sm leading-relaxed">
                    Olá <strong>{formData.nome}</strong>, estamos abrindo o WhatsApp para enviar os detalhes da sua consultoria para <strong>{formData.tipo}</strong>.
                  </p>
                  <p className="font-sans text-xs text-neutral-400 font-medium max-w-sm pt-2">
                    Se a página do WhatsApp não abrir automaticamente, clique no botão abaixo para iniciar a conversa:
                  </p>
                </div>
                
                <a
                  href={`https://api.whatsapp.com/send/?phone=${content.whatsappPhone}&text=${encodeURIComponent(`Oi! Meu nome é ${formData.nome}. Vim pelo site e me interessei em saber mais sobre a consultoria financeira para ${formData.tipo}.${formData.mensagem ? ` Mensagem: ${formData.mensagem}` : ""}`)}&type=phone_number&app_absent=0`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 font-sans text-sm font-semibold text-white bg-[#6fbc83] hover:bg-[#2e3925] px-6 py-3 rounded-xl transition-all duration-300 shadow-md"
                >
                  <span>Iniciar Conversa no WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    onClose();
                    setTimeout(resetForm, 300);
                  }}
                  className="mt-4 px-6 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-black font-sans text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Fechar janela
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
