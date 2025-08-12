import { api } from "encore.dev/api";
import bcrypt from "bcrypt";
import { authDB } from "./db";

interface CreateAdminResponse {
  message: string;
  email: string;
}

// Creates the default admin user if it doesn't exist.
export const createAdmin = api<void, CreateAdminResponse>(
  { expose: true, method: "POST", path: "/auth/create-admin" },
  async () => {
    const existingAdmin = await authDB.queryRow`
      SELECT id FROM users WHERE email = 'admin@example.com'
    `;

    if (existingAdmin) {
      return {
        message: "Admin user already exists",
        email: "admin@example.com"
      };
    }

    const passwordHash = await bcrypt.hash("admin123", 10);

    await authDB.exec`
      INSERT INTO users (email, password_hash, role, first_name, last_name)
      VALUES ('admin@example.com', ${passwordHash}, 'admin', 'Admin', 'User')
    `;

    return {
      message: "Admin user created successfully",
      email: "admin@example.com"
    };
  }
);
