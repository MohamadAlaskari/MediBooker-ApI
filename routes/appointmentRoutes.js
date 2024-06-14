const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/AppointmentController');
const { authenticateToken } = require('../middlewares/authenticateToken');


router.get('/appointments', authenticateToken, appointmentController.getAllAppointments);

router.get('/getById', authenticateToken, appointmentController.getAppointmentById);

router.post('/create', authenticateToken, appointmentController.createAppointment);

router.put('/update', authenticateToken, appointmentController.updateAppointment);

router.delete('/delete', authenticateToken, appointmentController.deleteAppointment);

router.get('/appointmentsByDate', authenticateToken, appointmentController.getAppointmentByDate);

router.post('/createMultiple', authenticateToken, appointmentController.createMultipleAppointments);

router.post('/createForDateRange', authenticateToken, appointmentController.createAppointmentsForDateRange);


module.exports = router;