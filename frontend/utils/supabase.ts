import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Read Vite first; if not present, fall back to NEXT_PUBLIC_*.
// Do NOT fall back to localhost, and do NOT throw (white screens).
const env = (import.meta as any).env ?? {};
const SUPABASE_URL: string | undefined =
  (env.VITE_SUPABASE_URL as string | undefined)?.trim() ||
  (env.NEXT_PUBLIC_SUPABASE_URL as string | undefined)?.trim();

const SUPABASE_ANON_KEY: string | undefined =
  (env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim() ||
  (env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined)?.trim();

// Expose a tiny debug payload you can check in the browser console
(window as any).__ENV = {
  supabaseUrl: SUPABASE_URL ?? null,
  anonKeyLen: SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.length : 0,
};

// Create the client. If envs are missing, calls will fail clearly,
// but the app will still render (no blank page).
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY ?? ""
);
