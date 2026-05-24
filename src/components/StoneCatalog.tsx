import { useState } from "react";
import { STONES_DATA } from "../stonesData";
import { Stone } from "../types";
import { Compass, Award, Shield, Sparkles } from "lucide-react";

interface StoneCatalogProps {
  onSelectForSimulation: (stoneId: string) => void;
  onSelectForCalculator: (stone: Stone) => void;
}

export default function StoneCatalog({ onSelectForSimulation, onSelectForCalculator }: StoneCatalogProps) {
  const [activeTab, setActiveTab] = useState<"all" | "marble" | "granite" | "quartzite" | "sintetico">("all");

  const filteredStones = STONES_DATA.filter((stone) => {
    if (activeTab === "all") return true;
    return stone.category === activeTab;
  });

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "marble": return "Mármore Nobre";
      case "granite": return "Granito de Alta Dureza";
      case "quartzite": return "Quartzito Exótico";
      case "sintetico": return "Superfície Sintética";
      default: return "";
    }
  };

  const getDurabilityLabel = (val: number) => {
    if (val >= 9) return "Praticamente Indestrutível";
    if (val >= 7) return "Muito Resistente (Cozinhas)";
    return "Médio (Banheiros/Lavatórios)";
  };

  return (
    <section id="catalogo" className="marble-grid py-20 bg-gray-950 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-gold-500/10 px-4 py-1.5 text-xs font-semibold text-gold-400 border border-gold-500/30 mb-4 uppercase tracking-widest leading-none">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Mostruário de Matéria-Prima</span>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl mt-2 leading-none">
            Nossa Pátria de <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">Rochas Eternas</span>
          </h2>
          <p className="mt-4 text-base text-gray-400 font-sans leading-relaxed">
            Selecione entre as rochas mais nobres do planeta. Da pureza intocada do mármore italiano de Carrara à robustez titânica dos quartzitos brasileiros e inovação das superfícies tecnológicas sintetizadas.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {[
            { id: "all", label: "Todos os Materiais" },
            { id: "marble", label: "Mármores" },
            { id: "quartzite", label: "Quartzitos" },
            { id: "granite", label: "Granitos" },
            { id: "sintetico", label: "Sintéticos & Quartzos" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-full px-5 py-2.5 text-xs font-semibold transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-gold-600 to-gold-500 text-gray-950 border-gold-400 shadow-lg shadow-gold-500/10"
                  : "bg-gray-900/50 text-gray-300 border-gray-800 hover:border-gold-500/30 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Stones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredStones.map((stone) => (
            <div
              key={stone.id}
              className="group flex flex-col justify-between rounded-2xl bg-gray-900/40 border border-gray-800/80 p-5 overflow-hidden transition-all duration-300 hover:border-gold-500/40 hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold-950/10 relative"
            >
              {/* Top Row and Badge */}
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-bold tracking-wider text-gold-400 uppercase bg-gold-400/5 border border-gold-500/20 rounded-md px-2 py-1">
                  {getCategoryLabel(stone.category)}
                </span>
                {stone.isBestSeller && (
                  <span className="flex items-center space-x-1 text-[9px] font-extrabold tracking-widest text-gray-950 bg-gold-300 rounded-full py-0.5 px-2.5 uppercase animate-pulse">
                    <Award className="h-2.5 w-2.5" />
                    <span>Destaque</span>
                  </span>
                )}
              </div>

              {/* Stone Material Preview Card */}
              <div
                className="w-full h-48 rounded-xl relative overflow-hidden flex items-end p-4 mb-4 select-none shadow-inner border border-gray-800"
                style={{ background: stone.bgStyle }}
              >
                {/* Visual Shimmer overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-gold-shimmer" 
                     style={{ backgroundSize: '200% 100%' }} />
                     
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                
                {/* Small indicator on bottom-right */}
                <span className={`text-[10px] font-bold uppercase tracking-wider rounded px-2 py-0.5 z-10 ${stone.textClass} bg-white/60 backdrop-blur-sm shadow`}>
                  Textura Ilustrativa
                </span>
              </div>

              {/* Stone Info */}
              <div className="mb-6 flex-1">
                <h3 className="font-display text-xl font-bold tracking-tight text-white mb-2 group-hover:text-gold-300 transition-colors">
                  {stone.name}
                </h3>
                <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                  {stone.description}
                </p>

                {/* Characteristics Ratings */}
                <div className="space-y-2 mt-4 text-xs">
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Shield className="h-3 w-3 text-gold-400/90" />
                      <span>Resistência física:</span>
                    </span>
                    <span className="text-gray-200 font-semibold">{stone.durability}/10</span>
                  </div>
                  <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gold-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${stone.durability * 10}%` }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Compass className="h-3 w-3 text-gold-400/90" />
                      <span>Origem:</span>
                    </span>
                    <span className="text-gray-200 font-semibold">{stone.origin}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="border-t border-gray-800/80 pt-4 mt-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-none font-semibold">Valor Médio</p>
                    <p className="text-base font-bold text-gold-400 mt-1 leading-none">
                      R$ {stone.pricePerMeter.toLocaleString("pt-BR")}<span className="text-xs text-gray-500 font-normal">/m²</span>
                    </p>
                  </div>
                  <div className="text-xs space-y-0.5 text-right font-medium text-gray-400">
                    <div>Padrão: <span className="text-gray-200 font-semibold">{stone.pattern}</span></div>
                    <div>Cor: <span className="text-gray-200 font-semibold">{stone.color}</span></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={() => onSelectForSimulation(stone.id)}
                    className="w-full text-center rounded-lg bg-gray-900 border border-gray-800 py-2.5 text-xs font-semibold text-gray-300 hover:bg-gray-800 hover:text-white transition-all shadow-inner"
                  >
                    Simular Ambiente
                  </button>
                  <button
                    onClick={() => onSelectForCalculator(stone)}
                    className="w-full text-center rounded-lg bg-gradient-to-r from-gold-600 to-gold-500 text-gray-950 py-2.5 text-xs font-semibold hover:from-gold-500 hover:to-gold-400 transition-all font-sans shadow-md"
                  >
                    Usar no Orçamento
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
