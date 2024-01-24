import express from "express";
import { createTodo, getTodos, updateTodo } from "../controllers/todo";

const router = express.Router();
router.route("/").post(createTodo).get(getTodos);
router.route("/:id").put(updateTodo);

export default router;
