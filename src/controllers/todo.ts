import { Request, Response } from "express";
import { pool } from "../database/connection";
import { StatusCodes } from "http-status-codes";
import { Todo } from "../types";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM todos");
    const todos: Todo[] = result.rows;
    res.status(StatusCodes.OK).json({ todos, success: true });
  } catch (error: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message, success: false });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { title } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO todos (title) VALUES ($1) RETURNING *",
      [title]
    );
    const todo: Todo = result.rows[0];

    res.status(StatusCodes.CREATED).json({
      todo,
      message: "Todo created successfully",
      success: true,
    });
  } catch (error: any) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Failed to create todo ${error.message}`,
      success: false,
    });
  }
};
