import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseReady } from "../utils/supabase";
import { MOCK_AUTH } from "../utils/featureFlags";

type Role = "admin" | "client";
type AppUser = { id: string; email: string; role: Role };

type AuthContextValue = {
  user: AppUser | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getIdToken: () => Promise<string | null>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const MOCK_STORAGE_KEY = "mock_user";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  // On load, either attach to Supabase session or use mock storage
  useEffect(() => {
    (async () => {
      if (MOCK_AUTH || !isSupabaseReady) {
        const raw = localStorage.getItem(MOCK_STORAGE_KEY);
        if (raw) setUser(JSON.parse(raw));
        setLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      applySession(data.session);
      setLoading(false);

      const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
        applySession(session);
      });
      return () => sub.subscription.unsubscribe();
    })();
  }, []);

  function applySession(session: Awaited<ReturnType<typeof supabase.auth.getSession>>["data"]["session"]) {
    if (!session?.user) {
      setUser(null);
      return;
    }
    const role = (session.user.user_metadata?.role as Role) || "client";
    setUser({ id: session.user.id, email: session.user.email ?? "", role });
  }

  const loginWithEmail = async (email: string, password: string) => {
    // MOCK path
    if (MOCK_AUTH || !isSupabaseReady) {
      // ⚠️ Dev-only: accept anything and set role based on email
      const mock: AppUser = {
        id: "mock-" + Math.random().toString(36).slice(2),
        email,
        role: email.toLowerCase().includes("admin") ? "admin" : "client",
      };
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(mock));
      setUser(mock);
      return;
    }

    // REAL Supabase path
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const logout = async () => {
    if (MOCK_AUTH || !isSupabaseReady) {
      localStorage.removeItem(MOCK_STORAGE_KEY);
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setUser(null);
  };

  const getIdToken = async () => {
    if (MOCK_AUTH || !isSupabaseReady) return null; // no backend token in mock mode
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  };

  const value = useMemo(() => ({ user, loading, loginWithEmail, logout, getIdToken }), [user, loading]);
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
