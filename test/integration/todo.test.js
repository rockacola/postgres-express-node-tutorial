const { default: axios } = require("axios");

const baseUrl = "http://localhost:8000/api"; // TODO: move this to a config

test("Show todo list", async () => {
  const url = baseUrl + "/todos";
  const res = await axios.get(url);
  const todos = res.data;
  expect(todos.length).toBeGreaterThanOrEqual(0);
});
