const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');

router.get('/reservations', reservationController.getAll);
router.post('/create', reservationController.create);
router.put('/update', reservationController.update); // Using request body for update
router.delete('/delete', reservationController.remove); // Using request body for delete

module.exports = router;
