import { GoogleGenAI } from '@google/genai';

const MAX_PROMPT_LENGTH = 4_000;

function sendJson(res: any, status: number, payload: unknown) {
  res.status(status).setHeader('Content-Type', 'application/json; charset=utf-8').json(payload);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return sendJson(res, 503, { error: 'AI service is not configured.' });

  const prompt = typeof req.body?.prompt === 'string' ? req.body.prompt.trim() : '';
  if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
    return sendJson(res, 400, { error: 'A prompt between 1 and 4000 characters is required.' });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: 'You are the secure digital assistant of the Directorate of Tourism and Handicrafts of El Oued Province. Answer accurately, respectfully, and never invent official procedures, dates, fees, or contact details. If information is not available, say so and direct the citizen to the official digital services desk.',
        temperature: 0.2,
        maxOutputTokens: 700,
      },
    });
    return sendJson(res, 200, { text: response.text ?? '' });
  } catch (error) {
    console.error('Gemini request failed', error);
    return sendJson(res, 502, { error: 'The AI service is temporarily unavailable.' });
  }
}
