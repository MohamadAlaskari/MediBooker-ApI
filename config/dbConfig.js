const { Sequelize } = require('sequelize');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const dbConfig = {
    dialect: 'mysql',
    host: 'srv972.hstgr.io',
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

const jwtSecret = generateRandomSecretKey(); 
const jwtExpiration = '30m'; 

module.exports = { sequelize, jwtSecret, jwtExpiration };

