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

// Debug log to confirm what is being picked up
console.log("🚀 Supabase ENV in use:", {
  NEXT_URL: getEnvVar(["NEXT_PUBLIC_SUPABASE_URL"]),
  VITE_URL: getEnvVar(["VITE_SUPABASE_URL"]),
  RAW_URL: SUPABASE_URL,
  NEXT_KEY: getEnvVar(["NEXT_PUBLIC_SUPABASE_ANON_KEY"])?.slice(0, 6) + "...",
  VITE_KEY: getEnvVar(["VITE_SUPABASE_ANON_KEY"])?.slice(0, 6) + "...",
  RAW_KEY_LEN: SUPABASE_ANON_KEY.length,
});

// Expose env vars in browser console for quick debugging
if (typeof window !== "undefined") {
  (window as any).__ENV = {
    NEXT_PUBLIC_SUPABASE_URL: SUPABASE_URL || null,
    NEXT_PUBLIC_SUPABASE_ANON_KEY_LEN: SUPABASE_ANON_KEY
      ? SUPABASE_ANON_KEY.length
      : 0,
  };
}

// Hard fail if missing
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("❌ Missing Supabase environment variables!");
}

// Export checker
export const isSupabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

// Create Supabase client
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


