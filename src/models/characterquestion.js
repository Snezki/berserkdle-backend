'use strict'

module.exports = (sequelize, DataTypes) => {
  const CharacterQuestion = sequelize.define('CharacterQuestion', {
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    questionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions', 
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'character_questions', 
    timestamps: true,
  })

  CharacterQuestion.associate = (models) => {
    CharacterQuestion.belongsTo(models.Question, {
        foreignKey: 'questionId',
        as: 'Question',
    })
    CharacterQuestion.belongsTo(models.Character, {
        foreignKey: 'characterId',
        as: 'Character',
    })
  }

  return CharacterQuestion
}
