import { api, APIError } from "encore.dev/api";
import { getAuthData } from "~encore/auth";
import bcrypt from "bcrypt";
import { authDB } from "./db";
import type { CreateUserRequest, User } from "./types";

// Creates a new user (admin only).
export const createUser = api<CreateUserRequest, User>(
  { auth: true, expose: true, method: "POST", path: "/auth/users" },
  async (req) => {
    const auth = getAuthData()!;
    
    if (auth.role !== "admin") {
      throw APIError.permissionDenied("only admins can create users");
    }

    const existingUser = await authDB.queryRow`
      SELECT id FROM users WHERE email = ${req.email.toLowerCase()}
    `;

    if (existingUser) {
      throw APIError.alreadyExists("user with this email already exists");
    }

    const passwordHash = await bcrypt.hash(req.password, 10);

    const user = await authDB.queryRow`
      INSERT INTO users (email, password_hash, role, first_name, last_name)
      VALUES (${req.email.toLowerCase()}, ${passwordHash}, ${req.role}, ${req.firstName}, ${req.lastName})
      RETURNING id, email, role, first_name, last_name, is_active, created_at, updated_at
    `;

    if (!user) {
      throw APIError.internal("failed to create user");
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
      isActive: user.is_active,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }
);
