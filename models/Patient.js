const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Patient = sequelize.define('Patient',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dob: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        healthInsurance: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        insuranceNr: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        insuranceType: {
            type: DataTypes.ENUM('private', 'gesetzlich'),
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        hNr: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        postcode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false, 
            allowNull: false
        }
        
    },
    {
        sequelize,
        modelName: 'Patient',
        tableName: 'Patient',
    });

module.exports = Patient;