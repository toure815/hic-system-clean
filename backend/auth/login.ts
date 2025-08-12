import { api, APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authDB } from "./db";
import type { LoginRequest, LoginResponse } from "./types";

const jwtSecret = secret("JWTSecret");

// Authenticates a user with email and password.
export const login = api<LoginRequest, LoginResponse>(
  { expose: true, method: "POST", path: "/auth/login" },
  async (req) => {
    const user = await authDB.queryRow`
      SELECT id, email, password_hash, role, first_name, last_name, is_active, created_at, updated_at
      FROM users 
      WHERE email = ${req.email.toLowerCase()}
    `;

    if (!user) {
      throw APIError.unauthenticated("invalid email or password");
    }

    if (!user.is_active) {
      throw APIError.permissionDenied("account is disabled");
    }

    const isValidPassword = await bcrypt.compare(req.password, user.password_hash);
    if (!isValidPassword) {
      throw APIError.unauthenticated("invalid email or password");
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      jwtSecret(),
      { expiresIn: "24h" }
    );

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
        isActive: user.is_active,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
      token,
    };
  }
);
