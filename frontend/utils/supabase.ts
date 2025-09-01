import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// Add runtime validation for environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  // This will show up in the browser console
  console.error("Supabase env missing", {
    urlPresent: !!supabaseUrl,
    keyLen: supabaseAnonKey?.length ?? 0,
  });
  throw new Error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
