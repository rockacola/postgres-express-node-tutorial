"use strict";

const Todo = require("../models").Todo;
const User = require("../models").User;

const now = new Date().toISOString();
const userEmail = "alice@test.com";
const todoListTitle = "Grocery shopping";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const todo = await Todo.findOne({
      where: {
        title: todoListTitle,
      },
    });

    const user = await User.findOne({
      where: {
        email: userEmail,
      },
    });

    await queryInterface.bulkInsert("Todo_Users", [
      {
        todoId: todo.id,
        userId: user.id,
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    // TODO: implement down script
  },
};
