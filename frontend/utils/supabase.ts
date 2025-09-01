import { createClient } from "@supabase/supabase-js";

// Prefer Vite envs; fall back to Next-style if present.
const viteEnv = (import.meta as any).env || {};
const supabaseUrl =
  viteEnv.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL : undefined);

const supabaseAnonKey =
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined);

// Helpful debug if something is still missing (doesn't print actual keys)
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase env missing", {
    VITE_SUPABASE_URL: !!viteEnv.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: (viteEnv.VITE_SUPABASE_ANON_KEY || "").length,
    NEXT_PUBLIC_SUPABASE_URL: !!(typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      ((typeof process !== "undefined" && (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) || "").length,
  });
  throw new Error("Missing Supabase envs. Set VITE_* (for Vite) or NEXT_PUBLIC_* (for Next).");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
