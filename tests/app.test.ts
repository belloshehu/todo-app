import request, { Response } from "supertest";
import app from "../src/index";
import { MissingRequestBodyProperty, Todo, TodoPostBody } from "../src/types";

describe("API endpoint /todos", () => {
  // GET: List all todos
  it("Should return 200 status code", async () => {
    const res: Response = await request(app).get("/todos");
    expect(res.statusCode).toEqual(200);
  });

  // GET: Invalid path:
  it("return 404 status code", async () => {
    const res: Response = await request(app).get("/todo");
    expect(res.status).toEqual(404);
  });

  // POST: Create a todo
  it("returns 201 status code if todo is created", async () => {
    const res: Response = await request(app)
      .post("/todos")
      .send({ title: "Doing some assessments" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toMatchObject<TodoPostBody>({
      todo: {
        title: "Doing some assessments",
        completed: false,
      },
      message: "Todo created successfully",
      success: true,
    });
  });

  // POST: Create a todo with the right properties
  it("returns 400 when creating todo with a missing title", async () => {
    const res: Response = await request(app)
      .post("/todos")
      .send({ completed: true });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toMatchObject<MissingRequestBodyProperty>({
      message: "Title is required",
      success: false,
    });
  });

  // POST: Create a todo with the right proterities
  it("returns correct body after creating todo", async () => {
    const res: Response = await request(app)
      .post("/todos")
      .send({ title: "Doing some assessments" });
    expect(res.body).toMatchObject<TodoPostBody>({
      todo: {
        title: "Doing some assessments",
        completed: false,
      },
      message: "Todo created successfully",
      success: true,
    });
  });
});
