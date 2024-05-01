const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/ServiceController');

router.get('/services', serviceController.getAllServices);
router.get('/services/:id', serviceController.getServiceById);
router.post('/addservice', serviceController.addService);
router.delete('/delete/:id', serviceController.deleteService);
router.put('/updateservice/:id', serviceController.updateService);

module.exports = router;