import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Session } from "@supabase/supabase-js";
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
    let unsub: (() => void) | undefined;

    (async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("getSession error:", error);
      applySession(data?.session ?? null);
      setLoading(false);

      // Listen to future auth changes
      const sub = supabase.auth.onAuthStateChange((_event, session) => {
        applySession(session);
      });

      // Normalized unsubscribe for v2
      unsub = () => sub.data?.subscription?.unsubscribe?.();
    })();

    return () => { unsub?.(); };
  }, []);

  function applySession(session: Session | null) {
    if (!session?.user) {
      setUser(null);
      return;
    }
    // Role from user metadata; default to "client"
    const role = (session.user.user_metadata?.role as Role) || "client";
    setUser({
      id: session.user.id,
      email: session.user.email ?? "",
      role,
    });
  }

  const loginWithEmail = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // onAuthStateChange will update user
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } finally {
      setUser(null);
    }
  };

  const getIdToken = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("getSession error:", error);
      return null;
    }
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
