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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.pool = void 0;
const postgres_pool_1 = require("postgres-pool");
const dotenv_1 = __importDefault(require("dotenv"));
const createTable_1 = require("./createTable");
dotenv_1.default.config();
exports.pool = new postgres_pool_1.Pool({
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    password: process.env.PG_PASSWORD,
    port: 5432,
});
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.pool.connect();
        console.log("Connected to postgres");
        (0, createTable_1.createTable)(exports.pool);
    }
    catch (error) {
        console.log("Failed to connect to postgres", error);
    }
});
exports.connectDB = connectDB;
