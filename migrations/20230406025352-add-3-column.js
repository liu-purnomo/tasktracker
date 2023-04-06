'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Projects', 'category', {
        type: Sequelize.DataTypes.STRING
      }),
      queryInterface.addColumn('Projects', 'startDate', {
        type: Sequelize.DataTypes.DATE
      }),
      queryInterface.addColumn('Projects', 'endDate', {
        type: Sequelize.DataTypes.DATE
      })
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

   down(queryInterface, Sequelize) {
    return Promise.all ([
      queryInterface.removeColumn('Projects', 'category'),
      queryInterface.removeColumn('Projects', 'startDate'),
      queryInterface.removeColumn('Projects', 'endDate')
    ]);

    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
