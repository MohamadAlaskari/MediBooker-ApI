const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authenticateToken');

const { getAll, signup, deletePatient, updatePatient, login, logout } = require('../controllers/patientsController');

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", authenticateToken, logout);
router.get("/patients", authenticateToken, getAll);
router.delete("/delete", authenticateToken, deletePatient);
router.put("/update", authenticateToken, updatePatient)


module.exports = router;



