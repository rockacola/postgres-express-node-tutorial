"use strict";

const User = require("../models").User;
const Todo = require("../models").Todo;

const now = new Date().toISOString();
const userEmail = "alice@test.com";
const todoListTitle = "Grocery shopping";
const todoItems = [
  { content: "Buy milk" },
  { content: "Buy sticky tape" },
  { content: "Check if able to exchange paper towel for another brand" },
  { content: "Check if olive oil is on discount" },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Find target user
    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    // Create the target todo list
    const todo = await Todo.create({
      title: todoListTitle,
      userId: user.id,
    });

    // Bulk insert todo items
    await queryInterface.bulkInsert(
      "TodoItems",
      todoItems.map((todoItem) => ({
        content: todoItem.content,
        complete: false,
        createdAt: now,
        updatedAt: now,
        todoId: todo.id,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Todos", {
      title: [todoListTitle],
    });

    // NOTE: no need to delete todo items per cascade logic
  },
};
