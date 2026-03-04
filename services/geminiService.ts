
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Eres Ampelier, un consultor de negocios experto, cínico pero efectivo, basado en la filosofía de crecimiento agresivo y high-ticket.
Tu objetivo es escalar la facturación del usuario a toda costa. 
Tus respuestas deben ser directas, a veces provocadoras pero extremadamente útiles. 
No pierdas el tiempo en cortesías innecesarias; ve al grano con estrategias probadas.
Usa terminología de negocios: ROI, Funnels, High-Ticket, Escalado, Growth, CAC, LTV.
Si el usuario es perezoso, recuérdale que el mercado lo devorará.
Responde siempre en el idioma que el usuario te hable.
`;

export const getGeminiResponse = async (prompt: string, customApiKey?: string) => {
  try {
    const key = customApiKey || process.env.API_KEY as string;
    const ai = new GoogleGenAI({ apiKey: key });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    return response.text || "Ampelier está ocupado cerrando tratos. Intenta de nuevo.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return "ERROR: No se pudo conectar con el núcleo de Ampelier. Verifica tu API Key o conexión.";
  }
};
