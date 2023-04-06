'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get status() {
      if (new Date(this.startDate) < new Date(this.endDate)) {
        return "Todo";
      } else if (new Date(this.endDate) > this.startDate) {
        return "Doing";
      } else {
        return "Done";
      }
    }

    static associate(models) {
      // define association here
      Project.hasMany(models.Todo, { foreignKey: 'ProjectId' })
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    startDate: {
      type: DataTypes.DATE,
      validate: {
        start(value) {
          if ((new Date(value)) < (new Date())) {
            throw new Error("Start Date cannot be greater than Today");
          }
        }
      }
    },
    endDate: {
      type: DataTypes.DATE,
      validate: {
        end(value) {
          if ((new Date(value)) < (new Date(this.startDate))) {
            throw new Error("End Date cannot be less than Start Date");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Project',
  });

  
  return Project;
};