import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { supabaseUrl as configUrl, supabaseAnonKey as configKey } from "../config";

// Read Vite envs first; fall back to Next-style if present, then to config fallbacks
const viteEnv = (import.meta as any).env ?? {};

const SUPABASE_URL: string =
  viteEnv.VITE_SUPABASE_URL ||
  (typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_URL
    : undefined) ||
  configUrl;

const SUPABASE_ANON_KEY: string =
  viteEnv.VITE_SUPABASE_ANON_KEY ||
  (typeof process !== "undefined"
    ? (process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : undefined) ||
  configKey;

// Log debug info but don't throw during module load
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Supabase env missing", {
    VITE_SUPABASE_URL: !!viteEnv.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: !!viteEnv.VITE_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SUPABASE_URL:
      typeof process !== "undefined" &&
      !!(process as any).env?.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      typeof process !== "undefined" &&
      !!(process as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    configUrl: !!configUrl,
    configKey: !!configKey,
    finalUrl: !!SUPABASE_URL,
    finalKey: !!SUPABASE_ANON_KEY,
  });
}

let _client: SupabaseClient | null = null;

/** Call this where you need Supabase (login, etc.). */
export function getSupabase(): SupabaseClient {
  if (_client) return _client;
  
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Now we can fail with a clear error only when actually used
    throw new Error(
      "Supabase env not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or NEXT_PUBLIC_*). " +
      `Current values: URL=${!!SUPABASE_URL}, KEY=${!!SUPABASE_ANON_KEY}`
    );
  }
  
  _client = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _client;
}

// For backward compatibility, export a default client that uses the lazy getter
export const supabase = {
  get auth() { return getSupabase().auth; },
  get from() { return getSupabase().from; },
  get storage() { return getSupabase().storage; },
  get functions() { return getSupabase().functions; },
  get channel() { return getSupabase().channel; },
  get realtime() { return getSupabase().realtime; },
};
