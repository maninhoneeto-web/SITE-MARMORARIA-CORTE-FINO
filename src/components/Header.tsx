import { useState } from "react";
import { Phone, MapPin, Menu, X, MessageSquare, Award, Sparkles } from "lucide-react";
import CorteFinoLogo from "./CorteFinoLogo";

interface HeaderProps {
  onScrollTo: (elementId: string) => void;
  onOpenChat: () => void;
}

export default function Header({ onScrollTo, onOpenChat }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Início", id: "hero" },
    { label: "Pedras", id: "catalogo" },
    { label: "Simulador", id: "simulador" },
    { label: "Calculadora de Projetos", id: "calculadora" },
    { label: "O Acabamento", id: "acabamento" },
  ];

  const handleNavClick = (id: string) => {
    onScrollTo(id);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/90 backdrop-blur-md">
      {/* Upper Info Bar */}
      <div className="hidden border-b border-gray-900 bg-gray-950 py-2 sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 text-xs font-medium text-gray-400">
          <div className="flex items-center space-x-6">
            <a 
              href="https://wa.me/5561984138373?text=Olá!+Gostaria+de+realizar+um+orçamento+tecnico+com+a+Corte+Fino."
              target="_blank"
              rel="noopener referrer"
              className="flex items-center space-x-1.5 hover:text-gold-400 transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-gold-400" />
              <span>(61) 98413-8373</span>
            </a>
            <span className="flex items-center space-x-1.5 hover:text-gold-400 transition-colors">
              <MapPin className="h-3.5 w-3.5 text-gold-400" />
              <span>Vila Telebrasília - Distrito Federal</span>
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-gold-400">
              <Award className="h-3 w-3" />
              <span className="text-[10px] tracking-wider uppercase">Fino Acabamento em Mármores</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 px-4 lg:px-8">
        {/* Elegant Logo resembling the user uploaded logo */}
        <div 
          onClick={() => handleNavClick("hero")} 
          className="flex cursor-pointer items-center space-x-3 group"
        >
          {/* Circular logo badge mimicking the marble texture */}
          <CorteFinoLogo size="sm" className="group-hover:scale-105 transition-transform" />
          <div>
            <h1 className="font-display text-lg font-bold tracking-tight text-white md:text-xl leading-none">
              Corte <span className="text-gold-400">Fino</span>
            </h1>
            <p className="hidden text-[9px] font-semibold tracking-widest text-gold-300/80 uppercase sm:block mt-1">
              Fino Acabamento em Mármores
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-sm font-medium text-gray-300 transition-all hover:text-gold-400"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={onOpenChat}
            className="flex items-center space-x-2 rounded-full bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-400 border border-gold-500/30 hover:bg-gold-500/20 hover:text-gold-300 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Consultor IA</span>
          </button>
        </nav>

        {/* Action Button */}
        <div className="hidden items-center space-x-4 md:flex">
          <button
            onClick={() => handleNavClick("calculadora")}
            className="rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-5 py-2 text-xs font-semibold text-gray-950 hover:from-gold-500 hover:to-gold-400 transition-all shadow-md shadow-gold-950/10"
          >
            Solicitar Orçamento
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-950 hover:text-white focus:outline-none"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-gray-900 bg-gray-950 md:hidden px-4 py-3 space-y-3">
          <div className="space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-gray-900 hover:text-gold-400 transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="border-t border-gray-900 pt-3 flex flex-col space-y-2">
            <button
              onClick={() => {
                onOpenChat();
                setIsOpen(false);
              }}
              className="flex items-center justify-center space-x-2 rounded-full bg-gold-500/10 py-2.5 text-xs font-semibold text-gold-400 border border-gold-500/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>Falar com Consultor IA</span>
            </button>
            <button
              onClick={() => handleNavClick("calculadora")}
              className="w-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 py-2.5 text-center text-xs font-semibold text-gray-950"
            >
              Orçamento Automático
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
