const { default: axios } = require("axios");

const baseUrl = "http://localhost:8000/api";

describe("CRUD on user", () => {
  const userEmail = `mock-${Math.floor(Math.random() * 1000000)}@test.com`;
  const userPassword = "mockPass";
  let userId;

  test("Show users", async () => {
    const url = baseUrl + "/users";
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const users = res.data;
    expect(users.length).toBeGreaterThanOrEqual(0);
  });

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

  // TODO: login
});
