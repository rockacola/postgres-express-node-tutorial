"use strict";

const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);

const users = [
  { email: "alice@test.com", password: "alicePass" },
  { email: "ben@test.com", password: "benPass" },
  { email: "charlie@test.com", password: "charliePass" },
  { email: "danny@test.com", password: "dannyPass" },
  { email: "elias@test.com", password: "eliasPass" },
  { email: "fiona@test.com", password: "fionaPass" },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date().toISOString();

    await queryInterface.bulkInsert(
      "Users",
      users.map((user) => ({
        email: user.email,
        password: bcrypt.hashSync(user.password, SALT_ROUNDS),
        createdAt: now,
        updatedAt: now,
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", {
      email: users.map((user) => user.email),
    });
  },
};
