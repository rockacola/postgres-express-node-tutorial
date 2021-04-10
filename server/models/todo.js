module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define("Todo", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Todo.associate = (models) => {
    Todo.hasMany(models.TodoItem, {
      foreignKey: "todoId",
      as: "todoItems",
    });

    Todo.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE",
    });

    Todo.belongsToMany(models.User, {
      through: "Todo_User",
      as: "collaborators",
      foreignKey: "todoId",
    });
  };
  return Todo;
};
