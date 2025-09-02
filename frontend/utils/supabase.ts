import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const viteEnv = (import.meta as any).env ?? {};
const SUPABASE_URL: string | undefined =
  viteEnv.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL : undefined) ||
  (typeof process !== "undefined" ? (process as any).env?.SUPABASE_URL : undefined);

const SUPABASE_ANON_KEY: string | undefined =
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) ||
  (typeof process !== "undefined" ? (process as any).env?.SUPABASE_ANON_KEY : undefined);

// Instead of throwing (which kills the app), log it for debugging
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("⚠️ Supabase env not configured", {
    url: SUPABASE_URL,
    anonKeyLen: SUPABASE_ANON_KEY?.length ?? 0,
  });
}

// Always export a client, even if envs are broken, so the app doesn't crash
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL || "http://localhost:54321", // dummy fallback
  SUPABASE_ANON_KEY || "anon-key-placeholder"
);
