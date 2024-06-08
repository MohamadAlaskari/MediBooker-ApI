const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../middlewares/tockenService');

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

async function findPatientIdByToken(token, res) {
    try {
        const patientToken = await PatientToken.findOne({ where: { token } });
        if (!patientToken) {
            return res.status(404).json({ error: 'Patient not found!' });
        }
        return res.status(200).json({ message: 'token found successful!', patientId: patientToken.patientId });
    } catch (error) {
        console.error('Error finding patient ID by token:', error);
        return res.status(500).json({ error: 'An error occurred while finding patient ID by token!' });
    }
}
async function findEmployeeIdByToken(token, res) {
    try {
        const employeeToken = await EmployeeToken.findOne({ where: { token } });
        if (!employeeToken) {
            return res.status(404).json({ error: 'Employee not found!' });
        }
        return res.status(200).json({ message: 'token found successful!', employeeId: employeeToken.employeeId });;
    } catch (error) {
        console.error('Error finding Employee ID by token:', error);
        return res.status(500).json({ error: 'An error occurred while finding Employee ID by token!' });
    }
}

module.exports = { authenticateToken, findPatientIdByToken, findEmployeeIdByToken };
