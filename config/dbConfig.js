import { Sequelize } from 'sequelize';
import crypto from 'crypto';
import * as dotenv from 'dotenv';
dotenv.config();



const dbConfig = {
    dialect: 'mysql',
    host: 'srv972.hstgr.io',
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE

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

export { sequelize, generateRandomSecretKey };
