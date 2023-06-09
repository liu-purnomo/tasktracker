'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.Project, { foreignKey: 'ProjectId' })
      Todo.belongsTo(models.User, { foreignKey: 'UserId' })
    }
  }
  Todo.init({
    task: DataTypes.STRING,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    ProjectId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  
  Todo.beforeCreate((instance) => {
    instance.status = "Todo";
  })
  return Todo;
};