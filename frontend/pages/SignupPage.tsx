import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../utils/supabase";

export function SignupPage() {
  const { user, loading } = useAuth();
  const [businessName, setBusinessName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-gray-700">Loading…</div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/portal" replace />;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { businessName, name },
        },
      });
      if (signUpError) throw signUpError;
    } catch (err: any) {
      setError(err.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const canSubmit =
    businessName.trim().length > 0 &&
    name.trim().length > 0 &&
    email.trim().length > 0 &&
    password.trim().length > 0 &&
    !submitting;

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your details below to create your account
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              type="text"
              placeholder="Enter your business name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              required
              autoComplete="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              required
              autoComplete="new-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {error && <div className="text-red-600 text-sm">{error}</div>}

          <button
            disabled={!canSubmit}
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-900 disabled:bg-black disabled:text-white disabled:opacity-70"
          >
            <span>＋</span> {submitting ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
