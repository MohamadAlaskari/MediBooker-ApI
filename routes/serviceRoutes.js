const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/ServiceController');
const { authenticateToken } = require('../middlewares/authenticateToken');


router.get('/services', serviceController.getAllServices);
router.get('/getbyid', authenticateToken, serviceController.getServiceById);
router.post('/create', authenticateToken, serviceController.addService);
router.delete('/delete', authenticateToken, serviceController.deleteService);
router.put('/update', serviceController.updateService);

module.exports = router;
