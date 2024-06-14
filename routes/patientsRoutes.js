const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

const { getAll, signup, deletePatient, updatePatient, login, logout, getPatientByToken, getPatientById } = require('../controllers/patientsController');

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/patients', authenticateToken, getAll);
router.delete('/delete', authenticateToken, deletePatient);
router.put('/update', authenticateToken, updatePatient);
router.get('/by-token', authenticateToken, getPatientByToken);
router.get('/by-id', authenticateToken, getPatientById);


module.exports = router;



