const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/services', serviceController.getAllServices);
router.get('/getbyid', serviceController.getServiceById);
router.post('/add', serviceController.addService);
router.delete('/delete', serviceController.deleteService); // Änderung: Keine ID im Pfad
router.put('/update', serviceController.updateService); // Änderung: Keine ID im Pfad

module.exports = router;
