import { useAuth } from "../contexts/AuthContext";
import backend from "~backend/client";

// Returns the backend client configured with authentication.
export function useBackend() {
  const { user, getIdToken } = useAuth();
  
  if (!user) {
    return backend;
  }

  return backend.with({
    auth: async () => {
      const token = await getIdToken();
      if (!token) {
        throw new Error("No valid session");
      }
      return { authorization: `Bearer ${token}` };
    }
  });
}
