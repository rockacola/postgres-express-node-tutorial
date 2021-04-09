const { default: axios } = require("axios");

const baseUrl = "http://localhost:8000/api";

describe("CRUD on user", () => {
  test("Show users", async () => {
    const url = baseUrl + "/users";
    const res = await axios.get(url);
    expect(res.status).toBe(200);
    const users = res.data;
    expect(users.length).toBeGreaterThanOrEqual(0);
  });
  // TODO: create a user
  // TODO: login
});
