import { createClient, SupabaseClient } from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

/**
 * Get a Supabase client, or null if env vars are missing.
 * This prevents crashing at module load time.
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (supabase) return supabase;

  const supabaseUrl =
    import.meta.env.VITE_SUPABASE_URL ||
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL;

  const supabaseAnonKey =
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY;

  console.log("🚀 Supabase ENV in use:", {
    url: supabaseUrl ? "✅ set" : "❌ missing",
    key: supabaseAnonKey ? "✅ set" : "❌ missing",
  });

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "⚠️ Missing Supabase environment variables. Falling back to MOCK_AUTH mode."
    );
    return null; // don’t throw, let app use fallback
  }

  supabase = createClient(supabaseUrl, supabaseAnonKey);
  return supabase;
}



