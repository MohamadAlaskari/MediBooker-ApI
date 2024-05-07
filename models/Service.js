const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

const Service = sequelize.define('Service',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type: {
            type: DataTypes.ENUM('Allergietests', 'Gesundheitsuntersuchung', 'Impfungen', 'Ultraschall', 'Röntgen', 'Chiropraktik', ''),
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