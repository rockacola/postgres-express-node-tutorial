module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define("TodoItem", {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  TodoItem.associate = (models) => {
    TodoItem.belongsTo(models.Todo, {
      foreignKey: "todoId",
      onDelete: "CASCADE",
    });
  };
  return TodoItem;
};
