import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../utils/supabase";

type Role = "admin" | "client";

type AppUser = {
  id: string;
  email: string;
  role: Role;
};

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  /** Returns the Supabase access token for backend calls */
  getIdToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Read the current session on load
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      applySession(data.session);
      setLoading(false);
    })();

    // Listen to future auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      applySession(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  function applySession(session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) {
    if (!session?.user) {
      setUser(null);
      return;
    }
    // You can attach roles via user metadata in Supabase. Fallback to "client".
    const role = (session.user.user_metadata?.role as Role) || "client";
    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      role,
    });
  }

  const loginWithEmail = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    // onAuthStateChange will update context
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const getIdToken = async () => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const value = useMemo(
    () => ({ user, loading, loginWithEmail, logout, getIdToken }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

// Legacy exports for compatibility
export type UserRole = Role;
export { type AppUser as AuthUser };
