import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Try to load Supabase environment variables from both Vite and Next.js styles.
 * This way it works whether you're deploying with Vite (import.meta.env) or Next (process.env).
 */

// ✅ 1. Handle Vite style (works in your current frontend)
const VITE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const VITE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// ✅ 2. Handle Next.js style (fallback if used elsewhere in backend or preview)
const NEXT_URL =
  typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL
    : undefined;

const NEXT_KEY =
  typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : undefined;

// ✅ 3. Pick whichever exists (prefer Vite if available)
const SUPABASE_URL = VITE_URL || NEXT_URL;
const SUPABASE_ANON_KEY = VITE_KEY || NEXT_KEY;

// ✅ 4. Debug log (safe masking of key)
console.log("🚀 Supabase ENV in use:", {
  VITE_URL,
  NEXT_URL,
  FINAL_URL: SUPABASE_URL,
  FINAL_KEY_EXISTS: SUPABASE_ANON_KEY ? "✅ yes" : "❌ missing",
});

// ✅ 5. Throw if nothing is set (no mock fallback anymore)
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error("❌ Missing Supabase environment variables!");
}

// ✅ 6. Export client and ready flag
export const isSupabaseReady = !!(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);


