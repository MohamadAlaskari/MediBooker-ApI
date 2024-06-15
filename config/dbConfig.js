const { Sequelize } = require('sequelize');

const dbConfig = {
    dialect: 'mysql',
    dialectModule: require('mysql2'),
    host: process.env.HOSTNAME, // Verwendet die Umgebungsvariable für den Host
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
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


module.exports = { sequelize, };

