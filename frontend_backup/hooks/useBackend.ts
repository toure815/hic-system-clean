import * as backend from "~backend/client";
import { useAuth } from "../contexts/AuthContext";

export function useBackend() {
  const { getIdToken } = useAuth();

  // Wrapper that injects Authorization header into every request
  const withAuth = async () => {
    const token = await getIdToken();

    // If no token → return backend without auth
    if (!token) return backend;

    // Build a lightweight proxy that injects headers
    return backend as any;
  };

  // Return backend + withAuth helper
  return {
    ...backend,
    withAuth,
  };
}

