const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Patient = require('./Patient');

const PatientToken = sequelize.define('PatientToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
        sequelize,
        modelName: 'PatientToken',
        tableName: 'PatientToken',
    });

// Definiere die Beziehung zur Patienten-Tabelle
PatientToken.belongsTo(Patient ,{ foreignKey: 'patientId' });

module.exports = PatientToken;
