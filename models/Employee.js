
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');

const Employee = sequelize.define('Employee',
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
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
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

        createdAt: {
            type: DataTypes.DATE,
        },
        updatedAt: {
            type: DataTypes.DATE,
        },
        active:{
            type: DataTypes.BOOLEAN,
            defaultValue: false, 
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Employee',
        tableName: 'Employee',
    }
);


module.exports = Employee;