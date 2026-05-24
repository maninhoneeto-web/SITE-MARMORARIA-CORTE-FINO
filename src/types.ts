export interface Stone {
  id: string;
  name: string;
  category: "marble" | "granite" | "quartzite" | "sintetico";
  description: string;
  origin: string;
  color: string;
  pattern: string;
  durability: number; // 1-10 scale
  stainResistance: number; // 1-10 scale
  pricePerMeter: number; // Price in BRL
  bgStyle: string; // CSS style or color/gradient simulation for preview
  textClass: string; // Text styling (e.g. text-white or text-gray-900)
  isBestSeller?: boolean;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface BudgetEstimateInput {
  ambiente: string;
  material: string;
  comprimento: number;
  largura: number;
  acabamento: string;
  observacoes: string;
}

export interface BudgetResult {
  estimatedArea: number;
  baseMaterialPrice: number;
  finishingPrice: number;
  totalEstimated: number;
  consultationText?: string;
}
