const { default: axios } = require("axios");

const baseUrl = "http://localhost:8000/api"; // TODO: move this to a config

describe("CRUD on todo items", () => {
  let todoListId;
  let todoItemId;

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

  test("Count todo items", async () => {
    const url = baseUrl + `/todos/${todoListId}`;
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const todo = res.data;
    expect(todo.todoItems.length).toBe(0);
  });

  test("Create a todo item", async () => {
    const url = baseUrl + `/todos/${todoListId}/items`;
    const payload = {
      content: "Dummy item",
    };
    const res = await axios.post(url, payload);
    expect(res.status).toBe(201);
    const item = res.data;
    expect(item.content).toBe(payload.content);

    todoItemId = item.id;
  });

  test("Count todo items (again)", async () => {
    const url = baseUrl + `/todos/${todoListId}`;
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const todo = res.data;
    expect(todo.todoItems.length).toBe(1);
  });

  test("Modify a todo item", async () => {
    const url = baseUrl + `/todos/${todoListId}/items/${todoItemId}`;
    const payload = {
      content: "Dummy item (mod)",
      complete: true,
    };
    const res = await axios.put(url, payload);
    expect(res.status).toBe(200);
    const item = res.data;
    expect(item.id).toBe(todoItemId);
    expect(item.content).toBe(payload.content);
    expect(item.complete).toBe(payload.complete);
  });

  test("Delete a todo item", async () => {
    const url = baseUrl + `/todos/${todoListId}/items/${todoItemId}`;
    const res = await axios.delete(url);
    expect(res.status).toBe(204);
  });

  test("Count todo items (for the 3rd time)", async () => {
    const url = baseUrl + `/todos/${todoListId}`;
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const todo = res.data;
    expect(todo.todoItems.length).toBe(0);
  });
});
