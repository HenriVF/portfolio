import { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './authContext';
import { getSupabase } from '../services/supabaseClient';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe;

    getSupabase()
      .then(async (supabase) => {
        const { data } = await supabase.auth.getSession();
        if (!active) return;
        setUser(data.session?.user ?? null);
        setLoading(false);
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) =>
          setUser(session?.user ?? null),
        );
        unsubscribe = () => listener.subscription.unsubscribe();
      })
      .catch(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const signIn = useCallback(async (email, password) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error('E-mail ou senha incorretos.');
  }, []);

  const signOut = useCallback(async () => {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
