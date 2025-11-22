import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY is not defined in environment variables");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generatePlanetFact = async (planetName: string): Promise<string> => {
  try {
    const ai = getAIClient();
    const prompt = `Generate a fascinating, less-commonly known fact about the planet ${planetName}. Keep it under 2 sentences. Tone: Scientific yet awe-inspiring.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not retrieve planetary data at this moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to contact the Galactic Archives (API Error).";
  }
};

export const askPlanetQuestion = async (planetName: string, question: string): Promise<string> => {
    try {
      const ai = getAIClient();
      const prompt = `Context: You are an expert astronomer educating a user about the solar system. The user is asking about ${planetName}.
      Question: ${question}
      Answer concisely (max 3 sentences) and accurately.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
  
      return response.text || "No data available.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "I cannot answer that right now.";
    }
  };