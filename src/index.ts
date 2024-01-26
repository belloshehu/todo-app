import express from "express";
import { connectDB } from "./database/connection";
import todoRouter from "./routers/todoRouter";

const port = 8000;

const app = express();

app.use(express.json());
app.use("/todos", todoRouter);

app.listen(port, () => {
  connectDB();
  console.log(`Server listening on port ${port}`);
});

export default app;
