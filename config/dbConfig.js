const { Sequelize } = require('sequelize');

const dbConfig = {
    dialect: 'mysql',
    host: 'srv972.hstgr.io', // Use the environment variable for host
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

module.exports = sequelize;