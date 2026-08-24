import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const allowedOrigins = (Deno.env.get('ALLOWED_ORIGINS') || 'https://nadjimlab.github.io,http://localhost:3000,http://localhost:4173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

function corsHeaders(request: Request) {
  const requestOrigin = request.headers.get('Origin') || '';
  return {
    'Access-Control-Allow-Origin': allowedOrigins.includes(requestOrigin) ? requestOrigin : allowedOrigins[0],
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

const MAX_PROMPT_LENGTH = 4_000;

function json(body: unknown, request: Request, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), 'Content-Type': 'application/json; charset=utf-8' },
  });
}

serve(async (request) => {
  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders(request) });
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, request, 405);

  const apiKey = Deno.env.get('GEMINI_API_KEY');
  if (!apiKey) return json({ error: 'AI service is not configured.' }, request, 503);

  let payload: { prompt?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid JSON body.' }, request, 400);
  }

  const prompt = typeof payload.prompt === 'string' ? payload.prompt.trim() : '';
  if (!prompt || prompt.length > MAX_PROMPT_LENGTH) {
    return json({ error: 'A prompt between 1 and 4000 characters is required.' }, request, 400);
  }

  try {
    const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${Deno.env.get('GEMINI_MODEL') || 'gemini-2.5-flash'}:generateContent?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: 'You are the secure digital assistant of the Directorate of Tourism and Handicrafts of El Oued Province. Answer accurately, respectfully, and never invent official procedures, dates, fees, or contact details. If information is unavailable, say so and direct the citizen to the official digital services desk.' }],
        },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 700 },
      }),
    });

    const result = await upstream.json();
    if (!upstream.ok) {
      console.error('Gemini upstream error', result);
      return json({ error: 'The AI service is temporarily unavailable.' }, request, 502);
    }

    const text = result.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text || '').join('') || '';
    return json({ text }, request);
  } catch (error) {
    console.error('Gemini request failed', error);
    return json({ error: 'The AI service is temporarily unavailable.' }, request, 502);
  }
});
