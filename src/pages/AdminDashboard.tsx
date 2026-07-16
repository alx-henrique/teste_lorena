import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContent } from "../context/ContentContext";
import { WebsiteContent } from "../content-default";
import { 
  Lock, Eye, EyeOff, Save, LogOut, ArrowLeft, Radio, 
  Image as ImageIcon, User, Phone, Instagram, Sparkles, CheckCircle2, AlertCircle, Loader2, MessageSquare, Hash, Plus, Trash2, Key
} from "lucide-react";

export default function AdminDashboard() {
  const { content, updateContent } = useContent();
  const navigate = useNavigate();
  
  // Auth state
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Form state
  const [formData, setFormData] = useState<WebsiteContent>({ ...content });
  const [activeTab, setActiveTab] = useState<"podcast" | "hero" | "about" | "learnMore" | "counters" | "testimonials" | "bastidor" | "contact" | "settings">("podcast");
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isSaving, setIsSaving] = useState(false);

  // Password change state
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passSaveStatus, setPassSaveStatus] = useState<{ type: "success" | "error" | null; message: string }>({ type: null, message: "" });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Sync form data once content is fetched
  useEffect(() => {
    setFormData({ ...content });
  }, [content]);

  // Handle password submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
      } else {
        setLoginError(data.error || "Senha incorreta");
      }
    } catch (err) {
      setLoginError("Erro de conexão com o servidor.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Handle change password
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!oldPassword || !newPassword) {
      setPassSaveStatus({ type: "error", message: "Preencha a senha antiga e a nova." });
      return;
    }
    if (newPassword.length < 8) {
      setPassSaveStatus({ type: "error", message: "A nova senha deve ter pelo menos 8 caracteres." });
      return;
    }

    setIsChangingPassword(true);
    setPassSaveStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setPassSaveStatus({ type: "success", message: "Senha alterada com sucesso! Você continuará logado." });
        setOldPassword("");
        setNewPassword("");
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        // Reset status after 4 seconds
        setTimeout(() => setPassSaveStatus({ type: null, message: "" }), 4000);
      } else {
        setPassSaveStatus({ type: "error", message: data.error || "Erro ao alterar a senha." });
      }
    } catch (err) {
      setPassSaveStatus({ type: "error", message: "Erro de conexão com o servidor." });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Log out
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setPassword("");
  };

  // Helper to parse standard Spotify episode links to Embed format
  const handleSpotifyLinkInput = (inputUrl: string) => {
    let embedUrl = inputUrl.trim();
    
    // Check if user pasted a standard share URL: https://open.spotify.com/episode/3jddbMaYVhjt8SrzbNlhS?si=...
    if (embedUrl.includes("open.spotify.com/episode/")) {
      const parts = embedUrl.split("open.spotify.com/episode/");
      if (parts[1]) {
        const episodeId = parts[1].split("?")[0];
        embedUrl = `https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator`;
      }
    }
    
    setFormData(prev => ({ ...prev, fofocaEpisodeUrl: embedUrl }));
  };

  // Handle saving form data
  const handleSave = async () => {
    if (!token) return;
    setIsSaving(true);
    setSaveStatus({ type: null, message: "" });

    const result = await updateContent(formData, token);
    
    if (result.success) {
      setSaveStatus({ type: "success", message: "Configurações salvas com sucesso!" });
      // Reset status after 4 seconds
      setTimeout(() => setSaveStatus({ type: null, message: "" }), 4000);
    } else {
      setSaveStatus({ type: "error", message: result.error || "Ocorreu um erro ao salvar as alterações." });
    }
    setIsSaving(false);
  };

  // If not logged in, show elegant login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#F0EEEE] flex items-center justify-center p-6 font-sans">
        <div className="bg-white rounded-[2rem] p-8 md:p-10 w-full max-w-md border border-black/[0.04] shadow-xl space-y-8 relative overflow-hidden">
          {/* Decorative background blob */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#6fbc83]/5 rounded-full blur-2xl pointer-events-none"></div>

          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[#6fbc83]/10 flex items-center justify-center mx-auto text-[#6fbc83]">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-display font-extrabold text-2xl text-neutral-900 tracking-tight">
              Painel de Controle
            </h1>
            <p className="text-sm text-neutral-500 font-medium">
              Acesso exclusivo para atualização do site da Lore
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                Senha Administrativa
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insira sua senha..."
                  required
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-2xl px-5 py-3.5 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] focus:border-transparent font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 focus:outline-none p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="bg-red-50 text-red-600 rounded-xl p-3.5 flex items-center space-x-2 border border-red-100 text-xs font-semibold animate-shake">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-[#6fbc83] hover:bg-[#5aa36e] disabled:bg-neutral-300 text-white font-bold py-4 rounded-2xl transition-all shadow-md flex items-center justify-center space-x-2 text-sm cursor-pointer"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Autenticando...</span>
                </>
              ) : (
                <span>Entrar no Painel</span>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center space-x-1.5 text-xs text-neutral-500 hover:text-[#6fbc83] font-bold uppercase tracking-wide transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao Site</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0EEEE] font-sans pb-16">
      {/* Dynamic Saving Bar */}
      <div className="bg-white border-b border-black/[0.04] sticky top-0 z-40 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#6fbc83] text-white flex items-center justify-center">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-lg text-neutral-900 tracking-tight leading-none">
                Painel Administrativo
              </h1>
              <p className="text-xs text-[#6fbc83] font-bold mt-1 tracking-wide uppercase">
                Edição de Conteúdo em Tempo Real
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center space-x-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 px-4.5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Visualizar Site</span>
            </button>

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 bg-[#6fbc83] hover:bg-[#5aa36e] disabled:bg-neutral-300 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wide transition-all cursor-pointer shadow-sm"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Salvar Alterações</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2.5 text-neutral-400 hover:text-red-500 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
              title="Sair do Painel"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Sidebar navigation */}
        <div className="lg:col-span-3 bg-white rounded-[2rem] border border-black/[0.04] shadow-sm p-4 space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-3 py-2">
            Configurações
          </p>
          
          <button
            onClick={() => { setActiveTab("podcast"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "podcast"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Radio className="w-4.5 h-4.5 shrink-0" />
            <span>Podcast Fofoca</span>
          </button>

          <button
            onClick={() => { setActiveTab("hero"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "hero"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <ImageIcon className="w-4.5 h-4.5 shrink-0" />
            <span>Capa / Hero</span>
          </button>

          <button
            onClick={() => { setActiveTab("about"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "about"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <User className="w-4.5 h-4.5 shrink-0" />
            <span>Quem é a Lore</span>
          </button>

          <button
            onClick={() => { setActiveTab("learnMore"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "learnMore"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <User className="w-4.5 h-4.5 shrink-0" />
            <span>Mais sobre mim</span>
          </button>

          <button
            onClick={() => { setActiveTab("counters"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "counters"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Hash className="w-4.5 h-4.5 shrink-0" />
            <span>Números & Atendimentos</span>
          </button>

          <button
            onClick={() => { setActiveTab("testimonials"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "testimonials"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5 shrink-0" />
            <span>Depoimentos</span>
          </button>

          <button
            onClick={() => { setActiveTab("bastidor"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "bastidor"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Sparkles className="w-4.5 h-4.5 shrink-0" />
            <span>Bastidores</span>
          </button>

          <button
            onClick={() => { setActiveTab("contact"); setSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "contact"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Phone className="w-4.5 h-4.5 shrink-0" />
            <span>Contato & Redes</span>
          </button>

          <button
            onClick={() => { setActiveTab("settings"); setSaveStatus({ type: null, message: "" }); setPassSaveStatus({ type: null, message: "" }); }}
            className={`w-full flex items-center space-x-3 px-4.5 py-3.5 rounded-2xl text-sm font-bold tracking-tight transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#6fbc83]/10 text-[#6fbc83]"
                : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
            }`}
          >
            <Key className="w-4.5 h-4.5 shrink-0" />
            <span>Segurança</span>
          </button>
        </div>

        {/* Right Side: Tab content */}
        <div className="lg:col-span-9 bg-white rounded-[2rem] border border-black/[0.04] shadow-sm p-6 md:p-10 space-y-8">
          
          {/* Saved Status Notification Banner */}
          {saveStatus.type && (
            <div className={`p-4 rounded-2xl flex items-center space-x-3 border text-sm font-semibold animate-fade-in ${
              saveStatus.type === "success" 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-red-50 border-red-200 text-red-700"
            }`}>
              {saveStatus.type === "success" ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <AlertCircle className="w-5 h-5 shrink-0" />}
              <span>{saveStatus.message}</span>
            </div>
          )}

          {/* TAB 1: Podcast (Fofoca de Bolso) */}
          {activeTab === "podcast" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Podcast "Fofoca de Bolso"
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Altere a música/episódio em destaque no podcast de forma simples e intuitiva.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Link do Episódio (Spotify)
                  </label>
                  <p className="text-xs text-neutral-400 font-medium">
                    Você pode copiar o link de compartilhamento comum do Spotify (ex: <code className="bg-neutral-100 px-1 py-0.5 rounded text-[#6fbc83]">https://open.spotify.com/episode/...</code>) e colar diretamente abaixo. O sistema o converterá automaticamente para o formato de tocador!
                  </p>
                  <input
                    type="text"
                    value={formData.fofocaEpisodeUrl}
                    onChange={(e) => handleSpotifyLinkInput(e.target.value)}
                    placeholder="Cole o link do episódio no Spotify..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Texto Descritivo / Chamada do Episódio
                  </label>
                  <textarea
                    rows={4}
                    value={formData.fofocaDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, fofocaDescription: e.target.value }))}
                    placeholder="Descreva o que é abordado neste episódio mais recente..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                  />
                </div>

                {/* Previsão do player */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Pré-visualização do Widget de Áudio
                  </span>
                  <div className="rounded-xl overflow-hidden border border-neutral-200 max-w-md bg-neutral-50 p-2">
                    {formData.fofocaEpisodeUrl ? (
                      <iframe 
                        src={formData.fofocaEpisodeUrl} 
                        width="100%" 
                        height="152" 
                        frameBorder="0" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy"
                        className="w-full h-[152px] border-0 rounded-lg"
                      ></iframe>
                    ) : (
                      <div className="h-[152px] flex items-center justify-center text-xs text-neutral-400 font-medium font-mono">
                        Nenhum link ativo configurado.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Capa / Hero */}
          {activeTab === "hero" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Capa Principal (Hero)
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Ajuste a imagem de fundo de abertura e os slogans do topo.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    URL da Imagem de Fundo (Lorena)
                  </label>
                  <input
                    type="text"
                    value={formData.heroImageSrc}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroImageSrc: e.target.value }))}
                    placeholder="Insira a URL da imagem (Unsplash, Cloudinary, etc.)"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Recomendamos usar imagens em alta resolução verticais ou com foco no lado direito.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Texto de Subtítulo do Hero
                  </label>
                  <textarea
                    rows={4}
                    value={formData.heroSubtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                    placeholder="Slogan explicativo de apresentação..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Texto do Botão (Call to Action)
                  </label>
                  <input
                    type="text"
                    value={formData.heroCtaText || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroCtaText: e.target.value }))}
                    placeholder="Ex: Quero marcar uma conversa"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Link do Botão
                  </label>
                  <input
                    type="text"
                    value={formData.heroCtaLink || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, heroCtaLink: e.target.value }))}
                    placeholder="URL para redirecionar quando clicado"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Se deixado em branco, ele utilizará o link de WhatsApp padrão gerado automaticamente com os dados do painel "Contato".
                  </p>
                </div>

                {/* Previsão da imagem */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Pré-visualização da Foto
                  </span>
                  <div className="relative aspect-[16/9] max-w-md rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                    {formData.heroImageSrc ? (
                      <img 
                        src={formData.heroImageSrc} 
                        alt="Previsão Hero" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://res.cloudinary.com/drrbezrpk/image/upload/v1782950670/Captura_de_tela_2026-07-01_210511_klbdxp.png";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 font-mono">
                        Nenhuma imagem inserida.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: About Me */}
          {activeTab === "about" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Quem é a Lore (Sobre)
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Atualize suas credenciais, certificações, cargos e descrição pessoal da seção "Sobre Mim" da página inicial.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Cargos / Certificações (Ex: CFP® & CVM)
                  </label>
                  <input
                    type="text"
                    value={formData.aboutMeRole}
                    onChange={(e) => setFormData(prev => ({ ...prev, aboutMeRole: e.target.value }))}
                    placeholder="Ex: CFP® & Consultora CVM Certificada..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Parágrafo Sobre 1
                  </label>
                  <textarea
                    rows={4}
                    value={formData.aboutMeBodyText1}
                    onChange={(e) => setFormData(prev => ({ ...prev, aboutMeBodyText1: e.target.value }))}
                    placeholder="Descrição do dia a dia e da consultoria..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Parágrafo Sobre 2
                  </label>
                  <textarea
                    rows={4}
                    value={formData.aboutMeBodyText2}
                    onChange={(e) => setFormData(prev => ({ ...prev, aboutMeBodyText2: e.target.value }))}
                    placeholder="Filosofia de trabalho..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Learn More (Mais sobre mim) */}
          {activeTab === "learnMore" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Mais Sobre Mim
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Edite o texto detalhado e a foto da página dedicada "Mais Sobre Mim" (/mais-sobre).
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    URL da Foto Lateral
                  </label>
                  <input
                    type="text"
                    value={formData.learnMoreImageSrc || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, learnMoreImageSrc: e.target.value }))}
                    placeholder="Cole a URL da imagem aqui..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Texto Detalhado (Parágrafos)
                  </label>
                  <textarea
                    rows={12}
                    value={formData.learnMoreText || ""}
                    onChange={(e) => setFormData(prev => ({ ...prev, learnMoreText: e.target.value }))}
                    placeholder="Escreva sua história aqui. Separe os parágrafos pulando duas linhas. Use **texto** para negrito..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                  />
                  <p className="text-[11px] text-neutral-400">
                    Dica: Separe os parágrafos com uma linha em branco. Para colocar palavras em negrito com a cor de destaque (verde), envolva a palavra com dois asteriscos. Exemplo: **Minha certificação CVM**
                  </p>
                </div>

                {/* Previsão da imagem */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Pré-visualização da Foto
                  </span>
                  <div className="relative aspect-[4/5] max-w-[250px] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                    {formData.learnMoreImageSrc ? (
                      <img 
                        src={formData.learnMoreImageSrc} 
                        alt="Previsão Sobre" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 font-mono text-center px-4">
                        Nenhuma imagem inserida.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Counters */}
          {activeTab === "counters" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Números & Atendimentos
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Atualize os números apresentados na seção estatística.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-5 p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <h4 className="font-bold text-sm text-neutral-700">Contador 1</h4>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Número/Valor</label>
                    <input
                      type="text"
                      value={formData.stat1Value || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, stat1Value: e.target.value }))}
                      placeholder="Ex: +210"
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Texto Descritivo</label>
                    <input
                      type="text"
                      value={formData.stat1Text || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, stat1Text: e.target.value }))}
                      placeholder="Ex: Pessoas físicas..."
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-5 p-5 bg-neutral-50 rounded-2xl border border-neutral-200">
                  <h4 className="font-bold text-sm text-neutral-700">Contador 2</h4>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Número/Valor</label>
                    <input
                      type="text"
                      value={formData.stat2Value || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, stat2Value: e.target.value }))}
                      placeholder="Ex: +170"
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Texto Descritivo</label>
                    <input
                      type="text"
                      value={formData.stat2Text || ""}
                      onChange={(e) => setFormData(prev => ({ ...prev, stat2Text: e.target.value }))}
                      placeholder="Ex: Pequenos negócios"
                      className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: Testimonials */}
          {activeTab === "testimonials" && (
            <div className="space-y-6">
              <div className="space-y-1 flex justify-between items-center">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-neutral-900">
                    Depoimentos
                  </h3>
                  <p className="text-xs text-neutral-400 font-medium">
                    Adicione, edite ou remova comentários de clientes.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newId = Date.now().toString();
                    setFormData(prev => ({
                      ...prev,
                      testimonials: [
                        { id: newId, name: "Novo Cliente", role: "", avatar: "", feedback: "" },
                        ...(prev.testimonials || [])
                      ]
                    }));
                  }}
                  className="flex items-center space-x-1.5 bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Adicionar</span>
                </button>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-6">
                {(formData.testimonials || []).map((t, index) => (
                  <div key={t.id} className="p-5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                          {t.avatar ? (
                            <img src={t.avatar} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 m-auto mt-2.5 text-neutral-400" />
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-neutral-700">Depoimento {index + 1}</h4>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm("Tem certeza que deseja remover este depoimento?")) {
                            setFormData(prev => ({
                              ...prev,
                              testimonials: prev.testimonials.filter(item => item.id !== t.id)
                            }));
                          }
                        }}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Nome</label>
                        <input
                          type="text"
                          value={t.name}
                          onChange={(e) => {
                            const newTestimonials = [...formData.testimonials];
                            newTestimonials[index].name = e.target.value;
                            setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
                          }}
                          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Cargo/Empresa (Opcional)</label>
                        <input
                          type="text"
                          value={t.role}
                          onChange={(e) => {
                            const newTestimonials = [...formData.testimonials];
                            newTestimonials[index].role = e.target.value;
                            setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
                          }}
                          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">URL da Foto</label>
                        <input
                          type="text"
                          value={t.avatar}
                          onChange={(e) => {
                            const newTestimonials = [...formData.testimonials];
                            newTestimonials[index].avatar = e.target.value;
                            setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
                          }}
                          placeholder="https://..."
                          className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">Texto do Depoimento</label>
                      <textarea
                        rows={4}
                        value={t.feedback}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials];
                          newTestimonials[index].feedback = e.target.value;
                          setFormData(prev => ({ ...prev, testimonials: newTestimonials }));
                        }}
                        className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
                
                {(!formData.testimonials || formData.testimonials.length === 0) && (
                  <div className="text-center py-10 bg-neutral-50 rounded-2xl border border-neutral-200 border-dashed">
                    <p className="text-sm text-neutral-500 font-medium">Nenhum depoimento cadastrado.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: Behind the Scenes (Bastidores) */}
          {activeTab === "bastidor" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Fotos dos Bastidores (Encontros)
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Altere as duas fotos de encontros reais em destaque na seção de Bastidores.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Foto 1 */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                      Imagem de Bastidor 1 (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.bastidorImage1}
                      onChange={(e) => setFormData(prev => ({ ...prev, bastidorImage1: e.target.value }))}
                      placeholder="URL da primeira imagem..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                    />
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
                      {formData.bastidorImage1 ? (
                        <img src={formData.bastidorImage1} alt="Bastidor 1" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">Sem Imagem</div>
                      )}
                    </div>
                  </div>

                  {/* Foto 2 */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                      Imagem de Bastidor 2 (URL)
                    </label>
                    <input
                      type="text"
                      value={formData.bastidorImage2}
                      onChange={(e) => setFormData(prev => ({ ...prev, bastidorImage2: e.target.value }))}
                      placeholder="URL da segunda imagem..."
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                    />
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-50">
                      {formData.bastidorImage2 ? (
                        <img src={formData.bastidorImage2} alt="Bastidor 2" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400">Sem Imagem</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Contact Info */}
          {activeTab === "contact" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Contato & Redes Sociais
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Gerencie as informações de redirecionamento de WhatsApp e perfis sociais.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Número de WhatsApp (Somente Números, com DDI e DDD)
                  </label>
                  <p className="text-[11px] text-neutral-400">
                    Insira no formato padrão com DDI 55 (ex: <code className="bg-neutral-100 px-1 py-0.5 rounded text-[#6fbc83]">5562999945420</code>).
                  </p>
                  <input
                    type="text"
                    value={formData.whatsappPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappPhone: e.target.value.replace(/\D/g, "") }))}
                    placeholder="Ex: 5562999945420"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Mensagem Padrão do WhatsApp
                  </label>
                  <textarea
                    rows={3}
                    value={formData.whatsappText}
                    onChange={(e) => setFormData(prev => ({ ...prev, whatsappText: e.target.value }))}
                    placeholder="Mensagem pré-preenchida que o usuário enviará no WhatsApp..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm leading-relaxed"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Link do Perfil do Instagram
                  </label>
                  <input
                    type="text"
                    value={formData.instagramUrl}
                    onChange={(e) => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))}
                    placeholder="Link do Instagram (ex: https://www.instagram.com/lopiresc)"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: Settings */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-xl text-neutral-900">
                  Segurança e Senha
                </h3>
                <p className="text-xs text-neutral-400 font-medium">
                  Altere a senha de acesso a este painel administrativo.
                </p>
              </div>

              <div className="h-[1px] bg-neutral-100"></div>

              <form onSubmit={handleChangePassword} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Senha Atual
                  </label>
                  <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Sua senha atual..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                    Nova Senha
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Sua nova senha..."
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#6fbc83] font-medium transition-all text-sm"
                  />
                  <p className="text-[11px] text-neutral-400">
                    A senha deve ter pelo menos 8 caracteres para maior segurança.
                  </p>
                </div>

                {passSaveStatus.message && (
                  <div className={`p-4 rounded-xl text-sm font-medium flex items-center space-x-2 ${
                    passSaveStatus.type === "error" ? "bg-red-50 text-red-600" : "bg-[#6fbc83]/10 text-[#6fbc83]"
                  }`}>
                    {passSaveStatus.type === "error" ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
                    <span>{passSaveStatus.message}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isChangingPassword || !oldPassword || !newPassword}
                    className="flex items-center space-x-2 bg-neutral-800 hover:bg-neutral-900 disabled:bg-neutral-300 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wide transition-all cursor-pointer shadow-md"
                  >
                    {isChangingPassword ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Lock className="w-4.5 h-4.5" />}
                    <span>Atualizar Senha</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Action button in form footer */}
          <div className="h-[1px] bg-neutral-100 pt-2"></div>
          
          {activeTab !== "settings" && (
            <div className="flex justify-end space-x-3 pt-2">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center space-x-2 bg-[#6fbc83] hover:bg-[#5aa36e] disabled:bg-neutral-300 text-white font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wide transition-all cursor-pointer shadow-md"
              >
                {isSaving ? <Loader2 className="w-4.5 h-4.5 animate-spin" /> : <Save className="w-4.5 h-4.5" />}
                <span>Salvar Alterações de {activeTab.toUpperCase()}</span>
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
