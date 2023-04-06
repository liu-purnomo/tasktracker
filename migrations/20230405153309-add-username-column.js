'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'username', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
      unique: true
    })
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'username')
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
