import { useState, useRef, useEffect } from "react";
import { Message } from "../types";
import { Sparkles, MessageSquare, Send, X, ArrowDown, User, Hammer, RefreshCw } from "lucide-react";

interface AIConsultantChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export default function AIConsultantChat({ isOpen, onClose, onOpen }: AIConsultantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "assistant",
      content: "Olá! Sou o **Mestre Aurélio**, consultor chefe da Marmoraria Corte Fino. Estou aqui para guiar sua escolha pelas rochas mais finas do mundo. Estás planejando uma bancada de cozinha, uma cuba esculpida no banheiro, lareira ou revestimento interno? Pergunte-me qualquer detalhe sobre impermeabilização, durabilidade ou estética das pedras!",
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setErrorText("");

    // Prepare API history list (send last 10 messages to keep context short and focus)
    const activeHistory = [...messages, userMessage].slice(-10).map((m) => ({
      role: m.role,
      content: m.content
    }));

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: activeHistory })
      });

      const data = await response.json();
      if (data.success) {
        const assistantMessage: Message = {
          id: `ast-${Date.now()}`,
          role: "assistant",
          content: data.text,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        setErrorText(data.error || "Ocorreu um erro no consultor virtual.");
      }
    } catch (err) {
      console.error(err);
      setErrorText("Erro ao conectar ao consultor de design. Verifique se o servidor está ativo.");
    } finally {
      setIsTyping(false);
    }
  };

  const quickPrompts = [
    { label: "Mármore mancha na cozinha?", text: "Mármores Carrara ou Nero Marquina mancham facilmente ao entrarem em contato com limão ou óleo na cozinha? O que recomendam no lugar?" },
    { label: "O que é rebaixo italiano?", text: "Gostaria de entender melhor as técnicas de acabamento: o que é o rebaixo italiano e a canaleta seca em tampos de pia?" },
    { label: "Qual a melhor pedra bicolor?", text: "Estou em dúvida sobre cores contrastantes: quais quartzitos ou pedras exóticas combinam entre si para uma cozinha com ilhas centrais ricas?" },
    { label: "Durabilidade do Dekton", text: "Quais as principais vantagens e resistência a calor/panelas quentes das pedras artificiais sintetizadas como Dekton?" }
  ];

  // Helper parser for basic formatting in chat bubbles
  const parseMessageText = (text: string) => {
    // Replace **bold** with <strong> and \n with <br />
    const segments = text.split(/(\*\*.*?\*\*)/g);
    return segments.map((seg, idx) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return <strong key={idx} className="text-gold-200 font-bold">{seg.slice(2, -2)}</strong>;
      }
      return seg;
    });
  };

  return (
    <>
      {/* Floating Activator Toggle */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-tr from-gold-600 via-gold-500 to-amber-500 text-gray-950 h-14 w-14 rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all shadow-gold-500/25 border border-gold-300 group cursor-pointer"
        >
          {/* Inner mini circular texture reminiscent of the marble medallion logo */}
          <div className="absolute inset-1 rounded-full border border-gray-950/10 opacity-40 mix-blend-overlay bg-cover bg-center"
               style={{ backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0) 40%, #000 45%, rgba(0,0,0,0) 50%)" }} />
          <MessageSquare className="h-6 w-6 text-gray-950 group-hover:rotate-6 transition-transform" />
          <span className="absolute right-full mr-3 bg-gray-950 text-gold-400 text-[10px] font-bold tracking-widest uppercase border border-gold-500/30 rounded-lg px-2.5 py-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
            Consultar Mestre Aurélio
          </span>
        </button>
      )}

      {/* Slide-out Sidebar Chatbox Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-slate-950 border-l border-gray-900 shadow-2xl hover:shadow-gold-950/5 flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-950 to-gray-900 border-b border-gray-900 p-4 shrink-0 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Miniature circular marble logo representative of Mestre Aurélio */}
            <div className="relative h-10 w-10 rounded-full border border-gold-400/80 bg-gray-950 shrink-0 flex items-center justify-center">
              <div className="absolute inset-0.5 rounded-full border border-gray-800" style={{ background: "linear-gradient(135deg, #111 0%, #17171e 100%)" }} />
              <Hammer className="h-4 w-4 text-gold-400 z-10" />
            </div>
            <div>
              <p className="font-display font-semibold text-sm text-white flex items-center gap-1.5">
                <span>Mestre Aurélio</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </p>
              <p className="text-[10px] text-gold-400 font-sans uppercase tracking-widest font-semibold">Consultor Marmorista Chefe</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-450 hover:text-white rounded-lg hover:bg-gray-900/50 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Message Log Canvas */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto bg-slate-950 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2.5 ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.role !== "user" && (
                <div className="h-7 w-7 rounded-full border border-gold-500/30 bg-gray-900 shrink-0 flex items-center justify-center text-[10px] text-gold-400 mt-1 uppercase font-bold tracking-tighter">
                  A
                </div>
              )}
              <div className="flex flex-col max-w-[80%]">
                <div
                  className={`rounded-2xl p-4 text-xs leading-relaxed border ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-gold-600 to-gold-500 text-gray-950 border-gold-400 rounded-tr-none font-medium"
                      : "bg-gray-900/80 text-gray-300 border-gray-850 rounded-tl-none"
                  }`}
                >
                  <p className="whitespace-pre-line">{parseMessageText(message.content)}</p>
                </div>
                <span
                  className={`text-[9px] text-gray-650 mt-1 font-mono ${
                    message.role === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {message.timestamp}
                </span>
              </div>
              {message.role === "user" && (
                <div className="h-7 w-7 rounded-full bg-gold-400/10 border border-gold-500/20 text-gold-400 shrink-0 flex items-center justify-center text-[10px] mt-1 font-semibold uppercase">
                  U
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start gap-2.5 justify-start">
              <div className="h-7 w-7 rounded-full border border-gold-500/20 bg-gray-900 shrink-0 flex items-center justify-center text-[10px] text-gold-400 mt-1 font-semibold uppercase">
                A
              </div>
              <div className="bg-gray-900 p-4 rounded-2xl rounded-tl-none border border-gray-850 flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400/80">Aurélio está digitando</span>
                <div className="flex space-x-1">
                  <span className="w-1 bg-gold-500 h-1.5 rounded-full animate-bounce" />
                  <span className="w-1 bg-gold-500 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1 bg-gold-500 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}

          {/* Error Text Alert */}
          {errorText && (
            <div className="p-3.5 bg-red-950/20 border border-red-500/20 rounded-xl text-red-400 text-[11px] leading-snug">
              {errorText}
            </div>
          )}

          {/* Quick Prompts Suggestions (Show only when log is short and no typing active) */}
          {messages.length <= 2 && !isTyping && (
            <div className="pt-4 border-t border-gray-900 mt-6">
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-2.5">Perguntas Comuns dos Clientes:</p>
              <div className="space-y-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.text)}
                    className="block w-full text-left bg-gray-950 border border-gray-900 hover:border-gold-500/30 hover:bg-gray-900/40 p-2.5 rounded-xl text-[11px] text-gray-400 hover:text-white transition-all text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    • {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Footer */}
        <div className="p-4 bg-gray-950 border-t border-gray-900 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Perguntar sobre corte, bordas, materiais..."
              className="flex-1 bg-gray-900 border border-gray-800 text-xs text-white rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
            />
            <button
              type="submit"
              className="shrink-0 h-10 w-10 rounded-xl bg-gradient-to-tr from-gold-600 to-gold-400 text-gray-950 hover:bg-gold-300 transition-colors flex items-center justify-center cursor-pointer disabled:opacity-30"
              disabled={!inputValue.trim()}
            >
              <Send className="h-4 w-4 text-gray-950" />
            </button>
          </form>
          <p className="text-[9px] text-gray-600 text-center mt-2.5">
            Corte Fino Design Assistant • Respostas imediatas baseadas em mineralogia
          </p>
        </div>

      </div>
    </>
  );
}
