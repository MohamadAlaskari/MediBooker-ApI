const express = require('express');
const router = express.Router();

const { getAll, signup, deleteEmployee, updateEmployee, login, logout } = require('../controllers/employeesController');

router.get("/employees", getAll);
router.post("/signup", signup);
router.delete("/delete", deleteEmployee);
router.put("/update", updateEmployee)
router.post("/login", login);
router.post("/logout", logout);


module.exports = router;

