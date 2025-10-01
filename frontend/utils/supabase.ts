import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Utility function to grab env vars safely
function getEnvVar(keys: string[]): string | undefined {
  for (const key of keys) {
    // Handles Vite, Next.js, Node, Encore injected vars
    if (typeof process !== "undefined" && (process as any).env?.[key]) {
      return (process as any).env[key];
    }
    if (typeof import.meta !== "undefined" && (import.meta as any).env?.[key]) {
      return (import.meta as any).env[key];
    }
    if (typeof window !== "undefined" && (window as any).__ENV?.[key]) {
      return (window as any).__ENV[key];
    }
  }
  return undefined;
}

// ---- RESOLVE URL ----
const SUPABASE_URL =
  getEnvVar([
    "NEXT_PUBLIC_SUPABASE_URL", // Next.js public
    "VITE_SUPABASE_URL",        // Vite public
    "SUPABASE_URL",             // Generic fallback
  ]) || "";

// ---- RESOLVE ANON KEY ----
const SUPABASE_ANON_KEY =
  getEnvVar([
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "VITE_SUPABASE_ANON_KEY",
    "SUPABASE_ANON_KEY",
  ]) || "";

// Export checker
export const isSupabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create Supabase client only if env vars are present
let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      throw new Error("❌ Missing Supabase environment variables!");
    }
    _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

// Export a proxy that lazily initializes the client
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient];
  },
});


