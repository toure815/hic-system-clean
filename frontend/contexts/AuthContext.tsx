import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import backend from "~backend/client";
import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "staff" | "client";

interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const syncUserWithBackend = async (authUser: User) => {
    try {
      // Get the backend client with auth
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) return null;

      const authenticatedBackend = backend.with({
        auth: { authorization: `Bearer ${session.access_token}` }
      });

      // Sync user data with backend
      const backendUser = await authenticatedBackend.auth.syncUser({
        email: authUser.email!,
        firstName: authUser.user_metadata?.first_name,
        lastName: authUser.user_metadata?.last_name,
      });

      return {
        id: authUser.id,
        email: authUser.email!,
        role: backendUser.role as UserRole,
        firstName: backendUser.firstName,
        lastName: backendUser.lastName,
      };
    } catch (error) {
      console.error('Error syncing user with backend:', error);
      // Fallback to Supabase user data
      return {
        id: authUser.id,
        email: authUser.email!,
        role: (authUser.user_metadata?.role as UserRole) || 'client',
        firstName: authUser.user_metadata?.first_name,
        lastName: authUser.user_metadata?.last_name,
      };
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const userData = await syncUserWithBackend(session.user);
        if (userData) {
          setUser(userData);
        }
      }
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = await syncUserWithBackend(session.user);
        if (userData) {
          setUser(userData);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (data.user) {
      const userData = await syncUserWithBackend(data.user);
      if (userData) {
        setUser(userData);
      }
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
