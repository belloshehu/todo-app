import express from "express";
import { connectDB } from "./database/connection";
import { config } from "dotenv";

config();

const port = 8000;

const app = express();

app.listen(port, () => {
  connectDB();
  console.log(`Server listening on port ${port}`);
});
