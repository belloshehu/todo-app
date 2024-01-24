"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const todoRouter_1 = __importDefault(require("./routers/todoRouter"));
const port = 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/todos", todoRouter_1.default);
app.listen(port, () => {
    (0, connection_1.connectDB)();
    console.log(`Server listening on port ${port}`);
});
