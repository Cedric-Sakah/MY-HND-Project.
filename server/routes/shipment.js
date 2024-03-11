const shipmentCntroller = require('../controllers/shipmentcontroller')
const express = require('express');

const router = express.Router();

router.get('/', shipmentCntroller.getAllShipments);
router.post('/' , shipmentCntroller.createShipment);
router.put('/:id' , shipmentCntroller.updateShipment);
router.delete('/:id', shipmentCntroller.deleteShipment);
router.get('/:id',shipmentCntroller.getShipmentById);


module.exports = router;
