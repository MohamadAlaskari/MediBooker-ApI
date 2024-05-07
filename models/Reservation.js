const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');
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
Reservation.belongsTo(Appointment, { onDelete: 'CASCADE',foreignKey: { allowNull: false } });
Reservation.belongsTo(Patient,  { onDelete: 'CASCADE',foreignKey: { allowNull: false } });
Reservation.belongsTo(Service, { onDelete: 'CASCADE' ,foreignKey: { allowNull: false }});

module.exports = Reservation;