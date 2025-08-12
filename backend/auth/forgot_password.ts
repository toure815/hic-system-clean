import { api, APIError } from "encore.dev/api";
import crypto from "crypto";
import { authDB } from "./db";
import type { ForgotPasswordRequest } from "./types";

// Initiates password reset process.
export const forgotPassword = api<ForgotPasswordRequest, void>(
  { expose: true, method: "POST", path: "/auth/forgot-password" },
  async (req) => {
    const user = await authDB.queryRow`
      SELECT id FROM users WHERE email = ${req.email.toLowerCase()} AND is_active = true
    `;

    // Don't reveal if user exists or not for security
    if (!user) {
      return;
    }

    // Invalidate existing tokens
    await authDB.exec`
      UPDATE password_reset_tokens 
      SET used = true 
      WHERE user_id = ${user.id} AND used = false
    `;

    // Generate new token
    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await authDB.exec`
      INSERT INTO password_reset_tokens (user_id, token, expires_at)
      VALUES (${user.id}, ${token}, ${expiresAt})
    `;

    // TODO: Send email with reset link containing the token
    // For now, just log it (in production, integrate with email service)
    console.log(`Password reset token for ${req.email}: ${token}`);
  }
);
