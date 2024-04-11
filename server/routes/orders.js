const orderController = require('../controllers/orderscontroller')
const express = require('express');

const router = express.Router();

router.get('/', orderController.getAllOrders);
router.post('/' , orderController.createOrder);
router.put('/:id' , orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);
router.get('/:id',orderController.getOrderById);

module.exports = router;
