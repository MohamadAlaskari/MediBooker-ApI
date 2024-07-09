const { Sequelize } = require('sequelize');
const crypto = require('crypto');

const dbConfig = {
    dialect: 'mysql',
    host: 'srv972.hstgr.io',
    username: 'u252525807_Admin',
    password: 'MediBooker4',
    database: 'u252525807_T_verwaltung'
};

const sequelize = new Sequelize(dbConfig);

// Test database connection
sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Function to generate a random secret key
const generateRandomSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

module.exports = { sequelize, generateRandomSecretKey };
