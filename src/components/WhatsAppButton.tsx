import React from "react";
import { MessageSquare, Phone } from "lucide-react";

export default function WhatsAppButton() {
  const phone = "5561984138373";
  const message = encodeURIComponent("Olá! Gostaria de falar com o atendimento da Marmoraria Corte Fino para solicitar um orçamento.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-40 group flex items-center"
      aria-label="Falar conosco no WhatsApp"
    >
      {/* Pulse Rings */}
      <span className="absolute inline-flex h-14 w-14 animate-ping rounded-full bg-emerald-500/30 opacity-75 duration-1000" />
      <span className="absolute inline-flex h-16 w-16 animate-pulse rounded-full bg-gold-400/10 opacity-60 duration-1500" />

      {/* Button Body */}
      <div className="relative h-14 w-14 rounded-full bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border border-emerald-400 group-hover:rotate-6">
        {/* Subtle inner marble texture mimic in overlay with noise */}
        <div className="absolute inset-1 rounded-full border border-white/10 opacity-30 mix-blend-overlay" />
        
        {/* WhatsApp Icon */}
        <svg 
          className="h-7 w-7 fill-current stroke-none text-white transition-all duration-300"
          viewBox="0 0 24 24"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.51 1.45 5.36 1.45 5.62 0 10.19-4.57 10.19-10.2 0-2.72-1.06-5.28-2.99-7.21a10.12 10.12 0 0 0-7.2-2.99C6.32 1.2 1.75 5.77 1.75 11.4c0 1.93.5 3.8 1.47 5.46L2.24 21.6l4.41-1.15zM16.5 13.5c-.24-.12-1.43-.7-1.65-.79-.22-.08-.38-.13-.54.12-.17.25-.64.79-.79.95-.15.17-.3.18-.54.06-1.55-.77-2.5-1.58-3.41-3.15-.24-.41.24-.38.69-1.28.08-.17.04-.31-.02-.43-.06-.12-.54-1.3-.74-1.78-.2-.48-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.85.83-.85 2s.87 2.3 1 2.47c.13.17 1.7 2.6 4.12 3.65.58.25 1.03.4 1.39.51.58.18 1.11.16 1.53.1.47-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.23-.16-.47-.28z" />
        </svg>

        {/* Dynamic Badge Pulse Accent */}
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-gold-400 border border-emerald-600 animate-ping" />
        <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-gold-500 border border-emerald-600" />
      </div>

      {/* Label Tooltip */}
      <div className="absolute left-full ml-3 bg-gray-950/95 backdrop-blur-md text-gold-400 text-[10px] font-bold tracking-widest uppercase border border-gold-500/30 rounded-lg px-3 py-1.5 pointer-events-none opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all shadow-xl block whitespace-nowrap">
        <div className="flex items-center space-x-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Falar com Atendimento (61) 98413-8373</span>
        </div>
      </div>
    </a>
  );
}
