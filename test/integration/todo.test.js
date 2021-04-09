const { default: axios } = require("axios");

const baseUrl = "http://localhost:8000/api"; // TODO: move this to a config

describe("CRUD on todo list", () => {
  const userEmail = `mock-${Math.floor(Math.random() * 1000000)}@test.com`;
  const userPassword = "mockPass";
  let userId;
  let userToken;
  let todoListId;

  test("Register an user", async () => {
    const url = baseUrl + "/users";
    const payload = {
      email: userEmail,
      password: userPassword,
    };
    const res = await axios.post(url, payload);
    expect(res.status).toBe(201);
    const user = res.data;
    expect(user.email).toBe(payload.email);

    userId = user.id;
  });

  test("Login an user", async () => {
    const url = baseUrl + "/users/login";
    const payload = {
      email: userEmail,
      password: userPassword,
    };
    const res = await axios.post(url, payload);
    expect(res.status).toBe(200);
    const token = res.data;
    expect(token.length).toBeGreaterThan(60);

    userToken = token;
  });

  test("Show todo list", async () => {
    const url = baseUrl + "/todos";
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(res.status).toBe(200);
    const todos = res.data;
    expect(todos.length).toBe(0);
  });

  test("Create a todo list", async () => {
    const url = baseUrl + "/todos";
    const payload = {
      title: "Dummy todo list",
    };
    const res = await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(res.status).toBe(201);
    const todo = res.data;
    expect(todo.title).toBe(payload.title);

    todoListId = todo.id;
  });

  test("Count todo list", async () => {
    const url = baseUrl + "/todos";
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(res.status).toBe(200);
    const todos = res.data;
    expect(todos.length).toBe(1);
  });

  test("Modify an todo list", async () => {
    const url = baseUrl + `/todos/${todoListId}`;
    const payload = {
      title: "Dummy todo list (mod)",
    };
    const res = await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(res.status).toBe(200);
    const todo = res.data;
    expect(todo.id).toBe(todoListId);
    expect(todo.title).toBe(payload.title);
  });

  test("Delete an todo list", async () => {
    const url = baseUrl + `/todos/${todoListId}`;
    const res = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(res.status).toBe(204);
  });

  test("Count todo list (again)", async () => {
    const url = baseUrl + "/todos";
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    expect(res.status).toBe(200);
    const todos = res.data;
    expect(todos.length).toBe(0);
  });
});
