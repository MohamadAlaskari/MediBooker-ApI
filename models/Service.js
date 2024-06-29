const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Service = sequelize.define('Service',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM('Health Check-ups', 'X-rays', 'Vaccinations', 'Blood Tests', 'Allergy Testing', 'Ultrasound', ''),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Service',
        tableName: 'Service',
    });

module.exports = Service;