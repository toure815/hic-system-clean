import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { MOCK_AUTH } from "../utils/featureFlags";

export function LoginPage() {
  const { loginWithEmail, user, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If auth is still initializing, avoid flicker
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-gray-700">Loading…</div>
      </div>
    );
  }

  // Redirect if already logged in
  if (user) {
    const redirectPath = user.role === "admin" ? "/dashboard" : "/portal";
    return <Navigate to={redirectPath} replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await loginWithEmail(email, password);
      // After login, AuthContext updates `user` and this component re-renders,
      // triggering the <Navigate /> redirect above.
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit = email.trim().length > 0 && password.trim().length > 0 && !submitting;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Sign in</h1>

        {MOCK_AUTH && (
          <div className="mb-4 rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800">
            Mock auth is ON – any email/password will sign in (emails with “admin” get admin role).
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            autoComplete="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            disabled={!canSubmit}
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>

          {/* Create Account button */}
          <Link
            to="/signup"
            className="block w-full text-center mt-4 py-2 px-4 border border-gray-300 rounded-md text-black hover:bg-gray-100"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
