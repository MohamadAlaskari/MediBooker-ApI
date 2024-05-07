const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/dbConfig');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ error: 'Token expired' });
            }
            return res.status(403).json({ error: 'Forbidden' });
        }
        
        // Check token expiration
        const currentTime = Math.floor(Date.now() / 1000); 
        if (decoded.exp <= currentTime) {
            return res.status(401).json({ error: 'Token expired' });
        }

        req.user = decoded; 
        next(); 
    });

}

module.exports = { authenticateToken };
