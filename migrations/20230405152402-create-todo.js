'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Todos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      task: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.STRING
      },
      dueDate: {
        type: Sequelize.DATE
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Projects',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      UserId: {
        type: Sequelize.INTEGER,
        references: { //Required field
          model: 'Users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Todos');
  }
};