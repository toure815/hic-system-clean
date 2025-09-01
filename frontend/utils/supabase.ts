import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/** Reads env at call-time, works with Vite or Next. */
function readEnv() {
  // Vite (Preview/Builder) exposes import.meta.env
  const viteEnv = (typeof import.meta !== "undefined" && (import.meta as any).env) || {};
  // Next/Node fallback (just in case)
  const nodeEnv = (typeof process !== "undefined" && process.env) || {};

  const url =
    viteEnv.VITE_SUPABASE_URL ||
    nodeEnv.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    viteEnv.VITE_SUPABASE_ANON_KEY ||
    nodeEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return { url, key };
}

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (client) return client;

  const { url, key } = readEnv();

  if (!url || !key) {
    // Log *which* one is missing to the console to avoid a blank page
    console.error("Supabase env missing", {
      hasUrl: !!url,
      hasKey: !!key,
      viteSeen: typeof import.meta !== "undefined",
    });
    throw new Error("Supabase env not configured. Set VITE_* or NEXT_PUBLIC_*.");
  }

  client = createClient(url, key);
  return client;
}
