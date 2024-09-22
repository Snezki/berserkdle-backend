'use strict';

module.exports = (sequelize, DataTypes) => {
  const Character = sequelize.define('Character', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    raceSpecies: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    affiliation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstAppearance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weapon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quotes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'characters',
    timestamps: true,
  });

  Character.associate = function(models) {
    Character.belongsToMany(models.Question, {
      through: models.CharacterQuestion,
      foreignKey: 'characterId',
      otherKey: 'questionId',
      as: 'questions'
    });
  };

  return Character
};
