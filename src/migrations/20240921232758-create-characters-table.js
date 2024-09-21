'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('characters', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      raceSpecies: {
        type: Sequelize.STRING,
        allowNull: false
      },
      affiliation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstAppearance: {
        type: Sequelize.STRING,
        allowNull: false
      },
      weapon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      quotes: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('characters')
  }
}
