const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', appointmentController.getAllAppointments);

router.get('/appointment', appointmentController.getAppointmentById);

router.post('/create', appointmentController.createAppointment);

router.put('/update', appointmentController.updateAppointment);

router.delete('/delete', appointmentController.deleteAppointment);

module.exports = router;