const crypto = require('crypto');

const generateRandomSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

const jwtSecret = generateRandomSecretKey();
const jwtExpiration = '30m';

module.exports = { jwtSecret, jwtExpiration }