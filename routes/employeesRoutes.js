const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

const { getAll, signup, deleteEmployee, updateEmployee, login, logout, getEmployeeByToken, getEmployeeById } = require('../controllers/employeesController');

router.get('/employees', authenticateToken, getAll);
router.post('/signup', signup);
router.delete('/delete', authenticateToken, deleteEmployee);
router.put('/update', authenticateToken, updateEmployee);
router.post('/login', login);
router.post('/logout', authenticateToken, logout);
router.get('/by-token', authenticateToken, getEmployeeByToken);
router.get('/by-id', authenticateToken, getEmployeeById);


module.exports = router;

