import { Header, APIError, Gateway } from "encore.dev/api";
import { authHandler } from "encore.dev/auth";
import { secret } from "encore.dev/config";
import jwt from "jsonwebtoken";
import { authDB } from "./db";
import type { AuthData } from "./types";

const jwtSecret = secret("JWTSecret");

interface AuthParams {
  authorization?: Header<"Authorization">;
}

const auth = authHandler<AuthParams, AuthData>(
  async (data) => {
    const token = data.authorization?.replace("Bearer ", "");
    if (!token) {
      throw APIError.unauthenticated("missing token");
    }

    try {
      const payload = jwt.verify(token, jwtSecret()) as any;
      
      const user = await authDB.queryRow`
        SELECT id, email, role, first_name, last_name, is_active
        FROM users 
        WHERE id = ${payload.userId} AND is_active = true
      `;

      if (!user) {
        throw APIError.unauthenticated("user not found or inactive");
      }

      return {
        userID: user.id.toString(),
        email: user.email,
        role: user.role,
        firstName: user.first_name,
        lastName: user.last_name,
      };
    } catch (err) {
      throw APIError.unauthenticated("invalid token", err);
    }
  }
);

export const gw = new Gateway({ authHandler: auth });
