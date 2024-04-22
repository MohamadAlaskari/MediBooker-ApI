const { Sequelize } = require('sequelize');
const dbConfig = {
    dialect: 'mysql',
    host: process.env.HOSTNAME,
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
    
module.exports = sequelize;