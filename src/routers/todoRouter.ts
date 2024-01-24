import express from "express";
import { createTodo, getTodos } from "../controllers/todo";

const router = express.Router();
router.route("/").post(createTodo).get(getTodos);

export default router;
