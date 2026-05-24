import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize GoogleGenAI
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined");
}

// API Routes
app.post("/api/consulta", async (req, res) => {
  const { ambiente, material, comprimento, largura, acabamento, observacoes } = req.body;

  if (!ai) {
    return res.status(500).json({
      error: "O serviço de IA não está de fato configurado. Por favor, adicione sua chave de API nos Segredos do aplicativo.",
    });
  }

  const prompt = `
    Como um experiente Mestre Marmorista e Consultor Arquitetônico Especialista da MARMORARIA CORTE FINO, analise este projeto de corte e acabamento e forneça um parecer técnico requintado em markdown.
    
    Detalhes do Projeto Fornecidos:
    - Ambiente de Instalação: ${ambiente === "kitchen" ? "Cozinha / Área Gourmet" : ambiente === "bath" ? "Banheiro / Lavatório" : ambiente === "floor" ? "Pisos / Revestimentos" : ambiente === "table" ? "Mesa / Tampo de Móvel" : "Projeto Personalizado"}
    - Categoria de Material Desejado: ${material === "marble" ? "Mármore (Rocha Natural Nobre)" : material === "granite" ? "Granito (Alta Resistência / Rocha Natural)" : "Superfície Sintética / Quartzo Prime"}
    - Dimensões planejadas: Comprimento: ${comprimento} metros, Largura: ${largura} metros (Área aproximada de corte: ${(comprimento * largura).toFixed(2)} m²)
    - Acabamento de Borda: ${acabamento === "mitre" ? "Meia-Esquadria 45° (Borda Japonesa Invisível)" : acabamento === "bevel" ? "Chanfrado / Bisotado 1/4" : "Polido Reto / Tradicional Maciço"}
    - Necessidades especiais descritas pelo cliente: "${observacoes || "Nenhuma observação informada."}"

    Por favor, estruture sua resposta com seções requintadas, amigáveis e super informativas em markdown (em Português):
    
    ### 📐 1. Parecer de Viabilidade Técnica
    (Avalie se o material escolhido é recomendado para este ambiente. Alerte de forma sofisticada sobre cuidados contra riscos ou manchas de limão/óleo se for mármore na cozinha, indicando quartzito natural como alternativa. Explique como a área informada se comporta tecnicamente.)

    ### 💎 2. Pedras Selecionadas pelo Especialista
    (Sugira especificamente de 2 a 3 materiais da nossa coleção Corte Fino para este caso, ex: Calacatta Gold Premium, Quartzito Taj Mahal, Preto Absoluto escovado, Verde Alpi Imperial, Quartzo Intense White, Travertino Romano, etc. Detalhe a estética, durabilidade e o efeito de iluminação de cada uma.)

    ### ✂ Rol de Instalação, Cuba & Bordas (${acabamento === "mitre" ? "Meia-Esquadria 45°" : acabamento === "bevel" ? "Chanfrado" : "Reto"})
    (Discorra sobre como o acabamento escolhido valoriza o volume final da bancada. Enfatize se combina com cuba esculpida no próprio bloco ou rebaixo italiano para áreas secas e molhadas.)

    ### 🧴 4. Guia de Conservação & Longevidade
    (Prescreva conselhos práticos de limpeza para que a rocha mantenha o polimento intocado para sempre. Mencione a importância da impermeabilização inicial feita por nós no showroom.)
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("Erro na API da Gemini:", error);
    res.status(500).json({ error: "Erro ao processar consultoria técnica: " + error.message });
  }
});

app.post("/api/chatbot", async (req, res) => {
  const { messages } = req.body;

  if (!ai) {
    return res.status(500).json({
      error: "O consultor de IA não está de fato configurado. Por favor, insira sua chave de API nos Segredos do aplicativo.",
    });
  }

  try {
    const systemInstruction = `
      Você é o "Mestre Aurélio", o Consultor Chefe de Estilo e Engenharia de Rochas da Marmoraria Corte Fino.
      Sua missão é encantar o cliente que está arquitetando ou reformando sua casa. Responda em Português do Brasil com excelente polidez, atenção aos mínimos detalhes e requinte.
      
      Conhecimento Essencial de Assinatura:
      - Mármores tradicionais (Carrara, Crema Marfil, Nero Marquina): Magníficos para lavatórios, banheiros, lareiras e revestimentos elegantes. Explicar com delicadeza profissional que exigem muito respeito na cozinha por causa da porosidade frente a ácidos cotidianos.
      - Quartzitos Naturais (Taj Mahal, Mont Blanc, Michelangelo): As jóias da coroa. Combinam a beleza luxuosa dos mármores com a altíssima resistência do granito. Ideais para cozinhas de uso intenso e áreas gourmet.
      - Superfícies Sintéticas de Ultra-compactação (Dekton, Laminam, Lâminas de Porcelanato): Resistentes a fogo direto, raios ultravioleta, riscos extremos. Excelentes para bancadas externas, churrasqueiras e alta gastronomia.
      - Acabamento Autoral Corte Fino: Destaque o corte de meia-esquadria de 45° milimétrico de altíssima precisão onde os veios da pedra se encontram com precisão poética, cubas esculpidas em pedra sabão ou mármore com ralo invisível, rebaixo italiano, canaletas secas usinadas diretamente com ferramentas diamantadas.
      
      Mantenha as respostas muito refinadas e fáceis de ler, utilizando listas e negrito para destacar as pedras recomendadas. Encoraje o agendamento de uma reunião virtual ou física para ver as amostras reais nos cavaletes do pátio de rochas.
    `;

    // Map client messages to Gemini contents structure
    const apiContents = messages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: apiContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text,
    });
  } catch (error: any) {
    console.error("Erro no Chatbot:", error);
    res.status(500).json({ error: "Erro no atendimento por IA: " + error.message });
  }
});

// Serve frontend assets
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Corte Fino running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
