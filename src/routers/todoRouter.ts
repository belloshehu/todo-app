import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "../controllers/todo";

const router = express.Router();
router.route("/").post(createTodo).get(getTodos);
router.route("/:id").put(updateTodo).get(getTodo).delete(deleteTodo);

export default router;
