import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function SignupPage() {
  const { user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If auth is still initializing
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-gray-700">Loading…</div>
      </div>
    );
  }

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/portal" replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error: signUpError } = await (await import("../utils/supabase")).supabase.auth.signUp({
        email,
        password,
        options: {
          data: { businessName }, // Save businessName in user_metadata
        },
      });

      if (signUpError) throw signUpError;

      // Later you’ll hook this into n8n workflow:
      // - Check SharePoint for businessName folder
      // - If not exists, create it
      // - Store provider documents inside

    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = email && password && businessName && !submitting;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            type="text"
            placeholder="Business Name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            autoComplete="new-password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            disabled={!canSubmit}
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
