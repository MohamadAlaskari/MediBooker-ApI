const { sequelize } = require('sequelize');
const dbConfig={
    dialect: 'mysql',         // Datenbanktyp (hier: MySQL)
    host: process.env.HOSTNAME,   // Hostname der Datenbank
    username: process.env.USERNAME, // Benutzername
    password: process.env.PASSWORD, // Passwort
    database: process.env.DATABASE  // Name der Datenbank
};
const sequelize= new Sequelize(dbConfig);
module.exports = sequelize;