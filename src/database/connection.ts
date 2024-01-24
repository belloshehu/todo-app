import { Pool } from "postgres-pool";
import dotenv from "dotenv";
import { createTable } from "./createTable";

dotenv.config();

export const pool = new Pool({
  user: process.env.PG_USER,
  database: process.env.PG_DATABASE!,
  host: process.env.PG_HOST!,
  password: process.env.PG_PASSWORD,
  port: 5432,
});

export const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Connected to postgres");
    createTable(pool);
  } catch (error) {
    console.log("Failed to connect to postgres", error);
  }
};
