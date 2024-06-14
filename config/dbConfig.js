const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');
const crypto = require('crypto'); // falls es verwendet wird

const dbConfig = {
    dialect: 'mysql',
    host: 'srv972.hstgr.io', // Use the environment variable for host
    dialectModule: mysql2,
    username: 'u252525807_Admin',
    password: 'MediBooker4',
    database: 'u252525807_T_verwaltung'
};

const sequelize = new Sequelize(dbConfig);

// Test der Datenbankverbindung
sequelize.authenticate()
    .then(() => {
        console.log('Verbindung zur Datenbank erfolgreich hergestellt.');
    })
    .catch(err => {
        console.error('Verbindung zur Datenbank fehlgeschlagen:', err);
    });

const generateRandomSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

module.exports = { sequelize };
