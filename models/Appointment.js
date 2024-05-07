const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Patient = require('./Patient');
const Service = require('./Service');

const Appointment = sequelize.define('Appointment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    hour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }

},
    {
        sequelize,
        modelName: 'Appointment',
        tableName: 'Appointment',
    });
Appointment.belongsTo(Patient);
Appointment.belongsTo(Service);
module.exports = Appointment;