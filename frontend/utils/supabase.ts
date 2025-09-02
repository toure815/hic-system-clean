import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ✅ Read ONLY the Vite envs that you configured in Leap
const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined)?.trim();

// 👀 Expose what the app actually got so we can verify in the browser Console
(window as any).__ENV = {
  VITE_SUPABASE_URL: SUPABASE_URL ?? null,
  VITE_SUPABASE_ANON_KEY_LEN: SUPABASE_ANON_KEY ? SUPABASE_ANON_KEY.length : 0,
};

// ⚠️ Do NOT fall back to localhost. If these are missing, we want it obvious.
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("⚠️ Supabase env not configured", (window as any).__ENV);
}

// Create the client (will error later if envs are missing, but app still renders)
export const supabase: SupabaseClient = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY ?? ""
);
