const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');

router.get('/', orderController.getOrders);
router.get('/:order', orderController.getOrder);
router.delete('/remove/:id', orderController.removeOrder)

module.exports = router;
