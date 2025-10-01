import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Read what the Preview runtime injects
const SUPABASE_URL =
  (typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL
    : undefined) as string | undefined;

const SUPABASE_ANON_KEY =
  (typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : undefined) as string | undefined;

// Debug log to verify which env vars are being picked up
console.log("🚀 Supabase ENV in use:", {
  NEXT_URL: SUPABASE_URL,
  NEXT_KEY: SUPABASE_ANON_KEY,
});

// Expose for quick browser check (Console -> type window.__ENV)
(typeof window !== "undefined" ? (window as any) : {}).__ENV = {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL ?? null,
  NEXT_PUBLIC_SUPABASE_ANON_KEY_LEN: SUPABASE_ANON_KEY
    ? SUPABASE_ANON_KEY.length
    : 0,
};

// Require real values (no mock fallback)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("❌ Missing Supabase environment variables!");
}

// Check if Supabase is properly configured
export const isSupabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create the real Supabase client
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
