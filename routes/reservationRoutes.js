const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/ReservationController');
const { authenticateToken } = require('../middlewares/authenticateToken');

router.get('/reservations', reservationController.getAll);
router.post('/create', reservationController.create);
router.put('/update', reservationController.update); // Using request body for update
router.delete('/delete', reservationController.remove); // Using request body for delete  getPatientAppointmentsbyid
router.get('/patient-appointments', authenticateToken, reservationController.getPatientAppointments);

router.get('/getPatientAppointmentsbyid/:patientId', authenticateToken, reservationController.getPatientAppointmentsById);

router.get('/reservationByAppointment/:appointmentId',authenticateToken, reservationController.getReservationByAppointmentId);

module.exports = router;
