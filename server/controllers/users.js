const User = require("../models").User;
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 12; // TODO: move to env var

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
};
