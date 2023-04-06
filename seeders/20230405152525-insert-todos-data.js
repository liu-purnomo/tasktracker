'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const todos = JSON.parse(fs.readFileSync('./data/todos.json', 'utf-8'))
      .map(todo => {
        delete todo.id
        todo.createdAt = todo.updatedAt = new Date()
        return todo
      })
    
    return queryInterface.bulkInsert('Todos', todos)
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
    return queryInterface.bulkDelete('Todos', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
