const express = require('express');
const router = express.Router();

const { getAll, signup, deletePatient, updatePatient, login } = require('../controllers/patientsController');

router.get("/patients", getAll);
router.post("/signup", signup);
router.delete("/delete", deletePatient);
router.put("/update", updatePatient)
router.post("/login", login);


module.exports = router;



