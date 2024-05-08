const express = require('express');
const router = express.Router();
//const { authenticateToken } = require('./middlewares/authenticateToken');

const { getAll, signup, deletePatient, updatePatient, login, logout } = require('../controllers/patientsController');

router.get("/patients", getAll);
router.post("/signup", signup);
router.delete("/delete", deletePatient);
router.put("/update", updatePatient)
router.post("/login", login);
router.post("/logout", logout);


module.exports = router;



