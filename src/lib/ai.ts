import { supabase } from './supabase';

export async function askTourismAssistant(prompt: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('tourism-assistant', {
    body: { prompt },
  });
  if (error) throw new Error(error.message || 'خدمة المساعد غير متاحة مؤقتاً.');
  return String((data as { text?: string } | null)?.text || '');
}
