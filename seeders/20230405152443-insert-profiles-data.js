'use strict';

const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const profiles = JSON.parse(fs.readFileSync('./data/profiles.json', 'utf-8'))
      .map(profile => {
        delete profile.id
        profile.createdAt = profile.updatedAt = new Date()
        return profile
      })
    
    return queryInterface.bulkInsert('Profiles', profiles)
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
    return queryInterface.bulkDelete('Profiles', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
