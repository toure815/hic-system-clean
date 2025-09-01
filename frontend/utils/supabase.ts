import { createClient } from "@supabase/supabase-js";

// Support both Vite and Next style envs so we never get stuck
const viteEnv = (import.meta as any)?.env || {};
const supabaseUrl =
  viteEnv.VITE_SUPABASE_URL ||
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_URL : "");

const supabaseAnonKey =
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : "");

// Guard + helpful console output
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase env missing", {
    urlPresent: !!supabaseUrl,
    keyLen: supabaseAnonKey?.length ?? 0,
    using: {
      VITE_SUPABASE_URL: !!viteEnv.VITE_SUPABASE_URL,
      VITE_SUPABASE_ANON_KEY: !!viteEnv.VITE_SUPABASE_ANON_KEY,
      NEXT_PUBLIC_SUPABASE_URL:
        typeof process !== "undefined" ? !!process.env.NEXT_PUBLIC_SUPABASE_URL : false,
      NEXT_PUBLIC_SUPABASE_ANON_KEY:
        typeof process !== "undefined" ? !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : false,
    },
  });
  throw new Error("Missing VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_*)");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
