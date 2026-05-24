import { Phone, MapPin, Mail, Clock, Award, ShieldCheck, Sparkles } from "lucide-react";
import CorteFinoLogo from "./CorteFinoLogo";

interface FooterProps {
  onScrollTo: (elementId: string) => void;
}

export default function Footer({ onScrollTo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-white border-t border-gray-900 pt-16 pb-8 relative overflow-hidden select-none">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gold-500/5 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Bio with Custom Marble Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <CorteFinoLogo size="sm" className="shadow-lg shadow-gold-500/5" />
              <h4 className="font-display font-bold text-lg text-white">Corte Fino</h4>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2">
              Líder em acabamentos milimétricos em mármores importados, granitos nobres, quartzitos e superfícies tecnológicas sintetizadas sob medida.
            </p>
            <div className="flex items-center space-x-2 text-gold-400 text-xs font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Garantia de Instalação Integral</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold-300">Navegação</h4>
            <ul className="space-y-2 text-xs text-gray-450 font-medium font-sans">
              {[
                { label: "Visão Inicial", id: "hero" },
                { label: "Nosso Cavalete de Pedras", id: "catalogo" },
                { label: "Simulador de Ambientes", id: "simulador" },
                { label: "Calculadora Técnica", id: "calculadora" },
                { label: "Nosso Acabamento", id: "acabamento" }
              ].map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onScrollTo(link.id)}
                    className="hover:text-gold-400 transition-colors block text-left text-gray-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Showroom Contact Details */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold-300">Showroom Central</h4>
            <ul className="space-y-3.5 text-xs text-gray-450 font-medium font-sans">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <span className="text-gray-400 font-sans">Vila Telebrasília - Distrito Federal</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-gold-500 shrink-0" />
                <a 
                  href="https://wa.me/5561984138373?text=Olá!+Gostaria+de+realizar+um+orçamento+com+a+Corte+Fino."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gold-400 transition-colors"
                >
                  (61) 98413-8373
                </a>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-gold-500 shrink-0" />
                <span className="text-gray-400 font-sans">consultoria@cortefino.com.br</span>
              </li>
            </ul>
          </div>

          {/* Operating hours & Production */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-gold-300">Horário de Atendimento</h4>
            <div className="space-y-2.5 text-xs text-gray-450">
              <div className="flex items-start space-x-2 text-gray-400">
                <Clock className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wide text-[10px] text-gray-300">Segunda a Sexta:</p>
                  <p className="text-gray-400 mt-0.5">08:00 às 18:00</p>
                </div>
              </div>
              <div className="flex items-start space-x-2 text-gray-400">
                <Clock className="h-4 w-4 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold uppercase tracking-wide text-[10px] text-gray-300">Sábado Showroom:</p>
                  <p className="text-gray-400 mt-0.5">09:00 às 13:00</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-gray-900 my-8" />

        {/* Bottom Rights Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-medium">
          <p>© {currentYear} Marmoraria Corte Fino LTDA. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-1 text-gold-400/80 mt-2 sm:mt-0 font-display">
            <Sparkles className="h-3 w-3" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">Corte Perfeito, Acabamento Sublime</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
