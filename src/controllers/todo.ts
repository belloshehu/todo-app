import { Request, Response } from "express";
import { pool } from "../database/connection";
import { StatusCodes } from "http-status-codes";
import { Todo, TodoUpdateParams } from "../types";

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

export const updateTodo = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, completed }: TodoUpdateParams = req.body;

  // ensure ID is a number
  if (isNaN(id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid todo ID", success: false });
  }

  // title and completed are required
  if (!title || completed == null) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Todo title and completed required", success: false });
  }

  try {
    const result = await pool.query(
      "UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *",
      [title, completed, id]
    );

    res.status(StatusCodes.OK).json({
      todo: <Todo>result.rows[0],
      message: `Todo with ID ${id} updated`,
      success: true,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `Failed to  update todo with ID ${id}. ${error}`,
      success: false,
    });
  }
};
