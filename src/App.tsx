import { useState } from "react";
import Header from "./components/Header";
import StoneCatalog from "./components/StoneCatalog";
import Simulator from "./components/Simulator";
import BudgetCalculator from "./components/BudgetCalculator";
import AIConsultantChat from "./components/AIConsultantChat";
import WhatsAppButton from "./components/WhatsAppButton";
import Footer from "./components/Footer";
import { Stone } from "./types";
import { Award, Compass, ArrowRight, ShieldCheck, Drill, Hammer, Sparkles, MessageSquare, Flame } from "lucide-react";

export default function App() {
  const [simulatorStoneId, setSimulatorStoneId] = useState<string>("calacatta_gold");
  const [calculatorStoneId, setCalculatorStoneId] = useState<string>("calacatta_gold");
  const [chatOpen, setChatOpen] = useState<boolean>(false);

  // Smooth scroll handler
  const handleScrollTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectForSimulation = (stoneId: string) => {
    setSimulatorStoneId(stoneId);
    handleScrollTo("simulador");
  };

  const handleSelectForCalculator = (stone: Stone) => {
    setCalculatorStoneId(stone.id);
    handleScrollTo("calculadora");
  };

  const handleSelectForCalculatorFromSimulator = (stoneId: string) => {
    setCalculatorStoneId(stoneId);
    handleScrollTo("calculadora");
  };

  // Pre-configured paths for generated image assets
  const heroImgUrl = "/src/assets/images/corte_fino_hero_1779583532704.png";
  const bathImgUrl = "/src/assets/images/corte_fino_master_bath_1779583553157.png";

  return (
    <div className="min-h-screen bg-gray-950 text-gray-150 font-sans selection:bg-gold-500 selection:text-gray-950">
      {/* Header Bar */}
      <Header 
        onScrollTo={handleScrollTo} 
        onOpenChat={() => setChatOpen(true)} 
      />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-[85vh] flex items-center bg-gray-950 overflow-hidden py-16">
        {/* Subtle grid elements */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d49c2f_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none z-1" />
        <div className="absolute right-0 top-0 w-[45%] h-[85%] bg-gradient-to-l from-gold-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Hero Texts */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center space-x-2 rounded-full bg-gold-400/10 px-4 py-1.5 text-xs font-semibold text-gold-400 border border-gold-400/20 mb-2 uppercase tracking-widest leading-none">
              <Award className="h-4 w-4 text-gold-400" />
              <span>Alta Marmoraria & Design Exclusivo</span>
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              Onde a Rocha se Torna <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-400 to-gold-500">Obra de Arte</span>
            </h1>
            
            <p className="text-sm sm:text-base text-gray-400 max-w-lg leading-relaxed font-sans">
              Especialistas em cortes de alta precisão e acabamento invisível em Meia-Esquadria de 45°. Oferecemos a mais requintada seleção de Mármores Italianos, Quartzitos Exóticos Brasileiros e Superfícies Tecnológicas para residências de alto padrão.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4">
              <button
                onClick={() => handleScrollTo("calculadora")}
                className="rounded-xl bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 py-3.5 px-6 text-sm font-bold text-gray-950 hover:opacity-95 transition-all text-center shadow-lg shadow-gold-500/10"
              >
                Inicie Seu Orçamento de Luxo
              </button>
              <button
                onClick={() => handleScrollTo("catalogo")}
                className="rounded-xl bg-gray-900 border border-gray-800 py-3.5 px-6 text-sm font-semibold text-gray-300 hover:border-gold-500 hover:text-white transition-all text-center flex items-center justify-center space-x-2"
              >
                <span>Explorar Cavaletes de Pedras</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Micro Specs */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-900">
              <div>
                <span className="block text-xl font-bold font-display text-white">45°</span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">Acabamento Meia-Esquadria</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-display text-white">100%</span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">Impermeabilização Premium</span>
              </div>
              <div>
                <span className="block text-xl font-bold font-display text-white">CNC</span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-wider font-semibold mt-1">Corte Hidro-Milimétrico</span>
              </div>
            </div>
          </div>

          {/* Right Hero High-Fidelity Image Area */}
          <div className="lg:col-span-6 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 to-transparent blur-2xl rounded-3xl" />
            <div className="relative rounded-3xl border border-gray-800/80 overflow-hidden shadow-2xl shadow-gold-950/5 aspect-[4/3] group select-none">
              <img 
                src={heroImgUrl} 
                alt="Bancada de Cozinha de Luxo em Calacatta Gold projetada de forma sublime pela Marmoraria Corte Fino" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60" />
              
              {/* Overlay Float Info Card */}
              <div className="absolute bottom-5 left-5 right-5 bg-gray-950/80 backdrop-blur-md p-4 rounded-xl border border-gold-500/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gold-400 font-extrabold uppercase tracking-widest block">Ambiente em Destaque</span>
                  <span className="font-display font-semibold text-white text-sm mt-0.5 block">Ilha e Bancada Gourmet em Mármore Nobre</span>
                </div>
                <span className="text-[11px] font-bold text-gray-950 bg-gold-400 rounded px-2.5 py-1 uppercase font-sans shrink-0">
                  Calacatta Gold
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stone Display Catalog Section */}
      <StoneCatalog 
        onSelectForSimulation={handleSelectForSimulation}
        onSelectForCalculator={handleSelectForCalculator}
      />

      {/* Visual Simulator Canvas Section */}
      <Simulator 
        initialStoneId={simulatorStoneId}
        onSelectForCalculator={handleSelectForCalculatorFromSimulator}
        onScrollTo={handleScrollTo}
      />

      {/* The Craftsmanship Philosophy / "O Acabamento" Section */}
      <section id="acabamento" className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Graphics: Bath vanity */}
            <div className="lg:col-span-5 relative order-last lg:order-first">
              <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gold-500/5 rounded-3xl filter blur-3xl" />
              <div className="relative rounded-3xl border border-gray-850 overflow-hidden shadow-2xl aspect-[4/5] select-none">
                <img 
                  src={bathImgUrl} 
                  alt="Cuba esculpida dupla de banheiro executada com extrema excelência técnica pela equipe de escultores Corte Fino" 
                  className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual Label */}
                <div className="absolute bottom-4 left-4 right-4 bg-gray-950/90 p-4 rounded-xl border border-gray-800">
                  <p className="text-[10px] text-gold-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Execução Autoral</span>
                  </p>
                  <p className="font-display font-medium text-xs text-gray-300 mt-1">
                    Lavatório esculpido direto na chapa de Nero Marquina Bianco, com acabamento em meia-esquadria de 45° milimétrica.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Contents: Features explaining the 45 degree edge mastery and sculpted basins */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest block leading-none">O Diferencial Corte Fino</span>
                <h3 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                  A Nobre Arte do <span className="text-gold-400">Acabamento</span>
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-sans">
                  Em marmoraria de alto escalão, o detalhamento é a fronteira entre o comum e o sublime. Nosso nome, **Corte Fino**, reflete o compromisso com a manufatura primorosa de cada aresta.
                </p>
              </div>

              {/* Feature Blocks */}
              <div className="space-y-6">
                
                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <Hammer className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-200 text-sm">Meia-Esquadria de 45° de Alta Precisão</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Todas as junções das saias das bancadas são coladas com resina estrutural colorida exatamente na tonalidade e padrão da pedra, lixadas e polidas com discos diamantados de grão ultrafino até que a junção se torne imperceptível ao tato e ao olhar humano.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <Drill className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-200 text-sm">Cubas Esculpidas Direct-In-Block</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Esculpimos pias e lavatórios com ralos ocultos (escondidos sob tampas chanfradas da própria pedra) diretamente no bloco mineral. Nossos fundos possuem caimento com inclinação de 1% usinada para que a água escoe perfeitamente, unindo design clean à máxima funcionalidade.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="h-10 w-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 shrink-0 mt-0.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-gray-200 text-sm">Tratamento de Selagem Impermeabilizante</h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Mármores e pedras nobres porosas são completamente seladas e hidrofobizadas em nosso pátio com o selador italiano Oleofóbico de alta penetração. Isso impede que vinho, café, gordura ou batom penetrem na rocha, reduzindo o risco de manchas em até 98%.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Dimensional Project Budget Calculator Section */}
      <BudgetCalculator 
        selectedStoneId={calculatorStoneId} 
        onScrollTo={handleScrollTo} 
      />

      {/* Conversational Floating Assistant chat */}
      <AIConsultantChat 
        isOpen={chatOpen} 
        onClose={() => setChatOpen(false)} 
        onOpen={() => setChatOpen(true)} 
      />

      {/* Floating high-end WhatsApp button with dynamic pulse */}
      <WhatsAppButton />

      {/* Footer showroom block */}
      <Footer onScrollTo={handleScrollTo} />
    </div>
  );
}
