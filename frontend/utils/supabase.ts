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
    "VITE_SUPABASE_URL",        // Vite public
    "NEXT_PUBLIC_SUPABASE_URL", // Next.js public
    "SUPABASE_URL",             // Generic fallback
  ]) || "";

// ---- RESOLVE ANON KEY ----
const SUPABASE_ANON_KEY =
  getEnvVar([
    "VITE_SUPABASE_ANON_KEY",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_ANON_KEY",
  ]) || "";

// 🔍 Debug log for staging
console.log("🔍 ENV DEBUG (staging)", {
  VITE_SUPABASE_URL: import.meta.env?.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env?.VITE_SUPABASE_ANON_KEY
    ? "(set)"
    : "(missing)",
  NEXT_PUBLIC_SUPABASE_URL: process.env?.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ? "(set)"
    : "(missing)",
  SUPABASE_URL: process.env?.SUPABASE_URL,
  SUPABASE_ANON_KEY: process.env?.SUPABASE_ANON_KEY ? "(set)" : "(missing)",
});

// ✅ Explicit export so AuthContext.tsx can use it
export const isSupabaseReady: boolean = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Lazy client instance
let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
      console.warn("⚠️ Supabase env vars missing. Using fallback.");
      throw new Error("❌ Missing Supabase environment variables!");
    }
    _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }
  return _supabase;
}

// Proxy wrapper
export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as any)[prop];
  },
});


