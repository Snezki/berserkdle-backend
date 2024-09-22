'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('questions', [
      { question: 'Guess today\'s Berserk character', typeQuestion: 'classic', createdAt: new Date(), updatedAt: new Date() },
      { question: 'Wghich character says', typeQuestion: 'quote', createdAt: new Date(), updatedAt: new Date() },
      { question: 'When did the character first appear?', typeQuestion: 'firstAppearance', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('questions', null, {});
  }
};
