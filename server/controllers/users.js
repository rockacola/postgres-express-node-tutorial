const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 12; // TODO: move to env var
const TOKEN_SECRET = "b76760dbd6c7e4a8304d25f7ed4c84b9"; // TODO: move to env var; generate better secret

module.exports = {
  list(req, res) {
    // TODO: convert to async usage
    return User.findAll({
      order: [["createdAt", "DESC"]],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },

  async register(req, res) {
    try {
      const email = req.body.email;
      const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);

      const user = await User.create({
        email,
        password,
      });

      return res.status(201).send(user);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },

  async login(req, res) {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw new Error("User not found.");
      }

      const isAuth = await bcrypt.compare(password, user.password);

      if (!isAuth) {
        throw new Error("Invalid user login.");
      }

      const token = jwt.sign({ id: user.id }, TOKEN_SECRET);
      return res.status(200).send(token);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },
};
