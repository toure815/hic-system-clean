import jwt from "jsonwebtoken";
import { APIError } from "encore.dev/api";
import { secret } from "encore.dev/config";

const supabaseJwtSecret = secret("SupabaseJWTSecret");

export function verifyToken(token: string) {
  const secretValue = supabaseJwtSecret();
  if (!secretValue) {
    throw APIError.internal("Missing Supabase JWT secret");
  }

  try {
    return jwt.verify(token, secretValue) as {
      sub: string;
      email?: string;
      [key: string]: any;
    };
  } catch (err) {
    throw APIError.unauthenticated("Invalid or expired token");
  }
}
