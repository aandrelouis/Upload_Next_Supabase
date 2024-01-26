import { createClient } from '@supabase/supabase-js'

const options = {
    db: {
        schema: 'public',
    },
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
    global: {
        headers: { 'x-my-custom-header': 'eticode' },
    },
}


export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_KEY!,
    options
)

let currentAccessToken: any = null;

// Atualiza o token de acesso sempre que o estado da autenticação muda
supabase.auth.onAuthStateChange((event, session) => {
  currentAccessToken = session?.access_token ?? null;
});

export const getAccessToken = async () => {
    if(currentAccessToken) return currentAccessToken;
    const session = await supabase.auth.getSession();
    currentAccessToken = session?.data?.session?.access_token ?? null;
    return currentAccessToken;
};