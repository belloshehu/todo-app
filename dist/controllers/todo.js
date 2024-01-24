"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodo = exports.getTodos = void 0;
const connection_1 = require("../database/connection");
const http_status_codes_1 = require("http-status-codes");
// get all todos
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield connection_1.pool.query("SELECT * FROM todos");
        const todos = result.rows;
        res.status(http_status_codes_1.StatusCodes.OK).json({ todos, success: true });
    }
    catch (error) {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: error.message, success: false });
    }
});
exports.getTodos = getTodos;
// get single todo item
const getTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    // ensure ID is a number
    if (isNaN(id)) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid todo ID", success: false });
    }
    try {
        const result = yield connection_1.pool.query("SELECT * FROM todos WHERE id=$1", [id]);
        const todo = result.rows[0];
        if (!todo) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: `Todo with ID ${id} not found`,
                success: false,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).json({ todo, success: true });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Failed to query todo with ID ${id}. ${error}`,
            success: false,
        });
    }
});
exports.getTodo = getTodo;
// create new todo
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title } = req.body;
    try {
        const result = yield connection_1.pool.query("INSERT INTO todos (title) VALUES ($1) RETURNING *", [title]);
        const todo = result.rows[0];
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            todo,
            message: "Todo created successfully",
            success: true,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Failed to create todo. ${error.message}`,
            success: false,
        });
    }
});
exports.createTodo = createTodo;
// update an existing todo
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;
    // ensure ID is a number
    if (isNaN(id)) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid todo ID", success: false });
    }
    // title and completed are required
    if (!title || completed == null) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Todo title and completed required", success: false });
    }
    try {
        const result = yield connection_1.pool.query("UPDATE todos SET title = $1, completed = $2 WHERE id = $3 RETURNING *", [title, completed, id]);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            todo: result.rows[0],
            message: `Todo with ID ${id} updated`,
            success: true,
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Failed to  update todo with ID ${id}. ${error}`,
            success: false,
        });
    }
});
exports.updateTodo = updateTodo;
// delete a single todo item
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    // ensure ID is a number
    if (isNaN(id)) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Invalid todo ID", success: false });
    }
    try {
        const result = yield connection_1.pool.query("DELETE FROM todos WHERE id=$1 RETURNING *", [id]);
        const deletedTodo = result.rows[0];
        if (!deletedTodo) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                message: `Todo with ID ${id} not found`,
                success: false,
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.OK).json({
                todo: deletedTodo,
                message: `Todo with ID ${id} deleted`,
                success: true,
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: `Failed to  delete todo with ID ${id}. ${error}`,
            success: false,
        });
    }
});
exports.deleteTodo = deleteTodo;
