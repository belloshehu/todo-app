import { Request, Response } from "express";
import { pool } from "../database/connection";

const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await pool.query("SELECT * todos");
  } catch (error: any) {
    throw new Error(error);
  }
};
