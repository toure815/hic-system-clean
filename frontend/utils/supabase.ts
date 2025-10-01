import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Read env vars (support both NEXT_PUBLIC_* and fallback SUPABASE_*)
const SUPABASE_URL =
  (typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL ||
      (process as any).env?.SUPABASE_URL
    : undefined) as string | undefined;

const SUPABASE_ANON_KEY =
  (typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
      (process as any).env?.SUPABASE_ANON_KEY
    : undefined) as string | undefined;

// Debug log to verify what’s actually being used
console.log("🚀 Supabase ENV in use:", {
  NEXT_URL: (process as any).env?.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_KEY: (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  FALLBACK_URL: (process as any).env?.SUPABASE_URL,
  FALLBACK_KEY: (process as any).env?.SUPABASE_ANON_KEY,
  FINAL_URL: SUPABASE_URL,
  FINAL_KEY_EXISTS: !!SUPABASE_ANON_KEY,
});

// Expose for quick browser check (Console -> window.__ENV)
(typeof window !== "undefined" ? (window as any) : {}).__ENV = {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL ?? null,
  NEXT_PUBLIC_SUPABASE_ANON_KEY_LEN: SUPABASE_ANON_KEY
    ? SUPABASE_ANON_KEY.length
    : 0,
};

// Require real values (fail fast if missing)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("❌ Missing Supabase environment variables!");
}

// Export readiness flag
export const isSupabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create Supabase client
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

