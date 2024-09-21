// models/Character.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Adjust path as necessary

const Character = sequelize.define('Character', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'characters', // Specify the table name
    timestamps: false, // Enable createdAt and updatedAt fields
});

module.exports = Character;
