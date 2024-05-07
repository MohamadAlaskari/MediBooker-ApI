const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');

router.get('/appointments', appointmentController.getAllAppointments);

router.get('/appointments/:id', appointmentController.getAppointmentById);

router.post('/addappointment', appointmentController.createAppointment);

router.put('/updateappointment/:id', appointmentController.updateAppointment);

router.delete('/deleteappointment/:id', appointmentController.deleteAppointment);

module.exports = router;