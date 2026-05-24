import { useState } from "react";
import { STONES_DATA } from "../stonesData";
import { Sparkles, ArrowRight, Table, Info, Flame, Eye, Droplet } from "lucide-react";

interface SimulatorProps {
  initialStoneId?: string;
  onSelectForCalculator: (stoneId: string) => void;
  onScrollTo: (elementId: string) => void;
}

export default function Simulator({ initialStoneId = "calacatta_gold", onSelectForCalculator, onScrollTo }: SimulatorProps) {
  const [activeRoom, setActiveRoom] = useState<"kitchen" | "bathroom">("kitchen");
  const [selectedStoneId, setSelectedStoneId] = useState<string>(initialStoneId);

  // Sync state if prop changes
  const activeStone = STONES_DATA.find((s) => s.id === selectedStoneId) || STONES_DATA[0];

  const handleRoomToggle = (room: "kitchen" | "bathroom") => {
    setActiveRoom(room);
  };

  const currentStones = STONES_DATA;

  return (
    <section id="simulador" className="py-20 bg-gray-900 text-white relative">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        
        {/* Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gold-400/10 px-4 py-1.5 text-xs font-semibold text-gold-400 border border-gold-400/20 mb-4 uppercase tracking-widest leading-none">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Simulador 3D-Lite</span>
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl mt-2 leading-none">
              Simulador de <span className="text-gold-400">Ambientes</span>
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed font-sans">
              Veja em tempo real como cada padrão de mineral se comporta nos ambientes mais nobres de uma residência. Alterne as pedras abaixo e observe a harmonia dos veios.
            </p>
          </div>

          {/* Room Selection Tabs */}
          <div className="flex bg-gray-950 p-1 rounded-xl border border-gray-800 gap-1.5 mt-6 md:mt-0">
            <button
              onClick={() => handleRoomToggle("kitchen")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeRoom === "kitchen"
                  ? "bg-gold-500 text-gray-950 shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Cozinha Gourmet
            </button>
            <button
              onClick={() => handleRoomToggle("bathroom")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeRoom === "bathroom"
                  ? "bg-gold-500 text-gray-950 shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Banheiro de Luxo
            </button>
          </div>
        </div>

        {/* Simulator Area: Left Panel (Visual Mock), Right Panel (Selector / Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Panel: Visual Mock (Isometric/Flat Illustration styled strictly with high-end Tailwind CSS) */}
          <div className="lg:col-span-7 bg-gray-950 rounded-3xl border border-gray-800/80 p-8 flex flex-col justify-center items-center shadow-2xl relative min-h-[420px] overflow-hidden">
            {/* Background grids */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d49c2f_1px,transparent_1px)] [background-size:16px_16px]" />
            <div className="absolute top-4 left-4 flex items-center space-x-2 bg-gray-900 border border-gray-800 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-gold-400 shadow z-10">
              <Eye className="h-3.5 w-3.5 text-gold-400 animate-pulse" />
              <span>Visualização Simulação</span>
            </div>

            {/* Simulated Room Render Canvas */}
            <div className="w-full max-w-[480px] aspect-video relative flex flex-col justify-end mt-4">
              
              {/* KITCHEN RENDER */}
              {activeRoom === "kitchen" && (
                <div className="w-full h-full flex flex-col justify-end items-center relative">
                  {/* Visual Cabinets and Wall Backdrop */}
                  <div className="absolute inset-x-8 bottom-0 top-1/4 bg-gray-900/40 rounded-t-xl border-x border-t border-gray-800 flex flex-col justify-between overflow-hidden">
                    {/* Upper shelf / hood shadow */}
                    <div className="h-10 border-b border-gray-800/60 bg-gray-950/20 flex items-center justify-between px-6">
                      <div className="w-12 h-1 bg-gray-800 rounded" />
                      <div className="w-20 h-4 bg-gray-800 rounded-b border-x border-b border-gray-700/50" />
                      <div className="w-12 h-1 bg-gray-800 rounded" />
                    </div>
                  </div>

                  {/* Dynamic Marble Backsplash Panel */}
                  <div 
                    className="absolute inset-x-12 bottom-12 top-1/2 rounded-t transition-all duration-500 border border-gray-800/60 shadow-inner overflow-hidden"
                    style={{ background: activeStone.bgStyle }}
                  >
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />
                  </div>

                  {/* Dynamic Countertop Base Block */}
                  <div 
                    className="w-full h-14 rounded-md relative z-10 shadow-xl transition-all duration-500 border-x border-t border-gold-900/30 overflow-hidden"
                    style={{ background: activeStone.bgStyle }}
                  >
                    {/* Depth shadow on countertop edge */}
                    <div className="absolute bottom-0 inset-x-0 h-4 bg-black/25 border-b border-gray-950 flex items-center px-4 justify-between">
                      <span className="text-[7px] text-white/40 uppercase tracking-widest font-mono font-semibold">Corte Fino 45°</span>
                      <div className="w-2 h-2 rounded-full bg-gold-400/60 ring-2 ring-gray-950 animate-ping" />
                    </div>
                    
                    {/* Gold faucets and induction stove simulation on countertop */}
                    <div className="absolute top-2 right-16 w-16 h-4 bg-black/45 rounded border border-gray-800 flex justify-around items-center px-1">
                      <div className="w-2.5 h-2.5 rounded-full border border-red-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full border border-gray-500/40" />
                      <div className="w-2.5 h-2.5 rounded-full border border-gray-500/40" />
                    </div>

                    {/* Premium under-sink cut in marble simulation */}
                    <div className="absolute top-2 left-16 w-24 h-5 bg-gray-950 rounded border-t border-gray-800 flex items-center px-2">
                      <div className="w-2 h-4 bg-gold-500/60 rounded-sm" />
                    </div>
                  </div>

                  {/* Below cabinets */}
                  <div className="w-[94%] h-12 bg-gray-950/80 border-x border-b border-gray-800/50 rounded-b-xl flex justify-around p-2">
                    <div className="w-[30%] h-full bg-gray-900/60 rounded border border-gray-800" />
                    <div className="w-[30%] h-full bg-gray-900/60 rounded border border-gray-800" />
                    <div className="w-[30%] h-full bg-gray-950 rounded border border-gray-800 flex items-center justify-center">
                      <div className="w-8 h-1 bg-gray-800 rounded" />
                    </div>
                  </div>
                </div>
              )}

              {/* BATHROOM RENDER */}
              {activeRoom === "bathroom" && (
                <div className="w-full h-full flex flex-col justify-end items-center relative">
                  {/* Mirrors on backdrop */}
                  <div className="absolute inset-x-12 bottom-16 top-1/4 flex justify-around items-end">
                    <div className="w-24 h-24 bg-gray-900/50 rounded-full border-2 border-gold-400/40 relative flex items-center justify-center">
                      {/* Reflection shine */}
                      <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent hover:via-white/20 transition-all pointer-events-none" />
                      <div className="w-4 h-5 border-t-2 border-r-2 border-gold-500/50 rounded-tr" />
                    </div>
                    <div className="w-24 h-24 bg-gray-900/50 rounded-full border-2 border-gold-400/40 relative flex items-center justify-center">
                      <div className="absolute inset-1.5 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />
                      <div className="w-4 h-5 border-t-2 border-r-2 border-gold-500/50 rounded-tr" />
                    </div>
                  </div>

                  {/* Dynamic Floating Marble Vanity Countertop */}
                  <div 
                    className="w-full h-16 rounded-xl relative z-10 shadow-2xl transition-all duration-500 border-x border-t border-gold-600/10 overflow-hidden"
                    style={{ background: activeStone.bgStyle }}
                  >
                    {/* Front apron representing the solid block thickness (Vente) */}
                    <div className="absolute bottom-0 inset-x-0 h-6 bg-black/35 border-b border-gray-950/50 flex items-center px-4 justify-between">
                      <span className="text-[7px] text-white/55 tracking-widest font-mono">ROCHA NATURAL ESCULPIDA</span>
                      <span className="text-[8px] text-amber-300 font-bold font-display">SAIA DE 10CM</span>
                    </div>

                    {/* Left Esculped Sink Basin (Italian-style hollow out) */}
                    <div className="absolute top-2 left-10 w-28 h-5 bg-black/60 rounded-sm border border-gray-950 flex justify-end items-center px-2">
                      <div className="w-3 h-1.5 rounded bg-amber-500/30 border border-gold-500/30" />
                    </div>

                    {/* Right Esculped Sink Basin */}
                    <div className="absolute top-2 right-10 w-28 h-5 bg-black/60 rounded-sm border border-gray-950 flex justify-end items-center px-2">
                      <div className="w-3 h-1.5 rounded bg-amber-500/30 border border-gold-500/30" />
                    </div>
                  </div>

                  {/* Wooden Support Console Below */}
                  <div className="w-[88%] h-6 bg-amber-900/10 border border-amber-950/20 rounded-b flex justify-around p-1">
                    <div className="w-12 h-1.5 bg-gray-900 rounded" />
                    <div className="w-12 h-1.5 bg-gray-900 rounded" />
                  </div>
                </div>
              )}
            </div>

            {/* Simulated Live Specs Info Badge */}
            <div className="w-full mt-6 bg-gray-900/60 border border-gray-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between text-xs space-y-3 md:space-y-0">
              <div className="flex items-center space-x-3">
                <div className="h-4 w-4 rounded-full border border-gold-400" style={{ background: activeStone.bgStyle }} />
                <div>
                  <p className="font-display font-semibold text-gray-200 text-sm leading-none">{activeStone.name}</p>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Origem: {activeStone.origin}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-1.5">
                  <Flame className="h-3.5 w-3.5 text-orange-400" />
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-semibold">Uso Calor:</span>
                    <span className="text-gray-100 font-bold text-[10px]">
                      {activeStone.durability >= 8 ? "Altíssima Resistência" : "Moderado (usar apoio)"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Droplet className="h-3.5 w-3.5 text-cyan-400" />
                  <div>
                    <span className="text-gray-400 block text-[9px] uppercase font-semibold">Absorção:</span>
                    <span className="text-gray-100 font-bold text-[10px]">
                      {activeStone.stainResistance >= 8 ? "Selado / Hidrofóbico" : "Poroso (selagem obrigatória)"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Selectors & Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            {/* Quick selectors list */}
            <div>
              <h3 className="font-display text-lg font-bold tracking-tight text-white mb-4">
                Escolha a Rocha de Acabamento:
              </h3>
              
              <div className="grid grid-cols-2 gap-3 max-h-[290px] overflow-y-auto pr-2">
                {currentStones.map((stone) => (
                  <button
                    key={stone.id}
                    onClick={() => setSelectedStoneId(stone.id)}
                    className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all group ${
                      selectedStoneId === stone.id
                        ? "bg-gold-500/10 border-gold-400 shadow shadow-gold-500/10"
                        : "bg-gray-950 border-gray-800 hover:border-gray-700"
                    }`}
                  >
                    {/* Circle thumbnail representing color */}
                    <div 
                      className="h-8 w-8 rounded-full border border-gray-700 flex-shrink-0 group-hover:scale-110 transition-transform" 
                      style={{ background: stone.bgStyle }} 
                    />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-gray-200 group-hover:text-gold-300 transition-colors uppercase truncate">
                        {stone.name.split(" (")[0]}
                      </p>
                      <p className="text-[9px] text-gray-500 uppercase font-bold tracking-wider mt-0.5">
                        {stone.category === "marble" ? "Mármore" : stone.category === "granite" ? "Granito" : stone.category === "quartzite" ? "Quartzito" : "Sintético"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Stone Bio and CTA */}
            <div className="mt-8 border-t border-gray-800 pt-6">
              <div className="flex items-start space-x-3 bg-gray-950/80 p-4 rounded-xl border border-gray-800 mb-6">
                <Info className="h-5 w-5 text-gold-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-gold-300 uppercase tracking-wider">Parecer do Marmorista:</h4>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    "{activeStone.description}" Para este ambiente, o acabamento meiot-esquadria de 45° valorizará seu visual em até duas vezes.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onSelectForCalculator(activeStone.id)}
                  className="w-full rounded-xl bg-gradient-to-r from-gold-600 to-gold-500 py-3 text-sm font-bold text-gray-950 hover:from-gold-400 hover:to-gold-300 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-gold-950/20"
                >
                  <span>Orçar Bancada com esta Pedra</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onScrollTo("calculadora")}
                  className="w-full rounded-xl bg-transparent border border-gray-700 py-3 text-xs font-semibold text-gray-400 hover:border-gold-500 hover:text-white transition-all text-center"
                >
                  Abrir Calculadora Completa de Medidas
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
