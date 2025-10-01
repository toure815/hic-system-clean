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

// 🔎 Debug: log to verify which env vars are being picked up
console.log("🔎 Supabase ENV in use:", {
  VITE_URL: (import.meta as any).env?.VITE_SUPABASE_URL,
  VITE_KEY: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY,
  NEXT_URL: SUPABASE_URL,
  NEXT_KEY: SUPABASE_ANON_KEY,
});

// Expose for quick browser check
(typeof window !== "undefined" ? (window as any) : {}).__ENV = {
  NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL ?? null,
  NEXT_PUBLIC_SUPABASE_ANON_KEY_LEN: SUPABASE_ANON_KEY
    ? SUPABASE_ANON_KEY.length
    : 0,
};

// Check if Supabase is properly configured
export const isSupabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create the client even if not ready (for mock mode compatibility)
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL || "http://localhost:54321",
  SUPABASE_ANON_KEY || "fake-anon-key"
);

