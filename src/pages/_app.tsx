import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionContextProvider, SupabaseClient } from '@supabase/auth-helpers-react'
import { supabase } from '@/lib/initSupabase'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionContextProvider supabaseClient={supabase as SupabaseClient}>
      <Component {...pageProps} />
    </SessionContextProvider>
  )
}
