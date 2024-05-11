const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbConfig');
const Employee = require('./Employee');

const EmployeeToken = sequelize.define('EmployeeToken', {
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        sequelize,
        modelName: 'EmployeeToken',
        tableName: 'EmployeeToken',
    });


EmployeeToken.belongsTo(Employee, { foreignKey: 'employeeId' });

module.exports = EmployeeToken;
