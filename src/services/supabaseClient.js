const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

let clientPromise;

// O supabase-js só é baixado quando alguma tela precisa dele (fora do pacote inicial).
export function getSupabase() {
  if (!url || !key) {
    return Promise.reject(
      new Error('Serviço indisponível: o Supabase não está configurado.'),
    );
  }
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(url, key),
    );
  }
  return clientPromise;
}
