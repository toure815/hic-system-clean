import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Read envs the Vite way first, then gracefully fall back
 * to older names in case some code still references them.
 */
const viteEnv = (import.meta as any).env ?? {};
const SUPABASE_URL: string | undefined =
  viteEnv.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL : undefined) ||
  (typeof process !== "undefined" ? (process as any).env?.SUPABASE_URL : undefined);

const SUPABASE_ANON_KEY: string | undefined =
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) ||
  (typeof process !== "undefined" ? (process as any).env?.SUPABASE_ANON_KEY : undefined);

if (!SUPABASE_URL) {
  throw new Error("Supabase env not configured: missing VITE_SUPABASE_URL (or fallback).");
}
if (!SUPABASE_ANON_KEY) {
  throw new Error("Supabase env not configured: missing VITE_SUPABASE_ANON_KEY (or fallback).");
}

export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
