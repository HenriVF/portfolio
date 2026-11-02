import { getSupabase } from './supabaseClient';

export async function listMessages() {
  const supabase = await getSupabase();
  const { data, error } = await supabase
    .from('messages')
    .select('id, name, email, message, replied, created_at')
    .order('created_at', { ascending: false });
  if (error) throw new Error('Não foi possível carregar as mensagens.');
  return data;
}

export async function setReplied(id, replied) {
  const supabase = await getSupabase();
  const { error } = await supabase.from('messages').update({ replied }).eq('id', id);
  if (error) throw new Error('Não foi possível atualizar a mensagem.');
}
