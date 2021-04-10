const Todo = require("../models").Todo;
const TodoItem = require("../models").TodoItem;
const User = require("../models").User;
const Todo_User = require("../models").Todo_User;

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const title = req.body.title;

      const todo = await Todo.create({
        title,
        userId,
      });

      // Associate myself as collaborator of this todo list
      await Todo_User.create({
        todoId: todo.id,
        userId,
      })

      return res.status(201).send(todo);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async list(req, res) {
    try {
      const userId = req.user.id;

      const todos = await Todo.findAll({
        where: {
          userId,
        },
        include: [
          {
            model: TodoItem,
            as: "todoItems",
          },
          {
            model: User,
            as: "collaborators",
          },
        ],
        order: [
          ["createdAt", "DESC"],
          [{ model: TodoItem, as: "todoItems" }, "createdAt", "ASC"],
        ],
      });

      return res.status(200).send(todos);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async retrieve(req, res) {
    try {
      const userId = req.user.id;
      const todoId = req.params.todoId;

      const todo = await Todo.findByPk(todoId, {
        include: [
          {
            model: TodoItem,
            as: "todoItems",
          },
          {
            model: User,
            as: "collaborators",
          },
        ],
      });

      if (todo.userId !== userId) {
        throw new Error("Unauthorized access to this todo list.");
      }

      return res.status(200).send(todo);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user.id;
      const todoId = req.params.todoId;
      const todoTitle = req.body.title;

      const todo = await Todo.findByPk(todoId, {
        include: [
          {
            model: TodoItem,
            as: "todoItems",
          },
        ],
      });

      if (todo.userId !== userId) {
        throw new Error("Unauthorized access to this todo list.");
      }

      await todo.update({
        title: todoTitle,
      });

      return res.status(200).send(todo);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async destroy(req, res) {
    try {
      const userId = req.user.id;
      const todoId = req.params.todoId;

      const todo = await Todo.findByPk(todoId);

      if (!todo) {
        throw new Error("Todo not found.");
      }

      if (todo.userId !== userId) {
        throw new Error("Unauthorized access to this todo list.");
      }

      await todo.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },
};
