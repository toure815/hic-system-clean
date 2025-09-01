import { useAuth } from "../contexts/AuthContext";
import backend from "~backend/client";

// Returns the backend client configured with authentication.
export function useBackend() {
  const { user } = useAuth();
  
  if (!user) {
    return backend;
  }

  return backend.with({
    auth: async () => {
      const { data: { session } } = await import("../lib/supabase").then(m => m.supabase.auth.getSession());
      if (!session?.access_token) {
        throw new Error("No valid session");
      }
      return { authorization: `Bearer ${session.access_token}` };
    }
  });
}
