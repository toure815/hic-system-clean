import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Debug log (will only show in browser console, not backend logs)
console.log("Supabase Env Debug:", {
  urlPresent: !!supabaseUrl,
  anonKeyLength: supabaseAnonKey?.length || 0,
});

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase env not configured. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
