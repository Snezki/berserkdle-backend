
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    characterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'characters',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    clue: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    typeQuestion: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    tableName: 'questions',
    timestamps: true,
  });

  Question.associate = function(models) {
    Question.belongsToMany(models.Character, {
      through: models.CharacterQuestion,
      foreignKey: 'questionId',
      otherKey: 'characterId',
      as: 'characters'
    });
  };

  return Question
}
