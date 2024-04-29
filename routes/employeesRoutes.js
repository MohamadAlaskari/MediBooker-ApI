const express = require('express');
const router = express.Router();

const { getAll, signup, deleteEmployee, updateEmployee, login } = require('../controllers/employeesController');

router.get("/employees", getAll);
router.post("/signup", signup);
router.delete("/delete", deleteEmployee);
router.put("/update", updateEmployee)
router.post("/login", login);


module.exports = router;

