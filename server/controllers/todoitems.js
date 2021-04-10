const TodoItem = require("../models").TodoItem;
const User = require("../models").User;
const Todo = require("../models").Todo;

module.exports = {
  async create(req, res) {
    try {
      const userId = req.user.id;
      const content = req.body.content;
      const todoId = req.params.todoId;

      // TODO: move resuable code block to helper
      const todo = await Todo.findOne({
        where: {
          id: todoId,
          userId,
        },
      });
      if (!todo) {
        throw new Error("Invalid todo/user.");
      }

      const todoItem = await TodoItem.create({
        content,
        todoId,
      });

      return res.status(201).send(todoItem);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  /**
   * @deprecated
   */
  async update(req, res) {
    try {
      const userId = req.user.id;
      const content = req.body.content;
      const complete = req.body.complete;
      const todoId = req.params.todoId;
      const todoItemId = req.params.todoItemId;

      const todo = await Todo.findOne({
        where: {
          id: todoId,
          userId,
        },
      });
      if (!todo) {
        throw new Error("Invalid todo/user.");
      }

      const todoItem = await TodoItem.findOne({
        where: {
          id: todoItemId,
          todoId,
        },
      });
      if (!todoItem) {
        throw new Error("Invalid todo item.");
      }

      const updatedTodoItem = await todoItem.update({
        content,
        complete,
      });

      return res.status(200).send(updatedTodoItem);
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
      const todoItemId = req.params.todoItemId;

      const todo = await Todo.findOne({
        where: {
          id: todoId,
          userId,
        },
      });
      if (!todo) {
        throw new Error("Invalid todo/user.");
      }

      const todoItem = await TodoItem.findOne({
        where: {
          id: todoItemId,
          todoId,
        },
      });
      if (!todoItem) {
        throw new Error("Invalid todo item.");
      }

      await todoItem.destroy();

      return res.status(204).send();
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async setAssignee(req, res) {
    try {
      const ownerId = req.user.id;
      const todoId = req.params.todoId;
      const todoItemid = req.params.todoItemId;
      const assigneeId = req.params.assigneeId;

      // TODO: verify current user is the owner of the target todo list ID
      // TODO: verify the target todo item belongs to the provided todo list ID
      // TODO: verify the target assignee ID is a collaborator of this todo list
      // TODO: verify whether the target assignee is already set to this todo item

      // ACT
      const todoItem = await TodoItem.findByPk(todoItemId);
      await todoItem.update({
        userId: assigneeId,
      });

      return res.status(204).send();
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async unsetAssignee(req, res) {
    try {
      const ownerId = req.user.id;
      const todoId = req.params.todoId;
      const todoItemid = req.params.todoItemId;
      const assigneeId = req.params.assigneeId;

      // TODO: verify current user is the owner of the target todo list ID
      // TODO: verify the target todo item belongs to the provided todo list ID
      // TODO: verify the target assignee ID is a collaborator of this todo list
      // TODO: verify whether the target assignee is already set to this todo item

      // ACT
      const todoItem = await TodoItem.findByPk(todoItemId);
      await todoItem.update({
        userId: null,
      });

      return res.status(204).send();
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },
};
