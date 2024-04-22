const express = require('express');
const router = express.Router();

const { getAll } = require('../controllers/patientsController');

router.get("/patients", getAll);

module.exports = router;



