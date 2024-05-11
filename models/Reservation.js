const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Appointment = require('./Appointment');
const Patient = require('./Patient');
const Service = require('./Service');




const Reservation = sequelize.define('Reservation',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }
    },
    {
        sequelize,
        modelName: 'Reservation',
        tableName: 'Reservation',
    });

// foriegn keys

Reservation.belongsTo(Appointment, { foreignKey: 'appointmentId', onDelete: 'CASCADE' });

Reservation.belongsTo(Patient, { foreignKey: 'patientId', onDelete: 'CASCADE' });
Reservation.belongsTo(Service, { foreignKey: 'serviceId', onDelete: 'CASCADE' });

module.exports = Reservation;