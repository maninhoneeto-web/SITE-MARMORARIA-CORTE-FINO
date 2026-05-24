import { useState, useEffect } from "react";
import { STONES_DATA } from "../stonesData";
import { Stone, BudgetEstimateInput, BudgetResult } from "../types";
import { Sparkles, Calculator, HelpCircle, FileText, CheckCircle2, RotateCcw, AlertCircle, RefreshCw } from "lucide-react";

interface BudgetCalculatorProps {
  selectedStoneId?: string;
  onScrollTo: (elementId: string) => void;
}

export default function BudgetCalculator({ selectedStoneId = "", onScrollTo }: BudgetCalculatorProps) {
  // Internal selection states
  const [ambiente, setAmbiente] = useState<string>("kitchen");
  const [stoneId, setStoneId] = useState<string>(selectedStoneId || "calacatta_gold");
  const [comprimento, setComprimento] = useState<number>(2.2);
  const [largura, setLargura] = useState<number>(0.6);
  const [acabamento, setAcabamento] = useState<string>("mitre");
  const [observacoes, setObservacoes] = useState<string>("");

  // Loading and AI Result states
  const [loadingAI, setLoadingAI] = useState<boolean>(false);
  const [aiReport, setAiReport] = useState<string>("");
  const [aiError, setAiError] = useState<string>("");
  const [activeStone, setActiveStone] = useState<Stone>(STONES_DATA[0]);

  // Sync stoneId if parent specifies it
  useEffect(() => {
    if (selectedStoneId) {
      setStoneId(selectedStoneId);
    }
  }, [selectedStoneId]);

  // Sync active stone details when stoneId changing
  useEffect(() => {
    const stone = STONES_DATA.find((s) => s.id === stoneId) || STONES_DATA[0];
    setActiveStone(stone);
  }, [stoneId]);

  // Quick live price calculation
  const area = comprimento * largura;
  const precoMateriaPrima = area * activeStone.pricePerMeter;
  
  // Straight: R$ 180 / m line, Bevel: R$ 280 / m line, Mitred: R$ 520 / m line
  const precoAcabamentoMetroLinear = acabamento === "reto" ? 180 : acabamento === "bevel" ? 280 : 520;
  const precoAcabamentoTotal = comprimento * precoAcabamentoMetroLinear;

  const totalGeral = precoMateriaPrima + precoAcabamentoTotal;

  // AI loading quotes loop to simulate meticulous engineering analysis
  const [loadingQuoteIndex, setLoadingQuoteIndex] = useState(0);
  const loadingQuotes = [
    "Analisando porosidade e adequação física da rocha...",
    "Mestre Aurélio está calculando o alinhamento dos veios de corte...",
    "Projetando estrutura de engate em meia-esquadria a 45 graus...",
    "Otimizando aproveitamento da chapa nos cavaletes para evitar desperdício...",
    "Avaliando necessidade de impermeabilização no banho/área gourmet..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loadingAI) {
      interval = setInterval(() => {
        setLoadingQuoteIndex((prev) => (prev + 1) % loadingQuotes.length);
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [loadingAI]);

  // Handle AI detailing query
  const handleAIRefinement = async () => {
    setLoadingAI(true);
    setAiReport("");
    setAiError("");
    setLoadingQuoteIndex(0);

    const payload: BudgetEstimateInput = {
      ambiente,
      material: activeStone.category,
      comprimento,
      largura,
      acabamento,
      observacoes
    };

    try {
      const response = await fetch("/api/consulta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        setAiReport(data.text);
      } else {
        setAiError(data.error || "Ocorreu um erro ao gerar o laudo técnico da pedra.");
      }
    } catch (err: any) {
      console.error(err);
      setAiError("Falha na rede ao conectar com o servidor do Mestre Aurélio.");
    } finally {
      setLoadingAI(false);
    }
  };

  // Safe markdown to visual element transformer
  const renderResponseMarkdown = (text: string) => {
    if (!text) return null;
    
    // Split by sections starting with ###
    const sections = text.split("###");
    
    return (
      <div className="space-y-6 text-sm text-gray-300">
        {sections.map((section, idx) => {
          if (!section.trim()) return null;
          
          // Separate title (first line) from content
          const lines = section.split("\n");
          const title = lines[0].trim();
          const contentLines = lines.slice(1).join("\n").trim();
          
          return (
            <div key={idx} className="bg-gray-900/50 p-6 rounded-xl border border-gray-800/80">
              {title && (
                <h4 className="font-display font-bold text-base text-gold-300 border-b border-gray-800 pb-2 mb-3 flex items-center space-x-2">
                  <span>{title}</span>
                </h4>
              )}
              {/* Parse bullets and text */}
              <div className="space-y-2 leading-relaxed">
                {contentLines.split("\n").map((line, lIdx) => {
                  const cleanLine = line.trim();
                  if (cleanLine.startsWith("-") || cleanLine.startsWith("*")) {
                    return (
                      <div key={lIdx} className="flex items-start space-x-2 text-gray-300">
                        <span className="text-gold-500 mt-1.5 shrink-0">•</span>
                        <span>{cleanLine.substring(1).trim()}</span>
                      </div>
                    );
                  }
                  if (cleanLine.startsWith("###")) {
                    return (
                      <h5 key={lIdx} className="font-bold text-white mt-4 tracking-tight">
                        {cleanLine.replace("###", "").trim()}
                      </h5>
                    );
                  }
                  if (cleanLine) {
                    return <p key={lIdx} className="text-gray-300">{cleanLine}</p>;
                  }
                  return null;
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleReset = () => {
    setAmbiente("kitchen");
    setStoneId("calacatta_gold");
    setComprimento(2.2);
    setLargura(0.6);
    setAcabamento("mitre");
    setObservacoes("");
    setAiReport("");
    setAiError("");
  };

  return (
    <section id="calculadora" className="py-20 bg-gray-950 text-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full bg-gold-400/10 px-4 py-1.5 text-xs font-semibold text-gold-400 border border-gold-400/20 mb-4 uppercase tracking-widest leading-none">
            <Calculator className="h-4 w-4 text-gold-400" />
            <span>Engenharia & Custos</span>
          </div>
          <h2 className="font-display text-4xl font-bold tracking-tight text-white md:text-5xl mt-2">
            Calculadora de <span className="text-gold-400">Projetos</span>
          </h2>
          <p className="mt-4 text-sm text-gray-400 font-sans leading-relaxed">
            Faça simulações iniciais de tamanho, área e custo dos cortes para as suas bancadas, cubas e tampos de mesa. Depois, refine os detalhes usando nossa inteligência artificial para obter um parecer técnico instantâneo.
          </p>
        </div>

        {/* Form and Result Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form Side */}
          <div className="lg:col-span-7 bg-gray-900/40 p-6 md:p-8 rounded-2xl border border-gray-850/80">
            <h3 className="font-display text-xl font-bold tracking-tight text-white mb-6 border-b border-gray-800 pb-3 flex items-center space-x-1.5">
              <span>Configurar Dimensões do Projeto</span>
            </h3>

            <div className="space-y-6">
              {/* Scope Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">1. Local do Corte (Ambiente)</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: "kitchen", label: "Cozinha / Gourmet" },
                    { id: "bath", label: "Banheiro / Cuba" },
                    { id: "table", label: "Tampo de Mesa" },
                    { id: "piso", label: "Pisos / Outro" },
                  ].map((amb) => (
                    <button
                      key={amb.id}
                      type="button"
                      onClick={() => setAmbiente(amb.id)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-all ${
                        ambiente === amb.id
                          ? "bg-gold-500 text-gray-950 border-gold-400 font-bold"
                          : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      {amb.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stone Choice Dropdown */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">2. Selecionar Espécime Mineral</label>
                <select
                  value={stoneId}
                  onChange={(e) => setStoneId(e.target.value)}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none"
                >
                  {STONES_DATA.map((stone) => (
                    <option key={stone.id} value={stone.id}>
                      {stone.name} — R$ {stone.pricePerMeter}/m² ({stone.category === "marble" ? "Mármore" : stone.category === "granite" ? "Granito" : stone.category === "quartzite" ? "Quartzito" : "Sintético"})
                    </option>
                  ))}
                </select>
              </div>

              {/* Dimensions Input Range Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Length Slide / Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Comprimento (M)</label>
                    <span className="text-sm font-bold text-gold-400 font-mono">{comprimento.toFixed(2)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="6.0"
                    step="0.05"
                    value={comprimento}
                    onChange={(e) => setComprimento(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>Mín: 0.30 m</span>
                    <span>Máx: 6.00 m</span>
                  </div>
                </div>

                {/* Width Slide / Input */}
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Largura (M)</label>
                    <span className="text-sm font-bold text-gold-400 font-mono">{largura.toFixed(2)} m</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.0"
                    step="0.05"
                    value={largura}
                    onChange={(e) => setLargura(parseFloat(e.target.value))}
                    className="w-full h-1 bg-gray-950 rounded-lg appearance-none cursor-pointer accent-gold-500"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono mt-1">
                    <span>Mín: 0.20 m</span>
                    <span>Máx: 2.00 m</span>
                  </div>
                </div>

              </div>

              {/* Edge Finish Profile selection */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">3. Acabamento das Bordas</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {[
                    { id: "reto", label: "Reto Clássico Polido", desc: "Corte reto com polimento fino" },
                    { id: "bevel", label: "Chanfrado Bisotado", desc: "Pequeno chanfro elegante nas pontas" },
                    { id: "mitre", label: "Meia-Esquadria 45°", desc: "Finas emendas invisíveis de bloco" },
                  ].map((finish) => (
                    <button
                      key={finish.id}
                      type="button"
                      onClick={() => setAcabamento(finish.id)}
                      className={`p-3.5 text-xs text-left rounded-xl border transition-all ${
                        acabamento === finish.id
                          ? "bg-gold-500/10 border-gold-400 text-white"
                          : "bg-gray-950 text-gray-400 border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      <p className="font-bold uppercase tracking-wide text-[10px] text-gold-300">{finish.label}</p>
                      <p className="text-[9px] text-gray-500 mt-0.5 leading-tight">{finish.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Open Comments Field */}
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">4. Furos, Cubas & Requisitos (Opcional)</label>
                <textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  placeholder="Por exemplo: Quero pia esculpida com caimento italiano p/ área gourmet; encaixe p/ cooktop de 5 bocas com rebaixo italiano nas laterais."
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg p-3 text-xs focus:ring-1 focus:ring-gold-400 focus:outline-none min-h-[85px] text-gray-200"
                />
              </div>

              {/* Submits and Reset */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-850">
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-3 bg-gray-950 border border-gray-800 hover:border-red-500/40 hover:text-red-400 rounded-xl transition-all"
                  title="Reiniciar Campos"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={handleAIRefinement}
                  disabled={loadingAI}
                  className="flex-1 bg-gradient-to-r from-gold-600 via-gold-500 to-amber-500 text-gray-950 py-3.5 text-xs tracking-wide font-extrabold uppercase rounded-xl hover:opacity-90 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-gold-500/15 disabled:opacity-40"
                >
                  {loadingAI ? <RefreshCw className="h-4 w-4 animate-spin text-gray-950" /> : <Sparkles className="h-4 w-4 text-gray-950 animate-pulse" />}
                  <span>{loadingAI ? "Processando..." : "Refinar Parecer com IA Especialista"}</span>
                </button>
              </div>

            </div>
          </div>

          {/* Result Panel Side */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Live Calc Panel */}
            <div className="bg-gray-900/60 p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold-400/5 rounded-full blur-2xl" />
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-gold-300 mb-6 flex items-center space-x-2 select-none">
                <FileText className="h-4 w-4" />
                <span>Simulação Comercial</span>
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Espécie de Rocha:</span>
                  <span className="font-semibold text-gray-100">{activeStone.name}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Área Estimada do Corte:</span>
                  <span className="font-semibold text-gray-100 font-mono">{area.toFixed(2)} m²</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Metros Lineares de Borda:</span>
                  <span className="font-semibold text-gray-100 font-mono">{comprimento.toFixed(2)} m</span>
                </div>
                
                <hr className="border-gray-850" />

                <div className="flex justify-between text-[11px] text-gray-400 mt-2">
                  <span>Subtotal Rocha Natural:</span>
                  <span className="text-gray-200 font-mono font-medium">R$ {precoMateriaPrima.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-[11px] text-gray-400">
                  <span>Acabamento de Borda ({acabamento === "mitre" ? "Meia Esquadria" : acabamento === "bevel" ? "Bisotado" : "Reto"}):</span>
                  <span className="text-gray-200 font-mono font-medium">R$ {precoAcabamentoTotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                </div>

                <div className="bg-gray-950 p-4 rounded-xl border border-amber-500/10 mt-6 flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-gray-400 font-bold">Orçamento Estimado:</span>
                    <span className="text-2xl font-extrabold text-gold-400 font-display mt-0.5 block">
                      R$ {totalGeral.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="bg-gold-500/10 h-10 w-10 rounded-lg flex items-center justify-center border border-gold-500/20">
                    <CheckCircle2 className="h-5 w-5 text-gold-400" />
                  </div>
                </div>
                
                <p className="text-[10px] text-gray-500 leading-tight">
                  *Este cálculo é uma aproximação baseada em cubagem e área. Valores finais mudam de acordo com o plano de corte e transporte de chapas. Recomendamos enviar o projeto via IA para ter conselhos exatos do mestre de produção.
                </p>
              </div>
            </div>

            {/* AI Detailing Result Sheet (Only visible when loading or done) */}
            {(loadingAI || aiReport || aiError) && (
              <div className="border border-gold-500/20 bg-gray-950 rounded-2xl flex flex-col shadow-2xl relative overflow-hidden transition-all duration-300">
                
                {/* Visual Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-950 p-4 border-b border-gray-900 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-4 w-4 text-gold-400 animate-pulse" />
                    <span className="font-display font-medium text-xs uppercase tracking-wider text-white">Análise do Mestre Aurélio</span>
                  </div>
                  {loadingAI && (
                    <div className="flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-gold-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  )}
                </div>

                {/* Content body */}
                <div className="p-4 md:p-6 max-h-[460px] overflow-y-auto">
                  
                  {/* LOADING STATE */}
                  {loadingAI && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                      {/* Big loading gear animation */}
                      <div className="relative flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full border border-dashed border-gold-400 animate-spin" />
                        <Sparkles className="h-6 w-6 text-gold-300 absolute" />
                      </div>
                      <div className="max-w-xs space-y-1.5">
                        <p className="font-bold text-xs text-gold-300 uppercase tracking-widest leading-none">Consultoria Ativa</p>
                        <p className="text-xs text-gray-400 leading-relaxed font-sans mt-2 animate-pulse">
                          "{loadingQuotes[loadingQuoteIndex]}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ERROR STATE */}
                  {aiError && (
                    <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-xl flex items-start space-x-3 text-red-300 text-xs">
                      <AlertCircle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold">Serviço Indisponível</p>
                        <p className="mt-1 leading-relaxed text-red-300/80">{aiError}</p>
                      </div>
                    </div>
                  )}

                  {/* REPORT RENDER STATE */}
                  {aiReport && (
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2.5 bg-gold-500/10 p-3 rounded-lg border border-gold-500/20 text-[11px] text-gold-300 mb-6">
                        <Sparkles className="h-4 w-4 shrink-0 mt-0.5 animate-pulse" />
                        <span>Este é um laudo técnico preliminar gerado em tempo real por IA exclusivo para o seu ambiente. Salve para apresentar ao projetista!</span>
                      </div>
                      {renderResponseMarkdown(aiReport)}
                    </div>
                  )}

                </div>

                {/* Footer and copy action */}
                {aiReport && (
                  <div className="bg-gray-900/60 p-3 border-t border-gray-900 flex justify-end">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiReport);
                        alert("Laudo de projeto copiado com sucesso! Pode colar no WhatsApp do seu arquiteto.");
                      }}
                      className="text-[10px] font-bold tracking-widest uppercase text-gold-400 hover:text-white transition-colors"
                    >
                      Copiar Laudo em Texto
                    </button>
                  </div>
                )}

              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
