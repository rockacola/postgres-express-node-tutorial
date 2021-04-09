const { default: axios } = require("axios");

const baseUrl = "http://localhost:8000/api"; // TODO: move this to a config

describe("CRUD on todo list", () => {
  let todoListCount;
  let todoListId;

  test("Show todo list", async () => {
    const url = baseUrl + "/todos";
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const todos = res.data;
    expect(todos.length).toBeGreaterThanOrEqual(0);

    todoListCount = todos.length;
  });

  test("Create a todo list", async () => {
    const url = baseUrl + "/todos";
    const payload = {
      title: "Dummy todo list",
    };
    const res = await axios.post(url, payload);
    expect(res.status).toBe(201);
    const todo = res.data;
    expect(todo.title).toBe(payload.title);

    todoListId = todo.id;
  });

  test("Count todo list", async () => {
    const url = baseUrl + "/todos";
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const todos = res.data;
    expect(todos.length).toBeGreaterThanOrEqual(todoListCount + 1);
  });

  // TODO: mod an existing todo list

  // TODO : delete a todo list
});
