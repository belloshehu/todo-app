import { Pool } from "postgres-pool";
const text = `
    CREATE TABLE IF NOT EXISTS "todo" (
	    "id" SERIAL,
	    "title" VARCHAR(100) NOT NULL,
	    "completed" BOOLEAN NOT NULL DEFAULT FALSE,
        PRIMARY KEY ("id")
    );`;

export const createTable = async (pool: Pool) => {
  try {
    await pool.query(text);
    console.log(`table created or exists`);
  } catch (error) {
    console.log("Failed to created table");
  }
};
