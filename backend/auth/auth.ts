import { Header, APIError, Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";
import jwt from "jsonwebtoken";
import { authDB } from "./db";
import type { AuthData } from "./types";

const supabaseJwtSecret = secret("SupabaseJWTSecret");

interface AuthParams {
  authorization?: Header<"Authorization">;
}

function verifySupabaseAuth(authHeader?: string) {
  if (!authHeader?.startsWith("Bearer ")) {
    throw APIError.unauthenticated("Missing or invalid Authorization header");
  }

  const secretValue = supabaseJwtSecret();
  if (!secretValue) {
    throw APIError.internal("Server missing SUPABASE_JWT_SECRET");
  }

  const token = authHeader.slice(7);
  const payload = jwt.verify(token, secretValue) as {
    sub: string; 
    email?: string;
  };

  return { userId: payload.sub, email: payload.email };
}

const auth = authHandler<AuthParams, AuthData>(
  async (data) => {
    const authResult = verifySupabaseAuth(data.authorization);
    
    // Look up user in our local database using Supabase user ID
    const user = await authDB.queryRow`
      SELECT id, email, role, first_name, last_name, is_active, supabase_id
      FROM users 
      WHERE supabase_id = ${authResult.userId} AND is_active = true
    `;

    if (!user) {
      throw APIError.unauthenticated("user not found or inactive");
    }

    return {
      userID: user.supabase_id,
      email: user.email,
      role: user.role,
      firstName: user.first_name,
      lastName: user.last_name,
    };
  }
);

export const gw = new Gateway({ authHandler: auth });
