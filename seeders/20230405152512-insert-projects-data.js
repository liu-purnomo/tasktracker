'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const projects = JSON.parse(fs.readFileSync('./data/projects.json', 'utf-8'))
      .map(project => {
        delete project.id
        project.createdAt = project.updatedAt = new Date()
        return project
      })
    
    return queryInterface.bulkInsert('Projects', projects)
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Projects', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
