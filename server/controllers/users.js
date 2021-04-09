const User = require("../models").User;

module.exports = {
  list(req, res) {
    // TODO: convert to async usage
    return User.findAll({
      order: [["createdAt", "DESC"]],
    })
      .then((users) => res.status(200).send(users))
      .catch((error) => res.status(400).send(error));
  },
};
