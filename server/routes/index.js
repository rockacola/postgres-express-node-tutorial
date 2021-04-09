const todosController = require("../controllers").todos;
const todoItemsController = require("../controllers").todoItems;
const usersController = require("../controllers/users");
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = "b76760dbd6c7e4a8304d25f7ed4c84b9"; // TODO: move to env var; generate better secret

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!",
    })
  );

  app.post("/api/todos", authenticateToken, todosController.create);
  app.get("/api/todos", authenticateToken, todosController.list);
  app.get("/api/todos/:todoId", authenticateToken, todosController.retrieve);
  app.put("/api/todos/:todoId", authenticateToken, todosController.update);
  app.delete("/api/todos/:todoId", authenticateToken, todosController.destroy);

  app.post("/api/todos/:todoId/items", authenticateToken, todoItemsController.create);
  app.put("/api/todos/:todoId/items/:todoItemId", authenticateToken, todoItemsController.update);
  app.delete(
    "/api/todos/:todoId/items/:todoItemId", authenticateToken,
    todoItemsController.destroy
  );
  app.all("/api/todos/:todoId/items", (req, res) =>
    res.status(405).send({
      message: "Method Not Allowed",
    })
  );

  app.get("/api/users", usersController.list); // TODO: remove this action
  app.post("/api/users", usersController.register);
  app.post("/api/users/login", usersController.login);
  app.get("/api/users/me", authenticateToken, usersController.me);
};
