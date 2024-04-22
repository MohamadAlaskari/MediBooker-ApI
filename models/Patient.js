const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');


class Patient extends Model {

}
Patient.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
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
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
},
    {
        sequelize,
        modelName: 'Patient',
        tableName: 'Patient',
    }

)

module.exports = Patient;