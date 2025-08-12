import { SQLDatabase } from "encore.dev/storage/sqldb";

export const authDB = new SQLDatabase("auth", {
  migrations: "./migrations",
});

// Use the Supabase connection string directly
authDB.connectionString = "postgresql://postgres:HICdb2025_Glacier47wQ9x@db.lczeeincuqzfczdcrlvd.supabase.co:5432/postgres?sslmode=require";
