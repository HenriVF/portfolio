import { getSupabase } from './supabaseClient';

export async function listFeatured() {
  const supabase = await getSupabase();
  const { data, error } = await supabase.from('featured_projects').select('repo_name');
  if (error) throw new Error('Não foi possível carregar os destaques.');
  return data.map((row) => row.repo_name);
}

export async function setFeatured(repoName, featured) {
  const supabase = await getSupabase();
  const query = featured
    ? supabase.from('featured_projects').insert({ repo_name: repoName })
    : supabase.from('featured_projects').delete().eq('repo_name', repoName);
  const { error } = await query;
  if (error) throw new Error('Não foi possível atualizar o destaque.');
}
