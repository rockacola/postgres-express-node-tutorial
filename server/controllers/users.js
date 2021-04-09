const User = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv')

dotenv.config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const TOKEN_SECRET = process.env.TOKEN_SECRET

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

  async me(req, res) {
    try {
      const userId = req.user.id;
      const user = await User.findByPk(userId);
      return res.status(200).send(user);
    } catch (err) {
      return res.status(400).send({
        success: false,
        message: err.message,
      });
    }
  },
};
