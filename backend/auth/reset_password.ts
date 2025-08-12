import { api, APIError } from "encore.dev/api";
import bcrypt from "bcrypt";
import { authDB } from "./db";
import type { ResetPasswordRequest } from "./types";

// Resets user password using a valid token.
export const resetPassword = api<ResetPasswordRequest, void>(
  { expose: true, method: "POST", path: "/auth/reset-password" },
  async (req) => {
    const resetToken = await authDB.queryRow`
      SELECT user_id, expires_at, used
      FROM password_reset_tokens 
      WHERE token = ${req.token}
    `;

    if (!resetToken) {
      throw APIError.invalidArgument("invalid reset token");
    }

    if (resetToken.used) {
      throw APIError.invalidArgument("reset token has already been used");
    }

    if (new Date() > resetToken.expires_at) {
      throw APIError.invalidArgument("reset token has expired");
    }

    const passwordHash = await bcrypt.hash(req.newPassword, 10);

    await authDB.exec`
      UPDATE users 
      SET password_hash = ${passwordHash}, updated_at = NOW()
      WHERE id = ${resetToken.user_id}
    `;

    await authDB.exec`
      UPDATE password_reset_tokens 
      SET used = true 
      WHERE token = ${req.token}
    `;
  }
);
