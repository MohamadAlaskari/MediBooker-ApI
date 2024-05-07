const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
const Reservation = require('./Reservation');


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
    Reservation.belongsTo(Appointment);
    Reservation.belongsTo(Patient);
    Reservation.belongsTo(Service);
module.exports = Reservation;